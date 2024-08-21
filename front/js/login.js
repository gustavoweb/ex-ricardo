document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        alert('Login bem-sucedido');
        document.getElementById('logoutButton').style.display = 'block';
    } else {
        alert('Login falhou');
    }
});

document.getElementById('logoutButton').addEventListener('click', function() {
    localStorage.removeItem('token');
    alert('Logout realizado');
    this.style.display = 'none';
});