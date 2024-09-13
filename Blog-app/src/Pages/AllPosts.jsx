import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../Components/";
import { useSelector } from "react-redux";

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const postsArr = useSelector((state) => state.posts.posts);
  
    useEffect(() => {
      setPosts(postsArr)
    }, [postsArr]);

    if (posts.length === 0) {
        return (
            <Container className="flex justify-center py-auto" >
                <h1 className="text-center text-gray-900 mx-auto text-6xl font-bold my-16">
                   No posts found
                </h1>
            </Container>
        );
      } else if (posts.length !== 0) {
        return (
            <Container className="flex p-8 items-center">
                <ul className="flex p-5 gap-7">
                    {posts.map((post) => {
                      if(post.status === 'active') {
                        return (
                          <li key={post.$id} className="p-3 w-60 h-72">
                              <PostCard {...post} />
                          </li>
                        )
                      }
                    })}
                </ul>
            </Container>
        );
      }
}

export default AllPosts