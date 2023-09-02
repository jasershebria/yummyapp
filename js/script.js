
$(".loading-screen").fadeOut();
function openSlide() {
   $("#navside").animate({
      left: 0
   }, 500);

   $(".open-close-icon").removeClass("fa-align-justify");
   $(".open-close-icon").addClass("fa-x");

   for (let i = 0; i < 5; i++) {
      $("#navside nav ul li").eq(i).animate({
         top: 0
      }, (i + 5) * 100)
   }
}


function closeSlide() {
   $("#navside").animate({
      left: -242
   }, 500);

   $(".open-close-icon").addClass("fa-align-justify");
   $(".open-close-icon").removeClass("fa-x");

   for (let i = 0; i < 5; i++) {
      $("#navside nav ul li").eq(i).animate({
         top: 250
      }, (i + 5) * 100)
   }
}

$("#slide-btn").click(() => {
   if ($("#navside").css("left") == "-242px") {
      openSlide();

   } else {
      closeSlide();
   }
});



async function fetchAPi(apiUrl) {
   let reponse = await fetch(apiUrl);
   
   if (reponse.ok && 400 != reponse.status) {

      let data = await reponse.json();

      return data;
   }
   
}


function displayCategory() {

   closeSlide();


   $(".loading-screen").fadeIn(300);
   

   let allitems = ``;

   fetchAPi('https://www.themealdb.com/api/json/v1/1/categories.php').then((response) => {

      response.categories.forEach(element => {
         allitems += `
      <div class="col-md-3">
         <div>
            <div class="fcard  position-relative overflow-hidden rounded-2 cursor-pointer" onclick="getCategoryMeals('${element.strCategory}')" >
               <img class="w-100 h-100" src="${element.strCategoryThumb}" />

               <div class="foverlay position-absolute  text-center ">
                  <h5>${element.strCategory}</h5>
                  <p> ${element.strCategoryDescription} </p>
               </div>
            </div>
         </div>
      </div>
      
      `;

      });

      document.getElementById('show').innerHTML = allitems;
      $(".loading-screen").fadeOut(300);
      
   });

}

function getCategoryMeals(category) {

   $(".loading-screen").fadeIn(300);
   
   let allitems = ``;

   fetchAPi(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`).then((response) => {

      response.meals.forEach(element => {
         allitems += `
      <div class="col-md-3">
         <div>
            <div class="fcard  position-relative overflow-hidden rounded-2 cursor-pointer" onclick="displayMealDetails('${element.idMeal}')" >
               <img class="w-100 h-100" src="${element.strMealThumb}" />

               <div class="foverlay position-absolute  d-flex justify-content-start align-items-center ">
                  <h5>${element.strMeal}</h5>
                 
               </div>
            </div>
         </div>
      </div>
      
      `;

      });

      document.getElementById('show').innerHTML = allitems;
      $(".loading-screen").fadeOut(300);
   });

}


function displayMealDetails(mealId) {

   $(".loading-screen").fadeIn(300);

   let ingredients = ``;
   let cartoona = ``;

   let tagsStr = '';

   fetchAPi(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`).then((response) => {

      console.log(response);

      response.meals.forEach(element => {

         let tags = element.strTags?.split(",")
         tags = element.strTags.split(",")
         if (!tags) tags = []

         for (let i = 0; i < tags.length; i++) {
            tagsStr += `
            <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
         }



         for (let i = 1; i <= 20; i++) {
            if (element[`strIngredient${i}`]) {
               ingredients += `<li class="alert alert-info m-2 p-1">${element[`strMeasure${i}`]} ${element[`strIngredient${i}`]}</li>`
            }
         }

         console.log(element)
         cartoona = `
      <div class="col-md-4 text-white">
                  <img class="w-100 rounded-3" src="${element.strMealThumb}"
                      alt="">
                      <h2>${element.strMeal}</h2>
              </div>
              <div class="col-md-8 text-white">
                  <h2>Instructions</h2>
                  <p>${element.strInstructions}</p>
                  <h3><span class="fw-bolder">Area : </span>${element.strArea}</h3>
                  <h3><span class="fw-bolder">Category : </span>${element.strCategory}</h3>
                  <h3>Recipes :</h3>
                  <ul class="list-unstyled d-flex g-3 flex-wrap">
                      ${ingredients}
                  </ul>

                  <h3>Tags :</h3>
                  <ul class="list-unstyled d-flex g-3 flex-wrap">
                   ${tagsStr}
                  </ul>

                  <a target="_blank" href="${element.strSource}" class="btn btn-success">Source</a>
                  <a target="_blank" href="${element.strYoutube}" class="btn btn-danger">Youtube</a>
              </div>`;

      });

      document.getElementById('show').innerHTML = cartoona;


      console.log(ingredients);
      $(".loading-screen").fadeOut(300);

   });

}


function displayArea() {
   $(".loading-screen").fadeIn(300);
   closeSlide();

   let allitems = ``;

   fetchAPi(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`).then((response) => {

      response.meals.forEach(element => {
         console.log(element.strArea)
         allitems += `
      <div class="col-md-3">
         <div>
               <div onclick="getAreaMeals('${element.strArea}')" class="rounded-2 text-center cursor-pointer">
                     <i class="fa-solid fa-house-laptop fa-4x"></i>
                     <h3>${element.strArea}</h3>
               </div>
         </div>
      </div>
      
      `;

      });



      document.getElementById('show').innerHTML = allitems;
      $(".loading-screen").fadeOut(300);
   });

}

function getAreaMeals(mealname) {
   $(".loading-screen").fadeIn(300);
   let allitems = ``;

   fetchAPi(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${mealname}`).then((response) => {

      console.log(response)

      response.meals.forEach(element => {
         console.log(element)
         allitems += `
         
            <div class="col-md-3">
         <div>
            <div class="fcard  position-relative overflow-hidden rounded-2 cursor-pointer" onclick="displayMealDetails('${element.idMeal}')">
               <img class="w-100 h-100" src="${element.strMealThumb}" />

               <div class="foverlay position-absolute  d-flex justify-content-center align-items-center ">
                  <h5>${element.strMeal}</h5>
               </div>
            </div>
         </div>
      </div>
         `;


      }
      );


      document.getElementById('show').innerHTML = allitems;
      $(".loading-screen").fadeOut(300);
   });
}



function displayIngredients() {

   closeSlide();
   $(".loading-screen").fadeIn(300);

   let allitems = ``;

   fetchAPi('https://www.themealdb.com/api/json/v1/1/list.php?i=list').then((response) => {

      response.meals.forEach(element => {

         let strDes = String(element.strDescription).split(" ").slice(0,20).join(" ");
         console.log(element);
         
         allitems += `

            <div class="col-md-3" onclick="getIngredientsMeals('${element.strIngredient}')"  >
               <div  class="rounded-2 text-center cursor-pointer"   >
                     <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                     <h3>${element.strIngredient}</h3>
                     <p>${strDes=="null"?"No-description":strDes}</p>
               </div>
             </div>
         
      `;

      });

      document.getElementById('show').innerHTML = allitems;
      $(".loading-screen").fadeOut(300);
   });

}

function getIngredientsMeals(meal){
   $(".loading-screen").fadeIn(300);
   console.log(meal);

   

   let allitems = ``;

   fetchAPi(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${meal}`).then((response) => {

      response.meals.forEach(element => {
         console.log(response)
         allitems += `
      <div class="col-md-3">
         <div>
            <div class="fcard  position-relative overflow-hidden rounded-2 cursor-pointer" onclick="displayMealDetails('${element.idMeal}')" >
               <img class="w-100 h-100" src="${element.strMealThumb}" />

               <div class="foverlay position-absolute  d-flex justify-content-start align-items-center ">
                  <h5>${element.strMeal}</h5>
                 
               </div>
            </div>
         </div>
      </div>
      
      `;

      });

      document.getElementById('show').innerHTML = allitems;
      $(".loading-screen").fadeOut(300);
   });

}



function search() {
   closeSlide();

   let allitems = `

      <div class="row py-4 ">
         <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
         </div>
         <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
         </div>
      </div>

      <div id="searchCon" class="row g-3">

       </div>


`;

   document.getElementById('show').innerHTML = allitems;

}

function searchByName(term) {
   $(".loading-screen").fadeIn(300);

   let allitems = ``;

   fetchAPi(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`).then((response) => {

      response.meals.forEach(element => {
         console.log(element)
         allitems += `
               
               <div class="col-md-3">
            <div class="fcard  position-relative overflow-hidden rounded-2 cursor-pointer" onclick="displayMealDetails('${element.idMeal}')">
                  <img class="w-100 h-100" src="${element.strMealThumb}" />

                  <div class="foverlay position-absolute  d-flex justify-content-start align-items-center ">
                     <h5>${element.strMeal}</h5>
                  </div>
               </div>
            </div>
         </div>
            `;

      });

      document.getElementById('searchCon').innerHTML = allitems;
      $(".loading-screen").fadeOut(300);
   });
}

function searchByFLetter(letter) {
   $(".loading-screen").fadeIn(300);

   let allitems = ``;

   fetchAPi(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`).then((response) => {

      console.log(response)

      response.meals.forEach(element => {
         allitems += `
               
               <div class="col-md-3">
            <div>
               <div class="fcard  position-relative overflow-hidden rounded-2 cursor-pointer" onclick="displayMealDetails('${element.idMeal}')">
                  <img class="w-100 h-100" src="${element.strMealThumb}" />

                  <div class="foverlay position-absolute  d-flex justify-content-start align-items-center ">
                     <h5>${element.strMeal}</h5>
                  </div>
               </div>
            </div>
         </div>
            `;

      });

      document.getElementById('searchCon').innerHTML = allitems;

      $(".loading-screen").fadeOut(300);
   });
}


function showContacts() {
   closeSlide()
   let contactCon = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
   <div class="container w-75 text-center">
       <div class="row g-4">
           <div class="col-md-6">
               <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
               <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                   Special characters and numbers not allowed
               </div>
           </div>
           <div class="col-md-6">
               <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
               <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                   Email not valid *exemple@yyy.zzz
               </div>
           </div>
           <div class="col-md-6">
               <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
               <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                   Enter valid Phone Number
               </div>
           </div>
           <div class="col-md-6">
               <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
               <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                   Enter valid age
               </div>
           </div>
           <div class="col-md-6">
               <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
               <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                   Enter valid password *Minimum eight characters, at least one letter and one number:*
               </div>
           </div>
           <div class="col-md-6">
               <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
               <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                   Enter valid repassword 
               </div>
           </div>
       </div>
       <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
   </div>
</div> `

document.getElementById('show').innerHTML += contactCon;
   submitBtn = document.getElementById("submitBtn")


   document.getElementById("nameInput").addEventListener("focus", () => {
       nameInputTouched = true
   })

   document.getElementById("emailInput").addEventListener("focus", () => {
       emailInputTouched = true
   })

   document.getElementById("phoneInput").addEventListener("focus", () => {
       phoneInputTouched = true
   })

   document.getElementById("ageInput").addEventListener("focus", () => {
       ageInputTouched = true
   })

   document.getElementById("passwordInput").addEventListener("focus", () => {
       passwordInputTouched = true
   })

   document.getElementById("repasswordInput").addEventListener("focus", () => {
       repasswordInputTouched = true
   })

   
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;




function inputsValidation() {
   if (nameInputTouched) {
       if (nameValidation()) {
           document.getElementById("nameAlert").classList.replace("d-block", "d-none")

       } else {
           document.getElementById("nameAlert").classList.replace("d-none", "d-block")

       }
   }
   if (emailInputTouched) {

       if (emailValidation()) {
           document.getElementById("emailAlert").classList.replace("d-block", "d-none")
       } else {
           document.getElementById("emailAlert").classList.replace("d-none", "d-block")

       }
   }

   if (phoneInputTouched) {
       if (phoneValidation()) {
           document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
       } else {
           document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

       }
   }

   if (ageInputTouched) {
       if (ageValidation()) {
           document.getElementById("ageAlert").classList.replace("d-block", "d-none")
       } else {
           document.getElementById("ageAlert").classList.replace("d-none", "d-block")

       }
   }

   if (passwordInputTouched) {
       if (passwordValidation()) {
           document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
       } else {
           document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

       }
   }
   if (repasswordInputTouched) {
       if (repasswordValidation()) {
           document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
       } else {
           document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

       }
   }


   if (nameValidation() &&
       emailValidation() &&
       phoneValidation() &&
       ageValidation() &&
       passwordValidation() &&
       repasswordValidation()) {
       submitBtn.removeAttribute("disabled")
   } else {
       submitBtn.setAttribute("disabled", true)
   }
}

function nameValidation() {
   return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
   return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
   return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
   return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
   return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
   return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}
