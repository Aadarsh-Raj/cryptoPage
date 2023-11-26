const ul = document.querySelector("ul");

{/* <li class="coin-item-list">
             <div class="list-left">
                <div class="number">
                    1
                 </div>
                 <div class="coin-item-logo">
                    <img src="" alt="logo">
                 </div>
                 <div class="coin-item-name">
                    Bitcoin
                 </div>
                 <div class="coin-item-id">
                    BTC
                 </div>
             </div>
             <a href="">
                <div class="coin-item-info-button">
                    More Info
                 </div>
             </a>
            </li> */}



function createList(item) {
    const coinItemList = document.createElement("li");
    coinItemList.className = "coin-item-list";
    coinItemList.innerHTML = `<div class="list-left">
    <div class="number">
        ${item.market_cap_rank}
     </div>
     <div class="coin-item-logo">
        <img src=${item.large} alt="logo">
     </div>
     <div class="coin-item-name">
        ${item.name}
     </div>
     <div class="coin-item-id">
        ${item.symbol}
     </div>
 </div>
 <a href="">
    <div class="coin-item-info-button">
        More Info
     </div>
 </a>`;
return coinItemList;
}
const dataArr =[];


const fetchCoins = async ()=> {
try {
    const response = await fetch("https://api.coingecko.com/api/v3/search");
const data = await response.json();
const coinsArr = data.coins;

coinsArr.forEach(ele =>{
    if(ele.market_cap_rank !== null){
        dataArr.push(ele);
    };
   
});

renderList(dataArr);

} catch (error) {
    console.log(error);
}


}


const fetchDescription = async () =>{

    const response = await fetch("https://api.coingecko.com/api/v3/coins/pyth-network?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false");
    const data = await response.json();
    console.log(data);
}

fetchDescription();



function renderList(arr){
    arr.forEach(element => {
        const coinItemList = createList(element);
     ul.append(coinItemList);
     
     });
}

fetchCoins();


const searchInput = document.getElementById("search-input");
const searchSubmit = document.getElementById("search-submit");
searchInput.addEventListener("keyup",(e)=>{
    const searchKey = e.target.value.toLowerCase();
const filteredArray = dataArr.filter((ele) => ele.id.toLowerCase().includes(searchKey) || ele.name.toLowerCase().includes(searchKey));
searchSubmit.addEventListener("click", (e)=>{
    ul.innerHTML = "";
    console.log(filteredArray);
    renderList(filteredArray);
    searchInput.value = "";
});

});