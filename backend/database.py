from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


# データベースを準備
DATABASE_URL = "sqlite:///./reservation.db"

# FastAPIとデータベースを繋ぐ接続設定
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

# テーブル用のベースモデルを作成
Base = declarative_base()

# セッション管理
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

