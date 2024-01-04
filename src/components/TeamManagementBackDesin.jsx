import React from 'react';

import Margin from './Margin';
import Contour from './ui/Contour';

function TeamManagementBackDesin({ children }) {
  return (
    <div>
      <div className='w-[65vw] bg-white rounded-md shadow-md p-6 '>
        <div className='w-full'>
          <Margin top="3" />
          <div className='m-3'>
            <div className='flex'>
              <div className='text-2xl font-bold '> 구성원 관리</div>
            </div>
            <Contour />
            <Margin top="2" plustailwind="h-3" />
            <Margin top="3" plustailwind="h-3" />
            {children}
            <Margin top="3" plustailwind="h-3" />
            <Margin top="2" plustailwind="h-4" />
            <Contour />
            <Margin top="2" />
          
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamManagementBackDesin;
