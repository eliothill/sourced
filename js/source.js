// ID of the Google Spreadsheet
var sheetID = "1pFYrxBGXRWXy65WnSwVj8BIjZBMDP7PDOILx-W1iPbc"  
var url = "https://spreadsheets.google.com/feeds/list/" + sheetID +"/1/public/values?alt=json";

/* Or should I use the GSX npm api, I mean the JSON is cleaner??

var url = "http://gsx2json.com/api?id=1pFYrxBGXRWXy65WnSwVj8BIjZBMDP7PDOILx-W1iPbc"
*/

// Will add date order functionality one day
var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();
var newdate = day + "/" + month + "/" +year;

  (function getDate() {
    var date = new Date;
    $('.info').append('<p>Added on: ' + newdate) + '</p>';
  })();
  
  var sources = [];
  $.getJSON(url, function(data) {
    var entry = data.feed.entry;
    var brand = data.gsx$Brand;
    var sector = data.gsx$Sector;
    var shopURL = data.gsx$Link;

    $(entry).each(function() {
      var created = false;      // create array of sources without duplicates
      for (i = 0; i < sources.length; i++) {
        if (sources[i] === this.title.$t)
          created = true;
      }
      if (!created) {
        sources.push(this.title.$t);
        $('.allResults').append('<div class="row card filterDiv  ' + this.gsx$sector.$t + '"><div class="nine columns">'+'<h3>'+'<span>'+ this.gsx$sector.$t + '</span>' + this.title.$t + '</h3>' + '<p>'+ this.gsx$description.$t + '</p>' + '<p><a class="button" href="' + this.gsx$link.$t + '">Visit site</a></p></div></div>' );
      }
    });
  });
  

//  http://gsx2json.com/api?id=1pFYrxBGXRWXy65WnSwVj8BIjZBMDP7PDOILx-W1iPbc