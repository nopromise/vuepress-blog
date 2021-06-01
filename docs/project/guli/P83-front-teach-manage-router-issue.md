---
title: P83-讲师管理前端-路由切换问题演示和解决
date: 2021-06-01
---
[[TOC]]


知识点：

**使用watch监听器，监听路由的变化**

```vue
  watch: {
    //监听
    $route(to, from) {
      //监听路由的变化，路由发是变化，方法就会执行
      this.init();
    }
  }
```





<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200720203401.png" alt="image-20200720203401109" style="zoom:80%;" />





<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200720203438.png" alt="image-20200720203438257" style="zoom:80%;" />

![image-20200720203422771](https://gitee.com//nopromise/pic/raw/master/typora/20200720203422.png)









**尝试解决**

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200720204446.png" alt="image-20200720204446815" style="zoom:80%;" />







![image-20200720204555352](https://gitee.com//nopromise/pic/raw/master/typora/20200720204555.png)

![image-20200720204831761](https://gitee.com//nopromise/pic/raw/master/typora/20200720204831.png)



![image-20200819155831570](https://gitee.com//nopromise/pic/raw/master/typora/20200819155831.png)







<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200720205118.png" alt="image-20200720205118265" style="zoom:80%;" />