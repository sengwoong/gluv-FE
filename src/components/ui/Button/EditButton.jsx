// EditProfileButton.js
import React from 'react';
import { IoMdCreate } from 'react-icons/io';

const EditButton = ({ onClick ,children}) => {
  return (
    <div className="cursor-pointer border border-gray-300 h-full w-full p-4  items-center" onClick={onClick}>
      <div className="flex items-center">
        <IoMdCreate className="w-6 h-6 mr-4" />
        {children}
      </div>
    </div>
  );
};

export default EditButton;
