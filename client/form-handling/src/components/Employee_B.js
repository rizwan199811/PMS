import React, { Component } from 'react'

class Employee_B extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             name:'Rizwan',
             empId:102
        }
        console.log('EmployeeB constructor is calling');
    }
    
UNSAFE_componentWillMount(){
    console.log("EmployeeB Component Will Mount");
}
componentWillUnmount(){
    console.log("EmployeeB Component will unmount");
}

    render() {
        console.log('EmployeeB render is calling');
        return (
            <>
                     <h1>Hello EmployeeB</h1>
            </>
        )
    }
}

export default Employee_B
