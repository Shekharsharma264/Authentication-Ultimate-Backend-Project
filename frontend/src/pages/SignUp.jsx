import React, { useContext, useState } from "react";
import dp from "../assets/dp.webp";
import { dataContext } from "../context/UserContext";
import axios from "axios";

const SignUp = () => {
  let { serverUrl } = useContext(dataContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      let data = await axios.post(
        serverUrl + "/api/signup",
        {
          name,
          email,
          password,
          userName,
        },
        { withCredentials: true }
      );
      console.log(data.data);
    } catch (error) {
      console.log(error.response?.data);
      console.log(error.response?.status);
    }
  };

  return (
    <div className=" w-full h-screen bg-black flex justify-center items-center">
      <div className=" w-[90%] max-w-125 h-150 bg-blue-600 rounded-3xl flex flex-col justify-center items-center gap-20px">
        <h1 className=" text-white font-semibold text-2xl py-3">Sign Up</h1>

        <form
          className="w-full flex flex-col justify-between items-center gap-5"
          onSubmit={handleSignup}
        >
          <div className="w-25 h-25 rounded-full bg-white overflow-hidden relative border-2 border-white">
            <img src={dp} className="w-full h-full" />
            <div className=" absolute w-full h-full bg-black top-0 opacity-0 hover:opacity-50 cursor-pointer flex justify-center items-center text-white text-3xl">
              +
            </div>
          </div>
          <div className="w-[80%]">
            <input
              type="text"
              placeholder="Name"
              className=" bg-amber-50 w-full rounded-xl outline-none border-none px-2.5 py-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            className=" bg-amber-50 w-[80%] rounded-xl outline-none border-none px-2.5 py-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className=" bg-amber-50 w-[80%] rounded-xl outline-none border-none px-2.5 py-3 "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            className=" bg-amber-50 w-[80%] rounded-xl outline-none px-2.5 py-3"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <button className=" bg-black text-xl text-white px-10 py-2.5 rounded-3xl cursor-pointer">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
