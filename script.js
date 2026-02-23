function secureRandom(min, max) {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return min + (array[0] % (max - min + 1));
}

const fs = require("fs");

function getLevel(filePath, n) {
    try {
        if (typeof n !== "number" || !Number.isInteger(n) || n < 1) {
            return null;
        }

        const text = fs.readFileSync(filePath, "utf8");

        const lines = text
            .trim()
            .split(/\r?\n/)
            .filter(line => line.trim() !== "");

        if (n > lines.length) return null;

        return lines[n - 1];

    } catch (err) {
        console.error("Error reading file:", err.message);
        return null;
    }
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
    const rnum = secureRandom(1,3);
    const levelID = secureRandom(1, 22);
    const level = getLevel("./level.txt", levelID)
    alert("Coin " + rnum + "in level " + level);
  });

});









