# and - 短路运算，二元运算符
print(True and False)  # False
print(True and True)  # True
print(False and False)  # False
print(1 == 1 and 2 < 3) # True

print('hello' and 'hi') # hi
print('' and 'hi') # ''
print(False and 'hi') # False
print(0 and 1) # 0

# or - 二元运算符
print(True or False)  # True
print(1 or 0)  # 1
print(2024 or 2025 or 0)  # 2024
print(0 or '' or 888)  # 888

# not - 一元运算符
print(not True)  # False
print(not 1)  # False
print(not 'hello')  # False
print(not '')  # True

# 优先级
print(True and False or not False) # True
print(True or False and True or False) # True