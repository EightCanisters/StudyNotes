# 转换为整型
s = '2025'
n = 24.25
s1 = '24.25'
s2 = '15fff'
print(int(s)) # 2025
print(int(n)) # 24
# print(int(s1)) # 报错
# print(int(s2)) # 报错

s3, s4 = True, False
print(int(s3), int(s4)) # 1 0

# 转换为浮点型
print(float(s)) # 2025.0
print(float(s1)) # 24.25
# print(float(s2)) # 报错
print(float(2024)) # 2024.0
print(float(s3), float(s4)) # 1.0 0.0

# 转换为布尔
s = 'sss332'
print(bool(s)) # True
print(bool('')) # False
print(bool('0')) # True
print(bool(333)) # True
print(bool(0)) # False
print(bool(0.0)) # False

# 转换为字符串
print(str(1)) # '1'
print(str(1.0)) # '1.0'
print(str(5.4)) # '5.4'
print(str(True)) # 'True'
print(str(False)) # 'False'

# 进制的转换
print(int('10', 2)) # 2 二进制转十进制
print(int('1a', 16)) # 26 十六进制转十进制