const Color = {
  red: "#FF0000",
  orange: "#FF8D00",
  yellow: "#FCE803",
  green: "#37FF00",
  blue: "#004CFF",
  purple: "#A200FF",
  brown: "#5C3210",
  black: "#000000",
  grey: "#B4B4B4",
};

function getP5Color(name) {
  return color(Color[name]);
}
