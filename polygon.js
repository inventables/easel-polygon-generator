// Define a properties array that returns array of objects representing
// the accepted properties for your application
var properties = [
  {type: 'range', id: "Sides", value: 4, min: 3, max: 20, step: 1},
  {type: 'range', id: "Radius", value: 100, min: 30, max: 150, step: 1}
];

// Define an executor function that generates a valid SVG document string,
// and passes it to the provided success callback, or invokes the failure
// callback if unable to do so
var executor = function(args, success, failure) {
  var params = args[0];
  var sides = params["Sides"];
  var radius = params["Radius"];

  var svg = [
    '<?xml version="1.0" standalone="no"?>',
    '<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="' + (params["Radius"] * 2),
    '" height="' + (params["Radius"] * 2) + '">',
    '   <polygon points="' + pointsArray(sides, radius).join(" ") + '" style="fill:#7f7f7f;stroke:#7998B6;stroke-width:4" />',
    '</svg>'
  ].join("");

  success(svg);
};

var pointsArray = function(sides, radius) {
  var r = radius;
  const pi = Math.PI;
  var centerX = r;
  var centerY = r;

  var currentX;
  var currentY;

  var tempArray = [];
  var stepAngleRadians = ((2*pi) / sides);
  var angleOffset = 0;

  // set angle offset
  if (sides === 4)
    angleOffset = stepAngleRadians/2;
  else
    angleOffset = pi / 2;

  // generate coordinates
  for (var i = angleOffset; i < ((2*pi) + angleOffset); i += stepAngleRadians) {
    currentX = centerX + (Math.cos(i) * r);
    currentY = centerY - (Math.sin(i) * r);

    tempArray.push([String(currentX), String(currentY)].join(","));
  }

  return tempArray;
  };
