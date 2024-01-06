import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Container from "../components/common/Container";
import mediaApi from "../api/modules/media.api";

const MediaSearch = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query"));

  console.log(query);

  const fetchInitialData = async () => {
    setLoading(true);
    const { response, err } = await mediaApi.search({ query, page });
    setLoading(false);
    if (response) {
      setData(response);
      setPage((prev) => prev + 1);
    }
    if (err) toast.error(err.message);
  };

  useEffect(() => {
    setPage(1);
    fetchInitialData();
  }, [query]);

  return <Container>{}</Container>;
};

export default MediaSearch;
