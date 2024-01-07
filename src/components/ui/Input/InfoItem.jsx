import React from 'react'
import Margin from '../Margin'

function InfoItem({ title, content }) {
  return (
   
// Example of a reusable InfoItem component

    <div className='flex justify-start items-center'>
      <div className='font-bold text-lg'>{title}</div>
      <Margin left="1" plustailwind="w-3" />
      <div className='text-sm  text-gray-600'>{content}</div>
    </div>

  )
}

export default InfoItem