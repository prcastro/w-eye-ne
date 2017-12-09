import os
import json

import numpy as np
import pandas as pd
from flask import Flask, request

app = Flask(__name__)

UPLOAD_FOLDER = 'images/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route('/food', methods=['POST'])
def food_kind():
    foods = pd.read_csv("../data/foods.txt", header=None)[0].values
    file = request.files['file']
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))
    return np.random.choice(foods), 200


@app.route('/wine/<food>', methods=['GET'])
def wine_that_matched(food):
    food_wine = json.load(open('../data/food_wine.json'))
    return food_wine[food]


if __name__ == '__main__':
    app.run(debug=True)
