document.addEventListener('DOMContentLoaded', () => {
    // Atualizar os preços em USD e BRL
    updatePrices();

    // Atualizar os preços a cada 3 segundos
    setInterval(updatePrices, 3000);

    // Adicionar evento de clique para exibir gráfico
    document.querySelectorAll('.crypto-price').forEach(priceDiv => {
        priceDiv.addEventListener('click', () => {
            const cryptoSymbol = priceDiv.getAttribute('data-crypto');
            displayChart(cryptoSymbol);
        });
    });

    // Adicionar evento de clique para atualizar preços em BRL
    document.getElementById('btc-price-brl').addEventListener('click', () => {
        updatePrices();
    });

    document.getElementById('ltc-price-brl').addEventListener('click', () => {
        updatePrices();
    });

    document.getElementById('eth-price-brl').addEventListener('click', () => {
        updatePrices();
    });

    // Atualizar gráfico ao trocar a moeda
    document.getElementById('currency-select').addEventListener('change', () => {
        drawChart();
    });

    // Atualizar gráfico a cada 3 segundos
    setInterval(() => {
        drawChart();
    }, 3000);
});

// Função para atualizar os preços
async function updatePrices() {
    const currencies = ['BTC', 'LTC', 'ETH'];

    try {
        for (const currency of currencies) {
            const response = await fetch(`https://rest.coinapi.io/v1/exchangerate/${currency}/USD`, {
                headers: {
                    'X-CoinAPI-Key': 'A87977FA-9FC3-4A03-8BC1-68EF634735AB'
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao buscar dados de preço');
            }

            const data = await response.json();
            const priceUSD = data.rate ? data.rate.toFixed(2) : 'N/A';
            const priceBRL = priceUSD !== 'N/A' ? (priceUSD * 5.3).toFixed(2) : 'N/A';
            const priceElementUSD = document.getElementById(`${currency.toLowerCase()}-price-usd`);
            const priceElementBRL = document.getElementById(`${currency.toLowerCase()}-price-brl`);

            priceElementUSD.textContent = `$ ${priceUSD}`;
            priceElementBRL.textContent = `R$ ${priceBRL}`;
        }
    } catch (error) {
        console.error('Erro:', error);
    }
}

async function displayChart(symbol) {
    const chartContainer = document.getElementById('chart-container');
    chartContainer.style.display = 'block';

    const data = await fetchMarketData(symbol);
    renderChart(data);
}

document.addEventListener('DOMContentLoaded', function () {
    fetchCryptoPrices();
    function fetchCryptoPrices() {
        fetch('https://api.coincap.io/v2/assets')
            .then(response => response.json())
            .then(data => {
                const btc = data.data.find(crypto => crypto.symbol === 'BTC');
                const ltc = data.data.find(crypto => crypto.symbol === 'LTC');
                const eth = data.data.find(crypto => crypto.symbol === 'ETH');

                document.getElementById('btc-price-usd').textContent = parseFloat(btc.priceUsd).toFixed(2);
                document.getElementById('ltc-price-usd').textContent = parseFloat(ltc.priceUsd).toFixed(2);
                document.getElementById('eth-price-usd').textContent = parseFloat(eth.priceUsd).toFixed(2);

                // Calcula e exibe os preços em BRL
                const btcPriceBRL = (parseFloat(btc.priceUsd) * 5.3).toFixed(2);
                const ltcPriceBRL = (parseFloat(ltc.priceUsd) * 5.3).toFixed(2);
                const ethPriceBRL = (parseFloat(eth.priceUsd) * 5.3).toFixed(2);

                document.getElementById('btc-price-brl').textContent = `R$ ${btcPriceBRL}`;
                document.getElementById('ltc-price-brl').textContent = `R$ ${ltcPriceBRL}`;
                document.getElementById('eth-price-brl').textContent = `R$ ${ethPriceBRL}`;
            })
            .catch(error => console.error('Erro ao buscar preços das criptomoedas:', error));
    }

    setInterval(fetchCryptoPrices, 3000); // Atualiza os preços a cada 3 segundos
});

async function fetchMarketData(symbol) {
    const url = `https://rest.coinapi.io/v1/exchangerate/${symbol}/USD/history?period_id=1DAY&time_start=2022-01-01T00:00:00`;

    try {
        const response = await fetch(url, {
            headers: {
                'X-CoinAPI-Key': 'A87977FA-9FC3-4A03-8BC1-68EF634735AB'
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar dados de mercado');
        }

        const data = await response.json();
        console.log('Dados do mercado:', data); // Verifica os dados retornados
        return data;
    } catch (error) {
        console.error('Erro ao buscar dados do mercado:', error);
        return null; // Retorna null em caso de erro
    }
}

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
