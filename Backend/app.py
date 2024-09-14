from fastapi import FastAPI, File, UploadFile, HTTPException,Form
from fastapi.responses import JSONResponse
from schemas import ImageUploadResponse, ErrorResponse, ImageUpload
import tensorflow as tf
import numpy as np
import os
from PIL import Image
# import PIL
from io import BytesIO
import torch
import utils
import exp
# import torch
import torchvision
from captum.attr import * #captun is the library in torch comprises of several explaination module. In our case we're using 'Occulsion'
from torchvision import transforms
import matplotlib.pyplot as plt
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, File, UploadFile, HTTPException
from PIL import Image
from io import BytesIO


app = FastAPI()

origins = ["*"]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/upload/")
async def upload_file(file: UploadFile = Form(None),email:str = Form(None)):
    contents = await file.read()
    image = Image.open(BytesIO(contents)).convert('RGB')
    user = email.split('@')[0]
    print(user)

    class_name, confidence = utils.predict(image,user)
    # explanation = exp.explanation(image)
    return {"class": class_name, "confidence": confidence}

@app.post("/explanation/")
async def explanation_file(email: str = Form(...)):
    user = email.split('@')[0]
    image_path = user + ".png"
    if not os.path.exists(image_path):
        raise HTTPException(status_code=404, detail="No image has been uploaded yet.")

    # Load and save the image
    with open(image_path, "rb") as img_file:
        image = Image.open(img_file)
        stored_image = image.copy()

    # Generate explanation using the stored image
    explanation = exp.explanation(stored_image)

    return {"explanation": explanation}
