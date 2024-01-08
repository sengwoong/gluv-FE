import React from 'react'

import SelfBriefSideMenu from '../SideMenu/SelfBriefSideMenu'
import PostListSideBottomMenu from './PostListSideBottomMenu'
import Margin from '../ui/Margin'

function PostListLeftMenu() {
  return (
    <div className='flex flex-col'>
    <div><SelfBriefSideMenu></SelfBriefSideMenu></div>
    <Margin plustailwind={"h-12"}></Margin>
    <div><PostListSideBottomMenu></PostListSideBottomMenu></div>
    </div>
  )
}

export default PostListLeftMenu