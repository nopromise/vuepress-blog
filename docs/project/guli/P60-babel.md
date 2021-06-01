---
title: P60-babel转码器
date: 2021-05-31
---
[[TOC]]



## P60-babel转码器

### 一、简介  

Babel是一个广泛使用的转码器，可以将ES6代码转为ES5代码，从而在现有环境执行执行。

这意味着，你可以现在就用 ES6 编写程序，而不用担心现有环境是否支持。

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200708120221.png" alt="image-20200708120221512" style="zoom:80%;" />

### 二、安装

#### 安装命令行转码工具

Babel提供babel-cli工具，用于命令行转码。它的安装命令如下：

```
npm install --global babel-cli
#查看是否安装成功
babel --version
```



### **三、Babel的使用**

#### 1、初始化项目

```
npm init -y
```

#### 2、创建文件

src/example.js

下面是一段ES6代码：

```js
// 转码前
// 定义数据
let input = [1, 2, 3]
// 将数组的每个元素 +1
input = input.map(item => item + 1)
console.log(input)
```

#### 3、配置.babelrc

Babel的配置文件是.babelrc，存放在项目的根目录下，该文件用来设置转码规则和插件，基本格式如下。

```
{
    "presets": [],
    "plugins": []
}
```

**presets字段设定转码规则，将es2015规则加入 .babelrc：**

```
{
    "presets": ["es2015"],
    "plugins": []
}
```



#### 4、安装转码器

在项目中安装

```
npm install --save-dev babel-preset-es2015
```



##### 5、转码



根据文件转码和根据文件夹转码

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200708120141.png" alt="image-20200708120140971" style="zoom:80%;" />

