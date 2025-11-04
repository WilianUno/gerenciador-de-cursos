const data = {
    users: [
        {
            id: 1,
            username: 'admin',
            password: 'admin123',
            tipo: 'admin',
            nome: 'Administrador'
        },
        {
            id: 2,
            username: 'prof',
            password: 'prof123',
            tipo: 'professor',
            professorId: 1
        }
    ],

    professores: [
        {
            id: 1,
            nome: 'João Silva',
            email: 'joao.silva@unochapeco.edu.br',
            especialidade: 'Desenvolvimento Web',
            telefone: '(49) 99999-9999'
        },
        {
            id: 2,
            nome: 'Isadora Pompeo',
            email: 'isadora.pompeo@unochapeco.edu.br',
            especialidade: 'Banco de Dados',
            telefone: '(49) 88888-8888'
        }
    ],

    cursos: [
        {
            id: 1,
            nome: 'Desenvolvimento Web',
            descricao: 'Aprenda a criar sites e aplicações web modernas.',
            professorId: 1,
            cargaHoraria: 60,
            vagas: 30,
            vagasOcupadas: 2,
            periodo: '2024/1'
        },
        {
            id: 2,
            nome: 'Banco de Dados',
            descricao: 'Introdução ao design e gerenciamento de bancos de dados.',
            professorId: 2,
            cargaHoraria: 45,
            vagas: 25,
            vagasOcupadas: 1,
            periodo: '2024/1'
        }
    ],

    alunos: [
        {
            id: 1,
            nome: 'Pedro Santos',
            email: 'pedro.santos@unochapeco.edu.br',
            matricula: '2024001',
            curso: 'Ciencias da Computação'
        },
        {
            id: 2,
            nome: 'Ana Oliveira',
            email: 'ana.oliveira@unochapeco.edu.br',
            matricula: '2024002',
            curso: 'Engenharia de Software'
        }
    ],

    matriculas: [
        {
            id: 1,
            alunoId: 1,
            cursoId: 1,
            dataMatricula: '2024-03-01',
            status: 'ativo'
        },
        {
            id: 2,
            alunoId: 2,
            cursoId: 1,
            dataMatricula: '2024-03-01',
            status: 'ativo'
        }
    ],

    nextIds: {
        userId: 3,
        professorId: 3,
        cursoId: 3,
        alunoId: 3,
        matriculaId: 3
    }   
};


module.exports = data;