import React, {Component} from "react";
import HeaderSection from '../header-section/Header';
import RouteContentSection from "../../routes";
import FooterSection from '../footer-section/Footer';

export default class MainUIComponent extends Component{

  render(){

    return(
      /* START : MAIN BODY CONTENTS WRAPPER */
      <>

        {/* START : PRE-LOADER LOGO */}
        <section className="preloader flex-column justify-content-center align-items-center" id="logo-section">
          <img className="animation__shake" src="/app-img/preloader/equemen-preloader.gif" alt="" id="animation_logo" />
        </section>
        {/* END : PRE-LOADER LOGO */}

        {/* START : TOP HEADER / NAVIGATION CONTAINER MENU */}
        <HeaderSection />
        {/* END : TOP HEADER / NAVIGATION CONTAINER MENU */}

        {/* START : PAGE CONTENT SECTION */}
          <RouteContentSection />
        {/* END : PAGE CONTENT SECTION */}

        {/* START : PAGE FOOTER BAR */}
        <FooterSection />
        {/* END : PAGE FOOTER BAR */}

      </>
      /* END : MAIN BODY CONTENTS WRAPPER */
    );

  }

}