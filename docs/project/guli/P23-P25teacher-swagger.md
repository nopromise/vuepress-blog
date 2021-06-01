---
title: P23-P25后台讲师模块和Swagger
date: 2021-05-31
---


[[TOC]]



## P23&P24-讲师列表和讲师删除

### 1.编写后台管理api接口（讲师列表）

#### **1.编写controller代码**

```java
@RestController
@RequestMapping("/eduservice/teacher")
public class EduTeacherController {
    @Autowired
    private EduTeacherService teacherService;

    @GetMapping("findAll")
    public List<EduTeacher> list() {
        return teacherService.list(null);
    }
}
```



#### 2.创建启动类

```java
@SpringBootApplication
public class EduApplication {
    public static void main(String[] args) {
        SpringApplication.run(EduApplication.class, args);
    }
}
```



#### 3.创建配置类，配置mapper扫描和其他

```java
@Configuration
@MapperScan("com.atguigu.eduservice.mapper")
public class EduConfig {
}
```



#### 4.添加性能分析插件

```java
@Configuration
@MapperScan("com.atguigu.eduservice.mapper")//mapper扫描配置
public class EduConfig {

    /**
     * SQL 执行性能分析插件
     * 开发环境使用，线上不推荐。 maxTime 指的是 sql 最大执行时长
     */
    @Bean
    @Profile({"dev", "test"})// 设置 dev test 环境开启
    public PerformanceInterceptor performanceInterceptor() {
        PerformanceInterceptor performanceInterceptor = new PerformanceInterceptor();
        performanceInterceptor.setMaxTime(1000);//ms，超过此处设置的ms则sql不执行
        performanceInterceptor.setFormat(true);
        return performanceInterceptor;
    }
}
```







#### 5.测试：

http://localhost:8001/eduservice/teacher/findAll

![image-20200705224633250](https://gitee.com//nopromise/pic/raw/master/typora/20200705224633.png)



#### 6、统一返回的json时间格式

默认情况下json时间格式带有时区，并且是世界标准时间，和我们的时间差了八个小时

在application.properties中设置

```
#返回json的全局时间格式
spring.jackson.date-format=yyyy-MM-dd HH:mm:ss
spring.jackson.time-zone=GMT+8
```



![image-20200705225251662](https://gitee.com//nopromise/pic/raw/master/typora/20200705225251.png)



**数据库中时间：**

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200705225417.png" alt="image-20200705225417155" style="zoom:80%;" />



### 2.讲师删除（逻辑删除）



#### 1.添加逻辑删除插件到配置类EduConfig

```java
    //逻辑删除插件
    @Bean
    public ISqlInjector sqlInjector() {
        return new LogicSqlInjector();
    }
```

#### 2.添加注解: @TableLogic

```java
    @ApiModelProperty(value = "逻辑删除 1（true）已删除， 0（false）未删除")
    @TableLogic
    private Boolean isDeleted;
```

#### 3.逻辑删除controller

```java
    @DeleteMapping("{id}")
    public boolean removeById(@PathVariable String id) {
        boolean flag = teacherService.removeById(id);
        return flag;
    }
```



### 3.跨域配置

#### 1、什么是跨域

浏览器从一个域名的网页去请求另一个域名的资源时，域名、端口、协议任一不同，都是跨域 。前后端分离开发中，需要考虑ajax跨域的问题。

这里我们可以从服务端解决这个问题

#### 2.配置

在Controller类上添加注解

```
@CrossOrigin //跨域
```



## P25-整合swagger

### 一、Swagger2介绍 

前后端分离开发模式中，api文档是最好的沟通方式。

Swagger 是一个规范和完整的框架，用于生成、描述、调用和可视化 RESTful 风格的 Web 服务。

及时性 (接口变更后，能够及时准确地通知相关前后端开发人员)规范性 (并且保证接口的规范性，如接口的地址，请求方式，参数及响应格式和错误信息)一致性 (接口信息一致，不会出现因开发人员拿到的文档版本不一致，而出现分歧)可测性 (直接在接口文档上进行测试，以方便理解业务)

### 二、配置Swagger2

### **1、创建common模块**

**在guli-parent下创建模块common**

配置：

groupId：com.atguigu

artifactId：common

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200706075849.png" alt="image-20200706075848999" style="zoom:80%;" />



### 2.在common中引入依赖

```
 <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
            <scope>provided</scope>
        </dependency>
        <!--mybatis-plus-->
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-boot-starter</artifactId>
            <scope>provided</scope>
        </dependency>
        <!--lombok用来简化实体类：需要安装lombok插件-->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <scope>provided</scope>
        </dependency>
        <!--swagger-->
        <dependency>
            <groupId>io.springfox</groupId>
            <artifactId>springfox-swagger2</artifactId>
            <scope>provided</scope>
        </dependency>
        <dependency>
            <groupId>io.springfox</groupId>
            <artifactId>springfox-swagger-ui</artifactId>
            <scope>provided</scope>
        </dependency>

        <!-- redis -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-redis</artifactId>
        </dependency>

        <!-- spring2.X集成redis所需common-pool2
        <dependency>
            <groupId>org.apache.commons</groupId>
            <artifactId>commons-pool2</artifactId>
            <version>2.6.0</version>
        </dependency>-->
    </dependencies>
```

打包类型pom

```
<artifactId>common</artifactId>
<packaging>pom</packaging>
```



### 3、在common下面创建子模块service-base

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200706080531.png" alt="image-20200706080531418" style="zoom:80%;" />



### 4、在模块service-base中，创建swagger的配置类

创建包com.atguigu.servicebase.config，创建类SwaggerConfig

```java
import com.google.common.base.Predicates;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * @Author: fanjunlin
 * @Date: 2020/7/6.
 */
@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Bean

    public Docket webApiConfig() {
        return new Docket(DocumentationType.SWAGGER_2)
                //组名 可分组
                .groupName("webApi")
                //
                .apiInfo(webApiInfo())
                .select()
                //接口中包含admin和error，就不显示
                .paths(Predicates.not(PathSelectors.regex("/admin/.*")))
                .paths(Predicates.not(PathSelectors.regex("/error.*")))
                .build();
    }


    private ApiInfo webApiInfo() {
        return new ApiInfoBuilder()
                .title("网站-课程中心API文档")
                .description("本文档描述了课程中心微服务接口定义")
                .version("1.0")
                .contact(new Contact("java", "http://atguigu.com", "55317332@qq.com"))
                .build();

    }
}

```

### 5、在模块service模块中引入service-base

```
<dependency>
    <groupId>com.atguigu</groupId>
    <artifactId>service-base</artifactId>
    <version>0.0.1-SNAPSHOT</version>
</dependency>
```

![image-20200706082623229](https://gitee.com//nopromise/pic/raw/master/typora/20200706082623.png)

### **6、在service-edu启动类上添加注解，进行测试**

springboot默认扫描启动类下面的所有包，但是现在除了edu内的，还需要扫描service-base的配置类，所以需要添加@ComponentScan注解

![image-20200706082914087](https://gitee.com//nopromise/pic/raw/master/typora/20200706082914.png)



启动，浏览器输入：http://localhost:8001/swagger-ui.html



![image-20200706083648765](https://gitee.com//nopromise/pic/raw/master/typora/20200706083648.png)



**测试逻辑删除功能**





![image-20200706084027894](https://gitee.com//nopromise/pic/raw/master/typora/20200706084027.png)



### 7、定义接口说明和参数说明

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200706084231.png" alt="image-20200706084231286" style="zoom:80%;" />



![image-20200706084253861](https://gitee.com//nopromise/pic/raw/master/typora/20200706084253.png)