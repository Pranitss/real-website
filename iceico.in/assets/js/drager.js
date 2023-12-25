var module_96057924722 = (function () {
  var __hs_messages = {};
  (i18n_getmessage = function () {
    return hs_i18n_getMessage(__hs_messages, hsVars.language, arguments);
  }),
    (i18n_getlanguage = function () {
      return hsVars.language;
    }),
    $(document).ready(function () {
      const $sliderID = $(".slider2-selector"),
        imgWrapperClass = ".ss2-img-mid-wrapper",
        throttleShiftSlide =
          ((callback = function (changeVal, sliderElem, sliderTimerID) {
            sliderTimerID &&
              (function (sliderElem, sliderTimerID) {
                sliderElem.attr("data-timer-id", sliderTimerID);
              })(sliderElem, sliderTimerID);
            let oldTargetIndex = parseInt(
                sliderElem
                  .find(".slider2-slide.active-slide")
                  .attr("data-slide-index")
              ),
              newTargetIndex = parseInt(oldTargetIndex + changeVal);
            const slidesCount = sliderElem.find(".slider2-slide").length;
            newTargetIndex > slidesCount - 1
              ? (newTargetIndex = 0)
              : newTargetIndex < 0 && (newTargetIndex = slidesCount - 1),
              changeVal > 0
                ? (function (newTargetIndex, oldTargetIndex, sliderElem) {
                    const newTarget = sliderElem.find(
                        "[data-slide-index=" + newTargetIndex + "]"
                      ),
                      oldTarget = sliderElem.find(
                        "[data-slide-index=" + oldTargetIndex + "]"
                      );
                    (function (newTarget, oldTarget) {
                      const oldImgBlock = $(oldTarget).find(imgWrapperClass),
                        newImgBlock = $(newTarget).find(imgWrapperClass);
                      oldImgBlock.css("width", "0"),
                        oldImgBlock.css("z-index", "2"),
                        $(oldImgBlock).addClass("animate"),
                        $(newImgBlock).addClass("active-img"),
                        $(newTarget).addClass("active-slide"),
                        $(oldImgBlock)
                          .delay(500)
                          .queue(function (slideChange) {
                            $(oldTarget).removeClass("active-slide"),
                              $(oldImgBlock).removeClass("active-img"),
                              oldImgBlock.attr("style", ""),
                              $(oldImgBlock).removeClass("animate"),
                              slideChange();
                          });
                    })(newTarget, oldTarget),
                      fadeSlideText(newTarget, oldTarget),
                      animatePaginationDots(
                        oldTargetIndex,
                        newTargetIndex,
                        sliderElem
                      );
                  })(newTargetIndex, oldTargetIndex, sliderElem)
                : (function (newTargetIndex, oldTargetIndex, sliderElem) {
                    const newTarget = sliderElem.find(
                        "[data-slide-index=" + newTargetIndex + "]"
                      ),
                      oldTarget = sliderElem.find(
                        "[data-slide-index=" + oldTargetIndex + "]"
                      );
                    (function (newTarget, oldTarget) {
                      let oldImgBlock = $(oldTarget).find(imgWrapperClass),
                        newImgBlock = $(newTarget).find(imgWrapperClass);
                      newImgBlock.css("width", "100%"),
                        newImgBlock.css("z-index", "2"),
                        $(newImgBlock).addClass("active-img"),
                        $(newTarget).addClass("active-slide"),
                        $(newImgBlock).addClass("animate"),
                        $(oldImgBlock)
                          .delay(500)
                          .queue(function (slidePrev) {
                            $(oldTarget).removeClass("active-slide"),
                              $(oldImgBlock).removeClass("active-img"),
                              $(newImgBlock).removeClass("animate"),
                              newImgBlock.attr("style", ""),
                              slidePrev();
                          });
                    })(newTarget, oldTarget),
                      fadeSlideText(newTarget, oldTarget),
                      animatePaginationDots(
                        oldTargetIndex,
                        newTargetIndex,
                        sliderElem
                      );
                  })(newTargetIndex, oldTargetIndex, sliderElem);
          }),
          (isCoolDown = !1),
          function (...arg) {
            isCoolDown ||
              ((isCoolDown = !0),
              window.setTimeout(function () {
                isCoolDown = !1;
              }, 600),
              callback(...arg));
          });
      var callback, isCoolDown;
      function animatePaginationDots(
        oldTargetIndex,
        newTargetIndex,
        sliderElem
      ) {
        const newPaginationDot = sliderElem.find(
            "[data-pagination-index=" + newTargetIndex + "]"
          ),
          oldPaginationDot = sliderElem.find(
            "[data-pagination-index=" + oldTargetIndex + "]"
          );
        $(oldPaginationDot).removeClass("active-dot"),
          $(newPaginationDot).addClass("active-dot");
      }
      function fadeSlideText(newTarget, oldTarget) {
        $(oldTarget).find(".ss2-content-section").removeClass("active-content"),
          window.setTimeout(
            () =>
              $(newTarget)
                .find(".ss2-content-section")
                .addClass("active-content"),
            300
          );
      }
      function isMultipleSlidesPresent(sliderElem) {
        return sliderElem.find(".slider2-slide").length > 1;
      }
      function dragSlide(clientPosX1, clientPosX2, sliderElem) {
        if (isMultipleSlidesPresent(sliderElem)) {
          const dragDiff = clientPosX2 - clientPosX1;
          stopSlideAutoPlay(sliderElem),
            dragDiff < -100
              ? throttleShiftSlide(1, sliderElem)
              : dragDiff > 100
              ? throttleShiftSlide(-1, sliderElem)
              : console.log("Insufficient drag");
        }
      }
      function stopSlideAutoPlay(sliderElem) {
        clearInterval(sliderElem.attr("data-timer-id")),
          console.log(
            "Stopped slider with ID:",
            sliderElem.attr("data-timer-id")
          );
      }
      !(function () {
        let initTouchPosX, finalTouchPosX, mousePressPosX, mouseLeavePosX;
        function getTouchPos(event) {
          return event.originalEvent.changedTouches[0].clientX;
        }
        $sliderID.on("touchstart", function (event) {
          initTouchPosX = getTouchPos(event);
        }),
          $sliderID.on("touchend", function (event) {
            (finalTouchPosX = getTouchPos(event)),
              dragSlide(initTouchPosX, finalTouchPosX, $(this));
          }),
          $sliderID.on("mousedown", function (event) {
            (event = event || window.event), (mousePressPosX = event.clientX);
          }),
          $sliderID.on("mouseup", function (event) {
            (mouseLeavePosX = event.clientX),
              dragSlide(mousePressPosX, mouseLeavePosX, $(this));
          }),
          $(".slider2-nav-prev").click(function () {
            const sliderElem = $(this).parents(".slider2-selector");
            stopSlideAutoPlay(sliderElem), throttleShiftSlide(-1, sliderElem);
          }),
          $(".slider2-nav-next").click(function () {
            const sliderElem = $(this).parents(".slider2-selector");
            stopSlideAutoPlay(sliderElem), throttleShiftSlide(1, sliderElem);
          });
      })(),
        $sliderID.each(function () {
          if (isMultipleSlidesPresent($(this))) {
            let self = $(this),
              sliderTimerID = setInterval(function () {
                throttleShiftSlide(1, self, sliderTimerID);
              }, 4e3);
            console.log("Autoplay started for id:", sliderTimerID);
          }
        }),
        $(".xs-slider2").slick({
          dots: !0,
          arrows: !1,
          autoplay: !0,
          infinite: !0,
          speed: 500,
          fade: !0,
          cssEase: "linear",
        });
    });
})();
