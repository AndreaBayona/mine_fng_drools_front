import {useState, useEffect} from 'react';

const useFetch = ({request}) => {

    const [data, setData] = useState(null);

    useEffect(() => {

        async function startFetching() {
            console.log("fetchionng");
            if (request && request.url) {
                setData(null);
                const result = await fetch(request.url, {
                    method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(request.body)
                });
                if (!ignore) {
                    setData(result);
                    console.log(result);
                }
            }
        }

        let ignore = false;
        startFetching();

        return () => {
            ignore = true;
        }

    }, [request]);


    return {data};
}

export default useFetch;