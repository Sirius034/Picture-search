import {
    GET_PICTURES,
    GET_CHOSEN,
    SEARCH_PICTURES,
    SET_LOADING,
    CLEAR_PICTURES,
    NEXT_PAGE
} from './type';

const handlers = {
    [SEARCH_PICTURES]: (state, { hits, page, search }) => ({ ...state, hits, page, search, loading: false }),
    [GET_PICTURES]: (state, { hits, page }) => ({ ...state, hits, page, loading: false }),
    [GET_CHOSEN]: (state, { payload }) => ({ ...state, chosen: payload, loading: false }),
    [NEXT_PAGE]: (state, { page }) => ({ ...state, page }),
    [SET_LOADING]: state => ({ ...state, loading: true }),
    [CLEAR_PICTURES]: state => ({ ...state, hits: [] }),
    DEFAULT: state => state
}

export const pixabayReducer = (state, action) => {
    const handler = handlers[action.type] || action.DEFAULT;
    return handler(state, action);
}