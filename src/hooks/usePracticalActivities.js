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

function usePracticalActivity (ID) {
    let apiUrl = '';

    if (ID !== undefined) {
        apiUrl = `https://dekra-form-api-m8bsw.ondigitalocean.app/practical-activities/${ID}`;
    } else {
        apiUrl = 'https://dekra-form-api-m8bsw.ondigitalocean.app/practical-activities';
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
            .then((res) => {
                if (isMounted) {
                    dispatch({ type: 'RESOLVED', response: res })
                }
            }).catch(error => {
                dispatch({ type: 'ERROR', error })
            })
        return () => { isMounted = false }
    }, [apiUrl]);

    return [state.loading, state.response, state.error];
}

export default usePracticalActivity;