import os
import json

import numpy as np
import pandas as pd
from keras.models import load_model
from keras.applications.resnet50 import preprocess_input
from keras.preprocessing.image import img_to_array, load_img
from flask import Flask, request

app = Flask(__name__)

UPLOAD_FOLDER = 'images/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def keras_load_model():
    model = load_model('../weights/model-v0.h5')
    return model

def get_label(output):
    output = np.argmax(output)
    return classes[str(output)]

model = keras_load_model()
model._make_predict_function()
classes = json.load(open("../data/classes.json"))

@app.route('/food', methods=['POST'])
def food_kind():
    file = request.files['file']
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))
    img = load_img(os.path.join(app.config['UPLOAD_FOLDER'], file.filename), target_size=(224, 224))
    img_array = img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)
    prediction = model.predict(img_array)
    food = get_label(prediction)
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
