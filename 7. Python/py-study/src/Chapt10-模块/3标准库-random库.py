# random: 随机数库
import random
print(random.random()) # 0-1之间的随机浮点数
print(random.randint(1, 100)) # 1-100之间的随机整数
print(random.choice(['apple', 'banana', 'orange'])) # 随机选择一个元素
print(random.choice('asdfghjkl')) # 随机选择一个字符
print(random.sample('asdfghjkl', 3)) # 随机选择3个字符
print(random.sample(range(100), 10)) # 随机选择10个数字

# 生成一个随机字母组成的列表
arr = []
for i in range(20):
  letter = chr(random.randint(ord('A'), ord('Z'))) # 随机生成一个大写字母
  arr.append(letter)
print(arr)