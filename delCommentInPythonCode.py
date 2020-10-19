file1 = input('Введите название файла у которго надо удалить коментарии:')
file2 = input('Введите название файла в котором будет код без коментариев:')

code = open(file1,"r")
code_back = open(file2,"w")
for line in code:
    if not line.startswith("#"):  #you dont need bracket here
        code_back.write(line)

code.close()
code_back.close()
