import {
    AUTH_LOGOUT,
    AUTH_SUCCESS,
    TO_FAVORITES,
    REMOVE_FROM_FAVORITES,
    EDIT, ERROR
} from './type';

const handlers = {
    [AUTH_SUCCESS]: (state, { token, user }) => ({ ...state, token, user }),
    [AUTH_LOGOUT]: (state, { user }) => ({ ...state, token: null, user }),
    [TO_FAVORITES]: (state, { user }) => ({ ...state, user }),
    [REMOVE_FROM_FAVORITES]: (state, { user }) => ({ ...state, user }),
    [EDIT]: (state, { user }) => ({ ...state, user }),
    [ERROR]: (state, { error }) => ({ ...state, error }),
    DEFAULT: state => state
}

export const firebaseReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT;
    return handler(state, action);
}