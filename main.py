from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from datetime import datetime
import os
from fastapi.responses import JSONResponse
from dotenv import load_dotenv

from fastapi.staticfiles import StaticFiles


load_dotenv()
# Initialize FastAPI
app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
PHONE_NUMBER = os.getenv("PHONE_NUMBER")

@app.get("/get_phone_number")
def get_phone():
    return JSONResponse(content={"phone_number": PHONE_NUMBER})

# Mount the static files directory
app.mount("/static", StaticFiles(directory="static"), name="static")

# Set up templates directory
templates = Jinja2Templates(directory="templates")


# Route for Home Page
@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("home.html", {"request": request})


# Route for Services Page
@app.get("/services", response_class=HTMLResponse)
async def services(request: Request):
    return templates.TemplateResponse("services.html", {"request": request})



# Route for Appointments Page
@app.get("/appointments", response_class=HTMLResponse)
async def appointments(request: Request):
    today = datetime.now()
    return templates.TemplateResponse("appointments.html", {"request": request, "today": today})


@app.post("/appointments", response_class=HTMLResponse)
async def book_appointment(request: Request, date: str = Form(...), time: str = Form(...)):
    message = f"Appointment booked for {date} at {time}!"
    return templates.TemplateResponse(
        "appointments.html", {"request": request, "message": message}
    )


# Route for About Page
@app.get("/about", response_class=HTMLResponse)
async def about(request: Request):
    return templates.TemplateResponse("about.html", {"request": request})
