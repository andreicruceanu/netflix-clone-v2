import styled from "@emotion/styled";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase } from "@mui/material";
import { useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSearchGlobal } from "../context/SearchContext";

let timer;
const timeout = 1000;

const SearchBox = () => {
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  const [search, setSearch] = useSearchParams();
  const [isFocused, setIsFocused] = useState(
    search.get("query") ? true : false
  );

  const { setQuerySearch } = useSearchGlobal();

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
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      if (newQuery.length === 0) {
        search.delete("query");
        setIsFocused(false);
        setSearch(search, {
          replace: true,
        });
        navigate("/browse");
      } else {
        search.set("query", newQuery);
        navigate(`/browse/search?query=${newQuery}&page=1`, {
          replace: true,
        });
      }
    }, timeout);
  };

  setQuerySearch(search.get("query"));

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
        autoFocus={search.get("query") ? true : false}
        onChange={onQueryChange}
        defaultValue={search.get("query") || ""}
      />
    </Search>
  );
};

export default SearchBox;
