# Tokamak Data Visualizer

This project includes a Python script for generating simulated tokamak data and a Go web server for visualizing the data using Plotly.js.

## Prerequisites

- Miniconda or Anaconda (for Python environment management)
- Go 1.16 or higher
- Git (for cloning the repository)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/MatthewWaller/tokamak-visualizer.git
cd tokamak-visualizer
```

### 2. Set up Python environment using Conda

First, ensure you have Miniconda or Anaconda installed. Then, create the Conda environment:

```bash
conda env create -f environment.yml
```

Activate the environment:

```bash
conda activate tokamak-visualizer
```

### 3. Set up Go environment

Ensure you have Go installed and your `GOPATH` is set up correctly.

Run: 

```bash
go mod tidy
```

This command will ensure all dependencies are correctly listed in the go.mod file and downloaded.

## Usage

### 1. Generate Tokamak Data

Ensure your Conda environment is activated, then run the Python script to generate the simulated tokamak data:

```bash
python data_generator.py
```

This will create a `tokamak_data.csv` file in the `data/` directory.

### 2. Run the Go Web Server

From the root of the project, run:

```bash
go run cmd/server/main.go
```

The server will start, and you should see a message indicating it's running on `http://localhost:8080`.

### 3. View the Visualization

Open a web browser and navigate to `http://localhost:8080`. You should see the Tokamak Data Visualizer interface.

## Project Structure

```
tokamak-visualizer/
│
├── cmd/
│   └── server/
│       └── main.go           # Go web server
│
├── web/
│   ├── static/
│   │   └── js/
│   │       └── app.js        # JavaScript for the web interface
│   └── templates/
│       └── index.html        # HTML template for the web interface
│
├── data/
│   └── tokamak_data.csv      # Generated data (will be created by the Python script)
│
├── environment.yml           # Conda environment file
├── go.mod                    # Go module file
├── data_generator.py         # Python script for data generation
├── LICENSE.md                # The license file
└── README.md                 # This file
```

## Troubleshooting

- If you encounter any issues with the Conda environment, try removing it with `conda env remove -n tokamak-visualizer` and recreating it.
- For Go-related issues, check that your Go installation is correct and your `GOPATH` is set up properly.
- If the web server doesn't start, ensure no other process is using port 8080.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.