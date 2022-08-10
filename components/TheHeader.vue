<script lang="ts" setup></script>

<template>
   <div class="container">
    <header class="justify-content-center py-3 mb-4 border-bottom">
        <div class="row">
            <div class="col">
                <a href="/" class="text-dark text-decoration-none">
                  <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"/></svg>
                  <label class="fs-4">NewCombinVueChallenge</label>
                </a>
            </div>
            <div class="col">
                <ul class="nav nav-pills">
                  <li class="nav-item"><NuxtLink to="/payables/createpayable" class="nav-link" activeClass="active" >Crear Boleta</NuxtLink></li>
                  <li class="nav-item"><NuxtLink to="/transactions/createtransaction" class="nav-link" activeClass="active" >Pagar Boleta</NuxtLink></li>
                  <li class="nav-item"><NuxtLink to="/payables/payableslist" class="nav-link" activeClass="active" >Boletas</NuxtLink></li>
                  <li class="nav-item"><NuxtLink to="/transactions/transactionslist" class="nav-link" activeClass="active" >Pagos</NuxtLink></li>
                </ul>
            </div>
        </div>

    </header>
  </div>
</template>

<style scoped></style>
