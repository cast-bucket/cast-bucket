// util to convertSeconds to hours, minutes and seconds
const convertSeconds = (seconds: any) => {
  seconds = parseInt(seconds, 10);

  if (isNaN(seconds)) {
    throw new TypeError("Invalid value sent to convert-seconds");
  }

  const results: any = {};
  results.hours = Math.floor(seconds / 60 / 60);
  results.minutes = Math.floor((seconds / 60) % 60);
  results.seconds = Math.floor(seconds % 60);
  if (results.seconds < 10) {
    results.seconds = `0${results.seconds}`;
  }

  return results;
};

export default convertSeconds;
