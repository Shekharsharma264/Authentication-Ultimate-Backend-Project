import React, { useContext, useRef, useState } from "react";
import dp from "../assets/dp.webp";
import { dataContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  let navigate=useNavigate();
  let { serverUrl } = useContext(dataContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  let [frontendImage,setFrontendImage]=useState(dp)
  let [BackendImage,setBackendImage]=useState(null)

  let file=useRef(null);

  let handleImage=(e)=>{
    let uploadedImage=e.target.files[0]
    setBackendImage(uploadedImage)

    let profileImage=URL.createObjectURL(uploadedImage)
    setFrontendImage(profileImage)
  }
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      let formData=new FormData()
      formData.append("name",name)
      formData.append("email",email)
      formData.append("password",password)
      formData.append("userName",userName)
      if(BackendImage){
        formData.append("profileImage",BackendImage)
      }

      let data = await axios.post(
        serverUrl + "/api/signup",formData,
        { withCredentials: true,
          headers:{"Content-Type":"mulpart/form-data"}
         }
      );
      alert("Successfully SignUp!!!")
      console.log(data.data);
    } catch (error) {
      alert(error.data.response.message)
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
          <input type="file" hidden ref={file} onChange={handleImage}/>
          <div className="w-25 h-25 rounded-full bg-white overflow-hidden relative border-2 border-white">
            <img src={frontendImage} className="w-full h-full" />
            <div className=" absolute w-full h-full bg-black top-0 opacity-0 hover:opacity-50 cursor-pointer flex justify-center items-center text-white text-3xl" onClick={()=>{file.current.click()}}>
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

          <p className=" cursor-pointer" onClick={()=>navigate("/login")}>Already have an account? <span className=" text-[white]">LogIn</span></p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
