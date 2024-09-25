import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components/index";
import service from "../appwrite/config.js";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setPosts] = useState(null);
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

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
