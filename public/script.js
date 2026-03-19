// Scroll function
function scrollToSection(id){
 document.getElementById(id).scrollIntoView({behavior:'smooth'});
}

// Emergency call
function callEmergency(){
 alert('Calling Emergency: 9876543210');
}

// Form handling
const form = document.getElementById('appointmentForm');
form.addEventListener('submit', function(e){
 e.preventDefault();
 const name = document.getElementById('name').value;
 document.getElementById('msg').innerText = `Thank you ${name}, your appointment is booked!`;
 form.reset();
});
