import React from 'react';
export  class Newpost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      body: "",
      tags:""
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
      article: {
        title: this.state.title,
        description: this.state.subt,
        body: this.state.body,
        taglist: [this.state.tags]
      }
    };
    fetch("https://conduit.productionready.io/api/articles",{
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${JSON.parse(localStorage.user).token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        this.props.history.push("/")
        console.log(data)
      })
      .catch(error => console.error("Error:", error));
  };
  render()
  {
    return (
      <div className="container">
      <div> 
        <form>
        <input type="text" name="title" className="form-control" onChange={this.handdleChange} value={this.state.title} />
        <br />
        <input type="text" name="subt" className="form-control" onChange={this.handdleChange} value={this.state.subt} />
        <br />
        <textarea type="text" name="body" className="from-control" row="100" cols="120" onChange={this.handdleChange} value={this.state.body} />
        <div className="text-right mt-4">
          <b />
        <input type="text" name="tags" className="form-control" onChange={this.handdleChange} value={this.state.tags} />
        <br />
          <button type="submit" placeholder="tags" className="btn btn-success" onClick={this.submitHandler}>
            Publish Article
          </button>
        </div>
      </form>
      </div>
    </div>
    );
  }
}
