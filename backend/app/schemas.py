from pydantic import BaseModel
from typing import Optional

class ProjectCreate(BaseModel):
    title:str
    department:str
    budget:str
    client:str
    project_lead:str 
    category:str
    startdate:str
    enddate:str
    brief_description:str
    filename:Optional[str]=None
    submittedby=str 
    approval=str
class ProjectOut(BaseModel):
    id:int
    title:str 
    status:str
    submitted_by:str
    
    
    class Config:
        orm_mode=True
        
    
    