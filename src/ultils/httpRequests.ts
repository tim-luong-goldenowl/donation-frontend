import axios from "axios";

const rootPath = 'http://localhost:3000'

const axiosRequest = axios.create({
  baseURL: rootPath,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true,
  timeout: 300000,
  transformRequest: [function (data: any) {
    return JSON.stringify(data)
  }]
})

export async function getRequest(path = "", headers = {}) {
  try {
    const response = await axiosRequest({
      url: path,
      method: 'GET',
      headers
    })

    return response.data;
  } catch (err: any) {
    if (err.response) {
      return Promise.reject(err.response)
    }
  }
}

export async function postRequest(path = "", data: any, headers: any = {}) {
  try {
    const response = await axiosRequest({
      url: path,
      method: 'POST',
      data: JSON.parse(data),
      headers
    });

    return response.data;
  } catch (err: any) {
    if (err.response) {
      return Promise.reject(err.response)
    }
  }
}
