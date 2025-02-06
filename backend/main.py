from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from schemas import *
from crud import *
from database import get_db
from sqlalchemy.orm import Session
from fastapi import HTTPException

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 必要に応じて特定のドメインに制限
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/users/")
def create_user_endpoint(user: Create_User_Schema, db: Session = Depends(get_db)):
    # すでに登録されている社員番号があるかチェック
    existing_user = db.query(User).filter(User.employee_no == user.employee_no).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="この社員番号はすでに登録されています")
    
    new_user = create_user(user, db)
    return {"message": "User created successfully", "data": new_user }



@app.get("/users/")
def read_allusers_endopoint(db: Session = Depends(get_db)):
    all_users = read_allusers(db)
    return all_users

@app.delete("/users/{employee_no}")
def delete_user_endpoint(employee_no: str, db: Session = Depends(get_db)):
    target = db.query(User).filter(User.employee_no == employee_no).first()
    if not target:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(target)
    db.commit()

# ユーザー情報更新
@app.put("/users/{employee_no}")
def update_user_endpoint(employee_no: str, user_update: Update_User_Schema, db: Session = Depends(get_db)):
    target = db.query(User).filter(User.employee_no == employee_no).first()
    if not target:
        raise HTTPException(status_code=404, detail="User not found")
    
    # 名前を更新
    target.user_name = user_update.user_name
    db.commit()
    db.refresh(target)



# @app.post("/rooms/")
# def create_room_endpoint(room: Create_Room_Schema, db: Session = Depends(get_db)):
#     new_room = create_room(room, db)  # create_room関数でデータベースに追加
#     return {"message": "Room created successfully", "data": new_room}  # 登録されたデータを返す

# @app.get("/rooms/")
# def read_allrooms_endopoint(db: Session = Depends(get_db)):
#     all_rooms = read_allrooms(db)
#     return all_rooms

# @app.delete("/rooms/{room_id}")
# def delete_room_endpoint(room_id: str, db: Session = Depends(get_db)):
#     target = db.query(Room).filter(Room.room_id == room_id).first()
#     if not target:
#         raise HTTPException(status_code=404, detail="room not found")
#     db.delete(target)
#     db.commit()

# @app.post("/bookings/")
# def create_booking_endpoint(user: Create_User_Schema, db: Session = Depends(get_db)):
#     new_booking = create_booking(user, db)




# @app.get("/")
# def read_root():
#     return {"message": "Hello. FastAPI!"}