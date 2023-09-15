/** API Key:
 * b543929f97902e9c4dd7f2229d2445dd
 * API Read Access Token:
 * eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNTQzOTI5Zjk3OTAyZTljNGRkN2YyMjI5ZDI0NDVkZCIsInN1YiI6IjY0ZmEyZGE5ZGMxY2I0MDEwMjhjN2M4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IZrW4xOrz9_DxDmQHEUQbxDdrurWGWyo5TRr4oRaXx4
 */
const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b543929f97902e9c4dd7f2229d2445dd&page=1';
const IMG_PATH = 'https://image.tmbd.org/t/p/w1280';
const SEARCHAPI="https://api.themoviedb.org/3/search/movie?&api_key=b543929f97902e9c4dd7f2229d2445dd&query=";

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

returnMovies(APILINK)

function returnMovies(url){
    fetch(url).then(res => res.json())
    .then(function(data){
        console.log(data.results);
        data.results.forEach(elements => {
            const div_card = document.createElement('div');
            div_card.setAttribute('class','card');

            const div_row = document.createElement('div');
            div_row.setAttribute('class','row');

            const div_column = document.createElement('div');
            div_column.setAttribute('class','column');

            const image = document.createElement('img');
            image.setAttribute('class', 'thumbnail');
            image.setAttribute('id', 'image');

            const title = document.createElement('h3');
            title.setAttribute('id', 'title');
            const center = document.createElement('center');

            title.innerHTML = '${element.title}';
            image.src = IMG_PATH + elements.poster_path;
            
            center.appendChild(image);
            div_card.appendChild(center);
            div_card.appendChild(title);
            div_column.appendChild(div_card);
            div_row.appendChild(div_column);

            main.appendChild(div_row);

        });
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    main.innerHTML='';

    const searchItem = search.ariaValueMax;

    if (searchItem){
        returnMovies(SEARCHAPI + searchitem);
        search.value = "";
    }
});