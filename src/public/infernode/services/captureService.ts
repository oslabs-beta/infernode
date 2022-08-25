/* eslint-disable no-console */
import axios from 'axios';
import deepEqual from 'deep-equal';
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
  async putOne(capture: Capture) {
    try {
      const { data, status } = await Api().put<Capture>(
        `captures/${capture.id}`,
        capture,
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      if (status === 200 && deepEqual(capture, data)) return;
      console.log(
        `Error: unexpected HTTP response code or response: ${status} : ${JSON.stringify(data)}`,
      );
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(`Error: axios: ${JSON.stringify(err)}`);
      }
      console.log(`Error: unknown: ${JSON.stringify(err)}`);
    }
  },
  async deleteOne(capture: Capture) {
    try {
      const { data, status } = await Api().delete<Capture>(
        `captures/${capture.id}`,
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      if (status === 200 && deepEqual(capture, data)) return true;
      console.log(
        `Error: unexpected HTTP response code or response: ${status}`,
      );
      return false;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(`Error: axios: ${JSON.stringify(err)}`);
        return false;
      }
      console.log(`Error: unknown: ${JSON.stringify(err)}`);
      return false;
    }
  },
};
