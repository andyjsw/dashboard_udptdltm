// const _date = Object.values(donut_df.date);
// const _name = Object.values(donut_df.name);

// console.log(name_price_genre_dict);
// console.log(_date, _genre, _price_format);

let donutChart = null;

function getData(date, Name, dateFilter=null, genreFilter=null, priceFilter=null) {
    // console.log(dateFilter, genreFilter, priceFilter, date, genre, price_format);
    let countFree = 0;
    let countPaid = 0;
    let freeGameSet = new Set();
    let paidGameSet = new Set();

    for (let i = 0; i < date.length; ++i) {
        let thisRowName = Name[i];

        if (dateFilter != null) {
            let thisRowDate = date[i];
            if (dateFilter == 'day') {
                let yesterdayDate = new Date();
                yesterdayDate.setDate(yesterdayDate.getDate() - 1);
                yesterdayDate = Number(yesterdayDate);

                if (thisRowDate < yesterdayDate) {
                    continue;
                }
            }
            else if (dateFilter == 'week') {
                let lastWeekDate = new Date();
                lastWeekDate.setDate(lastWeekDate.getDate() - 7);
                lastWeekDate = Number(lastWeekDate);

                if (thisRowDate < lastWeekDate) {
                    continue;
                }
            }
            else if (dateFilter == 'month') {
                let lastMonthDate = new Date();
                lastMonthDate.setDate(lastMonthDate.getDate() - 30);
                lastMonthDate = Number(lastMonthDate);

                if (thisRowDate < lastMonthDate) {
                    continue;
                }
            }
        }

        if (genreFilter != null) {
            let thisRowGenre = name_genre_dict[thisRowName];
            const filteredArray = thisRowGenre.filter(value => genreFilter.includes(value));
            if (filteredArray.length < genreFilter.length) {
                continue;
            }
        }

        if (priceFilter != null) {
            let thisRowPriceFormat = name_price_dict[thisRowName];
            if (priceFilter == 'free') {
                if (thisRowPriceFormat > 0)
                    continue;
            }
            else if (priceFilter == 'paid') {
                if (thisRowPriceFormat <= 0)
                    continue;
            }
        }

        let thisRowPriceFormat = name_price_dict[thisRowName];
        if (thisRowPriceFormat <= 0)
            freeGameSet.add(thisRowName)
        else
            paidGameSet.add(thisRowName)
    }

    countFree = freeGameSet.size;
    countPaid = paidGameSet.size;

    return [countFree, countPaid]
}


function drawChartBHa(countFree, countPaid, priceFilter=null) {
    let labels = [];
    let _data = [];
    let backgroundColor = [];
    if (priceFilter == null) {
        labels = ['Free to play', 'Charged'];
        _data = [countFree, countPaid];
        backgroundColor = [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)'
        ]
    }
    else if (priceFilter == 'free') {
        labels = ['Free to play'];
        _data = [countFree];
        backgroundColor = [
            'rgb(255, 99, 132)'
        ]
    }
    else if (priceFilter == 'paid') {
        labels = ['Charged'];
        _data = [countPaid];
        backgroundColor = [
            'rgb(54, 162, 235)'
        ]
    }

    const data = {
        labels: labels,
        datasets: [{
            label: 'My First Dataset',
            data: _data,
            backgroundColor: backgroundColor,
            hoverOffset: 4
        }]
    };


    const config = {
        type: 'doughnut',
        data: data,
    };

    if (donutChart != null)
        donutChart.destroy();
    donutChart = new Chart('donut-chart', config);
}


function drawDonutChartBHa(dateFilter=null, genreFilter=null, priceFilter=null) {
    let donutData = getData(date=_date, Name=_name, dateFilter=dateFilter, genreFilter=genreFilter, priceFilter=priceFilter);
    drawChartBHa(donutData[0], donutData[1], priceFilter=priceFilter);
}


drawDonutChartBHa(null, null, null);