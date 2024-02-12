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




### 3. 减少代码体积





### 4. 优化代码运行性能