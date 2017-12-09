import os
import numpy as np
from keras.optimizers import Adam, SGD
from keras.callbacks import ModelCheckpoint
from keras.layers import *
from keras import backend as K
from keras.preprocessing.image import ImageDataGenerator
import matplotlib.pyplot as plt
from keras.models import Model
from keras.preprocessing import image
from keras.applications.resnet50 import preprocess_input, ResNet50
from keras.callbacks import ModelCheckpoint

np.random.seed(4)

optimizer = Adam(lr=0.001, beta_1=0.9, beta_2=0.999, epsilon=1e-08, decay=0.0)

base_model = ResNet50(include_top=False, weights='imagenet', input_tensor=None, input_shape=None, pooling=None)

x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dense(1024, activation='relu')(x)
outputs = Dense(101, activation='softmax')(x)

model = Model(inputs=base_model.input, outputs=outputs)

for layer in base_model.layers:
    layer.trainable = False

model.compile(optimizer=optimizer, loss='categorical_crossentropy')
model.summary()

target_size = (224, 224)
# TODO normalize data, check preprocessing
train_datagen = ImageDataGenerator(rescale=1./255)
val_datagen = ImageDataGenerator(rescale=1./255)

# TODO split train/val/test
train_path = "/media/5TB/Hackathon/data/food-101/images"
val_path = "/media/5TB/Hackathon/data/food-101/images"

train_generator = train_datagen.flow_from_directory(
        train_path,
        target_size=target_size,
        batch_size=32,
        class_mode='categorical')

validation_generator = val_datagen.flow_from_directory(
        val_path,
        target_size=target_size,
        batch_size=32,
        class_mode='categorical')


model_filename = "weights/resnet_food.h5"
model_checkpoint = ModelCheckpoint(model_filename, monitor='val_loss', save_best_only=True, verbose=1)
history = model.fit_generator(
        train_generator,
        steps_per_epoch=100,
        epochs=1000,
        validation_data=validation_generator,
        validation_steps=20, callbacks=[model_checkpoint])
print("Done")
'''
img_path = 'test.jpg'
img = image.load_img(img_path, target_size=(224, 224))
x = image.img_to_array(img)
x = np.expand_dims(x, axis=0)
x = preprocess_input(x)
out = model.predict(x)
'''
