import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: auto;
  height: 50px;
  border-radius: 0.75rem 0 0.75rem 0;
  background-color: #ffffff71;
  box-shadow: 0 0 5px 1px lightgray;
  display: flex;
  align-items: center;
  position: absolute;
  left: 50%;
  top: 15%;
  transform: translate(-50%, -50%);
  transition: 1s all;
`;

const Input = styled.input`
  width: 400px;
  height: 40px;
  border-radius: 0.75rem 0 0 0;
  margin: 5px;
  padding: 0;
  border: none;
  background-color: #ff8fa465;
  outline: none;
  padding: 10px;
  box-sizing: border-box;
  color: #590d22;
  font-family: "Poppins";
`;

const FilterButton = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 0 0 0.75rem 0;
  margin: 5px 5px 5px 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  background-color: #590d22;
  color: white;
  font-size: 14px;
  font-weight: 500;
  transition: 0.2s all;
  font-family: "Poppins";
  &:hover {
    background-color: #3e0112;
    font-size: 16px;
  }
`;

const Prompt = ({ setIsFiltered, setPrompt }) => {
  const handleFilter = (click) => {
    setIsFiltered(click);
  };

  const handleInput = (e) => {
    const text = e.target.value;
    setPrompt(text);
  };
  return (
    <Container>
      <Input
        type="text"
        placeholder="e.g. search:tt, group:currency"
        onChange={handleInput}
      ></Input>
      <FilterButton onClick={() => handleFilter(true)}>Filter</FilterButton>
    </Container>
  );
};

export default Prompt;
