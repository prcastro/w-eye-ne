import os
import json

import numpy as np
import pandas as pd
from flask import Flask, request

app = Flask(__name__)

UPLOAD_FOLDER = 'images/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

class MockModel:
    def __init__(self):
        self.foods = pd.read_csv("../data/foods.txt", header=None)[0].values
    def predict(self, X):
        return [np.random.choice(self.foods)]

def load_model():
    return MockModel()

@app.route('/food', methods=['POST'])
def food_kind():
    model = load_model()
    file = request.files['file']
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))
    food = model.predict(file)[0]
    return food, 200

@app.route('/wine/<food>', methods=['GET'])
def wine_that_matched(food):
    food_wine = json.load(open('../data/food_wine.json'))
    return food_wine[food]

if __name__ == '__main__':
    app.run(debug=True)
