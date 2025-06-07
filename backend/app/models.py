# i will be defining my table schema 

from sqlalchemy import Column,Integer,String,Text
from app.database import Base 

class Project(Base):#now SQLAlchemy would be able to understand that this class has to become a table 
    __tablename__="projects"
    id=Column(Integer,primary_key=True,index=True)
    title=Column(String)
    department=Column(String)
    budget=Column(String)
    clients=Column(String)
    project_lead=Column(String)
    project_category=Column(String)
    start_date=Column(String)
    end_date=Column(String)
    brief_description=Column(Text)
    filename=Column(String)#i will be storing the file name alone
    submitted_by=Column(String,nullable=False)
    approval_status=Column(String,default="pending")

    
    
    
    
    