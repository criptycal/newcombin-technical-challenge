<script lang="ts">
    import {Payable} from '../interfaces/Payable';
    import {postPayables} from '../services/payables';
    import {defineComponent} from 'vue';

    export default defineComponent({
        
        data() {
            return {
                payable: {} as Payable,
                errors: [] as string[],
                tipoServicioClass: '' as string,
                descriptionClass: '' as string,
                fechaVencimientoClass: '' as string,
                importeServicioClass: '' as string,
                paymentStatusClass: '' as string,
                barcodeClass: '' as string,
                payableSaved: false as boolean,
                payableNotSaved: false as boolean,
                barcodeMsg: '' as string,
                databaseMsg: '' as string,
            }
        },
        methods: {
            async savePayable(payable: Payable) {
                this.payableSaved = false;
                this.payableNotSaved = false;
                this.barcodeMsg = '';
                try {
                    
                    const res = await postPayables(this.payable);
                    if(res.status === 201) {
                        this.payableSaved = true;
                        this.errors = [];
                        this.payable = {} as Payable;
                        return this.payableNotSaved = false;
                    }
                    
                } catch (error) {
                    this.payableNotSaved = true;
                    this.barcodeMsg = 'El código de barras ya existe';
                    this.barcodeClass = 'is-invalid';
                }
            },
            async submit(){

                this.errors = [];
                this.tipoServicioClass = '';
                this.descriptionClass = '';
                this.fechaVencimientoClass = '';
                this.importeServicioClass = '';
                this.paymentStatusClass = '';
                this.barcodeClass = '';
                this.barcodeMsg = '';
                this.payableSaved = false;
                this.payableNotSaved = false;

                /*
                    const isValid = this.v$.validate()
                    if(isValid){
                        //this.savePayable()
                    }
                */

               if(!this.payable.tipoServicio){
                    this.errors.push('El tipo de servicio es requerido')
                    this.tipoServicioClass = 'is-invalid'
               }

               if(!this.payable.description){
                    this.errors.push('La descripción es requerida')
                     this.descriptionClass = 'is-invalid'
               }

               if(!this.payable.fechavencimiento){
                    this.errors.push('La fecha de vencimiento es requerida')
                    this.fechaVencimientoClass = 'is-invalid'
               }

               if(!this.payable.importeServicio){
                    this.errors.push('El importe del servicio es requerido')
                    this.importeServicioClass = 'is-invalid'
               }

               if(!this.payable.paymentStatus){
                    this.errors.push('El estado del pago es requerido')
                    this.paymentStatusClass = 'is-invalid'
               }
               if(!this.payable.barcode){
                    this.barcodeMsg = 'El código de barras es requerido'
                    return this.barcodeClass = 'is-invalid'
               }





                if(!this.errors.length){
                    this.savePayable(this.payable);                 
                }
    
                 

            }
        }
    })

    
    
</script>

<template>
  <div class="container w-25">
    <div class="mb-3">
        <h1>Crear Boleta</h1>
    </div>
    <div class="alert alert-success" v-if="payableSaved">
        <p>Boleta creada correctamente</p>
    </div>
    <div class="alert alert-danger" v-if="payableNotSaved">
        <p>{{barcodeMsg}}</p>
    </div>
    <form @submit.prevent="submit()" novalidate>
        <div class="mb-3">
            <label class="form-label">Tipo de Servicio</label>
            <select class="form-control" name="tipoServicio" :class="tipoServicioClass"  required v-model="payable.tipoServicio" aria-placeholder="asdasds" >
                <option value="" disabled>Seleccione un tipo de servicio</option>
                <option value="Luz">Luz</option>
                <option value="Television">Televisión</option>
                <option value="Internet">Internet</option>
            </select>
            <div class="invalid-feedback">
                Servicio requerido
            </div>
            
        </div>
        <div class="mb-3">
            <label class="form-label">Description</label>
            <textarea type="text" rows="3" name="description" :class="descriptionClass" v-model="payable.description" placeholder="Edenor S.A" class="form-control"  ></textarea>
            <div class="invalid-feedback">
                Description requerido
            </div>
        </div>
        <div class="mb-3">
            <label class="form-label">Fecha de Vencimiento</label>
            <input type="date" v-model="payable.fechavencimiento" :class="fechaVencimientoClass" class="form-control"  >
            <div class="invalid-feedback">
                Fecha de vencimiento requerida
            </div>
        </div>
        <div class="mb-3">
            <label class="form-label">Importe de Servicio</label>
            <input type="number" v-model="payable.importeServicio" :class="importeServicioClass" class="form-control"  placeholder="1000" >
            <div class="invalid-feedback">
                Importe de servicio requerido
            </div>
        </div>
        <div class="mb-3">
            <label class="form-label">Estado</label>
            <select class="form-control" :class="paymentStatusClass"  v-model="payable.paymentStatus">
                <option disabled value="">Seleccione un estado</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Pagado">Pagado</option>
            </select>
            <div class="invalid-feedback">
                Estado requerido
            </div>
        </div>
        <div class="mb-3">
                <label class="form-label">Código de Barras</label>
                <input min="0" max="13" placeholder="1234567891011" :class="barcodeClass" v-model="payable.barcode" type="text" class="form-control" >
                <div class="invalid-feedback">
                    {{barcodeMsg}}
                </div>
        </div>
        <div class="mb-3">
            <button class="btn btn-primary">Guardar</button>
        </div>
    </form>
</div>
</template>

<style scoped></style>
