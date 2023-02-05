import React from "react";
import { Link } from 'react-router-dom';

export default class Footer extends React.Component{

  render(){

    return(

      <footer className="main-footer" id="footer_left_margin_state">
        
        <strong>Copyright &copy; 2022-2025<Link to="/">&nbsp;&nbsp;EQUIMENT Co Ltd</Link>.&nbsp;&nbsp;</strong>
        
        All rights reserved.
        
        <div className="float-right d-none d-sm-inline-block">
          <b>Version</b> 1.0.0
        </div>

      </footer>

    );

  }
}