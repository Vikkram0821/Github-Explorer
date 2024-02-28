//Initializing elements
const btnHistory = document.querySelector(".btn-Search");
const searchBtn = document.querySelector(".btn-find");
const input = document.querySelector(".input-user");
const viewProfile = document.querySelector(".view-profile");
const profile = document.querySelector(".profile");
const repoContainer = document.querySelector(".repo-val")
const repositoryTxt = document.querySelector(".repo-name")
const history = document.querySelector('.history');
const clearAll = document.querySelector('.clr-all')



const getUserDetails = async function(username){
  const res = await fetch(`https://api.github.com/users/${username}`);
  const data =  await res.json();
  console.log(data)
  let createdDate = (data.created_at.slice(8,10)+"/"+ data.created_at.slice(5,7)+"/"+data.created_at.slice(0,4) );
  console.log(createdDate);

  const res1 = await fetch(`https://api.github.com/users/${username}/repos`);
  const data1 =  await res1.json();

console.log(data1.length)

  let html = `
  <div class="img_btn">
  <div> <img class="profile-img" src="${data.avatar_url}"></div>
  <div class="prof-btn"><a class="view-profile" href="https://github.com/${username}">View profile</a></div>
</div>
<div style="margin-left: 30px;">
  <div style="display: flex;">
    <h3><span class="span a">PUBLIC REPOS:${data.public_repos}</span></h3>
    <h3><span class="span b" >PUBLIC GISTS: ${data.public_gists}</span></h3>
    <h3><span class="span c">FOLLOWERS: ${data.followers}</span>
      <h3><span class="span d">FOLLOWING: ${data.following}</span></h3>
  </h3>
  
  </div>
  <div>
      <h1 class="name v1" >${data.name}</h1>
      <h2 class="Description ">${data.bio}</h2>
      <h4><span class="details gap">Company: <span class="gap">${data.company}</span></span></h3>
      <h4><span class="details gap">Location: <span class="gap">${data.location}</span></span></h3>
      <h4><span class="details gap">Blog/website: <span class="gap">${data.blog}</span></span> </h3>
      <h4><span class="details gap">Member since: <span class="gap">${createdDate}</span> </span></h3>
      
  </div>
</div>
  `;

profile.insertAdjacentHTML("afterbegin",html);
data1.forEach((val,i) => {

  let html2 = `
     <div class="r1">
        <div class="name_repo" ">
            <div class="name_of_repo"><span class="repo_main_name">${data1[i].name}<span></div>
            <div class="lang_used">Language used :<span class="lng-text"> ${data1[i].language}</span> </div>
        </div>
        <div class="repo_detail">
          <div class="D D1">STARS:${data1[i].stargazers_count}</div>
          <div class="D D2">FORKS: ${data1[i].forks}</div>
          <div class="D D3">WATCHERS:${data1[i].watchers_count}</div>
        </div>
    </div>
`
repoContainer.insertAdjacentHTML("afterbegin",html2);

});

let hist1 = `
  <div class="history-1">
  <img src="${data.avatar_url}" class="img-u">
  <h1 class="u-name">${data.name}</h1>
  </div>
  `;

console.log(history);
history.insertAdjacentHTML("beforeend",hist1)
}

input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    profile.innerHTML = "";
  
    profile.classList.remove("hidden")
    repoContainer.classList.remove("hidden")
    repositoryTxt.classList.remove("hidden")
    repoContainer.innerHTML="";
  
  
    getUserDetails(input.value);
    input.value="";
    btnHistory.addEventListener("click", function(){
    history.classList.toggle("hidden");
  })}
  })


searchBtn.addEventListener("click",function(e){
  e.preventDefault();
  profile.innerHTML = "";
  
  profile.classList.remove("hidden")
  repoContainer.classList.remove("hidden")
  repositoryTxt.classList.remove("hidden")
  repoContainer.innerHTML="";


  getUserDetails(input.value);
  input.value="";
  btnHistory.addEventListener("click", function(){
  history.classList.toggle("hidden");
  })

  clearAll.addEventListener("click",function(){
    history.innerHTML = "";
    history.classList.add("hidden");
  })
})

