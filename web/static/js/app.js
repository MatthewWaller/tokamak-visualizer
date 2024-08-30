let data = [];

fetch('/data')
    .then(response => response.json())
    .then(jsonData => {
        data = jsonData;
        updatePlot();
    });

function updatePlot() {
    const selectedSignals = Array.from(document.getElementById('signalSelect').selectedOptions).map(option => option.value);
    
    const traces = selectedSignals.map(signal => ({
        x: data.map(d => d.time),
        y: data.map(d => d[signal]),
        type: 'scatter',
        mode: 'lines',
        name: signal
    }));

    const layout = {
        title: 'Tokamak Data Visualization',
        xaxis: { title: 'Time (ms)' },
        yaxis: { title: 'Value' }
    };

    Plotly.newPlot('plot', traces, layout);
}