<template>
    <div class="card" :id="'card-'+card.id">
      <input class="card-input" 
      type="text" 
      v-model="name" 
      :disabled="disabled">

      <span :class="{
      'edit-card': disabled,
      'hide':!disabled}"
      @click="disabled=false"
      > ? </span>

      <span :class="{
        'hide': disabled,
        'save-card': !disabled}" 
        @click="editCard"
        > + </span>
    </div>
</template>

<script>
import OnClickOutside from "./OnClickOutside.vue"

  export default {
    components:{
      OnClickOutside
    },
    data(){
      return{
        name:this.card.name,
        disabled:true
      }
    },
    methods:{
      editCard(){
        this.disabled = !this.disabled; 
        if(name === this.card.name){
          console.log('edit card no change');
          return
        }
        const name = this.name;
        const id = this.card.id;
        this.$emit('edit-card', {name, id} );
      }
    },
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
.card-input{
  width: 100%;
  height: 30px;
  background-color: white;
  border-radius: 8px;
  cursor:pointer;
}
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
  position:relative;
}
.save-card{
  display:block;
  position: absolute;
  font-size: 24px;
  opacity:.6;
  top: 0;
  right: 0;
  padding: 5px;
}
.edit-card{
  display:none;
  position: absolute;
  font-size: 20px;
  opacity:.6;
  top: 0;
  right: 0;
  padding: 5px;
}
.card:hover .edit-card{
  display:block;
}
</style>