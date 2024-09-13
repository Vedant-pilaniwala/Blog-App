import React from 'react'
import { Link } from 'react-router-dom'
import dbServices from '../appwrite/postServices'

function PostCard({ userId, featuredImg, title }) {
  return (
    <Link to={`/posts/${userId}`}>
        <div className='w-full h-full bg-gray-200 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={dbServices.getFilePreview(featuredImg)} alt={title}
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
