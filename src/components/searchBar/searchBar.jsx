import { useState } from 'react'
import React from 'react';
import SingleItemComponent from '../voyagerContainer/singleItemComponent/singleItemComponent';
import NewVoyagerComponent from '../voyagerContainer/newVoyagerComponent/newVoyagerComponent';
const SearchBar = (props) => {
    const [searchResults, setSearchResults] = useState([])
    const [searchInput, setSearchInput] = useState("");
    const [matchResults, setMatchResults] = useState([])
    // 4. see if input is valid 
    const [isValidState, setIsValidState] = useState({valid: true, message: ""})
      // setSearchInput function to equal to what was put in the search bar  e.target.value (put into search bar )
      const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value)
        console.log(e.target.value)
      };

   const submitSearch = (e) => {
        e.preventDefault();
        if (searchInput.length > 2) {
            // we put searchInput to lowercase 
            const _searchInput = searchInput.toLowerCase()
            // we filter through voyagers and we find 
            const results = props.voyagers.filter(voyager => {
                // if it starts with searchInput 
                if(voyager.city.toLowerCase().indexOf(_searchInput) === 0) {
                    return true
                }
                // todo: name, categories
                return false
            })

            setSearchResults(results)
        }
        return;
        // DIFF WAY of doing it 
                // if (searchInput.length > 2) {
                //     // to do: lowercase 
                //     // voyager.name to lowercase 
                //     // const lowerCase = searchInput.toLowerCase();
                //     // const lowerCaseVoyagers = props.voyagers.toLowerCase();

                //     // looks at the voyagers object, if the voyager.city is equal to searchInput then, 
                //     // return the voyager that equals it 
                //     const resultsSearch = props.voyagers.filter(voyager => voyager.city.match(searchInput)).map(filteredVoyager => {
                //         console.log(filteredVoyager )
                //         return filteredVoyager
                //     })
                //     // need to set results into NEW state 
                //     setSearchResults(resultsSearch)
                //     // for it to display, need to map through the array 
                // } 
                // // find the city that does not equal search results and put into an array 
                // const matchResults = props.voyagers.filter(voyager=> voyager.city != searchInput)
                // // set the match results to the ones that don't equal it 
                // const match = setMatchResults(matchResults);
                // console.log(match)
                // if(searchInput != match){
                //     setIsValidState({
                //         valid: false, 
                //         message: "No results - would you like to add instead?"
                //      })
                // }
        }
    // if there is no searchInput, return voyagers prop, if not return searchResults
    // ! = not 
   const voyagers = !searchInput ? props.voyagers : searchResults
    return(
        <div>
            <h2 className="title">Search by City</h2>
            <form onSubmit={submitSearch}>
                <input onChange={handleChange} type="search" placeholder="Search here" value={searchInput}/>
                <button type="submit">Submit</button> 
            </form>

            {/* If we have searchInput and it does not equal voyagers, tell the user no results */}
            {!!searchInput && !voyagers && (
                <>
                <h1>No results, would you like to create one instead? </h1>
                <NewVoyagerComponent></NewVoyagerComponent>
                </>
            )}
        <span>
            {/* map through search results and return the component */}
            {searchResults.map(searchResult => {
            return <SingleItemComponent key={searchResult._id} voyager={searchResult}></SingleItemComponent>
            })}
        </span> 
    </div>
    )
}

export default SearchBar;