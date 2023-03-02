// Context creation for API = https://hn.algolia.com/api/v1/search?
import React, { useContext, useReducer, useEffect} from 'react';
import reducer from '../reducer';
// import Pagination from './Pagination';

let API = "https://hn.algolia.com/api/v1/search?";

const initialState = {
    isLoading : true,
    query : "NEWS",
    nbPages: 0,
    page: 0,
    hits: [ ],
};

const AppContext = React.createContext();

// To create a provider function

const AppProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchApiData = async (url) => {
        dispatch({ type: "SET_LOADING" });

        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            dispatch({ 
                type: "GET_STORIES",
                payload: {
                    hits: data.hits,
                    nbPages: data.nbPages,
                },
            });
            // isLoading = false;
        } catch (error) {
            console.log(error);
        }
    };

    // to Remove Post
    const removePost = (post_ID) => {
        dispatch({ type: 'REMOVE_POST',  payload: post_ID });
    };

    //search
    const searchPost = (searchQuery) => {
        dispatch({ type: 'SEARCH_QUERY', payload: searchQuery, });
    };

    // Pagination
    const getNextPage = () => {
        dispatch({ 
            type: 'NEXT_PAGE',
        });
    };

    const getPrevPage = () => {
        dispatch({ 
            type: 'PREV_PAGE',
        });
    };
    // to call the API function
    useEffect(() => {
        fetchApiData(`${API}query=${state.query}&page=${state.page}`);
    }, [ state.query, state.page ]);

    return ( 
        <AppContext.Provider value={{ ... state, removePost, searchPost, getNextPage, getPrevPage }}>
            { children }
        </AppContext.Provider>
    );
};

// custom hook creation 
const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };








// // Context creation for API = http://universities.hipolabs.com/search?
// import React, { useContext, useReducer, useEffect} from 'react';
// import reducer from '../reducer';
// // import Pagination from './Pagination';


// let API = "https://api.publicapis.org/entries";

// const initialState = {
//     isLoading : true,
//     query : "NEWS",
//     count: 50,
//     page: 0,
//     entries: [ ],
// };

// const AppContext = React.createContext();

// // To create a provider function

// const AppProvider = ({ children }) => {

//     const [state, dispatch] = useReducer(reducer, initialState);

//     const fetchApiData = async (url) => {
//         dispatch({ type: "SET_LOADING" });

//         try {
//             const res = await fetch(url);
//             const data = await res.json();
//             console.log(data);
//             dispatch({ 
//                 type: "GET_STORIES",
//                 payload: {
//                     entries: data.entries,
//                     count: data.count,
//                 },
//             });
//             // isLoading = false;
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     // to Remove Post
//     const removePost = (post_ID) => {
//         dispatch({ type: 'REMOVE_POST',  payload: post_ID });
//     };

//     //search
//     const searchPost = (searchQuery) => {
//         dispatch({ type: 'SEARCH_QUERY', payload: searchQuery, });
//     };

//     // Pagination
//     const getNextPage = () => {
//         dispatch({ 
//             type: 'NEXT_PAGE',
//         });
//     };

//     const getPrevPage = () => {
//         dispatch({ 
//             type: 'PREV_PAGE',
//         });
//     };
//     // to call the API function
//     useEffect(() => {
//         fetchApiData(`${API}query=${state.query}&page=${state.page}`);
//     }, [ state.query, state.page ]);

//     return ( 
//         <AppContext.Provider value={{ ... state, removePost, searchPost, getNextPage, getPrevPage }}>
//             { children }
//         </AppContext.Provider>
//     );
// };

// // custom hook creation 
// const useGlobalContext = () => {
//     return useContext(AppContext);
// };

// export { AppContext, AppProvider, useGlobalContext };