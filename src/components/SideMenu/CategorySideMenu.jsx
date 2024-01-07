import React, { useState } from 'react'
import { Link } from 'react-router-dom'
/** 
    아래와 비슷한 형식을 가진다.
    { id: 1, name: '공지사항', link: '/posts/notices/' },
    { id: 3, name: '자유게시판', link: '/posts/?category=comm/',
    
    subBoards: [ 
      { name : '시', link : '/posts/?category=comm-poem/'}, 
      { name : '소설', link : '/posts/?category=comm-novel/'}, 
      { name : '수필', link : '/posts/?category=comm-essay/'}]
    },
 */
function CategorySideMenu({boards}) {
    const [expandedBoards, setExpandedBoards] = useState([]);
    
    const toggleSubBoards = (boardId) => {
        if (expandedBoards.includes(boardId)) {
          setExpandedBoards(expandedBoards.filter((id) => id !== boardId));
        } else {
          setExpandedBoards([...expandedBoards, boardId]);
        }
      };


  return (
    <div className="flex flex-col border m-2 p-2 rounded-md justify-items-center text-center">
      {boards.map((board) => (
        <div key={board.id} className="mb-2 p-2 border">
          {
            <Link to={board.link} className="text-black hover:underline"
            onClick={() => toggleSubBoards(board.id)}
            >
              {board.name}
            </Link>
          }
          <div className='p-2'>
            {board.subBoards && expandedBoards.includes(board.id) && (
              <div className="ml-4 flex-col justify-items-center text-center">
                {board.subBoards.map((item, index) => (
                  <div className='p-2'>
                    <Link
                      key={item.name}
                      to={item.link}
                      className="text-black hover:underline"
                    >
                      {item.name}
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default CategorySideMenu