import os
import json

import numpy as np
import pandas as pd
from flask_cors import CORS
from keras.models import load_model
from keras.applications.resnet50 import preprocess_input
from keras.preprocessing.image import img_to_array, load_img
from flask import Flask, request

def keras_load_model():
    model = load_model('../weights/model-v1.h5')
    return model


def normalize_probs(unnormalized_probs):
    factor  = sum(top_probs)
    return (np.array(top_probs)/factor).tolist()


def get_label(probabilities):
    probabilities = probabilities[0].astype('float64')
    top_outputs = probabilities.argsort()[-5:][::-1]
    top_probs = [probabilities[output] for output in top_outputs]
    top_probs = normalize_probs(top_probs)
    result = [(prob, classes[str(output)]) for prob, output in zip(top_probs, top_outputs)]
    return result

app = Flask(__name__)
cors = CORS(app)
UPLOAD_FOLDER = 'images/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
model = keras_load_model()
model._make_predict_function()
classes = json.load(open("../data/classes.json"))
wine_table = pd.read_csv("../data/wine_table.csv")
food_wine = json.load(open('../data/food_wine.json'))
wine_table.index = wine_table.name

@app.route('/food', methods=['POST'])
def food_kind():
    file = request.files['file']
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))
    img = load_img(os.path.join(app.config['UPLOAD_FOLDER'], file.filename), target_size=(224, 224))
    img_array = img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)
    prediction = model.predict(img_array)
    foods = get_label(prediction)
    return json.dumps(foods), 200

@app.route('/wine/<food>', methods=['GET'])
def wine_that_matched(food):
    try:
        wine = food_wine[food]
    except KeyError:
        return "Food not found", 404
    wine_info = wine_table.loc[wine].to_json()
    return wine_info

if __name__ == '__main__':
    app.run(debug=True)
