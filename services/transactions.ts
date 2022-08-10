import axios from './axios';
import type { AxiosResponse } from 'axios';
import type { Transaction } from '../interfaces/Transaction';

export const getTransactions = async (): Promise<AxiosResponse<Transaction[]>> => await axios.get("/transactions");
export const postTransactions = async (transaction: Transaction) => await axios.post('/transactions', transaction);
export const getTransactionByPaymentDate = async (paymentDate: string) => await axios.get(`/transactions/paymentdate/${paymentDate}`);
export const getTransactionByPaymentDates = async (paymentDate: string, paymentDate2: string) => await axios.get(`/transactions/paymentdates/${paymentDate}/${paymentDate2}`);