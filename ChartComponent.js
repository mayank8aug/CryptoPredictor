var lineChart;

function renderChart(chartData) {
    let xAxisLabels = [];
    let yAxisData = [];
    const chartEl = document.getElementById('chartId').getContext('2d');
    chartData.map(dataItem => {xAxisLabels.push((new Date(dataItem.timestamp)).toLocaleDateString()); yAxisData.push(dataItem.usd);})
    lineChart = new Chart(chartEl, {
        type: 'line',
        data: {
            labels: xAxisLabels,
            datasets: [
                {
                    label: "Predicted Value (in USD)",
                    data: yAxisData,
                    backgroundColor: "rgba(255, 255, 255, 0.1)"
                }
            ]
        }
    });
}

function destroyChart() {
    if(lineChart) {
        lineChart.destroy();
    }
}