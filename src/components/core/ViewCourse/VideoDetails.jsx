import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";

import IconButton from "../../common/IconButton";
import ReactPlayer from "react-player";
import { CiPlay1 } from "react-icons/ci";
import { BsDisplayFill } from "react-icons/bs";
import { CiRedo } from "react-icons/ci";



const VideoDetails = () => {
  const { courseId, sectionId, subsectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playerRef = useRef();
  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse);
  const location = useLocation();

  const [videoData, setVideoData] = useState(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setVideoSpecificDetails = async () => {
      if (!courseSectionData.length) return;
  
      if (!sectionId || !subsectionId) {
        navigate("/dashboard/enrolled-courses");
        return;
      }
  
      const filteredData = courseSectionData.find(
        (course) => course._id === sectionId
      );
  
      if (!filteredData || !filteredData.subSection) return;
  
      const filteredVideoData = filteredData.subSection.find(
        (data) => data._id === subsectionId
      );
  
      console.log("filteredVideoData", filteredVideoData.videoUrl);
      if (filteredVideoData) {
        setVideoData(filteredVideoData);
        setVideoEnded(false);
      }
    };
  
    setVideoSpecificDetails();
  }, [courseSectionData, courseId, sectionId, subsectionId, navigate, location.pathname]);
  

  //first video
  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const currentSubsectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((data) => data._id === subsectionId);

    if (currentSectionIndex === 0 && currentSubsectionIndex === 0) return true;
    else return false;
  };

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const currentSubsectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((data) => data._id === subsectionId);

    if (
      currentSectionIndex === courseSectionData.length - 1 &&
      currentSubsectionIndex ===
        courseSectionData[currentSectionIndex].subSection.length - 1
    )
      return true;
    else return false;
  };

  const goToNextVideo = () => {
    console.log("inside the go to next");
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const currentSubsectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((data) => data._id === subsectionId);

    const noOfSubSections =
      courseSectionData[currentSectionIndex].subSection.length;

    if (currentSubsectionIndex !== noOfSubSections - 1) {
      console.log("something", courseSectionData[currentSectionIndex]);
      const nextSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubsectionIndex + 1
        ]._id;

      navigate(
        `/view-course/course/${courseId}/section/${sectionId}/subsection/${nextSubSectionId}`
      );
    } else {
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
      const firstSubsectionId =
        courseSectionData[currentSectionIndex + 1].subSection[0]._id;
      navigate(
        `/view-course/course/${courseId}/section/${nextSectionId}/subSection/${firstSubsectionId}`
      );
    }
  };

  const goToPrevVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const currentSubsectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((data) => data._id === subsectionId);

    const noOfSubSections =
      courseSectionData[currentSectionIndex].subSection.length;

    if (currentSubsectionIndex !== 0) {
      const prevSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubsectionIndex - 1
        ]._id;

      navigate(
        `/view-course/course/${courseId}/section/${sectionId}/subsection/${prevSubSectionId}`
      );
    } else {
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
      const lastSubsectionId =
        courseSectionData[currentSectionIndex - 1].subSection[
          courseSectionData[currentSectionIndex - 1].subSection.length - 1
        ]._id;

      navigate(
        `/view-course/course/${courseId}/section/${prevSectionId}/subSection/${lastSubsectionId}`
      );
    }
  };

  const handleLectureCompletion = async () => {
    // yaha kam krna h abhi
    setLoading(true);

    const res = await markLectureAsComplete(
      {
        courseId: courseId,
        subsectionId: subsectionId,
      },
      token
    );

    if (res) dispatch(updateCompletedLectures(subsectionId));

    setLoading(false);
  };
  return (
    <div className="text-white px-5 h-[calc(100vh-3.5rem)] overflow-y-scroll scrollbar-hide">
      {!videoData ? (
        <div>No data found</div>
      ) : (
        <div className="relative w-full aspect-video">
          <ReactPlayer
            className="absolute top-0 left-0"
            src={videoData?.videoUrl}
            playsinline
            height="100%"
            width="100%"
            controls
            style={{ backgroundColor: "#000000" }}
            onEnded={() => {
              setVideoEnded(true);
            }}
            ref={playerRef}
          />
          {videoEnded && (
            <div>
              {!completedLectures.includes(subsectionId) && (
                <div>

                  <IconButton
                    disabled={loading}
                    onclick={() => handleLectureCompletion()}
                    text={!loading ? "Mark as complete" : "Loading..."}
                    customClasses={
                      "bg-yellow-50 absolute top-[40%] left-[45%] bg-caribbeangreen-300"
                    }
                  />
                </div>
              )}
              <IconButton
                disabled={loading}
                onclick={() => {
                  if (playerRef?.current) {
                    playerRef.current?.seekTo(0);
                    setVideoEnded(false);
                  }
                }}
                
                customClasses={"text-xl absolute top-[50%] left-[50%]"}
              >
<CiRedo/>
              </IconButton>
              <div className="flex justify-between px-6 bg-richblack-800 py-3">
                {!isFirstVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToPrevVideo}
                    className="bg-yellow-50
                    py-2 px-3 rounded-md text-richblack-900"
                  >
                    Prev
                  </button>
                )}

                {!isLastVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToNextVideo}
                    className="bg-yellow-50
                    py-2 px-3 rounded-md text-richblack-900 "                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      <div className="bg-richblack-800 p-4">
        <h1 className="text-3xl text-richblack-5 mb-2">{videoData?.title}</h1>
        <p className="text-richblack-100">{videoData?.description}</p>
      </div>
    </div>
  );
};

export default VideoDetails;
