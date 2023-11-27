const ul = document.querySelector("ul");
const moreInfoContainer = document.querySelector(".crypto-details-container");
const pageDescription = document.querySelector(".page-description");
const detailTitle = document.querySelector(".detail-title");
const closeBtn = document.querySelector(".close-btn");
const detailsLogoContainer = document.querySelector(".detail-container-left");
const priceTags = document.querySelector(".price-tags");


closeBtn.addEventListener("click", () => {
  moreInfoContainer.style.right = "-100%";

});

const showDetails = async (id) => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
    );
    const data = await response.json();
    console.log(data.image.large);
    detailTitle.innerHTML = id;
    pageDescription.innerHTML = `${data.description.en}`;
    priceTags.innerHTML =`<span>₹${data.market_data.current_price.inr}</span>
    <span>$${data.market_data.current_price.usd}</span>
    <span>€${data.market_data.current_price.eur}</span>
    <span>A$${data.market_data.current_price.aud}</span>`;
    detailsLogoContainer.innerHTML = `<img src=${data.image.large} alt="logo" />`;
    moreInfoContainer.style.display = "flex";
    moreInfoContainer.style.right = "0";
  } catch (e) {
    console.log(e);
  }
};

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
    <div class="coin-item-info-button" id=${item.id}>
        More Info
     </div>
 </a>`;

  return coinItemList;
}
const dataArr = [];

const fetchCoins = async () => {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/search");
    const data = await response.json();
    const coinsArr = data.coins;

    coinsArr.forEach((ele) => {
      if (ele.market_cap_rank !== null) {
        dataArr.push(ele);
      }
    });

    renderList(dataArr);
  } catch (error) {
    // console.log(error);
  }
};

function renderList(arr) {
  arr.forEach((element) => {
    const coinItemList = createList(element);
    ul.append(coinItemList);
    // const moreInfo = document.querySelector(".coin-item-info-button");

    // moreInfo.addEventListener("click", (e)=>{
    //     console.log(element.id);
    //     showDetails(e, element.id);
    // });
  });
}

fetchCoins();

const searchInput = document.getElementById("search-input");
const searchSubmit = document.querySelector("form");

searchInput.addEventListener("keyup", (e) => {
  const searchKey = e.target.value.toLowerCase();
  const filteredArray = dataArr.filter(
    (ele) =>
      ele.id.toLowerCase().includes(searchKey) ||
      ele.name.toLowerCase().includes(searchKey)
  );

  searchSubmit.addEventListener("submit", (e) => {
    ul.innerHTML = "";
    // console.log(filteredArray);
    renderList(filteredArray);
   
    searchInput.value = "";
  });
});

ul.addEventListener("click", (e)=>{
    e.preventDefault();
    if(e.target.classList.contains("coin-item-info-button")){
        console.log(e.target.id);
        showDetails(e.target.id);
    }
});
