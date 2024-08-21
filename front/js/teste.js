window.onload = function() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        alert('Você precisa estar logado para acessar esta página.');
        window.location.href = '/login.html';
    }

};