import React, { Component } from "react";
import { Link } from "react-router-dom";

import IndexController from "../../../componentControllers/websiteControllers/indexWebsiteController";

export default class OurTeamComponent extends Component {

  constructor() {

    super();

    this.OurTeam = new IndexController();

    this.OurTeamContents = this.OurTeam.OurTeamComponent();

    this.TeamMembers = this.OurTeamContents[0];

    this.Companies = this.OurTeamContents[1];

    this.state = { our_team: [], member_companie: [] };
  }

  componentDidMount = () => {

    this.setState({
      our_team: this.TeamMembers.teamMembers,
      member_companie: this.Companies
    });
  }

  renderOurTeamDetails = () => {

    let ourTeam = this.state.our_team;
    let teamCompanie = this.state.member_companie;

    let col_width = 12 / ourTeam.length;

    return (
      <>
        {ourTeam.map((member, index) => (
          <div className={"col-md-" + col_width} key={index}>

            <div className="card card-widget widget-user shadow">
              <div className={"widget-user-header bg-" + (index % 2 == 0 ? "info" : "success")}>
                <h3 className="widget-user-username">{member.memberName}</h3>
                <h5 className="widget-user-desc">{member.memberDesignation}</h5>
              </div>
              <div className="widget-user-image">
                <img
                  className="img-circle elevation-2"
                  src={member.memberAvatar}
                  alt={member.memberName + " Avatar"}
                />
              </div>
            </div>

            <div className="card-footer" style={{ border: 1, borderColor: '#52c1f0', borderStyle: 'solid', borderRadius: ' 0px 0px 12px 12px', backgroundColor: '#ffffff' }}>
              <div className="row">&emsp;</div>

              <div className="row">
                {this.renderTeamContacts(member.memberContacts)}
              </div>

              <div className="row">&emsp;</div>

              <div className="card-footer p-0">
                <ul className="nav flex-column">

                  <li className="nav-item">
                    <span className="nav-link">
                      {member.memberName} {/*<span className={"float-right"}>31</span>*/}
                    </span>
                  </li>

                  <li className="nav-item">
                    <span className="nav-link">
                      {member.memberDesignation}
                    </span>
                  </li>

                  <li className="nav-item">
                    <span className="nav-link">
                      {member.memberProfession}
                    </span>
                  </li>

                  <li className="nav-item">
                    <span className="nav-link">
                      {teamCompanie.companieName}
                    </span>
                  </li>

                  <li className="nav-item">
                    <span className="nav-link">
                      {teamCompanie.address}
                    </span>
                  </li>

                  <li className="nav-item">
                    <span className="nav-link">
                      {teamCompanie.location}
                    </span>
                  </li>

                </ul>
              </div>

              <div className={"row widget-user-header bg-" + (index % 2 == 0 ? "info" : "success")} style={{ border: 1, borderStyle: 'solid', borderRadius: '0px 0px 10px 10px' }}>
                {this.renderTeamSocials(member.socialMedia)}
              </div>

            </div>

          </div>
        ))}
      </>
    );

  }

  renderTeamContacts = (contacts) => {

    return (
      <>
        {contacts.map((contact, index) => (
          <div className={"col-sm-6" + (index < (contacts.length - 1) && " border-right")} key={index} >
            <div className="description-block">
              <h5 className="description-header">{contact.contactName}</h5>
              <span className="description-text" style={{ textTransform: 'lowercase' }}>{contact.usedContact}</span>
            </div>
          </div>
        ))}
      </>
    );
  }

  renderTeamSocials = (socials) => {

    return (
      <>
        {socials.map((social, index) => (
          <div className={"col-sm-3" + (index < (socials.length - 1) && " border-right")} key={index}>
            <div className="description-block">
              {index < (socials.length - 1) ? <Link to={social.socialUrl} target="_blank" style={{ color: "#ffffff" }}>{social.socilaName}</Link> : <Link to={social.socialUrl} target="_blank" style={{ color: "#ffffff" }}>&emsp;{social.socilaName}</Link>}
            </div>
          </div>
        ))}
      </>
    );
  }

  render = () => {

    return (
      <>
        {/* START : OUR SUCCESS TEAM HEADER COMPONENT */}
        <div className="row">
          <h5 className="box-title">
            <i className="fa fa-users text-success" aria-hidden="tue" />&emsp;Our Success Team
          </h5>
        </div>

        {/* START : OUR SUCCESS TEAM CARD CONTENTS COMPONENT */}
        <div className="row">
          {this.renderOurTeamDetails()}
        </div>
      </>
    );

  }
}