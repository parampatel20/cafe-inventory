const _host = window.location.hostname;
const API = 'http://localhost:5001/api';
const APP = window.location.origin;

function getToken() { return localStorage.getItem('token'); }
function getUser()  { return JSON.parse(localStorage.getItem('user') || '{}'); }

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.replace(APP + '/index.html');
}

async function apiFetch(endpoint, method = 'GET', body = null, isForm = false) {
  const headers = { Authorization: `Bearer ${getToken()}` };
  if (!isForm) headers['Content-Type'] = 'application/json';

  const options = { method, headers };
  if (body) options.body = isForm ? body : JSON.stringify(body);

  try {
    const res = await fetch(API + endpoint, options);
    return res.json();
  } catch (err) {
    return { message: 'Server connection failed' };
  }
}

function checkAuth() {
  if (!getToken()) window.location.replace(APP + '/index.html');
}

function checkAdmin() {
  const user = getUser();
  if (user.role !== 'admin') {
    alert('Admin access only');
    window.location.replace(APP + '/pages/dashboard.html');
  }
}

function showAlert(id, message, type = 'error') {
  const el = document.getElementById(id);
  if (!el) return;
  el.className = `alert alert-${type}`;
  el.textContent = message;
  el.style.display = 'block';
  setTimeout(() => el.style.display = 'none', 3000);
}