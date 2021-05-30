---
title: docker的应用-Nginx
date: 2021-05-18
---

<!-- [toc] -->
[[toc]]


## Docker应用-Nginx

### Nignx的基本安装

1.查找 Docker Hub 上的 nginx 镜像
```
[root@localhost ~]# docker search nginx
```

2.拉取官方的Nginx镜像
```
[root@localhost ~]# docker pull nginx
```
3.在本地镜像列表里查到 REPOSITORY 为 nginx 的镜像
```
[root@localhost ~]# docker images nginx
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
docker.io/nginx     latest              f949e7d76d63        5 weeks ago         126 MB
[root@localhost ~]# 
```
4.以下命令使用 NGINX 默认的配置来启动一个 Nginx 容器实例：
```
[root@localhost ~]# docker run --rm --name nginx-test -p 8080:80 -d nginx
358354f206fdbc5c20199a307392c11972b1bedab306144e5af56995edbb3e4b
```
其中,该命令的四个命令行参数的含义如下。
      --rm：容器终止运行后，自动删除容器文件。
      --name nginx-test：容器的名字叫做nginx-test,名字自己定义.
      -p: 端口进行映射，将本地 8080 端口映射到容器内部的 80 端口
      -d：容器启动后，在后台运行

5.查看启动的docker容器
```
[root@localhost ~]# docker container ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                  NAMES
4a7494723341        nginx               "nginx -g 'daemon ..."   11 seconds ago      Up 7 seconds        0.0.0.0:8080->80/tcp   nginx-test
```

在浏览器中打开http://172.17.0.1:8080，效果如下.


![20210519110841](https://nopr.oss-cn-qingdao.aliyuncs.com//md/20210519110841.png)


### 映射本地目录到nginx容器

1.创建本地目录，用于存放Nginx的相关文件信息.
```
# mkdir -p /data/nginx/html /data/nginx/logs /data/nginx/conf
```

其中：

      html: 目录将映射为 nginx 容器配置的虚拟目录:/usr/share/nginx/html

      logs: 目录将映射为 nginx 容器的日志目录:/var/log/nginx

      conf: 目录里的配置文件将映射为 nginx 容器的配置文件:/etc/nginx/conf.d/


2.拷贝容器内 Nginx 默认配置文件default.conf到本地当前目录下的 conf 目录,容器ID可以查看 docker ps 命令输入中的第一列：
```
[root@localhost home]# docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                  NAMES
358354f206fd        nginx               "nginx -g 'daemon ..."   29 minutes ago      Up 29 minutes       0.0.0.0:8080->80/tcp   nginx-test

[root@nopromise conf]# docker cp a4463b2d0d04:/etc/nginx/conf.d/default.conf /data/nginx/conf/

```
3.部署命令
```
docker run  -d -p 80:80 -p 443:443 --name nginx   -v /data/nginx/html:/usr/share/nginx/html   -v /data/nginx/conf/conf.d:/etc/nginx/conf.d -v /data/nginx/conf/nginx.conf:/etc/nginx/nginx.conf  -v /data/nginx/logs:/var/log/nginx   nginx


添加（时间映射）：
-v /etc/timezone:/etc/timezone -v /etc/localtime:/etc/localtime

```

```
docker run  -d -p 80:80 -p 443:443 --name nginx  -v /etc/timezone:/etc/timezone -v /etc/localtime:/etc/localtime  -v /data/nginx/html:/usr/share/nginx/html   -v /data/nginx/conf/conf.d:/etc/nginx/conf.d -v /data/nginx/conf/nginx.conf:/etc/nginx/nginx.conf  -v /data/nginx/logs:/var/log/nginx   nginx
```

命令说明：

      --rm：容器终止运行后，自动删除容器文件。

      -p 8081:80： 将容器的 80 端口映射到主机的 8082 端口.

      --name nginx-test-web：将容器命名为 nginx-test-web 

      -v /data/nginx/html:/usr/share/nginx/html：将我们自己创建的 html 目录挂载到容器的 /usr/share/nginx/html。

      -v /data/nginx/conf/default.conf:/etc/nginx/conf.d/default.conf：将我们自己创建的 default.conf 挂载到容器的 /etc/nginx/conf.d/default.conf

      -v /data/nginx/logs:/var/log/nginx：将我们自己创建的 logs 挂载到容器的 /var/log/nginx。
      -v /etc/timezone:/etc/timezone     时区映射
      -v /etc/localtime:/etc/localtime   本地时间映射



4.启动以上命令后进入 /data/nginx/html 目录：

```
[root@localhost ~]# cd /home/nginx/www/
[root@localhost www]# vim index.html 
```



### 部署vuepress的静态博客到nginx

#### 编译打包
获取打包后的dist文件夹

```yarn build #编译打包```


#### 上传dist到阿里云服务器

把dist文件夹上传到/data/nginx/html目录下



#### nginx配置
default.conf：

```
location / {
        #root   /usr/share/nginx/html;
        root   /usr/share/nginx/html/dist;
        index  index.html index.htm;
    }
```


访问预览:

![20210519154213](https://nopr.oss-cn-qingdao.aliyuncs.com//md/20210519154213.png)


其他方式:
https://www.cnblogs.com/sueyyyy/p/13206798.html


### Nginx配置443端口80端口和SSL证书

#### 1.阿里云配置SSL证书

阿里云申请免费SSL证书，在证书申请中绑定域名(blog.nopr.tech),绑定成功后，下载对应nginx证书，解压后获得xx.key和xx.pem证书文件。

#### 2.Nginx中配置SSL证书和433端口
1. 在cenos7中目录/data/nginx/conf/conf.d下新建cert文件夹
2. 上传2个证书到cert下
3. 配置/data/nginx/conf/conf.d下的default.conf,然后重启nginx

```
#以下属性中，以ssl开头的属性表示与证书配置有关。
server {
    listen 443 ssl;
    #配置HTTPS的默认访问端口为443。
    #如果未在此处配置HTTPS的默认访问端口，可能会造成Nginx无法启动。
    #如果您使用Nginx 1.15.0及以上版本，请使用listen 443 ssl代替listen 443和ssl on。
    server_name blog.nopr.tech; #需要将yourdomain.com替换成证书绑定的域名。
    root html;
    index index.html index.htm;
    #默认根路径为/etc/nginx/
    ssl_certificate  conf.d/cert/xxx.pem;  #需要将cert-file-name.pem替换成已上传的证书文件的名称。
    #默认根路径为/etc/nginx/
    ssl_certificate_key conf.d/cert/xxx.key; #需要将cert-file-name.key替换成已上传的证书密钥文件的名称。
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    #表示使用的加密套件的类型。
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2; #表示使用的TLS协议的类型。
    ssl_prefer_server_ciphers on;
    location / {
        root   /usr/share/nginx/html/dist;
       # root html;  #站点目录。
        index index.html index.htm;
    }
}

```

#### 3.配置80端口

```
server{

    listen       80;
    listen  [::]:80;
    server_name  blog.nopr.tech;
    #nginx 80端口重定向到443端口，也就是http访问自动跳转到https
    rewrite ^(.*)$ https://${server_name}$1 permanent;

    #charset koi8-r;
    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        #root   /usr/share/nginx/html;
        root   /usr/share/nginx/html/dist;
        index  index.html index.htm;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

}



```



