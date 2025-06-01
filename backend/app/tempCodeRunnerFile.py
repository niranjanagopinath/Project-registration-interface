from typing import Optional
from fastapi import FastAPI,File,UploadFile,Form,Depends
from sqlalchemy.orm import Session
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from database import engine,Base
from database import sessionlocal 
import models


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
   db:Session=Depends(get_db)
   
):
   db_project=models.Project(
      title=title,
      department=department,
      project_lead=project_lead,
      budget=budget,
      clients=client, 
      startdate=startdate,
      enddate=enddate,
      project_category=project_category,
      brief_description=brief_description,
      filename=filename.filename if filename else None
      su
   )
   
   db.add(db_project)
   db.commit()
   db.refresh(db_project)
   
   return({
      "status":"success",
      "project_id":db_project.id
   })
      
   

   
   
   
   
   
   
