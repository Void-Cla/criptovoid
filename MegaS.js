// Caminho para o arquivo JSON no GitHub
const jsonUrl = 'https://raw.githubusercontent.com/Void-Cla/criptovoid/main/data.json';

// Função para carregar o JSON com os resultados anteriores da Mega Sena
const carregarResultadosAnteriores = async () => {
    try {
        const response = await fetch(jsonUrl); // Usando fetch para carregar o JSON do GitHub
        if (!response.ok) {
            throw new Error(`Erro ao carregar JSON. Status: ${response.status}`);
        }
        const data = await response.json();
        return data.resultados || []; // Assumindo que seus resultados estejam em uma propriedade chamada "resultados"
    } catch (error) {
        console.error('Erro ao carregar resultados anteriores:', error);
        return []; // Retorna um array vazio em caso de erro
    }
};

// Função para verificar se um jogo gerado é único em relação aos jogos anteriores
const jogoEhUnico = (jogoGerado, resultadosAnteriores) => {
    for (let jogo of resultadosAnteriores) {
        if (jogo.every(num => jogoGerado.includes(num))) {
            return false; // Jogo gerado não é único
        }
    }
    return true; // Jogo gerado é único
};

// Função para gerar números únicos da Mega Sena que não foram jogados anteriormente
const gerarMegaSenaUnica = async (resultadosAnteriores) => {
    try {
        let numeros = [];
        do {
            numeros = [];
            while (numeros.length < 6) {
                const num = Math.floor(Math.random() * 60) + 1; // Gera um número aleatório entre 1 e 60
                if (!numeros.includes(num)) {
                    numeros.push(num);
                }
            }
        } while (!jogoEhUnico(numeros, resultadosAnteriores));

        return numeros.sort((a, b) => a - b); // Ordena os números em ordem crescente
    } catch (error) {
        console.error('Erro ao gerar Mega Sena única:', error);
        return [];
    }
};

// Função para atualizar o HTML com o resultado
const atualizarHTML = (numeros) => {
    const ulResultado = document.getElementById('resultado');
    ulResultado.innerHTML = '';

    numeros.forEach(num => {
        const li = document.createElement('li');
        li.textContent = `Número: ${num}`;
        ulResultado.appendChild(li);
    });
};

// Evento de clique no botão para gerar a Mega Sena única
document.getElementById('gerarJogo').addEventListener('click', async () => {
    const resultadosAnteriores = await carregarResultadosAnteriores();
    const numeros = await gerarMegaSenaUnica(resultadosAnteriores);
    atualizarHTML(numeros);
});
