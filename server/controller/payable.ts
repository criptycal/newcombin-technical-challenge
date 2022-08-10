import Payable from '../models/Payable';

/*
    @author: David Salamanca Camelo
*/

/*
    @route   POST api/payables
*/
export const postPayables = async (req: any, res: any, next: any) => {
    try {
       
        const {tipoServicio, description, fechavencimiento, importeServicio, paymentStatus, barcode} = req.body;
        const payable = new Payable({tipoServicio, description, fechavencimiento, importeServicio, paymentStatus, barcode});
        const savedPayable = await payable.save();
        console.log('balota guardada en la base de datos');
        return res.status(201).json(savedPayable);
    } catch (error) {
        console.log(error);
        console.log('error al guardar la balota en la base de datos');
        return res.status(500).json({message: 'Error al guardar la balota'});
    }

}

/*
    @route   GET api/payables
*/
export const getPayables = async (req: any, res: any, next: any) => {
    try {
        const payables = await Payable.find({paymentStatus: 'Pendiente'});
        res.json(payables);
    } catch (error) {
        console.log(error);
    }
}

/*
    @route   GET api/payables/:id
*/

export const getPayable = async (req: any, res: any, next: any) => {
    try {
        const payable = await Payable.findById(req.params.id);
        return res.json(payable);
    } catch (error) {
        console.log(error);
    }
}

/*
    @route   PUT api/payables/:id
*/
export const putPayable = async (req: any, res: any, next: any) => {
    try {
        const payable = await Payable.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.json(payable);
    } catch (error) {
        console.log(error);
    }
}

/*
    @route   DELETE api/payables/:id
*/
export const deletePayable = async (req: any, res: any, next: any) => {
    try {
        const payable = await Payable.findByIdAndDelete(req.params.id);
        res.json(payable);
    } catch (error) {
        console.log(error);
    }
}

/*
    @route   GET api/payables/:id
*/
export const getPayableByTipoServicio = async (req: any, res: any, next: any) => {
    try {
        const {typeservice} = req.params;
        const payable = await Payable.find({tipoServicio: typeservice, paymentStatus: 'Pendiente'});
        if(!payable) {
            return res.status(404).json({message: 'No hay balotas con ese tipo de servicio'});
        }
        res.json(payable);
    } catch (error) {
        
        console.log(error);
    }
}

/*
    @route   GET api/payables/barcodes/:barcode
*/
export const getPayableByBarcode = async (req: any, res: any, next: any) => {
    try {
        const {barcode} = req.params;
        const payable = await Payable.find({barcode: barcode});
        if(!payable) {
            return res.status(404).json({message: 'No hay balotas con ese codigo de barras'});
        }
        res.json(payable);
    } catch (error) {
        console.log(error);
    }
} 

/*
    @route   GET api/payables/:id
*/
export const getPayableByPaymentStatus = async (req: any, res: any, next: any) => {
    try {
        const {paymentstatus} = req.params;
        const payable = await Payable.find({paymentStatus: paymentstatus});
        res.json(payable);
    } catch (error) {
        console.log(error);
    }
}