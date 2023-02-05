import React, {Component} from "react";
import PageHeader from "../../../components/header-section/header-PageSection/PageHeader";
export default class About extends Component{

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
                      &nbsp;<b>About @ List:</b>
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
                    <button
                      type="button"
                      className="btn btn-success btn-sm"
                      onclick="modules.Shorthand.ReadSelectOptionCountriesDetails('countrie_id')"
                      data-toggle="modal"
                      data-target="#modal-add-subsidiaries-form"
                    >
                      <i className="fa fa-plus-circle" aria-hidden="true" />&nbsp;
                      <span onclick="modules.Shorthand.ResetModalDetails('Subsidiary','CreateSubsidiari')">
                        <b title="Add New Subsidiary">Add New</b>
                      </span>
                    </button>
                    <table
                      id="data-table-buttons"
                      className="table table-bordered table-striped"
                    >
                      <thead>
                        <tr>
                          <th>S.N 1</th>
                          <th>NAME 2</th>
                          <th>ADDRESS 3</th>
                          <th>WEBSITE</th>
                          <th>BANK CODE</th>
                          <th>SWIFT CODE</th>
                          <th>DIRECTORY</th>
                          <th>COUNTRY</th>
                          <th>CURRENCY</th>
                          <th>DATE CREATED</th>
                          <th>STATUS</th>
                          <th>ACTION</th>
                        </tr>
                      </thead>
                      <tbody id="tablecontents">
                        <tr>
                          <td
                            colSpan={12}
                            style={{ textAlign: "center", color: "red" }}
                          >
                            &nbsp;
                          </td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <th>S.N</th>
                          <th>NAME</th>
                          <th>ADDRESS</th>
                          <th>WEBSITE</th>
                          <th>BANK CODE</th>
                          <th>SWIFT CODE</th>
                          <th>DIRECTORY</th>
                          <th>COUNTRY</th>
                          <th>CURRENCY</th>
                          <th>DATE CREATED</th>
                          <th>STATUS</th>
                          <th>ACTION</th>
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
          {/*START : SUBSIDIARY REGISTRATION MODAL */}
          {/* .modal */}
          <div className="modal fade in" id="modal-add-subsidiaries-form">
            {/* .modal-dialog */}
            <div className="modal-dialog modal-xl">
              {/* .modal-content */}
              <div className="modal-content">
                <div className="card-header elevation-2">
                  <h4 className="card-title">
                    <span className="btn btn-success btn-sm">
                      <i className="fa fa-edit" aria-hidden="true" />
                    </span>
                    &nbsp;
                    <span id="modal_title">Enter Subsidiary details:</span>
                  </h4>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span className="btn btn-danger btn-sm">
                      <i className="fas fa-times" aria-hidden="true" />
                    </span>
                  </button>
                </div>
                {/* .modal-body */}
                <div className="modal-body">
                  <div
                    className="alert alert-dismissible"
                    role="alert"
                    id="modal_response"
                    onclick="modules.Shorthand.ElementHiddenFlip(this)"
                  >
                    {/* Error Displaying Section */}
                  </div>
                  {/* .card-body */}
                  <div className="card-body">
                    <div className="form-group row" style={{ display: "none" }}>
                      <label htmlFor="dataControl" className="col-sm-2 col-form-label">
                        {/* HIDDEN INPUT TYPE TO HOLD ID FOR A RECORD TO BE UPDATED */}
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="hidden"
                          className="form-control"
                          id="dataControl"
                          name="dataControl"
                          oninput="this.value = this.value.toUpperCase()"
                          disabled=""
                        />
                      </div>
                    </div>
                    <div className="form-group row" style={{ display: "none" }}>
                      <label
                        htmlFor="home_directorie"
                        className="col-sm-2 col-form-label"
                      >
                        {/* HIDDEN INPUT TYPE TO HOLD SUBSIDIARY DIRECTORY IN PLACE FOR A RECORD TO BE UPDATED */}
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="hidden"
                          className="form-control"
                          id="home_directorie"
                          name="home_directorie"
                          oninput="this.value = this.value.toUpperCase()"
                          disabled=""
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="subsidiarName"
                        className="col-sm-2 col-form-label"
                      >
                        Subsidiary Name
                        <i className="fas fa-star float-right text-sm text-danger" />
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          id="subsidiarName"
                          name="subsidiarName"
                          oninput="this.value = this.value.toUpperCase()"
                          placeholder="Write Subsidiary Name"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="subsidiarAddress"
                        className="col-sm-2 col-form-label"
                      >
                        Subsidiary Address
                        <i className="fas fa-star float-right text-sm text-danger" />
                      </label>
                      <div className="col-sm-10">
                        <textarea
                          className="form-control"
                          rows={3}
                          id="subsidiarAddress"
                          name="subsidiarAddress"
                          placeholder="Write Subsidiary Postal Address"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="subsidiarWebsite"
                        className="col-sm-2 col-form-label"
                      >
                        Subsidiary Website
                        <i className="fas fa-star float-right text-sm text-danger" />
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="url"
                          className="form-control"
                          rows={3}
                          id="subsidiarWebsite"
                          name="subsidiarWebsite"
                          pattern="https://.+"
                          required=""
                          placeholder="Write Subsidiary Website"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="subsidiarInfo"
                        className="col-sm-2 col-form-label"
                      >
                        Subsidiary Information
                      </label>
                      <div className="col-sm-10">
                        <textarea
                          className="form-control"
                          rows={3}
                          id="subsidiarInfo"
                          name="subsidiarInfo"
                          placeholder="Write Subsidiary additional information"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="subsidiarCode"
                        className="col-sm-2 col-form-label"
                      >
                        Bank Code
                        <i className="fas fa-star float-right text-sm text-danger" />
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          id="subsidiarCode"
                          name="subsidiarCode"
                          oninput="this.value = this.value.toUpperCase()"
                          placeholder="Write Subsidiary Bank Code"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="subsidiarSwiftCode"
                        className="col-sm-2 col-form-label"
                      >
                        Swift Code
                        <i className="fas fa-star float-right text-sm text-danger" />
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          id="subsidiarSwiftCode"
                          name="subsidiarSwiftCode"
                          oninput="this.value = this.value.toUpperCase()"
                          placeholder="Write Subsidiary Swift Code"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="countrie_id" className="col-sm-2 col-form-label">
                        Country
                        <i className="fas fa-star float-right text-sm text-danger" />
                      </label>
                      <div className="col-sm-6">
                        <select
                          className="form-control select2"
                          id="countrie_id"
                          name="countrie_id"
                        >
                          <option selected="selected" value={0}>
                            Select Country of Operation
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {/* /.card-body */}
                </div>
                {/* /.modal-body */}
                <div className="modal-footer justify-content-between">
                  <div className="col-2">
                    <button
                      type="button"
                      className="btn btn-default btn-block"
                      data-dismiss="modal"
                      onclick="modules.Shorthand.ResetModalDetails('Subsidiary','CreateSubsidiari')"
                    >
                      Close
                    </button>
                  </div>
                  <div className="col-2">
                    <button
                      type="button"
                      className="btn btn-success btn-block"
                      id="CreateSubsidiari"
                      onclick="modules.SubsidiariesRegistration()"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
              {/* /.modal-content */}
            </div>
            {/* /.modal-dialog */}
          </div>

        </section>
        {/* END : PAGE MAIN CONTENTS SECTION */}

      </section>
      /* END : PAGE CONTENTS WRAPPER */
    );
  }
}