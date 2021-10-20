function parseXml(str) {
    const parse = new DOMParser();
    return parse.parseFromString(str,"text/xml");
}
function parseHtml(str) {
    const parse = new DOMParser();
    return parse.parseFromString(str,"text/html");
}
function renderFeed(feed) {
    const news = document.getElementById("news");
    const items = feed.getElementsByTagName("item");
    for (const item of items){
        const title = item.getElementsByTagName("title")[0].textContent;
        const description = item.getElementsByTagName("description")[0].textContent;
        const link = item.getElementsByTagName("link")[0].textContent;
        const article = document.createElement("article");
        const titleElement = document.createElement("h1");
        const descElement = document.createElement("p");
        const linkElement = document.createElement("a");
        const shortDesc = parseHtml(description).body.textContent.substring(0,128);
        titleElement.textContent = title;
        descElement.textContent = shortDesc;
        linkElement.textContent = link;
        linkElement.href = link;
        article.append(titleElement,descElement,linkElement)
        news.append(article)
    }
}
window.addEventListener("load", function(){
    fetch("https://dev.to/feed").then(r => r.text()).then(parseXml).then(renderFeed);
})