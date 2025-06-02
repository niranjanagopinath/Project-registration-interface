from typing import Optional,List
from fastapi import FastAPI,File,UploadFile,Form,Depends,Query
from sqlalchemy.orm import Session
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine,Base
from app.database import sessionlocal 
from app import models,schemas


app=FastAPI()

Base.metadata.create_all(bind=engine)

app.add_middleware(
   CORSMiddleware,
   allow_origins=["http://localhost:5173"],
   allow_credentials=True,
   allow_methods=["*"],
   allow_headers=["*"],
   
   
)

def get_db():
   db=sessionlocal()
   try:
      yield db 
   finally:
      db.close()
      
   

@app.post("/register")
async def register_project(
   title:str=Form(...),
   department:str=Form(...),
   project_lead:str=Form(...),
   budget:str=Form(...),
   client:str=Form(...),
   startdate:str=Form(...),
   enddate:str=Form(...),
   project_category:str=Form(...),
   brief_description:str=Form(...),
   filename:Optional[UploadFile]=File(None),
   email:str=Form(...),
   db:Session=Depends(get_db)
   
   
):
   db_project=models.Project(
      title=title,
      department=department,
      project_lead=project_lead,
      budget=budget,
      clients=client, 
      start_date=startdate,
      end_date=enddate,
      project_category=project_category,
      brief_description=brief_description,
      submitted_by=email,
      filename=filename.filename if filename else None
   )
   
   db.add(db_project)
   db.commit()
   db.refresh(db_project)
   
   return({
      "status":"success",
      "project_id":db_project.id
   })

@app.get("/myproj",response_model=List[schemas.ProjectOut])
def get_projects(email: str=Query(...),db:Session=Depends(get_db)):
      projects=db.query(models.Project).filter(models.Project.submitted_by==email).all()
      return projects


   
   
   
   
   
   
