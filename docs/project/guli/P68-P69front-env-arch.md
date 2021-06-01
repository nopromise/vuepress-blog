---
title: P68-P69项目前端页面环境搭建与框架介绍
date: 2021-06-01
---
[[TOC]]

## P68-搭建项目前端页面环境

### **若安装错误**

**p68 如果有遇到npm install始终错误的 报错信息是node-sass问题的**
**可以安装cnpm 然后再cnpm install node-sass可以完美解决**



p68 如果有遇到npm install始终错误的 报错信息是node-sass问题的
可以安装cnpm 然后再cnpm install node-sass可以完美解决

**执行如下命令：**

> npm install -g cnpm --registry=https://registry.npm.taobao.org
>
> cnpm install -g yarn
>
> cnpm install node-sass
>
> cnpm install









![11-搭建项目前端页面环境](https://gitee.com//nopromise/pic/raw/master/typora/20200712151947.png)



**启动项目**

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200712152701.png" alt="image-20200712152701655" style="zoom:80%;" />

### **一、vue-element-admin** 

#### **1、简介**

而vue-element-admin是基于element-ui 的一套后台管理系统集成方案。

**功能：**https://panjiachen.github.io/vue-element-admin-site/zh/guide/#功能

**GitHub地址：**https://github.com/PanJiaChen/vue-element-admin

**项目在线预览：**[https://panjiachen.gitee.io/vue-element-admin](https://panjiachen.gitee.io/vue-element-admin/#/login?redirect=%2Fdashboard)

#### 2、安装

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200712152837.png" alt="image-20200712152837711" style="zoom:80%;" />



### 二、**vue-admin-template**

#### 1、简介

vueAdmin-template是基于vue-element-admin的一套后台管理系统基础模板（最少精简版），可作为模板进行二次开发。

**GitHub地址：**https://github.com/PanJiaChen/vue-admin-template

**建议：**你可以在 `vue-admin-template` 的基础上进行二次开发，把 `vue-element-admin`当做工具箱，想要什么功能或者组件就去 `vue-element-admin` 那里复制过来。

#### 2、安装

<img src="C:\Users\31265\AppData\Roaming\Typora\typora-user-images\image-20200712152929558.png" alt="image-20200712152929558" style="zoom:80%;" />







## P69-前端页面框架介绍

### 一、前端页面的入口

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200712154545.png" alt="image-20200712154545230" style="zoom:80%;" />







### **一、项目的创建和基本配置**

#### **1、创建项目**

将vue-admin-template-master重命名为guli-admin

#### 2、修改项目信息

package.json

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200712153344.png" alt="image-20200712153344246" style="zoom:80%;" />



#### 3、如果需要修改端口号

config/index.js中修改

```
port: 9528
```



#### **4、项目的目录结构**

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200712153436.png" alt="image-20200712153436165" style="zoom:80%;" />



<img src="C:\Users\31265\AppData\Roaming\Typora\typora-user-images\image-20200712153450005.png" alt="image-20200712153450005" style="zoom:80%;" />

#### **5、运行项目**

```
npm run dev
```





### 二、一些常用配置



#### **1、userEslint：false  不使用Eslint语法检查**



JavaScript 是一个动态的弱类型语言，在开发中比较容易出错。因为没有编译程序，为了寻找 JavaScript 代码错误通常需要在执行过程中不断调适。

ESLint 是一个语法规则和代码风格的检查工具，可以用来保证写出语法正确、风格统一的代码。让程序员在编码的过程中发现问题而不是在执行的过程中。



ESLint 内置了一些规则，也可以在使用过程中自定义规则。

本项目的语法规则包括：两个字符缩进，必须使用单引号，不能使用双引号，语句后不可以写分号，代码段之间必须有一个空行等。





<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200712155148.png" alt="image-20200712155148893" style="zoom:80%;" />





#### 2、当前要访问的接口的地址

![image-20200712155322372](https://gitee.com//nopromise/pic/raw/master/typora/20200712155322.png)



### 三、Eslint语法规范型检查

#### **1、ESLint简介**

JavaScript 是一个动态的弱类型语言，在开发中比较容易出错。因为没有编译程序，为了寻找 JavaScript 代码错误通常需要在执行过程中不断调适。

ESLint 是一个语法规则和代码风格的检查工具，可以用来保证写出语法正确、风格统一的代码。让程序员在编码的过程中发现问题而不是在执行的过程中。

#### 2、语法规则

ESLint 内置了一些规则，也可以在使用过程中自定义规则。

本项目的语法规则包括：两个字符缩进，必须使用单引号，不能使用双引号，语句后不可以写分号，代码段之间必须有一个空行等。

#### 3、确认开启语法检查

打开 config/index.js，配置是否开启语法检查

```
useEslint: true,
```

#### 4、ESLint插件安装

vs code的ESLint插件，能帮助我们自动整理代码格式 

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200712155630.png" alt="image-20200712155630512" style="zoom:80%;" />

#### 5、插件的扩展设置

选择vs code左下角的“设置”， 打开 VSCode 配置文件,添加如下配置

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200712155700.png" alt="image-20200712155700700" style="zoom:80%;" />![image-20200712155711945](https://gitee.com//nopromise/pic/raw/master/typora/20200712155712.png)<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200712155700.png" alt="image-20200712155700700" style="zoom:80%;" />![image-20200712155711945](https://gitee.com//nopromise/pic/raw/master/typora/20200712155712.png)

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200712155712.png" alt="image-20200712155711945" style="zoom:80%;" />

<img src="C:\Users\31265\AppData\Roaming\Typora\typora-user-images\image-20200712155720981.png" alt="image-20200712155720981" style="zoom:80%;" />



### 四、一些修改

#### 登录页修改

src/views/login/index.vue（登录组件）

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200712160553.png" alt="image-20200712160553284" style="zoom:80%;" />





#### 标题

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200712160612.png" alt="image-20200712160612205" style="zoom:80%;" />

#### 国际化设置

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200712160628.png" alt="image-20200712160628838" style="zoom:80%;" />





#### icon

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200712160645.png" alt="image-20200712160645267" style="zoom:80%;" />



#### 导航栏文字

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200712160711.png" alt="image-20200712160711214" style="zoom:80%;" />





#### **面包屑文字**

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200712160729.png" alt="image-20200712160729455" style="zoom:80%;" />