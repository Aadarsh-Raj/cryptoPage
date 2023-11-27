const ul = document.querySelector("ul");
const moreInfoContainer = document.querySelector(".crypto-details-container");
const pageDescription = document.querySelector(".page-description");
const detailTitle = document.querySelector(".detail-title");
const closeBtn = document.querySelector(".close-btn");
closeBtn.addEventListener("click", () => {
  moreInfoContainer.style.display = "none";
});

const showDetails = async (id) => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
    );
    const data = await response.json();
    console.log(data);
    // detailTitle.innerHTML = id;
    // console.log(detailTitle);
    // pageDescription.innerHTML = `${data.description}`;
    // console.log(pageDescription);
    // moreInfoContainer.style.display = "flex";
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
const searchSubmit = document.getElementById("search-submit");

searchInput.addEventListener("keyup", (e) => {
  const searchKey = e.target.value.toLowerCase();
  const filteredArray = dataArr.filter(
    (ele) =>
      ele.id.toLowerCase().includes(searchKey) ||
      ele.name.toLowerCase().includes(searchKey)
  );

  searchSubmit.addEventListener("click", (e) => {
    ul.innerHTML = "";
    // console.log(filteredArray);
    renderList(filteredArray);
   
    searchInput.value = "";
  });
});

ul.addEventListener("click", (e)=>{
    if(e.target.classList.contains("coin-item-info-button")){
        console.log(e.target.id);
        showDetails(e.target.id);
    }
});
