# 定义函数
def fa():
  print('python')

# 调用函数
fa()


# 函数参数
def sum(a, b):
  return a + b

print(sum(1, 2))


# 默认参数
def power(x, base=2): # base是默认/缺省参数，默认值为2
  return x ** base
print(power(3))

def infos(name, age = 24, gender = '女'):
  return '大家好，我是%s, 今年%d岁，性别%s' % (name, age, gender)
# 省略传age
jack = infos('jack', gender='男')


# 法一：可变参数，接收元组
def total(*args): # 可变参数，*args表示可以接收任意数量的位置参数，args是一个元组
  sum = 0
  for i in args:
    sum += i
  return sum
print(total(1, 2, 3, 4, 5)) # 15
print(total(*[2,3,4])) # 9


# 法二：可变参数，接收字典
def info(**kwargs): # kwargs是一个字典，接收任意数量的关键字参数
  for key, value in kwargs.items():
    print('%s: %s' % (key, value))
info(**{'name': 'xm', 'age': 18})