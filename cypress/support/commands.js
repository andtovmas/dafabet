//function for convert time  am/pm
Cypress.Commands.add("changeTimeStamp", (time12h) => {
  const [time, modifier] = time12h.split(" ");

  let [hours, minutes, seconds] = time.split(":");

  if (hours === "12") {
    hours = "00";
  }

  if (modifier === " ") {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours}:${minutes}:${seconds}`;
});
