/*
  THIS FILE WAS AUTOGENERATED BY mode.tmpl.js
*/

"use strict";

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var AssemblyX86HighlightRules = require("./assembly_x86_highlight_rules").AssemblyX86HighlightRules;
var FoldMode = require("./folding/coffee").FoldMode;

var Mode = function() {
    this.HighlightRules = AssemblyX86HighlightRules;
    this.foldingRules = new FoldMode();
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {
    this.lineCommentStart = [";"];
    this.$id = "ace/mode/assembly_x86";
}).call(Mode.prototype);

exports.Mode = Mode;
