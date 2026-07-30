/******/ (() => { // webpackBootstrap
/*!************************************!*\
  !*** ./machine-learning/worker.js ***!
  \************************************/
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
importScripts('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest');
var MODEL_PATH = "yolov5n_web_model/model.json";
var LABELS_PATH = "yolov5n_web_model/labels.json";
var INPUT_MODEL_DIMENTIONS = 640;
var CLASS_THRESHOLD = 0.4;
var _labels = [];
var _model = null;
function loadModelAndLabels() {
  return _loadModelAndLabels.apply(this, arguments);
}
/**
 * Pré-processa a imagem para o formato aceito pelo YOLO:
 * - tf.browser.fromPixels(): converte ImageBitmap/ImageData para tensor [H, W, 3]
 * - tf.image.resizeBilinear(): redimensiona para [INPUT_DIM, INPUT_DIM]
 * - .div(255): normaliza os valores para [0, 1]
 * - .expandDims(0): adiciona dimensão batch [1, H, W, 3]
 *
 * Uso de tf.tidy():
 * - Garante que tensores temporários serão descartados automaticamente,
 *   evitando vazamento de memória.
 */
function _loadModelAndLabels() {
  _loadModelAndLabels = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
    var dummyInput;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          _context3.n = 1;
          return tf.ready();
        case 1:
          _context3.n = 2;
          return fetch(LABELS_PATH);
        case 2:
          _context3.n = 3;
          return _context3.v.json();
        case 3:
          _labels = _context3.v;
          _context3.n = 4;
          return tf.loadGraphModel(MODEL_PATH);
        case 4:
          _model = _context3.v;
          // warmup
          dummyInput = tf.ones(_model.inputs[0].shape);
          _context3.n = 5;
          return _model.executeAsync(dummyInput);
        case 5:
          tf.dispose(dummyInput);
          postMessage({
            type: 'model-loaded'
          });
        case 6:
          return _context3.a(2);
      }
    }, _callee3);
  }));
  return _loadModelAndLabels.apply(this, arguments);
}
function preprocessImage(input) {
  return tf.tidy(function () {
    var image = tf.browser.fromPixels(input);
    return tf.image.resizeBilinear(image, [INPUT_MODEL_DIMENTIONS, INPUT_MODEL_DIMENTIONS]).div(255).expandDims(0);
  });
}
function runInference(_x) {
  return _runInference.apply(this, arguments);
}
/**
 * Filtra e processa as predições:
 * - Aplica o limiar de confiança (CLASS_THRESHOLD)
 * - Filtra apenas a classe desejada (exemplo: 'kite')
 * - Converte coordenadas normalizadas para pixels reais
 * - Calcula o centro do bounding box
 *
 * Uso de generator (function*):
 * - Permite enviar cada predição assim que processada, sem criar lista intermediária
 */
function _runInference() {
  _runInference = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(tensor) {
    var output, _output$slice, _output$slice2, boxes, scores, classes, _yield$Promise$all, _yield$Promise$all2, boxesData, scoresData, classesData;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          _context4.n = 1;
          return _model.executeAsync(tensor);
        case 1:
          output = _context4.v;
          tf.dispose(tensor);
          // Assume que as 3 primeiras saídas são:
          // caixas (boxes), pontuações (scores) e classes
          _output$slice = output.slice(0, 3), _output$slice2 = _slicedToArray(_output$slice, 3), boxes = _output$slice2[0], scores = _output$slice2[1], classes = _output$slice2[2];
          _context4.n = 2;
          return Promise.all([boxes.data(), scores.data(), classes.data()]);
        case 2:
          _yield$Promise$all = _context4.v;
          _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 3);
          boxesData = _yield$Promise$all2[0];
          scoresData = _yield$Promise$all2[1];
          classesData = _yield$Promise$all2[2];
          output.forEach(function (t) {
            return t.dispose();
          });
          return _context4.a(2, {
            boxes: boxesData,
            scores: scoresData,
            classes: classesData
          });
      }
    }, _callee4);
  }));
  return _runInference.apply(this, arguments);
}
function processPrediction(_ref, width, height) {
  var boxes = _ref.boxes,
    scores = _ref.scores,
    classes = _ref.classes;
  return /*#__PURE__*/_regenerator().m(function _callee() {
    var index, label, _boxes$slice, _boxes$slice2, x1, y1, x2, y2, boxWidth, boxHeight, centerX, centerY;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          index = 0;
        case 1:
          if (!(index < scores.length)) {
            _context.n = 5;
            break;
          }
          if (!(scores[index] < CLASS_THRESHOLD)) {
            _context.n = 2;
            break;
          }
          return _context.a(3, 4);
        case 2:
          label = _labels[classes[index]];
          if (!(label !== 'kite')) {
            _context.n = 3;
            break;
          }
          return _context.a(3, 4);
        case 3:
          _boxes$slice = boxes.slice(index * 4, (index + 1) * 4), _boxes$slice2 = _slicedToArray(_boxes$slice, 4), x1 = _boxes$slice2[0], y1 = _boxes$slice2[1], x2 = _boxes$slice2[2], y2 = _boxes$slice2[3];
          x1 *= width;
          x2 *= width;
          y1 *= height;
          y2 *= height;
          boxWidth = x2 - x1;
          boxHeight = y2 - y1;
          centerX = x1 + boxWidth / 2;
          centerY = y1 + boxHeight / 2;
          _context.n = 4;
          return {
            x: centerX,
            y: centerY,
            score: (scores[index] * 100).toFixed(2)
          };
        case 4:
          index++;
          _context.n = 1;
          break;
        case 5:
          return _context.a(2);
      }
    }, _callee);
  })();
}
loadModelAndLabels();
self.onmessage = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(_ref2) {
    var data, input, _data$image, width, height, inferenceResults, _iterator, _step, prediction;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          data = _ref2.data;
          if (!(data.type !== 'predict')) {
            _context2.n = 1;
            break;
          }
          return _context2.a(2);
        case 1:
          if (_model) {
            _context2.n = 2;
            break;
          }
          return _context2.a(2);
        case 2:
          input = preprocessImage(data.image);
          _data$image = data.image, width = _data$image.width, height = _data$image.height;
          _context2.n = 3;
          return runInference(input);
        case 3:
          inferenceResults = _context2.v;
          _iterator = _createForOfIteratorHelper(processPrediction(inferenceResults, width, height));
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              prediction = _step.value;
              postMessage(_objectSpread({
                type: 'prediction'
              }, prediction));
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        case 4:
          return _context2.a(2);
      }
    }, _callee2);
  }));
  return function (_x2) {
    return _ref3.apply(this, arguments);
  };
}();
console.log('🧠 YOLOv5n Web Worker initialized');
/******/ })()
;
//# sourceMappingURL=machine-learning_worker_js.js.map