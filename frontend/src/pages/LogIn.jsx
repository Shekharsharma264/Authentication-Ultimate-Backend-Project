import React, { useContext, useState } from "react";
import { dataContext } from "../context/UserContext";
import axios from "axios";

const LogIn = () => {
  let { serverUrl } = useContext(dataContext);

  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const handleLogin=async (e)=>{
    e.preventDefault()
    try {
      let data = await axios.post(
        serverUrl + "/api/login",
        {
          password,
          userName,
        },
        { withCredentials: true }
      );
      alert("Successfully logIn!!!")
      console.log(data.data);
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return (
    <div className=" w-full h-screen bg-black flex justify-center items-center">
      <div className=" w-[90%] max-w-125 h-150 bg-blue-600 rounded-3xl flex flex-col justify-center items-center gap-20px">
        <h1 className=" text-white font-semibold text-2xl py-3">LogIn</h1>

        <form
          className="w-full flex flex-col justify-between items-center gap-5"
          onSubmit={handleLogin}
        >
          <input
            type="text"
            placeholder="Username"
            className=" bg-amber-50 w-[80%] rounded-xl outline-none px-2.5 py-3"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className=" bg-amber-50 w-[80%] rounded-xl outline-none border-none px-2.5 py-3 "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className=" bg-black text-xl text-white px-10 py-2.5 rounded-3xl cursor-pointer">
            LogIn
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
