from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from jinjax.catalog import Catalog

_TEMPLATES_DIR = "src/templates"

templates = Jinja2Templates(
    directory=_TEMPLATES_DIR,
    # Whitespace control
    lstrip_blocks=True,
    trim_blocks=True
)

catalog = Catalog(jinja_env=templates.env)
catalog.add_folder(_TEMPLATES_DIR)
catalog.add_folder(f"{_TEMPLATES_DIR}/components")

def render(*args, **kwargs):
    return HTMLResponse(catalog.render(*args, **kwargs))
