from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routers import herbs, formulas, meridians, diseases, syndromes, microbes, clinical, search, admin

app = FastAPI(title="TCM Scholar API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(herbs.router)
app.include_router(formulas.router)
app.include_router(meridians.router)
app.include_router(diseases.router)
app.include_router(syndromes.router)
app.include_router(microbes.router)
app.include_router(clinical.router)
app.include_router(search.router)
app.include_router(admin.router)


@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)


@app.get("/")
def root():
    return {"message": "TCM Scholar API is running"}
