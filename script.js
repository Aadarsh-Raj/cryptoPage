const topCoinsContainer = document.querySelector(".top-coins-container");


function createTopCard(item){
const topCardItem = document.createElement("div");
topCardItem.className = "top-card-item";
topCardItem.innerHTML =`<div class="card-logo">
<img src=${item.large} alt="logo">
</div>
<div class="details">
<h2>${item.id}</h2>
<p><span>Rs </span>${item.price_btc * 50000 * 75}</p>
</div>`;
    return topCardItem;
}
// https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=inr
const fetchTopCardApi = async () => {
    try {
        const response =await fetch("https://api.coingecko.com/api/v3/search/trending");
        const data = await response.json();
        data.coins.forEach(element => {
          const card =  createTopCard(element.item);
            console.log(card);
            topCoinsContainer.append(card);
        });
    } catch (error) {
        console.log(error);
    }
}
fetchTopCardApi();
// const fetchApi = async () =>{
//     try {
//     // const response = await fetch("1b251d50-884a-48d6-bac7-48550e6f8458");
//         // const response = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false");
//         const response = await fetch("https://api.coingecko.com/api/v3/search");
//         // response.status = {
//         //     "timestamp": "2023-11-24T07:33:00.872Z",
//         //     "error_code": 1002,
//         //     "error_message": "1b251d50-884a-48d6-bac7-48550e6f8458",
//         //     "elapsed": 0,
//         //     "credit_count": 0
//         // }
//         console.log(response.json());
//     } catch (error) {
//         // console.log(error);
//     }
// }
// console.log("skjda");
// fetchApi();

// https://api.coingecko.com/api/v3/search?query=Bitcoin


// on search
// https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false

// https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false


// https://api.coingecko.com/api/v3/coins/pyth-network?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false