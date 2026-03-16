from pydantic import BaseModel, EmailStr

class SignupSchema(BaseModel):
    full_name: str
    email: str
    password: str
    confirm_password: str
    company_name: str
    role: str

class LoginSchema(BaseModel):
    email: str
    password: str