from fastapi.templating import Jinja2Templates

templates = Jinja2Templates(
    directory="src/templates",
    # Whitespace control
    lstrip_blocks=True,
    trim_blocks=True
)
