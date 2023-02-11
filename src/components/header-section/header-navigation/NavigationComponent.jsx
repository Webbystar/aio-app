import React, { Component } from "react";
import { Link } from "react-router-dom";
import { HashLink as LinkPageSection } from "react-router-hash-link";
import SubroutineController from "../../../componentControllers/SubroutineController";

export default class HeaderNavigationComponent extends Component {

  constructor() {

    super();

    this.Subroutine = new SubroutineController();

    this.state = { navs: [], companieAsBaseuri: "" };
  }

  componentDidMount = () => {

    this.setState({ navs: this.Subroutine.applicationNavigations().navigations, companieAsBaseuri: this.Subroutine.applicationNavigations().companieAsBaseuri });
  }

  render = () => {

    return (

      <>
        {/* START : TOP RIGHT HEADER NAVIGATIONS */}
        <ul className="order-1 order-md-3 navbar-nav navbar-no-expand ml-auto">

          {/* START : SEARCH CONTROL */}
          <li className="nav-item">
            <Link to="/" className="nav-link" data-widget="navbar-search" role="button">
              <i className="fas fa-search" />
            </Link>
            <div className="navbar-search-block">
              <form className="form-inline">
                <div className="input-group input-group-sm">
                  <input className="form-control form-control-navbar" type="search" placeholder="Write Search Keyword here..." aria-label="Search" data-search />
                  <div className="input-group-append">
                    {/*<button className="btn btn-navbar" type="submit"><i className="fas fa-search"></i></button>*/}
                    <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                      <i className="fas fa-times" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li>
          {/* END : SEARCH CONTROL */}

          {/* START : PAGE NAVIGATION */}
          <ul className="nav nav-tabs" id="custom-tabs-four-tab" role="tablist" data-baseuri={this.state.companieAsBaseuri}>
            {this.state.navs.map((item, index) => (<li className="nav-item card-info card-outline-tabs card-outline" key={index}><LinkPageSection smooth to={'/#' + this.state.companieAsBaseuri + (item.endpoint && "-") + item.endpoint} className={(index === 0 ? "nav-link active" : "nav-link")} data-toggle="pill">{item.endpointName}</LinkPageSection> </li>))}
            {/*{this.state.navs.map( ( item, index ) => ( <li  key={index}><LinkPageSection smooth to={item.endpoint} className="nav-link">{item.endpointName}</LinkPageSection> </li> ) )}*/}
          </ul>
          {/* START : PAGE NAVIGATION */}

        </ul>
        {/* END : TOP RIGHT HEADER NAVIGATIONS */}
      </>

    );

  }

}