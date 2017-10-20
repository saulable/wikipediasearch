function searchBar(queryData) {
    //x.innerHTML = "Latitude: " + position.coords.latitude + 
    //"<br>Longitude: " + position.coords.longitude; 
    var ul = document.getElementById('list');
    var output = $.ajax({
    url: 'https://en.wikipedia.org/w/api.php',
    jsonp: "callback", 
    dataType: 'jsonp', 
    data: { 
        action: "query", 
        list: "search", 
        srsearch: queryData, 
        format: "json" 
    },
    xhrFields: { withCredentials: true },
    success: function(response) { 
        document.getElementById('list').innerHTML = "";
        var work = response.query.search;
        console.log(work);
        for (i=0; i < work.length; i++){
            
              
                var a = document.createElement('a');
                a.href = "https://en.wikipedia.org/wiki?curid=" + work[i].pageid;
                var li = document.createElement('li');
                li.className = "pills col-12";
                var h1 = document.createElement('h1');
                h1.innerHTML = work[i].title;
                var desc = document.createElement('p');
                desc.innerHTML = work[i].snippet;


                li.appendChild(h1);
                li.appendChild(desc);
                
                a.appendChild(li);
                ul.appendChild(a);
              
            
           
        }
     },
    error: function(err) { alert(err); }
});
}

var form = $('#ajax-search'),
search = $('#search');
form.submit(function(event) {
    event.preventDefault();
    var queryData = encodeURI(form.serialize());

    search.addClass('searching').val('');

    setTimeout(function() {
        search.removeClass('searching');
        searchBar(queryData);
    }, 3600);
});
