document.querySelector(".button-container")
    .addEventListener("click", () => {
        let text = document.getElementById("filter-jobs").value.toLowerCase();
        console.log(text);
        getJobs().then(jobs => {
            let filteredJobs = filterJobs(jobs, text);
            console.log("main", filteredJobs)
            showJobs(filteredJobs);
        })
    })

function getJobs() {
    return fetch("data.json")
        .then(response => response.json())
        .then(data => {
            console.log(data)
            return data
        })
}

function filterJobs(jobs, searchText) {
    if (searchText) {

        console.log("in filter", jobs)
        let filteredJobs = jobs.filter(job => {
            if (job.title.toLowerCase().includes(searchText) ||
                job.original_language.toLowerCase().includes(searchText) ||
                job.overview.toLowerCase().includes(searchText)) {
                return true;
            } else {
                return false;
            }
        })
        console.log("infilter", filteredJobs)
        return filteredJobs;
    } else {
        return jobs;
    }
}



function showJobs(jobs) {
    let jobsContainer = document.querySelector(".jobs-container");
    let jobsHTML = "";
    const imagePath = "https://image.tmdb.org/t/p/w1280";;
    // let pics = jobs.results.poster_path;
    // let images = `https: //image.tmdb.org/t/p/original/${jobs.results.poster_path}`
    // console.log(images)
    // jobs = jobs.results;
    // <img src= "${job.poster_path}"/>

    jobs.forEach(job => {

        let { title, overview, release_date, poster_path, genre_ids, vote_average, adult, original_language } = job;
        let pg13 = job.adult ? 'Yes' : 'No';
        console.log(job)
        jobsHTML += `
            <div class="job-tile">
                <div class="top">

             <img src='${imagePath + poster_path}' alt='${title} image' />

                    <span class="material-icons more_horiz">more_horiz</span>
                </div>
                <div class="rolename">
                    <span>${title}</span>

                </div>

                <div class="description">
                    <span>${overview}</span>
                </div>
                <div class="buttons">
                    <div class="button vote-average">
                        <span>Average rating:<em>${vote_average}</em></span>
                    </div>
                    <div class="button messages">
                       <span>Language:<em>${original_language}</em></span>
                    </div>
                </div>   
                 <div class="overview">
                     <h3>Genre Id:<span>${genre_ids}</span></h3>
                    <h3>Date Released:<span>${release_date}</span></h3>
                     <h3>PG-13:<span>${pg13}</span></h3>
                     </div>
            </div>

        `
    })

    jobsContainer.innerHTML = jobsHTML;
}



// when the application is loaded
getJobs().then(data => {
    console.log(data)
    showJobs(data);
});