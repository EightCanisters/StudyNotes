# 质数判断 - while break else写法
a = 2
n = 14
while a < n:
  if n % a == 0:
    print(n, 'while法-不是质数')
    break
  a += 1
else:
  print(n, 'while法-是质数')
  
# 质数判断 - for break else写法
for i in range(2, n):
  if n % i == 0:
    print(n, 'for法-不是质数')
    break
else:
  print(n, 'for法-是质数')