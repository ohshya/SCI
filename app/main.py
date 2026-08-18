from pathlib import Path

from core.database import init_db
from core.exceptions import exception_handler
from core.settings import settings
from fastapi import APIRouter, FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from routes.audit import auditRouter
from routes.auth import authRouter
from routes.system import systemRouter
from routes.users import usersRouter
from starlette.exceptions import HTTPException

ALLOW_METHODS = ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"]
ALLOW_HEADERS = ["Authorization", "Content-Type", "Accept", "Cookie", "Origin"]

DIST = Path(__file__).parent / "dist"
INDEX = DIST / "index.html"

app = FastAPI(
    title="Template",
    version="0.2",
    docs_url=(None, "/docs")[settings.debug],
    redoc_url=(None, "/redoc")[settings.debug],
    openapi_url=(None, "/openapi.json")[settings.debug],
)

app.add_exception_handler(HTTPException, exception_handler)
app.add_exception_handler(RequestValidationError, exception_handler)
app.add_exception_handler(Exception, exception_handler)

app.add_middleware(
    CORSMiddleware,
    expose_headers=["X-Filename", "Content-Disposition"],
    allow_origins=[settings.domain],
    allow_credentials=True,
    allow_methods=ALLOW_METHODS,
    allow_headers=ALLOW_HEADERS,
)

init_db(app)


@app.get("/api/health", status_code=200)
def health():
    return {"status": "up"}


api_router = APIRouter(prefix="/api")
api_router.include_router(usersRouter)
api_router.include_router(authRouter)
api_router.include_router(auditRouter)
api_router.include_router(systemRouter)
app.include_router(api_router)
