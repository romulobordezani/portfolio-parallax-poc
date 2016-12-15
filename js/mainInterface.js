var wrapper = 'div#wrapper';
var mindBrowser = 'div#parallax';
var canvas = {};
var context = {};
var bgMindBrowser = new Image();
var horizontalMousePosition = 0;
var verticalMousePosition = 0;
var speed =  24;
var place = 0;


var romsMindBrowser = window.romsMindBrowser || function(){};
romsMindBrowser = function(){};
romsMindBrowser.prototype = {

    constructor: romsMindBrowser,

    init: function () {
        if (!mainCanvas.browser.detectHTML5()) return; // Hack to avoid HTML5less browsers
        mainCanvas.display.specialVerticalAlign();
    },

    display: {

        animationStartedAtOnce: false,
        timeToWaitForTheResize: 0,

        waitUntillResizeEnds: function () {
            mainCanvas.display.animationStartedAtOnce = false;
            clearTimeout(mainCanvas.display.timeToWaitForTheResize);
        },

        specialVerticalAlign: function () {

            if (mainCanvas.display.animationStartedAtOnce) return; // Hack to avoid some browsers resize event that fires twice
            if (!mainCanvas.browser.detectHTML5())   return; // Hack to avoid HTML5less browsers

            var idealPosition = $(window).height() - ( $(window).height() / 1.3 );
            var pageWidth = $(window).width();
            var mindBrowserWidth = $(mindBrowser).width();
            var wrapperWidth = 1268;
            var mindBrowserCenter = ( pageWidth - mindBrowserWidth ) / 2;
            var wrapperCenter = ( pageWidth - wrapperWidth ) / 2;


            if ($(window).height() < 760) {
                $(wrapper).animate({ backgroundPosition: wrapperCenter + 'px ' + idealPosition + 'px' }, 200, 'easeOut');
                $(mindBrowser).animate({ bottom: idealPosition, left: mindBrowserCenter }, 400, 'easeOutElastic');
            } else {
                $(wrapper).animate({ backgroundPosition: wrapperCenter + 'px 1px'  }, 200, 'easeOut');
                $(mindBrowser).animate({ bottom: 300, left: mindBrowserCenter  }, 400, 'easeOutElastic');
            }
            mainCanvas.display.animationStartedAtOnce = true;
            setTimeout(mainCanvas.display.waitUntillResizeEnds, 200);
        }

    },

    canvasController: {
        loadImage: function (imgVar, imgURL, sx, sy, swidth, sheight, x, y, width, height) {
            var allArguments = arguments;
            imgVar.onload = function () {
                switch (allArguments.length) {
                    case 3  :
                        context.drawImage(this, sx, sy);
                        break;
                    case 5  :
                        context.drawImage(this, sx, sy, swidth, sheight);
                        break;
                    case 9  :
                        context.drawImage(this, sx, sy, swidth, sheight, x, y, width, height);
                        break;
                    default :
                        console.log('Didn\'t you forget some argument, Roms?' + ' on canvasController.loadImage: ', allArguments);
                }
            };
            imgVar.src = imgURL;
        },

        redrawImage: function (imgVar, sx, sy, swidth, sheight, x, y, width, height) {
            var allArguments = arguments;
            switch (allArguments.length) {
                case 3  :
                    context.drawImage(imgVar, sx, sy);
                    break;
                case 5  :
                    context.drawImage(imgVar, sx, sy, swidth, sheight);
                    break;
                case 9  :
                    context.drawImage(imgVar, sx, sy, swidth, sheight, x, y, width, height);
                    break;
                default :
                    console.log('Didn\'t you forget some argument, Roms?' + ' on canvasController.redrawImage: ', allArguments);
            }
        }
    },

    anima: {

        init: function () {
            mainCanvas.canvasController.loadImage(bgMindBrowser, 'img/bg-mindBrowser.jpg', -360, -190);
            mainCanvas.anima.getScreenMiddle();
            this.soul = setInterval(this.moveIt, 41);
        },

        moveIt: function () {

            if (place > -1812 && place < 1) {
                place -= horizontalMousePosition * 0.1;
                console.log("if: " + place);
            } else {
                place = place >= -1812 ? -1 : -1812;
                console.log("else: " + place);
            }
            mainCanvas.canvasController.redrawImage(bgMindBrowser, place, -190);
        },

        getScreenMiddle: function () {
            $("body").mousemove(function (event) {
                horizontalMousePosition = event.pageX - ( window.screen.width / 2 );
                verticalMousePosition = event.pageY;
            });
        }

    },

    browser: {
        detectHTML5: function () {
            var elem = document.createElement('canvas');
            return !!(elem.getContext && elem.getContext('2d'));
        }
    },

    binds: {

        click: function (e) {
            console.log(e);
        }

    },

    radio: {

    }

};

$(document).ready( function(){
	mainCanvas.init();
});

$(window).resize( function(){
	mainCanvas.display.specialVerticalAlign();
});

var  mainCanvas = romsMindBrowser.prototype;