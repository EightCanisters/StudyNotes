d = {
  'name': 'zhangsan',
  'age': 18
}
print(d, type(d)) # {'name': 'zhangsan', 'age': 18} <class 'dict'>

# 增
d['height'] = 179
print(d) # {'name': 'zhangsan', 'age': 18, 'height': 179}

# 查
print(d['name']) # zhangsan

# 改
d['name'] = 'lisi'
print(d) # {'name': 'lisi', 'age': 18, 'height': 179}

# 删
del d['age']
print(d) # {'name': 'lisi', 'height': 179}

# in
print('name' in d) # True
print('-----------------')

# 遍历
d1 = {
  'name': 'zhangsan',
  'age': 18
}
for key in d1:
    print(key, d1[key]) # name zhangsan, age 18
print('-----------------')

print(d1.items()) # dict_items([('name', 'zhangsan'), ('age', 18)])
print(d1.keys()) # dict_keys(['name', 'age'])
print(d1.values()) # dict_values(['zhangsan', 18])
for k, v in d1.items():
    print(k, v) # name zhangsan, age 18

print('-----------------')
print(len(d1)) # 2
print(max(d1)) # name
print(min(d1)) # name