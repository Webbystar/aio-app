/**
 * WEBBYSTARS DEFINED JAVA SCRIPT CLASS FOR SERVER SIDE PROCESSING:
 * ================================================================
 */
import ShorthandController from '../ShorthandController/ShorthandController.js';

export default class SystemSetupController{

    constructor(){

        /**
         * INITIALIZING INHERITED CLASS METHOD FOR THE
         * 
         * CHILD TO ACCESS ITS METHODS AND ATTRIBUTES
         */
        this.Shorthand = new ShorthandController();

        if( window.location.pathname == "/dashboard" ){

            this.Shorthand.InitializeElements.dashboard_blade();
        }else{
            
            this.Shorthand.InitializeElements.init_blade();
        }

        /**
         * LOADING THE NAVIGATIONS FOR THE SELECTED MODULE
         */
        this.Shorthand.RenderModuleNavigation();    
    }

    /**
     * SUBSIDIARIES REGISTRATION
     */
    SubsidiariesRegistration = async( button_displayname ) => {

        /**
         * HELPS TO MAINTAIN THE NAME BASED ON THE USER ACTION
         * 
         * AS THE SAME FORM CAN BE USED TO UPDATE OR CREATE THE RECORD
         */
        let button_display_text = $("#CreateSubsidiari").html() ;

        try{

            this.Shorthand.DismissableResponse("modal");

            this.Shorthand.EnableOrDisableElementStates( "#CreateSubsidiari", "class", "btn", "fa-spinner fa-spin" );
            
            /** A : COLLECTING USER INPUTS **/
            this.Shorthand.Request = {
                token:this.Shorthand.token,
                SubsidiarName:$('#subsidiarName').val(),
                SubsidiarAddress:$('#subsidiarAddress').val(),
                SubsidiarWebsite:$('#subsidiarWebsite').val(),
                SubsidiarInfo:$('#subsidiarInfo').val(),
                SubsidiarCode:$('#subsidiarCode').val(),
                SubsidiarSwiftCode:$('#subsidiarSwiftCode').val(),
                Countrie_id:$('#countrie_id').children('option:selected').val(),
                CountriCurrenciCode:$('#countrie_id').children('option:selected').data('countri-currency-code'),
                CountriCommonCode:$('#countrie_id').children('option:selected').data('countri-common-code')
            };

            let addup = 1;

            if( $("#dataControl").val() ){

                this.Shorthand.Request.subsidiarie_id = $("#dataControl").val();
            }

            if( $("#home_directorie").val() ){

                this.Shorthand.Request.home_directorie = $("#home_directorie").val();
            }

            /** B : SENDING USER INPUTS TO THE SERVER **/
            let response = await this.Shorthand.axios_http_request( '/api/subsidiaries/addsubsidiaries', this.Shorthand.Request, this.Shorthand.config );

            /** C : PRE-VIEWING THE RESPONSE TO USER **/
            if( response.Status == 201 ){

                this.Shorthand.EnableOrDisableElementStates( "#CreateSubsidiari", "class" );

                this.Shorthand.DismissableResponse( "on-modal", response );
                
                if( response.RecordSet.length > 0 ){

                    $("#tablecontents").empty();

                    this.UIDataTabulation( response.RecordSet );

                }else{

                    $( '#tablecontents' ).append( "<tr><td colspan='12' style='text-align: center;color:red'>"+ response.ResponseText +"</td></tr>" );
                }

            }else{

                this.Shorthand.EnableOrDisableElementStates( "#CreateSubsidiari", "class" );

                this.Shorthand.DismissableResponse( "on-modal", response );
            }

        }catch( error ){;

            this.CatchedErrorManagementFunction( error );
        }

            
    }

    /**
     * SUBSIDIARIES LIST DETAILS
     */
    SubsidiariesDetails = async() => {

        $("#tablecontents").empty();

        try{

            /** A : COLLECTING USER INPUTS **/
            this.Shorthand.Request = { token: this.Shorthand.token, module_id: $('#module-navigations').data('module') };

            let user_name = this.Shorthand.UserSession.Username || "" ;

            /** B : SENDING USER INPUTS TO THE SERVER **/
            let response = await this.Shorthand.axios_http_request( 'api/subsidiaries/retrievesubsidiaries/', this.Shorthand.Request, this.Shorthand.config, 'GET' );

            this.Shorthand.DismissableResponse( "on-form", response );

            /** C : PRE-VIEWING THE RESPONSE TO USER **/
            if( response.Status == 200 ){

                if( response.RecordSet.length > 0 ){

                    this.UIDataTabulation( response.RecordSet );

                }else{

                    $( '#tablecontents' ).append( "<tr><td colspan='12' style='text-align: center;color:red'>"+ response.ResponseText +"</td></tr>" );
                }

            }else{

                $( '#tablecontents' ).append( "<tr><td colspan='12' style='text-align: center;color:red'>"+ response.ResponseText +"</td></tr>" );

                this.Shorthand.DismissableResponse( "on-form", response );
            }

            this.Shorthand.DataTableFunctionalitiesInitilization();

        }catch( error ){

            this.Shorthand.CatchedErrorManagementFunction( error );
        }
    }

    /**
     * SUBSIDIARIES UPDATING
     */
    UpdateSubsidiarieStatus = ( recordName, actionMode, statuses_id, subsidiaries_id, subsidiarie ) => {

        try{

            /** A : COLLECTING USER INPUTS **/
            this.Shorthand.Request = { token: this.Shorthand.token, statuses_id : statuses_id, subsidiaries_id : subsidiaries_id, subsidiarie : subsidiarie };

            /**
             * ACCEPTED ICONS : "success", "error", "warning", "info" or "question"
             */

            this.Shorthand.ToastResponse( "success", "", "", actionMode, recordName, true, async ( ) => {

                /** B : SENDING USER INPUTS TO THE SERVER **/
                let response = await this.Shorthand.axios_http_request( 'api/subsidiaries/updatesubsidiaries/', this.Shorthand.Request, this.Shorthand.config );

                /** C : PRE-VIEWING THE RESPONSE TO USER **/
                if( response.Status == 201 ){

                    if( response.RecordSet.length > 0 ){

                        $("#tablecontents").empty();

                        this.UIDataTabulation( response.RecordSet );

                    }else{

                        $( '#tablecontents' ).append( "<tr><td colspan='12' style='text-align: center;color:red'>"+ response.ResponseText +"</td></tr>" );
                    }

                }else{

                    this.Shorthand.EnableOrDisableElementStates( "#CreateSubsidiari", "class" );
                }
            });
            

        }catch( error ){

            this.CatchedErrorManagementFunction( error );
        }
    }

    /**
     * SUBSIDIARIES UPDATING
     */
    EditSubsidiariesDetails = async( subsidiarie ) => {

        $("#modal_title").empty();
        $("#modal_title").append( "<i style='text-align: center;color:#dc3545!important;font-weight:bold'>EDITING : </i>" + subsidiarie.Name );

        $("#dataControl").val( subsidiarie.subsidiaries_id );
        $("#home_directorie").val( subsidiarie.Directory );
        $("#subsidiarName").val( subsidiarie.Name );
        $("#subsidiarAddress").val( subsidiarie.Address );
        $("#subsidiarWebsite").val( subsidiarie.Website );
        $("#subsidiarInfo").val( subsidiarie.Information );
        $("#subsidiarCode").val( subsidiarie.Code );
        $("#subsidiarSwiftCode").val( subsidiarie.Switfcode );

        modules.Shorthand.ReadSelectOptionCountriesDetails('countrie_id');

        $("#CreateSubsidiari").html("Update");
    }


    /**
     * TABULA SUBSIDIARY(ies) DATA RENDERING
     */
    UIDataTabulation( records ){

        let record_data = "";

        let sn = 0;

        records.forEach( subsidiarie => {

            let server_stamp = moment(  this.Shorthand.StringSplitterReturnArrai ( '.', subsidiarie.updated_at )[0] );
            
            let client_stamp = moment();

            let minutes = ( client_stamp.diff( server_stamp ) ) / 60000;

            let properties = "style='" + ( minutes <= 3 ? 'font-weight:bold;color:#dd4b39;' : '' ) + "' ";

            record_data = "<tr>";
            record_data += "<td>" + ( sn + 1 ) + "</td>";
            record_data += "<td "+ properties +">" + subsidiarie.Name + "</td>";
            record_data += "<td "+ properties +">" + subsidiarie.Address + "</td>";
            record_data += "<td "+ properties +">" + subsidiarie.Website + "</td>";
            record_data += "<td "+ properties +">" + subsidiarie.Code + "</td>";
            record_data += "<td "+ properties +">" + subsidiarie.Switfcode + "</td>";
            record_data += "<td "+ properties +">" + subsidiarie.Directory + "</td>";
            record_data += "<td "+ properties +">" + subsidiarie.Country + "</td>";
            record_data += "<td "+ properties +">" + subsidiarie.currencies_code + "</td>";
            record_data += "<td "+ properties +">" + subsidiarie.created_at + "</td>"; 
            record_data += "<td> <i class='btn btn-"+ this.Shorthand.StatusDecorationState( subsidiarie.statuses_id ) +"'>" + subsidiarie.Status + "</i></td>";

            record_data += "<td>";
            record_data += "<div class='btn-group'>";
            
            /*  ACTIVATE ACTION BUTTON STATE */
            record_data += "<button type='button' ";
            record_data += "class='btn btn-"+( subsidiarie.statuses_id==1 ? 'secondary' : 'success')+"' ";
            record_data += "onclick='modules.UpdateSubsidiarieStatus (\""+subsidiarie.Name+"\",\"Activate\", 1, \""+subsidiarie.subsidiaries_id+"\", \""+subsidiarie.Directory+"\")' ";
            record_data += ( subsidiarie.statuses_id==1 ? 'disabled' : '')+">";
            record_data += "<i class='fa fa-power-off' title='Activate'></i>";
            record_data += "</button>";
            
            /*  LOCK ACTION BUTTON STATE */
            record_data += "<button type='button' ";
            record_data += "class='btn btn-"+( subsidiarie.statuses_id==6 ? 'secondary' : 'warning')+"' ";
            record_data += "onclick='modules.UpdateSubsidiarieStatus (\""+subsidiarie.Name+"\",\"Lock\", 6, \""+subsidiarie.subsidiaries_id+"\", \""+subsidiarie.Directory+"\")' ";
            record_data += ( subsidiarie.statuses_id==6 ? 'disabled' : '')+">";
            record_data += "<i class='fa fa-lock' title='Lock'></i>";
            record_data += "</button>";
            
            /*  DELETE ACTION BUTTON STATE */
            record_data += "<button type='button' ";
            record_data += "class='btn btn-"+( subsidiarie.statuses_id==4 ? 'secondary' : 'danger')+"' ";
            record_data += "onclick='modules.UpdateSubsidiarieStatus (\""+subsidiarie.Name+"\",\"Delete\", 4, \""+subsidiarie.subsidiaries_id+"\", \""+subsidiarie.Directory+"\")' ";
            record_data += ( subsidiarie.statuses_id==4 ? 'disabled' : '')+">";
            record_data += "<i class='fas fa-trash' title='Delete'></i>";
            record_data += "</button>";
            
            /*  SUSPEND ACTION BUTTON STATE */
            record_data += "<button type='button' ";
            record_data += "class='btn btn-"+( subsidiarie.statuses_id==8 ? 'secondary' : 'info')+"' ";
            record_data += "onclick='modules.UpdateSubsidiarieStatus (\""+subsidiarie.Name+"\",\"Suspend\", 8, \""+subsidiarie.subsidiaries_id+"\", \""+subsidiarie.Directory+"\")' ";
            record_data += ( subsidiarie.statuses_id==8 ? 'disabled' : '')+">";
            record_data += "<i class='fa fa-ban' title='Suspend'></i>";
            record_data += "</button>";
            
            /*  EDIT ACTION BUTTON STATE */
            record_data += "<button type='button' class='btn btn-primary' onclick='modules.EditSubsidiariesDetails("+JSON.stringify( subsidiarie )+")' data-toggle='modal' data-target='#modal-add-subsidiaries-form'><i class='fa fa-edit' title='Edit Details'></i></button>";
            
            record_data += "</div>";
            record_data += "</td>";

            sn += 1;
            
            $( '#tablecontents' ).append( record_data );
        } );

    }


}