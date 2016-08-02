function ChangeLanguage() {
  var url = $(document)[0].URL;
  console.log(url);
  var i = url.lastIndexOf("/");
  var currpage = url.substr(i+1);
  var newpage = GetNewPage(currpage);
//  console.log(url);
//  console.log(url.substr(0,i+1) + newpage);
  window.location.href = url.substr(0,i+1) + newpage;
}

function GetNewPage(currpage) {
  var lang = $(document)[0].getElementById("lang");
//  console.log(lang);
//  console.log(lang.value);
  var newpage;
  switch (lang.value) {
  case "English":
    switch (currpage) {
    case "index_ch1.html":
      newpage = "index.html"; break;
    case "mywork_ch1.html":
      newpage = "mywork.html"; break;
    case "more_ch1.html":
      newpage = "more.html"; break;
    case "personal_ch1.html":
      newpage = "personal.html"; break;
    }
    break;
  case "Chinese1":
    switch (currpage) {
    case "index.html":
      newpage = "index_ch1.html"; break;
    case "mywork.html":
      newpage = "mywork_ch1.html"; break;
    case "more.html":
      newpage = "more_ch1.html"; break;
    case "personal.html":
      newpage = "personal_ch1.html"; break;
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
