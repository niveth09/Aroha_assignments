let noOfPosts = document.getElementById("no_of_posts");
noOfPosts.innerHTML = `Number of posts 0`;
let postsDiv = document.getElementById("posts");
let selectUserId = document.getElementById("user_id_select");
hideFilterSelect();
let promise;

function getSelectedOption(selectedOption) {
  hideFilterSelect();
  if (selectedOption === "top_five_posts") getTopMostPosts();
  else if (selectedOption === "top_five_unique_posts") uniqueId();
  else if (selectedOption === "filter_user-id")
    selectUserId.style.display = "inline-block";
}

async function getApi() {
  let url = "http://jsonplaceholder.typicode.com/posts";
  promise = await fetch(url).then((response) => response.json());
  noOfPosts.innerHTML = `Number of posts ${promise.length}`;
  noOfPosts.style.color = "#541bec";
  activateFilter();
}

function hideFilterSelect() {
  selectUserId.style.display = "none";
}

let writePosts = (json, header) => {
  let uniquePostsDiv = document.getElementById("unique_posts");

  let upperCaseKey;

  if (
    uniquePostsDiv.hasChildNodes() &&
    uniquePostsDiv.lastElementChild.className === "allPostsDiv"
  ) {
    uniquePostsDiv.removeChild(uniquePostsDiv.lastElementChild);
    uniquePostsDiv.removeChild(uniquePostsDiv.firstElementChild);
  }

  let head = document.createElement("h2");
  head.innerHTML = header;
  head.className = "head";
  uniquePostsDiv.appendChild(head);
  let allPostsDiv = document.createElement("div");
  allPostsDiv.className = "allPostsDiv";

  if (uniquePostsDiv.children.length === 1) {
    for (i = 0; i <= json.length; i++) {
      let postDiv = document.createElement("div");
      postDiv.className = "postDiv";
      for (key in json[i]) {
        let data = document.createElement("p");
        data.className = "data";
        upperCaseKey = key[0].toUpperCase() + key.slice(1);
        data.innerHTML = upperCaseKey + " : " + json[i][key];
        postDiv.appendChild(data);
      }
      allPostsDiv.appendChild(postDiv);
    }
    uniquePostsDiv.appendChild(allPostsDiv);
  }
};
let getTopMostPosts = () => {
  let json = [];
  promise.slice(0, 5).forEach((data) => {
    json.push({ title: data["title"], body: data["body"] });
  });
  writePosts(json, "Top 5 posts");
};

let uniqueId = () => {
  let uniqueId = [];
  let json = [];
  for (i = 0; i < promise.length; i++) {
    let flag = true;
    for (j = 0; j < uniqueId.length; j++) {
      if (promise[i]["userId"] === uniqueId[j]) {
        flag = false;
        break;
      }
    }
    if (flag) {
      uniqueId.push(promise[i]["userId"]);
      json.push({
        userId: promise[i]["userId"],
        title: promise[i]["title"],
        body: promise[i]["body"],
      });
    }

    if (uniqueId.length === 5) break;
  }
  writePosts(json, "Top 5 unique user-id posts");
};

let getUserIdSelectedOption = (value) => {
  filteredResults(value);
};

let filteredResults = (selectedOption) => {
  let filteredArray = [];
  for (i = 0; i < promise.length; i++) {
    if (selectedOption == promise[i]["userId"]) {
      filteredArray.push({
        "User id": promise[i]["userId"],
        Title: promise[i]["title"],
        Body: promise[i]["body"],
      });
    }
  }
  writePosts(filteredArray, "Filtered results");
};

let activateFilter = () => {
  let selectedOption = document.getElementById("kind_of_posts_select");
  selectedOption.disabled = false;
};

// let filter = (selectedOption) => {
//   selectUserId.style.display = "block";
//   let filteredDiv = document.createElement("div");
//   filteredDiv.className = "filteredDiv";
//   for (i = 0; i < promise.length; i++) {
//     let postDiv = document.createElement("div");
//     if (selectedOption == promise[i]["userId"]) {
//       postDiv.className = "postDiv";
//       let data = document.createElement("p");
//       data.className = "data";

//       data.innerHTML =
//         "User ID" +
//         " : " +
//         promise[i]["userId"] +
//         "<br>" +
//         "<br>" +
//         "Title" +
//         " : " +
//         promise[i]["title"] +
//         "<br>" +
//         "<br>" +
//         "Body" +
//         " : " +
//         promise[i]["body"];

//       postDiv.appendChild(data);

//       filteredDiv.appendChild(postDiv);
//     }
//   }

//   if (postsDiv.lastElementChild.className === "filteredDiv")
//     postsDiv.removeChild(postsDiv.lastElementChild);
//   postsDiv.appendChild(filteredDiv);
// };
