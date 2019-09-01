const breakpoints = {
  SMALL_WIDTH: 375, // (0-375)
  MEDIUM_WIDTH: 767, // (376-767)
  LARGE_WIDTH: 1023, // (768-1023)
  XLARGE_WIDTH: 1024, //+
  SMALL_HEIGHT: 667, // (0-667)
  MEDIUM_HEIGHT: 1023, // (668-1023)
  LARGE_HEIGHT: 1365, // (1024-1365)
  XLARGE_HEIGHT: 1366 //
};

// obtained from https://gist.github.com/thienpow/10b80c91343048408154884239cf9f42
export const getAdjustedFontSize = (fontSize, width) => {
  return (parseInt(fontSize) * width * (1.8 - 0.002 * width)) / 400;
};

export const isSmallScreen = width => {
  return width <= (breakpoints.SMALL_WIDTH + breakpoints.MEDIUM_WIDTH) / 2;
};
