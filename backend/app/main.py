from typing import Optional,List
from fastapi import FastAPI,File,UploadFile,Form,Depends,Query
from sqlalchemy.orm import Session
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine,Base
from app.database import sessionlocal 
from app import models,schemas
from dotenv import load_dotenv
from datetime import datetime, timedelta

import os
import jwt


load_dotenv('C:/Users/niran/OneDrive/Desktop/javascript/backend/app\.env')  

MANAGER_EMAIL = os.getenv("MANAGER_EMAIL")
JWT_SECRET = os.getenv("JWT_SECRET")
SUPABASE_URL = os.getenv("SUPABASE_URL")
ANON_KEY = os.getenv("ANON_KEY")

from supabase import create_client
supabase = create_client(SUPABASE_URL, ANON_KEY)

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

@app.get("/view-all",response_model=List[schemas.ProjectCreate])
def get_all_projects(db:Session=Depends(get_db)):
      return db.query(models.Project).all()
   
@app.post("/approve",response_model=schemas.ProjectCreate)
def approve_project(project_id:int=Query(...),db:Session=Depends(get_db)):
   project=db.query(models.Project).filter(models.Project.id==project_id).first()
   if project:
      project.approval_status="Approved"
      db.commit()
      db.refresh(project)
      return project
   
   
@app.post("/send-magic-link")

def send_magic_link(req:schemas.Email):
   email=req.email
   if email!=MANAGER_EMAIL:
      return{"message":"no magic link has been sent"}
   

   try:
      response=supabase.auth.sign_in_with_otp({
         "email":email,
         "options":{
            "email_redirect_to":f"http://localhost:5173/approve"
         }
         })
      if response:
         return{"message":"the magic link has been sent"}
      else:
         return{"message":"failed to send message"}
      
   except Exception as e:
      print(f"error sending the magic link")
      return{"message":"error"}


   
   
   
   
   
   
