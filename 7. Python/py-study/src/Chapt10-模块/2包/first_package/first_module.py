author = 'yang'

def add (a, b):
  return a + b

def total(*arr):
  result = 0
  for i in arr:
    result += i
  return result
