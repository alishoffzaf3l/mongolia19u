## ivzone2.0基于vite2.0+vue3.0+antdv2+vuex4.0+vuerouter4正式更新发布
此次更新不兼容1.0版本，是重新出发重新整理的一个版本，使用单页面架构(spa). 此版本对antd2的一些常用组件进行了简易封装比如：表格，表单。并且提供了增删改查视图页组件，模态框编辑框组件以及其他组件；在后续将会提供更多的简单方便且灵活的组件。还有此版本是一个纯前端版， 没有和任何后端集成，基于java后端的集成版本还在开发适配中
#### 核心功能
1. 是一套简易美观的基础功能框架(基于antd2的ui组件库)，基本可以开箱即用
2. 提供一套增删改查组件，做了简单封装，使用简单灵活，代码量降低30%+
3. 支持动态路由即从后端生成路由信息，支持从菜单信息中动态生成功能点(增删改查，导入、导出以及其他自定义功能等)
4. 封装antd中table组件的不友好使用方式，可以自定义列的slot
5. 增强ATable组件功能，新增dict和url字段，使得table列可以将值转换成对应的标签(label)比如：使用字典和url
6. 增强options(select,checkbox,autocomplete,tree,radio)等组件，支持使用字典和url动态生成
7. 增强form表单功能， 支持自动根据字段动态生成model数据，支持路径嵌套(a.b)
8. 支持对第三方库独立打包，降低每次应用更新时浏览器缓存失效问题
9. 提供基于antd2ui库封装的其他业务组件库
#### antd2组件扩展
##### 表格组件
##### 表单组件
#### 软件架构
使用vue3+antd2+vuex4+vuerouter4+moment+qs框架以及ui组件库， 没有其余的强依赖


#### 安装教程

1.  xxxx
2.  xxxx
3.  xxxx

#### 使用说明

1.  如果使用过程有问题欢迎pr和提交bug
2.  交流群：97235681
