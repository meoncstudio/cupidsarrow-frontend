# Cupids Web

![Annotation 2020-02-23 091226.png](https://i.loli.net/2020/02/24/4WplS2nxBELNFXZ.png)
![Annotation 2020-02-23 091044.png](https://i.loli.net/2020/02/24/6pU8JRyePH2mjQX.png)
![Annotation 2020-02-23 091044.png](https://i.loli.net/2020/02/24/KeP4c8zWYZBCl92.png)
![Annotation 2020-02-23 091103.png](https://i.loli.net/2020/02/24/XkA1TZH24EIw6LY.png)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Proxy
+ Interface: http://www.utcupids.com/api
+ 'util/request.js' functioning as interceptor:
    - Production mode: '' -> 'http://www.utcupids.com/'
    - Development mode: '/devApi' -> 'http://www.utcupids.com/'
