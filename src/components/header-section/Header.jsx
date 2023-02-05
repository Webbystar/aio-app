import React, {Component} from "react";
import LogoIconSection from './header-logo/LogoComponent';
import NavigationSection from './header-navigation/NavigationComponent';

export default class HeaderComponent extends Component{

  render(){
    
    return (
      <nav className="main-header navbar navbar-expand-md bg-white navbar-white navbar-light elevation-1">

        {/*<div className="container">*/}
          {/* START : HEADER SECTION LOGO */}
          <LogoIconSection />
          {/* END : HEADER SECTION LOGO */}

          {/* START : HEADER SECTION NAVIGATION MENUS */}
          <NavigationSection />
          {/* END : HEADER SECTION NAVIGATION MENUS */}
        {/*</div>*/}

      </nav>
    )
  }

}