import {API_URL} from "../utils/serverConfig";

export const request = async (path, method, body) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Headers", "*");

    const response = await fetch(API_URL + path, {
        method,
        headers: Object.fromEntries(headers),
        body: JSON.stringify(body)
    });

    if (response.status === 200) return response.json();
    else throw new Error('error' + response.status);
};