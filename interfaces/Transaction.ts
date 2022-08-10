export interface Transaction {
    paymentMethod: string;
    cardNumber: number;
    paymentAmount: number;
    barcode: string;
    paymentDate: Date;
}