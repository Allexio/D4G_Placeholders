import { HOST } from './contants';

const checkError = (res) => {
  if (res.status !== 200) {
    throw new Error(res);
  }
  return res;
}

export const getRegions = (prefix = '') => {
  const params = new URLSearchParams({ prefix });
  const url = `${HOST}/regions?${params}`;
  return fetch(url)
    .then(checkError)
    .then((res) => res.json());
};

export const getDepartments = (prefix = '', region = '') => {
  const params = new URLSearchParams({ prefix, region });
  const url = `${HOST}/departments?${params}`;
  return fetch(url)
    .then(checkError)
    .then((res) => res.json());
};

export const getTownships = (prefix = '', region = '', department = '') => {
  const params = new URLSearchParams({ prefix, region, department });
  const url = `${HOST}/townships?${params}`;
  return fetch(url)
    .then(checkError)
    .then((res) => res.json());
};

