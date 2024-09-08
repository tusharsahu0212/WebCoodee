import React from 'react'
import Cookies from 'js-cookie'

function Header(props) {

  const access_token = Cookies.get('ACCESS_TOKEN')

  function handleLogout(){
    Cookies.remove('ACCESS_TOKEN');
    props.handleTab('login')
  }
  return (
    <div className='flex flex-wrap gap-3 bg-teal-400 justify-between items-center px-5 py-4'>
        <div className='flex gap-6'>
            <button onClick={()=>props.handleTab('home')}>Home</button>
            {access_token && <button onClick={()=>props.handleTab('myblogs')}>My Blogs</button>}
            {access_token && <button onClick={()=>props.handleTab('myprofile')}>My Profile</button>}
        </div>
        <div className='flex gap-6'>

          {access_token? (
            <>
              <button onClick={()=>props.handleTab('upload')} className="border border-gray-300 rounded text-black bg-white px-2 py-1 active:bg-gray-200 active:text-black hover:bg-green-700 hover:text-white">Upload</button>
              <button onClick={handleLogout} className="border border-gray-300 rounded text-black bg-white px-2 py-1 active:bg-gray-200 active:text-black hover:bg-green-700 hover:text-white">LogOut</button>
            </>
          ) : (
            <>
              <button onClick={()=>props.handleTab('login')} className="border border-gray-300 rounded text-black bg-white px-2 py-1 active:bg-gray-200 active:text-black hover:bg-green-700 hover:text-white">Login</button>
              <button onClick={()=>props.handleTab('signup')} className="border border-gray-300 rounded text-black bg-white px-2 py-1 active:bg-gray-200 active:text-black hover:bg-green-700 hover:text-white">Sign Up</button>
            </>
          )}

        </div>
    </div>
  )
}

export default Header