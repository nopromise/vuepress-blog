---
title: P53-P56axios-elementUI
date: 2021-05-31
---
[[TOC]]

P53-项目第四天内容介绍

P54-axios使用（1）

P55-axios使用（2）

P56-element-ui介绍

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200708090436.png" alt="image-20200708090436113" style="zoom:80%;" />



## P53-55axios使用

axios是独立于vue的一个项目，基于promise用于浏览器和node.js的**http客户端**

- 在浏览器中可以帮助我们完成 ajax请求的发送
- 在node.js中可以向远程接口发送请求

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200708090642.png" alt="image-20200708090641967" style="zoom:80%;" />







### 获取数据 

```
<script src="vue.min.js"></script>
<script src="axios.min.js"></script>

```

```
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

注意：测试时需要**开启后端服务器**，并且**后端开启跨域访问权限**

**测试json文件**

```json
{
    "sucess":true,
    "code":20000,
    "message":"成功",
    "data":{
        "items":[
            {"name":"lucy","age":20},
            {"name":"mary","age":30},
            {"name":"jack","age":40}
        ]
    }
}
```



**html测试**

```html
<body>
    <div id="app">
        axios测试
        <table border="1">
            <tr>
                <td>姓名</td>
                <td>年龄</td>
            </tr>
            <tr v-for="item in userList">
                <td>{{item.name}}</td>
                <td>{{item.age}}</td>
            </tr>
        </table>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script src="axios.min.js"></script>
    <script>
        new Vue({
            el: '#app',
            data: {
                userList: [] //定义userList数据，存储后台返回的数据
            },
            created() {
                // getUserList();
                //需要this关键字
                this.getUserList();
            },
            methods: {
                getUserList() {
                    //ajax.get请求 
                    //axios.get('http://localhost:8081/admin/ucenter/member')
                    axios.get('data.json')
                        .then(res => {//箭头函数
                            // console.log(res);
                            console.log(res.data.data.items);
                            this.userList=res.data.data.items;
                        })
                        .catch(err => {//箭头函数
                            console.log(err);
                        })
                }
            }
        })
    </script>
</body>
```



<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200708093746.png" alt="image-20200708093746485" style="zoom:80%;" />







## P56element-ui介绍

element-ui 是饿了么前端出品的**基于 Vue.js的 后台组件库**，方便程序员进行页面快速布局和构建

**官网： http://element-cn.eleme.io/#/zh-CN**



<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200708094306.png" alt="image-20200708094306760" style="zoom:67%;" />



<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200708094338.png" alt="image-20200708094337940" style="zoom:80%;" />





### 1、引入css

```
<!-- import CSS -->
<link rel="stylesheet" href="element-ui/lib/theme-chalk/index.css">
```



### 2、引入js

```
<!-- import Vue before Element -->
<script src="vue.min.js"></script>
<!-- import JavaScript -->
<script src="element-ui/lib/index.js"></script>
```



### 3、编写html

```
<div id="app">
    <el-button @click="visible = true">Button</el-button>
    <el-dialog :visible.sync="visible" title="Hello world">
        <p>Try Element</p>
    </el-dialog>
</div>
```



关于.sync的扩展阅读

https://www.jianshu.com/p/d42c508ea9de

### 4、编写js

```
<script>
    new Vue({
      el: '#app',
      data: function () {//定义Vue中data的另一种方式
        return { visible: false }
      }
    })
</script>
```



**测试**

其他ui组件我们在项目中学习