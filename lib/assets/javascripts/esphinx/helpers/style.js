"use strict";

var
    esPhinx;

(function ($) {

    $.extend({

        prototype: {

            // horizontalSlideToggle

            toggleClass: function (classList, changeTo) {
                var
                    self = this,
                    pattern;

                self.each(function (node) {
                    if ($(node).hasClass(classList)) {
                        $(node).removeClass(classList);
                        if (changeTo) {
                            $(node).addClass(changeTo);
                        }
                    } else if (changeTo) {
                        if ($(node).hasClass(changeTo)) {
                            $(node).removeClass(changeTo);
                            $(node).addClass(classList);
                        } else {
                            $(node).addClass(classList);
                        }
                    } else {
                        $(node).addClass(classList);
                    }
                });

                return self;
            },

            hide: function () {
                var
                    self = this;

                self.css("display", "none");

                return self;
            },

            show: function (displayValue) {
                displayValue = displayValue || "block";

                var
                    self = this;

                self.css("display", displayValue);

                return self;
            },

            centralizeAt: function (nodeQuery) {
                var
                    self = this;

                self.css({
                    top: ($(nodeQuery).height() / 2) - (self.height() / 2) + "px",
                    left: ($(nodeQuery).width() / 2) - (self.width() / 2) + "px"
                });

                return self;
            },

            minWidth: function(){
                return this.css("width");
            },

            innerWidth: function(){
                var
                    self = this,
                    paddingLeft = self.css("padding-left"),
                    paddingRight = self.css("padding-right");

                return self.minWidth() + paddingLeft + paddingRight;
            },

            width: function(){
                var
                    self = this,
                    borderLeft = self.css("border-left-width"),
                    borderRight = self.css("border-right-width");

                return self.innerWidth() + borderLeft + borderRight;
            },

            minHeight: function () {
                return this.css("height");
            },

            innerHeight: function () {
                var
                    self = this,
                    paddingTop = self.css("padding-top"),
                    paddingBottom = self.css("padding-bottom");

                return self.minHeight() + paddingTop + paddingBottom;
            },

            height: function () {
                var
                    self = this,
                    borderTop = self.css("border-top-width"),
                    borderBottom = self.css("border-bottom-width");

                return self.innerHeight() + borderTop + borderBottom;
            }

        }

    });

}(esPhinx));