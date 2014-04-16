$(document).ready(function() {
  validateHandler();
  focusToNameInput();
  getAvailablePlans();
  listDeselect();
});

function listDeselect() {
  $('#country').prop('selectedIndex', -1);
}

function validateHandler() {
  var metrics = [
    ['#plan', 'presence', 'Required'],
    ['#manager', 'presence', 'Required'],
    ['#company', 'presence', 'Required'],
    ['#email', 'presence', 'Required'],
    ['#country', 'presence', 'Required'],
    ['#phone', 'presence', 'Required'],
    ['#users', 'presence', 'Required'],
    ['#amount', 'presence', 'Required'],
    ['#domain', 'presence', 'Required'],
    ['#users', 'min-num:1', 'Minimum 1 user'],
    ['#users', 'max-num:999', 'Maximum 999 users'],
    ['#users', 'integer', 'Numbers only'],
    ['#email', 'email', 'Must be a valid email'],
    ['#amount', 'min-num:1', 'Min. payment 1$'],
  ];
  var options = {
    'delay': 2000,
    'helpSpanDisplay': 'help-block',
    'groupSelector': '.input-group',
    'groupClass': 'warning'
  }
  $("#purchase").nod(metrics, options).on('submit');
}

function focusToNameInput() {
  $('#manager').focus();
}

function getURLParameter(sParam) 
{
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split('&');
  for (var i = 0; i < sURLVariables.length; i++)
  {
    var sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] == sParam)
    {
      return sParameterName[1];
    }
  }
}

function getAvailablePlans() {
  $.getJSON('http://121.254.175.67:3456/plans', function(data) {
    $.each(data.available_plans, function(key, val) {
      var plan = getURLParameter('plan'),
          selected = "";
      if(val.name===plan)selected="selected";
      $('#plan').append('<option value="' + val.name + '" ' + selected + '>' + val.desc + '</option>');
    });
  });
}
