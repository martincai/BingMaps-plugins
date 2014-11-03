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

function addbingmaps(cmd) {
    checkFocus();
    bingmapsshowEditorMenu2(cmd);
    return;
}

function bingmapsshowEditorMenu2(tag, params) {
    var sel, selection;
    var str = '', stitle = '';
    var ctrlid = editorid + (params ? '_cst' + params + '_' : '_') + tag;
    var menu = $(ctrlid + '_menu');
    var pos = [0, 0];
    var menuwidth = 270;
    var menupos = '43!';
    var menutype = 'menu';

    if (BROWSER.ie) {
        sel = wysiwyg ? editdoc.selection.createRange() : document.selection.createRange();
        pos = getCaret();
    }

    selection = sel ? (wysiwyg ? sel.htmlText : sel.text) : getSel();

    var menucontentwidth = e_bingmapsWidth + 10;
    var menucontentheight = e_bingmapsHeight + 50;

    stitle = '插入必应地图';
    str = '<p class="px" style="height:' + menucontentheight + 'px"><iframe id="' + ctrlid + '_param_1" frameborder="0" style="width:100%;height:100%;" scrolling="no" onload="this.contentWindow.document.body.style.width=\'' + menucontentwidth + 'px\';this.onload=null" src="source/plugin/msopentech_bingmaps/template/insertmap.html"></iframe></p>';
    menuwidth = e_bingmapsWidth + 70;
    menupos = '00';
    menutype = 'win';

    var menu = document.createElement('div');
    menu.id = ctrlid + '_menu';
    menu.style.display = 'none';
    menu.className = 'p_pof upf';
    menu.style.width = menuwidth + 'px';
    if (menupos == '00') {
        menu.className = 'fwinmask';
        s = '<table width="100%" cellpadding="0" cellspacing="0" class="fwin"><tr><td class="t_l"></td><td class="t_c"></td><td class="t_r"></td></tr><tr><td class="m_l">&nbsp;&nbsp;</td><td class="m_c">'
                + '<h3 class="flb"><em>' + stitle + '</em><span><a onclick="hideMenu(\'\', \'win\');return false;" class="flbc" href="javascript:;">关闭</a></span></h3><div class="c">' + str + '</div>'
                + '<p class="o pns"><button type="submit" id="' + ctrlid + '_submit" class="pn pnc"><strong>提交</strong></button></p>'
                + '</td><td class="m_r"></td></tr><tr><td class="b_l"></td><td class="b_c"></td><td class="b_r"></td></tr></table>';
    } else {
        s = '<div class="p_opt cl"><span class="y" style="margin:-10px -10px 0 0"><a onclick="hideMenu();return false;" class="flbc" href="javascript:;">关闭</a></span><div>' + str + '</div><div class="pns mtn"><button type="submit" id="' + ctrlid + '_submit" class="pn pnc"><strong>提交</strong></button></div></div>';
    }
    menu.innerHTML = s;
    $(editorid + '_editortoolbar').appendChild(menu);
    showMenu({'ctrlid': ctrlid, 'mtype': menutype, 'evt': 'click', 'duration': 3, 'cache': 0, 'drag': 1, 'pos': menupos});

    try {
        if ($(ctrlid + '_param_1')) {
            $(ctrlid + '_param_1').focus();
        }
    } catch (e) {
    }
    var objs = menu.getElementsByTagName('*');
    for (var i = 0; i < objs.length; i++) {
        _attachEvent(objs[i], 'keydown', function(e) {
            e = e ? e : event;
            obj = BROWSER.ie ? event.srcElement : e.target;
            if ((obj.type == 'text' && e.keyCode == 13) || (obj.type == 'textarea' && e.ctrlKey && e.keyCode == 13)) {
                if ($(ctrlid + '_submit') && tag != 'image')
                    $(ctrlid + '_submit').click();
                doane(e);
            } else if (e.keyCode == 27) {
                hideMenu();
                doane(e);
            }
        });
    }
    
    if ($(ctrlid + '_submit')) {
        $(ctrlid + '_submit').onclick = function() {
            checkFocus();
            if (BROWSER.ie && wysiwyg) {
                setCaret(pos[0]);
            }

            var mapsrc = document.getElementById(ctrlid + '_param_1').contentWindow.document.getElementById("bingmapsurl").value;
            var location = document.getElementById(ctrlid + '_param_1').contentWindow.document.getElementById("location").value;
            if (location == null || location.length == 0) {
                alert('请输入地址');
            }
            if (mapsrc) {
                var vmapsrc = "http://dev.ditu.live.com/REST/v1/Imagery/Map/Road/" + mapsrc;console.log(vmapsrc);
                var strimg1 = '<img src="' + vmapsrc + '" border=0 />';
                if (wysiwyg) {
                    insertText(strimg1, strimg1.length, 0, false, sel);
                }
            }

            hideMenu('', 'win');
            hideMenu();
        };
    }
}