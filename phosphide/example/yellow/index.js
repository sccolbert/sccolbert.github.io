/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
var phosphor_widget_1 = require('phosphor-widget');
var contribProto = {
    item: null,
    isDisposed: false,
    dispose: function () {
        this.isDisposed = true;
        this.item = null;
    },
};
function createContent() {
    var contrib = Object.create(contribProto);
    var widget = new phosphor_widget_1.Widget();
    widget.addClass('yellow-content');
    widget.title.text = 'Yellow';
    contrib.item = widget;
    return contrib;
}
exports.createContent = createContent;
