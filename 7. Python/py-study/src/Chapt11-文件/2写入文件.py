# 打开文件
f = open('./7. Python/py-study/src/Chapt11-文件/testwtire.txt', 'w', encoding='utf-8')

# 写入文件
## 普通写入
f.write('## write()-普通写入:\n')
f.write('hello world\n')
f.write('hello python\n')
f.write('hello file\n')
## 一次性写入多行
f.writelines(['\n\n## writelines()-一次性写入多行:\n','hello world\n', 'hello python\n', 'hello file\n'])

# 关闭文件
f.close()