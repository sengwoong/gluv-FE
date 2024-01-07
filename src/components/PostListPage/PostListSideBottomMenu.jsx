import React, { useState, useContext } from 'react';
import CategorySideMenu from '../SideMenu/CategorySideMenu';


function BottomMenu() {


  const boards = [
    { id: 1, name: '공지사항', link: '/posts/notices/' },
    { id: 2, name: '질문 게시판', link: '/posts/?category=qna/' },
    { id: 3, name: '자유게시판', link: '/posts/?category=comm/',
    
    subBoards: [ 
      { name : '시', link : '/posts/?category=comm-poem/'}, 
      { name : '소설', link : '/posts/?category=comm-novel/'}, 
      { name : '수필', link : '/posts/?category=comm-essay/'}]
    },
    { id: 4, name: '창작게시판', link: '/posts/?category=creation/',
    subBoards: [ 
      { name : '시', link : '/posts/?category=creation-poem/'}, 
      { name : '소설', link : '/posts/?category=creation-novel/'}, 
      { name : '수필', link : '/posts/?category=creation-essay/'}]
    },
  ];



  return (
   <CategorySideMenu boards={boards}></CategorySideMenu>
  );
};

export default BottomMenu;
