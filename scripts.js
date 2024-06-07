document.addEventListener('DOMContentLoaded', function () {
    // Navegação entre seções
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelectorAll('.content').forEach(content => {
                content.style.display = 'none';
            });
            const section = document.querySelector(this.getAttribute('href'));
            section.style.display = 'block';
        });
    });

    // Evento de scroll para o rodapé
    document.addEventListener('scroll', function () {
        const footer = document.getElementById('footer');
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) { // Ajuste para garantir a visibilidade do rodapé
            footer.style.visibility = 'visible';
            footer.style.opacity = '1';
        } else {
            footer.style.visibility = 'hidden';
            footer.style.opacity = '0';
        }
    });

    // Carregar Google Charts
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);

    document.getElementById('currency-select').addEventListener('change', drawChart);

    // Função para buscar os preços das criptomoedas
    async function fetchCryptoPrices(currency) {
        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=bitcoin,ethereum,litecoin&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
            const data = await response.json();
            const prices = data.reduce((acc, coin) => {
                acc[coin.id] = coin.current_price;
                return acc;
            }, {});
            return prices;
        } catch (error) {
            console.error('Erro ao buscar os preços das criptomoedas:', error);
            return null;
        }
    }

    // Função para buscar os preços históricos dos últimos 30 dias
    async function fetchHistoricalPrices(coin, currency) {
        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=30`);
            const data = await response.json();
            return data.prices.map(price => [new Date(price[0]), price[1]]);
        } catch (error) {
            console.error(`Erro ao buscar os preços históricos de ${coin}:`, error);
            return [];
        }
    }

    // Função para desenhar o gráfico
async function drawChart() {
    const currency = document.getElementById('currency-select').value;
    const cryptoPrices = await fetchCryptoPrices(currency);
    if (!cryptoPrices) {
        return;
    }

    const bitcoinPrices = await fetchHistoricalPrices('bitcoin', currency);
    const ethereumPrices = await fetchHistoricalPrices('ethereum', currency);
    const litecoinPrices = await fetchHistoricalPrices('litecoin', currency);

    const data = new google.visualization.DataTable();
    data.addColumn('date', 'Data');
    data.addColumn('number', 'Bitcoin');
    data.addColumn('number', 'Ethereum');
    data.addColumn('number', 'Litecoin');

    const mergedData = [];
    for (let i = 0; i < 30; i++) {
        mergedData.push([
            bitcoinPrices[i][0],
            bitcoinPrices[i][1],
            ethereumPrices[i][1],
            litecoinPrices[i][1]
        ]);
    }

    data.addRows(mergedData);

    const options = {
        title: 'Preços das Criptomoedas nos Últimos 30 Dias',
        backgroundColor: '#000000', // Fundo preto
        titleTextStyle: {
            color: '#ffffff'
        },
        hAxis: {
            textStyle: { color: '#ffffff' },
            format: 'dd/MM'
        },
        vAxis: {
            textStyle: { color: '#ffffff' },
            gridlines: { color: '#333333' } // Linhas cinza
        },
        legendTextStyle: {
            color: '#ffffff'
        },
        colors: ['#ff9900', '#3366cc', '#dc3912']
    };

    const chart = new google.visualization.LineChart(document.getElementById('chart'));
    chart.draw(data, options);
}

});
