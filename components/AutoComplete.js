import React from "react";

function AutoComplete(props) {
 const { suggestions = [] } = props;
 const [activeSuggestion, setActiveSuggestion] = React.useState(0);
 const [filteredSuggestions, setFilteredSuggestions] = React.useState([]);
 const [showSuggestions, setShowSuggestions] = React.useState(false);
 const [userInput, setUserInput] = React.useState("");

 const userInputChange = event => {
  setUserInput(event.target.value);
 };
 React.useEffect(() => {
  const filteredSuggestions = suggestions.filter(
   suggestion =>
    suggestion.label.toLowerCase().indexOf(userInput.toLowerCase()) > -1
  );
  setFilteredSuggestions(filteredSuggestions);
  setShowSuggestions(true);
 }, [userInput]);

 const SuggestionList = () => {
  if (showSuggestions && userInput) {
   if (filteredSuggestions.length) {
    return (
     <ul className="suggestions">
      {filteredSuggestions.map((suggestion, index) => {
       return (
        <li key={index}>
         <button>{suggestion.label}</button>
        </li>
       );
      })}
     </ul>
    );
   } else {
    return (
     <div className="no-suggestions">
      <em>No suggestions!</em>
     </div>
    );
   }
  }
  return null;
 };

 return (
  <>
   <input
    type="text"
    onChange={userInputChange}
    value={userInput}
    className="user-input"
   />
   <SuggestionList />
   <style jsx>{`
    .user-input {
     padding: 15px;
     font-size: 1.5em;
     border: none;
     outline: none;
     border-bottom: solid 1px black;
    }
   `}</style>
  </>
 );
}

export default AutoComplete;
