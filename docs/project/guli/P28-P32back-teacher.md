---
title: P28-P32后台讲师模块
date: 2021-05-31
---


[[TOC]]



## P28-后台讲师管理模块-分页查询

### 1.MyBatisPlusConfig中配置分页插件

```java
    //分页插件
    @Bean
    public PaginationInterceptor paginationInterceptor() {
        return new PaginationInterceptor();
    }
```

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

    //逻辑删除插件
    @Bean
    public ISqlInjector sqlInjector() {
        return new LogicSqlInjector();
    }

    //分页插件
    @Bean
    public PaginationInterceptor paginationInterceptor() {
        return new PaginationInterceptor();
    }
}
```



### 2.分页Controller方法

```java
    @ApiOperation(value = "分页讲师列表")
    @GetMapping("pageTeacher/{page}/{limit}")
    public R pageList(@ApiParam(name = "page", value = "当前页码", required = true) @PathVariable Long page,
                      @ApiParam(name = "limit", value = "每页记录数", required = true) @PathVariable Long limit) {
        Page<EduTeacher> pageParam = new Page<>();
        teacherService.page(pageParam, null);
        List<EduTeacher> records = pageParam.getRecords();
        long total = pageParam.getTotal();
        return R.ok().data("total", total).data("rows", records);
    }
```



### 3.Swagger中测试





## P29&P30-后台讲师管理模块-条件查询分页（1）(2)

根据讲师名称name，讲师头衔level、讲师入驻时间gmt_create（时间段）查询



![image-20200706110651445](https://gitee.com//nopromise/pic/raw/master/typora/20200706110651.png)

### 1、创建查询对象

创建com.guli.edu.query包，创建TeacherQuery.java查询对象

com.atguigu.eduservice.vo

```java
com.atguigu.eduservice.vo
    
@ApiModel(value = "Teacher查询对象", description = "讲师查询对象封装")
@Data
public class TeacherQuery implements Serializable {
    @ApiModelProperty(value = "教师名称,模糊查询")
    private String name;
    @ApiModelProperty(value = "头衔 1高级讲师 2首席讲师")
    private Integer level;
    @ApiModelProperty(value = "查询开始时间", example = "2019-01-01 10:10:10")
    private String begin;//注意，这里使用的是String类型，前端传过来的数据无需进行类型转换
    @ApiModelProperty(value = "查询结束时间", example = "2019-12-01 10:10:10")
    private String end;
}
```





### 2、controller

TeacherAdminController中修改 pageList方法：

增加参数TeacherQuery teacherQuery，非必选

```java
    //使用@RequestBody必须用 @PostMapping
    @PostMapping("pageTeacherCondition/{page}/{limit}")
    public R pageTeacherCondition(
            @PathVariable long page,
            @PathVariable long limit,
            @RequestBody TeacherQuery teacherQuery) {

        Page<EduTeacher> pageParam = new Page<>(page, limit);
        teacherService.pageQuery(pageParam, teacherQuery);
        List<EduTeacher> records = pageParam.getRecords();
        long total = pageParam.getTotal();

        return R.ok().data("total", total).data("rows", records);
    }
```

### 3、service 

 teacherService.pageQuery(pageParam, teacherQuery);

接口：

```java
public interface EduTeacherService extends IService<EduTeacher> {
    void pageQuery(Page<EduTeacher> pageParam, TeacherQuery teacherQuery);
}
```

实现:

```java
@Service
public class EduTeacherServiceImpl extends ServiceImpl<EduTeacherMapper, EduTeacher> implements EduTeacherService {
    @Override
    public void pageQuery(Page<EduTeacher> pageParam, TeacherQuery teacherQuery) {
        QueryWrapper<EduTeacher> queryWrapper = new QueryWrapper<>();
        queryWrapper.orderByAsc("sort");
        if (teacherQuery == null) {
            baseMapper.selectPage(pageParam, queryWrapper);
            return;
        }
        String name = teacherQuery.getName();
        Integer level = teacherQuery.getLevel();
        String begin = teacherQuery.getBegin();
        String end = teacherQuery.getEnd();

        if (!StringUtils.isEmpty(name)) {
            queryWrapper.like("name", name);
        }
        if (!StringUtils.isEmpty(level)) {
            queryWrapper.eq("level", level);
        }
        if (!StringUtils.isEmpty(begin)) {
            queryWrapper.ge("gmt_create", name);
        }
        if (!StringUtils.isEmpty(end)) {
            queryWrapper.le("gmt_create", name);
        }
        baseMapper.selectPage(pageParam, queryWrapper);
    }
}
```



### 4.测试 添加@RequestBody和不添加@RequestBody的区别

#### 1.添加@RequestBody注解

**添加@RequestBody必须使用@PostMappring**

```java
    @PostMapping("pageTeacherCondition/{page}/{limit}")
    public R pageTeacherCondition(
            @PathVariable long page,
            @PathVariable long limit,
            @RequestBody(required = false) TeacherQuery teacherQuery) {}
```

**teacherQuery要求json格式**

![image-20200706152001262](https://gitee.com//nopromise/pic/raw/master/typora/20200706152001.png)

#### 2.不@RequestBody注解

```java
    //使用@RequestBody必须用 @PostMapping
    @PostMapping("pageTeacherCondition/{page}/{limit}")
    public R pageTeacherCondition(
            @PathVariable long page,
            @PathVariable long limit,
             TeacherQuery teacherQuery) {}
```

入参格式如下：

![image-20200706152318227](https://gitee.com//nopromise/pic/raw/master/typora/20200706152318.png)





## P31&P32-后台讲师管理模块-添加讲师&修改讲师

### 一、自动填充封装

#### 1、在service-base模块中添加

com.atguigu.servicebase.config.handler

**创建包handler，创建自动填充类 MyMetaObjectHandler**

```java
@Component
public class MyMetaObjectHandler implements MetaObjectHandler {
    private static final Logger LOGGER = LoggerFactory.getLogger(MyMetaObjectHandler.class);

    @Override
    public void insertFill(MetaObject metaObject) {
        this.setFieldValByName("gmtCreate", new Date(), metaObject);
        this.setFieldValByName("gmtModified", new Date(), metaObject);
    }

    @Override
    public void updateFill(MetaObject metaObject) {
        this.setFieldValByName("gmtModified", new Date(), metaObject);
    }
}
```







#### 2、在实体类添加自动填充注解

EduTeacher类上面添加注解：

```java
@ApiModelProperty(value = "创建时间")
@TableField(fill = FieldFill.INSERT)
private Date gmtCreate;

@ApiModelProperty(value = "更新时间")
@TableField(fill = FieldFill.INSERT_UPDATE)
private Date gmtModified;
```



#### 3、确保能被扫描到

![image-20200706155939683](https://gitee.com//nopromise/pic/raw/master/typora/20200706155939.png)





### **二、controller方法定义**

#### 1、新增 添加讲师的接口方法

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



**运行swagger进行测试**

![image-20200706160837100](https://gitee.com//nopromise/pic/raw/master/typora/20200706160837.png)

```json
{
  "avatar": "string",
  "career": "string",
  "intro": "string",
  "isDeleted": false,
  "level": 0,
  "name": "string11111",
  "sort": 0
}
```

![image-20200706160859016](https://gitee.com//nopromise/pic/raw/master/typora/20200706160859.png)





#### 2、根据id查询

```java
    //根据讲师id查询
    @GetMapping("/getTeacher/{id}")
    public R getTeacherById(@PathVariable long id) {
        EduTeacher eduTeacher = teacherService.getById(id);
        return R.ok().data("teacher", eduTeacher);
    }
```

```

@ApiOperation(value = "根据ID查询讲师")
    @GetMapping("{id}")
    public R getById(
            @ApiParam(name = "id", value = "讲师ID", required = true)
            @PathVariable String id){
        Teacher teacher = teacherService.getById(id);
        return R.ok().data("item", teacher);
    }
```







#### 3、根据id修改(修改讲师)

```java
    //根据讲师id查询
    @PostMapping("/updateTeacher")
    public R getTeacherById(@RequestBody EduTeacher eduTeacher) {
        boolean flag = teacherService.updateById(eduTeacher);
        return flag ? R.ok() : R.error();
    }
```



用@PutMapping，因为使用@RequestBody，会有问题，需要单独传入id参数

**@RequestBody需要跟@PostMapping一起才能生效**

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200706161840.png" alt="image-20200706161840930" style="zoom:80%;" />







**测试修改**



<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200706162206.png" alt="image-20200706162206052" style="zoom:67%;" />

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200706162218.png" alt="image-20200706162218385"  />

