import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
// @ts-ignore - sounds.js doesn't have type definitions
import { dropSound } from "~/utils/sounds";

function ImageUpload({ previewProp }: { previewProp?: string | null }) {
  const [preview, setPreview] = useState<string | null>(previewProp || null);

  console.log("Current Preview:", previewProp);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      dropSound();
      const file = acceptedFiles[0];
      const url = URL.createObjectURL(file);
      setPreview(url);
      console.log(url);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  // Clean up the URL on unmount or when a new image is selected
  useEffect(() => {
    return () => {
      if (preview && preview !== previewProp) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div
      {...getRootProps()}
      style={{
        border: `${!preview ? "2px dashed gray" : "none"}`,
        padding: 20,
        aspectRatio: "3/4",
        width: "100%",
        maxHeight: "370px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <input {...getInputProps()} name="pic" />

      {preview ? (
        <img
          src={preview}
          alt="preview"
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      ) : isDragActive ? (
        <p>Drop the image here...</p>
      ) : (
        <p>Drag 'n' drop an image here, or click to select</p>
      )}
    </div>
  );
}

export default ImageUpload;
