( function() {
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

  CKEDITOR.plugins.add( 'bingmaps',
  {
    init: function( editor )
    {

      editor.addCommand( 'bingmapsDialog', new CKEDITOR.dialogCommand( 'bingmapsDialog', { allowedContent : 'img[src,alt,width,height]'}) );

      editor.ui.addButton( 'bingmaps',
      {
        label: '必应地图',
        command: 'bingmapsDialog',
        icon: this.path + 'static/img/icon.png'
      } );
      CKEDITOR.dialog.add( 'bingmapsDialog', this.path + 'dialogs/bingmaps.js' );
    },
    
  } );
} )();
