import React from 'react'
import DynamicColorButton from './DynamicColorButton'
import { submitReport } from '../../../api/report'

function ReportBtn({author,id,type}) {
    const ReportClick = async()=>{

        let a=await submitReport({user_id:author,content:`포스트${id}를 신고했습니다.`})
    
      }

  return (
    <DynamicColorButton
    color="red"
    text="신고"
    btnstyle="py-2 px-4 mx-2"
    onClick={ReportClick}
  />
  )
}

export default ReportBtn