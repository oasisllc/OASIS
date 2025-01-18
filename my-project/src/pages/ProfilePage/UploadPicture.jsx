import { MdDriveFolderUpload } from "react-icons/md";
import { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";


const UploadPicture = ({ onClose, onImageUpload }) => {
  const [imagePreview, setImagePreview] = useState(null); // State for image preview

  // Function to handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result); // Set the preview image
      };
      reader.readAsDataURL(file);
    }
  };

  // Reset the selected image
  const handleCancel = () => {
    if (imagePreview){

        setImagePreview(null);
    }
    else{
        onClose();
    }



  };

  return (
    <div className="z-30 fixed w-screen h-screen flex backdrop-blur-sm p-16 items-center justify-center">
      {/* Modal Container */}
      <div
        style={{
          boxShadow: "0px 0px 10px rgba(255, 233, 0, 1)",
          borderRadius: "24px",
        }}
        className="w-3/4 h-3/4 md:w-1/2 bg-neutral-950 rounded-2xl border-yellow-300 items-center justify-center p-8 flex flex-col relative"
      >
        <button
          onClick={onClose}
          className=" absolute w-auto top-9 right-3 z-50"
        >
          <IoMdCloseCircle/>
        </button>

        {/* Upload Area */}
        <div className="w-full h-3/4 m-6 bg-neutral-900 flex flex-col rounded-2xl text-center items-center justify-center relative hover:bg-neutral-800 transition-all duration-300">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-40 h-40 rounded-full object-cover"
            />
          ) : (
            <>
              <MdDriveFolderUpload className="text-9xl text-yellow-300 opacity-20 scale-150" />
              <span className="absolute text-yellow-300 font-semibold text-lg">
                Drag & Drop to Upload
              </span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleFileChange}
          />
        </div>

        {/* Button Section */}
        <div className="w-full h-1/4 flex items-center justify-center gap-4 pt-8">
          <button
            className="px-6 py-2 text-sm font-semibold text-neutral-900 bg-yellow-300 rounded hover:bg-yellow-400 transition-all"
            onClick={() => {
                onImageUpload(imagePreview)
            }}
          >
            Upload
          </button>

          <button
            className="px-6 py-2 text-sm font-semibold text-neutral-900 bg-gray-300 rounded hover:bg-gray-400 transition-all"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadPicture;
