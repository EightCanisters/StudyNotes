s1 = 'hello world'

# 索引
print('索引:', s1[2]) # l
# s1[0]= 'H' # 报错, 字符串不支持修改某一项元素
# 加法+
print('加法:', s1 + ' python') # hello world python
# 乘法*
print('乘法:', s1 * 3) # hello worldhello worldhello world
# len
print('len:', len(s1)) # 11
# max, min
print('max:', max(s1)) # w
print('min:', ord(min(s1))) #32, min(s1)是字符" "，ord(min(s1))是字符" "的ASCII码
# del
# del s1[2] # 报错, 字符串不支持删除某一项元素
# del s1 # 删除变量s1
# print('del:', s1) # NameError: name 's1' is not defined

# 成员in, not in
print('in:', 'hello' in s1) # True
print('not in:', 'hello' not in s1) # False
# 比较: 字符串之间的比较是从左到右逐个字符比较的
print('比较:', 'abcd' < 'abcde') # True
print('比较:', 'cd' < 'abcde') # False
print('-----------------')

# 遍历
# for i in str:
s1 = 'hello world'
for i in s1:
  print('索引:', i)
  
# for i,j in enumerate(str):
for i, j in enumerate(s1):
  print('enumerate索引:', i, '值:', j)

# for i in range(num):
for i in range(len(s1)):
  print('range索引:', i, s1[i])

print('-----------------')

# 类型转换
# int -> str: 
print(str(12), type(str(12))) # 12 <class 'str'>
# list -> str: 将列表一整个都转成了str，包含了中括号和逗号
print(str([1, 2, 3]), type(str([1, 2, 3]))) # [1, 2, 3] <class 'str'>
# tuple -> str: 将元组一整个都转成了str，包含了中括号和逗号
print(str((1, 2, 3)), type(str((1, 2, 3)))) # (1, 2, 3) <class 'str'>
print('-----------------')

