  /* ChartJS
   * -------
   * Data and config for chartjs
   */


// AVERAGE CURRENT PLAYER
const _name = Object.values(dataOneMonth.name);
const _date = Object.values(dataOneMonth.date);
const _price_format = Object.values(dataOneMonth.price_format);
const _current_player = Object.values(dataOneMonth.current_player);
const _hour = Object.values(dataOneMonth.hour);
// --unique--
const _name_Unique = Object.values(uniqueData.name);  
const _genre_Unique = Object.values(uniqueData.genre);

let areChart = null;



function KBgetData(name, date, hour, current_player, price_format, dateFilter=null, genreFilter=null, priceFilter=null) {
  let sum_current_player = [0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0., 0., 0.];
  let count_hour = [0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0., 0., 0.];
  let average = [];
  // console.log("RUNNNNNNNn");
  for (let i = 0; i < date.length; ++i) {

      if (dateFilter != null) {
          let thisRowDate = date[i];
          if (dateFilter == 'day') {
              let yesterdayDate = new Date();
              yesterdayDate.setDate(yesterdayDate.getDate() - 1);
              yesterdayDate = Number(yesterdayDate);
              // console.log(thisRowDate, yesterdayDate);
              if (thisRowDate < yesterdayDate) {
                  // console.log('false');
                  continue;
              }
              // console.log('true');
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
          let idx_game = _name_Unique.indexOf(name[i]);
          // console.log(name[i]);
          let thisRowGenre = _genre_Unique[idx_game];
          const filteredArray = thisRowGenre.filter(value => genreFilter.includes(value));
        //   console.log(filteredArray, genreFilter, thisRowGenre);
          if (filteredArray.length < genreFilter.length) {
              // console.log(thisRowGenre);
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
      // console.log(current_player[hour[i]])
      // console.log(hour[i])
      count_hour[hour[i]] += 1;
      sum_current_player[hour[i]] += current_player[i];
      // console.log(sum_current_player)
  }

  // return sum_current_player;

  
  for (var i = 0; i < sum_current_player.length; ++i) {
    average.push(Math.floor(sum_current_player[i]/count_hour[i]));
  }
//   console.log(count_hour)
  let lastMonthDate = new Date();
  lastMonthDate.setDate(lastMonthDate.getDate() - 30);
  return average;
}


function drawBarChartKB(dateFilter=null, genreFilter=null) {
    let average_current_player_by_hour = KBgetData(_name,_date,_hour,_current_player,_price_format,dateFilter=dateFilter,genreFilter=genreFilter);

    const OPTION_average_current_player_by_hour = {
    responsive: true,
    scales: {
        x: {
        display: true,
        title: {
            display: true,
            text: 'Time'
        }
        },
        y: {
        display: true,
        title: {
            display: true,
            text: 'Sum current players'
        }
        }
    },
    }

    const DATA_average_current_player_by_hour = {
    labels: [ 0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15, 16,
        17, 18, 19, 20, 21, 22, 23],
    datasets: [{
        label: 'Avg Current Players',
        data: average_current_player_by_hour,
        fill: true,
        borderColor:'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.3)',
        tension: 0.1
    }]
    };

    // Get context with jQuery - using jQuery's .get() method.
    if ($("#areaChart_SumCurrentPlayer").length) {
    var areChartCanvas = $("#areaChart_SumCurrentPlayer").get(0).getContext("2d");
    if (areChart != null)
        areChart.destroy();
    areChart = new Chart(areChartCanvas, {
        type: 'bar',
        data: DATA_average_current_player_by_hour,
        options: OPTION_average_current_player_by_hour,
    });
    }
}


drawBarChartKB(null, null);