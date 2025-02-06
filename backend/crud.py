from schemas import *
from sqlalchemy.orm import Session
from models import User


# CREATE

def create_user(user: Create_User_Schema , db: Session):
    new_user = User(employee_no=user.employee_no, user_name=user.user_name)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user




# def create_room(room: Create_Room_Schema , db: Session):
#     new_room = Room(room_name=room.room_name)
#     db.add(new_room)
#     db.commit()
#     db.refresh(new_room)
#     return new_room


# REQUEST

def read_allusers(db: Session):
    return db.query(User).all()

# def read_allrooms(db: Session):
#     return db.query(Room).all()