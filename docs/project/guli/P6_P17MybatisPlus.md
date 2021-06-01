---
title: P6-P17MybatisPlus
date: 2021-05-31
---

[[TOC]]


## P6-MybatisPlus介绍

https://mp.baomidou.com/guide/



[MyBatis-Plus](https://github.com/baomidou/mybatis-plus)（简称 MP）是一个 [MyBatis](http://www.mybatis.org/mybatis-3/) 的增强工具，在 MyBatis 的基础上只做增强不做改变，为简化开发、提高效率而生。



### 特性

- **无侵入**：只做增强不做改变，引入它不会对现有工程产生影响，如丝般顺滑
- **损耗小**：启动即会自动注入基本 CURD，性能基本无损耗，直接面向对象操作
- **强大的 CRUD 操作**：内置通用 Mapper、通用 Service，仅仅通过少量配置即可实现单表大部分 CRUD 操作，更有强大的条件构造器，满足各类使用需求
- **支持 Lambda 形式调用**：通过 Lambda 表达式，方便的编写各类查询条件，无需再担心字段写错
- **支持主键自动生成**：支持多达 4 种主键策略（内含分布式唯一 ID 生成器 - Sequence），可自由配置，完美解决主键问题
- **支持 ActiveRecord 模式**：支持 ActiveRecord 形式调用，实体类只需继承 Model 类即可进行强大的 CRUD 操作
- **支持自定义全局通用操作**：支持全局通用方法注入（ Write once, use anywhere ）
- **内置代码生成器**：采用代码或者 Maven 插件可快速生成 Mapper 、 Model 、 Service 、 Controller 层代码，支持模板引擎，更有超多自定义配置等您来使用
- **内置分页插件**：基于 MyBatis 物理分页，开发者无需关心具体操作，配置好插件之后，写分页等同于普通 List 查询
- **分页插件支持多种数据库**：支持 MySQL、MariaDB、Oracle、DB2、H2、HSQL、SQLite、Postgre、SQLServer 等多种数据库
- **内置性能分析插件**：可输出 Sql 语句以及其执行时间，建议开发测试时启用该功能，能快速揪出慢查询
- **内置全局拦截插件**：提供全表 delete 、 update 操作智能分析阻断，也可自定义拦截规则，预防误操作





## P7&P8-MybatisPlus入门案例（1）（2）

### 1.创建springboot工程

### 2.引入pom文件

```
<!--MybatisPlus-->
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.3.2</version>
</dependency>


<!--        mysql-->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
</dependency>
```

### 3.配置application.properties

```
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/house?serverTimezone=GMT%2B8
spring.datasource.username=root
spring.datasource.password=root
```

### 4.创建实体类和Mapper文件

```java
@Data
public class User {
    private Long id;
    private String name;
    private String phone;
    private String email;
    private String aboutme;
    private String passwd;
    private String avatar;
    private int type;
    private Date create_time;
    private int enable;
    private int agency_id;
}
```



```java
@Repository  //解决注入报错，不是必须
public interface UserMapper extends BaseMapper<User> {
}
```



### 5.启动类添加@MapperScan注解

```java
@SpringBootApplication
@MapperScan("com.np.MybatisPlus.mapper")
public class JavaInterviewApplication {
    public static void main(String[] args) {
        SpringApplication.run(JavaInterviewApplication.class, args);
    }
}
```

### 6.测试

```java
@RunWith(SpringRunner.class)
@SpringBootTest
public class SampleTest {
    @Autowired
    private UserMapper userMapper;
    
    @Test
    public void testSelect() {
        List<User> userList = userMapper.selectList(null);
        userList.forEach(System.out::println);
    }
}
```



## P9-MybatisPlus添加操作

**person表**

```sql
CREATE TABLE `person` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(20) NOT NULL DEFAULT '' COMMENT '姓名',
  `phone` char(13) NOT NULL DEFAULT '' COMMENT '手机号',
  `email` varchar(90) NOT NULL DEFAULT '' COMMENT '电子邮件',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1278519972196122627 DEFAULT CHARSET=utf8;

```

**测试增加**

```java
  @Test
    public void testAdd() {
        Person person = new Person();
        person.setName("马家兴");
        person.setPhone("15555555555");
        person.setEmail("312@q.com");
        personMapper.insert(person);
    }
```

**mybatisplus自动生成id主键**

![image-20200702104557668](https://gitee.com//nopromise/pic/raw/master/typora/20200702104557.png)



## P10-主键生成策略

**参考资料：分布式系统唯一ID生成方案汇总：**https://www.cnblogs.com/haoxinyue/p/5208136.html



### 1.MP里面的主键注解类IdType

```java
/**
 * 生成ID类型枚举类
 *
 * @author hubin
 * @since 2015-11-10
 */
@Getter
public enum IdType {
    /**
     * 数据库ID自增
     */
    AUTO(0),
    /**
     * 该类型为未设置主键类型(注解里等于跟随全局,全局里约等于 INPUT)
     */
    NONE(1),
    /**
     * 用户输入ID
     * <p>该类型可以通过自己注册自动填充插件进行填充</p>
     */
    INPUT(2),

    /* 以下3种类型、只有当插入对象ID 为空，才自动填充。 */
    /**
     * 分配ID (主键类型为number或string）,
     * 默认实现类 {@link com.baomidou.mybatisplus.core.incrementer.DefaultIdentifierGenerator}(雪花算法)
     *
     * @since 3.3.0
     */
    ASSIGN_ID(3),
    /**
     * 分配UUID (主键类型为 string)
     * 默认实现类 {@link com.baomidou.mybatisplus.core.incrementer.DefaultIdentifierGenerator}(UUID.replace("-",""))
     */
    ASSIGN_UUID(4),
    /**
     * @deprecated 3.3.0 please use {@link #ASSIGN_ID}
     */
    @Deprecated
    ID_WORKER(3),
    /**
     * @deprecated 3.3.0 please use {@link #ASSIGN_ID}
     */
    @Deprecated
    ID_WORKER_STR(3),
    /**
     * @deprecated 3.3.0 please use {@link #ASSIGN_UUID}
     */
    @Deprecated
    UUID(4);

    private final int key;

    IdType(int key) {
        this.key = key;
    }
}
```





### 2.分布式系统唯一ID生成方案汇总

**参考资料：分布式系统唯一ID生成方案汇总：**https://www.cnblogs.com/haoxinyue/p/5208136.html

**1. 数据库自增长序列或字段**

**2. UUID及其变种**

1）为了解决UUID不可读，可以使用UUID to Int64的方法。及

2）为了解决UUID无序的问题，NHibernate在其主键生成方式中提供了Comb算法（combined guid/timestamp）。保留GUID的10个字节，用另6个字节表示GUID生成的时间（DateTime）。

**3. Redis生成ID**

**4. Twitter的snowflake算法**



### 3.MP注解样例

```java
@Data
public class Person {
    //雪花算法
    @TableId(type = IdType.ASSIGN_ID)
    private Long id;
    private String name;
    private String phone;
    private String email;
}
```



#### 4.图示

![image-20200702112051796](https://gitee.com//nopromise/pic/raw/master/typora/20200702112051.png)







## P11-MybatisPlus实现自动填充

### **1.根据id更新方法**

```java
  @Test
    public void testUpdate() {
        Person person = new Person();
        person.setId(1278527669196947458L);
        person.setName("马家兴1");
        personMapper.updateById(person);
    }
```



### 2.自动填充

https://mp.baomidou.com/guide/auto-fill-metainfo.html



项目中经常会遇到一些数据，每次都使用相同的方式填充，例如记录的创建时间，更新时间等。

我们可以使用MyBatis Plus的自动填充功能，完成这些字段的赋值工作



**（1）数据库表中添加自动填充字段**

在User表中添加datetime类型的新的字段 create_time、update_time

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200702142056.png" alt="image-20200702142056768" style="zoom:80%;" />



**（2）实体上添加注解**

​    @TableField(fill = FieldFill.INSERT)

​    @TableField(fill = FieldFill.INSERT_UPDATE)

```JAVA
@Data
public class Person {
    @TableId(type = IdType.ASSIGN_ID)
    private Long id;
    private String name;
    private String phone;
    private String email;

    //    自动填充
    @TableField(fill = FieldFill.INSERT)
    private Date createTime;
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private Date updateTime;
}
```



**（3）实现元对象处理器接口**

```java
@Component
public class MyMetaObjectHandler implements MetaObjectHandler {
    private static final Logger LOGGER = LoggerFactory.getLogger(MyMetaObjectHandler.class);

    @Override
    public void insertFill(MetaObject metaObject) {
        this.setFieldValByName("createTime",new Date(),metaObject);
        this.setFieldValByName("updateTime",new Date(),metaObject);
    }

    @Override
    public void updateFill(MetaObject metaObject) {
        this.setFieldValByName("updateTime",new Date(),metaObject);
    }
}
```



**(4) 测试**

```java
@Test
public void testAutoFill() {
    Person person = new Person();
    person.setName("dxx");
    person.setEmail("333@qq.com");
    person.setPhone("13312341234");
    int insert = personMapper.insert(person);
    System.out.println();
}
```



![image-20200702115020789](https://gitee.com//nopromise/pic/raw/master/typora/20200702115020.png)





## P12&P13-MybatisPlus实现乐观锁（1）（2）

**主要适用场景：**当要更新一条记录的时候，希望这条记录没有被别人更新，也就是说实现线程安全的数据更新



![image-20200702161935436](https://gitee.com//nopromise/pic/raw/master/typora/20200702161935.png)





<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200702162657.png" alt="image-20200702162657025" style="zoom:67%;" />



**乐观锁实现方式：**

- 取出记录时，获取当前version
- 更新时，带上这个version
- 执行更新时， set version = newVersion where version = oldVersion
- 如果version不对，就更新失败



### (1) 数据库中添加version字段

```sql
ALTER TABLE `person` ADD COLUMN `version` INT
```

### (2) 实体类添加version字段

```java
    @Version
    @TableField(fill = FieldFill.INSERT)
    private Integer version;
```

### (3) 元对象处理器接口添加version的insert默认值


​        this.setFieldValByName("version", 1, metaObject);

```JAVA
@Component
public class MyMetaObjectHandler implements MetaObjectHandler {
    private static final Logger LOGGER = LoggerFactory.getLogger(MyMetaObjectHandler.class);

    @Override
    public void insertFill(MetaObject metaObject) {
        ......
        //新增数据 默认version为1
        this.setFieldValByName("version", 1, metaObject);

    }
}
```



**特别说明:**

> 支持的数据类型只有 int,Integer,long,Long,Date,Timestamp,LocalDateTime整数类型下 `newVersion = oldVersion + 1``newVersion` 会回写到 `entity` 中仅支持 `updateById(id)` 与 `update(entity, wrapper)` 方法在 `update(entity, wrapper)` 方法下, `wrapper` 不能复用!!!



### (4) 在 MybatisPlusConfig 中注册 Bean

```java
@EnableTransactionManagement  //开启事务支持后
@Configuration
@MapperScan("com.np.MybatisPlus.mapper")
public class MybatisPlusConfig {
    /**
     * 乐观锁插件
     *
     * @return
     */
    @Bean
    public OptimisticLockerInterceptor optimisticLockerInterceptor() {
        return new OptimisticLockerInterceptor();
    }
}
```



### (5)测试 

```java
//测试乐观锁插件 成功插入
@Test
public void testOptimisticLocker() {
    //查询
    Person person = personMapper.selectById(1278538738363748353L);
    //修改数据
    person.setName("dxx_UPDATE");
    person.setEmail("5551111@qq.com");
    person.setPhone("1331111234");
    //执行更新
    personMapper.updateById(person);
}

//测试乐观锁插件 模拟插入失败
@Test
public void testOptimisticLockerFail() {
    //查询
    Person person = personMapper.selectById(1278538738363748353L);
    //修改数据
    person.setName("dxx_UPDATE");
    person.setEmail("3331111@qq.com");
    person.setPhone("1331111234");

    //模拟取出数据后，数据库中version实际数据比取出的值大，即已被其它线程修改并更新了version
    person.setVersion(person.getVersion() - 1);
    //执行更新
    int insert = personMapper.updateById(person);
}
```

 

![image-20200702155337790](https://gitee.com//nopromise/pic/raw/master/typora/20200702155337.png)





## P14-MybatisPlus实现分页和简单查询

### 1、根据id查询记录

```java
    @Test
    public void testSelectById() {
        User user = userMapper.selectById(1278527669196947458L);
        System.out.println(user);
    }
```



### 2、通过多个id批量查询

```java
    @Test
    public void testSelectBatchIds() {
        List<Person> personList = personMapper.selectBatchIds(Arrays.asList(1278536232241983489L, 1278527669196947458L));
        personList.forEach(System.out::print);
    }
```



### 3、简单的条件查询

```java
@Test
public void testSelectByMap() {
    HashMap<String, Object> map = new HashMap<>();
    map.put("name","马家兴");
    map.put("phone","15555555555");
    List<Person> personList = personMapper.selectByMap(map);
    personList.forEach(System.out::print);
}
```

**注意：**map中的key对应的是数据库中的列名。例如数据库user_id，实体类是userId，这时map的key需要填写user_id



### 4、分页

**MyBatis Plus自带分页插件，只要简单的配置即可实现分页功能**



### (1).创建配置类

此时可以删除主类中的 *@MapperScan* 扫描注解

```java
 	/**
     * 分页插件
     *
     * @return
     */
    @Bean
    public PaginationInterceptor paginationInterceptor() {
        return new PaginationInterceptor();
    }
```



### （2）测试selectPage分页

**测试：**最终通过page对象获取相关数据

```java
    //测试分页
    @Test
    public void testSelectPage() {
        Page<User> page = new Page<>(1, 5);
        userMapper.selectPage(page, null);
        page.getRecords().forEach(System.out::println);
        System.out.println(page.getCurrent());//1
        System.out.println(page.getPages());//3
        System.out.println(page.getSize());//5
        System.out.println(page.getTotal());//12
        System.out.println(page.hasNext());//true
        System.out.println(page.hasPrevious());//false
    }

```

控制台sql语句打印：SELECT id,name,age,email,create_time,update_time FROM user LIMIT 0,5 



### (3)测试selectMapsPage分页：结果集是Map

```java
@Test
public void testSelectMapsPage() {
    IPage<Map<String, Object>> page = new Page<>(1, 5);
    userMapper.selectMapsPage(page, null);
    List<Map<String, Object>> list = page.getRecords();
    list.forEach(System.out::println);

    System.out.println(page.getCurrent());
    System.out.println(page.getPages());
    System.out.println(page.getSize());
    System.out.println(page.getTotal());
}
```



## P15-MybatisPlus实现删除和逻辑删除

### 1.根据id删除记录

```java
    int result = userMapper.deleteById(8L);
```



### 2.批量删除

```java
        int result = userMapper.deleteBatchIds(Arrays.asList(8, 9, 10));
```



### 3.简单的条件查询删除

```java
	HashMap<String, Object> map = new HashMap<>();
    map.put("name", "Helen");
    map.put("age", 18);
    int result = userMapper.deleteByMap(map);
```



### 4.逻辑删除

- 物理删除：真实删除，将对应数据从数据库中删除，之后查询不到此条被删除数据
- 逻辑删除：假删除，将对应数据中代表是否被删除字段状态修改为“被删除状态”，之后在数据库中仍旧能看到此条数据记录



#### 1.mysql中的boolean类型

mysql中的boolean类型：tinyint,0表示false 1表true

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200703080448.png" alt="image-20200703080448158" style="zoom:67%;" />



#### （1）数据库中添加deleted字段

```sql
ALTER TABLE `user` ADD COLUMN `deleted` boolean
```

![img](https://gitee.com//nopromise/pic/raw/master/typora/20200703081440.png)



#### (2)实体类添加deleted字段

```java
    @TableLogic
    @TableField(fill = FieldFill.INSERT)
    private Integer deleted;
```



#### (3)元对象处理器接口添加deleted的insert默认值（默认插入时未删除状态）

```java
@Override
public void insertFill(MetaObject metaObject) {
    ......
    this.setFieldValByName("deleted", 0, metaObject);//0未删除  1已删除
}
```



#### （4）application.properties加入配置

此为默认值，如果你的默认值和mp默认的一样,该配置可无

```java
mybatis-plus.global-config.db-config.logic-delete-value=1
mybatis-plus.global-config.db-config.logic-not-delete-value=0
```



#### (5)在MybatisPlusConfig 中注册 Bean

```java
@Bean
public ISqlInjector sqlInjector() {
    return new LogicSqlInjector();
}
```

MP的3.3.2版本用下面

```java
   @Bean
    public ISqlInjector sqlInjector(){
        return new DefaultSqlInjector();
    }
```



#### （6）测试逻辑删除

```java
    @Test
    public void testLogicDelete() {
        int i = personMapper.deleteById(1278519972196122626L);
        System.out.println(i);
    }
```

![image-20200703081920838](https://gitee.com//nopromise/pic/raw/master/typora/20200703081920.png)

- 测试后发现，数据并没有被删除，deleted字段的值由0变成了1
- 测试后分析打印的sql语句，是一条update
- **注意：**被删除数据的deleted 字段的值必须是 0，才能被选取出来执行逻辑删除的操作



#### (7)测试逻辑删除后的查询

MyBatis Plus中查询操作也会自动添加逻辑删除字段的判断

```java
 	/**
     * 测试 逻辑删除后的查询：
     * 不包括被逻辑删除的记录
     */    
	@Test
    public void testLogicDeleteSelect() {
        List<Person> personList = personMapper.selectList(null);
        personList.forEach(System.out::println);
    }
```

测试后分析打印的sql语句，包含 WHERE deleted=0 

SELECT id,name,age,email,create_time,update_time,deleted FROM user WHERE deleted=0





## P16-MybatisPlus性能分析插件和执行 SQL 分析打印

### 1.MybatisPlus性能分析插件（3.2.0之前）

**注意：**

`3.2.0` 以后的版本移除，推荐使用第三方扩展 `执行 SQL 分析打印` 功能

**详看官网:**

https://mp.baomidou.com/guide/performance-analysis-plugin.html



性能分析拦截器，用于输出每条 SQL 语句及其执行时间

SQL 性能执行分析,开发环境使用，超过指定时间，停止运行。有助于发现问题



#### 1、配置插件

**（1）参数说明**

参数：maxTime： SQL 执行最大时长，超过自动停止运行，有助于发现问题。

参数：format： SQL是否格式化，默认false。

**（2）在 MybatisPlusConfig 中配置**

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200703083913.png" alt="image-20200703083913830" style="zoom:80%;" />



**（3）Spring Boot 中设置dev环境**

```
#环境设置：dev、test、prod
spring.profiles.active=dev
```



可以针对各环境新建不同的配置文件`application-dev.properties`、`application-test.properties`、`application-prod.properties`

也可以自定义环境名称：如test1、test2



#### 2、测试

**（1）常规测试**

```java

/**
 * 测试 性能分析插件
 */
@Test
public void testPerformance() {
    User user = new User();
    user.setName("我是Helen");
    user.setEmail("helen@sina.com");
    user.setAge(18);
    userMapper.insert(user);
}
```

**输出：**

![img](https://gitee.com//nopromise/pic/raw/master/typora/20200703084041.png)



**（2）将maxTime 改小之后再次进行测试**

```
performanceInterceptor.setMaxTime(5);//ms，超过此处设置的ms不执行
```

如果执行时间过长，则抛出异常：The SQL execution time is too large, 

**输出：**

![img](https://gitee.com//nopromise/pic/raw/master/typora/20200703084118.png)





### 2.执行 SQL 分析打印（3.2.0之后）

**3.2.0之后使用第三方的执行sql分析打印功能**

**官网：**https://mp.baomidou.com/guide/p6spy.html





















## P17-MybatisPlus实现条件查询

如果想进行复杂条件查询，那么需要使用条件构造器 Wapper，涉及到如下方法

**1、delete**

**2、selectOne**

**3、selectCount**

**4、selectList**

**5、selectMaps**

**6、selectObjs**

**7、update**



### **一、wapper介绍** 

![img](https://gitee.com//nopromise/pic/raw/master/typora/20200703113044.png)

**Wrapper ： 条件构造抽象类，最顶端父类**

-   AbstractWrapper ： 用于查询条件封装，生成 sql 的 where 条件

  ​    QueryWrapper ： Entity 对象封装操作类，不是用lambda语法

  ​    UpdateWrapper ： Update 条件封装，用于Entity对象更新操作

-   AbstractLambdaWrapper ： Lambda 语法使用 Wrapper统一处理解析 lambda 获取 column。

  ​	 LambdaQueryWrapper ：看名称也能明白就是用于Lambda语法使用的查询Wrapper

  ​     LambdaUpdateWrapper ： Lambda 更新封装Wrapper



### 二、AbstractWrapper

**注意：**以下条件构造器的方法入参中的 `column `均表示数据库字段

#### 1、ge、gt、le、lt、isNull、isNotNull

```java
    @Test
    public void testDelete() {
        QueryWrapper<Person> queryWrapper = new QueryWrapper<>();
        queryWrapper
                .le("age", 20)
                .isNotNull("phone");
        //查询
        List<Person> personList = personMapper.selectList(queryWrapper);
        //删除
        personMapper.delete(queryWrapper);

    }
```

### 2、eq、ne

**注意：**seletOne返回的是一条实体记录，当出现多条时会报错

```java
    @Test
    public void testSelectOne(){
        QueryWrapper<Person> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("name","dxx");
        Person person = personMapper.selectOne(queryWrapper);
        System.out.println(person);
    }
```



### 3、between、notBetween

包含大小边界

```java
    @Test
    public void testSelectCount() {
        QueryWrapper<Person> queryWrapper = new QueryWrapper<>();
        queryWrapper.between("age", 20, 23);
        Integer count = personMapper.selectCount(queryWrapper);
        System.out.println(count);
    }
```



### 4、allEq

```java
    @Test
    public void testSelectList() {
        QueryWrapper<Person> queryWrapper = new QueryWrapper<>();
        HashMap<String, Object> map = new HashMap<>();
        map.put("email", "312@q.com");
        map.put("phone", "15555555555");
        queryWrapper.allEq(map);
        List<Person> personList = personMapper.selectList(queryWrapper);
        System.out.println();
    }
```



### 5、like、notLike、likeLeft、likeRight

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper
        .notLike("name", "e")
        .likeRight("email", "t");
 List<Map<String, Object>> maps = userMapper.selectMaps(queryWrapper);//返回值是Map列表
```



### 6、in、notIn、inSql、notinSql、exists、notExists

**in、notIn：**

- `notIn("age",{1,2,3})`--->`age not in (1,2,3)`
- `notIn("age", 1, 2, 3)`--->`age not in (1,2,3)`

**inSql、notinSql：可以实现子查询**

- 例: `inSql("age", "1,2,3,4,5,6")`--->`age in (1,2,3,4,5,6)`
- 例: `inSql("id", "select id from table where id < 3")`--->`id in (select id from table where id < 3)`


```java

  QueryWrapper<User> queryWrapper = new QueryWrapper<>();
    //queryWrapper.in("id", 1, 2, 3);
    queryWrapper.inSql("id", "select id from user where id < 3");
    List<Object> objects = userMapper.selectObjs(queryWrapper);//返回值是Object列表
    objects.forEach(System.out::println);
```
```sql
SELECT id,name,age,email,create_time,update_time,deleted,version 

FROM user WHERE deleted=0 AND id IN (select id from user where id < 3) 
```

```java
  @Test
    public void testSelectList() {
        QueryWrapper<Person> queryWrapper = new QueryWrapper<>();
        queryWrapper.inSql("age","select age from person where email='312@q.com'");
        List<Object> objects = personMapper.selectObjs(queryWrapper);
        objects.forEach(System.out::println);
    }
```
```sql
SELECT id,name,phone,email,age,create_time,update_time,version,deleted FROM person WHERE deleted=0 AND (age IN (select age from person where email='312@q.com')) 
```
```java
 List<Object> objects = personMapper.selectObjs(queryWrapper);


 /**
 * 根据 Wrapper 条件，查询全部记录
 * <p>注意： 只返回第一个字段的值</p>
 *
 * @param queryWrapper 实体对象封装操作类（可以为 null）
 */
List<Object> selectObjs(@Param(Constants.WRAPPER) Wrapper<T> queryWrapper);

```

```
1278519972196122626
1278527669196947458
1278536232241983489
```

### 7、or、and

**注意：**这里使用的是 **UpdateWrapper** 

**不调用`or`则默认为使用 `and `连**

//修改使用UpdateWrapper ，不用QueryWrapper

```java
    @Test
    public void testUpdate1(){
        Person person = new Person();
        person.setAge("100");//需要修改的列 值

        UpdateWrapper<Person> updateWrapper = new UpdateWrapper<>();
        updateWrapper
                .eq("email","312@q.com")
                .or()
                .between("age",24,30);//修改条件
        int result = personMapper.update(person, updateWrapper);
        System.out.println(result);

    }
```





### 8、嵌套or、嵌套and

这里使用了lambda表达式，or中的表达式最后翻译成sql时会被加上圆括号

```java
    @Test
    public void testUpdate2(){
        Person person = new Person();
        person.setAge("99");//需要修改的列 值
        person.setName("Andy");//需要修改的列 值

        UpdateWrapper<Person> updateWrapper = new UpdateWrapper<>();
        updateWrapper
                .like("name","马")
                .or(i->i.eq("name","dxx").ne("age","99"));
        int result = personMapper.update(person, updateWrapper);
        System.out.println(result);

    }
```

```sql
UPDATE person SET name=?, age=?, update_time=? WHERE deleted=0 AND (name LIKE ? OR (name = ? AND age <> ?)) 
```





### 9、orderBy、orderByDesc、orderByAsc

```java
@Test
public void testSelectListOrderBy() {
    QueryWrapper<User> queryWrapper = new QueryWrapper<>();
    queryWrapper.orderByDesc("id");
    List<User> users = userMapper.selectList(queryWrapper);
    users.forEach(System.out::println);
}
```



```sql
SELECT id,name,age,email,create_time,update_time,deleted,version 
FROM user WHERE deleted=0 ORDER BY id DESC
```



### 10、last



直接拼接到 sql 的最后

**注意：**只能调用一次,多次调用以最后一次为准 有sql注入的风险,请谨慎使用

```java
@Test
public void testSelectListLast() {
    QueryWrapper<User> queryWrapper = new QueryWrapper<>();
    queryWrapper.last("limit 1");
    List<User> users = userMapper.selectList(queryWrapper);
    users.forEach(System.out::println);
}
```

```sql
SELECT id,name,age,email,create_time,update_time,deleted,version 
FROM user WHERE deleted=0 limit 1 
```



### 11、指定要查询的列

​        queryWrapper.select("name", "email", "age");

```java
    @Test
    public void testSelectListColumn() {
        QueryWrapper<Person> queryWrapper = new QueryWrapper<>();
        queryWrapper.select("name", "email", "age");
        List<Person> personList = personMapper.selectList(queryWrapper);
        personList.forEach(System.out::println);
    }
```

SELECT id,name,age FROM user WHERE deleted=0 

<==    Columns: name, email, age
<==        Row: Andy, , 99
<==        Row: Andy, 312@q.com, 99
<==        Row: Andy, 312@q.com, 99
<==        Row: Andy, 312@q.com, 99
<==        Row: dxx_UPDATE, 3331111@qq.com, 23
<==        Row: Andy, 311@q.com, 99
<==        Row: Andy, 3333@q.com, 99



### 12、set、setSql

最终的sql会合并 user.setAge()，以及 userUpdateWrapper.set()  和 setSql() 中 的字段



```java
@Test
public void testUpdateSet() {
    //修改值
    User user = new User();
    user.setAge(99);
    //修改条件
    UpdateWrapper<User> userUpdateWrapper = new UpdateWrapper<>();
    userUpdateWrapper
        .like("name", "h")
        .set("name", "老李头")//除了可以查询还可以使用set设置修改的字段
        .setSql(" email = '123@qq.com'");//可以有子查询
    int result = userMapper.update(user, userUpdateWrapper);
}
```



UPDATE user SET age=?, update_time=?, name=?, email = '123@qq.com' WHERE deleted=0 AND name LIKE ? 

