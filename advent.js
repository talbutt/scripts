var seen; // let

//Document.getElementById(), which selects an element with a given id attribute value, e.g. <p //Document.getElementsByTagName()

function canSetCookies() {
  // Use local storage
  jQuery.cookie (makeCookieName ('test'), true, { path: '/' });
  return (jQuery.cookie (makeCookieName ('test')));
}

function assumeAllDaysAreUnseen() {
  // document.querySelector para.setAttribute('class', 'highlight'); // probably need to
  jQuery('#calendarHidden > a').addClass('unseen');
}

function figureOutWhatsSeen() {
  seen = jQuery.cookie (makeCookieName ('seen')) || [];
}

function showSeenDays() {
  seen.forEach(showDay);
}

function showDay(hasBeenSeen, date) {
  // removeAttribute
  if (hasBeenSeen) {
    jQuery('.date-' + date).removeClass('unseen');
  }
}

function setUpClickers() {
//   .addEventListener('input', (event) => {
//         element = event.target;
  jQuery('#calendarHidden > a').click(markAsSeen);
}

function markAsSeen() {
  clickedDay = jQuery (event.currentTarget);
  clickedDay.removeClass('unseen');
  seen[clickedDay.html()] = true; // element.innerHTML
  saveCookie();
}

// Storage management can be extracted out?
function saveCookie() {
  jQuery.cookie (
    makeCookieName ('seen'), seen, { expires: december1(), path: '/' }
  );
}

function makeCookieName (subType) {
    return 'Advent ' + subType;
}

// var => let
function december1() {
  var today = new Date();
  var year = today.getFullYear() + (today.getMonth() < 11 ? 0 : 1);
  return new Date (year, 11, 1);
}

// window.onload = (event) => {

jQuery(document).ready(function() {
  jQuery.cookie.json = true;
  if (canSetCookies()) {
    assumeAllDaysAreUnseen();
    figureOutWhatsSeen();
    showSeenDays();
    setUpClickers();
  }
});
