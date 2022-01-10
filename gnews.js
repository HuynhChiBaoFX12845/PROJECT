let news = [];
const apiKey = "043035147fb6670f5b2ede4a90f8aeed" // insert api key here


const renderHeadlineElement = (data) => {
    
    let newsContainer = document.createElement("div");
    let imgElement = document.createElement("div");
    let detailContainer = document.createElement("div");        
    let titleElement = document.createElement("a");
    let timeElement = document.createElement("p");
    let descriptionElement = document.createElement("p");
  
    let titleTextNode = document.createTextNode(data.title);
    let descriptionTextNode = document.createTextNode(data.description);
    let timeTextNode = document.createTextNode(data.publishedAt);

    // create child props
    newsContainer.setAttribute("id", "newsItem");
    newsContainer.setAttribute("class", "news-item");

    detailContainer.setAttribute("class", "news-detail");
     
    imgElement.setAttribute("src", data.image);
    imgElement.setAttribute("class", "news-img")
    imgElement.style.backgroundImage = `url(${data.image}`;
    titleElement.setAttribute("href", data.url);
    titleElement.setAttribute("target", "_blank");
    titleElement.setAttribute("class", "news-title");

    timeElement.setAttribute("class", "news-time");
    descriptionElement.setAttribute("class", "news-description");

    // add child
    titleElement.appendChild(titleTextNode);
    timeElement.appendChild(timeTextNode);
    descriptionElement.appendChild(descriptionTextNode);

    detailContainer.appendChild(titleElement);
    detailContainer.appendChild(timeElement);
    detailContainer.appendChild(descriptionElement);

    newsContainer.appendChild(imgElement);
    newsContainer.appendChild(detailContainer);

    return newsContainer;
};

const renderHeadlineItem = (data) => {
    let news = document.getElementById("news");
    let dataParsed = JSON.parse(data);
    news.innerHTML = '';
    console.log(dataParsed.articles);
    dataParsed.articles.map(
        (item) => {
            news.appendChild(renderHeadlineElement(item));
        }
    );
};

const fetchData = function (url, endpoint, query, callback) {
    let req = new XMLHttpRequest();
    req.onload = function () {
        renderHeadlineItem(req.response);
    }
    req.open('GET', url + endpoint + query, true);
    req.send();
};

const getNews = async () => {
    let url = "https://gnews.io/api/v4/top-headlines?token=eca5978a316bc716fa00c4d3e563bd01&lang=en&fbclid=IwAR1Xvez4ZfrdZSnx4u-BHGWgS1slCnLhPb3gD6OIoJkJOEw0G-DZAqFqdfQ";
    try {
        fetchData(
            url,
            "/top-headlines?",
            "token=" + apiKey + "&lang=en"
        );
    } catch (err) {
        console.log(err);
    }
};

getNews();

// search by keyword
const closePopup = () => {
    document.getElementById("popup").style.display = "none";
}
const showPopup = () => {
    document.getElementById("popup").style.display = "flex";
};
const search = () => {
    let url = "https://gnews.io/api/v4/top-headlines?token=eca5978a316bc716fa00c4d3e563bd01&lang=en&fbclid=IwAR1Xvez4ZfrdZSnx4u-BHGWgS1slCnLhPb3gD6OIoJkJOEw0G-DZAqFqdfQ";
    let query = document.getElementById("searchInput").value;
    try {
        fetchData(
            url,
            "/search?",
            "token=" + apiKey + "&q=" + query
        );
    } catch (err) {
        console.log(err);
    }
    closePopup();
};
