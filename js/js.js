var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var submitBtn = document.getElementById("submitBtn");
var searchInput = document.getElementById("search");
var inputs = document.getElementsByClassName("form");
var sites = [];
var currentIndex = 0;
var siteNameRegax = /^[^ ]/;
var siteUrlRegax = /^[^ ]/;
var siteNameAlert = document.querySelector(".siteNameAlert");
var siteUrlAlert = document.querySelector(".UrlNameAlert");

submitBtn.onclick = function () {
  if (submitBtn.innerHTML == "Submit") {
    if (siteNameCheck() == true) {
      siteNameAlert.classList.add("alert");
      document.querySelector(".siteNameAlert").innerHTML =
        "this Name already exist";
        console.log(siteNameCheck())
    } else if (
      siteNameCheck() != true &&
      siteNameRegax.test(siteNameInput.value) == true &&
      siteUrlRegax.test(siteUrlInput.value) == true
    ) {
      addSite();
      siteNameAlert.classList.remove("alert");
      document.querySelector(".siteNameAlert").innerHTML = "";
      siteUrlAlert.classList.remove("alert");
      document.querySelector(".UrlNameAlert").innerHTML = "";
      clearInputs();
      console.log(siteNameCheck())
    } else if (
      siteNameRegax.test(siteNameInput.value) != true ||
      siteUrlRegax.test(siteUrlInput.value) != true
    ) {
      siteNameAlert.classList.add("alert");
      document.querySelector(".siteNameAlert").innerHTML =
        "Name is not valid Don't start with Space";
      siteUrlAlert.classList.add("alert");
      document.querySelector(".UrlNameAlert").innerHTML =
        "Url is not valid Don't start with Space";
    }
  } else {
    updateSite();
    clearInputs();
  }
  displaySite();
};
if (JSON.parse(localStorage.getItem("siteList")) != null) {
  sites = JSON.parse(localStorage.getItem("siteList"));
  displaySite();
}
function addSite() {
  var site = {
    name: siteNameInput.value,
    url: siteUrlInput.value,
  };
  sites.push(site);
  localStorage.setItem("siteList", JSON.stringify(sites));
}
function displaySite() {
  cartona = "";
  for (var i = 0; i < sites.length; i++) {
    cartona += `<div class="row box">
        <div class="col-4">
            <h2>${sites[i].name}</h2>
        </div>
        <div class="col-8">
            <a class="btn btn-blue" href="${addHttp(
              i
            )}" target="_blank">visit</a>
            <button onclick="deleteSite(${i})" class="btn btn-red">Delete</button>
            <button onclick="getSiteInfo(${i})" class="btn btn-green">Update</button>
        </div>
    </div>`;
  }
  document.getElementById("bookmarkList").innerHTML = cartona;
}

function deleteSite(index) {
  sites.splice(index, 1);
  displaySite();
  localStorage.setItem("siteList", JSON.stringify(sites));
}

function clearInputs() {
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
}
searchInput.onkeyup = function () {
  var cartona = "";
  for (i = 0; i < sites.length; i++) {
    if (sites[i].name.toLowerCase().includes(searchInput.value.toLowerCase())) {
      cartona += `<div class="row box">
      <div class="col-4">
          <h2>${sites[i].name}</h2>
      </div>
      <div class="col-8">
          <a class="btn btn-blue" href="${addHttp(
            i
          )}" target="_blank">visit</a>
          <button onclick="deleteSite(${i})" class="btn btn-red">Delete</button>
          <button onclick="getSiteInfo(${i})" class="btn btn-green">Update</button>
      </div>
  </div>`;
    }
  }
  document.getElementById("bookmarkList").innerHTML = cartona;
};

function addHttp(i) {
  if (
    sites[i].url.includes("http://") != true &&
    sites[i].url.includes("https://") != true
  ) {
    return "http://" + sites[i].url;
  } else {
    return sites[i].url;
  }
}

function getSiteInfo(index) {
  currentIndex = index;
  var currentSite = sites[index];
  siteNameInput.value = currentSite.name;
  siteUrlInput.value = currentSite.url;
  submitBtn.innerHTML = "Update Site";
  siteNameAlert.classList.remove("alert");
  document.querySelector(".siteNameAlert").innerHTML = "";
  siteUrlAlert.classList.remove("alert");
  document.querySelector(".UrlNameAlert").innerHTML = "";
}
function updateSite() {
  var site = {
    name: siteNameInput.value,
    url: siteUrlInput.value,
  };
  sites[currentIndex] = site;
  localStorage.setItem("siteList", JSON.stringify(sites));
  submitBtn.innerHTML = "Submit";
}

function siteNameCheck() {
  var checkSiteName = false;
  for (var i = 0; i < sites.length; i++) {
    if (sites[i].name == siteNameInput.value) {
      checkSiteName = true;
      console.log(checkSiteName)
    }
  }
  return checkSiteName;
}