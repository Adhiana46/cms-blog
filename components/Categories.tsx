import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { getCategories } from '../services'

const Categories = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getCategories()
      .then((newCategories) => setCategories(newCategories))
  }, [])

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 mb-8 pb-12'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
        Categories
      </h3>
      {categories.map((category:any, index) => (
        <Link key={category.slug} href={`/category/${category.slug}`}>
          <span className='cursor-pointer block pb-3 mb-3 hover:text-pink-600'>
          {/* className='rounded-full border-2 border-pink-600 px-2 py-1 font-small text-xs text-grey-600 ml-1 cursor-pointer hover:bg-pink-600 hover:text-white transition duration-500 transform' */}
            { category.name }
          </span>
        </Link>
      ))}
    </div>
  )
}

export default Categories