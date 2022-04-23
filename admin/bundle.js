(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

require('./iframe-load');

module.exports = /*#__PURE__*/function () {
  function Editor() {
    _classCallCheck(this, Editor);

    this.iframe = document.querySelector('iframe');
  }

  _createClass(Editor, [{
    key: "open",
    value: function open(page) {
      var _this = this;

      this.iframe.load('../' + page, function () {
        var body = _this.iframe.contentDocument.body;
        var textNodes = [];

        function recursy(element) {
          element.childNodes.forEach(function (node) {
            if (node.nodeName === '#text' && node.nodeValue.replace(/\s+/g, '').length > 0) {
              console.log(node);
              textNodes.push(node);
            } else {
              recursy(node);
            }
          });
        }

        recursy(body);
        textNodes.forEach(function (node) {
          var wrapper = _this.iframe.contentDocument.createElement('text-editor');

          node.parentNode.replaceChild(wrapper, node);
          wrapper.appendChild(node);
          wrapper.contentEditable = true;
        });
      });
    }
  }]);

  return Editor;
}();

},{"./iframe-load":2}],2:[function(require,module,exports){
"use strict";

/*eslint-disable */
HTMLIFrameElement.prototype.load = function (url, callback) {
  var iframe = this;

  try {
    iframe.src = url + "?rnd=" + Math.random().toString().substring(2);
  } catch (error) {
    if (!callback) {
      return new Promise(function (resolve, reject) {
        reject(error);
      });
    } else {
      callback(error);
    }
  }

  var maxTime = 60000;
  var interval = 200;
  var timerCount = 0;

  if (!callback) {
    return new Promise(function (resolve, reject) {
      var timer = setInterval(function () {
        if (!iframe) return clearInterval(timer);
        timerCount++;

        if (iframe.contentDocument && iframe.contentDocument.readyState === "complete") {
          clearInterval(timer);
          resolve();
        } else if (timerCount * interval > maxTime) {
          reject(new Error("Iframe load fail!"));
        }
      }, interval);
    });
  } else {
    var timer = setInterval(function () {
      if (!iframe) return clearInterval(timer);

      if (iframe.contentDocument && iframe.contentDocument.readyState === "complete") {
        clearInterval(timer);
        callback();
      } else if (timerCount * interval > maxTime) {
        callback(new Error("Iframe load fail!"));
      }
    }, interval);
  }
};

},{}],3:[function(require,module,exports){
"use strict";

var Editor = require('./editor');

window.editor = new Editor();

window.onload = function () {
  window.editor.open('index.html');
};

},{"./editor":1}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc3JjL2VkaXRvci5qcyIsImFwcC9zcmMvaWZyYW1lLWxvYWQuanMiLCJhcHAvc3JjL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0FBLE9BQU8sQ0FBQyxlQUFELENBQVA7O0FBRUEsTUFBTSxDQUFDLE9BQVA7QUFDSSxvQkFBYztBQUFBOztBQUNWLFNBQUssTUFBTCxHQUFjLFFBQVEsQ0FBQyxhQUFULENBQXVCLFFBQXZCLENBQWQ7QUFDSDs7QUFITDtBQUFBO0FBQUEsV0FLSSxjQUFLLElBQUwsRUFBVztBQUFBOztBQUNQLFdBQUssTUFBTCxDQUFZLElBQVosQ0FBaUIsUUFBUSxJQUF6QixFQUErQixZQUFNO0FBQ2pDLFlBQU0sSUFBSSxHQUFHLEtBQUksQ0FBQyxNQUFMLENBQVksZUFBWixDQUE0QixJQUF6QztBQUVBLFlBQUksU0FBUyxHQUFHLEVBQWhCOztBQUVBLGlCQUFTLE9BQVQsQ0FBaUIsT0FBakIsRUFBMEI7QUFDdEIsVUFBQSxPQUFPLENBQUMsVUFBUixDQUFtQixPQUFuQixDQUEyQixVQUFDLElBQUQsRUFBVTtBQUVqQyxnQkFBSSxJQUFJLENBQUMsUUFBTCxLQUFrQixPQUFsQixJQUE2QixJQUFJLENBQUMsU0FBTCxDQUFlLE9BQWYsQ0FBdUIsTUFBdkIsRUFBK0IsRUFBL0IsRUFBbUMsTUFBbkMsR0FBNEMsQ0FBN0UsRUFBZ0Y7QUFDNUUsY0FBQSxPQUFPLENBQUMsR0FBUixDQUFZLElBQVo7QUFDQSxjQUFBLFNBQVMsQ0FBQyxJQUFWLENBQWUsSUFBZjtBQUNILGFBSEQsTUFHTztBQUNILGNBQUEsT0FBTyxDQUFDLElBQUQsQ0FBUDtBQUNIO0FBQ0osV0FSRDtBQVNIOztBQUVELFFBQUEsT0FBTyxDQUFDLElBQUQsQ0FBUDtBQUVBLFFBQUEsU0FBUyxDQUFDLE9BQVYsQ0FBa0IsVUFBQyxJQUFELEVBQVU7QUFDeEIs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Um9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJyZXF1aXJlKCcuL2lmcmFtZS1sb2FkJylcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgRWRpdG9yIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuaWZyYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaWZyYW1lJylcclxuICAgIH1cclxuXHJcbiAgICBvcGVuKHBhZ2UpIHtcclxuICAgICAgICB0aGlzLmlmcmFtZS5sb2FkKCcuLi8nICsgcGFnZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBib2R5ID0gdGhpcy5pZnJhbWUuY29udGVudERvY3VtZW50LmJvZHlcclxuXHJcbiAgICAgICAgICAgIGxldCB0ZXh0Tm9kZXMgPSBbXVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gcmVjdXJzeShlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNoaWxkTm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLm5vZGVOYW1lID09PSAnI3RleHQnICYmIG5vZGUubm9kZVZhbHVlLnJlcGxhY2UoL1xccysvZywgJycpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cobm9kZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dE5vZGVzLnB1c2gobm9kZSlcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWN1cnN5KG5vZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmVjdXJzeShib2R5KVxyXG5cclxuICAgICAgICAgICAgdGV4dE5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHdyYXBwZXIgPSB0aGlzLmlmcmFtZS5jb250ZW50RG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dC1lZGl0b3InKVxyXG4gICAgICAgICAgICAgICAgbm9kZS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZCh3cmFwcGVyLCBub2RlKVxyXG4gICAgICAgICAgICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZChub2RlKVxyXG4gICAgICAgICAgICAgICAgd3JhcHBlci5jb250ZW50RWRpdGFibGUgPSB0cnVlXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufSIsIi8qZXNsaW50LWRpc2FibGUgKi9cclxuSFRNTElGcmFtZUVsZW1lbnQucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbiAodXJsLCBjYWxsYmFjaykge1xyXG4gICAgY29uc3QgaWZyYW1lID0gdGhpcztcclxuICAgIHRyeSB7XHJcbiAgICAgICAgaWZyYW1lLnNyYyA9IHVybCArIFwiP3JuZD1cIiArIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKS5zdWJzdHJpbmcoMik7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGlmICghY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2FsbGJhY2soZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgY29uc3QgbWF4VGltZSA9IDYwMDAwO1xyXG4gICAgY29uc3QgaW50ZXJ2YWwgPSAyMDA7XHJcblxyXG4gICAgbGV0IHRpbWVyQ291bnQgPSAwO1xyXG5cclxuICAgIGlmICghY2FsbGJhY2spIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICghaWZyYW1lKSByZXR1cm4gY2xlYXJJbnRlcnZhbCh0aW1lcik7XHJcbiAgICAgICAgICAgICAgICB0aW1lckNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICBpZiAoaWZyYW1lLmNvbnRlbnREb2N1bWVudCAmJiBpZnJhbWUuY29udGVudERvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiY29tcGxldGVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGltZXJDb3VudCAqIGludGVydmFsID4gbWF4VGltZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJJZnJhbWUgbG9hZCBmYWlsIVwiKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGludGVydmFsKTtcclxuICAgICAgICB9KVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCB0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCFpZnJhbWUpIHJldHVybiBjbGVhckludGVydmFsKHRpbWVyKTtcclxuICAgICAgICAgICAgaWYgKGlmcmFtZS5jb250ZW50RG9jdW1lbnQgJiYgaWZyYW1lLmNvbnRlbnREb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCIpIHtcclxuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aW1lckNvdW50ICogaW50ZXJ2YWwgPiBtYXhUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhuZXcgRXJyb3IoXCJJZnJhbWUgbG9hZCBmYWlsIVwiKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBpbnRlcnZhbCk7XHJcbiAgICB9XHJcbn0iLCJjb25zdCBFZGl0b3IgPSByZXF1aXJlKCcuL2VkaXRvcicpXHJcblxyXG53aW5kb3cuZWRpdG9yID0gbmV3IEVkaXRvcigpXHJcblxyXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xyXG4gICAgd2luZG93LmVkaXRvci5vcGVuKCdpbmRleC5odG1sJylcclxufSJdfQ==
