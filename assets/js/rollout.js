//////////////////////////////////////////////////////////////////////////////////////////
// REPLACEMENT OF getPageHeader IN GLOBAL.JS
var getPageHeader = function (isDLP, UserFirstName, AccountManageFirstName, AccManagerPhone) {
    genStandardHeader(gbStdHeaderWriteContent);
    initStandardHeaderFlagHover();
    return "";
}
jQuery(document).ready(function () {
    //////////////////////////////////////////////////////////////////////////////////////////
    // LOG METHOD FOR QUICK TESTING, example: logit('display anything here');
    $('body').append('<div id=console></div>'); var console = $('#console'), logit = function (x) { console.css({ 'background': '#000', 'position': 'fixed', 'top': 0, 'right': 0, 'color': '#fff', 'padding': 5, 'font-family': 'arial', 'font-size': '9px', 'z-index': 9999 }); $('#console').append(x + '<br>'); };
    //////////////////////////////////////////////////////////////////////////////////////////
    // GLOBAL VARS
    var rolloutMenuState = 0,
    rolloutMenuBoundX1,
    rolloutMenuBoundX2,
    rolloutMenuBoundY1,
    rolloutMenuBoundY2,
    featureNavOriginalWidth = $('#feature-nav').width(),
    rolloutTimer
    ;
    var getInitialBoundCoordinates = setTimeout(function () {
        if ($('#feature-inner').offset() != null)
            rolloutMenuBoundX1 = $('#feature-inner').offset().left + 5;
    }, 50);

    //Cookied Variables
    var lzTimestring = Get_Cookie("TIMESTRING");     //Timestring - User is logged in
    var lzPlanType = Get_Cookie("LZ_HP_LEGALPLANNAME");     //Plan type - User has an AS Business Plan "BAP/LAP/BOTH/NONE"


    //////////////////////////////////////////////////////////////////////////////////////////
    // FUNCTIONS

    var openRolloutMenu = function (that) {
        $('#productSearch').blur();
        $(".gssb_c").fadeOut(700);
        var rolloutName = that.attr('id'),
        rolloutName = rolloutName.substring(4, rolloutName.length);
        $('.rollout-product').each(function () {
            var thisRolloutName = $(this).attr('id'),
            thisRolloutName = thisRolloutName.substring(8, thisRolloutName.length);
            if (rolloutName !== thisRolloutName) {
                $(this).css({ 'display': 'none', 'opacity': .5 });
            }
        });
        $('.rollout-category').each(function () {
            var thisRolloutName = $(this).attr('id'),
            thisRolloutName = thisRolloutName.substring(8, thisRolloutName.length);
            if (rolloutName !== thisRolloutName) {
                $(this).css({ 'display': 'none', 'opacity': .5 });
            }
        });
        $('#rollout-' + rolloutName).css({ 'display': 'block' });
        $('#rollout-' + rolloutName).animate({ 'opacity': 1 }, { 'duration': 150, 'queue': false });
        var rolloutWidth = $('#rollout-' + rolloutName).width() + featureNavOriginalWidth;
        if (rolloutMenuState === 0) {
            $('#feature-nav').css({ 'width': featureNavOriginalWidth });
            rolloutMenuState = 1;
            $('#feature-nav').animate({ 'width': rolloutWidth }, { 'duration': 150, 'queue': true, 'complete': function () {
                rolloutMenuBoundX2 = $('#feature-inner').offset().left + $('#feature-nav').width() - 5;
            }
            });
        } else {
            $('#feature-nav').animate({ 'width': rolloutWidth }, { 'duration': 10, 'queue': true, 'complete': function () {
                rolloutMenuBoundX2 = $('#feature-inner').offset().left + $('#feature-nav').width();
            }
            });
        }
        $('#feature-nav').addClass('feature-nav-active');
        $('#feature-hero').find('.hero-message').animate({ 'opacity': .5 }, { 'duration': 150, 'queue': false });
        $('#feature-hero').find('.hero-image').animate({ 'opacity': .5 }, { 'duration': 150, 'queue': false });

    };
    var closeRolloutMenu = function () {
        rolloutMenuState = 0;
        clearTimeout(rolloutTimer);
        $('#feature-nav').removeClass('feature-nav-active');
        $('.nav-product').removeClass('nav-product-hilite');
        $('.nav-category').removeClass('nav-category-hilite');
        $('#feature-nav').animate({ 'width': featureNavOriginalWidth }, { 'duration': 150, 'queue': true });
        $('.rollout-product').css({ 'display': 'none', 'opacity': 0 });
        $('.rollout-category').css({ 'display': 'none', 'opacity': 0 });
        $('#feature-hero').find('.hero-message').animate({ 'opacity': 1 }, { 'duration': 150, 'queue': false });
        $('#feature-hero').find('.hero-image').animate({ 'opacity': 1 }, { 'duration': 150, 'queue': false });

    }
    //////////////////////////////////////////////////////////////////////////////////////////
    // INTERACTION BINDS
    $('.nav-product').live('mouseenter', function () {
        var that = this;
        clearTimeout(rolloutTimer);
        rolloutTimer = setTimeout(function () {
            $('.nav-product').removeClass('nav-product-hilite');
            $('.nav-category').removeClass('nav-category-hilite');
            $(that).addClass('nav-product-hilite');
            openRolloutMenu($(that));
        }, 35);
    });
    $('.nav-category').live('mouseenter', function () {
        var that = this;
        clearTimeout(rolloutTimer);
        rolloutTimer = setTimeout(function () {
            $('.nav-product').removeClass('nav-product-hilite');
            $('.nav-category').removeClass('nav-category-hilite');
            $(that).addClass('nav-category-hilite');
            openRolloutMenu($(that));
        }, 35);
    });
    $('#feature-inner').live('mouseout', function (e) {
        rolloutMenuBoundY1 = $('#feature-nav').offset().top + 5;
        rolloutMenuBoundY2 = $('#feature-nav').offset().top + $('#feature-nav').height() - 5;
        if (e.pageX < rolloutMenuBoundX1 || e.pageX > rolloutMenuBoundX2 || e.pageY < rolloutMenuBoundY1 || e.pageY > rolloutMenuBoundY2) { closeRolloutMenu(); }
    });
    $('#feature-nav-inner').find('.detail-link-right').live('mouseenter', function () { closeRolloutMenu(); });
    $('.rollout-product').live('mouseenter', function () { clearTimeout(rolloutTimer); });
    $('.rollout-category').live('mouseenter', function () { clearTimeout(rolloutTimer); });
    //////////////////////////////////////////////////////////////////////////////////////////
    // TWITTER MOSAIC

    var relative_time = function (time_value) {
        var time_value = time_value.replace(/^\w+ (\w+) (\d+) ([\d:]+) \+0000 (\d+)$/, '$1 $2 $4 $3 UTC');
        var parsed_date = Date.parse(time_value);
        var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
        var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
        if (delta < 60) {
            return 'less than a minute ago';
        } else if (delta < 120) {
            return 'about a minute ago';
        } else if (delta < (45 * 60)) {
            return (parseInt(delta / 60)).toString() + ' minutes ago';
        } else if (delta < (90 * 60)) {
            return 'about an hour ago';
        } else if (delta < (24 * 60 * 60)) {
            //return 'about ' + (parseInt(delta / 3600)).toString() + ' hours ago';
            return (parseInt(delta / 3600)).toString() + ' hours ago';
        } else if (delta < (48 * 60 * 60)) {
            return '1 day ago';
        } else {
            return (parseInt(delta / 86400)).toString() + ' days ago';
        }
    }


    var linkify = function (text) {
        if (text) {
            text = text.replace(
    /((https?\:\/\/)|(www\.))(\S+)(\w{2,4})(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi,
    function (url) {
        var full_url = url;
        if (!full_url.match('^https?:\/\/')) {
            full_url = 'http://' + full_url;
        }
        return '<a href="' + full_url + '">' + url + '</a>';
    }
    );
        }
        return text;
    }
    var Tweets = new Backbone.Collection;
    var tweet = Backbone.Model.extend({
        defaults: {
            screen_name: null,
            profile_image_url: null,
            text: null,
            created_at: null
        }
    });

    var twittermosaic = function () {
        $.ajax({
            url: '/lzweb/handlers/Twitter.ashx?method=20FAVORITE',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                try {
                    $('#twittermosaic-header').css({ 'display': 'block' });
                    $('#twittermosaic').css({ 'display': 'block' });
                    $('#social-footer-shadow').css({ 'display': 'block' });
                    for (var i = 0; i < data.length; i++) {
                        Tweets.add(new tweet({
                            screen_name: data[i].user.screen_name,
                            profile_image_url: data[i].user.profile_image_url,
                            text: data[i].text,
                            created_at: data[i].created_at
                        }));
                    }
                    for (var i = 0; i < Tweets.length; i++) {
                        $('#twittertile' + (i + 1)).find('.twittertile_profile_image').html('<img src="' + Tweets.at(i).get('profile_image_url').replace('http', 'https').replace('a0', 'si0') + '">');
                        $('#twittertile' + (i + 1)).find('.twittertile_screen_name').html(Tweets.at(i).get('screen_name'));
                        $('#twittertile' + (i + 1)).find('.twittertile_text').html(linkify(Tweets.at(i).get('text')));
                        $('#twittertile' + (i + 1)).find('.twittertile_relative_time').html(relative_time(Tweets.at(i).get('created_at')));
                    }
                } catch (e) {
                    $("#twitterWrapper").css("display", "none");
                }
            }
        });
    }
    twittermosaic();
    //////////////////////////////////////////////////////////////////////////////////////////
    // AFFINITY BANNER

    var oAffinity = {
        iCookieName: 0,
        iCookiePID: 1,
        sCookieSplit: "||",
        iaDetailProds: [],
        iaExclude: [],
        iaInclude: [],
        sBannerID: "affinityBanner",
        sLinkID: "affinityLink",
        sDetailLinkClassID: "affDetailLink",
        sLinkClassID: "affLink",
        sLeftContentID: "heroDiv",
        init: function () {
            this.iaInclude[1] = true;
            //this.iaInclude[6] = true;
            this.iaInclude[2] = true;
            this.iaInclude[20] = true;
            this.iaInclude[38] = true;
            this.iaInclude[7] = true;
        },
        getCookie: function () {
            var mCookie = document.cookie.match(/affinity=[^;]+/gim);
            return mCookie ? String(mCookie).replace(/affinity=/gim, "") : -1;
        },
        getCookieProductID: function () {
            var sCookie = String(this.getCookie());
            var sSplit = sCookie.split("|");
            return sSplit && sSplit.length > 1 ? sSplit[0] : sCookie;
        },
        getCookieFormID: function () {
            var sCookie = String(this.getCookie());
            var sSplit = sCookie.split("|");
            return sSplit && sSplit.length > 1 ? sSplit[1] : "";
        },
        getCookieProductName: function () {
            var sCookie = this.getCookieProductID();
            return this.iaDetailProds[sCookie] ? this.iaDetailProds[sCookie] : "";
        },
        getProductName: function () {
            var iProduct = this.getCookieProductID();
            return this.iaDetailProds[iProduct] && this.iaDetailProds[iProduct][0] ? this.iaDetailProds[iProduct][0] : "";
        },
        getWelcomeBackLinkContent: function (iProduct, sProduct) { return "Click here to continue your " + (sProduct && sProduct != "" ? sProduct : "") + " questionnaire" },
        getObj: function (sObjID) { return document.getElementById(sObjID); },
        setContent: function (sObjID, sContent) { if (this.getObj(this.sLinkID) != null) { this.getObj(this.sLinkID).innerHTML = sContent; } },
        setWelcomebackLinkContentClass: function (bDetail) {
            if (this.getObj(this.sLinkID) != null) { this.getObj(this.sLinkID).className = bDetail ? this.sDetailLinkClassID : this.sLinkClassID; }
        },
        setWelcomebackLinkHREF: function () {
            var sFormID = this.getCookieFormID();
            var sFormParam = sFormID == "" ? "" : "&FormIndex=" + sFormID;
            if (this.getObj(this.sLinkID) != null) {
                if (sFormParam != "") {
                    this.getObj(this.sLinkID).href = "/LZWeb/PreProcess/PreProcess.aspx?iProcess=" + this.getCookieProductID() + sFormParam;
                } else {
                    this.getObj(this.sLinkID).href = "/questionnaire/pre_process1.asp?iPID=" + this.getCookieProductID();
                }
            }
        },
        setWelcomebackLinkContent: function () {
            var iProduct = this.getCookieProductID();
            var sProduct = this.getProductName();
            if (iProduct && iProduct != -1 && iProduct != 0 && this.iaInclude[iProduct]) {
                this.setContent(this.sLinkID, this.getWelcomeBackLinkContent(iProduct, sProduct));
                this.setWelcomebackLinkContentClass((sProduct && sProduct != ""));
                this.setWelcomebackLinkHREF();
                this.setLeftContent();
                var affinityBannerTimeout = setTimeout(function () {
                    $('#affinityBanner').css({ 'display': 'block' });
                    $('#affinityBanner').animate({ 'height': 50 }, { 'duration': 600 });
                }, 500);
            }
        },
        setLeftContent: function () {
            var iProduct = this.getCookieProductID();
            var sImgSrc = this.iaDetailProds[iProduct] && this.iaDetailProds[iProduct][1] ? this.iaDetailProds[iProduct][1] : "";
            var sMap = this.iaDetailProds[iProduct] && this.iaDetailProds[iProduct][2] ? this.iaDetailProds[iProduct][2] : "";
            if (sImgSrc != "") {
                this.getObj(this.sLeftContentID).innerHTML = "<img src='" + sImgSrc + "' " + (sMap != "" ? "usemap='#" + sMap + "'" : "") + " style='margin-left:15px;' />";
            }
        },
        shouldRotateHeros: function () {
            var sProduct = this.getProductName();
            return sProduct && sProduct != "";
        }
    }
    oAffinity.init();
    oAffinity.setWelcomebackLinkContent();

    function affinityCloseDone() {
        $('#affinityBanner').css({ "display": "none" });
    }
    $('#affinityCloseButton').live('click', function () {
        $('#affinityBanner').slideUp('slow', '', function () {
            $('#affinityBanner').css({ "display": "none" });
        });
    });

    //////////////////////////////////////////////////////////////////////////////////////////
    // IF IPAD
    if ((navigator.userAgent.match(/iPad/i))) {
        $('head').append($('<link rel="stylesheet" href="/assets/css/home_v1-ipad.css">'));
    }
    $('.iosfixlink').live('click', function (e) {
        e.preventDefault();
    });

    //////////////////////////////////////////////////////////////////////////////////////////
    // AS Dynamic Pods
    //////////////////////////////////////////////////////////////////////////////////////////
    //lzPlanType = "BAP"  //use for testing case
    //alert(lzPlanType);
    if (lzPlanType) {
        switch (lzPlanType) {
            case 'BAPIP_AND_LAP':
                $('.noPlan').css({ 'display': 'none' });
                $('.hasPlan').css({ 'display': 'block' });
                $('.subfeature-box-last a, .consultationRollout a').attr('href', '/LZWeb/PreProcess/PreProcess.aspx?iProcess=123');
                $('.memberCenterRollout a').attr('href', '/LZWeb/ASMemberCenter/AttorneyConsultations.aspx?SubPlanTypeId=1');
                $('#nav-attorney-link').attr('href', '/LZWeb/ASMemberCenter/AttorneyConsultations.aspx?SubPlanTypeId=1');
                break;
            case 'BAP_AND_LAP':
                $('.noPlan').css({ 'display': 'none' });
                $('.hasPlan').css({ 'display': 'block' });
                $('.subfeature-box-last a, .consultationRollout a').attr('href', '/LZWeb/PreProcess/PreProcess.aspx?iProcess=122');
                $('.memberCenterRollout a').attr('href', '/LZWeb/ASMemberCenter/AttorneyConsultations.aspx?SubPlanTypeId=1');
                $('#nav-attorney-link').attr('href', '/LZWeb/ASMemberCenter/AttorneyConsultations.aspx?SubPlanTypeId=1');
                break;
            case 'BAPIP':
                $('.noPlan').css({ 'display': 'none' });
                $('.hasPlan').css({ 'display': 'block' });
                $('.subfeature-box-last a, .consultationRollout a').attr('href', '/LZWeb/PreProcess/PreProcess.aspx?iProcess=123');
                $('.memberCenterRollout a').attr('href', '/LZWeb/ASMemberCenter/AttorneyConsultations.aspx?SubPlanTypeId=1');
                $('#nav-attorney-link').attr('href', '/LZWeb/ASMemberCenter/AttorneyConsultations.aspx?SubPlanTypeId=1');
                break;
            case 'BAP':
                $('.noPlan').css({ 'display': 'none' });
                $('.hasPlan').css({ 'display': 'block' });
                $('.subfeature-box-last a, .consultationRollout a').attr('href', '/LZWeb/PreProcess/PreProcess.aspx?iProcess=122');
                $('.memberCenterRollout a').attr('href', '/LZWeb/ASMemberCenter/AttorneyConsultations.aspx?SubPlanTypeId=1');
                $('#nav-attorney-link').attr('href', '/LZWeb/ASMemberCenter/AttorneyConsultations.aspx?SubPlanTypeId=1');
                break;
            case 'LAP':
                $('.noPlan').css({ 'display': 'none' });
                $('.hasPlan').css({ 'display': 'block' });
                $('.subfeature-box-last a, .consultationRollout a').attr('href', '/LZWeb/PreProcess/PreProcess.aspx?iProcess=124');
                $('.memberCenterRollout a').attr('href', '/LZWeb/ASMemberCenter/AttorneyConsultations.aspx?SubPlanTypeId=2');
                $('#nav-attorney-link').attr('href', '/LZWeb/ASMemberCenter/AttorneyConsultations.aspx?SubPlanTypeId=2');
                break;
            default:
                $('.hasPlan').css({ 'display': 'none' });
                $('.noPlan').css({ 'display': 'block' });
                break;
        }
    } else {
        $('.hasPlan').css({ 'display': 'none' });
        $('.noPlan').css({ 'display': 'block' });
    }
});