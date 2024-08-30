package main

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
)

type DataPoint struct {
	Time    float64 `json:"time"`
	Current float64 `json:"current"`
	Kappa   float64 `json:"kappa"`
	Density float64 `json:"density"`
}

var data []DataPoint

func main() {
	loadData("data/tokamak_data.csv")

	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("web/static"))))
	http.HandleFunc("/data", handleData)
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "web/templates/index.html")
	})

	fmt.Println("Server is running on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func loadData(filename string) {
	file, err := os.Open(filename)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	reader := csv.NewReader(file)
	records, err := reader.ReadAll()
	if err != nil {
		log.Fatal(err)
	}

	for i, record := range records {
		if i == 0 { // Skip header
			continue
		}
		time, _ := strconv.ParseFloat(record[0], 64)
		current, _ := strconv.ParseFloat(record[1], 64)
		kappa, _ := strconv.ParseFloat(record[2], 64)
		density, _ := strconv.ParseFloat(record[3], 64)

		data = append(data, DataPoint{
			Time:    time,
			Current: current,
			Kappa:   kappa,
			Density: density,
		})
	}
}

func handleData(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}