import React from 'react';
import { Link } from 'react-router-dom';
export class Profile extends React.Component {

  constructor(props){
   
    super(props);
    this.state = {
      profile:""
    }
  }

  componentDidMount() {
   
    fetch(`https://conduit.productionready.io/api/${this.props.location.pathname}`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${JSON.parse(localStorage.user).token}`
      }
      })
    .then(res => res.json())
    
    .then(data => this.setState({profile: data.profile}))
    .catch(error => console.log(error))
  }

  submitHandler = () => {(this.state.profile.following) ?
      (fetch(`https://conduit.productionready.io/api/profiles/${this.state.profile.username}/follow`,{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${JSON.parse(localStorage.user).token}`
        }
      }).then(res => res.json())
        // .then(data=> console.log(data,"del"))
        .then(data => this.setState({profile: data.profile}))
        .catch(error => console.error("Error:", error)))
    : (fetch(`https://conduit.productionready.io/api/profiles/${this.state.profile.username}/follow`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${JSON.parse(localStorage.user).token}`
      }
      })
      .then(res => res.json())
      // .then(data=> console.log(data,"post"))
      .then(data => this.setState({profile: data.profile}))
      .catch(error => console.error("Error:", error)))
    
  };
  render() { 
    const user = this.state.profile ;
   
    return ( 
      <div className="jumbotron bg-info banner-text-color">
        <div className="text-center  container">
          <img className="rounded-circle media-object" src={user.image} alt={user.username} width="42" height="42"/>
          <h1 className="logo-font"> {user.username}</h1>
          <p>{user.bio}</p>
        </div> 
        <div className="container text-right">
          { (user.username === JSON.parse(localStorage.user).username) 
            ?
            <Link to="/setting" className="btn btn-outline-danger">Edit Profile Settings</Link>
            :
            <button className="btn btn-outline-danger" onClick={this.submitHandler}>{(user.following) ? "Unfollow" : "Follow" } {user.username}</button>
          }
        </div>
      </div>
    );
  }
}  
