from pydantic import BaseModel
from typing import Optional

class ProjectCreate(BaseModel):
    title:str
    department:str
    budget:str
    clients:str
    project_lead:str 

    project_category:str
    start_date:str
    end_date:str
    brief_description:str
    filename:Optional[str]=None
    submitted_by:str 
    approval_status:str
class ProjectOut(BaseModel):
    id:int
    title:str 
    approval_status:str
    submitted_by:str
    
    
    class Config:
        orm_mode=True
        
    
    