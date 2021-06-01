---
title: P95-P96EasyExcel读写操作
date: 2021-06-01
---
[[TOC]]



## P95-EasyExcel实现写操作 



![11-EasyExcel写操作](https://gitee.com//nopromise/pic/raw/master/typora/20200801114509.png)



### 一、Excel导入导出的应用场景

1、数据导入：减轻录入工作量

2、数据导出：统计信息归档

3、数据传输：异构系统之间数据传输

### 二、EasyExcel简介

#### 1、EasyExcel特点

- Java领域解析、生成Excel比较有名的框架有Apache poi、jxl等。但他们都存在一个严重的问题就是非常的耗内存。如果你的系统并发量不大的话可能还行，但是一旦并发上来后一定会OOM或者JVM频繁的full gc。
- EasyExcel是阿里巴巴开源的一个excel处理框架，**以使用简单、节省内存著称**。EasyExcel能大大减少占用内存的主要原因是在解析Excel时没有将文件数据一次性全部加载到内存中，而是从磁盘上一行行读取数据，逐个解析。
- EasyExcel采用一行一行的解析模式，并将一行的解析结果以观察者的模式通知处理（AnalysisEventListener）。



### 一、创建项目，实现EasyExcel对Excel写操作 

#### 1、创建一个普通的maven项目

项目名：excel-easydemo

#### 2、pom中引入xml相关依赖

**需要引入下面3个依赖**

```
poi的依赖，父工程已经引入   
       3.17

       <!--xls-->
        <dependency>
            <groupId>org.apache.poi</groupId>
            <artifactId>poi</artifactId>
            <version>3.17</version>
        </dependency>

        <dependency>
            <groupId>org.apache.poi</groupId>
            <artifactId>poi-ooxml</artifactId>
            <version>3.17</version>
        </dependency>
```

```
easyexcel依赖 		
 		<dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>easyexcel</artifactId>
            <version>2.1.1</version>
        </dependency>
```







#### 3、创建实体类 

**设置表头和添加的数据字段**



<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200801114943.png" alt="image-20200801114943475" style="zoom:80%;" />



#### 4 、实现写操作

**（1）创建方法循环设置要添加到Excel的数据**

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200801115014.png" alt="image-20200801115014176" style="zoom:80%;" />



**（2）实现最终的添加操作（写法一）**

```java
public static void main(String[] args) throws Exception {
    // 写法1
    String fileName = "F:\\11.xlsx";
    // 这里 需要指定写用哪个class去写，然后写到第一个sheet，名字为模板 然后文件流会自动关闭
    // 如果这里想使用03 则 传入excelType参数即可
    EasyExcel.write(fileName, DemoData.class).sheet("写入方法一").doWrite(data());
}
```



**（3）实现最终的添加操作（写法二）**

```java

public static void main(String[] args) throws Exception {
    // 写法2，方法二需要手动关闭流
    String fileName = "F:\\112.xlsx";
    // 这里 需要指定写用哪个class去写
    ExcelWriter excelWriter = EasyExcel.write(fileName, DemoData.class).build();
    WriteSheet writeSheet = EasyExcel.writerSheet("写入方法二").build();
    excelWriter.write(data(), writeSheet);
    /// 千万别忘记finish 会帮忙关闭流
    excelWriter.finish();
}
```





## P96-EasyExcel实现读操作





![12-EasyExcel读操作](https://gitee.com//nopromise/pic/raw/master/typora/20200801114541.png)







![13-EasyExcel读操作分类](https://gitee.com//nopromise/pic/raw/master/typora/20200801114547.png)

### 一、实现EasyExcel对Excel读操作 



#### 1、创建实体类

```java
@Data
public class DemoData {
    //设置excel表头名称
    @ExcelProperty(value = "学生编号",index = 0)
    private Integer no;
    @ExcelProperty(value = "学生姓名",index = 1)
    private String sname;
}
```



#### 2、创建读取操作的监听器

```java
/**
 * 创建读取excel监听器
 * @Author: fanjunlin
 * @Date: 2020/8/1.
 */
public class ExcelListener extends AnalysisEventListener<DemoData> {
    //存储读取后的数据
    List<DemoData> list=new ArrayList<DemoData>();

    //读取表头内容
    @Override
    public void invokeHeadMap(Map<Integer, String> headMap, AnalysisContext context) {
        System.out.println("表头信息："+headMap);
    }

    //一行一行的读取内容
    @Override
    public void invoke(DemoData data, AnalysisContext context) {
        System.out.println("***"+data);
        list.add(data);
    }

    //读取完成之后
    @Override
    public void doAfterAllAnalysed(AnalysisContext context) {

    }
}

```



#### 3、调用实现最终的读取 

<img src="https://gitee.com//nopromise/pic/raw/master/typora/20200801145759.png" alt="image-20200801145759569" style="zoom:80%;" />





```java
    //测试从excel中读
    private static void testRead() {
        ExcelListener excelListener = new ExcelListener();
        String fileName = "E:\\11.xlsx";
        EasyExcel.read(fileName, DemoData.class,excelListener).sheet().doRead();
        //list为读取后的数据集合
        List<DemoData> list = excelListener.list;
        System.out.println();
    }
```

