
import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useAppContext } from '../libs/useContext'
import { searchTitles } from '../services/news.service';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
    TextField,
    Button
} from '@material-ui/core'


const mapStateToProps = (state) => {
    return {
        articles: state.articles,
        loading: state.loading,
        error: state.error,
        searchButton: state.searchButton,
        input: state.input,
        filterDate: state.filterDate,
        userHasSearched: state.userHasSearched
    };
}


class SearchBar extends Component {

    // const history = useHistory();

    // const { props, setprops } = useAppContext();
    /*
    const [props, setprops] = useState({
          searchButton: false,
          input: "",
          filterDate: ""
      });
  
    */

    // Page Refreshes
    /*
       useEffect(() => {
        if (history.location.state) {

            handleLoad();

            searchTitles(
                history.location.state.params.input,
                history.location.state.params.filterDate
            ).then(response => {
                setprops({
                    articles: response.articles ? response.articles : null,
                    loading: false,
                    error: response.message ? response.message : null,
                    userHasSearched: props.userHasSearched
                });
            }).catch(error => {
                console.log(error);
            });


            setprops({
                searchButton: false,
                input: "",
                filterDate: ""
            });
        }
        else {
            history.push({
                pathname: `/`,
            });
        };
    }, [])
   
 



    // Routing
    window.onpopstate = () => {

        if (history.location.pathname == "/") {
            setprops({
                articles: null,
                loading: false,
                error: null,
                userHasSearched: false
            });
        }
        else {

            handleLoad()

            searchTitles(
                history.location.state.params.input,
                history.location.state.params.filterDate
            ).then(response => {
                setprops({
                    articles: response.articles ? response.articles : null,
                    loading: false,
                    error: response.message ? response.message : null,
                    userHasSearched: true
                });
            }).catch(error => {
                console.log(error)
            });

            setprops({
                searchButton: false,
                input: "",
                filterDate: ""
            });
        };

    };



     */

    componentDidMount() {
        console.log(window.history)
    }



    // Handle Change
    handleChange(event, type) {
        this.props.dispatch({
            type: "HANDLE_CHANGE",
            payload: {
                input: type == "text" ? event.target.value : this.props.input,
                filterDate: type == "date" ? event.target.value : this.props.filterDate,
            }
        });

        /*
        setprops({
            searchButton: event.target.value ? true : false,
            input: updateInputs.input,
            filterDate: updateInputs.filterDate
        });
        */
    };


    // Handle Load
    handleLoad() {
        this.props.dispatch({ type: "HANDLE_LOAD" });
    };

    // Get Request
    getRequest(inputValue, filterDate) {
        searchTitles(inputValue, filterDate).then(response => {
            console.log(response)
            // save state to Browser Router
            window.history.pushState(
                {
                    input: inputValue,
                    filterDate: filterDate
                },
                `/${inputValue}/${filterDate}`, `/${inputValue}/${filterDate}`
            )
            /*
                 this.props.history.push({
                pathname: `/${inputValue}/${filterDate}`,
                state: {
                    params: {
                        input: inputValue,
                        filterDate: filterDate
                    }
                }
            });
            */

            // redux function
            this.props.dispatch({
                type: "HANDLE_SUBMIT",
                payload: {
                    articles: response.articles ? response.articles : null,
                    message: response.message,
                }
            })
            // reset input
            this.resetInput()
            /*
              setprops({
                articles: response.articles ? response.articles : null,
                loading: false,
                error: response.message ? response.message : null,
                userHasSearched: true
            });
            */
        }).catch(error => {
            console.log(error)
        });
    }




    // Handle Submit
    handleSubmit(e) {

        const {
            input,
            filterDate
        } = this.props;

        const inputValue = e.term ? e.term : input;

        // load
        this.handleLoad();
        // API function
        this.getRequest(inputValue, filterDate);

    };


    // Reset Input Fields
    resetInput() {
        this.props.dispatch({ type: "RESET_INPUT" })
    }



    render() {
        return (

            <div className="search-bar-wrapper">
                <div className={this.props.userHasSearched ? "search-bar active" : "search-bar"}>

                    <div className="content-wrapper">
                        <div className="content-headings">
                            <h1>Discover</h1><h2>Headlines</h2>
                        </div>

                        <div className="content-input">
                            <TextField
                                onChange={(e) => this.handleChange(e, "text")}
                                id="standard-basic"
                                name="input"
                                label="Search Headlines"
                                value={this.props.input}
                            />
                            {this.props.searchButton &&
                                <div className="filter-search-wrapper">
                                    <TextField
                                        onChange={(e) => this.handleChange(e, "date")}
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
                                        onClick={(e) => this.handleSubmit(e)}
                                    >
                                        Search
                                </Button>
                                </div>
                            }
                        </div>
                    </div>
                </div>

                {!this.props.userHasSearched && !this.props.loading && 
                    <div className="home-options">
                        <Button
                            onClick={(e) => this.handleSubmit({ term: "covid" })}
                            className="headlines"
                            variant="contained"
                        >
                            COVID Headlines
                </Button>
                        <Button
                            onClick={(e) => this.handleSubmit({ term: "FIFA" })}
                            className="latest"
                            variant="contained"
                        >
                            FIFA Headlines</Button>
                    </div>
                }
            </div>
        )
    }
}

export default connect(mapStateToProps)(SearchBar)