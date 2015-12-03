/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';

import CodeMirror = require('codemirror');

import {
  Message
} from 'phosphor-messaging';

import {
  IContribution
} from 'phosphor-plugins';

import {
  ResizeMessage, Widget
} from 'phosphor-widget';

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript.js';


class CodeMirrorWidget extends Widget {

  constructor(config?: CodeMirror.EditorConfiguration) {
    super();
    this.addClass('editor-CodeMirrorWidget');
    this._editor = CodeMirror(this.node, config);
  }

  get editor(): CodeMirror.Editor {
    return this._editor;
  }

  protected onAfterAttach(msg: Message): void {
    this._editor.refresh();
  }

  protected onResize(msg: ResizeMessage): void {
    if (msg.width < 0 || msg.height < 0) {
      this._editor.refresh();
    } else {
      this._editor.setSize(msg.width, msg.height);
    }
  }

  private _editor: CodeMirror.Editor;
}


let contribProto: IContribution = {
  item: null,
  isDisposed: false,
  dispose: function() {
    this.isDisposed = true;
    this.item = null;
  },
};


let count = 0;

function createEditor(): CodeMirrorWidget {
  let widget = new CodeMirrorWidget({
    mode: 'text/typescript',
    lineNumbers: true,
    tabSize: 2,
  });
  widget.title.text = `Untitled - ${count++}`;
  return widget;
}


export
function createContent(): IContribution {
  let contrib = Object.create(contribProto);
  contrib.item = createEditor();
  return contrib;
}
