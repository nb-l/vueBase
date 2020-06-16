# 基于webpack4.0的vue基础项目搭建
>前言： 作为一个现代javascript 应用程序的静态模块打包器，webpack能将各种资源，如js，css， 图片等作为模块来处理，webpack目前最新的版本是4.0，文章将在4.0 的基础上，从使用者的角度，一步步教你认识并搭建一个简单的webpack配置项目，当然webpack的配置和使用较为丰富且复杂，更多的内容需要参考[webpack官网](https://www.webpackjs.com/)  
>[😀一个配置完整的例子在这里🙄](https://github.com/nb-l/vueBase)

[TOC]
##构建工具包介绍
### chalk
>node终端样式库
```
const log = console.log
// 颜色字体
log( chalk.red("红色") ) 
// 背景色
log( chalk.bgBlue("蓝色背景") )  
// 样式字体
log( chalk.bold("加粗") )
// 多参数
log( chalk.blue("name", "age", "job") )
```
### semver
>语义化版本规范, 实现了版本和版本范围的解析、计算、比较
```
const semver = require('semver')
 
semver.valid('1.2.3') // '1.2.3'
semver.valid('a.b.c') // null
semver.clean('  =v1.2.3   ') // '1.2.3'
semver.satisfies('1.2.3', '1.x || >=2.5.0 || 5.0.0 - 7.2.3') // true
semver.gt('1.2.3', '9.8.7') // false
semver.lt('1.2.3', '9.8.7') // true
semver.valid(semver.coerce('v2')) // '2.0.0'
semver.valid(semver.coerce('42.6.7.9.3-alpha')) // '42.6.7'
```
>主版本号[MAJOR].次版本号[MINOR].修订号[PATCH]，版本号递增规则如下：
>1. 主版本号：当做了不兼容的 API 修改
>2. 次版本号：当做了向下兼容的功能性新增
>3. 修订号：当做了向下兼容的问题修正
>[版本规划化](https://www.jianshu.com/p/a7490344044f)
### shelljs
>shelljs是Unix Shell在Node.js API层的轻量级实现，可以支持Windows、Linux、OS X。你可以像在Unix命令行敲命令一样书写代码 [shelljs使用介绍](https://www.kancloud.cn/outsider/clitool/313191#exec_59)
```
var shell = require('shelljs');

//判定git命令是否可用
if (!shell.which('git')) {
	//向命令行打印git命令不可用的提示信息
    shell.echo('Sorry, this script requires git');
    //退出当前进程
    shell.exit(1);
}

//先删除'out/Release'目录
shell.rm('-rf', 'out/Release');
//拷贝文件到'out/Release'目录
shell.cp('-R', 'stuff/', 'out/Release');

//切换当前工作目录到'lib'
shell.cd('lib');
//shell.ls('*.js')返回值是一个包含所有js文件路径的数组
shell.ls('*.js').forEach(function(file) {//遍历数组
	//sed命令用于文件内容的替换，这里是对每个文件都执行如下3步操作，更改版本信息
    shell.sed('-i', 'BUILD_VERSION', 'v0.1.2', file);
    shell.sed('-i', /^.*REMOVE_THIS_LINE.*$/, '', file);
    shell.sed('-i', /.*REPLACE_LINE_WITH_MACRO.*\n/, shell.cat('macro.js'), file);
});
//切换当前工作目录到上一层
shell.cd('..');

//同步执行git命令提交代码
if (shell.exec('git commit -am "Auto-commit"').code !== 0) {
    shell.echo('Error: Git commit failed');
    shell.exit(1);
}
```
###html-webpack-plugin
>动态生成html文件，根据配置可以将打包后成的文件注入到该html文件
```
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var webpackConfig = {
  entry: 'index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js'
  },
  plugins: [new HtmlWebpackPlugin()]
};
```
将会生成如下代码
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>webpack App</title>
  </head>
  <body>
    <script src="index_bundle.js"></script>
  </body>
</html>
```
进阶应用：
1. 提前准备一个html模板文件
```
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport"
    content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, minimal-ui">
  <title></title>
</head>

<body>
  <div id="app"></div>
  <!-- <%= htmlWebpackPlugin.options.vconsole %> -->
</body>

</html>
```

2. 配置html-webpack-plugin
>模板中可以通过htmlWebpackPlugin.options.vconsole引入配置对象里里面的属性
```
	var confg = {
      template: filePath, //filePath模板文件路径
      filename: filename + '.html', //生成的html文件路径
      chunks: ['manifest', 'vendor', 'common', filename], //要注入的经过webpack打包生成的js chunk
      inject: true
    }

    confg.vconsole = <script type="text/javascript" src="./path/to/js/*.js"></script>'

    if (process.env.NODE_ENV === 'production') {
      confg = merge(confg, {
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        }
      })
    }
new HtmlWebpackPlugin(confg)
```
### 。。。。
> 还有其余的一些可以通过标题的例子看到使用方法，就不一一列出了
## webpack4.0的代码分割
```
optimization: {
    runtimeChunk: {
      "name": "manifest"
    },
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          enforce: true,
          priority: 10,
          name: 'vendor'
        },
        common: {
          chunks: "all",
          minChunks: 2,
          name: 'common',
          enforce: true,
          priority: 5
        },
        styles: {
          name: 'styles',
          test: /\.(s*)css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
```



