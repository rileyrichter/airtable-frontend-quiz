// Using on the quiz page
$("#one-one, #one-two, #one-three, #one-four").each(function () {
  $(this).on("click", function () {
    let answerOne = $(this).attr("data-answer");
    localStorage.setItem("answerOne", answerOne);
  });
});

$("#two-one, #two-two, #two-three, #two-four").each(function () {
  $(this).on("click", function () {
    let answerTwo = $(this).attr("data-answer");
    localStorage.setItem("answerTwo", answerTwo);
  });
});

$("#three-one, #three-two, #three-three, #three-four").each(function () {
  $(this).on("click", function () {
    let answerThree = $(this).attr("data-answer");
    localStorage.setItem("answerThree", answerThree);
  });
});

$("#four-one, #four-two, #four-three, #four-four").each(function () {
  $(this).on("click", function () {
    let answerFour = $(this).attr("data-answer");
    localStorage.setItem("answerFour", answerFour);
  });
});

$("#resultsbutton").click(function () {
  document.getElementById("getresultswrapper").remove();
  document.getElementById("loading").style.display = "block";
  const handleError = (response) => {
    if (!response.ok) {
      throw Error(` ${response.status} ${response.statusText}`);
    } else {
      return response.json();
    }
  }; //handler function that throws any encountered error

  let answerOne = Number(localStorage.getItem("answerOne"));
  let answerTwo = Number(localStorage.getItem("answerTwo"));
  let answerThree = Number(localStorage.getItem("answerThree"));
  let answerFour = Number(localStorage.getItem("answerFour"));

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let requestOptions = {
    method: "post",
    headers: myHeaders,
    redirect: "follow",
    body: JSON.stringify([
      {
        Answer1: answerOne,
        Answer2: answerTwo,
        Answer3: answerThree,
        Answer4: answerFour,
      },
    ]),
  };

  fetch(
    "https://v1.nocodeapi.com/rileyrichter/airtable/wGRtITsHIdOIbHzn?tableName=quiz",
    requestOptions
  )
    .then(handleError) // skips to .catch if error is thrown
    .then((data) => {
      let myResult = data[0].id;
      localStorage.setItem("resultid", myResult);
    })
    .catch(function writeError(err) {
      // catches the error and logs it
      console.log(err);
    })
    .finally(() => {
      pullResults();
    });
});

function pullResults() {
  // Using on the results page
  const resultId = localStorage.getItem("resultid");
  const resultURL =
    "https://v1.nocodeapi.com/rileyrichter/airtable/wGRtITsHIdOIbHzn/record?tableName=quiz&id=" +
    resultId;
  const resultroot = document.getElementById("results");

  var myNewHeaders = new Headers();
  myNewHeaders.append("Content-Type", "application/json");
  var newRequestOptions = {
    method: "get",
    headers: myNewHeaders,
    redirect: "follow",
  };

  const newHandleError = (response) => {
    if (!response.ok) {
      throw Error(` ${response.status} ${response.statusText}`);
    } else {
      return response.json();
    }
  }; //handler function that throws any encountered error

  fetch(resultURL, newRequestOptions)
    .then(newHandleError) // skips to .catch if error is thrown
    .then((data) => {
      let contentTarget = document.getElementById("result-target");
      let youAre = document.createElement("p");
      youAre.setAttribute("class", "result-name");
      youAre.textContent = "You are " + data.fields.result_send;
      contentTarget.appendChild(youAre);
      let yourImage = document.createElement("img");
      yourImage.setAttribute("src", data.fields.result_image);
      yourImage.setAttribute(
        "alt",
        data.fields.result_send + "from the TV show Ted Lasso"
      );
      yourImage.setAttribute("class", "result-image");
      contentTarget.appendChild(yourImage);
      let yourDescription = document.createElement("p");
      yourDescription.setAttribute("class", "result-description");
      yourDescription.textContent = data.fields.result_description;
      contentTarget.appendChild(yourDescription);
    })
    .catch(function writeResultError(err) {
      // catches the error and logs it
    })
    .finally(() => {
      localStorage.clear();
      document.getElementById("loading").remove();
    });
}
