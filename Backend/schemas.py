from pydantic import BaseModel

class ImageUploadResponse(BaseModel):
    filename: str
    message: str

class ErrorResponse(BaseModel):
    message: str

class ImageUpload(BaseModel):
    filename : str