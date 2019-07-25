import React from 'react';

export  class Banner extends React.Component {
    render(){
      return (
        <div className="jumbotron text-center bg-success banner-text-color">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>
      );
    }
}