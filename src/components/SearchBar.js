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
            <TextField
                onChange={(e) => handleChange(e)}
                id="standard-basic"
                label="Search Headlines"
                value={searchState.input}
            />
            {searchState.searchButton &&
                <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) => handleSubmit(e)}
                >
                    Search
                </Button>
            }

        </div>
    )
}

export default SearchBar