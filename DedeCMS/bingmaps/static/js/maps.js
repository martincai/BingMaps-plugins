/**
 * Copyright (c) Microsoft Open Technologies (Shanghai) Company Limited.  All rights reserved.
 *
 * The MIT License (MIT)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */

// Set these variables to change beginning map location
var beginLatitude = 39.904;
var beginLongitude = 116.408;
var beginZoom = 10;
var bmapkey = 'input your bingmaps key';

// Global variable to initialize VEMap in
var map = null;
// Global variable to track current pinId
var pinid = 0;
// Should we render the map now or wait for call back
var waitingForCallback = false;

// To hold values for call back function
var tmpTitle = null;
var tmpDescription = null;

// Initialize map
// mapDivName - Div container for map
function GetMap(mapDivName) {
    map = new VEMap(mapDivName);
    map.LoadMap(new VELatLong(beginLatitude, beginLongitude), beginZoom, 'h', false);
    map.SetZoomLevel(beginZoom);
    map.AttachEvent("onchangeview", MapChangeHandler);

}

// Try to find this location and add a pushpin if successfull
// Location - string value of location to add to map
function FindAndAddPin(location) {
    if (location == null || location.length == 0) {
        alert('请输入地址');
    } else {
        try {
            map.Find(null, location, null, null, 0, 1, false, false, true, true, MapFindCallback);
            waitingForCallback = true;
        }
        catch (e) {
            alert(e.message);
            waitingForCallback = false;
        }
    }
}

// Call back function for when a map location is found
function MapFindCallback(layer, resultsArray, places, hasMore, veErrorMessage)
{
    if (places != null)
    {
        var latLon = places[0].LatLong;
        $('#bingmapsurl').val(latLon.Latitude + ',' + latLon.Longitude + '/17' + '?mapSize=600,300&pushpin=' + latLon.Latitude + ',' + latLon.Longitude + '&key=' + bmapkey);
    }
}

// Repopulates maps with push pins on map change events
function MapChangeHandler(e) {
    if (!waitingForCallback)
    {
//        LoadPushPins();
    }
}