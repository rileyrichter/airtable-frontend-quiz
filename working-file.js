// Using on the quiz page
const answerOne = 4;
const answerTwo = 4;

let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
let requestOptions = {
  method: "post",
  headers: myHeaders,
  redirect: "follow",
  body: JSON.stringify([{ Answer1: answerOne, Answer2: answerTwo }]),
};

$(document).ready(function () {
  const handleError = (response) => {
    if (!response.ok) {
      throw Error(` ${response.status} ${response.statusText}`);
    } else {
      return response.json();
    }
  }; //handler function that throws any encountered error

  fetch(
    "https://v1.nocodeapi.com/rileyrichter/airtable/wGRtITsHIdOIbHzn?tableName=quiz",
    requestOptions
  )
    .then(handleError) // skips to .catch if error is thrown
    .then((data) => {
      let myResult = data[0].id;
      localStorage.setItem("resultid", myResult);
      console.log(myResult);
    })
    .catch(function writeError(err) {
      // catches the error and logs it
    })
    .finally(() => {
      window.location.replace("https://2w21z.csb.app/results.html");
    });
});

// Using on the results page
const resultId = localStorage.getItem("resultid");
const resultURL =
  "https://v1.nocodeapi.com/rileyrichter/airtable/wGRtITsHIdOIbHzn/record?tableName=quiz&id=" +
  resultId;
const resultroot = document.getElementById("results");

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
var requestOptions = {
  method: "get",
  headers: myHeaders,
  redirect: "follow",
};

$(document).ready(function () {
  const handleError = (response) => {
    if (!response.ok) {
      throw Error(` ${response.status} ${response.statusText}`);
    } else {
      return response.json();
    }
  }; //handler function that throws any encountered error

  fetch(resultURL, requestOptions)
    .then(handleError) // skips to .catch if error is thrown
    .then((data) => {
      console.log(data);
      let youAre = data.fields.result_send;
      console.log(youAre);
      let resultwrapper = document.createElement("div");
      resultroot.appendChild(resultwrapper);
      let resulttext = document.createElement("p");
      resultwrapper.appendChild(resulttext);
      resulttext.textContent = "You are " + youAre;
    })
    .catch(function writeError(err) {
      // catches the error and logs it
    });

  const resultId = localStorage.getItem("resultid");
});
