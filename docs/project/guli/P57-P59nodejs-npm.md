---
title: P57-P59nodejs-npm
date: 2021-05-31
---
[[TOC]]



## P57&P58-nodejs

### 一、简介

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200708100906.png" alt="image-20200708100906170" style="zoom:80%;" />

#### 1、什么是Node.js

简单的说 Node.js 就是运行在服务端的 JavaScript。

Node.js是一个事件驱动I/O服务端JavaScript环境，基于Google的V8引擎，V8引擎执行Javascript的速度非常快，性能非常好。

#### 2、Node.js有什么用

如果你是一个前端程序员，你不懂得像PHP、Python或Ruby等动态编程语言，然后你想创建自己的服务，那么Node.js是一个非常好的选择。

Node.js 是运行在服务端的 JavaScript，如果你熟悉Javascript，那么你将会很容易的学会Node.js。

当然，如果你是后端程序员，想部署一些高性能的服务，那么学习Node.js也是一个非常好的选择。



### 二、安装

#### 1、下载

官网：https://nodejs.org/en/

中文网：http://nodejs.cn/

LTS：长期支持版本

Current：最新版

#### 2、安装

#### 3、查看版本

```
node -v
```

### 三、快速入门

#### 1.控制台程序

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200708101221.png" alt="image-20200708101221746" style="zoom:80%;" />

**运行**

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200708101256.png" alt="image-20200708101256545" style="zoom:80%;" />



浏览器的内核包括两部分核心：

- DOM渲染引擎；
- js解析器（js引擎）
- js运行在浏览器中的内核中的js引擎内部

Node.js是脱离浏览器环境运行的JavaScript程序，基于V8 引擎（Chrome 的 JavaScript的引擎）



#### 2、服务器端应用开发（了解）

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200708101436.png" alt="image-20200708101436800" style="zoom:80%;" />





## P59-NPM

### 一、简介 

#### 1、什么是NPM

NPM全称Node Package Manager，是Node.js包管理工具，是全球最大的模块生态系统，里面所有的模块都是开源免费的；也是Node.js的包管理工具，**相当于前端的Maven** 。

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200708113759.png" alt="image-20200708113759889" style="zoom:80%;" />

#### 2、NPM工具的安装位置

我们通过npm 可以很方便地下载js库，管理前端工程。

**Node.js默认安装的npm包和工具的位置：Node.js目录\node_modules**

- 在这个目录下你可以看见 npm目录，npm本身就是被NPM包管理器管理的一个工具，说明 Node.js已经集成了npm工具

```
#在命令提示符输入 npm -v 可查看当前npm版本
npm -v
```



### 二、使用npm管理项目

#### 1、创建文件夹npm

#### 2、项目初始化

```
#建立一个空文件夹，在命令提示符进入该文件夹  执行命令初始化
npm init
#按照提示输入相关信息，如果是用默认值则直接回车即可。
#name: 项目名称
#version: 项目版本号
#description: 项目描述
#keywords: {Array}关键词，便于用户搜索到我们的项目
#最后会生成package.json文件，这个是包的配置文件，相当于maven的pom.xml
#我们之后也可以根据需要进行修改。
```

```
#如果想直接生成 package.json 文件，那么可以使用命令
npm init -y
```

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200708114109.png" alt="image-20200708114108998" style="zoom:80%;" />

<img src="C:\Users\31265\AppData\Roaming\Typora\typora-user-images\image-20200708114213615.png" alt="image-20200708114213615" style="zoom:80%;" />



#### 3、修改npm镜像

NPM官方的管理的包都是从 http://npmjs.com下载的，但是这个网站在国内速度很慢。

这里推荐使用淘宝 NPM 镜像 http://npm.taobao.org/ ，淘宝 NPM 镜像是一个完整 npmjs.com 镜像，同步频率目前为 10分钟一次，以保证尽量与官方服务同步。

**设置镜像地址：**

```js
#经过下面的配置，以后所有的 npm install 都会经过淘宝的镜像地址下载
npm config set registry https://registry.npm.taobao.org 
#查看npm配置信息
npm config list
```



#### 4、npm install命令的使用

```js
#使用 npm install 安装依赖包的最新版，
#模块安装的位置：项目目录\node_modules
#安装会自动在项目目录下添加 package-lock.json文件，这个文件帮助锁定安装包的版本
#同时package.json 文件中，依赖包会被添加到dependencies节点下，类似maven中的 <dependencies>
npm install jquery

#npm管理的项目在备份和传输的时候一般不携带node_modules文件夹
npm install #根据package.json中的配置下载依赖，初始化项目

#如果安装时想指定特定的版本
npm install jquery@2.1.x

#devDependencies节点：开发时的依赖包，项目打包到生产环境的时候不包含的依赖
#使用 -D参数将依赖添加到devDependencies节点
npm install --save-dev eslint
#或
npm install -D eslint

#全局安装
#Node.js全局安装的npm包和工具的位置：用户目录\AppData\Roaming\npm\node_modules
#一些命令行工具常使用全局安装的方式
npm install -g webpack
```



**npm安装jquery**

生成node_module\jquery文件夹

生成package-lock.json，就是锁定当前jquery版本,不允许更新

![image-20200708114753468](https://gitee.com//nopromise/pic/raw/master/typora/20200708114753.png)





#### 5、其它命令

```js
#更新包（更新到最新版本）
npm update 包名
#全局更新
npm update -g 包名
#卸载包
npm uninstall 包名
#全局卸载
npm uninstall -g 包名
```





#### 6、根据配置文件下载依赖

```js
#npm管理的项目在备份和传输的时候一般不携带node_modules文件夹
npm install #根据package.json中的配置下载依赖，初始化项目
```



<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200708115139.png" alt="image-20200708115139485" style="zoom:80%;" />



**执行npm install**

**生成jquery文件**

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200708115222.png" alt="image-20200708115222238" style="zoom:80%;" />



```js
#npm管理的项目在备份和传输的时候一般不携带node_modules文件夹
npm install #根据package.json中的配置下载依赖，初始化项目
```



#### 7、安装插件？

```json
//当前项目环境安装
#devDependencies节点：开发时的依赖包，项目打包到生产环境的时候不包含的依赖
#使用 -D参数将依赖添加到devDependencies节点
npm install --save-dev eslint
#或
npm install -D eslint



#全局安装 -g global
#Node.js全局安装的npm包和工具的位置：用户目录\AppData\Roaming\npm\node_modules
#一些命令行工具常使用全局安装的方式
npm install -g webpack
```

