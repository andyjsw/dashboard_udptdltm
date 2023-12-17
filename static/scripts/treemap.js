function drawTreeMap(metadata,genre,price,update,tm){
    if (price==2)
    {
    if (genre===1){
        data=metadata;
    }
    else{
        data=metadata.filter(metadata=>metadata.genre.includes(genre));
    }
    }
    else if(price==1){
        if (genre===1){
            data=metadata.filter(metadata=>metadata.price_format>0);
        }
        else{
        data=metadata.filter(metadata=>(metadata.genre.includes(genre))&(metadata.price_format>0));
        }
    }
    else{
        if (genre===1){
            data=metadata.filter(metadata=>metadata.price_format<=0);
        }
        else{
        data=metadata.filter(metadata=>(metadata.genre.includes(genre))&(metadata.price_format<=0));
        }
    }
    data=data.slice(0,10)


    if (update==1) {
        tm.clear();
        tm.destroy();
    }

    var canvas = document.getElementById("treemap")
    var ctx=canvas.getContext("2d");

    tm = window.chart3 = new Chart(ctx, {
        type: "treemap",
        data: {
            datasets: [
                {
                    label: "Hourly most-played games",
                    tree: data,
                    key: "current_player",
                    groups: ['name'],
                    spacing: 0.5,
                    borderWidth: 0.5,
                    backgroundColor: "rgba(75, 192, 192, 0.8)",
                    borderColor: "rgba(75, 192, 192, 1)",

                    hoverBackgroundColor: "rgba(75, 192, 192, 0.6)",
                    labels: {
                        color: 'white',
                        display: true,
                    }
                }
            ]
        },
        options: {
            maintainAspectRatio: false,
            responsive: true,
            

        }
    });
    return {'tm':tm,
            'metadata':metadata,
            'genre':genre,
            'price':price,
            'canvas':canvas};
    
}


var metadata_day = JSON.parse(document.getElementById('metadata_day').textContent);

for (var i=0, len = metadata_day.length;i < len; i++) {
    metadata_day[i].genre = metadata_day[i].genre.map(genre => genre.trim());
}


var metadata_week = JSON.parse(document.getElementById('metadata_week').textContent);
for (var i=0, len = metadata_week.length;i < len; i++) {
    metadata_week[i].genre = metadata_week[i].genre.map(genre => genre.trim());
}

var treemap;
treemap=drawTreeMap(metadata_day,1,2,0,0)


