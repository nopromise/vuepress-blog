---
title: jenkins的安装与基本配置
date: 2021-05-23
---

<!-- [toc] -->
[[toc]]


## Jenkins的安装(Docker)

### 1.下载镜像
打开终端，输入docker search命令搜索 Docker Hub 上可用的 Jenkins 镜像：
```
[root@nopromise home]# docker search jenkins
NAME                                   DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
jenkins                                Official Jenkins Docker image                   5183      [OK]       
jenkins/jenkins                        The leading open source automation server       2529                 
jenkinsci/blueocean                    https://jenkins.io/projects/blueocean           619                  
jenkinsci/jenkins                      Jenkins Continuous Integration and Delivery …   389                  
jenkins/jnlp-slave                     a Jenkins agent which can connect to Jenkins…   143                  [OK]
jenkinsci/jnlp-slave                   A Jenkins slave using JNLP to establish conn…   131                  [OK]
jenkinsci/slave                        Base Jenkins slave docker image                 67                   [OK]
jenkins/slave                          base image for a Jenkins Agent, which includ…   47                   [OK]

```
官方推荐使用的镜像是jenkinsci/blueocean，该镜像包含当前的长期支持 (LTS) 的 Jenkins 版本 (可以生产使用) ，并捆绑了所有 Blue Ocean 插件和功能。

排名第一的jenkins镜像，其集成的 Jenkins 版本比较高，可能存在插件不兼容的情况。

```
#下载镜像
$ docker pull jenkinsci/blueocean
#查看镜像
[root@nopromise home]# docker images
REPOSITORY            TAG       IMAGE ID       CREATED       SIZE
jenkinsci/blueocean   latest    97699186552d   7 days ago    745MB
nginx                 latest    f0b8a9a54136   2 weeks ago   133MB


```


### 2.运行容器

Docker 会在宿主机上创建一个数据卷/data/jenkins/jenkins_home，容器映射该卷以持久化数据

```
docker run   --name jenkins   -u root   -d   -p 8080:8080   -p 50000:50000   -v /data/jenkins/jenkins_home:/var/jenkins_home  -v /etc/localtime:/etc/localtime  -v /var/run/docker.sock:/var/run/docker.sock   -v $(which docker):/usr/bin/docker      jenkinsci/blueocean

```

参数：

-v /run/docker.sock:/var/run/docker.sock: 容器内可执行宿主机docker命令
-v $(which docker):/usr/bin/docker: 容器内可执行docker命令
-v /etc/localtime:/etc/localtime
--user root: 容器内有权限执行docker命令


注意：
/data/jenkins/jenkins_home 文件夹要赋予权限，chmod 777  /data/jenkins/jenkins_home

启动容器一定要用root用户进入docker容器，不然访问不了宿主机的docker服务。

还有要挂载/var/run/docker.sock和$(which docker)这两个文件夹到容器，这样docker版的jenkins才可以用使用docker相关服务


### 3.配置Jenkins

3.1 解锁Jenkins

3.2 安装推荐的插件

3.3 创建用户







## Jenkins的基本配置

### java maven git nodejs


系统管理->全局工具配置

- Maven 配置


<img src="https://nopr.oss-cn-qingdao.aliyuncs.com//md/20210527151219.png" width="30%" >


- JDK配置
可以映射宿主机也可以新增JDK安装


- Git配置
在jenkins容器中输入which git，查找git路径。/usr/bin/git


- Maven安装

新增Maven安装（3.5.3）


- NodeJS
新增NodeJS安装

版本：12.14.1

Global npm packages to install
```
cnpm --registry=https://registry.npm.taobao.org
```

Global npm packages refresh hours:72


###  系统配置-SSH Servers

可配置多个


<!-- ![20210527151843](https://nopr.oss-cn-qingdao.aliyuncs.com//md/20210527151843.png) -->
<img src="https://nopr.oss-cn-qingdao.aliyuncs.com//md/20210527151843.png" width="50%">

###  其他配置

1. 时区设置
用户->配置->用户定义的时区