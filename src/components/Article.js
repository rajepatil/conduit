import React from 'react';
import { Link } from 'react-router-dom';

export class Article extends React.Component {

    state = {
        article :{}
    
    }
    
    
    componentDidMount() {
        fetch(`https://conduit.productionready.io/api${this.props.location.pathname}`)
        .then(res => res.json() )
        // .then(data => console.log(data))
        .then(data => this.setState({
            article: data.article
            
        }))
        
        .catch(error => console.log(error))
    }

    render() { 
        
        const {article} = this.state;
        
        console.log("render",article)
        
        return ( 
            <div>
                <div className="jumbotron  bg-secondary banner-text-color">
                    <div className="container">
                        <h1 className="logo-font">{article.title}</h1>
                        
                        <div className="media">
                            <div className="media-left p-1">
                            <div className="media-left p-1">
                                        <Link to={`@${article.author ? article.author.username : ""}`}>
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
                        </div>
                    </div>                
                </div>
                <div className="container">
                <p>{article.body}</p> 
                </div>
                <div className="col-xs-12 col-md-8 offset-md-2">
                    <div className="card">
                            <p> dddd</p>
                     </div>
                </div>
             </div>
        );
    }
}
 
