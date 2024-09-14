import axios from "axios";
import { useState } from "react";
import Navbar2 from './Navbar2';
import Chat from "./chatMessage";

const buttonStyle = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease-in-out', 
  cursor: 'pointer', 
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
};

const handleButtonHover = (event) => {
  event.target.style.transform = 'scale(1.05)'; // Scale up button on hover
};

const handleButtonLeave = (event) => {
  event.target.style.transform = 'scale(1)'; // Reset button scale on hover out
};

function ImageUploader() {
  const [showSeverity, setShowSeverity] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [severityLoading, setSeverityLoading] = useState(false);

  const Logout = () => {
    localStorage.clear();
    window.location.reload();
    history.back();
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [message, setMessage] = useState("");
  const [confidence, setConfidence] = useState("");
  const [prediction, setPrediction] = useState("");
  const [showResult, setShowResult] = useState(false);

  const toggleSeverity = async () => {
    setSeverityLoading(true); // Set severity loading to true when severity button is pressed
    const formData = new FormData();
    formData.append("email", localStorage.getItem("email"));

    try {
      const response = await fetch("http://127.0.0.1:8000/explanation/", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        setShowSeverity(!showSeverity);
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.error("Error response:", error.response);
      }
    } finally {
      setSeverityLoading(false); // Reset severity loading state after request completes
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setUploadLoading(true); // Set upload loading to true when upload button is pressed

    if (!selectedImage) {
      console.log("No image selected");
      setUploadLoading(false); // Reset upload loading state if no image selected
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("email", localStorage.getItem("email"));

    try {
      const response = await fetch("http://127.0.0.1:8000/upload/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setMessage(data.class);
      setConfidence(data.confidence);
      setShowResult(true);
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.error("Error response:", error.response);
      }
    } finally {
      setUploadLoading(false); // Reset upload loading state after request completes
    }
  };

  const handleImagePrediction = async () => {
    if (!selectedImage) {
      console.log("No image selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedImage);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/predict/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setPrediction(
        `Class: ${
          response.data.class
        }, Confidence: ${response.data.confidence.toFixed(2)}`
      );
    } catch (error) {
      console.error("Error predicting image:", error);
      if (error.response) {
        console.error("Error response:", error.response);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover" style={{backgroundImage: 'url(" ../../public/abcd.jpg")' , backgroundSize: '100% auto', // Adjusted backgroundSize for zooming out
    backgroundPosition: 'center'}}>
      <Navbar2 />
      <Chat />
<div className="bg-white bg-opacity-95 rounded-lg shadow-lg p-8">
  <h1 className="font-quicksand text-4xl font-bold mb-6 text-center text-gray-900">
          X-Ray Health Insight
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor="image-upload" className="block w-full mb-4">
            <div className="border-4 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition duration-300 ease-in-out">
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              Drop your files here
              <br />
              or
              <br />
              <span className="text-blue-500">Browse</span>
            </div>
          </label>
          {selectedImage && (
            <div className="flex justify-center">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected Image"
                className="max-h-64 rounded-lg"
              />
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="submit"
              className="py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-#A0DEFF-600 transition duration-300 ease-in-out"
              style={{ ...buttonStyle,
              backgroundColor: '#41C9E2'}}
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
            >
              {uploadLoading ? (
                <div className="loader"></div>
              ) : (
                "Upload Image"
              )}
            </button>
            <button
              type="button"
              onClick={toggleSeverity}
              className="py-3 px-4 bg-#FFF9D0-500 text-white rounded-lg hover:bg-#FFF9D0-600 transition duration-300 ease-in-out"
              style={{ ...buttonStyle,
                backgroundColor: '#58A399' }}
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
            >
              {severityLoading ? (
                <div className="loader"></div>
              ) : (
                "Show Severity"
              )}
            </button>
          </div>
        </form>

        {showResult && (
          <>
            <div className="mt-6 text-center">
              <p className="font-semibold text-lg">Class:</p>
              <p className="mt-2 text-gray-700">{message}</p>
            </div>
            <div className="mt-6 text-center">
              <p className="font-semibold text-lg">Confidence :</p>
              <p className="mt-2 text-gray-700">{confidence}</p>
            </div>
          </>
        )}

        {prediction && (
          <div className="mt-6 text-center">
            <p className="font-semibold text-lg">Prediction Result :</p>
            <p className="mt-2 text-gray-700">{prediction}</p>
          </div>
        )}

        {showSeverity && (
          <div className="image-result">
            <img src="final_image.png" alt="" />
          </div>
        )}

        <div className="flex justify-end mt-6">
          <button
            onClick={Logout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageUploader;