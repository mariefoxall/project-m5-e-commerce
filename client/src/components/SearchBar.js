import React from "react";
import styled from "styled-components";
import { Icon } from "react-icons-kit";
import { magnifying_glass } from "react-icons-kit/ikons/magnifying_glass";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { getStoreItems } from "./reducers/items.reducer";

const SearchBar = () => {
  const [name, setName] = React.useState("");
  const [filteredSuggestions, setFilteredSuggestions] = React.useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = React.useState(0);

  let history = useHistory();

  const itemDetails = (id) => {
    history.push(`/items/${id}`);
  };

  const dispatch = useDispatch();

  const storeItems = useSelector(getStoreItems);
  console.log(storeItems, "store items");

  const shopItemsArray =
    storeItems.status === "idle" ? storeItems.items.items : [];
  console.log(shopItemsArray, "shop array");

  function searchSuggestions(inputValue) {
    const matchedSuggestions =
      inputValue.length > 2
        ? shopItemsArray.filter((item) => {
            if (item.name.toLowerCase().includes(inputValue)) {
              return true;
            }
          })
        : [];
    if (matchedSuggestions.length === shopItemsArray.length) {
      return false;
    } else {
      setFilteredSuggestions(matchedSuggestions);
    }
  }

  const isSelected = (item) =>
    filteredSuggestions.indexOf(item) === selectedSuggestion ? true : false;

  return (
    <Wrapper>
      <InputDiv>
        <SearchInput
          type="text"
          value={name}
          placeholder="Search..."
          onChange={(ev) => {
            setName(ev.target.value);
            searchSuggestions(ev.target.value);
          }}
          onKeyDown={(ev) => {
            switch (ev.key) {
              case "ArrowUp": {
                if (filteredSuggestions > 0)
                  setFilteredSuggestions(filteredSuggestions - 1);
              }
              case "ArrowDown": {
                if (filteredSuggestions < 0)
                  setFilteredSuggestions(filteredSuggestions + 1);
              }
            }
          }}
        />
      </InputDiv>
      <SearchWrapper>
        {filteredSuggestions.map((item) => {
          const suggestionTitle = item.name;
          const firstHalf = suggestionTitle.slice(
            0,
            suggestionTitle.toLowerCase().indexOf(name) + name.length
          );
          const secondHalf = suggestionTitle.slice(
            firstHalf.length,
            suggestionTitle.length
          );
          return (
            <SearchList
              key={item.id}
              onClick={() => {
                itemDetails(item.id);
              }}
              isSelected={isSelected(item.name)}
              setSelectedSuggestion={setSelectedSuggestion}
              index={filteredSuggestions.indexOf(item)}
            >
              <span>
                {firstHalf}
                <Prediction>{secondHalf}</Prediction>
              </span>
            </SearchList>
          );
        })}
      </SearchWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputDiv = styled.div`
  display: flex;
`;

const SearchInput = styled.input`
  margin-right: 10px;
`;

const IconDiv = styled.div`
  color: #0036b3;

  &:hover {
    cursor: pointer;
    color: #52d7e0;
  }
`;

const SearchWrapper = styled.ul`
  color: black;
  background-color: white;
  width: 200px;
`;

const SearchList = styled.li`
  padding: 5px;
  &:hover {
    cursor: pointer;
    color: red;
  }
`;

const Prediction = styled.span`
  font-weight: bold;
`;

export default SearchBar;
