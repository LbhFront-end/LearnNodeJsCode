## 《NodeJs指南》学习过程的源码

这本书写得挺通俗易懂的，美中不足的是年代有点久，很多工具都更新换代，里面的一些古老的代码也需要更新或者改造，我在这本书的基础上，尝试用 express4.x + node + mongodb 搭建微博雏形。

 笔记 见[博客](http://laibh.top/categories/Nodejs/)

### 启动过程

启动之前，需要先安装 mongodb  服务器，可以到 [官网](https://www.mongodb.com/)

进行安装配置，然后按个人需要，设置本地环境，在这里我设置了 `MongoDB` 为服务名

> cd microblog

进入到 `microblog`目录

> npm i  

安装依赖 

> net start MongoDB

另外打开一个`cmd`,打开 MongoDB 服务,并且找到你的mongodb 安装目录下面的 `bin`,打开`mongo.exe`

接着启动项目

> npm start

