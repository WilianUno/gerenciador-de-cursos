const courseData = {
    'sistemas-de-informacao': {
        title: 'Sistemas de Informação',
        description: 'Capacita profissionais para analisar, projetar, desenvolver e gerenciar sistemas de informação, softwares e bancos de dados, otimizando processos em organizações de diversos setores.',
        careers: [
            'Analista de Sistemas',
            'Desenvolvedor de Software',
            'Administrador de Banco de Dados',
            'Consultor de TI',
            'Gerente de Projetos de TI',
            'Arquiteto de Soluções'
        ]
    },
    'ciencia-da-computacao': {
        title: 'Ciência da Computação',
        description: 'Explora os fundamentos teóricos da computação, desenvolvendo habilidades para criar algoritmos, linguagens de programação e sistemas complexos, além de pesquisar novas tecnologias.',
        careers: [
            'Cientista da Computação',
            'Pesquisador',
            'Engenheiro de Software',
            'Arquiteto de Software',
            'Especialista em Inteligência Artificial/Machine Learning',
            'Docente'
        ]
    },
    'engenharia-de-software': {
        title: 'Engenharia de Software',
        description: 'Foca na aplicação de princípios de engenharia para o desenvolvimento de software de alta qualidade, desde o planejamento e design até a implementação, teste e manutenção.',
        careers: [
            'Engenheiro de Software',
            'Arquiteto de Software',
            'Gerente de Projetos de Software',
            'Engenheiro de Qualidade de Software (QA)',
            'DevOps Engineer',
            'Analista de Requisitos'
        ]
    },
    'analise-e-desenvolvimento-de-sistemas': {
        title: 'Análise e Desenvolvimento de Sistemas',
        description: 'Forma profissionais aptos a identificar necessidades, analisar e projetar sistemas de informação e desenvolver soluções tecnológicas eficientes para empresas.',
        careers: [
            'Analista Desenvolvedor',
            'Programador',
            'Analista de Negócios',
            'Desenvolvedor Web/Mobile',
            'Administrador de Redes',
            'Suporte Técnico'
        ]
    },
    'engenharia-civil': {
        title: 'Engenharia Civil',
        description: 'Profissionais que planejam, projetam, gerenciam e executam obras e infraestruturas, como edifícios, pontes, estradas, sistemas de saneamento e transportes.',
        careers: [
            'Engenheiro de Obras',
            'Projetista Estrutural',
            'Gerente de Projetos',
            'Consultor de Engenharia',
            'Fiscal de Obras',
            'Urbanista'
        ]
    },
    'direito': {
        title: 'Direito',
        description: 'Forma profissionais que interpretam e aplicam as leis, defendendo direitos e garantindo a justiça. O curso desenvolve raciocínio crítico, argumentação e conhecimento jurídico.',
        careers: [
            'Advogado (em áreas como civil, penal, trabalhista, empresarial, etc.)',
            'Juiz, promotor ou defensor público (mediante concurso)',
            'Delegado de polícia',
            'Assessor jurídico ou consultor legal',
            'Servidor público em órgãos da Justiça',
            'Professor ou pesquisador na área jurídica'
        ]
    },
    'administracao': {
        title: 'Administração',
        description: 'Capacita profissionais para gerir empresas, pessoas e recursos, tomando decisões estratégicas para o sucesso dos negócios. O administrador atua em qualquer tipo de organização, pública ou privada.',
        careers: [
            'Gestor empresarial ou executivo',
            'Analista financeiro / de marketing / de recursos humanos',
            'Consultor de negócios',
            'Empreendedor',
            'Gerente de projetos',
            'Servidor público em cargos administrativos'
        ]
    },
    'enfermagem': {
        title: 'Enfermagem',
        description: 'Prepara profissionais para promover, proteger e recuperar a saúde de indivíduos, famílias e comunidades, atuando em hospitais, clínicas, unidades de saúde e domicílios.',
        careers: [
            'Enfermeiro Assistencial',
            'Enfermeiro Obstetra',
            'Enfermeiro Pediátrico',
            'Enfermeiro de Saúde Pública',
            'Gestor de Enfermagem',
            'Pesquisador em Enfermagem'
        ]
    },
    'arquitetura-e-urbanismo': {
        title: 'Arquitetura e Urbanismo',
        description: 'Forma profissionais que planejam e projetam espaços físicos, unindo funcionalidade, estética e sustentabilidade. O arquiteto trabalha desde o design de interiores até o planejamento urbano.',
        careers: [
            'Arquiteto de edificações residenciais e comerciais',
            'Urbanista (planejamento de cidades e espaços públicos)',
            'Designer de interiores',
            'Paisagista',
            'Arquiteto de restauro ou patrimônio histórico',
            'Gerente de obras e projetos'
        ]
    },
    'educacao-fisica': {
        title: 'Educação Física',
        description: 'Capacita profissionais para promover a saúde e o bem-estar através da prática de atividades físicas, esporte e lazer, desenvolvendo programas personalizados e atuando em diversas áreas.',
        careers: [
            'Personal Trainer',
            'Professor de Educação Física (escolas, academias)',
            'Preparador Físico',
            'Treinador Esportivo',
            'Gestor de Academias/Clubes',
            'Fisiologista do Exercício'
        ]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cadastroForm');
    const email = document.getElementById('email');
    const cpfInput = document.getElementById('cpf');
    const telInput = document.getElementById('telefone');
    const usuario = document.getElementById('usuario');

    if (cpfInput) {
        cpfInput.addEventListener('input', () => {
            let value = cpfInput.value.replace(/\D/g, '');
            if (value.length > 3 && value.length <= 6)
                value = value.replace(/(\d{3})(\d+)/, '$1.$2');
            else if (value.length > 6 && value.length <= 9)
                value = value.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
            else if (value.length > 9)
                value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
            cpfInput.value = value;
        });
    }

    if (telInput) {
        telInput.addEventListener('input', () => {
            let v = telInput.value.replace(/\D/g, '');
            if (v.length > 2 && v.length <= 7)
                v = v.replace(/(\d{2})(\d+)/, '($1) $2');
            else if (v.length > 7)
                v = v.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
            telInput.value = v;
        });
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            if (usuario && usuario.value.length < 4) {
                alert("O nome de usuário deve ter pelo menos 4 caracteres.");
                return;
            }

            alert("Cadastro realizado com sucesso!");
            form.reset();
        });
    }

    const urlParams = new URLSearchParams(window.location.search);
    const courseKey = urlParams.get('course');

    console.log('courseKey na course-details.html:', courseKey);
    console.log('courseData[courseKey]:', courseData[courseKey]);

    const courseTitleElement = document.getElementById('course-title');
    const courseDescriptionElement = document.getElementById('course-description');
    const courseCareersList = document.getElementById('course-careers');
    const enrollButton = document.getElementById('enroll-button');

    if (courseKey && courseData[courseKey]) {
        const course = courseData[courseKey];
        if (courseTitleElement) {
            courseTitleElement.textContent = course.title;
        }
        if (courseDescriptionElement) {
            courseDescriptionElement.textContent = course.description;
        }
        if (courseCareersList) {
            courseCareersList.innerHTML = '';
            const careersTitle = document.createElement('h3');
            careersTitle.textContent = 'Carreiras possíveis:';
            courseCareersList.appendChild(careersTitle);

            course.careers.forEach(career => {
                const listItem = document.createElement('li');
                listItem.textContent = career;
                courseCareersList.appendChild(listItem);
            });
        }

        if (enrollButton) {
            enrollButton.href = `form.html?course=${encodeURIComponent(course.title)}`;
        }
    }

    if (window.location.pathname.includes('form.html')) {
        const courseSelect = document.getElementById('curso');
        const urlParamsForm = new URLSearchParams(window.location.search);
        const selectedCourseTitle = urlParamsForm.get('course');

        if (courseSelect && selectedCourseTitle) {
            for (let i = 0; i < courseSelect.options.length; i++) {
                if (courseSelect.options[i].textContent === selectedCourseTitle) {
                    courseSelect.value = courseSelect.options[i].value;
                    break;
                }
            }
        }
    }
});
