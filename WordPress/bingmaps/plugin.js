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

( function() {
  CKEDITOR.plugins.add( 'bingmaps',
  {
    init: function( editor )
    {
      CKEDITOR.dialog.add( 'BingMapsDialog', function( editor ) {
        return {
            title: '插入必应地图',
            minWidth: 600,
            minHeight: 300,
            onOk: function()
            {
                var editor = this.getParentEditor();
                var mapsrc = document.getElementById('bingmapshtml_param_1').contentWindow.document.getElementById("bingmapsurl").value;
                var location = document.getElementById('bingmapshtml_param_1').contentWindow.document.getElementById("location").value;
                if (location == null || location.length == 0) {
                    alert('请输入地址');
                }
                if (mapsrc) {
                    var vmapsrc = "http://dev.ditu.live.com/REST/v1/Imagery/Map/Road/" + mapsrc;
                    var strimg1 = '<img src="' + vmapsrc + '" border=0 />';
                    editor.insertHtml(strimg1);
                }
            },
            contents: [
                {
                    id: 'tab-basic',
                    label: 'bingmaps',
                    elements: [
                        {
                            type: 'html',
                            id: 'bingmapshtml',
                            html: "<iframe id=\"bingmapshtml_param_1\" frameborder=\"0\" style=\"width:625px;height:455px;\" scrolling=\"no\" onload=\"this.contentWindow.document.body.style.width=\'600px\';this.onload=null\" src=\"http://" + document.domain + "/wp-content/plugins/ckeditor-for-wordpress/plugins/bingmaps/static/template/insertmap.html\"></iframe>",
                        },
                    ]
                },
            ],
        };
      });

      editor.addCommand( 'BingMaps', new CKEDITOR.dialogCommand( 'BingMapsDialog' ) );

      editor.ui.addButton( 'BingMaps',
      {
        label: '必应地图',
        command: 'BingMaps',
        icon: this.path + 'static/img/icon.png',
        toolbar: 'wordpress,100'
      } );
    },
  } );
  
} )();
