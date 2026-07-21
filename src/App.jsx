import "./App.css";
import { useEffect, Suspense, lazy } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import AnimatedPage from "./components/common/AnimatedPage";
import Navbar from "./components/common/Navbar";
import OpenRoute from "./components/core/Auth/OpenRoute";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./services/operations/authAPI";

// Lazy load Pages
const Home = lazy(() => import("./Pages/Home"));
const Login = lazy(() => import("./Pages/Login"));
const Signup = lazy(() => import("./Pages/Signup"));
const ForgotPassword = lazy(() => import("./Pages/ForgotPassword"));
const UpdatePassword = lazy(() => import("./Pages/UpdatePassword"));
const VerifyEmail = lazy(() => import("./Pages/VerifyEmail"));
const About = lazy(() => import("./Pages/About"));
const Contact = lazy(() => import("./Pages/Contact"));
const Dashboard = lazy(() => import("./Pages/Dashboard"));
const Catelog = lazy(() => import("./Pages/Catelog"));
const CourseDetails = lazy(() => import("./Pages/CourseDetails"));
const ViewCourse = lazy(() => import("./Pages/ViewCourse"));
const Error = lazy(() => import("./Pages/Error"));

// Lazy load Dashboard/Course components
const MyProfile = lazy(() => import("./components/core/Dashboard/MyProfile"));
const Setting = lazy(() => import("./components/core/Dashboard/Setting"));
const EnrolledCourses = lazy(() => import("./components/core/Dashboard/EnrolledCourses"));
const Cart = lazy(() => import("./components/core/Dashboard/Cart"));
const PurchaseHistory = lazy(() => import("./components/core/Dashboard/PurchaseHistory"));
const AddCourse = lazy(() => import("./components/core/Dashboard/AddCourse"));
const MyCourses = lazy(() => import("./components/core/Dashboard/InstructorCourses/MyCourses"));
const EditCourse = lazy(() => import("./components/core/Dashboard/EditCourse"));
const Instructor = lazy(() => import("./components/core/Dashboard/InstructorDashboard/Instructor"));
const VideoDetails = lazy(() => import("./components/core/ViewCourse/VideoDetails"));


function App() {
  const { user } = useSelector((state) => state.profile);
  const { darkMode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Apply/remove theme class on the html element
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.remove("light-mode");
    } else {
      root.classList.add("light-mode");
    }
  }, [darkMode]);

  useEffect(() => {
    const handleTokenExpired = () => {
      dispatch(logout(navigate));
    };

    window.addEventListener("token-expired", handleTokenExpired);
    return () => {
      window.removeEventListener("token-expired", handleTokenExpired);
    };
  }, [dispatch, navigate]);

  // useEffect(()=>{
  //   console.log(user.accountType);
  // },[])

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <div className={`w-screen min-h-screen flex flex-col font-inter transition-colors duration-500 ${
      darkMode ? "bg-richblack-900" : "bg-richblack-5"
    }`}>
      <Navbar />
      <div className="mt-14">

        <AnimatePresence mode="wait">
        <Suspense fallback={<div className="grid min-h-[calc(100vh-3.5rem)] place-items-center"><div className="loader"></div></div>}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
          <Route path="/catalog/:catalogName" element={<AnimatedPage><Catelog /></AnimatedPage>} />
          <Route path="/courses/:courseId" element={<AnimatedPage><CourseDetails /></AnimatedPage>} />
          <Route
            path="/login"
            element={
              <AnimatedPage>
                <OpenRoute>
                  <Login />
                </OpenRoute>
              </AnimatedPage>
            }
          />
          <Route
            path="/signup"
            element={
              <AnimatedPage>
                <OpenRoute>
                  <Signup />
                </OpenRoute>
              </AnimatedPage>
            }
          />
          <Route path="/forgot-password" element={<AnimatedPage><ForgotPassword /></AnimatedPage>} />
          <Route
            path="/update-password/:id"
            element={
              <AnimatedPage>
                <OpenRoute>
                  <UpdatePassword />
                </OpenRoute>
              </AnimatedPage>
            }
          />
          <Route path="/verify-email" element={<AnimatedPage><VerifyEmail /></AnimatedPage>} />
          <Route path="/about" element={<AnimatedPage><About /></AnimatedPage>} />
          <Route path="/contact" element={<AnimatedPage><Contact /></AnimatedPage>} />

          <Route
            element={
              <AnimatedPage>
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              </AnimatedPage>
            }
          >
            <Route path="dashboard/my-profile" element={<MyProfile />} />
            <Route path="dashboard/setting" element={<Setting />} />

            {user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route
                  path="dashboard/enrolled-courses"
                  element={<EnrolledCourses />}
                />
                <Route path="dashboard/cart" element={<Cart />} />
                <Route
                  path="dashboard/purchase-history"
                  element={<PurchaseHistory />}
                />
              </>
            )}

            {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="dashboard/add-course" element={<AddCourse />} />
                <Route path="dashboard/instructor" element={<Instructor />} />

                <Route path="dashboard/my-courses" element={<MyCourses />} />

                <Route
                  path="dashboard/edit-course/:courseId"
                  element={<EditCourse />}
                />
              </>
            )}
          </Route>

          <Route element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }>
            {
              user?.accountType === ACCOUNT_TYPE.STUDENT && (
                <>
                  <Route path="view-course/course/:courseId/section/:sectionId/subSection/:subsectionId" element={<VideoDetails />} />
                </>
              )
            }
          </Route>

          <Route path="*" element={<AnimatedPage><Error /></AnimatedPage>} />
        </Routes>
        </Suspense>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
