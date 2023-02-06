import React, { Component } from "react";
/* MODULE HELPS TO PURIFY HTML CONTENTS TO BE DISPLAYED ON THE PAGE */
import DOMPurify from "dompurify";

/**
 * Date : 24th Jan 2023
 * By : Webbystar Ngwayo
 * From https://splidejs.com/integration/react-splide/
 *
 * import "@splidejs/react-splide/css/skyblue";
 * import "@splidejs/react-splide/css";
 */
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/sea-green";

import IndexController from "../../../componentControllers/websiteControllers/indexWebsiteController";

export default class ProductServiceComponent extends Component {

  constructor() {

    super();

    this.ProductService = new IndexController();

    this.ProductServiceContents = this.ProductService.ProductServiceComponent();

    this.productDetails = this.ProductServiceContents.productDetails[this.ProductService.indexOfCompanie];

    this.state = {
      sector_name: "",
      sector_contents: "",
      sector_products: []
    };
  }

  componentDidMount = () => {

    this.setState({
      sector_name: this.productDetails.name,
      sector_contents: this.productDetails.contents,
      sector_products: this.productDetails.sector_products
    });
  }

  ProductServiceContentSummarizer = () => {

    let ProductServiceSector = this.state.sector_products;

    let TabPanels = [];

    if (ProductServiceSector.length > 0) {

      ProductServiceSector.forEach(product => {

        TabPanels.push({ sector_name: product.sector_name, sector_product: product.sector_product, product_release: product.product_release });
      });
    }

    return TabPanels;
  }

  renderTabPanels = () => {

    let tabs = this.ProductServiceContentSummarizer();

    return (
      <div className="nav flex-column nav-tabs h-100" id="vert-tabs-tab" role="tablist" aria-orientation="vertical">
        {tabs.map((item, index) => (
          <a
            key={index}
            className={(index === 0 ? "nav-link active" : "nav-link")}
            id={"vert-tabs-" + item.sector_name.replace(/\s/g, '') + "-tab"}
            data-toggle="pill"
            href={"#vert-tabs-" + item.sector_name.replace(/\s/g, '')}
            role="tab"
            aria-controls={"vert-tabs-" + item.sector_name.replace(/\s/g, '')}
            aria-selected={(index === 0 ? "true" : "false")}
          >
            {item.sector_name}
          </a>
        ))}
      </div>
    );

  }

  renderTabBodies = () => {

    let bodies = this.ProductServiceContentSummarizer();

    return (
      <div className="row">
        <div className="tab-content" id="vert-tabs-tabContent">
          {bodies.map((item, index) => (

            <div
              key={index}
              className={(index === 0 ? "tab-pane text-left fade show active" : "tab-pane fade")}
              id={"vert-tabs-" + item.sector_name.replace(/\s/g, '')}
              role="tabpanel"
              aria-labelledby={"vert-tabs-" + item.sector_name.replace(/\s/g, '') + "-tab"}
            >
              <div className="row" style={{ padding: "20px" }}>
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.sector_product, { USE_PROFILES: { html: true } }) }}></div>
              </div>

              {item.product_release.length > 0 &&
                <div className="row">
                  <Splide options={{ type: 'loop', autoplay: true, focus: 'center', perPage: 3, perMove: 1, height: '10rem', autoWidth: true }} aria-labelledby={item.sector_name}>
                    {item.product_release.map((img, idImg) => (
                      <SplideSlide key={idImg}>
                        <div className="col-md-12">
                          <div className="position-relative">
                            <img src={img.img_src} alt={img.caption} className="img-fluid" />
                            <div className="ribbon-wrapper ribbon-lg">
                              <div className="ribbon bg-success text-lg">
                                {img.ribon_text}
                              </div>
                            </div>
                          </div>
                        </div>
                      </SplideSlide>
                    ))}
                  </Splide>
                </div>
              }

            </div>

          ))}
        </div>
      </div>
    );
  }

  render = () => {

    return (
      <div className="box box-solid">

        <div className="box-header with-border">

          <h5 className="box-title">
            <i className="fa fa-cart-arrow-down text-info" aria-hidden="tue" />&emsp;{this.state.sector_name}
          </h5>
        </div>

        <div className="box-body">
          <div className="row">

            <div className="col-5 col-sm-3">
              {this.renderTabPanels()}
            </div>

            <div className="col-7 col-sm-9">
              {this.renderTabBodies()}
            </div>

          </div>
        </div>

      </div>
    );
  }
}