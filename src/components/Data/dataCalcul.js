
// 현재날짜 계산
export const formatDate = (dateString) => {
    if (!dateString) return ''; // Handle the case when dateString is undefined or null
  
    // Extract only the date part (YYYY-MM-DD)
    const formattedDate = dateString.substring(0, 10);
  
    return formattedDate;
  };
  
  // 현재날짜 반환
  export const NowformatDate = (dateString) => {
    if (!dateString) return ''; // Handle the case when dateString is undefined or null
  
    // Extract only the date part (YYYY-MM-DD)
    const formattedDate = dateString.substring(0, 10);
  
    // Get the current date in the same format
    const currentDate = new Date().toISOString().substring(0, 10);
  
    // Compare the extracted date with the current date
    if (formattedDate === currentDate) {
      return '오늘';
    } else {
      // Calculate the difference in days
      const date1 = new Date(formattedDate);
      const date2 = new Date(currentDate);
      const timeDifference = date1.getTime() - date2.getTime();
      const daysDifference = timeDifference / (1000 * 3600 * 24);
  
      return `${daysDifference}일 전`;
    }
  };