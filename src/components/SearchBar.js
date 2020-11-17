import {
    TextField,
    Button
} from '@material-ui/core'
import { useState } from 'react';

function SearchBar() {
    const [searchState, setSearchState] = useState({
        searchButton: false,
        input: "",
        filterDate: null
    });


    function handleChange(event) {
        setSearchState({
            searchButton: event.target.value ? true : false,
            input: event.target.value,
            filterDate: searchState.filterDate
        })
    }


    function handleSubmit() {
        setSearchState({
            searchButton: false,
            input: "",
            filterDate: searchState.filterDate
        })
    }

    return (
        <div className="SearchBar">

            <div className="content-wrapper">
                <div className="content-headings">
                    <h1>Discover</h1><h2>Headlines</h2>
                </div>

                <div className="content-input">
                    <TextField
                        onChange={(e) => handleChange(e)}
                        id="standard-basic"
                        label="Search Headlines"
                        value={searchState.input}
                    />
                    {searchState.searchButton &&
                        <Button
                            variant="contained"
                            onClick={(e) => handleSubmit(e)}
                        >
                            Search
                                </Button>
                    }
                </div>

            </div>



        </div>
    )
}

export default SearchBar