import React, { Component } from "react";
import { Link } from "react-router-dom";
/* MODULE HELPS TO PURIFY HTML CONTENTS TO BE DISPLAYED ON THE PAGE */
import DOMPurify from "dompurify";
import IndexController from "../../../componentControllers/websiteControllers/indexWebsiteController";

export default class AboutComponent extends Component{

  constructor(){
    
    super();

    this.About = new IndexController();

    this.AboutContents = this.About.AboutComponent();

    this.insights = this.AboutContents.insights[ this.About.indexOfCompanie ];

    this.state = { 
      insight_name: "",
      insight_list:[],
      aboutDetails: [],
    };
  }

  componentDidMount(){

    this.setState({
      insight_name : this.insights.name_entrie,
      insight_list : this.insights.insight_list,
      aboutDetails : this.AboutContents.aboutDetails
    });
  }

  AboutContentSummarizer= ( requested = "TabPanels" ) =>{

    let AboutSummarie = this.AboutContents.aboutDetails[0];

    let TabPanels = [];

    let TabContents = [];

    let companie_sectors = [];

    TabPanels.push( AboutSummarie.name );
    TabContents.push( AboutSummarie.contents );
    companie_sectors = AboutSummarie.companie_sectors;

    if( companie_sectors.length > 0 ){

      companie_sectors.forEach( sector => {

        TabPanels.push( sector.sector_name );
        TabContents.push( sector.sector_content );
      });
    }

    return eval( requested )
  }

  renderTabPanels = () =>{

    let tabs = this.AboutContentSummarizer();
    
    return(
      <>
      <ul className="nav nav-tabs" id="custom-tabs-four-tab" role="tablist">
        {tabs.map( (item, index) => (
          <li className="nav-item" key={index}>
            <a
              className={ (  index === 0 ? "nav-link active" : "nav-link" ) }
              id={ item.replace(/\s/g, '') + "-tab-section" }
              data-toggle="pill"
              href={ "#" + item.replace(/\s/g, '')}
              role="tab"
              aria-controls={ item.replace(/\s/g, '') + "-Content" }
              aria-selected="true"
            >
              {item}
            </a>
          </li>
        ) )}
      </ul>
      </>
    );

  }

  renderTabBodies = () =>{

    let tabs = this.AboutContentSummarizer();
    let bodies = this.AboutContentSummarizer( "TabContents" );

    return(
      <>
      <div className="tab-content" id="custom-tabs-four-tabContent">
        {bodies.map( (item, index) => (
          <div
            className={"tab-pane fade show" + (  index === 0 && " active") }
            id={tabs[index].replace(/\s/g, '')}
            role="tabpanel"
            aria-labelledby={tabs[index].replace(/\s/g, '') + "-tab-section"}
            key={index}
          >
            <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(item, { USE_PROFILES: { html: true } }) }}></div>
          </div>

        ))}
      </div>
      </>
    );
  }
  
  renderWhatsNewInsights = () =>{

    return(
      <>
      <ul className="products-list product-list-in-card pl-2 pr-2">
        {this.state.insight_list.map(
          (item,index) =>(
          <li className="item">

            <div className="product-img">
              <img src={item.img} alt="Product" className="img-size-50" />
            </div>

            <div className="product-info">
              <Link to="javascript:void(0)" className="product-title">
                {item.title}
                <span className="badge badge-success float-right">{item.costs}</span>
              </Link>
              <span className="product-description">
              {item.description}
              </span>
            </div>

          </li>
        ))}
      </ul>
      </>
    );
  }

  render(){

    return(
      <>
      {/* START : ABOUT EXECUTIVE SUMMARY COMPONENT */}
      <div className="col col-lg-8 col-md-8 col-sm-8">

        <div className="box box-solid">

          <div className="box-header with-border">
            {this.renderTabPanels()}
          </div>

          <div className="box-body">
            {this.renderTabBodies()}
          </div>
          {/* /.card */}
        </div>

      </div>

      {/* START : WHATS NEW COMPONENT */}
      <div className="col col-lg-4 col-md-4 col-sm-4">

        <div className="box box-solid">

          <div className="box-header with-border">
            <h5 className="box-title">
              <i className="fa fa-lightbulb text-yellow" aria-hidden="true"/>&emsp;{this.state.insight_name}
            </h5>
          </div>

          <div className="box-body">
            {this.renderWhatsNewInsights()}
          </div>

          <div className="card-footer text-center">
            <Link href="javascript:void(0)" className="uppercase">
              More Insights
            </Link>
          </div>

        </div>
      </div>

      </>
    );
  }
}