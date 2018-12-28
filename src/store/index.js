import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state) => ({ columns: state.columns }), //only save columns module
  filter: (mutation) => mutation.type == 'setColumns'
})

export const store = new Vuex.Store({
  state: {
      columns: [],
  },
  plugins: [vuexLocal.plugin],
  getters:{
      getColumns: state => {
          return state.columns;
      },
  },

  actions: {
    setColumns: (context, data) => {
     context.commit('setColumns', data);
    },

    setCards: (context, data) => {
      const { cards, columnId } = data;
      let columns = context.getters.getColumns;
      let updateColumn = columns.find((column) => column.id == columnId);
      let columnIndex = columns.indexOf(updateColumn);
      let updatedColumns = columns[columnIndex].cards = cards;
      context.commit('setColumns', updatedColumns);
    },
    
    addColumn: (context, data) => {
      const Column = {
        id: Date.now(),
        name: data,
        cards:[]
      }
      const columns = context.getters.getColumns;
      let updatedColumns = columns.push(Column);
      context.commit('setColumns', updatedColumns);
    },

    addCard: (context, data) => {
      const Card = {
        id: Date.now(),
        name: data.card
      }
      let columns = context.getters.getColumns;
      let updateColumn = columns.find((column) => column.id == data.columnId);
      updateColumn = updateColumn.cards.push(Card);
      let columnIndex = columns.indexOf(updateColumn);
      let updatedColumns = columns[columnIndex] = updateColumn;
      context.commit('setColumns', updatedColumns);
    }
  },

  mutations: {
    setColumns: (state, payload) => {
      if (!payload) {
        console.log('no columns for mutation');
        return
      }

      state.columns = payload;
    },


    // setCards: (commit, state, payload) => {
    //   if (!payload) {
    //     console.log('no cards for mutation');
    //     return
    //   }

    //   const { cards, columnId } = payload;
    //   let updatedColumns = state.columns[columnId - 1].cards = cards;
    //   commit('setColumns', updatedColumns);
    // }
  }
});