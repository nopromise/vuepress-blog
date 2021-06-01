---
title: P61-P63模块化操作
date: 2021-05-31
---
[[TOC]]



## P61-P63模块化操作

## 一、模块化简介 

### 1、模块化产生的背景

随着网站逐渐变成"互联网应用程序"，嵌入网页的Javascript代码越来越庞大，越来越复杂。

Javascript模块化编程，已经成为一个迫切的需求。理想情况下，开发者只需要实现核心的业务逻辑，其他都可以加载别人已经写好的模块。

但是，Javascript不是一种模块化编程语言，它不支持"类"（class），包（package）等概念，更遑论"模块"（module）了。

![image-20200709171401324](https://gitee.com//nopromise/pic/raw/master/typora/20200709171401.png)

### 2、什么是模块化开发

传统非模块化开发有如下的缺点：

- 命名冲突
- 文件依赖

模块化规范：

- CommonJS模块化规范
- ES6模块化规范

## 二、CommonJS模块规范

每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。

### 1.ES5模块化

#### 1.创建moduledemo文件夹

#### 2.npm init -y   //在moduledemo下执行命令初始化

#### 3.创建es5module 文件夹，创建01.js 02.js

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200709172045.png" alt="image-20200709172045128" style="zoom:80%;" />![image-20200709172416735](https://gitee.com//nopromise/pic/raw/master/typora/20200709172416.png)



#### 4.01.js和02.js

**01.js**

```js
//在01.js中创建2个js方法
// 定义成员：
const sum = function(a,b){
    return parseInt(a) + parseInt(b)
}
const subtract = function(a,b){
    return parseInt(a) - parseInt(b)
}

//设置哪些方法可以被其他js调用
module.exports={
    sum,
    subtract
}
```

**02.js**

```js
//调用01.js里面的方法
//1 引入01.js的文件
const m=require('./01.js')

//2.调用
console.log(m.sum(1,2));
console.log(m.subtract(10,3));

```

#### 5.测试

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200709173131.png" alt="image-20200709173131511" style="zoom:80%;" />





### 2.ES6模块化（方式1）

![image-20200709173506392](https://gitee.com//nopromise/pic/raw/master/typora/20200709173506.png)



**ES6模块化无法在ES5中运行，需要babel转换成ES5的代码！**



#### 1-在babedemol文件夹下面定义01.js和02.js

babeldemo文件夹用于es6转换成es5

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200712094242.png" alt="image-20200712094242145" style="zoom:80%;" />

```js
01.js
//定义方法：设置哪些方法可以被其他js调用
export function getList(){
    console.log("获取数据列表");
}

export function save(){
    console.log('保存数据');
}
```



```js
02.js
//定义方法：设置哪些方法可以被其他js调用
export function getList(){
    console.log("获取数据列表");
}

export function save(){
    console.log('保存数据');
}
```



#### 2-使用babel把es6转换成es5，然后执行02.js代码

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200712094407.png" alt="image-20200712094407672" style="zoom:80%;" />



**ps如果报异常：**安装转码器，详细见babel转码章节

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200712094441.png" alt="image-20200712094441552" style="zoom:80%;" />







### 3.ES6模块化（方式2【用的多的】）



#### 1.创建js文件

01.js

```js
//定义方法：设置哪些方法可以被其他js调用
export default{
    getList(){
        console.log('获取list2');
        
    },
    save(){
        console.log('save数据2');
        
    }
}
```



03.js

```js
//定义方法：设置哪些方法可以被其他js调用
export default{
    delete(){
        console.log('进行del操作');
    }
}
```



02.js

```js
import user from './01'   //导入01.js， 用user代表   类似对象user
import u from './03'      //导入02.js   用u代表，类似对象u

//执行01.js的方法
user.getList();
user.save();
//执行03.js的代码
u.delete
```





#### 2.babel转换和执行js

```
PS E:\GIT\1010\babeldemo> babel module-es6-2 -d module-es6-2.1
```

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200712095924.png" alt="image-20200712095924894" style="zoom:80%;" />