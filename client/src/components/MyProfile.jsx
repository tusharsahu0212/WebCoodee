import React, {useState, useEffect} from 'react'
import axios from 'axios';


function MyProfile() {

    const [userName,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')

    useEffect(()=>{

        try {
            axios.get('http://localhost:8000/getUserName', {
                withCredentials: true
            }).then(response => {
                if (response.status === 200) {
                    setUserName(response.data.username)
                } else if (response.status === 500) {
                    alert(response.data.message)
                }
            }).catch(error=>{
                console.log(error)
            })
        } catch (error) {
            console.log(error)
        }

    },[]);

    async function handleChangePassword(){

        if(!password){
            alert("Please enter a new Password")
            return
        } 
        if(!confirmPassword){
            alert("Please enter Confirm Password")
            return
        } 
        if(password !== confirmPassword){
            alert("Password dosen't match")
            return  
        } 



        try {

            const formData = new FormData()
        
            formData.append('newPassword', password)
            formData.append('confirmPassword', confirmPassword)
            
            axios.patch('http://localhost:8000/changePassword', formData, {
                withCredentials: true
            }).then(response => {
                alert(response.data.message)
            }).catch(error=>{
                console.log(error)
            })

        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='flex flex-col justify-center items-center shadow-xl gap-8 w-50 h-30 mt-6 px-20 py-14'>

        <div className='flex gap-1'>
            <div>User Name:</div>
            <div>{userName}</div>
        </div>

        <div className='flex gap-1'>
            <div>New Password:</div>
            <input onChange={(e)=>setPassword(e.target.value)} type="text" className='border border-black p-2 rounded' placeholder='Enter New Password'/>
        </div>

        <div className='flex gap-1'>
            <div>Confirm Password:</div>
            <input onChange={(e)=>setConfirmPassword(e.target.value)} type="text" className='border border-black p-2 rounded' placeholder='Confirm Password'/>
        </div>

        <button onClick={handleChangePassword} className='border border-green-700 text-green-700 rounded w-20 h-10 hover:bg-green-700 hover:text-white active:shadow-md active:bg-green-800'>Change</button>

  </div>
  )
}

export default MyProfile