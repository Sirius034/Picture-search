import {
    GET_PICTURES,
    SEARCH_PICTURES,
    SET_LOADING,
    NEXT_PAGE,
    SET_PER_PAGE,
    SET_ORDER
} from './type';

const handlers = {
    [SEARCH_PICTURES]: (state, { hits, page, search }) => ({ ...state, hits, page, search, loading: false }),
    [GET_PICTURES]: (state, { hits, page }) => ({ ...state, hits, page, loading: false }),
    [NEXT_PAGE]: (state, { hits, page }) => ({ ...state, hits, page, loading: false }),
    [SET_PER_PAGE]: (state, { hits, per_page }) => ({ ...state, hits, per_page, loading: false }),
    [SET_ORDER]: (state, { hits, order, page }) => ({ ...state, hits, order, page, loading: false }),
    [SET_LOADING]: state => ({ ...state, loading: true }),
    DEFAULT: state => state
}

export const pixabayReducer = (state, action) => {
    const handler = handlers[action.type] || action.DEFAULT;
    return handler(state, action);
}