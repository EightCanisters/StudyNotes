// var data2 = 'other data'; //相当于window.data2 = 'other data'
let data2 = 'other data'; // 此时window.data2为undefined
function foo() {
  console.log(`foo() ${data2}`)
}