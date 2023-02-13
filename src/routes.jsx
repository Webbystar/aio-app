import React, { Component } from "react";
import { Routes, Route } from 'react-router-dom';
import WebsiteIndex from "./app/web-site/index";
import WebappIndex from "./app/web-app/index";
import baseCompanieUri from "../src/componentControllers/SubroutineController";

export default class UIRoutes extends Component {

  render() {

    let PostSecurities = false;

    let initCompanieUri = new baseCompanieUri();
    let companieName = initCompanieUri.applicationNavigations().companieAsBaseuri;

    return (
      <>
        <Routes>
          <Route exact path={PostSecurities ? "/webapp" : "/" + companieName} element={PostSecurities ? <WebappIndex /> : <WebsiteIndex />} />
        </Routes>
      </>
    );
  }
}
