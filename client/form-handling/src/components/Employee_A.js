import React, { Component } from 'react'

 class Employee_A extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             name:'Rizwan',
             empId:102
        }
        console.log('EmployeeA constructor is calling');
    }
    UNSAFE_componentWillMount(){
        console.log("EmployeeA Component Will Mount");
    }
    componentWillUnmount(){
        console.log("EmployeeA Component will unmount");
    }
   
    render() {
        console.log('EmployeeA render is calling');
        return (
            <>

             <h1>Hello EmployeeA</h1>
          </>
        )
    }
}

export default Employee_A

