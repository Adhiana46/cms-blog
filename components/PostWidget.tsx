import React, { useState, useEffect } from 'react'
import moment from 'moment'
import Link from 'next/link'
import Image from 'next/image'
import { getRecentPosts, getSimilarPosts } from '../services'

const PostWidget = ({ categories, slug }:any) => {
  const [relatedPosts, setRelatedPosts] = useState([])

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug)
        .then((result) => setRelatedPosts(result))
    } else {
      getRecentPosts()
        .then((result) => setRelatedPosts(result))
    }
  }, [slug])

  console.log('relatedPosts', relatedPosts)

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
        { slug ? 'Related Posts' : 'Recent Posts' }
      </h3>
      {relatedPosts.map((post:any, index:number) => (
        <div key={index} className='flex items-center w-full mb-4'>
          <div className='w-16 flex-none'>
            <Image
              alt={post.title}
              unoptimized
              height="60px"
              width="60px"
              className='align-middle rounded-full'
              src={post.featuredImage.url}
            />
          </div>
          <div className='flex-grow ml-4'>
            <p className='text-gray-500 font-xs'>
              {moment(post.createdAt).format('MMMM DD, YYYY')}
            </p>
            <Link href={`/post/${post.slug}`} >
              <span className='hover:text-pink-600 cursor-pointer text-md'>{post.title}</span>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostWidget