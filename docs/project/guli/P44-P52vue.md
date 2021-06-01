---
title: P44-P52vue
date: 2021-05-31
---
[[TOC]]


## P44-vue入门

### 一、介绍

#### 1、Vue.js 是什么

Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。

Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。

官方网站：https://cn.vuejs.org



#### 2、初始Vue.js

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200707150722.png" alt="image-20200707150722846" style="zoom:80%;" />

这就是声明式渲染：Vue.js 的**核心是一个允许采用简洁的模板语法来声明式地将数据渲染进 DOM 的系统**

这里的核心思想就是**没有繁琐的DOM操作**，例如jQuery中，我们需要先找到div节点，获取到DOM对象，然后进行一系列的节点操作



## P45-抽取代码片段

### **1.在vs code中创建代码片段：**

文件 =>  首选项 => 用户代码片段 => 新建全局代码片段/或文件夹代码片段：vue-html.code-snippets

**注意：制作代码片段的时候，字符串中如果包含文件中复制过来的“Tab”键的空格，要换成“空格键”的空格**

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200707151049.png" alt="image-20200707151049053" style="zoom:80%;" />





```
{
	"vue htm": {
		"scope": "html",
		"prefix": "vuehtml",
		"body": [
			"<!DOCTYPE html>",
			"<html lang=\"en\">",
			"",
			"<head>",
			"    <meta charset=\"UTF-8\">",
			"    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
			"    <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">",
			"    <title>Document</title>",
			"</head>",
			"",
			"<body>",
			"    <div id=\"app\">",
			"",
			"    </div>",
			"    <script src=\"vue.min.js\"></script>",
			"    <script>",
			"        new Vue({",
			"            el: '#app',",
			"            data: {",
			"                $1",
			"            }",
			"        })",
			"    </script>",
			"</body>",
			"",
			"</html>",
		],
		"description": "my vue template in html"
	}
}
```

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200707151336.png" alt="image-20200707151336006" style="zoom:67%;" />





### **2.使用：在html中输入vuehtml,即可引入代码片段**

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200707151456.png" alt="image-20200707151456401" style="zoom:80%;" />



**效果如下：**

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200707151533.png" alt="image-20200707151533376" style="zoom:80%;" />





## P46-P49-vue指令 事件 修饰符 循环指令等

- P46-vue指令-单向和双向绑定
- P47-vue绑定事件
- P48-vue修饰符和条件指令
- P49-vue指令-循环指令

### 1、基本数据渲染和指令 v-bind

你看到的 v-bind 特性被称为指令。指令带有前缀 v- 

除了使用插值表达式{{}}进行数据渲染，也可以使用 v-bind指令，它的简写的形式就是一个冒号（:）

```
data: {
    content: '我是标题',
    message: '页面加载于 ' + new Date().toLocaleString()
}
```

```html
<body>
    <div id="app">
        
        <h1 title="aaa">
            {{msg}}
        </h1>

        <!-- 如果要将模型数据绑定在html属性中，则使用 v-bind 指令
        此时title中显示的是模型数据
        -->
        <h1 v-bind:title="info">
            {{msg}}
        </h1>
        
        <!-- v-bind 指令的简写形式： 冒号（:） -->
        <h1 :title="info">
            {{msg}}
        </h1>
    </div>
    
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        new Vue({
            el: '#app',
            data: {
                msg: "我是消息",
                info: '页面加载...' + new Date().toLocaleString()
            }
        })
    </script>
</body>

</html>
```



### 2、双向数据绑定  v-model

双向数据绑定：使用 v-model 进行双向数据绑定

```html
<body>
    <div id="app">
        <div>
            <!-- v-model 可以进行双向的数据绑定  -->
            <span>v-model</span>
            <input type="text" v-model:value="searchMap.keyWord"></input>
        </div>
        <div>
            <!-- v-bind:value只能进行单向的数据渲染 -->
            <span>v-bind</span>
            <input type="text" v-bind:value="searchMap.keyWord"></input>
            <input type="text" :value="searchMap.keyWord"></input>
        </div>

        <p>您要查找的是：{{searchMap.keyWord}}</p>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        new Vue({
            el: '#app',
            data: {
                searchMap: {
                    keyWord: "mjx"
                }
            }
        })
    </script>
</body>

```





<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200707163045.png" alt="image-20200707163045501" style="zoom:80%;" />





### 3、事件 v-on

创建 03-事件.html

**需求：**点击查询按钮，按照输入框中输入的内容查找公司相关信息

在前面的例子基础上，data节点中增加 result，增加 methods节点 并定义 search方法

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

    
<body>
    <div id="app">
        <!--v-on 绑定事件；click 事件名称-->
        <button v-on:click="search()">查询</button>
        <!--绑定事件简写；click 事件名称-->
        <button @click="search()">查询（简写）</button>

        <p>您要查询的是：{{searchMap.keyWord}}</p>
        <p><a v-bind:href="result.site" target="_blank">{{result.title}}</a></p>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        new Vue({
            el: '#app',
            data: {
                //searchMap是变量，值为对象{}
                searchMap: {
                    keyWord: '百度'
                },
                //
                result: {}
            },
            methods: {//定义多个方法
                search() {
                    alert('search');
                    this.result = {
                        "title": "百度",
                        "site": "http://www.baidu.com"
                    }
                }
            }
        })
    </script>
</body>
</html>
```



### 4、修饰符

修饰符 (Modifiers) 是以半角句号（.）指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。

例如，.prevent 修饰符告诉 v-on 指令对于触发的事件调用 event.preventDefault()：

即阻止事件原本的默认行为





```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <div id="app">
        <!-- submit事件，请求/save -->
        <!-- <form action="save"> -->
        <!-- 阻止submit的调用，调用onSubmit方法 -->
        <form action="save" v-on:submit.prevent="onSubmit()">
            <input type="text" v-model:value="user.name">
            <button type="submit">提交表单</button>
        </form>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        new Vue({
            el: '#app',
            data: {
                user: {}
            },
            methods: {
                onSubmit() {
                    alert(this.user.name)
                }
            }
        })
    </script>
</body>

</html>
```





### 5、条件渲染 v-if v-else

v-if、v-else：条件指令  

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <div id="app">
        <!-- 省略value -->
        <input type="checkbox" v-model="ok">是否同意
        <!-- 未省略value,效果等同上面 -->
        <input type="checkbox" v-model:value="ok">是否同意
        <h1 v-if="ok">ok</h1>
        <h1 v-else>no</h1>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        new Vue({
            el: '#app',
            data: {
                ok:false
            }
        })
    </script>
</body>

</html>
```



![image-20200708060542523](https://gitee.com//nopromise/pic/raw/master/typora/20200708060542.png)



### 6、列表渲染 v-for

**例1：简单的列表渲染**

```html
<body>
    <div id="app">
        <!-- 1、简单的列表渲染 -->
        <ul>
            <li v-for="n in 10">{{n}}</li>
        </ul>
        
        <!-- 如果想获取索引，则使用index关键字，注意，圆括号中的index必须放在后面 -->
        <ul>
            <li v-for="(n,index) in 5">{{n}}-{{index}}</li>
        </ul>
        
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        new Vue({
            el: '#app',
            data: {

            }
        })
    </script>
</body>
```



**例2：遍历数据列表**

v-for="(item,index) in userList"

```html
<body>
    <div id="app">
        <table border="1">
            <tr v-for="(item,index) in userList">
                <td>{{index}}</td>
                <td>{{item.id}}</td>
                <td>{{item.name}}</td>
                <td>{{item.age}}</td>
            </tr>
        </table>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        new Vue({
            el: '#app',
            data: {
                userList:[
                    {id:1,name:"mjx1",age:21},
                    {id:2,name:"mjx2",age:22},
                    {id:3,name:"mjx3",age:23}
                ]   
            }
        })
    </script>
</body>
```

![image-20200708061520418](https://gitee.com//nopromise/pic/raw/master/typora/20200708061520.png)



## P50-52vue组件、生命周期、路由

### 一、组件（重点）

组件（Component）是 Vue.js 最强大的功能之一。

组件**可以扩展 HTML 元素**，封装可重用的代码。

组件系统让我们可以用独立可复用的小组件来构建大型应用，几乎任意类型的应用的界面都可以抽象为一个组件树：

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200708062709.png" alt="image-20200708062709861" style="zoom:80%;" />



#### 1、局部组件

```html
<body>
    <div id="app">
        //使用局部组件
        <Navbar></Navbar>
        <hh></hh>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        new Vue({
            el: '#app',
            components: {
                //组件的名
                Navbar: {
                    //组件内容
                    template: '<ul><li>首页</li><li>学员管理</li></ul>'
                },
                //组件的名
                hh: { 
                    //组件内容  组件内容必须由1个根元素包裹着，如下面div包着，不然报错
                    template: '<div><h1>1</h1><h2>2</h2><h3>3</h3></div>'
                }
            }
        })
    </script>
</body>
```

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200708063408.png" alt="image-20200708063408691" style="zoom:80%;" />



#### 2、全局组件



定义全局组件：components/Navbar.js

```JS
Vue.component('Nbar',{
    template:'<div><span>1111</span><h2>hhhhh</h2></div>'
})
```

**html文件**

```html
<body>
    <div id="app">
        <Nbar></Nbar>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <!-- 引入全局组件Navbar.js -->
    <script src="js/Navbar.js"></script>
    <script>
        new Vue({
            el: '#app',
            data: {
                
            }
        })
    </script>
</body>
```



<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200708064402.png" alt="image-20200708064402143" style="zoom:80%;" />





### 二、实例生命周期

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200708064756.png" alt="Vue å®ä¾çå½å¨æ" style="zoom:80%;" />

**最重点的2个方法 created和mouted**

- created：页面渲染之前执行
- mouted：页面渲染之后执行

**测试**  debugger

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200708070417.png" alt="image-20200708070417014" style="zoom:80%;" />





**分析生命周期相关方法的执行时机**



<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200708070547.png" alt="image-20200708070547282" style="zoom:80%;" />

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200708070558.png" alt="image-20200708070558127" style="zoom:80%;" />



### 三、路由 router-link

Vue.js 路由允许我们**通过不同的 URL 访问不同的内容**。

通过 Vue.js 可以实现**多视图的单页Web应用**（single page web application，SPA）。

Vue.js 路由需要载入 vue-router 库







#### 1、引入vue-router.min.js

```html
//js有先后顺序
<script src="vue.min.js"></script>
<script src="vue-router.min.js"></script>
```

#### 2、编写html

```html
<body>
    <div id="app">
        <h1>hello app</h1>
        <p>
            <!-- 使用 router-link 组件来导航. -->
            <!-- 通过传入 `to` 属性指定链接. -->
            <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
            <router-link to="/">首页</router-link>
            <router-link to="/stu">学生管理</router-link>
            <router-link to="/tea">讲师管理</router-link>
        </p>
        <!-- 路由出口 -->
        <!-- 路由匹配到的组件将渲染在这里 -->
        <router-view></router-view>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script src="https://unpkg.com/vue-router@3.3.4/dist/vue-router.js"></script>
    <script>
        // 1. 定义（路由）组件。
        // 可以从其他文件 import 进
        const Welcome = { template: '<div>欢迎</div>' }
        const Student = { template: '<div>学生管理列表</div>' }
        const Teacher = { template: '<div>教师列表</div>' }

        // 2. 定义路由
        // 每个路由应该映射一个组件。
        const routes = [
            { path: '/', redirect: '/welcome' },//设置默认指向的路径
            { path: '/welcome', component: Welcome },
            { path: '/stu', component: Student },
            { path: '/tea', component: Teacher }
        ]

        // 3. 创建 router 实例，然后传 `routes` 配置
        const router = new VueRouter({
            routes //// （缩写）相当于 routes: routes
        })

        //  4. 创建和挂载根实例。
        // 从而让整个应用都有路由功能
        const app = new Vue({
            el: '#app',
            router,
            data: {

            }
        })
    </script>
</body>
```

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200708085811.png" alt="image-20200708085810956" style="zoom:80%;" />