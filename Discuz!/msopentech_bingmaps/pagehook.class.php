<?php
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

if(!defined('IN_DISCUZ')) {
	exit('Access Denied');
}

class plugin_msopentech_bingmaps {
	
}

class plugin_msopentech_bingmaps_forum extends plugin_msopentech_bingmaps {

    function post_editorctrl_left() {
        global $_G;
        @extract($_G['cache']['plugin']['msopentech_bingmaps']);
        
        if (!$Bingmapskey) {
            $Bingmapskey = "";
        }
        if ($mapWidth) {
            $mapWidth = ($mapWidth < 300) ? 300 : $mapWidth;
        } else {
            $mapWidth = 400;
        }
        if ($mapHeight) {
            $mapHeight = ($mapHeight < 200) ? 200 : $mapHeight;
        } else {
            $mapHeight = 300;
        }
        if (!$defaultCity) {
            $defaultCity = "北京";
        }        
        if(!$zoomlevel) {
            $zoomlevel = 17;
        }
        //get longitude and latitude through ditu REST API by defaultCity
        $dcUrl = 'http://dev.ditu.live.com/REST/v1/Locations/'. urlencode($defaultCity) .'?o=xml&key='. $Bingmapskey;
        $dcString = file_get_contents($dcUrl);
        if (!empty($dcString)) {
            $dcxml = simplexml_load_string($dcString);
            $latitude = $dcxml->ResourceSets->ResourceSet->Resources->Location->Point->Latitude;
            $longitude = $dcxml->ResourceSets->ResourceSet->Resources->Location->Point->Longitude;
        } else {
            $latitude = $longitude = '';
        }
        
        
        $mapbtn = "<input type=\"text\" id=\"bingmapskey\" value=\"" . $Bingmapskey . "\" style=\"display:none\" />"
                . "<input type=\"text\" id=\"mapwidth\" value=\"" . $mapWidth . "\" style=\"display:none\"/>"
                . "<input type=\"text\" id=\"mapheight\" value=\"" . $mapHeight . "\" style=\"display:none\"/>"
                . "<input type=\"text\" id=\"defaultcity\" value=\"" . $defaultCity . "\" style=\"display:none\" />"
                . "<input type=\"text\" id=\"zoomlevel\" value=\"" . $zoomlevel . "\" style=\"display:none\" />"
                . "<input type=\"text\" id=\"latitude\" value=\"" . $latitude . "\" style=\"display:none\" />"
                . "<input type=\"text\" id=\"longitude\" value=\"" . $longitude . "\" style=\"display:none\" />"
                . "<script type=\"text/javascript\">var e_bingmapsWidth = " . $mapWidth . ";var e_bingmapsHeight = " . $mapHeight . ";</script>"
                . "<link rel=\"stylesheet\" href=\"source/plugin/msopentech_bingmaps/static/css/map.css\" type=\"text/css\" />"
                . "<script src=\"source/plugin/msopentech_bingmaps/static/js/maps7.0.js\" type=\"text/javascript\"></script>"
                . "<script src=\"source/plugin/msopentech_bingmaps/static/js/addmap.js\" type=\"text/javascript\"></script>"
                . "<a id=\"btn_bingmaps\" title=\"必应地图\" onClick=\"addbingmaps('btn_bingmaps')\" href='javascript:void(0);' >必应地图</a>";
        return $mapbtn;
    }

}

?>