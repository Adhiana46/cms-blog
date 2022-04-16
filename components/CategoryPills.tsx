import React from 'react'
import Link from 'next/link'

const CategoryPills = ({ categories, align }:any) => {
  align = align || 'center'

  return (
    <div className={`mb-8 text-${align}`}>
        {categories.map((category, index) => (
            <label key={index} className='rounded-full border-2 border-pink-600 px-2 py-1 font-small text-xs text-grey-600 ml-1 cursor-pointer hover:bg-pink-600 hover:text-white transition duration-500 transform'>
                <Link href={`/category/${category.slug}`}>
                    {category.name}
                </Link>
            </label>
        ))}
    </div>
  )
}

export default CategoryPills