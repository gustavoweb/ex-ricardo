const userForm = document.getElementById('userForm');
const userTable = document.getElementById('userTable').querySelector('tbody');

// Função para listar usuários
async function fetchUsers() {
    const response = await fetch('http://localhost:3000/usuarios');
    const users = await response.json();

    userTable.innerHTML = '';
    users.forEach(user => {
        const row = userTable.insertRow();
        row.innerHTML = `
            <td>${user.usu_id}</td>
            <td>${user.usu_usuario}</td>
            <td>${user.usu_nome}</td>
            <td>${user.usu_email}</td>
            <td>${user.usu_senha}</td>
            <td>${user.usu_tipo}</td>
            <td>
                <button onclick="editUser(${user.usu_id})">Editar</button>
                <button onclick="deleteUser(${user.usu_id})">Excluir</button>
            </td>
        `;
    });
}

// Função para criar ou atualizar usuário
userForm.onsubmit = async (e) => {
    e.preventDefault();

    const userId = document.getElementById('userId').value;
    const name = document.getElementById('name').value;
    const user = document.getElementById('user').value;
    const email = document.getElementById('email').value;
    const pass = document.getElementById('pass').value;
    const type = document.getElementById('type').value;

    const payload = { name, user, email, pass, type };

    if (userId) {
        await fetch(`http://localhost:3000/usuarios/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
    } else {
        await fetch('http://localhost:3000/usuarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
    }

    userForm.reset();
    fetchUsers();
};

// Função para editar usuário
async function editUser(id) {
    const response = await fetch(`http://localhost:3000/usuarios/${id}`);
    const user = await response.json();

    document.getElementById('userId').value = user.usu_id;
    document.getElementById('name').value = user.usu_nome;
    document.getElementById('user').value = user.usu_usuario;
    document.getElementById('email').value = user.usu_email;
    document.getElementById('pass').value = user.usu_senha;
    document.getElementById('type').value = user.usu_tipo;
    console.log(id);
}

// Função para deletar usuário
async function deleteUser(id) {
    await fetch(`http://localhost:3000/usuarios/${id}`, {
        method: 'DELETE'
    });

    fetchUsers();
}

// Carrega os usuários ao iniciar a página
fetchUsers();
