import { useState, useEffect } from "react";
import axios from "axios";

const useAxios = () => {

  const [options, makeRequest] = useState({});
  const [response, setResponse] = useState({});
  const [error, setError] = useState({});

  useEffect(() => {
    async function callApi(){
      try{
        const res = await axios(options);
        setResponse(res.data);
      } catch(e){
        setError(e);
      }
    }
    callApi();
  }, [options]);

  return { makeRequest, response, error };
};

export default useAxios;
