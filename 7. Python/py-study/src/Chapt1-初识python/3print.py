# 打印数字
print(2025)

# 打印字符串: 需要被包裹进 ''或者""
print('teststr')

# 打印变量
year = 2025
print(year)

# 打印变量和字符串
print(year, '年，我要减肥！') # year和年之间有空格
print(year, '年，我要减肥！', sep='') # year和年之间没有空格

# 打印空行
print() # 因为print有个参数end，默认为换行
print(year, '年，我要减肥！', end="hlx", sep='')
print() # 因为print有个参数end，默认为换行

# 打印多变量
year = 2025
month = 3
day = 30
week = '日'
weather = '晴'
temprature = 20.5834
# %格式化字符串
print('今天是%d年%d月%d日，星期%s，天气%s' % (year, month, day, week, weather))
# %02d表示占位符，2位，不足2位补0; %.1f表示保留1位小数(四舍五入)
print('今天是%d年%02d月%02d日，星期%s，天气%s,温度%.1f' % (year, month, day, week, weather, temprature))