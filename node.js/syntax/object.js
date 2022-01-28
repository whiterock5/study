//array
var members = ['chan', 'wool' , 'oh'];
console.log(members[1]);
var i = 0;
while(i< members.length){
    console.log('array loop', members[i]);
    i = i+1;
}

//object
var roles = {
    'programmer':'chan', 
    'designer':'wool',
    'manager':'oh'
};
console.log(roles.designer);
console.log(roles['manager']);

for(var name in roles){
    console.log('object =>' , name , 'value =>' , roles[name]);
}