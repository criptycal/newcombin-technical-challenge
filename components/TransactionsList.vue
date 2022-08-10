<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { getTransactions, getTransactionByPaymentDate, getTransactionByPaymentDates } from '../services/transactions';
  import { Transaction } from '../interfaces/Transaction';
  import Datepicker from '@vuepic/vue-datepicker'
  import '@vuepic/vue-datepicker/dist/main.css'

  
  

  export default defineComponent({
    name: 'TransactionsList',
    components: {
      Datepicker
    },
/*
    setup(){
      const date = ref();

      onMounted(()=>{
        const startDate = new Date();
        const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
        
        date.value = {
          startDate,
          endDate
        }
        
      });

      return {
        date
      }
    },
*/
    data() {
      return {
        transactions: [] as Transaction[],
        date: new Date() as Date,
        sumall: 0 as number
       
      };
    },
    methods: {
      async fetchTransactions() {
        try {
          const res = await getTransactions();
          this.transactions = res.data;
          this.sumall = this.transactions.map(transaction => transaction.paymentAmount).reduce((a, b) => a + b, 0);
        } catch (error) {
          console.log(error);
        }
      },

      async fetchTransactionsByPaymentDate(date: Date) {
        try {
          const chars = date.toISOString().split('T')[0];
          const res = await getTransactionByPaymentDate(chars);
          this.transactions = res.data;
          this.sumall = this.transactions.map(transaction => transaction.paymentAmount).reduce((a, b) => a + b, 0);
        } catch (error) {
          console.log(error);
        }
      },

      //fetch transactions by payment dates
      async fetchTransactionsByPaymentDates(date: any) {
        try {
          const date1 = date[0].toISOString().split('T')[0];
          const date2 = date[1].toISOString().split('T')[0];
          const res = await getTransactionByPaymentDates(date1, date2);
          this.transactions = res.data
          this.sumall = this.transactions.map(transaction => transaction.paymentAmount).reduce((a, b) => a + b, 0);
        } catch (error) {
          console.log(error);
        }
      }

      


     
    },
    mounted() {
        this.fetchTransactions();
    }
    
  });

  

</script>
  
  

<template>
  <div class="container">
    <div class="row mb-3">
      <div class="col-md-12">
        <h1>Listado de Transacciones</h1>
      </div>
      </div>

    <!--FILTERS-->
    <div class="row mb-3" >
        <div class="col-md-12 ">
            <form>
              <div class="row">
                <div class="col">
                <label class="form-label">Fechas de Pago</label>
                <Datepicker autoApply v-model="date" dark range></Datepicker>
                <button type="submit" class="btn btn-primary mt-3" @click.prevent="fetchTransactionsByPaymentDates(date)">Buscar</button>
                <button type="submit" class="btn btn-primary mt-3 ms-2" @click.prevent="fetchTransactions()">Limpiar</button>
              </div>
              </div>
              
              
            </form>

              
              
            
            
        </div>
    </div>
    
    <div class="row mb-3">
        <div>
          <p>Total transacciones: {{transactions.length}}</p>
          <p>Total importe acomulado: ${{sumall}}</p>
        </div>
    </div>

    <!---TABLE-->
    <div class="row" v-if="transactions.length > 0">
      <div class="col-md-12">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Método de Pago</th>
              <th>Número de Tarjeta</th>
              <th>Monto de Pago</th>
              <th>Código de Barras</th>
              <th>Fecha de Pago</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(transaction, index) in transactions" :key="index">
              <td>{{transaction.paymentMethod}}</td>
              <td>{{transaction.cardNumber}}</td>
              <td>{{transaction.paymentAmount}}</td>
              <td>{{transaction.barcode}}</td>
              <td>{{new Date(transaction.paymentDate).toLocaleDateString('en-us', { year: 'numeric', month: 'long', day: 'numeric'}) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!--END TABLE-->

      <div class="row" v-if="transactions.length === 0">
        <div class="col-md-12">
          <h3>No hay transacciones registradas</h3>
        </div>
      </div>

      </div>
</template>

<style scoped setup lang="scss">
 

</style>
