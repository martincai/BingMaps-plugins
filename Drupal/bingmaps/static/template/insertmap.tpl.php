<!DOCTYPE html>
<!--
 Copyright (C) Microsoft Open Technologies (Shanghai) Company Limited
 
 GNU General Public License, version 2 (GPL-2.0)
 
 This program is free software; you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation; either version 2 of the License, or (at
 your option) any later version.
 
 This program is distributed in the hope that it will be useful, but
 WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 General Public License for more details.
 
 You should have received a copy of the GNU General Public License
 along with this program; if not, write to the Free Software
 Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307
 USA
-->

<html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn"> 
    <head>
        <meta name="robots" content="noindex, nofollow" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf8" /> 
        <title>插入必应地图</title>
        <link type="text/css" href="<?php echo drupal_get_path('module', 'bingmaps');?>/static/css/map.css" rel="stylesheet"></link>
        <script type="text/javascript" src="<?php echo drupal_get_path('module', 'bingmaps');?>/static/js/jquery-1.2.6.js"></script>
        <script type="text/javascript" src="http://dev.ditu.live.com/mapcontrol/mapcontrol.ashx?v=7.0"></script>
        <script type="text/javascript">
            bmapkey = '<?php echo $bmkey ?>';
            bmapzoom = '<?php echo $bmzoom ?>';
            bmapwidth = '<?php echo $bmwidth ?>';
            bmapheight = '<?php echo $bmheight ?>';
            latitude = '<?php echo $latitude ?>';
            longitude = '<?php echo $longitude ?>';
        </script>
        <script type="text/javascript" src="<?php echo drupal_get_path('module', 'bingmaps');?>/static/js/maps7.0.js"></script>
    </head>
    <body onload="GetMap('myMap');" style="">
        
        <form onsubmit="FindAndAddPin(location.value); return false;">
            <label>地址： </label><input id="location" name="Location" type="text" /><span class="example"> 例如：北京市海淀区中关村 </span>
            <input type="submit" id="submitButton" value="定位" />
            <br />
        </form>
        <input type="text" name="bingmapsurl" id="bingmapsurl" style=" display:none"/>
        
        <div id="myMap" style="position:relative; width: <?php echo $bmwidth-25?>px; height:<?php echo $bmheight-45?>px;"></div>        
    </body>
</html>

