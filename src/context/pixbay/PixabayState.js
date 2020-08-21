import React, { useReducer } from 'react';
import axios from 'axios';
import { pixabayReducer } from './pixabayReducer';
import { PixabayContect } from './pixabayContext';
import {
    SEARCH_PICTURES,
    GET_PICTURES,
    SET_LOADING,
    NEXT_PAGE,
    SET_PER_PAGE,
    SET_ORDER
} from './type';

const API_KEY = process.env.REACT_APP_API_KEY;

const routePattern = url => `https://pixabay.com/api/?key=${API_KEY}${url}`;

const getURL = ({ order, search, page, per_page }) => `&q=${search}&order=${order}&page=${page}&per_page=${per_page}`;

const initialState = {
    hits: [],
    loading: false,
    page: 1,
    per_page: 20,
    search: '',
    order: 'popular'
}

export const PixabayState = ({ children }) => {
    const [state, dispatch] = useReducer(pixabayReducer, initialState);

    const getPictures = async () => {
        setLoading();
        try {
            const response = await axios.get(routePattern(getURL(state)));
            const hits = [...response.data.hits];

            dispatch({ type: GET_PICTURES, hits, page });
        } catch (e) {
            console.log(e);
        }
    }

    const setSearch = async value => {
        setLoading();
        try {
            const search = value.replace(/ /g, '+');
            const page = 1;

            const response = await axios.get(routePattern(getURL({ ...state, page, search })));

            const hits = response.data.hits;

            dispatch({ type: SEARCH_PICTURES, hits, page, search });
        } catch (e) {
            console.log(e);
        }
    }

    const nextPageData = async page => {
        setLoading();
        try {
            const response = await axios.get(routePattern(getURL({ ...state, page })));
            const hits = response.data.hits;

            dispatch({ type: NEXT_PAGE, hits, page });
        } catch (e) {
            console.log(e);
        }
    }

    const setPerPage = async per_page => {
        setLoading();
        try {
            const response = await axios.get(routePattern(getURL({ ...state, per_page })));
            const hits = response.data.hits;

            dispatch({ type: SET_PER_PAGE, hits, per_page });
        } catch (e) {
            console.log(e);
        }
    }

    const setOrder = async order => {
        setLoading();
        try {
            const page = 1;
            const response = await axios.get(routePattern(getURL({ ...state, order, page })));
            const hits = response.data.hits;

            dispatch({ type: SET_ORDER, hits, order, page });
        } catch (e) {
            console.log(e);
        }
    }

    const setLoading = () => dispatch({ type: SET_LOADING });

    const { hits, page, loading, search, order } = state;

    return (
        <PixabayContect.Provider
            value={{
                hits, loading, page, search, order,
                setSearch, getPictures,
                nextPageData, setPerPage, setOrder
            }}>
            {children}
        </PixabayContect.Provider>
    )
}