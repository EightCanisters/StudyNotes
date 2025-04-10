# 导入整个模块，使用模块名.函数名()或模块名.变量名调用
import first_module
print(first_module.author)
print(first_module.add(1, 2))
print(first_module.total(1, 2, 4, 5))

# 导入模块中的部分函数，使用函数名()或变量名调用
from first_module import add, author
print(author)
print(add(9, 9))

# 导入模块中的所有函数，使用函数名()或变量名调用
from first_module import *
print(author)
print(add(2, 2))
print(total(1, 2, 3, 4, 5))

# 给模块重命名
import first_module as fm
print(fm.author)

# 给导入的某个变量/函数重命名
from first_module import add as addition
print(addition(3, 3))
