import React from 'react';
export  class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  handdleChange = e => {
    var { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  submitHandler = (e) => {
    e.preventDefault();
    var data = {
      user: {
        email: this.state.email,
        password: this.state.password
      }
    };
    fetch("https://conduit.productionready.io/api/users/login",{
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        this.props.history.push("/")
        localStorage.setItem("user", JSON.stringify(data.user))
        console.log(data.user)
      })
      .catch(error => console.error("Error:", error));
  };


  
  render()
  {
    return (
      <div className="container">
      <div className="form-container"> 
        <form>
        <p className="h4 text-center mb-4">Sign in</p>
        <label className="grey-text">Your email</label>
        <input type="email" name="email" className="form-control" onChange={this.handdleChange} value={this.state.email} />
        <br />
        <label className="grey-text">Your password</label>
        <input type="password" name="password" className="form-control" onChange={this.handdleChange} value={this.state.password} />
        <div className="text-right mt-4">
          <button type="submit" className="btn btn-success" onClick={this.submitHandler}>
            Login
          </button>
        </div>
      </form>
      </div>
    </div>
    );
  }
}
