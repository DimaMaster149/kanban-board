<template>
  <div class="card" :id="'card-'+card.id">
    <div class="name">
      {{card.name}}
    </div>
  </div>
</template>

<script>

  export default {
    props:{
      card:{
        required:false,
        type:Object,
        default:{}
      }
    },
  }
</script>

<style>
.card{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 35px;
    background-color: white;
    border-radius: 8px;
    margin: 0 0 6px 0;
    cursor:pointer;
}
</style>