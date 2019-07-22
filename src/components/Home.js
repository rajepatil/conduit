import React from 'react';
import { Articles } from './Articles';
import { Banner } from './Banner';
import { Tags } from './tags';

export  class Home extends React.Component {

  render(){
    return (
    <div>
      <Banner/>
      <div className="container justify-content-center">
        <div className="row">
          <div className="p-3 col-9">
            <ul class="nav nav-tabs">
              <li class="nav-item">
                <a class="nav-link" href="#">Global feed</a>
              </li>
            </ul>
            <Articles/>
          </div>
          <div className="col-3">
            <Tags/>
          </div>
        </div>
      </div>
    </div>
    );
  }
}
