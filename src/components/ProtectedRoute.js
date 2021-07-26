import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ component: Component, userAuthenticated, ...rest }) {
    return (
        <Route {...rest} render={
            props => {
                if (userAuthenticated) {
                    return <Component {...rest} {...props} />
                } else {
                    return <Redirect to={
                        {
                            pathname: "/",
                            state: {
                                from: props.location
                            }
                        }
                    } />
                }
            }
        } />
    )
}

export default ProtectedRoute;