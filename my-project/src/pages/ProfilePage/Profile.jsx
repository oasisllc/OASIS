import { FaRegCalendarAlt } from "react-icons/fa";
import { CiCamera } from "react-icons/ci";
import "./Profile.css";
import defaultImg from "/src/assets/default profile image.png";
import UploadPicture from "./UploadPicture";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import NavigationPanel from "../homepage/NavigationPanel";
import { useEffect } from "react";
export const Profile = (props) => {
  const location = useLocation();
  const user = location.state?.user;

  const stats = { Bookings: 0, Completed: 9, Pending: 28, Cancelled: 19 };
  const [uploadOpen, setUploadOpen] = useState(false); // Controls the upload modal visibility
  const [profileImg, setProfileImg] = useState(props.profileImg || defaultImg); // State for profile image
  const [firstName, setFirstName] = useState(props.firstName || "John");
  const [lastName, setLastName] = useState(props.lastName || "Doe");
  const [username, setUsername] = useState(props.username || "johndoe");
  const [showNavPanel, setShowNavPanel] = useState(false);
  
  // Function to handle the profile picture update
  const handleProfilePictureUpdate = (newImage) => {
    setProfileImg(newImage); // Update the profile picture
    setUploadOpen(false); // Close the modal
  };

  useEffect(() => {
      const handleMouseMove = (e) => {
        if (e.clientX < 150) {
          setShowNavPanel(true);
        } else {
          setShowNavPanel(false);
        }
      };
  
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

  return (
    <>
      <NavigationPanel showPanel={showNavPanel}/>


      {uploadOpen && (
        <UploadPicture
          onClose={() => setUploadOpen(false)}
          onImageUpload={handleProfilePictureUpdate}
        />
      )}

      <div id="profile" className="w-screen h-screen bg-gray-100 flex flex-row overflow-hidden">
        {/* Top Bar */}
        <div className="w-full fixed h-14 px-8 bg-green-500 flex justify-between items-center shadow-md">
          <h1 className="text-lg text-white font-semibold">Profile</h1>
        </div>

        {/* Content Section */}
        <div className="w-full h-full flex items-center justify-center p-16 gap-8 pt-20">
          {/* Left: Profile Card */}
          <div
            className="w-1/4 shadow-2xl bg-white border min-w-44 border-green-200 h-96 rounded-xl flex flex-col items-center p-4"
          >
            <div className="w-full h-36 flex flex-col items-center justify-center gap-y-2 relative border-b border-gray-200 pb-4">
              <div
                style={{ width: "90px", height: "90px", borderRadius: "50%", overflow: "hidden" }}
                className="bg-gray-100 relative"
              >
                <img
                  className="w-full h-full"
                  src={profileImg}
                  alt="Profile"
                />
                <button
                  onClick={() => setUploadOpen(true)}
                  className="fixed -translate-y-6 z-20  bg-green-500 text-white p-2 rounded-full shadow-md hover:bg-green-600 transition"
                >
                  <CiCamera />
                </button>
              </div>
              <h1 className="text-sm text-green-600 font-medium">{props.name || "John Doe"}</h1>
            </div>

            <div className="w-full h-60 flex flex-col gap-4 px-4 pt-4">
              {Object.entries(stats).map(([stat, count], index) => (
                <div
                  key={index}
                  className="w-full flex justify-between text-gray-700 border-b border-gray-200 pb-2"
                >
                  <h1 className="font-light text-sm">{stat}</h1>
                  <h1 className="font-medium text-sm">{count}</h1>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Editable Profile Section */}
          <div
            className="border border-green-200 w-3/4 h-96 bg-white rounded-xl shadow-lg flex flex-col"
          >
            <div className="w-full h-14 flex items-center justify-center border-b border-gray-200">
              <h1 className="text-2xl font-semibold text-green-600">
                Hi {user?.username || "John"}
              </h1>
            </div>

            <div className="p-6 flex flex-col items-center gap-6">
              <form className="w-full text-green-500 max-w-lg flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label htmlFor="fname" className="text-sm font-medium text-gray-600">
                    First Name:
                  </label>
                  <input
                    id="fname"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your first name"
                    className="p-2 w-48 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-green-200"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="lname" className="text-sm font-medium text-gray-600">
                    Last Name:
                  </label>
                  <input
                    id="lname"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter your last name"
                    className="  p-2 w-48 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-green-200"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="email" className="text-sm font-medium text-gray-600">
                    Email:
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={props.email || "example@example.com"}
                    readOnly
                    className="p-2 w-48 rounded border border-gray-300 bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="username" className="text-sm font-medium text-gray-600">
                    Username:
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="p-2 w-48 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-green-200"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 mt-4 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
