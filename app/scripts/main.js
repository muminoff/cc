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
    ['#users', 'integer', 'Numbers only'],
    ['#email', 'email', 'Must be a valid email'],
    ['#amount', 'min-num:1', 'Min. payment 1$'],
  ];
  var options = {
    // 'delay': 2000,
    'helpSpanDisplay': 'help-block',
    'groupSelector': '.input-group',
    'groupClass': 'warning'
  }
  $("#purchase").nod(metrics, options);
}

function focusToNameInput() {
  $('#manager').focus();
}
