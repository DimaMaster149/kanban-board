<template>
  <div class="column">
   <div class="column-name"
   > 
     <span :class="{
     'hide':showEditColumn
    }" @click="showEditColumn=true"
    > {{column.name}}  </span>

   <div :class="{
     'hide': !showEditColumn
   }" class="edit-column">
    <input type="text"
      class="name-edit"
      v-model="columnName">
    <button class="button-save" @click="editColumn"> Save</button>
   </div>
  
   </div>

      <draggable class="drag-card"
        v-model="cards"
        :options="{group: 'card-list', sort:true}"
        @start="drag=true"
        @end="drag=false"
        :id="column.id">
        
          <card
            v-for="card in cards"
            :key="card.id"
            :card="card"
            @edit-card="editCard"
          ></card>

      </draggable>

      <button 
      class="add-card-area" 
      @click="showAddCardField = !showAddCardField"
      :class="{'hide': showAddCardField,
               'show' : !showAddCardField,
               'top' : cards.length == 0}"
      >
        add new card
      </button>
      <div
       :class="{'show add-card' : showAddCardField,
               'hide' : !showAddCardField,
               'top' : cards.length == 0}">
        <input type="text" v-model="newCard" class="card-input">
        <button class="add-card-button" @click="addCard"> Add</button>
      </div>

    </div>
</template>

<script>
import draggable from 'vuedraggable'
import Card from './Card'
  export default {
    components:{
      draggable,
      Card
    },
    data(){
      return{
        cards:[],
        columnName: this.column.name,
        columnId: '',
        showAddCardField:false,
        newCard:'',
        showEditColumn:false
      }
    },
    created(){
      this.cards = this.column.cards;
      this.columnId = this.column.id;
    },
    methods:{
      addCard(){
        const card = this.newCard;
        const columnId = this.columnId;
        this.$store.dispatch('addCard', {card, columnId});
        this.showAddCardField = false;
      },
      editCard(data){
        const {name, id} = data;
        const columnId = this.columnId;
        this.$store.dispatch('editCard', {name, id, columnId});
      },
      editColumn(){
        this.showEditColumn = false;
        const name = this.columnName;
        const id = this.columnId;
        this.$store.dispatch('editColumn', {name, id})
      }
    },
    watch:{
      cards: {
        handler: function(value) {
          if(!value) {
             return
          }
          console.log(value, 'value from cards watcher')
          this.$store.dispatch('setCards', {cards:value, columnId: this.columnId})

        },
      }
      // cards: (value) =>{
    //     if(!this.cards) {
    //       return
    //     }
    //       const cards = this.cards;
    //       const columnId = this.columnId;
    //       this.$store.dispatch('setCards', {cards, columnId})
    //  }
    },
    props:{
      column:{
        required:true,
        type:Object
      }
    },
  }
</script>

<style>
.edit-column{
  width:100%;
  display:flex;
  flex-direction: row;
}
.top{
  position:relative;
  bottom:55px;
}
.column{
  min-width:250px;
  height:auto;
  margin:10px;
  background-color: #EAEDED;
  padding:5px 10px 5px 10px;
  border-radius: 10px;
}
.column-name{
  font-size:20px;
  padding:10px 0 15px 0;
  cursor: pointer;
}
.drag-card{
  width:100%;
  height:auto;
  min-height: 50px;
}
.add-card-area{
  width: 100%;
  height: 35px;
  border: none;
  background-color: #EAEDED;
  font-size: 16px;
  text-align: left;
  padding-left: 10px;
  color: #797D7F;
  cursor: pointer;
}
.add-card{
  display:flex;
  width:100%;
  height: 35px;
}
.hide{
  display:none;
}
.button-save {
  background-color:#52BE80;
  border: none;
  font-size: 14px;
  margin-left: 2px;
}
.name-edit {
  width: 100%;
  border: none;
  padding: 4px;
  border-radius: 2px;
}
.name-edit:focus{
  border:1px solid #ABEBC6;
}
</style>