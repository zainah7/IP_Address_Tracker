import React from "react";
import styled from "styled-components";

export default function Button({ children, onClick }) {
  return <SearchButton onClick={onClick}>{children}</SearchButton>;
}

const SearchButton = styled.button`
  background-color: black;
  height: 100%;
  width: 58px;
  border-radius: 0 15px 15px 0;
  outline: none;
  border: none;

  &:hover {
    cursor: pointer;
  }
`;
