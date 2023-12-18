function sum(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    return new "TypeError";
  } else {
    return a + b;
  };
};

module.exports = sum;
