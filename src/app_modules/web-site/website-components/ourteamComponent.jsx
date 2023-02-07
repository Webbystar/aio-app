import React, { Component } from "react";

import IndexController from "../../../componentControllers/websiteControllers/indexWebsiteController";

export default class OurTeamComponent extends Component {

  constructor() {

    super();

    this.OurTeam = new IndexController();

    this.OurTeamContents = this.OurTeam.OurTeamCOmponent();

    this.state = { our_team: [] };
  }

  componentDidMount = () => {

    this.setState({ our_team: this.OurTeamContents.teamMembers });
  }

  renderOurTeamDetails = () => {

    let ourTeam = this.state.our_team;

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

            <div className="card-footer">
              <div className="row" style={{ backgroundColor: '#f2f2f2' }}>&emsp;</div>
              <div className="row">
                {this.renderTeamContacts(member.memberContacts)}
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
          <div className={"col-sm-4" + (index < 2 && " border-right")} key={index} >
            <div className="description-block">
              <h5 className="description-header">{index == 0 ? "Mobile Phone" : (index == 1 ? "Email Address" : "Years of Experience")}</h5>
              <span className="description-text">{index == 0 ? contact.memberPhone : (index == 1 ? contact.memberEmail : contact.memberExperience)}</span>
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