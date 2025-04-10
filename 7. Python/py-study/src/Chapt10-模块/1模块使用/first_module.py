author = 'yang'

def add (a, b):
  global author
  print(author)
  return a + b

def total(*arr):
  result = 0
  global author
  print('total 1',author)
  author = 'total yang'
  print('total 1',author)
  for i in arr:
    result += i
  return result
