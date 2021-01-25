import React,{useState} from 'react'
import ReactDOM from 'react-dom'

function UseStateFunction() {
    const [name, setName] = useState("Rizwan");
    const [age, setAge] = useState(18);
    const [empId, setEmpId] = useState(101);
    const clickHandler=()=>{
setName("Ahmed");
setAge(19);
setEmpId(102);

    }
    return (
        <>
            <h1>Employee Details</h1>
    <h3>Your name is {name}</h3>
    <h3>Your age is {age}</h3>
    <h3>Your ID is {empId}</h3>
    <button onClick={clickHandler}>Click me</button>
        </>
    )
}

export default UseStateFunction
