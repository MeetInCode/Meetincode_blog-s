import React, { useEffect, useState } from "react";
import Service from "../appwrite/config";
import { Container, Postcard } from "../components/index";

function Home() {
  const [posts, setPosts] = useState([]); // Initialize as null to handle loading state

  useEffect(() => {
    Service.getAllblogpost2()
      .then((response) => {
        console.log("Response from API:", response); // Log the full response
        if (response.length >= 1) {
          setPosts(response); // Update posts if documents exist
          console.log("Posts set:", response); // Log the documents being set
        } else {
          setPosts([]); // Set empty array if no documents found
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setPosts([]); // Handle error by setting posts to empty array
      });
  }, []);

  // Log posts state to debug rendering
  useEffect(() => {
    console.log("Posts state:", posts); // Check what is being set in the state
  }, [posts]);

  if (posts === null) {
    // Show loading state
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Loading...
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (posts && posts.length === 0) {
    // Handle empty state
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                No posts available
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((posts) => (
            <div key={posts.$id} className="p-2 w-1/4">
              <Postcard
                title={posts.title} // Ensure you're passing the right props
                description={posts.description}
                featuredimage={posts.featuredImage} // Adjust based on Postcard's expectations
                {...posts} // Spread the rest of the post data, in case other props are needed
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
