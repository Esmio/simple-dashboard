import axiosClient from './axiosClient';

const salesApi = {
  getSaleList: () => axiosClient.get('sales/list'),
};

export default salesApi;
