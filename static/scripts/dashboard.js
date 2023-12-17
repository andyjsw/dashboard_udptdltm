let _select_time_filter = null;
let _select_price_filter = null;
let _select_genre_filter = null;


function redrawBarChartAndDonutChart() {
    drawDonutChartBHa(_select_time_filter, _select_genre_filter, _select_price_filter);
    drawBarChartKB(_select_time_filter, _select_genre_filter);
}

$('#time-btn a').on('click', function () {
    selText = $(this).text();
    $(this).parents('#time-btn').find('button')
        .html(`${selText}`);

    if (selText == 'Day'){
        treemap=drawTreeMap(metadata_day,treemap.genre,treemap.price,1,treemap.tm);
        horizontal_bar_chart=drawHorizontalBarChart(num_of_genres_total_day,horizontal_bar_chart.price,1,horizontal_bar_chart.hbc);
        
        _select_time_filter = 'day';
    }
    else if (selText == 'Week') {
        treemap=drawTreeMap(metadata_week,treemap.genre,treemap.price,1,treemap.tm);
        horizontal_bar_chart=drawHorizontalBarChart(num_of_genres_total_week,horizontal_bar_chart.price,1,horizontal_bar_chart.hbc);   
        
        _select_time_filter = 'week';
    }
    else if (selText == 'Month') {
        _select_time_filter = 'month';
    }

    redrawBarChartAndDonutChart();
});

$('#genre-btn a').on('click', function () {
    selText = $(this).text();
    $(this).parents('#genre-btn').find('button')
        .html(`${selText}`);
    if(selText=='All'){
        getFeatureListDisplay(selText);
        selText=1
        _select_genre_filter = null;
    }
    else {
        getFeatureListDisplay(selText);
        _select_genre_filter = [selText];
    }
    
    treemap=drawTreeMap(treemap.metadata,selText,treemap.price,1,treemap.tm);

    redrawBarChartAndDonutChart();

    
});

$('#price-btn a').on('click', function () {
    selText = $(this).text();
    $(this).parents('#price-btn').find('button')
        .html(`${selText}`);

    if(selText=='Both') {
        treemap=drawTreeMap(treemap.metadata,treemap.genre,2,1,treemap.tm)
        horizontal_bar_chart=drawHorizontalBarChart(horizontal_bar_chart.metadata,2,1,horizontal_bar_chart.hbc)

        _select_price_filter = null;
    }
    else if (selText=='Free') {
        treemap=drawTreeMap(treemap.metadata,treemap.genre,0,1,treemap.tm)
        horizontal_bar_chart=drawHorizontalBarChart(horizontal_bar_chart.metadata,0,1,horizontal_bar_chart.hbc)

        _select_price_filter = 'free';
    }
    else {
        treemap=drawTreeMap(treemap.metadata,treemap.genre,1,1,treemap.tm)
        horizontal_bar_chart=drawHorizontalBarChart(horizontal_bar_chart.metadata,1,1,horizontal_bar_chart.hbc)

        _select_price_filter = 'paid';
    }

    redrawBarChartAndDonutChart();
});

treemap.canvas.onclick = (evt) => {

    const points = treemap.tm.getElementsAtEventForMode(
      evt,
      'nearest',
      { intersect: true },
      true
    );

    if (points.length) {
        const firstPoint = points[0];
        
        const body=document.querySelector('body'),
        sidebar=body.querySelector('.sidebar'),
        toggle=sidebar.querySelector('.toggle');
        console.log(toggle);
        sidebar.classList.toggle('close');

        const value = treemap.tm.data.datasets[firstPoint.datasetIndex].data[firstPoint.index].g;
        v = calcReviews(value,subchart_name,subchart_hour,subchart_date,_num_pos_reviews,_num_neg_reviews);
        sc=drawSubChart(v[0],v[1],v[2],sc);
        $('#launch-pop-up').click();
    }
  };