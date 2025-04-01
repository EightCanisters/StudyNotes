# 字符串运算
str1 = 'hello'
print(str1 + ' world')  # 字符串拼接, hello world
print(str1 * 3)  # 字符串重复, hellohellohello
print(3 * str1)  # 字符串重复, hellohellohello

# 加\ - 转义
str2 = '1234\'\"5678'
print(str2)  # 打印出1234'"5678

# 注意：数字和字符串不能拼接/相加
n = 5
print(str1 + n) # TypeError: can only concatenate str (not "int") to str