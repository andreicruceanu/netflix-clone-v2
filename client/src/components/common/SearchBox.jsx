import styled from "@emotion/styled";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase } from "@mui/material";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

let timer;
const timeout = 500;

const SearchBox = () => {
  const [isFocused, setIsFocused] = useState(false);
  const searchInputRef = useRef(null);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleClickSearchIcon = () => {
    if (!isFocused) {
      setIsFocused(true);
      searchInputRef.current?.focus();
    }
  };

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    width: "100%",
    display: "flex",
    alignItems: "center",
    ...(isFocused && {
      border: "1px solid white",
      backgroundColor: "black",
    }),
  }));
  const SearchIconWrapper = styled("div")({
    cursor: "pointer",
    padding: "8px", // Adjust the padding as needed
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: isFocused ? "auto" : "0", // Adjust width as needed
    transition: theme.transitions.create("width", {
      duration: theme.transitions.duration.standard,
    }),
    "& .MuiInputBase-input": {
      padding: "8px", // Adjust padding as needed
    },
  }));

  const onQueryChange = (e) => {
    const newQuery = e.target.value;

    clearTimeout(timer);

    timer = setTimeout(() => {
      setQuery(newQuery);
      navigate(`/search?query=${newQuery}`);
    }, timeout);
  };

  return (
    <Search>
      <SearchIconWrapper onClick={handleClickSearchIcon}>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        ref={searchInputRef}
        placeholder="Titles, people, genres"
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
        onChange={onQueryChange}
        value={query}
      />
    </Search>
  );
};

export default SearchBox;
