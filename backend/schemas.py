from pydantic import BaseModel
# from datetime import date, time

class Create_User_Schema(BaseModel):
    employee_no: str
    user_name: str

class Read_User_Schema(BaseModel):
    employee_no: str
    user_name: str

class Update_User_Schema(BaseModel): 
    user_name: str


# class Create_Room_Schema(BaseModel):
#     room_name: str
   

# class Read_Room_Schema(BaseModel):
#     room_id: int
#     room_name: str



# class Create_Booking_Schema(BaseModel):
#     room_id: int
#     date: date
#     start_time: time
#     end_time: time
#     user_name: str
