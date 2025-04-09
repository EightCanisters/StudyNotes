# range(stop):
r1 = range(10) # 0到9的整数
print(r1) # range(0, 10)
print(type(r1)) # <class 'range'>
# 注意：想要打印出range的内容，需要将其转换为list或tuple
print(list(r1)) # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# range(start, stop)
r2 = range(2, 10) # 2到9的整数
print(r2, tuple(r2)) # range(2, 10) (2, 3, 4, 5, 6, 7, 8, 9)

# range(start, stop, step)
r3 = range(2, 10, 2) # 2到9的偶数
print(r3, list(r3)) # range(2, 10, 2) [2, 4, 6, 8]

# for in
for i in range(10):
  print(i, end=' ') # 0 1 2 3 4 5 6 7 8 9
print('-----------------')

print(str(123), int('123'))