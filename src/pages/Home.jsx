import React, { useState, useEffect } from "react";
import Prompt from "../components/Prompt";
import styled from "styled-components";
import ResultBox from "../components/ResultBox";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 80%;
  height: 70%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.4;
  z-index: -1;
`;

const Warning = styled.div`
  width: 50%;
  height: 30px;
  padding: 10px;
  margin: 0 25% 0 25%;
  border-radius: 0.75rem 0 0.75rem 0;
  position: absolute;
  top: ${(props) => (props.message ? "20px" : "-100px")};
  transition: 0.5s all;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ff8fa465;
  font-size: 14px;
`;

const Home = () => {
  const [countryData, setCountryData] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const payload =
      "query  {\n\n     countries {\n      name\n      code\n      currency\n      emoji\n      native\n   languages {\n  native\n }\n }\n  \n  }\n";
    fetch("https://countries.trevorblades.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: payload }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error while fetching data");
        }
      })
      .then((responseData) => {
        const responseArray = Object.values(responseData.data.countries);
        setCountryData(responseArray);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Container>
      <Warning message={message}>{message}</Warning>
      <Image src="./images/world-map.png" />
      <Prompt setIsFiltered={setIsFiltered} setPrompt={setPrompt} />
      <ResultBox
        isFiltered={isFiltered}
        prompt={prompt}
        countryData={countryData}
        setIsFiltered={setIsFiltered}
        setMessage={setMessage}
      />
    </Container>
  );
};

export default Home;
