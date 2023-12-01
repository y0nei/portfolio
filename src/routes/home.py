from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse

from src.core.settings import settings
from src.core.templates import templates

home_router = APIRouter()

@home_router.get("/", response_class=HTMLResponse)
async def home(request: Request):
    """
    Display the home page html template
    """

    skills = [
        "html & css",
        "javascript",
        "python",
        "system administration",
        "Rest API's",
        "DevOps",
        "CI/CD"
    ]
    context = {
        "app_name": settings.APP_NAME,
        "skills": skills
    }

    return templates.TemplateResponse(
        "home.html",
        {"request": request, **context}
    )
