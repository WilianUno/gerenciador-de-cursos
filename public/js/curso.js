document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/current-user'); 
        if (response.ok) {
            carregarCursos();
        } else {
            window.location.href = '/login'; 
        }
    } catch (error) {
        window.location.href = '/login';
    }
});

async function carregarCursos() {
    const container = document.getElementById('cards-container-cursos');
    if (!container) return; // Segurança

    try {
        const response = await fetch('/api/cursos');
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