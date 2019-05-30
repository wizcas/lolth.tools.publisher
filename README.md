# lolth.tools.publisher

用于打包发布网站静态资源的工具库

## 功能说明

##### `postbuild.js` *NODE SCRIPT*

用于在`yarn build`执行后处理编译生成的资源文件

- 为HTML文件中的相对资源路径添加模板占位符，以便WebServer渲染时添加静态资源主机路径

##### `publish` *SHELL*

- 将静态资源发布到服务器，目前仅支持s3，需要预先配置aws-cli