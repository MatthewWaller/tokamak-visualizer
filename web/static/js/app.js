"use strict";
function zScore(values) {
    const mean = values.reduce((a, b) => a + b) / values.length;
    const std = Math.sqrt(values.reduce((a, b) => a + Math.pow(b - mean, 2)) / values.length);
    return values.map(v => (v - mean) / std);
}
let data = [];
function updatePlot() {
    const selectElement = document.getElementById('signalSelect');
    const normalizeCheckbox = document.getElementById('normalizeToggle');
    const selectedSignals = Array.from(selectElement.selectedOptions).map(option => option.value);
    const traces = selectedSignals.map(signal => {
        const values = data.map(d => d[signal]);
        const yValues = normalizeCheckbox.checked ? zScore(values) : values;
        return {
            x: data.map(d => d.time),
            y: yValues,
            type: 'scatter',
            mode: 'lines',
            name: normalizeCheckbox.checked ? `${signal} (normalized)` : signal
        };
    });
    const layout = {
        title: 'Tokamak Data Visualization',
        xaxis: { title: 'Time (ms)' },
        yaxis: { title: normalizeCheckbox.checked ? 'Z-Score' : 'Value' }
    };
    Plotly.newPlot('plot', traces, layout);
}
fetch('/data')
    .then((response) => response.json())
    .then((jsonData) => {
    data = jsonData;
    updatePlot();
})
    .catch((error) => {
    console.error('Failed to fetch data:', error);
});
