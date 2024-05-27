const categories = {};
const backgroundColors = ['#FF5733', '#33FF7A', '#337AFF', '#FF33FF', '#FFFF33', '#33FFFF'];
let paretoChart;

function addCategory() {
    const input = document.getElementById('input');
    const category = input.value.trim();
    const valueInput = document.getElementById('value-input');
    const value = parseInt(valueInput.value);

    if (category && !isNaN(value) && value >= 0) {
        if (categories[category]) {
            categories[category] += value;
        } else {
            categories[category] = value;
        }
        updateChart();
        categoryInput.value = '';
        valueInput.value = '';
    }
}
function updateChart() {
    const paretoChart = document.getElementById('pareto-chart').getContext('2d');
    
    const sortedCategories = Object.keys(categories).sort((a, b) => categories[b] - categories[a]);
    const labels = sortedCategories.map(category => category);
    const data = sortedCategories.map(category => categories[category]);
    
    const cumulativeData = data.reduce((acc, value) => {
        if (acc.length === 0) {
            acc.push(value);
        } else {
            acc.push(acc[acc.length - 1] + value);
        }
        return acc;
    }, []);
    const paretoData = {
        labels: labels,
        datasets: [
            {
                label: 'Frecuencia',
                data: data,
                backgroundColor: backgroundColors
            },
            {
                label: 'Porcentaje Acumulado',
                data: cumulativeData.map(value => (value / cumulativeData[cumulativeData.length - 1]) * 100),
                type: 'line',
                borderColor: 'black',
                fill: false
            }
        ]
    };
    if (window.paretoChart) {
        window.paretoChart.destroy();
    }

    window.paretoChart = new Chart(paretoChart, {
        type: 'bar',
        data: paretoData,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Frecuencia'
                    }
                },
                y1: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Porcentaje Acumulado (%)'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
    if (paretoChart) {
        paretoChart.destroy();
    }

    paretoChart = new Chart(paretoChartCanvas, {
        type: 'bar',
        data: paretoData,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Frecuencia'
                    }
                },
                y1: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Porcentaje Acumulado (%)'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });   
}