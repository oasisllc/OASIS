import { MdDriveFolderUpload } from "react-icons/md";
import { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";

const UploadPicture = ({ onClose, onImageUpload }) => {
  const [imagePreview, setImagePreview] = useState(null);

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
    if (imagePreview) {
      setImagePreview(null);
    } else {
      onClose();
    }
  };

  return (
    <div className="z-30 fixed inset-0 flex backdrop-blur-sm items-center justify-center bg-black bg-opacity-30">
      {/* Modal Container */}
      <div
        style={{
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
          borderRadius: "16px",
        }}
        className="w-11/12 md:w-1/2 lg:w-1/3 bg-white rounded-lg flex flex-col items-center p-6 relative"
      >
        <button
          onClick={onClose}
          className="absolute z-50 top-4 right-4 text-gray-400 hover:text-red-500 transition duration-200"
        >
          <IoMdCloseCircle size={32} />
        </button>

        {/* Upload Area */}
        <div className="w-full h-60 bg-gray-100 flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 relative hover:bg-gray-200 transition duration-200">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-40 h-40 rounded-full object-cover"
            />
          ) : (
            <>
              <MdDriveFolderUpload className="text-5xl text-gray-400" />
              <span className="mt-4 text-gray-600 font-medium">
                Drag & Drop or Click to Upload
              </span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileChange}
          />
        </div>

        {/* Button Section */}
        <div className="w-full flex items-center justify-between mt-6">
          <button
            className="w-1/2 py-2 text-white bg-green-500 hover:bg-green-300 rounded-lg transition duration-200 mr-2 font-semibold"
            onClick={() => {
              if (imagePreview) onImageUpload(imagePreview);
            }}
          >
            Upload
          </button>

          <button
            className="w-1/2 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition duration-200 ml-2 font-semibold"
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
