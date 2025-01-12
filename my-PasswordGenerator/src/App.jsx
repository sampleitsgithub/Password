import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'


function App() {
  const [length,setLength]=useState(8);
  const [number,setNumber]=useState(false);
  const [symboll,setSymbol]=useState(false);
  const [password,setPassword]=useState("");
  const passwordRef=useRef(null);
  const passwordGenerator=useCallback(()=>{
    let str="";
    let pass="";
    let character="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    str=character+str;
    if(number) str+="1234567890";
    if(symboll) str+="!@#$%^&*";
    for(let i =0;i<length;i++){
      let index=Math.floor(Math.random()*str.length+1);
      pass+=str[index];
    }
    setPassword(pass);
  },[length,number,symboll,setPassword]);
  

  const copyPasswordToClipBoard=useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,21);
    window.navigator.clipboard.writeText(password);

  },[password])
  useEffect(()=>{
    passwordGenerator();
  },[length,number,symboll,passwordGenerator])
 
  return (
   
  <div className='w-full h-screen bg-gray-600 flex justify-center content-center  items-center'  >
  <div className='w-5/6 h-4/5  flex   flex-col
  justify-center'>
  <div><label htmlFor="inputText" className="text-white font-bold">Generated Password :</label>
  
  <input className='w-96 ml-10' type="text"  id="inputText" value={password} placeholder='password'
   readOnly onChange={()=>setPassword()} ref={passwordRef}/>
     <button onClick={copyPasswordToClipBoard} className='bg-blue-400 shadow-blue-800 ml-6 rounded-sm text-white font-bold w-20 h-8 hover:bg-blue-600 hover:scale-95 active:bg-blue-900'>COPY</button>
  </div>
  
   <div className='flex flex-row gap-4 justify-center mt-7 items-baseline text-white text-xl'>
    <div>
        <input type="range" id='checkbox1' min={8} max={20}  onChange={(e)=> {   setLength(e.target.value);  }} />
        <label htmlFor="checkbox1" > Length {length}</label>
      
   </div>
   <div>
        <input type="checkbox" id='checkbox1' defaultChecked={number} onChange={()=> {   setNumber((prev)=>!prev);  }} />
        <label htmlFor="checkbox1" >Number</label>
   </div>
   <div>
        <input type="checkbox" id='checkbox1' defaultChecked={symboll}   onChange={()=> {   setSymbol((prev)=>!prev);  }} />
        <label htmlFor="checkbox1" >Symbol</label>
   </div>
   </div>
   
  </div>

   </div>
  )
}

export default App
