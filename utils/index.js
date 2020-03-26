import React, { useState, useEffect } from "react";
import axios from "axios";

export function useDebounce(value, delay) {
 // State and setters for debounced value
 const [debouncedValue, setDebouncedValue] = useState(value);

 useEffect(() => {
  // Set debouncedValue to value (passed in) after the specified delay
  const handler = setTimeout(() => {
   setDebouncedValue(value);
  }, delay);
  return () => {
   clearTimeout(handler);
  };
 }, [value]);

 return debouncedValue;
}
export function useGithubRepos(query) {
 const [data, setData] = useState([]);
 const [loading, setLoading] = useState(false);
 useEffect(() => {
  let cancelCall = false;
  async function fetchData() {
   setLoading(true);
   const { data } = await axios(`api/query/${query}`);
   if (cancelCall) {
    return;
   }
   setLoading(false);
   setData(data.items);
  }
  query && fetchData();
  return () => {
   cancelCall = true;
  };
 }, [query]);
 return [loading, data];
}
export function usePackageReadme(repoName) {
 const [response, setResponse] = useState(undefined);
 const [loading, setLoading] = useState(false);
 useEffect(() => {
  let cancelCall = false;
  async function fetchData() {
   setLoading(true);
   const { data } = await axios(`api/package/${repoName}`);
   if (cancelCall) {
    return;
   }
   setLoading(false);
   setResponse(data);
  }
  repoName && fetchData();
  return () => {
   cancelCall = true;
  };
 }, [repoName]);
 return [loading, response];
}
