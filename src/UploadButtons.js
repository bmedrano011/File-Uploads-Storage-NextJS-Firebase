// UploadButtons.js
import React, { useState } from "react";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { storage } from "../firebase-config"; // Update the import path to where you store your firebase-config
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import LinearProgress from "@mui/material/LinearProgress";

export default function UploadButtons({ onFileUpload }) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleUpload = (event) => {
    const file = event.target.files[0]; // Get the file
    if (!file) return;

    const storageRef = ref(storage, `uploads/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setUploading(true); // Start the upload process

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Update the progress bar state
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        // Handle unsuccessful uploads
        console.error("Upload failed", error);
        setUploading(false); // Reset uploading state
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setUploading(false); // Reset uploading state
          setUploadProgress(0); // Reset progress bar
          onFileUpload(downloadURL, file.name); // Call the provided callback
        });
      }
    );
  };

  return (
    <div>
      <Button
        variant="contained"
        component="label"
        startIcon={<CloudUploadIcon />}
        disabled={uploading}
      >
        Upload Image
        <input
          hidden
          accept="image/png, image/jpeg, image/gif"
          type="file"
          onChange={handleUpload}
        />
      </Button>
      {uploading && (
        <LinearProgress variant="determinate" value={uploadProgress} />
      )}
    </div>
  );
}
