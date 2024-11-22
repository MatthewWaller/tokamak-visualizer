interface DataPoint {
    time: number;
    [key: string]: number;
}

interface PlotTrace {
    x: number[];
    y: number[];
    type: string;
    mode: string;
    name: string;
    yaxis?: string;
}

interface PlotLayout {
    title: string;
    xaxis: { title: string; };
    yaxis: { title: string; };
}

function zScore(values: number[]): number[] {
    const mean = values.reduce((a, b) => a + b) / values.length;
    const std = Math.sqrt(values.reduce((a, b) => a + Math.pow(b - mean, 2)) / values.length);
    return values.map(v => (v - mean) / std);
}

declare const Plotly: {
    newPlot: (
        elementId: string,
        data: PlotTrace[],
        layout: PlotLayout
    ) => void;
};

let data: DataPoint[] = [];

function updatePlot(): void {
    const selectElement = document.getElementById('signalSelect') as HTMLSelectElement;
    const normalizeCheckbox = document.getElementById('normalizeToggle') as HTMLInputElement;
    const selectedSignals = Array.from(selectElement.selectedOptions).map(option => option.value);
    
    const traces: PlotTrace[] = selectedSignals.map(signal => {
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

    const layout: PlotLayout = {
        title: 'Tokamak Data Visualization',
        xaxis: { title: 'Time (ms)' },
        yaxis: { title: normalizeCheckbox.checked ? 'Z-Score' : 'Value' }
    };

    Plotly.newPlot('plot', traces, layout);
}

fetch('/data')
    .then((response: Response) => response.json())
    .then((jsonData: DataPoint[]) => {
        data = jsonData;
        updatePlot();
    })
    .catch((error: Error) => {
        console.error('Failed to fetch data:', error);
    });