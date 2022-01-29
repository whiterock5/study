var M = {
    v: 'v',
    f: function(){
        console.log(this.v);
    }
}

//M 이라는 모듈을 밖에서 사용할수있도록 exports 하겠다.
module.exports = M;