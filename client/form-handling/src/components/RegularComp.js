import React, { Component } from 'react'

class RegularComp extends Component {
    shouldComponentUpdate(newProps,newState){
if(newProps.name!==this.props.name){
    return true;
}
else{
    return false;
}
    }
    render() {
        console.log('Regular Component is calling');
        return (
            <div>
                <h1>Regular  Component: {this.props.name}</h1>
            </div>
        )
    }
}

export default RegularComp
