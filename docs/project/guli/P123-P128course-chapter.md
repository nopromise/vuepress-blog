---
title: P123-P128课程管理-章节相关
date: 2021-06-01
---
[[TOC]]



![06-章节添加修改删除](https://gitee.com//nopromise/pic/raw/master/typora/20200819210938.png)

## P123-课程管理-章节后端接口开发

```JAVA
    @ApiOperation(value = "新增章节")
    @PostMapping("addChapter")
    public R save(
            @ApiParam(name = "chapterVo", value = "章节对象", required = true)
            @RequestBody EduChapter chapter) {
        chapterService.save(chapter);
        return R.ok();
    }


    @ApiOperation(value = "根据ID查询章节")
    @GetMapping("getChapterInfo/{chapterId}")
    public R getById(
            @ApiParam(name = "chapterId", value = "章节ID", required = true)
            @PathVariable String chapterId) {
        EduChapter chapter = chapterService.getById(chapterId);
        return R.ok().data("chapter", chapter);
    }


    @ApiOperation(value = "根据ID修改章节")
    @PutMapping("updateChapter")
//    @PostMapping("updateChapter")
    public R updateById(
            @ApiParam(name = "chapter", value = "章节对象", required = true)
            @RequestBody EduChapter chapter) {
        chapterService.updateById(chapter);
        return R.ok();
    }


    @ApiOperation(value = "根据ID删除章节")
    @DeleteMapping("del/{chapterId}")
    public R removeById(
            @ApiParam(name = "chapterId", value = "章节ID", required = true)
            @PathVariable String chapterId) {

        boolean result = chapterService.removeChapterById(chapterId);
        if (result) {
            return R.ok();
        } else {
            return R.error().message("删除失败");
        }
    }
```



















## P124-课程管理-添加章节（前端）

### 0.效果

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200819212843.png" alt="image-20200819212843468" style="zoom:80%;" />





### **1.添加章节按钮**

 <el-button type="text">添加章节</el-button>

```
<el-button type="text" @click="dialogChapterFormVisible = true">添加章节</el-button>
```

### 2.章节表单dialog

![image-20200819212116786](https://gitee.com//nopromise/pic/raw/master/typora/20200819212116.png)



### 3.定义data数据

```
      dialogChapterFormVisible: false, //是否显示章节表单
      chapter: {
        // 章节对象
        title: "",
        sort: 0,
      },
```



### 4.定义api

```js
import request from '@/utils/request'

const api_name = '/eduservice/eduChapter'


export default {

    /**
     * 根据课程id获取章节列表list，章节列表中包含小节list
     * @param {课程id} courseId 
     */
    getChapterList(courseId) {
        return request({
            url: `${api_name}/chapterList/${courseId}`,
            method: 'get'
        })
    },

    removeById(id) {
        return request({
            url: `${api_name}/del/${id}`,
            method: 'delete'
        })
    },


    save(chapter) {
        return request({
            url: `${api_name}/addChapter`,
            method: 'post',
            data: chapter
        })
    },


    getById(id) {
        return request({
            url: `${api_name}/getChapterInfo/${id}`,
            method: 'get'
        })
    },


    updateById(chapter) {
        return request({
            url: `${api_name}/updateChapter`,
            method: 'put',
            data: chapter
        })
    }

}
```



### 5.定义methods中的方法

```
    saveOrUpdate() {
      //把corseId设置到chapter对象中
      this.chapter.courseId = this.courseId;
      
      //调用chapterApi中的addChapter方法
      chapterApi.addChapter(this.chapter).then((res) => {
        //关闭弹窗
        this.dialogChapterFormVisible = false;
        //提示信息
        this.$message({
          type: "success",
          message: "添加章节成功!",
        });
        //刷新页面
        this.fetchChapterNestedListByCourseId();
      });
    }
```











## P125-课程管理-修改章节

**详细见源代码**

![image-20200820105707128](https://gitee.com//nopromise/pic/raw/master/typora/20200820105707.png)



![image-20200820105722528](https://gitee.com//nopromise/pic/raw/master/typora/20200820105722.png)

**点击编辑按钮**

![image-20200820105815434](https://gitee.com//nopromise/pic/raw/master/typora/20200820105815.png)



**弹出编辑框**

![image-20200820105835596](https://gitee.com//nopromise/pic/raw/master/typora/20200820105835.png)



。。。。。。。。。。。



## P126-课程管理-删除章节

![image-20200820111204488](https://gitee.com//nopromise/pic/raw/master/typora/20200820111204.png)



methods中方法：

```
    //删除章节
    delChapter(chapterId) {
      this.$confirm("此操作将永久删除该章节, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //点击确定
          chapterApi
            .deleteById(chapterId)
            //看/utils/requesr.js的源码，发现返回20000，进入then，非20000，进入catch，并且此处catch不用填写了，被封装进requesr.js了
            .then(res => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              //
              this.fetchChapterNestedListByCourseId();
            });
        })
        .catch(() => {
          //点击取消
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
```







## P127-课程管理-添加小节

### 后端代码：

```java
    //添加小节
    @PostMapping("addViideo")
    public R addVideo(@RequestBody EduVideo video) {
        videoService.save(video);
        return R.ok();
    }

    //删除小节 TODO 需要完善：删除小节时候，同时删除小节对应的视频
    @DeleteMapping("del/{id}")
    public R delVideo(@PathVariable String id) {
        videoService.removeById(id);
        return R.ok();
    }

    //修改小节
    @PutMapping("editVideo")
    public R editVideo(@RequestBody EduVideo video) {
        videoService.updateById(video);
        return R.ok();
    }
```



### 前端API

xxx看源码







## P128-课程管理-添加和删除小节

xxx看源码





