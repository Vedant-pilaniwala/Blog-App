import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import dbServices from '../appwrite/postServices';

function Post() {
  const [post, setPost] = useState(null)
  const { slug } = useParams();
  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData.userData);

  const isAuthor = slug && post ? post.$id === slug : false;

  useEffect(() => {
    if(slug) {
      dbServices.getPost(slug).then((post) => {
        if(post) {
          setPost(post)
        }
        else navigate('/')
      })
    } else {
      navigate('/')
    }
  }, [slug, navigate])

  
  return (
    <div></div>
  )
}

export default Post