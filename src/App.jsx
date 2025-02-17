import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numallowed, setNumallowed] = useState(false)
  const [charallowed, setCharallowed] = useState(false)
  const [password, setPassword] = useState("")

  //use ref hook 
  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numallowed) str += "0123456789"
    if(charallowed) str += "!@#$%^&*()_+"

    for(let i = 1; i <= length; i++) {
      let char = (Math.floor(Math.random() * str.length +1))
      pass +=str.charAt(char)
    }
    setPassword(pass)

  }, [length, numallowed, charallowed, setPassword])

  const copyPasswordToClipboard = useCallback(() =>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 20)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numallowed, charallowed, passwordGenerator])
  return (
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='password' 
          readOnly
          ref={passwordRef}
          />
          <button
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range" 
            min={8} 
            max={32}
            value={length}
            className='cursor-pointer'
            onChange={(e) => setLength(e.target.value)}
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
             defaultChecked={numallowed} 
             id="numberInput"
             onChange={() =>{ setNumallowed((prev) => !prev);
             }} 
             />
             <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
             defaultChecked={charallowed} 
             id="characterInput"
             onChange={() =>{ setCharallowed((prev) => !prev);
             }} 
             />
             <label htmlFor="characterInput">Character</label>
          </div>
        </div>
      </div>
  )
}

export default App
