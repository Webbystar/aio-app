import React, { Component } from "react";
import { Link } from "react-router-dom";
import IndexController from "../../../componentControllers/websiteControllers/indexWebsiteController";

export default class HomeComponent extends Component {

  constructor() {

    super();

    this.Home = new IndexController();

    this.state = {
      slides: [],
    };
  }

  componentDidMount = () => {

    this.setState({ slides: this.Home.IndexSlideComponent() });
  }

  renderSlideIndicators = () => {

    return (
      <>
        {this.state.slides.map((item, index) => (<li data-target="#carouselExampleIndicators" key={index} data-slide-to={index} className="" />))}
      </>
    );
  }

  renderSlideImages = () => {

    return (
      <>
        {
          this.state.slides.map((item, index) => (
            <div className={index === 0 ? "carousel-item active" : "carousel-item"} key={index}>
              <img className="card-img-top d-block w-100" src={item.src} alt={item.alt} />
              <div className="card-img-overlay d-flex flex-column justify-content-end">

                <h3 className="card-title text-primary text-white">{item.captionTitle}</h3>

                <p className="card-text text-white pb-2 pt-1">
                  {item.captionText}
                </p>

                <Link to="/" className="text-white">{(index + 1) + " . " + item.captionReadmore}</Link>

              </div>
            </div>
          ))
        }
      </>
    );
  }

  renderSlideControls = () => {

    let control = [
      { anc_class: "carousel-control-prev", anc_dataSlide: "prev", anc_span_iClass: "fas fa-chevron-left", anc_span_text: "Previous" },
      { anc_class: "carousel-control-next", anc_dataSlide: "next", anc_span_iClass: "fas fa-chevron-right", anc_span_text: "Next" }
    ];

    return (
      <>
        {
          control.map((item, index) => (
            <a className={item.anc_class} href="#carouselExampleIndicators" key={index} role="button" data-slide={item.anc_dataSlide}>
              <span className="carousel-control-custom-icon" aria-hidden="true">
                <i className={item.anc_span_iClass} />
              </span>
              <span className="sr-only">{item.anc_span_text}</span>
            </a>
          ))
        }
      </>
    );
  }

  render = () => {

    return (
      <div className="col col-lg-12 col-md-12 col-sm-12">
        {/* START : CAROUSEL IMAGES */}
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            {this.renderSlideIndicators()}
          </ol>
          <div className="carousel-inner">
            {this.renderSlideImages()}
          </div>
          {this.renderSlideControls()}
        </div>
        {/* END : CAROUSEL IMAGES */}
      </div>
    );
  }
}