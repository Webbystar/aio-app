/**
 * WEBBYSTARS DEFINED JAVA SCRIPT CLASS FOR SERVER SIDE PROCESSING:
 * ================================================================
 */
import PageElementsInitializeController from '../PageElementsInitializeController/PageElementsInitializeController.js';

export default class ShorthandController{

    constructor(){

        this.session_image = "User Avatar String";
        this.session_fullname = "User Fullname String";

        this.UserSession = {};

        this.token = $('meta[name="csrf-token"]').attr('content');

        this.InitializeElements =  new PageElementsInitializeController();

        this.Request = {};

        this.config = {
            headers:{
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization':'UBA QTM3RjM4MkREQTQxN0M2M0E1QTk0OEJDOUQ1QjFBNEIuODQzMkEwQzI3RjgzRkRGQjg4RTRFODlGQzc2QzhBNzQ=',
                'SP-MOD':'ALPHA-1',
                'SP-STATE':'ACTIVE'
            }
        };

        /**
         * CHECKING IF THE USER'S SESSIO HAS BEEN SET AFTER SUCCESSFULL LOGIN
         */
        let users_session = $('meta[name="SessionState"]').attr('content') || false;

        if( users_session !== false ){

            /** 
             * CREATING A VARIABLE AND PASSING TO IT A BASE 64 DECODED STRING
             *  
             * PASSED FROM THE SERVER TO A META TAG ON PAGE HEAD SECTION AS AN
             * 
             * ENCODED BASE 64 STRING THE JS FUNCTION atob() USED TO DECODE
             **/
            let SessionState = atob( users_session );

            /** 
             * REASIGNING A VALUE OF A DECODED BASE 64 STRING TO HAVE A JSON OBJECT
             * 
             * AS THE OBJECT CREATED ON SERVER SIDE BEFORE ENCODING TO BASE 64 STRING
             * 
             * PARSING THE STRING TO GET ATUAL JAVASCRIPT OBJECT NOTATION JSON
             **/
            this.UserSession = JSON.parse( SessionState  );console.warn(  )

            this.session_image = this.UserSession.UserImage;

            this.session_fullname = this.UserSession.FullName;

        }

        /**
         * HIDING THE RESPOSNE SECTION ON WEB FORM AND MODALS ON PAGE LOAD
         */
        $("#dismissable_response").hide();
        $("#modal_response").hide();

        /**
         * CHECKING THE CURRENT NETWROK CONNECTION FOR THE USER
         */
        if( navigator.onLine ){
            
            $("#networkConnection").removeClass();
            $("#networkConnection").prop( "title", "Online" );
            $("#networkConnection").addClass("fa fa-circle text-success");
        }else{
            $("#networkConnection").removeClass();
            $("#networkConnection").prop( "title", "Offline" );
            $("#networkConnection").addClass("fa fa-circle text-danger");
        }

        //this._AutomaticLockIddleScreen();

        //this.IddleStateSettings();
    }


    IddleStateSettings = () => {

        let ScreenTimeout = 0;

        /**
         * DETECT AND RESET TIME UPON DOCUMENT LOADING
         */
        document.onload = this.AutomaticLockIddleScreen( ScreenTimeout );

        /**
         * DETECT AND RESET TIME UPON DOCUMENT MOUSE MOVE
         */
        document.onmousemove = this.AutomaticLockIddleScreen( ScreenTimeout );

        /**
         * DETECT AND RESET TIME UPON DOCUMENT MOUSE DOWN
         */
        document.onmousedown = this.AutomaticLockIddleScreen( ScreenTimeout ); // touchscreen presses

        /**
         * DETECT AND RESET TIME UPON DOCUMENT TOUCH SCREEN PRESSES
         */
        document.ontouchstart = this.AutomaticLockIddleScreen( ScreenTimeout );

        /**
         * DETECT AND RESET TIME UPON DOCUMENT TOUCHPAD CLICK
         */
        document.onclick = this.AutomaticLockIddleScreen( ScreenTimeout );     // touchpad clicks

        /**
         * DETECT AND RESET TIME UPON DOCUMENT KEY PRESS THOUGH DEPRECATED
         */
        document.onkeydown = this.AutomaticLockIddleScreen( ScreenTimeout );   // onkeypress is deprectaed

        /**
         * DETECT AND RESET TIME UPON DOCUMENT SCROLLING USING SCROLL BARS
         */
        document.addEventListener( 'scroll', this.AutomaticLockIddleScreen( ScreenTimeout ), true );
    }

    AutomaticLockIddleScreen = ( ScreenTimeout ) => {

        clearTimeout( ScreenTimeout );

        ScreenTimeout = setTimeout( location.href = '/lockscreen' , 120000);

        // 1000 milliseconds = 1 second
    }

    _AutomaticLockIddleScreen = () => {

        let time = 0;

        document.onload = resetTimer;
        document.onmousemove = resetTimer;
        document.onmousedown = resetTimer; // touchscreen presses
        document.ontouchstart = resetTimer;
        document.onclick = resetTimer;     // touchpad clicks
        document.onkeydown = resetTimer;   // onkeypress is deprectaed
        document.addEventListener('scroll', resetTimer, true);

        function logout() {
            
            console.log("You are now logged out.");
            location.href = '/lockscreen'
        
        }

        function resetTimer() {
            clearTimeout(time);
            time = setTimeout(logout, 60000);
            // 1000 milliseconds = 1 second

        }
    
    }

    ElementHiddenFlip = ( element ) => {

        $(element).toggle();

    }

    EnableOrDisableElementStates = ( element_id, element_ttribute = "class", element_class = null, icon = null ) => {

        let buttonText = $( element_id ).html();

        let italicTagRemove = this.StringSplitterReturnArrai( " ", buttonText );
        
        buttonText = italicTagRemove[ italicTagRemove.length - 1];

        /**
         * CHECK IF THE ELEMENT CLASS HAS BEEN PASSED AS ARGUMENT
         * 
         * Sample : btn btn-danger btn-block
         */
        let elementClass = element_class !== null ? element_class : this.StringSplitterReturnArrai( " ", $( element_id ).attr("class") );

        if( Array.isArray( elementClass ) ){

            elementClass = elementClass[0] === "btn" ? ( elementClass[1] === "btn-secondary" ? "btn btn-danger btn-block" :  "btn btn-secondary btn-block" ) : elementClass[0];

        }else{

            let replacementClass = this.StringSplitterReturnArrai( " ", $( element_id ).attr("class"), 1 );

            replacementClass = ( replacementClass === "btn-secondary" ? "btn btn-danger btn-block" :  "btn btn-secondary btn-block" );

            elementClass = ( elementClass ==="btn" ? replacementClass : elementClass );
        }

        /**
         * CHECK IF THE ELEMENT ICON HAS BEEN PASSED AS ARGUMENT
         * 
         * Sample : fa-spinner fa-spin
         */
        let elementIcon = icon !== null ? "<i class='fa " + icon + "' aria-hidden='true'></i> " : "";

        /**
         * CHECKING IF THE ELEMENT IS IN WHICH STATE MODE
         * 
         * 1.       IF disabled WE ENABLE IT BY REMOVING THE PROPERTY disabled
         * 
         * 2.       IF enabled WE DISABLED IT BY ADDING A PROPERTY disabled
         */        
        if( $( element_id ).is(':disabled') ){

            $(element_id).empty();
            $(element_id).append( buttonText );
            $(element_id).removeAttr( "disabled" );
            $(element_id).removeAttr( element_ttribute );
            $(element_id).addClass( elementClass );
        }else{

            $(element_id).empty();
            $(element_id).prop( "disabled", true );
            $(element_id).removeAttr( element_ttribute );
            $(element_id).addClass( elementClass );
            $(element_id).append( elementIcon + " &nbsp; " +  buttonText );
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    DismissableResponse = ( UIFormState = "on-form" ,response = null ) => {

        let icons = {
            'success' : 'icon fas fa-check',
            'info' : 'icon fas fa-info',
            'warning' : 'icon fas fa-exclamation-triangle',
            'danger' : 'icon fas fa-ban'
        };

        let element_id = UIFormState == "on-form" ? "#dismissable_response" : "#modal_response";
        
        let add_class = "info", icon = "fa-spinner fa-spin", ResponseTitle =  "Please wait", ResponseText =  "System processing your request...";

        if( response !== null ){

            add_class = response.colorCode;
            icon = response.iCon;
            ResponseTitle = response.ResponseTitle;
            ResponseText = response.ResponseText ;
        }

        let element_contents = "<button type='button' class='close' aria-hidden='true'>";
            element_contents += "<span  class='btn btn-danger btn-sm'><i class='fas fa-times' aria-hidden='true'></i></span>";
            element_contents += "</button>";

            element_contents += "<h5>";
            element_contents += "<i class='fa "+icon+"'></i> &nbsp;" + ResponseTitle;
            element_contents += "</h5>";
            element_contents += "<h6>" + ResponseText + "</h6>";

        $( element_id ).empty();
        $( element_id ).removeClass();
        $( element_id ).addClass( "alert alert-" + add_class + " alert-dismissible" );
        $( element_id ).append( element_contents );
        $( element_id ).css("cursor", "pointer");
        $( element_id ).show('slow');

        window.scrollTo( { top: 0, behavior: 'smooth' } );
    }

    /**
     * Tutorial : https://sweetalert.js.org/guides/#:~:text=swal(%22Click%20on%20either%20the,or%20outside%20the%20modal.%22)&text=This%20comes%20in%20handy%20if,show%20a%20nice%20warning%20icon.
     */
    ToastResponse = ( response_icon, resposne_text, resposne_title = 'Notification:', actionMode = null, recordName = null, withButtons = false, callbackMethod ) => {

        /**
         * ACCEPTED ICONS : "success", "error", "warning", "info" or "question"
         */

        /**
         * THE VARIABLE TO HOLD A TOAST DIALOG BOX / POPUP BOX
         */
        let Toast = null;

        /**
         * SETTING THE TOAST MESSAGE CONFIGURATIONS BY CHECKING IF THE 
         * 
         * CALLING METHOD REQUESTED A TOAST WITH BUTTONS FOR PROPER SETTINGS
         * 
         *  1.  IF BUTTONS WERE NOT REQUIRED THEN THE TOAST IS SET TO BE A FLASH POPUP WITH NO BUTTONS
         * 
         *  2.  IF THE BUTTONS WERE REQUIRED THEN THE TOAST IS SET TO BE A STILL POPUP WITH BUTTONS
         */
        if( withButtons ===  false ){

            Toast = Swal.mixin( { toast: true, position: 'top',width: 800,padding: 20,showConfirmButton: false,timer: 4000 } );

        }else if( withButtons ===  true ){

            resposne_title = "Confirm the action to " + actionMode + " "  + recordName;

            resposne_text = "Click " + actionMode + " button to proceed?";

            Toast = Swal.mixin( { showConfirmButton: true, confirmButtonClass: "btn-" + response_icon , showDenyButton: true, confirmButtonText: actionMode, denyButtonText: 'Cancel' } );
        }

        /**
         * SENDING TEH TOAST MESSAGE TO THE USER INTERFACE BY USING THE CONFIGURATIONS SET ABOVE
         */
        if( withButtons ===  false ){

            Toast.fire({ title: resposne_title, text: resposne_text, icon: response_icon });

        }else if( withButtons ===  true ){

            Toast.fire( { title: resposne_title, text: resposne_text, icon: response_icon } )

            .then( ( selectedButton ) => {

                let actionState = ""; 

                if( selectedButton.isConfirmed ){

                    actionState = " completed successfully...";
                    response_icon = "success";

                    callbackMethod( Swal.fire( "The action to " + actionMode + " " + recordName  + " " + actionState, '', response_icon ) );

                }else{
                    
                    actionState = " canceled...";
                    response_icon = "info";

                    Swal.fire( "The action to " + actionMode + " " + recordName  + " " + actionState, '', response_icon );
                }
            });
        }else{

        }
    
    }

    CatchedErrorManagementFunction = ( error ) => {

        let exp_resposne = {};

        if( error.response ){

            let data = error.response.data;

            exp_resposne = {

                colorCode : data.colorCode || "danger",
                iCon : data.iCo || "fa-ban",
                ResponseTitle : data.ResponseText || "Exception Error!",
                ResponseText : data.ResponseTitle
            };

            this.DismissableResponse( exp_resposne );

        }else if( error.request ){

            exp_resposne = {

                colorCode : "danger",
                iCon : "fa-ban",
                ResponseTitle : "Exception Error!",
                ResponseText : error.request
            };

            this.Shorthand.DismissableResponse( exp_resposne );

            console.log('******************************************************************************************');
            console.log('Request Error : ');
            console.log('******************************************************************************************');
            console.log( error.request);
            console.log('******************************************************************************************');
        }else{

            let trace_error = error.stack.split("\n");
            let message = trace_error[0]; // OR SIMPLY FROM STACK : error.message
            let line_number = trace_error[1];

            let stack_trace = message +". Line : <b>"+ line_number+"</b>";

            exp_resposne = {

                colorCode : "warning",
                iCon : "fa-exclamation-triangle",
                ResponseTitle : "Exception Error!",
                ResponseText : stack_trace
            };

            this.DismissableResponse( exp_resposne );
            
            console.log('******************************************************************************************');
            console.log('Other Errors: ' + error );
            console.log('******************************************************************************************');
            console.log('Error Context: ' + message );
            console.log('Error Line Number: ' + line_number );
            console.log('******************************************************************************************');
        }
    
    }

    CreateBase64Image = ( element, display_text_elemet_id ) => {

        /**
         * THE IMPLEMENTATION IS BASED ON THE TUTORIAL
         * 
         * Url : https://pqina.nl/blog/convert-a-file-to-a-base64-string-with-javascript/ 
         */

        const fileReader = new FileReader();

        let base64String = '';

        let dataUrlbase64 = '';

        let use_file = element.files[0];

        let exp_resposne = {};

        if( use_file ){

            fileReader.onloadend = () => {

                /** READING THE BASE 64 IMAGE AND ITS URL PART **/
                dataUrlbase64 = fileReader.result;

                /** USING REGULAR EXPRESSION TO REMOVE A DATA URL PART ON THE IMAGE STRING **/
                base64String = fileReader.result.replace('data:', '').replace(/^.+,/, '');
                
                try{

                    this.Request = {
                        token: this.token,
                        data_url: dataUrlbase64,
                        base64: base64String
                    };

                    
                    this.axios_http_request( 'api/authenticate/encodedfile/', this.Request, this.config )
                    .then( response => {

                        if( response.RecordSet.mb_size > 4 ){

                            exp_resposne = {

                                colorCode : "warning",
                                iCon : "fa-exclamation-triangle",
                                ResponseTitle : "File Size Too Large!",
                                ResponseText : response.ResponseText +" Size of the file "+ response.RecordSet.mb_size
                            };

                            this.DismissableResponse( exp_resposne );
                        }
                    });

                }catch( error ){

                    let file_error  = "There seems to be an error to process the selected file for upload.";
                        file_error += " [ System catched log error : " + error.message + " ]";

                    exp_resposne = {

                        colorCode : "warning",
                        iCon : "fa-exclamation-triangle",
                        ResponseTitle : "Un ebla to process the file!!",
                        ResponseText : file_error
                    };

                    this.DismissableResponse( exp_resposne );
                }

                /**
                 * APPLYING THE NAME OF THE ELEMENT ON A LABEL ELEMENT
                 * 
                 * CAN BE FORCEBLY APPLIED BY USING THE LINE BELOW 
                 * 
                 * $( display_text_elemet_id ).text( use_file.name+" HAPA" );
                 * 
                 * BUT THE BOOT STRAP THROUHG THE LIBARY :bs-custom-file-input/bs-custom-file-input.min.js
                 * 
                 * CAN BE EASILY USED TO ACCOMPLISH THE SAME FUNCTIONALITY ONLY BY APPLYING THE LIBRARY
                 * 
                 * ON THE PAGE IN NEED OF FILE INPUT FILE NAME DISPLAY AND INITIALIZING THE FUNCTION : bsCustomFileInput.init();
                 * 
                 * AS INITILIZED IN:
                 * 
                 * FILE NAME : PageElementsInitializeController.js
                 * 
                 * FILE PATH : app_js\app\PageElementsInitializeController
                 * 
                 * CLASS NAME : PageElementsInitializeController
                 * 
                 * METHOD : constructor()
                 */

                /** GETTING THE IMAGE URL FOR AN IMAGE MAKE SURE TO REVOKE THE FILE AFTER USE TO AVOID MEMORY LEAK  **/
                const img_url = URL.createObjectURL( use_file );

                /** REVOKING THE FILE AFTER USE TO AVOID MEMORY LEAK  **/
                URL.revokeObjectURL( use_file );
            };

            fileReader.readAsDataURL( use_file );

        }
    
    }

    ElementInputMasking = ( element_trigger, mask_element_id , mask_theme, condition = null ) => {

        if( condition == null ){

            $('#' + mask_element_id ).inputmask( mask_theme );

        }else{

            if( $( element_trigger ).val() == condition ){

                $('#' + mask_element_id ).inputmask( mask_theme );
            }else{

                $('#' + mask_element_id ).inputmask('remove');
            }

        }

    }

    DataTableFunctionalitiesInitilization(){

        /**
         *  THE DATA TABLE SETUP FOR ANY TABLE IN NEED OF THIS FEATURE
         * 
         *  THE TABLE WILL BE INSTANTIATED FROM THIS CLASS SO THAT THE
         * 
         *  FEATURES FOR FILE DOWNLOADS FEATURES AS PASSED IN BUTTON FORM
         */ 
        $("#data-table-buttons")
        .DataTable({"responsive": true, "lengthChange": false, "autoWidth": false,"buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]})
        .buttons()
        .container()
        .appendTo('#data-table-buttons_wrapper .col-md-6:eq(0)');
    }

    StatusDecorationState( statuses_id ){

        switch( statuses_id ){

            case '1':

                return 'success';
            break;

            case '4':

                return 'danger';
            break;

            case '6':

                return 'warning';
            break;

            case '8':

                return 'info';
            break;
            
            default:

                return 'secondary';
            break;

        }
    }
    
    UserSignout = () => {

        let request = { token:this.token, execute_action: 'logout', pathname:location.pathname};

        this.UserSignoutOrLockScreen( request );

    }

    UserSignoutOrLockScreen = async ( request_data ) => {
        
        /** A : COLLECTING USER INPUTS **/
        this.Request = request_data;

        /** B : SENDING USER INPUTS TO THE SERVER **/
        let response = await this.axios_http_request( 'api/authenticate/logout', this.Request, this.config );

        /** C : PRE-VIEWING THE RESPONSE TO USER **/
        if( response.Status == 200 ){

            this.DismissableResponse( response );

            this.ToastResponse( response.iCon, response.ResponseText );

            /** 
             * THE LOOP CONTROLS THE NAVIGATION TO LOGIN PAGE TO SLOW DOWN 
             * 
             * THIS IS USEFUL FOR USER TO HAVE TIME READING GOODBYE MESSAGE
            */
            for( let run = 1; run < 100000000; run++){

                if( run == 99999999 ){

                    if( typeof response.Route !== 'undefined' && response.Route.length != '' ){

                        window.location.href = response.Route;
                    }

                }
            }

        }else{

            this.ToastResponse( response.iCon, response.ResponseText );
        }

    }

    /**
     * THE METHOD TO RESET A MODAL/POPUP VALUES FOR PARTICULAR
     * 
     * DATA CAPTURING / ENTRY SECTION ON USER INTERFACE
     */
    ResetModalDetails = ( section_title, button_id ) => {

        /**
         * RESETTING THE MODAL TITLE BY PASSING THE DATA SET NAME TO BE MANIPULATED
         */
        $("#modal_title").empty();
        $("#modal_title").append( "Enter "+ section_title +" details:" );

        /**
         * RESETTING THE MODAL INPUT FIELDS TO CLEAR THE PREVIOUS DATA SET USED IN EDITING
         */
        $("input[type=text], input[type=hidden], input[type=url], input[type=checked], input[type=selected], textarea").val("");

        /**
         * RESETTING THE MODAL BUTTON TEXT TO DEFAULT SAVE TEXT ONCE EXITED FROM EDITING MODE
         * 
         * THE BUTTON NAME ID MUST BE PASSED SO THAT THE EFFECT CAN TAKE PLACE ON THAT BUTTON
         */
        $("#"+ button_id ).html("Save");
    }

    /**
     * READING SESSION STORAGE FOR MODULE NAVIGATION SET
     * 
     * AND RENDER THEM ON USER INTERFACE
     */
    RenderModuleNavigation = async () => {

        /**
         * READING THE SESSION STORAGE KEY FOR MODULE DATA SET
         */
        if( !sessionStorage['module_data'] ){

            return;
        }

        const data_state = JSON.parse( sessionStorage.getItem( 'module_data' ) );

        /**
         * APPENDING THE MODULE ID AS A DATA ATTRIBUTE TO THE NAVIGATION ul
         */
        $('#module-navigations').attr( 'data-module', data_state.module );

        /**
         * COLLECTING THE DETAILS FROM PASSED DATA FOR 
         * 
         * NAVIGATION AND MODULE THEME COLOR
         */
        let module_navigations = data_state.module_navigations;
        
        let module_theme = data_state.module_theme;

        /**
        * VARIABLE TO HOLD SIDE MAIN NAVIGATIONS
        */
        let side_main_nav = null;

        /**
        * VARIABLE TO HOLD SIDE SUB NAVIGATIONS
        */
        let side_sub_nav = null;

        /**
        * VARIABLE TO HOLD SIDE MAIN NAVIGATION ACTIVE STATE THEME
        */
        let side_nav_active = 'active-' + module_theme;

        /**
        * VARIABLE TO HOLD SIDE MAIN NAVIGATIONS INDEX CONTROL
        * 
        * THIS IS USED TO DETERMINE IF THE CURRENT NAVIGATION
        * 
        * HAS TO BE FLAGGED AS ACTIVE OR NOT AND IT ONLY APPLIES
        * 
        * THE ACTICVE STATE FOR THE FIRST MAIN NAVIGATION
        */
        let nav_index = 1;

        /**
        * ITERATING THE PASSED ARGUMENT VALUES THAT HOLDS NAVIGATION
        * 
        * WE START BY READING THE MAIN NAVIGATIONS TO WHICH EACH MAIN NAVIGATION
        * 
        * MAY HAVE SUB NAVIGATIONS OR NOT AT ALL
        */
        module_navigations.forEach( main_navs => {

            /**
             * CONTROLLING THE ACTIVE STATE OF THE MAIN NAVIGATION
             * 
             * ONLY WHEN INDEX IS 0 THEN THE NAVIGATION CAN BE ACTIVE
             * 
             * BY SUING THE APPLICATION SET THEME STYLE OTHER WISE NOT ACTVE
             */
            if( nav_index > 1 ){

               /**
                * CLEARING THE SET STATE FOR ALL THE NAVIGATIONS NOT IN FIRST INDEX
                */
               side_nav_active = '';
            }

            /**
             * CHECKING IF THE MAIN NAVIGATION HAS THE SUBNAVIGATION ASSOCIATED WITH IT
             * 
             * USING THE .length JAVASCRIPT PROPERTY OF AN OBJECT TO SEE IF ITS GREATER THAN 0
             */
            if( main_navs.sub_navs.length > 0 ){

                /**
                 * STARTING TAG TO INITIALIZING UNORDERED LIST FOR SUBNAVIGATIONS
                 */
                side_sub_nav = '<ul class="nav nav-treeview">';

                /**
                 * ITERATING TROUHG VALUES OF SUB-NAVIGATION FROM THE MAIN NAVIGATION OBJECT
                 */
                main_navs.sub_navs.forEach( sub_navs => {

                    side_sub_nav += '<li class="nav-item">';
                    side_sub_nav += '<a href="'+ sub_navs.subnav_route +'" class="nav-link" data-subnav-id="'+ sub_navs.subnav_id +'" data-subnav-code="'+ sub_navs.subnav_code +'">';
                    side_sub_nav += '<i class="'+ sub_navs.subnav_icon +'"></i>';
                    side_sub_nav += '<p>'+ sub_navs.subnav_name +'</p>';
                    side_sub_nav += '</a>';
                    side_sub_nav += '</li>';
                });

                /**
                 * ENDING TAG FOR UNORDERED LIST FOR SUBNAVIGATIONS
                 */
                side_sub_nav += '</ul>';
            }

            /**
             * PREPARING THE MAIN NAVIGATION LIST ITEM TO BE ADDED TO UNORDERED LIST OF THE MAIN NAVIGATION
             */
            side_main_nav  = '<li class="nav-item" menu-close>';
            side_main_nav += '<a href="'+ main_navs.mainav_route +'" class="nav-link ' + side_nav_active + '">';
            side_main_nav += '<i class="'+ main_navs.mainav_icon +'" aria-hidden="true"></i>';
            side_main_nav += '<p>';
            side_main_nav += main_navs.mainav_name;

            side_main_nav += main_navs.sub_navs.length > 0 ?  '<i class="right fa fa-angle-left"></i>' : '' ;

            side_main_nav += '</p>';
            side_main_nav += '</a>';

            /**
             * IF THE SUB NAVIGATIONS MENU IS NOT NULL THEN WE ADD ITS CONTENTS
             * 
             * TO THE MAIN NAVIGATION CONTENTS LIST ITEMS
             */
            if( side_sub_nav !== null ){
                
                side_main_nav += side_sub_nav;
            }

            side_main_nav += '</li>';

            /**
             * ADDING OR APPENDING THE RETRIEVED NAVIGATIONS
             * 
             * ON THE APPLICATION LEFT NAVIGATION SIDE BAR
             */
            $('#module-navigations').append( side_main_nav );

            /**
             * FOR EACH MAIN NAVIGATION LOADING WE RESET SUBNAVIGATIONS
             * 
             * IN ORDER TO MAKE SURE THAT THE SUBNAVIGATIONS MENU ARE NOT
             * 
             * RE-DUPLICATED TO THE OTHER MAIN NAVIGATIONS
             */
            side_sub_nav = null;

            /**
             * INCREMENTING THE CONTROL THAT SETS THE ACTIVE MAIN MENU STATE
             */
            nav_index +=1;
        });

    }

    /**
     * THE METHOD SPLITS THE STRING BASED ON THE PASSED DELIMETER OR NEEDLE AND FORMS AN ARRAY
     * 
     * THEN IT MAY RETURN PART OF THE RESULTING ARRAY OR ALL THE ARRAY SET IF THE VARIABLE
     * 
     * get_indexOf IF THE VALUE IS PROVIDED AS INTERGER OTHER WISE IF LEFT DEFAULT WHICH IS NULL
     * 
     * THEN THE PART OF AN ARRAY BASED OF THE PASSED INDEX VALUE IS RETURNED
     */
    StringSplitterReturnArrai = ( needle, string, get_indexOf = null ) => {

        if( get_indexOf == null){

            let arrai_set = string.split( needle );

            let trimed_arrai = arrai_set.map( element =>{

                return element.trim();
            });

            return trimed_arrai;

        }else{

            return string.split( needle )[ get_indexOf ].trim();
        }
    
    }

    /**
     * THE METHOD JOINS THE ARRAY BASED ON THE PASSED DELIMETER OR GLUE AND FORMS A STRING
     * 
     * THEN RETURN THE RESULTING STRING, IF THE DELIMETR IS NOT PASSED THEN THE STRING IS
     * 
     * JOINED USING THE COMMA DELIMETAR IN THE STRING
     */
    ArraiJoinerReturnString = ( arrai,  glue = null ) => {

        if( glue == null){

            return arrai.join( );

        }else{

            return arrai.join( glue );
        }
    
    }

    axios_http_request = async ( api_endpoint, request, configs, method = 'POST', CustomResponseJSonStringification = false ) => {

        const http = axios.create();

        let response = {};

        let custom_response = {};

        try{

            switch( method ){

                case "GET":

                    response = await http.get( api_endpoint , configs );
                break;

                default:

                    response = await http.post( api_endpoint ,request, configs );
                break;

            }

            /**
             * FORMATTING SERVER RESPONSE BY READING ONLY
             * 
             * REQUIRED DATA SET USED FOR PRESENTATION
             */
            custom_response = {
                Headers:response.config.headers,
                Request: response.config.request === undefined ? 'No Request data sent to the Server' : response.config.request,
                ResponseTitle: response.data.ResponseTitle,
                ResponseText: response.data.ResponseText,
                Status: response.data.Status,
                colorCode: response.data.colorCode,
                iCon: response.data.iCon,
                Route: response.data.RoutePath,
                RecordSet: response.data.RecordSet,
                ServerStatus:response.status,
                ServerResponseText:response.statusText,
            };
            
            return CustomResponseJSonStringification ? JSON.stringify( custom_response, null, 2 ) : custom_response;

        }catch( error ){

            this.CatchedErrorManagementFunction( error );
            
        }

    }


    /**
     * READING IDENTIFICATIONS DETAILS
     */
    ReadSelectOptionIdentificationsDetails = async ( element_id_name ) =>{

        try{

            /**
             * IDENTIFICATIONS SELECT OPTION DATA LOADING
             */
            let identifications = await this.axios_http_request( 'api/identifications/retrieveidentifications', this.Request, this.config, "GET" );

            this.IdentitiesSelectOptionDataLoading( element_id_name, identifications.RecordSet );

        }catch( error ){

            this.CatchedErrorManagementFunction( error );
        }
    }

    /**
     * FUNCTIONALITY TO LOAD IDENTIFICATIONS ON A SELECT OPTION ELEMENT
     */
    IdentitiesSelectOptionDataLoading = ( element_id_name, identifications ) => {

        $( '#'+element_id_name ).empty();
        $( '#'+element_id_name ).append("<option value='0'>Select Identification Type</option>");

        let option_data_string = "";
        
        if( identifications.length > 0 ){

            identifications.forEach(identitie => {

                option_data_string = "<option ";
                option_data_string += "value='" + identitie.id + "' ";
                option_data_string += "data-identitie-code='" + identitie.identification_code + "' >";
                option_data_string += "" + identitie.identification_name + "";
                option_data_string += "</option>";
                
                $( '#'+element_id_name ).append( option_data_string );
            });

        }else{

            option_data_string = "<option ";
            option_data_string += "value='0' ";
            option_data_string += "data-identitie-code='null'>";
            option_data_string += " Identities not loaded...";
            option_data_string += "</option>";
            
            $( '#'+element_id_name ).append( option_data_string ); 
        }

    }


    /**
     * READING MARITAL STATUSES DETAILS
     */
    ReadSelectOptionMaritalStatusesDetails = async ( element_id_name ) =>{

        try{

            /**
             * MARITAL STATUSES SELECT OPTION DATA LOADING
             */
            let maritalstatus = await this.axios_http_request( 'api/maritalstatus/retrievemaritalstatuses', this.Request, this.config, "GET" );

            this.MaritalStatusesSelectOptionDataLoading( element_id_name, maritalstatus.RecordSet );

        }catch( error ){

            this.CatchedErrorManagementFunction( error );
        }
    }

    /**
     * FUNCTIONALITY TO LOAD MARITAL STATUSES ON A SELECT OPTION ELEMENT
     */
    MaritalStatusesSelectOptionDataLoading = ( element_id_name, maritalstatus ) => {

        $('#marital_status_id').empty();
        $('#marital_status_id').append("<option value='0'>Select Marital Status</option>");

        let option_data_string = "";
        
        if( maritalstatus.length > 0 ){

            maritalstatus.forEach(marital => {

                option_data_string = "<option ";
                option_data_string += "value='" + marital.id + "' ";
                option_data_string += "data-marital-code='" + marital.marital_status_code + "' >";
                option_data_string += "" + marital.marital_status + "";
                option_data_string += "</option>";
                
                $( '#'+element_id_name ).append( option_data_string );
            });

        }else{

            option_data_string = "<option ";
            option_data_string += "value='0' ";
            option_data_string += "data-marital-code='null'>";
            option_data_string += " Marital statuses not loaded...";
            option_data_string += "</option>";
            
            $( '#'+element_id_name ).append( option_data_string );
        }

    }


    /**
     * READING DEPLOYMENT SUBSIDIARY DETAILS BASED ON THE SELECTED COUNTRY
     */
    ReadSelectOptionCountriesDetails = async ( element_id_name ) => {

        try{

            /**
             * COUNTRIES SELECT OPTION DATA LOADING
             */
            let countries = await this.axios_http_request( 'api/countries/retrievecountries', this.Request, this.config, "GET" );
                
            this.CountrieSelectOptionDataLoading( element_id_name, countries.RecordSet );

        }catch( error ){

            this.CatchedErrorManagementFunction( error );
        }

    }

    /**
     * FUNCTIONALITY TO LOAD COUNTRIES ON A SELECT OPTION ELEMENT
     */
    CountrieSelectOptionDataLoading = ( element_id_name, countries ) => {

        $( '#'+element_id_name ).empty();
        $( '#'+element_id_name ).append("<option value='0'>Select Country of Operation</option>");

        let option_data_string = "";
        
        if( countries.length > 0 ){

            countries.forEach( countri => {

                option_data_string = "<option ";
                option_data_string += "value='" + countri.id + "' ";
                option_data_string += "data-countri-currency-name='" + countri.currency_name + "' ";
                option_data_string += "data-countri-currency-code='" + countri.currency_code + "' ";
                option_data_string += "data-countri-currency-symbol='" + countri.currency_symbol + "' ";
                option_data_string += "data-countri-common-code='" + countri.common_country_code + "' ";
                option_data_string += "data-countri-code='" + countri.official_country_code + "' ";
                option_data_string += "data-countri-zipcode='" + countri.country_zip_code + "' >";
                option_data_string += "" + countri.common_name + "";
                option_data_string += "</option>";
                
                $( '#'+element_id_name ).append( option_data_string );
            });

        }else{

            option_data_string = "<option ";
            option_data_string += "value='0' ";
            option_data_string += "data-countri-common-code='null'";
            option_data_string += "data-countri-code='null'";
            option_data_string += "data-countri-zipcode='null' >";
            option_data_string += "Country(ies) NOT loaded...";
            option_data_string += "</option>";

            $( '#'+element_id_name ).append( option_data_string ); 
        }

    }


    /**
     * READING DEPLOYMENT SUBSIDIARY DETAILS BASED ON THE SELECTED COUNTRY
     */
    ReadSelectOptionSubsidiariesDetails = async ( element_id_name, propergated_element_id ) => {

        try{

            /**
             * SUBSIDIARY SELECT OPTION DATA LOADING
             */
            this.Request = { token: this.token, countrie_id: $( "#"+element_id_name ).val() };

            let subsidiaries = await this.axios_http_request( 'api/subsidiaries/retrievesubsidiaries', this.Request, this.config );

            this.SubsidiarieSelectOptionDataLoading( propergated_element_id, subsidiaries.RecordSet );

        }catch( error ){

            this.CatchedErrorManagementFunction( error );
        }

    }

    /**
     * FUNCTIONALITY TO LOAD SUBSIDIARY ON AN SELECT OPTION ELEMENT
     */
    SubsidiarieSelectOptionDataLoading = ( element_id_name, subsidiaries ) => {

        $( '#'+element_id_name ).empty();
        $( '#'+element_id_name ).append("<option value='0'>Select Subsidiry of Operation</option>");

        let option_data_string = "";

        if( subsidiaries.length > 0 ){

            subsidiaries.forEach( subsidiari => {

                option_data_string = "<option ";
                option_data_string += "value='" + subsidiari.subsidiaries_id + "' ";
                option_data_string += "data-institute-code='" + subsidiari.institutions_id + "' ";
                option_data_string += "data-swift-code='" + subsidiari.institute_subsidiarie_switfcode + "' ";
                option_data_string += "data-subsiriary-directory='" + subsidiari.institute_subsidiarie_directory + "' ";
                option_data_string += "data-subsidiarie-code='" + subsidiari.institute_subsidiarie_code + "' > ";
                option_data_string += subsidiari.subsidiari_name;
                option_data_string += "</option>";
                
                $( '#'+element_id_name ).append( option_data_string );
            });

        }else{

            option_data_string = "<option ";
            option_data_string += "value='0' ";
            option_data_string += "data-institute-code='null' ";
            option_data_string += "data-swift-code='null' ";
            option_data_string += "data-subsiriary-directory='null' ";
            option_data_string += "data-subsidiarie-code='null' > ";
            option_data_string += "Subsidiary(ies) NOT loaded...";
            option_data_string += "</option>";

            $( '#'+element_id_name ).append( option_data_string );; 
        }

    }


    /**
     * READING DEPLOYMENT BRANCHES DETAILS BASED ON THE SELECTED SUBSIDIARY
     */
    ReadSelectOptionBranchesDetails = async ( element, propergated_element_id ) => {

        let subsidiari_id =  $(element).val();

        this.Request = { token: this.token, subsidiari_id: subsidiari_id };

        let response = await this.axios_http_request( 'api/branches/retrievebranches', this.Request, this.config );
        let branches = response.RecordSet;

        this.BranchSelectOptionDataLoading( propergated_element_id, branches );
    
    }

    /**
     * FUNCTIONALITY TO LOAD BRANCHES ON AN SELECT OPTION ELEMENT
     */
    BranchSelectOptionDataLoading = ( element_id_name, branches ) => {

        $( '#'+element_id_name ).empty();
        $( '#'+element_id_name ).append("<option selected='selected' value='0'>Select Subsidiry Branch of Operation</option>");

        let option_data_string = "";

        if( branches.length > 0 ){

            $("#branch_operation").show();

            branches.forEach( branch => {

                option_data_string = "<option ";
                option_data_string += "value='" + branch.id + "' ";
                option_data_string += "data-branch-code='" + branch.branch_code + "' ";
                option_data_string += "data-branch-location='" + branch.branch_location + "' > ";
                option_data_string += branch.branch_name +"("+ branch.branch_code + ")";
                option_data_string += "</option>";
                
                $( '#'+element_id_name ).append( option_data_string );
            });

        }else{

            $("#branch_operation").hide();

            option_data_string = "<option ";
            option_data_string += "value='0' ";
            option_data_string += "data-branch-code='null' ";
            option_data_string += "data-branch-location='null' > ";
            option_data_string += "Branch(es) NOT loaded...";
            option_data_string += "</option>";

            $( '#'+element_id_name ).append( option_data_string );; 
        }
    
    }


    /**
     * READING DEPLOYMENT DEPARTMENTS DETAILS BASED ON THE SELECTED SUBSIDIARY
     */
    ReadSelectOptionDepartmentsDetails = async ( element, propergated_element_id, url_data = null ) => {

        let response = "";

        if( url_data !== null ){

            response = await this.axios_http_request( 'api/departments/retrievedepartments/'+url_data, this.Request, this.config, "GET" );
        }else{

            response = await this.axios_http_request( 'api/departments/retrievedepartments/', this.Request, this.config );
        }

        let departments = response.RecordSet;

        this.DepartmentSelectOptionDataLoading( propergated_element_id, departments );
    
    }


    /**
     * FUNCTIONALITY TO LOAD DEPARTMENTS ON AN SELECT OPTION ELEMENT
     */
    DepartmentSelectOptionDataLoading = ( element_id_name, departments ) => {

        $( '#'+element_id_name ).empty();
        $( '#'+element_id_name ).append("<option value='0'>Select Department Name</option>");

        let option_data_string = "";

        if( departments.length > 0 ){

            departments.forEach( department => {

                option_data_string = "<option ";
                option_data_string += "value='" + department.id + "' ";
                option_data_string += "data-department-code='" + department.department_code + "' > ";
                option_data_string += department.department_name +" ("+ department.department_code + ")";
                option_data_string += "</option>";
                
                $( '#'+element_id_name ).append( option_data_string );
            });

        }else{

            option_data_string = "<option ";
            option_data_string += "value='0' ";
            option_data_string += "data-department-code='null' > ";
            option_data_string += "Department(s) NOT loaded...";
            option_data_string += "</option>";

            $( '#'+element_id_name ).append( option_data_string );; 
        }
    
    }


    /**
     * READING DEPLOYMENT JOB TITLE DETAILS BASED ON THE SELECTED SUBSIDIARY
     */
    ReadSelectOptionJobTitlesDetails = async ( element, propergated_element_id, url_data = null ) => {

        let response = "";

        if( url_data !== null ){

            response = await this.axios_http_request( 'api/jobtitles/retrievejobtitles/'+url_data, this.Request, this.config, "GET" );
        }else{

            response = await this.axios_http_request( 'api/jobtitles/retrievejobtitles/', this.Request, this.config );
        }

        let jobtitles = response.RecordSet;

        this.JobtitleSelectOptionDataLoading( propergated_element_id, jobtitles );
    
    }


    /**
     * FUNCTIONALITY TO LOAD JOB TITLES ON AN SELECT OPTION ELEMENT
     */
    JobtitleSelectOptionDataLoading = ( element_id_name, jobtitles ) => {

        $( '#'+element_id_name ).empty();
        $( '#'+element_id_name ).append("<option value='0'>Select Job Title</option>");

        let option_data_string = "";

        if( jobtitles.length > 0 ){

            jobtitles.forEach( jobtitle => {

                option_data_string = "<option ";
                option_data_string += "value='" + jobtitle.id + "' ";
                option_data_string += "data-job-title-code='" + jobtitle.job_title_code + "' > ";
                option_data_string += jobtitle.job_title_name +" ("+ jobtitle.job_title_code + ")";
                option_data_string += "</option>";
                
                $( '#'+element_id_name ).append( option_data_string );
            });

        }else{

            option_data_string = "<option ";
            option_data_string += "value='0' ";
            option_data_string += "data-job-title-code='null' > ";
            option_data_string += "Job Title(s) NOT loaded...";
            option_data_string += "</option>";

            $( '#'+element_id_name ).append( option_data_string );; 
        }
    
    }


    /**
     * READING DEPLOYMENT CONTRACTS DETAILS BASED ON THE SELECTED SUBSIDIARY
     */
    ReadSelectOptionContractsDetails = async ( element, propergated_element_id, url_data = null ) => {

        let response = "";

        if( url_data !== null ){

            response = await this.axios_http_request( 'api/contracts/retrievecontracts/'+url_data, this.Request, this.config, "GET" );
        }else{

            response = await this.axios_http_request( 'api/contracts/retrievecontracts/', this.Request, this.config );
        }

        let contracts = response.RecordSet;

        this.ContractSelectOptionDataLoading( propergated_element_id, contracts );
    
    }

    /**
     * FUNCTIONALITY TO LOAD CONTRACTS ON AN SELECT OPTION ELEMENT
     */
    ContractSelectOptionDataLoading = ( element_id_name, contracts ) => {

        $( '#'+element_id_name ).empty();
        $( '#'+element_id_name ).append("<option value='0'>Select Type of Contract</option>");

        let option_data_string = "";

        if( contracts.length > 0 ){

            contracts.forEach( contract => {

                option_data_string = "<option ";
                option_data_string += "value='" + contract.id + "' >";
                option_data_string += contract.contract_name;
                option_data_string += "</option>";
                
                $( '#'+element_id_name ).append( option_data_string );
            });

        }else{

            option_data_string = "<option ";
            option_data_string += "value='0' >";
            option_data_string += "Contract(s) NOT loaded...";
            option_data_string += "</option>";

            $( '#'+element_id_name ).append( option_data_string );; 
        }
    
    }


    /**
     * READING DEPLOYMENT CONFIRMATIONS DETAILS BASED ON THE SELECTED SUBSIDIARY
     */
    ReadSelectOptionConfirmationsDetails = async ( element, propergated_element_id, url_data = null ) => {

        let response = "";

        if( url_data !== null ){

            response = await this.axios_http_request( 'api/confirmations/retrieveconfirmations/'+url_data, this.Request, this.config, "GET" );
        }else{

            response = await this.axios_http_request( 'api/confirmations/retrieveconfirmations/', this.Request, this.config );
        }

        let confirmations = response.RecordSet;

        this.ConfirmationSelectOptionDataLoading( propergated_element_id, confirmations );
    
    }

    /**
     * FUNCTIONALITY TO LOAD CONFIRMATIONS ON AN SELECT OPTION ELEMENT
     */
    ConfirmationSelectOptionDataLoading = ( element_id_name, confirmations ) => {

        $( '#'+element_id_name ).empty();
        $( '#'+element_id_name ).append("<option value='0'>Select Confirmation Status</option>");

        let option_data_string = "";

        if( confirmations.length > 0 ){

            confirmations.forEach( confirmation => {

                option_data_string = "<option ";
                option_data_string += "value='" + confirmation.id + "' >";
                option_data_string += confirmation.confirmation_name;
                option_data_string += "</option>";
                
                $( '#'+element_id_name ).append( option_data_string );
            });

        }else{

            option_data_string = "<option ";
            option_data_string += "value='0' >";
            option_data_string += "Confirmation(s) NOT loaded...";
            option_data_string += "</option>";

            $( '#'+element_id_name ).append( option_data_string );; 
        }
    
    }


    /**
     * READING DEPLOYMENT GRADES DETAILS BASED ON THE SELECTED SUBSIDIARY
     */
    ReadSelectOptionGradesDetails = async ( element, propergated_element_id, url_data = null ) => {

        let response = "";

        if( url_data !== null ){

            response = await this.axios_http_request( 'api/employmentgrades/retrieveemploymentgrades/'+url_data, this.Request, this.config, "GET" );
        }else{

            response = await this.axios_http_request( 'api/employmentgrades/retrieveemploymentgrades/', this.Request, this.config );
        }

        let grades = response.RecordSet;

        this.GradeSelectOptionDataLoading( propergated_element_id, grades );
    
    }

    /**
     * FUNCTIONALITY TO LOAD GRADES ON AN SELECT OPTION ELEMENT
     */
    GradeSelectOptionDataLoading = ( element_id_name, grades ) => {

        $( '#'+element_id_name ).empty();
        $( '#'+element_id_name ).append("<option value='0'>Select Select Grade</option>");

        let option_data_string = "";

        if( grades.length > 0 ){

            grades.forEach( grade => {

                option_data_string = "<option ";
                option_data_string += "value='" + grade.id + "' ";
                option_data_string += "data-annual-gross-minimum='" + grade.annual_gross_minimum + "' ";
                option_data_string += "data-annual-gross-maximum='" + grade.annual_gross_maximum + "' > ";
                option_data_string += grade.grade_name +" - ( "+ grade.grade_code +" )";
                option_data_string += "</option>";
                
                $( '#'+element_id_name ).append( option_data_string );
            });

        }else{

            option_data_string = "<option ";
            option_data_string += "value='0' >";
            option_data_string += "Grade(s) NOT loaded...";
            option_data_string += "</option>";

            $( '#'+element_id_name ).append( option_data_string );
        }
    
    }


    /**
     * READING ACCOUNTS CARTEGORIES DETAILS ON AN SELECTION OPTION ELEMENT
     */
    ReadSelectOptionAccountCartegoriesDetails = async ( propergated_element_id, url_data = null ) => {

        let response = "";

        if( url_data !== null ){

            response = await this.axios_http_request( 'api/account_cartegories/retrieveaccountcartegories/'+url_data, this.Request, this.config, "GET" );
        }else{

            response = await this.axios_http_request( 'api/account_cartegories/retrieveaccountcartegories/', this.Request, this.config );
        }

        let account_cartegorie = response.RecordSet;

        this.AccountCartegorySelectOptionDataLoading( propergated_element_id, account_cartegorie );

    }

    /**
     * FUNCTIONALITY TO LOAD ACCOUNT CARTEGORIES ON AN SELECT OPTION ELEMENT
     */
    AccountCartegorySelectOptionDataLoading = ( element_id_name, account_cartegorie ) => {

        $( '#'+element_id_name ).empty();
        $( '#'+element_id_name ).append("<option value='0'>Select Account Type</option>");

        let option_data_string = "";

        if( account_cartegorie.length > 0 ){

            account_cartegorie.forEach( cartegorie => {

                option_data_string = "<option ";
                option_data_string += "value='" + cartegorie.id + "' ";
                option_data_string += "data-account-cartegory-code='" + cartegorie.account_cartegory_code + "' > ";
                option_data_string += cartegorie.account_cartegory_name;
                option_data_string += "</option>";
                
                $( '#'+element_id_name ).append( option_data_string );
            });

        }else{

            option_data_string = "<option ";
            option_data_string += "value='0' >";
            option_data_string += "Account Type(s) NOT loaded...";
            option_data_string += "</option>";

            $( '#'+element_id_name ).append( option_data_string );
        }
    
    }


    /**
     * READING PARASTATAL DETAILS ON AN SELECTION OPTION ELEMENT
     */
    ReadSelectOptionParastatalDetails = async ( propergated_element_id, url_data = null ) => {

        let response = "";

        if( url_data !== null ){

            response = await this.axios_http_request( 'api/parastatal/retrieveparastatals/'+url_data, this.Request, this.config, "GET" );
        }else{

            response = await this.axios_http_request( 'api/parastatal/retrieveparastatals/', this.Request, this.config );
        }

        let parastatal = response.RecordSet;

        this.ParastatalSelectOptionDataLoading( propergated_element_id, parastatal );

    }

    /**
     * FUNCTIONALITY TO LOAD PARASTATAL ON AN SELECT OPTION ELEMENT
     */
    ParastatalSelectOptionDataLoading = ( element_id_name, parastatal ) => {

        $( '#'+element_id_name ).empty();
        $( '#'+element_id_name ).append("<option value='0'>Select Parastatal Name</option>");

        let option_data_string = "";

        if( parastatal.length > 0 ){

            parastatal.forEach( parastatal => {

                option_data_string = "<option ";
                option_data_string += "value='" + parastatal.id + "' ";
                option_data_string += "data-parastatal-code='" + parastatal.parastatal_code + "' > ";
                option_data_string += parastatal.parastatal_name;
                option_data_string += "</option>";
                
                $( '#'+element_id_name ).append( option_data_string );
            });

        }else{

            option_data_string = "<option ";
            option_data_string += "value='0' >";
            option_data_string += "Parastatal(s) NOT loaded...";
            option_data_string += "</option>";

            $( '#'+element_id_name ).append( option_data_string );
        }
    
    }


    /**
     * READING ACCOUNTS TYPES DETAILS ON AN SELECTION OPTION ELEMENT
     */
    ReadSelectOptionAccountTypesDetails = async ( propergated_element_id, url_data = null ) => {

        
        let response = "";

        if( url_data !== null ){

            response = await this.axios_http_request( 'api/account_types/retrieveaccounttypes/'+url_data, this.Request, this.config, "GET" );
        }else{

            response = await this.axios_http_request( 'api/account_types/retrieveaccounttypes/', this.Request, this.config );
        }

        let account_types = response.RecordSet;

        this.AccountTypeSelectOptionDataLoading( propergated_element_id, account_types );

    }

    /**
     * FUNCTIONALITY TO LOAD ACCOUNT TYPES ON AN SELECT OPTION ELEMENT
     */
    AccountTypeSelectOptionDataLoading = ( element_id_name, account_types ) => {

        $( '#'+element_id_name ).empty();
        $( '#'+element_id_name ).append("<option value='0'>Select Account Usage</option>");

        let option_data_string = "";

        if( account_types.length > 0 ){

            account_types.forEach( types => {

                option_data_string = "<option ";
                option_data_string += "value='" + types.id + "' ";
                option_data_string += "data-account-type-code='" + types.account_type_code + "' > ";
                option_data_string += types.account_type_name;
                option_data_string += "</option>";
                
                $( '#'+element_id_name ).append( option_data_string );
            });

        }else{

            option_data_string = "<option ";
            option_data_string += "value='0' >";
            option_data_string += "Account Usage NOT loaded...";
            option_data_string += "</option>";

            $( '#'+element_id_name ).append( option_data_string );
        }
    
    }

}