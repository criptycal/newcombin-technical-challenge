<script lang="ts">
  import { defineComponent } from "vue";
  import { Transaction } from "../interfaces/Transaction";
  import { postTransactions } from "../services/transactions";

  export default defineComponent({

    data(){
      return{
        transaction: {} as Transaction,
        paymentMethodClass: '' as string,
        cardNumberClass: '' as string,
        paymentAmountClass: '' as string,
        paymentDateClass: '' as string,
        barcodeClass: '' as string,
        isValid: false as boolean,
        barcodeMsg: '' as string,
      }
    },
    methods: {
        async submit(){
          this.paymentMethodClass = '';
          this.cardNumberClass = '';
          this.paymentAmountClass = '';
          this.paymentDateClass = '';
          this.barcodeClass = '';

          if(!this.transaction.paymentMethod){
            this.paymentMethodClass = 'is-invalid';
          }

          if(!this.transaction.paymentAmount){
            this.paymentAmountClass = 'is-invalid';
          }

          if(this.transaction.paymentMethod === 'Credit Card' || this.transaction.paymentMethod === 'Debit Card'){
            if(!this.transaction.cardNumber){
              this.cardNumberClass = 'is-invalid';
            }
          }

          if(!this.transaction.paymentDate){
            this.paymentDateClass = 'is-invalid';
          }

          if(!this.transaction.barcode){
            this.barcodeMsg = 'El código de barras no puede estar vacío';
            return this.barcodeClass = 'is-invalid';
          }

          if(this.transaction.paymentMethod === 'Credit Card' || this.transaction.paymentMethod === 'Debit Card'){
            if(this.transaction.cardNumber && this.transaction.paymentAmount && this.transaction.paymentDate && this.transaction.barcode){
              //this.isValid = true;
              this.saveTransaction(this.transaction);
            }
          } 

          if(this.transaction.paymentMethod === 'Cash'){
            this.transaction.cardNumber = 0;
            if(this.transaction.paymentAmount && this.transaction.paymentDate && this.transaction.barcode){
              //this.isValid = true;
              this.saveTransaction(this.transaction);
            }
          }
          
        },
        async saveTransaction(transaction: Transaction){
          //this.isValid = false;
          this.paymentMethodClass = '';
          this.cardNumberClass = '';
          this.paymentAmountClass = '';
          this.paymentDateClass = '';
          this.barcodeClass = '';
          try {
            
            const res = await postTransactions(transaction);
            if(res.status === 201){
              this.isValid = true;
              return this.transaction = {} as Transaction;
              //return this.isValid = false;
            }
          } catch (error) {
            this.isValid = false;
            this.barcodeClass = 'is-invalid';
            this.barcodeMsg = 'El código de barras ya se encuentra pago';
          }
        }
      }
    });
  
</script>

<template>
  <div class="container w-25">
    <h1>Pagar Boleta</h1>
    <div class="alert alert-success" v-if="isValid">
        <p>Boleta pagada correctamente</p>
    </div>
    <form @submit.prevent="submit()" novalidate>
      <div class="mb-3">
        <label class="form-label">Payment Method</label>
        <select class="form-control " :class="paymentMethodClass" v-model="transaction.paymentMethod">
          <option value="" disabled>Seleccione una opción</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Debit Card">Debit Card</option>
          <option value="Cash">Cash</option>
        </select>
        <div class="invalid-feedback">
          Payment Method is required
        </div>
      </div>
      <div class="mb-3" v-if="transaction.paymentMethod === 'Credit Card' || transaction.paymentMethod === 'Debit Card'">
        <label class="form-label">Card Number</label>
        <input type="number" class="form-control" :class="cardNumberClass" v-model="transaction.cardNumber" placeholder="1234567891011">
        <div class="invalid-feedback">
          Card Number is required
        </div>

      </div>
      <div class="mb-3">
        <label class="form-label">Payment Amount</label>
        <input type="number" class="form-control" :class="paymentAmountClass" v-model="transaction.paymentAmount" placeholder="Payment Amount">
        <div class="invalid-feedback">
          Payment Amount is required
          </div>
      </div>
      <div class="mb-3">
        <label class="form-label">Payment Date</label>
        <input type="date" class="form-control" :class="paymentDateClass" v-model="transaction.paymentDate">
        <div class="invalid-feedback">
          Payment Date is required
          </div>
      </div>
      <div class="mb-3">
        <label class="form-label">Barcode</label>
        <input type="text" :class="barcodeClass" v-model="transaction.barcode" class="form-control" placeholder="1234567891011">
        <div class="invalid-feedback">
          {{barcodeMsg}}
          </div>
      </div>
      <button class="btn btn-primary mt-3">Save</button>
    </form>

    
  </div>
  
</template>

<style scoped></style>
