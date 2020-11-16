const sectionRight = document.querySelector('section.right');
const sectionBody = document.querySelector('section.body');
const handle = document.querySelector('a.handle');
const username = document.querySelectorAll('p.user');
const names = document.querySelectorAll('p.fname');
const repoCount = document.querySelectorAll('span.repo-count');
const bio = document.querySelectorAll('p.my-bio');
const loader = document.querySelector('section.loader');
import {config} from './config.js'
const accessKey=config().accessKey;
function format(element, value) {
	element.textContent = value;
}

function formatAll(elements, value) {
	elements.forEach(element => {
		element.textContent = value;
	});
}

function getMonth(date) {
	// get month name from a date
	let month = '';
	switch (date.getMonth()) {
		case 0:
			month = 'Jan';
			break;
		case 1:
			month = 'Feb'
			break;
		case 2:
			month = 'Mar';
			break;
		case 3:
			month = 'Apr'
			break;
		case 4:
			month = 'May';
			break;
		case 5:
			month = 'Jun'
			break;
		case 6:
			month = 'Jul'
			break;
		case 7:
			month = 'Aug'
			break;
		case 8:
			month = 'Sep'
			break;
		case 9:
			month = 'Oct'
			break;
		case 10:
			month = 'Nov'
			break;
		case 11:
			month = 'Dec'
			break;
		default:
			month = 'Jul'
	}
	return month;
}

function dateFilter(date) {
	// to format Update date of the repo
	const updateDate = new Date(date);
     const presentDate = Date.now();
     const secDifference=(presentDate - updateDate) / (1000);
     const minDifference=(presentDate - updateDate) / (1000 * 60 );
     const hrDifference=(presentDate - updateDate) / (1000 * 60 * 60);
	const daysDifference = (presentDate - updateDate) / (1000 * 60 * 60 * 24);
     
     // if last update is less than a minute
     if(secDifference<60){
          return `${Math.round(secDifference)} seconds ago`
     }
     // if last update is less than an hour
     else if(minDifference<60){
          return `${Math.round(minDifference)} minutess ago`
     }
     // if last update is less than a day
     else if(hrDifference<24){
          return `${Math.round(hrDifference)} hours ago`
     }
     // if last update is less than a month
     else if(daysDifference<28){
          return `${Math.round(daysDifference)} days ago`
     }
     // if last update is over a month
     else{
          return `on ${getMonth(updateDate)} ${updateDate.getDate()}`
     }
}

function createRepoDetails(repo) {
	// creates the repo container based on data fetched from the github api
	const temp = document.createElement('div');
	temp.classList.add('repo-details');
	let forked = "";
	let forks = "";
	let license = "";
	let description = "";
	//checks if the repo was forked
	if (repo.parent) {
		forked = `<p class="forked">Forked from <a href="https://github.com/${repo.parent.nameWithOwner}">${repo.parent.nameWithOwner}</a></p>`
		forks = ` 
          <div>
               <a href="https://github.com/readwarn/${repo.name}/network/members" class="fork-link">
               <svg aria-label="fork" class="" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img"><path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path></svg>
               ${repo.parent.forkCount}
               </a>
          </div>`
	}
	// checks if the repo licence was set
	if (repo.licenseInfo) {
		license = `
          <div>
               <svg class="" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8.75.75a.75.75 0 00-1.5 0V2h-.984c-.305 0-.604.08-.869.23l-1.288.737A.25.25 0 013.984 3H1.75a.75.75 0 000 1.5h.428L.066 9.192a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.514 3.514 0 00.686.45A4.492 4.492 0 003 11c.88 0 1.556-.22 2.023-.454a3.515 3.515 0 00.686-.45l.045-.04.016-.015.006-.006.002-.002.001-.002L5.25 9.5l.53.53a.75.75 0 00.154-.838L3.822 4.5h.162c.305 0 .604-.08.869-.23l1.289-.737a.25.25 0 01.124-.033h.984V13h-2.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-2.5V3.5h.984a.25.25 0 01.124.033l1.29.736c.264.152.563.231.868.231h.162l-2.112 4.692a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.517 3.517 0 00.686.45A4.492 4.492 0 0013 11c.88 0 1.556-.22 2.023-.454a3.512 3.512 0 00.686-.45l.045-.04.01-.01.006-.005.006-.006.002-.002.001-.002-.529-.531.53.53a.75.75 0 00.154-.838L13.823 4.5h.427a.75.75 0 000-1.5h-2.234a.25.25 0 01-.124-.033l-1.29-.736A1.75 1.75 0 009.735 2H8.75V.75zM1.695 9.227c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327l-1.305 2.9zm10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327l-1.305 2.9z"></path></svg>
               <p>${repo.licenseInfo.name}</p>
          </div>`
	}
	// checks if the repo has a description
	if (repo.description) {
		description = `<p class="info">${repo.description}</p>`
	}
	temp.innerHTML = `
     <div class="repo-body">
          <a href="https://github.com/readwarn/${repo.name}" class="r-link">${repo.name}</a>
          ${forked}
          ${description}
          <div class="repo-tags">
               <div>
                    <span class="lang-color" style="background:${repo.primaryLanguage.color}"></span>
                    <p>${repo.primaryLanguage.name}</p>
               </div>
               ${forks}
               ${license}
               <div>
               <p>Updated ${dateFilter(repo.updatedAt)}</p>
               </div>
          </div>
          </div>
          <div class="star">
               <button><svg class="" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
               Star 
          </button>
     </div>`
	sectionRight.appendChild(temp);
}

//renders the repo container after the data is fetched
function renderRepos(repos) {
	repos.forEach(repo => {
		createRepoDetails(repo)
	});
}

// graphql query to fetch data form github 
const query = `query {
    user(login:"readwarn"){
      name
      twitterUsername
      login
      bio
       repositories(first:20,orderBy:{field:PUSHED_AT,direction:DESC}){
          totalCount  
          nodes{
            name
            updatedAt
            description
             licenseInfo{
                name
              }
            parent{
              forkCount
              nameWithOwner
            }
            primaryLanguage{
              name
              color
            }
          }
      }
    }
  }`

fetch('https://api.github.com/graphql', 
         {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authorization': 'Bearer '+accessKey,
		},
		body: JSON.stringify({
			query
		})
	})
	.then(response => response.json())
	.then(value => {
		const user = value.data.user;
		const repos = user.repositories.nodes;
		format(handle, `@${user.twitterUsername}`);
		formatAll(username, user.login);
		formatAll(names, user.name);
		formatAll(bio, user.bio);
		formatAll(repoCount, user.repositories.totalCount);
		renderRepos(repos);
		loader.style.display = 'none';
	});


const bars = document.getElementById('bar');
const navbar = document.getElementById('navbar');
const search = document.getElementById('search');
const slash = document.getElementById('slash');
const input = document.getElementById('input');

// to toggle the navbar
bars.addEventListener('click', function () {
	navbar.classList.toggle('showLinks');
})

// to enlarge the searchbox on clicking
search.addEventListener('click', function () {
	this.classList.add('enlargeSearh');
	slash.classList.add('hideSlash');
})

// set the searchbox back to default size on clicking other part of the body aside the searchbox
document.body.addEventListener('click', function (event) {
	if (event.target !== input) {
		search.classList.remove('enlargeSearh');
		slash.classList.remove('hideSlash');
	}
});

const tabNav = document.querySelector('div.tabs');
const tablink = document.querySelector('div.tab-links');
const secLeft = document.querySelector('section.left');
const avi = document.querySelector('div.avi img');
const user = document.querySelector('div.tabs div.user');


// to fixed the tablinks nav on scrolling
window.addEventListener('scroll', function () {
	// offset position of the nav at desktop view
	const offset1 = navbar.clientHeight;
	//offset position of the nav at mobile view
	const offset2 = (tabNav.clientHeight - tablink.clientHeight) + navbar.clientHeight;
	if (window.pageYOffset >= offset1 + 20) {
		tabNav.classList.add('fixed');
	} else {
		tabNav.classList.remove('fixed');
	}
	if (window.pageYOffset >= offset2 && offset2 > 200) {
		tablink.classList.add('fixed');
		sectionBody.classList.add('fixed');
	} else {
		tablink.classList.remove('fixed');
		sectionBody.classList.remove('fixed');
	}

	// to show user small avi on the tab nav on scrolling past the bigger avi
	const scroll = secLeft.offsetTop + avi.clientHeight;
	if (scroll > 0 && window.pageYOffset >= scroll) {
		user.classList.remove('hide');
	} else {
		user.classList.add('hide');
	}

})