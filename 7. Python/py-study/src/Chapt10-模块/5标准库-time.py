import time
# 获取当前时间的时间戳
print(time.time())

# 获取当前时间的元组
t = time.localtime()
print(t, type(t)) # type是time.struct_time
print(t.tm_year) # 年
print(t.tm_mon) # 月

# 格式化时间
s = time.strftime('%Y-%m-%d %H:%M:%S', t)
print(s) # 2025-04-10 08:28:05