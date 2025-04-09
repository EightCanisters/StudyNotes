# 单except
try:
  print('可能出现异常的代码')
  print(1 + '2')
except:
  print('发生异常了')
  
# 多except
try:
  n = int(input('请输入一个数字，作为5的除数：'))
  n = 5 / n
except ZeroDivisionError as e: # 将异常对象赋值给e
  print('除数不能为0', e) # 除数不能为0 division by zero
except:
  print('请输入一个数字')
else:
  print('没有异常，结果是：', n)
finally:
  print('不管有没有异常，都会执行的代码')