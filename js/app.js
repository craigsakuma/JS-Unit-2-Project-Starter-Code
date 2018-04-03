/*
  Please add all Javascript code to this file.
*/

const newsAPIKey = 'add-your-key'
let title;
let image;
let category;
let impressions;
let newsSource;
let sources = ['BBC News','Reuters','New York Times'];
let sourceClass = {'BBC News':'bbc-news','Reuters':'reuters','New York Times':'the-new-york-times'};
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

$('#popUp').removeClass('hidden');

$('document').ready(function(e) {
  $('#popUp').addClass('hidden');

// populate site with articles for all news sources
  getArticles('bbc-news');
  getArticles('the-new-york-times');
  getArticles('reuters');

// update articles displayed with drop down menu
  $('ul li').on('click', 'a', function(e) {
    e.preventDefault();
    newsSource = $(this).text();
    sources.forEach(function(source) {
      if(newsSource==='All') {
        $('.article').removeClass('hidden') ;   
      } else if (newsSource===source) {
        $('.article').addClass('hidden');
        $('.' + sourceClass[source]).removeClass('hidden')
      }
    })
    $('#news-source').text(newsSource)
  });
  $('')
}) 

// request articles from API and add to html
function getArticles(source='bbc-news', key=newsAPIKey) {
  const url = 'https://newsapi.org/v2/top-headlines?' + 'sources=' + source + '&apiKey=' + key;
    $('#popUp').removeClass('hidden');
  fetch(url).then(function(response) { 
    if(response.ok) {
      return response.json();
    } else {
      throw 'Network response was not ok.';
      $('#popUp').addClass('hidden');
    }
  }).then(function(data) {
    articles = data.articles;
    articles.forEach(function(article) {
      let url = article.url;
      let title = article.title;
      let date = formatDate(article.publishedAt);
      let category = article.source.name;
      let image = article.urlToImage;
      article = createArticle(source, title, url, category,image, date);
      $('#main').append(article);
    })
    $('#popUp').addClass('hidden');
    console.log(data.articles)
  }).catch(function(error) {
    $('#popUp').addClass('hidden');
  // handle lack of data in UI
  });
}

// creates html for each article
function createArticle(source, title, url, category='Miscellaneous', image='#',date='') {
  article = `<article class="article ${source}">
            <section class="featuredImage">
              <img src="${image}" alt="" />
            </section>
            <section class="articleContent">
                <a href="${url}"><h3>${title}</h3></a>
                <h6>${category}</h6>
            </section>
            <section class="impressions">
              ${date}
            </section>
            <div class="clearfix"></div>
          </article>`;
  return article;
}
 
// creates text friendly date
function formatDate(date) {
  let year = date.slice(0,4);
  let month = date.slice(5,7);
  let day = date.slice(8,10);
  let newDate = monthNames[parseInt(month)] + ' ' + parseInt(day)
  return newDate
}
