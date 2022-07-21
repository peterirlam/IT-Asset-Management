function doPost(e) {
  if (typeof e !== "undefined") let role = e.parameter.role;
  let workplace = e.parameter.workplace;
  let team = e.parameter.team;
  let name = e.parameter.name_001.replace(/^\s+|\s+$/g, "");
  let email = e.parameter.email_001.replace(/^\s+|\s+$/g, "");
  let phone = e.parameter.phone_001.replace(/^\s+|\s+$/g, "");
  let leavingdate = e.parameter.leavingdate;
  let startingdate = e.parameter.startingdate;
  let addrline1 = e.parameter.addrline1_001.replace(/^\s+|\s+$/g, "");
  let addrline2 = e.parameter.addrline2_001.replace(/^\s+|\s+$/g, "");
  let town = e.parameter.town_001.replace(/^\s+|\s+$/g, "");
  let county = e.parameter.county_001.replace(/^\s+|\s+$/g, "");
  let postcode = e.parameter.postcode_001.replace(/^\s+|\s+$/g, "");
  let reasonforleaving = e.parameter.reasonforleaving;
  let outstandingexpenses = e.parameter.outstandingexpenses;
  let charityequipment = e.parameter.charityequipment;
  let days_in_post = e.parameter.days_in_post;
  let html = HtmlService.createTemplateFromFile("Thankyou");
  return html
    .evaluate()
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
/* Get the URL for the Google Apps Script running as a WebApp.*/
function getScriptUrl() {
  let url = ScriptApp.getService().getUrl();
  return url;
}
function doGet(e) {
  let currentuser = Session.getActiveUser().getEmail();
  let authusers = ["admin@calancs.org.uk", "pirlam@calw.org.uk"];
  let isauthorised = authusers.indexOf(currentuser);
  if (isauthorised >= 0) {
    return HtmlService.createHtmlOutputFromFile("Form");
  } else {
    let html = HtmlService.createTemplateFromFile("Error");
    html.currentuser = currentuser;
    return html
      .evaluate()
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    //return HtmlService.createHtmlOutputFromFile('Error');
  }
}
function ordinal_suffix_of(i) {
  let j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return "st";
  }
  if (j == 2 && k != 12) {
    return "nd";
  }
  if (j == 3 && k != 13) {
    return "rd";
  }
  return "th";
}
function getLongDateFormat(dateArray) {
  let ordinal;
  let day;
  if (dateArray[0].substring(0, 1) == "0") {
    ordinal = ordinal_suffix_of(dateArray[0].substring(1));
    day = dateArray[0].substring(1);
  } else {
    ordinal = ordinal_suffix_of(dateArray[0]);
    day = dateArray[0];
  }
  let monthname;
  switch (dateArray[1]) {
    case "01":
      monthname = "January";
      break;

    case "02":
      monthname = "February";
      break;

    case "03":
      monthname = "March";
      break;

    case "04":
      monthname = "April";
      break;

    case "05":
      monthname = "May";
      break;

    case "06":
      monthname = "June";
      break;

    case "07":
      monthname = "July";
      break;

    case "08":
      monthname = "August";
      break;

    case "09":
      monthname = "September";
      break;

    case "10":
      monthname = "October";
      break;

    case "11":
      monthname = "November";
      break;

    case "12":
      monthname = "December";
      break;
  }
  return day + " " + monthname + " " + dateArray[2];
}

