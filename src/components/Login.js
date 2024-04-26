import { useEffect } from "react";
import { generateAuthUrl } from "../helper functions/generateAuthUrl";

function Login () {

    useEffect(() => {
        window.location.href = generateAuthUrl();
    }, [])
 
    return null;
}

export default Login;