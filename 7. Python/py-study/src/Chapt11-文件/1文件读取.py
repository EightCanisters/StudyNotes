# 打开文件
## 相对路径
# f = open('./7. Python/py-study/src/Chapt11-文件/testread.txt', encoding='utf-8')
## 绝对路径
import os
path = os.getcwd()  # 获取当前工作目录的绝对路径
print(path)  # 打印当前工作目录的绝对路径
f = open(path + '/7. Python/py-study/src/Chapt11-文件/testread.txt', encoding='utf-8')

# 读取文件内容
## 读取整个文件
# content = f.read()
## 读取5个字符
# content = f.read(5)
## 读取一行
# content = f.readline()
## 读取所有行，并返回一个列表
content = f.readlines()
print(content)
# 关闭文件
f.close()