var f = function(){
    console.log(1+2);
    console.log(2+3);
}
var a = [f];
a[0]();

var o = {
    func:f
}

// 자바스크립트의 함수는 값으로서 배열에 담는경우는 많지않다.
// 객체에 넣는건 자주있다.
o.func();