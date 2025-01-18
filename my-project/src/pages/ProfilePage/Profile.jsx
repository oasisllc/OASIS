import { FaRegCalendarAlt } from "react-icons/fa";
import { CiCamera } from "react-icons/ci";
import "./Profile.css";
import defaultImg from "/src/assets/default profile image.png";
import UploadPicture from "./UploadPicture";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { use } from "react";

export const Profile = (props) => {
  const stats = { Bookings: 0, Completed: 9, Pending: 28, Cancelled: 19 };
  const [uploadOpen, setUploadOpen] = useState(false); // Controls the upload modal visibility
  const [profileImg, setProfileImg] = useState(props.profileImg || defaultImg); // State for profile image
  const [firstName, setFirstName] = useState(props.firstName || "John");
  const [lastName, setLastName] = useState(props.lastName || "Doe");
  const [username, setUsername] = useState(props.username || "johndoe");

  const location = useLocation();
  const user = location.state?.user;
  console.log(user)

  // Function to handle the profile picture update
  const handleProfilePictureUpdate = (newImage) => {
    setProfileImg(newImage); // Update the profile picture
    setUploadOpen(false); // Close the modal
  };

  return (
    <>
      {uploadOpen && (
        <UploadPicture
          onClose={() => setUploadOpen(false)}
          onImageUpload={handleProfilePictureUpdate}
        />
      )}

      <div id="profile" className="w-screen h-screen bg-neutral-900 flex flex-row overflow-hidden">
        <div className="w-full fixed h-14 px-8 bg-neutral-950 flex justify-between items-center">
          <div className="flex items-center text-lg gap-x-2 text-yellow-200">
            <h1 className="font-semibold text-lg">Profile</h1>
          </div>
        </div>

        <div className="w-full h-full flex items-center justify-center p-16 gap-8">
          {/* Profile Card */}
          <div
            style={{
              boxShadow: "0px 0px 10px rgba(255, 233, 0, 1)",
              borderRadius: "24px",
            }}
            className="w-1/4 border min-w-44 border-yellow-200 h-96 rounded items-center block p-2"
          >
            <div className="w-full h-36 items-center justify-center flex border-b border-neutral-800 flex-col gap-y-2 relative">
              <div
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
                className="bg-yellow-50 relative"
              >
                <img
                  className="w-full h-full object-cover"
                  src={profileImg}
                  alt="Profile"
                />
                <button
                  onClick={() => setUploadOpen(true)}
                  className="fixed w-auto text-yellow-300 bg-neutral-900 rounded-full"
                >
                  <CiCamera />
                </button>
              </div>
              <h1 className="text-xs font-light">{props.name || "John Doe"}</h1>
            </div>

            <div className="w-full h-60  justify-center px-4">
              {Object.entries(stats).map(([stat, count], index) => (
                <div
                  key={index}
                  className="w-full justify-between pb-2 border-yellow-300 border-opacity-25 border-b items-center flex"
                >
                  <h1 className="font-light text-sm">{stat}</h1>
                  <h1 className="text-sm">{count}</h1>
                </div>
              ))}
            </div>
          </div>

          {/* Editable Form */}
          <div
            style={{
              boxShadow: "0px 0px 10px rgba(255, 233, 0, 1)",
              borderRadius: "24px",
            }}
            className="border border-yellow-200 w-3/4 h-96 flex flex-col text-white rounded shadow-lg"
          >
            <div className="w-full h-14 rounded-3xl justify-center flex">
              <h1 className="text-2xl">
                Hi {user.username ?? "John"}
              </h1>
            </div>

            <div className="p-4 w-full h-3/4 justify-center flex flex-col items-center">
              <form className="justify-center text-neutral-400 translate-y-14 transform w-3/4 h-full flex flex-col gap-y-4 md:flex-wrap md:w-full items-center ">
                <div className="flex flex-col gap-y-1">
                  <label htmlFor="fname" className="text-sm font-light">
                    First Name:
                  </label>
                  <input
                    id="fname"
                    type="text"
                    value={user.username || "John"}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your first name"
                    className="p-2 rounded bg-neutral-950 text-sm h-6"
                  />
                </div>

                <div className="flex flex-col gap-y-1">
                  <label htmlFor="lname" className="text-sm font-light">
                    Last Name:
                  </label>
                  <input
                    id="lname"
                    type="text"
                    value={user.email || ""}  
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter your last name"
                    className="p-2 rounded bg-neutral-950 text-sm h-6"
                  />
                </div>

                <div className="flex flex-col gap-y-1">
                  <label htmlFor="email" className="text-sm font-light">
                    Email:
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={props.email || "example@example.com"}
                    readOnly
                    className="p-2 rounded bg-neutral-950 text-sm h-6"
                  />
                </div>

                <div className="flex flex-col gap-y-1">
                  <label htmlFor="username" className="text-sm font-light">
                    Username:
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={user.username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="p-2 rounded bg-neutral-950 text-sm h-6"
                  />
                </div>
              </form>

              <button
                type="submit"
                className="translate-y-4  md:translate-y-0 max-w-48 rounded-2xl active:scale-90 bg-neutral-900 hover:text-yellow-100 text-yellow-300 font-semibold hover:scale-110  hover:bg-neutral-900"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
