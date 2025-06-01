from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base,sessionmaker

DATABASE_URL = "postgresql+psycopg2://postgres.qvcenknyhdyicxcumzel:22May%402005@aws-0-ap-south-1.pooler.supabase.com:6543/postgres"

engine= create_engine(DATABASE_URL)#is how i will establish connection with my database
sessionlocal=sessionmaker(autocommit=False,autoflush=False,bind=engine)#this will create a session where i can send stuff to my database 

Base=declarative_base() #this is what will tell if my class is a table or no


