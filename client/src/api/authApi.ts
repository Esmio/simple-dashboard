import axiosClient from './axiosClient';

import { SignupParams, LoginParams } from './types';

const authApi = {
  signup: (params: SignupParams) => axiosClient.post('auth/signup', params),
  login: (params: LoginParams) => axiosClient.post('auth/login', params),
  verifyToken: () => axiosClient.post('auth/verify-token'),
};

export default authApi;
