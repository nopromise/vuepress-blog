---
title: P129-P130课程管理-课程信息确认
date: 2021-06-01
---
[[TOC]]



## P129-课程管理-课程信息确认

## P130-课程管理-课程信息确认（加载问题）

![image-20200821112546116](https://gitee.com//nopromise/pic/raw/master/typora/20200821112546.png)

### 内连接 左连接 和右连接

https://blog.csdn.net/plg17/article/details/78758593



### 使用内连接 左连接 和右连接分析

- 课程需要都查出来
- 课程可能没有简介信息

使用内连接，如果没有课程简介，课程会查不出来

so 使用左外连接。所有的课程都查出来！

![image-20200821113706744](https://gitee.com//nopromise/pic/raw/master/typora/20200821113706.png)

### 根据id查询课程基本信息的sql语句

```sql
-- 根据课程id查询课程基本信息
SELECT   ec.id,ec.title,ec.price,ec.lesson_num,
			ecd.description,
			et.name,
			es1.title AS oneSubject,
			es2.title AS twoSubject
FROM edu_course ec LEFT JOIN edu_course_description ecd ON ec.id=ecd.id
						 LEFT JOIN edu_teacher et ON ec.teacher_id=et.id
						 LEFT JOIN edu_subject es1 ON  ec.subject_parent_id=es1.id
						 LEFT JOIN edu_subject es2 ON  ec.subject_id=es2.id
						 
						 WHERE ec.id=?
```

关联2次edu_subject，分别查出一级分类和二级分类名称



### mapper编写

```
<select id="getPublishCourseInfo" 		    resultType="com.atguigu.eduservice.vo.CoursePublishVo">
        SELECT   ec.id,ec.title,ec.price,ec.cover,ec.lesson_num as lessonNum,
			et.name as teacherName
			es1.title AS subjectLevelOne,
			es2.title AS subjectLevelTwo
        FROM edu_course ec LEFT JOIN edu_course_description ecd ON ec.id=ecd.id
						 LEFT JOIN edu_teacher et ON ec.teacher_id=et.id
						 LEFT JOIN edu_subject es1 ON  ec.subject_parent_id=es1.id
						 LEFT JOIN edu_subject es2 ON  ec.subject_id=es2.id
						 WHERE ec.id=#{courseId}
</select>
```



### 问题：dao层编译后只有class文件，没有mapper.xml，

dao层编译后只有class文件，没有mapper.xml，因为maven工程在默认情况下src/main/java目录下的所有资源文件是不发布到target目录下的，



**测试：报告异常**

AbstractHandlerExceptionResolver.java:194 |org.springframework.web.servlet.mvc.method.annotation.ExceptionHandlerExceptionResolver |Resolved exception caused by handler execution: org.apache.ibatis.binding.BindingException: Invalid bound statement (not found): com.guli.edu.mapper.CourseMapper.getCoursePublishVoById



<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200821142734.png" alt="image-20200821142734306" style="zoom:67%;" />





**解决方案：**

1、在guli_edu的pom中配置如下节点

```
    <!-- 项目打包时会将java目录中的*.xml文件也进行打包 -->
    <build>
        <resources>
            <resource>
                <directory>src/main/java</directory>
                <includes>
                    <include>**/*.xml</include>
                </includes>
                <filtering>false</filtering>
            </resource>
        </resources>
    </build>
```



重新打包项目会发现target目录下出现了xml文件夹



2、在Spring Boot配置文件中添加配置

```

#配置mapper xml文件的路径
mybatis-plus.mapper-locations=classpath:com/guli/edu/mapper/xml/*.xml
```



### 其他代码见源码