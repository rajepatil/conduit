import React from 'react';
import { Link } from 'react-router-dom';
import SpinnerPage from './SpinnerPage';


export  class Articles extends React.Component{
    constructor(){
        super();
        this.state = {articles:[]}
        this.state = {loading:true};
    }

    componentDidMount() {
        fetch('https://conduit.productionready.io/api/articles?limit=20')
        .then(res => res.json() )
        
        .then(data => this.setState({
            articles: data.articles,
            loading: false
        }))
        
        .catch(error => console.log(error))
    }

    render(){
        const {articles,loading } = this.state;
       
        return(
            <div>
                {loading || !articles ? (<div className="text-center"><SpinnerPage /></div>) 
                : (articles.map((article, index) => {
                        return (
                            <div className="container shadow p-3 mb-5 bg-light rounded">
                                <div key={index} className="media">
                                    <div className="media-left p-1">
                                        <Link to={`@${article.author.username}`}>
                                            <img className="rounded-circle media-object" src={article.author.image} alt={article.author.username} width="42" height="42"/>
                                        </Link>
                                    </div>
                                    <div className="media-body"> 
                                        <Link to={`@${article.author.username}`}>       
                                            <h5 className="media-heading">{article.author.username}</h5>
                                        </Link>
                                        <h6 className="text-muted">
                                            <small>
                                                {new Date(article.createdAt).toDateString()}
                                            </small>
                                        </h6>
                                    </div>
                                </div>
                                <Link to={`articles/${article.slug}`}>
                                    <h2>{article.title}</h2>
                                    <p>{article.description}</p>
                                </Link>
                            </div>
                        )}
                    )
                  )}
                
            </div>
        )
    }
}

