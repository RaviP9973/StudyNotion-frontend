import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { profileEndpoints } from "../apis";
import { clearAuthState } from "../../slices/authSlice";

const {
  GET_USER_ENROLLED_COURSES_API,
  UPDATE_PROFILE_PICTURE_API,
  UPDATE_USER_DETAILS_API,
  DELETE_USER_PROFILE_API,
  GET_INSTRUCTOR_DATA_API,
} = profileEndpoints;
// CONST {  } = profileEndpoints
export async function getUserEnrolledCourses(token) {
  let result = [];
  try {
    
    if(!token){
      toast.error("Please login again to continue");
      return;
    }
    // console.log("before the calling of backend");
    console.log("courses api key", GET_USER_ENROLLED_COURSES_API)
    console.log("token", token)
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response?.data?.data;
  } catch (error) {
    const serverMessage = error?.response?.data?.message;
    console.log("Get use enrolled courses api errpr...", error);
    toast.error(serverMessage || error.message);
  }
  return result;
}

export async function updateProfilePicture( pfp) {
  const toastId = toast.loading("Uploading...");
  try {
    const formData = new FormData();
    // console.log("profile: ",pfp);
    formData.append("pfp", pfp);

    const response = await apiConnector(
      "PUT",
      UPDATE_PROFILE_PICTURE_API,
      formData,
    );

    console.log("update dp api response..", response);
    // console.log("data ",response.image);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Profile Picture Updated");
    const imageUrl = response.data.image;
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("user")),
        image: imageUrl,
      })
    );
  } catch (error) {
    console.log("Error in updating profile picture..", error.message);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
}

export async function updatePersonalDetails( formData) {
  const toastId = toast.loading("updating details...");
  try {
    // console.log(token);
    // console.log(formData);
    const { firstName, lastName, dateOfBirth, gender, contactNumber, about } =
      formData;
    const response = await apiConnector(
      "PUT",
      UPDATE_USER_DETAILS_API,
      { firstName, lastName, dateOfBirth, gender, contactNumber, about }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    console.log("update user details api response", response);
    const user = JSON.parse(localStorage.getItem("user"));
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.additionalDetails.dateOfBirth =
      dateOfBirth || user.additionalDetails.dateOfBirth;
    user.additionalDetails.contactNumber =
      contactNumber || user.additionalDetails.contactNumber;
    user.additionalDetails.about = about || user.additionalDetails.about;
    user.additionalDetails.gender = gender;
    localStorage.setItem("user", JSON.stringify(user));

    toast.success("Profile details updated");
  } catch (error) {
    console.log(error);
    console.log("Error in updating profile api ....", error.message);
    toast.error(error.message);
  }

  toast.dismiss(toastId);
}
export async function deleteProfileFunction(
  password,
  navigate,
  dispatch
) {
  const toastId = toast.loading("Deleting Your Profile");
  try {
    // console.log("yaha aa gya");
    const response = await apiConnector(
      "DELETE",
      DELETE_USER_PROFILE_API,
      { password }
    );

    console.log("response....", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Account Deleted");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(clearAuthState());
    navigate("/login");
  } catch (error) {
    // toast.dismiss(toastId);
    console.log("Errorr in deleting profile...", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
}

export async function getInstructorData(token) {
  let result = [];
  const toastId = toast.loading("loading...");

  try {
    const res = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
      Authorization: `Bearer ${token}`
    })
    console.log("GEt_Insructor api response", res);
    if (!res.data.success) {
      throw new Error("Error in geting getInstructorDAta");

    }

    result = res.data.data;

  } catch (error) {
    console.log("Error while get Instructor dashboard with stats api error ...", error);
    toast.error("Could not get instructor data");
  }

  toast.dismiss(toastId);
  return result;
}
