const { override, fixBabelImports, addLessLoader } = require('customize-cra');


 module.exports = override(//重写配置
   fixBabelImports('import', {
     //bable-plugin-import
     libraryName: 'antd', //针对antd
     libraryDirectory: 'es',//对应源码文件夹中的es
   style: true, //自动打包相关的css
   }),
   addLessLoader({
     javascriptEnabled: true,
      modifyVars: { '@primary-color': '#1DA57A' }, //修改less主题颜色
    }),
 );