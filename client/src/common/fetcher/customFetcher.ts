import axiosInstance from './axios.instance';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export const customFetcher = async <T>(
  url: string,
  config: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  try {
    const response = await axiosInstance.request<T>({
      url,
      ...config,
    });

    return response;
  } catch (err) {
    console.error('Error in customFetcher:', err);
    throw err;
  }
};
