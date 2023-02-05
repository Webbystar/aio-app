/*
* WEBBYSTARS DEFINED JAVA SCRIPT CLASS FOR SERVER SIDE PROCESSING:
* ================================================================
*/
import ShorthandController from '../ShorthandController/ShorthandController.js';

export default class ProfileManagerController{

    constructor(){

        /**
         * INITIALIZING INHERITED CLASS METHOD FOR THE
         * 
         * CHILD TO ACCESS ITS METHODS AND ATTRIBUTES
         */
        this.token = $('meta[name="csrf-token"]').attr('content');

        this.Shorthand = new ShorthandController();

        this.Shorthand.InitializeElements.userprofilesetup_blade();
    
    }

    /**
     * ON AVATAR UPLOADED THROUGH FILE INPUT WE CHANGE THE DISPLAY IMAGE ON THE SETUP PAGE
     */ 
    UpdateDisplayAvatar = async () => {

        /** CHANGING THE IMAGE UP ON UPLOAD SELECTION **/

        let passport_images = document.getElementById('user_avatar');
        let accepted_extension = ['jpg','png','jpeg','JPG','PNG','JPEG'], image_size = 4000000 ;
        let image_extension = passport_images.files[0].name.split(".").pop();

        if( accepted_extension.includes( image_extension ) ){

            if( passport_images.files[0].size <= image_size ){

              $("#imgPassportSize").attr('src',URL.createObjectURL( event.target.files[0] ) );
              $("#imgPassportSize").data('img-source',URL.createObjectURL( event.target.files[0] ));

              $("#imgPassportSize").removeAttr("class");
              $("#imgPassportSize").addClass("img-circle");
              document.getElementById("imgPassportSize").style.width = "100px";
              document.getElementById("imgPassportSize").style.height = "100px";

              /** CREATING A BASE 64 DETAILS FOR THE SELECTED IMAGE AND STORING IT ON LOCAL STORAGE **/
              await this.Shorthand.CreateBase64Image( document.getElementById('user_avatar'), "#lblPassportSize" );

              URL.revokeObjectURL( event.target.files[0] );

            }else{

              let text = "Sorry, the file choosen is larger that allowed size.";
              let element_content = "<i class='fa fa-exclamation-triangle'></i> &nbsp;" + text;
              
              $("#app_alerts").html( element_content );
              $('#app_alerts').addClass('alert alert-danger');
              $('#app_alerts').show('fast').delay(5000).fadeOut('fast');

            }

        }else if( !accepted_extension.includes( image_extension ) ){

            let text = "Sorry, the file choosen is not allowed only jpg and png file types are allowed.";
            let element_content = "<i class='fa fa-times-circle'></i> &nbsp;" + text;

            $("#app_alerts").html( element_content );
            $('#app_alerts').addClass('alert alert-danger');
            $('#app_alerts').show('fast').delay(5000).fadeOut('fast');
        }
    
    }

    /**
     * IF THE AVATAR WAS NOT UPLOADED THROUGH A FILE INPUT WE REPLACE THE DEFAULT BLANK AVATAR
     * 
     * WITH THE AVATAR AS PER GENDER SELECTION FOR THE USER IF MALE WE USE MALE IF FEMALE WE USE FEMALE
     */
    WhatGenderAvatar(){

        let user_avatar = document.getElementById("user_avatar");

        if( user_avatar.files.length == 0 ){

            let filePath = 'app_images/app_avatars/' + $("input[type='radio'][name='Gender']:checked").val() + '-seated.png';
            
            $("#lblPassportSize").text( $("input[type='radio'][name='Gender']:checked").val() + '-seated.png' );

            $("#imgPassportSize").attr('src', filePath );
            $("#imgPassportSize").data('img-source', filePath );

            $("#imgPassportSize").removeAttr("class");
            $("#imgPassportSize").addClass("img-circle");
            document.getElementById("imgPassportSize").style.width = "100px";
            document.getElementById("imgPassportSize").style.height = "100px";
        }else{
            
            console.log('The Image is set already');
        }
    
    }

    /**
     * PRE-LOADING OF DATA THAT IS NEEDED FOR THE PAGE ELEMENTS
     */
    UserProfileSetupDataPreloading = async () => {

        $('#fileNumber').focus();
        $('#branch_operation').hide();
        $('#subsidiari_operation').hide();

        /**
         * START : SETUP INITIAL USER DATA PROVIDED DURING LOGIN:
         */ 
        let UserNameProfiled = $('meta[name="UserName"]').attr('content');
            UserNameProfiled = UserNameProfiled || "guest.user";

        let emailsample = UserNameProfiled;

        UserNameProfiled = UserNameProfiled.split('.');

        let fullname_sample = UserNameProfiled[0] .toUpperCase() + " "+ UserNameProfiled[1] .toUpperCase();

        $("#UserNameProfiled").html( fullname_sample );

        document.getElementById("userEmail").value = emailsample;
        document.getElementById("fullName").value = fullname_sample;
        document.getElementById("officeEmail").value = emailsample;
        /**
         * END : SETUP INITIAL USER DATA PROVIDED DURING LOGIN:
         */

        try{

            /** NEW APPROACH 30-12-2022 : RETRIEVING COUNTRIES DATA SET **/
            this.Shorthand.ReadSelectOptionCountriesDetails( "countrie_id" );


            /** NEW APPROACH 30-12-2022 : RETRIEVING IDENTIFICATIONS DATA SET **/
            this.Shorthand.ReadSelectOptionIdentificationsDetails( "identification_id" );

            /** NEW APPROACH 30-12-2022 : RETRIEVING MARITAL STATUSES DATA SET **/
            this.Shorthand.ReadSelectOptionMaritalStatusesDetails( "marital_status_id" );

            /** RETRIEVING MARITAL STATUSES DATA SET **/
            /*let maritalstatus = await this.Shorthand.axios_http_request( 'api/maritalstatus/retrievemaritalstatuses', this.Shorthand.Request, this.Shorthand.config, "GET" );

            if( maritalstatus.Status == 200 ){
                
                $('#marital_status_id').empty();
                $('#marital_status_id').append("<option value='0'>Select Marital Status</option>");

                maritalstatus.RecordSet.forEach(marital => {

                    let option_data_string = "<option ";
                        option_data_string += "value='" + marital.id + "' ";
                        option_data_string += "data-marital-code='" + marital.marital_status_code + "' >";
                        option_data_string += "" + marital.marital_status + "";
                        option_data_string += "</option>";
                    
                    $('#marital_status_id').append( option_data_string );
                });

            }else{

                let option_data_string = "<option ";
                    option_data_string += "value='0' ";
                    option_data_string += "data-marital-code='null'>";
                    option_data_string += " Marital statuses not loaded...";
                    option_data_string += "</option>";
                
                $('#marital_status_id').append( option_data_string );
            }*/


        }catch( error ){

            this.Shorthand.CatchedErrorManagementFunction( error );
        }
    
    }

    /**
     * PRE-LOADING OF ACADEMIC DATA THAT IS NEEDED FOR THE PAGE ELEMENTS
     */
    UserAcademicSetupDataPreloading = async () => {

        /** PRE-LOADING ACADEMIC TYPES OPTIONS **/
        let education_parameter = null;

        let get_api_url = 'api/educationlevel/retrieveeducationlevels/' + ( education_parameter || '' );

        let response = await this.Shorthand.axios_http_request( get_api_url, this.Shorthand.Request, this.Shorthand.config, 'GET' );

        $('#educationlevel_id').empty();

        if( response.Status == 200 ){

            $('#educationlevel_id').append( "<option value='0' data-attachment-code='null' >Select Education Level</option>" );

            response.RecordSet.forEach(education => {

                let option_data_string = "<option ";
                    option_data_string += "value='" + education.id + "' ";
                    option_data_string += "data-education-code='" + education.education_level_code + "' >";
                    option_data_string += "" + education.education_level + "";
                    option_data_string += "</option>";
                
                $('#educationlevel_id').append( option_data_string );
            });

        }else{

            let option_data_string = "<option ";
                option_data_string += "value='0' ";
                option_data_string += "data-education-code='null' >";
                option_data_string += " Education Level(s) not loaded...";
                option_data_string += "</option>";
        
            $('#educationlevel_id').append( option_data_string );
        }
    
    }

    /**
     * PRE-LOADING OF NEXT OF KIN DATA THAT IS NEEDED FOR THE PAGE ELEMENTS
     */
    UserNextkinSetupDataPreloading = async() => {

        $('#KinFullName').focus();
        $("#UserNextKinList").html( $("#UserNameProfiled").text() +'\'S' );

        /** PRE-LOADING ATTACHMENTS TYPES OPTIONS **/
        let attachment_parameter = null;

        let get_api_url = 'api/attachments/retrieveattachments/'+ ( attachment_parameter ? attachment_parameter : '');

        let response = await this.Shorthand.axios_http_request( get_api_url, this.Shorthand.Request, this.Shorthand.config, 'GET' );

        $('#attachment_id').empty();

        if( response.Status == 200 ){

            $('#attachment_id').append( "<option value='0' data-attachment-code='null' >  Select attachment type </option>" );

            response.RecordSet.forEach( atachment => {

                let option_data_string = "<option ";
                    option_data_string += "value='" + atachment.id + "' ";
                    option_data_string += "data-attachment-code='" + atachment.attachment_code + "' > ";
                    option_data_string += atachment.attachment_name;
                    option_data_string += "</option>";                        
                
                $('#attachment_id').append( option_data_string );
                
            });

        }else{

            let option_data_string = "<option ";
                option_data_string += "value='0' ";
                option_data_string += "data-attachment-code='null' >";
                option_data_string += " Attachments not loaded...";
                option_data_string += "</option>";
        
            $('#attachment_id').append( option_data_string );
        }


        /** PRE-LOADING NEXT KIN RELATIONSHIP TYPES OPTIONS **/
        let relation_parameter = null;

        get_api_url = 'api/nextkinrelationships/retrievenextkinrelationships/'+ ( relation_parameter ? relation_parameter : '');

        response = await this.Shorthand.axios_http_request( get_api_url, this.Shorthand.Request, this.Shorthand.config, 'GET' );

        $('#relationship_id').empty();

        if( response.Status == 200 ){

            $('#relationship_id').append( "<option value='0' data-relationship-code='null' >  Select relationship type </option>" );

            response.RecordSet.forEach( relation => {

                let option_data_string = "<option ";
                    option_data_string += "value='" + relation.id + "' ";
                    option_data_string += "data-relationship-code='" + relation.relationship_code + "' > ";
                    option_data_string += relation.relationship_name;
                    option_data_string += "</option>";                        
                
                $('#relationship_id').append( option_data_string );
                
            });

        }else{

            let option_data_string = "<option ";
                option_data_string += "value='0' ";
                option_data_string += "data-relationship-code='null' >";
                option_data_string += " Next of Kin relationship not loaded...";
                option_data_string += "</option>";
        
            $('#relationship_id').append( option_data_string );
        }
    
    }


    /**
     * PRE-LOADING OF DEPLOYMENT DATA THAT IS NEEDED FOR THE PAGE ELEMENTS
     */
    UserDeploymentSetupDataPreloading = async() => {

        $('#dateJoined').focus();

        /**
         * COUNTRIES SELECT OPTION DATA LOADING
         */
        this.Shorthand.ReadSelectOptionCountriesDetails( 'deploi_countrie_id' );

    }


    /**
     * PRE-LOADING OF ACCOUNT DATA THAT IS NEEDED FOR THE PAGE ELEMENTS
     */
    UserAccountSetupDataPreloading = async() => {

        
        /**
         * LOADING ACCOUNT CARTEGORIES ( UI NAMED ACCOUNT TYPE ) DATA ON SELECT OPTIONS
         */
        let accountCartegoriesUrl_data = "0/ACTIVE";

        await this.Shorthand.ReadSelectOptionAccountCartegoriesDetails( 'account_cartegorie_id', accountCartegoriesUrl_data );

        /**
         * LOADING ACCOUNT TYPES ( UI NAMED ACCOUNT USAFE ) DATA ON SELECT OPTIONS
         */
        let accountTypestUrl_data = "0/ACTIVE";

        await this.Shorthand.ReadSelectOptionAccountTypesDetails( 'account_type_id', accountTypestUrl_data );

    }


    /**
     * PRE-LOADING OF PARASTATAL DATA THAT IS NEEDED FOR THE PAGE ELEMENTS
     */
    UserParastataltSetupDataPreloading = async() => {

        /**
         * LOADING PARASTATAL DATA ON SELECT OPTIONS
         */
        let parastatalUrl_data = "0/ACTIVE";

        await this.Shorthand.ReadSelectOptionParastatalDetails( 'parastatal_id', parastatalUrl_data );

    }


    SubsidiariesPreloadDataSet = async( element, propergated_element_id ) => {

        /**
         * LOADING BRANCHES DATA ON SELECT OPTIONS
         */
        this.Shorthand.ReadSelectOptionBranchesDetails( element, propergated_element_id );

        /**
         * LOADING DEPARTMENTS DATA ON SELECT OPTIONS
         */
        let institute_id = $(element).children('option:selected').data('institute-code');
        let departmentUrl_data = institute_id + "/" + "ACTIVE";

        this.Shorthand.ReadSelectOptionDepartmentsDetails( element, 'department_id', departmentUrl_data );

        /**
         * LOADING JOB TITLES DATA ON SELECT OPTIONS
         */
        let jobTitle_institute_id = $(element).children('option:selected').data('institute-code');
        let jobTitleUrl_data = jobTitle_institute_id + "/" + "ACTIVE";

        this.Shorthand.ReadSelectOptionJobTitlesDetails( element, 'job_title_id', jobTitleUrl_data );

        /**
         * LOADING CONFIRMATION DATA ON SELECT OPTIONS
         */
        let confirmationUrl_data = "null/ACTIVE";

        this.Shorthand.ReadSelectOptionConfirmationsDetails( element, 'confirmation_id', confirmationUrl_data );

        /**
         * LOADING CONTRACT TYPE DATA ON SELECT OPTIONS
         */
        let contractUrl_data = "null/ACTIVE";

        this.Shorthand.ReadSelectOptionContractsDetails( element, 'contract_id', contractUrl_data );


        /**
         * LOADING EMPLOYMENT GRADE TYPE DATA ON SELECT OPTIONS
         */
        let gradeUrl_data = $(element).children('option:selected').val()+"/ACTIVE";

        this.Shorthand.ReadSelectOptionGradesDetails( element, 'grade_id', gradeUrl_data );

    }

    /**
     * SIMULATION OF GRADE'S SALARY RANGE AS PER SELETCED GRADE
     */
    GradeSalaryRangeSetup = async( element, propergated_element_id ) => {

        $( '#'+ propergated_element_id ).empty();
        $( '#'+ propergated_element_id ).append("<option value='0'>Select Grade Salary Range</option>");

        let grade_data = [

            { 
                Range_Notation : 'annual_gross_maximum', 
                Range_Text : 'Maximum Monthly Gross Salary',
                Range_Value : $( element ).children('option:selected').data('annual-gross-maximum')
            },
            { 
                Range_Notation : 'annual_gross_minimum', 
                Range_Text : 'Minimum Monthly Gross Salary', 
                Range_Value : $( element ).children('option:selected').data('annual-gross-minimum')
            }
        ];


        let option_data_string = "";

        if(  grade_data.length > 0 ){

            grade_data.forEach( grade => {

                let range_value = ( grade.Range_Value / 12 );

                let month_gross = Math.round( ( range_value + Number.EPSILON ) * 100) / 100;

                option_data_string = "<option ";
                option_data_string += "value='" + grade.Range_Notation + "' >";
                option_data_string += grade.Range_Text +" - ( "+ month_gross + " )";
                option_data_string += "</option>";
                
                $( '#'+propergated_element_id ).append( option_data_string );
            });


        }else{

            option_data_string = "<option ";
            option_data_string += "value='0' >";
            option_data_string += "Grade Salary Range NOT loaded...";
            option_data_string += "</option>";

            $( '#'+propergated_element_id ).append( option_data_string );
        }

    }


    /**
     * PRE-LOADING OF SUBASIDIARY DETAILS AFTER SELECTION OF A COUNTRY
     */
    RequestCountrieSubsidiaries = async ( element, propergated_element_id = 'subsidiari_id' ) =>{

        let control_state = $( element ).val();

        if( control_state > 0 ){

            $( "#subsidiari_operation" ).show();
            $('#subsidiari_id').empty();

            this.Shorthand.ReadSelectOptionSubsidiariesDetails( $(element).attr('id'), propergated_element_id );

        }else{

            $( "#subsidiari_operation" ).empty();
            $( "#subsidiari_operation" ).hide();
        }
    }


    /**
     * SAVING THE USER INPUT DETAILS TO THE DATABASE
     */
    SaveUserDetails = async() => {

        this.Shorthand.DismissableResponse();

        /** A : COLLECTING USER INPUTS **/
        this.Shorthand.Request = {
            token: this.Shorthand.token,
            user_image_path: $("#imgPassportSize").data('img-source'),
            file_number: $('#fileNumber').val(),
            token_serial: $('#tokenSerialNumber').val() == "" ? "" : $('#tokenSerialNumber').val(),
            user_email: $('#userEmail').val(),
            full_name: $('#fullName').val(),
            user_gender: $("input[type='radio'][name='Gender']:checked").val(),
            identification_details: { identification_id : $('#identification_id option:selected').val(), textValue: $('#identification_id option:selected').text() },
            identification_number: $('#identificationNumber').val(),
            passport_number: $('#passportNumber').val() == "" ? "" : $('#passportNumber').val(),
            birth_date: $("#birthDate").val(),
            marital_status_details: { marital_status_id : $('#marital_status_id').val(), textValue: $('#marital_status_id option:selected').text() },
            countrie_details: { countrie_id : $('#countrie_id').val(), textValue: $('#countrie_id option:selected').text() },
            subsidiari_details: { subsidiari_id : $('#subsidiari_id').val(), textValue: $('#subsidiari_id option:selected').text(), subsidiari_dir: $('#subsidiari_id option:selected').data('subsiriary-directory') },

        };

        /** B : SENDING USER INPUTS TO THE SERVER **/
        let response = await this.Shorthand.axios_http_request( '/api/userprofile/userdetails', this.Shorthand.Request, this.Shorthand.config );

        /** C : PRE-VIEWING THE RESPONSE TO USER **/
        if( response.Status == 201 ){

            this.Shorthand.DismissableResponse( "on-form", response );
        }else{

            this.Shorthand.DismissableResponse( "on-form", response );           
        }
    
    }

    /**
     * SAVING THE NEXT OF KIN INPUT DETAILS TO THE DATABASE
     */
    SaveKinDetails = async() => {

        this.Shorthand.DismissableResponse();

        /** A : COLLECTING USER INPUTS **/
        this.Shorthand.Request = {
            token: this.Shorthand.token,
            full_name: $('#KinFullName').val(),
            user_gender: $("input[type='radio'][name='KinGender']:checked").val(),
            certificate_name : $('#lblAttachment').text(),
            attachment_details: { attachment_id : $('#attachment_id option:selected').val(), textValue: $('#attachment_id option:selected').text() },
            relationship_details: { relationship_id : $('#relationship_id option:selected').val(), textValue: $('#relationship_id option:selected').text() },
            birth_date: $("#KinDateBirth").val()
        };

        /** B : SENDING USER INPUTS TO THE SERVER **/
        let response = await this.Shorthand.axios_http_request( '/api/userprofile/nextkindetails', this.Shorthand.Request, this.Shorthand.config );

        
        /** C : PRE-VIEWING THE RESPONSE TO USER **/
        if( response.Status == 201 ){

            $('#next_of_kin_list').empty();

            response.RecordSet.forEach( UserKins => {

                let data_string = "<div class='icheck-success d-inline' id='"+UserKins.full_name+"Section'>";
                    data_string += "<input type='radio' name='"+ UserKins.id +"' checked id='"+ UserKins.full_name + UserKins.id +"'>";
                    data_string += "<label for='"+ UserKins.full_name + UserKins.id +"' id='"+UserKins.full_name+"'>"+UserKins.full_name+"</label>";
                    data_string += "</div>";
                    data_string += "<br/>";
                    data_string += "<hr/>";                       
                
                $('#next_of_kin_list').append( data_string );
                
            });

            this.Shorthand.DismissableResponse( "on-form", response );
        }else{

            this.Shorthand.DismissableResponse( "on-form", response );
        }
    
    }

    /**
     * SAVING USER CONTACTS INPUT DETAILS TO THE DATABASE
     */
    SaveUserContactDetails = async() => {

        this.Shorthand.DismissableResponse( );

        /** A : COLLECTING USER INPUTS **/
        this.Shorthand.Request = {
            token: this.Shorthand.token,
            office_email: $('#officeEmail').val(),
            personal_email: $('#personalEmail').val(),
            phone_number: $('#phoneNumber').val(),
            other_phone_number: $('#otherPhoneNumber').val(),
            postal_address: $('#postalAddress').val() == "" ? "" : $('#postalAddress').val()

        };


        /** B : SENDING USER INPUTS TO THE SERVER **/
        let response = await this.Shorthand.axios_http_request( '/api/userprofile/usercontactsdetails', this.Shorthand.Request, this.Shorthand.config );

        /** C : PRE-VIEWING THE RESPONSE TO USER **/
        if( response.Status == 201 ){

            this.Shorthand.DismissableResponse( "on-form", response );
        }else{

            this.Shorthand.DismissableResponse( "on-form", response );
        }
    
    }


    /**
     * SAVING USER DEPLOYMENT INPUT DETAILS TO THE DATABASE
     */
    SaveUserDeploymentDetails = async() => {

        this.Shorthand.DismissableResponse( );

        /** A : COLLECTING USER INPUTS **/
        this.Shorthand.Request = {
            token: this.Shorthand.token,
            date_joined: $('#dateJoined').val(),
            institute_id: $('#deploi_subsidiari_id').children('option:selected').data('institute-code'),
            deploi_subsidiari_id: $('#deploi_subsidiari_id').children('option:selected').val(),
            deploi_branch_id: $( '#deploi_branch_id' ).children('option:selected').val(),
            department_id: $( '#department_id' ).children('option:selected').val(),
            job_title_id: $( '#job_title_id' ).children('option:selected').val(),
            confirmation_id: $( '#confirmation_id' ).children('option:selected').val(),
            grade_id: $( '#grade_id' ).children('option:selected').val(),
            contract_id: $( '#contract_id' ).children('option:selected').val(),
            is_expatriate : $("input[type='radio'][name='expatriate_label']:checked").val(),
            permit_number : $("#permitNumber").val(),
            deployment_group: $("input[type='radio'][name='deployment_group']:checked").val()

        };


        /** B : SENDING USER INPUTS TO THE SERVER **/
        let response = await this.Shorthand.axios_http_request( '/api/userprofile/userdeploymentsdetails', this.Shorthand.Request, this.Shorthand.config );


        /** C : PRE-VIEWING THE RESPONSE TO USER **/
        if( response.Status == 201 ){

            this.Shorthand.DismissableResponse( "on-form", response );
        }else{

            this.Shorthand.DismissableResponse( "on-form", response );
        }

    }


    /**
     * SAVING USER ACADEMIC INPUT DETAILS TO THE DATABASE
     */
    SaveAcademicDetails = async() => {

        let date_range = $('#academic_period').val();

        /**
         * FORMATTING SELECTED DATE FROM mm-dd-YYYY NOTATION TO dd-mm-YYYY NOTATION
         * 
         * INITIALY SPLITTING THE FROM AND TO DATES BY USING A SEPARATOR -
         * 
         * USING THE FUNCTION StringSplitterReturnArrai( needle, string, get_indexOf = null )
         */
        let start_data = this.Shorthand.StringSplitterReturnArrai( '-', date_range, 0 );
        let end_date = this.Shorthand.StringSplitterReturnArrai( '-', date_range, 1 );

        /**
         * SPLITTING SELECTED START DATE AND END DATE USING THE / SEPARATOR
         * 
         * THIS IS INTENDED TO GET ARRAY CHUNKS OF A STRING IN mm-dd-YYYY         * 
         */
        let start_date_arrai = this.Shorthand.StringSplitterReturnArrai( '/', start_data );
        let end_date_arrai = this.Shorthand.StringSplitterReturnArrai( '/', end_date );

        /**
         * REFORMATTING THE ARRAY TO A REQUIRED DATE FORM dd-mm-YYYY
         */
        let formated_start_date = this.Shorthand.ArraiJoinerReturnString( [ start_date_arrai[1], start_date_arrai[0], start_date_arrai[2] ], '-' );
        let formated_end_date = this.Shorthand.ArraiJoinerReturnString( [ end_date_arrai[1], end_date_arrai[0], end_date_arrai[2] ], '-' );
        
        /**
         * UPDATING THE ELEMENT WITH A NEW FORMAT TO REPLACE THE mm-dd-YYYY - mm-dd-YYYY WITH dd-mm-YYYY To dd-mm-YYYY
         */
        $('#academic_period').val( formated_start_date + "  To  " + formated_end_date );

        this.Shorthand.DismissableResponse( );

        /** A : COLLECTING USER INPUTS **/
        this.Shorthand.Request = {
            token: this.Shorthand.token,
            educationlevel_id: $('#educationlevel_id').children('option:selected').val(),
            educationlevel_text: $('#educationlevel_id').children('option:selected').text(),
            school_name: $('#schoolName').val(),
            index_number : $('#indexNumber').val(),
            academic_period : $('#academic_period').val(),
            certificate_name : $('#lblCertificate').text(),
        };


        /** B : SENDING USER INPUTS TO THE SERVER **/
        let response = await this.Shorthand.axios_http_request( '/api/userprofile/useracademicsdetails', this.Shorthand.Request, this.Shorthand.config );


        /** FORMATTING SERVER RESPONSE TO **/
        let recordCount = 0;

        let table_rows = "";

        /** C : PRE-VIEWING THE RESPONSE TO USER **/
        if( response.Status == 201 ){

            this.Shorthand.DismissableResponse( "on-form", response );

            $("#education_record_list").empty();            

            response.RecordSet.forEach( academic => {

                table_rows = "<tr>";
                table_rows += "<td>" + ( recordCount + 1 ) + "</td>";
                table_rows += "<td>" + academic.school_name + "</td>";
                table_rows += "<td>" + academic.academic_period + "</td>";
                table_rows += "</tr>";
                
                $( '#education_record_list' ).append( table_rows );
                recordCount = recordCount + 1;
            });
            
        }else{

            this.Shorthand.DismissableResponse( "on-form", response );

            $("#education_record_list").empty();            

            response.RecordSet.forEach( academic => {

                table_rows = "<tr>";
                table_rows += "<td>" + ( recordCount + 1 ) + "</td>";
                table_rows += "<td>" + academic.school_name + "</td>";
                table_rows += "<td>" + academic.academic_period + "</td>";
                table_rows += "</tr>";
                
                $( '#education_record_list' ).append( table_rows );
                recordCount = recordCount + 1;
            });
        }
     }


    /**
     * SAVING USER ACCOUNTS INPUT DETAILS TO THE DATABASE
     */
    SaveAccountsDetails = async() => {

        this.Shorthand.DismissableResponse( );

        /** A : COLLECTING USER INPUTS **/
        this.Shorthand.Request = {
            token: this.Shorthand.token,
            account_cartegorie_id: $('#account_cartegorie_id').children('option:selected').val(),
            account_cartegorie_code: $('#account_cartegorie_id').children('option:selected').data("account-cartegory-code"),
            account_cartegorie_text: $('#account_cartegorie_id').children('option:selected').text(),
            account_number: $('#accountNumber').val(),
            account_type_id: $('#account_type_id').children('option:selected').val(),
            account_type_code: $('#account_type_id').children('option:selected').data("account-type-code"),
            account_type_text: $('#account_type_id').children('option:selected').text(),
        };


        /** B : SENDING USER INPUTS TO THE SERVER **/
        let response = await this.Shorthand.axios_http_request( '/api/userprofile/useraccountsdetails', this.Shorthand.Request, this.Shorthand.config );


        let recordCount = 0;

        let table_rows = "";

        /** C : PRE-VIEWING THE RESPONSE TO USER **/
        if( response.Status == 201 ){

            this.Shorthand.DismissableResponse( "on-form", response );

            $("#account_record_list").empty();            

            response.RecordSet.forEach( accounts => {

                table_rows = "<tr>";
                table_rows += "<td>" + ( recordCount + 1 ) + "</td>";
                table_rows += "<td>" + accounts.cartegory_name + "</td>";
                table_rows += "<td>" + accounts.account + "</td>";
                table_rows += "</tr>";
                
                $( '#account_record_list' ).append( table_rows );
                recordCount = recordCount + 1;
            });
            
        }else{

            this.Shorthand.DismissableResponse( "on-form", response );

            $("#account_record_list").empty();            

            response.RecordSet.forEach( accounts => {

                table_rows = "<tr>";
                table_rows += "<td>" + ( recordCount + 1 ) + "</td>";
                table_rows += "<td>" + accounts.cartegory_name + "</td>";
                table_rows += "<td>" + accounts.account + "</td>";
                table_rows += "</tr>";
                
                $( '#account_record_list' ).append( table_rows );
                recordCount = recordCount + 1;
            });
        }


    }


    /**
     * SAVING USER PARASTATAL INPUT DETAILS TO THE DATABASE
     */
    SaveParastatalDetails = async() => {

        this.Shorthand.DismissableResponse( );

        /** A : COLLECTING USER INPUTS **/
        this.Shorthand.Request = {
            token: this.Shorthand.token,
            parastatal_id: $('#parastatal_id').children('option:selected').val(),
            parastatal_code: $('#parastatal_id').children('option:selected').data("parastatal-code"),
            parastatal_text: $('#parastatal_id').children('option:selected').text(),
            parastatal_number: $('#parastatal_number').val(),
            status_id: 'ACTIVE',
        };


        /** B : SENDING USER INPUTS TO THE SERVER **/
        let response = await this.Shorthand.axios_http_request( '/api/userprofile/userparastataldetails', this.Shorthand.Request, this.Shorthand.config );


        let recordCount = 0;

        let table_rows = "";

        /** C : PRE-VIEWING THE RESPONSE TO USER **/
        if( response.Status == 201 ){

            this.Shorthand.DismissableResponse( "on-form", response );

            $("#parastatal_record_list").empty();            

            response.RecordSet.forEach( parastatal => {

                table_rows = "<tr>";
                table_rows += "<td>" + ( recordCount + 1 ) + "</td>";
                table_rows += "<td>" + parastatal.parastatal_name + "</td>";
                table_rows += "<td>" + parastatal.parastatal_number + "</td>";
                table_rows += "</tr>";
                
                $( '#parastatal_record_list' ).append( table_rows );
                recordCount = recordCount + 1;
            });
            
        }else{

            this.Shorthand.DismissableResponse( "on-form", response );

            $("#parastatal_record_list").empty();            

            response.RecordSet.forEach( parastatal => {

                table_rows = "<tr>";
                table_rows += "<td>" + ( recordCount + 1 ) + "</td>";
                table_rows += "<td>" + parastatal.parastatal_name + "</td>";
                table_rows += "<td>" + parastatal.parastatal_number + "</td>";
                table_rows += "</tr>";
                
                $( '#parastatal_record_list' ).append( table_rows );
                recordCount = recordCount + 1;
            });
        }

    }

}