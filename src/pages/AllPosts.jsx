import { React, useState, useEffect } from "react";
import { Container, Postcard } from "../components/index";
import service from "../appwrite/config";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log("Fetching posts..."); // Check if this runs
    const fetchPosts = async () => {
      try {
        const result = await service.getAllblogpost();
        console.log("API response:", result); // Log the response
        if (result) {
          setPosts(result);
          console.log("Fetched posts:", result); // Log the fetched posts
        } else {
          console.log("No posts found in the response.");
        }
      } catch (error) {
        console.error("Error fetching posts:", error); // Log any error
      }
    };

    fetchPosts();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <Postcard featuredimage={post.featuredImage} {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
