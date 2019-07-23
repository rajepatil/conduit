import React from 'react';
import { Link } from 'react-router-dom';
export class Profile extends React.Component {

  constructor(){
    super();
    this.state = {profile:""}
    
  }

  componentDidMount() {
    // console.log(this.props.location.pathname);
    fetch(`https://conduit.productionready.io/api/${this.props.location.pathname}`)
    .then(res => res.json() )
      // .then(data=> console.log(data))    
     .then(data => this.setState({
        profile: data.profile,
       
    }))
    
    .catch(error => console.log(error))
}
  render() { 
    const user = this.state.profile;
    
    return ( 
      
        <div className="jumbotron bg-info banner-text-color">
                    <div className="text-center  container">
                      <img className="rounded-circle media-object" src={user.image} alt={user.username} width="42" height="42"/>
                        <h1 className="logo-font"> {user.username}</h1>
                        <p>{user.bio}</p>
                    </div> 
                    <div className="container text-right">
                      <Link to="/setting" className="btn btn-outline-danger">Edit Profile Settings</Link>
                    </div>
          </div>
     );
  }
}  
