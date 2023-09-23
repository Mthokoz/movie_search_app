/** API Key:
 * b543929f97902e9c4dd7f2229d2445dd
 * API Read Access Token:
 * eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNTQzOTI5Zjk3OTAyZTljNGRkN2YyMjI5ZDI0NDVkZCIsInN1YiI6IjY0ZmEyZGE5ZGMxY2I0MDEwMjhjN2M4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IZrW4xOrz9_DxDmQHEUQbxDdrurWGWyo5TRr4oRaXx4
 */

const url = new URL(location.href);
const movieId = url.searchParams.get("id");
const movieTitle = url.searchParams.get("title");

const APILINK = "http://localhost:8000/api/v1/reviews";


const main = document.getElementById("section");
const title = document.getElementById("title");

title.innerText = movieTitle;


returnReviews(APILINK)

function returnReviews(url){
    fetch(url + "movie/"+ movieId).then(res => res.json())
    .then(function(data){
        console.log(data);
        data.forEach(review => {
            const div_card = document.createElement('div');
            div_card.innerHTML=`
            <div class="row">
                <div class="column">
                    <div class="card" id="${review._id}">
                        <p><strong>Review: </strong>${review.review}</p>
                        <p><strong>Review: </strong>${review.user}</p>
                        <p><a href="#" onclick="editReview('${review._id}', '${review.review}', '${review.user}')">emj </a>
                        <a href="#" onclick="deleteReview('${review._id}')"> emj</a></p>
                    </div>
                </div>
            </div>
            `

            main.appendChild(div_card);

        });
    });
}
