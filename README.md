# HealthLens

A web application for analyzing chest X-ray images to detect COVID-19 and pneumonia using machine learning.

## Overview

This project includes a backend built with FastAPI and a frontend built with React. The backend uses TensorFlow, PyTorch, and other libraries to process images, while the frontend provides a user interface for uploading images and viewing results.

## Prerequisites

Ensure you have the following installed:

- Python 3.x
- Node.js and npm (for the frontend)

## Setup and Installation

### Backend Setup

1. **Create and activate a virtual environment:**

    ```bash
    python -m venv venv
    .\venv\Scripts\Activate
    ```

2. **Upgrade pip:**

    ```bash
    pip install --upgrade pip
    ```

3. **Install the required packages:**

    ```bash
    pip install fastapi uvicorn
    pip install tensorflow
    pip install Pillow
    pip install torch torchvision torchaudio
    pip install captum
    pip install python-multipart
    ```

4. **Verify TensorFlow installation:**

    ```bash
    python -c "import tensorflow as tf; print(tf.__version__)"
    ```

5. **Run the backend server:**

    ```bash
    uvicorn app:app --reload
    ```

### Frontend Setup

1. **Navigate to the frontend directory:**

    ```bash
    cd Frontend
    ```

2. **Install the necessary npm packages:**

    ```bash
    npm install
    ```

3. **Start the React application:**

    ```bash
    npm run dev
    ```

   Use `axios` for making API calls from the React app.

## Dataset and Model

- **Dataset:** [Chest X-ray COVID-19 Pneumonia Dataset](https://www.kaggle.com/datasets/prashant268/chest-xray-covid19-pneumonia/data)

   This dataset is used to train and evaluate the machine learning models for image classification tasks.

## Usage

1. **Upload an image** through the React frontend.
2. **The image will be processed** by the FastAPI backend.
3. **Results** will be displayed on the frontend, indicating whether the image shows signs of COVID-19 or pneumonia.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or issues, please contact [Your Name](mailto:your-email@example.com).
