## 前言

习惯用markdown记笔记之后，就再也不想用其他的了。。。  
但markdown也有一点非常不爽：图片引用。  
比如vscode里可以用相对路径，但当我们复制文章到其他地方，图片就失效了==

## gitee设置

国内github并不是非常友好，所以这里我们用码云。

### 建立gitee仓库

- 设置仓库为开源；
- 初始化一个readme文件；
- 选择单分支模型；

  ![](http://rc9frlwp7.hn-bkt.clouddn.com/bed1.png)

### 获取token

- 点击`头像 -> 设置 -> 私人令牌 -> 生成私人令牌`，取消全选，只手动勾选projects；
- 注意：这个令牌只会生成一次，需妥善保存下来，后边会用到。

![](http://rc9frlwp7.hn-bkt.clouddn.com/bed2.png)

## 设置PicGo

### 安装PicGo

图库上传管理软件：[下载安装PicGo](https://github.com/Molunerfinn/PicGo/releases)

### 配置PicGo

- 安装插件：
  - 选择`插件设置`，搜索：gitee，找到搜索结果的`gitee-uploader`插件，点击安装；
  
    ![](http://rc9frlwp7.hn-bkt.clouddn.com/bed3.png)

  - 注意：这个插件需要NodeJS环境；
- 配置PicGo: 找到图床设置下的gittee选项进行配置（这里没装好插件就没这个选项）。
  - repo：用户名/仓库名称（仓库地址后面那一段）；
  - branch：分支，填写master；
  - token：填入前面获取的私人令牌；
  - path：路径，一般填写img；
  - customPath：提交消息，可不填；
  - customURL：自定义地址，可不填。
  
  ![](http://rc9frlwp7.hn-bkt.clouddn.com/bed4.png)

## 可以使用啦

现在，点击上传区上传就可以直接把图片上传到gitee仓库中了，然后可以点击相册查看仓库中的所有图片，可以直接复制链接到markdown中使用哦~
