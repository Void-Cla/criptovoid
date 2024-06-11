document.addEventListener('DOMContentLoaded', () => {
    fetchCryptoPrices();
    fetchHistoricalData();
});

async function fetchCryptoPrices() {
    try {
        const response = await fetch('https://api.coincap.io/v2/assets');
        const data = await response.json();
        const btc = data.data.find(crypto => crypto.symbol === 'BTC');
        const ltc = data.data.find(crypto => crypto.symbol === 'LTC');
        const eth = data.data.find(crypto => crypto.symbol === 'ETH');

        document.getElementById('btc-price-usd').textContent = parseFloat(btc.priceUsd).toFixed(2);
        document.getElementById('ltc-price-usd').textContent = parseFloat(ltc.priceUsd).toFixed(2);
        document.getElementById('eth-price-usd').textContent = parseFloat(eth.priceUsd).toFixed(2);

        const prices = {
            BTC: btc.priceUsd,
            LTC: ltc.priceUsd,
            ETH: eth.priceUsd
        };

        renderChart(prices);
    } catch (error) {
        console.error('Erro ao buscar preços das criptomoedas:', error);
    }
}

async function fetchHistoricalData() {
    const cryptocurrencies = ['BTC', 'LTC', 'ETH'];
    const currentDate = new Date().toISOString().split('T')[0];
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    for (const crypto of cryptocurrencies) {
        try {
            const response = await fetch(`https://rest.coinapi.io/v1/ohlcv/${crypto}/USD/history?period_id=1DAY&time_start=${thirtyDaysAgo}&time_end=${currentDate}&limit=30`, {
                headers: {
                    'X-CoinAPI-Key': 'A87977FA-9FC3-4A03-8BC1-68EF634735AB' // Substitua pela sua própria chave de API
                }
            });
            const data = await response.json();

            if (data.length > 0) {
                const prices = data.map(entry => entry.price_close.toFixed(2));
                renderChart({ [crypto]: prices });
            } else {
                console.error(`Erro ao buscar histórico de preços de ${crypto}: Dados não encontrados`);
            }
        } catch (error) {
            console.error(`Erro ao buscar histórico de preços de ${crypto}:`, error);
        }
    }
}

function renderChart(prices) {
    const cryptocurrencies = Object.keys(prices);

    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: 7 }, (_, i) => new Date(Date.now() - (7 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })),
            datasets: cryptocurrencies.map(crypto => ({
                label: `${crypto} Price`,
                data: prices[crypto],
                backgroundColor: 'transparent',
                borderColor: randomColor(), // Gerar uma cor aleatória para cada criptomoeda
                borderWidth: 2
            }))
        },
        options: {
            title: {
                display: true,
                text: 'Comparação de Preços das Criptomoedas',
                fontColor: '#ffffff'
            },
            scales: {
                xAxes: [{
                    display: false // Oculta o eixo X
                }],
                yAxes: [{
                    ticks: {
                        fontColor: '#ffffff',
                        min: Math.min(...Object.values(prices).map(price => Math.min(...price))), // Valor mínimo entre as três moedas
                        max: Math.max(...Object.values(prices).map(price => Math.max(...price))), // Valor máximo entre as três moedas
                        callback: function(value, index, values) {
                            return '$' + value;
                        }
                    }
                }]
            },
            legend: {
                labels: {
                    fontColor: '#ffffff'
                }
            },
            elements: {
                point: {
                    radius: 0
                }
            }
        }
    });
}

function randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16); // Gerar uma cor hexadecimal aleatória
}

