function ChangeLanguage() {
  var url = $(document)[0].URL;
  console.log(url);
  var i = url.lastIndexOf("/");
  var j = i - 1;
  for ( ; url[j] != '/'; j--);
  var currpage = url.substr(j+1);
  console.log(currpage);
  var newpage = GetNewPage(currpage);
  console.log(url);
  console.log(url.substr(0,j+1) + newpage);
  window.location.href = url.substr(0,j+1) + newpage;
}

function GetNewPage(currpage) {
  var lang = $(document)[0].getElementById("lang");
//  console.log(lang.value);
  var newpage;
  switch (lang.value) {
  case "English":
    switch (currpage) {
    case "ch1/index.html":
      newpage = "en/index.html"; break;
    case "ch1/mywork.html":
      newpage = "en/mywork.html"; break;
    case "ch1/more.html":
      newpage = "en/more.html"; break;
    case "ch1/personal.html":
      newpage = "en/personal.html"; break;
    }
    switch (currpage) {
    case "ch2/index.html":
      newpage = "en/index.html"; break;
    case "ch2/mywork.html":
      newpage = "en/mywork.html"; break;
    case "ch2/more.html":
      newpage = "en/more.html"; break;
    case "ch2/personal.html":
      newpage = "en/personal.html"; break;
    }
    break;
  case "Chinese1":
    switch (currpage) {
    case "en/index.html":
      newpage = "ch1/index.html"; break;
    case "en/mywork.html":
      newpage = "ch1/mywork.html"; break;
    case "en/more.html":
      newpage = "ch1/more.html"; break;
    case "en/personal.html":
      newpage = "ch1/personal.html"; break;
    }
    switch (currpage) {
    case "ch2/index.html":
      newpage = "ch1/index.html"; break;
    case "ch2/mywork.html":
      newpage = "ch1/mywork.html"; break;
    case "ch2/more.html":
      newpage = "ch1/more.html"; break;
    case "ch2/personal.html":
      newpage = "ch1/personal.html"; break;
    }
    break;
  case "Chinese2":
    switch (currpage) {
    case "en/index.html":
      newpage = "ch2/index.html"; break;
    case "en/mywork.html":
      newpage = "ch2/mywork.html"; break;
    case "en/more.html":
      newpage = "ch2/more.html"; break;
    case "en/personal.html":
      newpage = "ch2/personal.html"; break;
    }
    switch (currpage) {
    case "ch1/index.html":
      newpage = "ch2/index.html"; break;
    case "ch1/mywork.html":
      newpage = "ch2/mywork.html"; break;
    case "ch1/more.html":
      newpage = "ch2/more.html"; break;
    case "ch1/personal.html":
      newpage = "ch2/personal.html"; break;
    }
    break;
  }

  return newpage;
}

// All-in-one Internal Site Search script- By JavaScriptKit.com (http://www.javascriptkit.com)
// For this and over 400+ free scripts, visit JavaScript Kit- http://www.javascriptkit.com/
// This notice must stay intact for use
var searchaction=[ //form action for the 3 search engines
  "http://www.google.com/search",
  "http://search.yahoo.com/search",
  "http://search.msn.com/results.aspx"
];
var queryfieldname=["q","p","q"]; //name of hidden query form for the 3 search engines

function switchaction(cur, index) {
  cur.form.action=searchaction[index];
  $(document)[0].getElementById("hiddenquery").name=queryfieldname[index];
}

function jksitesearch(curobj) {
  console.log(domainroot);
  for (i=0; i< $(document)[0].jksearch.se.length; i++) { //loop through radio to see which is checked
    if ($(document)[0].jksearch.se[i].checked==true)
      switchaction($(document)[0].jksearch.se[i], i)
  }
  $(document)[0].getElementById("hiddenquery").value="site:"+domainroot+" "+curobj.qfront.value;
}
