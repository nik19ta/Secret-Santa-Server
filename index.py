from flask import Flask, render_template, request, redirect, url_for, make_response, jsonify
import mysql.connector
import random
import json
import ServerConfig

connection = mysql.connector.connect(
        host = ServerConfig.host,
        user = ServerConfig.user,
        password = ServerConfig.password,
        database=ServerConfig.database
)

# mycursor = connection.cursor(buffered=True)

app = Flask(__name__)


@app.route('/add', methods=['GET', 'POST'])
def add():

    try:
        getData = request.json

        aboutMe = getData['aboutMe']
        Name = getData['Name']
        wishList = getData['wishList']
        dontLike = getData['dontLike']
        password = getData['password']
        gmail = getData['gmail']
        branch = getData['branch']
        department = getData['department']

        print(aboutMe,Name,wishList,dontLike)

        mycursor = connection.cursor(buffered=True)
        mycursor.execute(f'INSERT INTO users (aboutMe, Name, wishList, dontLike, password, gmail, branch, department) VALUES ({aboutMe}, {Name}, {wishList}, {dontLike}, {password}, {gmail}, {branch}, {department})')
        connection.commit()
        mycursor.close()

        response = make_response('success', 200)
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response

    except Exception as e:

        response = make_response('error', 400)
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response



@app.route('/AllData', methods=['GET'])
def AllData():

    try:
        mycursor = connection.cursor(buffered=True)
        mycursor.execute(f'select * from users')
        allData = mycursor.fetchall()
        mycursor.close()

        response = make_response({'success':allData}, 200)
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response

    except Exception as e:

        return 'error'


@app.route('/count', methods=['POST, GET'])
def count():

    try:
        mycursor = connection.cursor(buffered=True)
        mycursor.execute('SELECT COUNT(*) FROM users')
        count = mycursor.fetchall()
        mycursor.close()

        response = make_response({'success': count}, 200)
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response

    except Exception as e:

        response = make_response('error', 400)
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
