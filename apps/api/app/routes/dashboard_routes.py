from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def dashboard():
    return {"message": "Welcome to Revora Dashboard"}
