var line_thickness = 1;
var stop_stroke_thickness = 4;
var chart_padding_right = 0;
var minWidthKm = 10;
var xAxisWidth = 60;
var globalMin, globalMax, globalPlotData;
var pointGap = 0.5;
var activeTrainId;

var colorAxisLines = '#CECECE';
var colorMinorAxisLines = '#EAEAEA';
var colorLightMinorAxisLines = '#F7F7F7';
var colorAxisFont = '#7c868e';
var darkAccentColor = '#545f69';
var darkAxisColor = '#B9B9B9';

var fontColor = '#212121';
var palette = anychart.palettes.distinctColors().colors(
    ['#64b5f6', '#1976d2', '#ef6c00', '#ffd54f', '#455a64', '#96a6a6', '#dd2c00', '#00838f', '#00bfa5', '#ffa000']
);
var textLabelSettings = {
    fontFamily: "'Verdana', Helvetica, Arial, sans-serif",
    fontWeight: 'normal',
    fontSize: '12px',
    fontColor: darkAccentColor
};

function fillTable(train_id){


    if (train_id){
        var trainData;
        for (var p = 0; p < trainsData.length; p++ ){
            if (trainsData[p].id == train_id) {
                trainData =  trainsData[p];
                break;
            }
        }
        var table = $('<table class="table table-condensed"></table>');
        var thead = $('<thead><tr><th>#</th><th>Station</th><th>Arrives</th><th>Departs</th></tr></thead>');
        var tbody = $('<tbody></tbody>');

        for (var i = 0; i < trainData.stops.length; i++) {
            var newRow = $('<tr></tr>');
            newRow = newRow.append($('<td>' + (i + 1) + '</td>'));
            newRow = newRow.append($('<td> </td>'));
            newRow = newRow.append($('<td> </td>'));
            newRow = newRow.append($('<td> </td>'));
            tbody.append(newRow);
        }

        $('#data-container').html(table.append(thead).append(tbody));
    } else {
        $('#data-container').html('<p>Click on train line on the graphic to see details.</p>');
    }
}

function drawSchedule(layer, stations, trains, parameter){
    var paths = [];

    function drawPoint(position_number, n, point_data, path_data, yAxis_data){
        var plotBounds = globalPlotData.bounds;
        var yAxis = globalPlotData.yAxis;
        var xAxis = globalPlotData.xAxis;
        var width = yAxis_data[1];
        var pointY_thickness = Math.min(width/n * pointGap, stop_stroke_thickness * pointGap);
        var pointY = yAxis_data[0] + width - (width/n * position_number) - pointGap * pointY_thickness;
        if (parameter == 'distance') pointY = yAxis_data[0] - (width/n * position_number);

        var ratioXArrives = xAxis.scale().transform(point_data.arrives);
        var ratioXDeparts = xAxis.scale().transform(point_data.departs);
        var XArrives = plotBounds.left + plotBounds.width * (ratioXArrives);
        var XDeparts = plotBounds.left + plotBounds.width * (ratioXDeparts);

        if (point_data.end && path_data.reverse){
            path_data.path.moveTo(XArrives, pointY);
        } else if (point_data.begin && !path_data.reverse) {
            path_data.path.moveTo(XArrives, pointY);
        } else if (point_data.first){
            var ratioYPrev = yAxis.scale().transform(0);
            var prevPointY = plotBounds.top + plotBounds.height * (1 - ratioYPrev);
            path_data.path
                .moveTo(XArrives, prevPointY);
        }
        if (!path_data.reverse)
            path_data.path
                .lineTo(XArrives, pointY)
                .lineTo(XArrives, pointY + pointY_thickness/2)
                .lineTo(XDeparts, pointY + pointY_thickness/2)
                .lineTo(XDeparts, pointY - pointY_thickness/2)
                .lineTo(XArrives, pointY - pointY_thickness/2)
                .lineTo(XArrives, pointY)
                .moveTo(XDeparts, pointY);
        else
            path_data.path
                .lineTo(XDeparts, pointY)
                .lineTo(XDeparts, pointY - pointY_thickness/2)
                .lineTo(XArrives, pointY - pointY_thickness/2)
                .lineTo(XArrives, pointY + pointY_thickness/2)
                .lineTo(XDeparts, pointY + pointY_thickness/2)
                .moveTo(XArrives, pointY)
                .lineTo(XArrives, pointY);
    }

    function stationPoints(points, stationYData){
        var arr = [NaN, NaN, NaN];
        for (var i = 0; i < points.length; i++) {
            for (var j = 0; j < arr.length; j++) {
                if (arr[j] < points[i].arrives) arr[j]= NaN;
            }
            for (j = 0; j < arr.length; j++) {
                if (isNaN(arr[j])) {
                    var path;
                    for (var p = 0; p < paths.length; p++ ){
                        if (paths[p].train_id == points[i].train_id) path = paths[p];
                    }
                    drawPoint(j, arr.length, points[i], path, stationYData);
                    arr[j] = points[i].departs;
                    break;
                }
            }
        }
    }

    function makeLayerListenEvents(layer){

        function getActiveTrainOriginalColor(trainId){
            for (var p = 0; p < paths.length; p++) {
                if (paths[p].train_id == trainId) {
                    return paths[p].color;
                }
            }
        }

        function colorAllPaths(opacity){
            for (var p = 0; p < paths.length; p++ ){
                paths[p].path
                    .stroke(line_thickness + ' ' + paths[p].color + ' ' + opacity)
                    .fill(paths[p].color + ' ' + opacity)
            }
        }

        layer.listen('mouseover', function(e){
            if (activeTrainId == undefined){
                colorAllPaths(0.3);
                var color = anychart.color.darken(getActiveTrainOriginalColor(e.target.train_id));
                e.target.stroke(line_thickness + ' ' + color).fill(color);
            }
        });

        layer.listen('click', function(e) {
            var trainId = e.target.train_id;
            if (activeTrainId != trainId) {
                if (activeTrainId != undefined) {
                    for (var p = 0; p < paths.length; p++) {
                        if (paths[p].train_id == activeTrainId) {
                            paths[p].path.stroke(line_thickness + ' ' + paths[p].color + ' 0.3').fill(paths[p].color + ' 0.3');
                            break;
                        }
                    }
                }
                e.target.stroke(line_thickness + ' black').fill('black');
                activeTrainId = e.target.train_id;
                fillTable(activeTrainId);
            } else {
                var color = anychart.color.darken(getActiveTrainOriginalColor(e.target.train_id));
                e.target.stroke(line_thickness + ' ' + color).fill(color);
                activeTrainId = undefined;
                fillTable(null);
            }
            e.stopPropagation();
        });

        anychart.graphics.events.listen(document.body, 'click', function(e) {
            if (activeTrainId != undefined) {
                colorAllPaths(1);
                activeTrainId = undefined;
                fillTable(null);
            }
        });

        layer.listen('mouseout', function(){
            if (activeTrainId == undefined)colorAllPaths(1);
        });
    }

    function drawSeries(){
        var plotBounds = globalPlotData.bounds;
        var yAxis = globalPlotData.yAxis;
        layer.removeChildren();
        layer.clip(plotBounds);

        for (var i = 0; i < trains.length; i++) {
            var reverse = false;
            if (trains[i].stops[0].station_number > trains[i].stops[trains[i].stops.length - 1].station_number)
            reverse = true;
            var color = palette.colorAt(0);
            if (trains[i].type == 'type2')
                color = palette.colorAt(1);
            if (trains[i].type == 'type3')
                color = palette.colorAt(2);
            var path_data = {'color': color, "path": layer.path(), "train_id": trains[i].id, 'reverse': reverse};
            path_data.path.train_id = path_data.train_id;
            path_data.path.stroke(line_thickness + ' ' + path_data.color).fill(path_data.color);
            paths.push(path_data);
            paths.push({'color': color, "path": layer.path(), "train_id": trains[i].id + '_prev', 'reverse': reverse});
            paths.push({'color': color, "path": layer.path(), "train_id": trains[i].id + '_next', 'reverse': reverse});
        }
        makeLayerListenEvents(layer);

        var theDate = getDayFromString();
        var year = theDate.getUTCFullYear();
        var day = theDate.getUTCDate();
        var month = theDate.getUTCMonth();

        var makeStationPointData = function(day, train_id, stop_data, if_first){
            return {
                'end': stop_data.end,
                'begin': stop_data.begin,
                'first': if_first,
                'arrives': Date.UTC(year, month, day, stop_data.arrives[0], stop_data.arrives[1]),
                'departs': Date.UTC(year, month, day, stop_data.departs[0], stop_data.departs[1]),
                'train_id': train_id
            }
        };

        for (var j = 0; j < stations.length; j++) {
            var stations_points = [];
            for (var k = 0; k < trains.length; k++){
                for (var q = 0; q < trains[k].stops.length; q++) {
                    if (trains[k].stops[q].station_number == stations[j].number ){
                        if (!trains[k].stops[q].begin && q == 0){
                            stations_points.push(makeStationPointData(day, trains[k].id, trains[k].stops[q], true));
                            stations_points.push(makeStationPointData(day - 1, trains[k].id + '_prev', trains[k].stops[q], true));
                            stations_points.push(makeStationPointData(day + 1, trains[k].id + '_next', trains[k].stops[q], true));
                        }else{
                            stations_points.push(makeStationPointData(day, trains[k].id, trains[k].stops[q], false));
                            stations_points.push(makeStationPointData(day - 1, trains[k].id + '_prev', trains[k].stops[q], false));
                            stations_points.push(makeStationPointData(day + 1, trains[k].id + '_next', trains[k].stops[q], false));
                        }
                    }
                }
            }
            if (stations_points.length > 0){
                stations_points = stations_points.sort(sortingFunction("arrives"));
                var ratioYPrev = yAxis.scale().transform(stations[j][parameter] - 1);
                var ratioYNext = yAxis.scale().transform(stations[j][parameter] + 0);

                var pixYPrev = plotBounds.top + plotBounds.height * (1 - ratioYPrev);
                var pixYNext = plotBounds.top + plotBounds.height * (1 - ratioYNext);
                var width = pixYNext-pixYPrev;
                if (parameter == 'distance') width = minWidthKm;
                stationPoints(stations_points, [pixYPrev, width]);
            }
        }
    }

    drawSeries();
}

function drawPlot(stage, scroll, stations, parameter){

    function drawPlotArea(xAxis, yAxis){
        yAxis.padding().bottom(scroll.height());
        yAxis.container(stage).draw();
        var yAxisBounds = yAxis.getRemainingBounds();

        xAxis.padding().left(yAxisBounds.left);
        xAxis.padding().right(chart_padding_right);
        xAxis.container(stage).draw();
        var plotBounds = xAxis.getRemainingBounds();
        plotBounds.left = yAxisBounds.left;
        scroll.left(yAxisBounds.left);
        scroll.right(chart_padding_right);
        plotBounds.height -= scroll.height();
        plotBounds.width = yAxisBounds.width - chart_padding_right;

        var grid = anychart.grids.linear();
        grid.oddFill(null);
        grid.evenFill(null);

        if (parameter != 'distance'){
            grid.drawFirstLine(false);
            grid.drawLastLine(false);
        }
        grid.stroke(colorMinorAxisLines);
        grid.parentBounds(plotBounds);
        grid.scale(yAxis.scale());
        grid.layout('horizontal');
        grid.container(stage).draw();
        return plotBounds
    }

    function getTimeScale(){
        return anychart.scales.dateTime();
    }

    function getTimeAxis(scale){
        var axis = anychart.axes.linear();
        axis.title(null);
        axis.width(xAxisWidth);
        axis.scale(scale);
        axis.stroke(colorAxisLines);
        axis.ticks().stroke(colorAxisLines).length(8);
        axis.minorTicks().stroke(colorAxisLines).length(4);
        axis.labels().textSettings(textLabelSettings).useHtml(true).padding(10,0,3,0).hAlign('center').fontSize(11).fontColor(colorAxisFont)
            .textFormatter(function(){
            var dateTime = new Date(this.tickValue);
            var year = dateTime.getFullYear();
            var month = dateTime.getUTCMonth();
            var day = dateTime.getUTCDate();
            var hour = dateTime.getUTCHours();
            var minutes = dateTime.getUTCMinutes();
            var textTime = (hour < 10 ? '0' + hour : hour) + ':' + (minutes < 10 ? '0' + minutes : minutes);
            if (dateTime.getUTCHours() == 6 || dateTime.getUTCHours() == 12 || dateTime.getUTCHours() == 18) {
                return '<span style="font-size: 12px; font-weight: bold; color: ' + darkAccentColor + '">' + day + "/" + month + "/" + year + '</span><br/>' + textTime ;
            }
            return textTime;
        });
        axis.drawLastLabel(false);
        axis.minorTicks().enabled(true);
        axis.orientation('top');
        return axis
    }

    function getStationsScale(){
        var scale = anychart.scales.linear();
        scale.minimum(0).maximum(stations.length + 2).ticks().interval(1);
        scale.inverted(true);
        return scale;
    }

    function getStationsDistanceScale(){
        var scale = anychart.scales.linear();
        var ticks = [];
        for (var i = 0; i < stations.length; i++) {
            ticks.push(stations[i].distance)
        }
        scale.minimum(-minWidthKm).maximum(stations[stations.length - 1].distance + minWidthKm).ticks(ticks);
        scale.inverted(true);
        return scale;
    }

    function getStationsAxis(scale){
        var axis = anychart.axes.linear();
        axis.padding().top(xAxisWidth);
        axis.title(null);
        axis.scale(scale);
        axis.orientation('left');
        axis.stroke(colorAxisLines);
        axis.ticks().stroke(colorMinorAxisLines).length(4);
        axis.labels().useHtml(true).textSettings(textLabelSettings).padding(0,3,0,10).fontColor(colorAxisFont)
            .textFormatter(function () {
            var name;
            for (var i = 0; i < stations.length; i++) {
                if (this.value == stations[i][parameter]){
                    name = '<span style="font-size: 12px; color: '+ colorAxisFont +'">' + stations[i].name + '</span>';
                    if (this.value = stations[i].size == 'small')
                        name = '<span style="font-size: 11px; color: '+ darkAxisColor +'">' + stations[i].name + '</span>';
                    if (this.value = stations[i].size == 'big')
                        name = '<strong style="font-size: 12px; color: '+ darkAccentColor +'">' + stations[i].name + '</strong>';
                }
            }
            return name
        });
        axis.minorTicks(null);
        if (parameter != 'distance'){
            axis.drawFirstLabel(false);
            axis.drawLastLabel(false);
        }
        return axis
    }

    var xScale = getTimeScale();
    var xAxis = getTimeAxis(xScale);
    var yScale = getStationsScale();
    if (parameter == 'distance') yScale = getStationsDistanceScale();
    var yAxis = getStationsAxis(yScale);

    var layer = stage.layer();
    layer.zIndex(100);

    return {
        xScale: xScale,
        xAxis: xAxis,
        yScale: yScale,
        yAxis: yAxis,
        dataLayer: layer,
        bounds: drawPlotArea(xAxis, yAxis)
    }
}

anychart.onDocumentReady(function() {
    prepareScale();
    var stage = anychart.graphics.create('chart-container');
    var scroll = anychart.ui.scroller();
    var scroll_height = 17;
    scroll.autoHideThumbs(false);
    scroll.container(stage).draw();
    scroll.height(scroll_height);
    scroll.backgroundFill(colorMinorAxisLines);
    scroll.selectedBackgroundFill(colorAxisLines);
    scroll.outlineStroke(null);
    scroll.thumbsFill(colorLightMinorAxisLines);
    scroll.thumbsStroke(colorAxisFont);
    globalPlotData = drawPlot(stage, scroll, stationsData[0].stations, 'distance');
    scroll.listen('scrollerchange', zoomSchedule);
    scroll.setRange(12/48, 33/48, 'user');

    function zoomSchedule(e) {
        var minAxis = roundMinutes((globalMax - globalMin) * e.startRatio + globalMin);
        var maxAxis = roundMinutes((globalMax - globalMin) * e.endRatio + globalMin);
        var diffMs = maxAxis-minAxis;
        var diffH = ((diffMs / 1000) / 60) / 60;
        var diffD = diffH / 24;
        globalPlotData.xScale.ticks().interval('h', 1);
        globalPlotData.xScale.minorTicks().interval('n', 10);
        if (diffD > 2){
            globalPlotData.xScale.ticks().interval('h', 6);
            globalPlotData.xScale.minorTicks().interval('h', 3);
        } else if (diffD > 1){
            globalPlotData.xScale.ticks().interval('h', 3);
            globalPlotData.xScale.minorTicks().interval('h', 1);
        } else if (diffH < 2){
            globalPlotData.xScale.ticks().interval('n', 10);
            globalPlotData.xScale.minorTicks().interval('n', 5);
        } else if (diffH < 6){
            globalPlotData.xScale.ticks().interval('n', 30);
            globalPlotData.xScale.minorTicks().interval('n', 5);
        }
        globalPlotData.xScale.minimum(minAxis);
        globalPlotData.xScale.maximum(maxAxis);
        globalPlotData.xAxis.draw();
        drawSchedule(
            globalPlotData.dataLayer,
            stationsData[0].stations,
            trainsData,
            'distance'
        );
    }
});

function roundMinutes(date) {
    var d = new Date(date);
    d.setHours(d.getHours() + Math.round(d.getMinutes()/60));
    d.setMinutes(0);
    return d;
}

function getTodayString(){
    var today = new Date();
    var day = today.getUTCDate();
    var month = today.getUTCMonth() + 1;
    var year = today.getUTCFullYear();
    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;
    return month + '/' + day + '/' + year;
}

function getDayFromString(){
    return new Date(getTodayString());
}

function prepareScale() {
    var theDay = getDayFromString();
    globalMin = Date.UTC(theDay.getUTCFullYear(), theDay.getUTCMonth(), theDay.getUTCDate() - 1, 18, 0);
    globalMax = Date.UTC(theDay.getUTCFullYear(), theDay.getUTCMonth(), theDay.getUTCDate() + 1, 6, 0);
}

function sortingFunction(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}