import {
    HANDLE_CHANGE,
    HANDLE_LOAD,
    ERROR,
    SEARCH_BUTTON,
    INPUT,
    FILTER_DATE,
    RESET_INPUT,
    HANDLE_SUBMIT
} from './actions';

const initialState = {
    articles: null,
    loading: window.history.state ? true : false,
    error: null,
    searchButton: false,
    input: "",
    filterDate: "",
    userHasSearched: false
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case HANDLE_SUBMIT:
            return {
                ...state,
                articles: action.payload.articles,
                loading: false,
                error: action.payload.message ? action.payload.message : null,
                userHasSearched: true
            };
        case HANDLE_CHANGE:
            return {
                ...state,
                input: action.payload.input,
                searchButton: action.payload ? true : false,
                filterDate: action.payload.filterDate
            };
        case HANDLE_LOAD:
            return {
                ...state,
                loading: state.loading ? false : true,
            };
        case ERROR:
            return {
                error: null
            };
        case SEARCH_BUTTON:
            return {
                searchButton: null
            };
        case INPUT:
            return {
                input: null
            };
        case FILTER_DATE:
            return {
                filterDate: null
            };
        case RESET_INPUT:
            return {
                ...state,
                searchButton: false,
                input: "",
                filterDate: ""
            }
        default:
            return state;
    }
}

export default reducer


