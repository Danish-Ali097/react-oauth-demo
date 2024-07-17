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
  const _url = import.meta.env.VITE_BASE_URL;
  const _basic_user_name = import.meta.env.VITE_BASIC_USER;
  const _basic_pass = import.meta.env.VITE_BASIC_PASS;

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
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(_basic_user_name + ":" + _basic_pass))
    headers.append('Content-Type', 'application/json')
    const options = {
      method: 'POST',
      headers,
      body: JSON.stringify({
        "isEmailLogin": data.isEmailLogin,
        "code": data.code,
        "phone": data.phone,
        "email": data.email,
        "password": data.password
      })
    };
    
    fetch(_url + "/api/User/Login", options)
      .then(r => {
        console.log(r.json());
      })
      .catch(e => console.error(e));
  }

  const handleGoogleLogin = useGoogleLogin({
    onSuccess(tokenResponse) {
      console.log('google token resp', tokenResponse);
      const headers = new Headers();
      headers.append('Authorization', 'Basic ' + btoa(_basic_user_name + ":" + _basic_pass));

      fetch(_url + "/api/User/ExchangeGoogleToken?accessToken=" + tokenResponse.access_token, { headers })
        .then(r => {
          console.log(r.json());
        })
        .catch(e => console.log(e));
    },
    onError(errorResponse) {
      console.log('google error', errorResponse);
    },
  });

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
              Login
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
