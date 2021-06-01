---
title: P93-P94上传讲师头像（前端）和课程分类管理需求描述
date: 2021-06-01
---
[[TOC]]



## P93-讲师管理-上传讲师头像（前端实现）





![09-上传头像前端整合过程](https://gitee.com//nopromise/pic/raw/master/typora/20200801113828.png)

### 1、复制头像上传组件

![image-20200728111126153](https://gitee.com//nopromise/pic/raw/master/typora/20200728111126.png)

**从vue-element-admin复制组件：**

vue-element-admin/src/components/ImageCropper

vue-element-admin/src/components/PanThumb



<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200728110931.png" alt="image-20200728110931299" style="zoom: 67%;" />





<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200728111053.png" alt="image-20200728111053025" style="zoom:80%;" />





### 2、前端添加文件上传组件

**src/views/edu/teacher/form.vue**



**template：**

```vue
 <!-- 讲师头像 -->

      <el-form-item label="讲师头像">
        <!-- 头衔缩略图 -->
        <pan-thumb :image="teacher.avatar" />
        <!-- 文件上传按钮 -->
        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像</el-button>
        <!--
        v-show：是否显示上传组件
        :key：类似于id，如果一个页面多个图片上传控件，可以做区分
        :url：后台上传的url地址
        @close：关闭上传组件
        @crop-upload-success：上传成功后的回调-->
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API+'/admin/oss/file/upload'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"
        />
      </el-form-item>
```



**data()中定义变量和初始值。**

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200801110940.png" alt="image-20200801110940737" style="zoom:80%;" />



**引入组件模块和声明组件**

```
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
```

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200801110453.png" alt="image-20200801110453359" style="zoom:67%;" />

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200801111030.png" alt="image-20200801111030831" style="zoom:67%;" />





**修改上传文件的接口的地址：**

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200801111322.png" alt="image-20200801111322770" style="zoom:80%;" />





**编写close和cropSuccess方法**

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200801113354.png" alt="image-20200801113354312" style="zoom:80%;" />



**后台接口，返回data.url**

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200801113545.png" alt="image-20200801113545455" style="zoom:80%;" />





## P94-课程分类管理需求描述



![10-课程分类存储结构](https://gitee.com//nopromise/pic/raw/master/typora/20200801113731.png)

excel进行操作

![image-20200801114255342](https://gitee.com//nopromise/pic/raw/master/typora/20200801114255.png)