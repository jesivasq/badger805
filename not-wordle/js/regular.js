/*!
 * Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license (Commercial License)
 */
(function () {
  'use strict';

  var _WINDOW = {};
  var _DOCUMENT = {};

  try {
    if (typeof window !== 'undefined') _WINDOW = window;
    if (typeof document !== 'undefined') _DOCUMENT = document;
  } catch (e) {}

  var _ref = _WINDOW.navigator || {},
      _ref$userAgent = _ref.userAgent,
      userAgent = _ref$userAgent === void 0 ? '' : _ref$userAgent;

  var WINDOW = _WINDOW;
  var DOCUMENT = _DOCUMENT;
  var IS_BROWSER = !!WINDOW.document;
  var IS_DOM = !!DOCUMENT.documentElement && !!DOCUMENT.head && typeof DOCUMENT.addEventListener === 'function' && typeof DOCUMENT.createElement === 'function';
  var IS_IE = ~userAgent.indexOf('MSIE') || ~userAgent.indexOf('Trident/');

  var NAMESPACE_IDENTIFIER = '___FONT_AWESOME___';
  var PRODUCTION = function () {
    try {
      return "production" === 'production';
    } catch (e) {
      return false;
    }
  }();

  function bunker(fn) {
    try {
      fn();
    } catch (e) {
      if (!PRODUCTION) {
        throw e;
      }
    }
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);

      if (enumerableOnly) {
        symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }

      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var w = WINDOW || {};
  if (!w[NAMESPACE_IDENTIFIER]) w[NAMESPACE_IDENTIFIER] = {};
  if (!w[NAMESPACE_IDENTIFIER].styles) w[NAMESPACE_IDENTIFIER].styles = {};
  if (!w[NAMESPACE_IDENTIFIER].hooks) w[NAMESPACE_IDENTIFIER].hooks = {};
  if (!w[NAMESPACE_IDENTIFIER].shims) w[NAMESPACE_IDENTIFIER].shims = [];
  var namespace = w[NAMESPACE_IDENTIFIER];

  function defineIcons(prefix, icons) {
    var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var _params$skipHooks = params.skipHooks,
        skipHooks = _params$skipHooks === void 0 ? false : _params$skipHooks;
    var normalized = Object.keys(icons).reduce(function (acc, iconName) {
      var icon = icons[iconName];
      var expanded = !!icon.icon;

      if (expanded) {
        acc[icon.iconName] = icon.icon;
      } else {
        acc[iconName] = icon;
      }

      return acc;
    }, {});

    if (typeof namespace.hooks.addPack === 'function' && !skipHooks) {
      namespace.hooks.addPack(prefix, normalized);
    } else {
      namespace.styles[prefix] = _objectSpread2(_objectSpread2({}, namespace.styles[prefix] || {}), normalized);
    }
    /**
     * Font Awesome 4 used the prefix of `fa` for all icons. With the introduction
     * of new styles we needed to differentiate between them. Prefix `fa` is now an alias
     * for `fas` so we'll easy the upgrade process for our users by automatically defining
     * this as well.
     */


    if (prefix === 'fas') {
      defineIcons('fa', icons);
    }
  }

  var icons = {
    "dragon": [640, 512, [], "f6d5", "M481.12 119.98c14.92.85 27.36-9.89 30.88-24.59l-58.43-15.37c-6.5 27.13 15.51 39.27 27.55 39.96zm82.55 136.9l-94.19-44.21a9.876 9.876 0 0 1-4.6-4.69h18.68c4.9 3.12 8.91 5.72 12.25 7.89 16.52 10.73 24.81 16.12 42.65 16.12h27.87c23.03 0 43.8-12.59 54.22-32.85l12.88-25.04c10.49-20.39 8.19-45.32-5.84-63.51L560.5 23.65C549.07 8.84 530.99 0 512.12 0h-213.7c-37.28 0-52.93 46.77-24.99 69.01l12.52 9.94c-4.44 1.8-3.56 1.43-4.75 2.01-29.37 14.28-29.24 55.87.01 70.08L320 166.01v12.95l-167.69-41.84c-22.03-5.48-45.5 3.28-58.53 21.77L5.03 285.13c-14.39 22.6 4.05 52.39 33.06 48.25l91.52-17.21c-14.71 23.28 5.27 52.03 31.82 48.36l180.76-24.23c4.91 10.23 10.58 19.99 17.01 29.17-147.08 10.08-247.2 32.47-321.46 48.52C15.88 422.71 0 442.24 0 464.42c0 26.21 21.52 47.54 47.98 47.54l449.17.04c76.07.01 138.73-55.84 142.65-127.15 2.96-53.81-26.93-104.04-76.13-127.97zM68.03 278.95l65-92.44c1.66-2.38 4.59-3.66 7.69-2.81l69.82 17.33-41.4 58.87-101.11 19.05zm123.03 33.18l69.38-98.67L320 228.47c0 21.25.13 36.77 6.72 65.48l-135.66 18.18zM497.15 464l-449.26.9c92.02-19.88 196.84-43.56 383.18-51.02 16.58-.67 23.38-21.76 9.29-31.79C367.78 330.38 368 258.74 368 239.03V132.98l-45.11-17.22 57.34-23.24L324.16 48h188.22c3.96 0 7.7 1.84 10.12 4.97l67.13 87.01c2.7 3.5 3.13 8.23 1.11 12.16l-12.88 25.04c-2.12 4.13-6.65 6.79-11.53 6.79h-27.87c-3.61 0-3.61 0-16.5-8.37-5.12-3.33-24.56-15.64-24.56-15.64H416v44.11c0 22.19 12.6 42.09 33.08 52.04l93.59 43.92c32.27 15.69 51.12 47.18 49.2 82.16-2.48 45.13-44.97 81.82-94.72 81.81z"],
    "duck": [576, 512, [], "f6d8", "M416 144c0-8.84-7.16-16-16-16s-16 7.16-16 16 7.16 16 16 16 16-7.16 16-16zm48 96c61.86 0 112-50.14 112-112h-65.57c-.46-3.32-.6-6.58-1.36-9.95-9.15-40.61-41.97-73.7-82.54-83-9-2.07-17.88-3.05-26.53-3.05-61.86 0-112 50.14-112 112v80h-54.23c-39 0-78.18-13.76-104.79-42.28-3.96-4.25-8.94-6.14-13.82-6.14-9.78 0-19.16 7.59-19.16 19.06 0 94.71 72.21 178.39 164.58 188.02 9.47.99 17.77-6.49 17.77-16.01v-16.09c0-8.02-5.94-14.86-13.9-15.77-45.77-5.2-85.53-35.7-105.91-77.49 23.38 9.37 48.83 14.27 75.24 14.27L336 272V144c0-35.29 28.71-64 64-64 5.19 0 10.5.62 15.79 1.83 22.66 5.2 41.32 23.99 46.46 46.77 7.9 35.06-11.85 61.87-34.92 72.89L400 214.54v71.63l11.86 13.57c8.89 10.18 19.61 27.21 20.12 50.54.43 19.57-7.61 38.82-22.64 54.19-17.12 17.5-40.59 27.54-64.39 27.54h-91.17c-6.03 0-12.1-.31-18.66-.97-88.83-7.9-163.37-73.51-183.76-159.04h29.28a190.546 190.546 0 0 1-14.15-48H32.25C12.96 224-2.39 241.03.31 260.13 16.82 376.94 112.22 468.3 230.87 478.84c7.53.77 15.18 1.16 22.91 1.16h91.17c71.96 0 136.61-58.84 135.02-130.78-.69-31.13-12.86-59.21-31.97-81.07V240h16z"]
  };

  bunker(function () {
    defineIcons('far', icons);
  });

}());
