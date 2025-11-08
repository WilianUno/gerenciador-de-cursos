document.addEventListener('DOMContentLoaded', async () => {
    let currentUser; // Vamos guardar o usuário logado aqui

    try {
        const response = await fetch('/current-user'); 
        if (!response.ok) {
            window.location.href = '/login'; 
            return;
        }
        
        const result = await response.json();
        currentUser = result.user; // Guarda o usuário
        
    } catch (error) {
        window.location.href = '/login';
        return;
    }

    await carregarCursos();

    const btnAbrirModal = document.getElementById('btn-abrir-modal-curso');
    const modal = document.getElementById('modal-curso');
    const btnFecharModal = document.getElementById('btn-fechar-modal-curso');
    const formCriarCurso = document.getElementById('form-criar-curso');
    const modalErrorMessage = document.getElementById('modal-error-message');

    if (currentUser.tipo === 'professor') {
        btnAbrirModal.style.display = 'block';

        btnAbrirModal.onclick = () => {
            modal.style.display = 'block';
        }

        btnFecharModal.onclick = () => {
            modal.style.display = 'none';
        }

        
        formCriarCurso.addEventListener('submit', async (e) => {
            e.preventDefault(); // Impede o recarregamento da página
            
            modalErrorMessage.style.display = 'none'; 

            const titulo = document.getElementById('titulo').value;
            const descricao = document.getElementById('descricao').value;

            try {
                const response = await fetch('/cursos/api', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ titulo, descricao })
                });

                if (response.ok) { // Sucesso (201 Created)
                    formCriarCurso.reset();
                    modal.style.display = 'none';
                    await carregarCursos(); 
                } else {
                    const errorData = await response.json();
                    modalErrorMessage.textContent = errorData.message || 'Erro ao criar curso.';
                    modalErrorMessage.style.display = 'block';
                }

            } catch (error) {
                console.error('Erro ao enviar formulário:', error);
                modalErrorMessage.textContent = 'Erro de conexão.';
                modalErrorMessage.style.display = 'block';
            }
        });
    }
});

async function carregarCursos() {
    const container = document.getElementById('cards-container-cursos');
    if (!container) return; 

    try {
        const response = await fetch('/cursos/api');
        if (!response.ok) {
            container.innerHTML = '<p>Erro ao carregar os cursos.</p>';
            return;
        }
        const cursos = await response.json();
        
        container.innerHTML = ''; 

        if (cursos.length === 0) {
            container.innerHTML = '<p>Nenhum curso encontrado.</p>';
            return;
        }

        cursos.forEach(curso => {
            const cardHTML = `
                <a href="#" class="card">
                    <h3>${curso.titulo || 'Nome do Curso'}</h3>
                    <p>${curso.descricao || 'Descrição não disponível.'}</p>
                    <p><small>Professor: ${curso.nomeProfessor || 'N/D'}</small></p>
                    <button class="btn">Ver Detalhes</button>
                </a>
            `;
            container.innerHTML += cardHTML;
        });

    } catch (error) {
        console.error('Erro ao carregar cursos:', error);
        container.innerHTML = '<p>Erro de conexão ao buscar cursos.</p>';
    }
}