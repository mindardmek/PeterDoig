(function ($) {
    $(function () {
        // Prevent FSU from opening on mobile web view
        if (window.IsMobileApp) {
            var loadFrameDelay = 0; //0 = disabled
            $('.fsu_btn-toggle').on('click',function(){
            var data = {
                "type": "NAVIGATION",
                "payload": {
                    "access_token": null,
                    "refresh_token": null,
                    "pageTitle": document.title,
                    "navigateTo": 'login',
                    "expire_in": 86400
                }
            }
            console.info('calling native app support', data);
            try {
                window.webkit.messageHandlers.nativeProcess.postMessage(data);    
            } catch (error) {
                console.error('Failed to open native app support', error)
            }
            })
            
        } else {
        var loadFrameDelay = 20000; //10 sec
        }

        var rootPath = "//" + window.location.hostname + "/mychristies";
        
        var param = "";
        var tagParam = "";
        var hrefPath = "";
        var urlPath = "";
        var t;
        var HidePopuponMSLP = 1;
        var $overlayHeight = 0;
        var $viewportWidth = viewportSize.getWidth();
        var $viewportHeight = viewportSize.getHeight();
        var _clearTimeout = 0;

        hrefPath = window.location.href.toLowerCase();
        urlPath = window.location.pathname.toLowerCase();	
				
		if ((location.pathname.match(/features/ig) !== null) && ($viewportWidth < 768)) {//Mobify fix for Stories page
			$('head').append('<link rel="stylesheet" type="text/css" href="/css/FastSignup.css" />');
		}

        if ($('#iSignUp').length > 0) {
            $('#iSignUp').css('visibility', 'hidden');
        }

        $('body').on('dragstart drop', 'img', function(e){
			e.preventDefault();
			return false;
        });
        
        $('body').on('contextmenu', 'img', function(e){
			e.preventDefault();
			return false;
		});

		//EM - Webz-175 - 8/11/2020	
		
		var CurrentDate = new Date();
		var FSUCookieValue = CurrentDate.toISOString(); 
		var ShowFSU = false;
		
		//alert('FSU');
		if($.cookie("FastSignup") == "FastSignupCreated"){
		$.cookie("FastSignup", FSUCookieValue, {
					expires: 365,
					path: '/'
					});
		}
		
		if($.cookie("FastSignup") != null) {
		    var d = new Date($.cookie("FastSignup"));
			var cookieTime = getMinutesBetweenDates(d,CurrentDate);	
				//alert(cookieTime);
				if(cookieTime >= 96){ //Check if Cookie session is greater than equal to 4 days check is done in hours...set to hour 1 for testing...deployment value should be 96hr = 4days
					ShowFSU = true;
					//Update the cookie date time...
					$.cookie("FastSignup", FSUCookieValue, {
					expires: 365,
					path: '/'
					});
					//Update cookie date
				}
				//alert(cookieTime);
            }else{
		ShowFSU = true;
		}
		//EM - Webz-175 - 8/11/2020
		
        //If user is logged in check cookie value of optoutemail and reset popup values.
        var optoutemail = 'Y';
        var ClientGUID = "";

        // if ($.cookie("WebClient_Id") != null) {
           // // if ($.cookie("FastSignup") == null) {
                // var data = $.cookie("WebClient_Id").split('&');
                // $.each(data, function (i, val) {
                    // if (val.toLowerCase().indexOf('optoutemail') >= 0) {
                        // optoutemail = val.substring(12, 13);
                    // }
                    // if (val.toLowerCase().indexOf('clientguid') >= 0) {
                        // ClientGUID = val.substring(11, 47);
                    // }
                // });

                // if (optoutemail == 'Y') { //EM - Webz-175 - 8/11/2020
			 	 // ShowFSU = false; //EM - Webz-175 - 8/11/2020
                    // clearInterval(t);
                // }
            // //}
        // }
		
		if ($.cookie("AccessToken") != null) {  //WEBZ-4547
			ClientGUID = getWebClientIdUsingAccessToken();
			if (optoutemail == 'Y') { //EM - Webz-175 - 8/11/2020
			 ShowFSU = false; //EM - Webz-175 - 8/11/2020
				clearInterval(t);
			}
        }

		
		
        //If user has already signed up to receive emails, update msg
        if ($.cookie("SignedUp") == "True") {
            signedUpMsg();
			ShowFSU = false; //EM - Webz-175 - 8/11/2020
        }

        $(".fsu_btn-toggle").on("click", (function (event) {
            // if (window.IsMobileApp) {return}
            event.preventDefault();
            if (ClientGUID != "") {
                //User is logged in
                CreateProspectClientLoggedInUser($(this).attr("data-pageurl"), $(this).attr("data-id"), $(this).attr("data-typecode"), ClientGUID, 1);
                signedUpMsg();
			} else {
                if ($(this).attr("data-typecode") == "DEP" || $(this).attr("data-typecode") == "ART") {
                    tagParam = "&tag_tid=" + $(this).attr("data-tag-id") + "&tag_url=" + hrefPath + "&tag_language=" + $(this).attr("data-tag-language");
                }
                if ($(this).attr("data-id") == "" && hrefPath.indexOf('multidaysales') >= 0)
                    param = "?tid=" + $(this).attr("data-id") + "&stid=" + $(this).attr("data-typecode") + "&url=" + hrefPath + "&loggedIn=Y";
                else if ($(this).attr("data-id") == "" && hrefPath.indexOf('onlineonly') >= 0)
                    param = "?tid=" + $(this).attr("data-id") + "&stid=" + $(this).attr("data-typecode") + "&url=&loggedIn=Y";
                else if ($(this).attr("data-depname") != undefined)
                    param = "?tid=" + $(this).attr("data-id") + "&stid=" + $(this).attr("data-typecode") + "&url=&depname=" + $(this).attr("data-depname");
                else
                    param = "?tid=" + $(this).attr("data-id") + "&stid=" + $(this).attr("data-typecode") + "&url=";
                if (tagParam != '')
                    param = param + tagParam;

                clearInterval(t);
                ClearCookie();
                framesetup(1);
            }
        }));

        //If user is coming from marketing email link with 'christiesmarketing=y' then don't show fast sign uppopups
        if ((hrefPath.indexOf('cid=dm') > 0) || (hrefPath.indexOf('cid=em_eml') > 0)) {
		//EM - Webz-175 - 8/11/2020
		ShowFSU = false;
			//$.cookie("FastSignup", FSUCookieValue, {
			//	expires: 365,
			//	path: '/'
			//});
        }

        if (typeof (HideSignupPop) != 'undefined' && HideSignupPop !== null && HideSignupPop !== undefined) {
            HidePopuponMSLP = HideSignupPop;
        }

		
		//console.log(optoutemail);
        //Exclude Chinese versions and check how many times the screen has loaded for this user
        if (((urlPath.indexOf('zh') < 0) && (urlPath.indexOf('zh-cn') < 0)) &&
            urlPath.indexOf('login') <= 0 &&
            urlPath.indexOf('anonymous-live-viewing') <= 0 &&
            urlPath.indexOf('emailconfirmation') <= 0 &&
            urlPath.indexOf('technicaldifficulties') < 0 &&
            urlPath.indexOf('my_settings_retrieve_password') < 0 &&
            hrefPath.indexOf('artist') <= 0 &&
            urlPath.indexOf('multidaysales') <= 0 &&
            urlPath.indexOf('mychristies') <= 0 &&
            urlPath.indexOf('mobile') <= 0 &&
            urlPath.indexOf('mob-is-app') <= 0 &&
            urlPath.indexOf('/auctions/watch-live') <= 0 &&
            urlPath.indexOf('/newhome') <= 0 &&            
            HidePopuponMSLP != 0 &&
		    (ShowFSU == true)) { //EM - Webz-175 - 8/11/2020
           // ($.cookie("FastSignup") != "FastSignupCreated" && optoutemail == 'Y')) { //EM - Webz-175
            //run the interval which will fire the function that can open the signup form
            framesetup(loadFrameDelay);
		} else {
			//console.log('not opening fsu');
        }
		
		function parseJwt(token) {
			var base64Url = token.split('.')[1];
			var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
			var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
			}).join(''));

			return JSON.parse(jsonPayload);
		};

		function getWebClientIdUsingAccessToken() {
			var clientGUID = "";
			if (document.cookie != undefined && document.cookie != '') {
				var cookieList = document.cookie.split(';');
				if (cookieList.length > 0) {
					var accessTokenCookie = cookieList.find(element => element.toLowerCase().includes('access_token'));
					if (accessTokenCookie != undefined && accessTokenCookie.length > 0) {
						var cookieAT = accessTokenCookie.split('=');
						cookieAT = cookieAT.reverse();
						var token = cookieAT[0];
						var jwtObj = parseJwt(token);
						var keysList = Object.keys(jwtObj);
						var accessKey = keysList.find(item => item.toLowerCase().includes('client-guid'));
						if (accessKey != undefined && accessKey != '') {
							clientGUID = jwtObj[accessKey];
						}                    
					}
				}
			}
			
			return clientGUID;
		}

        function framesetup(loadFrameDelay) {
            if (loadFrameDelay === 0) {return} //0 = disable
            //Perform a check to see if #dialog exists and if it does check to see if it's open.
            //If it does not exists, or if it does exist and is not open than run the openFrame() function
            t = setInterval(function () {
                //Does #dialog exist?
				//console.log('testing for dialog');
                if ($('#dialog').length > 0) {
					//console.log('dialog exists');
                    //It does, but is it open?
                    if (($('#dialog').position().left <= 0) || ($('#dialog').height() < 1)) {
						//console.log('dialog is not open');
                        //It's not, so run this function:
                        openFrame();
                    } else {
						//console.log('dialog is open');
                    }
                } else {
					//console.log("dialog doesn't exists");
                    //#dialog doesn't exist. Is the element with backgroundPopup hidden?
                    if ($('.backgroundPopup:hidden')) {
						//console.log('backgroundpopup is hidden');
                        //It is, so run this function:
                        openFrame();
                    }
                }
            }, loadFrameDelay);
        }

        function adjustPopup() {
            if (($('.backgroundPopup:hidden')) || (($('#dialog').position().left <= 0) || ($('#dialog').height() < 1))) {
                clearTimeout(_clearTimeout);
                _clearTimeout = setTimeout(function () {
                    $('#iSignUp, #signupFrame').show();
                    $('.fsu--christies_loader').hide();
					//console.log('fsu-loader -- hidden');
                }, 700);
            }
        }

        function openFrame() {
            clearInterval(t);
            var isOtherModalOpen = $('body').hasClass('modal-open') || $('body').hasClass('modalOpen') || $('body').hasClass('fsuActive')
            if (!isOtherModalOpen) {
                SetOmniture($(this).attr("data-typecode"));
            getSignUpPage();
			//EM - Webz-175 - 8/11/2020 - Create cookie if it null
			if($.cookie("FastSignup") == null) {
			$.cookie("FastSignup", FSUCookieValue, {
				expires: 365,
				path: '/'
			});
			}
			//EM - Webz-175 - 8/11/2020

            $('html, body').addClass('fsuActive');
            $('#iSignUp, #signupFrame').addClass('fsu-active');

            if (($('.backgroundPopup:hidden')) || (($('#dialog').position().left <= 0) || ($('#dialog').height() < 1))) {
                adjustPopup();
            }
            }  
        }

        function getSignUpPage() {
            var signupFramePath = rootPath + "/SignupAjax.aspx" + param;
            var $markup = '<div id="iSignUp" class="fsu--christies"></div>';
            $markup += '<div class="fsu--christies_overlay">';
            $markup += '<span class="fsu--christies_loader"><span class="fsu--christies--loader_inner"></span></span>';
            $markup += '</div>';

            $overlayHeight = ($('#container').length == 0 ? ($('#mainform').outerHeight() + $('.chr-header-footer').find('.container-fluid').outerHeight()) : $('#container').outerHeight() + $('.chr-header-footer').find('.container-fluid').outerHeight());

            if ($('#iSignUp').length > 0) {
                $('#iSignUp').remove();
                $('body').append($markup);
			} else {
                $('body').append($markup);
            }

            $('.fsu--christies_overlay').css({
                'height': '100vh'
            });

            $('.fsu--christies_loader').show();
            $("#iSignUp").hide().load(signupFramePath);
        }

        function CloseFrame() {
			//console.log('lfsu - closing step 1');

            if ($.cookie("SignedUp") == "True") {
                signedUpMsg();
            }

            clearInterval(t);
            return false;
        }

        function ClearCookie() {
            $.removeCookie("FastSignup", {
                path: '/'
            });
        }

        function signedUpMsg() {
            //User has successfully signed up
			//WEBZ-4664
			var thankYouMsg;
    
		if (jQuery.cookie("CurrentLanguage") != null)
		{
			if (jQuery.cookie("CurrentLanguage").toLowerCase() == "en")
			{
				thankYouMsg = "Thank you for signing up.";
			}
			else if (jQuery.cookie("CurrentLanguage").toLowerCase() == "zh")
			{
				thankYouMsg = "感谢您登记账户";
			}
			else if (jQuery.cookie("CurrentLanguage").toLowerCase() == "zh-cn")
			{
				thankYouMsg = "感谢您登记账户";
			}
			else
			{
				thankYouMsg = "Thank you for signing up.";
			}
		}
            $(".fsu_btn-toggle").removeAttr("style");
            $(".fsu_btn-toggle").html("<i><b><font color='red'>"+thankYouMsg+"</font></b></i>");
            $(".fsu_btn-toggle").addClass("fsu_header-5_primary");
            $(".fsu_btn-toggle").removeProp("style");
            $(".fsu_btn-toggle").removeClass("fsu_btn");
            $(".fsu_btn-toggle").css("pointer-events", "none");
            $(".fsu_btn-toggle").removeClass("fsu_btn-toggle");
            //Comment out as part of WEBZ-175 - EM 8/24/20 
		   //$.removeCookie("SignedUp", {
           //     path: '/'
           // });
        }

        function CreateProspectClientLoggedInUser(PageURL, BasedOnID, TypeCode, ClientID, LanguageID) {
            var param = "?param='" + PageURL + ',' + BasedOnID + ',' + TypeCode + ',' + ClientID + ',' + LanguageID;
            if ($("#signupFrame").attr("src") == '') {
                $("#signupFrame").attr("src", rootPath + "/SignupAjax.aspx" + param + "&LoggedInUser=Y");
            }
        }

        function SetOmniture(type) {

        }
		
		//EM - Webz-175 - 8/11/2020
		function getMinutesBetweenDates(startDate, endDate) { 
			//var diff = endDate.getTime() - startDate.getTime();
			//return (diff / 60000);
			
			var diff = endDate.valueOf() - startDate.valueOf();
			var diffInHours = diff/1000/60/60; // 
			return diffInHours;
		}
	   //EM - Webz-175 - 8/11/2020
    });
})(jQuery);