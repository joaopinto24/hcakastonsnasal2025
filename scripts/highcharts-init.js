// Lord have mercy for wwhat ive done
































document.addEventListener('DOMContentLoaded', function () { // when shit loaded
    Highcharts.chart('highcharts-container', { // the chart should be this
      chart: {
        type: 'area',  // make graph area
        backgroundColor: '#1a1a1a',  // dark background
        style: {
          fontFamily: 'var(--bs-font-sans-serif)'
        },
        animation: {
          duration: 20000  // smooth 2000000 second animation
        }
      },
      title: {
        text: 'Tracked Space Debris Over Time',
        style: {
          color: '#ffffff'  // white title text
        }
      },
      xAxis: {
        title: {
          text: 'Year',
          style: {
            color: '#ffffff'  // white axis title
          }
        },
        labels: {
          style: {
            color: '#cccccc'  // light gray axis labels
          }
        },
        lineColor: '#444444',  // dark axis line
        tickColor: '#444444',  // dark tick marks
        // this shit is absolute fuckfoolery 
        categories: [1958, 1959, 1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024]
      },
      yAxis: {
        title: {
          text: 'Debris Count',
          style: {
            color: '#ffffff'  // white axis title
          }
        },
        labels: {
          style: {
            color: '#cccccc'  // light gray axis labels
          }
        },
        lineColor: '#444444',  // dark axis line
        tickColor: '#444444'   // dark tick marks
      },
      tooltip: {
        shared: true,
        valueSuffix: ' pieces',
        backgroundColor: '#2d2d2d',  // dark tooltip background
        borderColor: '#555555',     // dark tooltip border
        style: {
          color: '#ffffff'          // white tooltip text
        }
      },
      plotOptions: {
        area: {
          fillOpacity: 0.3,  // semi-transparent area fill
          lineWidth: 2,      // line thickness
          marker: {
            enabled: false   // remove dots/markers
          },
          animation: {
            duration: 2000,  // smooth area fill animation
            easing: 'easeOutBounce'  // bouncy smooth effect
          }
        }
      },
      series: [{
        name: 'Debris Count',   // kill me
        data: [3, 12, 35, 322, 358, 497, 619, 1377, 1605, 1723, 2048, 2341, 2972, 3243, 3588, 3902, 4239, 4929, 5496, 5805, 6023, 6172, 6178, 6660, 8587, 8928, 9087, 9372, 10075, 10571, 10506, 10433, 10551, 10868, 11243, 13185, 14213, 14504, 14459, 15010, 15399, 19201, 19475, 19590, 19426, 19307, 19287, 19233, 20077, 20144, 19760, 19772, 19736, 19820, 19740, 19649, 19331, 19097, 19081, 19326, 19675, 20019, 20977, 22334, 23211, 24096, 25408],
        color: '#4a9eff'  // nice blue color for the area 😍🥰😍
      }]
    });
  });
  