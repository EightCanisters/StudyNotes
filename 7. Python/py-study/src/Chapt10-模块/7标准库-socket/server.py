import socket
# 创建socket对象
sk = socket.socket()
# 绑定ip和端口号
sk.bind(('0.0.0.0', 6328))
# 设置监听
sk.listen(5)
# 等待客户端连接
conn, addr = sk.accept()
print('客户端连接成功', conn, addr)

while True:
  # 接收客户端的数据
  accept_data = conn.recv(1024).decode('utf-8')
  print('接收到的数据：', accept_data)
  # 发送数据到客户端
  result = '收到！'
  conn.send(result.encode('utf-8'))