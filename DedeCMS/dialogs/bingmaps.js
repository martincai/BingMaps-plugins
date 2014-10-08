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
 
(function()
{
    var bingmapsDialog = function(editor, dialogType)
    {
        return {
            title: '插入必应地图',
            minWidth: 600,
            minHeight: 300,
            onOk: function()
            {
                var mapsrc = document.getElementById('bingmapshtml_param_1').contentWindow.document.getElementById("bingmapsurl").value;
                var vmapsrc = "http://dev.ditu.live.com/REST/v1/Imagery/Map/Road/" + mapsrc;
                var strimg1 = '<img src=' + vmapsrc + ' border=0 />';            
                editor.insertHtml(strimg1);
            },
            contents: [
                {
                    id: 'tab-basic',
                    label: 'bingmaps',
                    elements: [
                        {
                            type: 'html',
                            id: 'bingmapshtml',
                            html: "<iframe id=\"bingmapshtml_param_1\" frameborder=\"0\" style=\"width:625px;height:455px;\" scrolling=\"no\" onload=\"this.contentWindow.document.body.style.width=\'600px\';this.onload=null\" src=\"http://" + document.domain + "/include/ckeditor/plugins/bingmaps/static/template/insertmap.html\"></iframe>",
                        },
                    ]
                },
            ],
        };
    };

    CKEDITOR.dialog.add('bingmaps', function(editor)
    {
        return bingmapsDialog(editor, 'bingmaps');
    });
})();
