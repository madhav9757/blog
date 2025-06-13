import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector(state => state.auth.status); // true if logged in, false if not

    useEffect(() => {
        // --- Logic Explanation ---
        // 'authentication' is the prop telling us if the current route needs auth (true) or not (false).
        // 'authStatus' is the actual Redux state of user authentication.

        // Scenario 1: Route requires authentication (authentication = true)
        // AND user is NOT authenticated (authStatus = false)
        // -> Redirect to login page
        if (authentication && authStatus === false) {
            navigate("/login");
        }
        // Scenario 2: Route DOES NOT require authentication (authentication = false)
        // (e.g., login/signup page)
        // AND user IS authenticated (authStatus = true)
        // -> Redirect to home page (or dashboard)
        else if (!authentication && authStatus === true) {
            navigate("/");
        }
        // In all other cases (e.g., authentication required and user is authenticated,
        // or authentication not required and user is not authenticated),
        // let the children component render.
        setLoader(false);

    }, [authStatus, navigate, authentication]); // Dependencies: authStatus, navigate, authentication

    // While the authentication check is happening, show a loader.
    // Once the check is complete and any necessary navigation has occurred,
    // render the children.
    return loader ? <h1>Loading...</h1> : <>{children}</>;
}