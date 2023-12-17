function drawHorizontalBarChart(metadata,price,update,hbc) {
  var options = {
    indexAxis: 'y',
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
      bar: {
        borderWidth: 2,
      }
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Chart.js Horizontal Bar Chart'
      }
    }
  };

  xValues=[]
  yValues=[]

  if(price==2){
    metadata.sort(function(a,b) {
      return b.total - a.total
    });
  for (var i=0,len=metadata.length;i<len;i++){
    xValues.push(metadata[i].genre)
    yValues.push(metadata[i].total)
    }
  }
  else if(price==1){
    metadata.sort(function(a,b) {
      return b.charged - a.charged
    });
    for (var i=0,len=metadata.length;i<len;i++){
      xValues.push(metadata[i].genre)
      yValues.push(metadata[i].charged)
      }
  }
  else{
    metadata.sort(function(a,b) {
      return b.free - a.free
    });
    for (var i=0,len=metadata.length;i<len;i++){
      xValues.push(metadata[i].genre)
      yValues.push(metadata[i].free)
      }
  }
  
  var data = {
    labels: xValues.slice(0,5),
    datasets: [
      {
        label: 'Data',
        data: yValues.slice(0,5),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.8)",
      },
    ]
  }
  if (update==1) {
    hbc.clear();
    hbc.destroy();
}
  // Create the chart
  var ctx = document.getElementById('horizontal-bar').getContext('2d');
  hbc = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: options
  });
  return {'hbc':hbc,
          'metadata':metadata,
          'price':price}
}

var horizontal_bar_chart;

var num_of_genres_total_day = JSON.parse(document.getElementById('num_of_genres_total_day').textContent);
for (var i=0, len = num_of_genres_total_day.length;i < len; i++) {
  num_of_genres_total_day[i].genre = num_of_genres_total_day[i].genre.trim();
}

var num_of_genres_total_week = JSON.parse(document.getElementById('num_of_genres_total_week').textContent);
for (var i=0, len = num_of_genres_total_week.length;i < len; i++) {
  num_of_genres_total_week[i].genre = num_of_genres_total_week[i].genre.trim();
}


horizontal_bar_chart=drawHorizontalBarChart(num_of_genres_total_day,2,0,0)