/**
 * Copyright (C) Microsoft Open Technologies (Shanghai) Company Limited
 *
 * GNU General Public License, version 2 (GPL-2.0)
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or (at
 * your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307
 * USA
 */

var beginLatitude = latitude;
var beginLongitude = longitude;
var beginZoom = 10;
var map = null;

function GetMap()
{
    // Initialize the map
    map = new Microsoft.Maps.Map(document.getElementById("myMap"), {credentials: bmapkey});

    // Define the pushpin location
    var loc = new Microsoft.Maps.Location(beginLatitude, beginLongitude);

    // Center the map on the location
    map.setView({center: loc, zoom: beginZoom});
    // Load map search module
    Microsoft.Maps.loadModule('Microsoft.Maps.Search');
}

function FindAndAddPin(location)
{
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
    $('#bingmapsurl').val(location.latitude + ',' + location.longitude + '/' + bmapzoom + '?mapSize=' + bmapwidth + ',' + bmapheight + '&pushpin=' + location.latitude + ',' + location.longitude + ';21;' + name + '&key=' + bmapkey);
    //new map pushpin and reset
    var loc1 = new Microsoft.Maps.Location(location.latitude, location.longitude);
    var pin = new Microsoft.Maps.Pushpin(loc1);
    map.entities.push(pin);
    map.setView({center: loc1, zoom: bmapzoom});
}