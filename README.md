# lolth.tools.publisher

用于打包发布网站静态资源的工具库

## 功能说明

#### `postbuild.js` *NODE SCRIPT*

用于在`yarn build`执行后处理编译生成的资源文件

- 为HTML文件中的相对资源路径添加模板占位符，以便WebServer渲染时添加静态资源主机路径

#### `publish` *SHELL*

- 将静态资源发布到服务器，目前仅支持s3，需要预先配置aws-cli

## Git Subtree使用说明

#### 配置项目

使用`git subtree`将该仓库引入到网站前端项目中。

``` shell
git remote add publisher git@bitbucket.org:quasar-ai/lolth.tools.publisher.git
git subtree add --prefix=tools/publisher publisher master
```

然后在前端项目的*package.json*文件中定义脚本：

``` json
{
    ...
    "scripts":{
        ...
        "postbuild": "tools/publisher/postbuild tpl",
        "push": "tools/publisher/publish <S3-BUCKET> <DIST_FOLDER>"
    }
    ...
}
```

其中：

- `postbuild`会在`build`命令（如果有定义）后自动执行，也可手动执行。可以在`postbuild`命令后加入参数作为网站前端的Build输出目录，如`tools/publisher/postbuild dist/release`。
- `push`命令用于在网站编译完成后发布到静态存储空间。两个参数分别为:
  - `S3-BUCKET`: S3存储桶ID，形如`s3://foo-bucket`
  - `DIST_FOLDER`: 要上传文件所在的目录

#### 更新publisher

在前端项目中使用命令：

``` shell
git subtree pull --prefix=tools/publisher publisher master
```

#### 将前端项目中的改动反向推回到publisher

不建议直接将改动推回publisher项目的master分支。如果有修改，请推到hotfix分支，然后在publisher项目中手动处理merge/pull request。

要进行推回操作，请执行如下命令（替换`<FIX_NAME>`为可以简要描述hotfix的一个单词或词组）：

``` shell
git subtree push --prefix=tools/publisher publisher hotfix/<FIX_NAME>
```