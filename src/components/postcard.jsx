/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import service from "../appwrite/config.js";
import { Link } from "react-router-dom";

// In Appwrite, it's $id and not id
function Postcard({ $id, title, featuredimage }) {
  const [imageSrc, setImageSrc] = useState([]); // State to hold the image URL

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const preview = await service.getfilepreview(featuredimage); // Wait for the Promise to resolve
        setImageSrc(preview); // Assuming preview.href is the correct URL
        console.log(imageSrc);
      } catch (error) {
        console.error("Error fetching file preview:", error);
      }
    };

    fetchImage(); // Call the async function
  }, [featuredimage]); // Dependency array to run this effect when featuredimage changes

  return (
    <Link to={`/edit-post/${$id}`}>
      <div className="w-full bg-gray-200 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={imageSrc} // Use the state for the src
            alt={title}
            className="w-full rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default Postcard;
