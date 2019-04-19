(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["components-create-did-create-did-module-ngfactory"],{

/***/ "./node_modules/angular-highlight-js/dist/esm/src/highlightJs.directive.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/angular-highlight-js/dist/esm/src/highlightJs.directive.js ***!
  \*********************************************************************************/
/*! exports provided: HighlightJsDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HighlightJsDirective", function() { return HighlightJsDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _highlightJs_token__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./highlightJs.token */ "./node_modules/angular-highlight-js/dist/esm/src/highlightJs.token.js");


var HighlightJsDirective = (function () {
    function HighlightJsDirective(hljs) {
        this.hljs = hljs;
    } //tslint:disable-line
    HighlightJsDirective.prototype.ngOnChanges = function (changes) {
        if ((changes['source'] || changes['language']) && this.language && this.source) {
            this.highlightedCode = this.hljs.highlight(this.language, this.source).value;
        }
    };
    HighlightJsDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{
                    selector: '[mwlHighlightJs]',
                    host: {
                        '[innerHTML]': 'highlightedCode'
                    }
                },] },
    ];
    /** @nocollapse */
    HighlightJsDirective.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: [_highlightJs_token__WEBPACK_IMPORTED_MODULE_1__["HIGHLIGHT_JS"],] },] },
    ]; };
    HighlightJsDirective.propDecorators = {
        'source': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        'language': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    };
    return HighlightJsDirective;
}());

//# sourceMappingURL=highlightJs.directive.js.map

/***/ }),

/***/ "./node_modules/angular-highlight-js/dist/esm/src/highlightJs.module.js":
/*!******************************************************************************!*\
  !*** ./node_modules/angular-highlight-js/dist/esm/src/highlightJs.module.js ***!
  \******************************************************************************/
/*! exports provided: HighlightJsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HighlightJsModule", function() { return HighlightJsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _highlightJs_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./highlightJs.directive */ "./node_modules/angular-highlight-js/dist/esm/src/highlightJs.directive.js");


var HighlightJsModule = (function () {
    function HighlightJsModule() {
    }
    HighlightJsModule.forRoot = function (hljs) {
        return {
            ngModule: HighlightJsModule,
            providers: [hljs]
        };
    };
    HighlightJsModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                    declarations: [_highlightJs_directive__WEBPACK_IMPORTED_MODULE_1__["HighlightJsDirective"]],
                    exports: [_highlightJs_directive__WEBPACK_IMPORTED_MODULE_1__["HighlightJsDirective"]]
                },] },
    ];
    /** @nocollapse */
    HighlightJsModule.ctorParameters = function () { return []; };
    return HighlightJsModule;
}());

//# sourceMappingURL=highlightJs.module.js.map

/***/ }),

/***/ "./node_modules/angular-highlight-js/dist/esm/src/highlightJs.token.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/angular-highlight-js/dist/esm/src/highlightJs.token.js ***!
  \*****************************************************************************/
/*! exports provided: HIGHLIGHT_JS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HIGHLIGHT_JS", function() { return HIGHLIGHT_JS; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");

var HIGHLIGHT_JS = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('highlight.js');
//# sourceMappingURL=highlightJs.token.js.map

/***/ }),

/***/ "./node_modules/highlight.js/lib/highlight.js":
/*!****************************************************!*\
  !*** ./node_modules/highlight.js/lib/highlight.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
Syntax highlighting with language autodetection.
https://highlightjs.org/
*/

(function(factory) {

  // Find the global object for export to both the browser and web workers.
  var globalObject = typeof window === 'object' && window ||
                     typeof self === 'object' && self;

  // Setup highlight.js for different environments. First is Node.js or
  // CommonJS.
  if(true) {
    factory(exports);
  } else {}

}(function(hljs) {
  // Convenience variables for build-in objects
  var ArrayProto = [],
      objectKeys = Object.keys;

  // Global internal variables used within the highlight.js library.
  var languages = {},
      aliases   = {};

  // Regular expressions used throughout the highlight.js library.
  var noHighlightRe    = /^(no-?highlight|plain|text)$/i,
      languagePrefixRe = /\blang(?:uage)?-([\w-]+)\b/i,
      fixMarkupRe      = /((^(<[^>]+>|\t|)+|(?:\n)))/gm;

  // The object will be assigned by the build tool. It used to synchronize API 
  // of external language files with minified version of the highlight.js library.
  var API_REPLACES;

  var spanEndTag = '</span>';

  // Global options used when within external APIs. This is modified when
  // calling the `hljs.configure` function.
  var options = {
    classPrefix: 'hljs-',
    tabReplace: null,
    useBR: false,
    languages: undefined
  };


  /* Utility functions */

  function escape(value) {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function tag(node) {
    return node.nodeName.toLowerCase();
  }

  function testRe(re, lexeme) {
    var match = re && re.exec(lexeme);
    return match && match.index === 0;
  }

  function isNotHighlighted(language) {
    return noHighlightRe.test(language);
  }

  function blockLanguage(block) {
    var i, match, length, _class;
    var classes = block.className + ' ';

    classes += block.parentNode ? block.parentNode.className : '';

    // language-* takes precedence over non-prefixed class names.
    match = languagePrefixRe.exec(classes);
    if (match) {
      return getLanguage(match[1]) ? match[1] : 'no-highlight';
    }

    classes = classes.split(/\s+/);

    for (i = 0, length = classes.length; i < length; i++) {
      _class = classes[i];

      if (isNotHighlighted(_class) || getLanguage(_class)) {
        return _class;
      }
    }
  }

  function inherit(parent) {  // inherit(parent, override_obj, override_obj, ...)
    var key;
    var result = {};
    var objects = Array.prototype.slice.call(arguments, 1);

    for (key in parent)
      result[key] = parent[key];
    objects.forEach(function(obj) {
      for (key in obj)
        result[key] = obj[key];
    });
    return result;
  }

  /* Stream merging */

  function nodeStream(node) {
    var result = [];
    (function _nodeStream(node, offset) {
      for (var child = node.firstChild; child; child = child.nextSibling) {
        if (child.nodeType === 3)
          offset += child.nodeValue.length;
        else if (child.nodeType === 1) {
          result.push({
            event: 'start',
            offset: offset,
            node: child
          });
          offset = _nodeStream(child, offset);
          // Prevent void elements from having an end tag that would actually
          // double them in the output. There are more void elements in HTML
          // but we list only those realistically expected in code display.
          if (!tag(child).match(/br|hr|img|input/)) {
            result.push({
              event: 'stop',
              offset: offset,
              node: child
            });
          }
        }
      }
      return offset;
    })(node, 0);
    return result;
  }

  function mergeStreams(original, highlighted, value) {
    var processed = 0;
    var result = '';
    var nodeStack = [];

    function selectStream() {
      if (!original.length || !highlighted.length) {
        return original.length ? original : highlighted;
      }
      if (original[0].offset !== highlighted[0].offset) {
        return (original[0].offset < highlighted[0].offset) ? original : highlighted;
      }

      /*
      To avoid starting the stream just before it should stop the order is
      ensured that original always starts first and closes last:

      if (event1 == 'start' && event2 == 'start')
        return original;
      if (event1 == 'start' && event2 == 'stop')
        return highlighted;
      if (event1 == 'stop' && event2 == 'start')
        return original;
      if (event1 == 'stop' && event2 == 'stop')
        return highlighted;

      ... which is collapsed to:
      */
      return highlighted[0].event === 'start' ? original : highlighted;
    }

    function open(node) {
      function attr_str(a) {return ' ' + a.nodeName + '="' + escape(a.value).replace('"', '&quot;') + '"';}
      result += '<' + tag(node) + ArrayProto.map.call(node.attributes, attr_str).join('') + '>';
    }

    function close(node) {
      result += '</' + tag(node) + '>';
    }

    function render(event) {
      (event.event === 'start' ? open : close)(event.node);
    }

    while (original.length || highlighted.length) {
      var stream = selectStream();
      result += escape(value.substring(processed, stream[0].offset));
      processed = stream[0].offset;
      if (stream === original) {
        /*
        On any opening or closing tag of the original markup we first close
        the entire highlighted node stack, then render the original tag along
        with all the following original tags at the same offset and then
        reopen all the tags on the highlighted stack.
        */
        nodeStack.reverse().forEach(close);
        do {
          render(stream.splice(0, 1)[0]);
          stream = selectStream();
        } while (stream === original && stream.length && stream[0].offset === processed);
        nodeStack.reverse().forEach(open);
      } else {
        if (stream[0].event === 'start') {
          nodeStack.push(stream[0].node);
        } else {
          nodeStack.pop();
        }
        render(stream.splice(0, 1)[0]);
      }
    }
    return result + escape(value.substr(processed));
  }

  /* Initialization */

  function expand_mode(mode) {
    if (mode.variants && !mode.cached_variants) {
      mode.cached_variants = mode.variants.map(function(variant) {
        return inherit(mode, {variants: null}, variant);
      });
    }
    return mode.cached_variants || (mode.endsWithParent && [inherit(mode)]) || [mode];
  }

  function restoreLanguageApi(obj) {
    if(API_REPLACES && !obj.langApiRestored) {
      obj.langApiRestored = true;
      for(var key in API_REPLACES)
        obj[key] && (obj[API_REPLACES[key]] = obj[key]);
      (obj.contains || []).concat(obj.variants || []).forEach(restoreLanguageApi);
    }
  }

  function compileLanguage(language) {

    function reStr(re) {
        return (re && re.source) || re;
    }

    function langRe(value, global) {
      return new RegExp(
        reStr(value),
        'm' + (language.case_insensitive ? 'i' : '') + (global ? 'g' : '')
      );
    }

    // joinRe logically computes regexps.join(separator), but fixes the
    // backreferences so they continue to match.
    function joinRe(regexps, separator) {
      // backreferenceRe matches an open parenthesis or backreference. To avoid
      // an incorrect parse, it additionally matches the following:
      // - [...] elements, where the meaning of parentheses and escapes change
      // - other escape sequences, so we do not misparse escape sequences as
      //   interesting elements
      // - non-matching or lookahead parentheses, which do not capture. These
      //   follow the '(' with a '?'.
      var backreferenceRe = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
      var numCaptures = 0;
      var ret = '';
      for (var i = 0; i < regexps.length; i++) {
        var offset = numCaptures;
        var re = reStr(regexps[i]);
        if (i > 0) {
          ret += separator;
        }
        while (re.length > 0) {
          var match = backreferenceRe.exec(re);
          if (match == null) {
            ret += re;
            break;
          }
          ret += re.substring(0, match.index);
          re = re.substring(match.index + match[0].length);
          if (match[0][0] == '\\' && match[1]) {
            // Adjust the backreference.
            ret += '\\' + String(Number(match[1]) + offset);
          } else {
            ret += match[0];
            if (match[0] == '(') {
              numCaptures++;
            }
          }
        }
      }
      return ret;
    }

    function compileMode(mode, parent) {
      if (mode.compiled)
        return;
      mode.compiled = true;

      mode.keywords = mode.keywords || mode.beginKeywords;
      if (mode.keywords) {
        var compiled_keywords = {};

        var flatten = function(className, str) {
          if (language.case_insensitive) {
            str = str.toLowerCase();
          }
          str.split(' ').forEach(function(kw) {
            var pair = kw.split('|');
            compiled_keywords[pair[0]] = [className, pair[1] ? Number(pair[1]) : 1];
          });
        };

        if (typeof mode.keywords === 'string') { // string
          flatten('keyword', mode.keywords);
        } else {
          objectKeys(mode.keywords).forEach(function (className) {
            flatten(className, mode.keywords[className]);
          });
        }
        mode.keywords = compiled_keywords;
      }
      mode.lexemesRe = langRe(mode.lexemes || /\w+/, true);

      if (parent) {
        if (mode.beginKeywords) {
          mode.begin = '\\b(' + mode.beginKeywords.split(' ').join('|') + ')\\b';
        }
        if (!mode.begin)
          mode.begin = /\B|\b/;
        mode.beginRe = langRe(mode.begin);
        if (mode.endSameAsBegin)
          mode.end = mode.begin;
        if (!mode.end && !mode.endsWithParent)
          mode.end = /\B|\b/;
        if (mode.end)
          mode.endRe = langRe(mode.end);
        mode.terminator_end = reStr(mode.end) || '';
        if (mode.endsWithParent && parent.terminator_end)
          mode.terminator_end += (mode.end ? '|' : '') + parent.terminator_end;
      }
      if (mode.illegal)
        mode.illegalRe = langRe(mode.illegal);
      if (mode.relevance == null)
        mode.relevance = 1;
      if (!mode.contains) {
        mode.contains = [];
      }
      mode.contains = Array.prototype.concat.apply([], mode.contains.map(function(c) {
        return expand_mode(c === 'self' ? mode : c);
      }));
      mode.contains.forEach(function(c) {compileMode(c, mode);});

      if (mode.starts) {
        compileMode(mode.starts, parent);
      }

      var terminators =
        mode.contains.map(function(c) {
          return c.beginKeywords ? '\\.?(?:' + c.begin + ')\\.?' : c.begin;
        })
        .concat([mode.terminator_end, mode.illegal])
        .map(reStr)
        .filter(Boolean);
      mode.terminators = terminators.length ? langRe(joinRe(terminators, '|'), true) : {exec: function(/*s*/) {return null;}};
    }
    
    compileMode(language);
  }

  /*
  Core highlighting function. Accepts a language name, or an alias, and a
  string with the code to highlight. Returns an object with the following
  properties:

  - relevance (int)
  - value (an HTML string with highlighting markup)

  */
  function highlight(name, value, ignore_illegals, continuation) {

    function escapeRe(value) {
      return new RegExp(value.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'm');
    }

    function subMode(lexeme, mode) {
      var i, length;

      for (i = 0, length = mode.contains.length; i < length; i++) {
        if (testRe(mode.contains[i].beginRe, lexeme)) {
          if (mode.contains[i].endSameAsBegin) {
            mode.contains[i].endRe = escapeRe( mode.contains[i].beginRe.exec(lexeme)[0] );
          }
          return mode.contains[i];
        }
      }
    }

    function endOfMode(mode, lexeme) {
      if (testRe(mode.endRe, lexeme)) {
        while (mode.endsParent && mode.parent) {
          mode = mode.parent;
        }
        return mode;
      }
      if (mode.endsWithParent) {
        return endOfMode(mode.parent, lexeme);
      }
    }

    function isIllegal(lexeme, mode) {
      return !ignore_illegals && testRe(mode.illegalRe, lexeme);
    }

    function keywordMatch(mode, match) {
      var match_str = language.case_insensitive ? match[0].toLowerCase() : match[0];
      return mode.keywords.hasOwnProperty(match_str) && mode.keywords[match_str];
    }

    function buildSpan(classname, insideSpan, leaveOpen, noPrefix) {
      var classPrefix = noPrefix ? '' : options.classPrefix,
          openSpan    = '<span class="' + classPrefix,
          closeSpan   = leaveOpen ? '' : spanEndTag;

      openSpan += classname + '">';

      return openSpan + insideSpan + closeSpan;
    }

    function processKeywords() {
      var keyword_match, last_index, match, result;

      if (!top.keywords)
        return escape(mode_buffer);

      result = '';
      last_index = 0;
      top.lexemesRe.lastIndex = 0;
      match = top.lexemesRe.exec(mode_buffer);

      while (match) {
        result += escape(mode_buffer.substring(last_index, match.index));
        keyword_match = keywordMatch(top, match);
        if (keyword_match) {
          relevance += keyword_match[1];
          result += buildSpan(keyword_match[0], escape(match[0]));
        } else {
          result += escape(match[0]);
        }
        last_index = top.lexemesRe.lastIndex;
        match = top.lexemesRe.exec(mode_buffer);
      }
      return result + escape(mode_buffer.substr(last_index));
    }

    function processSubLanguage() {
      var explicit = typeof top.subLanguage === 'string';
      if (explicit && !languages[top.subLanguage]) {
        return escape(mode_buffer);
      }

      var result = explicit ?
                   highlight(top.subLanguage, mode_buffer, true, continuations[top.subLanguage]) :
                   highlightAuto(mode_buffer, top.subLanguage.length ? top.subLanguage : undefined);

      // Counting embedded language score towards the host language may be disabled
      // with zeroing the containing mode relevance. Usecase in point is Markdown that
      // allows XML everywhere and makes every XML snippet to have a much larger Markdown
      // score.
      if (top.relevance > 0) {
        relevance += result.relevance;
      }
      if (explicit) {
        continuations[top.subLanguage] = result.top;
      }
      return buildSpan(result.language, result.value, false, true);
    }

    function processBuffer() {
      result += (top.subLanguage != null ? processSubLanguage() : processKeywords());
      mode_buffer = '';
    }

    function startNewMode(mode) {
      result += mode.className? buildSpan(mode.className, '', true): '';
      top = Object.create(mode, {parent: {value: top}});
    }

    function processLexeme(buffer, lexeme) {

      mode_buffer += buffer;

      if (lexeme == null) {
        processBuffer();
        return 0;
      }

      var new_mode = subMode(lexeme, top);
      if (new_mode) {
        if (new_mode.skip) {
          mode_buffer += lexeme;
        } else {
          if (new_mode.excludeBegin) {
            mode_buffer += lexeme;
          }
          processBuffer();
          if (!new_mode.returnBegin && !new_mode.excludeBegin) {
            mode_buffer = lexeme;
          }
        }
        startNewMode(new_mode, lexeme);
        return new_mode.returnBegin ? 0 : lexeme.length;
      }

      var end_mode = endOfMode(top, lexeme);
      if (end_mode) {
        var origin = top;
        if (origin.skip) {
          mode_buffer += lexeme;
        } else {
          if (!(origin.returnEnd || origin.excludeEnd)) {
            mode_buffer += lexeme;
          }
          processBuffer();
          if (origin.excludeEnd) {
            mode_buffer = lexeme;
          }
        }
        do {
          if (top.className) {
            result += spanEndTag;
          }
          if (!top.skip && !top.subLanguage) {
            relevance += top.relevance;
          }
          top = top.parent;
        } while (top !== end_mode.parent);
        if (end_mode.starts) {
          if (end_mode.endSameAsBegin) {
            end_mode.starts.endRe = end_mode.endRe;
          }
          startNewMode(end_mode.starts, '');
        }
        return origin.returnEnd ? 0 : lexeme.length;
      }

      if (isIllegal(lexeme, top))
        throw new Error('Illegal lexeme "' + lexeme + '" for mode "' + (top.className || '<unnamed>') + '"');

      /*
      Parser should not reach this point as all types of lexemes should be caught
      earlier, but if it does due to some bug make sure it advances at least one
      character forward to prevent infinite looping.
      */
      mode_buffer += lexeme;
      return lexeme.length || 1;
    }

    var language = getLanguage(name);
    if (!language) {
      throw new Error('Unknown language: "' + name + '"');
    }

    compileLanguage(language);
    var top = continuation || language;
    var continuations = {}; // keep continuations for sub-languages
    var result = '', current;
    for(current = top; current !== language; current = current.parent) {
      if (current.className) {
        result = buildSpan(current.className, '', true) + result;
      }
    }
    var mode_buffer = '';
    var relevance = 0;
    try {
      var match, count, index = 0;
      while (true) {
        top.terminators.lastIndex = index;
        match = top.terminators.exec(value);
        if (!match)
          break;
        count = processLexeme(value.substring(index, match.index), match[0]);
        index = match.index + count;
      }
      processLexeme(value.substr(index));
      for(current = top; current.parent; current = current.parent) { // close dangling modes
        if (current.className) {
          result += spanEndTag;
        }
      }
      return {
        relevance: relevance,
        value: result,
        language: name,
        top: top
      };
    } catch (e) {
      if (e.message && e.message.indexOf('Illegal') !== -1) {
        return {
          relevance: 0,
          value: escape(value)
        };
      } else {
        throw e;
      }
    }
  }

  /*
  Highlighting with language detection. Accepts a string with the code to
  highlight. Returns an object with the following properties:

  - language (detected language)
  - relevance (int)
  - value (an HTML string with highlighting markup)
  - second_best (object with the same structure for second-best heuristically
    detected language, may be absent)

  */
  function highlightAuto(text, languageSubset) {
    languageSubset = languageSubset || options.languages || objectKeys(languages);
    var result = {
      relevance: 0,
      value: escape(text)
    };
    var second_best = result;
    languageSubset.filter(getLanguage).filter(autoDetection).forEach(function(name) {
      var current = highlight(name, text, false);
      current.language = name;
      if (current.relevance > second_best.relevance) {
        second_best = current;
      }
      if (current.relevance > result.relevance) {
        second_best = result;
        result = current;
      }
    });
    if (second_best.language) {
      result.second_best = second_best;
    }
    return result;
  }

  /*
  Post-processing of the highlighted markup:

  - replace TABs with something more useful
  - replace real line-breaks with '<br>' for non-pre containers

  */
  function fixMarkup(value) {
    return !(options.tabReplace || options.useBR)
      ? value
      : value.replace(fixMarkupRe, function(match, p1) {
          if (options.useBR && match === '\n') {
            return '<br>';
          } else if (options.tabReplace) {
            return p1.replace(/\t/g, options.tabReplace);
          }
          return '';
      });
  }

  function buildClassName(prevClassName, currentLang, resultLang) {
    var language = currentLang ? aliases[currentLang] : resultLang,
        result   = [prevClassName.trim()];

    if (!prevClassName.match(/\bhljs\b/)) {
      result.push('hljs');
    }

    if (prevClassName.indexOf(language) === -1) {
      result.push(language);
    }

    return result.join(' ').trim();
  }

  /*
  Applies highlighting to a DOM node containing code. Accepts a DOM node and
  two optional parameters for fixMarkup.
  */
  function highlightBlock(block) {
    var node, originalStream, result, resultNode, text;
    var language = blockLanguage(block);

    if (isNotHighlighted(language))
        return;

    if (options.useBR) {
      node = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
      node.innerHTML = block.innerHTML.replace(/\n/g, '').replace(/<br[ \/]*>/g, '\n');
    } else {
      node = block;
    }
    text = node.textContent;
    result = language ? highlight(language, text, true) : highlightAuto(text);

    originalStream = nodeStream(node);
    if (originalStream.length) {
      resultNode = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
      resultNode.innerHTML = result.value;
      result.value = mergeStreams(originalStream, nodeStream(resultNode), text);
    }
    result.value = fixMarkup(result.value);

    block.innerHTML = result.value;
    block.className = buildClassName(block.className, language, result.language);
    block.result = {
      language: result.language,
      re: result.relevance
    };
    if (result.second_best) {
      block.second_best = {
        language: result.second_best.language,
        re: result.second_best.relevance
      };
    }
  }

  /*
  Updates highlight.js global options with values passed in the form of an object.
  */
  function configure(user_options) {
    options = inherit(options, user_options);
  }

  /*
  Applies highlighting to all <pre><code>..</code></pre> blocks on a page.
  */
  function initHighlighting() {
    if (initHighlighting.called)
      return;
    initHighlighting.called = true;

    var blocks = document.querySelectorAll('pre code');
    ArrayProto.forEach.call(blocks, highlightBlock);
  }

  /*
  Attaches highlighting to the page load event.
  */
  function initHighlightingOnLoad() {
    addEventListener('DOMContentLoaded', initHighlighting, false);
    addEventListener('load', initHighlighting, false);
  }

  function registerLanguage(name, language) {
    var lang = languages[name] = language(hljs);
    restoreLanguageApi(lang);
    if (lang.aliases) {
      lang.aliases.forEach(function(alias) {aliases[alias] = name;});
    }
  }

  function listLanguages() {
    return objectKeys(languages);
  }

  function getLanguage(name) {
    name = (name || '').toLowerCase();
    return languages[name] || languages[aliases[name]];
  }

  function autoDetection(name) {
    var lang = getLanguage(name);
    return lang && !lang.disableAutodetect;
  }

  /* Interface definition */

  hljs.highlight = highlight;
  hljs.highlightAuto = highlightAuto;
  hljs.fixMarkup = fixMarkup;
  hljs.highlightBlock = highlightBlock;
  hljs.configure = configure;
  hljs.initHighlighting = initHighlighting;
  hljs.initHighlightingOnLoad = initHighlightingOnLoad;
  hljs.registerLanguage = registerLanguage;
  hljs.listLanguages = listLanguages;
  hljs.getLanguage = getLanguage;
  hljs.autoDetection = autoDetection;
  hljs.inherit = inherit;

  // Common regexps
  hljs.IDENT_RE = '[a-zA-Z]\\w*';
  hljs.UNDERSCORE_IDENT_RE = '[a-zA-Z_]\\w*';
  hljs.NUMBER_RE = '\\b\\d+(\\.\\d+)?';
  hljs.C_NUMBER_RE = '(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)'; // 0x..., 0..., decimal, float
  hljs.BINARY_NUMBER_RE = '\\b(0b[01]+)'; // 0b...
  hljs.RE_STARTERS_RE = '!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~';

  // Common modes
  hljs.BACKSLASH_ESCAPE = {
    begin: '\\\\[\\s\\S]', relevance: 0
  };
  hljs.APOS_STRING_MODE = {
    className: 'string',
    begin: '\'', end: '\'',
    illegal: '\\n',
    contains: [hljs.BACKSLASH_ESCAPE]
  };
  hljs.QUOTE_STRING_MODE = {
    className: 'string',
    begin: '"', end: '"',
    illegal: '\\n',
    contains: [hljs.BACKSLASH_ESCAPE]
  };
  hljs.PHRASAL_WORDS_MODE = {
    begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
  };
  hljs.COMMENT = function (begin, end, inherits) {
    var mode = hljs.inherit(
      {
        className: 'comment',
        begin: begin, end: end,
        contains: []
      },
      inherits || {}
    );
    mode.contains.push(hljs.PHRASAL_WORDS_MODE);
    mode.contains.push({
      className: 'doctag',
      begin: '(?:TODO|FIXME|NOTE|BUG|XXX):',
      relevance: 0
    });
    return mode;
  };
  hljs.C_LINE_COMMENT_MODE = hljs.COMMENT('//', '$');
  hljs.C_BLOCK_COMMENT_MODE = hljs.COMMENT('/\\*', '\\*/');
  hljs.HASH_COMMENT_MODE = hljs.COMMENT('#', '$');
  hljs.NUMBER_MODE = {
    className: 'number',
    begin: hljs.NUMBER_RE,
    relevance: 0
  };
  hljs.C_NUMBER_MODE = {
    className: 'number',
    begin: hljs.C_NUMBER_RE,
    relevance: 0
  };
  hljs.BINARY_NUMBER_MODE = {
    className: 'number',
    begin: hljs.BINARY_NUMBER_RE,
    relevance: 0
  };
  hljs.CSS_NUMBER_MODE = {
    className: 'number',
    begin: hljs.NUMBER_RE + '(' +
      '%|em|ex|ch|rem'  +
      '|vw|vh|vmin|vmax' +
      '|cm|mm|in|pt|pc|px' +
      '|deg|grad|rad|turn' +
      '|s|ms' +
      '|Hz|kHz' +
      '|dpi|dpcm|dppx' +
      ')?',
    relevance: 0
  };
  hljs.REGEXP_MODE = {
    className: 'regexp',
    begin: /\//, end: /\/[gimuy]*/,
    illegal: /\n/,
    contains: [
      hljs.BACKSLASH_ESCAPE,
      {
        begin: /\[/, end: /\]/,
        relevance: 0,
        contains: [hljs.BACKSLASH_ESCAPE]
      }
    ]
  };
  hljs.TITLE_MODE = {
    className: 'title',
    begin: hljs.IDENT_RE,
    relevance: 0
  };
  hljs.UNDERSCORE_TITLE_MODE = {
    className: 'title',
    begin: hljs.UNDERSCORE_IDENT_RE,
    relevance: 0
  };
  hljs.METHOD_GUARD = {
    // excludes method names from keyword processing
    begin: '\\.\\s*' + hljs.UNDERSCORE_IDENT_RE,
    relevance: 0
  };

  return hljs;
}));


/***/ }),

/***/ "./node_modules/highlight.js/lib/languages/json.js":
/*!*********************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/json.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(hljs) {
  var LITERALS = {literal: 'true false null'};
  var TYPES = [
    hljs.QUOTE_STRING_MODE,
    hljs.C_NUMBER_MODE
  ];
  var VALUE_CONTAINER = {
    end: ',', endsWithParent: true, excludeEnd: true,
    contains: TYPES,
    keywords: LITERALS
  };
  var OBJECT = {
    begin: '{', end: '}',
    contains: [
      {
        className: 'attr',
        begin: /"/, end: /"/,
        contains: [hljs.BACKSLASH_ESCAPE],
        illegal: '\\n',
      },
      hljs.inherit(VALUE_CONTAINER, {begin: /:/})
    ],
    illegal: '\\S'
  };
  var ARRAY = {
    begin: '\\[', end: '\\]',
    contains: [hljs.inherit(VALUE_CONTAINER)], // inherit is a workaround for a bug that makes shared modes with endsWithParent compile only the ending of one of the parents
    illegal: '\\S'
  };
  TYPES.splice(TYPES.length, 0, OBJECT, ARRAY);
  return {
    contains: TYPES,
    keywords: LITERALS,
    illegal: '\\S'
  };
};

/***/ }),

/***/ "./src/app/components/create-did/authentication-keys/authentication-keys.component.ngfactory.js":
/*!******************************************************************************************************!*\
  !*** ./src/app/components/create-did/authentication-keys/authentication-keys.component.ngfactory.js ***!
  \******************************************************************************************************/
/*! exports provided: RenderType_AuthenticationKeysComponent, View_AuthenticationKeysComponent_0, View_AuthenticationKeysComponent_Host_0, AuthenticationKeysComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_AuthenticationKeysComponent", function() { return RenderType_AuthenticationKeysComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_AuthenticationKeysComponent_0", function() { return View_AuthenticationKeysComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_AuthenticationKeysComponent_Host_0", function() { return View_AuthenticationKeysComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthenticationKeysComponentNgFactory", function() { return AuthenticationKeysComponentNgFactory; });
/* harmony import */ var _authentication_keys_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./authentication-keys.component.scss.shim.ngstyle */ "./src/app/components/create-did/authentication-keys/authentication-keys.component.scss.shim.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _node_modules_angular_bootstrap_md_angular_bootstrap_md_ngfactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/angular-bootstrap-md/angular-bootstrap-md.ngfactory */ "./node_modules/angular-bootstrap-md/angular-bootstrap-md.ngfactory.js");
/* harmony import */ var angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular-bootstrap-md */ "./node_modules/angular-bootstrap-md/fesm5/angular-bootstrap-md.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _authentication_keys_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./authentication-keys.component */ "./src/app/components/create-did/authentication-keys/authentication-keys.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var _core_services_keys_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../core/services/keys.service */ "./src/app/core/services/keys.service.ts");
/* harmony import */ var _core_services_did_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../core/services/did.service */ "./src/app/core/services/did.service.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 












var styles_AuthenticationKeysComponent = [_authentication_keys_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_AuthenticationKeysComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 0, styles: styles_AuthenticationKeysComponent, data: {} });

function View_AuthenticationKeysComponent_1(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 23, "fieldset", [["class", "collapsible collapsed mb-5"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 4, "legend", [], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 7).toggle();
        var pd_0 = (_co.toggleKey(_v.context.$implicit.keyModel) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](2, null, [" ", " "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, null, null, 0, "i", [], [[8, "className", 0]], null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](4, 0, null, null, 1, "button", [["class", "btn btn-sm btn-danger pull-right"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.removeKey(_v.context.$implicit.keyModel) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](5, 0, null, null, 0, "span", [["class", "glyphicon glyphicon-remove"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](6, 0, null, null, 17, "div", [["mdbCollapse", ""]], [[40, "@expandBody", 0], [4, "overflow", null]], [["component", "@expandBody.done"]], function (_v, en, $event) { var ad = true; if (("component:@expandBody.done" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 7).onExpandBodyDone($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_bootstrap_md_angular_bootstrap_md_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_CollapseComponent_0"], _node_modules_angular_bootstrap_md_angular_bootstrap_md_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_CollapseComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](7, 114688, [[1, 4], ["collapse", 4]], 0, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_3__["CollapseComponent"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](8, 0, null, 0, 3, "div", [["class", "form-group"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](9, 0, null, null, 1, "label", [["class", "control-label"], ["for", "type"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Key type"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](11, 0, null, null, 0, "input", [["class", "form-control input-md"], ["disabled", ""], ["id", "type"], ["type", "text"]], [[8, "value", 0]], null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](12, 0, null, 0, 3, "div", [["class", "form-group"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](13, 0, null, null, 1, "label", [["class", "control-label"], ["for", "controller"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Key controller"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](15, 0, null, null, 0, "input", [["class", "form-control input-md"], ["disabled", ""], ["id", "controller"], ["type", "text"]], [[8, "value", 0]], null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](16, 0, null, 0, 3, "div", [["class", "form-group"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](17, 0, null, null, 1, "label", [["class", "control-label"], ["for", "alias"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Alias"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](19, 0, null, null, 0, "input", [["class", "form-control input-md"], ["disabled", ""], ["id", "alias"], ["type", "text"]], [[8, "value", 0]], null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](20, 0, null, 0, 3, "div", [["class", "form-group"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](21, 0, null, null, 1, "label", [["class", "control-label"], ["for", "controller"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Key (Base58)"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](23, 0, null, null, 0, "input", [["class", "form-control input-md"], ["disabled", ""], ["id", "controller"], ["type", "text"]], [[8, "value", 0]], null, null, null, null))], function (_ck, _v) { _ck(_v, 7, 0); }, function (_ck, _v) { var currVal_0 = _v.context.$implicit.keyModel.alias; _ck(_v, 2, 0, currVal_0); var currVal_1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵinlineInterpolate"](1, "fas fa-caret-", _v.context.$implicit.iconPosition, " ml-2"); _ck(_v, 3, 0, currVal_1); var currVal_2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 7).expandAnimationState; var currVal_3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 7).overflow; _ck(_v, 6, 0, currVal_2, currVal_3); var currVal_4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵinlineInterpolate"](1, "", _v.context.$implicit.keyModel.type, ""); _ck(_v, 11, 0, currVal_4); var currVal_5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵinlineInterpolate"](1, "", _v.context.$implicit.keyModel.controller, ""); _ck(_v, 15, 0, currVal_5); var currVal_6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵinlineInterpolate"](1, "", _v.context.$implicit.keyModel.alias, ""); _ck(_v, 19, 0, currVal_6); var currVal_7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵinlineInterpolate"](1, "", _v.context.$implicit.keyModel.publicKey, ""); _ck(_v, 23, 0, currVal_7); }); }
function View_AuthenticationKeysComponent_2(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 3, "option", [], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 147456, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgSelectOption"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], [8, null]], { value: [0, "value"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 147456, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵangular_packages_forms_forms_s"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], [8, null]], { value: [0, "value"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](3, null, ["", ""]))], function (_ck, _v) { var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵinlineInterpolate"](1, "", _v.context.$implicit.keyModel.publicKey, ""); _ck(_v, 1, 0, currVal_0); var currVal_1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵinlineInterpolate"](1, "", _v.context.$implicit.keyModel.publicKey, ""); _ck(_v, 2, 0, currVal_1); }, function (_ck, _v) { var currVal_2 = _v.context.$implicit.keyModel.alias; _ck(_v, 3, 0, currVal_2); }); }
function View_AuthenticationKeysComponent_3(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 25, "fieldset", [["class", "collapsible collapsed"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 1, "legend", [], null, [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4).toggle() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](2, null, ["", ""])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, null, null, 22, "div", [["mdbCollapse", ""]], [[40, "@expandBody", 0], [4, "overflow", null]], [["component", "@expandBody.done"]], function (_v, en, $event) { var ad = true; if (("component:@expandBody.done" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4).onExpandBodyDone($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_bootstrap_md_angular_bootstrap_md_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_CollapseComponent_0"], _node_modules_angular_bootstrap_md_angular_bootstrap_md_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_CollapseComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](4, 114688, [[1, 4], ["collapse", 4]], 0, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_3__["CollapseComponent"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](5, 0, null, 0, 3, "div", [["class", "form-group"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](6, 0, null, null, 1, "label", [["class", "control-label"], ["for", "type"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Signature type"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](8, 0, null, null, 0, "input", [["class", "form-control input-md"], ["disabled", ""], ["id", "type"], ["type", "text"]], [[8, "value", 0]], null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](9, 0, null, 0, 3, "div", [["class", "form-group"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](10, 0, null, null, 1, "label", [["class", "control-label"], ["for", "controller"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Key controller"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](12, 0, null, null, 0, "input", [["class", "form-control input-md"], ["disabled", ""], ["id", "controller"], ["type", "text"]], [[8, "value", 0]], null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](13, 0, null, 0, 3, "div", [["class", "form-group"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](14, 0, null, null, 1, "label", [["class", "control-label"], ["for", "alias"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Alias"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](16, 0, null, null, 0, "input", [["class", "form-control input-md"], ["disabled", ""], ["id", "alias"], ["type", "text"]], [[8, "value", 0]], null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](17, 0, null, 0, 3, "div", [["class", "form-group"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](18, 0, null, null, 1, "label", [["class", "control-label"], ["for", "controller"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Key (Base58)"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](20, 0, null, null, 0, "input", [["class", "form-control input-md"], ["disabled", ""], ["id", "controller"], ["type", "text"]], [[8, "value", 0]], null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](21, 0, null, 0, 4, "div", [["class", "form-group text-center"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](22, 0, null, null, 3, "button", [["color", "success"], ["mdbBtn", ""], ["mdbWavesEffect", ""], ["type", "button"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 24).click($event) !== false);
        ad = (pd_0 && ad);
    } if (("click" === en)) {
        var pd_1 = (_co.addSelectedKey() !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](23, 81920, null, 0, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_3__["MdbBtnDirective"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]], { color: [0, "color"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](24, 16384, null, 0, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_3__["WavesDirective"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Add Key"]))], function (_ck, _v) { _ck(_v, 4, 0); var currVal_7 = "success"; _ck(_v, 23, 0, currVal_7); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.selectedKey.alias; _ck(_v, 2, 0, currVal_0); var currVal_1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4).expandAnimationState; var currVal_2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4).overflow; _ck(_v, 3, 0, currVal_1, currVal_2); var currVal_3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵinlineInterpolate"](1, "", _co.selectedKey.type, ""); _ck(_v, 8, 0, currVal_3); var currVal_4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵinlineInterpolate"](1, "", _co.selectedKey.controller, ""); _ck(_v, 12, 0, currVal_4); var currVal_5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵinlineInterpolate"](1, "", _co.selectedKey.alias, ""); _ck(_v, 16, 0, currVal_5); var currVal_6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵinlineInterpolate"](1, "", _co.selectedKey.publicKey, ""); _ck(_v, 20, 0, currVal_6); }); }
function View_AuthenticationKeysComponent_6(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Key controller is required!"]))], null, null); }
function View_AuthenticationKeysComponent_7(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Key controller must be a valid DID!"]))], null, null); }
function View_AuthenticationKeysComponent_5(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 4, "div", [["class", "invalid-feedback"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_AuthenticationKeysComponent_6)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_AuthenticationKeysComponent_7)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](4, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.controller["errors"].required; _ck(_v, 2, 0, currVal_0); var currVal_1 = _co.controller["errors"].pattern; _ck(_v, 4, 0, currVal_1); }, null); }
function View_AuthenticationKeysComponent_9(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Alias is required!"]))], null, null); }
function View_AuthenticationKeysComponent_10(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Alias must not be more than 32 characters long and must contain only lower-case letters, digits and hyphens!"]))], null, null); }
function View_AuthenticationKeysComponent_11(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["You have already used this alias!"]))], null, null); }
function View_AuthenticationKeysComponent_8(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 6, "div", [["class", "invalid-feedback"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_AuthenticationKeysComponent_9)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_AuthenticationKeysComponent_10)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](4, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_AuthenticationKeysComponent_11)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](6, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.alias["errors"].required; _ck(_v, 2, 0, currVal_0); var currVal_1 = _co.alias["errors"].pattern; _ck(_v, 4, 0, currVal_1); var currVal_2 = _co.alias["errors"].taken; _ck(_v, 6, 0, currVal_2); }, null); }
function View_AuthenticationKeysComponent_4(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 60, "fieldset", [["class", "collapsible collapsed"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 1, "legend", [], null, [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4).toggle() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Generate Public Key"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, null, null, 57, "div", [["mdbCollapse", ""]], [[40, "@expandBody", 0], [4, "overflow", null]], [["component", "@expandBody.done"]], function (_v, en, $event) { var ad = true; if (("component:@expandBody.done" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4).onExpandBodyDone($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_bootstrap_md_angular_bootstrap_md_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_CollapseComponent_0"], _node_modules_angular_bootstrap_md_angular_bootstrap_md_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_CollapseComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](4, 114688, [[1, 4], ["collapse", 4]], 0, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_3__["CollapseComponent"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](5, 0, null, 0, 55, "form", [["novalidate", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngSubmit"], [null, "submit"], [null, "reset"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("submit" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 7).onSubmit($event) !== false);
        ad = (pd_0 && ad);
    } if (("reset" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 7).onReset() !== false);
        ad = (pd_1 && ad);
    } if (("ngSubmit" === en)) {
        var pd_2 = (_co.generateKey() !== false);
        ad = (pd_2 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](6, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵangular_packages_forms_forms_bh"], [], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](7, 540672, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormGroupDirective"], [[8, null], [8, null]], { form: [0, "form"] }, { ngSubmit: "ngSubmit" }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ControlContainer"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormGroupDirective"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](9, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControlStatusGroup"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ControlContainer"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](10, 0, null, null, 16, "div", [["class", "form-group"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](11, 0, null, null, 1, "label", [["class", "control-label"], ["for", "type"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Signature type"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](13, 0, null, null, 13, "select", [["class", "form-control"], ["formControlName", "type"], ["id", "type"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "change"], [null, "blur"]], function (_v, en, $event) { var ad = true; if (("change" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 14).onChange($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 14).onTouched() !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](14, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["SelectControlValueAccessor"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NG_VALUE_ACCESSOR"], function (p0_0) { return [p0_0]; }, [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["SelectControlValueAccessor"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](16, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControlName"], [[3, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ControlContainer"]], [8, null], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NG_VALUE_ACCESSOR"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵangular_packages_forms_forms_k"]]], { name: [0, "name"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControlName"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](18, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControl"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](19, 0, null, null, 3, "option", [["value", "Ed25519"]], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](20, 147456, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgSelectOption"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["SelectControlValueAccessor"]]], { value: [0, "value"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](21, 147456, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵangular_packages_forms_forms_s"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], [8, null]], { value: [0, "value"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Ed25519"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](23, 0, null, null, 3, "option", [["value", "ECDSASecp256k1"]], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](24, 147456, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgSelectOption"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["SelectControlValueAccessor"]]], { value: [0, "value"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](25, 147456, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵangular_packages_forms_forms_s"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], [8, null]], { value: [0, "value"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["ECDSASecp256k1"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](27, 0, null, null, 14, "div", [["class", "form-group"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](28, 0, null, null, 1, "label", [["class", "control-label"], ["for", "controller"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Key controller"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](30, 0, null, null, 9, "input", [["class", "form-control input-md"], ["formControlName", "controller"], ["id", "controller"], ["pattern", "^did:fctr:[abcdef0-9]{64}$"], ["placeholder", "Key controller"], ["type", "text"]], [[1, "pattern", 0], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"]], function (_v, en, $event) { var ad = true; if (("input" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 33)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 33).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 33)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 33)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](31, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgClass"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["IterableDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["KeyValueDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpod"](32, { "is-invalid": 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](33, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["DefaultValueAccessor"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["COMPOSITION_BUFFER_MODE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](34, 540672, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["PatternValidator"], [], { pattern: [0, "pattern"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NG_VALIDATORS"], function (p0_0) { return [p0_0]; }, [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["PatternValidator"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NG_VALUE_ACCESSOR"], function (p0_0) { return [p0_0]; }, [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["DefaultValueAccessor"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](37, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControlName"], [[3, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ControlContainer"]], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NG_VALIDATORS"]], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NG_VALUE_ACCESSOR"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵangular_packages_forms_forms_k"]]], { name: [0, "name"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControlName"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](39, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControl"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_AuthenticationKeysComponent_5)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](41, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](42, 0, null, null, 14, "div", [["class", "form-group"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](43, 0, null, null, 1, "label", [["class", "control-label"], ["for", "alias"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Alias"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](45, 0, null, null, 9, "input", [["class", "form-control input-md"], ["formControlName", "alias"], ["id", "alias"], ["pattern", "^[a-z0-9-]{1,32}$"], ["placeholder", "Alias"], ["type", "text"]], [[1, "pattern", 0], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"]], function (_v, en, $event) { var ad = true; if (("input" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 48)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 48).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 48)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 48)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](46, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgClass"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["IterableDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["KeyValueDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpod"](47, { "is-invalid": 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](48, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["DefaultValueAccessor"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["COMPOSITION_BUFFER_MODE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](49, 540672, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["PatternValidator"], [], { pattern: [0, "pattern"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NG_VALIDATORS"], function (p0_0) { return [p0_0]; }, [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["PatternValidator"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NG_VALUE_ACCESSOR"], function (p0_0) { return [p0_0]; }, [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["DefaultValueAccessor"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](52, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControlName"], [[3, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ControlContainer"]], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NG_VALIDATORS"]], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NG_VALUE_ACCESSOR"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵangular_packages_forms_forms_k"]]], { name: [0, "name"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControlName"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](54, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControl"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_AuthenticationKeysComponent_8)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](56, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](57, 0, null, null, 3, "div", [["class", "form-group text-center"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](58, 0, null, null, 2, "input", [["color", "success"], ["mdbBtn", ""], ["mdbWavesEffect", ""], ["type", "submit"], ["value", "Generate key"]], [[8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 60).click($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](59, 81920, null, 0, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_3__["MdbBtnDirective"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]], { color: [0, "color"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](60, 16384, null, 0, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_3__["WavesDirective"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]], null, null)], function (_ck, _v) { var _co = _v.component; _ck(_v, 4, 0); var currVal_9 = _co.keyForm; _ck(_v, 7, 0, currVal_9); var currVal_17 = "type"; _ck(_v, 16, 0, currVal_17); var currVal_18 = "Ed25519"; _ck(_v, 20, 0, currVal_18); var currVal_19 = "Ed25519"; _ck(_v, 21, 0, currVal_19); var currVal_20 = "ECDSASecp256k1"; _ck(_v, 24, 0, currVal_20); var currVal_21 = "ECDSASecp256k1"; _ck(_v, 25, 0, currVal_21); var currVal_30 = "form-control input-md"; var currVal_31 = _ck(_v, 32, 0, (_co.controller.touched && _co.controller.errors)); _ck(_v, 31, 0, currVal_30, currVal_31); var currVal_32 = "^did:fctr:[abcdef0-9]{64}$"; _ck(_v, 34, 0, currVal_32); var currVal_33 = "controller"; _ck(_v, 37, 0, currVal_33); var currVal_34 = _co.controller.errors; _ck(_v, 41, 0, currVal_34); var currVal_43 = "form-control input-md"; var currVal_44 = _ck(_v, 47, 0, (_co.alias.touched && _co.alias.errors)); _ck(_v, 46, 0, currVal_43, currVal_44); var currVal_45 = "^[a-z0-9-]{1,32}$"; _ck(_v, 49, 0, currVal_45); var currVal_46 = "alias"; _ck(_v, 52, 0, currVal_46); var currVal_47 = _co.alias.errors; _ck(_v, 56, 0, currVal_47); var currVal_49 = "success"; _ck(_v, 59, 0, currVal_49); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4).expandAnimationState; var currVal_1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4).overflow; _ck(_v, 3, 0, currVal_0, currVal_1); var currVal_2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 9).ngClassUntouched; var currVal_3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 9).ngClassTouched; var currVal_4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 9).ngClassPristine; var currVal_5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 9).ngClassDirty; var currVal_6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 9).ngClassValid; var currVal_7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 9).ngClassInvalid; var currVal_8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 9).ngClassPending; _ck(_v, 5, 0, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8); var currVal_10 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18).ngClassUntouched; var currVal_11 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18).ngClassTouched; var currVal_12 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18).ngClassPristine; var currVal_13 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18).ngClassDirty; var currVal_14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18).ngClassValid; var currVal_15 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18).ngClassInvalid; var currVal_16 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18).ngClassPending; _ck(_v, 13, 0, currVal_10, currVal_11, currVal_12, currVal_13, currVal_14, currVal_15, currVal_16); var currVal_22 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 34).pattern ? _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 34).pattern : null); var currVal_23 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39).ngClassUntouched; var currVal_24 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39).ngClassTouched; var currVal_25 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39).ngClassPristine; var currVal_26 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39).ngClassDirty; var currVal_27 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39).ngClassValid; var currVal_28 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39).ngClassInvalid; var currVal_29 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 39).ngClassPending; _ck(_v, 30, 0, currVal_22, currVal_23, currVal_24, currVal_25, currVal_26, currVal_27, currVal_28, currVal_29); var currVal_35 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 49).pattern ? _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 49).pattern : null); var currVal_36 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 54).ngClassUntouched; var currVal_37 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 54).ngClassTouched; var currVal_38 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 54).ngClassPristine; var currVal_39 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 54).ngClassDirty; var currVal_40 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 54).ngClassValid; var currVal_41 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 54).ngClassInvalid; var currVal_42 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 54).ngClassPending; _ck(_v, 45, 0, currVal_35, currVal_36, currVal_37, currVal_38, currVal_39, currVal_40, currVal_41, currVal_42); var currVal_48 = _co.keyForm.invalid; _ck(_v, 58, 0, currVal_48); }); }
function View_AuthenticationKeysComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](671088640, 1, { collapses: 1 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 34, "div", [["class", "tab-pane fade in active"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](2, 0, null, null, 1, "h4", [["class", "head text-center"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Create authentication keys"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](4, 0, null, null, 0, "br", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](5, 0, null, null, 30, "div", [["class", "row"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](6, 0, null, null, 29, "div", [["class", "col-xs-offset-1 col-xs-10 col-sm-offset-3 col-sm-6"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_AuthenticationKeysComponent_1)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](8, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["IterableDiffers"]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](9, 0, null, null, 11, "div", [["class", "mb-4"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](10, 0, null, null, 3, "label", [["class", "control-label"], ["for", "action"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" Select or generate key "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](12, 16777216, null, null, 1, "i", [["class", "fas fa-info-circle fa-lg ml-4"], ["tooltipClass", "custom-tooltip"]], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](13, 212992, null, 0, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbTooltip"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ComponentFactoryResolver"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbTooltipConfig"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["DOCUMENT"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]], { tooltipClass: [0, "tooltipClass"], ngbTooltip: [1, "ngbTooltip"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](14, 0, null, null, 6, "select", [["class", "form-control"], ["id", "action"]], null, [[null, "change"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("change" === en)) {
        var pd_0 = (_co.changeAction($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](15, 0, null, null, 3, "option", [["value", "generate"]], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](16, 147456, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgSelectOption"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], [8, null]], { value: [0, "value"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](17, 147456, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵangular_packages_forms_forms_s"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], [8, null]], { value: [0, "value"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Generate New Key"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_AuthenticationKeysComponent_2)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](20, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["IterableDiffers"]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_AuthenticationKeysComponent_3)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](22, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_AuthenticationKeysComponent_4)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](24, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](25, 0, null, null, 10, "div", [["class", "row justify-content-between mt-4"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](26, 0, null, null, 4, "button", [["class", "btn-md-blue"], ["color", "primary"], ["mdbBtn", ""], ["mdbWavesEffect", ""], ["type", "button"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 28).click($event) !== false);
        ad = (pd_0 && ad);
    } if (("click" === en)) {
        var pd_1 = (_co.goToPrevious() !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](27, 81920, null, 0, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_3__["MdbBtnDirective"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]], { color: [0, "color"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](28, 16384, null, 0, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_3__["WavesDirective"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](29, 0, null, null, 0, "span", [["class", "glyphicon glyphicon-arrow-left mr-3"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" Back"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](31, 0, null, null, 4, "button", [["class", "btn-md-blue"], ["color", "primary"], ["mdbBtn", ""], ["mdbWavesEffect", ""], ["type", "button"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 33).click($event) !== false);
        ad = (pd_0 && ad);
    } if (("click" === en)) {
        var pd_1 = (_co.goToNext() !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](32, 81920, null, 0, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_3__["MdbBtnDirective"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]], { color: [0, "color"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](33, 16384, null, 0, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_3__["WavesDirective"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](34, null, [" ", " "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](35, 0, null, null, 0, "span", [["class", "glyphicon glyphicon-arrow-right ml-3"]], null, null, null, null, null))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.authenticationKeys; _ck(_v, 8, 0, currVal_0); var currVal_1 = "custom-tooltip"; var currVal_2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵinlineInterpolate"](1, "", _co.actionDropdownTooltipMessage, ""); _ck(_v, 13, 0, currVal_1, currVal_2); var currVal_3 = "generate"; _ck(_v, 16, 0, currVal_3); var currVal_4 = "generate"; _ck(_v, 17, 0, currVal_4); var currVal_5 = _co.availablePublicKeys; _ck(_v, 20, 0, currVal_5); var currVal_6 = _co.selectedKey; _ck(_v, 22, 0, currVal_6); var currVal_7 = (_co.selectedAction === "generate"); _ck(_v, 24, 0, currVal_7); var currVal_8 = "primary"; _ck(_v, 27, 0, currVal_8); var currVal_9 = "primary"; _ck(_v, 32, 0, currVal_9); }, function (_ck, _v) { var _co = _v.component; var currVal_10 = _co.continueButtonText; _ck(_v, 34, 0, currVal_10); }); }
function View_AuthenticationKeysComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "app-authentication-keys", [], null, null, null, View_AuthenticationKeysComponent_0, RenderType_AuthenticationKeysComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 4440064, null, 0, _authentication_keys_component__WEBPACK_IMPORTED_MODULE_7__["AuthenticationKeysComponent"], [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_8__["Router"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], _ngrx_store__WEBPACK_IMPORTED_MODULE_9__["Store"], _core_services_keys_service__WEBPACK_IMPORTED_MODULE_10__["KeysService"], _core_services_did_service__WEBPACK_IMPORTED_MODULE_11__["DIDService"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var AuthenticationKeysComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("app-authentication-keys", _authentication_keys_component__WEBPACK_IMPORTED_MODULE_7__["AuthenticationKeysComponent"], View_AuthenticationKeysComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/components/create-did/authentication-keys/authentication-keys.component.scss.shim.ngstyle.js":
/*!**************************************************************************************************************!*\
  !*** ./src/app/components/create-did/authentication-keys/authentication-keys.component.scss.shim.ngstyle.js ***!
  \**************************************************************************************************************/
/*! exports provided: styles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhdXRoZW50aWNhdGlvbi1rZXlzL2F1dGhlbnRpY2F0aW9uLWtleXMuY29tcG9uZW50LnNjc3MifQ== */"];



/***/ }),

/***/ "./src/app/components/create-did/authentication-keys/authentication-keys.component.ts":
/*!********************************************************************************************!*\
  !*** ./src/app/components/create-did/authentication-keys/authentication-keys.component.ts ***!
  \********************************************************************************************/
/*! exports provided: AuthenticationKeysComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthenticationKeysComponent", function() { return AuthenticationKeysComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular-bootstrap-md */ "./node_modules/angular-bootstrap-md/fesm5/angular-bootstrap-md.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var src_app_core_store_form_form_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/core/store/form/form.actions */ "./src/app/core/store/form/form.actions.ts");
/* harmony import */ var src_app_components_base_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/components/base.component */ "./src/app/components/base.component.ts");
/* harmony import */ var src_app_core_store_action_action_actions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/core/store/action/action.actions */ "./src/app/core/store/action/action.actions.ts");
/* harmony import */ var src_app_core_models_component_key_model__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/core/models/component-key.model */ "./src/app/core/models/component-key.model.ts");
/* harmony import */ var src_app_core_enums_create_routes__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/core/enums/create-routes */ "./src/app/core/enums/create-routes.ts");
/* harmony import */ var src_app_core_enums_create_advanced_steps_indexes__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/core/enums/create-advanced-steps-indexes */ "./src/app/core/enums/create-advanced-steps-indexes.ts");
/* harmony import */ var src_app_core_utils_customValidators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/core/utils/customValidators */ "./src/app/core/utils/customValidators.ts");
/* harmony import */ var src_app_core_services_did_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/core/services/did.service */ "./src/app/core/services/did.service.ts");
/* harmony import */ var src_app_core_models_key_model__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/core/models/key.model */ "./src/app/core/models/key.model.ts");
/* harmony import */ var src_app_core_services_keys_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! src/app/core/services/keys.service */ "./src/app/core/services/keys.service.ts");
/* harmony import */ var src_app_core_enums_signature_type__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! src/app/core/enums/signature-type */ "./src/app/core/enums/signature-type.ts");
/* harmony import */ var src_app_core_utils_tooltip_messages__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! src/app/core/utils/tooltip.messages */ "./src/app/core/utils/tooltip.messages.ts");


















var GENERATE_ACTION = 'generate';
var UP_POSITION = 'up';
var DOWN_POSITION = 'down';
var AuthenticationKeysComponent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](AuthenticationKeysComponent, _super);
    function AuthenticationKeysComponent(fb, router, zone, store, keysService, didService) {
        var _this = _super.call(this) || this;
        _this.fb = fb;
        _this.router = router;
        _this.zone = zone;
        _this.store = store;
        _this.keysService = keysService;
        _this.didService = didService;
        _this.selectedAction = GENERATE_ACTION;
        _this.authenticationKeys = [];
        _this.availablePublicKeys = [];
        _this.actionDropdownTooltipMessage = src_app_core_utils_tooltip_messages__WEBPACK_IMPORTED_MODULE_17__["TooltipMessages"].AuthenticationDropdownTooltip;
        return _this;
    }
    AuthenticationKeysComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription$ = this.store
            .pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_5__["select"])(function (state) { return state; }))
            .subscribe(function (state) {
            _this.authenticationKeys = state.form.authenticationKeys
                .map(function (key) { return new src_app_core_models_component_key_model__WEBPACK_IMPORTED_MODULE_9__["ComponentKeyModel"](key, DOWN_POSITION); });
            _this.availablePublicKeys = state.form.publicKeys
                .filter(function (k) { return !state.form.authenticationKeys.includes(k); })
                .map(function (key) { return new src_app_core_models_component_key_model__WEBPACK_IMPORTED_MODULE_9__["ComponentKeyModel"](key, DOWN_POSITION); });
            _this.continueButtonText = _this.authenticationKeys.length > 0 ? 'Next' : 'Skip';
        });
        this.subscriptions.push(this.subscription$);
        this.didId = this.didService.getId();
        this.createForm();
    };
    AuthenticationKeysComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.collapses.forEach(function (collapse, index) {
                if (index === _this.collapses.length - 1) {
                    collapse.toggle();
                }
            });
        });
    };
    AuthenticationKeysComponent.prototype.createForm = function () {
        this.keyForm = this.fb.group({
            type: [src_app_core_enums_signature_type__WEBPACK_IMPORTED_MODULE_16__["SignatureType"].EdDSA, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]],
            controller: [this.didId, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]],
            alias: ['', [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required,
                    src_app_core_utils_customValidators__WEBPACK_IMPORTED_MODULE_12__["default"].uniqueKeyAlias(this.availablePublicKeys.map(function (key) { return key.keyModel; }), this.authenticationKeys.map(function (key) { return key.keyModel; }))
                ]]
        });
    };
    AuthenticationKeysComponent.prototype.generateKey = function () {
        if (this.keyForm.invalid) {
            return;
        }
        var keyPair = this.keysService.generateKeyPair(this.type.value);
        var generatedKey = new src_app_core_models_key_model__WEBPACK_IMPORTED_MODULE_14__["KeyModel"](this.alias.value, this.type.value, this.controller.value, keyPair.publicKey, keyPair.privateKey);
        this.store.dispatch(new src_app_core_store_form_form_actions__WEBPACK_IMPORTED_MODULE_6__["AddAuthenticationKey"](generatedKey));
        this.createForm();
    };
    AuthenticationKeysComponent.prototype.changeAction = function (event) {
        var _this = this;
        this.selectedAction = event.target.value;
        if (this.selectedAction !== GENERATE_ACTION) {
            this.selectedKey = this.availablePublicKeys.find(function (k) { return k.keyModel.publicKey === _this.selectedAction; }).keyModel;
        }
        else {
            this.selectedKey = undefined;
        }
        setTimeout(function () {
            _this.collapses.forEach(function (collapse, index) {
                if (index === _this.collapses.length - 1) {
                    _this.zone.run(function () {
                        collapse.toggle();
                    });
                }
            });
        });
    };
    AuthenticationKeysComponent.prototype.addSelectedKey = function () {
        var _this = this;
        this.store.dispatch(new src_app_core_store_form_form_actions__WEBPACK_IMPORTED_MODULE_6__["AddAuthenticationKey"](this.selectedKey));
        this.selectedKey = undefined;
        this.selectedAction = GENERATE_ACTION;
        setTimeout(function () {
            _this.collapses.forEach(function (collapse, index) {
                if (index === _this.collapses.length - 1) {
                    _this.zone.run(function () {
                        collapse.toggle();
                    });
                }
            });
        });
    };
    AuthenticationKeysComponent.prototype.removeKey = function (key) {
        this.store.dispatch(new src_app_core_store_form_form_actions__WEBPACK_IMPORTED_MODULE_6__["RemoveAuthenticationKey"](key));
        this.createForm();
    };
    AuthenticationKeysComponent.prototype.toggleKey = function (keyModel) {
        var publicKey = this.authenticationKeys.find(function (k) { return k.keyModel === keyModel; });
        publicKey.iconPosition = publicKey.iconPosition === DOWN_POSITION ? UP_POSITION : DOWN_POSITION;
    };
    AuthenticationKeysComponent.prototype.goToNext = function () {
        this.store.dispatch(new src_app_core_store_action_action_actions__WEBPACK_IMPORTED_MODULE_8__["MoveToStep"](src_app_core_enums_create_advanced_steps_indexes__WEBPACK_IMPORTED_MODULE_11__["CreateAdvancedStepsIndexes"].Services));
        this.router.navigate([src_app_core_enums_create_routes__WEBPACK_IMPORTED_MODULE_10__["CreateRoutes"].Services]);
    };
    AuthenticationKeysComponent.prototype.goToPrevious = function () {
        this.store.dispatch(new src_app_core_store_action_action_actions__WEBPACK_IMPORTED_MODULE_8__["MoveToStep"](src_app_core_enums_create_advanced_steps_indexes__WEBPACK_IMPORTED_MODULE_11__["CreateAdvancedStepsIndexes"].PublicKeys));
        this.router.navigate([src_app_core_enums_create_routes__WEBPACK_IMPORTED_MODULE_10__["CreateRoutes"].PublicKeys]);
    };
    Object.defineProperty(AuthenticationKeysComponent.prototype, "type", {
        get: function () {
            return this.keyForm.get('type');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthenticationKeysComponent.prototype, "alias", {
        get: function () {
            return this.keyForm.get('alias');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthenticationKeysComponent.prototype, "controller", {
        get: function () {
            return this.keyForm.get('controller');
        },
        enumerable: true,
        configurable: true
    });
    return AuthenticationKeysComponent;
}(src_app_components_base_component__WEBPACK_IMPORTED_MODULE_7__["BaseComponent"]));



/***/ }),

/***/ "./src/app/components/create-did/create-did.module.ngfactory.js":
/*!**********************************************************************!*\
  !*** ./src/app/components/create-did/create-did.module.ngfactory.js ***!
  \**********************************************************************/
/*! exports provided: CreateDIDModuleNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateDIDModuleNgFactory", function() { return CreateDIDModuleNgFactory; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _create_did_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./create-did.module */ "./src/app/components/create-did/create-did.module.ts");
/* harmony import */ var _node_modules_angular_router_router_ngfactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/@angular/router/router.ngfactory */ "./node_modules/@angular/router/router.ngfactory.js");
/* harmony import */ var _authentication_keys_authentication_keys_component_ngfactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./authentication-keys/authentication-keys.component.ngfactory */ "./src/app/components/create-did/authentication-keys/authentication-keys.component.ngfactory.js");
/* harmony import */ var _encrypt_keys_encrypt_keys_component_ngfactory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./encrypt-keys/encrypt-keys.component.ngfactory */ "./src/app/components/create-did/encrypt-keys/encrypt-keys.component.ngfactory.js");
/* harmony import */ var _public_keys_public_keys_component_ngfactory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./public-keys/public-keys.component.ngfactory */ "./src/app/components/create-did/public-keys/public-keys.component.ngfactory.js");
/* harmony import */ var _services_services_component_ngfactory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./services/services.component.ngfactory */ "./src/app/components/create-did/services/services.component.ngfactory.js");
/* harmony import */ var _summary_summary_component_ngfactory__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./summary/summary.component.ngfactory */ "./src/app/components/create-did/summary/summary.component.ngfactory.js");
/* harmony import */ var _node_modules_angular_bootstrap_md_angular_bootstrap_md_ngfactory__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../node_modules/angular-bootstrap-md/angular-bootstrap-md.ngfactory */ "./node_modules/angular-bootstrap-md/angular-bootstrap-md.ngfactory.js");
/* harmony import */ var _node_modules_ng_bootstrap_ng_bootstrap_ng_bootstrap_ngfactory__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../node_modules/@ng-bootstrap/ng-bootstrap/ng-bootstrap.ngfactory */ "./node_modules/@ng-bootstrap/ng-bootstrap/ng-bootstrap.ngfactory.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! angular-bootstrap-md */ "./node_modules/angular-bootstrap-md/fesm5/angular-bootstrap-md.js");
/* harmony import */ var angular_highlight_js_dist_esm_src_highlightJs_token__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! angular-highlight-js/dist/esm/src/highlightJs.token */ "./node_modules/angular-highlight-js/dist/esm/src/highlightJs.token.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _create_did_routing__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./create-did.routing */ "./src/app/components/create-did/create-did.routing.ts");
/* harmony import */ var angular_highlight_js_dist_esm_src_highlightJs_module__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! angular-highlight-js/dist/esm/src/highlightJs.module */ "./node_modules/angular-highlight-js/dist/esm/src/highlightJs.module.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _authentication_keys_authentication_keys_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./authentication-keys/authentication-keys.component */ "./src/app/components/create-did/authentication-keys/authentication-keys.component.ts");
/* harmony import */ var _core_guards_create_components_guard__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../core/guards/create-components.guard */ "./src/app/core/guards/create-components.guard.ts");
/* harmony import */ var _encrypt_keys_encrypt_keys_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./encrypt-keys/encrypt-keys.component */ "./src/app/components/create-did/encrypt-keys/encrypt-keys.component.ts");
/* harmony import */ var _public_keys_public_keys_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./public-keys/public-keys.component */ "./src/app/components/create-did/public-keys/public-keys.component.ts");
/* harmony import */ var _services_services_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./services/services.component */ "./src/app/components/create-did/services/services.component.ts");
/* harmony import */ var _summary_summary_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./summary/summary.component */ "./src/app/components/create-did/summary/summary.component.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
























var CreateDIDModuleNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵcmf"](_create_did_module__WEBPACK_IMPORTED_MODULE_1__["CreateDIDModule"], [], function (_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmod"]([_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](512, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵCodegenComponentFactoryResolver"], [[8, [_node_modules_angular_router_router_ngfactory__WEBPACK_IMPORTED_MODULE_2__["ɵEmptyOutletComponentNgFactory"], _authentication_keys_authentication_keys_component_ngfactory__WEBPACK_IMPORTED_MODULE_3__["AuthenticationKeysComponentNgFactory"], _encrypt_keys_encrypt_keys_component_ngfactory__WEBPACK_IMPORTED_MODULE_4__["EncryptKeysComponentNgFactory"], _public_keys_public_keys_component_ngfactory__WEBPACK_IMPORTED_MODULE_5__["PublicKeysComponentNgFactory"], _services_services_component_ngfactory__WEBPACK_IMPORTED_MODULE_6__["ServicesComponentNgFactory"], _summary_summary_component_ngfactory__WEBPACK_IMPORTED_MODULE_7__["SummaryComponentNgFactory"], _node_modules_angular_bootstrap_md_angular_bootstrap_md_ngfactory__WEBPACK_IMPORTED_MODULE_8__["BsDropdownContainerComponentNgFactory"], _node_modules_angular_bootstrap_md_angular_bootstrap_md_ngfactory__WEBPACK_IMPORTED_MODULE_8__["ModalBackdropComponentNgFactory"], _node_modules_angular_bootstrap_md_angular_bootstrap_md_ngfactory__WEBPACK_IMPORTED_MODULE_8__["ModalContainerComponentNgFactory"], _node_modules_angular_bootstrap_md_angular_bootstrap_md_ngfactory__WEBPACK_IMPORTED_MODULE_8__["TooltipContainerComponentNgFactory"], _node_modules_angular_bootstrap_md_angular_bootstrap_md_ngfactory__WEBPACK_IMPORTED_MODULE_8__["PopoverContainerComponentNgFactory"], _node_modules_angular_bootstrap_md_angular_bootstrap_md_ngfactory__WEBPACK_IMPORTED_MODULE_8__["MdbTablePaginationComponentNgFactory"], _node_modules_ng_bootstrap_ng_bootstrap_ng_bootstrap_ngfactory__WEBPACK_IMPORTED_MODULE_9__["ɵqNgFactory"]]], [3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"]], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModuleRef"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_common__WEBPACK_IMPORTED_MODULE_10__["NgLocalization"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["NgLocaleLocalization"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["LOCALE_ID"], [2, _angular_common__WEBPACK_IMPORTED_MODULE_10__["ɵangular_packages_common_common_a"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ɵangular_packages_forms_forms_j"], _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ɵangular_packages_forms_forms_j"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["NavbarService"], angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["NavbarService"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["CarouselConfig"], angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["CarouselConfig"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["MdbTableService"], angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["MdbTableService"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["ɵf"], angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["ɵf"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["ɵe"], angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["ɵe"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"], angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["ɵf"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ApplicationRef"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["BsDropdownState"], angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["BsDropdownState"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["MDBModalService"], angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["MDBModalService"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["RendererFactory2"], angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["ɵe"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["TooltipConfig"], angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["TooltipConfig"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["PopoverConfig"], angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["PopoverConfig"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormBuilder"], _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormBuilder"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, angular_highlight_js_dist_esm_src_highlightJs_token__WEBPACK_IMPORTED_MODULE_13__["HIGHLIGHT_JS"], _create_did_module__WEBPACK_IMPORTED_MODULE_1__["highlightJsFactory"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_common__WEBPACK_IMPORTED_MODULE_10__["CommonModule"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["CommonModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_router__WEBPACK_IMPORTED_MODULE_14__["RouterModule"], _angular_router__WEBPACK_IMPORTED_MODULE_14__["RouterModule"], [[2, _angular_router__WEBPACK_IMPORTED_MODULE_14__["ɵangular_packages_router_router_a"]], [2, _angular_router__WEBPACK_IMPORTED_MODULE_14__["Router"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _create_did_routing__WEBPACK_IMPORTED_MODULE_15__["CreateDIDRoutingModule"], _create_did_routing__WEBPACK_IMPORTED_MODULE_15__["CreateDIDRoutingModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ɵangular_packages_forms_forms_bc"], _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ɵangular_packages_forms_forms_bc"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormsModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, angular_highlight_js_dist_esm_src_highlightJs_module__WEBPACK_IMPORTED_MODULE_16__["HighlightJsModule"], angular_highlight_js_dist_esm_src_highlightJs_module__WEBPACK_IMPORTED_MODULE_16__["HighlightJsModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["ButtonsModule"], angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["ButtonsModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["WavesModule"], angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["WavesModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["InputsModule"], angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["InputsModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["NavbarModule"], angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["NavbarModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["DropdownModule"], angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["DropdownModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["CarouselModule"], angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["CarouselModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["ChartsModule"], angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["ChartsModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["CollapseModule"], angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["CollapseModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["ModalModule"], angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["ModalModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["TooltipModule"], angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["TooltipModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["PopoverModule"], angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["PopoverModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["IconsModule"], angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["IconsModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["CardsFreeModule"], angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["CardsFreeModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["CheckboxModule"], angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["CheckboxModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["TableModule"], angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["TableModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["BadgeModule"], angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["BadgeModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["BreadcrumbModule"], angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["BreadcrumbModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["InputUtilitiesModule"], angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["InputUtilitiesModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["MDBRootModule"], angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["MDBRootModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_17__["NgbTooltipModule"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_17__["NgbTooltipModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ReactiveFormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ReactiveFormsModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _create_did_module__WEBPACK_IMPORTED_MODULE_1__["CreateDIDModule"], _create_did_module__WEBPACK_IMPORTED_MODULE_1__["CreateDIDModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1024, _angular_router__WEBPACK_IMPORTED_MODULE_14__["ROUTES"], function () { return [[{ path: "keys/authentication", component: _authentication_keys_authentication_keys_component__WEBPACK_IMPORTED_MODULE_18__["AuthenticationKeysComponent"], canActivate: [_core_guards_create_components_guard__WEBPACK_IMPORTED_MODULE_19__["CreateComponentsGuard"]] }, { path: "keys/encrypt", component: _encrypt_keys_encrypt_keys_component__WEBPACK_IMPORTED_MODULE_20__["EncryptKeysComponent"], canActivate: [_core_guards_create_components_guard__WEBPACK_IMPORTED_MODULE_19__["CreateComponentsGuard"]] }, { path: "keys/public", component: _public_keys_public_keys_component__WEBPACK_IMPORTED_MODULE_21__["PublicKeysComponent"], canActivate: [_core_guards_create_components_guard__WEBPACK_IMPORTED_MODULE_19__["CreateComponentsGuard"]] }, { path: "services", component: _services_services_component__WEBPACK_IMPORTED_MODULE_22__["ServicesComponent"], canActivate: [_core_guards_create_components_guard__WEBPACK_IMPORTED_MODULE_19__["CreateComponentsGuard"]] }, { path: "summary", component: _summary_summary_component__WEBPACK_IMPORTED_MODULE_23__["SummaryComponent"], canActivate: [_core_guards_create_components_guard__WEBPACK_IMPORTED_MODULE_19__["CreateComponentsGuard"]] }]]; }, []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](256, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_12__["BsDropdownConfig"], { autoClose: true }, [])]); });



/***/ }),

/***/ "./src/app/components/create-did/create-did.module.ts":
/*!************************************************************!*\
  !*** ./src/app/components/create-did/create-did.module.ts ***!
  \************************************************************/
/*! exports provided: highlightJsFactory, CreateDIDModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "highlightJsFactory", function() { return highlightJsFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateDIDModule", function() { return CreateDIDModule; });
/* harmony import */ var highlight_js_lib_highlight__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! highlight.js/lib/highlight */ "./node_modules/highlight.js/lib/highlight.js");
/* harmony import */ var highlight_js_lib_highlight__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(highlight_js_lib_highlight__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var highlight_js_lib_languages_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! highlight.js/lib/languages/json */ "./node_modules/highlight.js/lib/languages/json.js");
/* harmony import */ var highlight_js_lib_languages_json__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(highlight_js_lib_languages_json__WEBPACK_IMPORTED_MODULE_1__);


highlight_js_lib_highlight__WEBPACK_IMPORTED_MODULE_0___default.a.registerLanguage('json', highlight_js_lib_languages_json__WEBPACK_IMPORTED_MODULE_1___default.a);
function highlightJsFactory() {
    return highlight_js_lib_highlight__WEBPACK_IMPORTED_MODULE_0___default.a;
}
var CreateDIDModule = /** @class */ (function () {
    function CreateDIDModule() {
    }
    return CreateDIDModule;
}());



/***/ }),

/***/ "./src/app/components/create-did/create-did.routing.ts":
/*!*************************************************************!*\
  !*** ./src/app/components/create-did/create-did.routing.ts ***!
  \*************************************************************/
/*! exports provided: CreateDIDRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateDIDRoutingModule", function() { return CreateDIDRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _authentication_keys_authentication_keys_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./authentication-keys/authentication-keys.component */ "./src/app/components/create-did/authentication-keys/authentication-keys.component.ts");
/* harmony import */ var _core_guards_create_components_guard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/guards/create-components.guard */ "./src/app/core/guards/create-components.guard.ts");
/* harmony import */ var _encrypt_keys_encrypt_keys_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./encrypt-keys/encrypt-keys.component */ "./src/app/components/create-did/encrypt-keys/encrypt-keys.component.ts");
/* harmony import */ var _public_keys_public_keys_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./public-keys/public-keys.component */ "./src/app/components/create-did/public-keys/public-keys.component.ts");
/* harmony import */ var _services_services_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services/services.component */ "./src/app/components/create-did/services/services.component.ts");
/* harmony import */ var _summary_summary_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./summary/summary.component */ "./src/app/components/create-did/summary/summary.component.ts");







var didCreationRoutes = [
    { path: 'keys/authentication', component: _authentication_keys_authentication_keys_component__WEBPACK_IMPORTED_MODULE_1__["AuthenticationKeysComponent"], canActivate: [_core_guards_create_components_guard__WEBPACK_IMPORTED_MODULE_2__["CreateComponentsGuard"]] },
    { path: 'keys/encrypt', component: _encrypt_keys_encrypt_keys_component__WEBPACK_IMPORTED_MODULE_3__["EncryptKeysComponent"], canActivate: [_core_guards_create_components_guard__WEBPACK_IMPORTED_MODULE_2__["CreateComponentsGuard"]] },
    { path: 'keys/public', component: _public_keys_public_keys_component__WEBPACK_IMPORTED_MODULE_4__["PublicKeysComponent"], canActivate: [_core_guards_create_components_guard__WEBPACK_IMPORTED_MODULE_2__["CreateComponentsGuard"]] },
    { path: 'services', component: _services_services_component__WEBPACK_IMPORTED_MODULE_5__["ServicesComponent"], canActivate: [_core_guards_create_components_guard__WEBPACK_IMPORTED_MODULE_2__["CreateComponentsGuard"]] },
    { path: 'summary', component: _summary_summary_component__WEBPACK_IMPORTED_MODULE_6__["SummaryComponent"], canActivate: [_core_guards_create_components_guard__WEBPACK_IMPORTED_MODULE_2__["CreateComponentsGuard"]] }
];
var CreateDIDRoutingModule = /** @class */ (function () {
    function CreateDIDRoutingModule() {
    }
    return CreateDIDRoutingModule;
}());



/***/ }),

/***/ "./src/app/components/create-did/encrypt-keys/encrypt-keys.component.ngfactory.js":
/*!****************************************************************************************!*\
  !*** ./src/app/components/create-did/encrypt-keys/encrypt-keys.component.ngfactory.js ***!
  \****************************************************************************************/
/*! exports provided: RenderType_EncryptKeysComponent, View_EncryptKeysComponent_0, View_EncryptKeysComponent_Host_0, EncryptKeysComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_EncryptKeysComponent", function() { return RenderType_EncryptKeysComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_EncryptKeysComponent_0", function() { return View_EncryptKeysComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_EncryptKeysComponent_Host_0", function() { return View_EncryptKeysComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EncryptKeysComponentNgFactory", function() { return EncryptKeysComponentNgFactory; });
/* harmony import */ var _encrypt_keys_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./encrypt-keys.component.scss.shim.ngstyle */ "./src/app/components/create-did/encrypt-keys/encrypt-keys.component.scss.shim.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angular-bootstrap-md */ "./node_modules/angular-bootstrap-md/fesm5/angular-bootstrap-md.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _encrypt_keys_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./encrypt-keys.component */ "./src/app/components/create-did/encrypt-keys/encrypt-keys.component.ts");
/* harmony import */ var _core_services_did_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../core/services/did.service */ "./src/app/core/services/did.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var _core_services_keys_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../core/services/keys.service */ "./src/app/core/services/keys.service.ts");
/* harmony import */ var _core_services_workflow_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../core/services/workflow.service */ "./src/app/core/services/workflow.service.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 












var styles_EncryptKeysComponent = [_encrypt_keys_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_EncryptKeysComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 0, styles: styles_EncryptKeysComponent, data: {} });

function View_EncryptKeysComponent_1(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](0, null, ["", " "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 1, "b", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](2, null, ["", ""]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.tooltipMessage; _ck(_v, 0, 0, currVal_0); var currVal_1 = _co.boldPartTooltipMessage; _ck(_v, 2, 0, currVal_1); }); }
function View_EncryptKeysComponent_2(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "div", [["class", "alert alert-info text-center"], ["role", "alert"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 0, "i", [["class", "fas fa-info mr-4"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" You have not generated any keys. "]))], null, null); }
function View_EncryptKeysComponent_5(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Password is required!"]))], null, null); }
function View_EncryptKeysComponent_6(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Password must be at least 8 characters long and must include at least one lower-case letter, one upper-case letter, one digit and one special character!"]))], null, null); }
function View_EncryptKeysComponent_4(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 4, "div", [["class", "invalid-feedback"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_EncryptKeysComponent_5)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_EncryptKeysComponent_6)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](4, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.password.errors.required; _ck(_v, 2, 0, currVal_0); var currVal_1 = _co.password.errors.pattern; _ck(_v, 4, 0, currVal_1); }, null); }
function View_EncryptKeysComponent_8(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Confirm password is required!"]))], null, null); }
function View_EncryptKeysComponent_9(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Passwords do not match!"]))], null, null); }
function View_EncryptKeysComponent_7(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 4, "div", [["class", "invalid-feedback"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_EncryptKeysComponent_8)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_EncryptKeysComponent_9)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](4, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = ((_co.confirmPassword.errors == null) ? null : _co.confirmPassword.errors.required); _ck(_v, 2, 0, currVal_0); var currVal_1 = ((_co.encryptForm.errors == null) ? null : _co.encryptForm.errors.passwordsMismatch); _ck(_v, 4, 0, currVal_1); }, null); }
function View_EncryptKeysComponent_3(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 36, "form", [["novalidate", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngSubmit"], [null, "submit"], [null, "reset"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("submit" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2).onSubmit($event) !== false);
        ad = (pd_0 && ad);
    } if (("reset" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2).onReset() !== false);
        ad = (pd_1 && ad);
    } if (("ngSubmit" === en)) {
        var pd_2 = (_co.encryptKeys() !== false);
        ad = (pd_2 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵangular_packages_forms_forms_bh"], [], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 540672, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroupDirective"], [[8, null], [8, null]], { form: [0, "form"] }, { ngSubmit: "ngSubmit" }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ControlContainer"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroupDirective"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](4, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgControlStatusGroup"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ControlContainer"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](5, 0, null, null, 14, "div", [["class", "form-group"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](6, 0, null, null, 1, "label", [["class", "control-label"], ["for", "password"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Enter password"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](8, 0, null, null, 9, "input", [["class", "form-control input-md"], ["formControlName", "password"], ["id", "password"], ["pattern", "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$^+=!*()@%&]).{8,}$"], ["placeholder", "Password"], ["type", "password"]], [[1, "pattern", 0], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"]], function (_v, en, $event) { var ad = true; if (("input" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](9, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgClass"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["IterableDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["KeyValueDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpod"](10, { "is-invalid": 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](11, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["DefaultValueAccessor"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["COMPOSITION_BUFFER_MODE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](12, 540672, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["PatternValidator"], [], { pattern: [0, "pattern"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NG_VALIDATORS"], function (p0_0) { return [p0_0]; }, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["PatternValidator"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NG_VALUE_ACCESSOR"], function (p0_0) { return [p0_0]; }, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["DefaultValueAccessor"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](15, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControlName"], [[3, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ControlContainer"]], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NG_VALIDATORS"]], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NG_VALUE_ACCESSOR"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵangular_packages_forms_forms_k"]]], { name: [0, "name"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControlName"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](17, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgControl"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_EncryptKeysComponent_4)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](19, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](20, 0, null, null, 12, "div", [["class", "form-group"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](21, 0, null, null, 1, "label", [["class", "control-label"], ["for", "confirm-password"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Confirm password"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](23, 0, null, null, 7, "input", [["class", "form-control input-md"], ["formControlName", "confirmPassword"], ["id", "confirm-password"], ["placeholder", "Confirm Password"], ["type", "password"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"]], function (_v, en, $event) { var ad = true; if (("input" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 26)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 26).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 26)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 26)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](24, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgClass"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["IterableDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["KeyValueDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpod"](25, { "is-invalid": 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](26, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["DefaultValueAccessor"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["COMPOSITION_BUFFER_MODE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NG_VALUE_ACCESSOR"], function (p0_0) { return [p0_0]; }, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["DefaultValueAccessor"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](28, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControlName"], [[3, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ControlContainer"]], [8, null], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NG_VALUE_ACCESSOR"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵangular_packages_forms_forms_k"]]], { name: [0, "name"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControlName"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](30, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgControl"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_EncryptKeysComponent_7)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](32, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](33, 0, null, null, 3, "div", [["class", "form-group text-center"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](34, 0, null, null, 2, "input", [["color", "success"], ["mdbBtn", ""], ["mdbWavesEffect", ""], ["type", "submit"], ["value", "Encrypt keys"]], [[8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 36).click($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](35, 81920, null, 0, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_4__["MdbBtnDirective"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]], { color: [0, "color"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](36, 16384, null, 0, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_4__["WavesDirective"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]], null, null)], function (_ck, _v) { var _co = _v.component; var currVal_7 = _co.encryptForm; _ck(_v, 2, 0, currVal_7); var currVal_16 = "form-control input-md"; var currVal_17 = _ck(_v, 10, 0, (_co.password.touched && _co.password.errors)); _ck(_v, 9, 0, currVal_16, currVal_17); var currVal_18 = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$^+=!*()@%&]).{8,}$"; _ck(_v, 12, 0, currVal_18); var currVal_19 = "password"; _ck(_v, 15, 0, currVal_19); var currVal_20 = _co.password.errors; _ck(_v, 19, 0, currVal_20); var currVal_28 = "form-control input-md"; var currVal_29 = _ck(_v, 25, 0, (_co.confirmPassword.touched && (_co.confirmPassword.errors || ((_co.encryptForm.errors == null) ? null : _co.encryptForm.errors.passwordsMismatch)))); _ck(_v, 24, 0, currVal_28, currVal_29); var currVal_30 = "confirmPassword"; _ck(_v, 28, 0, currVal_30); var currVal_31 = (_co.confirmPassword.errors || ((_co.encryptForm.errors == null) ? null : _co.encryptForm.errors.passwordsMismatch)); _ck(_v, 32, 0, currVal_31); var currVal_33 = "success"; _ck(_v, 35, 0, currVal_33); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4).ngClassUntouched; var currVal_1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4).ngClassTouched; var currVal_2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4).ngClassPristine; var currVal_3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4).ngClassDirty; var currVal_4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4).ngClassValid; var currVal_5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4).ngClassInvalid; var currVal_6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4).ngClassPending; _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6); var currVal_8 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 12).pattern ? _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 12).pattern : null); var currVal_9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 17).ngClassUntouched; var currVal_10 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 17).ngClassTouched; var currVal_11 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 17).ngClassPristine; var currVal_12 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 17).ngClassDirty; var currVal_13 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 17).ngClassValid; var currVal_14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 17).ngClassInvalid; var currVal_15 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 17).ngClassPending; _ck(_v, 8, 0, currVal_8, currVal_9, currVal_10, currVal_11, currVal_12, currVal_13, currVal_14, currVal_15); var currVal_21 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 30).ngClassUntouched; var currVal_22 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 30).ngClassTouched; var currVal_23 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 30).ngClassPristine; var currVal_24 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 30).ngClassDirty; var currVal_25 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 30).ngClassValid; var currVal_26 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 30).ngClassInvalid; var currVal_27 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 30).ngClassPending; _ck(_v, 23, 0, currVal_21, currVal_22, currVal_23, currVal_24, currVal_25, currVal_26, currVal_27); var currVal_32 = _co.encryptForm.invalid; _ck(_v, 34, 0, currVal_32); }); }
function View_EncryptKeysComponent_10(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 6, "div", [["class", "mt-5 text-center"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 1, "p", [["class", "text-center text-warning"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Download your keystore file! You must download it to continue with the next step."])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, null, null, 3, "button", [["class", "mt-3"], ["color", "warning"], ["mdbBtn", ""], ["mdbWavesEffect", ""], ["type", "button"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 5).click($event) !== false);
        ad = (pd_0 && ad);
    } if (("click" === en)) {
        var pd_1 = (_co.downloadFile() !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](4, 81920, null, 0, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_4__["MdbBtnDirective"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]], { color: [0, "color"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](5, 16384, null, 0, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_4__["WavesDirective"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Download File"]))], function (_ck, _v) { var currVal_0 = "warning"; _ck(_v, 4, 0, currVal_0); }, null); }
function View_EncryptKeysComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 25, "div", [["class", "tab-pane fade in active"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 4, "h4", [["class", "head text-center"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" Encrypt your keys "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](0, [["tipContent", 2]], null, 0, null, View_EncryptKeysComponent_1)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](4, 16777216, null, null, 1, "i", [["class", "fas fa-info-circle fa-sm ml-4"], ["tooltipClass", "custom-tooltip"]], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](5, 212992, null, 0, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbTooltip"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ComponentFactoryResolver"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbTooltipConfig"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["DOCUMENT"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]], { tooltipClass: [0, "tooltipClass"], ngbTooltip: [1, "ngbTooltip"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](6, 0, null, null, 0, "br", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](7, 0, null, null, 18, "div", [["class", "row"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](8, 0, null, null, 17, "div", [["class", "col-xs-offset-1 col-xs-10 col-sm-offset-3 col-sm-6"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_EncryptKeysComponent_2)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](10, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_EncryptKeysComponent_3)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](12, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_EncryptKeysComponent_10)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](14, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](15, 0, null, null, 10, "div", [["class", "row justify-content-between mt-4"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](16, 0, null, null, 4, "button", [["class", "btn-md-blue"], ["color", "primary"], ["mdbBtn", ""], ["mdbWavesEffect", ""], ["type", "button"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18).click($event) !== false);
        ad = (pd_0 && ad);
    } if (("click" === en)) {
        var pd_1 = (_co.goToPrevious() !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](17, 81920, null, 0, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_4__["MdbBtnDirective"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]], { color: [0, "color"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](18, 16384, null, 0, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_4__["WavesDirective"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](19, 0, null, null, 0, "span", [["class", "glyphicon glyphicon-arrow-left mr-3"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" Back"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](21, 0, null, null, 4, "button", [["class", "btn-md-blue"], ["color", "primary"], ["mdbBtn", ""], ["mdbWavesEffect", ""], ["type", "button"]], [[8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 23).click($event) !== false);
        ad = (pd_0 && ad);
    } if (("click" === en)) {
        var pd_1 = (_co.goToNext() !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](22, 81920, null, 0, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_4__["MdbBtnDirective"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]], { color: [0, "color"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](23, 16384, null, 0, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_4__["WavesDirective"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](24, null, [" ", " "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](25, 0, null, null, 0, "span", [["class", "glyphicon glyphicon-arrow-right ml-3"]], null, null, null, null, null))], function (_ck, _v) { var _co = _v.component; var currVal_0 = "custom-tooltip"; var currVal_1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 3); _ck(_v, 5, 0, currVal_0, currVal_1); var currVal_2 = !_co.keysGenerated; _ck(_v, 10, 0, currVal_2); var currVal_3 = _co.keysGenerated; _ck(_v, 12, 0, currVal_3); var currVal_4 = _co.encryptedFile; _ck(_v, 14, 0, currVal_4); var currVal_5 = "primary"; _ck(_v, 17, 0, currVal_5); var currVal_7 = "primary"; _ck(_v, 22, 0, currVal_7); }, function (_ck, _v) { var _co = _v.component; var currVal_6 = (!_co.fileDowloaded && _co.keysGenerated); _ck(_v, 21, 0, currVal_6); var currVal_8 = _co.continueButtonText; _ck(_v, 24, 0, currVal_8); }); }
function View_EncryptKeysComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "app-encrypt-keys", [], null, null, null, View_EncryptKeysComponent_0, RenderType_EncryptKeysComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 245760, null, 0, _encrypt_keys_component__WEBPACK_IMPORTED_MODULE_6__["EncryptKeysComponent"], [_core_services_did_service__WEBPACK_IMPORTED_MODULE_7__["DIDService"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_8__["Router"], _ngrx_store__WEBPACK_IMPORTED_MODULE_9__["Store"], _core_services_keys_service__WEBPACK_IMPORTED_MODULE_10__["KeysService"], _core_services_workflow_service__WEBPACK_IMPORTED_MODULE_11__["WorkflowService"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var EncryptKeysComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("app-encrypt-keys", _encrypt_keys_component__WEBPACK_IMPORTED_MODULE_6__["EncryptKeysComponent"], View_EncryptKeysComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/components/create-did/encrypt-keys/encrypt-keys.component.scss.shim.ngstyle.js":
/*!************************************************************************************************!*\
  !*** ./src/app/components/create-did/encrypt-keys/encrypt-keys.component.scss.shim.ngstyle.js ***!
  \************************************************************************************************/
/*! exports provided: styles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = [".btn-warning[_ngcontent-%COMP%]:focus {\n  outline: none !important;\n  border: none !important; }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuY3J5cHQta2V5cy9EOlxcRmFjdG9tYXRpY1xcZmFjdG9tLWRpZC11aVxcc3JjXFxhcHBcXGNvbXBvbmVudHNcXGNyZWF0ZS1kaWQvZW5jcnlwdC1rZXlzXFxlbmNyeXB0LWtleXMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSx3QkFBd0I7RUFDeEIsdUJBQXVCLEVBQUEiLCJmaWxlIjoiZW5jcnlwdC1rZXlzL2VuY3J5cHQta2V5cy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5idG4td2FybmluZzpmb2N1cyB7XHJcbiAgb3V0bGluZTogbm9uZSAhaW1wb3J0YW50O1xyXG4gIGJvcmRlcjogbm9uZSAhaW1wb3J0YW50O1xyXG59Il19 */"];



/***/ }),

/***/ "./src/app/components/create-did/encrypt-keys/encrypt-keys.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/components/create-did/encrypt-keys/encrypt-keys.component.ts ***!
  \******************************************************************************/
/*! exports provided: EncryptKeysComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EncryptKeysComponent", function() { return EncryptKeysComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var src_app_core_enums_action_type__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/core/enums/action-type */ "./src/app/core/enums/action-type.ts");
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../base.component */ "./src/app/components/base.component.ts");
/* harmony import */ var src_app_core_enums_create_advanced_steps_indexes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/core/enums/create-advanced-steps-indexes */ "./src/app/core/enums/create-advanced-steps-indexes.ts");
/* harmony import */ var src_app_core_enums_create_basic_steps_indexes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/core/enums/create-basic-steps-indexes */ "./src/app/core/enums/create-basic-steps-indexes.ts");
/* harmony import */ var src_app_core_enums_create_routes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/core/enums/create-routes */ "./src/app/core/enums/create-routes.ts");
/* harmony import */ var src_app_core_utils_customValidators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/core/utils/customValidators */ "./src/app/core/utils/customValidators.ts");
/* harmony import */ var src_app_core_services_keys_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/core/services/keys.service */ "./src/app/core/services/keys.service.ts");
/* harmony import */ var src_app_core_store_action_action_actions__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/core/store/action/action.actions */ "./src/app/core/store/action/action.actions.ts");
/* harmony import */ var src_app_core_enums_shared_routes__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/core/enums/shared-routes */ "./src/app/core/enums/shared-routes.ts");
/* harmony import */ var src_app_core_utils_tooltip_messages__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/core/utils/tooltip.messages */ "./src/app/core/utils/tooltip.messages.ts");
/* harmony import */ var src_app_core_services_workflow_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! src/app/core/services/workflow.service */ "./src/app/core/services/workflow.service.ts");
/* harmony import */ var src_app_core_services_did_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! src/app/core/services/did.service */ "./src/app/core/services/did.service.ts");

















var EncryptKeysComponent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](EncryptKeysComponent, _super);
    function EncryptKeysComponent(didService, fb, router, store, keysService, workflowService) {
        var _this = _super.call(this) || this;
        _this.didService = didService;
        _this.fb = fb;
        _this.router = router;
        _this.store = store;
        _this.keysService = keysService;
        _this.workflowService = workflowService;
        _this.currentStepIndex = src_app_core_enums_create_advanced_steps_indexes__WEBPACK_IMPORTED_MODULE_7__["CreateAdvancedStepsIndexes"].EncryptKeys;
        _this.continueButtonText = 'Skip';
        return _this;
    }
    EncryptKeysComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription$ = this.store
            .pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_4__["select"])(function (state) { return state; }))
            .subscribe(function (state) {
            if (state.action.selectedAction === src_app_core_enums_action_type__WEBPACK_IMPORTED_MODULE_5__["ActionType"].CreateAdvanced) {
                _this.tooltipMessage = src_app_core_utils_tooltip_messages__WEBPACK_IMPORTED_MODULE_14__["TooltipMessages"].EncryptHeaderTooltipAdvancedMode;
                _this.boldPartTooltipMessage = src_app_core_utils_tooltip_messages__WEBPACK_IMPORTED_MODULE_14__["TooltipMessages"].EncryptHeaderBoldPartTooltipAdvancedMode;
            }
            else if (state.action.selectedAction === src_app_core_enums_action_type__WEBPACK_IMPORTED_MODULE_5__["ActionType"].CreateBasic) {
                _this.tooltipMessage = src_app_core_utils_tooltip_messages__WEBPACK_IMPORTED_MODULE_14__["TooltipMessages"].EncryptHeaderTooltipBasicMode;
                _this.boldPartTooltipMessage = src_app_core_utils_tooltip_messages__WEBPACK_IMPORTED_MODULE_14__["TooltipMessages"].EncryptHeaderBoldPartTooltipBasicMode;
            }
            if (state.form.publicKeys.length > 0 || state.form.authenticationKeys.length > 0) {
                _this.keysGenerated = true;
                _this.continueButtonText = 'Next';
            }
        });
        this.subscriptions.push(this.subscription$);
        this.encryptForm = this.fb.group({
            password: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            confirmPassword: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]]
        }, { validator: src_app_core_utils_customValidators__WEBPACK_IMPORTED_MODULE_10__["default"].passwordsDoMatch.bind(this) });
    };
    EncryptKeysComponent.prototype.encryptKeys = function () {
        var _this = this;
        if (this.encryptForm.invalid) {
            return;
        }
        this.keysService
            .encryptKeys(this.password.value)
            .subscribe(function (encryptedFile) {
            var parsedFile = JSON.parse(encryptedFile);
            parsedFile.encryptionAlgo = {
                name: 'AES-GCM',
                tagLength: 128
            };
            parsedFile.did = _this.didService.getId();
            _this.encryptedFile = JSON.stringify(parsedFile, null, 2);
            _this.encryptForm.reset();
        });
    };
    EncryptKeysComponent.prototype.downloadFile = function () {
        if (this.encryptedFile) {
            var downloader = document.createElement('a');
            document.body.appendChild(downloader);
            var blob = new Blob([this.encryptedFile], { type: 'text/json' });
            var url = window.URL;
            var fileUrl = url.createObjectURL(blob);
            downloader.setAttribute('href', fileUrl);
            var date = new Date();
            downloader.setAttribute('download', "paper-did-UTC--" + date.toISOString() + ".txt");
            downloader.click();
            this.fileDowloaded = true;
        }
    };
    EncryptKeysComponent.prototype.goToNext = function () {
        if (this.fileDowloaded || !this.keysGenerated) {
            var selectedAction = this.workflowService.getSelectedAction();
            if (selectedAction === src_app_core_enums_action_type__WEBPACK_IMPORTED_MODULE_5__["ActionType"].CreateAdvanced) {
                this.store.dispatch(new src_app_core_store_action_action_actions__WEBPACK_IMPORTED_MODULE_12__["MoveToStep"](src_app_core_enums_create_advanced_steps_indexes__WEBPACK_IMPORTED_MODULE_7__["CreateAdvancedStepsIndexes"].Summary));
            }
            else if (selectedAction === src_app_core_enums_action_type__WEBPACK_IMPORTED_MODULE_5__["ActionType"].CreateBasic) {
                this.store.dispatch(new src_app_core_store_action_action_actions__WEBPACK_IMPORTED_MODULE_12__["MoveToStep"](src_app_core_enums_create_basic_steps_indexes__WEBPACK_IMPORTED_MODULE_8__["CreateBasicStepsIndexes"].Summary));
            }
            this.router.navigate([src_app_core_enums_create_routes__WEBPACK_IMPORTED_MODULE_9__["CreateRoutes"].Summary]);
        }
    };
    EncryptKeysComponent.prototype.goToPrevious = function () {
        var selectedAction = this.workflowService.getSelectedAction();
        if (selectedAction === src_app_core_enums_action_type__WEBPACK_IMPORTED_MODULE_5__["ActionType"].CreateAdvanced) {
            this.store.dispatch(new src_app_core_store_action_action_actions__WEBPACK_IMPORTED_MODULE_12__["MoveToStep"](src_app_core_enums_create_advanced_steps_indexes__WEBPACK_IMPORTED_MODULE_7__["CreateAdvancedStepsIndexes"].Services));
            this.router.navigate([src_app_core_enums_create_routes__WEBPACK_IMPORTED_MODULE_9__["CreateRoutes"].Services]);
        }
        else if (selectedAction === src_app_core_enums_action_type__WEBPACK_IMPORTED_MODULE_5__["ActionType"].CreateBasic) {
            this.router.navigate([src_app_core_enums_shared_routes__WEBPACK_IMPORTED_MODULE_13__["SharedRoutes"].Action]);
        }
    };
    Object.defineProperty(EncryptKeysComponent.prototype, "password", {
        get: function () {
            return this.encryptForm.get('password');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EncryptKeysComponent.prototype, "confirmPassword", {
        get: function () {
            return this.encryptForm.get('confirmPassword');
        },
        enumerable: true,
        configurable: true
    });
    return EncryptKeysComponent;
}(_base_component__WEBPACK_IMPORTED_MODULE_6__["BaseComponent"]));



/***/ }),

/***/ "./src/app/components/create-did/public-keys/public-keys.component.ngfactory.js":
/*!**************************************************************************************!*\
  !*** ./src/app/components/create-did/public-keys/public-keys.component.ngfactory.js ***!
  \**************************************************************************************/
/*! exports provided: RenderType_PublicKeysComponent, View_PublicKeysComponent_0, View_PublicKeysComponent_Host_0, PublicKeysComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_PublicKeysComponent", function() { return RenderType_PublicKeysComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_PublicKeysComponent_0", function() { return View_PublicKeysComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_PublicKeysComponent_Host_0", function() { return View_PublicKeysComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PublicKeysComponentNgFactory", function() { return PublicKeysComponentNgFactory; });
/* harmony import */ var _public_keys_component_scss_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./public-keys.component.scss.ngstyle */ "./src/app/components/create-did/public-keys/public-keys.component.scss.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _node_modules_angular_bootstrap_md_angular_bootstrap_md_ngfactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/angular-bootstrap-md/angular-bootstrap-md.ngfactory */ "./node_modules/angular-bootstrap-md/angular-bootstrap-md.ngfactory.js");
/* harmony import */ var angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular-bootstrap-md */ "./node_modules/angular-bootstrap-md/fesm5/angular-bootstrap-md.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _public_keys_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./public-keys.component */ "./src/app/components/create-did/public-keys/public-keys.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var _core_services_keys_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../core/services/keys.service */ "./src/app/core/services/keys.service.ts");
/* harmony import */ var _core_services_did_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../core/services/did.service */ "./src/app/core/services/did.service.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 












var styles_PublicKeysComponent = [_public_keys_component_scss_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_PublicKeysComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 2, styles: styles_PublicKeysComponent, data: {} });

function View_PublicKeysComponent_1(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 23, "fieldset", [["class", "collapsible collapsed mb-5"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 4, "legend", [], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 7).toggle();
        var pd_0 = (_co.toggleKey(_v.context.$implicit.keyModel) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](2, null, [" ", " "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, null, null, 0, "i", [], [[8, "className", 0]], null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](4, 0, null, null, 1, "button", [["class", "btn btn-sm btn-danger pull-right"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.removeKey(_v.context.$implicit.keyModel) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](5, 0, null, null, 0, "span", [["class", "glyphicon glyphicon-remove"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](6, 0, null, null, 17, "div", [["mdbCollapse", ""]], [[40, "@expandBody", 0], [4, "overflow", null]], [["component", "@expandBody.done"]], function (_v, en, $event) { var ad = true; if (("component:@expandBody.done" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 7).onExpandBodyDone($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_bootstrap_md_angular_bootstrap_md_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_CollapseComponent_0"], _node_modules_angular_bootstrap_md_angular_bootstrap_md_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_CollapseComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](7, 114688, [[1, 4], ["collapse", 4]], 0, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_3__["CollapseComponent"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](8, 0, null, 0, 3, "div", [["class", "form-group"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](9, 0, null, null, 1, "label", [["class", "control-label"], ["for", "type"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Signature type"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](11, 0, null, null, 0, "input", [["class", "form-control input-md"], ["disabled", ""], ["id", "type"], ["type", "text"]], [[8, "value", 0]], null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](12, 0, null, 0, 3, "div", [["class", "form-group"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](13, 0, null, null, 1, "label", [["class", "control-label"], ["for", "controller"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Key controller"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](15, 0, null, null, 0, "input", [["class", "form-control input-md"], ["disabled", ""], ["id", "controller"], ["type", "text"]], [[8, "value", 0]], null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](16, 0, null, 0, 3, "div", [["class", "form-group"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](17, 0, null, null, 1, "label", [["class", "control-label"], ["for", "alias"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Alias"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](19, 0, null, null, 0, "input", [["class", "form-control input-md"], ["disabled", ""], ["id", "alias"], ["type", "text"]], [[8, "value", 0]], null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](20, 0, null, 0, 3, "div", [["class", "form-group"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](21, 0, null, null, 1, "label", [["class", "control-label"], ["for", "controller"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Key (Base58)"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](23, 0, null, null, 0, "input", [["class", "form-control input-md"], ["disabled", ""], ["id", "controller"], ["type", "text"]], [[8, "value", 0]], null, null, null, null))], function (_ck, _v) { _ck(_v, 7, 0); }, function (_ck, _v) { var currVal_0 = _v.context.$implicit.keyModel.alias; _ck(_v, 2, 0, currVal_0); var currVal_1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵinlineInterpolate"](1, "fas fa-caret-", _v.context.$implicit.iconPosition, " ml-2"); _ck(_v, 3, 0, currVal_1); var currVal_2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 7).expandAnimationState; var currVal_3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 7).overflow; _ck(_v, 6, 0, currVal_2, currVal_3); var currVal_4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵinlineInterpolate"](1, "", _v.context.$implicit.keyModel.type, ""); _ck(_v, 11, 0, currVal_4); var currVal_5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵinlineInterpolate"](1, "", _v.context.$implicit.keyModel.controller, ""); _ck(_v, 15, 0, currVal_5); var currVal_6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵinlineInterpolate"](1, "", _v.context.$implicit.keyModel.alias, ""); _ck(_v, 19, 0, currVal_6); var currVal_7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵinlineInterpolate"](1, "", _v.context.$implicit.keyModel.publicKey, ""); _ck(_v, 23, 0, currVal_7); }); }
function View_PublicKeysComponent_3(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Key controller is required!"]))], null, null); }
function View_PublicKeysComponent_4(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Key controller must be a valid DID!"]))], null, null); }
function View_PublicKeysComponent_2(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 4, "div", [["class", "invalid-feedback"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_PublicKeysComponent_3)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_PublicKeysComponent_4)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](4, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.controller["errors"].required; _ck(_v, 2, 0, currVal_0); var currVal_1 = _co.controller["errors"].pattern; _ck(_v, 4, 0, currVal_1); }, null); }
function View_PublicKeysComponent_6(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Alias is required!"]))], null, null); }
function View_PublicKeysComponent_7(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Alias must not be more than 32 characters long and must contain only lower-case letters, digits and hyphens!"]))], null, null); }
function View_PublicKeysComponent_8(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["You have already used this alias!"]))], null, null); }
function View_PublicKeysComponent_5(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 6, "div", [["class", "invalid-feedback"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_PublicKeysComponent_6)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_PublicKeysComponent_7)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](4, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_PublicKeysComponent_8)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](6, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.alias["errors"].required; _ck(_v, 2, 0, currVal_0); var currVal_1 = _co.alias["errors"].pattern; _ck(_v, 4, 0, currVal_1); var currVal_2 = _co.alias["errors"].taken; _ck(_v, 6, 0, currVal_2); }, null); }
function View_PublicKeysComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](671088640, 1, { collapses: 1 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 85, "div", [["class", "tab-pane fade in active"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](2, 0, null, null, 1, "h4", [["class", "head text-center"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Create public keys"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](4, 0, null, null, 0, "br", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](5, 0, null, null, 81, "div", [["class", "row"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](6, 0, null, null, 80, "div", [["class", "col-xs-offset-1 col-xs-10 col-sm-offset-3 col-sm-6"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_PublicKeysComponent_1)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](8, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["IterableDiffers"]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](9, 0, null, null, 66, "fieldset", [["class", "collapsible collapsed"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](10, 0, null, null, 1, "legend", [], null, [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 13).toggle() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Generate Public Key"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](12, 0, null, null, 63, "div", [["mdbCollapse", ""]], [[40, "@expandBody", 0], [4, "overflow", null]], [["component", "@expandBody.done"]], function (_v, en, $event) { var ad = true; if (("component:@expandBody.done" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 13).onExpandBodyDone($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_bootstrap_md_angular_bootstrap_md_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_CollapseComponent_0"], _node_modules_angular_bootstrap_md_angular_bootstrap_md_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_CollapseComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](13, 114688, [[1, 4], ["collapse", 4]], 0, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_3__["CollapseComponent"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](14, 0, null, 0, 61, "form", [["novalidate", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngSubmit"], [null, "submit"], [null, "reset"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("submit" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 16).onSubmit($event) !== false);
        ad = (pd_0 && ad);
    } if (("reset" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 16).onReset() !== false);
        ad = (pd_1 && ad);
    } if (("ngSubmit" === en)) {
        var pd_2 = (_co.generateKey() !== false);
        ad = (pd_2 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](15, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵangular_packages_forms_forms_bh"], [], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](16, 540672, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormGroupDirective"], [[8, null], [8, null]], { form: [0, "form"] }, { ngSubmit: "ngSubmit" }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ControlContainer"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormGroupDirective"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](18, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControlStatusGroup"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ControlContainer"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](19, 0, null, null, 18, "div", [["class", "form-group"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](20, 0, null, null, 3, "label", [["class", "control-label"], ["for", "type"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" Signature type "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](22, 16777216, null, null, 1, "i", [["class", "fas fa-info-circle fa-lg ml-4"], ["tooltipClass", "custom-tooltip"]], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](23, 212992, null, 0, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbTooltip"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ComponentFactoryResolver"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbTooltipConfig"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["DOCUMENT"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]], { tooltipClass: [0, "tooltipClass"], ngbTooltip: [1, "ngbTooltip"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](24, 0, null, null, 13, "select", [["class", "form-control"], ["formControlName", "type"], ["id", "type"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "change"], [null, "blur"]], function (_v, en, $event) { var ad = true; if (("change" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25).onChange($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 25).onTouched() !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](25, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["SelectControlValueAccessor"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NG_VALUE_ACCESSOR"], function (p0_0) { return [p0_0]; }, [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["SelectControlValueAccessor"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](27, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControlName"], [[3, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ControlContainer"]], [8, null], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NG_VALUE_ACCESSOR"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵangular_packages_forms_forms_k"]]], { name: [0, "name"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControlName"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](29, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControl"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](30, 0, null, null, 3, "option", [["value", "Ed25519"]], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](31, 147456, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgSelectOption"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["SelectControlValueAccessor"]]], { value: [0, "value"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](32, 147456, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵangular_packages_forms_forms_s"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], [8, null]], { value: [0, "value"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Ed25519"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](34, 0, null, null, 3, "option", [["value", "ECDSASecp256k1"]], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](35, 147456, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgSelectOption"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["SelectControlValueAccessor"]]], { value: [0, "value"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](36, 147456, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵangular_packages_forms_forms_s"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], [8, null]], { value: [0, "value"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["ECDSASecp256k1"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](38, 0, null, null, 16, "div", [["class", "form-group"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](39, 0, null, null, 3, "label", [["class", "control-label"], ["for", "controller"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" Key controller "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](41, 16777216, null, null, 1, "i", [["class", "fas fa-info-circle fa-lg ml-4"], ["tooltipClass", "custom-tooltip"]], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](42, 212992, null, 0, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbTooltip"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ComponentFactoryResolver"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbTooltipConfig"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["DOCUMENT"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]], { tooltipClass: [0, "tooltipClass"], ngbTooltip: [1, "ngbTooltip"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](43, 0, null, null, 9, "input", [["class", "form-control input-md"], ["formControlName", "controller"], ["id", "controller"], ["pattern", "^did:fctr:[abcdef0-9]{64}$"], ["placeholder", "Key controller"], ["type", "text"]], [[1, "pattern", 0], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"]], function (_v, en, $event) { var ad = true; if (("input" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 46)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 46).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 46)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 46)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](44, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgClass"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["IterableDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["KeyValueDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpod"](45, { "is-invalid": 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](46, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["DefaultValueAccessor"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["COMPOSITION_BUFFER_MODE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](47, 540672, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["PatternValidator"], [], { pattern: [0, "pattern"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NG_VALIDATORS"], function (p0_0) { return [p0_0]; }, [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["PatternValidator"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NG_VALUE_ACCESSOR"], function (p0_0) { return [p0_0]; }, [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["DefaultValueAccessor"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](50, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControlName"], [[3, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ControlContainer"]], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NG_VALIDATORS"]], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NG_VALUE_ACCESSOR"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵangular_packages_forms_forms_k"]]], { name: [0, "name"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControlName"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](52, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControl"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_PublicKeysComponent_2)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](54, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](55, 0, null, null, 16, "div", [["class", "form-group"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](56, 0, null, null, 3, "label", [["class", "control-label"], ["for", "alias"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" Alias "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](58, 16777216, null, null, 1, "i", [["class", "fas fa-info-circle fa-lg ml-4"], ["tooltipClass", "custom-tooltip"]], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](59, 212992, null, 0, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbTooltip"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ComponentFactoryResolver"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbTooltipConfig"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["DOCUMENT"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]], { tooltipClass: [0, "tooltipClass"], ngbTooltip: [1, "ngbTooltip"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](60, 0, null, null, 9, "input", [["class", "form-control input-md"], ["formControlName", "alias"], ["id", "alias"], ["pattern", "^[a-z0-9-]{1,32}$"], ["placeholder", "Alias"], ["type", "text"]], [[1, "pattern", 0], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"]], function (_v, en, $event) { var ad = true; if (("input" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 63)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 63).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 63)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 63)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](61, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgClass"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["IterableDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["KeyValueDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpod"](62, { "is-invalid": 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](63, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["DefaultValueAccessor"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["COMPOSITION_BUFFER_MODE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](64, 540672, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["PatternValidator"], [], { pattern: [0, "pattern"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NG_VALIDATORS"], function (p0_0) { return [p0_0]; }, [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["PatternValidator"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NG_VALUE_ACCESSOR"], function (p0_0) { return [p0_0]; }, [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["DefaultValueAccessor"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](67, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControlName"], [[3, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ControlContainer"]], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NG_VALIDATORS"]], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NG_VALUE_ACCESSOR"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵangular_packages_forms_forms_k"]]], { name: [0, "name"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControlName"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](69, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControl"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_PublicKeysComponent_5)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](71, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](72, 0, null, null, 3, "div", [["class", "form-group text-center"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](73, 0, null, null, 2, "input", [["color", "success"], ["mdbBtn", ""], ["mdbWavesEffect", ""], ["type", "submit"], ["value", "Generate key"]], [[8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 75).click($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](74, 81920, null, 0, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_3__["MdbBtnDirective"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]], { color: [0, "color"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](75, 16384, null, 0, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_3__["WavesDirective"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](76, 0, null, null, 10, "div", [["class", "row justify-content-between mt-4"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](77, 0, null, null, 4, "button", [["class", "btn-md-blue"], ["color", "primary"], ["mdbBtn", ""], ["mdbWavesEffect", ""], ["type", "button"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 79).click($event) !== false);
        ad = (pd_0 && ad);
    } if (("click" === en)) {
        var pd_1 = (_co.goToPrevious() !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](78, 81920, null, 0, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_3__["MdbBtnDirective"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]], { color: [0, "color"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](79, 16384, null, 0, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_3__["WavesDirective"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](80, 0, null, null, 0, "span", [["class", "glyphicon glyphicon-arrow-left mr-3"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" Back"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](82, 0, null, null, 4, "button", [["class", "btn-md-blue"], ["color", "primary"], ["mdbBtn", ""], ["mdbWavesEffect", ""], ["type", "button"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 84).click($event) !== false);
        ad = (pd_0 && ad);
    } if (("click" === en)) {
        var pd_1 = (_co.goToNext() !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](83, 81920, null, 0, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_3__["MdbBtnDirective"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]], { color: [0, "color"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](84, 16384, null, 0, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_3__["WavesDirective"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](85, null, [" ", " "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](86, 0, null, null, 0, "span", [["class", "glyphicon glyphicon-arrow-right ml-3"]], null, null, null, null, null))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.publicKeys; _ck(_v, 8, 0, currVal_0); _ck(_v, 13, 0); var currVal_10 = _co.keyForm; _ck(_v, 16, 0, currVal_10); var currVal_11 = "custom-tooltip"; var currVal_12 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵinlineInterpolate"](1, "", _co.signatureTypeTooltipMessage, ""); _ck(_v, 23, 0, currVal_11, currVal_12); var currVal_20 = "type"; _ck(_v, 27, 0, currVal_20); var currVal_21 = "Ed25519"; _ck(_v, 31, 0, currVal_21); var currVal_22 = "Ed25519"; _ck(_v, 32, 0, currVal_22); var currVal_23 = "ECDSASecp256k1"; _ck(_v, 35, 0, currVal_23); var currVal_24 = "ECDSASecp256k1"; _ck(_v, 36, 0, currVal_24); var currVal_25 = "custom-tooltip"; var currVal_26 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵinlineInterpolate"](1, "", _co.controllerTooltipMessage, ""); _ck(_v, 42, 0, currVal_25, currVal_26); var currVal_35 = "form-control input-md"; var currVal_36 = _ck(_v, 45, 0, (_co.controller.touched && _co.controller.errors)); _ck(_v, 44, 0, currVal_35, currVal_36); var currVal_37 = "^did:fctr:[abcdef0-9]{64}$"; _ck(_v, 47, 0, currVal_37); var currVal_38 = "controller"; _ck(_v, 50, 0, currVal_38); var currVal_39 = _co.controller.errors; _ck(_v, 54, 0, currVal_39); var currVal_40 = "custom-tooltip"; var currVal_41 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵinlineInterpolate"](1, "", _co.aliasTooltipMessage, ""); _ck(_v, 59, 0, currVal_40, currVal_41); var currVal_50 = "form-control input-md"; var currVal_51 = _ck(_v, 62, 0, (_co.alias.touched && _co.alias.errors)); _ck(_v, 61, 0, currVal_50, currVal_51); var currVal_52 = "^[a-z0-9-]{1,32}$"; _ck(_v, 64, 0, currVal_52); var currVal_53 = "alias"; _ck(_v, 67, 0, currVal_53); var currVal_54 = _co.alias.errors; _ck(_v, 71, 0, currVal_54); var currVal_56 = "success"; _ck(_v, 74, 0, currVal_56); var currVal_57 = "primary"; _ck(_v, 78, 0, currVal_57); var currVal_58 = "primary"; _ck(_v, 83, 0, currVal_58); }, function (_ck, _v) { var _co = _v.component; var currVal_1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 13).expandAnimationState; var currVal_2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 13).overflow; _ck(_v, 12, 0, currVal_1, currVal_2); var currVal_3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18).ngClassUntouched; var currVal_4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18).ngClassTouched; var currVal_5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18).ngClassPristine; var currVal_6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18).ngClassDirty; var currVal_7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18).ngClassValid; var currVal_8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18).ngClassInvalid; var currVal_9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18).ngClassPending; _ck(_v, 14, 0, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9); var currVal_13 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 29).ngClassUntouched; var currVal_14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 29).ngClassTouched; var currVal_15 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 29).ngClassPristine; var currVal_16 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 29).ngClassDirty; var currVal_17 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 29).ngClassValid; var currVal_18 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 29).ngClassInvalid; var currVal_19 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 29).ngClassPending; _ck(_v, 24, 0, currVal_13, currVal_14, currVal_15, currVal_16, currVal_17, currVal_18, currVal_19); var currVal_27 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 47).pattern ? _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 47).pattern : null); var currVal_28 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 52).ngClassUntouched; var currVal_29 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 52).ngClassTouched; var currVal_30 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 52).ngClassPristine; var currVal_31 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 52).ngClassDirty; var currVal_32 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 52).ngClassValid; var currVal_33 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 52).ngClassInvalid; var currVal_34 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 52).ngClassPending; _ck(_v, 43, 0, currVal_27, currVal_28, currVal_29, currVal_30, currVal_31, currVal_32, currVal_33, currVal_34); var currVal_42 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 64).pattern ? _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 64).pattern : null); var currVal_43 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 69).ngClassUntouched; var currVal_44 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 69).ngClassTouched; var currVal_45 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 69).ngClassPristine; var currVal_46 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 69).ngClassDirty; var currVal_47 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 69).ngClassValid; var currVal_48 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 69).ngClassInvalid; var currVal_49 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 69).ngClassPending; _ck(_v, 60, 0, currVal_42, currVal_43, currVal_44, currVal_45, currVal_46, currVal_47, currVal_48, currVal_49); var currVal_55 = _co.keyForm.invalid; _ck(_v, 73, 0, currVal_55); var currVal_59 = _co.continueButtonText; _ck(_v, 85, 0, currVal_59); }); }
function View_PublicKeysComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "app-public-keys", [], null, null, null, View_PublicKeysComponent_0, RenderType_PublicKeysComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 4440064, null, 0, _public_keys_component__WEBPACK_IMPORTED_MODULE_7__["PublicKeysComponent"], [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_8__["Router"], _ngrx_store__WEBPACK_IMPORTED_MODULE_9__["Store"], _core_services_keys_service__WEBPACK_IMPORTED_MODULE_10__["KeysService"], _core_services_did_service__WEBPACK_IMPORTED_MODULE_11__["DIDService"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var PublicKeysComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("app-public-keys", _public_keys_component__WEBPACK_IMPORTED_MODULE_7__["PublicKeysComponent"], View_PublicKeysComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/components/create-did/public-keys/public-keys.component.scss.ngstyle.js":
/*!*****************************************************************************************!*\
  !*** ./src/app/components/create-did/public-keys/public-keys.component.scss.ngstyle.js ***!
  \*****************************************************************************************/
/*! exports provided: styles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwdWJsaWMta2V5cy9wdWJsaWMta2V5cy5jb21wb25lbnQuc2NzcyJ9 */"];



/***/ }),

/***/ "./src/app/components/create-did/public-keys/public-keys.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/components/create-did/public-keys/public-keys.component.ts ***!
  \****************************************************************************/
/*! exports provided: PublicKeysComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PublicKeysComponent", function() { return PublicKeysComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular-bootstrap-md */ "./node_modules/angular-bootstrap-md/fesm5/angular-bootstrap-md.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var src_app_core_store_form_form_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/core/store/form/form.actions */ "./src/app/core/store/form/form.actions.ts");
/* harmony import */ var src_app_components_base_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/components/base.component */ "./src/app/components/base.component.ts");
/* harmony import */ var src_app_core_models_component_key_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/core/models/component-key.model */ "./src/app/core/models/component-key.model.ts");
/* harmony import */ var src_app_core_enums_create_routes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/core/enums/create-routes */ "./src/app/core/enums/create-routes.ts");
/* harmony import */ var src_app_core_enums_create_advanced_steps_indexes__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/core/enums/create-advanced-steps-indexes */ "./src/app/core/enums/create-advanced-steps-indexes.ts");
/* harmony import */ var src_app_core_utils_customValidators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/core/utils/customValidators */ "./src/app/core/utils/customValidators.ts");
/* harmony import */ var src_app_core_services_did_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/core/services/did.service */ "./src/app/core/services/did.service.ts");
/* harmony import */ var src_app_core_services_keys_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/core/services/keys.service */ "./src/app/core/services/keys.service.ts");
/* harmony import */ var src_app_core_models_key_model__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/core/models/key.model */ "./src/app/core/models/key.model.ts");
/* harmony import */ var src_app_core_store_action_action_actions__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! src/app/core/store/action/action.actions */ "./src/app/core/store/action/action.actions.ts");
/* harmony import */ var src_app_core_enums_shared_routes__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! src/app/core/enums/shared-routes */ "./src/app/core/enums/shared-routes.ts");
/* harmony import */ var src_app_core_enums_signature_type__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! src/app/core/enums/signature-type */ "./src/app/core/enums/signature-type.ts");
/* harmony import */ var src_app_core_utils_tooltip_messages__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! src/app/core/utils/tooltip.messages */ "./src/app/core/utils/tooltip.messages.ts");



















var UP_POSITION = 'up';
var DOWN_POSITION = 'down';
var PublicKeysComponent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](PublicKeysComponent, _super);
    function PublicKeysComponent(fb, router, store, keysService, didService) {
        var _this = _super.call(this) || this;
        _this.fb = fb;
        _this.router = router;
        _this.store = store;
        _this.keysService = keysService;
        _this.didService = didService;
        _this.authenticationKeys = [];
        _this.publicKeys = [];
        _this.aliasTooltipMessage = src_app_core_utils_tooltip_messages__WEBPACK_IMPORTED_MODULE_18__["TooltipMessages"].AliasTooltip;
        _this.controllerTooltipMessage = src_app_core_utils_tooltip_messages__WEBPACK_IMPORTED_MODULE_18__["TooltipMessages"].ControllerTooltip;
        _this.signatureTypeTooltipMessage = src_app_core_utils_tooltip_messages__WEBPACK_IMPORTED_MODULE_18__["TooltipMessages"].SignatureTypeTooltip;
        return _this;
    }
    PublicKeysComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription$ = this.store
            .pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_5__["select"])(function (state) { return state; }))
            .subscribe(function (state) {
            _this.publicKeys = state.form.publicKeys.map(function (key) { return new src_app_core_models_component_key_model__WEBPACK_IMPORTED_MODULE_8__["ComponentKeyModel"](key, DOWN_POSITION); });
            _this.authenticationKeys = state.form.authenticationKeys;
            _this.continueButtonText = _this.publicKeys.length > 0 ? 'Next' : 'Skip';
        });
        this.subscriptions.push(this.subscription$);
        this.didId = this.didService.getId();
        this.createForm();
    };
    PublicKeysComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.collapses.forEach(function (collapse, index) {
                if (index === _this.collapses.length - 1) {
                    collapse.toggle();
                }
            });
        });
    };
    PublicKeysComponent.prototype.createForm = function () {
        this.keyForm = this.fb.group({
            type: [src_app_core_enums_signature_type__WEBPACK_IMPORTED_MODULE_17__["SignatureType"].EdDSA, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]],
            controller: [this.didId, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]],
            alias: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, src_app_core_utils_customValidators__WEBPACK_IMPORTED_MODULE_11__["default"].uniqueKeyAlias(this.publicKeys.map(function (key) { return key.keyModel; }), this.authenticationKeys)]]
        });
    };
    PublicKeysComponent.prototype.generateKey = function () {
        if (this.keyForm.invalid) {
            return;
        }
        var keyPair = this.keysService.generateKeyPair(this.type.value);
        var generatedKey = new src_app_core_models_key_model__WEBPACK_IMPORTED_MODULE_14__["KeyModel"](this.alias.value, this.type.value, this.controller.value, keyPair.publicKey, keyPair.privateKey);
        this.store.dispatch(new src_app_core_store_form_form_actions__WEBPACK_IMPORTED_MODULE_6__["AddPublicKey"](generatedKey));
        this.createForm();
    };
    PublicKeysComponent.prototype.removeKey = function (key) {
        this.store.dispatch(new src_app_core_store_form_form_actions__WEBPACK_IMPORTED_MODULE_6__["RemovePublicKey"](key));
        this.createForm();
    };
    PublicKeysComponent.prototype.toggleKey = function (keyModel) {
        var publicKey = this.publicKeys.find(function (k) { return k.keyModel === keyModel; });
        publicKey.iconPosition = publicKey.iconPosition === DOWN_POSITION ? UP_POSITION : DOWN_POSITION;
    };
    PublicKeysComponent.prototype.goToNext = function () {
        this.store.dispatch(new src_app_core_store_action_action_actions__WEBPACK_IMPORTED_MODULE_15__["MoveToStep"](src_app_core_enums_create_advanced_steps_indexes__WEBPACK_IMPORTED_MODULE_10__["CreateAdvancedStepsIndexes"].AuthenticationKeys));
        this.router.navigate([src_app_core_enums_create_routes__WEBPACK_IMPORTED_MODULE_9__["CreateRoutes"].AuthenticationKeys]);
    };
    PublicKeysComponent.prototype.goToPrevious = function () {
        this.router.navigate([src_app_core_enums_shared_routes__WEBPACK_IMPORTED_MODULE_16__["SharedRoutes"].Action]);
    };
    Object.defineProperty(PublicKeysComponent.prototype, "type", {
        get: function () {
            return this.keyForm.get('type');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PublicKeysComponent.prototype, "alias", {
        get: function () {
            return this.keyForm.get('alias');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PublicKeysComponent.prototype, "controller", {
        get: function () {
            return this.keyForm.get('controller');
        },
        enumerable: true,
        configurable: true
    });
    return PublicKeysComponent;
}(src_app_components_base_component__WEBPACK_IMPORTED_MODULE_7__["BaseComponent"]));



/***/ }),

/***/ "./src/app/components/create-did/services/services.component.ngfactory.js":
/*!********************************************************************************!*\
  !*** ./src/app/components/create-did/services/services.component.ngfactory.js ***!
  \********************************************************************************/
/*! exports provided: RenderType_ServicesComponent, View_ServicesComponent_0, View_ServicesComponent_Host_0, ServicesComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_ServicesComponent", function() { return RenderType_ServicesComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_ServicesComponent_0", function() { return View_ServicesComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_ServicesComponent_Host_0", function() { return View_ServicesComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServicesComponentNgFactory", function() { return ServicesComponentNgFactory; });
/* harmony import */ var _services_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services.component.scss.shim.ngstyle */ "./src/app/components/create-did/services/services.component.scss.shim.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _node_modules_angular_bootstrap_md_angular_bootstrap_md_ngfactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/angular-bootstrap-md/angular-bootstrap-md.ngfactory */ "./node_modules/angular-bootstrap-md/angular-bootstrap-md.ngfactory.js");
/* harmony import */ var angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular-bootstrap-md */ "./node_modules/angular-bootstrap-md/fesm5/angular-bootstrap-md.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _services_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./services.component */ "./src/app/components/create-did/services/services.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 










var styles_ServicesComponent = [_services_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_ServicesComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 0, styles: styles_ServicesComponent, data: {} });

function View_ServicesComponent_1(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](0, null, ["", " "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 1, "b", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](2, null, ["", ""]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.headerTooltipMessage; _ck(_v, 0, 0, currVal_0); var currVal_1 = _co.headerBoldPartTooltipMessage; _ck(_v, 2, 0, currVal_1); }); }
function View_ServicesComponent_2(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 19, "fieldset", [["class", "collapsible collapsed mb-5"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 4, "legend", [], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 7).toggle();
        var pd_0 = (_co.toggleService(_v.context.$implicit.serviceModel) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](2, null, [" ", " "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, null, null, 0, "i", [], [[8, "className", 0]], null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](4, 0, null, null, 1, "button", [["class", "btn btn-sm btn-danger pull-right"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.removeService(_v.context.$implicit.serviceModel) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](5, 0, null, null, 0, "span", [["class", "glyphicon glyphicon-remove"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](6, 0, null, null, 13, "div", [["mdbCollapse", ""]], [[40, "@expandBody", 0], [4, "overflow", null]], [["component", "@expandBody.done"]], function (_v, en, $event) { var ad = true; if (("component:@expandBody.done" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 7).onExpandBodyDone($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_bootstrap_md_angular_bootstrap_md_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_CollapseComponent_0"], _node_modules_angular_bootstrap_md_angular_bootstrap_md_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_CollapseComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](7, 114688, [[1, 4], ["collapse", 4]], 0, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_3__["CollapseComponent"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](8, 0, null, 0, 3, "div", [["class", "form-group"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](9, 0, null, null, 1, "label", [["class", "control-label"], ["for", "type"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Service type"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](11, 0, null, null, 0, "input", [["class", "form-control input-md"], ["disabled", ""], ["id", "type"], ["type", "text"]], [[8, "value", 0]], null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](12, 0, null, 0, 3, "div", [["class", "form-group"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](13, 0, null, null, 1, "label", [["class", "control-label"], ["for", "endpoint"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Service endpoint"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](15, 0, null, null, 0, "input", [["class", "form-control input-md"], ["disabled", ""], ["id", "endpoint"], ["type", "text"]], [[8, "value", 0]], null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](16, 0, null, 0, 3, "div", [["class", "form-group"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](17, 0, null, null, 1, "label", [["class", "control-label"], ["for", "alias"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Alias"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](19, 0, null, null, 0, "input", [["class", "form-control input-md"], ["disabled", ""], ["id", "alias"], ["type", "text"]], [[8, "value", 0]], null, null, null, null))], function (_ck, _v) { _ck(_v, 7, 0); }, function (_ck, _v) { var currVal_0 = _v.context.$implicit.serviceModel.alias; _ck(_v, 2, 0, currVal_0); var currVal_1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵinlineInterpolate"](1, "fas fa-caret-", _v.context.$implicit.iconPosition, " ml-2"); _ck(_v, 3, 0, currVal_1); var currVal_2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 7).expandAnimationState; var currVal_3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 7).overflow; _ck(_v, 6, 0, currVal_2, currVal_3); var currVal_4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵinlineInterpolate"](1, "", _v.context.$implicit.serviceModel.type, ""); _ck(_v, 11, 0, currVal_4); var currVal_5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵinlineInterpolate"](1, "", _v.context.$implicit.serviceModel.endpoint, ""); _ck(_v, 15, 0, currVal_5); var currVal_6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵinlineInterpolate"](1, "", _v.context.$implicit.serviceModel.alias, ""); _ck(_v, 19, 0, currVal_6); }); }
function View_ServicesComponent_4(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Service type is required!"]))], null, null); }
function View_ServicesComponent_3(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "div", [["class", "invalid-feedback"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_ServicesComponent_4)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.type["errors"].required; _ck(_v, 2, 0, currVal_0); }, null); }
function View_ServicesComponent_6(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Service endpoint is required!"]))], null, null); }
function View_ServicesComponent_7(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Service endpoint must be a valid URL address starting with http:// or https://"]))], null, null); }
function View_ServicesComponent_5(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 4, "div", [["class", "invalid-feedback"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_ServicesComponent_6)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_ServicesComponent_7)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](4, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.endpoint["errors"].required; _ck(_v, 2, 0, currVal_0); var currVal_1 = _co.endpoint["errors"].pattern; _ck(_v, 4, 0, currVal_1); }, null); }
function View_ServicesComponent_9(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Alias is required!"]))], null, null); }
function View_ServicesComponent_10(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Alias must not be more than 32 characters long and must contain only lower-case letters, digits and hyphens!"]))], null, null); }
function View_ServicesComponent_11(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["You have already used this alias!"]))], null, null); }
function View_ServicesComponent_8(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 6, "div", [["class", "invalid-feedback"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_ServicesComponent_9)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_ServicesComponent_10)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](4, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_ServicesComponent_11)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](6, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.alias["errors"].required; _ck(_v, 2, 0, currVal_0); var currVal_1 = _co.alias["errors"].pattern; _ck(_v, 4, 0, currVal_1); var currVal_2 = _co.alias["errors"].taken; _ck(_v, 6, 0, currVal_2); }, null); }
function View_ServicesComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](671088640, 1, { collapses: 1 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 82, "div", [["class", "tab-pane fade in active"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](2, 0, null, null, 4, "h4", [["class", "head text-center"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" Add services "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](0, [["tipContent", 2]], null, 0, null, View_ServicesComponent_1)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](5, 16777216, null, null, 1, "i", [["class", "fas fa-info-circle fa-sm ml-4"], ["tooltipClass", "custom-tooltip"]], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](6, 212992, null, 0, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbTooltip"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ComponentFactoryResolver"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbTooltipConfig"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["DOCUMENT"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]], { tooltipClass: [0, "tooltipClass"], ngbTooltip: [1, "ngbTooltip"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](7, 0, null, null, 0, "br", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](8, 0, null, null, 75, "div", [["class", "row"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](9, 0, null, null, 74, "div", [["class", "col-xs-offset-1 col-xs-10 col-sm-offset-3 col-sm-6"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_ServicesComponent_2)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](11, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["IterableDiffers"]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](12, 0, null, null, 60, "fieldset", [["class", "collapsible collapsed"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](13, 0, null, null, 1, "legend", [], null, [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 16).toggle() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Add service"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](15, 0, null, null, 57, "div", [["mdbCollapse", ""]], [[40, "@expandBody", 0], [4, "overflow", null]], [["component", "@expandBody.done"]], function (_v, en, $event) { var ad = true; if (("component:@expandBody.done" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 16).onExpandBodyDone($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, _node_modules_angular_bootstrap_md_angular_bootstrap_md_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_CollapseComponent_0"], _node_modules_angular_bootstrap_md_angular_bootstrap_md_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_CollapseComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](16, 114688, [[1, 4], ["collapse", 4]], 0, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_3__["CollapseComponent"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](17, 0, null, 0, 55, "form", [["novalidate", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngSubmit"], [null, "submit"], [null, "reset"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("submit" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 19).onSubmit($event) !== false);
        ad = (pd_0 && ad);
    } if (("reset" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 19).onReset() !== false);
        ad = (pd_1 && ad);
    } if (("ngSubmit" === en)) {
        var pd_2 = (_co.addService() !== false);
        ad = (pd_2 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](18, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ɵangular_packages_forms_forms_bh"], [], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](19, 540672, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormGroupDirective"], [[8, null], [8, null]], { form: [0, "form"] }, { ngSubmit: "ngSubmit" }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ControlContainer"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormGroupDirective"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](21, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgControlStatusGroup"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ControlContainer"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](22, 0, null, null, 14, "div", [["class", "form-group"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](23, 0, null, null, 3, "label", [["class", "control-label"], ["for", "type"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" Service type "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](25, 16777216, null, null, 1, "i", [["class", "fas fa-info-circle fa-lg ml-4"], ["tooltipClass", "custom-tooltip"]], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](26, 212992, null, 0, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbTooltip"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ComponentFactoryResolver"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbTooltipConfig"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["DOCUMENT"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]], { tooltipClass: [0, "tooltipClass"], ngbTooltip: [1, "ngbTooltip"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](27, 0, null, null, 7, "input", [["class", "form-control input-md"], ["formControlName", "type"], ["id", "type"], ["placeholder", "Service type"], ["type", "text"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"]], function (_v, en, $event) { var ad = true; if (("input" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 30)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 30).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 30)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 30)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](28, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgClass"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["IterableDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["KeyValueDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpod"](29, { "is-invalid": 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](30, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["DefaultValueAccessor"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["COMPOSITION_BUFFER_MODE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NG_VALUE_ACCESSOR"], function (p0_0) { return [p0_0]; }, [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["DefaultValueAccessor"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](32, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControlName"], [[3, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ControlContainer"]], [8, null], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NG_VALUE_ACCESSOR"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ɵangular_packages_forms_forms_k"]]], { name: [0, "name"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControlName"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](34, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgControl"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_ServicesComponent_3)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](36, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](37, 0, null, null, 16, "div", [["class", "form-group"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](38, 0, null, null, 3, "label", [["class", "control-label"], ["for", "endpoint"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" Service endpoint "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](40, 16777216, null, null, 1, "i", [["class", "fas fa-info-circle fa-lg ml-4"], ["tooltipClass", "custom-tooltip"]], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](41, 212992, null, 0, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbTooltip"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ComponentFactoryResolver"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbTooltipConfig"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["DOCUMENT"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]], { tooltipClass: [0, "tooltipClass"], ngbTooltip: [1, "ngbTooltip"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](42, 0, null, null, 9, "input", [["class", "form-control input-md"], ["formControlName", "endpoint"], ["id", "endpoint"], ["pattern", "^(http|https):\\/\\/(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?(\\/|\\/([\\w#!:.?+=&%@!\\-\\/]))?$"], ["placeholder", "Service endpoint"], ["type", "text"]], [[1, "pattern", 0], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"]], function (_v, en, $event) { var ad = true; if (("input" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 45)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 45).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 45)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 45)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](43, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgClass"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["IterableDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["KeyValueDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpod"](44, { "is-invalid": 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](45, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["DefaultValueAccessor"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["COMPOSITION_BUFFER_MODE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](46, 540672, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["PatternValidator"], [], { pattern: [0, "pattern"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NG_VALIDATORS"], function (p0_0) { return [p0_0]; }, [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["PatternValidator"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NG_VALUE_ACCESSOR"], function (p0_0) { return [p0_0]; }, [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["DefaultValueAccessor"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](49, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControlName"], [[3, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ControlContainer"]], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NG_VALIDATORS"]], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NG_VALUE_ACCESSOR"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ɵangular_packages_forms_forms_k"]]], { name: [0, "name"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControlName"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](51, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgControl"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_ServicesComponent_5)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](53, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](54, 0, null, null, 14, "div", [["class", "form-group"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](55, 0, null, null, 1, "label", [["class", "control-label"], ["for", "alias"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Alias"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](57, 0, null, null, 9, "input", [["class", "form-control input-md"], ["formControlName", "alias"], ["id", "alias"], ["pattern", "^[a-z0-9-]{1,32}$"], ["placeholder", "Alias"], ["type", "text"]], [[1, "pattern", 0], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"]], function (_v, en, $event) { var ad = true; if (("input" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 60)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 60).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 60)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 60)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](58, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgClass"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["IterableDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["KeyValueDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpod"](59, { "is-invalid": 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](60, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["DefaultValueAccessor"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["COMPOSITION_BUFFER_MODE"]]], null, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](61, 540672, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["PatternValidator"], [], { pattern: [0, "pattern"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NG_VALIDATORS"], function (p0_0) { return [p0_0]; }, [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["PatternValidator"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](1024, null, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NG_VALUE_ACCESSOR"], function (p0_0) { return [p0_0]; }, [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["DefaultValueAccessor"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](64, 671744, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControlName"], [[3, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ControlContainer"]], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NG_VALIDATORS"]], [8, null], [6, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NG_VALUE_ACCESSOR"]], [2, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ɵangular_packages_forms_forms_k"]]], { name: [0, "name"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵprd"](2048, null, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgControl"], null, [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControlName"]]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](66, 16384, null, 0, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgControlStatus"], [[4, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgControl"]]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_ServicesComponent_8)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](68, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](69, 0, null, null, 3, "div", [["class", "form-group text-center"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](70, 0, null, null, 2, "input", [["color", "success"], ["mdbBtn", ""], ["mdbWavesEffect", ""], ["type", "submit"], ["value", "Add service"]], [[8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 72).click($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](71, 81920, null, 0, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_3__["MdbBtnDirective"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]], { color: [0, "color"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](72, 16384, null, 0, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_3__["WavesDirective"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](73, 0, null, null, 10, "div", [["class", "row justify-content-between mt-4"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](74, 0, null, null, 4, "button", [["class", "btn-md-blue"], ["color", "primary"], ["mdbBtn", ""], ["mdbWavesEffect", ""], ["type", "button"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 76).click($event) !== false);
        ad = (pd_0 && ad);
    } if (("click" === en)) {
        var pd_1 = (_co.goToPrevious() !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](75, 81920, null, 0, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_3__["MdbBtnDirective"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]], { color: [0, "color"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](76, 16384, null, 0, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_3__["WavesDirective"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](77, 0, null, null, 0, "span", [["class", "glyphicon glyphicon-arrow-left mr-3"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" Back"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](79, 0, null, null, 4, "button", [["class", "btn-md-blue"], ["color", "primary"], ["mdbBtn", ""], ["mdbWavesEffect", ""], ["type", "button"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 81).click($event) !== false);
        ad = (pd_0 && ad);
    } if (("click" === en)) {
        var pd_1 = (_co.goToNext() !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](80, 81920, null, 0, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_3__["MdbBtnDirective"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]], { color: [0, "color"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](81, 16384, null, 0, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_3__["WavesDirective"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](82, null, [" ", " "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](83, 0, null, null, 0, "span", [["class", "glyphicon glyphicon-arrow-right ml-3"]], null, null, null, null, null))], function (_ck, _v) { var _co = _v.component; var currVal_0 = "custom-tooltip"; var currVal_1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 4); _ck(_v, 6, 0, currVal_0, currVal_1); var currVal_2 = _co.services; _ck(_v, 11, 0, currVal_2); _ck(_v, 16, 0); var currVal_12 = _co.serviceForm; _ck(_v, 19, 0, currVal_12); var currVal_13 = "custom-tooltip"; var currVal_14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵinlineInterpolate"](1, "", _co.typeTooltipMessage, ""); _ck(_v, 26, 0, currVal_13, currVal_14); var currVal_22 = "form-control input-md"; var currVal_23 = _ck(_v, 29, 0, (_co.type.touched && _co.type.errors)); _ck(_v, 28, 0, currVal_22, currVal_23); var currVal_24 = "type"; _ck(_v, 32, 0, currVal_24); var currVal_25 = _co.type.errors; _ck(_v, 36, 0, currVal_25); var currVal_26 = "custom-tooltip"; var currVal_27 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵinlineInterpolate"](1, "", _co.endpointTooltipMessage, ""); _ck(_v, 41, 0, currVal_26, currVal_27); var currVal_36 = "form-control input-md"; var currVal_37 = _ck(_v, 44, 0, (_co.endpoint.touched && _co.endpoint.errors)); _ck(_v, 43, 0, currVal_36, currVal_37); var currVal_38 = "^(http|https):\\/\\/(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?(\\/|\\/([\\w#!:.?+=&%@!\\-\\/]))?$"; _ck(_v, 46, 0, currVal_38); var currVal_39 = "endpoint"; _ck(_v, 49, 0, currVal_39); var currVal_40 = _co.endpoint.errors; _ck(_v, 53, 0, currVal_40); var currVal_49 = "form-control input-md"; var currVal_50 = _ck(_v, 59, 0, (_co.alias.touched && _co.alias.errors)); _ck(_v, 58, 0, currVal_49, currVal_50); var currVal_51 = "^[a-z0-9-]{1,32}$"; _ck(_v, 61, 0, currVal_51); var currVal_52 = "alias"; _ck(_v, 64, 0, currVal_52); var currVal_53 = _co.alias.errors; _ck(_v, 68, 0, currVal_53); var currVal_55 = "success"; _ck(_v, 71, 0, currVal_55); var currVal_56 = "primary"; _ck(_v, 75, 0, currVal_56); var currVal_57 = "primary"; _ck(_v, 80, 0, currVal_57); }, function (_ck, _v) { var _co = _v.component; var currVal_3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 16).expandAnimationState; var currVal_4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 16).overflow; _ck(_v, 15, 0, currVal_3, currVal_4); var currVal_5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 21).ngClassUntouched; var currVal_6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 21).ngClassTouched; var currVal_7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 21).ngClassPristine; var currVal_8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 21).ngClassDirty; var currVal_9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 21).ngClassValid; var currVal_10 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 21).ngClassInvalid; var currVal_11 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 21).ngClassPending; _ck(_v, 17, 0, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9, currVal_10, currVal_11); var currVal_15 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 34).ngClassUntouched; var currVal_16 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 34).ngClassTouched; var currVal_17 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 34).ngClassPristine; var currVal_18 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 34).ngClassDirty; var currVal_19 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 34).ngClassValid; var currVal_20 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 34).ngClassInvalid; var currVal_21 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 34).ngClassPending; _ck(_v, 27, 0, currVal_15, currVal_16, currVal_17, currVal_18, currVal_19, currVal_20, currVal_21); var currVal_28 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 46).pattern ? _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 46).pattern : null); var currVal_29 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 51).ngClassUntouched; var currVal_30 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 51).ngClassTouched; var currVal_31 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 51).ngClassPristine; var currVal_32 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 51).ngClassDirty; var currVal_33 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 51).ngClassValid; var currVal_34 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 51).ngClassInvalid; var currVal_35 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 51).ngClassPending; _ck(_v, 42, 0, currVal_28, currVal_29, currVal_30, currVal_31, currVal_32, currVal_33, currVal_34, currVal_35); var currVal_41 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 61).pattern ? _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 61).pattern : null); var currVal_42 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 66).ngClassUntouched; var currVal_43 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 66).ngClassTouched; var currVal_44 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 66).ngClassPristine; var currVal_45 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 66).ngClassDirty; var currVal_46 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 66).ngClassValid; var currVal_47 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 66).ngClassInvalid; var currVal_48 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 66).ngClassPending; _ck(_v, 57, 0, currVal_41, currVal_42, currVal_43, currVal_44, currVal_45, currVal_46, currVal_47, currVal_48); var currVal_54 = _co.serviceForm.invalid; _ck(_v, 70, 0, currVal_54); var currVal_58 = _co.continueButtonText; _ck(_v, 82, 0, currVal_58); }); }
function View_ServicesComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "app-services", [], null, null, null, View_ServicesComponent_0, RenderType_ServicesComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 4440064, null, 0, _services_component__WEBPACK_IMPORTED_MODULE_7__["ServicesComponent"], [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_8__["Router"], _ngrx_store__WEBPACK_IMPORTED_MODULE_9__["Store"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var ServicesComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("app-services", _services_component__WEBPACK_IMPORTED_MODULE_7__["ServicesComponent"], View_ServicesComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/components/create-did/services/services.component.scss.shim.ngstyle.js":
/*!****************************************************************************************!*\
  !*** ./src/app/components/create-did/services/services.component.scss.shim.ngstyle.js ***!
  \****************************************************************************************/
/*! exports provided: styles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzZXJ2aWNlcy9zZXJ2aWNlcy5jb21wb25lbnQuc2NzcyJ9 */"];



/***/ }),

/***/ "./src/app/components/create-did/services/services.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/components/create-did/services/services.component.ts ***!
  \**********************************************************************/
/*! exports provided: ServicesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServicesComponent", function() { return ServicesComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular-bootstrap-md */ "./node_modules/angular-bootstrap-md/fesm5/angular-bootstrap-md.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var src_app_core_store_form_form_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/core/store/form/form.actions */ "./src/app/core/store/form/form.actions.ts");
/* harmony import */ var src_app_components_base_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/components/base.component */ "./src/app/components/base.component.ts");
/* harmony import */ var src_app_core_models_component_service_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/core/models/component-service.model */ "./src/app/core/models/component-service.model.ts");
/* harmony import */ var src_app_core_enums_create_routes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/core/enums/create-routes */ "./src/app/core/enums/create-routes.ts");
/* harmony import */ var src_app_core_enums_create_advanced_steps_indexes__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/core/enums/create-advanced-steps-indexes */ "./src/app/core/enums/create-advanced-steps-indexes.ts");
/* harmony import */ var src_app_core_utils_customValidators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/core/utils/customValidators */ "./src/app/core/utils/customValidators.ts");
/* harmony import */ var src_app_core_store_action_action_actions__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/core/store/action/action.actions */ "./src/app/core/store/action/action.actions.ts");
/* harmony import */ var src_app_core_models_service_model__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/core/models/service.model */ "./src/app/core/models/service.model.ts");
/* harmony import */ var src_app_core_utils_tooltip_messages__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/core/utils/tooltip.messages */ "./src/app/core/utils/tooltip.messages.ts");















var UP_POSITION = 'up';
var DOWN_POSITION = 'down';
var ServicesComponent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ServicesComponent, _super);
    function ServicesComponent(fb, router, store) {
        var _this = _super.call(this) || this;
        _this.fb = fb;
        _this.router = router;
        _this.store = store;
        _this.services = [];
        _this.headerTooltipMessage = src_app_core_utils_tooltip_messages__WEBPACK_IMPORTED_MODULE_14__["TooltipMessages"].ServicesHeaderTooltip;
        _this.headerBoldPartTooltipMessage = src_app_core_utils_tooltip_messages__WEBPACK_IMPORTED_MODULE_14__["TooltipMessages"].ServicesHeaderBoldPartTooltip;
        _this.typeTooltipMessage = src_app_core_utils_tooltip_messages__WEBPACK_IMPORTED_MODULE_14__["TooltipMessages"].ServiceTypeTooltip;
        _this.endpointTooltipMessage = src_app_core_utils_tooltip_messages__WEBPACK_IMPORTED_MODULE_14__["TooltipMessages"].ServiceEndpointTooltip;
        return _this;
    }
    ServicesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription$ = this.store
            .pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_5__["select"])(function (state) { return state; }))
            .subscribe(function (state) {
            _this.services = state.form.services.map(function (service) { return new src_app_core_models_component_service_model__WEBPACK_IMPORTED_MODULE_8__["ComponentServiceModel"](service, DOWN_POSITION); });
            _this.continueButtonText = _this.services.length > 0 ? 'Next' : 'Skip';
        });
        this.subscriptions.push(this.subscription$);
        this.createForm();
    };
    ServicesComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.collapses.forEach(function (collapse, index) {
                if (index === _this.collapses.length - 1) {
                    collapse.toggle();
                }
            });
        });
    };
    ServicesComponent.prototype.createForm = function () {
        this.serviceForm = this.fb.group({
            type: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]],
            endpoint: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]],
            alias: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, src_app_core_utils_customValidators__WEBPACK_IMPORTED_MODULE_11__["default"].uniqueServiceAlias(this.services.map(function (s) { return s.serviceModel; }))]]
        });
    };
    ServicesComponent.prototype.addService = function () {
        if (this.serviceForm.invalid) {
            return;
        }
        var service = new src_app_core_models_service_model__WEBPACK_IMPORTED_MODULE_13__["ServiceModel"](this.type.value, this.endpoint.value, this.alias.value);
        this.store.dispatch(new src_app_core_store_form_form_actions__WEBPACK_IMPORTED_MODULE_6__["AddService"](service));
        this.createForm();
    };
    ServicesComponent.prototype.removeService = function (service) {
        this.store.dispatch(new src_app_core_store_form_form_actions__WEBPACK_IMPORTED_MODULE_6__["RemoveService"](service));
        this.createForm();
    };
    ServicesComponent.prototype.toggleService = function (serviceModel) {
        var service = this.services.find(function (s) { return s.serviceModel === serviceModel; });
        service.iconPosition = service.iconPosition === DOWN_POSITION ? UP_POSITION : DOWN_POSITION;
    };
    ServicesComponent.prototype.goToNext = function () {
        this.store.dispatch(new src_app_core_store_action_action_actions__WEBPACK_IMPORTED_MODULE_12__["MoveToStep"](src_app_core_enums_create_advanced_steps_indexes__WEBPACK_IMPORTED_MODULE_10__["CreateAdvancedStepsIndexes"].EncryptKeys));
        this.router.navigate([src_app_core_enums_create_routes__WEBPACK_IMPORTED_MODULE_9__["CreateRoutes"].EncryptKeys]);
    };
    ServicesComponent.prototype.goToPrevious = function () {
        this.store.dispatch(new src_app_core_store_action_action_actions__WEBPACK_IMPORTED_MODULE_12__["MoveToStep"](src_app_core_enums_create_advanced_steps_indexes__WEBPACK_IMPORTED_MODULE_10__["CreateAdvancedStepsIndexes"].AuthenticationKeys));
        this.router.navigate([src_app_core_enums_create_routes__WEBPACK_IMPORTED_MODULE_9__["CreateRoutes"].AuthenticationKeys]);
    };
    Object.defineProperty(ServicesComponent.prototype, "type", {
        get: function () {
            return this.serviceForm.get('type');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServicesComponent.prototype, "alias", {
        get: function () {
            return this.serviceForm.get('alias');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServicesComponent.prototype, "endpoint", {
        get: function () {
            return this.serviceForm.get('endpoint');
        },
        enumerable: true,
        configurable: true
    });
    return ServicesComponent;
}(src_app_components_base_component__WEBPACK_IMPORTED_MODULE_7__["BaseComponent"]));



/***/ }),

/***/ "./src/app/components/create-did/summary/summary.component.ngfactory.js":
/*!******************************************************************************!*\
  !*** ./src/app/components/create-did/summary/summary.component.ngfactory.js ***!
  \******************************************************************************/
/*! exports provided: RenderType_SummaryComponent, View_SummaryComponent_0, View_SummaryComponent_Host_0, SummaryComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_SummaryComponent", function() { return RenderType_SummaryComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_SummaryComponent_0", function() { return View_SummaryComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_SummaryComponent_Host_0", function() { return View_SummaryComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SummaryComponentNgFactory", function() { return SummaryComponentNgFactory; });
/* harmony import */ var _summary_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./summary.component.scss.shim.ngstyle */ "./src/app/components/create-did/summary/summary.component.scss.shim.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var angular_highlight_js_dist_esm_src_highlightJs_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular-highlight-js/dist/esm/src/highlightJs.directive */ "./node_modules/angular-highlight-js/dist/esm/src/highlightJs.directive.js");
/* harmony import */ var angular_highlight_js_dist_esm_src_highlightJs_token__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angular-highlight-js/dist/esm/src/highlightJs.token */ "./node_modules/angular-highlight-js/dist/esm/src/highlightJs.token.js");
/* harmony import */ var angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! angular-bootstrap-md */ "./node_modules/angular-bootstrap-md/fesm5/angular-bootstrap-md.js");
/* harmony import */ var _summary_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./summary.component */ "./src/app/components/create-did/summary/summary.component.ts");
/* harmony import */ var ngx_device_detector__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-device-detector */ "./node_modules/ngx-device-detector/ngx-device-detector.umd.js");
/* harmony import */ var ngx_device_detector__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(ngx_device_detector__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _core_services_did_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../core/services/did.service */ "./src/app/core/services/did.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var _core_services_workflow_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../core/services/workflow.service */ "./src/app/core/services/workflow.service.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 













var styles_SummaryComponent = [_summary_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_SummaryComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 0, styles: styles_SummaryComponent, data: {} });

function View_SummaryComponent_1(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 2, "div", [["class", "alert alert-danger"], ["role", "alert"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 0, "i", [["class", "fas fa-exclamation-circle mr-2"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" You have exceeded the document size limit! Please remove some of your keys or services. "]))], null, null); }
function View_SummaryComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 20, "div", [["class", "tab-pane fade in active"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 1, "h4", [["class", "head text-center"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["DID preview"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, null, null, 0, "br", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](4, 0, null, null, 16, "div", [["class", "row"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](5, 0, null, null, 15, "div", [["class", "col-xs-offset-1 col-xs-10 col-sm-offset-2 col-sm-8"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_SummaryComponent_1)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](7, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](8, 0, null, null, 2, "pre", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](9, 0, null, null, 1, "code", [["language", "json"], ["mwlHighlightJs", ""]], [[8, "innerHTML", 1]], null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](10, 540672, null, 0, angular_highlight_js_dist_esm_src_highlightJs_directive__WEBPACK_IMPORTED_MODULE_3__["HighlightJsDirective"], [angular_highlight_js_dist_esm_src_highlightJs_token__WEBPACK_IMPORTED_MODULE_4__["HIGHLIGHT_JS"]], { source: [0, "source"], language: [1, "language"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](11, 0, null, null, 9, "div", [["class", "row justify-content-between mt-4"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](12, 0, null, null, 4, "button", [["class", "btn-md-blue"], ["color", "primary"], ["mdbBtn", ""], ["mdbWavesEffect", ""], ["type", "button"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 14).click($event) !== false);
        ad = (pd_0 && ad);
    } if (("click" === en)) {
        var pd_1 = (_co.goToPrevious() !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](13, 81920, null, 0, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_5__["MdbBtnDirective"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]], { color: [0, "color"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](14, 16384, null, 0, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_5__["WavesDirective"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](15, 0, null, null, 0, "span", [["class", "glyphicon glyphicon-arrow-left mr-3"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" Back"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](17, 0, null, null, 3, "button", [["class", "btn-md-blue"], ["color", "primary"], ["mdbBtn", ""], ["mdbWavesEffect", ""], ["type", "button"]], [[8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 19).click($event) !== false);
        ad = (pd_0 && ad);
    } if (("click" === en)) {
        var pd_1 = (_co.recordOnChain() !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](18, 81920, null, 0, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_5__["MdbBtnDirective"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]], { color: [0, "color"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](19, 16384, null, 0, angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_5__["WavesDirective"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](20, null, ["", ""]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.documentSizeExceeded; _ck(_v, 7, 0, currVal_0); var currVal_2 = _co.didDocument; var currVal_3 = "json"; _ck(_v, 10, 0, currVal_2, currVal_3); var currVal_4 = "primary"; _ck(_v, 13, 0, currVal_4); var currVal_6 = "primary"; _ck(_v, 18, 0, currVal_6); }, function (_ck, _v) { var _co = _v.component; var currVal_1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 10).highlightedCode; _ck(_v, 9, 0, currVal_1); var currVal_5 = _co.documentSizeExceeded; _ck(_v, 17, 0, currVal_5); var currVal_7 = _co.recordOnChainButtonName; _ck(_v, 20, 0, currVal_7); }); }
function View_SummaryComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "app-summary", [], null, null, null, View_SummaryComponent_0, RenderType_SummaryComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 114688, null, 0, _summary_component__WEBPACK_IMPORTED_MODULE_6__["SummaryComponent"], [ngx_device_detector__WEBPACK_IMPORTED_MODULE_7__["DeviceDetectorService"], _core_services_did_service__WEBPACK_IMPORTED_MODULE_8__["DIDService"], _angular_router__WEBPACK_IMPORTED_MODULE_9__["Router"], ngx_spinner__WEBPACK_IMPORTED_MODULE_10__["NgxSpinnerService"], _ngrx_store__WEBPACK_IMPORTED_MODULE_11__["Store"], _core_services_workflow_service__WEBPACK_IMPORTED_MODULE_12__["WorkflowService"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var SummaryComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("app-summary", _summary_component__WEBPACK_IMPORTED_MODULE_6__["SummaryComponent"], View_SummaryComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/components/create-did/summary/summary.component.scss.shim.ngstyle.js":
/*!**************************************************************************************!*\
  !*** ./src/app/components/create-did/summary/summary.component.scss.shim.ngstyle.js ***!
  \**************************************************************************************/
/*! exports provided: styles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzdW1tYXJ5L3N1bW1hcnkuY29tcG9uZW50LnNjc3MifQ== */"];



/***/ }),

/***/ "./src/app/components/create-did/summary/summary.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/components/create-did/summary/summary.component.ts ***!
  \********************************************************************/
/*! exports provided: SummaryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SummaryComponent", function() { return SummaryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_device_detector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-device-detector */ "./node_modules/ngx-device-detector/ngx-device-detector.umd.js");
/* harmony import */ var ngx_device_detector__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ngx_device_detector__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var src_app_core_enums_action_type__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/core/enums/action-type */ "./src/app/core/enums/action-type.ts");
/* harmony import */ var src_app_core_enums_create_advanced_steps_indexes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/core/enums/create-advanced-steps-indexes */ "./src/app/core/enums/create-advanced-steps-indexes.ts");
/* harmony import */ var src_app_core_enums_create_basic_steps_indexes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/core/enums/create-basic-steps-indexes */ "./src/app/core/enums/create-basic-steps-indexes.ts");
/* harmony import */ var src_app_core_enums_create_routes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/core/enums/create-routes */ "./src/app/core/enums/create-routes.ts");
/* harmony import */ var src_app_core_services_did_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/core/services/did.service */ "./src/app/core/services/did.service.ts");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var src_app_core_store_action_action_actions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/core/store/action/action.actions */ "./src/app/core/store/action/action.actions.ts");
/* harmony import */ var src_app_core_enums_shared_routes__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/core/enums/shared-routes */ "./src/app/core/enums/shared-routes.ts");
/* harmony import */ var src_app_core_services_workflow_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/core/services/workflow.service */ "./src/app/core/services/workflow.service.ts");














var SummaryComponent = /** @class */ (function () {
    function SummaryComponent(deviceService, didService, router, spinner, store, workflowService) {
        this.deviceService = deviceService;
        this.didService = didService;
        this.router = router;
        this.spinner = spinner;
        this.store = store;
        this.workflowService = workflowService;
        this.recordOnChainButtonName = 'Record on-chain';
    }
    SummaryComponent.prototype.ngOnInit = function () {
        if (this.deviceService.isMobile()) {
            this.recordOnChainButtonName = 'Record';
        }
        var didDocumentResult = this.didService.generateDocument();
        this.didDocument = didDocumentResult.document;
        if (didDocumentResult.size > src_environments_environment__WEBPACK_IMPORTED_MODULE_10__["environment"].entrySizeLimit) {
            this.documentSizeExceeded = true;
        }
    };
    SummaryComponent.prototype.recordOnChain = function () {
        var _this = this;
        if (!this.documentSizeExceeded) {
            this.spinner.show();
            this.didService
                .recordOnChain()
                .subscribe(function (res) {
                var selectedAction = _this.workflowService.getSelectedAction();
                if (selectedAction === src_app_core_enums_action_type__WEBPACK_IMPORTED_MODULE_5__["ActionType"].CreateAdvanced) {
                    _this.store.dispatch(new src_app_core_store_action_action_actions__WEBPACK_IMPORTED_MODULE_11__["MoveToStep"](src_app_core_enums_create_advanced_steps_indexes__WEBPACK_IMPORTED_MODULE_6__["CreateAdvancedStepsIndexes"].Final));
                }
                else if (selectedAction === src_app_core_enums_action_type__WEBPACK_IMPORTED_MODULE_5__["ActionType"].CreateBasic) {
                    _this.store.dispatch(new src_app_core_store_action_action_actions__WEBPACK_IMPORTED_MODULE_11__["MoveToStep"](src_app_core_enums_create_basic_steps_indexes__WEBPACK_IMPORTED_MODULE_7__["CreateBasicStepsIndexes"].Final));
                }
                _this.spinner.hide();
                _this.router.navigate([src_app_core_enums_shared_routes__WEBPACK_IMPORTED_MODULE_12__["SharedRoutes"].Final], { queryParams: { url: res.url } });
            });
        }
    };
    SummaryComponent.prototype.goToPrevious = function () {
        var selectedAction = this.workflowService.getSelectedAction();
        if (selectedAction === src_app_core_enums_action_type__WEBPACK_IMPORTED_MODULE_5__["ActionType"].CreateAdvanced) {
            this.store.dispatch(new src_app_core_store_action_action_actions__WEBPACK_IMPORTED_MODULE_11__["MoveToStep"](src_app_core_enums_create_advanced_steps_indexes__WEBPACK_IMPORTED_MODULE_6__["CreateAdvancedStepsIndexes"].EncryptKeys));
        }
        else if (selectedAction === src_app_core_enums_action_type__WEBPACK_IMPORTED_MODULE_5__["ActionType"].CreateBasic) {
            this.store.dispatch(new src_app_core_store_action_action_actions__WEBPACK_IMPORTED_MODULE_11__["MoveToStep"](src_app_core_enums_create_basic_steps_indexes__WEBPACK_IMPORTED_MODULE_7__["CreateBasicStepsIndexes"].EncryptKeys));
        }
        this.router.navigate([src_app_core_enums_create_routes__WEBPACK_IMPORTED_MODULE_8__["CreateRoutes"].EncryptKeys]);
    };
    return SummaryComponent;
}());



/***/ }),

/***/ "./src/app/core/enums/shared-routes.ts":
/*!*********************************************!*\
  !*** ./src/app/core/enums/shared-routes.ts ***!
  \*********************************************/
/*! exports provided: SharedRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedRoutes", function() { return SharedRoutes; });
var SharedRoutes;
(function (SharedRoutes) {
    SharedRoutes["Action"] = "action";
    SharedRoutes["Final"] = "final";
})(SharedRoutes || (SharedRoutes = {}));


/***/ }),

/***/ "./src/app/core/models/component-key.model.ts":
/*!****************************************************!*\
  !*** ./src/app/core/models/component-key.model.ts ***!
  \****************************************************/
/*! exports provided: ComponentKeyModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComponentKeyModel", function() { return ComponentKeyModel; });
var ComponentKeyModel = /** @class */ (function () {
    function ComponentKeyModel(keyModel, iconPosition) {
        this.keyModel = keyModel;
        this.iconPosition = iconPosition;
    }
    return ComponentKeyModel;
}());



/***/ }),

/***/ "./src/app/core/models/component-service.model.ts":
/*!********************************************************!*\
  !*** ./src/app/core/models/component-service.model.ts ***!
  \********************************************************/
/*! exports provided: ComponentServiceModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComponentServiceModel", function() { return ComponentServiceModel; });
var ComponentServiceModel = /** @class */ (function () {
    function ComponentServiceModel(serviceModel, iconPosition) {
        this.serviceModel = serviceModel;
        this.iconPosition = iconPosition;
    }
    return ComponentServiceModel;
}());



/***/ }),

/***/ "./src/app/core/models/service.model.ts":
/*!**********************************************!*\
  !*** ./src/app/core/models/service.model.ts ***!
  \**********************************************/
/*! exports provided: ServiceModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServiceModel", function() { return ServiceModel; });
var ServiceModel = /** @class */ (function () {
    function ServiceModel(type, endpoint, alias) {
        this.type = type;
        this.endpoint = endpoint;
        this.alias = alias;
    }
    return ServiceModel;
}());



/***/ }),

/***/ "./src/app/core/utils/customValidators.ts":
/*!************************************************!*\
  !*** ./src/app/core/utils/customValidators.ts ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var CustomValidators = /** @class */ (function () {
    function CustomValidators() {
    }
    CustomValidators.passwordsDoMatch = function (createFormGroup) {
        var password = createFormGroup.controls.password.value;
        var repeatPassword = createFormGroup.controls.confirmPassword.value;
        if (!repeatPassword) {
            return null;
        }
        if (repeatPassword !== password) {
            return {
                passwordsMismatch: true
            };
        }
        return null;
    };
    CustomValidators.uniqueKeyAlias = function (publicKeys, authenticationKeys) {
        return function (control) {
            if (control.value !== null) {
                if (!publicKeys.find(function (k) { return k.alias === control.value; })
                    && !authenticationKeys.find(function (k) { return k.alias === control.value; })) {
                    return null;
                }
                return { taken: true };
            }
            return null;
        };
    };
    CustomValidators.uniqueServiceAlias = function (services) {
        return function (control) {
            if (control.value !== null) {
                if (services.find(function (s) { return s.alias === control.value; })) {
                    return { taken: true };
                }
            }
            return null;
        };
    };
    return CustomValidators;
}());
/* harmony default export */ __webpack_exports__["default"] = (CustomValidators);


/***/ }),

/***/ "./src/app/core/utils/tooltip.messages.ts":
/*!************************************************!*\
  !*** ./src/app/core/utils/tooltip.messages.ts ***!
  \************************************************/
/*! exports provided: TooltipMessages */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TooltipMessages", function() { return TooltipMessages; });
var TooltipMessages = /** @class */ (function () {
    function TooltipMessages() {
    }
    TooltipMessages.SignatureTypeTooltip = 'Both signature types allow you to sign messages ' +
        'and differ only in the mathematics underpinning them. Ed25519 is the more modern signature type and has ' +
        'a number of technical advantages over ECDSA, so unless you have a good reason to choose ECDSA, we strongly recommend ' +
        'that you stick with the default.';
    TooltipMessages.ControllerTooltip = 'The controller is the entity that will be making the signatures. ' +
        'This is usually the DID itself, but in case the DID is for a child, it can be the DID of the parent; ' +
        'if it is a document, it can be the DID of the company owning the document, etc. By default the controller is ' +
        'set to the DID you are currently creating. If the controller is a different DID, you should input the relevant DID instead.';
    TooltipMessages.AliasTooltip = 'A human-readable nickname for the key you are creating. ' +
        'It can help differentiate between different keys more easily if you are creating many.';
    TooltipMessages.AuthenticationDropdownTooltip = 'Generate keys that will be used specifically for authentication purposes. ' +
        'You can re-use keys created in the previous step.';
    TooltipMessages.ServicesHeaderTooltip = 'Register services used by the DID. These can be authentication providers, ' +
        'messaging hubs, credential repositories for verifiable claims, etc.';
    TooltipMessages.ServicesHeaderBoldPartTooltip = 'DO NOT put links to personally identifiable information ' +
        '(such as social media profiles, email addresses, phone numbers, etc.)';
    TooltipMessages.ServiceTypeTooltip = 'Choose a human-readable description of the type of service, e.g. KYCProvider, ' +
        'CredentialRepositoryService, MessagingHub, etc.';
    TooltipMessages.ServiceEndpointTooltip = 'Specify the URL for the service, e.g. https://example.com/KYCProvider';
    TooltipMessages.EncryptHeaderTooltipAdvancedMode = 'Choose a strong password to encrypt the private keys(s) of the DID.';
    TooltipMessages.EncryptHeaderBoldPartTooltipAdvancedMode = 'Make sure you store the password in a safe location: ' +
        'there is no password recovery if you lose your password and you will be unable to sign messages with your DID keys, if you lose it!';
    TooltipMessages.EncryptHeaderTooltipBasicMode = 'Choose a strong password to encrypt the private key of the DID.';
    TooltipMessages.EncryptHeaderBoldPartTooltipBasicMode = 'Make sure you store the password in a safe location: ' +
        'there is no password recovery if you lose your password and you will be unable to sign messages with your DID key, if you lose it!';
    return TooltipMessages;
}());



/***/ })

}]);
//# sourceMappingURL=components-create-did-create-did-module-ngfactory.js.map