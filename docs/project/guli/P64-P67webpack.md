---
title: P64-P67webpack打包js和css
date: 2021-05-31
---
[[TOC]]

## 一、什么是Webpack



<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200712101349.png" alt="image-20200712101349690" style="zoom:80%;" />

Webpack 是一个前端资源加载/打包工具。它将根据模块的依赖关系进行静态分析，然后将这些模块按照指定的规则生成对应的静态资源。

从图中我们可以看出，Webpack 可以将多种静态资源 js、css、less 转换成一个静态文件，减少了页面的请求。 





## 二、Webpack安装

### 准备工作：

**创建webpackdemo文件夹，然后执行初始化：npm init -y**

### 1、全局安装

```
npm install -g webpack webpack-cli
```

### 2、安装后查看版本号

```
webpack -v
```



## 三、初始化项目

### 1、创建we#bpack文件夹

进入webpack目录，执行命令

```
npm init -y
```

### 2、创建src文件夹

### 3、src下创建common.js

```js
exports.info = function (str) {
    document.write(str);//在浏览器中输出
}
```

### 4、src下创建utils.js

```js
exports.add = function (a, b) {
    return a + b;
}
```

### 5、src下创建main.js

```js
const common = require('./common');
const utils = require('./utils');
common.info('Hello world!' + utils.add(100, 200));
```



<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200712104909.png" alt="image-20200712104909184" style="zoom:80%;" />







## 四、JS打包

### 1、webpack目录下创建配置文件webpack.config.js

以下配置的意思是：读取当前项目目录下src文件夹中的main.js（入口文件）内容，分析资源依赖，把相关的js文件打包，打包后的文件放入当前目录的dist文件夹下，打包后的js文件名为bundle.js

```js
const path = require("path"); //Node.js内置模块
module.exports = {
    entry: './src/main.js', //配置入口文件
    output: {
        path: path.resolve(__dirname, './dist'), //输出路径，__dirname：当前文件所在路径
        filename: 'bundle.js' //输出文件
    }
}
```



### 2、命令行执行编译命令

```js
webpack #有黄色警告
webpack --mode=development #没有警告
#执行后查看bundle.js 里面包含了上面两个js文件的内容并惊醒了代码压缩
```

**执行结果**

![image-20200712105533512](C:\Users\31265\AppData\Roaming\Typora\typora-user-images\image-20200712105533512.png)



**测试：**

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200712105803.png" alt="image-20200712105803309" style="zoom:80%;" />



<img src="C:\Users\31265\AppData\Roaming\Typora\typora-user-images\image-20200712105812974.png" alt="image-20200712105812974" style="zoom:80%;" />





也可以配置项目的npm运行命令，修改package.json文件

```js
"scripts": {
    //...,
    "dev": "webpack --mode=development"
 }
```

运行npm命令执行打包

```
npm run dev
```



### 3、webpack目录下创建index.html

引用bundle.js

```html


<body>
    <script src="dist/bundle.js"></script>
</body>
```

### 4、浏览器中查看index.html





## 五、CSS打包

### 1、安装style-loader和 css-loader

Webpack 本身只能处理 JavaScript 模块，如果要处理其他类型的文件，就需要使用 loader 进行转换。

**Loader 可以理解为是模块和资源的转换器。**

首先我们需要安装相关Loader插件，css-loader 是将 css 装载到 javascript；style-loader 是让 javascript 认识css

```
npm install --save-dev style-loader css-loader 
```

### 2、修改webpack.config.js

```js
const path = require("path"); //Node.js内置模块
module.exports = {
    entry: './src/main.js', //配置入口文件
    output: {
        path: path.resolve(__dirname, './dist'), //输出路径，__dirname：当前文件所在路径
        filename: 'bundle.js' //输出文件
    },
    //css的配置
    module: {
        rules: [  
            {  
                test: /\.css$/,    //打包规则应用到以css结尾的文件上
                use: ['style-loader', 'css-loader']
            }  
        ]  
    }
}
```

### 3、在src文件夹创建style.css

```
body{
    background:pink;
}
```

### 4、修改main.js 

在第一行引入style.css

```
require('./style.css');
```



**//main.js如下：**

```js
const common = require('./common');
const utils = require('./utils');

//引入css文件
require('./style.css');

common.info('Hello world!' + utils.add(100, 200));
```



**执行命令**

webpack #有黄色警告
webpack --mode=development #没有警告
#执行后查看bundle.js 里面包含了上面两个js文件的内容并惊醒了代码压缩



<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200712111732.png" alt="image-20200712111732680" style="zoom:80%;" />



### 5、浏览器中查看index.html 

看看背景是不是变成粉色啦？

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200712111900.png" alt="image-20200712111859994" style="zoom:80%;" />





<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200712111943.png" alt="image-20200712111943206" style="zoom:80%;" />









<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200712112033.png" alt="image-20200712112033776" style="zoom:80%;" />