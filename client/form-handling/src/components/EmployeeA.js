import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import EmployeeB from'./EmployeeB'
 class EmployeeA extends Component {
     constructor(props) {
         super(props)
     
         this.state = {
              name:'Rizwan',
              empId:101
         }
         console.log('EmployeeA constructor is calling');
     }
     componentDidMount(){
         console.log('EmployeeA componentDidMount is calling');
     }
     static getDerivedStateFromProps(props,state){
        console.log('EmployeeA getDerivedStateFromProps is calling');
        // console.log(props,state);
        return null;
     }
     updateID=()=>{
         let emp_Id=this.state.empId+1;
         this.setState({
          empId:emp_Id
         });
     }
    render() {
        console.log('EmployeeA render is calling');
        return (
            <>
              <h1>Hello EmployeeA</h1>
              <h1>Your empId is {this.state.empId}</h1>
              <button onClick={this.updateID}>Update Employee ID</button>
            <EmployeeB empBId={this.state.empId}></EmployeeB>
                 
            </>
        )
    }
}

export default EmployeeA
