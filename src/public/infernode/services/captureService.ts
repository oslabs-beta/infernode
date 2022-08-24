/* eslint-disable no-console */
import axios from 'axios';
import Api from './Api';
import { Capture } from '../store/interfaces';

export default {
  async getAll() {
    try {
      const { data, status } = await Api().get<Capture[]>('captures');
      if (status === 200) return data;
      console.log(`Error: unexpected HTTP response code: ${status}`);
      return [];
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(`Error: axios: ${JSON.stringify(err)}`);
        return [];
      }
      console.log(`Error: unknown: ${JSON.stringify(err)}`);
      return [];
    }
  },
};
