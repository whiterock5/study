<template>
  
  <div>
    <div class="menu">
      <!-- Vue 반복문 v-for
      <태그 v-for="작명 in 몇회">
      (:key="작명"도 필요) -->
      <a v-for="(menu,i) in menu" :key="i">{{menu}}</a>
    </div>
    <div v-for="(product,i) in products" :key="product">
      <h4>{{products[i]}}</h4>
      <p>50만원</p>
      <!--함수이름만 쓴다.-->
      <button @click="increase(i)">매물 신고</button> <span>신고수 : {{num[i]}} </span>
    </div> 
    
  </div>
</template>

<script>
export default {
  name: 'App',
  // 데이터 보관함
  data(){
    return {
      num : [0,0,0],
      menu : ['Home', 'Shop' , 'About'],
      products : ['역삼동원룸', '천호동원룸', '봉천동원룸']
    }
  },
  // 메소드들 
  methods : {
    increase(i){
      this.num[i] ++;
    }
  },
  components: {
    
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.menu {
  background:  darkslateblue;
  padding: 15px;
  border-radius: 5px;
}
.menu a {
  color: white;
  padding: 10px;
}

</style>
