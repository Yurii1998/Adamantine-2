const apiKey = 'YOUR_BSCSCAN_API_KEY'; // Replace with your BscScan API key
const contractAddress = 'YOUR_TOKEN_CONTRACT_ADDRESS'; // Replace with Adamantine 2 token contract address

// Fetch Token Data from BscScan API
async function fetchTokenData() {
    try {
        // Fetch total supply of tokens
        const totalSupplyResponse = await fetch(`https://api.bscscan.com/api?module=stats&action=tokensupply&contractaddress=${contractAddress}&apikey=${apiKey}`);
        const totalSupplyData = await totalSupplyResponse.json();
        const totalSupply = parseInt(totalSupplyData.result) / (10 ** 18); // Adjust for decimals
        document.getElementById('totalSupply').innerText = totalSupply.toLocaleString();

        // Placeholder for price (BscScan API doesn't provide price data directly)
        document.getElementById('currentPrice').innerText = "$0.50"; // Replace with real price data

        // Placeholder for tokens in circulation (Example only)
        document.getElementById('tokensInCirculation').innerText = "7,500,000"; // Replace with actual data

    } catch (error) {
        console.error('Error fetching token data:', error);
    }
}

// Countdown Timer for Token Unlock at 8:00 AM Calgary Time
function startCountdown() {
    const targetTime = new Date();
    targetTime.setHours(8, 0, 0, 0); // Set to 8:00 AM

    const now = new Date();
    if (now.getHours() >= 8) {
        targetTime.setDate(targetTime.getDate() + 1); // Next day if already past 8:00 AM
    }

    const updateCountdown = setInterval(function () {
        const currentTime = new Date();
        const difference = targetTime - currentTime;

        if (difference <= 0) {
            clearInterval(updateCountdown);
            document.getElementById('timer').innerText = "Unlocking 1000 ATI2 now!";
        } else {
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            document.getElementById('timer').innerText = `${hours}h ${minutes}m ${seconds}s`;
        }
    }, 1000);
}

// Initialize the functions on page load
window.onload = function() {
    fetchTokenData();
    startCountdown();
};
