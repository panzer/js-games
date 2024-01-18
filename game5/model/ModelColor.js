function getRandomPrimaryColor() {
  const i = parseInt(random(0, 3).toString());
  switch (i) {
    case 0:
      return "red";
    case 1:
      return "blue";
    case 2:
      return "yellow";
    default:
      return "brown"; // this should never happen
  }
}

function blendColors(a, b, c) {
  const s = new Set([a, b, c].filter((v) => !!v));
  switch (s.size) {
    case 1:
      if (s.has("red")) return "red";
      if (s.has("blue")) return "blue";
      if (s.has("yellow")) return "yellow";
      return "brown"; // should be unreachable
    case 2: {
      if (s.has("red")) {
        if (s.has("yellow")) return "orange";
        if (s.has("blue")) return "purple";
      }
      return "green";
    }
    case 3:
    default:
      return "brown";
  }
}
