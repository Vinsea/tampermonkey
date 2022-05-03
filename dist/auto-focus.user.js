// ==UserScript==
// @name             auto focus on first <input>
// @name:zh          自动聚焦第一个输入框
// @namespace        @Vinsea
// @version          0.2.1
// @description      auto foucs on first input box
// @description:zh   默认聚焦到第一个搜索框中
// @author           Vinsea
// @match            *
// @match            http*://*/*
// @run-at           document-idle
// @grant            GM.registerMenuCommand
// @grant            GM.setValue
// @grant            GM.listValues
// @license          MIT
// ==/UserScript==

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

(function () {
    'use strict';

    var claz = function claz(val) {
      return "".concat(val, "__tampermonkey");
    };

    var addStyle = function addStyle(aCss) {
      var head = document.getElementsByTagName('head')[0];

      if (head) {
        var style = document.createElement('style');
        style.setAttribute('type', 'text/css');
        style.textContent = aCss;
        head.appendChild(style);
        return style;
      }

      return null;
    };

    var bodyOverflow = document.body.style.overflow;

    var Dialog = /*#__PURE__*/function () {
      function Dialog(opt) {
        _classCallCheck(this, Dialog);

        this.option = Object.assign({
          header: '提示',
          content: '',
          okText: '确认',
          cancelText: '取消',
          onOK: function onOK() {
            return {};
          },
          onCancel: function onCancel() {
            return {};
          }
        }, opt);
        this.init();
      }

      _createClass(Dialog, [{
        key: "init",
        value: function init() {
          var _this = this;

          this.wrapper = document.createElement('div');
          this.wrapper.classList.add(claz('vv-dialog-wrapper'));
          var container = document.createElement('div');
          container.classList.add(claz('vv-dialog'));
          this.wrapper.appendChild(container);
          var header = document.createElement('div');
          header.classList.add(claz('vv-dialog-header'));
          header.textContent = this.option.header;
          container.appendChild(header);
          var body = document.createElement('div');
          body.classList.add(claz('vv-dialog-body'));
          container.appendChild(body);
          var text = document.createTextNode(this.option.content);
          body.appendChild(text);
          var footer = document.createElement('div');
          footer.classList.add(claz('vv-dialog-footer'));
          container.appendChild(footer);
          var cancel = document.createElement('button');
          cancel.textContent = this.option.cancelText;
          cancel.addEventListener('click', function () {
            _this.option.onCancel();

            _this.close();
          });
          footer.appendChild(cancel);
          var ok = document.createElement('button');
          ok.textContent = this.option.okText;
          ok.addEventListener('click', this.option.onOK);
          footer.appendChild(ok);
        }
      }, {
        key: "open",
        value: function open() {
          document.body.style.overflow = 'hidden';
          document.body.appendChild(this.wrapper);
        }
      }, {
        key: "close",
        value: function close() {
          document.body.style.overflow = bodyOverflow;
          document.body.removeChild(this.wrapper);
          this.wrapper = null;
        }
      }]);

      return Dialog;
    }();
    /**
     * init styles
     * @returns {undefined}
     */


    function initStyle() {
      addStyle("\n.".concat(claz('vv-dialog-wrapper'), "{\n    position: fixed;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    z-index: 2000;\n    background-color: rgba(0,0,0,0.6);\n}\n.").concat(claz('vv-dialog'), " {\n    width: 500px;\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    transform: translate(-50%, -50%);\n    background-color: #fff;\n    border-radius: 8px;\n    box-shadow: 0 0 10px 0 rgb(0 0 0 / 20%);\n    box-sizing: border-box;\n}\n.").concat(claz('vv-dialog-header'), " {\n    padding: 10px 24px;\n    font-size: 16px;\n    color: #333;\n    line-height: 30px;\n    font-weight: bold;\n    border-bottom: 1px solid #e9e9e9;\n}\n.").concat(claz('vv-dialog-header'), ",\n.").concat(claz('vv-dialog-body'), " {\n    padding: 24px;\n}\n.").concat(claz('vv-dialog-body'), " {\n    font-size: 14px;\n    color: #333;\n}\n.").concat(claz('vv-dialog-footer'), " {\n    border-top: 1px solid #e9e9e9;\n    padding: 10px 24px;\n    text-align: center;\n}\n.").concat(claz('vv-dialog-footer'), " button {\n    color: #fff;\n    line-height: 30px;\n    border: none;\n    border-radius: 5px;\n    padding: 0 20px;\n    margin: 0 5px;\n    cursor: pointer;\n    background-color: #5aadf9;\n    box-sizing: border-box;\n    transition: background-color 0.3s;\n}\n.").concat(claz('vv-dialog-footer'), " button:hover {\n    background-color: #349bfa;\n}\n.").concat(claz('vv-dialog-footer'), " button:first-child {\n    color: #333;\n    border-color: #fff;\n    background-color: #fff;\n}\n    "));
    }
    /**
     * focus
     * @returns {undefined}
     */


    function doFocus() {
      var firstInput = document.querySelector('input:not([type=hidden])');

      if (firstInput) {
        var val = firstInput.value;
        firstInput.value = '';
        firstInput.focus();
        firstInput.value = val;
      }
    }
    /**
     * init events
     * @returns {undefined}
     */


    function initEvents() {
      GM.registerMenuCommand('设置', function () {
        var dialog = new Dialog({
          content: '是否自动滚动到聚焦处，默认:true'
        });
        dialog.open();
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'q' && e.ctrlKey) {
          doFocus();
        }
      });
    }
    /**
     * entry
     * @returns {undefined}
     */


    function load() {
      doFocus();
      initStyle();
      initEvents();
    }

    if (document.readyState === 'loading') {
      var init = function init() {
        load();
        document.removeEventListener('DOMContentLoaded', init);
      };

      document.addEventListener('DOMContentLoaded', init);
    } else {
      load();
    }
})();
