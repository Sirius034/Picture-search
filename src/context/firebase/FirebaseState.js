import React, { useReducer, useContext } from "react";
import axios from 'axios';
import { firebaseReducer } from './firebaseReducer';
import { FirebaseContext } from './firebaseContext';
import { PixabayContect } from "../pixbay/pixabayContext";
import {
    AUTH_SUCCESS,
    AUTH_LOGOUT,
    TO_FAVORITES,
    REMOVE_FROM_FAVORITES,
    EDIT
} from './type';

const initialState = {
    token: null,
    user: {
        id: null,
        name: null,
        age: null,
        email: null,
        chosen: []
    }
}

const schema = {
    id: '',
    name: '',
    age: '',
    email: '',
    chosen: [
        {
            id: 0,
            tags: 'pixabay',
            webformatHeight: 200,
            webformatWidth: 200,
            webformatURL: 'https://pixabay.com/static/img/public/medium_rectangle_a.png'
        }
    ]
}

const KEY = process.env.REACT_APP_KEY_FB; 

export const FirebaseState = ({ children }) => {
    const [state, dispatch] = useReducer(firebaseReducer, initialState);
    const { hits } = useContext(PixabayContect);

    const auth = async (email, password, isLogin) => {
        const authData = {
            email,
            password,
            returnSecureToken: true
        }

        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${KEY}`;

        if (isLogin) {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${KEY}`;
        }

        try {
            const response = await axios.post(url, authData);
            const { localId, idToken, email } = response.data;

            if (!isLogin) {
                setData(localId, idToken, email)
            } else {
                getData(localId, idToken);
            }

        } catch (e) {
            console.log(e)
        }
    }

    const setData = async (id, token, email) => {
        const user = { ...schema, id, email };
        try {
            await axios.put(`https://picture-search-e07e9.firebaseio.com/users/${id}.json`, user);

            dispatch({ type: AUTH_SUCCESS, token, user });
        } catch (e) {
            console.log(e);
        }
    }

    const getData = async (id, token) => {
        try {
            const response = await axios.get(`https://picture-search-e07e9.firebaseio.com/users/${id}.json`);
            const user = response.data;

            dispatch({ type: AUTH_SUCCESS, token, user });
        } catch (e) {
            console.log(e);
        }
    }

    const addToFavorites = async (idPict) => {
        const duplicate = state.user.chosen.find(pict => pict.id === idPict);

        if (!duplicate) {
            const favorites = hits.find(pict => pict.id === idPict);
            const user = { ...state.user };
            const { id, tags, webformatHeight, webformatWidth, webformatURL } = favorites;

            user.chosen.push({
                id, tags, webformatURL, webformatHeight, webformatWidth
            });

            try {
                await axios.put(`https://picture-search-e07e9.firebaseio.com/users/${user.id}/chosen/.json`, user.chosen);

                dispatch({ type: TO_FAVORITES, user });
            } catch (e) {
                console.log(e);
            }
        }
    }

    const removeFavorites = async (idPict) => {
        const user = { ...state.user }
        const chosen = user.chosen.filter(pict => pict.id !== idPict);

        user.chosen = chosen.length
            ? chosen
            : schema.chosen;

        try {
            await axios.put(`https://picture-search-e07e9.firebaseio.com/users/${user.id}/chosen/.json`, user.chosen);

            dispatch({ type: REMOVE_FROM_FAVORITES, user });
        } catch (e) {
            console.log(e);
        }
    }

    const editor = async (control) => {
        const user = { ...state.user };

        Object.keys(control)
            .forEach(fieldName => user[fieldName] = control[fieldName]);

        try {
            await axios.put(`https://picture-search-e07e9.firebaseio.com/users/${user.id}/.json`, user);

            dispatch({type: EDIT, user});
        }catch(e) {
            console.log(e);
        }
    }

    const logout = () => dispatch({ type: AUTH_LOGOUT, user: initialState.user });

    const { token, user } = state;
    return (
        <FirebaseContext.Provider
            value={{
                token, user,
                auth, logout, addToFavorites, removeFavorites, editor
            }}>
            {children}
        </FirebaseContext.Provider>
    );
}
