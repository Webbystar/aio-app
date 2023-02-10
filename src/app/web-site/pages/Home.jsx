import React, {Component} from "react";
import PageHeader from "../../../components/header-section/header-PageSection/PageHeader";

export default class Home extends Component{

  render(){
    return(
      /**
       * PAGE WISE LEFT NAVIAGTIONS SECTIONS LOADED AS COMPONENT 
       */

      /* START : PAGE CONTENTS WRAPPER */
      <section className="content-wrapper">

        {/* START : PAGE HEADER SECTION */}
        <PageHeader />
        {/* END : PAGE HEADER SECTION */}

        {/* START : PAGE MAIN CONTENTS SECTION */}
        <section class="content" onload="">

          <div className="container-fluid">
            <div className="row">
              <div className="col col-lg-12 col-md-12 col-sm-12">
                {/*START : DATATABLE FORM */}
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">
                      <i className="fa fa-bars" aria-hidden="true" />
                      &nbsp;
                      <b>Home @ List:</b>
                    </h3>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body">
                    <div
                      className="alert alert-dismissible"
                      role="alert"
                      id="dismissable_response"
                      onclick="modules.Shorthand.ElementHiddenFlip(this)"
                    >
                      {/* Error Displaying Section */}
                    </div>
                    <table
                      id="data-table-buttons"
                      className="table table-bordered table-striped"
                    >
                      <thead>
                        <tr>
                          <th>S.N</th>
                          <th>IP</th>
                          <th>MODULE</th>
                          <th>RESOURCE</th>
                          <th>ACTIVITY</th>
                          <th>DATA SENT</th>
                          <th>RESPONSE</th>
                          <th>DATE STAMP</th>
                          <th>TIME STAMP</th>
                        </tr>
                      </thead>
                      <tbody id="tablecontents">
                        <tr>
                          <td colSpan={9} style={{ textAlign: "center", color: "red" }}>
                            &nbsp;
                          </td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <th>S.N</th>
                          <th>IP</th>
                          <th>MODULE</th>
                          <th>RESOURCE</th>
                          <th>ACTIVITY</th>
                          <th>DATA SENT</th>
                          <th>RESPONSE</th>
                          <th>DATE STAMP</th>
                          <th>TIME STAMP</th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  {/* /.card-body */}
                </div>
                {/*END : DATATABLE FORM */}
              </div>
            </div>
          </div>

        </section>
        {/* END : PAGE MAIN CONTENTS SECTION */}

      </section>
      /* END : PAGE CONTENTS WRAPPER */
    );
  }
}