import React from 'react';
export class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
    };
  }
  handdleChange = (e) => {
    var { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    var data = {
      user: {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      }
    };
    fetch("https://conduit.productionready.io/api/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data,"data");
        if (data.errors){
          console.log(data.errors, "error")
          this.setState({ error: data.errors });
        } else {
          this.props.history.push("/login")
        }
      }).catch(error => console.error("Error:", error));
  };
  render() {
    return (
      <div className="container">
      <div className="form-container">  
      <form>
      <p className="h4 text-center mb-4">Sign Up</p>
      <label className="grey-text">User Name</label>
      <input type="text" name="username" value={this.state.username} className="form-control" onChange={this.handdleChange}  />
      <div >{this.state.error ? this.state.error.username : ""}</div>
      <br />
      <label className="grey-text">Your email</label>
      <input type="email" name="email" value={this.state.email} className="form-control" onChange={this.handdleChange}  />
      <span>
        {this.state.error ? this.state.error.email : ""}
      </span>
      <br />
      <label className="grey-text">Your password</label>
      <input type="password" name="password" value={this.state.password} className="form-control" onChange={this.handdleChange}  />
      <span>
        {this.state.error ? this.state.error.password : ""}
      </span>
      <div className="text-right mt-4">
        <button className="btn btn-success" type="submit" onClick={this.submitHandler}>
          Sign up
        </button>
      </div>
    </form>
    </div>
      </div>
    
    );
  }
}
