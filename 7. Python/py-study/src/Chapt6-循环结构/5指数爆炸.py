# 纸对折，纸的厚度
n = 0.1 #一张纸的厚度
total = n # 对折后厚度
for i in range(50):
  total *= 2
  print('第%d次对折后厚度为%.2f' % (i + 1, total))