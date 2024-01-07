import React from 'react'

import SelfBriefSideMenu from '../SideMenu/SelfBriefSideMenu'
import PostListSideBottomMenu from './PostListSideBottomMenu'

function PostListLeftMenu() {
  return (
    <div className='flex flex-col'>
    <div><SelfBriefSideMenu></SelfBriefSideMenu></div>
    <div><PostListSideBottomMenu></PostListSideBottomMenu></div>
    </div>
  )
}

export default PostListLeftMenu