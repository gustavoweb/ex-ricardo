document.getElementById('logoutLink').addEventListener('click', function(event) {
    event.preventDefault(); // Evita o comportamento padrão do link

    // Remover o token de autenticação armazenado
    localStorage.removeItem('authToken');

    // Redirecionar para a página de login
    window.location.href = '/login.html';

    // Opcional: Exibir uma mensagem de confirmação
    alert('Você foi desconectado.');
});
