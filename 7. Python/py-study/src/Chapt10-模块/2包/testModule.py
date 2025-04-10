# 导入某个模块
from first_package import first_module
print(first_module.author) # yang
print(first_module.add(1, 2)) # 3

# 导入所有模块
from first_package import *
print(first_module.author) # yang