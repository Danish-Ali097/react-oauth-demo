import React, { useState } from 'react'
import Input from './components/Input/Input';
import { useGoogleLogin } from '@react-oauth/google'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle'
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram'
import { faApple } from '@fortawesome/free-brands-svg-icons/faApple'
import Switch from './components/Switch/Switch';

function App() {
  const [data, setData] = useState({
    isEmailLogin: false,
    code: "",
    phone: "",
    email: "",
    password: ""
  })

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.currentTarget
    if(e.currentTarget.type == 'checkbox') {
      setData((preval) => ({
        ...preval,
        [name]: checked
      }))
    } else {
      setData((preval) => ({
        ...preval,
        [name]: value
      }))
    }
  }

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa("modl_app_user:6qfxSkl9yO"))
    headers.append('Content-Type', 'application/json')
    let options = {
      method: 'POST',
      headers,
      body: JSON.stringify({
        "isEmailLogin": true,
        "code": data.code,
        "phone": data.phone,
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
      <div className='p-8 w-full'>
        <form className="w-full max-w-sm mx-auto shadow-md rounded py-8 px-4" onSubmit={handleSignIn}>
          <Switch name="isEmailLogin" checkedLabel='' unCheckedLabel='' checked={data.isEmailLogin} onChange={handleChange} />
          {
            data.isEmailLogin ?
              <Input id="email" type="email" placeholder="john@example.com" name="email" value={data.email} onChange={handleChange} label="Email" />
              :
              <div>
                <Input id="code" type="text" placeholder="+xx" name="code" value={data.code} onChange={handleChange} label="Code" />
                <Input id="phone" type="phone" placeholder="3xxxxxxxxx" name="phone" value={data.phone} onChange={handleChange} label="Phone" />
              </div>
          }

          <Input id="password" type="password" placeholder="*************" name="password" value={data.password} onChange={handleChange} label="Password" />
          <div className="text-center">
            <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded block m-auto my-3 w-full" type="submit">
              Sign Up/Login
            </button>
            <hr />
            <button onClick={handleGoogleLogin} className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded block m-auto my-3 w-3/4" type="button">
              <FontAwesomeIcon icon={faGoogle} />
              &nbsp;
              Google
            </button>
            <button onClick={handleInstaLogin} className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded block m-auto my-3 w-3/4" type="button">
              <FontAwesomeIcon icon={faInstagram} />
              &nbsp;
              Instagram
            </button>
            <button onClick={handleAppleLogin} className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded block m-auto my-3 w-3/4" type="button">
              <FontAwesomeIcon icon={faApple} />
              &nbsp;
              Apple
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default App
