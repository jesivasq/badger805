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
    "badger-honey": [640, 512, [], "f6b4", "M622.25 142.47c-57.65-32.65-70.98-50.67-115.56-69.92C493.37 66.8 479.4 64 465.45 64c-19.05 0-38.09 5.21-55.47 15.21C392.89 89.05 374.05 96 354.95 96H128C57.31 96 0 153.31 0 224v16c0 8.84 7.16 16 16 16h20.03c7.79 33.38 28.05 64.24 53.53 81.18l-21.49 57.3a63.945 63.945 0 0 0-2.16 37.99L80 467.88A16.002 16.002 0 0 0 95.52 480h63.77c10.41 0 18.05-9.78 15.52-19.88l-15.55-41.26L192.22 352h105.69l23.03 115.14c1.5 7.48 8.06 12.86 15.69 12.86H400c10.1 0 17.67-9.24 15.69-19.14l-27-134.96c45.38-30.54 101.24-61.08 152.48-75.55L560 288l22.65-45.3c28.46-2.37 36.45-9.47 41.19-19.81 7-15.27 16.16-35.79 16.16-47.62 0-13.93-6.88-26.65-17.75-32.8zM515.19 160c.28 1.34.81 2.58.81 4 0 11.04-8.96 20-20 20s-20-8.96-20-20c0-1.42.53-2.66.81-4H460c-29.06 0-57.86 13.05-84.85 26.01l-101.98 61.75c-11.34 5.44-23.44 8.24-35.65 8.24H192c-42.49 0-78.12-41.48-90.76-90.66C113.52 152.13 130.03 144 148.3 144h206.65c25.67 0 52.24-7.8 78.97-23.19 10.02-5.77 20.92-8.81 31.53-8.81 7.65 0 15.12 1.55 22.21 4.62 26.87 11.6 36.43 20.42 71.41 43.38h-43.88z"],
    "dragon": [640, 512, [], "f6d5", "M18.32 255.78L192 223.96l-91.28 68.69c-10.08 10.08-2.94 27.31 11.31 27.31h222.7c-9.44-26.4-14.73-54.47-14.73-83.38v-42.27l-119.73-87.6c-23.82-15.88-55.29-14.01-77.06 4.59L5.81 227.64c-12.38 10.33-3.45 30.42 12.51 28.14zm556.87 34.1l-100.66-50.31A47.992 47.992 0 0 1 448 196.65v-36.69h64l28.09 22.63c6 6 14.14 9.37 22.63 9.37h30.97a32 32 0 0 0 28.62-17.69l14.31-28.62a32.005 32.005 0 0 0-3.02-33.51l-74.53-99.38C553.02 4.7 543.54 0 533.47 0H296.02c-7.13 0-10.7 8.57-5.66 13.61L352 63.96 292.42 88.8c-5.9 2.95-5.9 11.36 0 14.31L352 127.96v108.62c0 72.08 36.03 139.39 96 179.38-195.59 6.81-344.56 41.01-434.1 60.91C5.78 478.67 0 485.88 0 494.2 0 504 7.95 512 17.76 512h499.08c63.29.01 119.61-47.56 122.99-110.76 2.52-47.28-22.73-90.4-64.64-111.36zM489.18 66.25l45.65 11.41c-2.75 10.91-12.47 18.89-24.13 18.26-12.96-.71-25.85-12.53-21.52-29.67z"],
    "duck": [512, 512, [], "f6d8", "M416 224c53.02 0 96-42.98 96-96h-64c0-53.02-42.98-96-96-96s-96 42.98-96 96c0 23.15 8.37 44.15 22.1 60.59 6.25 7.48 9.9 16.78 9.9 26.53 0 22.58-18.3 40.88-40.88 40.88h-21.69c-31.51 0-80.18-13.2-101.68-36.24C113.73 209.03 96 216.17 96 230.63 96 315.33 164.67 384 249.37 384h-32c-76.01 0-138.67-55.44-150.82-128h-50.4C7.03 256-.64 263.66.03 272.75 8.61 388.64 105.35 480 223.42 480h107.2c55.51 0 110.81-44.52 116.72-99.71 4.54-42.43-14.76-80.4-46.04-102.86-10.85-7.79-17.3-20.27-17.3-33.63 0-7.12 1.97-13.83 5.33-19.79H416zm-64-80c-8.84 0-16-7.16-16-16s7.16-16 16-16 16 7.16 16 16-7.16 16-16 16z"]
  };

  bunker(function () {
    defineIcons('fas', icons);
  });

}());
