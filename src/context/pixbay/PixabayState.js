import React, { useReducer } from 'react';
import axios from 'axios';
import { pixabayReducer } from './pixabayReducer';
import { PixabayContect } from './pixabayContext';
import {
    SEARCH_PICTURES,
    GET_PICTURES,
    SET_LOADING,
    CLEAR_PICTURES,
} from './type';

const API_KEY = process.env.REACT_APP_API_KEY;

const routePattern = (page, search) => {
    return `https://pixabay.com/api/?key=${API_KEY}&q=${search}&page=${page}&per_page=20&`;
}

const initialState = {
    hits: [],
    loading: false,
    page: 1,
    search: ''
}

export const PixabayState = ({ children }) => {
    const [state, dispatch] = useReducer(pixabayReducer, initialState);

    const getPictures = async (newPage) => {
        try {
            setLoading();
            const page = newPage || state.page;

            const response = await axios.get(routePattern(page, state.search));
            const hits = [...response.data.hits];

            dispatch({ type: GET_PICTURES, hits, page });
        } catch(e) {
            console.log(e);
        }
    }

    const setSearch = async (value) => {
        try {
            setLoading();
            const search = value.replace(/ /g, '+');
            const page = 1;

            const response = await axios.get(routePattern(page, search));
            
            const hits = [...response.data.hits];
            
            dispatch({ type: SEARCH_PICTURES, hits, page, search });
        } catch(e) {
            console.log(e);
        }
    }

    const nextPageData = (page) => {
        getPictures(page)
    }

    const setLoading = () => dispatch({ type: SET_LOADING });

    const clearPictures = () => dispatch({ type: CLEAR_PICTURES }); 

    const { hits, page, loading } = state;
    
    return (
        <PixabayContect.Provider
            value={{
                hits, loading, page,
                setSearch, getPictures, 
                clearPictures, nextPageData
            }}>
            {children}
        </PixabayContect.Provider>
    )
}