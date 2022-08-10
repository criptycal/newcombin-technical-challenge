export interface Payable {
    tipoServicio: string;
    description: string;
    fechavencimiento: Date;
    importeServicio: number;
    paymentStatus: string;
    barcode: string;
}