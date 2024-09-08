import React, { useState } from 'react'
import Cookies from 'js-cookie'

function Login(props) {

  const [username,setUserName] = useState('');
  const [password,setPassword] = useState('');

  async function handleLogin() {
    
    if(!username){
      alert('Please enter username');
      return;
    }
    if(!password){
      alert('Please enter password');
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password: password }),
      });
  
      if(response.status===200){
        const data = await response.json();
        Cookies.set('ACCESS_TOKEN', data.ACCESS_TOKEN, { expires: 1, path: '/' });
        alert(data.message);
        props.handleTab('logout')
      }else{
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className='flex flex-col justify-center items-center shadow-xl gap-8 w-50 h-30 mt-6 px-20 py-14'>

      <input onChange={(e)=>setUserName(e.target.value)} className='border border-black p-2 rounded' placeholder='User Name' required/>
      <input onChange={(e)=>setPassword(e.target.value)} className='border border-black p-2 rounded' placeholder='Password'/>
      <button onClick={handleLogin} className='border border-green-700 text-green-700 rounded w-20 h-10 hover:bg-green-700 hover:text-white active:shadow-md active:bg-green-800'>Login</button>

    </div>
  )
}

export default Login