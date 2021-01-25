import React,{useState,useEffect} from 'react'

function UseEffect() {
    const [salary, setSalary] = useState(0);
    const [salary1, setSalary1] = useState(5000);
    const increment =()=>{
        setSalary(salary+1);
    }
    const decrement =()=>{
        setSalary1(salary1-1);
    }
    useEffect(() => {
        (console.log('Useeffect is calling'))
         }, [salary1])
    return (
        <>
         <button onClick={increment}>Increment</button>
    <h2>Incremented salary:{salary}</h2>
    <h2>Decremented salary:{salary1}</h2>
         <button onClick={decrement}>Decrement</button>   
        </>
    )
}

export default UseEffect
