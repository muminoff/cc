$(document).ready(function() {
  countryListDeselect();
  validateHandler();
  focusToNameInput();
});

function countryListDeselect() {
  $('#country').prop('selectedIndex', -1);
}

function validateHandler() {
  var metrics = [
    ['input', 'presence', 'Required'],
    ['#country', 'presence', 'Required'],
    ['#users', 'min-num:1', 'Minimum 1 user'],
    ['#users', 'max-num:999', 'Maximum 999 users'],
    ['#email', 'email', 'Must be a valid email'],
    ['#amount', 'min-num:1', 'Min. payment 1$'],
  ];
  $("#purchase").nod(metrics);
}

function focusToNameInput() {
  $('#manager').focus();
}
