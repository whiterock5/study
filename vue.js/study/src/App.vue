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
        <button v-if="modalCheck == false">닫기</button>
      </div>
    </div>

    <div v-for="(product,i) in products" :key="product">
      <!--이미지-->
      <img src="./assets/room[i].jpg" class="room-img">
      <h4 @click="modalCheck = true">{{products[i]}}</h4>
      <p>50만원</p>
      <!--함수이름만 쓴다.-->
      <button @click="increase(i)">매물 신고</button> <span>신고수 : {{num[i]}} </span>
    </div> 
    
  </div>
</template>

<script>
//동적 UI
//1. UI의 현재상태를 데이터로 저장
//2. 데이터에 따라 UI가 어떻게 보일지 작성
export default {
  name: 'App',
  // 데이터 보관함
  data(){
    return {
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
