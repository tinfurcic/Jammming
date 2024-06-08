import { useEffect } from "react";
import { generateAuthUrl } from "../helper functions/generateAuthUrl";

function Login () {

    useEffect(() => {
        window.location.replace(generateAuthUrl(true));
    }, [])
 
    return null;
}

export default Login;