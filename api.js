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
});

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

