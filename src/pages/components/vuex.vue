<template>
  <div>
    <div>{{doneTodos}}</div>
    <div>{{doneTodosCount}}</div>
    <div>count:{{count}}</div>
    <button @click="increment(10)">+</button>
    <button @click="decrement(1)">-</button>
    <button @click="someMutation">someMutation</button>

  </div>
</template>

<script>

  // function doStuff (x, y, z) {
  //   console.log(x,y,z)
  // }
  // var args = [0, 1, 2];
  //
  // // 调用函数，传递args参数
  // //doStuff.apply(null, args);
  // //doStuff(args[0],args[1],args[2])
  // doStuff(...args)




  import { mapState ,mapGetters,mapMutations } from 'vuex'
  export default {
    data(){
      return {
        //count:0
      }
    },
    computed:{
      // count(){
      //   return this.$store.state.count
      // }
      // ...mapState([
      //   'count'
      // ])
      ...mapState({
        count: state => state.count,
      }),

      // doneTodos (){
      //   return this.$store.getters.doneTodos;
      // }
      ...mapGetters(['doneTodos']),
      // ...mapGetters({
      //   'doneTodos':'doneTodos'
      // })
      ...mapGetters (['doneTodosCount'])
    },
    created(){
      // let arryr = _.union([1],[1,2]);// [1,2] 求集合
      // console.log(arryr);
      // let arry2 = _.shuffle([1,2,3,4]);// 无序化
      // console.log(arry2);

      // console.log(_.random(1, 9));
      let obj1 = {a:[{name:'li'}]};
      let obj2 = _.cloneDeep(obj1);
      obj2.a=[2]
      console.log(obj1); // 深度克隆
      console.log(obj2); // 深度克隆
    },
    methods: {
      // increment(){
      //   this.$store.commit('increment')
      //   // this.count++
      // },
      // ...mapMutations(['increment'])
      increment(){
        this.$store.dispatch('increment',100)
      },

      someMutation(){
        this.$store.dispatch('someMutation').then((res)=>{
          console.log(res.count)
        })
      }
      //...mapActions({increment})

    }
  }
</script>

<style scoped>

</style>
