import React, { Component } from "react";
import HomeComponent from "./website-components/homeComponent";
import AboutComponent from "./website-components/aboutComponent";
import ProductServiceComponent from "./website-components/productserviceComponent";
import OurTeamComponent from "./website-components/ourteamComponent";

export default class WebSiteIndex extends Component {

  render = () => {

    return (
      /**
       * PAGE WISE LEFT NAVIAGTIONS SECTIONS LOADED AS COMPONENT
       */

      /* START : PAGE CONTENTS WRAPPER */
      <section className="content-wrapper">

        {/* START : PAGE MAIN CONTENTS SECTION */}
        <section className="content">

          <div className="container-fluid">

            <section className="row" id="#">
              <HomeComponent />
            </section>

            <section className="row" id="about" style={{ paddingRight: "50px", paddingTop: "30px", paddingLeft: "50px", backgroundColor: "#fff" }}>
              <AboutComponent />
            </section>

            <section className="row" id="products_services" style={{ paddingRight: "50px", paddingTop: "30px", paddingLeft: "50px", backgroundColor: "#fff" }}>
              <ProductServiceComponent />
            </section>

            <section id="our_team" style={{ paddingRight: "50px", paddingTop: "30px", paddingLeft: "50px", backgroundColor: "#fff" }}>
              <OurTeamComponent />
            </section>

          </div>

        </section>
        {/* END : PAGE MAIN CONTENTS SECTION */}

      </section>
      /* END : PAGE CONTENTS WRAPPER */
    );

  }
}