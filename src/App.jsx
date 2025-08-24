import { useState,useCallback , useEffect, useRef} from "react";

function App() {
  const [password , setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [numbers, setNumbers] = useState(false);
  const [characters, setCharacters] = useState(false);
  

  const passwordRef = useRef(null);



  const passwordGenerator = useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numbers) str+="0123456789";
    if(characters) str+="!@#$%^&*()_+?><:{}[]";
    for(let i=0 ; i<length ;i++){
      let char = (Math.random()*str.length +1);
      pass+=str.charAt(char);
    }
    setPassword(pass);
  },[length,numbers,characters,setPassword]);
useEffect(()=>{
  passwordGenerator();
},[length,numbers,characters,passwordGenerator])

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-gray-800 text-white">
      <div className="bg-gray-400 w-full h-full lg:w-xl p-6 m-6 lg:p-3 lg:m-3">
        <h1 className="text-2xl md:text-4xl font-semibold mb-6 text-center">
          Password Generator
        </h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            className="flex-1 p-3 rounded border border-gray-600 text-black"
            value={password}
            placeholder="Your password"
            ref={passwordRef}
          />
          <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200" onClick={()=>{navigator.clipboard.writeText(password); passwordRef.current?.select();}} >
            Copy
          </button>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <input type="range" min={8} max={32} value={length} className="flex-1" onChange={(e)=>{setLength(e.target.value)}}/> <p>{length}</p>
         <div>
           <input type="checkbox" className="ml-2" defaultChecked={numbers} onChange={()=>{setNumbers((prev)=>(!prev))}}/> <label htmlFor="Number">Numbers</label>
         </div>
          <div>
            <input type="checkbox" className="ml-2" defaultChecked={characters} onChange={()=>{setCharacters((prev)=>(!prev))}}/> <label htmlFor="Characters">Special Characters</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
