// pages/index.js
import React, { useState, useEffect } from "react";
import { CssBaseline, Container, Typography } from "@mui/material";
import UploadButtons from "../src/UploadButtons";
import FileList from "../src/FileList";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase-config"; // Ensure this points to your Firebase config file

export default function Home() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Function to fetch existing files from Firebase
    const fetchFiles = async () => {
      const filesRef = ref(storage, "uploads/"); // Reference to your files folder in storage
      try {
        // List all files in the 'uploads/' directory
        const listResponse = await listAll(filesRef);

        // Create an array of URL promises for all files found
        const urlPromises = listResponse.items.map((itemRef) =>
          getDownloadURL(itemRef)
        );

        // Resolve all URL promises to get the actual URLs
        const urls = await Promise.all(urlPromises);

        // Map over the URLs to create file objects with URLs and names
        const filesData = urls.map((url, index) => ({
          name: listResponse.items[index].name, // Extracting the file name from the reference
          url: url, // The URL we obtained from the promise
        }));

        setFiles(filesData); // Set the files in state
      } catch (error) {
        console.log(error);
        // Handle any errors in a real app
      }
    };

    fetchFiles();
  }, []);

  const handleFileUpload = (url, name) => {
    setFiles((prevFiles) => [...prevFiles, { url, name }]);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md" align="center">
        <Typography variant="h2" gutterBottom>
          File Upload with NextJS, Material UI, and Firebase
        </Typography>
        <div>
          <UploadButtons onFileUpload={handleFileUpload} />
          <FileList files={files} />
        </div>
      </Container>
    </React.Fragment>
  );
}
