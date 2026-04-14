from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.database import engine
from app.db.base import Base
from app.routes.auth_routes import router as auth_router
from app.routes.dashboard_routes import router as dashboard_router
from app.models import user
from app.routes import campaign_routes
from app.routes import icp_routes
from app.routes import lead_routes
from app.routes import gmail_routes

from app.core.config import settings

app = FastAPI(title=settings.PROJECT_NAME)

cors_origins = settings.CORS_ORIGINS
allow_credentials = settings.CORS_ALLOW_CREDENTIALS

if "*" in cors_origins and allow_credentials:
    allow_credentials = False

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=allow_credentials,
    allow_methods=["*"],
    allow_headers=["*"],
)


Base.metadata.create_all(bind=engine)


app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(dashboard_router, prefix="/dashboard", tags=["Dashboard"])
app.include_router(campaign_routes.router)
app.include_router(icp_routes.router)
app.include_router(lead_routes.router)
app.include_router(gmail_routes.router)

@app.get("/")
def root():
    return {"message": "Revora API Running"}