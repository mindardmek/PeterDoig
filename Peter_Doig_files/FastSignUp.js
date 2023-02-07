(function($) {
    $(function() {
        var rootPath = "//" + window.location.hostname + "/mychristies";
        var $viewportWidth = viewportSize.getWidth();
        var $viewportHeight = viewportSize.getHeight();
        var _clearTimeout = 0;
        var fsuHeight;
        var fsuscreens = '#dvSignupScreen, #dvThanksScreen, #dvUnSubscribe, #dvLoginScreen, #dvSetMarketingPreference';
        //var Emailfilter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
        var Emailfilter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/;

        var $window = window.parent;
		var isSubmitted = false;						

        //$('.closeiframe').on('click', function() {
        //	$.cookie("CloseScreen", "True", { expires: 365, path: '/' });
        //});

        $(window).keydown(function(event) {
            if (event.keyCode == 13) {
				if (isSubmitted == false) {										   
					$('#btnProspectClient').click();
                    event.preventDefault();
                }
            }
        });

        var optoutemail = 'Y';
		//if ($.cookie("WebClient_Id") != null) {
        if ($.cookie("AccessToken") != null) { //WEBZ-4547
            if ($.cookie("FastSignup") == null) {
                // var data = $.cookie("WebClient_Id").split('&');
                // $.each(data, function(i, val) {
                    // if (val.toLowerCase().indexOf('optoutemail') >= 0) {
                        // optoutemail = val.substring(12, 13);
                    // }
                // });

                if (optoutemail == 'Y') {
                    var tcheckMkt = setInterval(function() {
                        //if ($.cookie("signupOpen") == 1)
                        //{
                        //	$.cookie("MarketingPrefShown", "Y", { expires: 365, path: '/' });
                        toggleActiveScreen('#dvSetMarketingPreference');
                        //Pass the ID of the element that needs to be measured when opened
                        setFrameHeightCookieValue('#dvSetMarketingPreference');
                        adjustPopup();
                        clearInterval(tcheckMkt);
                        //}
                        //else{
                        //	clearInterval(tcheckMkt);
                        //}
                    }, 200);
                }
            }
        }
        else {
            if ($.cookie("FastSignup") != "FastSignupCreated") {
                setTimeout(function() {

                    var tcheck = setInterval(function() {
					//we check that functional has been allowed. 3 = functional per OneTrust configuration
						if (typeof (_satellite) != 'undefined') {
							if (_satellite.getVar('ACR OptanonActiveGroups').indexOf('3') !== -1) {
								$.cookie("FastSignup", "FastSignupCreated", { expires: 365, path: '/' });
							}
						}                        
                        toggleActiveScreen('#dvSignupScreen');
                        $('#alreadyRegistered, #loggingIn').removeClass('fsu-active');
                        $('h4.signingUp').addClass('fsu-active');
                        adjustPopup();
                        $('.fastSignup input, .fastSignup select, .fastSignup .form-select.select_title').on('touchend click', function() {
                            $(this).removeClass('MandatoryFields')
                        }
						);
                        //Pass the ID of the element that needs to be measured when opened
                        //	setFrameHeightCookieValue('#dvSignupScreen');
                        clearInterval(tcheck);
                        //}
                        //else{
                        //	clearInterval(tcheck);
                        //}
                    }, 200);
                }, 1500);
            }
        }

        $('#close_signup, #btnCancel, #btnClose').click(function(e) {
            e.preventDefault();
            CloseSignUpScreen();
        });

		$('#aLoginScreen').click(function (event) {
            event.preventDefault();
            $('#iSignUp').hide();
            $('.fsu--christies_overlay').hide();
            /*$('#alreadyRegistered, #loggingIn').toggle();
            setFrameHeightCookieValue('#dvSignupScreen');
            //$.cookie("loggingIn", "True", { path: '/' });
            $('#alreadyRegistered, h4.signingUp').removeClass('fsu-active');
            $('#alreadyRegistered, h4.signingUp').css('display', 'none');
            $('#loggingIn').addClass('fsu-active');
            toggleActiveScreen('#dvLoginScreen');
            $('#iSignUp').addClass('iSignUp_login');
            adjustPopup();*/
            var event = new CustomEvent('chr.openLoginModal');
            window.dispatchEvent(event);
			$(".fsuActive").css("overflow", "auto");
            CloseSignUpScreen()
		}); 
	

        /*$('#aForgotPassword').click(function(event) {
        CloseSignUpScreen();
			
			RedirectURL = rootPath + "/my_settings_retrieve_password.aspx";
        //alert(RedirectURL);
        window.location.href = RedirectURL;
        //$.cookie("CloseScreen", "True", { path: '/' });
        //$.cookie("CloseURL", "ForgotPassword", { path: '/' });
        });*/


        $('[id$=btnProspectClient]').click(function(event) {
			if (isSubmitted == false) {
                isSubmitted = true;						   					   
            console.log('Clicked');
			$('[id$=btnProspectClient]').attr('disabled', true);								
            var strError = "";
            IsMandatoryMissing = false;
            var strLoginError = ValidateData();

            $('#lblRegistrationError').html('');
            }
        });

        $('#btnLogin').click(function(event) {
            IsMandatoryMissing = false;
            ValidateLoginData(event);
        });

        $('#btnSetProspectSettings').click(function(event) {
            SetMarketingPreferense();
        });

        function getURL() {
            return window.location;
        }

        function ValidateLoginData(event) {

            $('#username, #password').removeClass('MandatoryFields');

            if ($.trim($('#username').val()) == "") {
                $('#username').addClass("MandatoryFields");
                IsMandatoryMissing = true;
            }

            if ($.trim($('#password').val()) == "") {
                $('#password').addClass("MandatoryFields");
                IsMandatoryMissing = true;
            }

            if (!Emailfilter.test($.trim($('#username').val()))) {
                $('#username').addClass("MandatoryFields");
                IsMandatoryMissing = true;
            }

            if (IsMandatoryMissing) {
                event.preventDefault();
            }
            //WEBZ-375-start
            else {
                CallWebService_ValidateCredentials();
            }
            //WEBZ-375-end
            //$.cookie("SignedUp", "True", { expires: 365, path: '/' });
        }

        function ValidateData() {
            $('#select_title, div.form-select:before, #txtFirstName, #txtLastName, #txtEMail, .select_title').removeClass('MandatoryFields');


            var Title = $('#select_title').val();

            if (Title == "0") {
                $('#select_title, .select_title').addClass("MandatoryFields");
                IsMandatoryMissing = true;
            }

            if ($.trim($('#txtFirstName').val()) == "") {
                $('#txtFirstName').addClass("MandatoryFields");
                IsMandatoryMissing = true;
            }

            if ($.trim($('#txtLastName').val()) == "") {
                $('#txtLastName').addClass("MandatoryFields");
                IsMandatoryMissing = true;
            }

            if ($.trim($('#txtEMail').val()) == "") {
                $('#txtEMail').addClass("MandatoryFields");
                IsMandatoryMissing = true;
            }
            else {

                if (!Emailfilter.test($.trim($('#txtEMail').val()))) {
                    $('#txtEMail').addClass("MandatoryFields");
                    IsMandatoryMissing = true;
                }
            }


            if (!IsMandatoryMissing) {
                CreateProspectClient();
            }
            else {
                isSubmitted = false;
                $('[id$=btnProspectClient]').attr('disabled', false);

            }	  		 
        }



        function CreateProspectClient() {
            var strdata = '{"iTitle":"' + $.trim($('#select_title').val()) + '","Title":"' + $.trim($('#select_title option:selected').text()) + '","FirstName":"' + $.trim($('#txtFirstName').val()) + '", "LastName": "' + $.trim($('#txtLastName').val()) + '", "eMailAddress": "' + $.trim($('#txtEMail').val()) + '", "Country": "' + $('#hdnCountry').val() + '", "IPAddress": "' + $('#hdnIPAddress').val() + '", "PageURL": "' + $('[id$=btnProspectClient]').attr("data-PageURL") + '", "ID": "' + $('[id$=btnProspectClient]').attr("data-id") + '", "Type": "' + $('[id$=btnProspectClient]').attr("data-TypeCode") + '", "LanguageID": "1"}';
            cws_Type = "POST";
            cws_Url = '../MyChristies/SignupAJAX.aspx' + "/CreateProspectUser";
            cws_Data = strdata;
            cws_ContentType = "application/json; charset=utf-8";
            cws_DataType = "json";
            cws_ProcessData = true;
            cws_SyncCall = true;
            cws_ServiceMethodName = 'CREATE_PROSPECT_CLIENT';
            CallWebService();

        }

        /*function SetMarketingPreferense() {
        var strdata = '{}';
        cws_Type = "POST";
        cws_Url = '../MyChristies/SignupAJAX.aspx' + "/SetMarketingPreferense";
        cws_Data = strdata;
        cws_ContentType = "application/json; charset=utf-8";
        cws_DataType = "json";
        cws_ProcessData = true;
        cws_SyncCall = true;
        cws_ServiceMethodName = 'MARKETING_PREFERENCE_SET';
        CallWebService();
        }
        */

        function SetMarketingPreferense() {
            var ClientGUID = '';
            // if ($.cookie("WebClient_Id") != null) {
                // var data = $.cookie("WebClient_Id").split('&');
                // //$.each(data, function(i, val) {
                // //console.log('val' + val.toLowerCase().indexOf('GUID'));
                // //if (val.toLowerCase().indexOf('ClientGUID') >= 0) {
                // ClientGUID = data[0].substring(11, 47);
                // //}
                // //});
            // }
			if ($.cookie("AccessToken") != null) {   //WEBZ-4547             
                ClientGUID = getWebClientIdUsingAccessToken();
            }
            console.log('ClientGUID' + ClientGUID);
            var strdata = '{"PageURL": "","ID": "","TypeCode": "", "ClientID": "' + ClientGUID + '", "LanguageID": "1"}';
            cws_Type = "POST";
            cws_Url = '../MyChristies/SignupAJAX.aspx' + "/CreateMarketingPrefLoggedInUser";
            cws_Data = strdata;
            cws_ContentType = "application/json; charset=utf-8";
            cws_DataType = "json";
            cws_ProcessData = true;
            cws_SyncCall = true;
            cws_ServiceMethodName = 'MARKETING_PREFERENCE_SET';
            CallWebService();
        }

        function RemoveHTML(html) {
            return $("<div />").html(html).text();
        }
        function _addLoader() {

            jQuery('body').prepend('<div class="loader" style=" position: fixed;top: 0;left: 0;width: 100vw;height: 100vh;background: rgba(0, 0, 0, 0.15);z-index: 999999;"><div class="loader--inner" style=" height: 60px;width: 60px;top: 0;right: 0;bottom: 0;left: 0;position: fixed;margin: auto;border: 6px solid #fff;border-right-color: #B30900;border-top-color: #B30900;border-radius: 100%;animation: spin 800ms infinite linear;z-index: 1200;"></div></div>');

        }


        function _removeLoader() {
            jQuery('.loader-image').remove();
            jQuery('.loader').remove();
        }



        function removeDefaultBlankRow(result) {
            // debugger;
            // alert(result);
            var temp, xmlDoc, root, tbl;
            var i = 0;
            temp = result;
            //alert(jQuery(temp).children('NewDataSet').length);
            if (jQuery(temp).children('NewDataSet').length > 0) {
                tbl = jQuery(temp).children('NewDataSet').children();
                if (jQuery(temp).children('NewDataSet').find('Table').length == 1) {
                    tbl.children().each(function() {

                        if (jQuery.trim(jQuery(this).text()) == '') {
                            i++;
                        }
                    });
                    if (i == tbl.children().length) {
                        jQuery(temp).children('NewDataSet').children('table').remove();
                    }
                    //temp = temp.toLowerCase();
                    //alert(temp);
                }
            }

            //console.log(jQuery(temp).children());
            return temp;


        }

        function CallWebService() {
            _addLoader()
            $.ajax({

                type: cws_Type, //GET or POST or PUT or DELETE verb
                url: cws_Url, // Location of the service
                data: RemoveHTML(cws_Data), //Data sent to server
                contentType: cws_ContentType, // content type sent to server
                dataType: cws_DataType, //Expected data format from server
                processdata: cws_ProcessData, //True or False
                success: function(msg) {//On Successfull service call
                    _removeLoader()
                    ServiceSucceeded(msg);
                },
                error: ServiceFailed // When Service call fails
            });
        }


        //Method called ON Service Failure
        function ServiceFailed(result) {
            CloseSignUpScreen();
            //$.cookie("CloseScreen", "True", { path: '/' });
            _removeLoader()
            $('.fsu--christies_overlay').remove();
        }

        //Method called ON Service Success
        function ServiceSucceeded(result) {
            if (cws_DataType.toUpperCase() == "JSON") {
                if (cws_ServiceMethodName.toUpperCase() == 'CREATE_PROSPECT_CLIENT') {
                    if ($('[id$=btnProspectClient]').attr("data-TypeCode") != '' && ($('[id$=btnProspectClient]').attr("data-TypeCode") == "DEP" || $('[id$=btnProspectClient]').attr("data-TypeCode") == "ART")) {
                        FloodLightTag($('[id$=btnProspectClient]').attr("data-tag-language"), $('[id$=btnProspectClient]').attr("data-tag_url"), $('[id$=btnProspectClient]').attr("data-tag-id"), $('[id$=btnProspectClient]').attr("data-tag-name"));
                    }
                    if (result != null) {
                        if (typeof result.d != 'undefined') {
                            result = result.d;
                        }
                    }
                    //result=result;
                    var resultArr;
                    if (result.indexOf("|") >= 0) {
                        resultArr = result.split('|');
                        result = resultArr[0];
                        siebleID = resultArr[1];
                        //we check that targeting has been allowed. 4 = targeting per OneTrust configuration
						if (typeof (_satellite) != 'undefined') {
							if (_satellite.getVar('ACR OptanonActiveGroups').indexOf('4') !== -1) {
								QucantCastBlock(siebleID);
							}
						}
                        
                    }
                    switch (result.toUpperCase()) {
                        case "NEW USER":
                        case "FAST SIGN UP USER":
                            FSU_AnalyticsDataLayer();
                            toggleActiveScreen('#dvThanksScreen');
                            adjustPopup();
                            SetOmnitureValues();
                            //$.cookie("SignedUp", "True", { expires: 365, path: '/' });
                            break;
                        case "EXISTING USER":
                            toggleActiveScreen('#dvLoginScreen');
                            $('#alreadyRegistered').addClass('fsu-active');
                            adjustPopup();
                            $('#loggingIn').removeClass('fsu-active');
                            SetOmnitureValues();
                            //$.cookie("SignedUp", "True", { expires: 365, path: '/' });
                            break;
                        case "UNSUBSCRIBE":
                            toggleActiveScreen('#dvUnSubscribe');
                            adjustPopup();
                            break;
                        case "USER CREATION FAILED":
                            toggleActiveScreen('#dvShowError');
                            //CloseSignUpScreen();
                            break;
                    }

                }
                if (cws_ServiceMethodName.toUpperCase() == 'MARKETING_PREFERENCE_SET') {
                    CloseSignUpScreen();
                }
            }
        }

        function SetOmnitureValues() {
            var omnitureValue = '';
            var type = $('[id$=btnProspectClient]').attr("data-TypeCode");
            var s = ((window.location.href.indexOf("www.christies.com") < 0) ? s_gi("christiesdev") : s_gi('christiesprod'));

            if (type == "DEP") { omnitureValue = 'Department Page'; }

            if (type == "ART") { omnitureValue = 'Feature'; }

            if (type == "OOS") { omnitureValue = 'eCom Homepage'; }

            if (type == "MLP") { omnitureValue = 'eCom Sale Specific'; }

            if (type == "MSLP") { omnitureValue = 'eCom Sale Specific'; }
			
			if (window.location.href.indexOf("art-and-tech") > -1) { omnitureValue = '' }

            s.linkTrackVars = 'eVar55';

            s.eVar55 = 'Email Only Sign-Up- ' + omnitureValue;
            s.tl(this, 'o', omnitureValue);
        }

        function FSU_AnalyticsDataLayer() {
            var AnalyticsDataLayer = {
                'events': {
                    'fast_sign_up': true
                }
            };
            if (typeof _trackData != 'undefined') {	
                _trackData(AnalyticsDataLayer);	
            }
        }

        function CloseFrame() {
            $('html, body').removeClass('fsuActive');

            if ($.cookie("SignedUp") == "True") {
                signedUpMsg();
            }
            return false;
        }

        function signedUpMsg() {
            //User has successfully signed up
            console.log('fsu - closing step 2');
            $(".fsu_btn-toggle").removeAttr("style");
           // $(".fsu_btn-toggle").html("<i><b><font color='red'>Thank you for signing up.</font></b></i>");
		    $(".fsu_btn-toggle").html("<i><b><font color='red'>" + ThankYouInfoMsg + "</font></b></i>");
            $(".fsu_btn-toggle").addClass("fsu_header-5_primary");
            $(".fsu_btn-toggle").removeProp("style");
            $(".fsu_btn-toggle").removeClass("fsu_btn");
            $(".fsu_btn-toggle").css("pointer-events", "none");
            $(".fsu_btn-toggle").removeClass("fsu_btn-toggle");
            $.removeCookie("SignedUp", {
                path: '/'
            });
        }

        function CloseSignUpScreen() {
            console.log('fsu - closing step 3');
            CloseFrame();

            $('.fsu--christies').remove();
            $('.fsu--christies_overlay').remove();

            if ($viewportWidth < 768) {
                $('html, body').css({
                    'overflow': 'auto'
                });
            }
        }

        function toggleActiveScreen(elem) {
            $(fsuscreens).parent().hide().removeClass('fsu-active');
            //Pass the ID of the element that needs to be measured when opened
            if (elem !== null) {
                $(elem).parent().show().addClass('fsu-active');
                setFrameHeightCookieValue(elem);
            }
        }

        function setFrameHeightCookieValue(elem) {
            fsuHeight = $(elem).height();
            //$.cookie("signupFrameHeight", fsuHeight , { path: '/' });
        }

        function QucantCastBlock(qcastText) {
            var qstring = "<!-- Start Quantcast Tag -->" +
				"<script type=\"text/javascript\">" +
				"var _qevents = _qevents || [];" +
				"(function() { " +
				"var elem = document.createElement('script');" +
				"elem.src = (document.location.protocol == \"https:\" ? \"https://secure\" : \"http://edge\") + \".quantserve.com/quant.js\";" +
				"elem.async = true;" +
				"elem.type = \"text/javascript\";" +
				"var scpt = document.getElementsByTagName('script')[0];" +
				"scpt.parentNode.insertBefore(elem, scpt);" +
				"})();" +

				" _qevents.push(" +
				"{qacct:\"p-aTd5auPf-2_8K\",labels:\"_fp.event.Fast Signup Email Confirmation\",orderid:\"" + qcastText + "\", event:\"refresh\"}" +
				" );" +
				" </script>" +
				" <noscript>" +
				" <img src=\"//pixel.quantserve.com/pixel/p-aTd5auPf-2_8K.gif?labels=_fp.event.Fast+Signup+Email+Confirmation&orderid=" + qcastText + "\" style=\"display: none;\" border=\"0\" height=\"1\" width=\"1\" alt=\"Quantcast\"/>" +
				" </noscript>" +
				" <!-- End Quantcast tag -->";

            var _qdiv = $('#qdiv');
            _qdiv.html(qstring);
            _qdiv.show()

        }

        function adjustPopup() {
            clearTimeout(_clearTimeout);
            _clearTimeout = setTimeout(function() {
                $('#iSignUp, #signupFrame').show();
                $('.fsu--christies_loader').hide();
            }, 1000);
        }

        //WEBZ-375-start
        function appendParameter(strUrl, key, val) {
            var strTemp = '';

            strTemp = strUrl;
            if (jQuery.trim(strUrl) != '' && jQuery.trim(key) != '') {
                strTemp = strTemp + (strTemp.charAt(strTemp.length - 1) == '?' ? '' : '&') + key + "=" + val;
            }
            return strTemp;
        }


        function getParameterByName(StrURL, name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
				results = regex.exec(StrURL.toLocaleLowerCase());
            return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }

        function CallWebService_ValidateCredentials() {
            var vbIsCatSubUser = false;

            if (getParameterByName(_pro_RawURL, "action").toLowerCase() == vCatsubsRegistrationQueryStringParameter.toLowerCase()) {

                vbIsCatSubUser = true;
            }

            var strUrl = mychristies_APIurl + 'ValidateCredentials?';
            strUrl = appendParameter(strUrl, "APIKey", mychristies_APIkey);
            strUrl = appendParameter(strUrl, "sUserName", jQuery('#username').val());
            strUrl = appendParameter(strUrl, "sEncryptedPwd", encodeURIComponent(getEncryptedPwd(jQuery('#password').val())));
            strUrl = appendParameter(strUrl, "sIPAddress", _pro_IPAddress);
            strUrl = appendParameter(strUrl, "bIsCatSubUser", vbIsCatSubUser);
            strUrl = appendParameter(strUrl, "sBrowserAgent", navigator.userAgent);
            strUrl = appendParameter(strUrl, "sRawURL", encodeURIComponent(_pro_RawURL));
            strUrl = appendParameter(strUrl, "encryptionKey", vEkey);           //CCPS-77

            cws_Type = "GET";
            cws_Url = strUrl;
            cws_Data = '';
            cws_DataType = "xml";
            cws_ProcessData = true;
            cws_SyncCall = true;
            cws_ServiceMethodName = 'CALLWEBSERVICE_VALIDATECREDENTIALS';
            CallWebServiceFastSignUp();
        }

        function getEncryptedPwd(sPwd) {
            vNewEkey = CryptoJS.enc.Utf8.parse(vEkey);
            var _encryptedpassword = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(sPwd), vNewEkey,
        {
            keySize: 128 / 8,
            iv: vNewEkey,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
            return _encryptedpassword;
        }

        function LoadLoginAJAX_ValidateCredentials(result) {
            var xml;
            _removeLoader();

            if (typeof (result.d) == 'undefined')
                xml = jQuery(result);
            else
                xml = jQuery(result.d);

            var sXMLErrorData = jQuery(xml).find("ErrorTable");
            jQuery('.error-msg.error-message-alert').removeClass('exceed-error-message');
            // This is where the error handling begins if a users account credientials are invalid or an account is locked
            if (sXMLErrorData.length > 0) {
                    //            RedirectFromLoginAjaxPage(vsLoginPageLink + "&err=" + sXMLErrorData.children("ErrorCode").text());
                    jQuery('.error-msg').remove();
                    jQuery('.error-msg.error-message-alert').remove();

                    jQuery('#username').addClass('border-red');
                    jQuery('#password').addClass('border-red');
                    jQuery('<span class="error-msg error-message-alert">' + sXMLErrorData.children("Error").text() + '</span>').insertAfter("#aForgotPassword");
                   if (sXMLErrorData.children("AccountLocked").text() == 'True') {
                       $('#btnLogin').addClass('disabled');
                   }
                
                return;
            }

            else {
                var sXMLData = jQuery(xml).find("ValidatedDetails");
                if (sXMLData.length > 0) {
                    CreateLoginCookies(xml);
                    SaveMarketingPreferense();
                    location.reload();

                }
            }
        }

        function CreateLoginCookies(resultdata) {
            var sCookieValue = '';

            var sXMLValidateDetailData = jQuery(resultdata).find("ValidatedDetails");
            var sXMLClientDetailData = jQuery(resultdata).find("ClientDetail");


            if (sXMLValidateDetailData.length > 0) {

                sCookieValue = 'ClientGUID=' + sXMLValidateDetailData.children("UserID").text() + '&OptOutEmail=Y';
                if (sXMLClientDetailData.length > 0) {
                    var strLoginType = '';
                    if (sXMLClientDetailData.children("FullyRegistered").text().toUpperCase() == 'Y') {
                        strLoginType = "full";

                    }
                    else {
                        strLoginType = "lite";
                    }
                    sCookieValue += "&type=" + strLoginType;
                }
				//WEBZ-4547
                //setCookie("WebClient_Id", sCookieValue, 1, true); 
                setCookie("Loggedin", "yes", 1, true);

                sCookieValue = 'ClientGUID=' + sXMLValidateDetailData.children("UserID").text();
                if (sXMLClientDetailData.length > 0) {
                    sCookieValue += "&CountryID=" + ((parseInt(sXMLClientDetailData.children("iCountryID").text()) <= 0) ? "1" : sXMLClientDetailData.children("iCountryID").text());
                    sCookieValue += "&ClientName=" + sXMLClientDetailData.children("sTitle").text() + ' ' + sXMLClientDetailData.children("sFirstName").text() + ' ' + sXMLClientDetailData.children("sLastName").text();

                    if (EnableOneTrust.toUpperCase() == 'N')
                        sCookieValue += "&Email=";
                    else
                        sCookieValue += "&Email=" + sXMLClientDetailData.children("sEmailAddress").text();

                }
                setCookie("WebClient_Id2", sCookieValue, 1, false);
                sCookieValue = sXMLValidateDetailData.children("ClientStatus").text();
                setCookie("cba", sCookieValue, 1, true);
                blnSecurityQuestionUpgradeRequired = ((sXMLValidateDetailData.children("SecurityQuestionUpgradeRequired").text().toUpperCase() == "Y") ? true : false);

            }
        }

        function setCookie(cname, cvalue, exdays, IsSessionCookie) {
            //we check that functional cookies have been allowed. 3 = functional per OneTrust configuration
			if (typeof (_satellite) != 'undefined') {
				if (_satellite.getVar('ACR OptanonActiveGroups').indexOf('3') !== -1) {
					var cookieDomain = '';
					var d = new Date();
					d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
					var expires = "expires=" + d.toUTCString();
					if (IsSessionCookie) {
						expires = '';
					}
					if (_pro_Domain.length > 0) {
						cookieDomain = ";domain=" + _pro_Domain + ";path=/";
					}
					else {
						cookieDomain = ";path=/";
					}
					document.cookie = cname + "=" + cvalue + "; " + expires + cookieDomain;
				}
			}
        }

        function getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1);
                if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
            }
            return "";
        }

        function getCookieEmail(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1);
                if (c.indexOf(name) == 0) return c.substring((name.length * 2), c.length);
            }

        }

        var cws_Type;
        var cws_Url;
        var cws_Data;
        var cws_ContentType;
        var cws_DataType;
        var cws_ProcessData;
        var cws_SyncCall;
        var cws_ServiceMethodName;

        function CallWebServiceFastSignUp() {
            _addLoader()
            $.ajax({
                type: cws_Type, //GET or POST or PUT or DELETE verb
                url: cws_Url, // Location of the service
                data: RemoveHTML(cws_Data), //Data sent to server        
                contentType: cws_ContentType, // content type sent to server
                dataType: cws_DataType, //Expected data format from server
                processdata: cws_ProcessData, //True or False
                success: function(msg) {//On Successfull service call
                    ServiceSucceededFastSignUp(msg);
                },
                error: ServiceFailed
            });

        }

        function ServiceSucceededFastSignUp(result) {
            if (cws_DataType == null || cws_DataType == '' || cws_DataType.toUpperCase() == "XML") {
                result = removeDefaultBlankRow(result);
                if (cws_ServiceMethodName.toUpperCase() == 'CALLWEBSERVICE_VALIDATECREDENTIALS') {
                    LoadLoginAJAX_ValidateCredentials(result);
                }
            }
        }

        function SaveMarketingPreferense() {
            var ClientGUID = '';
            // if ($.cookie("WebClient_Id") != null) {
                // var data = $.cookie("WebClient_Id").split('&');
                // ClientGUID = data[0].substring(11, 47);
            // }
			
			//WEBZ-4547
            if ($.cookie("AccessToken") != null) {                
                ClientGUID = getWebClientIdUsingAccessToken()
            }
            console.log('ClientGUID' + ClientGUID);
            cws_Type = "POST";
            cws_Url = '../MyChristies/SignupAJAX.aspx' + "/SetMarketingPreferense";
            cws_Data = '';
            cws_ContentType = "application/json; charset=utf-8";
            cws_DataType = "json";
            cws_ProcessData = true;
            cws_SyncCall = true;
            cws_ServiceMethodName = 'MARKETING_PREFERENCE_SET';
            CallWebService();
        }
        //WEBZ-375-end
    });
})(jQuery);
