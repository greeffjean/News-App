import {
    TextField,
    Button
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useAppContext } from '../libs/useContext'
import { searchTitles } from '../services/news.service'

function SearchBar() {

    const history = useHistory();

    const { mainState, setMainState } = useAppContext();
    const [searchState, setSearchState] = useState({
        searchButton: false,
        input: "",
        filterDate: ""
    });


    useEffect(() => {

        if (history.location.state) {
            handleLoad()

            searchTitles(
                history.location.state.params.input,
                history.location.state.params.filterDate
            ).then(response => {
                setMainState({
                    articles: response.articles ? response.articles : null,
                    loading: false,
                    error: response.message ? response.message : null,
                    userHasSearched: mainState.userHasSearched
                })
            }).catch(error => {
                console.log(error)
            })


            setSearchState({
                searchButton: false,
                input: "",
                filterDate: ""
            })
        }
        else {
            history.push({
                pathname: `/`,
            });
        }
    }, [])



    // URL Navigation
    window.onpopstate = () => {

        if (history.location.pathname == "/") {
            setMainState({
                articles: null,
                loading: false,
                error: null,
                userHasSearched: false
            })
        }
        else {

            handleLoad()

            searchTitles(
                history.location.state.params.input,
                history.location.state.params.filterDate
            ).then(response => {
                setMainState({
                    articles: response.articles ? response.articles : null,
                    loading: false,
                    error: response.message ? response.message : null,
                    userHasSearched: true
                })
            }).catch(error => {
                console.log(error)
            })

            setSearchState({
                searchButton: false,
                input: "",
                filterDate: ""
            })
        }

    }


    // Handle Change
    function handleChange(event) {
        const updateInputs = {
            ...searchState,
            [event.target.attributes.name.nodeValue]: event.target.value
        }

        setSearchState({
            searchButton: event.target.value ? true : false,
            input: updateInputs.input,
            filterDate: updateInputs.filterDate
        })
    }



    // Handle Load
    function handleLoad() {
        setMainState({
            articles: null,
            loading: true,
            error: null,
            userHasSearched: true
        })
    }



    // Handle Submit
    function handleSubmit(e, term) {

        handleLoad()

        searchTitles(term ? term : searchState.input, searchState.filterDate).then(response => {
            console.log(response)
            history.push({
                pathname: `/${term ? term : searchState.input}/${searchState.filterDate}`,
                state: {
                    params: {
                        input: term ? term : searchState.input,
                        filterDate: searchState.filterDate
                    }
                }
            });
            setMainState({
                articles: response.articles ? response.articles : null,
                loading: false,
                error: response.message ? response.message : null,
                userHasSearched: true
            })
        }).catch(error => {
            console.log(error)
        })

        setSearchState({
            searchButton: false,
            input: "",
            filterDate: ""
        })
    }

    return (

        <div className="search-bar-wrapper">
            <div className={mainState.userHasSearched ? "search-bar active" : "search-bar"}>

                <div className="content-wrapper">
                    <div className="content-headings">
                        <h1>Discover</h1><h2>Headlines</h2>
                    </div>

                    <div className="content-input">
                        <TextField
                            onChange={(e) => handleChange(e)}
                            id="standard-basic"
                            name="input"
                            label="Search Headlines"
                            value={searchState.input}
                        />
                        {searchState.searchButton &&
                            <div className="filter-search-wrapper">
                                <TextField
                                    onChange={(e) => handleChange(e)}
                                    id="date"
                                    name="filterDate"
                                    label="Date"
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />

                                <Button
                                    variant="contained"
                                    onClick={(e) => handleSubmit(e)}
                                >
                                    Search
                                </Button>
                            </div>
                        }

                    </div>
                </div>
            </div>

            {!mainState.userHasSearched &&
                <div className="home-options">
                    <Button
                        onClick={(e) => handleSubmit(e, "covid")}
                        className="headlines"
                        variant="contained"
                    >
                        COVID Headlines
                </Button>
                    <Button
                        onClick={(e) => handleSubmit(e, "FIFA")}
                        className="latest"
                        variant="contained"
                    >
                        FIFA Headlines</Button>
                </div>

            }
        </div>
    )
}

export default SearchBar