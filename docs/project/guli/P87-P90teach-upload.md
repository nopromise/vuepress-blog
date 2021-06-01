---
title: P87-P90讲师管理-上传讲师头像
date: 2021-06-01
---
[[TOC]]



## P87-讲师管理-上传讲师头像（后端环境搭建）



![04-搭建阿里云oss操作项目环境](https://gitee.com//nopromise/pic/raw/master/typora/20200726104202.png)



### 1.创建service-oss

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200726102516.png" alt="image-20200726102516840" style="zoom:80%;" />



### 2、配置pom.xml

service-oss上级模块service已经引入service的公共依赖，所以service-oss模块只需引入阿里云oss相关依赖即可，

service父模块已经引入了service-base模块，所以Swagger相关默认已经引入

```
    <dependencies>
        <!-- 阿里云oss依赖 -->
        <dependency>
            <groupId>com.aliyun.oss</groupId>
            <artifactId>aliyun-sdk-oss</artifactId>
        </dependency>

        <!-- 日期工具栏依赖 -->
        <dependency>
            <groupId>joda-time</groupId>
            <artifactId>joda-time</artifactId>
        </dependency>
    </dependencies>
```



### 3、配置application.properties

```properties
#服务端口
server.port=8002
#服务名
spring.application.name=service-oss
#环境设置：dev、test、prod
spring.profiles.active=dev
#阿里云 OSS
#不同的服务器，地址不同
aliyun.oss.file.endpoint=oss-cn-qingdao.aliyuncs.com
aliyun.oss.file.keyid=LTAI4GFug3Po4VpjQBaHSVSH
aliyun.oss.file.keysecret=9cuEw6lXvh88fmwRh9qLQoeRSJH5cZ
#bucket可以在控制台创建，也可以使用java代码创建
aliyun.oss.file.bucketname=edu-guli07
```

### 4、logback-spring.xml

### 5、创建启动类

创建OssApplication.java

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200726104353.png" alt="image-20200726104352978" style="zoom:80%;" />









### 6、启动项目





spring boot 会默认加载org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration这个类，

而DataSourceAutoConfiguration类使用了@Configuration注解向spring注入了dataSource bean，又因为项目（oss模块）中并没有关于dataSource相关的配置信息，所以当spring创建dataSource bean时因缺少相关的信息就会报错。



<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200726105026.png" alt="image-20200726105026078" style="zoom:80%;" />



**解决办法：**

方法1、在@SpringBootApplication注解上加上exclude，解除自动加载DataSourceAutoConfiguration



```
@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
```





## P88-讲师管理-上传讲师头像（创建常量类）

![image-20200726105442574](https://gitee.com//nopromise/pic/raw/master/typora/20200726105442.png)



### 1、从配置文件读取常量

创建常量读取工具类：ConstantPropertiesUtil.java

使用@Value读取application.properties里的配置内容

用spring的 InitializingBean 的 afterPropertiesSet 来初始化配置信息，这个方法将在所有的属性被初始化后调用。

```java
package com.atguigu.ossservice.utils;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * 常量类，读取配置文件application.properties中的配置
 */
@Component
public class ConstantPropertiesUtil implements InitializingBean {

    @Value("${aliyun.oss.file.endpoint}")
    private String endpoint;

    @Value("${aliyun.oss.file.keyid}")
    private String keyId;

    @Value("${aliyun.oss.file.keysecret}")
    private String keySecret;

    @Value("${aliyun.oss.file.bucketname}")
    private String bucketName;


    public static String END_POINT;
    public static String ACCESS_KEY_ID;
    public static String ACCESS_KEY_SECRET;
    public static String BUCKET_NAME;


    @Override
    public void afterPropertiesSet() throws Exception {
        END_POINT = endpoint;
        ACCESS_KEY_ID = keyId;
        ACCESS_KEY_SECRET = keySecret;
        BUCKET_NAME = bucketName;
    }
}

```



## P89-P90讲师管理-上传讲师头像（后端接口）

![05-上传文件到阿里云oss接口实现](https://gitee.com//nopromise/pic/raw/master/typora/20200726122356.png)



![06-上传文件到阿里云oss接口完善](https://gitee.com//nopromise/pic/raw/master/typora/20200726122419.png)

### Controller

```java
@RestController
@RequestMapping("/eduoss/fileoss")
@CrossOrigin
public class OssController {
    @Autowired
    private OssService ossService;

    @PostMapping
    public R uploadFile(MultipartFile file) {
        //返回上传到oss的路径
        String url = ossService.uploadFileAvatar(file);
        return R.ok().data("url", url);
    }
}
```



### ServiceImpl

```java
@Service
public class OssServiceImpl implements OssService {

    //上传头像到oss
    @Override
    public String uploadFileAvatar(MultipartFile file) {
        //1.获取阿里云存储相关常量
        String endPoint = ConstantPropertiesUtil.END_POINT;
        String accessKeyId = ConstantPropertiesUtil.ACCESS_KEY_ID;
        String accessKeySecret = ConstantPropertiesUtil.ACCESS_KEY_SECRET;
        String bucketName = ConstantPropertiesUtil.BUCKET_NAME;

        String uploadUrl = null;

        try {
            //2.判断oss实例是否存在：如果不存在则创建，如果存在则获取
            OSSClient ossClient = new OSSClient(endPoint, accessKeyId, accessKeySecret);
            if (!ossClient.doesBucketExist(bucketName)) {
                //创建bucket
                ossClient.createBucket(bucketName);
                //设置oss实例的访问权限：公共读
                ossClient.setBucketAcl(bucketName, CannedAccessControlList.PublicRead);
            }

            //3.获取上传文件流
            InputStream inputStream = file.getInputStream();

            //构建日期路径：avatar/2019/02/26/文件名
            //joda-time
            String filePath = new DateTime().toString("yyyy/MM/dd");

            //文件名：uuid.扩展名
            String original = file.getOriginalFilename();//文件实际名称
            String fileName = UUID.randomUUID().toString().replaceAll("-", "");//
            String fileType = original.substring(original.lastIndexOf("."));
            String newName = fileName + fileType;

            String fileUrl = filePath + "/" + newName;
            //文件上传至阿里云
            ossClient.putObject(bucketName, fileUrl, inputStream);
            // 关闭OSSClient。
            ossClient.shutdown();
            //获取url地址
            uploadUrl = "http://" + bucketName + "." + endPoint + "/" + fileUrl;

        } catch (IOException e) {
//            throw new GuliException(ResultCodeEnum.FILE_UPLOAD_ERROR);
            throw new GuliException(500, "错误");
        }
        return uploadUrl;
    }
}

```

