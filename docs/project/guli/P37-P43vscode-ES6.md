---
title: P37-P43vscode-ES6
date: 2021-05-31
---
[[TOC]]




## P37-vscode安装和使用

### 一、前端开发

前端工程师“Front-End-Developer”源自于美国。大约从2005年开始正式的前端工程师角色被行业所认可，到了2010年，互联网开始全面进入移动时代，前端开发的工作越来越重要。

最初所有的开发工作都是由后端工程师完成的，随着业务越来越繁杂，工作量变大，于是我们将项目中的可视化部分和一部分交互功能的开发工作剥离出来，形成了前端开发。

由于互联网行业的急速发展，导致了在不同的国家，有着截然不同的分工体制。

在日本和一些人口比较稀疏的国家，例如加拿大、澳洲等，流行“Full-Stack Engineer”，也就是我们通常所说的全栈工程师。通俗点说就是一个人除了完成前端开发和后端开发工作以外，有的公司从产品设计到项目开发再到后期运维可能都是同一个人，甚至可能还要负责UI、配动画，也可以是扫地、擦窗、写文档、维修桌椅等等。

而在美国等互联网环境比较发达的国家项目开发的分工协作更为明确，整个项目开发分为前端、中间层和后端三个开发阶段，这三个阶段分别由三个或者更多的人来协同完成。

国内的大部分互联网公司只有前端工程师和后端工程师，中间层的工作有的由前端来完成，有的由后端来完成。

PRD（产品原型-产品经理） - PSD（视觉设计-UI工程师） - HTML/CSS/JavaScript（PC/移动端网页，实现网页端的视觉展示和交互-前端工程师）



### 二、下载和安装VS Code

#### 1、下载地址

https://code.visualstudio.com/

#### 2、安装



### 三、初始设置

#### **1、中文界面配置**



- 首先安装中文插件：Chinese (Simplified) Language Pack for Visual Studio Code
- 右下角弹出是否重启vs，点击“yes”
- 有些机器重启后如果界面没有变化，则 点击 左边栏Manage -> Command Paletet...【Ctrl+Shift+p】
- 在搜索框中输入“configure display language”，回车
- 打开locale.json文件，修改文件下的属性 "locale":"zh-cn" 



```
{
    // 定义 VS Code 的显示语言。
    // 请参阅 https://go.microsoft.com/fwlink/?LinkId=761051，了解支持的语言列表。
    "locale":"zh-cn" // 更改将在重新启动 VS Code 之后生效。
}
```

- 重启vs





#### 2、插件安装

为方便后续开发，建议安装如下插件（红色矩形框标记的插件）

![img](https://gitee.com//nopromise/pic/raw/master/typora/20200707100128.png)



#### **3、创建项目**

vscode本身没有新建项目的选项，所以要先创建一个空的文件夹，如project_xxxx。

然后打开vscode，再在vscode里面选择 File -> Open Folder 打开文件夹，这样才可以创建项目。

#### 4、保存工作区

打开文件夹后，选择“文件 -> 将工作区另存为...”，为工作区文件起一个名字，存储在刚才的文件夹下即可

#### 5、新建文件夹和网页

![img](https://gitee.com//nopromise/pic/raw/master/typora/20200707100507.png)

![image-20200707101503691](https://gitee.com//nopromise/pic/raw/master/typora/20200707101503.png)



#### **6、预览网页**

**以文件路径方式打开网页预览**

需要安装“**open in browser**”插件：

文件右键 -> Open In Default Browser



**以服务器方式打开网页预览**

需要安装“Live Server”插件：

文件右键 -> Open with Live Server



#### 7、设置字体大小

左边栏Manage -> settings -> 搜索 “font” -> Font size



#### **8、开启完整的Emmet语法支持**

设置中搜索 Emmet：启用如下选项，必要时重启vs

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200707100625.png" alt="img" style="zoom:80%;" />



## P38-es6的介绍

自学参考：http://es6.ruanyifeng.com/

### 一、ECMAScript 6 简介

ECMAScript 6.0（以下简称 ES6）是 JavaScript 语言的下一代标准，已经在 2015 年 6 月正式发布了。它的目标，是使得 JavaScript 语言可以用来编写复杂的大型应用程序，成为企业级开发语言。

#### 1、ECMAScript 和 JavaScript 的关系

一个常见的问题是，ECMAScript 和 JavaScript 到底是什么关系？

要讲清楚这个问题，需要回顾历史。1996 年 11 月，JavaScript 的创造者 Netscape 公司，决定将 JavaScript 提交给标准化组织 ECMA，希望这种语言能够成为国际标准。次年，ECMA 发布 262 号标准文件（ECMA-262）的第一版，规定了浏览器脚本语言的标准，并将这种语言称为 ECMAScript，这个版本就是 1.0 版。

因此，ECMAScript 和 JavaScript 的关系是，前者是后者的规格，后者是前者的一种实现（另外的 ECMAScript 方言还有 Jscript 和 ActionScript）



#### 2、ES6 与 ECMAScript 2015 的关系

ECMAScript 2015（简称 ES2015）这个词，也是经常可以看到的。它与 ES6 是什么关系呢？

2011 年，ECMAScript 5.1 版发布后，就开始制定 6.0 版了。因此，ES6 这个词的原意，就是指 JavaScript 语言的下一个版本。

ES6 的第一个版本，在 2015 年 6 月发布，正式名称是《ECMAScript 2015 标准》（简称 ES2015）。

2016 年 6 月，小幅修订的《ECMAScript 2016 标准》（简称 ES2016）如期发布，这个版本可以看作是 ES6.1 版，因为两者的差异非常小，基本上是同一个标准。根据计划，2017 年 6 月发布 ES2017 标准。

因此，ES6 既是一个历史名词，也是一个泛指，含义是 5.1 版以后的 JavaScript 的下一代标准，涵盖了 ES2015、ES2016、ES2017 等等，而 ES2015 则是正式名称，特指该年发布的正式版本的语言标准。本书中提到 ES6 的地方，一般是指 ES2015 标准，但有时也是泛指“下一代 JavaScript 语言”。

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200707102000.png" alt="image-20200707102000053" style="zoom:80%;" />

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200707102021.png" alt="image-20200707102021784" style="zoom:80%;" />



## P39-es6语法-let定义变量和常量

### 1、let声明变量

**1.let 声明的变量  有局部作用域；var 声明的变量没有局部作用域**

```javascript
<script>
    //在代码块中定义变量
    {
    var a=10;
    //es6中用let
    let b=20;
    }
    //
    console.log(a);
    console.log(b);
</script>
```

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200707103531.png" alt="image-20200707103531240" style="zoom:80%;" />

2. **var 可以声明多次;let 只能声明一次**

```js
<script>
    //在代码块中定义变量
    {
    var a=10;
    //es6中用let
    let b=20;

    //var 可以声明多次;let 只能声明一次
    var a=30;
    var b=50;
    }
</script>
```



<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200707103733.png" alt="image-20200707103733073" style="zoom:80%;" />



### **2、const声明常量（只读变量）**

// 1、声明之后不允许改变    

```js
<script>
  //在代码块中定义变量
const PI="3.1515926";
PI=3
</script>
```



<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200707103952.png" alt="image-20200707103952273" style="zoom:80%;" />

// 2、一但声明必须初始化，否则会报错

```js
const MY_AGE  // SyntaxError: Missing initializer in const declaration
```





## P40&P41-es6语法-解构赋值、模板字符串和声明对象、对象简写

### **1.解构->赋值**

```javascript
<script>
//【1、数组解构】
//传统
let a=1,b=2,c=3;
console.log(a,b,c);
//es6
let [x,y,z]=[9,8,7];
console.log(x,y,z);

//【2、对象解构】
//【声明对象】
let user={name:'mjx',age:18};

//传统从对象获取属性值
let name1=user.name;
let age1=user.age;
console.log(name1,age1);


//es6从对象获取属性值
let{name,age}=user; ///注意：结构的变量必须是user中的属性
console.log(name,age);

</script>
```



<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200707104916.png" alt="image-20200707104916436" style="zoom: 80%;" />



### 2.模板字符串

模板字符串相当于加强版的字符串，用反引号 `,除了作为普通字符串，**还可以用来定义多行字符**串，还可以**在字符串中加入变量和表达式**。

#### // 1、多行字符串

```js
<script>
    //模板字符串-1.多行字符串
    let info=`hi,my name is mjx!
              ha ha ha ha ha`;
    console.log(info);

</script>
```

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200707105541.png" alt="image-20200707105541344" style="zoom:80%;" />





#### // 2、字符串插入变量和表达式。变量名写在 ${} 中，${} 中可以放入 JavaScript 表达式。

```js
<script>
   let name='mjx';
   let age=20
        //模板字符串-2.字符串插入变量和表达式
        let info=`hi,my name is ${name}!,i am ${age+1},
              ha ha ha ha ha`;
    console.log(info);

</script>
```





<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200707105743.png" alt="image-20200707105743244" style="zoom:80%;" />

#### // 3、字符串中调用函数

```java
<script>
    //函数
    function getName(){
        return "mjx"
    }
	//变量     表达式 ${age+1}
   let age=20
        //模板字符串- 3、字符串中调用函数
        let info=`hi,my name is ${getName()}!,i am ${age+1},
              ha ha ha ha ha`;
    console.log(info);

</script>
```

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200707105952.png" alt="image-20200707105952553" style="zoom:80%;" />



### 3.声明对象简写

```js
<script>
    const age=20;
    const name='dxx';

    //传统 声明对象
    const person1={age:age,name:name};
    console.log(person1);

    //es6 简写
    const person2={age,name};
    console.log(person2);

</script>
```



<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200707110306.png" alt="image-20200707110306859" style="zoom:80%;" />

```js
<script>
    const age=20;
    const name='dxx';
    const color='red';
    const dname='大黄';

    //传统 声明对象
    const person1={age:age,name:name};
    console.log(person1);
    let dog1={dname:dname,color:color};
    console.log(dog1);

    //es6 简写
    const person2={age,name};
    console.log(person2);
    let dog2={dname,color};
    console.log(dog2);


</script>
```





<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200707110603.png" alt="image-20200707110603188" style="zoom:80%;" />







### 4.定义方法简写(定义对象及其方法)

```js
<script>
    //传统
    const person1={
        sayHi:function(){
            console.log("hi");
        }
    }
    person1.sayHi();

    //es6
    const person2={
        sayHi(){
            console.log("hi es6");
        }
    }
    person2.sayHi();
</script>
```

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200707112513.png" alt="image-20200707112512999" style="zoom:80%;" />



```js
<script>
    //传统
    const person1={
        sayHi:function(){
            console.log("hi");
        }
    }
    person1.sayHi();

    //es6
    const person2={
        name:"dxx",
        gender:"女",
        sayHi(){
            console.log("hi"+this.name+":+this.gender");
        }
    }
    person2.sayHi();

</script>
```





<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200707112905.png" alt="image-20200707112904968" style="zoom:80%;" />



## P42-es6语法-对象拓展运算符

创建 对象拓展运算符.html

拓展运算符（...）用于取出参数对象所有可遍历属性然后拷贝到当前对象。

```js
<script>
    //1.拷贝对象
    let person={name:"mjx",age:20,gender:"男"};
    let p2={...person};
    console.log(p2);//{name:"mjx",age:20,gender:"男"}

    //2.合并对象
    // let coler="blue";
    // let nickName="大黄";
    let nickName={nickName:"小黑"};
    let coler={coler:"blue"};
    let dog={...nickName,...coler};
    console.log(dog);
    

</script>
```





<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200707114456.png" alt="image-20200707114456496" style="zoom:80%;" />



## P43-es6语法-箭头函数

箭头函数提供了一种更加简洁的函数书写方式。基本语法是：

```
参数 => 函数体
// 当箭头函数没有参数或者有多个参数，要用 () 括起来。
// 当箭头函数函数体有多行语句，用 {} 包裹起来，表示代码块，
// 当只有一行语句，并且需要返回结果时，可以省略 {} , 结果会自动返回。
```



```js
<script>
    //传统
    var say=function(info){
        return info;
    }
    console.log(say("saying..."));
    
    //es6
    var sing=info=>info;
    console.log(sing("singing"));

    var play=()=>"i am play";
    console.log(play());//i am play
    console.log(play("111"));//i am play

    //函数2个参数 一行返回值
    var dance=(name,gender)=>name+"is dance,and gender is"+gender;
    console.log(dance('mjx','男'));
    console.log(dance('dxx','女'));

    var run=()=>{
        return "running";
    }
    console.log(run());
</script>
```

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200707142731.png" alt="image-20200707142731005" style="zoom:80%;" />



<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200707142919.png" alt="image-20200707142918990" style="zoom:80%;" />