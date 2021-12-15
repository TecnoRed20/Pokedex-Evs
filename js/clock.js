function startClock() {
  let date = new Date();
  let h = date.getHours();
  h = checkTime(h);
  let m = date.getMinutes();
  m = checkTime(m);
  let s = date.getSeconds();
  s = checkTime(s);

  document.getElementById('clock').innerHTML = (h + " : " + m + " : " + s);
  setTimeout(function(){ startClock() }, 1000);
}
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

startClock()