import React from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

export class Article extends React.Component {

    state = {
        article :{},
        comments : [],
        comment:"",
        input:""
    
    }
    handdleChange = e => {
        var { name, value } = e.target;
        this.setState({
          [name]: value
        });
      };
    
    componentDidMount() {
        console.log("cdm");
        fetch(`https://conduit.productionready.io/api${this.props.location.pathname}`)
        .then(res => res.json() )
        // .then(data => console.log(data))
        .then(data => this.setState({
            article: data.article
        }))
        
        .catch(error => console.log(error))
    
        fetch(`https://conduit.productionready.io/api${this.props.location.pathname}/comments`)
        .then(res => res.json() )
        // .then(data => console.log(data))
        .then(data => this.setState({
            comments: data.comments
        }))
        
        .catch(error => console.log(error))
    
    }

    

    submitHandler = () => {
        (this.state.article.favorited) ?
          (fetch(`https://conduit.productionready.io/api/articles/${this.state.article.slug}/favorite`,{
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${JSON.parse(localStorage.user).token}`
            }
          }).then(res => res.json())
            // .then(data=> console.log(data,"del"))
            .then(data => this.setState({article: data.article}))
            .catch(error => console.error("Error:", error)))
        : (fetch(`https://conduit.productionready.io/api/articles/${this.state.article.slug}/favorite`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${JSON.parse(localStorage.user).token}`
          }
          })
          .then(res => res.json())
          // .then(data=> console.log(data,"post"))
          .then(data => this.setState({article: data.article}))
          .catch(error => console.error("Error:", error)))
        
      };
      
    commentHandler = (e) =>{
    
        e.preventDefault();
        var data = {
          comment: {
            "body": this.state.input
          }
        };
       
        fetch(`https://conduit.productionready.io/api/articles/${this.state.article.slug}/comments`,{
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${JSON.parse(localStorage.user).token}`
          }
        }).then(res => res.json())
         .then(data => {
          fetch(`https://conduit.productionready.io/api${this.props.location.pathname}/comments`)
          .then(res => res.json() )
          // .then(data => console.log(data))
          .then(data => this.setState({
              comments: data.comments
          }))
          
          .catch(error => console.log(error))
          this.setState({ comment: data.comment})
        })
          .catch(error => console.error("Error:", error))
      }
     
      deleteComment = (e, comment) => {
      
        
        fetch(`https://conduit.productionready.io/api/articles/${this.state.article.slug}/comments/${comment.id}`,{
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${JSON.parse(localStorage.user).token}`
            }
          })
          .then(data => fetch(`https://conduit.productionready.io/api${this.props.location.pathname}/comments`)
          .then(res => res.json() )
          // .then(data => console.log(data))
          .then(data => this.setState({
              comments: data.comments
          }))
          
          .catch(error => console.log(error)))
          .catch(error => console.error("Error:", error))
        
      }
      // componentDidUpdate(){
      //   console.log("cdu")
      
      //   fetch(`https://conduit.productionready.io/api${this.props.location.pathname}/comments`)
      //   .then(res => res.json() )
      //   // .then(data => console.log(data))
      //   .then(data => this.setState({
      //       comments: data.comments
      //   }))
        
      //   .catch(error => console.log(error))
      // }

    render() { 
        
        const {article, comments} = this.state;
        console.log("render",article.body);
        const articlebody = article.body;
        
        return ( 
            <div>
                <div className="jumbotron  bg-secondary banner-text-color">
                    <div className="container">
                        <h1 className="logo-font">{article.title}</h1>
                        
                        <div className="media">
                            <div className="media-left p-1">
                            <div className="media-left p-1">
                                        <Link >
                                            <img className="rounded-circle media-object" src={article.author ? article.author.image : ""} alt={article.author ? article.author.username : ""} width="42" height="42"/>
                                        </Link>
                                    </div>
                            </div>
                            <div className="media-body"> 
                            {
                                <h5 className="media-heading">{article.author ? article.author.username : "" }</h5>
                            }
                            <h6 >
                                <small>
                                    {new Date(article.createdAt).toDateString()}
                                </small>
                            </h6>
                            </div>
                            <div className="media-right p-1">
                                <button className="btn btn-outline-success" onClick={this.submitHandler} >{article.favoritesCount}</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
              <ReactMarkdown source={articlebody} />
              
                </div>
                <div className="col-xs-12 col-md-8 offset-md-2">
                    <div className="">
                        <h2>comment</h2>
                        <div className="card mb-3">
                            <input onChange={this.handdleChange} value={this.state.input} type="text" name="input"  className="card-body"></input>
                            <div className="card-footer d-flex justify-content-between">
                                <div className="p-1">
                                    <img className="rounded-circle media-object" src={JSON.parse(localStorage.user).image} alt={JSON.parse(localStorage.user).username} width="42" height="42"/>
                                    <span className="m-1"></span>
                                </div>
                                <div className="">
                                    <button className="btn btn-success" onClick={this.commentHandler}>Post Comment</button>
                                </div>
                            </div>
                        </div>

                    {comments.map((comment) => (
                      <div className="card mb-3">
                        <p className="card-body">{comment.body}</p>
                        <div className="card-footer d-flex justify-content-between">
                            <div className="p-1">
                                <Link to={`profiles/${comment.author.username}`}>
                                    <img className="rounded-circle media-object" src={comment.author.image} alt={comment.author.username} width="42" height="42" />
                                </Link>
                                <span className="m-1">{comment.author.username}</span>
                                <span className="text-muted">
                                            <small>
                                            {new Date(comment.createdAt).toDateString()}
                                            </small>
                                </span>

                            </div>
                            <div className="">
                                {(comment.author.username === JSON.parse(localStorage.user).username)
                                    ?
                                    <button className="btn btn-outline-dark" onClick={((e)=>this.deleteComment(e, comment))} key={comment.id}>Delete Comment</button>
                                    :
                                    null}
                            </div>
                        </div>
                    </div>))}

                </div>

                </div>
            </div>
        );
    }
}
 
