---
title: P77-P82讲师管理前端-分页、添加、删除、条件删除、修改等
date: 2021-06-01
---
[[TOC]]



## P77-讲师管理前端-讲师分页和添加

### 1.分页组件

```html
   <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="fetchData"
    />
```

**elememt-ui中有很多分页组件**

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200718095907.png" alt="image-20200718095907405" style="zoom: 67%;" />





### 2.分页代码分析

```vue
<template>
  <div class="app-container">
    <el-table>
     .........
    </el-table>

    <!-- el 分页 -->
    <el-pagination
      :current-page="page"  
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
      
  </div>
</template>


<script>
//引入调用teacher.js的文件
// ./代表当前这个vue文件所在路径，@是在webpack配置的路径别名.
import teacher from "@/api/edu/teacher";

//固定格式
//写核心代码的位置
export default {
  data() {
    //定义变量和初始值（根据实际定义）
    return {
      list: null, //查询之后接口返回的集合
      page: 1, //当前页
      limit: 5, //每页记录数
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
    getList(page=1) {
      this.page=page;
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



![image-20200718103757091](https://gitee.com//nopromise/pic/raw/master/typora/20200718103757.png)







**改造---是代码清晰易懂：用curPage定义当页面**

![image-20200718104416355](https://gitee.com//nopromise/pic/raw/master/typora/20200718104416.png)





## P78-讲师管理前端-讲师条件查询

### 1.elementui中form表单组件学习

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200718105211.png" alt="image-20200718105211104" style="zoom:67%;" />



```vue
<el-form :inline="true" :model="formInline" class="demo-form-inline">
  
  <el-form-item label="审批人">
    <el-input v-model="formInline.user" placeholder="审批人"></el-input>
  </el-form-item>
    
  <el-form-item label="活动区域">
    <el-select v-model="formInline.region" placeholder="活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
    
  <el-form-item>
    <el-button type="primary" @click="onSubmit">查询</el-button>
  </el-form-item>
    
</el-form>


<script>
  export default {
    data() {
      return {
        formInline: {
          user: '',
          region: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>
```

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200718112622.png" alt="image-20200718112622817" style="zoom:67%;" />



### 2.项目中代码实战

```vue
<template>
  <div class="app-container">
    <el-form :inline="true" :model="teacherQuery" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="teacherQuery.name" placeholder="讲师名"></el-input>
      </el-form-item>

      <el-form-item>
        <el-select v-model="teacherQuery.level" placeholder="讲师头衔">
          <el-option label="高级讲师" value="1"></el-option>
          <el-option label="首席讲师" value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="添加时间">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="开始时间"
            v-model="teacherQuery.begin"
            style="width: 100%;"
          ></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="结束时间"
            v-model="teacherQuery.end"
            style="width: 100%;"
          ></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="getList()">查询</el-button>
        <el-button type="warning" @click="reset()">清空</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" element-loading-text="数据加载中" border fit highlight-current-row>
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">{{ (curPage - 1) * limit + scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column prop="name" label="名称" width="80" />
      <el-table-column label="头衔" width="80">
        <!-- scope:整个表格是一个scope -->
        <!-- scope.row：每行的内容 -->
        <template slot-scope="scope">{{ scope.row.level===1?'高级讲师':'首席讲师' }}</template>
      </el-table-column>
      <el-table-column prop="intro" label="资历" />
      <el-table-column prop="gmtCreate" label="添加时间" width="160" />
      <el-table-column prop="sort" label="排序" width="60" />
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/edu/teacher/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- el 分页 -->

    <el-pagination
      :current-page="curPage"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>


<script>
//引入调用teacher.js的文件
// ./代表当前这个vue文件所在路径，@是在webpack配置的路径别名.
import teacher from "@/api/edu/teacher";

//固定格式
//写核心代码的位置
export default {
  data() {
    //定义变量和初始值（根据实际定义）
    return {
      list: null, //查询之后接口返回的集合
      curPage: 1, //当前页
      limit: 5, //每页记录数
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
    getList(page = 1) {
      this.curPage = page;
      teacher
        .getTeacherListPage(this.curPage, this.limit, this.teacherQuery)
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
    },

    reset() {
      //1.清空查询表单
      this.teacherQuery = {};
      //2.查询所有
      this.getList();
    }
  }
};
</script>
```



![image-20200718113246152](https://gitee.com//nopromise/pic/raw/master/typora/20200718113246.png)





## P79-讲师管理前端-讲师删除

![image-20200718172551810](https://gitee.com//nopromise/pic/raw/master/typora/20200718172551.png)



### 1.后台讲师接口和删除讲师的button按钮

![image-20200718172935217](https://gitee.com//nopromise/pic/raw/master/typora/20200718172935.png)

### 2.element-ui的消息弹框

> this.$.confirm-  消息弹框
>
> this.$.message- 消息提示框



![image-20200718173045407](https://gitee.com//nopromise/pic/raw/master/typora/20200718173045.png)



### 3.在teacher.js中编写removeById的方法

![image-20200718173138209](https://gitee.com//nopromise/pic/raw/master/typora/20200718173138.png)



### 4.list.vue的代码

![image-20200718173352462](https://gitee.com//nopromise/pic/raw/master/typora/20200718173352.png)

list.vue

```vue
<template>
  <div class="app-container">
    <el-form :inline="true" :model="teacherQuery" class="demo-form-inline">
     ...
    </el-form>

    <el-table :data="list" element-loading-text="数据加载中" border fit highlight-current-row>
     ............
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
            
          <router-link :to="'/edu/teacher/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
            
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)"
          >删除</el-button>
            
            
        </template>
      </el-table-column>
    </el-table>

    <!-- el 分页 -->
	.....
  </div>
</template>


<script>
//引入调用teacher.js的文件
// ./代表当前这个vue文件所在路径，@是在webpack配置的路径别名.
import teacher from "@/api/edu/teacher";

//固定格式
//写核心代码的位置
export default {
  data() {
    //定义变量和初始值（根据实际定义）
    return {
      list: null, //查询之后接口返回的集合
      curPage: 1, //当前页
      limit: 5, //每页记录数
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
    getList(page = 1) {
      this.curPage = page;
      teacher
        .getTeacherListPage(this.curPage, this.limit, this.teacherQuery)
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
    },

    reset() {
      //1.清空查询表单
      this.teacherQuery = {};
      //2.查询所有
      this.getList();
    },

    removeDataById(id) {
      this.$confirm("此操作将永久删除该讲师, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //点击确定
          teacher
            .removeById(id)
            //看/utils/requesr.js的源码，发现返回20000，进入then，非20000，进入catch，并且此处catch不用填写了，被封装进requesr.js了
            .then(res => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              //
              this.getList();
            });
        })
        .catch(() => {
          //点击取消
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
```





## P80-讲师管理前端-讲师添加

### 1.一个异常：Expected Number, got String.

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200718223608.png" alt="image-20200718223608321" style="zoom:67%;" />

```vue
 <el-form-item label="讲师排序">
     <el-input-number v-model="teacher.sort" controls-position="right" min="0" />
 </el-form-item>
```





**解决方案：**    

![image-20200718223642349](https://gitee.com//nopromise/pic/raw/master/typora/20200718223642.png)





### 2.添加讲师功能

#### 1.添加路由

![image-20200719084119161](https://gitee.com//nopromise/pic/raw/master/typora/20200719084119.png)





#### 2.后台接口

```java
    @PostMapping("addTeacher")
    public R addTeacher(@RequestBody EduTeacher eduTeacher) {
        boolean save = teacherService.save(eduTeacher);
        if (save) {
            return R.ok();
        } else {
            return R.error();
        }
    }
```



#### 3.teacher.js中暴露saveTeacher方法

```js
import request from '@/utils/request'

//参考P61-P63模块化操作 
//定义方法：设置哪些方法可以被其他js调用
export default {
   
    getTeacherListPage(page, limit, teacherQuery) {
      ...
    },
    removeById(id) {
     ...
    },
    
    saveTeacher(teacher) {
        return request({
            url: `/eduservice/teacher/addTeacher`,
            method: 'post',
            data: teacher   //传json数据
        })
    }

}
```



#### 4.在views/edu/teacher/save.vue中编写添加讲师页面代码

**是一个form表单**

```vue
<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name" />
      </el-form-item>

      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" controls-position="right" :min="0" />
      </el-form-item>

      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <!--
          数据类型一定要和取出的json中的一致，否则没法回填
          因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
          <el-option :value="1" label="高级讲师" />
          <el-option :value="2" label="首席讲师" />
        </el-select>
      </el-form-item>

      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career" />
      </el-form-item>

      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea" />
      </el-form-item>

      <!-- 讲师头像：TODO -->
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate()">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
//引入调用teacher.js的文件
// ./代表当前这个vue文件所在路径，@是在webpack配置的路径别名.
import teacherApi from "@/api/edu/teacher";

//固定格式
//写核心代码的位置
export default {
  data() {
    //定义变量和初始值（根据实际定义）
    return {
      teacher: {}, //条件封装对象
      saveBtnDisabled: false
    };
  },
  created() {},
  methods: {
    saveOrUpdate(teacher) {
      this.saveData();
    },

    //保存讲师方法
    saveData() {
      teacherApi.saveTeacher(this.teacher).then(res => {
         //禁用button
         this.saveBtnDisabled=true;
        //1.提示信息
        this.$message({
          type: "success",
          message: "添加成功!"
        });
        //2.跳转到列表页面-路由跳转-重定向  写法固定
        this.$router.push({path:'/teacher/table'})
      });
    }
  }
};
</script>
```





## P81-P82讲师管理前端-讲师修改（1)(2)

知识点总结：



### 1.每条记录后面添加修改按钮

```vue
 <router-link :to="'/teacher/edit/'+scope.row.id">
     <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
 </router-link>
```

**router-link** ,

:to    绑定属性to，跳转到'/teacher/edit/'+scope.row.id 。

scope.row.id代表当前条目的id



```vue
<el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/teacher/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
```

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200720193334.png" alt="image-20200720193334078" style="zoom: 50%;" />



### 2.在路由页面中添加路由

![image-20200720193625999](https://gitee.com//nopromise/pic/raw/master/typora/20200720193626.png)



> 1.path     'edit/:id'     :id代表占位符      /edit/121313  这样的请求，id=121313
>
> 2.hidden,  true 代表隐藏此路由，不再页面展示出来，只用作路由，不显示





**效果展示：**

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200720194356.png" alt="image-20200720194356005" style="zoom:80%;" />







### 3.做数据回显

**根据请求路径的id，查询此id对应的数据**



#### 1.在teacher.js内定义根据id查询的接口

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200720194817.png" alt="image-20200720194817336" style="zoom:80%;" />

#### 2.在页面调用接口实现数据回显

vue中判断路由请求路径是否包含某一参数的固定写法

```vue
 if (this.$route.params && this.$route.params.id) {    
      //从路径获取id值
      const id = this.$route.params.id;
      //调用根据id查询的方法
      this.getTeacherInfo(id);
 }
```



http://localhost:8001/eduservice/teacher/getTeacher/6



<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200720195330.png" alt="image-20200720195330839" style="zoom:80%;" />





**在create()方法中判断，如果请求路径存在id，则进行渲染。否则不操作。**

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200720200322.png" alt="image-20200720200322935" style="zoom:80%;" />







![image-20200720200924837](https://gitee.com//nopromise/pic/raw/master/typora/20200720200924.png)

```vue
  created() {
    //渲染页面之前执行
    //判断路径中是否也有id值
    if (this.$route.params && this.$route.params.id) {    
      //从路径获取id值
      const id = this.$route.params.id;
      //调用根据id查询的方法
      this.getTeacherInfo(id);
    }
  },
```





### 4.修改数据

#### 1、api目录下的teacher.js中添加updateTeacher方法

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200720202224.png" alt="image-20200720202224136" style="zoom:80%;" />



#### 2.在save.vue中添加updateTeacher方法

```vue
    //修改讲师的方法
    updateTeacher() {
      teacherApi.updateTeacher(this.teacher).then(res => {
        //1.提示信息
        this.$message({
          type: "success",
          message: "修改成功!"
        });
        //2.跳转到列表页面-路由跳转-重定向  写法固定
        this.$router.push({ path: "/teacher/table" });
      });
    }
```

#### 3.在saveOrUpdate方法中根据teacher是否含有id判断是添加功能还是修改功能

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200720202417.png" alt="image-20200720202417528" style="zoom:80%;" />