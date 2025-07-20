function sayHi() {
  alert("bruh idk");
  window.location.href = "https://en.wikipedia.org/wiki/2025_Pacific_typhoon_season";
}

const today = new Date();
const options = { year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = today.toLocaleDateString('en-US', options);
document.getElementById("date").textContent = "Today is " + formattedDate;
