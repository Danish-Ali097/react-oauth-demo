import React, { useState } from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import './App.css'

function App() {
  const [data, setData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    setData((preval) => ({
      ...preval,
      [name]: value
    }))
  }

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa("modl_app_user:6qfxSkl9yO"))
    headers.append('Content-Type','application/json')
    let options = { 
      method: 'POST',
      headers,
      body: JSON.stringify({
        "isEmailLogin": true,
        "code": "+92",
        "phone": "3065877851",
        "email": data.email,
        "password": data.password
      }) 
    };
    fetch("https://localhost:44363/api/User/Login", options)
    .then(r => {
      console.log(r.json());
    })
    .catch(e => console.error(e));
  }

  const handleGoogleLogin = useGoogleLogin({
    flow: 'auth-code',
    scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
    onSuccess(tokenResponse) {
      console.log('google token resp', tokenResponse);
    },
    onError(errorResponse) {
      console.log('google error', errorResponse);
    },
  })
  const handleInstaLogin = () => { }
  const handleAppleLogin = () => { }

  return (
    <>
      <div className='p-8'>
        <form className="w-full max-w-sm" onSubmit={handleSignIn}>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                Email/Phone
              </label>
            </div>
            <div className="md:w-2/3">
              <input value={data.email} onChange={handleChange} name='email' className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder="test@example.com"></input>
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
                Password
              </label>
            </div>
            <div className="md:w-2/3">
              <input value={data.password} onChange={handleChange} name='password' className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="password" placeholder="******************"></input>
            </div>
          </div>
          <div className="text-center">
            <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded block m-auto my-3" type="submit">
              Sign Up/Login
            </button>
            <hr/>
            <button onClick={handleGoogleLogin} className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded block m-auto my-3" type="button">
              Google
            </button>
            <button onClick={handleInstaLogin} className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded block m-auto my-3" type="button">
              Instagram
            </button>
            <button onClick={handleAppleLogin} className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded block m-auto my-3" type="button">
              Apple
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default App
