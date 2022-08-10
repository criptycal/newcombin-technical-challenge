import axios from './axios';
import type { AxiosResponse } from 'axios';
import type { Payable } from '../interfaces/Payable';

export const getPayables = async (): Promise<AxiosResponse<Payable[]>> => await axios.get("/payables");
export const postPayables = async (payable: Payable) => await axios.post('/payables', payable);
export const getPayableByBarcode = async (barcode: string): Promise<AxiosResponse<Payable>> => await axios.get(`/payables/barcodes/${barcode}`);
export const getPayableByTipoServicio = async (typeservice: string): Promise<AxiosResponse<Payable[]>> => await axios.get(`/payables/services/${typeservice}`);