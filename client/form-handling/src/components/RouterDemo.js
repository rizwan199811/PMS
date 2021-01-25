import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch,Link } from "react-router-dom";
class RouterDemo extends Component {
    render() {
        return (
            <div>
             <Router>
                 <div>
                <Header></Header>     
                 </div>
                 <Routes></Routes>
            </Router>
                 
        
            </div>
        )
    }
}
function Header() {
    return (
        <>
            <ul>
                 <li><Link to="/">Home</Link></li>
                 <li><Link to="/About">About</Link></li>
                 <li><Link to="/Services">Services</Link></li>
                 <li><Link to="/Contact">Contact</Link></li>
            </ul>
        </>
    )
    
}
function Routes() {
    return (
        <>
             <Switch>
                 <Route exact path='/' component={Home}></Route> 
                 <Route path='/About' component={About}></Route>
                 <Route path='/Services' component={Services}></Route>
                 <Route path='/Contact' component={Contact}></Route>
                 <Route component={PageNotFound}></Route>
             </Switch>
        </>
    )
    
}

 function Home() {
    return (
        <>
         <h1>Rizwan</h1>   
        </>
    )
    
}
function About() {
    return (
        <>
         <h1>About</h1>   
        </>
    )
    
}
function Services({match,history,location}) {
    return (
        <>
         <ul>
                 <li><Link to={`${match.path}/Web-Designing`}>Web-Designing</Link></li>
                 <li><Link to={`${match.path}/Web-Development`}>Web-Development</Link></li>
                 <li><Link to={`${match.path}/SEO-services`}>SEO-services</Link></li>
                 <li><Link to={`${match.path}/Mobile-App-Development`}>Mobile-App-Development</Link></li>
            </ul>
            <Switch>  
            <Route exact path={`${match.path}/:slug`} component={service}></Route>
            </Switch> 
        </>
    )
    
}
function service({match}) {
    if(match.params.slug==='Web-Designing'){
    return (
        <>
         <h1>Service Details:</h1>
    <p>Service name:{match.params.slug}</p> 
    <p>Web Designing service here</p>  
        </>
    )}
    else{
        return (
            <>
             <h1>Service Details:</h1>
        <p>Service name:{match.params.slug}</p> 
        <p>All service here</p>  
            </>
        )   
    }   
}
function Contact() {
    return (
        <>
         <h1>Contact</h1>   
        </>
    )
    
    
}
function PageNotFound() {
    return (
        <>
         <h3>Oops!Page Not Found</h3>   
        </>
    )
    
    
}


export default RouterDemo