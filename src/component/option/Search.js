import React, { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import styled from "styled-components";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Search(data) {
  const { placeholder } = data;
  const { valueInput,setValueInput}= useAuth()
  const handleSearch = (e) => {
    // console.log(e);
    setValueInput(e)
  };
  return (
    <div>
      <SearchElement>
        <Link to="/" style={{ width: "40px", height: "100%" }}>
          <div>
            <MdSearch className="icon" style={{ color: "black" }} />
          </div>
        </Link>
        <input
          type="text"
          placeholder={placeholder}
          onChange={(e) => handleSearch(e.target.value)}
          // value={valueInput}
          // onKeyDown={handleKeyDown}
        />
      </SearchElement>
    </div>
  );
}

const SearchElement = styled.div`
  margin-left: 10px;
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 300px;
  height: 34px;
  background-color: #e4e4e4 !important;
  /* box-shadow: var(--BoxShadow); */
  border-radius: 5px;
  overflow: hidden;
  /* background: #aaa !important; */

  .icon {
    height: 100%;
    width: 100%;
    padding: 5px;
    text-align: center;
    cursor: pointer;
    justify-content: space-between;
    background: #e4e4e4 !important;
    /* margin: %; */
    /* box-shadow: none !important; */
    opacity: 75%;
    //cái dưới này để xử lý lúc mà chuột chạy qua cái icon search thì nó đổi màu
    transition: opacity 0.2s linear;
    &:hover {
      opacity: 1;
    }
  }
  input {
    background-color: #e4e4e4;

    border: 0;
    outline: none;
    width: 100%;
    font-size: 14px;
    font-weight: 500;
  }
`;
