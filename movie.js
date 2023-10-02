/** API Key:
 * b543929f97902e9c4dd7f2229d2445dd
 * API Read Access Token:
 * eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNTQzOTI5Zjk3OTAyZTljNGRkN2YyMjI5ZDI0NDVkZCIsInN1YiI6IjY0ZmEyZGE5ZGMxY2I0MDEwMjhjN2M4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IZrW4xOrz9_DxDmQHEUQbxDdrurWGWyo5TRr4oRaXx4
 */

const url = new URL(location.href);
const movieId = url.searchParams.get("id");
const movieTitle = url.searchParams.get("title");

const APILINK = "http://localhost:8000/api/v1/reviews/";


const main = document.getElementById("section");
const title = document.getElementById("title");

title.innerText = movieTitle;

const div_new = document.createElement('div');
div_new.innerHTML = `
  <div class="row">
    <div class="column">
      <div class="card">
          New Review
          <p><strong>Review: </strong>
            <input type="text" id="new_review" value="">
          </p>
          <p><strong>User: </strong>
            <input type="text" id="new_user" value="">
          </p>
          <p><a href="#" onclick="saveReview('new_review', 'new_user')">💾</a>
          </p>
      </div>
    </div>
  </div>
`
main.appendChild(div_new)

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
                        <p><strong>User: </strong>${review.user}</p>
                        <p><a href="#" onclick="editReview('${review._id}', '${review.review}', '${review.user}')"> ✏️ </a>
                        <a href="#" onclick="deleteReview('${review._id}')"> 🗑️</a></p>
                    </div>
                </div>
            </div>
            `

            main.appendChild(div_card);

        });
    });
}

function editReview(id, review, user) {

    const element = document.getElementById(id);
    const reviewInputId = "review" + id
    const userInputId = "user" + id
    
    element.innerHTML = `
                <p><strong>Review: </strong>
                  <input type="text" id="${reviewInputId}" value="${review}">
                </p>
                <p><strong>User: </strong>
                  <input type="text" id="${userInputId}" value="${user}">
                </p>
                <p><a href="#" onclick="saveReview('${reviewInputId}', '${userInputId}', '${id}',)">💾</a>
                </p>
    
    `
}

function saveReview(reviewInputId, userInputId, id="") {
    const review = document.getElementById(reviewInputId).value;
    const user = document.getElementById(userInputId).value;
  
    if (id) {
      fetch(APILINK + id, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"user": user, "review": review})
      }).then(res => res.json())
        .then(res => {
          console.log(res)
          location.reload();
        });        
    } else {
      fetch(APILINK + "new", {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"user": user, "review": review, "movieId": movieId})
      }).then(res => res.json())
        .then(res => {
          console.log(res)
          location.reload();
        });
    }
}

function deleteReview(id) {
    console.log(APILINK + id)
    fetch(APILINK + id, {
      method: 'DELETE'
    }).then(res => res.json())
      .then(res => {
        console.log(res)
        location.reload();
    });    
}
