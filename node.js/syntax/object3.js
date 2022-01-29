var v1 = 'v1';
// 100000 code
v1 = 'egoing';
var v2 = 'v2';

//하나에 객체에 값을 정리해서 넣기 가능.
var o = {
    v1: 'v1',
    v2: 'v2',
    f1 : function(){
        console.log(this.v1);
    },
    f2 : function(){
        console.log(this.v2);
    }
}

o.f1();
o.f2();
