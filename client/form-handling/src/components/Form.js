import React, { Component } from 'react'
import e from 'express';

class Form extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             username:'',
             password:'',
        }
    }
    handleusernamechange =(event)=>{
        console.log(event.target.value);
this.setState({
    username:event.target.value
    
})

    }
    handlepasswordschange=(event)=>{
        console.log(event.target.value);
        this.setState({
            password:event.target.value
        })
    
}

    
    submithandler=(event)=>{
        // alert(`${this.state.username} ${this.state.comments} ${this.state.topic} `);
        event.preventDefault();
        var data=new URLSearchParams();
        console.log(event.target);
        const url="http://localhost:5000";
        for(const pair of new FormData(e.target)){
    data.append(pair[0],pair[1]);
        }
        fetch(url,{
            method:"post",
            body:data,
        });
    
    }


    render(){
        return (
            <form onSubmit={this.submithandler}>
            <div>
              <label>Username</label>
              <input type='text'name='uname' value={this.state.username} onChange={this.handleusernamechange}></input>
            </div>
            <div>
            <label>Password</label>
            <input type='password' name='password' value={this.state.password} onChange={this.handlepasswordschange}></input>
                        </div>
            <div>
            {/* <label>Topics</label>
           <select value={this.state.topic}  onChange={this.handletopicchange}>
           <option value="react">React</option>
           <option value="angular">Angular</option>
           <option value="vue">Vue</option>    
           </select> */}
            </div>
            <button type="submit">Submit</button>
            </form>
        )
        
        }
    }
export default Form
