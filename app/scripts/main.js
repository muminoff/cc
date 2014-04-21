$(document).ready(function() {
  validateHandler();
  focusToNameInput();
  // getAvailablePlans();
  listDeselect();
  // formSubmitHandler();
});

function listDeselect() {
  $('#country').prop('selectedIndex', -1);
}

function validateHandler() {
  var metrics = [
    ['#plan', 'presence', 'Required field'],
    ['#manager', 'presence', 'Required field'],
    ['#company', 'presence', 'Required field'],
    ['#email', 'presence', 'Required field'],
    ['#country', 'presence', 'Required field'],
    ['#phone', 'presence', 'Required field'],
    ['#users', 'presence', 'Required field'],
    ['#amount', 'presence', 'Required field'],
    ['#domain', 'presence', 'Required field'],
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

// function getAvailablePlans() {
//   $.getJSON('http://121.254.175.67:3456/plans', function(data) {
//     $.each(data.available_plans, function(key, val) {
//       var plan = getURLParameter('plan'),
//           selected = "";
//       if(val.name===plan)selected="selected";
//       $('#plan').append('<option value="' + val.desc + '" ' + selected + '>' + val.desc + '</option>');
//     });
//   });
// }

function formSubmitHandler() {
  $('#purchase').bind('submit', function(e) {
    var formData = $(this).serialize();
    console.log(formData);
    e.preventDefault();
    $.ajax({
      url: "http://paypal.mofficesuite.com:3456/create",
      type: "POST",
      dataType: "json",
      data: formData,
      success: function(resp){
        if(resp.result) {
          var redirectUrl;
          for(var i=0; i<resp.payment.links.length; i++) {
            var link = resp.payment.links[i];
            if(link.method === 'REDIRECT') {
              redirectUrl = link.href;
            }
          }
          window.location.href= redirectUrl;
        } else {
        }
      },
      error: function(err){
        console.log(err);
      }
  });
});
}
