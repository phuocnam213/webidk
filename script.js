$(function () {

  
  $(window).on("resize", centerImage);

  $(window).on("mousemove", function (e) {
    $(".original").css({
      left: e.pageX - 16,
      top: e.pageY - 16
    });
  });

  $("body").on("click", function (e) {
    $(".original")
      .clone(true)
      .appendTo("body")
      .css({
        left: e.pageX - 16,
        top: e.pageY - 16
      })
      .removeClass("original");
  });

});

