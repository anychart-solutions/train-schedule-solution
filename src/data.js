var stationsData = [
    {'direction': 'Wien Westbahnhof - München Hbf', 'stations': [
        {"number": 1, "name": "Wien Westbahnhof", "distance": 0, "size": 'big'},
        {"number": 2, "name": "Atzenbrugg", "distance": 20, "size": 'small'},
        {"number": 3, "name": "St.Pölten Hbf", "distance": 30, "size": 'medium'},
        {"number": 4, "name": "Melk", "distance": 40, "size": 'medium'},
        {"number": 5, "name": "Wörth", "distance": 50, "size": 'small'},
        {"number": 6, "name": "Pöchlarn", "distance": 60, "size": 'small'},
        {"number": 7, "name": "Neuda", "distance": 70, "size": 'small'},
        {"number": 8, "name": "Kemmelbach", "distance": 80, "size": 'small'},
        {"number": 9, "name": "Neumarkt an der Ybbs", "distance": 90, "size": 'small'},
        {"number": 10, "name": "Kottingburgstall", "distance": 100, "size": 'small'},
        {"number": 11, "name": "Blindenmarkt", "distance": 120, "size": 'small'},
        {"number": 12, "name": "Amstetten", "distance": 130, "size": 'medium'},
        {"number": 13, "name": "Aschbach-Markt", "distance": 140, "size": 'medium'},
        {"number": 14, "name": "Pilsing", "distance": 150, "size": 'small'},
        {"number": 16, "name": "Mauer bei Amstetten", "distance": 160, "size": 'small'},
        {"number": 17, "name": "Aschbach-Markt", "distance": 170, "size": 'small'},
        {"number": 18, "name": "Paga", "distance": 180, "size": 'small'},
        {"number": 19, "name": "St. Valentin", "distance": 190, "size": 'small'},
        {"number": 20, "name": "Ennsdorf bei Enns", "distance":210, "size": 'small'},
        {"number": 21, "name": "Linz Hbf", "distance": 270, "size": 'big'},
        {"number": 22, "name": "Pasching", "distance": 310, "size": 'big'},
        {"number": 23, "name": "Salzburg Hbf", "distance": 380, "size": 'big'},
        {"number": 24, "name": "München Hbf", "distance": 402, "size": 'big'}
    ]}
];

var directionsData = [
    {'name': 'Wien Westbahnhof - München Hbf'},
    {'name': 'München Hbf - Wien Westbahnhof'}
];

var trainsData = [
        {
            "name": "Wien Westbahnhof - München Hbf",
            "id": 1,
            "type": 'type1',
            "stops": [
                {"station_number": 1, 'arrives': [11, 50], 'departs': [12, 0], 'begin': true},
                {"station_number": 12, 'arrives': [13, 30], 'departs': [13, 35]},
                {"station_number": 21, 'arrives': [14, 15], 'departs': [14, 20]},
                {"station_number": 22, 'arrives': [15, 5], 'departs': [15, 10]},
                {"station_number": 23, 'arrives': [15, 50], 'departs': [15, 55]},
                {"station_number": 24, 'arrives': [16, 30], 'departs': [16, 40], "end": true}

            ]
        }, {
            "name": "Wien Westbahnhof - München Hbf",
            "id": 2,
            "type": 'type2',
            "stops": [
                {"station_number": 1, 'arrives': [6, 10], 'departs': [6, 15], 'begin': true},
                {"station_number": 2, 'arrives': [6, 25], 'departs': [6, 30]},
                {"station_number": 3, 'arrives': [6, 45], 'departs': [6, 50]},
                {"station_number": 4, 'arrives': [7, 5], 'departs': [7, 10]},
                {"station_number": 5, 'arrives': [7, 25], 'departs': [7, 45]},
                {"station_number": 6, 'arrives': [8, 5], 'departs': [8, 10]},
                {"station_number": 7, 'arrives': [8, 20], 'departs': [8, 25]},
                {"station_number": 8, 'arrives': [8, 45], 'departs': [8, 55]},
                {"station_number": 9, 'arrives': [9, 15], 'departs': [9, 30]},
                {"station_number": 10, 'arrives': [9, 45], 'departs': [9, 50]},
                {"station_number": 11, 'arrives': [10, 5], 'departs': [10, 15]},
                {"station_number": 12, 'arrives': [10, 30], 'departs': [10, 35]},
                {"station_number": 21, 'arrives': [12, 15], 'departs': [12, 20]},
                {"station_number": 22, 'arrives': [13, 5], 'departs': [13, 10]},
                {"station_number": 23, 'arrives': [14, 20], 'departs': [14, 30]},
                {"station_number": 24, 'arrives': [15, 25], 'departs': [15, 35], "end": true}

            ]
        }, {
            "name": "Wien Westbahnhof - München Hbf",
            "id": 3,
            "type": 'type3',
            "stops": [
                {"station_number": 1, 'arrives': [7, 10], 'departs': [7, 15], 'begin': true},
                {"station_number": 2, 'arrives': [7, 25], 'departs': [7, 30]},
                {"station_number": 3, 'arrives': [7, 45], 'departs': [7, 50]},
                {"station_number": 4, 'arrives': [8, 5], 'departs': [8, 10]},
                {"station_number": 5, 'arrives': [8, 25], 'departs': [8, 45]},
                {"station_number": 6, 'arrives': [9, 5], 'departs': [9, 10]},
                {"station_number": 7, 'arrives': [9, 20], 'departs': [9, 25]},
                {"station_number": 8, 'arrives': [9, 45], 'departs': [9, 55]},
                {"station_number": 9, 'arrives': [10, 15], 'departs': [10, 30]},
                {"station_number": 10, 'arrives': [10, 45], 'departs': [10, 50]},
                {"station_number": 11, 'arrives': [11, 5], 'departs': [11, 10]},
                {"station_number": 12, 'arrives': [11, 30], 'departs': [11, 35]},
                {"station_number": 21, 'arrives': [13, 15], 'departs': [13, 20]},
                {"station_number": 22, 'arrives': [14, 5], 'departs': [14, 10]},
                {"station_number": 23, 'arrives': [15, 20], 'departs': [15, 30]},
                {"station_number": 24, 'arrives': [16, 5], 'departs': [16, 15], "end": true}

            ]
        }, {
            "name": "Wien Westbahnhof - München Hbf",
            "id": 4,
            "type": 'type1',
            "stops": [
                {"station_number": 1, 'arrives': [8, 10], 'departs': [8, 15], 'begin': true},
                {"station_number": 2, 'arrives': [8, 25], 'departs': [8, 30]},
                {"station_number": 3, 'arrives': [8, 45], 'departs': [8, 50]},
                {"station_number": 4, 'arrives': [9, 5], 'departs': [9, 10]},
                {"station_number": 5, 'arrives': [9, 25], 'departs': [9, 45]},
                {"station_number": 6, 'arrives': [10, 5], 'departs': [10, 10]},
                {"station_number": 7, 'arrives': [10, 20], 'departs': [10, 25]},
                {"station_number": 8, 'arrives': [10, 45], 'departs': [10, 55]},
                {"station_number": 9, 'arrives': [11, 15], 'departs': [11, 30]},
                {"station_number": 10, 'arrives': [11, 45], 'departs': [11, 50]},
                {"station_number": 11, 'arrives': [12, 5], 'departs': [12, 10]},
                {"station_number": 12, 'arrives': [12, 30], 'departs': [12, 35]},
                {"station_number": 21, 'arrives': [13, 45], 'departs': [13, 50]},
                {"station_number": 22, 'arrives': [14, 25], 'departs': [14, 30]},
                {"station_number": 23, 'arrives': [15, 30], 'departs': [15, 40]},
                {"station_number": 24, 'arrives': [16, 10], 'departs': [16, 25], "end": true}

            ]
        }, {
            "name": "Wien Westbahnhof - München Hbf",
            "id": 5,
            "type": 'type1',
            "stops": [
                {"station_number": 1, 'arrives': [7, 30], 'departs': [7, 35], 'begin': true},
                {"station_number": 2, 'arrives': [7, 45], 'departs': [7, 50]},
                {"station_number": 3, 'arrives': [8, 0], 'departs': [8, 5]},
                {"station_number": 4, 'arrives': [8, 15], 'departs': [8, 20]},
                {"station_number": 5, 'arrives': [8, 35], 'departs': [8, 40]},
                {"station_number": 6, 'arrives': [8, 55], 'departs': [9, 0]},
                {"station_number": 7, 'arrives': [9, 10], 'departs': [9, 15]},
                {"station_number": 8, 'arrives': [9, 25], 'departs': [9, 30]},
                {"station_number": 9, 'arrives': [9, 35], 'departs': [9, 40]},
                {"station_number": 10, 'arrives': [9, 50], 'departs': [9, 55]},
                {"station_number": 11, 'arrives': [10, 5], 'departs': [10, 10]},
                {"station_number": 12, 'arrives': [10, 20], 'departs': [10, 25]},
                {"station_number": 21, 'arrives': [11, 15], 'departs': [11, 20]},
                {"station_number": 22, 'arrives': [12, 5], 'departs': [12, 10]},
                {"station_number": 23, 'arrives': [13, 20], 'departs': [13, 30]},
                {"station_number": 24, 'arrives': [14, 25], 'departs': [14, 35], "end": true}

            ]
        }, {
            "name": "München Hbf - Wien Westbahnhof",
            "id": 6,
            "type": 'type2',
            "stops": [
                {"station_number": 24, 'arrives': [7, 10], 'departs': [7, 15], 'begin': true},
                {"station_number": 23, 'arrives': [7, 25], 'departs': [7, 30]},
                {"station_number": 22, 'arrives': [7, 45], 'departs': [7, 50]},
                {"station_number": 21, 'arrives': [8, 5], 'departs': [8, 10]},
                {"station_number": 12, 'arrives': [8, 55], 'departs': [9, 0]},
                {"station_number": 11, 'arrives': [9, 5], 'departs': [9, 10]},
                {"station_number": 10, 'arrives': [9, 20], 'departs': [9, 25]},
                {"station_number": 9, 'arrives': [9, 45], 'departs': [9, 55]},
                {"station_number": 8, 'arrives': [10, 15], 'departs': [10, 30]},
                {"station_number": 7, 'arrives': [10, 45], 'departs': [10, 50]},
                {"station_number": 6, 'arrives': [11, 5], 'departs': [11, 10]},
                {"station_number": 4, 'arrives': [11, 30], 'departs': [11, 35]},
                {"station_number": 1, 'arrives': [13, 15], 'departs': [13, 20], "end": true}
            ]
        }
];


