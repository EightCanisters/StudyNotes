s = set()
print(s, type(s)) # set() <class 'set'>
# list -> set
print('用list转: ', set([1, 2, 3, 1])) # 用list转:  {1, 2, 3}
# tuple -> set
print('用tuple转: ', set((1, 2, 3, 1))) # 用tuple转:  {1, 2, 3}
# string -> set
print('用string转: ', set('abc')) # 用string转:  {'a', 'b', 'c'}
# dict -> set: 只取key
print('用dict转: ', set({'a': 1, 'b': 2})) # 用dict转:  {'a', 'b'}

s = {1, 2, 3, 1, 2}
print(s, type(s)) # {1, 2, 3} <class 'set'>
print('-----------------')

# in, not in
s = {1, 2, 3, 1, 2}
print(1 in s) # True
# len
print(len(s)) # 3
# max, min
print(max(s)) # 3
print(min(s)) # 1
# del: 不能删某一个元素, 只能删整个集合
# del s # 删除整个集合
print('-----------------')

# 遍历
s = {1, 2, 3, 1, 2}
for i in s:
    print(i) # 1 2 3

# 交集并集
s1 = {1, 2, 3}
s2 = {2, 3, 4}
# 交集
print(s1 & s2) # {2, 3}
# 并集
print(s1 | s2) # {1, 2, 3, 4}
print('-----------------')

# 去重
score = [80, 90, 80, 70, 60, 90, 100]
print(set(score)) # {100, 70, 80, 90, 60}