import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDebounce, useGithubRepos } from "../utils";
//113da56fe4c392631ad403fe31ee65c87987a930

const SuggestionList = ({ suggestions = [], loading, onSelect }) => {
 if (suggestions.length && !loading) {
  return (
   <ul className="suggestions">
    <style jsx>{`
     ul.suggestions {
      display: block;
      list-style: none;
      padding: 10px 10px;
      transition: width 0.3s;
      position: absolute;
      overflow: scroll;
      width: 300px;
      max-height: 100px;
     }

     ul.suggestions li {
      display: block;
      border-radius: 2px;
      color: black;
     }
     ul.suggestions li button:hover {
      font-weight: bold;
      cursor: pointer;
      outline-bottom: solid 1px black;
      transition: 0.3s all;
     }

     ul.suggestions li.option-active {
      background: whitesmoke;
      font-size: 1.5rem;
      color: #00b4cc;
     }
     ul.suggestions li button {
      width: 100%;
      padding: 10px 0px;
      font-size: 1.2rem;
      background: white;
      border: none;
     }
    `}</style>
    {suggestions.map((suggestion, index) => {
     return (
      <li key={index}>
       <button onClick={() => onSelect(index)}>{suggestion.full_name}</button>
      </li>
     );
    })}
   </ul>
  );
 } else {
  return (
   <div className="no-suggestions">
    <style jsx>{`
     .no-suggestions {
      padding: 10px 15px;
      transition: width 0.3s;
      position: absolute;
      text-align: center;
      width: 300px;
      margin-top: 10px;
     }
    `}</style>
    <em>{loading ? `Loading ... ` : `No suggestions!`}</em>
   </div>
  );
 }
};
function AutoComplete(props) {
 // const { suggestions = [] } = props;
 const [activeSuggestion, setActiveSuggestion] = useState(false);
 const [showSuggestions, setShowSuggestions] = useState(false);
 const [userInput, setUserInput] = useState("");

 const deboucedValue = useDebounce(userInput, 1000);
 const [loading, suggestions] = useGithubRepos(deboucedValue);

 const userInputChange = event => {
  setActiveSuggestion(false);
  setUserInput(event.target.value);
 };

 const onSuggestionSelect = index => {
  event.preventDefault();
  const selectedRepo = suggestions[index];
  setUserInput(selectedRepo.full_name);
  setActiveSuggestion(true);
 };
 return (
  <form>
   <style jsx>{`
    .search .search-button a {
     text-decoration: none;
     color: black;
    }
   `}</style>
   <div className="search">
    <input
     type="text"
     onChange={userInputChange}
     value={userInput}
     className="user-input"
    />
    {activeSuggestion && (
     <button className="search-button" type="button">
      <Link href={`/info?package=${userInput}`}>
       <a>►</a>
      </Link>
     </button>
    )}
   </div>
   {userInput && !activeSuggestion && (
    <SuggestionList
     suggestions={suggestions}
     loading={loading}
     onSelect={onSuggestionSelect}
    />
   )}
   <style jsx>{`
    .user-input {
     padding: 15px;
     font-size: 1.5em;
     border: none;
     outline: none;
     border-bottom: solid 1px black;
     position: relative;
     width: 300px;
    }
    .search {
     text-align: right;
     position: relative;
    }
    .search .search-button {
     padding: 15px;
     font-size: 1.5em;
     margin-left: 10px;
     border-radius: 10%;
    }
    .search .search-button a {
     text-decoration: none;
    }
   `}</style>
  </form>
 );
}

export default AutoComplete;
