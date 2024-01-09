
const minuteHand = document.getElementById('minute');
const hourHand = document.getElementById('hour');

function setClockHands() {
    // Create a new Date object
    let now = new Date();

    // Get the current hour and minute
    let currentHour = now.getHours();
    let currentMinute = now.getMinutes();

    //convert hour to 12hr format for analog display
    let currentHourA = convertTo12hr(currentHour);

    //Convert Minutes and Hours into appropiate deg 
    //html divs start horizontal so phase shift of 90 is required
    let minuteTurn = (currentMinute * 6) - 90;
    let hourTurn = (currentHourA * 30) - 90;

    minuteHand.style.transform = ['rotate(', minuteTurn, 'deg)'].join('');
    hourHand.style.transform = ['rotate(', hourTurn, 'deg)'].join('');

    //only update hands every 10 seconds for performance
    setTimeout(setClockHands, 10000);
}

//call function when loaded
window.onload = () => {
    setClockHands();
    setSize();
  };


//perform modulo logic to change 24 hour time to 12 hour time
function convertTo12hr(hour) {
    if (hour > 12) hour %= 12;
    else if (hour === 0) hour = 12;
    return hour;
}