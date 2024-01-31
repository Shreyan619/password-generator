import React, { useCallback, useEffect, useRef, useState } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(true);
  const [password, setPassword] = useState("");

  //to  use useRef hook we need a variable to  store it
  const passwordRef = useRef(null);

  const copyPassword = useCallback(() => {

    passwordRef.current?.select();         //maybe current value is null
    passwordRef.current?.setSelectionRange(0, 10);
    window.navigator.clipboard.writeText(password)   //built in object {window}


  }, [password]);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (char) str += "!@#$%^&*-_+=[]{}~";

    for (let index = 1; index <= length; index++) {
      const character = Math.floor(Math.random() * str.length + 1) //to generate from string 
      pass += str.charAt(character); //extraction
    }
    setPassword(pass)
  }, [length, number, char, setPassword])  //for storing main password value(imp) //set dependencies in array are used for optimization

  useEffect(() => { passwordGenerator() }, [length, number, char, passwordGenerator]) //this is used to run the function

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
    <h1 className='text-white text-center my-3'>Password generator</h1>
  <div className="flex shadow rounded-lg overflow-hidden mb-4">
      <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
      />
      <button
      onClick={copyPassword}
      className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
      >copy</button>
      
  </div>
  <div className='flex text-sm gap-x-2'>
    <div className='flex items-center gap-x-1'>
      <input 
      type="range"
      min={6}
      max={20}
      value={length}
       className='cursor-pointer'
       onChange={(e) => {setLength(e.target.value)}}
        />
        <label>Length: {length}</label>
    </div>
    <div className="flex items-center gap-x-1">
    <input
        type="checkbox"
        defaultChecked={number}
        id="numberInput"
        onChange={() => {
            setNumber((prev) => !prev);
        }}
    />
    <label htmlFor="numberInput">Numbers</label>
    </div>
    <div className="flex items-center gap-x-1">
        <input
            type="checkbox"
            defaultChecked={char}
            id="characterInput"
            onChange={() => {
                setChar((prev) => !prev )
            }}
        />
        <label htmlFor="characterInput">Characters</label>
    </div>
  </div>
</div>
  );
}

export default App;
