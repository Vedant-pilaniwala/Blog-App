import React from 'react'
import { Link } from 'react-router-dom'
import services from '../appwrite/postServices'

function PostCard({ $id, featuredImg, title }) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={services.getFilePreview(featuredImg)} alt={title}
                className='rounded-xl' />

            </div>
            <h2
            className='text-xl text-center font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard
