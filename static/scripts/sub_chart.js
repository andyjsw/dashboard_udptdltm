  /* ChartJS
   * -------
   * Data and config for chartjs
   */
  const one_week_data = JSON.parse(document.getElementById('one_week_data').textContent);
  // console.log(one_week_data)
  const _num_pos_reviews = Object.values(one_week_data.num_pos_reviews)
  const _num_neg_reviews = Object.values(one_week_data.num_neg_reviews)
  
  const subchart_name = Object.values(one_week_data.name);
  const subchart_date = Object.values(one_week_data.date);
  const subchart_hour = Object.values(one_week_data.hour);

function calcReviews(gameGetInfo, name, hour, date, pos_reviews, neg_reviews) {
  let idx_game = [];

  for(let i = 0; i < name.length; i++) {
      if (name[i] == gameGetInfo) {
          idx_game.push(i);
      }
  }

  let tmp_pos_reviews = idx_game.map(index => pos_reviews[index]);
  let tmp_neg_reviews = idx_game.map(index => neg_reviews[index]);
  console.log(tmp_pos_reviews)
  let tmp_date = idx_game.map(index => date[index]);
  let tmp_hour = idx_game.map(index => hour[index]);
  console.log(tmp_date)
  console.log(tmp_hour)
  console.log(idx_game)
  let start_pos = 0;
  let end_pos = 0;
  let start_neg = 0;
  let end_neg = 0;
  let timeLabels = [];
  let gradientPos = [];
  let gradientNeg = [];

  for (let i = 0; i < tmp_date.length; ++i) {
    if (tmp_hour[i] === 0) {
      start_pos = tmp_pos_reviews[i];
      start_neg = tmp_neg_reviews[i];
    } else if (tmp_hour[i] === 23) {
      end_pos = tmp_pos_reviews[i];
      end_neg = tmp_neg_reviews[i];
      timeLabels.push(tmp_date[i]);
      gradientPos.push(end_pos - start_pos);
      gradientNeg.push(end_neg - start_neg);
    }
  }

  return [timeLabels, gradientPos, gradientNeg];
}

function drawSubChart(date,num_pos,num_neg,sc){
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
            text: 'Chart.js Sub Bar Chart',
            color: 'white',
          },
        },
        scales: {
            x: {
              ticks: {
                color: 'white',
              }
            },
            y:{
                ticks: {
                    color: 'white',
                  }
            }
          }
      };



    var data = {
    labels: date,
    datasets: [
        {
        label: 'Dataset 1',
        data: num_pos,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.8)",
        }
    ]
    };
    if (sc!=0) {
        sc.clear();
        sc.destroy();
    }
    var ctx = document.getElementById('popup-chart').getContext('2d');
    sc = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: options
    });
    return sc
}

var sc=0;
