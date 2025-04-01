s = 'hello world'
print(s[0:4])  # hell
print(s[:4])  # hell
print(s[6:11])  # world
print(s[6:])  # world
print(s[0:4:1])  # hell
print(s[0:4:2])  # hl
print(s[::2])  # hlowrd

# 字符串反转
print(s[-1:-12:-1]) # dlrow olleh
print(s[::-1])  # dlrow olleh