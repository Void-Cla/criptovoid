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


//    Logica para o grafico + API key
async function fetchHistoricalData() {
    const cryptocurrencies = ['BTC', 'LTC', 'ETH'];
    const currentDate = new Date().toISOString().split('T')[0];
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    for (const crypto of cryptocurrencies) {
        try {
            const response = await fetch(`https://api.coinapi.io/v1/ohlcv/${crypto}_USD/history?period_id=1H&time_start=${twentyFourHoursAgo}&time_end=${currentDate}&limit=24`, {
                headers: {
                    'X-CoinAPI-Key': 'D46C0C08-761B-4116-9B68-85AAB1810102' 
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

// function renderChart(prices) {
//     const cryptocurrencies = Object.keys(prices);

//     const ctx = document.getElementById('myChart').getContext('2d');
//     const myChart = new Chart(ctx, {
//         type: 'line',
//         data: {
//             labels: Array.from({ length: 24 }, (_, i) => {
//                 const date = new Date(Date.now() - (24 - i) * 60 * 60 * 1000);
//                 return date.toLocaleString('en-US', { hour: 'numeric', hour12: false });
//             }),
//             datasets: cryptocurrencies.map(crypto => ({
//                 label: `${crypto} Price`,
//                 data: prices[crypto],
//                 backgroundColor: 'transparent',
//                 borderColor: randomColor(), // Gerar uma cor aleatória para cada criptomoeda
//                 borderWidth: 2
//             }))
//         },
//         options: {
//             title: {
//                 display: true,
//                 text: 'Comparação de Preços das Criptomoedas',
//                 fontColor: '#ffffff'
//             },
//             scales: {
//                 xAxes: [{
//                     display: false // Oculta o eixo X
//                 }],
//                 yAxes: [{
//                     ticks: {
//                         fontColor: '#ffffff',
//                         callback: function(value, index, values) {
//                             return '$' + value;
//                         }
//                     }
//                 }]
//             },
//             legend: {
//                 labels: {
//                     fontColor: '#ffffff'
//                 }
//             },
//             elements: {
//                 point: {
//                     radius: 0
//                 }
//             }
//         }
//     });

//     // Adiciona o valor máximo e mínimo ao gráfico
//     const legend = document.getElementById('legend');
//     cryptocurrencies.forEach(crypto => {
//         const listItem = document.createElement('li');
//         listItem.innerHTML = `
//             ${crypto}:
//             <div class="price-values">
//                 <span class="max-price">${Math.max(...prices[crypto])}</span>
//                 <span class="min-price">${Math.min(...prices[crypto])}</span>
//             </div>
//         `;
//         legend.appendChild(listItem);
//     });
// }

// function randomColor() {
//     return '#' + Math.floor(Math.random() * 16777215).toString(16); // Gerar uma cor hexadecimal aleatória
// }
