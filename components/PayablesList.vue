<script lang="ts">
  import { defineComponent } from 'vue';
  import { getPayables, getPayableByTipoServicio } from '../services/payables';
  import { Payable } from '../interfaces/Payable';

  export default defineComponent({
    name: 'PayableList',
    data() {
      return {
        payables: [] as Payable[],
        errors: [] as string[],
        service: '' as string,
        noServices: false as boolean,
      };
    },
    methods: {
      async fetchPayables(service: string) {
        try {
          if(service === '') {
            const res = await getPayables();
            this.service = '';
            this.payables = res.data
           
          } 
          if(service !== '') {
            const res = await getPayableByTipoServicio(service);
            this.service = service;
            return this.payables = res.data
          }
          
        } catch (error) {
          console.log(error);
        }
      },
      
    },
    mounted() {
      this.fetchPayables('')
    }
  });
  
</script>

<template>
  <div class="container">
    <div class="row mb-3">
      <div class="col-md-12">
        <h1>Listado de Boletas</h1>
      </div>
    </div>

    <!--FILTERS-->
    <div class="row" v-if="payables.length > 0">
      <div class="col-md-12">
      <nav class="nav">
        <a class="nav-link" href="#"  @click="fetchPayables('Luz')">Luz</a>
        <a class="nav-link" href="#"  @click="fetchPayables('Television')">Television</a>
        <a class="nav-link" href="#"  @click="fetchPayables('Internet')">Internet</a>
        <a class="nav-link" href="#"  @click="fetchPayables('')">All</a>
      </nav>
      <hr>
      </div>
    </div>
    <!--END FILTERS-->

    <!---TABLE-->
    <div class="row" v-if="payables.length > 0">
      <div class="col-md-12">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Código de Barras</th>
              <th v-if="service === ''">Tipo de Servicio</th>
              <th>Descripción</th>
              <th>Fecha de Vencimiento</th>
              <th>Importe del Servicio</th>
              <th>Estado del Pago</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(payable, index) in payables" :key="index">
              <td>{{payable.barcode}}</td>
              <td v-if="service === ''">{{payable.tipoServicio}}</td>
              <td>{{payable.description}}</td>
              <td>{{new Date(payable.fechavencimiento).toLocaleDateString('en-us', { year: 'numeric', month: 'long', day: 'numeric'}) }}</td>
              <td>{{payable.importeServicio}}</td>
              <td>{{payable.paymentStatus}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!--END TABLE-->

    <!---NO SERVICES-->
    <div>
      <div class="row" v-if="payables.length === 0">
        <div class="col-md-12">
          <h3>No hay boletas registradas</h3>
        </div>
      </div>
    </div>
    <!--END NO SERVICES-->
    
  </div>
</template>

<style scoped></style>
