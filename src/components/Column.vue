<template>
  <div class="column">
   <div class="column-name"
   > {{column.name}} </div>

      <draggable class="drag-card"
        v-model="cards"
        :options="{group: 'card-list', sort:true}"
        @start="drag=true"
        @end = "onEnd"
        :id="column.id">
        
          <card
            v-for="card in Cards"
            :key="card.id"
            :card="card"
          ></card>

      </draggable>

      <button 
      class="add-card-area" 
      @click="showAddCardField = !showAddCardField"
      :class="{'hide': showAddCardField,
               'show' : !showAddCardField,
               'top' : cards.length == 0}"
      >
        add new column
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
        columnId: null,
        showAddCardField:false,
        newCard:''
      }
    },
    computed:{
      Cards(){
        setTimeout(()=> {
          if(!this.cards){
            return
          }
          const cards = this.cards;
          const columnId = this.columnId;
          this.$store.dispatch('setCards', {cards, columnId})
        },300)
        return this.cards;
      }
    },
    created(){
      this.cards = this.column.cards;
      this.columnId = this.column.id;
    },
    methods:{
      onEnd(){

      },
      addCard(){
        const card = this.newCard;
        const columnId = this.columnId;
        this.$store.dispatch('addCard', {card, columnId});
        this.showAddCardField = false;
      }
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
.top{
  position:relative;
  bottom:29%;
}
.column{
  min-width:200px;
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
</style>