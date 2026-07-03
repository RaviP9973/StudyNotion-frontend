import React from "react";
import RatingStars from "./RatingStars";

const ReviewCard = ({ review }) => {
  return (
    <div className="  bg-richblack-800 p-5 rounded-md h-[200px] flex flex-col gap-2">
      <div className="flex gap-2 items-center ">
        <img
          src={review?.user?.image}
          alt=""
          className="aspect-square w-10 rounded-full object-cover "
        />
        <div className="flex flex-col gap-1">
          <div className="flex gap-2">
            <p>{review?.user?.firstName}</p>
            <p>{review?.user?.lastName}</p>
          </div>
          <div>
            <p className="text-richblack-400">{review?.user?.email}</p>
          </div>
        </div>
      </div>
      <div>
        <p className="truncate text-richblack-100">{review?.review}</p>
      </div>

      <div className="flex flex-row gap-2 items-center">
        <p className="text-[#ffd700]">{(review?.rating ?? 0).toFixed(1)}</p>
        <RatingStars Review_Count={review?.rating || 0} Star_Size={24} />

      </div>
    </div>
  );
};

export default ReviewCard;
