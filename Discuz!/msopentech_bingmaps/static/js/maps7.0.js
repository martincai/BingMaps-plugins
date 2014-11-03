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
 
var beginLatitude = latitude;
var beginLongitude = longitude;
var beginZoom = 10;
var map = null;

function GetMap()
{
    // Initialize the map
    map = new Microsoft.Maps.Map(document.getElementById("myMap"),{credentials: bmapkey});

    // Define the pushpin location
    var loc = new Microsoft.Maps.Location(beginLatitude, beginLongitude);

    // Center the map on the location
    map.setView({center: loc, zoom: beginZoom});
    // Load map search module
    Microsoft.Maps.loadModule('Microsoft.Maps.Search');
}

function FindAndAddPin(location) {
    if (location == null || location.length == 0) {
        alert('请输入地址');
    } else {
        try {
            var searchManager = new Microsoft.Maps.Search.SearchManager(map);
            searchManager.geocode({where: location, count: 10, callback: geocodeCallback});
        }
        catch (e) {
            alert(e.message);
        }
    }
}

function geocodeCallback(geocodeResult, userData)
{
    var location = geocodeResult.results[0].location;
    var name = geocodeResult.results[0].name;
    //set value
    $('#bingmapsurl').val(location.latitude + ',' + location.longitude + '/'+ zoomlevel + '?mapSize=' + imapwidth + ',' + imapheight + '&pushpin=' + location.latitude + ',' + location.longitude + ';21;'+name+'&key=' + bmapkey);
    //new map pushpin and reset
    var loc1 = new Microsoft.Maps.Location(location.latitude, location.longitude);
    var pin = new Microsoft.Maps.Pushpin(loc1);   
    map.entities.push(pin);
    map.setView({center: loc1, zoom: zoomlevel});
}