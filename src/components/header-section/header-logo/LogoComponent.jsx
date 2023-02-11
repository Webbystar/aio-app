import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { HashLink as LinkPageSection } from "react-router-hash-link";
import SubroutineController from "../../../componentControllers/SubroutineController";

export default class LogoComponent extends Component {

  constructor() {

    super();

    this.Subroutine = new SubroutineController();

    this.state = {
      companieLogo: "equimen-logo.png",
      companieName: null,
      companiecommonName: "EQUIMEN",
      companieHotlines: []
    };
  }

  componentDidMount = () => {

    let companie = this.Subroutine.personalizedCompanieBrand();

    this.setState({
      companieLogo: companie.companieLogo,
      companieName: companie.companieName,
      companiecommonName: companie.companiecommonName,
      companieHotlines: companie.companieHotlines
    });
  }

  renderPersonalizedCompanieBrand = () => {
    return (
      <ul className="navbar-nav">
        {
          /** ONLY EXECUTES IF THE HOTLINES ARE PROVIDED **/
          this.state.companieHotlines.length > 0 &&

          <li className="nav-item dropdown">
            <span to="/" className="nav-link dropdown-toggle" id="dropdownSubMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Our Hotline &nbsp;&nbsp;<i className="fa fa-mobile" aria-hidden="true" />
            </span>

            <ul aria-labelledby="dropdownSubMenu1" className="dropdown-menu border-0 shadow">
              <li className="nav-item">
                {this.state.companieHotlines.map((hotline, index) => (hotline.name === "call" ? <span className="nav-link" key={index} >{hotline.mobile}</span> : <Link to={{ pathname: hotline.mobile }} target="_blank" className="nav-link" key={index}>{hotline.name}<i className={hotline.icon + " float-sm-right"} aria-hidden="true" /></Link>))}
              </li>
            </ul>

          </li>
        }

        {/* START : CALENDAR DROPDOWN */}
        <li className="nav-item">
          <i className="float-sm-right">
            <input type="date" id="app-date" className="btn btn-block" defaultValue="2022-07-14" />
          </i>
        </li>
        {/* START : CALENDAR DROPDOWN */}
      </ul>
    );
  }

  render() {

    return (
      <>

        <LinkPageSection smooth to={this.state.companiecommonName.toLowerCase() + "/#"} className="navbar-brand">
          <img className="brand-image" src={require(`../../../companies/${this.state.companiecommonName}/logo_icon/${this.state.companieLogo}`)} alt="Company Logo" />
          <span>&nbsp;</span>
          <span className="brand-text font-weight-light">{this.state.companieName}</span>
        </LinkPageSection>

        <button className="navbar-toggler order-1" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* START : TOP LEFT HEADER NAVIGATIONS */}
        <div className="collapse navbar-collapse order-3" id="navbarCollapse">
          {this.renderPersonalizedCompanieBrand()}
        </div>
        {/* END : TOP LEFT HEADER NAVIGATIONS */}

      </>
    );

  }

}
