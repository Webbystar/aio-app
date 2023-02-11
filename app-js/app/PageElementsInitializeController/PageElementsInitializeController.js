/*
* WEBBYSTARS DEFINED JAVA SCRIPT CLASS FOR ON PAGE ELEMNETS INITIALIZATION:
* ========================================================================
*/
export default class PageElementsInitializeController{

	constructor(){

 		this.page_scripts = {};

 		$.widget.bridge('uibutton', $.ui.button);

 		/**
         * APPLYING THE NAME OF THE ELEMENT ON A LABEL ELEMENT
         * 
         * CAN BE DONE BY APPLYING BOOT STRAP THROUHG THE LIBARY :
         * 
         * bs-custom-file-input/bs-custom-file-input.min.js
         * 
         * ONLY BY APPLYING THE LIBRARY ON THE PAGE IN NEED OF FILE INPUT 
         * 
         * FILE NAME DISPLAY AND INITIALIZING THE FUNCTION : 
         * 
         * bsCustomFileInput.init();
         * 
         * AS INITILIZED IN:
         * 
         * FILE NAME : ShorthandController.js
         * 
         * FILE PATH : app_js\app\ShorthandController
         * 
         * CLASS NAME : ShorthandController
         * 
         * METHOD : CreateBase64Image( element, display_text_elemet_id )
         * 
         * BY INITIALIZING IT HERE AUTOMATICALLY ALL PAGES INHERIT THE INITIALIZATION
         */
 		bsCustomFileInput.init();
	}

	init_blade = () => {
		
		/**
		 * Resolve conflict in jQuery UI tooltip with Bootstrap tooltip
		 */

		$('#app_alerts').hide();

		$('#preview-password').mousedown(function(){
    
	    	$('#authPassword').prop('type','text');
	    });

		$('#preview-password').mouseup(function(){
			
			$('#authPassword').prop('type','password');
		});
	}

	appstartup_blade = () => {
		
		/** LEFT PANEL NAVIGATION LINKS ACTIVE SETTINGS **/
	    $('.nav-link').click(function(e){
	        $('.nav-link').removeClass("active-{{config('app.app_theme_color')}}");        
	        $(this).addClass("active-{{config('app.app_theme_color')}}");
	    });

	    $("#example1").DataTable({
	      "responsive": true, "lengthChange": false, "autoWidth": false,
	      "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
	    }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');

	    /**  INITIALIZING SELECT 2 ELEMENTS WITH DEFAULT THEME ADDING SEARCH OPTION **/
	    $('.select2').select2();

	    /**  INITIALIZING SELECT 2 ELEMENTS WITH BOOTSTRAP 4 THEME ADDING SEARCH OPTION **/
	    $('.select2bs4').select2({ theme: 'bootstrap4' });

	    /**  INITIALIZING BOOTSTRAP DUALLISTBOX  **/
	    $('.duallistbox').bootstrapDualListbox();

	    /**  SETTING MASKING INPUTS WITH DAY-MONTH-YEAR  (dd/mm/yyyy) **/
	    $('#datemask').inputmask('dd/mm/yyyy', { 'placeholder': 'dd/mm/yyyy' });
	    /**  SETTING MASKING INPUTS WITH MONTH-DAY-YEAR (mm/dd/yyyy) **/
	    $('#datemask2').inputmask('mm/dd/yyyy', { 'placeholder': 'mm/dd/yyyy' });
	    /**  INITIALIZING MASKING INPUTS  **/
	    $('[data-mask]').inputmask();

	    /**  INITIALIZING COLOR PICKER 1  **/
	    $('.my-colorpicker1').colorpicker();

	    /**  INITIALIZING COLOR PICKER 2 WITH ADDON  **/
	    $('.my-colorpicker2').colorpicker();

	    $('.my-colorpicker2').on('colorpickerChange', function(event) {
	      $('.my-colorpicker2 .fa-tint').css('color', event.color.toString());
	    });

	    /**  INITIALIZING DATE PICKER  **/
	    $('#reservationdate').datetimepicker({ format: 'L' });

	    /**  INITIALIZING DATE AND TIME PICKER  **/
	    $('#reservationdatetime').datetimepicker({ icons: { time: 'far fa-clock' } });

	    /**  INITIALIZING DATE RANGE PICKER  **/
	    $('#reservation').daterangepicker();

	    /**  INITIALIZING DATE RANGE WITH TIME PICKER  **/
	    $('#reservationtime').daterangepicker({
	      timePicker: true,timePickerIncrement: 30,locale: {format: 'MM/DD/YYYY hh:mm A'}
	    });

	    /**  INITIALIZING DATE RANGE PICKER AS A BUTTON  **/
	    $('#daterange-btn').daterangepicker(
	      {
	        ranges   : {
	          'Today'       : [moment(), moment()],
	          'Yesterday'   : [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
	          'Last 7 Days' : [moment().subtract(6, 'days'), moment()],
	          'Last 30 Days': [moment().subtract(29, 'days'), moment()],
	          'This Month'  : [moment().startOf('month'), moment().endOf('month')],
	          'Last Month'  : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
	        },
	        startDate: moment().subtract(29, 'days'),
	        endDate  : moment()
	      },
	      function (start, end) {
	        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'))
	      }
	    );

	    /**  INITIALIZING TIME PICKER  **/
	    $('#timepicker').datetimepicker({ format: 'LT' });

	    $("input[data-bootstrap-switch]").each(function(){
	      $(this).bootstrapSwitch('state', $(this).prop('checked'));
	    });
	}
	
	userprofilesetup_blade = () => {

		/** TOP MAIN HEADER AND NAVIGATION ELEMENT LEFT MARGIN REMOVAL **/
	    $('#left_margin_state').css("margin-left", "-1px");
	    $('#footer_left_margin_state').css("margin-left", "-1px");

	    /** HIDING THE ERROR MESSAGESECTION WHEN PAGE LOADS **/
	    $('#app_alerts').hide();
	    
	    /** LEFT PANEL NAVIGATION LINKS ACTIVE SETTINGS **/
	    $('.nav-link').click(function(e){
	        $('.nav-link').removeClass("active-{{config('app.app_theme_color')}}");        
	        $(this).addClass("active-{{config('app.app_theme_color')}}");
	    });

	    $("#example1").DataTable({
	      "responsive": true, "lengthChange": false, "autoWidth": false,
	      "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
	    }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');

	    /**  INITIALIZING SELECT 2 ELEMENTS WITH DEFAULT THEME ADDING SEARCH OPTION **/
	    $('.select2').select2();

	    /**  INITIALIZING SELECT 2 ELEMENTS WITH BOOTSTRAP 4 THEME ADDING SEARCH OPTION **/
	    $('.select2bs4').select2({ theme: 'bootstrap4' });

	    /**  INITIALIZING BOOTSTRAP DUALLISTBOX  **/
	    $('.duallistbox').bootstrapDualListbox();

	    /**  SETTING MASKING INPUTS WITH DAY-MONTH-YEAR  (dd/mm/yyyy) **/
	    $('#datemask').inputmask('dd/mm/yyyy', { 'placeholder': 'dd/mm/yyyy' });
	    /**  SETTING MASKING INPUTS WITH MONTH-DAY-YEAR (mm/dd/yyyy) **/
	    $('#datemask2').inputmask('mm/dd/yyyy', { 'placeholder': 'mm/dd/yyyy' });
	    /**  INITIALIZING MASKING INPUTS  **/
	    $('[data-mask]').inputmask();

	    /**  INITIALIZING COLOR PICKER 1  **/
	    $('.my-colorpicker1').colorpicker();

	    /**  INITIALIZING COLOR PICKER 2 WITH ADDON  **/
	    $('.my-colorpicker2').colorpicker();

	    $('.my-colorpicker2').on('colorpickerChange', function(event) {
	      $('.my-colorpicker2 .fa-tint').css('color', event.color.toString());
	    });

	    /**  INITIALIZING BIRTH DATE OF EMPLOYEE DATE PICKER  **/
	    $('#birthDate').datetimepicker({ format: 'DD-MM-YYYY' });

	    /**  INITIALIZING DATE NEXT OF KIN DATE OF BIRTH DATE PICKER  **/
	    $('#KinDateBirth').datetimepicker({ format: 'DD-MM-YYYY' });

	    /**  INITIALIZING DATE OF JOINING DATE PICKER  **/
	    $('#dateJoined').datetimepicker({ format: 'DD-MM-YYYY' });

	    /**  INITIALIZING DATE AND TIME PICKER  **/
	    $('#reservationdatetime').datetimepicker({ icons: { time: 'far fa-clock' } });

	    /**  INITIALIZING DATE RANGE PICKER  **/
	    $('#reservation').daterangepicker();

	    /**  INITIALIZING ACADEMIC ELEMENT DATE RANGE PICKER  **/
	    $('#academic_period').daterangepicker(
	    {
	        startDate: moment().subtract( 29, 'days' ),
	        endDate  : moment()
	      });

	    /**  INITIALIZING DATE RANGE WITH TIME PICKER  **/
	    $('#reservationtime').daterangepicker({
	      timePicker: true,timePickerIncrement: 30,locale: {format: 'MM/DD/YYYY hh:mm A'}
	    });

	    /**  INITIALIZING DATE RANGE PICKER AS A BUTTON  **/
	    $('#daterange-btn').daterangepicker(
	      {
	        ranges   : {
	          'Today'       : [moment(), moment()],
	          'Yesterday'   : [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
	          'Last 7 Days' : [moment().subtract(6, 'days'), moment()],
	          'Last 30 Days': [moment().subtract(29, 'days'), moment()],
	          'This Month'  : [moment().startOf('month'), moment().endOf('month')],
	          'Last Month'  : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
	        },
	        startDate: moment().subtract(29, 'days'),
	        endDate  : moment()
	      },
	      function (start, end) {
	        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'))
	      }
	    );

	    /**  INITIALIZING TIME PICKER  **/
	    $('#timepicker').datetimepicker({ format: 'LT' });

	    $("input[data-bootstrap-switch]").each(function(){
	      $(this).bootstrapSwitch('state', $(this).prop('checked'));
	    });

	}

	dashboard_blade = () => {

		/** TOP MAIN HEADER AND NAVIGATION ELEMENT LEFT MARGIN REMOVAL **/
	    $('#left_margin_state').css("margin-left", "-1px");
	    $('#footer_left_margin_state').css("margin-left", "-1px");

	    /** TOP MAIN HEADER AND NAVIGATION UN ORDERED LIST <ul></ul>, LIST ELEMENT <li></li> REMOVAL **/
	    $("#nav_bar_li_state").empty();

	    $('#dashboard_username').css("line-height", "50px");
		$('#dashboard_username').css("font-weight", "bold");
		$('#dashboard_username').css("color", "black");
		$('#dashboard_avatar').css("width", "35px");

	}

}