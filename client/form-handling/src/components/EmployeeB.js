import React, { Component } from 'react'

export class EmployeeB extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             name:'Rizwan',
             empId:this.props.empBId
        }
        console.log('EmployeeB constructor is calling');
    }
    componentDidMount(){
        console.log('EmployeeB componentDidMount is calling');
    }
    static getDerivedStateFromProps(props,state){
       console.log('EmployeeB getDerivedStateFromProps is calling');
       console.log(props,state);
       if(props!==state.empId){
           return {empId:props.empBId}
       }
       
       return null;
    }
    shouldComponentUpdate(nextProp,nextState){
        console.log('EmployeeB shouldComponentUpdate is calling');
        console.log(nextProp,nextState);
        return true;
    }
    getSnapshotBeforeUpdate(prevProps, prevState){
        console.log("getSnapshotBeforeUpdate is invoked");
        console.log(prevProps, prevState);
        return 5;
        }
        componentDidUpdate(prevProps, prevState, snapshot){
            console.log("componentDidUpdate is invoked");
            console.log(snapshot);
            }
    render() {
        return (
            <>
                <h1>Hello EmployeeB</h1>
        <h1>Your empId is {this.state.empId}</h1>
            </>
        )
    }
}

export default EmployeeB
