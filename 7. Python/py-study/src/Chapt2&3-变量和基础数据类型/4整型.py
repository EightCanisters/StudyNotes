# 正数
num = 10
print(num)

# 负数
num1 = -10
print(num1)

# type: <class 'int'>
print(type(num1))

# int将其他类型转换为整型
num2 = input('请输入一个数字：')
print(type(num2)) # <class 'str'>
num2 = int(num2) + 1
print(num2)