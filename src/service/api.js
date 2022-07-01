import Axios from 'axios';

const api = Axios.create({
  baseURL: ' https://sdui.stage.tllms.com',
});

const getAllData = async (payload) => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      type: payload.type,
      schema_version: payload.schema_version,
      cohort_id: payload.cohort_id,
      device_orientation: payload.device_orientation,
      device_os: payload.device_os,
      theme_name: payload.theme_name,
    },
  };
  try {
    const response = await api.get('/admin', config);
    return response.data;
  } catch (Error) {
    throw Error;
  }
};

const createNewData = async (payload) => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await api.post('/admin', payload, config);
    return response.data;
  } catch (Error) {
    throw Error;
  }
};

export { getAllData, createNewData };
