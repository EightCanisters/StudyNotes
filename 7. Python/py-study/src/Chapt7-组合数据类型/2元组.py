t1 = (1, True, 'hello')
print(t1) # (1, True, 'hello')
print(type(t1)) # <class 'tuple'>

# 注意：元组只有一个元素时，必须加逗号，否则会被当成普通括号
t2 = (1)
print(t2) # 1
t2 = (1,)
print(t2) # (1,)

# 空元组
print(tuple()) # ()

# tuple()函数：将参数转换为元组, 参数可以是任何interable的数据类型，返回一个元组
# str -> tuple: 将字符串转换为元组，元组的元素是字符串的每一个字符
print(tuple('123')) # ('1', '2', '3')
# list -> tuple: 将列表转换为元组，元组的元素是列表的每一个元素
print(tuple([1, 2, 3])) # (1, 2, 3)

print('-----------------')
# tuple转其他
# tuple -> list: 将元组转换为列表，列表的元素是元组的每一个元素
print(list((1, 2, 3))) # [1, 2, 3]
# tuple -> str: 将元组转换为字符串，是将元组整个都转成了字符串(包括号和逗号都在里面)
str1 = str((1, 2, 3))
print(str1, str1[2]) # (1, 2, 3) ,
print('-----------------')

# 序列的通用操作
tu1 = (1, True, 'hello')
# 索引
print(tu1[2]) # hello
# tu1[2] = 'world' # TypeError: 'tuple' object does not support item assignment
# 切片
print(tu1[::-1]) # ('hello', True, 1)
# len
print(len(tu1)) # 3

# max: 不支持含str元素的元组
# print(max(tu1)) # TypeError: '>' not supported between instances of 'str' and 'int'
print(max((1, 2, 3))) # 3
print(max((1, 2, 3, False))) # 3
# min: 不支持含str元素的元组
# print(min(tu1)) # TypeError: '<' not supported between instances of 'str' and 'int'
print(min((1, 2, 3))) # 1
print(min((1, 2, 3, False))) # False

# 加法+
print((1,2) + (3,2)) # (1, 2, 3, 2)
# 乘法*
print((1,2) * 3) # (1, 2, 1, 2, 1, 2)
# 成员in, not in
print(1 in (1,2)) # True
print(1 not in (1,2)) # False
print('-----------------')

# 通用方法
tu1 = (1, True, 'hello')
print('count:', tu1.count(True)) # 打印2，注意：True和1是相等的，所以count会统计2次
print('index:', tu1.index('hello')) # 2
print('-----------------')

# 遍历
tu1 = (1, True, 'hello')
for i in tu1:
  print('索引: ', i)
  
for i, j in enumerate(tu1):
  print('enumerate索引: ', i, '值: ', j)
  
for i in range(len(tu1)):
  print('range索引: ', i, '值: ', tu1[i])