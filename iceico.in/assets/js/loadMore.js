// // $(document).ready(function() {
// //     var itemsToShow = 6; // Change this number to adjust how many items to show at once
// //     var itemsShown = 0;
// //     var itemsTotal = $('.card1').length;
  
// //     $('.card1').slice(0, itemsToShow).show();
// //     itemsShown += itemsToShow;
  
// //     $('#loadMore').click(function() {
// //       var itemsLeft = itemsTotal - itemsShown;
  
// //       if (itemsLeft >= itemsToShow) {
// //         $('.card1').slice(itemsShown, itemsShown + itemsToShow).fadeIn();
// //         itemsShown += itemsToShow;
// //       } else {
// //         $('.card1').slice(itemsShown, itemsTotal).fadeIn();
// //         itemsShown = itemsTotal;
// //         $('#loadMore').fadeOut();
// //       }
// //     });
// //   });
  


// document.addEventListener("DOMContentLoaded", function() {
//     var itemsToShow = 6; // Change this number to adjust how many items to show at once
//     var itemsShown = 0;
//     var itemsTotal = document.querySelectorAll('#myRow .col-md-4').length;
    
//     var initialItems = Array.prototype.slice.call(document.querySelectorAll('#myRow .col-md-4')).slice(0, itemsToShow);
//     for (var i = 0; i < initialItems.length; i++) {
//       initialItems[i].style.display = "block";
//     }
//     itemsShown += itemsToShow;
    
//     var loadMoreButton = document.getElementById("loadMore");
//     loadMoreButton.addEventListener("click", function() {
//       var itemsLeft = itemsTotal - itemsShown;
    
//       if (itemsLeft >= itemsToShow) {
//         var nextItems = Array.prototype.slice.call(document.querySelectorAll('#myRow .col-md-4')).slice(itemsShown, itemsShown + itemsToShow);
//         for (var i = 0; i < nextItems.length; i++) {
//           nextItems[i].style.display = "block";
//         }
//         itemsShown += itemsToShow;
//       } else {
//         var remainingItems = Array.prototype.slice.call(document.querySelectorAll('#myRow .col-md-4')).slice(itemsShown, itemsTotal);
//         for (var i = 0; i < remainingItems.length; i++) {
//           remainingItems[i].style.display = "block";
//         }
//         itemsShown = itemsTotal;
//         loadMoreButton.style.display = "none";
//       }
//     });
//   });
      

$(function () {
  $(".card1").slice(0, 6).show();
  $("#loadMore").on('click', function (e) {
      e.preventDefault();
      $(".card1:hidden").slice(0, 6).slideDown();
      if ($(".card1:hidden").length == 0) {
          $("#load").fadeOut('slow');
      }
      // $('html,body').animate({
      //     scrollTop: $(this).offset().top
      // }, 1500);
  });
});