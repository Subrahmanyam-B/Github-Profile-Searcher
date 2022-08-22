const API = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search"); 

async function getUser(user) {
   const resp = await fetch(API + user);
   const respData = await resp.json();

   createUserCard(respData);

   getRepos(user);
};

async function getRepos(user){
   const resp = await fetch(API + user  + '/repos');
   const respData = await resp.json();

   addReposToCard(respData);
}



function createUserCard(user){

   const cardHTML = `
      <div class="card b-shadow">
         <div class="image">
            <img src="${user.avatar_url}" alt="${user.login}">
         </div>
         <div class="text">
            <div class="name">
               <h2>${user.login}</h2>
            </div>
            <div class="bio">
               <p>${user.bio}</p>
            </div>
            <div class="footer">
               <ul>
                  <li>${user.followers} <span>Followers</span></li>
                  <li>${user.following} <span>Following</span></li>
                  <li>${user.public_repos} <span>Repos</span></li>
               </ul>
               <h3>Repos:</h3>
               <ul class = "repos" id = "repos"></ul>
            </div>
         </div>
      </div>
   `;

   main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
   const reposEl = document.getElementById("repos");

   repos.forEach(repo => {
      const repoEl = document.createElement("a");
      repoEl.classList.add('repo');

      repoEl.href= repo.html_url;
      repoEl.taget= "_blank";
      repoEl.innerText = repo.name;

      reposEl.appendChild(repoEl);
   })
}

form.addEventListener('submit', e => {
   e.preventDefault();

   const user = search.value;

   if (user){
      getUser(user);

      search.value="";
   }
})