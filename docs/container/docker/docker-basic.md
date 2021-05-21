---
title: docker的基本使用
date: 2021-05-17
---

[[toc]]
[toc]


## Docker 装卸与启动

### 安装与卸载

使用官方安装脚本自动安装

```
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
```

卸载docker
```
删除安装包：
yum remove docker-ce
删除镜像、容器、配置文件等内容：
rm -rf /var/lib/docker
```

### 启动
启动docker
```
systemctl start docker
```


## 容器的使用

### 获取镜像
```
$ docker pull ubuntu
```

### 启动容器

#### 启动容器示例1
```
$ docker run -itd --name ubuntu-test ubuntu /bin/bash
```
使用 ubuntu 镜像启动一个容器，参数为以命令行模式进入该容器：
-i: 交互式操作。
-t: 终端。
-d: 后台运行（加了 -d 参数默认不会进入容器，想要进入容器需要使用指令 docker exec）
--name:容器名字
ubuntu: ubuntu 镜像。
/bin/bash：放在镜像名后的是命令，这里我们希望有个交互式 Shell，因此用的是 /bin/bash。

#### 启动容器示例2
```
runoob@runoob:~$ docker run ubuntu:15.10 /bin/echo "Hello world"
```
docker: Docker 的二进制执行文件。
run: 与前面的 docker 组合来运行一个容器。
ubuntu:15.10 指定要运行的镜像，Docker 首先从本地主机上查找镜像是否存在，如果不存在，Docker 就会从镜像仓库 Docker Hub 下载公共镜像。
/bin/echo "Hello world": 在启动的容器里执行的命令


#### 启动已停止运行的容器

```
查看所有的容器命令如下：
$ docker ps -a
使用 docker start 启动一个已停止的容器：
$ docker start b750bbbcfd88 
```

### 查看容器
查看所有的容器命令如下
```
$ docker ps -a
```

### 停止和重启容器
停止容器的命令如下：
```
$ docker stop <容器 ID>
```
停止的容器可以通过 docker restart 重启：
```
$ docker restart <容器 ID>
```

### 进入容器
在使用 **-d** 参数时，容器启动后会进入后台。此时想要进入容器，可以通过以下指令进入：

- **docker attach**
- **docker exec**  推荐大家使用 docker exec 命令，因为此退出容器终端，不会导致容器的停止。

```
docker exec -it 243c32535da7 /bin/bash
```

更多参数说明请使用 docker exec --help 命令查看。


### 导出和导入容器
**导出容器**
如果要导出本地某个容器，可以使用 **docker export** 命令。

```
$ docker export 1e560fca3906 > ubuntu.tar
```

**导入容器快照**

可以使用 docker import 从容器快照文件中再导入为镜像，以下实例将快照文件 ubuntu.tar 导入到镜像 test/ubuntu:v1:

```
$ cat docker/ubuntu.tar | docker import - test/ubuntu:v1
```

此外，也可以通过指定 URL 或者某个目录来导入，例如：

```
$ docker import http://example.com/exampleimage.tgz example/imagerepo
```


### 删除容器

删除容器使用 **docker rm** 命令：

```
$ docker ps
$ docker rm -f 1e560fca3906
$ docker ps
```

下面的命令可以清理掉所有处于终止状态的容器。

```
$ docker container prune
```

## 容器的使用-web应用

### 运行一个 web 应用

```
runoob@runoob:~# docker pull training/webapp  # 载入镜像
runoob@runoob:~# docker run -d -P training/webapp python app.py

-d:让容器在后台运行。
-P:将容器内部使用的网络端口随机映射到我们使用的主机上。
python app.py 是命令
```

### 查看 WEB 应用容器

使用 docker ps 来查看我们正在运行的容器：

```
runoob@runoob:~#  docker ps
CONTAINER ID        IMAGE               COMMAND             ...        PORTS                 
d3d5e39ed9d3        training/webapp     "python app.py"     ...        0.0.0.0:32769->5000/tcp

Docker 开放了 5000 端口（默认 Python Flask 端口）映射到主机端口 32769 上。
这时我们可以通过浏览器32769端口访问WEB应用
```

我们也可以通过 -p 参数来设置不一样的端口：

```
runoob@runoob:~$ docker run -d -p 5000:5000 training/webapp python app.py
```



**docker ps**查看正在运行的容器

```
runoob@runoob:~#  docker ps
CONTAINER ID        IMAGE                             PORTS                     NAMES
bf08b7f2cd89        training/webapp     ...        0.0.0.0:5000->5000/tcp    wizardly_chandrasekhar
d3d5e39ed9d3        training/webapp     ...        0.0.0.0:32769->5000/tcp   xenodochial_hoov
```

容器内部的 5000 端口映射到我们本地主机的 5000 端口上。



### 网络端口的快捷方式

通过 **docker ps** 命令可以查看到容器的端口映射，**docker** 还提供了另一个快捷方式 **docker port**

```
runoob@runoob:~$ docker port bf08b7f2cd89
5000/tcp -> 0.0.0.0:5000

runoob@runoob:~$ docker port wizardly_chandrasekhar
5000/tcp -> 0.0.0.0:5000
```



### 查看 WEB 应用程序日志

docker logs [ID或者名字] 可以查看容器内部的标准输出。

```
runoob@runoob:~$ docker logs -f bf08b7f2cd89
 * Running on http://0.0.0.0:5000/ (Press CTRL+C to quit)
192.168.239.1 - - [09/May/2016 16:30:37] "GET / HTTP/1.1" 200 -
192.168.239.1 - - [09/May/2016 16:30:37] "GET /favicon.ico HTTP/1.1" 404 -

```

**-f:** 让 **docker logs** 像使用 **tail -f** 一样来输出容器内部的标准输出。

从上面，我们可以看到应用程序使用的是 5000 端口并且能够查看到应用程序的访问日志。



### 查看WEB应用容器的进程

我们还可以使用 docker top 来查看容器内部运行的进程

```
runoob@runoob:~$ docker top wizardly_chandrasekhar
UID     PID         PPID          ...       TIME                CMD
root    23245       23228         ...       00:00:00            python app.py
```



### 检查 WEB 应用程序

使用 **docker inspect** 来查看 Docker 的底层信息。它会返回一个 JSON 文件记录着 Docker 容器的配置和状态信息。

```
runoob@runoob:~$ docker inspect wizardly_chandrasekhar
```

### 停止 WEB 应用容器

```
runoob@runoob:~$ docker stop wizardly_chandrasekhar   

```

### 重启WEB应用容器

已经停止的容器，我们可以使用命令 docker start 来启动。

```
runoob@runoob:~$ docker start wizardly_chandrasekhar
wizardly_chandrasekhar
```

docker ps -l 查询最后一次创建的容器：

```
#  docker ps -l 
CONTAINER ID        IMAGE                             PORTS                     NAMES
bf08b7f2cd89        training/webapp     ...        0.0.0.0:5000->5000/tcp    wizardly_chandrasekhar
```



正在运行的容器，我们可以使用 **docker restart** 命令来重启。

### 移除WEB应用容器

我们可以使用 docker rm 命令来删除不需要的容器

```
runoob@runoob:~$ docker rm wizardly_chandrasekhar  
wizardly_chandrasekhar
```

删除容器时，容器必须是停止状态，否则会报如下错误

```
runoob@runoob:~$ docker rm wizardly_chandrasekhar
Error response from daemon: You cannot remove a running container bf08b7f2cd897b5964943134aa6d373e355c286db9b9885b1f60b6e8f82b2b85. Stop the container before attempting removal or force remove
```



## 镜像的使用

当运行容器时，使用的镜像如果在本地中不存在，docker 就会自动从 docker 镜像仓库中下载，默认是从 Docker Hub 公共镜像源下载。

下面我们来学习：

1、管理和使用本地 Docker 主机镜像
2、创建镜像


## Dockerfile



