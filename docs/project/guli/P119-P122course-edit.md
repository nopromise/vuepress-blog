---
title: P119-P122课程管理-修改课程信息
date: 2021-06-01
---
[[TOC]]




## P119-课程管理-修改课程信息（后端）



![04-课程信息修改功能](https://gitee.com//nopromise/pic/raw/master/typora/20200818225800.png)

### controller的2个方法

```java
    /**
     * 根据课程id查询课程基本信息
     *
     * @return
     */
    @GetMapping("getCourseInfo/{courseId}")
    public R getCourseInfo(@PathVariable String courseId) {
        CourseInfoForm courseInfoForm = courseService.getCourseInfo(courseId);
        return R.ok().data("courseInfoForm", courseInfoForm);
    }

    @PostMapping("updateCourseInfo")
    public R updateCourseInfo(@RequestBody CourseInfoForm courseInfoForm) {
        courseService.updateCourseInfo(courseInfoForm);
        return R.ok();
    }
```



### service实现类

```java
    @Override
    public CourseInfoForm getCourseInfo(String courseId) {
        //课程表、课程描述表
        EduCourse eduCourse = baseMapper.selectById(courseId);
        EduCourseDescription eduCourseDescription = courseDescriptionService.getById(courseId);

        CourseInfoForm courseInfoForm = new CourseInfoForm();
        BeanUtils.copyProperties(eduCourse, courseInfoForm);
        courseInfoForm.setDescription(eduCourseDescription.getDescription());
        return courseInfoForm;
    }
```



```java
    @Override
    @Transactional
    public void updateCourseInfo(CourseInfoForm courseInfoForm) {
        //1.修改课程信息表
        EduCourse eduCourse = new EduCourse();
        BeanUtils.copyProperties(courseInfoForm, eduCourse);
        int update = baseMapper.updateById(eduCourse);
        if (update == 0) {
            throw new GuliException(20001, "修改课程信息失败");
        }
        //2.修改课程简介表
        EduCourseDescription courseDescription = new EduCourseDescription();
        courseDescription.setId(courseInfoForm.getId());
        courseDescription.setDescription(courseDescription.getDescription());
        boolean updated = courseDescriptionService.updateById(courseDescription);
        if (!updated) {
            throw new GuliException(20001, "修改课程信息失败");
        }

    }
```







## P120-P121课程管理-修改课程信息（前端）

### course.js添加2个api方法

```js
    //根据课程id查询课程基本信息
    getCourseInfoById(courseId){
        return request({
            url:`/eduservice/course/getCourseInfo/${courseId}`,
            method:'get'
        })
    },
    
    //修改课程信息
    updateCourseInfo(courseForm){
        return request({
            url: `/eduservice/course/updateCourseInfo`,
            method: 'post',
            //使用controller中使用requestBody接收json格式的参数时候，使用data
            data: courseForm
        })
    }
```





### 在chapter.vue页面的methods中

```
    //上一步
    previous() {
      this.$router.push({ path: "/course/info/"+this.courseId });
    },
    //下一步
    next() {
      this.$router.push({ path: "/course/publish/"+this.courseId });
    },

```

### 在info.vue页面中实现数据的回显&保存修改内容

methods中：

根据id查询课程信息，进行数据回显

```
    init() {
      if (this.$route.params && this.$route.params.id) {
        this.courseId = this.$route.params.id;
        //调用根据id查询课程的方法
        this.getCourseInfoByCourseId();
      }

      // 初始化分类列表
      this.initSubjectList();
      //获取教师列表
      this.getTeacherList();
    },
```

点击下一步时候，根据是否有courseId判断是新增课程还是更新修改课程

```
	saveOrUpdate() {
      //判断是保存还是更新修改
      // if (this.$route.params && this.$route.params.id) {
      if (!this.courseInfo.id) {
        //新增
        this.addCourse();
      } else {
        //修改
        this.updateCourse();
      }
    },
    
    //新增课程
    addCourse() {
      //保存信息
      courseApi.addCourseInfo(this.courseInfo).then((res) => {
        this.$message({
          type: "success",
          message: "添加课程信息成功!",
        });
        //路由跳转
        this.$router.push({ path: "/course/chapter/" + res.data.courseId });
      });
    },
    //更新课程
    updateCourse() {
      //修改信息
      courseApi.updateCourseInfo(this.courseInfo).then((res) => {
        this.$message({
          type: "success",
          message: "修改课程信息成功!",
        });
        //路由跳转
        this.$router.push({ path: "/course/chapter/" + this.courseId });
      });
    },
```



### 二级下拉框bug

![image-20200819150042836](https://gitee.com//nopromise/pic/raw/master/typora/20200819150042.png)





```
    //根据课程id查询课程信息
    getCourseInfoByCourseId() {
      courseApi.getCourseInfoById(this.courseId).then((res) => {
        this.courseInfo = res.data.courseInfoForm;
        //初始化分类列表（解决二级分类回显bug）//让二级分类列表twoLevelSubjectList初始化
        for (let i = 0; i < this.oneLevelSubjectList.length; i++) {
          if (this.oneLevelSubjectList[i].id === this.courseInfo.subjectParentId) {
            this.twoLevelSubjectList = this.oneLevelSubjectList[i].children;
          }
        }

        // subject.getNestedTreeList().then((res) => {
        //   //一级分类list
        //   this.oneLevelSubjectList = res.data.treeMenu;
        //   for(let i=0;i<this.oneLevelSubjectList.length;i++){
        //     if(this.oneLevelSubjectList[i].id===this.courseInfo.subjectParentId){
        //       this.twoLevelSubjectList=this.oneLevelSubjectList[i].children;
        //     }
        //   }
        // });
      });
    },
```





### 解决点击添加课程数据不清空回显数据的bug（参考p83）

编辑课程后，再次点击添加课程，数据没有清空

![image-20200819152438337](https://gitee.com//nopromise/pic/raw/master/typora/20200819152438.png)



watch监听路由变化

```
  watch: {
    //监听
    $route(to, from) {
      //监听路由的变化，路由发是变化，方法就会执行
      this.init();
    },
  },

```



init方法，如果是新增课程，就清空courseInfo为默认值

```
    init() {
      if (this.$route.params && this.$route.params.id) {
        this.courseId = this.$route.params.id;
        //调用根据id查询课程的方法，回显数据
        this.getCourseInfoByCourseId();
      } else {
        //清空回显数据列表
        this.courseInfo = {
          title: "",
          subjectId: "",
          teacherId: "",
          lessonNum: 0,
          description: "",
          cover: "",
          price: 0,
          cover:process.env.OSS_PATH +"/2020/08/10/815869cb95e24c8ba8b78c6409dc2a42.jpg",
        };
      }

      // 初始化分类列表
      this.initSubjectList();
      //获取教师列表
      this.getTeacherList();
    },
```

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200819160953.png" alt="image-20200819160953113" style="zoom:80%;" />







## P122-课程管理-修改课程信息（最终实现）

点击下一步时候，根据是否有courseId判断是新增课程还是更新修改课程

```
saveOrUpdate() {
      //判断是保存还是更新修改
      // if (this.$route.params && this.$route.params.id) {
      if (!this.courseInfo.id) {
        //新增
        this.addCourse();
      } else {
        //修改
        this.updateCourse();
      }
    },
    
    //新增课程
    addCourse() {
      //保存信息
      courseApi.addCourseInfo(this.courseInfo).then((res) => {
        this.$message({
          type: "success",
          message: "添加课程信息成功!",
        });
        //路由跳转
        this.$router.push({ path: "/course/chapter/" + res.data.courseId });
      });
    },
    //更新课程
    updateCourse() {
      //修改信息
      courseApi.updateCourseInfo(this.courseInfo).then((res) => {
        this.$message({
          type: "success",
          message: "修改课程信息成功!",
        });
        //路由跳转
        this.$router.push({ path: "/course/chapter/" + this.courseId });
      });
    },
```

