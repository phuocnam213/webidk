function secureRandom(min, max) {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return min + (array[0] % (max - min + 1));
}

$(function () {
  
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
  
  $("#coin").on("click", function () {
    const n = randomCoin();
    alert("coin " + n);
  });

});




