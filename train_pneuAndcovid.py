
import os
import glob as gl
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf
from tensorflow.keras import layers, Sequential
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay
from tensorflow.keras.layers import BatchNormalization

# Stuffs
DATASET_PATH = "/home/dgxuser15/sup/Data"
TRAIN_PATH = "/home/dgxuser15/sup/Data/train"
TEST_PATH = "/home/dgxuser15/sup/Data/test"

class CFG:
    EPOCHS = 10
    BATCH_SIZE = 32
    SEED = 42
    TF_SEED = 768
    HEIGHT = 224
    WIDTH = 224
    CHANNELS = 3
    IMAGE_SIZE = (224, 224, 3)

train_images = gl.glob(f'{TRAIN_PATH}/**/*.jpg')
test_images = gl.glob(f'{TEST_PATH}/**/*.jpg')

def generate_labels(image_paths):
    return [_.split('/')[-2:][0] for _ in image_paths]

def build_df(image_paths, labels):
    df = pd.DataFrame({
        'image_path': image_paths,
        'label': generate_labels(labels)
    })
    df['label_encoded'] = df.apply(lambda row: 0 if row.label == 'malignant' else 1, axis=1)
    return df.sample(frac=1, random_state=CFG.SEED).reset_index(drop=True)

train_df = build_df(train_images, generate_labels(train_images))
test_df = build_df(test_images, generate_labels(test_images))


def _load(image_path):
    image = tf.io.read_file(image_path)
    image = tf.io.decode_jpeg(image, channels=3)
    image = tf.image.resize(image, [CFG.HEIGHT, CFG.WIDTH], method=tf.image.ResizeMethod.LANCZOS3)
    image = tf.cast(image, tf.float32) / 255
    return image

train_split_idx, val_split_idx, _, _ = train_test_split(train_df.index, train_df.label_encoded,
                                                        test_size=0.5,
                                                        stratify=train_df.label_encoded,
                                                        random_state=CFG.SEED)

train_new_df = train_df.iloc[train_split_idx].reset_index(drop=True)
val_df = train_df.iloc[val_split_idx].reset_index(drop=True)
augmentation_layer = Sequential([
    layers.RandomFlip(mode='horizontal_and_vertical', seed=CFG.TF_SEED),
    layers.RandomZoom(height_factor=(-0.1, 0.1), width_factor=(-0.1, 0.1), seed=CFG.TF_SEED),
], name='augmentation_layer')

def encode_labels(labels, encode_depth=2):
    return tf.one_hot(labels, depth=encode_depth).numpy()

def create_pipeline(df, load_function, augment=False, batch_size=32, shuffle=False, cache=None, prefetch=False):
    image_paths = df.image_path
    image_labels = encode_labels(df.label_encoded)
    AUTOTUNE = tf.data.AUTOTUNE
    ds = tf.data.Dataset.from_tensor_slices((image_paths, image_labels))
    if augment:
        ds = ds.map(lambda x, y: (augmentation_layer(load_function(x)), y), num_parallel_calls=AUTOTUNE)
    else:
        ds = ds.map(lambda x, y: (load_function(x), y), num_parallel_calls=AUTOTUNE)
    if shuffle:
        ds = ds.shuffle(buffer_size=1000)
    ds = ds.batch(batch_size)
    if cache != None:
       ds = ds.cache(cache)
    if prefetch:
        ds = ds.prefetch(buffer_size=AUTOTUNE)
    return ds

train_ds = create_pipeline(train_new_df, _load, augment=True, batch_size=CFG.BATCH_SIZE,
                           shuffle=False, prefetch=True)
val_ds = create_pipeline(val_df, _load, batch_size=CFG.BATCH_SIZE,
                         shuffle=False, prefetch=False)
test_ds = create_pipeline(test_df, _load, batch_size=CFG.BATCH_SIZE,
                          shuffle=False, prefetch=False)

def cnn_model():
    initializer = tf.keras.initializers.GlorotNormal()
    cnn_sequential = Sequential([
        layers.Input(shape=CFG.IMAGE_SIZE, dtype=tf.float32, name='input_image'),
        layers.Conv2D(16, kernel_size=3, activation='relu', kernel_initializer=initializer),
        layers.Conv2D(16, kernel_size=3, activation='relu', kernel_initializer=initializer),
        layers.MaxPool2D(pool_size=2, padding='valid'),
        layers.Conv2D(8, kernel_size=3, activation='relu', kernel_initializer=initializer),
        layers.Conv2D(8, kernel_size=3, activation='relu', kernel_initializer=initializer),
        layers.MaxPool2D(pool_size=2),
        layers.Flatten(),
        layers.Dropout(0.2),
        layers.Dense(128, activation='relu', kernel_initializer=initializer),
        layers.Dense(2, activation='relu', kernel_initializer=initializer),
    ], name='cnn_sequential_model')
    return cnn_sequential

model_cnn = cnn_model()

def train_model(model, num_epochs, callbacks_list, tf_train_data, tf_valid_data=None, shuffling=False):
    model_history = {}
    if tf_valid_data != None:
        model_history = model.fit(tf_train_data,
                                  epochs=num_epochs,
                                  validation_data=tf_valid_data,
                                  validation_steps=int(len(tf_valid_data)),
                                  callbacks=callbacks_list,
                                  shuffle=shuffling
                                  )
    if tf_valid_data == None:
        model_history = model.fit(tf_train_data,
                                  epochs=num_epochs,
                                  callbacks=callbacks_list,
                                  shuffle=shuffling
                                  )
    return model_history

early_stopping_callback = tf.keras.callbacks.EarlyStopping(monitor='val_loss',
                                                                  patience=3,
                                                           restore_best_weights=True)

reduce_lr_callback = tf.keras.callbacks.ReduceLROnPlateau(monitor='val_loss',
                                                          patience=2,
                                                          factor=0.1,
                                                          verbose=1)

CALLBACKS = [early_stopping_callback, reduce_lr_callback]
METRICS = ['accuracy']

tf.random.set_seed(CFG.SEED)
model_cnn.compile(loss=tf.keras.losses.BinaryCrossentropy(),
                   optimizer=tf.keras.optimizers.Adam(learning_rate=0.001),
                   metrics=METRICS)

print(f'Training {model_cnn.name}.')
print(f'Training on {len(train_new_df)} samples, validating on {len(val_df)} samples.')
print('----------------------------------------------------------')
cnn_history = train_model(model_cnn, CFG.EPOCHS, CALLBACKS, train_ds, val_ds, shuffling=False)

#cnn_evaluation = model_cnn.evaluate(test_ds)

def plot_training_curves(history):
    loss = np.array(history.history['loss'])
    val_loss = np.array(history.history['val_loss'])
    accuracy = np.array(history.history['accuracy'])
    val_accuracy = np.array(history.history['val_accuracy'])
    epochs = range(len(history.history['loss']))
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 3))
    ax1.plot(epochs, loss, label='training_loss', marker='o')
    ax1.plot(epochs, val_loss, label='val_loss', marker='o')
    ax1.fill_between(epochs, loss, val_loss, where=(loss > val_loss), color='C0', alpha=0.3, interpolate=True)
    ax1.fill_between(epochs, loss, val_loss, where=(loss < val_loss), color='C1', alpha=0.3, interpolate=True)
    ax1.set_title('Loss', fontsize=16)
    ax1.set_xlabel('Epochs', fontsize=10)
    ax1.legend()
    ax2.plot(epochs, accuracy, label='training_accuracy', marker='o')
    ax2.plot(epochs, val_accuracy, label='val_accuracy', marker='o')
    ax2.fill_between(epochs, accuracy, val_accuracy, where=(accuracy > val_accuracy), color='C0', alpha=0.3, interpolate=True)
    ax2.fill_between(epochs, accuracy, val_accuracy, where=(accuracy < val_accuracy), color='C1', alpha=0.3, interpolate=True)
    ax2.set_title('Accuracy', fontsize=16)
    ax2.set_xlabel('Epochs', fontsize=10)
    ax2.legend()

#plot_training_curves(cnn_history)
"""
model_checkpoint_callback = tf.keras.callbacks.ModelCheckpoint(
    filepath='pneumoniaAndCovid.h5',
    save_weights_only=True,
    monitor='val_accuracy',
    mode='max',
    save_best_only=True)

CALLBACKS = [early_stopping_callback, reduce_lr_callback, model_checkpoint_callback]
"""
model_cnn.save('pneumoniaAndCovid.h5')

