import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import 'react-toastify/dist/ReactToastify.css';


const Manager = () => {
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setPasswordArray] = useState([])
  const ref = useRef()
  const passwordRef = useRef()
  useEffect(() => {
    let passwords = localStorage.getItem("passwords")
    if (passwords) {
      setPasswordArray(JSON.parse(passwords))

    }
  }, [])
  const copyText = (text) => {

    toast(`"${text}" Copied to Clipboard`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text)

  }


  const showPassword = () => {
    passwordRef.current.type = "text"
    // alert("Password is shown")
    if (ref.current.src.includes("icons/eyecross.png")) {
      passwordRef.current.type = "password"
      ref.current.src = "icons/eye.png"
    }
    else {
      passwordRef.current.type = "text"
      ref.current.src = "icons/eyecross.png"
    }




  }
  const savePassword = () => {
    if (form.site.length>3 && form.username.length>3 && form.password.length>3) {
      
      
      
      setPasswordArray([...passwordArray, {...form,id:uuidv4()}])
      localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form,id:uuidv4()}]))
      console.log([...passwordArray, form])
      setform({ site: "", username: "", password: "" })
      toast(`Password saved`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }else{
      toast(`Error:Password not saved!`);
    }
  }
  const deletePassword = (id) => {
    let c=confirm("Do you Really want to delete password?")
    if (c) {
      
      console.log("Deleted password of id: ",id)
      setPasswordArray(passwordArray.filter(item=>item.id!=id))
      localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!=id)))
      toast(`Password Deleted Successfully!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
      
    // setPasswordArray([...passwordArray, {...form,id:uuidv4()}])
    // localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]))
    // console.log([...passwordArray, form])
  }
  const editPassword=(id) => {

    console.log("Edited password of id: ",id)
    setform(passwordArray.filter(i=>i.id===id)[0])
    setPasswordArray(passwordArray.filter(item=>item.id!==id))
    
  }
  
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })

  }


  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
       
      />
      {/* Same as */}
      <ToastContainer  containerId={"friendRequest"} />
      <div className="absolute inset-0 -z-10 h-full bg-cover w-full bg-green-50 [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] "></div>
      <div className="p-3 md:p-0 md:mycontainer min-h-[88.5vh]">
        <h1 className='text-4xl font-bold text-center'><span className="text-green-400">&lt;</span>
          Prot
          <span className="text-green-400">ecta/&gt;</span></h1>
        <p className='text-green-900 text-lg text-center'>Securely storing your secrets</p>

        <div className="text-black flex flex-col p-4 gap-8 items-center">
          <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-green-500 w-full px-4 py-1' type="text" name='site' id='site' />
          <div className="flex flex-col md:flex-row w-full justify-evenly gap-8">
            <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full px-4 py-1' type="text" name='username' id='username' />
            <div className="relative">

              <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full px-4 py-1' type="password" name='password' id='password' />
              <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
                <img ref={ref} className='p-1' width={26} src="icons/eye.png" alt="eye" />
              </span>
            </div>

          </div>
          <button onClick={savePassword} className='justify-center items-center flex bg-green-400 px-4 py-2 rounded-full w-fit hover:bg-green-300 gap-8 border border-green-900 hover:font-bold '>
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            >
            </lord-icon>Save Password</button>


        </div>
        <div className="passwords">
          <h2 className='font-bold text-2xl text-center py-4'>Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords to show</div>}
          {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10">
            <thead className='bg-green-800 text-white font-bold'>
              <tr>
                <th className='py-2'>Site</th>
                <th className='py-2'>Username</th>
                <th className='py-2'>Password</th>
                <th className='py-2'>Actions</th>
              </tr>
            </thead>
            <tbody className='bg-green-100'>
              {passwordArray.map((item, index) => {
                return <tr key={index}>

                  <td className='py-2 border border-white text-center'
                  ><div className="flex items-center justify-center">
                      <a href={item.site} target='_blank'>{item.site}</a>



                      <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>

                        <lord-icon
                          style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover" >
                        </lord-icon>
                      </div>
                    </div>
                  </td>
                  <td className=' py-2 border border-white text-center'> <div className="flex items-center justify-center">
                    <span>{item.username}</span>



                    <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>

                      <lord-icon
                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                        src="https://cdn.lordicon.com/iykgtsbt.json"
                        trigger="hover" >
                      </lord-icon>
                    </div>
                  </div>
                  </td>
                  <td className=' py-2 border border-white text-center'>
                    <div className="flex items-center justify-center">
                      <span>{item.password}</span>



                      <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>

                        <lord-icon
                          style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover" >
                        </lord-icon>
                      </div>
                    </div>
                  </td>
                  <td className='justify-center py-2 border border-white text-center'>
                    <span className='cursor-pointer mx-1' onClick={()=>{editPassword(item.id)}}>
                      <lord-icon
                        src="https://cdn.lordicon.com/gwlusjdu.json"
                        trigger="hover"
                        style={{ "width": "25px", "height": "25px" }}>
                      </lord-icon>
                      </span>
                    <span className='cursor-pointer mx-1' onClick={()=>{deletePassword(item.id)}}>
                      <lord-icon
                        src="https://cdn.lordicon.com/skkahier.json"
                        trigger="hover"
                        style={{ "width": "25px", "height": "25px" }}>
                      </lord-icon>
                      </span>
                  </td>
                </tr>
              })}

            </tbody>
          </table>}

        </div>
      </div>
    </>

  )
}

export default Manager
