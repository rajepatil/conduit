import React from "react";
export class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      username: `${JSON.parse(localStorage.user).username}`,
      bio: "",
      email: `${JSON.parse(localStorage.user).email}`
    };
  }
  handdleChange = e => {
    var { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  submitHandler = e => {
    e.preventDefault();
    var data = {
      user: {
        image: this.state.image,
        username: this.state.username,
        bio: this.state.bio,
        email: this.state.email
      }
    };
    fetch("https://conduit.productionready.io/api/user", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",

        Authorization: `Token ${JSON.parse(localStorage.user).token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        this.props.history.push("/");
        console.log(data);
      })
      .catch(error => console.error("Error:", error));
  };

  render() {
    return (
      <div className="container">
        <div>
          <form>
            <input
              type="text"
              placeholder="URL of profile picture"
              name="image"
              className="form-control"
              onChange={this.handdleChange}
              value={this.state.image}
            />
            <br />
            <input
              type="text"
              placeholder="Username"
              name="username"
              className="form-control"
              onChange={this.handdleChange}
              value={this.state.username}
            />
            <br />
            <textarea
              type="text"
              placeholder="Short bio about you"
              name="bio"
              className="from-control"
              row="100"
              cols="120"
              onChange={this.handdleChange}
              value={this.state.bio}
            />
            <div className="text-right mt-4">
              <br />
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="form-control"
                onChange={this.handdleChange}
                value={this.state.email}
              />
              <br />
              {/* <input type="password" placeholder="New Password" name="password" className="form-control" onChange={this.handdleChange} value={this.state.password} /> */}
              <br />
              <button
                type="submit"
                className="btn btn-success"
                onClick={this.submitHandler}
              >
                Update Setting
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
