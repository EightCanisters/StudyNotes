age = input('请输入你的年龄：') # input()返回的是字符串类型
# print(type(age)) # 打印类型, 结果为<class 'str'>
year = 2025
# print(type(year)) # 打印类型, 结果为<class 'int'>
# 类型转换：int()将字符串转换为整数类型
birth = year - int(age)
print('你的出生年份是', birth)