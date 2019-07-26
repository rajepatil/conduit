import React, { Component } from 'react';
import { Link } from "react-router-dom";



export  class Navbar extends Component {
//   state = {
//     suser:{}
  
// }

  logout = () => {
    localStorage.clear();
    
  }
  // componentDidMount() {
  //   this.setState = ({suser:this.props.appuser});
  //   console.log(this.props.appuser);
  // }

  render() {
    // console.log("state",this.state)
    // console.log("props",this.props.appuser);
    
    var user = localStorage.getItem("user") || null ;
    
    return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <ul className="nav navbar-nav">
            <li className="navbar-brand">
              <Link className="nav-link text-success font-weight-bold" to="/">
                conduit
              </Link>
            </li>
          </ul>
          
            {
              !user ?
                <ul className="nav navbar-nav pull-xs-right">
                  <li className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">Sign in</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/signup" className="nav-link">Sign up</Link>
                  </li>
                </ul>
              :
                <ul className="nav navbar-nav pull-xs-right">
                  <li className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/newpost" className="nav-link">New post</Link>
                  </li>
                    
                 
                  <li className="nav-item">
                    <Link to={`profiles/${JSON.parse(localStorage.user).username}`} className="nav-link">{JSON.parse(localStorage.user).username}</Link>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link btn" onClick={this.logout} >logout</button>
                    </li>
                </ul>
            }
        </div>
      </nav>
    )
  }
}