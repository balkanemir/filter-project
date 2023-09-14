import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 80%;
  max-height: 85%;
  border-radius: 0.75rem 0 0.75rem 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  overflow-y: scroll;
  position: absolute;
  bottom: 0;
`;

const Card = styled.div`
  width: 230px;
  height: 100px;
  box-shadow: 0 0 5px 1px lightgray;
  margin: 10px;
  border-radius: 0.75rem 0 0.75rem 0;
  background-color: ${(props) =>
    props.isSelected ? props.bgColor : "#ffffff71"};
  transition: 0.2s all;
  cursor: pointer;
  position: relative;
  font-family: "Poppins";
  transform: ${(props) => (props.isSelected ? "scale(1.05)" : "none")};
  &:hover {
    transform: scale(1.05);
  }
`;

const CardTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  position: absolute;
  top: 10px;
  left: 10px;
  color: ${(props) => (props.isSelected ? "white" : "#a4133c")};
  font-size: 14px;
`;
const Currency = styled.div`
  font-size: 16px;
  font-weight: 500;
  position: absolute;
  top: 10px;
  right: 10px;
  color: ${(props) => (props.isSelected ? "white" : "#a4133c")};
  font-size: 14px;
`;
const Code = styled.div`
  font-size: 18px;
  font-weight: 900;
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: ${(props) => (props.isSelected ? "white" : "#800f2f")};
`;

const Language = styled.div`
  font-size: 14px;
  font-weight: 500;
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: ${(props) => (props.isSelected ? "white" : "#a4133c")};
`;

const GroupContainer = styled.div`
  width: auto;
  height: 50px;
  border-radius: 0.75rem 0 0.75rem 0;
  background-color: #ffffff71;
  box-shadow: 0 0 5px 1px lightgray;
  display: flex;
  align-items: center;
  position: absolute;
  left: 30%;
  top: 15%;
`;

const ResultBox = ({
  countryData,
  prompt,
  isFiltered,
  setIsFiltered,
  setMessage,
}) => {
  const [selectedItem, setSelectedItem] = useState(9);
  const [randomIdx, setRandomIdx] = useState(0);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [mappedList, setMappedList] = useState(countryData);
  const [groupDict, setGroupDict] = useState({});
  const colorArray = ["#590d22", "#800f2f", "#a4133c", "#c9184a", "#ff4d6d"];
  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    let newInt = Math.floor(Math.random() * (max - min + 1)) + min;
    while (randomIdx === newInt) {
      newInt = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    setRandomIdx(newInt);
  };

  const handleClick = (idx) => {
    setSelectedItem(idx);
    getRandomInt(0, 4);
  };

  const selectList = () => {
    if (filteredCountries.length === 0) {
      setMappedList(countryData);
    } else {
      setMappedList(filteredCountries);
    }
  };

  useEffect(() => {
    setFilteredCountries([]);
    if (isFiltered) {
      selectList();
      setMessage("");

      const search = /search:\s*(\w+)/;
      const group = /group:\s*(\w+)/;
      const matchsearch = prompt.match(search);
      const matchgroup = prompt.match(group);

      if (matchsearch || matchgroup) {
        if (matchsearch) {
          const searchVariable = matchsearch[1];
          countryData.map((country) => {
            if (
              country.name.toLowerCase().includes(searchVariable.toLowerCase())
            ) {
              filteredCountries.push(country);
              if (matchgroup) {
                const groupVariable = matchgroup[1];

                if (groupVariable === "currency") {
                  if (!groupDict[country.currency]) {
                    groupDict[country.currency] = [];
                  }
                  groupDict[country.currency].push(country);
                }
                if (groupVariable === "language") {
                  country.languages.forEach((lang, idx) => {
                    if (idx === 0) {
                      if (!groupDict[lang.native]) {
                        groupDict[lang.native] = [];
                      }
                      groupDict[lang.native].push(country);
                    }
                  });
                }
              }
            }
            if (filteredCountries.length <= 10) {
              setSelectedItem(filteredCountries.length - 1);
            }
          });
        }
        if (matchgroup) {
          setGroupDict({});
        }
        selectList();
      } else {
        setMessage(
          "You have to write 'search:' or 'group:'. Please check and try again"
        );
      }
    }
    setIsFiltered(false);
  }, [isFiltered]);

  return (
    <Container>
      {mappedList.map((country, idx) => (
        <Card
          onClick={() => handleClick(idx)}
          isSelected={idx === selectedItem}
          bgColor={colorArray[randomIdx]}
          key={country.code}
        >
          <CardTitle isSelected={idx === selectedItem}>
            {country.emoji} {"  "}
            {country.name.length > 15
              ? country.name.substring(0, 15) + "..."
              : country.name}{" "}
          </CardTitle>

          <Code isSelected={idx === selectedItem}>{country.code}</Code>
          {country.languages.map((lang, index) =>
            index === 0 ? (
              <Language isSelected={idx === selectedItem}>
                <i className="bi bi-translate"></i>
                {"  "}
                {lang.native?.length > 15
                  ? lang.native.substring(0, 15) + "..."
                  : lang.native}
              </Language>
            ) : (
              <Language isSelected={idx === selectedItem}></Language>
            )
          )}

          <Currency isSelected={idx === selectedItem}>
            <i className="bi bi-currency-exchange"></i> {"  "}
            {country.currency?.length > 3
              ? country.currency.substring(0, 3) + "..."
              : country.currency}
          </Currency>
        </Card>
      ))}
    </Container>
  );
};

export default ResultBox;
