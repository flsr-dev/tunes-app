import axios from './axios';

export const search = async (searchTerm, searchEntity) => {
  try {
    return await axios.get(`search?term=${searchTerm}&entity=${searchEntity}`);
  } catch (e) {
    return { data: {} };
  }
};

export const lookup = async (id, lookupEntity) => {
  try {
    return await axios.get(`lookup?${lookupEntity}=${id}`);
  } catch (e) {
    return { data: {} };
  }
};
