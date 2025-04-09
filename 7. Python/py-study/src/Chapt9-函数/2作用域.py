num1 = 10 # 全局变量
def f():
  num2 = 20 # 局部变量
  global num1 # 声明f中使用的num1是全局变量num1
  num1 = 30 # 全局变量
  print('f内-num1,num2: ', num1, num2) # 30 20

print('f调用前-num1: ',num1) # 10
f()
print('f调用前后num1: ',num1) # 30

list1 = [1, 2, 3]
def f1():
  list1.append(4) # 修改全局变量list1
  print('f1内list1: ', list1) # [1, 2, 3, 4]

print('f1调用前list1: ', list1) # [1, 2, 3]
f1()
print('f1调用后list1: ', list1) # [1, 2, 3, 4]