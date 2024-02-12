# webpack优化部分

### 1. 提升开发体验
[sourcemap](https://yk2012.github.io/sgg_webpack5/senior/enhanceExperience.html#sourcemap)
sourcemap是一个用于映射源文件和编译后文件的映射map方案，会讲源码和编译后的代码进行一一对应，映射查找是浏览器去做的

devtool配置用来控制以及如何生成sourcemap，选择不同的sourcemap方式会影响构建以及再次构建的速度
根据习惯：
    - 开发模式用cheap-module-source-map
      - 打包构建很快，只关注行对应关系
    - 生产模式用source-map
      - 打包构建很慢，但是会关注全量的行列对应关系


### 2. 提升打包构建速度
#### HMR 
热更新，提升二次构建效率，当代码更新的时候只打包更新的代码
暂时在本项目中不去考虑HMR原理，只去看怎么用就行，先在devServer中将hot设置为true，style-loader天然支持hmr
否则使用module.hot判断，但是在一些loader比如vue-loader会去做这件事

#### oneOf
匹配loader，只要满足一个就不再使用后面的loader了
```js

{
    rules: [
        oneOf: [
            {
                loader: 'xxxx'
            },
            {
                loader: 'xxx'
            }
        ]
    ]
}
```

#### include / exclude
![Alt text](image.png)

#### js cache
缓存eslint和babel,针对于生产模式
babel需要额外开启options的cache并且关闭cacheCompression
eslint需要开启cache并且指定cacheLocation


### 3. 减少代码体积





### 4. 优化代码运行性能