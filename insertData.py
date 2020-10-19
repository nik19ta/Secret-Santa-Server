import ServerConfig
import names
import random

def password(arg):
    keys = 'qwertyuioplkjhgfdsazxcvbnmMNBVCXZASDGHJKLOIUYTREWQ1234567890'

    password = ''
    for i in range(arg):
        password += str(keys[random.randint(0, 59)])
    return password

def gmail(arg):
    keys = 'qwertyuioplkjhgfdsazxcvbnmMNBVCXZASDGHJKLOIUYTREWQ'

    password = ''
    for i in range(arg):
        password += str(keys[random.randint(0, 49)])

    return password + str('gmail.com')

def randomNames():
    return names.names[random.randint(0,len(names.names))]


print(gmail(18))
print(password(18))
print(randomNames())
