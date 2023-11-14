// FileList.js
import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export default function FileList({ files }) {
  return (
    <ImageList sx={{ width: "100%", height: "auto" }} cols={3} gap={8}>
      {files.map((file, index) => (
        <ImageListItem key={index}>
          <img
            src={`${file.url}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${file.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={file.name}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
