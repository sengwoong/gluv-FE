import {React, useState} from 'react'

import Content from '../components/PostListPage/Content'
import PostListLeftMenu from '../components/PostListPage/PostListLeftMenu'

function PostListPage() {
  return (
    <div className='flex'>
    <PostListLeftMenu/>
    <Content />
    </div>
  )
}

export default PostListPage