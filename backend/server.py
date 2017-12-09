import os
import json

import numpy as np
import pandas as pd
from keras.models import load_model
from PIL import Image
from flask import Flask, request

app = Flask(__name__)

UPLOAD_FOLDER = 'images/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


class MockModel:
    def __init__(self):
        self.foods = pd.read_csv("../data/foods.txt", header=None)[0].values
    def predict(self, X):
        return [np.random.choice(self.foods)]

def keras_load_model():
    model = load_model('../data/models/model1.h5')
    return model

def load_model():
    return MockModel()

@app.route('/food', methods=['POST'])
def food_kind():
    model = load_model()
    file = request.files['file']
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))
    img = Image.open(file)
    img_array = np.array(img).astype("float32")
    food = model.predict(img_array)[0]
    return food, 200

@app.route('/wine/<food>', methods=['GET'])
def wine_that_matched(food):
    food_wine = json.load(open('../data/food_wine.json'))
    wine_table = pd.read_csv("../data/wine_table.csv")
    wine_table.index = wine_table.name
    wine = food_wine[food]
    wine_info = wine_table.loc[wine].to_json()
    return wine_info

if __name__ == '__main__':
    app.run(debug=True)
