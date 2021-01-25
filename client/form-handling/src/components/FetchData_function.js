import React,{useState,useEffect} from 'react';
import logo from './Capture.PNG';
function FetchData_function() {
const [planet, setPlanet] = useState({});
const [hasError, setError] = useState(false);

useEffect(()=>{
    async function FetchData(){
    const res=await fetch("https://api.github.com/users")
        res
        .json()
        .then(res=>setPlanet(res))
        .catch(()=>{
        setError(true)
        });
    }
    FetchData()
},[])
    return (
        
        <div>
        {/* <h1>{JSON.stringify(planet)}</h1>     */} 
        <img src={logo}></img>       
         </div>
    )
}

export default FetchData_function
