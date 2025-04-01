# 浮点数的计算
n1 = 2.1245
n2 = 3.14159
print(n1 + n2) # 5.26609

# 浮点数的精度问题
n3 = 0.1
n4 = 0.2
print(n3 + n4) # 0.30000000000000004
n5 = round(n3 + n4, 2) # 四舍五入保留两位小数
print(n5) # 0.3

import math
n6 = 2.1245
n7 = 3.14159
print(math.ceil(n6 + n7)) # 6 向上取整
print(math.floor(n6 + n7)) # 5 向下取整