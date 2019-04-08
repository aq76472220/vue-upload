import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    count: 0,
    todos: [
      { id: 1, text: '...', done: true },
      { id: 1, text: '...', done: true },
      { id: 1, text: '...', done: true },
      { id: 1, text: '...', done: true },
      { id: 1, text: '...', done: true },
      { id: 1, text: '...', done: true },
      { id: 1, text: '...', done: true },
      { id: 1, text: '...', done: true },
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false}
    ]
  },
  getters:{
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length
    }
  },
  mutations:{
    increment(state,n){
      state.count +=n
    },

    someMutation(state){
      state.count +=123
    }
  },
  actions:{
    increment ({commit,state},n){
      setTimeout(()=>{
        commit('increment',n)
      },1000)
    },

    someMutation ({ commit,state }) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('someMutation')
          resolve(state)
        }, 1000)
      })
    }
  }

})
