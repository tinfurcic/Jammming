export default function parseQueryString(queryString) {
    const params = {};
    const queryStringWithoutQuestionMark = queryString.substring(1);
    const keyValuePairs = queryStringWithoutQuestionMark.split('&');
    keyValuePairs.forEach(keyValue => {
        const [key, value] = keyValue.split('=');
        params[key] = value;
    });
    return params;
}

