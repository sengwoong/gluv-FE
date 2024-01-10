import React from 'react'



import TeamLeftMenu from '../components/TeamPage/TeamLeftMenu';
import EditPage from '../components/Recruit/EditPage'

function RecruitPostEditPage() {
    return (
            <div className='flex'>
                <TeamLeftMenu></TeamLeftMenu>
                <EditPage></EditPage>
            </div>
    
    )
}

export default RecruitPostEditPage