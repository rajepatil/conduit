import React from 'react';
import SpinnerPage from './SpinnerPage';

export class Tags extends React.Component{
    constructor(){
        super();
        this.state = {tags:[]};
        this.state = {loading: true}
    }

    componentDidMount() {
        fetch('https://conduit.productionready.io/api/tags')
        .then(res => res.json() )
        
        .then(data => {
            this.setState({ 
                tags: data.tags,
                loading: false 
            })
        })
        
        .catch(error => console.log(error))
    }

    render(){
        const {tags, loading} = this.state;
        return(
            <div className="alert alert-success">
            <h5>Popular Tags</h5>
                 { loading || !tags ? (<div className="text-center"><SpinnerPage /></div>) : (
                    tags && tags.map((tag) => {
                        return (
                            <button className="btn-success rounded-pill m-1 " key={tag}>{tag}</button>
                        )
                    }) )
                }
            </div>
        )
    }
}

