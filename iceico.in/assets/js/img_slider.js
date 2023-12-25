var module_32782718945 = (function () {
  var __hs_messages = {};
  (i18n_getmessage = function () {
    return hs_i18n_getMessage(__hs_messages, hsVars.language, arguments);
  }),
    (i18n_getlanguage = function () {
      return hsVars.language;
    });
  var $firstPaginationItem,
    $sliderID = $("#StorySliderID"),
    slidesCount = $(".story-list").length;
  if (slidesCount > 1) {
    function shiftSlide(changeVal) {
      var oldTargetIndex = parseInt(
          $sliderID.find(".story-list.active-slide").attr("data-slide-index")
        ),
        newTargetIndex = parseInt(oldTargetIndex + changeVal);
      newTargetIndex > slidesCount - 1
        ? (newTargetIndex = 0)
        : newTargetIndex < 0 && (newTargetIndex = slidesCount - 1);
      var newTarget = $sliderID.find(
          "[data-slide-index=" + newTargetIndex + "]"
        ),
        oldTarget = $sliderID.find("[data-slide-index=" + oldTargetIndex + "]"),
        oldTargetImage = $sliderID
          .find("[data-slide-index=" + oldTargetIndex + "]")
          .find(".right-section-content");
      changeVal > 0
        ? ((function (oldTarget, newTarget) {
            $(oldTarget).addClass("animate"),
              $(oldTarget).removeClass("newlogoanimate"),
              $(oldTarget).addClass("oldlogoanimate"),
              $(oldTargetImage).css("width", "0"),
              $(oldTarget).css("z-index", "2"),
              $(newTarget).addClass("active-slide"),
              $(newTarget).addClass("newlogoanimate"),
              $(oldTarget)
                .delay(500)
                .queue(function (slideNext) {
                  $(oldTarget).removeClass("active-slide"),
                    $(oldTarget).removeClass("animate"),
                    $(oldTarget).removeClass("oldlogoanimate"),
                    $(".story-list").attr("style", ""),
                    $(".story-list .right-section-content").attr("style", ""),
                    slideNext();
                });
          })(oldTarget, newTarget),
          (function (oldTargetIndex, newTargetIndex) {
            var $oldTarget = $sliderID.find(
                "[data-pagination-index=" + oldTargetIndex + "]"
              ),
              $newtarget = $sliderID.find(
                "[data-pagination-index=" + newTargetIndex + "]"
              );
            $oldTarget.removeClass("active-slide-pagination-block"),
              $oldTarget.removeClass("back-slide"),
              $oldTarget
                .addClass("animate")
                .delay(500)
                .queue(function (next) {
                  $oldTarget.removeClass("animate"), next();
                }),
              $newtarget.addClass("active-slide-pagination-block"),
              $sliderID.find(".xs-pagination-number").text(newTargetIndex + 1),
              $sliderID
                .find(".xs-pagination-text")
                .text($newtarget.find(".slide-pagination-text").text().trim());
          })(oldTargetIndex, newTargetIndex))
        : ((function (oldTarget, newTarget) {
            $(newTarget).addClass("animate"),
              $(oldTarget).removeClass("newlogoanimate"),
              $(oldTarget).addClass("oldlogoanimate"),
              $(oldTargetImage).css("width", "100%"),
              $(newTarget).css("z-index", "2"),
              $(newTarget).addClass("active-slide"),
              $(newTarget).addClass("newlogoanimate"),
              $(oldTarget)
                .delay(500)
                .queue(function (slidePrev) {
                  $(oldTarget).removeClass("active-slide"),
                    $(oldTarget).removeClass("animate"),
                    $(oldTarget).removeClass("oldlogoanimate"),
                    $(newTarget).removeClass("animate"),
                    $(".story-list").attr("style", ""),
                    $(".story-list .right-section-content").attr("style", ""),
                    slidePrev();
                });
          })(oldTarget, newTarget),
          (function (oldTargetIndex, newTargetIndex) {
            var $oldTarget = $sliderID.find(
                "[data-pagination-index=" + oldTargetIndex + "]"
              ),
              $newtarget = $sliderID.find(
                "[data-pagination-index=" + newTargetIndex + "]"
              );
            $oldTarget.removeClass("active-slide-pagination-block"),
              $oldTarget.removeClass("back-slide"),
              $oldTarget
                .addClass("back-slide-animation")
                .delay(500)
                .queue(function (prev) {
                  $oldTarget.removeClass("back-slide-animation"), prev();
                }),
              $newtarget.addClass("back-slide"),
              $sliderID.find(".xs-pagination-number").text(newTargetIndex + 1),
              $sliderID
                .find(".xs-pagination-text")
                .text($newtarget.find(".slide-pagination-text").text().trim());
          })(oldTargetIndex, newTargetIndex));
    }
    function dragSlide(clientPosX1, clientPosX2) {
      var dragDiff = clientPosX2 - clientPosX1;
      console.log("clientPosX1", clientPosX1),
        console.log("clientPosX2", clientPosX2),
        dragDiff < -100
          ? shiftSlide(1)
          : dragDiff > 100
          ? (shiftSlide(-1), console.log("prev slide"))
          : console.log("Insufficient drag");
    }
    $sliderID.find("[data-slide-index='0']").addClass("active-slide"),
      $sliderID.find("[data-slide-index='0']").addClass("newlogoanimate"),
      ($firstPaginationItem = $sliderID.find(
        "[data-pagination-index='0']"
      )).addClass("active-slide-pagination-block"),
      $sliderID
        .find(".xs-pagination-text")
        .text(
          $firstPaginationItem.find(".slide-pagination-text").text().trim()
        ),
      (function () {
        var initTouchPosX, finalTouchPosX, mousePressPosX, mouseLeavePosX;
        function getTouchPos(event) {
          return event.originalEvent.changedTouches[0].clientX;
        }
        $sliderID.on("touchstart", function (event) {
          initTouchPosX = getTouchPos(event);
        }),
          $sliderID.on("touchend", function (event) {
            (finalTouchPosX = getTouchPos(event)),
              dragSlide(initTouchPosX, finalTouchPosX);
          }),
          $sliderID.on("mousedown", function (event) {
            (event = event || window.event), (mousePressPosX = event.offsetX);
          }),
          $sliderID.on("mouseup", function (event) {
            (mouseLeavePosX = event.offsetX),
              dragSlide(mousePressPosX, mouseLeavePosX);
          }),
          $("#storynextSlideControl").click(function () {
            shiftSlide(1);
          }),
          $("#storyprevSlideControl").click(function () {
            shiftSlide(-1);
          });
      })();
  }
  "" == $(".story-list").text().trim() &&
    ($(".featured-story-list").css("display", "none"),
    $(".quotesection").addClass("mobile-bottom-space"));
})();
