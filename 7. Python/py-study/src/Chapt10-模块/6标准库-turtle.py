import turtle
pen = turtle.Turtle() # 创建一个画笔对象
pen.forward(100) # 画直线，向前移动100个单位
pen.speed(0) # 设置画笔速度为最快
pen.right(90) # 右转90度
pen.write("Hello, World!", font=("Arial", 16, "normal")) # 写字，字体为Arial，大小为16，正常

input("Press Enter to exit...") # 等待用户输入，防止窗口立即关闭