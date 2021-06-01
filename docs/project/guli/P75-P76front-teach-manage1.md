---
title: P75-P76讲师管理前端-讲师列表（1、2）
date: 2021-06-01
---
[[TOC]]

## P75-P76讲师列表





### 1.添加路由

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200712194254.png" alt="image-20200712194254729" style="zoom:80%;" />

**效果**

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200712194341.png" alt="image-20200712194341676" style="zoom:80%;" />





### 2.创建路由对应的页面

**在views文件夹内创建页面list.vue和save.vue，并引入到router文件夹内的index.js中**

![image-20200712201432949](https://gitee.com//nopromise/pic/raw/master/typora/20200712201433.png)



### 3.在页面内写一点内容进行测试

**固定格式默认：**

```vue
<template>
  <div class="app-container">
      ...
  </div>
</template>
```



在list.vue中

```vue
<template>
  <div class="app-container">
    讲师列表
  </div>
</template>
```

在save.vue中添加

```vue
<template>
  <div class="app-container">
    讲师添加
  </div>
</template>
```



**效果：**

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200712201956.png" alt="image-20200712201956495" style="zoom:50%;" />![image-20200712202008134](https://gitee.com//nopromise/pic/raw/master/typora/20200712202008.png)

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200712201956.png" alt="image-20200712201956495" style="zoom:50%;" />![image-20200712202008134](https://gitee.com//nopromise/pic/raw/master/typora/20200712202008.png)



### 4.在api文件夹创建teacher.js

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200712205916.png" alt="image-20200712205916516" style="zoom:80%;" />

```js
import request from '@/utils/request'

//参考P61-P63模块化操作 
//定义方法：设置哪些方法可以被其他js调用
export default {
    //1.讲师列表（条件查询分页）
    // page limit teacherQuery
    getTeacherListPage(page, limit, teacherQuery) {
        return request({
            // url:'/eduservice/teacher/pageTeacherCondition/'+page+'/'+limit,
            //或者使用`符号
            url:`/eduservice/teacher/pageTeacherCondition/${page}/${limit}`,
            method: 'post',
            // params 
            //  params: { token }   //controller中参数非json格式
            //使用controller中使用requestBody接收json格式的参数时候，使用data
            data:teacherQuery
        })
    }
}
```



![image-20200713061713844](https://gitee.com//nopromise/pic/raw/master/typora/20200713061713.png)









### 5.在讲师列表页面list.vue中调用定义的接口方法，得到接口返回数据



```vue
<template>
  <div class="app-container">讲师列表</div>
</template>


<script>
//引入调用teacher.js的文件
// ./代表当前这个vue文件所在路径，@是在webpack配置的路径别名.
import teacher from "@/api/edu/teacher";

//固定格式
export default { 
  //写核心代码的位置
    
    
  data() {//定义变量和初始值（根据实际定义）
    return {
      list: null, //查询之后接口返回的集合
      page: 1, //当前页
      limit: 10, //每页记录数
      total: 0, //总记录数
      teacherQuery: {} //条件封装对象
    };
  },
    
  created() {//页面渲染之前执行，一般调用methods里面定义的方法
    this.getList();
  },
    
    
  methods: { //创建具体的方法
    //讲师列表的方法
    getList() {
      teacher
        .getTeacherListPage(this.page, this.limit, this.teacherQuery)
        .then(response => {
          //请求成功
          // console.log(response);
          this.list=response.data.rows;//列表
          this.total=response.data.total;//总记录数
        })
        .catch(error => {
          //请求失败
          console.log(error);
        });
    }
  }
};
</script>
```













### 6.把请求接口获取的数据在页面进行显示

**使用组件element-ui实现**

![image-20200712215745241](https://gitee.com//nopromise/pic/raw/master/typora/20200712215745.png)







当`el-table`元素中注入`data`对象数组后，在`el-table-column`中用`prop`属性来对应对象中的键名即可填入数据，用`label`属性来定义表格的列名。可以使用`width`属性来定义列宽。

```vue
  <template>
    <el-table
      :data="tableData"    //对应<script>中的tableData
      style="width: 100%">
        
      <el-table-column
        prop="date"   //对应tableData中的date name和address
        label="日期"
        width="180">
      </el-table-column>
        
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
        
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
        
    </el-table>
  </template>

  <script>
    export default {
      data() {
        return {
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
        }
      }
    }
  </script>
```



**第一次尝试：**

```vue
<template>
  <div class="app-container">
    讲师列表
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="name" label="讲师姓名" width="180"></el-table-column>
      <el-table-column prop="level" label="头衔" width="180"></el-table-column>
      <el-table-column prop="career" label="资历"></el-table-column>
    </el-table>
  </div>
</template>


<script>
//引入调用teacher.js的文件
// ./代表当前这个vue文件所在路径，@是在webpack配置的路径别名.
import teacher from "@/api/edu/teacher";
export default {
  //写核心代码的位置
  data() {
    //定义变量和初始值（根据实际定义）
    return {
      list: null, //查询之后接口返回的集合
      page: 1, //当前页
      limit: 10, //每页记录数
      total: 0, //总记录数
      teacherQuery: {} //条件封装对象
    };
  },
  created() {
    //页面渲染之前执行，一般调用methods里面定义的方法
    this.getList();
  },
  methods: {
    //创建具体的方法
    //讲师列表的方法
    getList() {
      teacher
        .getTeacherListPage(this.page, this.limit, this.teacherQuery)
        .then(response => {
          //请求成功
          // console.log(response);
          this.list = response.data.rows; //列表
          this.total = response.data.total; //总记录数
        })
        .catch(error => {
          //请求失败
          console.log(error);
        });
    }
  }
};
</script>
```



![image-20200712221138033](https://gitee.com//nopromise/pic/raw/master/typora/20200712221138.png)







**老师的代码**

```vue
 <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row>
      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" width="80" />
      <el-table-column label="头衔" width="80">
        <template slot-scope="scope">
          {{ scope.row.level===1?'高级讲师':'首席讲师' }}
        </template>
      </el-table-column>
      <el-table-column prop="intro" label="资历" />
      <el-table-column prop="gmtCreate" label="添加时间" width="160"/>
      <el-table-column prop="sort" label="排序" width="60" />
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/edu/teacher/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
```

![image-20200712221510446](https://gitee.com//nopromise/pic/raw/master/typora/20200712221510.png)



效果如下：

![image-20200712221349820](https://gitee.com//nopromise/pic/raw/master/typora/20200712221349.png)





**用于判断**：

```vue
 <el-table-column label="头衔" width="80">
        <!-- scope:整个表格是一个scope -->
        <!-- scope.row：每行的内容 -->
        <template slot-scope="scope">{{ scope.row.level===1?'高级讲师':'首席讲师' }}</template>
</el-table-column>
```

=== ：三个等号判断类型和值

==：判断值，字符串和数字等类型也相等 1 '1'