try:
  pwd = input('请输入密码：')
  if len(pwd) < 6:
    raise Exception('密码长度不能小于6') # 抛出异常
  else:
    print('密码正确')
except Exception as e:
  print('发生异常了：', e)