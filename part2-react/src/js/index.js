// import "core-js/stable";
// import "regenerator-runtime/runtime";
import { Animal } from './utils'

// let声明 & 箭头函数
let fn = () => {
  console.log(1)
}

// 实例方法
[2, 3, 4].includes(1)
"foobar".includes("foo")

// 静态方法
Object.assign({ a: 1, b: 2 }, { c: 3 });

// 新的API
let promise = new Promise((res, rej) => {
  setTimeout(res, 1000)
})
let set = new Set()
let map = new Map()

// 新的语法
class Person {
  static Version = 1.0 //需要配置 @babel/plugin-proposal-class-properties 插件
  static get name() {
    return 'Person'
  }
  say() {
    console.log('hello world!')
  }
}

class Duck extends Animal { }

let duck = new Duck()
duck.makeSound()