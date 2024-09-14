import torch
from torchvision import transforms
import torch.nn.functional as F
from captum.attr import IntegratedGradients
from PIL import Image

model = torch.load('model.pth', map_location=torch.device('cpu'))
model.eval()

def predict(image, user):
    # Save the input image
    image.save(f"{user}.png")  # save the image with the username

    # Preprocess the image
    preprocess = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])
    image = preprocess(image).unsqueeze(0)  # Add batch dimension

    # Prediction
    with torch.no_grad():
        output = model(image)
        probabilities = F.softmax(output[0], dim=0)

    classes = ["COVID", "PNEUMONIA"]
    class_id = torch.argmax(probabilities).item()
    class_name = classes[class_id]
    confidence = probabilities[class_id].item()
    
    return class_name, confidence

