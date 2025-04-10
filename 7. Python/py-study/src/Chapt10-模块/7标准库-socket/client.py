import socket
# 创建socket对象
sk = socket.socket()
# 连接服务器
sk.connect(('127.0.0.1', 6328))

while True:
    # 发送数据到服务器
    msg = input('请输入要发送的数据：')
    sk.send(msg.encode('utf-8')) # 通信过程要用utf-8编码
    # 等待服务器响应
    data = sk.recv(1024).decode('utf-8') # 相应的内容1024个字节
    print('接收到的数据：', data)