/* eslint-disable default-case */
const { override, fixBabelImports, addWebpackAlias, addLessLoader, addPostcssPlugins, addWebpackPlugin } = require('customize-cra');
const webpack = require('webpack');
const paths = require('react-scripts/config/paths');
const path = require('path');

// 修改打包目录
paths.appBuild = path.join(path.dirname(paths.appBuild), 'dist');
//获取package.json中的scripts启动类型
const ENVIRONMENT = process.env.npm_lifecycle_event;
let serverUrl='', serverUrlWx='';

switch (ENVIRONMENT){
  case 'start':
    serverUrl='//xxx.com/';//开发测试
    serverUrlWx='xxx.com';
  break;
  case 'build:dev':
    serverUrl='//xxx.com';//测试打包
    serverUrlWx='//xxx.com';
  break;
  case 'build:pro':
    serverUrl='//xxx.com';//上线打包
    serverUrlWx='xxx.com';
  break;
}

module.exports = override(
  //设置按需加载 babel-plugin-import
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: 'css',
  }),
  //设置绝对路径别名
  addWebpackAlias({
    'common': path.resolve(__dirname, 'src/common'),
    'components': path.resolve(__dirname, 'src/components'),
    'modules': path.resolve(__dirname, 'src/modules'),
    'reduxs':path.resolve(__dirname,'src/redux'),
    'style': path.resolve(__dirname, 'src/style')
  }),
  //less配置函数
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@fill-body': '#F5F5F5' }
  }),
  //适配通常采用 rem 布局
  addPostcssPlugins([require('postcss-pxtorem')({
    rootValue: 50,
    propList: ['*']
    // propList: ['*', '!border*', '!font-size*', '!letter-spacing'],
    // propWhiteList: []
  }),]),
  //定义使用环境变量
  addWebpackPlugin(new webpack.DefinePlugin({
    'process.env':{
      'SERVER_URL':JSON.stringify(serverUrl),
      'SERVER_URL_WX':JSON.stringify(serverUrlWx)
    }
  })),
);