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
  async putOne(capture: Capture) {
    try {
      const { data, status } = await Api().put<Capture>(
        `captures/${capture.id}`,
        capture,
      );
      if (status === 200 && data == capture) return;
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
  async deleteOne(id: number) {
    try {
      const { status } = await Api().delete(
        `captures/${id}`,
      );
      if (status === 200) return true;
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
