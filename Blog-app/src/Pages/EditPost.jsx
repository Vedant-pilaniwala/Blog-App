import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../Components'
import dbServices from '../appwrite/postServices'
import { useParams } from 'react-router-dom'

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams()

  useEffect(() => {
    if(slug) {
      dbServices.getPost(slug).then((post) => {
        setPost(post)
      })
    }
  }, [slug])

  return (
    <Container>
      <PostForm post={post ? post : null}/>
    </Container>
  )
}

export default EditPost