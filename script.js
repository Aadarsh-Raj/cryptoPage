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
