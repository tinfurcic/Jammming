import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import getAccessToken from '../helper functions/getAccessToken';
import parseQueryString from '../helper functions/parseQueryString';
import { useNavigate } from 'react-router-dom';

function Callback() {

    const navigate = useNavigate();

    console.log("Callback rendered")
    const location = useLocation();
    const params = parseQueryString(location.search);

    useEffect(() => {
        const handleCallback = async () => {
            if (params.error) {
                navigate(`/error?type=${params.error}`);
            }

            if (Object.keys(params).includes("code")) {
                const isObtained = await getAccessToken (params);
                if (isObtained) {
                    navigate("/");
                }
            }
        };
        handleCallback();

    }, [params, navigate]);

    return null;
}

export default Callback;

