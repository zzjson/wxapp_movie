function convertToStarsArray(stars) {
  var starsArray = [];
  var num = stars.toString().split(0, 1);
  for (var i = 0; i < 5; i++) {
    if (i < num - 1) {
      starsArray.push(true);
    } else {
      starsArray.push(false);
    }
  }
  return starsArray;
}

module.exports = {
  convertToStarsArray: convertToStarsArray
}