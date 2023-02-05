import React, {Component} from "react";
import { Link } from 'react-router-dom';

export default class PageHeader extends Component{

  render(){

    return(
      /* START : PAGE HEADER SECTION */
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>&nbsp;</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">

                <li className="breadcrumb-item active">
                  <Link to="/" className="btn btn-sm bg-info">
                    <i className="fa fa-tachometer-alt" aria-hidden="true"></i> &nbsp;<b>Modules Dashboard</b>
                  </Link>
                </li>

                <li className="breadcrumb-item">
                  <Link to="/" className="btn btn-sm bg-secondary">
                    <i className="fa fa-edit" aria-hidden="true"></i> &nbsp;<b>Activity Logs</b>
                  </Link>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>
      /* END : PAGE HEADER SECTION */
    );
  }
}