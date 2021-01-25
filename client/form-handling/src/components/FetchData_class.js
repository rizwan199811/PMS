import React, { Component } from 'react'

export class FetchData_class extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             hasError:false,
             planets:{}
        };
    }
    componentDidMount(){
        fetch("https://api.github.com/users")
        .then(res=>res.json())
        .then(res=>this.setState({
        planets:res
        }))
        .catch(()=>{
            this.setState({
                hasError:true
            })
        });
    }
    render() {
        return (
            <>
                {JSON.stringify(this.state.planets)}
            </>
        )
    }
}

export default FetchData_class
