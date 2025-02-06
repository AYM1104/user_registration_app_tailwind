"use client"

import { useState, useEffect } from "react"
import axios from "axios";

const page = () => {
  const [employeeNo, setEmployeeNo] = useState("");
  const [userName, setUserName] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [editingUserNo, setEditingUserNo] = useState(null); //  編集モード管理
  const [editingUserName, setEditingUserName] = useState(""); //  編集用の名前
  const [filteredUsers, setFilteredUsers] = useState([]); // 検索用のユーザー一覧
  const [searchQuery, setSearchQuery] = useState(""); // 検索キーワード


  // ユーザー一覧を取得する関数
  const fetchAllUsers = async () => {
    const res = await axios.get("http://127.0.0.1:8000/users/");
    setAllUsers(res.data);
    setFilteredUsers(res.data);
  };

  // 初回マウント時にユーザー一覧を取得
  useEffect(() => {
    fetchAllUsers();
  }, []);

  // 検索ボタンを押したら実行
  const handleSearch = () => {
    console.log("検索ワード:", searchQuery);
    if (!searchQuery.trim()) {
      setFilteredUsers(allUsers); // 空なら全ユーザー表示
      return;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = allUsers.filter(
      (user) =>
        user.employee_no.includes(lowerCaseQuery) || // 社員番号で検索
        user.user_name.toLowerCase().includes(lowerCaseQuery) // 名前で検索
    );
    console.log("検索結果:", filtered);
    setFilteredUsers(filtered);
  };

  // ユーザー登録をリクエストする関数
  const handleCreate = async () => {

    console.log("現在の入力値:", { employeeNo, userName });

    if (!employeeNo.trim()) {
      alert("社員番号は必須です");
      return;
    }
    if (!userName.trim()) {
      alert("名前は必須です");
      return;
    }
  
    try {
      const res = await axios.post("http://127.0.0.1:8000/users/", {
        employee_no: employeeNo,
        user_name: userName,
      });
  
      console.log("登録成功:", res.data);
      alert("ユーザー登録が完了しました");
  
      // 入力を空にする
      setEmployeeNo("");
      setUserName("");
      
      // ユーザー一覧を更新
      fetchAllUsers();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.detail); // 「この社員番号はすでに登録されています」を表示
      } else {
        console.error("登録エラー:", error);
        alert("登録に失敗しました");
      }
    }
  };

  // 削除ボタンがクリックされたら呼び出す関数
  const handleDelete = async (employeeNo) => {
    try {
          // DELETEリクエストを送信
          await axios.delete(`http://127.0.0.1:8000/users/${employeeNo}`);
          console.log(`社員番号 ${employeeNo} のユーザーを削除しました`);
          alert("ユーザーを削除しました");
          fetchAllUsers(); // 削除後に一覧を更新
        } catch (error) {
            console.error("削除エラー:", error);
        }
    };

  // ユーザー更新
  const handleUpdate = async (employeeNo) => {
    await axios.put(`http://127.0.0.1:8000/users/${employeeNo}`, {
        user_name: editingUserName, //  編集した名前を送信
    });
    alert("更新が完了しました");
    setEditingUserNo(null); // 編集モード解除
    setEditingUserName(""); // 編集用の名前をリセット
    fetchAllUsers(); // 更新後に一覧を更新
  };


 
  
  return (
    <div className="text-center w-full max-w-[600px] mx-auto">
      <h1 className="font-bold text-2xl mt-6 mb-4">ユーザー登録</h1>

      {/* 入力欄（縦並び） */}
      <div className="flex items-center gap-4 w-full">
        <div className="flex flex-col gap-2 w-full">
          <input 
            type="text" 
            placeholder="社員番号"
            value={employeeNo}
            onChange={(e) => setEmployeeNo(e.target.value)}
            className="
              w-full max-w-[500px] // 幅
              border border-gray-400 // 枠線
              rounded // 角丸
              px-3 py-2 // 余白
            "
          />
          <input 
            type="text" 
            placeholder="名前"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="
              w-full max-w-[500px] // 幅
              border border-gray-400 // 枠線
              rounded // 角丸
              px-3 py-2 // 余白
            "
          />
        </div>

        {/* 登録ボタン（横並び） */}
        <button
          onClick={handleCreate}
          className="
            w-auto max-w-[150px]  /* 幅 */
            bg-blue-500 text-white hover:bg-blue-600  /* 背景色・文字色・ホバー */
            font-bold rounded  /* フォント・角丸 */
            py-3 px-6  /* 余白 */
            transition duration-300  /* アニメーション */
            flex items-center justify-center  /* 横並び & 中央配置 */
            h-[160px]  /* 高さを固定 */
            whitespace-nowrap  /* テキストを折り返さない */
          "
        >
          登録
        </button>
      </div>

      <h1 className="font-bold text-2xl mt-6 mb-4">ユーザー検索</h1>
      {/* 入力欄（縦並び） */}
      <div className="flex items-center gap-4 w-full">
        <div className="flex flex-col gap-2 w-full">
          <input 
            type="text" 
            placeholder="社員番号または名前で検索"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="
              w-full max-w-[500px] // 幅
              border border-gray-400 // 枠線
              rounded // 角丸
              px-3 py-2 // 余白
            "
          />
        </div>

        {/* 登録ボタン（横並び） */}
        <button
          onClick={handleSearch}
          className="
            w-auto max-w-[200px]  /* 幅 */
            bg-blue-500 text-white hover:bg-blue-600  /* 背景色・文字色・ホバー */
            font-bold rounded  /* フォント・角丸 */
            py-2 px-6  /* 余白 */
            transition duration-300  /* アニメーション */
            flex items-center justify-center  /* 横並び & 中央配置 */
            h-[70px]  /* 高さを固定 */
            whitespace-nowrap  /* テキストを折り返さない */
          "
        >
          検索
        </button>
      </div>


      {/* 検索バー + 検索ボタン
      <div className="mt-6 flex justify-center gap-4 w-full">
        <input
          type="text"
          placeholder="社員番号または名前で検索"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-[60%] max-w-[500px] border border-gray-400 rounded px-3 py-2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        >
          検索
        </button>
      </div> */}



      <div>
        <h1 className="font-bold text-2xl mt-6 mb-4">ユーザー一覧</h1>

        {/* 🔹 検索結果がない場合のメッセージ表示 */}
        {filteredUsers.length === 0 ? (
          <p className="text-gray-500 text-center">該当するユーザーが見つかりません</p>
        ) : (
          <ul className="space-y-4">
            {filteredUsers.map((user) => (
              <li 
                key={user.employee_no} 
                className="flex items-center justify-between p-4 border border-gray-300 rounded-lg shadow-md bg-white max-w-lg mx-auto"
              >
                {editingUserNo === user.employee_no ? (
                  // 🔥 編集モード
                  <>
                    <input
                      type="text"
                      value={editingUserName}
                      onChange={(e) => setEditingUserName(e.target.value)}
                      className="border border-gray-400 px-2 py-1 rounded"
                    />
                    <div className="flex flex-col gap-2">
                      <button 
                        onClick={() => handleUpdate(user.employee_no)}
                        className="bg-green-500 text-white font-bold py-1 px-3 rounded hover:bg-green-600 transition"
                      >
                        保存
                      </button>
                      <button 
                        onClick={() => setEditingUserNo(null)}
                        className="bg-gray-500 text-white font-bold py-1 px-3 rounded hover:bg-gray-600 transition"
                      >
                        キャンセル
                      </button>
                    </div>
                  </>
                ) : (
                  // 🔥 通常表示モード
                  <>
                    {/* <span className="text-lg">社員番号: {user.employee_no}, 名前: {user.user_name}</span> */}
                    <div className="flex flex-col text-lg text-left">
                      <span>社員番号: {user.employee_no}</span>
                      <span>名前: {user.user_name}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button 
                        onClick={() => {
                          setEditingUserNo(user.employee_no);
                          setEditingUserName(user.user_name);
                        }}
                        className="bg-gray-500 text-white font-bold py-1 px-3 rounded hover:bg-gray-600 transition"
                      >
                        編集
                      </button>
                      <button 
                        onClick={() => handleDelete(user.employee_no)}
                        className="bg-red-500 text-white font-bold py-1 px-3 rounded hover:bg-red-600 transition"
                      >
                        削除
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      
    </div>
  )
}

export default page



// 最もシンプルなユーザー一覧
// <ul>
// {allUsers.map((user) => (
//   <li key={user.employee_no}>
//     社員番号: {user.employee_no}, 名前: {user.user_name}
//     <button onClick={() => handleDelete(user.employee_no)}>削除</button>
//   </li>
// ))}
// </ul>