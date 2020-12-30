
import { searchTitles } from '../services/news.service';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
    TextField,
    Button
} from '@material-ui/core'

// Redux Props
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
};


class SearchBar extends Component {


    componentDidMount() {
        const state = window.history.state;
        // Browser Refreshes
        if (window.history.state) {
            this.getRequest(state.input, state.filterDate);
        };
        // Browser Back 
        window.onpopstate = () => {
            if (window.location.pathname == "/") {
                this.resetApp()
            }
            else {
                let pathParams = window.location.pathname.toString();
                pathParams = pathParams.substring(1, pathParams.length);
                const firstParam = pathParams.split("/", 1);
                const secondParam = pathParams.split("/", 2);
                this.getRequest(firstParam, secondParam)
            };
        };
    };



        // Handle Submit
        handleSubmit(e) {

            const {
                input,
                filterDate
            } = this.props;

            const inputValue = e.term ? e.term : input;

            // save state to Browser Window
            window.history.pushState(
                {
                    input: inputValue,
                    filterDate: filterDate
                },
                `/${inputValue}/${filterDate}`, `/${inputValue}/${filterDate}`
            );
            // API function
            this.getRequest(inputValue, filterDate);
        };



    // Handle Change
    handleChange(event, type) {
        this.props.dispatch({
            type: "HANDLE_CHANGE",
            payload: {
                input: type == "text" ? event.target.value : this.props.input,
                filterDate: type == "date" ? event.target.value : this.props.filterDate,
            }
        });
    };



    // Handle Load
    handleLoad() {
        this.props.dispatch({ type: "HANDLE_LOAD" });
    };



    // Get Request
    getRequest(inputValue, filterDate) {
        // load
        this.handleLoad();

        searchTitles(inputValue, filterDate).then(response => {
            console.log(response);
            // redux function
            this.props.dispatch({
                type: "HANDLE_SUBMIT",
                payload: {
                    articles: response.articles ? response.articles : null,
                    message: response.message,
                }
            });
            // reset input
            this.resetInput()
        }).catch(error => {
            console.log(error)
        });
    };



    // Reset App
    resetApp() {
        this.props.dispatch({ type: "RESET_APP" });
    };



    // Reset Input Fields
    resetInput() {
        this.props.dispatch({ type: "RESET_INPUT" });
    };



    render() {

        const windowState = window.history.state;

        return (
            <div className="search-bar-wrapper">
                <div className={windowState ? "search-bar active" : "search-bar"}>

                    <div className={this.props.loading ? "content-wrapper loading" : "content-wrapper"}>
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