import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import dbServices from "../appwrite/postServices";
import { Container, Button } from "../Components/index";
import parse from "html-react-parser";
import { deletePost as postDelete } from "../Redux/Slice/postSlice";

function Post() {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const { slug } = useParams();
  const userData = useSelector((state) => state.auth.userData.userData);
  const dispatch = useDispatch();

  const isAuthor = userData && post ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      dbServices.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else navigate("/");
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = () => {
    dbServices.deletePost(post.$id).then((status) => {
      if (status) {
        dbServices
          .deleteFile(post.featuredImg)
          .then((status) => {
            if (status) dispatch(postDelete(post.$id));
          })
          .finally(() => {
            navigate("/");
          });
      }
    });
  };

  return (
    post && (
      <Container className="p-7 my-14">
        <div className="w-full p-3">
          <img
            className="shadow-2xl z-0 w-full rounded-2xl"
            src={dbServices.getFilePreview(post.featuredImg)}
          />
          {isAuthor && (
            <div className="z-50 absolute top-full right-36">
              <Link to={`/edit-post/${post.$id}`}>
                <Button className="w-44 mr-7 h-20 text-white text-2xl font-semibold px-6 bg-gradient-to-r from-green-600 to-green-800 rounded-lg">
                  Edit
                </Button>
              </Link>
              <Button
                className="w-44 h-20 text-white text-2xl font-semibold px-6 bg-gradient-to-r from-red-600 to-red-800 rounded-lg"
                onClick={deletePost}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full p-3">
          <h1 className="text-5xl font-bold">{post.title}</h1>
          <div className="p-3 pl-1 text-medium text-2xl">
            {parse(post.content)}
          </div>
        </div>
      </Container>
    )
  );
}

export default Post;
