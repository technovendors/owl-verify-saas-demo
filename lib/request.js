import fetch from 'isomorphic-unfetch';

const API_HOST = 'https://031goqjhgb.execute-api.us-east-2.amazonaws.com/v1';

const getUrl = (endpoint) => {
  return API_HOST + endpoint;
};

export const get = async (endpoint) => {
  let api_key = await localStorage.getItem('api_key')

  let url = getUrl(endpoint);
  const res = await fetch(url, {
    method: "get",
    mode: "cors",
    headers: {
      'x-api-key': api_key
    }
  });

  return await res.json();
};

export const post = async (endpoint, body) => {
  let api_key = await localStorage.getItem('api_key')

  let url = getUrl('/email/lists');
  const res = await fetch(url, {
    method: "post",
    mode: "cors",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-api-key': api_key,
    },
    body: body
  });

  return await res.json();
};
