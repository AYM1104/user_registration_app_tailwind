from database import Base, engine
from sqlalchemy import Column, String, Integer, Date, Time, ForeignKey



class User(Base):
    __tablename__ = "users"
    employee_no = Column(String, primary_key=True, index=True, nullable=False)
    user_name = Column(String, index=True)

# class Room(Base):
#     __tablename__ = "rooms"
#     room_id = Column(Integer, primary_key=True, index=True)  # 自動増分の主キー
#     room_name = Column(String, unique=True, index=True)  # 部屋名は一意

# class Booking(Base):
#     __tablename__ = "bookings"
#     booking_id = Column(Integer, primary_key=True, index=True)  # 予約ID
#     room_id = Column(Integer, ForeignKey("rooms.room_id"), nullable=False, index=True)  # 部屋ID（外部キー）
#     date = Column(Date, nullable=False, index=True)  # 予約日
#     startTime = Column(Time, nullable=False)  # 開始時間
#     endTime = Column(Time, nullable=False)  # 終了時間
    

# データベースにテーブルを作成
Base.metadata.create_all(bind=engine)
