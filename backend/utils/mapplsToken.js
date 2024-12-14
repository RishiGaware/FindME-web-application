import qs from 'qs';
import axios from 'axios';
const generateToken= async ()=>{

    const tokenURL = 'https://outpost.mappls.com/api/security/oauth/token';

    const formData = qs.stringify({
        grant_type: "client_credentials",
        client_id: process.env.MAPPLS_TOKEN,
        client_secret: process.env.MAPPLS_SECRET
    });

    const result = await axios({method: "post", data: formData, url: tokenURL, headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    } });

    return result.data.access_token;
}

export {generateToken};