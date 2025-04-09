# 使用[]创建列表
list1 = [] # 空列表
list2 = [1, 2, True, 'hello'] # 含有不同类型元素的列表
list3 = list2
print(list1, list2, list3, list2 == list3) 
list2[2]= False
print('list2和list3是否相等：', list2, list3, list2 == list3)

# list(): 类型转换，把参数转换为列表
l1 = list() # 空列表 []
l2 = list('12345678') # 字符串转换为列表 ['1', '2', '3', '4', '5', '6', '7', '8']
print(l1, l2)

# 索引
li1 = list('12345678')
print(li1[7])

# 切片
lis1 = list('12345678')
print(lis1[2:5:2]) # ['3', '5']

# 加法乘法
print([1, 2] + [1, 2]) # [1, 2, 1, 2]
print([1, 2] * 3) # [1, 2, 1, 2, 1, 2]

# 成员运算
print(1 in list('12')) # False
print(1 not in list('12')) # True
print('1' in list('12')) # True

# 比较：列表之间的比较是从左到右逐个元素比较的
print(list('123') < list('3')) # True
print(list('123') < list('13')) # True
print(list('123') < list('124')) # True
print(list('123') < list('122')) # False

# 内置函数
print(len(list('12345678'))) # 8
print(max(list('12345678'))) # 8
print(min(list('12345678'))) # 1
print(sorted(list('3456742'))) # ['2', '3', '4', '4', '5', '6', '7']
print(sum([1,2,3,4,5])) # 15

# 删除某个元素
lista = list('12345678')
del lista[2] # 删除索引为2的元素
print(lista) # ['1', '2', '4', '5', '6', '7', '8']

# 删除变量
listb = list('34423')
del listb # 删除变量listb
# print(listb) # NameError: name 'listb' is not defined

# 遍历
for i in list('12345678'):
  print('索引: ', i)

print(enumerate(list('12345678')))
for i, j in enumerate(list('12345678')):
  print('索引: ', i, '值: ', j)
  

list11 = list('asdfgh')
print(range(len(list11))) # range(0, 6): 0到5的整数
for i in range(len(list11)):
  print(i, list11[i])


# 方法
arr = list('1')
print('append: ', arr.append('9'), arr) # append: None ['1', '9'] 
print('extend: ', arr.extend(['a', 'b']), arr) # extend: None ['1', '9', 'a', 'b'] 
print('insert: ', arr.insert(1, '2'), arr) # insert: None ['1', '2', '9', 'a', 'b']
print('pop: ', arr.pop(), arr) # pop: b ['1', '2', '9', 'a']
print('remove: ', arr.remove('2'), arr) # remove: None ['1', '9', 'a']