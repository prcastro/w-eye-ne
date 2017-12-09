import os
import json
from flask import Flask, request

app = Flask(__name__)

UPLOAD_FOLDER = 'images/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route('/food', methods=['POST'])
def food_kind():
    file = request.files['file']
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))
    return json.dumps({'success': True}), 200, {'ContentType':'application/json'}


@app.route('/wine/<food>', methods=['GET'])
def wine_that_matched(food):
    return "cabernet"


if __name__ == '__main__':
    app.run(debug=True)
