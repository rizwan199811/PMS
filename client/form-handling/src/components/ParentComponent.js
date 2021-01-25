import React, { Component } from 'react'
import Recomp from './RegularComp'
import Pure, { PureComp } from './PureComp'
import Memocomp from './Memo'
export class ParentComponent extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             name:'Rizwan'
        }
    }
    componentDidMount(){
        setInterval(()=>{
this.setState({
    name:'Ahmed'
})
        },2000)
    }
    render() {
        console.log('Parent Component is calling')
        return (
            <div>
               <h1>ParentComponent name is :{this.state.name}</h1>
               {/* <Recomp name={this.state.name}></Recomp>  */}
               {/* <PureComp name={this.state.name}></PureComp>  */}
              <Memocomp name={this.state.name}></Memocomp>
              </div>
        )
    }
}

export default ParentComponent
