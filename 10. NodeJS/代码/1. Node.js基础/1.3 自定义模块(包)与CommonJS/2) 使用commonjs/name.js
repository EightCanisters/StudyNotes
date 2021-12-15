const name = {
  lastname: '黄',
  getLastname() {
    console.log(this.lastname);
  },
};

const age = {
  age: 100,
};

// 【导出】写法一
module.exports = {
  name,
  age,
};

// 【导出】写法二
// exports.name = name;
// exports.age = age;

// 结论：写法一和写法二完全一致
// console.log(exports === module.exports); // true，相当于const exports = module.exports

// 注意：不能写成以下的方式，这里相当于给exports重新赋值，割断了exports和module.exports的关系
// exports = {
//   name,
//   age,
// };
