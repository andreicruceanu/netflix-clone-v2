import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";

import mediaApi from "../../api/modules/media.api";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchResponse, setSearchResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [querySearch, setQuerySearch] = useState("");

  const fetchMediaSearch = useCallback(async () => {
    setLoading(true);
    const { response, err } = await mediaApi.search({
      query: querySearch,
      page: 1,
    });
    setLoading(false);

    if (response) {
      setSearchResponse(response.results);
    }
    if (err) toast.error(err.message);
  }, [querySearch]);

  useEffect(() => {
    fetchMediaSearch();
  }, [querySearch, fetchMediaSearch]);

  return (
    <SearchContext.Provider
      value={{ loading, setQuerySearch, searchResponse, querySearch }}
    >
      {children}
    </SearchContext.Provider>
  );
};
export const useSearchGlobal = () => {
  return useContext(SearchContext);
};
