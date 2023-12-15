const _date = Object.values(donut_df.date);
const _genre = Object.values(donut_df.genre);
const _price_format = Object.values(donut_df.price_format);

// console.log(_date, _genre, _price_format);

function getData(date, genre, price_format, dateFilter=null, genreFilter=null, priceFilter=null) {
    // console.log(dateFilter, genreFilter, priceFilter, date, genre, price_format);
    let countFree = 0;
    let countPaid = 0;

    for (let i = 0; i < date.length; ++i) {

        if (dateFilter != null) {
            let thisRowDate = date[i];
            if (dateFilter == 'day') {
                let yesterdayDate = new Date();
                yesterdayDate.setDate(yesterdayDate.getDate() - 1);
                yesterdayDate = Number(yesterdayDate);

                if (thisRowDate < yesterdayDate) {
                    // console.log('false');
                    continue;
                }
                // console.log(thisRowDate, yesterdayDate);
                // console.log('true');
            }
            else if (dateFilter == 'week') {
                let lastWeekDate = new Date();
                lastWeekDate.setDate(lastWeekDate.getDate() - 7);
                lastWeekDate = Number(lastWeekDate);

                if (thisRowDate < lastWeekDate) {
                    // console.log('false');
                    continue;
                }
                // console.log(thisRowDate, lastWeekDate);
                // console.log('true');
            }
            else if (dateFilter == 'month') {
                let lastMonthDate = new Date();
                lastMonthDate.setDate(lastMonthDate.getDate() - 30);
                lastMonthDate = Number(lastMonthDate);

                if (thisRowDate < lastMonthDate) {
                    // console.log(thisRowDate, lastMonthDate)
                    // console.log('false');
                    continue;
                }
            }
        }

        if (genreFilter != null) {
            let thisRowGenre = genre[i];
            const filteredArray = thisRowGenre.filter(value => genreFilter.includes(value));
            if (filteredArray.length == 0) {
                console.log(thisRowGenre);
                continue;
            }
        }

        if (priceFilter != null) {
            let thisRowPriceFormat = price_format[i];
            if (priceFilter == 'free') {
                if (thisRowPriceFormat > 0)
                    continue;
            }
            else if (priceFilter == 'paid') {
                if (thisRowPriceFormat <= 0)
                    continue;
            }
        }

        let thisRowPriceFormat = price_format[i];
        if (thisRowPriceFormat <= 0)
            countFree += 1;
        else
            countPaid += 1;
    }

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

    let chart = new Chart('donut-chart', config);
}

let donutData = getData(date=_date, genre=_genre, price_format=_price_format, dateFilter=null, genreFilter=null, priceFilter=null);
drawChartBHa(donutData[0], donutData[1], priceFilter=null);