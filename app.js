const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

// Configuração do MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'projeto2'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conectado ao MySQL...');
});

// Middleware para fazer o parse do body das requisições
app.use(cors());
app.use(bodyParser.json());

// Rota para criar um usuário
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.post('/usuarios', async (req, res) => {
    const { user, name, email, pass, type } = req.body;

    try {
        // Hash da senha usando bcrypt
        const hashedPassword = await bcrypt.hash(pass, saltRounds);

        const INSERT_USER_QUERY = `INSERT INTO usuarios (usu_usuario, usu_nome, usu_email, usu_senha, usu_tipo) VALUES (?, ?, ?, ?, ?)`;
        db.query(INSERT_USER_QUERY, [user, name, email, hashedPassword, type], (err, result) => {
            if (err) {
                console.error('Erro ao criar usuário:', err); // Log de erro para depuração
                res.status(500).send('Erro ao criar usuário');
            } else {
                res.status(201).send('Usuário criado com sucesso');
            }
        });
    } catch (error) {
        console.error('Erro ao processar a senha:', error); // Log de erro para depuração
        res.status(500).send('Erro ao processar a senha');
    }
});


// Rota para buscar todos os usuários
app.get('/usuarios', (req, res) => {
    const SELECT_ALL_USERS_QUERY = 'SELECT * FROM usuarios';
    db.query(SELECT_ALL_USERS_QUERY, (err, result) => {
        if (err) {
            res.status(500).send('Erro ao buscar usuários');
        } else {
            res.status(200).json(result);
        }
    });
});

// Rota para buscar um usuário por ID
app.get('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const SELECT_USER_BY_ID_QUERY = 'SELECT * FROM usuarios WHERE usu_id = ?';
    db.query(SELECT_USER_BY_ID_QUERY, [id], (err, result) => {
        if (err) {
            res.status(500).send('Erro ao buscar usuário');
        } else {
            res.status(200).json(result[0]);
        }
    });
});

// Rota para atualizar um usuário por ID
app.put('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { user, name, email, pass, type } = req.body;
    const UPDATE_USER_QUERY = `UPDATE usuarios SET usu_usuario=?, usu_nome=?, usu_email=?, usu_senha=?, usu_tipo=? WHERE usu_id=?`;
    db.query(UPDATE_USER_QUERY, [user, name, email, pass, type, id], (err, result) => {
        if (err) {
            res.status(500).send('Erro ao atualizar usuário');
        } else {
            res.status(200).send('Usuário atualizado com sucesso');
        }
    });
});

// Rota para deletar um usuário por ID
app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const DELETE_USER_QUERY = `DELETE FROM usuarios WHERE usu_id=?`;

    db.query(DELETE_USER_QUERY, [id], (err, result) => {
        if (err) {
            console.error('Erro ao deletar usuário:', err); // Log detalhado do erro
            res.status(500).send('Erro ao deletar usuário');
        } else if (result.affectedRows === 0) {
            // Se nenhum registro foi afetado, significa que o usuário não foi encontrado
            res.status(404).send('Usuário não encontrado');
        } else {
            console.log(`Usuário com ID ${id} deletado com sucesso`);
            res.send('Usuário deletado com sucesso');
        }
    });
});

// Chave secreta para o JWT (geração aut)
const crypto = require('crypto');
const jwtSecret = crypto.randomBytes(32).toString('hex');

//rota LOGIN
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log('Username:', username);
    console.log('Password:', password);

    const query = 'SELECT * FROM usuarios WHERE usu_usuario = ?';
    db.query(query, [username], (err, results) => {
        if (err) {
            console.error('Erro ao buscar no banco de dados:', err);
            return res.status(500).send('Erro no servidor');
        }

        if (results.length === 0) {
            console.log('Usuário não encontrado');
            return res.status(401).send('Credenciais inválidas');
        }

        console.log('Usuário encontrado:', results[0]);

        bcrypt.compare(password, results[0].usu_senha, (err, match) => {
            if (err) {
                console.error('Erro ao comparar senha:', err);
                return res.status(500).send('Erro no servidor');
            }

            if (!match) {
                console.log('Senha incorreta');
                return res.status(401).send('Credenciais inválidas');
            }

            console.log('Login bem-sucedido');
            const token = jwt.sign({ username }, jwtSecret);
            res.json({ token });
        });
    });
});


// Middleware para verificar o token JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Token não fornecido' });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded; // Anexa os dados do usuário ao request
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido ou expirado' });
    }
};

// Rota protegida (exemplo)
app.get('/teste', verifyToken, (req, res) => {
    res.json({ message: `Bem-vindo, ${req.user.username}! Este é o seu painel.` });
});





// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
