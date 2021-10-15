const answerOne = "4";
const answerTwo = "4";

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
var requestOptions = {
  method: "post",
  headers: myHeaders,
  redirect: "follow",
  body: JSON.stringify([
    { title: "Example 2", website: "https://example2.com" },
  ]),
};

fetch(
  "https://v1.nocodeapi.com/rileyrichter/airtable/wGRtITsHIdOIbHzn?tableName=quiz",
  requestOptions
)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));
