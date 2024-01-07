import React, { useState, useContext, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';

import 'react-datepicker/dist/react-datepicker.css';

import { FetchPost } from '../../api/post';
import Margin from '../ui/Margin.jsx';
import DynamicColorButton from '../ui/Button/DynamicColorButton.jsx';
import useWindowSize from '../../context/useWindowSize.jsx';
import BulletinBoard from '../ui/Input/BulletinBoard.jsx';
import { ModelContext } from '../../context/ModelContextProvider';
import ButtonPagination from '../Pagination/ButtonPagination.jsx';

function Content() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const endPoint = location.pathname;

  const { content } = useContext(ModelContext);

  const [category, setCategory] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const [noticeData, setNoticeData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page'), 10) || 1);

  const navigate = useNavigate();
  const debounceTimerRef = useRef(null);

  useEffect(() => {
    const parseParams = async () => {
      setCategory(searchParams.get('category') || '');
    };

    parseParams();
  }, [location]);

  const fetchNoticeData = async () => {
    try {
      const params = {
        category: searchParams.get('category'),
        page: currentPage,
        search: inputValue,
      };

      const response = await FetchPost(endPoint, params);

      if (response && response.results) {
        setNoticeData([...response.results]);
      }
      setTotalPages(Math.ceil(response.count / itemsPerPage));
    } catch (error) {
      console.error('Error fetching notice data:', error.message);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    // Cleanup function to clear the timer when the component unmounts or when input changes
    return () => {
      clearTimeout(debounceTimerRef.current);
    };
  }, [inputValue]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  
  useEffect(() => {
    fetchNoticeData();
  }, [currentPage, category]);



  useEffect(() => {
    clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      fetchNoticeData();
    }, 3000);
  }, [inputValue, fetchNoticeData]);

  const handleSearchClick = () => {
    fetchNoticeData();
  };

  const handleWritePost = () => {
    navigate('/posts/create');
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="w-[60vw] bg-white rounded-md shadow-md p-6">
        <div className="w-full">
          <BulletinBoard data={noticeData} />
          <Margin top="6" plustailwind="h-8" />
        </div>
        <div className="flex">
          <input
            className="flex-1 rounded-l-md p-2 ml-2 border"
            placeholder="검색 입력..."
            value={inputValue}
            onChange={handleInputChange}
          />
          <DynamicColorButton
            color="white"
            text="검색"
            btnstyle="py-2 px-2 mr-4"
            onClick={handleSearchClick}
          />
          <DynamicColorButton
            color="black"
            text="글 작성"
            btnstyle="py-2 px-2 ml-2"
            onClick={handleWritePost}
          />
        </div>
        <div className="flex justify-center items-center">
          <ButtonPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      </div>
    </div>
  );
}

export default Content;
