#### 1. 生成工作用的SSH-key

```shell
# 输入命令：
$ ssh-keygen -t rsa -C "v-linxhu@microsoft.com" -f ~/.ssh/asd-angular-rsa
```

#### 2. 生成自用github的SSH-key

```shell
# 输入命令：
$ ssh-keygen -t rsa -C "ahuang6328@163.com" -f ~/.ssh/own-github
```

#### 3. 复制公钥到各网站

- 打开C:\Users\v-linxhu\.ssh可以看到生成的ssh：
![git-ssh](http://rc9frlwp7.hn-bkt.clouddn.com/git-ssh.png)
- 复制公钥到各网站

#### 4. 添加私钥

其实就是将秘钥和远程仓库的对应关系添加在known_hosts文件中

```shell
# 挨个添加
## 1
$ ssh-add ~/.ssh/asd-angular-rsa

## 2
$ ssh-add ~/.ssh/asd-angular-rsa
```

如果提示"Could not open a connection to your authentication agent"，可以执行命令：

```shell
# 执行下面这条命令后再执行ssh-add命令
$ ssh-agent bash

# 下面可省略

## 可以通过 ssh-add -l 来确认私钥列表
$ ssh-add -l

## 可以通过 ssh-add -D 来清空私钥列表
$ ssh-add -D
```

#### 5. 修改配置文件

```shell
# 若.ssh目录下无config文件，那么创建
$ touch config

# config文件中添加以下内容：

# gitee 码云
Host gitee.com ## Host 这个指明的是HOST地址,也就是项目的HostName，如：git@gitee.com:ghostgithub/xUtils.git   gitee.com就是其对应的Host(访问的项目的地址)
HostName gitee.com  ## HostName 就是访问的地址，如：https://gitee.com/   就是其HostName（IP地址，访问的码云的网页上的url地址）  （https://建议不要加上）
PreferredAuthentications publickey  ## 指明配置的是公钥
IdentityFile ~/.ssh/gitee-rsa ## 指定弓腰的位置及文件
# gitlab
Host gitlab.com
HostName gitlab.com  
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa
# github
Host github.com
HostName github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/github_rsa

```

#### 6.测试

```shell
$ ssh -T git@github.com

#输出
Welcome to GitLab, your name!
```
