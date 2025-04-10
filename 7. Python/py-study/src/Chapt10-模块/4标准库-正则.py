import re
print(re.match('hello', 'hello world'))  # 匹配''hello world'的开头部分是否是'hello'，返回一个匹配对象
print(re.match(r'\d+', '23456788')) # 匹配'23456788'的开头部分是否是数字，返回一个匹配对象
