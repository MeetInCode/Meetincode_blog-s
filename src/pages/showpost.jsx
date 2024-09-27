import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components/index";
import service from "../appwrite/config.js";
import { useNavigate, useParams } from "react-router-dom";

function Showpost() {
  const [post, setPosts] = useState([]);
  const { slug } = useParams(); // extracts the slug parameter from the URL
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      console.log("hellooooooooooooooo", service, slug); // Check if `getoneblogpost` exists
      service
        .getoneblogpost(slug)
        .then((post) => {
          if (post) {
            setPosts(post);
            console.log("1234567890", post);
          } else {
            console.log("No posts found in the response.");
          }
        })
        .catch((err) => {
          console.error("Failed to fetch post:", err);
        });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  return (
    <>
      <div className="max-w-3xl mx-auto p-6 bg-background text-foreground">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center mb-4">
          <img
            src={`https://cloud.appwrite.io/v1/storage/buckets/66e5c28f001217d394ec/files/${post.featuredImage}/view?project=66e5bfa3002a157f8c81&mode=admin`}
            alt="Author's Avatar"
            className=" mr-2"
          />
        </div>
        {post && (
          <span className="text-muted-foreground">
            By userid - {post.userId} / last updated on -{" "}
            {new Date(post.$updatedAt).toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </span>
        )}
        {/* Render HTML content safely */}
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </>
  );
}

export default Showpost;
