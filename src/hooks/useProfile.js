import { useEffect, useReducer } from "react";

function reducer (state, action) {
    switch(action.type) {
        case 'LOADING': {
            return { ...state, loading: true }
        }
        case 'RESOLVED': {
            return { ...state, loading: false, response: action.response, error: null }
        }
        case 'ERROR': {
            return { ...state, loading: false, response: null, error: action.error }
        }
        default:
            return state;
    }
}

function useProfile (cvID) {
    let id;
    let apiUrl = '';

    if (cvID !== undefined) {
        (typeof cvID === "object") ? id = cvID.id : id = cvID;
        apiUrl = `http://localhost:1337/cvs/${id}`;
    } else {
        apiUrl = 'http://localhost:1337/cvs';
    }

    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        response: null,
        error: null
    });

    useEffect(() => {
        let isMounted = true;
        dispatch({ type: 'LOADING' });
        fetch(apiUrl)
            .then(res => res.json())
            .then((repos) => {
                if (isMounted) {
                    dispatch({ type: 'RESOLVED', response: repos })
                }
            }).catch(error => {
                dispatch({ type: 'ERROR', error })
            })
        return () => { isMounted = false }
    }, [apiUrl]);

    return [state.loading, state.response, state.error];
}

export default useProfile;