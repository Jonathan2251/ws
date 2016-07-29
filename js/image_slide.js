$(document).ready(function() {
  var url = $(document)[0].URL;
  var filename = url.substr(url.lastIndexOf("/")+1);
//  console.log(url);
//  console.log(filename);
  if (url.substr(0,4) == "http" && filename == "personal.html") {
    // On internet (http:), I only show first picture on personal.html page
    // since I don't upload my personal pictures to internet.
    ShowPicture();
  }
  else {
    // execute the slideShow, set 4 seconds (4000) for each image
    slideShow(4000);
  }
});

function ChangeLanguage() {
  var lang = $(document)[0].getElementById("lang");
//  console.log(lang);
//  console.log(lang.value);
  var url = $(document)[0].URL;
  var i = url.lastIndexOf("/");
  var filename = url.substr(i+1);
  var newfilename;
  switch (lang.value) {
  case "English":
    switch (filename) {
    case "index_ch1.html":
      newfilename = "index.html"; break;
    case "mywork_ch1.html":
      newfilename = "mywork.html"; break;
    case "more_ch1.html":
      newfilename = "more.html"; break;
    case "personal_ch1.html":
      newfilename = "personal.html"; break;
    }
  case "Chinese1":
    switch (filename) {
    case "index.html":
      newfilename = "index_ch1.html"; break;
    case "mywork.html":
      newfilename = "mywork_ch1.html"; break;
    case "more.html":
      newfilename = "more_ch1.html"; break;
    case "personal.html":
      newfilename = "personal_ch1.html"; break;
    }
  }
  console.log(url);
  console.log(url.substr(0,i+1) + newfilename);
  window.location.href = url.substr(0,i+1) + newfilename;
}

function ShowPicture() {

  // append an 'li' item to the 'ul' list for displaying the caption
  $('ul.slideshow').append('<li id="slideshow-caption" class="caption"><div class="slideshow-caption-container"><p></p></div></li>');

  // set the opacity of all images to 0
  $('ul.slideshow li').css({opacity: 0.0});
  
  // get the first image and display it
  $('ul.slideshow li:first').css({opacity: 1.0}).addClass('show');
  
  // get the caption of the first image from the 'rel' attribute and display it
  $('#slideshow-caption p').html($('ul.slideshow li.show').find('img').attr('alt'));
    
  // display the caption
  $('#slideshow-caption').css({opacity: 0.6, bottom:0});
}

function slideShow(speed) {

  // append an 'li' item to the 'ul' list for displaying the caption
  $('ul.slideshow').append('<li id="slideshow-caption" class="caption"><div class="slideshow-caption-container"><p></p></div></li>');

  // set the opacity of all images to 0
  $('ul.slideshow li').css({opacity: 0.0});
  
  // get the first image and display it
  $('ul.slideshow li:first').css({opacity: 1.0}).addClass('show');
  
  // get the caption of the first image from the 'rel' attribute and display it
  $('#slideshow-caption p').html($('ul.slideshow li.show').find('img').attr('alt'));
    
  // display the caption
  $('#slideshow-caption').css({opacity: 0.6, bottom:0});
  
  // call the gallery function to run the slideshow  
  var timer = setInterval('gallery()',speed);
  
  // pause the slideshow on mouse over
  $('ul.slideshow').hover(
    function () {
      clearInterval(timer); 
    },  
    function () {
      timer = setInterval('gallery()',speed);     
    }
  );  
}

function gallery() {

  //if no images have the show class, grab the first image
  var current = ($('ul.slideshow li.show')?  $('ul.slideshow li.show') : $('#ul.slideshow li:first'));

  // trying to avoid speed issue
  if(current.queue('fx').length == 0) {

    // get the next image, if it reached the end of the slideshow, rotate it back to the first image
    var next = ((current.next().length) ? ((current.next().attr('id') == 'slideshow-caption')? $('ul.slideshow li:first') :current.next()) : $('ul.slideshow li:first'));
      
    // get the next image caption
    var desc = next.find('img').attr('alt');  
  
    // set the fade in effect for the next image, show class has higher z-index
    next.css({opacity: 0.0}).addClass('show').animate({opacity: 1.0}, 1000);
    
    // hide the caption first, and then set and display the caption
    $('#slideshow-caption').slideToggle(300, function () { 
      $('#slideshow-caption p').html(desc); 
      $('#slideshow-caption').slideToggle(500); 
    });   
  
    // hide the current image
    current.animate({opacity: 0.0}, 1000).removeClass('show');

  }
}
