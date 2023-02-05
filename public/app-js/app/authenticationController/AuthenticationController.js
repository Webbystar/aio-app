/**
 * WEBBYSTARS DEFINED JAVA SCRIPT CLASS FOR SERVER SIDE PROCESSING:
 * ================================================================
 */
import ShorthandController from '../ShorthandController/ShorthandController.js';

export default class AuthenticationController{

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

            /**
             * LOADING THE NAVIGATIONS FOR THE SELECTED MODULE
             */
            this.Shorthand.RenderModuleNavigation();
        }
    }

    UserSignin = async () => {

        this.Shorthand.EnableOrDisableElementStates( "#UserSignin", "class", "btn", "fa-spinner fa-spin" );
        
        this.Shorthand.DismissableResponse( );
        
        /** A : COLLECTING USER INPUTS **/
        this.Shorthand.Request = {
            token:this.Shorthand.token,
            authEmail:$('#authEmail').val(),
            authPassword:$('#authPassword').val(),
            authOffice365:$('#authOffice365').is(":checked")
        };

        /** B : SENDING USER INPUTS TO THE SERVER **/
        let response = await this.Shorthand.axios_http_request( 'api/authenticate/login', this.Shorthand.Request, this.Shorthand.config );

        /** C : PRE-VIEWING THE RESPONSE TO USER **/
        if( response.Status == 200 ){

            this.Shorthand.DismissableResponse( "on-form", response );

            this.Shorthand.EnableOrDisableElementStates( "#UserSignin", "class" );

            if( typeof response.Route !== 'undefined' && response.Route.length != '' && response.Route != '/' ){

                window.location.href = response.Route;
            }

        }else{

            this.Shorthand.DismissableResponse( "on-form", response );

            this.Shorthand.EnableOrDisableElementStates( "#UserSignin", "class" );
        }

    }

    UserLockScreen = () => {

        let request = { token:this.Shorthand.token, execute_action: 'lockscreen', pathname:location.pathname};

        this.UserSignoutOrLockScreen( request );

    }

    UserSessionDataRendering = async () => {

        let withoutSession = ['/','/changepassword','/lockscreen','/tokenauthenticate'];

        let SessionState = $('meta[name="SessionState"]').attr('content')  || null;

        switch( SessionState ){

            case null:

                if( !withoutSession.includes( location.pathname ) ){

                    window.location.href = "/";
                }
            break;

            default:

                this.PopulateSessionData();
            break;

        }
    
    }

    PopulateSessionData = () => {

        document.getElementById('app-date').valueAsDate = new Date();

        /** 
         * CREATING A VARIABLE AND PASSING TO IT CURRENT USER SESSION
         **/
        let SessionState = this.Shorthand.UserSession;

        if( SessionState.icon == "success" ){

          this.Shorthand.ToastResponse( SessionState.icon, SessionState.message );
        }        

        
        if( SessionState.UserImage ){

            $('#userImage').removeAttr( "src" );
            $('#userImage').attr("src", SessionState.UserImage );
        }
        
        $('#userNames').append( "<b>"+ SessionState.FullName +"</b>" );

        $('#staff_id').attr( "placeholder", SessionState.StaffNumber );

        $('#email').append( "E-mail: <a href='#'>"+ SessionState.email +"</a>" );

        $('#token_serial').attr( "placeholder", SessionState.TokenSerial );

        $('#jobTitle').append( SessionState.JobTitleName || "NOT ASSIGNED" );

        $('#user_branch').attr( "placeholder",  SessionState.BrancheName || "NOT ASSIGNED" );

        $('#job_title').attr("placeholder", SessionState.JobTitleName || "NOT ASSIGNED" );

        $('#birth_date').attr( "placeholder", SessionState.BirthDate );
        $('#join_date').attr( "placeholder", SessionState.JoinDate );

        $('#'+ SessionState.Gender ).attr( "checked",true );

        /** PASSING THE VALUE OF A CURRENT ROUTE TO THE ELEMENT **/
        $('#currentRoute').attr("data-app-route",window.location.pathname);

    }

    ModuleListDashboad = async  ( element, propergated_element_id ) => {

        /**
         * CLEARING SESSION STORE FOR STORED DATA
         * 
         * THIS IS SPECIFIC FOR CLEARING THE VALUES STORED
         * 
         * TO HOLD THEME STATE AND MODULE NAVIGATIONS FOR THE USER
         * 
         * WHEN NAVIGATING TO AUDIT TRAIL ROUTE FOR A SELECTED MODULE
         * 
         * ie: 
         *      sessionStorage.setItem('module-theme', $( "#module-theme" ).data('module-theme') );
         *      
         *     sessionStorage.setItem( 'navigations',  JSON.stringify( RecordSet ) );
         * 
         * AS DEFINED IN  InitializeModuleNavigation() FOR A SUCCESS STATUS
         */
        sessionStorage.clear();

        /** A : COLLECTING USER INPUTS **/
        this.Shorthand.Request = { token: this.Shorthand.token };

        /** B : SENDING USER INPUTS TO THE SERVER **/
        let response = await this.Shorthand.axios_http_request( 'api/module/retrievemodules/', this.Shorthand.Request, this.Shorthand.config, 'GET' );
        
        let panel_counter = 0;

        let user_trail = '/moduleaudittrail';

        let panel_section = "<div class='row'></div>";

        let panels_states = {
            first_panel :{ color : 'success' },
            second_panel :{ color : 'info' },
            third_panel :{ color : 'warning' },
            fourth_panel :{ color : 'danger' }
        };

        this.Shorthand.DismissableResponse( "on-form", response );

        /** C : PRE-VIEWING THE RESPONSE TO USER **/
        if( response.Status == 200 ){

            panel_section = '';

            $("#application_modules div").remove();

            response.RecordSet.forEach( app_module => {

                let set_panel = Object.keys( panels_states )[ panel_counter ];

                let set_color = eval('panels_states.'+set_panel+'.color');

                if( panel_counter < 3 ){

                    panel_section += "<div class='col-lg-3 col-6'>";

                    panel_section += "<div class='small-box bg-"+ set_color +"'>";

                    panel_section += "<div class='inner'>";
                    panel_section += "<h3>"+ app_module.module_code +"</h3>";
                    panel_section += "<p>"+ app_module.module_name +"</p>";
                    panel_section += "</div>";

                    panel_section += "<div class='icon'>";
                    panel_section += "<i class='"+ app_module.module_icon +"'></i>";
                    panel_section += "</div>";

                    panel_section += "<a href='#' class='small-box-footer' data-source-url='"+ window.location.pathname +"' data-destination-url='"+ user_trail +"' data-module='"+ app_module.id +"' onclick='modules.InitializeModuleNavigation(this)'> Enter : " + app_module.module_name + "  <i class='fas fa-arrow-circle-right'></i></a>";
                    
                    panel_section += "</div>";
                    
                    panel_section += "</div>";

                    $("#application_modules div").remove();

                    $( '#application_modules' ).append( "<div class='row'>" + panel_section + "</div>" );
                }
                else if( panel_counter == 3 ){

                    panel_section += "<div class='col-lg-3 col-6'>";

                    panel_section += "<div class='small-box bg-"+ set_color +"'>";

                    panel_section += "<div class='inner'>";
                    panel_section += "<h3>"+ app_module.module_code +"</h3>";
                    panel_section += "<p>"+ app_module.module_name +"</p>";
                    panel_section += "</div>";

                    panel_section += "<div class='icon'>";
                    panel_section += "<i class='"+ app_module.module_icon +"'></i>";
                    panel_section += "</div>";

                    panel_section += "<a href='#' class='small-box-footer' data-source-url='"+ window.location.pathname +"' data-destination-url='"+ user_trail +"' data-module='"+ app_module.id +"' onclick='modules.InitializeModuleNavigation(this)'> Enter : " + app_module.module_name + "  <i class='fas fa-arrow-circle-right'></i></a>";
                    
                    panel_section += "</div>";
                    
                    panel_section += "</div>";

                    $("#application_modules div").remove();

                    $( '#application_modules' ).append( "<div class='row'>" + panel_section + "</div>" );

                    panel_counter = -1;

                }

                panel_counter = panel_counter + 1;
            });
            
        }else{

            panel_section = '';

            $("#application_modules").empty();

            panel_section += "<div class='col-lg-12 col-12'>";

            panel_section += "<div class='small-box bg-info'>";

            panel_section += "<div class='inner'>";
            panel_section += "<h3>INFO</h3>";
            panel_section += "<p>NO APPLICTION MODULES TO BE LOADED, PLEASE CONSULT APPLICATION SUPPORT.</p>";
            panel_section += "</div>";

            panel_section += "<div class='icon'>";
            panel_section += "<i class='fa fa-exclamation-circle'></i>";
            panel_section += "</div>";

            panel_section += "<a href='#' class='small-box-footer' data-module='0'> THIS IS AN INFORMATION <i class='fas fa-arrow-circle-right'></i></a>";
            
            panel_section += "</div>";
            
            panel_section += "</div>";

            $( '#application_modules' ).append( "<div class='row'>" + panel_section + "</div>" );
        }

    }

    _if_SearchNeeded_ModuleListDashboad = async  ( element, propergated_element_id ) => {

        /**
         * CLEARING SESSION STORE FOR STORED DATA
         * 
         * THIS IS SPECIFIC FOR CLEARING THE VALUES STORED
         * 
         * TO HOLD THEME STATE AND MODULE NAVIGATIONS FOR THE USER
         * 
         * WHEN NAVIGATING TO AUDIT TRAIL ROUTE FOR A SELECTED MODULE
         * 
         * ie: 
         *      sessionStorage.setItem('module-theme', $( "#module-theme" ).data('module-theme') );
         *      
         *     sessionStorage.setItem( 'navigations',  JSON.stringify( RecordSet ) );
         * 
         * AS DEFINED IN  InitializeModuleNavigation() FOR A SUCCESS STATUS
         */
        sessionStorage.clear();

        /** A : COLLECTING USER INPUTS **/
        this.Shorthand.Request = { token: this.Shorthand.token };

        /** B : SENDING USER INPUTS TO THE SERVER **/
        let response = await this.Shorthand.axios_http_request( 'api/module/retrievemodules/', this.Shorthand.Request, this.Shorthand.config, 'GET' );
        
        /**
         * THIS ARRAY OBJECT WILL HOLD THE LIST OF MODUELS
         * 
         * AS POPULATED ON THE INSTERFACE FOR USER TO SEE
         * 
         * AND LATER WHEN USER DO THE PAGE SEARCH IT WILL BE
         * 
         * USED AS THE FILTER CRITERIA
         */
        let modules_list = [];
        
        let panel_counter = 0;

        let user_trail = '/moduleaudittrail';

        let panel_section = "<div class='row'></div>";

        const searchCriteria = document.querySelector("[data-search]");

        searchCriteria.addEventListener("input", (e) => {

            const searchValue = e.target.value.toLowerCase();
            
            modules_list.forEach( modules => {

                const showModule = modules.module_name.toLowerCase().includes( searchValue ) || modules.module_code.toLowerCase().includes( searchValue );

                modules.element.classList.toggle( "hide", !showModule );
            });
        });

        let panels_states = {
            first_panel :{ color : 'success' },
            second_panel :{ color : 'info' },
            third_panel :{ color : 'warning' },
            fourth_panel :{ color : 'danger' }
        };

        this.Shorthand.DismissableResponse( "on-form", response );

        /** C : PRE-VIEWING THE RESPONSE TO USER **/
        if( response.Status == 200 ){

            panel_section = '';

            /**
             * CAN BE ENABLED IF THE TEMPLATE ELEMENT SECTION
             * 
             * HAS NOT BEEN PROVIDED ON THE PAGE
             * 
             * $("#application_modules div").remove();
             */

            modules_list = response.RecordSet.map( app_module => {

                let set_panel = Object.keys( panels_states )[ panel_counter ];

                let set_color = eval('panels_states.' + set_panel + '.color');

                if( panel_counter < 3 ){

                    panel_section += "<div class='col-lg-3 col-6'>";

                    panel_section += "<div class='small-box bg-"+ set_color +"'>";

                    panel_section += "<div class='inner'>";
                    panel_section += "<h3>"+ app_module.module_code +"</h3>";
                    panel_section += "<p>"+ app_module.module_name +"</p>";
                    panel_section += "</div>";

                    panel_section += "<div class='icon'>";
                    panel_section += "<i class='"+ app_module.module_icon +"'></i>";
                    panel_section += "</div>";

                    panel_section += "<a href='#' class='small-box-footer' data-source-url='"+ window.location.pathname +"' data-destination-url='"+ user_trail +"' data-module='"+ app_module.id +"' onclick='modules.InitializeModuleNavigation(this)'> Enter : " + app_module.module_name + "  <i class='fas fa-arrow-circle-right'></i></a>";
                    
                    panel_section += "</div>";
                    
                    panel_section += "</div>";

                    $("#application_modules div").remove();

                    $( '#application_modules' ).append( "<div class='row'>" + panel_section + "</div>" );
                }
                else if( panel_counter == 3 ){

                    panel_section += "<div class='col-lg-3 col-6'>";

                    panel_section += "<div class='small-box bg-"+ set_color +"'>";

                    panel_section += "<div class='inner'>";
                    panel_section += "<h3>"+ app_module.module_code +"</h3>";
                    panel_section += "<p>"+ app_module.module_name +"</p>";
                    panel_section += "</div>";

                    panel_section += "<div class='icon'>";
                    panel_section += "<i class='"+ app_module.module_icon +"'></i>";
                    panel_section += "</div>";

                    panel_section += "<a href='#' class='small-box-footer' data-source-url='"+ window.location.pathname +"' data-destination-url='"+ user_trail +"' data-module='"+ app_module.id +"' onclick='modules.InitializeModuleNavigation(this)'> Enter : " + app_module.module_name + "  <i class='fas fa-arrow-circle-right'></i></a>";
                    
                    panel_section += "</div>";
                    
                    panel_section += "</div>";

                    $( '#application_modules' ).append( "<div class='row'>" + panel_section + "</div>" );

                    panel_counter = -1;

                }

                panel_counter = panel_counter + 1;

                return { module_name : app_module.module_name, module_code : app_module.module_code, element : application_modules };
            });
            
        }else{

            panel_section = '';

            $("#application_modules").empty();

            panel_section += "<div class='col-lg-12 col-12'>";

            panel_section += "<div class='small-box bg-info'>";

            panel_section += "<div class='inner'>";
            panel_section += "<h3>INFO</h3>";
            panel_section += "<p>NO APPLICTION MODULES TO BE LOADED, PLEASE CONSULT APPLICATION SUPPORT.</p>";
            panel_section += "</div>";

            panel_section += "<div class='icon'>";
            panel_section += "<i class='fa fa-exclamation-circle'></i>";
            panel_section += "</div>";

            panel_section += "<a href='#' class='small-box-footer' data-module='0'> THIS IS AN INFORMATION <i class='fas fa-arrow-circle-right'></i></a>";
            
            panel_section += "</div>";
            
            panel_section += "</div>";

            $( '#application_modules' ).append( "<div class='row'>" + panel_section + "</div>" );
        }

    }
    
    ModuleAuditTrailDashboard = async () => {

        $("#tablecontents").empty();

        try{

            /** A : COLLECTING USER INPUTS **/
            this.Shorthand.Request = { token: this.Shorthand.token };

            let user_name = this.Shorthand.UserSession.Username || "" ;

            /** B : SENDING USER INPUTS TO THE SERVER **/
            let response = await this.Shorthand.axios_http_request( 'api/auditlog/retrieveauditlogs/' + user_name, this.Shorthand.Request, this.Shorthand.config, 'GET' );
            
            this.Shorthand.DismissableResponse( "on-form", response );

            /** C : PRE-VIEWING THE RESPONSE TO USER **/
            if( response.Status == 200 ){

                let record_data = "";

                let sn = 0;

                if( response.RecordSet.length > 0 ){

                    response.RecordSet.forEach( auditlog => {

                        record_data = "<tr>";
                        record_data += "<td>" + (sn + 1) + "</td>";
                        record_data += "<td>" + auditlog.app_user_ip + "</td>";
                        record_data += "<td>" + auditlog.app_modules_moduleName + "</td>";
                        record_data += "<td>" + auditlog.resource_requested + "</td>";
                        record_data += "<td>" + auditlog.methos_used + "</td>";

                        record_data += "<td>";
                            record_data += "<textarea class='form-control' rows='3' cols='200' disabled>";
                                record_data += auditlog.request_inputs;
                            record_data += "</textarea>";
                        record_data += "</td>";

                        record_data += "<td>";
                            record_data += "<textarea class='form-control' rows='3' cols='200' disabled>";
                                record_data += auditlog.response_outputs;
                            record_data += "</textarea>";
                        record_data += "</td>";

                        record_data += "<td>" + this.Shorthand.StringSplitterReturnArrai( " ", auditlog.created_at, 0 ) + "</td>"; 
                        record_data += "<td>" + this.Shorthand.StringSplitterReturnArrai( " ", auditlog.created_at, 1 ) + "</td>";

                        record_data += "</tr>";

                        sn += 1;
                        
                        $( '#tablecontents' ).append( record_data );
                    });

                }else{

                    $( '#tablecontents' ).append( "<tr><td colspan='9' style='text-align: center;color:red'>"+ response.ResponseText +"</td></tr>" );
                }

            }else{

                $( '#tablecontents' ).append( "<tr><td colspan='9' style='text-align: center;color:red'>"+ response.ResponseText +"</td></tr>" );

                this.Shorthand.DismissableResponse( "on-form", response );
            }

            this.Shorthand.DataTableFunctionalitiesInitilization();

        }catch( error ){

            this.Shorthand.CatchedErrorManagementFunction( error );
        }

    }

    InitializeModuleNavigation = async  ( element ) => {
        
        this.Shorthand.DismissableResponse( );


        $('#module-navigations').empty();

        /** A : COLLECTING USER INPUTS **/
        this.Shorthand.Request = { token: this.Shorthand.token };

        /** B : MODULE NAVIGATIONS OPTIONS **/
        let querie_parameter = this.Shorthand.UserSession.id +'/'+ $( element ).data('module')  +'/'+ 'ACTIVE';

        let get_api_module_navigations = 'api/moduleuserprofileaccess/retrievemoduleuserprofileaccess/' + ( querie_parameter || '' );

        /** C : SENDING USER INPUTS TO THE SERVER **/
        let response = await this.Shorthand.axios_http_request( get_api_module_navigations, this.Shorthand.Request, this.Shorthand.config, 'GET' );
        
        if( response.Status == 200 ){
            
            this.Shorthand.DismissableResponse( "on-form", response );

            /**
             * SETTING UP THE INITIAL VALUES NEEDED TO COMPUTE THE NAVIGATION MENUS
             * 
             * FOR CURRENT USER BASED ON SELECTED MODULE FROM MODULE PANNEL ELEMENT
             */
            sessionStorage.setItem('module_data', JSON.stringify( { module : $(element).data( 'module' ),module_theme : $( "#module-theme" ).data('module-theme'), module_navigations :  response.RecordSet } ) );

            /**
             * sessionStorage.setItem('module-theme', $( "#module-theme" ).data('module-theme') );
             * sessionStorage.setItem('module-state', $( element ).data('module') );
             * sessionStorage.setItem('module-source', $( element ).data('source-url') );
             * sessionStorage.setItem('module-destination', $( element ).data('destination-url') );
             * sessionStorage.setItem( 'navigations',  JSON.stringify( response.RecordSet ) );
             */
            window.location.href = $( element ).data('destination-url');

        }else{

            this.Shorthand.DismissableResponse( "on-form", response );            
        }
    }

}
