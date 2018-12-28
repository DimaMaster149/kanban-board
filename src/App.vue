<template>
  <div id="app"> 
    
    <div class="column-list">
      <draggable class="drag-column-list"
        v-model="columns"
        :options="{group: 'column-list', sort:true}"
        @start="drag=true"
        @Add="drag=false">
        
        <column class="drag-column"
          v-for="column in Columns"
          :key="column.id"
          :column="column"
        ></column>

      </draggable>
      <button 
      class="add-column-area" 
      @click="showAddColumnField = !showAddColumnField"
      :class="{'hide': showAddColumnField,
               'show' : !showAddColumnField}"
      >
        add new column
      </button>
      <div class="add-column"
       :class="{'show' : showAddColumnField,
               'hide' : !showAddColumnField}">
        <input type="text" v-model="newColumn" class="column-input">
        <button class="add-column-button" @click="addColumn"> Add</button>
      </div>
     
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Column from '@/components/Column'
import data from "./assets/columns";

export default {
  name: 'App',
  components: {
    draggable,
    Column
  },
  data(){
    return{
      columns:null,
      showAddColumnField:false,
      newColumn:''
    }
  },
  created(){
    console.log(JSON.parse(window.localStorage.vuex).columns)
    this.columns = window.localStorage.vuex ? JSON.parse(window.localStorage.vuex).columns : data.columns;
  },
  computed:{
    Columns(){
      this.columns ? 
      this.$store.dispatch('setColumns', this.columns) : 
      this.$store.dispatch('setColumns', data.columns);
      return this.columns? this.columns : data.columns;
    }
  },
  methods:{
    addColumn(){
      this.$store.dispatch('addColumn', this.newColumn);
      this.showAddColumnField = false;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.drag-column-list{
  display:flex;
  flex-direction:row;
}
.column-list{
  display:flex;
  flex-direction: row;
  position: relative;
}
.add-column-area {
  margin: 20px 20px 0 0;
  width: 200px;
  height: 50px;
  background-color: #FDFEFD;
  display:flex;
  justify-content: center;
  align-items: center;
  color:black;
  border:none;
  cursor:pointer;
  font-size:16px;
}
.add-column-area:hover{
  background-color: #F9FCF9;
}

.show{
  display: block;
}
.hide{
  display:none;
}
.column-input{
    height: 30px;
    margin: 20px 0 0 0;
}

</style>
