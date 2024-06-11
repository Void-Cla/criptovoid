document.addEventListener('DOMContentLoaded', () => {
    // Atualizar os preços em USD
    updatePrices();

    // Atualizar os preços a cada 3 segundos
    setInterval(updatePrices, 3000);
});

// Função para atualizar os preços
async function updatePrices() {
    const cryptocurrencies = ['BTC', 'LTC', 'ETH'];

    try {
        for (const crypto of cryptocurrencies) {
            const response = await fetch(`https://rest.coinapi.io/v1/exchangerate/${crypto}/USD`, {
                headers: {
                    'X-CoinAPI-Key': 'A87977FA-9FC3-4A03-8BC1-68EF634735AB'
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao buscar dados de preço');
            }

            const data = await response.json();
            const priceUSD = data.rate ? data.rate.toFixed(2) : 'N/A';
            const priceElementUSD = document.getElementById(`${crypto.toLowerCase()}-price-usd`);

            priceElementUSD.textContent = `$ ${priceUSD}`;
        }
    } catch (error) {
        console.error('Erro:', error);
    }
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
            })
            .catch(error => console.error('Erro ao buscar preços das criptomoedas:', error));
    }

    setInterval(fetchCryptoPrices, 3000); // Atualiza os preços a cada 3 segundos
});


