import React, {Component} from "react";
import { Routes, Route } from 'react-router-dom';
import WebsiteIndex from "./app_modules/web-site/index";
import WebappIndex from "./app_modules/web-app/index";

export default class UIRoutes extends Component{

  render(){
    let PostSecurities = false;
    return(
      <>
      <Routes>
        <Route exact path={ PostSecurities ? "/webapp": "/"} element={ PostSecurities ? <WebappIndex /> : <WebsiteIndex /> } />
      </Routes>
      </>
    );
  }
}
