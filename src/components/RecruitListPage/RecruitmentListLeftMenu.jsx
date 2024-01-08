import React from 'react'
import TopMenu from '../SideMenu/SelfBriefSideMenu'
import HotRecruitmentList from '../SideMenu/HotRecruitmentList'
import Margin from '../ui/Margin'

function RecruitmentListLeftMenu() {
  return (
    <>
        <TopMenu />
        <Margin plustailwind={"h-12"}></Margin>
        <HotRecruitmentList />
    </>
  )
}

export default RecruitmentListLeftMenu