const SET_WS_USERNAME = 'SET_WS_USERNAME';

export const setUsername = (username) => ({type: SET_WS_USERNAME, username});

const initialState = {
    username: ''
};

export const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_WS_USERNAME:
            return {
                ...state,
                username: action.username
            }
        default:
            return state;
    }
}
