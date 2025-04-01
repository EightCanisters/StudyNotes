a = '1234'
b = 1234
print(type(a), type(b)) # <class 'str'> <class 'int'>
print(isinstance(a, str), isinstance(a, bool)) # True False
print(isinstance(b, str), isinstance(b, bool), isinstance(b, int)) # False False True