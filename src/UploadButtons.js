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

  const checkAndUploadFile = (file) => {
    const storageRef = ref(storage, "uploads");
    // List all files in the 'uploads/' directory
    listAll(storageRef)
      .then((listResults) => {
        const files = listResults.items;
        // Check the number of files, if it's 10 or more, delete the oldest
        if (files.length >= 10) {
          // Sort files by name assuming the name includes a timestamp or is formatted in such a way
          // that sorting them lexicographically results in the oldest being first
          const oldestFileRef = files.sort((a, b) =>
            a.name.localeCompare(b.name)
          )[0];
          // Delete the oldest file
          return deleteObject(oldestFileRef);
        }
      })
      .then(() => {
        // Proceed to upload the new file
        uploadFile(file);
      })
      .catch((error) => {
        console.error("Failed to upload new file:", error);
      });
  };

  const uploadFile = (file) => {
    const fileRef = ref(storage, `uploads/${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Update progress
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        // Handle errors
        console.error("Upload failed", error);
        setUploading(false);
      },
      () => {
        // Handle successful upload
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUploading(false);
          setUploadProgress(0);
          onFileUpload(downloadURL, file.name); // Callback after successful upload
        });
      }
    );
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true); // Start the upload process UI indication
    checkAndUploadFile(file); // Check if an existing file needs to be deleted before upload
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
