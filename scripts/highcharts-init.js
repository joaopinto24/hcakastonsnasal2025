// Lord have mercy for wwhat ive done

// Global variables for chart management
let currentChart = null;
let currentData = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
    // Load the original space debris chart
    loadOriginalSpaceDebrisChart();
});

// Load the original space debris chart
function loadOriginalSpaceDebrisChart() {
    Highcharts.chart('highcharts-container', {
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
}

// Main function to generate ORDEM 3.2 analysis
function generateORDEMChart() {
    // Get form data
    const formData = getFormData();
    
    // Validate inputs
    if (!validateInputs(formData)) {
        return;
    }
    
    // Generate data based on parameters
    const chartData = generateORDEMData(formData);
    
    // Get selected chart type
    const chartType = document.querySelector('input[name="chart-type"]:checked').value;
    
    // Generate the appropriate chart
    generateChart(chartType, chartData, formData);
    
    // Show results summary
    showResultsSummary(formData, chartData);
    
    // Store current data for potential export
    currentData = chartData;
}

// Get form data
function getFormData() {
    return {
        altitudeMin: parseFloat(document.getElementById('altitude-min').value),
        altitudeMax: parseFloat(document.getElementById('altitude-max').value),
        inclinationMin: parseFloat(document.getElementById('inclination-min').value),
        inclinationMax: parseFloat(document.getElementById('inclination-max').value),
        sizeMin: parseFloat(document.getElementById('size-min').value),
        sizeMax: parseFloat(document.getElementById('size-max').value),
        startYear: parseInt(document.getElementById('start-year').value),
        endYear: parseInt(document.getElementById('end-year').value)
    };
}

// Validate form inputs
function validateInputs(data) {
    const errors = [];
    
    if (data.altitudeMin >= data.altitudeMax) {
        errors.push('Minimum altitude must be less than maximum altitude');
    }
    
    if (data.inclinationMin >= data.inclinationMax) {
        errors.push('Minimum inclination must be less than maximum inclination');
    }
    
    if (data.sizeMin >= data.sizeMax) {
        errors.push('Minimum debris size must be less than maximum size');
    }
    
    if (data.startYear >= data.endYear) {
        errors.push('Start year must be less than end year');
    }
    
    if (data.altitudeMin < 200 || data.altitudeMax > 2000) {
        errors.push('Altitude range must be between 200-2000 km');
    }
    
    if (errors.length > 0) {
        alert('Please fix the following errors:\n' + errors.join('\n'));
        return false;
    }
    
    return true;
}

// Generate ORDEM 3.2 simulation data
function generateORDEMData(params) {
    const data = {
        altitude: generateAltitudeDistribution(params),
        size: generateSizeDistribution(params),
        temporal: generateTemporalEvolution(params),
        inclination: generateInclinationDistribution(params)
    };
    
    return data;
}

// Generate altitude distribution data
function generateAltitudeDistribution(params) {
    const altitudes = [];
    const debrisCounts = [];
    const step = (params.altitudeMax - params.altitudeMin) / 20;
    
    for (let i = 0; i <= 20; i++) {
        const altitude = params.altitudeMin + (i * step);
        altitudes.push(Math.round(altitude));
        
        // Simulate realistic debris distribution (higher density at certain altitudes)
        let count = 0;
        if (altitude < 400) {
            count = Math.random() * 1000 + 500; // Low Earth Orbit
        } else if (altitude < 800) {
            count = Math.random() * 2000 + 1000; // Medium Earth Orbit
        } else if (altitude < 1200) {
            count = Math.random() * 1500 + 800; // High Earth Orbit
        } else {
            count = Math.random() * 500 + 200; // Very High Orbit
        }
        
        // Apply user-defined altitude range influence
        const rangeFactor = 1 - Math.abs(altitude - (params.altitudeMin + params.altitudeMax) / 2) / (params.altitudeMax - params.altitudeMin);
        count *= (0.5 + rangeFactor);
        
        debrisCounts.push(Math.round(count));
    }
    
    return { altitudes, debrisCounts };
}

// Generate size distribution data
function generateSizeDistribution(params) {
    const sizeRanges = ['0.1-1', '1-10', '10-50', '50-100', '100-500', '500-1000'];
    const debrisCounts = [];
    
    // Simulate realistic size distribution (more small debris)
    const distribution = [0.4, 0.3, 0.15, 0.08, 0.05, 0.02];
    const totalDebris = 10000;
    
    sizeRanges.forEach((range, index) => {
        const count = Math.round(totalDebris * distribution[index] * (0.8 + Math.random() * 0.4));
        debrisCounts.push(count);
    });
    
    return { sizeRanges, debrisCounts };
}

// Generate temporal evolution data
function generateTemporalEvolution(params) {
    const years = [];
    const debrisCounts = [];
    const totalYears = params.endYear - params.startYear + 1;
    
    for (let year = params.startYear; year <= params.endYear; year++) {
        years.push(year);
        
        // Simulate realistic temporal evolution with growth and cleanup
        let baseCount = 5000;
        const yearOffset = year - 2020;
        
        // Exponential growth with some cleanup events
        let count = baseCount * Math.pow(1.05, yearOffset);
        
        // Add some random events (collisions, cleanup missions)
        if (Math.random() < 0.1) {
            count *= 1.2; // Collision event
        }
        if (Math.random() < 0.05) {
            count *= 0.9; // Cleanup mission
        }
        
        // Apply user parameters influence
        const altitudeFactor = (params.altitudeMax - params.altitudeMin) / 1800; // Normalize to 0-1
        const sizeFactor = Math.log10(params.sizeMax / params.sizeMin) / 4; // Normalize to 0-1
        
        count *= (0.5 + altitudeFactor * 0.3 + sizeFactor * 0.2);
        
        debrisCounts.push(Math.round(count));
    }
    
    return { years, debrisCounts };
}

// Generate inclination distribution data
function generateInclinationDistribution(params) {
    const inclinations = [];
    const debrisCounts = [];
    const step = (params.inclinationMax - params.inclinationMin) / 18;
    
    for (let i = 0; i <= 18; i++) {
        const inclination = params.inclinationMin + (i * step);
        inclinations.push(Math.round(inclination));
        
        // Simulate realistic inclination distribution
        let count = 0;
        if (inclination < 30) {
            count = Math.random() * 2000 + 1000; // Low inclination (equatorial)
        } else if (inclination < 60) {
            count = Math.random() * 1500 + 800; // Medium inclination
        } else if (inclination < 90) {
            count = Math.random() * 1000 + 500; // High inclination
        } else {
            count = Math.random() * 800 + 300; // Polar orbits
        }
        
        debrisCounts.push(Math.round(count));
    }
    
    return { inclinations, debrisCounts };
}

// Generate the appropriate chart based on type
function generateChart(type, data, params) {
    // Destroy existing chart
    if (currentChart) {
        currentChart.destroy();
    }
    
    let chartConfig = {};
    
    switch (type) {
        case 'altitude':
            chartConfig = createAltitudeChart(data.altitude, params);
            break;
        case 'size':
            chartConfig = createSizeChart(data.size, params);
            break;
        case 'temporal':
            chartConfig = createTemporalChart(data.temporal, params);
            break;
        case 'inclination':
            chartConfig = createInclinationChart(data.inclination, params);
            break;
    }
    
    currentChart = Highcharts.chart('ordem-chart-container', chartConfig);
}

// Create altitude distribution chart
function createAltitudeChart(data, params) {
    return {
        chart: {
            type: 'column',
            backgroundColor: '#1a1a1a',
            style: { fontFamily: 'var(--bs-font-sans-serif)' },
            animation: { duration: 2000 }
        },
        title: {
            text: `Debris Distribution by Altitude (${params.altitudeMin}-${params.altitudeMax} km)`,
            style: { color: '#ffffff' }
        },
        xAxis: {
            title: { text: 'Altitude (km)', style: { color: '#ffffff' } },
            labels: { style: { color: '#cccccc' } },
            lineColor: '#444444',
            tickColor: '#444444',
            categories: data.altitudes
        },
        yAxis: {
            title: { text: 'Number of Debris Objects', style: { color: '#ffffff' } },
            labels: { style: { color: '#cccccc' } },
            lineColor: '#444444',
            tickColor: '#444444'
        },
        tooltip: {
            shared: true,
            valueSuffix: ' objects',
            backgroundColor: '#2d2d2d',
            borderColor: '#555555',
            style: { color: '#ffffff' }
        },
        plotOptions: {
            column: {
                color: '#4a9eff',
                animation: { duration: 2000, easing: 'easeOutBounce' }
            }
        },
        series: [{
            name: 'Debris Count',
            data: data.debrisCounts
        }]
    };
}

// Create size distribution chart
function createSizeChart(data, params) {
    return {
        chart: {
            type: 'bar',
            backgroundColor: '#1a1a1a',
            style: { fontFamily: 'var(--bs-font-sans-serif)' },
            animation: { duration: 2000 }
        },
        title: {
            text: `Debris Distribution by Size (${params.sizeMin}-${params.sizeMax} cm)`,
            style: { color: '#ffffff' }
        },
        xAxis: {
            title: { text: 'Size Range (cm)', style: { color: '#ffffff' } },
            labels: { style: { color: '#cccccc' } },
            lineColor: '#444444',
            tickColor: '#444444',
            categories: data.sizeRanges
        },
        yAxis: {
            title: { text: 'Number of Debris Objects', style: { color: '#ffffff' } },
            labels: { style: { color: '#cccccc' } },
            lineColor: '#444444',
            tickColor: '#444444'
        },
        tooltip: {
            shared: true,
            valueSuffix: ' objects',
            backgroundColor: '#2d2d2d',
            borderColor: '#555555',
            style: { color: '#ffffff' }
        },
        plotOptions: {
            bar: {
                color: '#ff6b4a',
                animation: { duration: 2000, easing: 'easeOutBounce' }
            }
        },
        series: [{
            name: 'Debris Count',
            data: data.debrisCounts
        }]
    };
}

// Create temporal evolution chart
function createTemporalChart(data, params) {
    return {
        chart: {
            type: 'line',
            backgroundColor: '#1a1a1a',
            style: { fontFamily: 'var(--bs-font-sans-serif)' },
            animation: { duration: 2000 }
        },
        title: {
            text: `Debris Evolution Over Time (${params.startYear}-${params.endYear})`,
            style: { color: '#ffffff' }
        },
        xAxis: {
            title: { text: 'Year', style: { color: '#ffffff' } },
            labels: { style: { color: '#cccccc' } },
            lineColor: '#444444',
            tickColor: '#444444',
            categories: data.years
        },
        yAxis: {
            title: { text: 'Number of Debris Objects', style: { color: '#ffffff' } },
            labels: { style: { color: '#cccccc' } },
            lineColor: '#444444',
            tickColor: '#444444'
        },
        tooltip: {
            shared: true,
            valueSuffix: ' objects',
            backgroundColor: '#2d2d2d',
            borderColor: '#555555',
            style: { color: '#ffffff' }
        },
        plotOptions: {
            line: {
                color: '#4a9eff',
                lineWidth: 3,
                marker: { enabled: true, radius: 4 },
                animation: { duration: 2000, easing: 'easeOutBounce' }
            }
        },
        series: [{
            name: 'Total Debris',
            data: data.debrisCounts
        }]
    };
}

// Create inclination distribution chart
function createInclinationChart(data, params) {
    return {
        chart: {
            type: 'area',
            backgroundColor: '#1a1a1a',
            style: { fontFamily: 'var(--bs-font-sans-serif)' },
            animation: { duration: 2000 }
        },
        title: {
            text: `Debris Distribution by Inclination (${params.inclinationMin}-${params.inclinationMax}°)`,
            style: { color: '#ffffff' }
        },
        xAxis: {
            title: { text: 'Inclination (degrees)', style: { color: '#ffffff' } },
            labels: { style: { color: '#cccccc' } },
            lineColor: '#444444',
            tickColor: '#444444',
            categories: data.inclinations
        },
        yAxis: {
            title: { text: 'Number of Debris Objects', style: { color: '#ffffff' } },
            labels: { style: { color: '#cccccc' } },
            lineColor: '#444444',
            tickColor: '#444444'
        },
        tooltip: {
            shared: true,
            valueSuffix: ' objects',
            backgroundColor: '#2d2d2d',
            borderColor: '#555555',
            style: { color: '#ffffff' }
        },
        plotOptions: {
            area: {
                color: '#9eff4a',
                fillOpacity: 0.3,
                lineWidth: 2,
                marker: { enabled: false },
                animation: { duration: 2000, easing: 'easeOutBounce' }
            }
        },
        series: [{
            name: 'Debris Count',
            data: data.debrisCounts
        }]
    };
}

// Show results summary
function showResultsSummary(params, data) {
    const summaryDiv = document.getElementById('summary-content');
    const summaryCard = document.getElementById('results-summary');
    
    // Calculate summary statistics
    const totalDebris = Object.values(data).reduce((sum, dataset) => {
        if (dataset.debrisCounts) {
            return sum + dataset.debrisCounts.reduce((a, b) => a + b, 0);
        }
        return sum;
    }, 0);
    
    const avgDebris = Math.round(totalDebris / Object.keys(data).length);
    
    summaryDiv.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <h5>Analysis Parameters</h5>
                <ul class="list-unstyled">
                    <li><strong>Altitude Range:</strong> ${params.altitudeMin} - ${params.altitudeMax} km</li>
                    <li><strong>Inclination Range:</strong> ${params.inclinationMin} - ${params.inclinationMax}°</li>
                    <li><strong>Size Range:</strong> ${params.sizeMin} - ${params.sizeMax} cm</li>
                    <li><strong>Time Period:</strong> ${params.startYear} - ${params.endYear}</li>
                </ul>
            </div>
            <div class="col-md-6">
                <h5>Key Statistics</h5>
                <ul class="list-unstyled">
                    <li><strong>Total Debris Objects:</strong> ${totalDebris.toLocaleString()}</li>
                    <li><strong>Average per Category:</strong> ${avgDebris.toLocaleString()}</li>
                    <li><strong>Analysis Date:</strong> ${new Date().toLocaleDateString()}</li>
                    <li><strong>Model Version:</strong> ORDEM 3.2 Web Adaptation</li>
                </ul>
            </div>
        </div>
    `;
    
    summaryCard.style.display = 'block';
}

// Reset form to default values
function resetForm() {
    document.getElementById('altitude-min').value = 200;
    document.getElementById('altitude-max').value = 2000;
    document.getElementById('inclination-min').value = 0;
    document.getElementById('inclination-max').value = 180;
    document.getElementById('size-min').value = 0.1;
    document.getElementById('size-max').value = 1000;
    document.getElementById('start-year').value = 2020;
    document.getElementById('end-year').value = 2030;
    document.getElementById('altitude-dist').checked = true;
    
    // Hide results summary
    document.getElementById('results-summary').style.display = 'none';
    
    // Regenerate chart with default values
    generateORDEMChart();
}

// Export data functionality (for future enhancement)
function exportData() {
    if (currentData) {
        const dataStr = JSON.stringify(currentData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'ordem-analysis-data.json';
        link.click();
        URL.revokeObjectURL(url);
    }
}