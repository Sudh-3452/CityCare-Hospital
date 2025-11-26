// Simple in-memory data
let patients = [];
let doctors = [];
let appointments = [];

// Change section
function showSection(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}


// Update dashboard numbers
function updateDashboard() {
  document.getElementById('totalPatients').textContent = patients.length;
  document.getElementById('totalDoctors').textContent = doctors.length;
  document.getElementById('totalAppointments').textContent = appointments.length;
}

// Render tables
function renderPatients() {
  const tbody = document.getElementById('patientTableBody');
  tbody.innerHTML = '';
  patients.forEach((p, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${p.name}</td>
      <td>${p.age}</td>
      <td>${p.disease}</td>
    `;
    tbody.appendChild(tr);
  });
  updateDashboard();
}

function renderDoctors() {
  const tbody = document.getElementById('doctorTableBody');
  tbody.innerHTML = '';
  doctors.forEach((d, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${d.name}</td>
      <td>${d.speciality}</td>
    `;
    tbody.appendChild(tr);
  });
  updateDashboard();
}

function renderAppointments() {
  const tbody = document.getElementById('appointmentTableBody');
  tbody.innerHTML = '';
  appointments.forEach((a, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${a.patient}</td>
      <td>${a.doctor}</td>
      <td>${a.date}</td>
      <td>${a.time}</td>
    `;
    tbody.appendChild(tr);
  });
  updateDashboard();
}

// Forms
document.getElementById('patientForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('patientName').value;
  const age = document.getElementById('patientAge').value;
  const disease = document.getElementById('patientDisease').value;

  patients.push({ name, age, disease });
  renderPatients();
  this.reset();
});

document.getElementById('doctorForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('doctorName').value;
  const speciality = document.getElementById('doctorSpeciality').value;

  doctors.push({ name, speciality });
  renderDoctors();
  this.reset();
});

document.getElementById('appointmentForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const patient = document.getElementById('appointmentPatient').value;
  const doctor = document.getElementById('appointmentDoctor').value;
  const date = document.getElementById('appointmentDate').value;
  const time = document.getElementById('appointmentTime').value;

  appointments.push({ patient, doctor, date, time });
  renderAppointments();
  this.reset();
});

// Chatbox logic
function toggleChat() {
  const chatbox = document.getElementById('chatbox');
  if (chatbox.style.display === 'flex') {
    chatbox.style.display = 'none';
  } else {
    chatbox.style.display = 'flex';
  }
}

document.getElementById('chatForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, 'user');
  input.value = '';

  // Simple bot replies
  setTimeout(() => {
    let reply = "Thank you for your message. Our staff will contact you soon.";
    const lower = text.toLowerCase();
    if (lower.includes('appointment')) {
      reply = "You can book an appointment in the Appointments section on the left menu.";
    } else if (lower.includes('emergency')) {
      reply = "For emergencies, please call the hospital emergency number immediately.";
    } else if (lower.includes('doctor')) {
      reply = "Doctor details are available in the Doctors section.";
    }
    addMessage(reply, 'bot');
  }, 500);
});

function addMessage(text, type) {
  const container = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.classList.add('message', type);
  div.textContent = text;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

// Initial
showSection('dashboard');
updateDashboard();