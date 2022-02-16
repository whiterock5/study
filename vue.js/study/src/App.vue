<template>
  
  <div>
    <div class="menu">
      <!-- Vue 반복문 v-for
      <태그 v-for="작명 in 몇회">
      (:key="작명"도 필요) -->
      <a v-for="(menu,i) in menu" :key="i">{{menu}}</a>
    </div>
    <div class="black-bg" v-if="modalCheck == true">
      <div class="white-bg">
        <h4>상세페이지</h4>
        <p>상세페이지 내용</p>
        <button @click="modalCheck = false">닫기</button>
      </div>
    </div>
    <!--
      HTML태그안의 속성 데이터바인딩은 ":"붙이기
      HTML 태그안의 내용 데이터바인딩은 {{ }}
    -->
    <div v-for="(product,i) in products" :key="product">
      <img :src="oneroom[i].image" class="room-img">
      <h4 @click="modalCheck = true">{{oneroom[i].title}}</h4>
      <p>{{oneroom[i].price}}원</p>
  
    </div> 
    
  </div>
</template>

<script>
//import 작명 from 주소
import data from './assets/data.js';

//동적 UI
//1. UI의 현재상태를 데이터로 저장
//2. 데이터에 따라 UI가 어떻게 보일지 작성
export default {
  name: 'App',
  // 데이터 보관함
  data(){
    return {
      oneroom: data,
      modalCheck : false,
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
body{
  margin :0;
}
div {
  box-sizing: border-box;
}
.black-bg {
  width:  100%; height: 100%;
  background: rgba(0,0,0,0.5);
  position: fixed; padding: 20px;
}
.white-bg {
  width:  100%;
  background: white;
  border-radius: 8px; padding: 20px;
}


.room-img{
  width : 100%;
  margin-top: 40px;
}
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
