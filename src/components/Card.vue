<template>
    <div class="card" :id="'card-'+card.id">
      <CardTextArea
      v-model="name"
      :disabled="disabled"
      >
      </CardTextArea>

      <!-- <input class="card-input" 
      type="text" 
      v-model="name" 
      :disabled="disabled"> -->

      <span :class="{
        'edit-card': disabled,
        'hide':!disabled}"
        @click="disabled=false"
        > <i class="material-icons">edit</i> 
      </span>

      <span :class="{
        'delete-card': disabled,
        'hide':!disabled}"
        @click="deleteCard"
        > <i class="material-icons">delete</i> 
      </span>

      <span :class="{
        'hide': disabled,
        'save-card': !disabled}" 
        @click="editCard"
        > <i class="material-icons"> done_outline </i>
      </span>
    </div>
</template>

<script>
import OnClickOutside from "./OnClickOutside.vue"
import CardTextArea from "./lib/input/CardTextArea"

  export default {
    components:{
      OnClickOutside,
      CardTextArea
    },
    data(){
      return{
        name: this.card.name,
        disabled:true,
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
      },
      deleteCard(){
        const id = this.card.id;
        this.$emit('delete-card', id);
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

<style scoped>
.card-input{
  width: 100%;
  height: 30px;
  background-color: white;
  border-radius: 5px;
  cursor:pointer;
  border: none;
  margin-left: 5px;
}
.card{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 35px;
  background-color: white;
  border-radius: 8px;
  margin: 0 0 8px 0;
  cursor:pointer;
  position:relative;
  height: auto;
  min-height: 35px;
  user-select: none;
}
.save-card{
  display:block;
  position: absolute;
  font-size: 24px;
  opacity:.6;
  top: 0;
  right: 0;
  padding: 0px;
  color:green;
}
.edit-card{
  display:none;
  position: absolute;
  font-size: 20px;
  opacity:.6;
  top: 0;
  right: 24px;    
  padding: 0px;
  /* background: #C9C8C9; */
}
.delete-card{
  display:none;
  position: absolute;
  font-size: 20px;
  opacity:.6;
  top: 0;
  right: 0;    
  padding: 0px;
  /* background: #C9C8C9; */
}
.card:hover .edit-card{
  display:block;
}
.card:hover .delete-card{
  display:block;
}
.card-input:focus {
  border:none;
}
.card:focus{
  border:none !important;
}
</style>