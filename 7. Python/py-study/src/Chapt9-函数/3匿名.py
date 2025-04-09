# 普通用法
fun = lambda a, b: a + b
print(fun(1, 2)) # 3

# 用map和lambda 为List每一项求平方
a = [1, 2, 3]
# map函数：对可迭代对象的每个元素应用函数，并返回一个迭代器
result = map(lambda x: x ** 2, a) # 对a中的每个元素应用lambda函数
print(list(result)) # [1, 4, 9]

# 用reduce和lambda 做累加
from functools import reduce # 导入reduce函数
list1 = [1, 2, 3, 4, 5]
sum = reduce(lambda x, y: x + y, list1)
print(sum) # 15

# 用reduce和lambda 做过滤偶数
testlist = [1, 2, 3, 4, 5, 6, 7, 8, 9]
oulist = filter(lambda x: x % 2 == 0, testlist) # 过滤偶数
print(list(oulist)) # [2, 4, 6, 8]