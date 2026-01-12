$(function () {

  function centerImage() {
    const $loading = $(".loading");
    const $img = $(".loading img");

    $loading.height($(window).height());
    $loading.width($(window).width());

    $img.css({
      paddingTop: ($loading.height() - $img.height()) / 2,
      paddingLeft: ($loading.width() - $img.width()) / 2
    });
  }

  centerImage();
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
