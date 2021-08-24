```javascript
//vue3安装vite使用以下指令
npm init @vitejs/app {name}
//使用淘宝镜像安装依赖，速度比npm快很多
cnpm i
//运行vite使用以下指令
npm run dev
//打包使用以下指令
npm run build
```

---

后台数据是通过本地express服务器来的，所以也必须要运行本地服务器。

可以通过以下两种方式获取服务端数据

```
git@github.com:Sunmoon-Mimir/eleme-express-server.git
https://github.com/Sunmoon-Mimir/eleme-express-server.git
```

拉取服务端文件后，安装服务端依赖

```
npm i express --save
```

数据是使用axios请求来的，所以也需要安装axios，在控制台运行以下命令

```
cnpm i axios -S
```

服务端文件和axios都搞定了，下面需要运行服务端

```
node app.js
```

