<script lang="ts" setup></script>

<template>
  <div class="container my-5">
    <div class="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
      <div class="col-lg-7 p-3 p-lg-5 pt-lg-3">
        <h1 class="display-4 fw-bold lh-1">NewCombin Technical Challenge</h1>
        <p class="lead">This is a technical challenge created by David Salamanca Camelo, MEVN Stack</p>
        <div class="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
          <NuxtLink type="button" to="/payables/createpayable" class="btn btn-primary btn-lg px-4 me-md-2 fw-bold">Create Payables</NuxtLink>
          <NuxtLink type="button" to="/transactions/createtransaction" class="btn btn-outline-secondary btn-lg px-4">Create Transactions</NuxtLink>
        </div>
      </div>
      <div class="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
          <img class="rounded-lg-3" src="https://getwallpapers.com/wallpaper/full/8/2/0/141588.jpg" alt="" width="720">
      </div>
    </div>
  </div>
</template>

<style scoped></style>
