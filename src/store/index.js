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
      columns: null,
  },
  plugins: [vuexLocal.plugin],
  getters:{
      getColumns: state => {
          return state.columns;
      },
  },

  actions: {
    setColumns: (context, data) => {
      console.log(data, 'setcolumns action')
      context.commit('setColumns', data);
    },

    setCards: (context, data) => {
      console.log('setCards', data);
      const { cards, columnId } = data;

      let columns = context.getters.getColumns;
      let updateColumn = columns.find((column) => column.id == columnId);
      let columnIndex = columns.indexOf(updateColumn);

      // columns[columnIndex] = {};
      columns[columnIndex] = updateColumn;
      columns[columnIndex].cards = cards;
      // let updatedColumns = columns[columnIndex].cards = cards;

      context.commit('setColumns', columns);
    },
    
    addColumn: (context, data) => {
      const Column = {
        id: Date.now(),
        name: data,
        cards: []
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
    },

    editCard: (context, data) => {
      const Card = {
        id: data.id,
        name: data.name
      }
      console.log(data);
      let columns = context.getters.getColumns.map((column) => {
        if (column.id == data.columnId) {
          column.cards.map((card) => {
            if (card.id == data.id) {
              card.name = data.name;
            }
            return card;
          })
        }
        return column;
      })
    },

    // deleteCard: (context, data) => {
    //   const { columnId, id } = data;
      
    //   let columns = context.getters.getColumns.map(column => {
    //     if (column.id == columnId) {
    //       let updatedCards = column.cards.filter(card => card.id !== id);
    //       context.dispatch('setCards', {cards: updatedCards, columnId: columnId})
    //     }
    //   })
    // },

    editColumn: (context, data) => {
      let columns = context.getters.getColumns.map((column) => {
        if (column.id == data.id) {
          column.name = data.name
        }
        return column;
      })
    },
  },
  
  mutations: {
    setColumns: (state, payload) => {
      if (!payload) {
        console.log('no columns for mutation');
        return
      }
      console.log('mutation')
      state.columns = payload;
    },

    deleteCard: (state, payload) => {
      if (!payload) {
        console.log('no columns for mutation');
        return
      }
      const { columnId, id } = payload;

      let columns = state.columns.map(column => {
        if (column.id == columnId) {
          let updatedCards = column.cards.filter(card => card.id !== id);
          column.cards = updatedCards;  
        }
      })
      state.columns = columns;
    }
  }
});