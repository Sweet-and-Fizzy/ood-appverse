var Oc = { exports: {} }, Du = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Vd;
function Vy() {
  if (Vd) return Du;
  Vd = 1;
  var f = Symbol.for("react.transitional.element"), s = Symbol.for("react.fragment");
  function o(r, g, p) {
    var z = null;
    if (p !== void 0 && (z = "" + p), g.key !== void 0 && (z = "" + g.key), "key" in g) {
      p = {};
      for (var C in g)
        C !== "key" && (p[C] = g[C]);
    } else p = g;
    return g = p.ref, {
      $$typeof: f,
      type: r,
      key: z,
      ref: g !== void 0 ? g : null,
      props: p
    };
  }
  return Du.Fragment = s, Du.jsx = o, Du.jsxs = o, Du;
}
var Kd;
function Ky() {
  return Kd || (Kd = 1, Oc.exports = Vy()), Oc.exports;
}
var J = Ky(), Rc = { exports: {} }, Uu = {}, Dc = { exports: {} }, Uc = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Jd;
function Jy() {
  return Jd || (Jd = 1, (function(f) {
    function s(O, j) {
      var $ = O.length;
      O.push(j);
      t: for (; 0 < $; ) {
        var ht = $ - 1 >>> 1, pt = O[ht];
        if (0 < g(pt, j))
          O[ht] = j, O[$] = pt, $ = ht;
        else break t;
      }
    }
    function o(O) {
      return O.length === 0 ? null : O[0];
    }
    function r(O) {
      if (O.length === 0) return null;
      var j = O[0], $ = O.pop();
      if ($ !== j) {
        O[0] = $;
        t: for (var ht = 0, pt = O.length, h = pt >>> 1; ht < h; ) {
          var N = 2 * (ht + 1) - 1, q = O[N], X = N + 1, I = O[X];
          if (0 > g(q, $))
            X < pt && 0 > g(I, q) ? (O[ht] = I, O[X] = $, ht = X) : (O[ht] = q, O[N] = $, ht = N);
          else if (X < pt && 0 > g(I, $))
            O[ht] = I, O[X] = $, ht = X;
          else break t;
        }
      }
      return j;
    }
    function g(O, j) {
      var $ = O.sortIndex - j.sortIndex;
      return $ !== 0 ? $ : O.id - j.id;
    }
    if (f.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var p = performance;
      f.unstable_now = function() {
        return p.now();
      };
    } else {
      var z = Date, C = z.now();
      f.unstable_now = function() {
        return z.now() - C;
      };
    }
    var T = [], y = [], D = 1, _ = null, B = 3, H = !1, Y = !1, V = !1, F = !1, w = typeof setTimeout == "function" ? setTimeout : null, rt = typeof clearTimeout == "function" ? clearTimeout : null, G = typeof setImmediate < "u" ? setImmediate : null;
    function bt(O) {
      for (var j = o(y); j !== null; ) {
        if (j.callback === null) r(y);
        else if (j.startTime <= O)
          r(y), j.sortIndex = j.expirationTime, s(T, j);
        else break;
        j = o(y);
      }
    }
    function Ot(O) {
      if (V = !1, bt(O), !Y)
        if (o(T) !== null)
          Y = !0, Rt || (Rt = !0, Xt());
        else {
          var j = o(y);
          j !== null && Ml(Ot, j.startTime - O);
        }
    }
    var Rt = !1, W = -1, qt = 5, Gt = -1;
    function wt() {
      return F ? !0 : !(f.unstable_now() - Gt < qt);
    }
    function Wt() {
      if (F = !1, Rt) {
        var O = f.unstable_now();
        Gt = O;
        var j = !0;
        try {
          t: {
            Y = !1, V && (V = !1, rt(W), W = -1), H = !0;
            var $ = B;
            try {
              l: {
                for (bt(O), _ = o(T); _ !== null && !(_.expirationTime > O && wt()); ) {
                  var ht = _.callback;
                  if (typeof ht == "function") {
                    _.callback = null, B = _.priorityLevel;
                    var pt = ht(
                      _.expirationTime <= O
                    );
                    if (O = f.unstable_now(), typeof pt == "function") {
                      _.callback = pt, bt(O), j = !0;
                      break l;
                    }
                    _ === o(T) && r(T), bt(O);
                  } else r(T);
                  _ = o(T);
                }
                if (_ !== null) j = !0;
                else {
                  var h = o(y);
                  h !== null && Ml(
                    Ot,
                    h.startTime - O
                  ), j = !1;
                }
              }
              break t;
            } finally {
              _ = null, B = $, H = !1;
            }
            j = void 0;
          }
        } finally {
          j ? Xt() : Rt = !1;
        }
      }
    }
    var Xt;
    if (typeof G == "function")
      Xt = function() {
        G(Wt);
      };
    else if (typeof MessageChannel < "u") {
      var Re = new MessageChannel(), jl = Re.port2;
      Re.port1.onmessage = Wt, Xt = function() {
        jl.postMessage(null);
      };
    } else
      Xt = function() {
        w(Wt, 0);
      };
    function Ml(O, j) {
      W = w(function() {
        O(f.unstable_now());
      }, j);
    }
    f.unstable_IdlePriority = 5, f.unstable_ImmediatePriority = 1, f.unstable_LowPriority = 4, f.unstable_NormalPriority = 3, f.unstable_Profiling = null, f.unstable_UserBlockingPriority = 2, f.unstable_cancelCallback = function(O) {
      O.callback = null;
    }, f.unstable_forceFrameRate = function(O) {
      0 > O || 125 < O ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : qt = 0 < O ? Math.floor(1e3 / O) : 5;
    }, f.unstable_getCurrentPriorityLevel = function() {
      return B;
    }, f.unstable_next = function(O) {
      switch (B) {
        case 1:
        case 2:
        case 3:
          var j = 3;
          break;
        default:
          j = B;
      }
      var $ = B;
      B = j;
      try {
        return O();
      } finally {
        B = $;
      }
    }, f.unstable_requestPaint = function() {
      F = !0;
    }, f.unstable_runWithPriority = function(O, j) {
      switch (O) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          O = 3;
      }
      var $ = B;
      B = O;
      try {
        return j();
      } finally {
        B = $;
      }
    }, f.unstable_scheduleCallback = function(O, j, $) {
      var ht = f.unstable_now();
      switch (typeof $ == "object" && $ !== null ? ($ = $.delay, $ = typeof $ == "number" && 0 < $ ? ht + $ : ht) : $ = ht, O) {
        case 1:
          var pt = -1;
          break;
        case 2:
          pt = 250;
          break;
        case 5:
          pt = 1073741823;
          break;
        case 4:
          pt = 1e4;
          break;
        default:
          pt = 5e3;
      }
      return pt = $ + pt, O = {
        id: D++,
        callback: j,
        priorityLevel: O,
        startTime: $,
        expirationTime: pt,
        sortIndex: -1
      }, $ > ht ? (O.sortIndex = $, s(y, O), o(T) === null && O === o(y) && (V ? (rt(W), W = -1) : V = !0, Ml(Ot, $ - ht))) : (O.sortIndex = pt, s(T, O), Y || H || (Y = !0, Rt || (Rt = !0, Xt()))), O;
    }, f.unstable_shouldYield = wt, f.unstable_wrapCallback = function(O) {
      var j = B;
      return function() {
        var $ = B;
        B = j;
        try {
          return O.apply(this, arguments);
        } finally {
          B = $;
        }
      };
    };
  })(Uc)), Uc;
}
var wd;
function wy() {
  return wd || (wd = 1, Dc.exports = Jy()), Dc.exports;
}
var Cc = { exports: {} }, k = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var $d;
function $y() {
  if ($d) return k;
  $d = 1;
  var f = Symbol.for("react.transitional.element"), s = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), g = Symbol.for("react.profiler"), p = Symbol.for("react.consumer"), z = Symbol.for("react.context"), C = Symbol.for("react.forward_ref"), T = Symbol.for("react.suspense"), y = Symbol.for("react.memo"), D = Symbol.for("react.lazy"), _ = Symbol.for("react.activity"), B = Symbol.iterator;
  function H(h) {
    return h === null || typeof h != "object" ? null : (h = B && h[B] || h["@@iterator"], typeof h == "function" ? h : null);
  }
  var Y = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, V = Object.assign, F = {};
  function w(h, N, q) {
    this.props = h, this.context = N, this.refs = F, this.updater = q || Y;
  }
  w.prototype.isReactComponent = {}, w.prototype.setState = function(h, N) {
    if (typeof h != "object" && typeof h != "function" && h != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, h, N, "setState");
  }, w.prototype.forceUpdate = function(h) {
    this.updater.enqueueForceUpdate(this, h, "forceUpdate");
  };
  function rt() {
  }
  rt.prototype = w.prototype;
  function G(h, N, q) {
    this.props = h, this.context = N, this.refs = F, this.updater = q || Y;
  }
  var bt = G.prototype = new rt();
  bt.constructor = G, V(bt, w.prototype), bt.isPureReactComponent = !0;
  var Ot = Array.isArray;
  function Rt() {
  }
  var W = { H: null, A: null, T: null, S: null }, qt = Object.prototype.hasOwnProperty;
  function Gt(h, N, q) {
    var X = q.ref;
    return {
      $$typeof: f,
      type: h,
      key: N,
      ref: X !== void 0 ? X : null,
      props: q
    };
  }
  function wt(h, N) {
    return Gt(h.type, N, h.props);
  }
  function Wt(h) {
    return typeof h == "object" && h !== null && h.$$typeof === f;
  }
  function Xt(h) {
    var N = { "=": "=0", ":": "=2" };
    return "$" + h.replace(/[=:]/g, function(q) {
      return N[q];
    });
  }
  var Re = /\/+/g;
  function jl(h, N) {
    return typeof h == "object" && h !== null && h.key != null ? Xt("" + h.key) : N.toString(36);
  }
  function Ml(h) {
    switch (h.status) {
      case "fulfilled":
        return h.value;
      case "rejected":
        throw h.reason;
      default:
        switch (typeof h.status == "string" ? h.then(Rt, Rt) : (h.status = "pending", h.then(
          function(N) {
            h.status === "pending" && (h.status = "fulfilled", h.value = N);
          },
          function(N) {
            h.status === "pending" && (h.status = "rejected", h.reason = N);
          }
        )), h.status) {
          case "fulfilled":
            return h.value;
          case "rejected":
            throw h.reason;
        }
    }
    throw h;
  }
  function O(h, N, q, X, I) {
    var lt = typeof h;
    (lt === "undefined" || lt === "boolean") && (h = null);
    var st = !1;
    if (h === null) st = !0;
    else
      switch (lt) {
        case "bigint":
        case "string":
        case "number":
          st = !0;
          break;
        case "object":
          switch (h.$$typeof) {
            case f:
            case s:
              st = !0;
              break;
            case D:
              return st = h._init, O(
                st(h._payload),
                N,
                q,
                X,
                I
              );
          }
      }
    if (st)
      return I = I(h), st = X === "" ? "." + jl(h, 0) : X, Ot(I) ? (q = "", st != null && (q = st.replace(Re, "$&/") + "/"), O(I, N, q, "", function(ja) {
        return ja;
      })) : I != null && (Wt(I) && (I = wt(
        I,
        q + (I.key == null || h && h.key === I.key ? "" : ("" + I.key).replace(
          Re,
          "$&/"
        ) + "/") + st
      )), N.push(I)), 1;
    st = 0;
    var kt = X === "" ? "." : X + ":";
    if (Ot(h))
      for (var Dt = 0; Dt < h.length; Dt++)
        X = h[Dt], lt = kt + jl(X, Dt), st += O(
          X,
          N,
          q,
          lt,
          I
        );
    else if (Dt = H(h), typeof Dt == "function")
      for (h = Dt.call(h), Dt = 0; !(X = h.next()).done; )
        X = X.value, lt = kt + jl(X, Dt++), st += O(
          X,
          N,
          q,
          lt,
          I
        );
    else if (lt === "object") {
      if (typeof h.then == "function")
        return O(
          Ml(h),
          N,
          q,
          X,
          I
        );
      throw N = String(h), Error(
        "Objects are not valid as a React child (found: " + (N === "[object Object]" ? "object with keys {" + Object.keys(h).join(", ") + "}" : N) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return st;
  }
  function j(h, N, q) {
    if (h == null) return h;
    var X = [], I = 0;
    return O(h, X, "", "", function(lt) {
      return N.call(q, lt, I++);
    }), X;
  }
  function $(h) {
    if (h._status === -1) {
      var N = h._result;
      N = N(), N.then(
        function(q) {
          (h._status === 0 || h._status === -1) && (h._status = 1, h._result = q);
        },
        function(q) {
          (h._status === 0 || h._status === -1) && (h._status = 2, h._result = q);
        }
      ), h._status === -1 && (h._status = 0, h._result = N);
    }
    if (h._status === 1) return h._result.default;
    throw h._result;
  }
  var ht = typeof reportError == "function" ? reportError : function(h) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var N = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof h == "object" && h !== null && typeof h.message == "string" ? String(h.message) : String(h),
        error: h
      });
      if (!window.dispatchEvent(N)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", h);
      return;
    }
    console.error(h);
  }, pt = {
    map: j,
    forEach: function(h, N, q) {
      j(
        h,
        function() {
          N.apply(this, arguments);
        },
        q
      );
    },
    count: function(h) {
      var N = 0;
      return j(h, function() {
        N++;
      }), N;
    },
    toArray: function(h) {
      return j(h, function(N) {
        return N;
      }) || [];
    },
    only: function(h) {
      if (!Wt(h))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return h;
    }
  };
  return k.Activity = _, k.Children = pt, k.Component = w, k.Fragment = o, k.Profiler = g, k.PureComponent = G, k.StrictMode = r, k.Suspense = T, k.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = W, k.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(h) {
      return W.H.useMemoCache(h);
    }
  }, k.cache = function(h) {
    return function() {
      return h.apply(null, arguments);
    };
  }, k.cacheSignal = function() {
    return null;
  }, k.cloneElement = function(h, N, q) {
    if (h == null)
      throw Error(
        "The argument must be a React element, but you passed " + h + "."
      );
    var X = V({}, h.props), I = h.key;
    if (N != null)
      for (lt in N.key !== void 0 && (I = "" + N.key), N)
        !qt.call(N, lt) || lt === "key" || lt === "__self" || lt === "__source" || lt === "ref" && N.ref === void 0 || (X[lt] = N[lt]);
    var lt = arguments.length - 2;
    if (lt === 1) X.children = q;
    else if (1 < lt) {
      for (var st = Array(lt), kt = 0; kt < lt; kt++)
        st[kt] = arguments[kt + 2];
      X.children = st;
    }
    return Gt(h.type, I, X);
  }, k.createContext = function(h) {
    return h = {
      $$typeof: z,
      _currentValue: h,
      _currentValue2: h,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, h.Provider = h, h.Consumer = {
      $$typeof: p,
      _context: h
    }, h;
  }, k.createElement = function(h, N, q) {
    var X, I = {}, lt = null;
    if (N != null)
      for (X in N.key !== void 0 && (lt = "" + N.key), N)
        qt.call(N, X) && X !== "key" && X !== "__self" && X !== "__source" && (I[X] = N[X]);
    var st = arguments.length - 2;
    if (st === 1) I.children = q;
    else if (1 < st) {
      for (var kt = Array(st), Dt = 0; Dt < st; Dt++)
        kt[Dt] = arguments[Dt + 2];
      I.children = kt;
    }
    if (h && h.defaultProps)
      for (X in st = h.defaultProps, st)
        I[X] === void 0 && (I[X] = st[X]);
    return Gt(h, lt, I);
  }, k.createRef = function() {
    return { current: null };
  }, k.forwardRef = function(h) {
    return { $$typeof: C, render: h };
  }, k.isValidElement = Wt, k.lazy = function(h) {
    return {
      $$typeof: D,
      _payload: { _status: -1, _result: h },
      _init: $
    };
  }, k.memo = function(h, N) {
    return {
      $$typeof: y,
      type: h,
      compare: N === void 0 ? null : N
    };
  }, k.startTransition = function(h) {
    var N = W.T, q = {};
    W.T = q;
    try {
      var X = h(), I = W.S;
      I !== null && I(q, X), typeof X == "object" && X !== null && typeof X.then == "function" && X.then(Rt, ht);
    } catch (lt) {
      ht(lt);
    } finally {
      N !== null && q.types !== null && (N.types = q.types), W.T = N;
    }
  }, k.unstable_useCacheRefresh = function() {
    return W.H.useCacheRefresh();
  }, k.use = function(h) {
    return W.H.use(h);
  }, k.useActionState = function(h, N, q) {
    return W.H.useActionState(h, N, q);
  }, k.useCallback = function(h, N) {
    return W.H.useCallback(h, N);
  }, k.useContext = function(h) {
    return W.H.useContext(h);
  }, k.useDebugValue = function() {
  }, k.useDeferredValue = function(h, N) {
    return W.H.useDeferredValue(h, N);
  }, k.useEffect = function(h, N) {
    return W.H.useEffect(h, N);
  }, k.useEffectEvent = function(h) {
    return W.H.useEffectEvent(h);
  }, k.useId = function() {
    return W.H.useId();
  }, k.useImperativeHandle = function(h, N, q) {
    return W.H.useImperativeHandle(h, N, q);
  }, k.useInsertionEffect = function(h, N) {
    return W.H.useInsertionEffect(h, N);
  }, k.useLayoutEffect = function(h, N) {
    return W.H.useLayoutEffect(h, N);
  }, k.useMemo = function(h, N) {
    return W.H.useMemo(h, N);
  }, k.useOptimistic = function(h, N) {
    return W.H.useOptimistic(h, N);
  }, k.useReducer = function(h, N, q) {
    return W.H.useReducer(h, N, q);
  }, k.useRef = function(h) {
    return W.H.useRef(h);
  }, k.useState = function(h) {
    return W.H.useState(h);
  }, k.useSyncExternalStore = function(h, N, q) {
    return W.H.useSyncExternalStore(
      h,
      N,
      q
    );
  }, k.useTransition = function() {
    return W.H.useTransition();
  }, k.version = "19.2.3", k;
}
var Wd;
function jc() {
  return Wd || (Wd = 1, Cc.exports = $y()), Cc.exports;
}
var xc = { exports: {} }, $t = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var kd;
function Wy() {
  if (kd) return $t;
  kd = 1;
  var f = jc();
  function s(T) {
    var y = "https://react.dev/errors/" + T;
    if (1 < arguments.length) {
      y += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var D = 2; D < arguments.length; D++)
        y += "&args[]=" + encodeURIComponent(arguments[D]);
    }
    return "Minified React error #" + T + "; visit " + y + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function o() {
  }
  var r = {
    d: {
      f: o,
      r: function() {
        throw Error(s(522));
      },
      D: o,
      C: o,
      L: o,
      m: o,
      X: o,
      S: o,
      M: o
    },
    p: 0,
    findDOMNode: null
  }, g = Symbol.for("react.portal");
  function p(T, y, D) {
    var _ = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: g,
      key: _ == null ? null : "" + _,
      children: T,
      containerInfo: y,
      implementation: D
    };
  }
  var z = f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function C(T, y) {
    if (T === "font") return "";
    if (typeof y == "string")
      return y === "use-credentials" ? y : "";
  }
  return $t.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r, $t.createPortal = function(T, y) {
    var D = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!y || y.nodeType !== 1 && y.nodeType !== 9 && y.nodeType !== 11)
      throw Error(s(299));
    return p(T, y, null, D);
  }, $t.flushSync = function(T) {
    var y = z.T, D = r.p;
    try {
      if (z.T = null, r.p = 2, T) return T();
    } finally {
      z.T = y, r.p = D, r.d.f();
    }
  }, $t.preconnect = function(T, y) {
    typeof T == "string" && (y ? (y = y.crossOrigin, y = typeof y == "string" ? y === "use-credentials" ? y : "" : void 0) : y = null, r.d.C(T, y));
  }, $t.prefetchDNS = function(T) {
    typeof T == "string" && r.d.D(T);
  }, $t.preinit = function(T, y) {
    if (typeof T == "string" && y && typeof y.as == "string") {
      var D = y.as, _ = C(D, y.crossOrigin), B = typeof y.integrity == "string" ? y.integrity : void 0, H = typeof y.fetchPriority == "string" ? y.fetchPriority : void 0;
      D === "style" ? r.d.S(
        T,
        typeof y.precedence == "string" ? y.precedence : void 0,
        {
          crossOrigin: _,
          integrity: B,
          fetchPriority: H
        }
      ) : D === "script" && r.d.X(T, {
        crossOrigin: _,
        integrity: B,
        fetchPriority: H,
        nonce: typeof y.nonce == "string" ? y.nonce : void 0
      });
    }
  }, $t.preinitModule = function(T, y) {
    if (typeof T == "string")
      if (typeof y == "object" && y !== null) {
        if (y.as == null || y.as === "script") {
          var D = C(
            y.as,
            y.crossOrigin
          );
          r.d.M(T, {
            crossOrigin: D,
            integrity: typeof y.integrity == "string" ? y.integrity : void 0,
            nonce: typeof y.nonce == "string" ? y.nonce : void 0
          });
        }
      } else y == null && r.d.M(T);
  }, $t.preload = function(T, y) {
    if (typeof T == "string" && typeof y == "object" && y !== null && typeof y.as == "string") {
      var D = y.as, _ = C(D, y.crossOrigin);
      r.d.L(T, D, {
        crossOrigin: _,
        integrity: typeof y.integrity == "string" ? y.integrity : void 0,
        nonce: typeof y.nonce == "string" ? y.nonce : void 0,
        type: typeof y.type == "string" ? y.type : void 0,
        fetchPriority: typeof y.fetchPriority == "string" ? y.fetchPriority : void 0,
        referrerPolicy: typeof y.referrerPolicy == "string" ? y.referrerPolicy : void 0,
        imageSrcSet: typeof y.imageSrcSet == "string" ? y.imageSrcSet : void 0,
        imageSizes: typeof y.imageSizes == "string" ? y.imageSizes : void 0,
        media: typeof y.media == "string" ? y.media : void 0
      });
    }
  }, $t.preloadModule = function(T, y) {
    if (typeof T == "string")
      if (y) {
        var D = C(y.as, y.crossOrigin);
        r.d.m(T, {
          as: typeof y.as == "string" && y.as !== "script" ? y.as : void 0,
          crossOrigin: D,
          integrity: typeof y.integrity == "string" ? y.integrity : void 0
        });
      } else r.d.m(T);
  }, $t.requestFormReset = function(T) {
    r.d.r(T);
  }, $t.unstable_batchedUpdates = function(T, y) {
    return T(y);
  }, $t.useFormState = function(T, y, D) {
    return z.H.useFormState(T, y, D);
  }, $t.useFormStatus = function() {
    return z.H.useHostTransitionStatus();
  }, $t.version = "19.2.3", $t;
}
var Fd;
function ky() {
  if (Fd) return xc.exports;
  Fd = 1;
  function f() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f);
      } catch (s) {
        console.error(s);
      }
  }
  return f(), xc.exports = Wy(), xc.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Id;
function Fy() {
  if (Id) return Uu;
  Id = 1;
  var f = wy(), s = jc(), o = ky();
  function r(t) {
    var l = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      l += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var e = 2; e < arguments.length; e++)
        l += "&args[]=" + encodeURIComponent(arguments[e]);
    }
    return "Minified React error #" + t + "; visit " + l + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function g(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function p(t) {
    var l = t, e = t;
    if (t.alternate) for (; l.return; ) l = l.return;
    else {
      t = l;
      do
        l = t, (l.flags & 4098) !== 0 && (e = l.return), t = l.return;
      while (t);
    }
    return l.tag === 3 ? e : null;
  }
  function z(t) {
    if (t.tag === 13) {
      var l = t.memoizedState;
      if (l === null && (t = t.alternate, t !== null && (l = t.memoizedState)), l !== null) return l.dehydrated;
    }
    return null;
  }
  function C(t) {
    if (t.tag === 31) {
      var l = t.memoizedState;
      if (l === null && (t = t.alternate, t !== null && (l = t.memoizedState)), l !== null) return l.dehydrated;
    }
    return null;
  }
  function T(t) {
    if (p(t) !== t)
      throw Error(r(188));
  }
  function y(t) {
    var l = t.alternate;
    if (!l) {
      if (l = p(t), l === null) throw Error(r(188));
      return l !== t ? null : t;
    }
    for (var e = t, a = l; ; ) {
      var u = e.return;
      if (u === null) break;
      var n = u.alternate;
      if (n === null) {
        if (a = u.return, a !== null) {
          e = a;
          continue;
        }
        break;
      }
      if (u.child === n.child) {
        for (n = u.child; n; ) {
          if (n === e) return T(u), t;
          if (n === a) return T(u), l;
          n = n.sibling;
        }
        throw Error(r(188));
      }
      if (e.return !== a.return) e = u, a = n;
      else {
        for (var i = !1, c = u.child; c; ) {
          if (c === e) {
            i = !0, e = u, a = n;
            break;
          }
          if (c === a) {
            i = !0, a = u, e = n;
            break;
          }
          c = c.sibling;
        }
        if (!i) {
          for (c = n.child; c; ) {
            if (c === e) {
              i = !0, e = n, a = u;
              break;
            }
            if (c === a) {
              i = !0, a = n, e = u;
              break;
            }
            c = c.sibling;
          }
          if (!i) throw Error(r(189));
        }
      }
      if (e.alternate !== a) throw Error(r(190));
    }
    if (e.tag !== 3) throw Error(r(188));
    return e.stateNode.current === e ? t : l;
  }
  function D(t) {
    var l = t.tag;
    if (l === 5 || l === 26 || l === 27 || l === 6) return t;
    for (t = t.child; t !== null; ) {
      if (l = D(t), l !== null) return l;
      t = t.sibling;
    }
    return null;
  }
  var _ = Object.assign, B = Symbol.for("react.element"), H = Symbol.for("react.transitional.element"), Y = Symbol.for("react.portal"), V = Symbol.for("react.fragment"), F = Symbol.for("react.strict_mode"), w = Symbol.for("react.profiler"), rt = Symbol.for("react.consumer"), G = Symbol.for("react.context"), bt = Symbol.for("react.forward_ref"), Ot = Symbol.for("react.suspense"), Rt = Symbol.for("react.suspense_list"), W = Symbol.for("react.memo"), qt = Symbol.for("react.lazy"), Gt = Symbol.for("react.activity"), wt = Symbol.for("react.memo_cache_sentinel"), Wt = Symbol.iterator;
  function Xt(t) {
    return t === null || typeof t != "object" ? null : (t = Wt && t[Wt] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var Re = Symbol.for("react.client.reference");
  function jl(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === Re ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case V:
        return "Fragment";
      case w:
        return "Profiler";
      case F:
        return "StrictMode";
      case Ot:
        return "Suspense";
      case Rt:
        return "SuspenseList";
      case Gt:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case Y:
          return "Portal";
        case G:
          return t.displayName || "Context";
        case rt:
          return (t._context.displayName || "Context") + ".Consumer";
        case bt:
          var l = t.render;
          return t = t.displayName, t || (t = l.displayName || l.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case W:
          return l = t.displayName || null, l !== null ? l : jl(t.type) || "Memo";
        case qt:
          l = t._payload, t = t._init;
          try {
            return jl(t(l));
          } catch {
          }
      }
    return null;
  }
  var Ml = Array.isArray, O = s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, j = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, $ = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ht = [], pt = -1;
  function h(t) {
    return { current: t };
  }
  function N(t) {
    0 > pt || (t.current = ht[pt], ht[pt] = null, pt--);
  }
  function q(t, l) {
    pt++, ht[pt] = t.current, t.current = l;
  }
  var X = h(null), I = h(null), lt = h(null), st = h(null);
  function kt(t, l) {
    switch (q(lt, l), q(I, t), q(X, null), l.nodeType) {
      case 9:
      case 11:
        t = (t = l.documentElement) && (t = t.namespaceURI) ? md(t) : 0;
        break;
      default:
        if (t = l.tagName, l = l.namespaceURI)
          l = md(l), t = hd(l, t);
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    N(X), q(X, t);
  }
  function Dt() {
    N(X), N(I), N(lt);
  }
  function ja(t) {
    t.memoizedState !== null && q(st, t);
    var l = X.current, e = hd(l, t.type);
    l !== e && (q(I, t), q(X, e));
  }
  function ju(t) {
    I.current === t && (N(X), N(I)), st.current === t && (N(st), _u._currentValue = $);
  }
  var ci, Qc;
  function De(t) {
    if (ci === void 0)
      try {
        throw Error();
      } catch (e) {
        var l = e.stack.trim().match(/\n( *(at )?)/);
        ci = l && l[1] || "", Qc = -1 < e.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + ci + t + Qc;
  }
  var ri = !1;
  function oi(t, l) {
    if (!t || ri) return "";
    ri = !0;
    var e = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (l) {
              var U = function() {
                throw Error();
              };
              if (Object.defineProperty(U.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(U, []);
                } catch (A) {
                  var E = A;
                }
                Reflect.construct(t, [], U);
              } else {
                try {
                  U.call();
                } catch (A) {
                  E = A;
                }
                t.call(U.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (A) {
                E = A;
              }
              (U = t()) && typeof U.catch == "function" && U.catch(function() {
              });
            }
          } catch (A) {
            if (A && E && typeof A.stack == "string")
              return [A.stack, E.stack];
          }
          return [null, null];
        }
      };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        "name"
      );
      u && u.configurable && Object.defineProperty(
        a.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var n = a.DetermineComponentFrameRoot(), i = n[0], c = n[1];
      if (i && c) {
        var d = i.split(`
`), b = c.split(`
`);
        for (u = a = 0; a < d.length && !d[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; u < b.length && !b[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (a === d.length || u === b.length)
          for (a = d.length - 1, u = b.length - 1; 1 <= a && 0 <= u && d[a] !== b[u]; )
            u--;
        for (; 1 <= a && 0 <= u; a--, u--)
          if (d[a] !== b[u]) {
            if (a !== 1 || u !== 1)
              do
                if (a--, u--, 0 > u || d[a] !== b[u]) {
                  var M = `
` + d[a].replace(" at new ", " at ");
                  return t.displayName && M.includes("<anonymous>") && (M = M.replace("<anonymous>", t.displayName)), M;
                }
              while (1 <= a && 0 <= u);
            break;
          }
      }
    } finally {
      ri = !1, Error.prepareStackTrace = e;
    }
    return (e = t ? t.displayName || t.name : "") ? De(e) : "";
  }
  function Em(t, l) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return De(t.type);
      case 16:
        return De("Lazy");
      case 13:
        return t.child !== l && l !== null ? De("Suspense Fallback") : De("Suspense");
      case 19:
        return De("SuspenseList");
      case 0:
      case 15:
        return oi(t.type, !1);
      case 11:
        return oi(t.type.render, !1);
      case 1:
        return oi(t.type, !0);
      case 31:
        return De("Activity");
      default:
        return "";
    }
  }
  function Zc(t) {
    try {
      var l = "", e = null;
      do
        l += Em(t, e), e = t, t = t.return;
      while (t);
      return l;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var si = Object.prototype.hasOwnProperty, di = f.unstable_scheduleCallback, mi = f.unstable_cancelCallback, zm = f.unstable_shouldYield, Tm = f.unstable_requestPaint, nl = f.unstable_now, Am = f.unstable_getCurrentPriorityLevel, Vc = f.unstable_ImmediatePriority, Kc = f.unstable_UserBlockingPriority, qu = f.unstable_NormalPriority, _m = f.unstable_LowPriority, Jc = f.unstable_IdlePriority, Mm = f.log, Om = f.unstable_setDisableYieldValue, qa = null, il = null;
  function ae(t) {
    if (typeof Mm == "function" && Om(t), il && typeof il.setStrictMode == "function")
      try {
        il.setStrictMode(qa, t);
      } catch {
      }
  }
  var fl = Math.clz32 ? Math.clz32 : Um, Rm = Math.log, Dm = Math.LN2;
  function Um(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (Rm(t) / Dm | 0) | 0;
  }
  var Yu = 256, Lu = 262144, Gu = 4194304;
  function Ue(t) {
    var l = t & 42;
    if (l !== 0) return l;
    switch (t & -t) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return t & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return t;
    }
  }
  function Xu(t, l, e) {
    var a = t.pendingLanes;
    if (a === 0) return 0;
    var u = 0, n = t.suspendedLanes, i = t.pingedLanes;
    t = t.warmLanes;
    var c = a & 134217727;
    return c !== 0 ? (a = c & ~n, a !== 0 ? u = Ue(a) : (i &= c, i !== 0 ? u = Ue(i) : e || (e = c & ~t, e !== 0 && (u = Ue(e))))) : (c = a & ~n, c !== 0 ? u = Ue(c) : i !== 0 ? u = Ue(i) : e || (e = a & ~t, e !== 0 && (u = Ue(e)))), u === 0 ? 0 : l !== 0 && l !== u && (l & n) === 0 && (n = u & -u, e = l & -l, n >= e || n === 32 && (e & 4194048) !== 0) ? l : u;
  }
  function Ya(t, l) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & l) === 0;
  }
  function Cm(t, l) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return l + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return l + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function wc() {
    var t = Gu;
    return Gu <<= 1, (Gu & 62914560) === 0 && (Gu = 4194304), t;
  }
  function hi(t) {
    for (var l = [], e = 0; 31 > e; e++) l.push(t);
    return l;
  }
  function La(t, l) {
    t.pendingLanes |= l, l !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function xm(t, l, e, a, u, n) {
    var i = t.pendingLanes;
    t.pendingLanes = e, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= e, t.entangledLanes &= e, t.errorRecoveryDisabledLanes &= e, t.shellSuspendCounter = 0;
    var c = t.entanglements, d = t.expirationTimes, b = t.hiddenUpdates;
    for (e = i & ~e; 0 < e; ) {
      var M = 31 - fl(e), U = 1 << M;
      c[M] = 0, d[M] = -1;
      var E = b[M];
      if (E !== null)
        for (b[M] = null, M = 0; M < E.length; M++) {
          var A = E[M];
          A !== null && (A.lane &= -536870913);
        }
      e &= ~U;
    }
    a !== 0 && $c(t, a, 0), n !== 0 && u === 0 && t.tag !== 0 && (t.suspendedLanes |= n & ~(i & ~l));
  }
  function $c(t, l, e) {
    t.pendingLanes |= l, t.suspendedLanes &= ~l;
    var a = 31 - fl(l);
    t.entangledLanes |= l, t.entanglements[a] = t.entanglements[a] | 1073741824 | e & 261930;
  }
  function Wc(t, l) {
    var e = t.entangledLanes |= l;
    for (t = t.entanglements; e; ) {
      var a = 31 - fl(e), u = 1 << a;
      u & l | t[a] & l && (t[a] |= l), e &= ~u;
    }
  }
  function kc(t, l) {
    var e = l & -l;
    return e = (e & 42) !== 0 ? 1 : yi(e), (e & (t.suspendedLanes | l)) !== 0 ? 0 : e;
  }
  function yi(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function vi(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Fc() {
    var t = j.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : qd(t.type));
  }
  function Ic(t, l) {
    var e = j.p;
    try {
      return j.p = t, l();
    } finally {
      j.p = e;
    }
  }
  var ue = Math.random().toString(36).slice(2), Qt = "__reactFiber$" + ue, It = "__reactProps$" + ue, ke = "__reactContainer$" + ue, gi = "__reactEvents$" + ue, Nm = "__reactListeners$" + ue, Hm = "__reactHandles$" + ue, Pc = "__reactResources$" + ue, Ga = "__reactMarker$" + ue;
  function pi(t) {
    delete t[Qt], delete t[It], delete t[gi], delete t[Nm], delete t[Hm];
  }
  function Fe(t) {
    var l = t[Qt];
    if (l) return l;
    for (var e = t.parentNode; e; ) {
      if (l = e[ke] || e[Qt]) {
        if (e = l.alternate, l.child !== null || e !== null && e.child !== null)
          for (t = Ed(t); t !== null; ) {
            if (e = t[Qt]) return e;
            t = Ed(t);
          }
        return l;
      }
      t = e, e = t.parentNode;
    }
    return null;
  }
  function Ie(t) {
    if (t = t[Qt] || t[ke]) {
      var l = t.tag;
      if (l === 5 || l === 6 || l === 13 || l === 31 || l === 26 || l === 27 || l === 3)
        return t;
    }
    return null;
  }
  function Xa(t) {
    var l = t.tag;
    if (l === 5 || l === 26 || l === 27 || l === 6) return t.stateNode;
    throw Error(r(33));
  }
  function Pe(t) {
    var l = t[Pc];
    return l || (l = t[Pc] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), l;
  }
  function Yt(t) {
    t[Ga] = !0;
  }
  var tr = /* @__PURE__ */ new Set(), lr = {};
  function Ce(t, l) {
    ta(t, l), ta(t + "Capture", l);
  }
  function ta(t, l) {
    for (lr[t] = l, t = 0; t < l.length; t++)
      tr.add(l[t]);
  }
  var Bm = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), er = {}, ar = {};
  function jm(t) {
    return si.call(ar, t) ? !0 : si.call(er, t) ? !1 : Bm.test(t) ? ar[t] = !0 : (er[t] = !0, !1);
  }
  function Qu(t, l, e) {
    if (jm(l))
      if (e === null) t.removeAttribute(l);
      else {
        switch (typeof e) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(l);
            return;
          case "boolean":
            var a = l.toLowerCase().slice(0, 5);
            if (a !== "data-" && a !== "aria-") {
              t.removeAttribute(l);
              return;
            }
        }
        t.setAttribute(l, "" + e);
      }
  }
  function Zu(t, l, e) {
    if (e === null) t.removeAttribute(l);
    else {
      switch (typeof e) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(l);
          return;
      }
      t.setAttribute(l, "" + e);
    }
  }
  function ql(t, l, e, a) {
    if (a === null) t.removeAttribute(e);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(e);
          return;
      }
      t.setAttributeNS(l, e, "" + a);
    }
  }
  function yl(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function ur(t) {
    var l = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (l === "checkbox" || l === "radio");
  }
  function qm(t, l, e) {
    var a = Object.getOwnPropertyDescriptor(
      t.constructor.prototype,
      l
    );
    if (!t.hasOwnProperty(l) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
      var u = a.get, n = a.set;
      return Object.defineProperty(t, l, {
        configurable: !0,
        get: function() {
          return u.call(this);
        },
        set: function(i) {
          e = "" + i, n.call(this, i);
        }
      }), Object.defineProperty(t, l, {
        enumerable: a.enumerable
      }), {
        getValue: function() {
          return e;
        },
        setValue: function(i) {
          e = "" + i;
        },
        stopTracking: function() {
          t._valueTracker = null, delete t[l];
        }
      };
    }
  }
  function Si(t) {
    if (!t._valueTracker) {
      var l = ur(t) ? "checked" : "value";
      t._valueTracker = qm(
        t,
        l,
        "" + t[l]
      );
    }
  }
  function nr(t) {
    if (!t) return !1;
    var l = t._valueTracker;
    if (!l) return !0;
    var e = l.getValue(), a = "";
    return t && (a = ur(t) ? t.checked ? "true" : "false" : t.value), t = a, t !== e ? (l.setValue(t), !0) : !1;
  }
  function Vu(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var Ym = /[\n"\\]/g;
  function vl(t) {
    return t.replace(
      Ym,
      function(l) {
        return "\\" + l.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function bi(t, l, e, a, u, n, i, c) {
    t.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? t.type = i : t.removeAttribute("type"), l != null ? i === "number" ? (l === 0 && t.value === "" || t.value != l) && (t.value = "" + yl(l)) : t.value !== "" + yl(l) && (t.value = "" + yl(l)) : i !== "submit" && i !== "reset" || t.removeAttribute("value"), l != null ? Ei(t, i, yl(l)) : e != null ? Ei(t, i, yl(e)) : a != null && t.removeAttribute("value"), u == null && n != null && (t.defaultChecked = !!n), u != null && (t.checked = u && typeof u != "function" && typeof u != "symbol"), c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? t.name = "" + yl(c) : t.removeAttribute("name");
  }
  function ir(t, l, e, a, u, n, i, c) {
    if (n != null && typeof n != "function" && typeof n != "symbol" && typeof n != "boolean" && (t.type = n), l != null || e != null) {
      if (!(n !== "submit" && n !== "reset" || l != null)) {
        Si(t);
        return;
      }
      e = e != null ? "" + yl(e) : "", l = l != null ? "" + yl(l) : e, c || l === t.value || (t.value = l), t.defaultValue = l;
    }
    a = a ?? u, a = typeof a != "function" && typeof a != "symbol" && !!a, t.checked = c ? t.checked : !!a, t.defaultChecked = !!a, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (t.name = i), Si(t);
  }
  function Ei(t, l, e) {
    l === "number" && Vu(t.ownerDocument) === t || t.defaultValue === "" + e || (t.defaultValue = "" + e);
  }
  function la(t, l, e, a) {
    if (t = t.options, l) {
      l = {};
      for (var u = 0; u < e.length; u++)
        l["$" + e[u]] = !0;
      for (e = 0; e < t.length; e++)
        u = l.hasOwnProperty("$" + t[e].value), t[e].selected !== u && (t[e].selected = u), u && a && (t[e].defaultSelected = !0);
    } else {
      for (e = "" + yl(e), l = null, u = 0; u < t.length; u++) {
        if (t[u].value === e) {
          t[u].selected = !0, a && (t[u].defaultSelected = !0);
          return;
        }
        l !== null || t[u].disabled || (l = t[u]);
      }
      l !== null && (l.selected = !0);
    }
  }
  function fr(t, l, e) {
    if (l != null && (l = "" + yl(l), l !== t.value && (t.value = l), e == null)) {
      t.defaultValue !== l && (t.defaultValue = l);
      return;
    }
    t.defaultValue = e != null ? "" + yl(e) : "";
  }
  function cr(t, l, e, a) {
    if (l == null) {
      if (a != null) {
        if (e != null) throw Error(r(92));
        if (Ml(a)) {
          if (1 < a.length) throw Error(r(93));
          a = a[0];
        }
        e = a;
      }
      e == null && (e = ""), l = e;
    }
    e = yl(l), t.defaultValue = e, a = t.textContent, a === e && a !== "" && a !== null && (t.value = a), Si(t);
  }
  function ea(t, l) {
    if (l) {
      var e = t.firstChild;
      if (e && e === t.lastChild && e.nodeType === 3) {
        e.nodeValue = l;
        return;
      }
    }
    t.textContent = l;
  }
  var Lm = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function rr(t, l, e) {
    var a = l.indexOf("--") === 0;
    e == null || typeof e == "boolean" || e === "" ? a ? t.setProperty(l, "") : l === "float" ? t.cssFloat = "" : t[l] = "" : a ? t.setProperty(l, e) : typeof e != "number" || e === 0 || Lm.has(l) ? l === "float" ? t.cssFloat = e : t[l] = ("" + e).trim() : t[l] = e + "px";
  }
  function or(t, l, e) {
    if (l != null && typeof l != "object")
      throw Error(r(62));
    if (t = t.style, e != null) {
      for (var a in e)
        !e.hasOwnProperty(a) || l != null && l.hasOwnProperty(a) || (a.indexOf("--") === 0 ? t.setProperty(a, "") : a === "float" ? t.cssFloat = "" : t[a] = "");
      for (var u in l)
        a = l[u], l.hasOwnProperty(u) && e[u] !== a && rr(t, u, a);
    } else
      for (var n in l)
        l.hasOwnProperty(n) && rr(t, n, l[n]);
  }
  function zi(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Gm = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), Xm = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Ku(t) {
    return Xm.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function Yl() {
  }
  var Ti = null;
  function Ai(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var aa = null, ua = null;
  function sr(t) {
    var l = Ie(t);
    if (l && (t = l.stateNode)) {
      var e = t[It] || null;
      t: switch (t = l.stateNode, l.type) {
        case "input":
          if (bi(
            t,
            e.value,
            e.defaultValue,
            e.defaultValue,
            e.checked,
            e.defaultChecked,
            e.type,
            e.name
          ), l = e.name, e.type === "radio" && l != null) {
            for (e = t; e.parentNode; ) e = e.parentNode;
            for (e = e.querySelectorAll(
              'input[name="' + vl(
                "" + l
              ) + '"][type="radio"]'
            ), l = 0; l < e.length; l++) {
              var a = e[l];
              if (a !== t && a.form === t.form) {
                var u = a[It] || null;
                if (!u) throw Error(r(90));
                bi(
                  a,
                  u.value,
                  u.defaultValue,
                  u.defaultValue,
                  u.checked,
                  u.defaultChecked,
                  u.type,
                  u.name
                );
              }
            }
            for (l = 0; l < e.length; l++)
              a = e[l], a.form === t.form && nr(a);
          }
          break t;
        case "textarea":
          fr(t, e.value, e.defaultValue);
          break t;
        case "select":
          l = e.value, l != null && la(t, !!e.multiple, l, !1);
      }
    }
  }
  var _i = !1;
  function dr(t, l, e) {
    if (_i) return t(l, e);
    _i = !0;
    try {
      var a = t(l);
      return a;
    } finally {
      if (_i = !1, (aa !== null || ua !== null) && (Nn(), aa && (l = aa, t = ua, ua = aa = null, sr(l), t)))
        for (l = 0; l < t.length; l++) sr(t[l]);
    }
  }
  function Qa(t, l) {
    var e = t.stateNode;
    if (e === null) return null;
    var a = e[It] || null;
    if (a === null) return null;
    e = a[l];
    t: switch (l) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (a = !a.disabled) || (t = t.type, a = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !a;
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (e && typeof e != "function")
      throw Error(
        r(231, l, typeof e)
      );
    return e;
  }
  var Ll = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Mi = !1;
  if (Ll)
    try {
      var Za = {};
      Object.defineProperty(Za, "passive", {
        get: function() {
          Mi = !0;
        }
      }), window.addEventListener("test", Za, Za), window.removeEventListener("test", Za, Za);
    } catch {
      Mi = !1;
    }
  var ne = null, Oi = null, Ju = null;
  function mr() {
    if (Ju) return Ju;
    var t, l = Oi, e = l.length, a, u = "value" in ne ? ne.value : ne.textContent, n = u.length;
    for (t = 0; t < e && l[t] === u[t]; t++) ;
    var i = e - t;
    for (a = 1; a <= i && l[e - a] === u[n - a]; a++) ;
    return Ju = u.slice(t, 1 < a ? 1 - a : void 0);
  }
  function wu(t) {
    var l = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && l === 13 && (t = 13)) : t = l, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function $u() {
    return !0;
  }
  function hr() {
    return !1;
  }
  function Pt(t) {
    function l(e, a, u, n, i) {
      this._reactName = e, this._targetInst = u, this.type = a, this.nativeEvent = n, this.target = i, this.currentTarget = null;
      for (var c in t)
        t.hasOwnProperty(c) && (e = t[c], this[c] = e ? e(n) : n[c]);
      return this.isDefaultPrevented = (n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === !1) ? $u : hr, this.isPropagationStopped = hr, this;
    }
    return _(l.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var e = this.nativeEvent;
        e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = $u);
      },
      stopPropagation: function() {
        var e = this.nativeEvent;
        e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = $u);
      },
      persist: function() {
      },
      isPersistent: $u
    }), l;
  }
  var xe = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Wu = Pt(xe), Va = _({}, xe, { view: 0, detail: 0 }), Qm = Pt(Va), Ri, Di, Ka, ku = _({}, Va, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Ci,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== Ka && (Ka && t.type === "mousemove" ? (Ri = t.screenX - Ka.screenX, Di = t.screenY - Ka.screenY) : Di = Ri = 0, Ka = t), Ri);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : Di;
    }
  }), yr = Pt(ku), Zm = _({}, ku, { dataTransfer: 0 }), Vm = Pt(Zm), Km = _({}, Va, { relatedTarget: 0 }), Ui = Pt(Km), Jm = _({}, xe, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), wm = Pt(Jm), $m = _({}, xe, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), Wm = Pt($m), km = _({}, xe, { data: 0 }), vr = Pt(km), Fm = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, Im = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, Pm = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function th(t) {
    var l = this.nativeEvent;
    return l.getModifierState ? l.getModifierState(t) : (t = Pm[t]) ? !!l[t] : !1;
  }
  function Ci() {
    return th;
  }
  var lh = _({}, Va, {
    key: function(t) {
      if (t.key) {
        var l = Fm[t.key] || t.key;
        if (l !== "Unidentified") return l;
      }
      return t.type === "keypress" ? (t = wu(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? Im[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Ci,
    charCode: function(t) {
      return t.type === "keypress" ? wu(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? wu(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), eh = Pt(lh), ah = _({}, ku, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), gr = Pt(ah), uh = _({}, Va, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Ci
  }), nh = Pt(uh), ih = _({}, xe, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), fh = Pt(ih), ch = _({}, ku, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), rh = Pt(ch), oh = _({}, xe, {
    newState: 0,
    oldState: 0
  }), sh = Pt(oh), dh = [9, 13, 27, 32], xi = Ll && "CompositionEvent" in window, Ja = null;
  Ll && "documentMode" in document && (Ja = document.documentMode);
  var mh = Ll && "TextEvent" in window && !Ja, pr = Ll && (!xi || Ja && 8 < Ja && 11 >= Ja), Sr = " ", br = !1;
  function Er(t, l) {
    switch (t) {
      case "keyup":
        return dh.indexOf(l.keyCode) !== -1;
      case "keydown":
        return l.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function zr(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var na = !1;
  function hh(t, l) {
    switch (t) {
      case "compositionend":
        return zr(l);
      case "keypress":
        return l.which !== 32 ? null : (br = !0, Sr);
      case "textInput":
        return t = l.data, t === Sr && br ? null : t;
      default:
        return null;
    }
  }
  function yh(t, l) {
    if (na)
      return t === "compositionend" || !xi && Er(t, l) ? (t = mr(), Ju = Oi = ne = null, na = !1, t) : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(l.ctrlKey || l.altKey || l.metaKey) || l.ctrlKey && l.altKey) {
          if (l.char && 1 < l.char.length)
            return l.char;
          if (l.which) return String.fromCharCode(l.which);
        }
        return null;
      case "compositionend":
        return pr && l.locale !== "ko" ? null : l.data;
      default:
        return null;
    }
  }
  var vh = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function Tr(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return l === "input" ? !!vh[t.type] : l === "textarea";
  }
  function Ar(t, l, e, a) {
    aa ? ua ? ua.push(a) : ua = [a] : aa = a, l = Gn(l, "onChange"), 0 < l.length && (e = new Wu(
      "onChange",
      "change",
      null,
      e,
      a
    ), t.push({ event: e, listeners: l }));
  }
  var wa = null, $a = null;
  function gh(t) {
    fd(t, 0);
  }
  function Fu(t) {
    var l = Xa(t);
    if (nr(l)) return t;
  }
  function _r(t, l) {
    if (t === "change") return l;
  }
  var Mr = !1;
  if (Ll) {
    var Ni;
    if (Ll) {
      var Hi = "oninput" in document;
      if (!Hi) {
        var Or = document.createElement("div");
        Or.setAttribute("oninput", "return;"), Hi = typeof Or.oninput == "function";
      }
      Ni = Hi;
    } else Ni = !1;
    Mr = Ni && (!document.documentMode || 9 < document.documentMode);
  }
  function Rr() {
    wa && (wa.detachEvent("onpropertychange", Dr), $a = wa = null);
  }
  function Dr(t) {
    if (t.propertyName === "value" && Fu($a)) {
      var l = [];
      Ar(
        l,
        $a,
        t,
        Ai(t)
      ), dr(gh, l);
    }
  }
  function ph(t, l, e) {
    t === "focusin" ? (Rr(), wa = l, $a = e, wa.attachEvent("onpropertychange", Dr)) : t === "focusout" && Rr();
  }
  function Sh(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return Fu($a);
  }
  function bh(t, l) {
    if (t === "click") return Fu(l);
  }
  function Eh(t, l) {
    if (t === "input" || t === "change")
      return Fu(l);
  }
  function zh(t, l) {
    return t === l && (t !== 0 || 1 / t === 1 / l) || t !== t && l !== l;
  }
  var cl = typeof Object.is == "function" ? Object.is : zh;
  function Wa(t, l) {
    if (cl(t, l)) return !0;
    if (typeof t != "object" || t === null || typeof l != "object" || l === null)
      return !1;
    var e = Object.keys(t), a = Object.keys(l);
    if (e.length !== a.length) return !1;
    for (a = 0; a < e.length; a++) {
      var u = e[a];
      if (!si.call(l, u) || !cl(t[u], l[u]))
        return !1;
    }
    return !0;
  }
  function Ur(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Cr(t, l) {
    var e = Ur(t);
    t = 0;
    for (var a; e; ) {
      if (e.nodeType === 3) {
        if (a = t + e.textContent.length, t <= l && a >= l)
          return { node: e, offset: l - t };
        t = a;
      }
      t: {
        for (; e; ) {
          if (e.nextSibling) {
            e = e.nextSibling;
            break t;
          }
          e = e.parentNode;
        }
        e = void 0;
      }
      e = Ur(e);
    }
  }
  function xr(t, l) {
    return t && l ? t === l ? !0 : t && t.nodeType === 3 ? !1 : l && l.nodeType === 3 ? xr(t, l.parentNode) : "contains" in t ? t.contains(l) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(l) & 16) : !1 : !1;
  }
  function Nr(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var l = Vu(t.document); l instanceof t.HTMLIFrameElement; ) {
      try {
        var e = typeof l.contentWindow.location.href == "string";
      } catch {
        e = !1;
      }
      if (e) t = l.contentWindow;
      else break;
      l = Vu(t.document);
    }
    return l;
  }
  function Bi(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return l && (l === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || l === "textarea" || t.contentEditable === "true");
  }
  var Th = Ll && "documentMode" in document && 11 >= document.documentMode, ia = null, ji = null, ka = null, qi = !1;
  function Hr(t, l, e) {
    var a = e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
    qi || ia == null || ia !== Vu(a) || (a = ia, "selectionStart" in a && Bi(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), ka && Wa(ka, a) || (ka = a, a = Gn(ji, "onSelect"), 0 < a.length && (l = new Wu(
      "onSelect",
      "select",
      null,
      l,
      e
    ), t.push({ event: l, listeners: a }), l.target = ia)));
  }
  function Ne(t, l) {
    var e = {};
    return e[t.toLowerCase()] = l.toLowerCase(), e["Webkit" + t] = "webkit" + l, e["Moz" + t] = "moz" + l, e;
  }
  var fa = {
    animationend: Ne("Animation", "AnimationEnd"),
    animationiteration: Ne("Animation", "AnimationIteration"),
    animationstart: Ne("Animation", "AnimationStart"),
    transitionrun: Ne("Transition", "TransitionRun"),
    transitionstart: Ne("Transition", "TransitionStart"),
    transitioncancel: Ne("Transition", "TransitionCancel"),
    transitionend: Ne("Transition", "TransitionEnd")
  }, Yi = {}, Br = {};
  Ll && (Br = document.createElement("div").style, "AnimationEvent" in window || (delete fa.animationend.animation, delete fa.animationiteration.animation, delete fa.animationstart.animation), "TransitionEvent" in window || delete fa.transitionend.transition);
  function He(t) {
    if (Yi[t]) return Yi[t];
    if (!fa[t]) return t;
    var l = fa[t], e;
    for (e in l)
      if (l.hasOwnProperty(e) && e in Br)
        return Yi[t] = l[e];
    return t;
  }
  var jr = He("animationend"), qr = He("animationiteration"), Yr = He("animationstart"), Ah = He("transitionrun"), _h = He("transitionstart"), Mh = He("transitioncancel"), Lr = He("transitionend"), Gr = /* @__PURE__ */ new Map(), Li = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Li.push("scrollEnd");
  function Ol(t, l) {
    Gr.set(t, l), Ce(l, [t]);
  }
  var Iu = typeof reportError == "function" ? reportError : function(t) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var l = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
        error: t
      });
      if (!window.dispatchEvent(l)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", t);
      return;
    }
    console.error(t);
  }, gl = [], ca = 0, Gi = 0;
  function Pu() {
    for (var t = ca, l = Gi = ca = 0; l < t; ) {
      var e = gl[l];
      gl[l++] = null;
      var a = gl[l];
      gl[l++] = null;
      var u = gl[l];
      gl[l++] = null;
      var n = gl[l];
      if (gl[l++] = null, a !== null && u !== null) {
        var i = a.pending;
        i === null ? u.next = u : (u.next = i.next, i.next = u), a.pending = u;
      }
      n !== 0 && Xr(e, u, n);
    }
  }
  function tn(t, l, e, a) {
    gl[ca++] = t, gl[ca++] = l, gl[ca++] = e, gl[ca++] = a, Gi |= a, t.lanes |= a, t = t.alternate, t !== null && (t.lanes |= a);
  }
  function Xi(t, l, e, a) {
    return tn(t, l, e, a), ln(t);
  }
  function Be(t, l) {
    return tn(t, null, null, l), ln(t);
  }
  function Xr(t, l, e) {
    t.lanes |= e;
    var a = t.alternate;
    a !== null && (a.lanes |= e);
    for (var u = !1, n = t.return; n !== null; )
      n.childLanes |= e, a = n.alternate, a !== null && (a.childLanes |= e), n.tag === 22 && (t = n.stateNode, t === null || t._visibility & 1 || (u = !0)), t = n, n = n.return;
    return t.tag === 3 ? (n = t.stateNode, u && l !== null && (u = 31 - fl(e), t = n.hiddenUpdates, a = t[u], a === null ? t[u] = [l] : a.push(l), l.lane = e | 536870912), n) : null;
  }
  function ln(t) {
    if (50 < pu)
      throw pu = 0, Ff = null, Error(r(185));
    for (var l = t.return; l !== null; )
      t = l, l = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var ra = {};
  function Oh(t, l, e, a) {
    this.tag = t, this.key = e, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = l, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function rl(t, l, e, a) {
    return new Oh(t, l, e, a);
  }
  function Qi(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function Gl(t, l) {
    var e = t.alternate;
    return e === null ? (e = rl(
      t.tag,
      l,
      t.key,
      t.mode
    ), e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.alternate = t, t.alternate = e) : (e.pendingProps = l, e.type = t.type, e.flags = 0, e.subtreeFlags = 0, e.deletions = null), e.flags = t.flags & 65011712, e.childLanes = t.childLanes, e.lanes = t.lanes, e.child = t.child, e.memoizedProps = t.memoizedProps, e.memoizedState = t.memoizedState, e.updateQueue = t.updateQueue, l = t.dependencies, e.dependencies = l === null ? null : { lanes: l.lanes, firstContext: l.firstContext }, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.refCleanup = t.refCleanup, e;
  }
  function Qr(t, l) {
    t.flags &= 65011714;
    var e = t.alternate;
    return e === null ? (t.childLanes = 0, t.lanes = l, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = e.childLanes, t.lanes = e.lanes, t.child = e.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = e.memoizedProps, t.memoizedState = e.memoizedState, t.updateQueue = e.updateQueue, t.type = e.type, l = e.dependencies, t.dependencies = l === null ? null : {
      lanes: l.lanes,
      firstContext: l.firstContext
    }), t;
  }
  function en(t, l, e, a, u, n) {
    var i = 0;
    if (a = t, typeof t == "function") Qi(t) && (i = 1);
    else if (typeof t == "string")
      i = xy(
        t,
        e,
        X.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (t) {
        case Gt:
          return t = rl(31, e, l, u), t.elementType = Gt, t.lanes = n, t;
        case V:
          return je(e.children, u, n, l);
        case F:
          i = 8, u |= 24;
          break;
        case w:
          return t = rl(12, e, l, u | 2), t.elementType = w, t.lanes = n, t;
        case Ot:
          return t = rl(13, e, l, u), t.elementType = Ot, t.lanes = n, t;
        case Rt:
          return t = rl(19, e, l, u), t.elementType = Rt, t.lanes = n, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case G:
                i = 10;
                break t;
              case rt:
                i = 9;
                break t;
              case bt:
                i = 11;
                break t;
              case W:
                i = 14;
                break t;
              case qt:
                i = 16, a = null;
                break t;
            }
          i = 29, e = Error(
            r(130, t === null ? "null" : typeof t, "")
          ), a = null;
      }
    return l = rl(i, e, l, u), l.elementType = t, l.type = a, l.lanes = n, l;
  }
  function je(t, l, e, a) {
    return t = rl(7, t, a, l), t.lanes = e, t;
  }
  function Zi(t, l, e) {
    return t = rl(6, t, null, l), t.lanes = e, t;
  }
  function Zr(t) {
    var l = rl(18, null, null, 0);
    return l.stateNode = t, l;
  }
  function Vi(t, l, e) {
    return l = rl(
      4,
      t.children !== null ? t.children : [],
      t.key,
      l
    ), l.lanes = e, l.stateNode = {
      containerInfo: t.containerInfo,
      pendingChildren: null,
      implementation: t.implementation
    }, l;
  }
  var Vr = /* @__PURE__ */ new WeakMap();
  function pl(t, l) {
    if (typeof t == "object" && t !== null) {
      var e = Vr.get(t);
      return e !== void 0 ? e : (l = {
        value: t,
        source: l,
        stack: Zc(l)
      }, Vr.set(t, l), l);
    }
    return {
      value: t,
      source: l,
      stack: Zc(l)
    };
  }
  var oa = [], sa = 0, an = null, Fa = 0, Sl = [], bl = 0, ie = null, Cl = 1, xl = "";
  function Xl(t, l) {
    oa[sa++] = Fa, oa[sa++] = an, an = t, Fa = l;
  }
  function Kr(t, l, e) {
    Sl[bl++] = Cl, Sl[bl++] = xl, Sl[bl++] = ie, ie = t;
    var a = Cl;
    t = xl;
    var u = 32 - fl(a) - 1;
    a &= ~(1 << u), e += 1;
    var n = 32 - fl(l) + u;
    if (30 < n) {
      var i = u - u % 5;
      n = (a & (1 << i) - 1).toString(32), a >>= i, u -= i, Cl = 1 << 32 - fl(l) + u | e << u | a, xl = n + t;
    } else
      Cl = 1 << n | e << u | a, xl = t;
  }
  function Ki(t) {
    t.return !== null && (Xl(t, 1), Kr(t, 1, 0));
  }
  function Ji(t) {
    for (; t === an; )
      an = oa[--sa], oa[sa] = null, Fa = oa[--sa], oa[sa] = null;
    for (; t === ie; )
      ie = Sl[--bl], Sl[bl] = null, xl = Sl[--bl], Sl[bl] = null, Cl = Sl[--bl], Sl[bl] = null;
  }
  function Jr(t, l) {
    Sl[bl++] = Cl, Sl[bl++] = xl, Sl[bl++] = ie, Cl = l.id, xl = l.overflow, ie = t;
  }
  var Zt = null, Et = null, it = !1, fe = null, El = !1, wi = Error(r(519));
  function ce(t) {
    var l = Error(
      r(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Ia(pl(l, t)), wi;
  }
  function wr(t) {
    var l = t.stateNode, e = t.type, a = t.memoizedProps;
    switch (l[Qt] = t, l[It] = a, e) {
      case "dialog":
        at("cancel", l), at("close", l);
        break;
      case "iframe":
      case "object":
      case "embed":
        at("load", l);
        break;
      case "video":
      case "audio":
        for (e = 0; e < bu.length; e++)
          at(bu[e], l);
        break;
      case "source":
        at("error", l);
        break;
      case "img":
      case "image":
      case "link":
        at("error", l), at("load", l);
        break;
      case "details":
        at("toggle", l);
        break;
      case "input":
        at("invalid", l), ir(
          l,
          a.value,
          a.defaultValue,
          a.checked,
          a.defaultChecked,
          a.type,
          a.name,
          !0
        );
        break;
      case "select":
        at("invalid", l);
        break;
      case "textarea":
        at("invalid", l), cr(l, a.value, a.defaultValue, a.children);
    }
    e = a.children, typeof e != "string" && typeof e != "number" && typeof e != "bigint" || l.textContent === "" + e || a.suppressHydrationWarning === !0 || sd(l.textContent, e) ? (a.popover != null && (at("beforetoggle", l), at("toggle", l)), a.onScroll != null && at("scroll", l), a.onScrollEnd != null && at("scrollend", l), a.onClick != null && (l.onclick = Yl), l = !0) : l = !1, l || ce(t, !0);
  }
  function $r(t) {
    for (Zt = t.return; Zt; )
      switch (Zt.tag) {
        case 5:
        case 31:
        case 13:
          El = !1;
          return;
        case 27:
        case 3:
          El = !0;
          return;
        default:
          Zt = Zt.return;
      }
  }
  function da(t) {
    if (t !== Zt) return !1;
    if (!it) return $r(t), it = !0, !1;
    var l = t.tag, e;
    if ((e = l !== 3 && l !== 27) && ((e = l === 5) && (e = t.type, e = !(e !== "form" && e !== "button") || dc(t.type, t.memoizedProps)), e = !e), e && Et && ce(t), $r(t), l === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(317));
      Et = bd(t);
    } else if (l === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(317));
      Et = bd(t);
    } else
      l === 27 ? (l = Et, ze(t.type) ? (t = gc, gc = null, Et = t) : Et = l) : Et = Zt ? Tl(t.stateNode.nextSibling) : null;
    return !0;
  }
  function qe() {
    Et = Zt = null, it = !1;
  }
  function $i() {
    var t = fe;
    return t !== null && (al === null ? al = t : al.push.apply(
      al,
      t
    ), fe = null), t;
  }
  function Ia(t) {
    fe === null ? fe = [t] : fe.push(t);
  }
  var Wi = h(null), Ye = null, Ql = null;
  function re(t, l, e) {
    q(Wi, l._currentValue), l._currentValue = e;
  }
  function Zl(t) {
    t._currentValue = Wi.current, N(Wi);
  }
  function ki(t, l, e) {
    for (; t !== null; ) {
      var a = t.alternate;
      if ((t.childLanes & l) !== l ? (t.childLanes |= l, a !== null && (a.childLanes |= l)) : a !== null && (a.childLanes & l) !== l && (a.childLanes |= l), t === e) break;
      t = t.return;
    }
  }
  function Fi(t, l, e, a) {
    var u = t.child;
    for (u !== null && (u.return = t); u !== null; ) {
      var n = u.dependencies;
      if (n !== null) {
        var i = u.child;
        n = n.firstContext;
        t: for (; n !== null; ) {
          var c = n;
          n = u;
          for (var d = 0; d < l.length; d++)
            if (c.context === l[d]) {
              n.lanes |= e, c = n.alternate, c !== null && (c.lanes |= e), ki(
                n.return,
                e,
                t
              ), a || (i = null);
              break t;
            }
          n = c.next;
        }
      } else if (u.tag === 18) {
        if (i = u.return, i === null) throw Error(r(341));
        i.lanes |= e, n = i.alternate, n !== null && (n.lanes |= e), ki(i, e, t), i = null;
      } else i = u.child;
      if (i !== null) i.return = u;
      else
        for (i = u; i !== null; ) {
          if (i === t) {
            i = null;
            break;
          }
          if (u = i.sibling, u !== null) {
            u.return = i.return, i = u;
            break;
          }
          i = i.return;
        }
      u = i;
    }
  }
  function ma(t, l, e, a) {
    t = null;
    for (var u = l, n = !1; u !== null; ) {
      if (!n) {
        if ((u.flags & 524288) !== 0) n = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var i = u.alternate;
        if (i === null) throw Error(r(387));
        if (i = i.memoizedProps, i !== null) {
          var c = u.type;
          cl(u.pendingProps.value, i.value) || (t !== null ? t.push(c) : t = [c]);
        }
      } else if (u === st.current) {
        if (i = u.alternate, i === null) throw Error(r(387));
        i.memoizedState.memoizedState !== u.memoizedState.memoizedState && (t !== null ? t.push(_u) : t = [_u]);
      }
      u = u.return;
    }
    t !== null && Fi(
      l,
      t,
      e,
      a
    ), l.flags |= 262144;
  }
  function un(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!cl(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function Le(t) {
    Ye = t, Ql = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function Vt(t) {
    return Wr(Ye, t);
  }
  function nn(t, l) {
    return Ye === null && Le(t), Wr(t, l);
  }
  function Wr(t, l) {
    var e = l._currentValue;
    if (l = { context: l, memoizedValue: e, next: null }, Ql === null) {
      if (t === null) throw Error(r(308));
      Ql = l, t.dependencies = { lanes: 0, firstContext: l }, t.flags |= 524288;
    } else Ql = Ql.next = l;
    return e;
  }
  var Rh = typeof AbortController < "u" ? AbortController : function() {
    var t = [], l = this.signal = {
      aborted: !1,
      addEventListener: function(e, a) {
        t.push(a);
      }
    };
    this.abort = function() {
      l.aborted = !0, t.forEach(function(e) {
        return e();
      });
    };
  }, Dh = f.unstable_scheduleCallback, Uh = f.unstable_NormalPriority, xt = {
    $$typeof: G,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Ii() {
    return {
      controller: new Rh(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Pa(t) {
    t.refCount--, t.refCount === 0 && Dh(Uh, function() {
      t.controller.abort();
    });
  }
  var tu = null, Pi = 0, ha = 0, ya = null;
  function Ch(t, l) {
    if (tu === null) {
      var e = tu = [];
      Pi = 0, ha = ac(), ya = {
        status: "pending",
        value: void 0,
        then: function(a) {
          e.push(a);
        }
      };
    }
    return Pi++, l.then(kr, kr), l;
  }
  function kr() {
    if (--Pi === 0 && tu !== null) {
      ya !== null && (ya.status = "fulfilled");
      var t = tu;
      tu = null, ha = 0, ya = null;
      for (var l = 0; l < t.length; l++) (0, t[l])();
    }
  }
  function xh(t, l) {
    var e = [], a = {
      status: "pending",
      value: null,
      reason: null,
      then: function(u) {
        e.push(u);
      }
    };
    return t.then(
      function() {
        a.status = "fulfilled", a.value = l;
        for (var u = 0; u < e.length; u++) (0, e[u])(l);
      },
      function(u) {
        for (a.status = "rejected", a.reason = u, u = 0; u < e.length; u++)
          (0, e[u])(void 0);
      }
    ), a;
  }
  var Fr = O.S;
  O.S = function(t, l) {
    Bs = nl(), typeof l == "object" && l !== null && typeof l.then == "function" && Ch(t, l), Fr !== null && Fr(t, l);
  };
  var Ge = h(null);
  function tf() {
    var t = Ge.current;
    return t !== null ? t : St.pooledCache;
  }
  function fn(t, l) {
    l === null ? q(Ge, Ge.current) : q(Ge, l.pool);
  }
  function Ir() {
    var t = tf();
    return t === null ? null : { parent: xt._currentValue, pool: t };
  }
  var va = Error(r(460)), lf = Error(r(474)), cn = Error(r(542)), rn = { then: function() {
  } };
  function Pr(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function to(t, l, e) {
    switch (e = t[e], e === void 0 ? t.push(l) : e !== l && (l.then(Yl, Yl), l = e), l.status) {
      case "fulfilled":
        return l.value;
      case "rejected":
        throw t = l.reason, eo(t), t;
      default:
        if (typeof l.status == "string") l.then(Yl, Yl);
        else {
          if (t = St, t !== null && 100 < t.shellSuspendCounter)
            throw Error(r(482));
          t = l, t.status = "pending", t.then(
            function(a) {
              if (l.status === "pending") {
                var u = l;
                u.status = "fulfilled", u.value = a;
              }
            },
            function(a) {
              if (l.status === "pending") {
                var u = l;
                u.status = "rejected", u.reason = a;
              }
            }
          );
        }
        switch (l.status) {
          case "fulfilled":
            return l.value;
          case "rejected":
            throw t = l.reason, eo(t), t;
        }
        throw Qe = l, va;
    }
  }
  function Xe(t) {
    try {
      var l = t._init;
      return l(t._payload);
    } catch (e) {
      throw e !== null && typeof e == "object" && typeof e.then == "function" ? (Qe = e, va) : e;
    }
  }
  var Qe = null;
  function lo() {
    if (Qe === null) throw Error(r(459));
    var t = Qe;
    return Qe = null, t;
  }
  function eo(t) {
    if (t === va || t === cn)
      throw Error(r(483));
  }
  var ga = null, lu = 0;
  function on(t) {
    var l = lu;
    return lu += 1, ga === null && (ga = []), to(ga, t, l);
  }
  function eu(t, l) {
    l = l.props.ref, t.ref = l !== void 0 ? l : null;
  }
  function sn(t, l) {
    throw l.$$typeof === B ? Error(r(525)) : (t = Object.prototype.toString.call(l), Error(
      r(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(l).join(", ") + "}" : t
      )
    ));
  }
  function ao(t) {
    function l(v, m) {
      if (t) {
        var S = v.deletions;
        S === null ? (v.deletions = [m], v.flags |= 16) : S.push(m);
      }
    }
    function e(v, m) {
      if (!t) return null;
      for (; m !== null; )
        l(v, m), m = m.sibling;
      return null;
    }
    function a(v) {
      for (var m = /* @__PURE__ */ new Map(); v !== null; )
        v.key !== null ? m.set(v.key, v) : m.set(v.index, v), v = v.sibling;
      return m;
    }
    function u(v, m) {
      return v = Gl(v, m), v.index = 0, v.sibling = null, v;
    }
    function n(v, m, S) {
      return v.index = S, t ? (S = v.alternate, S !== null ? (S = S.index, S < m ? (v.flags |= 67108866, m) : S) : (v.flags |= 67108866, m)) : (v.flags |= 1048576, m);
    }
    function i(v) {
      return t && v.alternate === null && (v.flags |= 67108866), v;
    }
    function c(v, m, S, R) {
      return m === null || m.tag !== 6 ? (m = Zi(S, v.mode, R), m.return = v, m) : (m = u(m, S), m.return = v, m);
    }
    function d(v, m, S, R) {
      var Z = S.type;
      return Z === V ? M(
        v,
        m,
        S.props.children,
        R,
        S.key
      ) : m !== null && (m.elementType === Z || typeof Z == "object" && Z !== null && Z.$$typeof === qt && Xe(Z) === m.type) ? (m = u(m, S.props), eu(m, S), m.return = v, m) : (m = en(
        S.type,
        S.key,
        S.props,
        null,
        v.mode,
        R
      ), eu(m, S), m.return = v, m);
    }
    function b(v, m, S, R) {
      return m === null || m.tag !== 4 || m.stateNode.containerInfo !== S.containerInfo || m.stateNode.implementation !== S.implementation ? (m = Vi(S, v.mode, R), m.return = v, m) : (m = u(m, S.children || []), m.return = v, m);
    }
    function M(v, m, S, R, Z) {
      return m === null || m.tag !== 7 ? (m = je(
        S,
        v.mode,
        R,
        Z
      ), m.return = v, m) : (m = u(m, S), m.return = v, m);
    }
    function U(v, m, S) {
      if (typeof m == "string" && m !== "" || typeof m == "number" || typeof m == "bigint")
        return m = Zi(
          "" + m,
          v.mode,
          S
        ), m.return = v, m;
      if (typeof m == "object" && m !== null) {
        switch (m.$$typeof) {
          case H:
            return S = en(
              m.type,
              m.key,
              m.props,
              null,
              v.mode,
              S
            ), eu(S, m), S.return = v, S;
          case Y:
            return m = Vi(
              m,
              v.mode,
              S
            ), m.return = v, m;
          case qt:
            return m = Xe(m), U(v, m, S);
        }
        if (Ml(m) || Xt(m))
          return m = je(
            m,
            v.mode,
            S,
            null
          ), m.return = v, m;
        if (typeof m.then == "function")
          return U(v, on(m), S);
        if (m.$$typeof === G)
          return U(
            v,
            nn(v, m),
            S
          );
        sn(v, m);
      }
      return null;
    }
    function E(v, m, S, R) {
      var Z = m !== null ? m.key : null;
      if (typeof S == "string" && S !== "" || typeof S == "number" || typeof S == "bigint")
        return Z !== null ? null : c(v, m, "" + S, R);
      if (typeof S == "object" && S !== null) {
        switch (S.$$typeof) {
          case H:
            return S.key === Z ? d(v, m, S, R) : null;
          case Y:
            return S.key === Z ? b(v, m, S, R) : null;
          case qt:
            return S = Xe(S), E(v, m, S, R);
        }
        if (Ml(S) || Xt(S))
          return Z !== null ? null : M(v, m, S, R, null);
        if (typeof S.then == "function")
          return E(
            v,
            m,
            on(S),
            R
          );
        if (S.$$typeof === G)
          return E(
            v,
            m,
            nn(v, S),
            R
          );
        sn(v, S);
      }
      return null;
    }
    function A(v, m, S, R, Z) {
      if (typeof R == "string" && R !== "" || typeof R == "number" || typeof R == "bigint")
        return v = v.get(S) || null, c(m, v, "" + R, Z);
      if (typeof R == "object" && R !== null) {
        switch (R.$$typeof) {
          case H:
            return v = v.get(
              R.key === null ? S : R.key
            ) || null, d(m, v, R, Z);
          case Y:
            return v = v.get(
              R.key === null ? S : R.key
            ) || null, b(m, v, R, Z);
          case qt:
            return R = Xe(R), A(
              v,
              m,
              S,
              R,
              Z
            );
        }
        if (Ml(R) || Xt(R))
          return v = v.get(S) || null, M(m, v, R, Z, null);
        if (typeof R.then == "function")
          return A(
            v,
            m,
            S,
            on(R),
            Z
          );
        if (R.$$typeof === G)
          return A(
            v,
            m,
            S,
            nn(m, R),
            Z
          );
        sn(m, R);
      }
      return null;
    }
    function L(v, m, S, R) {
      for (var Z = null, ft = null, Q = m, tt = m = 0, nt = null; Q !== null && tt < S.length; tt++) {
        Q.index > tt ? (nt = Q, Q = null) : nt = Q.sibling;
        var ct = E(
          v,
          Q,
          S[tt],
          R
        );
        if (ct === null) {
          Q === null && (Q = nt);
          break;
        }
        t && Q && ct.alternate === null && l(v, Q), m = n(ct, m, tt), ft === null ? Z = ct : ft.sibling = ct, ft = ct, Q = nt;
      }
      if (tt === S.length)
        return e(v, Q), it && Xl(v, tt), Z;
      if (Q === null) {
        for (; tt < S.length; tt++)
          Q = U(v, S[tt], R), Q !== null && (m = n(
            Q,
            m,
            tt
          ), ft === null ? Z = Q : ft.sibling = Q, ft = Q);
        return it && Xl(v, tt), Z;
      }
      for (Q = a(Q); tt < S.length; tt++)
        nt = A(
          Q,
          v,
          tt,
          S[tt],
          R
        ), nt !== null && (t && nt.alternate !== null && Q.delete(
          nt.key === null ? tt : nt.key
        ), m = n(
          nt,
          m,
          tt
        ), ft === null ? Z = nt : ft.sibling = nt, ft = nt);
      return t && Q.forEach(function(Oe) {
        return l(v, Oe);
      }), it && Xl(v, tt), Z;
    }
    function K(v, m, S, R) {
      if (S == null) throw Error(r(151));
      for (var Z = null, ft = null, Q = m, tt = m = 0, nt = null, ct = S.next(); Q !== null && !ct.done; tt++, ct = S.next()) {
        Q.index > tt ? (nt = Q, Q = null) : nt = Q.sibling;
        var Oe = E(v, Q, ct.value, R);
        if (Oe === null) {
          Q === null && (Q = nt);
          break;
        }
        t && Q && Oe.alternate === null && l(v, Q), m = n(Oe, m, tt), ft === null ? Z = Oe : ft.sibling = Oe, ft = Oe, Q = nt;
      }
      if (ct.done)
        return e(v, Q), it && Xl(v, tt), Z;
      if (Q === null) {
        for (; !ct.done; tt++, ct = S.next())
          ct = U(v, ct.value, R), ct !== null && (m = n(ct, m, tt), ft === null ? Z = ct : ft.sibling = ct, ft = ct);
        return it && Xl(v, tt), Z;
      }
      for (Q = a(Q); !ct.done; tt++, ct = S.next())
        ct = A(Q, v, tt, ct.value, R), ct !== null && (t && ct.alternate !== null && Q.delete(ct.key === null ? tt : ct.key), m = n(ct, m, tt), ft === null ? Z = ct : ft.sibling = ct, ft = ct);
      return t && Q.forEach(function(Zy) {
        return l(v, Zy);
      }), it && Xl(v, tt), Z;
    }
    function gt(v, m, S, R) {
      if (typeof S == "object" && S !== null && S.type === V && S.key === null && (S = S.props.children), typeof S == "object" && S !== null) {
        switch (S.$$typeof) {
          case H:
            t: {
              for (var Z = S.key; m !== null; ) {
                if (m.key === Z) {
                  if (Z = S.type, Z === V) {
                    if (m.tag === 7) {
                      e(
                        v,
                        m.sibling
                      ), R = u(
                        m,
                        S.props.children
                      ), R.return = v, v = R;
                      break t;
                    }
                  } else if (m.elementType === Z || typeof Z == "object" && Z !== null && Z.$$typeof === qt && Xe(Z) === m.type) {
                    e(
                      v,
                      m.sibling
                    ), R = u(m, S.props), eu(R, S), R.return = v, v = R;
                    break t;
                  }
                  e(v, m);
                  break;
                } else l(v, m);
                m = m.sibling;
              }
              S.type === V ? (R = je(
                S.props.children,
                v.mode,
                R,
                S.key
              ), R.return = v, v = R) : (R = en(
                S.type,
                S.key,
                S.props,
                null,
                v.mode,
                R
              ), eu(R, S), R.return = v, v = R);
            }
            return i(v);
          case Y:
            t: {
              for (Z = S.key; m !== null; ) {
                if (m.key === Z)
                  if (m.tag === 4 && m.stateNode.containerInfo === S.containerInfo && m.stateNode.implementation === S.implementation) {
                    e(
                      v,
                      m.sibling
                    ), R = u(m, S.children || []), R.return = v, v = R;
                    break t;
                  } else {
                    e(v, m);
                    break;
                  }
                else l(v, m);
                m = m.sibling;
              }
              R = Vi(S, v.mode, R), R.return = v, v = R;
            }
            return i(v);
          case qt:
            return S = Xe(S), gt(
              v,
              m,
              S,
              R
            );
        }
        if (Ml(S))
          return L(
            v,
            m,
            S,
            R
          );
        if (Xt(S)) {
          if (Z = Xt(S), typeof Z != "function") throw Error(r(150));
          return S = Z.call(S), K(
            v,
            m,
            S,
            R
          );
        }
        if (typeof S.then == "function")
          return gt(
            v,
            m,
            on(S),
            R
          );
        if (S.$$typeof === G)
          return gt(
            v,
            m,
            nn(v, S),
            R
          );
        sn(v, S);
      }
      return typeof S == "string" && S !== "" || typeof S == "number" || typeof S == "bigint" ? (S = "" + S, m !== null && m.tag === 6 ? (e(v, m.sibling), R = u(m, S), R.return = v, v = R) : (e(v, m), R = Zi(S, v.mode, R), R.return = v, v = R), i(v)) : e(v, m);
    }
    return function(v, m, S, R) {
      try {
        lu = 0;
        var Z = gt(
          v,
          m,
          S,
          R
        );
        return ga = null, Z;
      } catch (Q) {
        if (Q === va || Q === cn) throw Q;
        var ft = rl(29, Q, null, v.mode);
        return ft.lanes = R, ft.return = v, ft;
      } finally {
      }
    };
  }
  var Ze = ao(!0), uo = ao(!1), oe = !1;
  function ef(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function af(t, l) {
    t = t.updateQueue, l.updateQueue === t && (l.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function se(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function de(t, l, e) {
    var a = t.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (ot & 2) !== 0) {
      var u = a.pending;
      return u === null ? l.next = l : (l.next = u.next, u.next = l), a.pending = l, l = ln(t), Xr(t, null, e), l;
    }
    return tn(t, a, l, e), ln(t);
  }
  function au(t, l, e) {
    if (l = l.updateQueue, l !== null && (l = l.shared, (e & 4194048) !== 0)) {
      var a = l.lanes;
      a &= t.pendingLanes, e |= a, l.lanes = e, Wc(t, e);
    }
  }
  function uf(t, l) {
    var e = t.updateQueue, a = t.alternate;
    if (a !== null && (a = a.updateQueue, e === a)) {
      var u = null, n = null;
      if (e = e.firstBaseUpdate, e !== null) {
        do {
          var i = {
            lane: e.lane,
            tag: e.tag,
            payload: e.payload,
            callback: null,
            next: null
          };
          n === null ? u = n = i : n = n.next = i, e = e.next;
        } while (e !== null);
        n === null ? u = n = l : n = n.next = l;
      } else u = n = l;
      e = {
        baseState: a.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: n,
        shared: a.shared,
        callbacks: a.callbacks
      }, t.updateQueue = e;
      return;
    }
    t = e.lastBaseUpdate, t === null ? e.firstBaseUpdate = l : t.next = l, e.lastBaseUpdate = l;
  }
  var nf = !1;
  function uu() {
    if (nf) {
      var t = ya;
      if (t !== null) throw t;
    }
  }
  function nu(t, l, e, a) {
    nf = !1;
    var u = t.updateQueue;
    oe = !1;
    var n = u.firstBaseUpdate, i = u.lastBaseUpdate, c = u.shared.pending;
    if (c !== null) {
      u.shared.pending = null;
      var d = c, b = d.next;
      d.next = null, i === null ? n = b : i.next = b, i = d;
      var M = t.alternate;
      M !== null && (M = M.updateQueue, c = M.lastBaseUpdate, c !== i && (c === null ? M.firstBaseUpdate = b : c.next = b, M.lastBaseUpdate = d));
    }
    if (n !== null) {
      var U = u.baseState;
      i = 0, M = b = d = null, c = n;
      do {
        var E = c.lane & -536870913, A = E !== c.lane;
        if (A ? (ut & E) === E : (a & E) === E) {
          E !== 0 && E === ha && (nf = !0), M !== null && (M = M.next = {
            lane: 0,
            tag: c.tag,
            payload: c.payload,
            callback: null,
            next: null
          });
          t: {
            var L = t, K = c;
            E = l;
            var gt = e;
            switch (K.tag) {
              case 1:
                if (L = K.payload, typeof L == "function") {
                  U = L.call(gt, U, E);
                  break t;
                }
                U = L;
                break t;
              case 3:
                L.flags = L.flags & -65537 | 128;
              case 0:
                if (L = K.payload, E = typeof L == "function" ? L.call(gt, U, E) : L, E == null) break t;
                U = _({}, U, E);
                break t;
              case 2:
                oe = !0;
            }
          }
          E = c.callback, E !== null && (t.flags |= 64, A && (t.flags |= 8192), A = u.callbacks, A === null ? u.callbacks = [E] : A.push(E));
        } else
          A = {
            lane: E,
            tag: c.tag,
            payload: c.payload,
            callback: c.callback,
            next: null
          }, M === null ? (b = M = A, d = U) : M = M.next = A, i |= E;
        if (c = c.next, c === null) {
          if (c = u.shared.pending, c === null)
            break;
          A = c, c = A.next, A.next = null, u.lastBaseUpdate = A, u.shared.pending = null;
        }
      } while (!0);
      M === null && (d = U), u.baseState = d, u.firstBaseUpdate = b, u.lastBaseUpdate = M, n === null && (u.shared.lanes = 0), ge |= i, t.lanes = i, t.memoizedState = U;
    }
  }
  function no(t, l) {
    if (typeof t != "function")
      throw Error(r(191, t));
    t.call(l);
  }
  function io(t, l) {
    var e = t.callbacks;
    if (e !== null)
      for (t.callbacks = null, t = 0; t < e.length; t++)
        no(e[t], l);
  }
  var pa = h(null), dn = h(0);
  function fo(t, l) {
    t = Il, q(dn, t), q(pa, l), Il = t | l.baseLanes;
  }
  function ff() {
    q(dn, Il), q(pa, pa.current);
  }
  function cf() {
    Il = dn.current, N(pa), N(dn);
  }
  var ol = h(null), zl = null;
  function me(t) {
    var l = t.alternate;
    q(Ut, Ut.current & 1), q(ol, t), zl === null && (l === null || pa.current !== null || l.memoizedState !== null) && (zl = t);
  }
  function rf(t) {
    q(Ut, Ut.current), q(ol, t), zl === null && (zl = t);
  }
  function co(t) {
    t.tag === 22 ? (q(Ut, Ut.current), q(ol, t), zl === null && (zl = t)) : he();
  }
  function he() {
    q(Ut, Ut.current), q(ol, ol.current);
  }
  function sl(t) {
    N(ol), zl === t && (zl = null), N(Ut);
  }
  var Ut = h(0);
  function mn(t) {
    for (var l = t; l !== null; ) {
      if (l.tag === 13) {
        var e = l.memoizedState;
        if (e !== null && (e = e.dehydrated, e === null || yc(e) || vc(e)))
          return l;
      } else if (l.tag === 19 && (l.memoizedProps.revealOrder === "forwards" || l.memoizedProps.revealOrder === "backwards" || l.memoizedProps.revealOrder === "unstable_legacy-backwards" || l.memoizedProps.revealOrder === "together")) {
        if ((l.flags & 128) !== 0) return l;
      } else if (l.child !== null) {
        l.child.return = l, l = l.child;
        continue;
      }
      if (l === t) break;
      for (; l.sibling === null; ) {
        if (l.return === null || l.return === t) return null;
        l = l.return;
      }
      l.sibling.return = l.return, l = l.sibling;
    }
    return null;
  }
  var Vl = 0, P = null, yt = null, Nt = null, hn = !1, Sa = !1, Ve = !1, yn = 0, iu = 0, ba = null, Nh = 0;
  function At() {
    throw Error(r(321));
  }
  function of(t, l) {
    if (l === null) return !1;
    for (var e = 0; e < l.length && e < t.length; e++)
      if (!cl(t[e], l[e])) return !1;
    return !0;
  }
  function sf(t, l, e, a, u, n) {
    return Vl = n, P = l, l.memoizedState = null, l.updateQueue = null, l.lanes = 0, O.H = t === null || t.memoizedState === null ? Jo : Mf, Ve = !1, n = e(a, u), Ve = !1, Sa && (n = oo(
      l,
      e,
      a,
      u
    )), ro(t), n;
  }
  function ro(t) {
    O.H = ru;
    var l = yt !== null && yt.next !== null;
    if (Vl = 0, Nt = yt = P = null, hn = !1, iu = 0, ba = null, l) throw Error(r(300));
    t === null || Ht || (t = t.dependencies, t !== null && un(t) && (Ht = !0));
  }
  function oo(t, l, e, a) {
    P = t;
    var u = 0;
    do {
      if (Sa && (ba = null), iu = 0, Sa = !1, 25 <= u) throw Error(r(301));
      if (u += 1, Nt = yt = null, t.updateQueue != null) {
        var n = t.updateQueue;
        n.lastEffect = null, n.events = null, n.stores = null, n.memoCache != null && (n.memoCache.index = 0);
      }
      O.H = wo, n = l(e, a);
    } while (Sa);
    return n;
  }
  function Hh() {
    var t = O.H, l = t.useState()[0];
    return l = typeof l.then == "function" ? fu(l) : l, t = t.useState()[0], (yt !== null ? yt.memoizedState : null) !== t && (P.flags |= 1024), l;
  }
  function df() {
    var t = yn !== 0;
    return yn = 0, t;
  }
  function mf(t, l, e) {
    l.updateQueue = t.updateQueue, l.flags &= -2053, t.lanes &= ~e;
  }
  function hf(t) {
    if (hn) {
      for (t = t.memoizedState; t !== null; ) {
        var l = t.queue;
        l !== null && (l.pending = null), t = t.next;
      }
      hn = !1;
    }
    Vl = 0, Nt = yt = P = null, Sa = !1, iu = yn = 0, ba = null;
  }
  function Ft() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Nt === null ? P.memoizedState = Nt = t : Nt = Nt.next = t, Nt;
  }
  function Ct() {
    if (yt === null) {
      var t = P.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = yt.next;
    var l = Nt === null ? P.memoizedState : Nt.next;
    if (l !== null)
      Nt = l, yt = t;
    else {
      if (t === null)
        throw P.alternate === null ? Error(r(467)) : Error(r(310));
      yt = t, t = {
        memoizedState: yt.memoizedState,
        baseState: yt.baseState,
        baseQueue: yt.baseQueue,
        queue: yt.queue,
        next: null
      }, Nt === null ? P.memoizedState = Nt = t : Nt = Nt.next = t;
    }
    return Nt;
  }
  function vn() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function fu(t) {
    var l = iu;
    return iu += 1, ba === null && (ba = []), t = to(ba, t, l), l = P, (Nt === null ? l.memoizedState : Nt.next) === null && (l = l.alternate, O.H = l === null || l.memoizedState === null ? Jo : Mf), t;
  }
  function gn(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return fu(t);
      if (t.$$typeof === G) return Vt(t);
    }
    throw Error(r(438, String(t)));
  }
  function yf(t) {
    var l = null, e = P.updateQueue;
    if (e !== null && (l = e.memoCache), l == null) {
      var a = P.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (l = {
        data: a.data.map(function(u) {
          return u.slice();
        }),
        index: 0
      })));
    }
    if (l == null && (l = { data: [], index: 0 }), e === null && (e = vn(), P.updateQueue = e), e.memoCache = l, e = l.data[l.index], e === void 0)
      for (e = l.data[l.index] = Array(t), a = 0; a < t; a++)
        e[a] = wt;
    return l.index++, e;
  }
  function Kl(t, l) {
    return typeof l == "function" ? l(t) : l;
  }
  function pn(t) {
    var l = Ct();
    return vf(l, yt, t);
  }
  function vf(t, l, e) {
    var a = t.queue;
    if (a === null) throw Error(r(311));
    a.lastRenderedReducer = e;
    var u = t.baseQueue, n = a.pending;
    if (n !== null) {
      if (u !== null) {
        var i = u.next;
        u.next = n.next, n.next = i;
      }
      l.baseQueue = u = n, a.pending = null;
    }
    if (n = t.baseState, u === null) t.memoizedState = n;
    else {
      l = u.next;
      var c = i = null, d = null, b = l, M = !1;
      do {
        var U = b.lane & -536870913;
        if (U !== b.lane ? (ut & U) === U : (Vl & U) === U) {
          var E = b.revertLane;
          if (E === 0)
            d !== null && (d = d.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: b.action,
              hasEagerState: b.hasEagerState,
              eagerState: b.eagerState,
              next: null
            }), U === ha && (M = !0);
          else if ((Vl & E) === E) {
            b = b.next, E === ha && (M = !0);
            continue;
          } else
            U = {
              lane: 0,
              revertLane: b.revertLane,
              gesture: null,
              action: b.action,
              hasEagerState: b.hasEagerState,
              eagerState: b.eagerState,
              next: null
            }, d === null ? (c = d = U, i = n) : d = d.next = U, P.lanes |= E, ge |= E;
          U = b.action, Ve && e(n, U), n = b.hasEagerState ? b.eagerState : e(n, U);
        } else
          E = {
            lane: U,
            revertLane: b.revertLane,
            gesture: b.gesture,
            action: b.action,
            hasEagerState: b.hasEagerState,
            eagerState: b.eagerState,
            next: null
          }, d === null ? (c = d = E, i = n) : d = d.next = E, P.lanes |= U, ge |= U;
        b = b.next;
      } while (b !== null && b !== l);
      if (d === null ? i = n : d.next = c, !cl(n, t.memoizedState) && (Ht = !0, M && (e = ya, e !== null)))
        throw e;
      t.memoizedState = n, t.baseState = i, t.baseQueue = d, a.lastRenderedState = n;
    }
    return u === null && (a.lanes = 0), [t.memoizedState, a.dispatch];
  }
  function gf(t) {
    var l = Ct(), e = l.queue;
    if (e === null) throw Error(r(311));
    e.lastRenderedReducer = t;
    var a = e.dispatch, u = e.pending, n = l.memoizedState;
    if (u !== null) {
      e.pending = null;
      var i = u = u.next;
      do
        n = t(n, i.action), i = i.next;
      while (i !== u);
      cl(n, l.memoizedState) || (Ht = !0), l.memoizedState = n, l.baseQueue === null && (l.baseState = n), e.lastRenderedState = n;
    }
    return [n, a];
  }
  function so(t, l, e) {
    var a = P, u = Ct(), n = it;
    if (n) {
      if (e === void 0) throw Error(r(407));
      e = e();
    } else e = l();
    var i = !cl(
      (yt || u).memoizedState,
      e
    );
    if (i && (u.memoizedState = e, Ht = !0), u = u.queue, bf(yo.bind(null, a, u, t), [
      t
    ]), u.getSnapshot !== l || i || Nt !== null && Nt.memoizedState.tag & 1) {
      if (a.flags |= 2048, Ea(
        9,
        { destroy: void 0 },
        ho.bind(
          null,
          a,
          u,
          e,
          l
        ),
        null
      ), St === null) throw Error(r(349));
      n || (Vl & 127) !== 0 || mo(a, l, e);
    }
    return e;
  }
  function mo(t, l, e) {
    t.flags |= 16384, t = { getSnapshot: l, value: e }, l = P.updateQueue, l === null ? (l = vn(), P.updateQueue = l, l.stores = [t]) : (e = l.stores, e === null ? l.stores = [t] : e.push(t));
  }
  function ho(t, l, e, a) {
    l.value = e, l.getSnapshot = a, vo(l) && go(t);
  }
  function yo(t, l, e) {
    return e(function() {
      vo(l) && go(t);
    });
  }
  function vo(t) {
    var l = t.getSnapshot;
    t = t.value;
    try {
      var e = l();
      return !cl(t, e);
    } catch {
      return !0;
    }
  }
  function go(t) {
    var l = Be(t, 2);
    l !== null && ul(l, t, 2);
  }
  function pf(t) {
    var l = Ft();
    if (typeof t == "function") {
      var e = t;
      if (t = e(), Ve) {
        ae(!0);
        try {
          e();
        } finally {
          ae(!1);
        }
      }
    }
    return l.memoizedState = l.baseState = t, l.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Kl,
      lastRenderedState: t
    }, l;
  }
  function po(t, l, e, a) {
    return t.baseState = e, vf(
      t,
      yt,
      typeof a == "function" ? a : Kl
    );
  }
  function Bh(t, l, e, a, u) {
    if (En(t)) throw Error(r(485));
    if (t = l.action, t !== null) {
      var n = {
        payload: u,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(i) {
          n.listeners.push(i);
        }
      };
      O.T !== null ? e(!0) : n.isTransition = !1, a(n), e = l.pending, e === null ? (n.next = l.pending = n, So(l, n)) : (n.next = e.next, l.pending = e.next = n);
    }
  }
  function So(t, l) {
    var e = l.action, a = l.payload, u = t.state;
    if (l.isTransition) {
      var n = O.T, i = {};
      O.T = i;
      try {
        var c = e(u, a), d = O.S;
        d !== null && d(i, c), bo(t, l, c);
      } catch (b) {
        Sf(t, l, b);
      } finally {
        n !== null && i.types !== null && (n.types = i.types), O.T = n;
      }
    } else
      try {
        n = e(u, a), bo(t, l, n);
      } catch (b) {
        Sf(t, l, b);
      }
  }
  function bo(t, l, e) {
    e !== null && typeof e == "object" && typeof e.then == "function" ? e.then(
      function(a) {
        Eo(t, l, a);
      },
      function(a) {
        return Sf(t, l, a);
      }
    ) : Eo(t, l, e);
  }
  function Eo(t, l, e) {
    l.status = "fulfilled", l.value = e, zo(l), t.state = e, l = t.pending, l !== null && (e = l.next, e === l ? t.pending = null : (e = e.next, l.next = e, So(t, e)));
  }
  function Sf(t, l, e) {
    var a = t.pending;
    if (t.pending = null, a !== null) {
      a = a.next;
      do
        l.status = "rejected", l.reason = e, zo(l), l = l.next;
      while (l !== a);
    }
    t.action = null;
  }
  function zo(t) {
    t = t.listeners;
    for (var l = 0; l < t.length; l++) (0, t[l])();
  }
  function To(t, l) {
    return l;
  }
  function Ao(t, l) {
    if (it) {
      var e = St.formState;
      if (e !== null) {
        t: {
          var a = P;
          if (it) {
            if (Et) {
              l: {
                for (var u = Et, n = El; u.nodeType !== 8; ) {
                  if (!n) {
                    u = null;
                    break l;
                  }
                  if (u = Tl(
                    u.nextSibling
                  ), u === null) {
                    u = null;
                    break l;
                  }
                }
                n = u.data, u = n === "F!" || n === "F" ? u : null;
              }
              if (u) {
                Et = Tl(
                  u.nextSibling
                ), a = u.data === "F!";
                break t;
              }
            }
            ce(a);
          }
          a = !1;
        }
        a && (l = e[0]);
      }
    }
    return e = Ft(), e.memoizedState = e.baseState = l, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: To,
      lastRenderedState: l
    }, e.queue = a, e = Zo.bind(
      null,
      P,
      a
    ), a.dispatch = e, a = pf(!1), n = _f.bind(
      null,
      P,
      !1,
      a.queue
    ), a = Ft(), u = {
      state: l,
      dispatch: null,
      action: t,
      pending: null
    }, a.queue = u, e = Bh.bind(
      null,
      P,
      u,
      n,
      e
    ), u.dispatch = e, a.memoizedState = t, [l, e, !1];
  }
  function _o(t) {
    var l = Ct();
    return Mo(l, yt, t);
  }
  function Mo(t, l, e) {
    if (l = vf(
      t,
      l,
      To
    )[0], t = pn(Kl)[0], typeof l == "object" && l !== null && typeof l.then == "function")
      try {
        var a = fu(l);
      } catch (i) {
        throw i === va ? cn : i;
      }
    else a = l;
    l = Ct();
    var u = l.queue, n = u.dispatch;
    return e !== l.memoizedState && (P.flags |= 2048, Ea(
      9,
      { destroy: void 0 },
      jh.bind(null, u, e),
      null
    )), [a, n, t];
  }
  function jh(t, l) {
    t.action = l;
  }
  function Oo(t) {
    var l = Ct(), e = yt;
    if (e !== null)
      return Mo(l, e, t);
    Ct(), l = l.memoizedState, e = Ct();
    var a = e.queue.dispatch;
    return e.memoizedState = t, [l, a, !1];
  }
  function Ea(t, l, e, a) {
    return t = { tag: t, create: e, deps: a, inst: l, next: null }, l = P.updateQueue, l === null && (l = vn(), P.updateQueue = l), e = l.lastEffect, e === null ? l.lastEffect = t.next = t : (a = e.next, e.next = t, t.next = a, l.lastEffect = t), t;
  }
  function Ro() {
    return Ct().memoizedState;
  }
  function Sn(t, l, e, a) {
    var u = Ft();
    P.flags |= t, u.memoizedState = Ea(
      1 | l,
      { destroy: void 0 },
      e,
      a === void 0 ? null : a
    );
  }
  function bn(t, l, e, a) {
    var u = Ct();
    a = a === void 0 ? null : a;
    var n = u.memoizedState.inst;
    yt !== null && a !== null && of(a, yt.memoizedState.deps) ? u.memoizedState = Ea(l, n, e, a) : (P.flags |= t, u.memoizedState = Ea(
      1 | l,
      n,
      e,
      a
    ));
  }
  function Do(t, l) {
    Sn(8390656, 8, t, l);
  }
  function bf(t, l) {
    bn(2048, 8, t, l);
  }
  function qh(t) {
    P.flags |= 4;
    var l = P.updateQueue;
    if (l === null)
      l = vn(), P.updateQueue = l, l.events = [t];
    else {
      var e = l.events;
      e === null ? l.events = [t] : e.push(t);
    }
  }
  function Uo(t) {
    var l = Ct().memoizedState;
    return qh({ ref: l, nextImpl: t }), function() {
      if ((ot & 2) !== 0) throw Error(r(440));
      return l.impl.apply(void 0, arguments);
    };
  }
  function Co(t, l) {
    return bn(4, 2, t, l);
  }
  function xo(t, l) {
    return bn(4, 4, t, l);
  }
  function No(t, l) {
    if (typeof l == "function") {
      t = t();
      var e = l(t);
      return function() {
        typeof e == "function" ? e() : l(null);
      };
    }
    if (l != null)
      return t = t(), l.current = t, function() {
        l.current = null;
      };
  }
  function Ho(t, l, e) {
    e = e != null ? e.concat([t]) : null, bn(4, 4, No.bind(null, l, t), e);
  }
  function Ef() {
  }
  function Bo(t, l) {
    var e = Ct();
    l = l === void 0 ? null : l;
    var a = e.memoizedState;
    return l !== null && of(l, a[1]) ? a[0] : (e.memoizedState = [t, l], t);
  }
  function jo(t, l) {
    var e = Ct();
    l = l === void 0 ? null : l;
    var a = e.memoizedState;
    if (l !== null && of(l, a[1]))
      return a[0];
    if (a = t(), Ve) {
      ae(!0);
      try {
        t();
      } finally {
        ae(!1);
      }
    }
    return e.memoizedState = [a, l], a;
  }
  function zf(t, l, e) {
    return e === void 0 || (Vl & 1073741824) !== 0 && (ut & 261930) === 0 ? t.memoizedState = l : (t.memoizedState = e, t = qs(), P.lanes |= t, ge |= t, e);
  }
  function qo(t, l, e, a) {
    return cl(e, l) ? e : pa.current !== null ? (t = zf(t, e, a), cl(t, l) || (Ht = !0), t) : (Vl & 42) === 0 || (Vl & 1073741824) !== 0 && (ut & 261930) === 0 ? (Ht = !0, t.memoizedState = e) : (t = qs(), P.lanes |= t, ge |= t, l);
  }
  function Yo(t, l, e, a, u) {
    var n = j.p;
    j.p = n !== 0 && 8 > n ? n : 8;
    var i = O.T, c = {};
    O.T = c, _f(t, !1, l, e);
    try {
      var d = u(), b = O.S;
      if (b !== null && b(c, d), d !== null && typeof d == "object" && typeof d.then == "function") {
        var M = xh(
          d,
          a
        );
        cu(
          t,
          l,
          M,
          hl(t)
        );
      } else
        cu(
          t,
          l,
          a,
          hl(t)
        );
    } catch (U) {
      cu(
        t,
        l,
        { then: function() {
        }, status: "rejected", reason: U },
        hl()
      );
    } finally {
      j.p = n, i !== null && c.types !== null && (i.types = c.types), O.T = i;
    }
  }
  function Yh() {
  }
  function Tf(t, l, e, a) {
    if (t.tag !== 5) throw Error(r(476));
    var u = Lo(t).queue;
    Yo(
      t,
      u,
      l,
      $,
      e === null ? Yh : function() {
        return Go(t), e(a);
      }
    );
  }
  function Lo(t) {
    var l = t.memoizedState;
    if (l !== null) return l;
    l = {
      memoizedState: $,
      baseState: $,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Kl,
        lastRenderedState: $
      },
      next: null
    };
    var e = {};
    return l.next = {
      memoizedState: e,
      baseState: e,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Kl,
        lastRenderedState: e
      },
      next: null
    }, t.memoizedState = l, t = t.alternate, t !== null && (t.memoizedState = l), l;
  }
  function Go(t) {
    var l = Lo(t);
    l.next === null && (l = t.alternate.memoizedState), cu(
      t,
      l.next.queue,
      {},
      hl()
    );
  }
  function Af() {
    return Vt(_u);
  }
  function Xo() {
    return Ct().memoizedState;
  }
  function Qo() {
    return Ct().memoizedState;
  }
  function Lh(t) {
    for (var l = t.return; l !== null; ) {
      switch (l.tag) {
        case 24:
        case 3:
          var e = hl();
          t = se(e);
          var a = de(l, t, e);
          a !== null && (ul(a, l, e), au(a, l, e)), l = { cache: Ii() }, t.payload = l;
          return;
      }
      l = l.return;
    }
  }
  function Gh(t, l, e) {
    var a = hl();
    e = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, En(t) ? Vo(l, e) : (e = Xi(t, l, e, a), e !== null && (ul(e, t, a), Ko(e, l, a)));
  }
  function Zo(t, l, e) {
    var a = hl();
    cu(t, l, e, a);
  }
  function cu(t, l, e, a) {
    var u = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (En(t)) Vo(l, u);
    else {
      var n = t.alternate;
      if (t.lanes === 0 && (n === null || n.lanes === 0) && (n = l.lastRenderedReducer, n !== null))
        try {
          var i = l.lastRenderedState, c = n(i, e);
          if (u.hasEagerState = !0, u.eagerState = c, cl(c, i))
            return tn(t, l, u, 0), St === null && Pu(), !1;
        } catch {
        } finally {
        }
      if (e = Xi(t, l, u, a), e !== null)
        return ul(e, t, a), Ko(e, l, a), !0;
    }
    return !1;
  }
  function _f(t, l, e, a) {
    if (a = {
      lane: 2,
      revertLane: ac(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, En(t)) {
      if (l) throw Error(r(479));
    } else
      l = Xi(
        t,
        e,
        a,
        2
      ), l !== null && ul(l, t, 2);
  }
  function En(t) {
    var l = t.alternate;
    return t === P || l !== null && l === P;
  }
  function Vo(t, l) {
    Sa = hn = !0;
    var e = t.pending;
    e === null ? l.next = l : (l.next = e.next, e.next = l), t.pending = l;
  }
  function Ko(t, l, e) {
    if ((e & 4194048) !== 0) {
      var a = l.lanes;
      a &= t.pendingLanes, e |= a, l.lanes = e, Wc(t, e);
    }
  }
  var ru = {
    readContext: Vt,
    use: gn,
    useCallback: At,
    useContext: At,
    useEffect: At,
    useImperativeHandle: At,
    useLayoutEffect: At,
    useInsertionEffect: At,
    useMemo: At,
    useReducer: At,
    useRef: At,
    useState: At,
    useDebugValue: At,
    useDeferredValue: At,
    useTransition: At,
    useSyncExternalStore: At,
    useId: At,
    useHostTransitionStatus: At,
    useFormState: At,
    useActionState: At,
    useOptimistic: At,
    useMemoCache: At,
    useCacheRefresh: At
  };
  ru.useEffectEvent = At;
  var Jo = {
    readContext: Vt,
    use: gn,
    useCallback: function(t, l) {
      return Ft().memoizedState = [
        t,
        l === void 0 ? null : l
      ], t;
    },
    useContext: Vt,
    useEffect: Do,
    useImperativeHandle: function(t, l, e) {
      e = e != null ? e.concat([t]) : null, Sn(
        4194308,
        4,
        No.bind(null, l, t),
        e
      );
    },
    useLayoutEffect: function(t, l) {
      return Sn(4194308, 4, t, l);
    },
    useInsertionEffect: function(t, l) {
      Sn(4, 2, t, l);
    },
    useMemo: function(t, l) {
      var e = Ft();
      l = l === void 0 ? null : l;
      var a = t();
      if (Ve) {
        ae(!0);
        try {
          t();
        } finally {
          ae(!1);
        }
      }
      return e.memoizedState = [a, l], a;
    },
    useReducer: function(t, l, e) {
      var a = Ft();
      if (e !== void 0) {
        var u = e(l);
        if (Ve) {
          ae(!0);
          try {
            e(l);
          } finally {
            ae(!1);
          }
        }
      } else u = l;
      return a.memoizedState = a.baseState = u, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: u
      }, a.queue = t, t = t.dispatch = Gh.bind(
        null,
        P,
        t
      ), [a.memoizedState, t];
    },
    useRef: function(t) {
      var l = Ft();
      return t = { current: t }, l.memoizedState = t;
    },
    useState: function(t) {
      t = pf(t);
      var l = t.queue, e = Zo.bind(null, P, l);
      return l.dispatch = e, [t.memoizedState, e];
    },
    useDebugValue: Ef,
    useDeferredValue: function(t, l) {
      var e = Ft();
      return zf(e, t, l);
    },
    useTransition: function() {
      var t = pf(!1);
      return t = Yo.bind(
        null,
        P,
        t.queue,
        !0,
        !1
      ), Ft().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, l, e) {
      var a = P, u = Ft();
      if (it) {
        if (e === void 0)
          throw Error(r(407));
        e = e();
      } else {
        if (e = l(), St === null)
          throw Error(r(349));
        (ut & 127) !== 0 || mo(a, l, e);
      }
      u.memoizedState = e;
      var n = { value: e, getSnapshot: l };
      return u.queue = n, Do(yo.bind(null, a, n, t), [
        t
      ]), a.flags |= 2048, Ea(
        9,
        { destroy: void 0 },
        ho.bind(
          null,
          a,
          n,
          e,
          l
        ),
        null
      ), e;
    },
    useId: function() {
      var t = Ft(), l = St.identifierPrefix;
      if (it) {
        var e = xl, a = Cl;
        e = (a & ~(1 << 32 - fl(a) - 1)).toString(32) + e, l = "_" + l + "R_" + e, e = yn++, 0 < e && (l += "H" + e.toString(32)), l += "_";
      } else
        e = Nh++, l = "_" + l + "r_" + e.toString(32) + "_";
      return t.memoizedState = l;
    },
    useHostTransitionStatus: Af,
    useFormState: Ao,
    useActionState: Ao,
    useOptimistic: function(t) {
      var l = Ft();
      l.memoizedState = l.baseState = t;
      var e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return l.queue = e, l = _f.bind(
        null,
        P,
        !0,
        e
      ), e.dispatch = l, [t, l];
    },
    useMemoCache: yf,
    useCacheRefresh: function() {
      return Ft().memoizedState = Lh.bind(
        null,
        P
      );
    },
    useEffectEvent: function(t) {
      var l = Ft(), e = { impl: t };
      return l.memoizedState = e, function() {
        if ((ot & 2) !== 0)
          throw Error(r(440));
        return e.impl.apply(void 0, arguments);
      };
    }
  }, Mf = {
    readContext: Vt,
    use: gn,
    useCallback: Bo,
    useContext: Vt,
    useEffect: bf,
    useImperativeHandle: Ho,
    useInsertionEffect: Co,
    useLayoutEffect: xo,
    useMemo: jo,
    useReducer: pn,
    useRef: Ro,
    useState: function() {
      return pn(Kl);
    },
    useDebugValue: Ef,
    useDeferredValue: function(t, l) {
      var e = Ct();
      return qo(
        e,
        yt.memoizedState,
        t,
        l
      );
    },
    useTransition: function() {
      var t = pn(Kl)[0], l = Ct().memoizedState;
      return [
        typeof t == "boolean" ? t : fu(t),
        l
      ];
    },
    useSyncExternalStore: so,
    useId: Xo,
    useHostTransitionStatus: Af,
    useFormState: _o,
    useActionState: _o,
    useOptimistic: function(t, l) {
      var e = Ct();
      return po(e, yt, t, l);
    },
    useMemoCache: yf,
    useCacheRefresh: Qo
  };
  Mf.useEffectEvent = Uo;
  var wo = {
    readContext: Vt,
    use: gn,
    useCallback: Bo,
    useContext: Vt,
    useEffect: bf,
    useImperativeHandle: Ho,
    useInsertionEffect: Co,
    useLayoutEffect: xo,
    useMemo: jo,
    useReducer: gf,
    useRef: Ro,
    useState: function() {
      return gf(Kl);
    },
    useDebugValue: Ef,
    useDeferredValue: function(t, l) {
      var e = Ct();
      return yt === null ? zf(e, t, l) : qo(
        e,
        yt.memoizedState,
        t,
        l
      );
    },
    useTransition: function() {
      var t = gf(Kl)[0], l = Ct().memoizedState;
      return [
        typeof t == "boolean" ? t : fu(t),
        l
      ];
    },
    useSyncExternalStore: so,
    useId: Xo,
    useHostTransitionStatus: Af,
    useFormState: Oo,
    useActionState: Oo,
    useOptimistic: function(t, l) {
      var e = Ct();
      return yt !== null ? po(e, yt, t, l) : (e.baseState = t, [t, e.queue.dispatch]);
    },
    useMemoCache: yf,
    useCacheRefresh: Qo
  };
  wo.useEffectEvent = Uo;
  function Of(t, l, e, a) {
    l = t.memoizedState, e = e(a, l), e = e == null ? l : _({}, l, e), t.memoizedState = e, t.lanes === 0 && (t.updateQueue.baseState = e);
  }
  var Rf = {
    enqueueSetState: function(t, l, e) {
      t = t._reactInternals;
      var a = hl(), u = se(a);
      u.payload = l, e != null && (u.callback = e), l = de(t, u, a), l !== null && (ul(l, t, a), au(l, t, a));
    },
    enqueueReplaceState: function(t, l, e) {
      t = t._reactInternals;
      var a = hl(), u = se(a);
      u.tag = 1, u.payload = l, e != null && (u.callback = e), l = de(t, u, a), l !== null && (ul(l, t, a), au(l, t, a));
    },
    enqueueForceUpdate: function(t, l) {
      t = t._reactInternals;
      var e = hl(), a = se(e);
      a.tag = 2, l != null && (a.callback = l), l = de(t, a, e), l !== null && (ul(l, t, e), au(l, t, e));
    }
  };
  function $o(t, l, e, a, u, n, i) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(a, n, i) : l.prototype && l.prototype.isPureReactComponent ? !Wa(e, a) || !Wa(u, n) : !0;
  }
  function Wo(t, l, e, a) {
    t = l.state, typeof l.componentWillReceiveProps == "function" && l.componentWillReceiveProps(e, a), typeof l.UNSAFE_componentWillReceiveProps == "function" && l.UNSAFE_componentWillReceiveProps(e, a), l.state !== t && Rf.enqueueReplaceState(l, l.state, null);
  }
  function Ke(t, l) {
    var e = l;
    if ("ref" in l) {
      e = {};
      for (var a in l)
        a !== "ref" && (e[a] = l[a]);
    }
    if (t = t.defaultProps) {
      e === l && (e = _({}, e));
      for (var u in t)
        e[u] === void 0 && (e[u] = t[u]);
    }
    return e;
  }
  function ko(t) {
    Iu(t);
  }
  function Fo(t) {
    console.error(t);
  }
  function Io(t) {
    Iu(t);
  }
  function zn(t, l) {
    try {
      var e = t.onUncaughtError;
      e(l.value, { componentStack: l.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function Po(t, l, e) {
    try {
      var a = t.onCaughtError;
      a(e.value, {
        componentStack: e.stack,
        errorBoundary: l.tag === 1 ? l.stateNode : null
      });
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  function Df(t, l, e) {
    return e = se(e), e.tag = 3, e.payload = { element: null }, e.callback = function() {
      zn(t, l);
    }, e;
  }
  function ts(t) {
    return t = se(t), t.tag = 3, t;
  }
  function ls(t, l, e, a) {
    var u = e.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var n = a.value;
      t.payload = function() {
        return u(n);
      }, t.callback = function() {
        Po(l, e, a);
      };
    }
    var i = e.stateNode;
    i !== null && typeof i.componentDidCatch == "function" && (t.callback = function() {
      Po(l, e, a), typeof u != "function" && (pe === null ? pe = /* @__PURE__ */ new Set([this]) : pe.add(this));
      var c = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: c !== null ? c : ""
      });
    });
  }
  function Xh(t, l, e, a, u) {
    if (e.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (l = e.alternate, l !== null && ma(
        l,
        e,
        u,
        !0
      ), e = ol.current, e !== null) {
        switch (e.tag) {
          case 31:
          case 13:
            return zl === null ? Hn() : e.alternate === null && _t === 0 && (_t = 3), e.flags &= -257, e.flags |= 65536, e.lanes = u, a === rn ? e.flags |= 16384 : (l = e.updateQueue, l === null ? e.updateQueue = /* @__PURE__ */ new Set([a]) : l.add(a), tc(t, a, u)), !1;
          case 22:
            return e.flags |= 65536, a === rn ? e.flags |= 16384 : (l = e.updateQueue, l === null ? (l = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, e.updateQueue = l) : (e = l.retryQueue, e === null ? l.retryQueue = /* @__PURE__ */ new Set([a]) : e.add(a)), tc(t, a, u)), !1;
        }
        throw Error(r(435, e.tag));
      }
      return tc(t, a, u), Hn(), !1;
    }
    if (it)
      return l = ol.current, l !== null ? ((l.flags & 65536) === 0 && (l.flags |= 256), l.flags |= 65536, l.lanes = u, a !== wi && (t = Error(r(422), { cause: a }), Ia(pl(t, e)))) : (a !== wi && (l = Error(r(423), {
        cause: a
      }), Ia(
        pl(l, e)
      )), t = t.current.alternate, t.flags |= 65536, u &= -u, t.lanes |= u, a = pl(a, e), u = Df(
        t.stateNode,
        a,
        u
      ), uf(t, u), _t !== 4 && (_t = 2)), !1;
    var n = Error(r(520), { cause: a });
    if (n = pl(n, e), gu === null ? gu = [n] : gu.push(n), _t !== 4 && (_t = 2), l === null) return !0;
    a = pl(a, e), e = l;
    do {
      switch (e.tag) {
        case 3:
          return e.flags |= 65536, t = u & -u, e.lanes |= t, t = Df(e.stateNode, a, t), uf(e, t), !1;
        case 1:
          if (l = e.type, n = e.stateNode, (e.flags & 128) === 0 && (typeof l.getDerivedStateFromError == "function" || n !== null && typeof n.componentDidCatch == "function" && (pe === null || !pe.has(n))))
            return e.flags |= 65536, u &= -u, e.lanes |= u, u = ts(u), ls(
              u,
              t,
              e,
              a
            ), uf(e, u), !1;
      }
      e = e.return;
    } while (e !== null);
    return !1;
  }
  var Uf = Error(r(461)), Ht = !1;
  function Kt(t, l, e, a) {
    l.child = t === null ? uo(l, null, e, a) : Ze(
      l,
      t.child,
      e,
      a
    );
  }
  function es(t, l, e, a, u) {
    e = e.render;
    var n = l.ref;
    if ("ref" in a) {
      var i = {};
      for (var c in a)
        c !== "ref" && (i[c] = a[c]);
    } else i = a;
    return Le(l), a = sf(
      t,
      l,
      e,
      i,
      n,
      u
    ), c = df(), t !== null && !Ht ? (mf(t, l, u), Jl(t, l, u)) : (it && c && Ki(l), l.flags |= 1, Kt(t, l, a, u), l.child);
  }
  function as(t, l, e, a, u) {
    if (t === null) {
      var n = e.type;
      return typeof n == "function" && !Qi(n) && n.defaultProps === void 0 && e.compare === null ? (l.tag = 15, l.type = n, us(
        t,
        l,
        n,
        a,
        u
      )) : (t = en(
        e.type,
        null,
        a,
        l,
        l.mode,
        u
      ), t.ref = l.ref, t.return = l, l.child = t);
    }
    if (n = t.child, !Yf(t, u)) {
      var i = n.memoizedProps;
      if (e = e.compare, e = e !== null ? e : Wa, e(i, a) && t.ref === l.ref)
        return Jl(t, l, u);
    }
    return l.flags |= 1, t = Gl(n, a), t.ref = l.ref, t.return = l, l.child = t;
  }
  function us(t, l, e, a, u) {
    if (t !== null) {
      var n = t.memoizedProps;
      if (Wa(n, a) && t.ref === l.ref)
        if (Ht = !1, l.pendingProps = a = n, Yf(t, u))
          (t.flags & 131072) !== 0 && (Ht = !0);
        else
          return l.lanes = t.lanes, Jl(t, l, u);
    }
    return Cf(
      t,
      l,
      e,
      a,
      u
    );
  }
  function ns(t, l, e, a) {
    var u = a.children, n = t !== null ? t.memoizedState : null;
    if (t === null && l.stateNode === null && (l.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), a.mode === "hidden") {
      if ((l.flags & 128) !== 0) {
        if (n = n !== null ? n.baseLanes | e : e, t !== null) {
          for (a = l.child = t.child, u = 0; a !== null; )
            u = u | a.lanes | a.childLanes, a = a.sibling;
          a = u & ~n;
        } else a = 0, l.child = null;
        return is(
          t,
          l,
          n,
          e,
          a
        );
      }
      if ((e & 536870912) !== 0)
        l.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && fn(
          l,
          n !== null ? n.cachePool : null
        ), n !== null ? fo(l, n) : ff(), co(l);
      else
        return a = l.lanes = 536870912, is(
          t,
          l,
          n !== null ? n.baseLanes | e : e,
          e,
          a
        );
    } else
      n !== null ? (fn(l, n.cachePool), fo(l, n), he(), l.memoizedState = null) : (t !== null && fn(l, null), ff(), he());
    return Kt(t, l, u, e), l.child;
  }
  function ou(t, l) {
    return t !== null && t.tag === 22 || l.stateNode !== null || (l.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.sibling;
  }
  function is(t, l, e, a, u) {
    var n = tf();
    return n = n === null ? null : { parent: xt._currentValue, pool: n }, l.memoizedState = {
      baseLanes: e,
      cachePool: n
    }, t !== null && fn(l, null), ff(), co(l), t !== null && ma(t, l, a, !0), l.childLanes = u, null;
  }
  function Tn(t, l) {
    return l = _n(
      { mode: l.mode, children: l.children },
      t.mode
    ), l.ref = t.ref, t.child = l, l.return = t, l;
  }
  function fs(t, l, e) {
    return Ze(l, t.child, null, e), t = Tn(l, l.pendingProps), t.flags |= 2, sl(l), l.memoizedState = null, t;
  }
  function Qh(t, l, e) {
    var a = l.pendingProps, u = (l.flags & 128) !== 0;
    if (l.flags &= -129, t === null) {
      if (it) {
        if (a.mode === "hidden")
          return t = Tn(l, a), l.lanes = 536870912, ou(null, t);
        if (rf(l), (t = Et) ? (t = Sd(
          t,
          El
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (l.memoizedState = {
          dehydrated: t,
          treeContext: ie !== null ? { id: Cl, overflow: xl } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = Zr(t), e.return = l, l.child = e, Zt = l, Et = null)) : t = null, t === null) throw ce(l);
        return l.lanes = 536870912, null;
      }
      return Tn(l, a);
    }
    var n = t.memoizedState;
    if (n !== null) {
      var i = n.dehydrated;
      if (rf(l), u)
        if (l.flags & 256)
          l.flags &= -257, l = fs(
            t,
            l,
            e
          );
        else if (l.memoizedState !== null)
          l.child = t.child, l.flags |= 128, l = null;
        else throw Error(r(558));
      else if (Ht || ma(t, l, e, !1), u = (e & t.childLanes) !== 0, Ht || u) {
        if (a = St, a !== null && (i = kc(a, e), i !== 0 && i !== n.retryLane))
          throw n.retryLane = i, Be(t, i), ul(a, t, i), Uf;
        Hn(), l = fs(
          t,
          l,
          e
        );
      } else
        t = n.treeContext, Et = Tl(i.nextSibling), Zt = l, it = !0, fe = null, El = !1, t !== null && Jr(l, t), l = Tn(l, a), l.flags |= 4096;
      return l;
    }
    return t = Gl(t.child, {
      mode: a.mode,
      children: a.children
    }), t.ref = l.ref, l.child = t, t.return = l, t;
  }
  function An(t, l) {
    var e = l.ref;
    if (e === null)
      t !== null && t.ref !== null && (l.flags |= 4194816);
    else {
      if (typeof e != "function" && typeof e != "object")
        throw Error(r(284));
      (t === null || t.ref !== e) && (l.flags |= 4194816);
    }
  }
  function Cf(t, l, e, a, u) {
    return Le(l), e = sf(
      t,
      l,
      e,
      a,
      void 0,
      u
    ), a = df(), t !== null && !Ht ? (mf(t, l, u), Jl(t, l, u)) : (it && a && Ki(l), l.flags |= 1, Kt(t, l, e, u), l.child);
  }
  function cs(t, l, e, a, u, n) {
    return Le(l), l.updateQueue = null, e = oo(
      l,
      a,
      e,
      u
    ), ro(t), a = df(), t !== null && !Ht ? (mf(t, l, n), Jl(t, l, n)) : (it && a && Ki(l), l.flags |= 1, Kt(t, l, e, n), l.child);
  }
  function rs(t, l, e, a, u) {
    if (Le(l), l.stateNode === null) {
      var n = ra, i = e.contextType;
      typeof i == "object" && i !== null && (n = Vt(i)), n = new e(a, n), l.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = Rf, l.stateNode = n, n._reactInternals = l, n = l.stateNode, n.props = a, n.state = l.memoizedState, n.refs = {}, ef(l), i = e.contextType, n.context = typeof i == "object" && i !== null ? Vt(i) : ra, n.state = l.memoizedState, i = e.getDerivedStateFromProps, typeof i == "function" && (Of(
        l,
        e,
        i,
        a
      ), n.state = l.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof n.getSnapshotBeforeUpdate == "function" || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (i = n.state, typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount(), i !== n.state && Rf.enqueueReplaceState(n, n.state, null), nu(l, a, n, u), uu(), n.state = l.memoizedState), typeof n.componentDidMount == "function" && (l.flags |= 4194308), a = !0;
    } else if (t === null) {
      n = l.stateNode;
      var c = l.memoizedProps, d = Ke(e, c);
      n.props = d;
      var b = n.context, M = e.contextType;
      i = ra, typeof M == "object" && M !== null && (i = Vt(M));
      var U = e.getDerivedStateFromProps;
      M = typeof U == "function" || typeof n.getSnapshotBeforeUpdate == "function", c = l.pendingProps !== c, M || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (c || b !== i) && Wo(
        l,
        n,
        a,
        i
      ), oe = !1;
      var E = l.memoizedState;
      n.state = E, nu(l, a, n, u), uu(), b = l.memoizedState, c || E !== b || oe ? (typeof U == "function" && (Of(
        l,
        e,
        U,
        a
      ), b = l.memoizedState), (d = oe || $o(
        l,
        e,
        d,
        a,
        E,
        b,
        i
      )) ? (M || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount()), typeof n.componentDidMount == "function" && (l.flags |= 4194308)) : (typeof n.componentDidMount == "function" && (l.flags |= 4194308), l.memoizedProps = a, l.memoizedState = b), n.props = a, n.state = b, n.context = i, a = d) : (typeof n.componentDidMount == "function" && (l.flags |= 4194308), a = !1);
    } else {
      n = l.stateNode, af(t, l), i = l.memoizedProps, M = Ke(e, i), n.props = M, U = l.pendingProps, E = n.context, b = e.contextType, d = ra, typeof b == "object" && b !== null && (d = Vt(b)), c = e.getDerivedStateFromProps, (b = typeof c == "function" || typeof n.getSnapshotBeforeUpdate == "function") || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (i !== U || E !== d) && Wo(
        l,
        n,
        a,
        d
      ), oe = !1, E = l.memoizedState, n.state = E, nu(l, a, n, u), uu();
      var A = l.memoizedState;
      i !== U || E !== A || oe || t !== null && t.dependencies !== null && un(t.dependencies) ? (typeof c == "function" && (Of(
        l,
        e,
        c,
        a
      ), A = l.memoizedState), (M = oe || $o(
        l,
        e,
        M,
        a,
        E,
        A,
        d
      ) || t !== null && t.dependencies !== null && un(t.dependencies)) ? (b || typeof n.UNSAFE_componentWillUpdate != "function" && typeof n.componentWillUpdate != "function" || (typeof n.componentWillUpdate == "function" && n.componentWillUpdate(a, A, d), typeof n.UNSAFE_componentWillUpdate == "function" && n.UNSAFE_componentWillUpdate(
        a,
        A,
        d
      )), typeof n.componentDidUpdate == "function" && (l.flags |= 4), typeof n.getSnapshotBeforeUpdate == "function" && (l.flags |= 1024)) : (typeof n.componentDidUpdate != "function" || i === t.memoizedProps && E === t.memoizedState || (l.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && E === t.memoizedState || (l.flags |= 1024), l.memoizedProps = a, l.memoizedState = A), n.props = a, n.state = A, n.context = d, a = M) : (typeof n.componentDidUpdate != "function" || i === t.memoizedProps && E === t.memoizedState || (l.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && E === t.memoizedState || (l.flags |= 1024), a = !1);
    }
    return n = a, An(t, l), a = (l.flags & 128) !== 0, n || a ? (n = l.stateNode, e = a && typeof e.getDerivedStateFromError != "function" ? null : n.render(), l.flags |= 1, t !== null && a ? (l.child = Ze(
      l,
      t.child,
      null,
      u
    ), l.child = Ze(
      l,
      null,
      e,
      u
    )) : Kt(t, l, e, u), l.memoizedState = n.state, t = l.child) : t = Jl(
      t,
      l,
      u
    ), t;
  }
  function os(t, l, e, a) {
    return qe(), l.flags |= 256, Kt(t, l, e, a), l.child;
  }
  var xf = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Nf(t) {
    return { baseLanes: t, cachePool: Ir() };
  }
  function Hf(t, l, e) {
    return t = t !== null ? t.childLanes & ~e : 0, l && (t |= ml), t;
  }
  function ss(t, l, e) {
    var a = l.pendingProps, u = !1, n = (l.flags & 128) !== 0, i;
    if ((i = n) || (i = t !== null && t.memoizedState === null ? !1 : (Ut.current & 2) !== 0), i && (u = !0, l.flags &= -129), i = (l.flags & 32) !== 0, l.flags &= -33, t === null) {
      if (it) {
        if (u ? me(l) : he(), (t = Et) ? (t = Sd(
          t,
          El
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (l.memoizedState = {
          dehydrated: t,
          treeContext: ie !== null ? { id: Cl, overflow: xl } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = Zr(t), e.return = l, l.child = e, Zt = l, Et = null)) : t = null, t === null) throw ce(l);
        return vc(t) ? l.lanes = 32 : l.lanes = 536870912, null;
      }
      var c = a.children;
      return a = a.fallback, u ? (he(), u = l.mode, c = _n(
        { mode: "hidden", children: c },
        u
      ), a = je(
        a,
        u,
        e,
        null
      ), c.return = l, a.return = l, c.sibling = a, l.child = c, a = l.child, a.memoizedState = Nf(e), a.childLanes = Hf(
        t,
        i,
        e
      ), l.memoizedState = xf, ou(null, a)) : (me(l), Bf(l, c));
    }
    var d = t.memoizedState;
    if (d !== null && (c = d.dehydrated, c !== null)) {
      if (n)
        l.flags & 256 ? (me(l), l.flags &= -257, l = jf(
          t,
          l,
          e
        )) : l.memoizedState !== null ? (he(), l.child = t.child, l.flags |= 128, l = null) : (he(), c = a.fallback, u = l.mode, a = _n(
          { mode: "visible", children: a.children },
          u
        ), c = je(
          c,
          u,
          e,
          null
        ), c.flags |= 2, a.return = l, c.return = l, a.sibling = c, l.child = a, Ze(
          l,
          t.child,
          null,
          e
        ), a = l.child, a.memoizedState = Nf(e), a.childLanes = Hf(
          t,
          i,
          e
        ), l.memoizedState = xf, l = ou(null, a));
      else if (me(l), vc(c)) {
        if (i = c.nextSibling && c.nextSibling.dataset, i) var b = i.dgst;
        i = b, a = Error(r(419)), a.stack = "", a.digest = i, Ia({ value: a, source: null, stack: null }), l = jf(
          t,
          l,
          e
        );
      } else if (Ht || ma(t, l, e, !1), i = (e & t.childLanes) !== 0, Ht || i) {
        if (i = St, i !== null && (a = kc(i, e), a !== 0 && a !== d.retryLane))
          throw d.retryLane = a, Be(t, a), ul(i, t, a), Uf;
        yc(c) || Hn(), l = jf(
          t,
          l,
          e
        );
      } else
        yc(c) ? (l.flags |= 192, l.child = t.child, l = null) : (t = d.treeContext, Et = Tl(
          c.nextSibling
        ), Zt = l, it = !0, fe = null, El = !1, t !== null && Jr(l, t), l = Bf(
          l,
          a.children
        ), l.flags |= 4096);
      return l;
    }
    return u ? (he(), c = a.fallback, u = l.mode, d = t.child, b = d.sibling, a = Gl(d, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = d.subtreeFlags & 65011712, b !== null ? c = Gl(
      b,
      c
    ) : (c = je(
      c,
      u,
      e,
      null
    ), c.flags |= 2), c.return = l, a.return = l, a.sibling = c, l.child = a, ou(null, a), a = l.child, c = t.child.memoizedState, c === null ? c = Nf(e) : (u = c.cachePool, u !== null ? (d = xt._currentValue, u = u.parent !== d ? { parent: d, pool: d } : u) : u = Ir(), c = {
      baseLanes: c.baseLanes | e,
      cachePool: u
    }), a.memoizedState = c, a.childLanes = Hf(
      t,
      i,
      e
    ), l.memoizedState = xf, ou(t.child, a)) : (me(l), e = t.child, t = e.sibling, e = Gl(e, {
      mode: "visible",
      children: a.children
    }), e.return = l, e.sibling = null, t !== null && (i = l.deletions, i === null ? (l.deletions = [t], l.flags |= 16) : i.push(t)), l.child = e, l.memoizedState = null, e);
  }
  function Bf(t, l) {
    return l = _n(
      { mode: "visible", children: l },
      t.mode
    ), l.return = t, t.child = l;
  }
  function _n(t, l) {
    return t = rl(22, t, null, l), t.lanes = 0, t;
  }
  function jf(t, l, e) {
    return Ze(l, t.child, null, e), t = Bf(
      l,
      l.pendingProps.children
    ), t.flags |= 2, l.memoizedState = null, t;
  }
  function ds(t, l, e) {
    t.lanes |= l;
    var a = t.alternate;
    a !== null && (a.lanes |= l), ki(t.return, l, e);
  }
  function qf(t, l, e, a, u, n) {
    var i = t.memoizedState;
    i === null ? t.memoizedState = {
      isBackwards: l,
      rendering: null,
      renderingStartTime: 0,
      last: a,
      tail: e,
      tailMode: u,
      treeForkCount: n
    } : (i.isBackwards = l, i.rendering = null, i.renderingStartTime = 0, i.last = a, i.tail = e, i.tailMode = u, i.treeForkCount = n);
  }
  function ms(t, l, e) {
    var a = l.pendingProps, u = a.revealOrder, n = a.tail;
    a = a.children;
    var i = Ut.current, c = (i & 2) !== 0;
    if (c ? (i = i & 1 | 2, l.flags |= 128) : i &= 1, q(Ut, i), Kt(t, l, a, e), a = it ? Fa : 0, !c && t !== null && (t.flags & 128) !== 0)
      t: for (t = l.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && ds(t, e, l);
        else if (t.tag === 19)
          ds(t, e, l);
        else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === l) break t;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === l)
            break t;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    switch (u) {
      case "forwards":
        for (e = l.child, u = null; e !== null; )
          t = e.alternate, t !== null && mn(t) === null && (u = e), e = e.sibling;
        e = u, e === null ? (u = l.child, l.child = null) : (u = e.sibling, e.sibling = null), qf(
          l,
          !1,
          u,
          e,
          n,
          a
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (e = null, u = l.child, l.child = null; u !== null; ) {
          if (t = u.alternate, t !== null && mn(t) === null) {
            l.child = u;
            break;
          }
          t = u.sibling, u.sibling = e, e = u, u = t;
        }
        qf(
          l,
          !0,
          e,
          null,
          n,
          a
        );
        break;
      case "together":
        qf(
          l,
          !1,
          null,
          null,
          void 0,
          a
        );
        break;
      default:
        l.memoizedState = null;
    }
    return l.child;
  }
  function Jl(t, l, e) {
    if (t !== null && (l.dependencies = t.dependencies), ge |= l.lanes, (e & l.childLanes) === 0)
      if (t !== null) {
        if (ma(
          t,
          l,
          e,
          !1
        ), (e & l.childLanes) === 0)
          return null;
      } else return null;
    if (t !== null && l.child !== t.child)
      throw Error(r(153));
    if (l.child !== null) {
      for (t = l.child, e = Gl(t, t.pendingProps), l.child = e, e.return = l; t.sibling !== null; )
        t = t.sibling, e = e.sibling = Gl(t, t.pendingProps), e.return = l;
      e.sibling = null;
    }
    return l.child;
  }
  function Yf(t, l) {
    return (t.lanes & l) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && un(t)));
  }
  function Zh(t, l, e) {
    switch (l.tag) {
      case 3:
        kt(l, l.stateNode.containerInfo), re(l, xt, t.memoizedState.cache), qe();
        break;
      case 27:
      case 5:
        ja(l);
        break;
      case 4:
        kt(l, l.stateNode.containerInfo);
        break;
      case 10:
        re(
          l,
          l.type,
          l.memoizedProps.value
        );
        break;
      case 31:
        if (l.memoizedState !== null)
          return l.flags |= 128, rf(l), null;
        break;
      case 13:
        var a = l.memoizedState;
        if (a !== null)
          return a.dehydrated !== null ? (me(l), l.flags |= 128, null) : (e & l.child.childLanes) !== 0 ? ss(t, l, e) : (me(l), t = Jl(
            t,
            l,
            e
          ), t !== null ? t.sibling : null);
        me(l);
        break;
      case 19:
        var u = (t.flags & 128) !== 0;
        if (a = (e & l.childLanes) !== 0, a || (ma(
          t,
          l,
          e,
          !1
        ), a = (e & l.childLanes) !== 0), u) {
          if (a)
            return ms(
              t,
              l,
              e
            );
          l.flags |= 128;
        }
        if (u = l.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), q(Ut, Ut.current), a) break;
        return null;
      case 22:
        return l.lanes = 0, ns(
          t,
          l,
          e,
          l.pendingProps
        );
      case 24:
        re(l, xt, t.memoizedState.cache);
    }
    return Jl(t, l, e);
  }
  function hs(t, l, e) {
    if (t !== null)
      if (t.memoizedProps !== l.pendingProps)
        Ht = !0;
      else {
        if (!Yf(t, e) && (l.flags & 128) === 0)
          return Ht = !1, Zh(
            t,
            l,
            e
          );
        Ht = (t.flags & 131072) !== 0;
      }
    else
      Ht = !1, it && (l.flags & 1048576) !== 0 && Kr(l, Fa, l.index);
    switch (l.lanes = 0, l.tag) {
      case 16:
        t: {
          var a = l.pendingProps;
          if (t = Xe(l.elementType), l.type = t, typeof t == "function")
            Qi(t) ? (a = Ke(t, a), l.tag = 1, l = rs(
              null,
              l,
              t,
              a,
              e
            )) : (l.tag = 0, l = Cf(
              null,
              l,
              t,
              a,
              e
            ));
          else {
            if (t != null) {
              var u = t.$$typeof;
              if (u === bt) {
                l.tag = 11, l = es(
                  null,
                  l,
                  t,
                  a,
                  e
                );
                break t;
              } else if (u === W) {
                l.tag = 14, l = as(
                  null,
                  l,
                  t,
                  a,
                  e
                );
                break t;
              }
            }
            throw l = jl(t) || t, Error(r(306, l, ""));
          }
        }
        return l;
      case 0:
        return Cf(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 1:
        return a = l.type, u = Ke(
          a,
          l.pendingProps
        ), rs(
          t,
          l,
          a,
          u,
          e
        );
      case 3:
        t: {
          if (kt(
            l,
            l.stateNode.containerInfo
          ), t === null) throw Error(r(387));
          a = l.pendingProps;
          var n = l.memoizedState;
          u = n.element, af(t, l), nu(l, a, null, e);
          var i = l.memoizedState;
          if (a = i.cache, re(l, xt, a), a !== n.cache && Fi(
            l,
            [xt],
            e,
            !0
          ), uu(), a = i.element, n.isDehydrated)
            if (n = {
              element: a,
              isDehydrated: !1,
              cache: i.cache
            }, l.updateQueue.baseState = n, l.memoizedState = n, l.flags & 256) {
              l = os(
                t,
                l,
                a,
                e
              );
              break t;
            } else if (a !== u) {
              u = pl(
                Error(r(424)),
                l
              ), Ia(u), l = os(
                t,
                l,
                a,
                e
              );
              break t;
            } else {
              switch (t = l.stateNode.containerInfo, t.nodeType) {
                case 9:
                  t = t.body;
                  break;
                default:
                  t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
              }
              for (Et = Tl(t.firstChild), Zt = l, it = !0, fe = null, El = !0, e = uo(
                l,
                null,
                a,
                e
              ), l.child = e; e; )
                e.flags = e.flags & -3 | 4096, e = e.sibling;
            }
          else {
            if (qe(), a === u) {
              l = Jl(
                t,
                l,
                e
              );
              break t;
            }
            Kt(t, l, a, e);
          }
          l = l.child;
        }
        return l;
      case 26:
        return An(t, l), t === null ? (e = _d(
          l.type,
          null,
          l.pendingProps,
          null
        )) ? l.memoizedState = e : it || (e = l.type, t = l.pendingProps, a = Xn(
          lt.current
        ).createElement(e), a[Qt] = l, a[It] = t, Jt(a, e, t), Yt(a), l.stateNode = a) : l.memoizedState = _d(
          l.type,
          t.memoizedProps,
          l.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return ja(l), t === null && it && (a = l.stateNode = zd(
          l.type,
          l.pendingProps,
          lt.current
        ), Zt = l, El = !0, u = Et, ze(l.type) ? (gc = u, Et = Tl(a.firstChild)) : Et = u), Kt(
          t,
          l,
          l.pendingProps.children,
          e
        ), An(t, l), t === null && (l.flags |= 4194304), l.child;
      case 5:
        return t === null && it && ((u = a = Et) && (a = Sy(
          a,
          l.type,
          l.pendingProps,
          El
        ), a !== null ? (l.stateNode = a, Zt = l, Et = Tl(a.firstChild), El = !1, u = !0) : u = !1), u || ce(l)), ja(l), u = l.type, n = l.pendingProps, i = t !== null ? t.memoizedProps : null, a = n.children, dc(u, n) ? a = null : i !== null && dc(u, i) && (l.flags |= 32), l.memoizedState !== null && (u = sf(
          t,
          l,
          Hh,
          null,
          null,
          e
        ), _u._currentValue = u), An(t, l), Kt(t, l, a, e), l.child;
      case 6:
        return t === null && it && ((t = e = Et) && (e = by(
          e,
          l.pendingProps,
          El
        ), e !== null ? (l.stateNode = e, Zt = l, Et = null, t = !0) : t = !1), t || ce(l)), null;
      case 13:
        return ss(t, l, e);
      case 4:
        return kt(
          l,
          l.stateNode.containerInfo
        ), a = l.pendingProps, t === null ? l.child = Ze(
          l,
          null,
          a,
          e
        ) : Kt(t, l, a, e), l.child;
      case 11:
        return es(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 7:
        return Kt(
          t,
          l,
          l.pendingProps,
          e
        ), l.child;
      case 8:
        return Kt(
          t,
          l,
          l.pendingProps.children,
          e
        ), l.child;
      case 12:
        return Kt(
          t,
          l,
          l.pendingProps.children,
          e
        ), l.child;
      case 10:
        return a = l.pendingProps, re(l, l.type, a.value), Kt(t, l, a.children, e), l.child;
      case 9:
        return u = l.type._context, a = l.pendingProps.children, Le(l), u = Vt(u), a = a(u), l.flags |= 1, Kt(t, l, a, e), l.child;
      case 14:
        return as(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 15:
        return us(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 19:
        return ms(t, l, e);
      case 31:
        return Qh(t, l, e);
      case 22:
        return ns(
          t,
          l,
          e,
          l.pendingProps
        );
      case 24:
        return Le(l), a = Vt(xt), t === null ? (u = tf(), u === null && (u = St, n = Ii(), u.pooledCache = n, n.refCount++, n !== null && (u.pooledCacheLanes |= e), u = n), l.memoizedState = { parent: a, cache: u }, ef(l), re(l, xt, u)) : ((t.lanes & e) !== 0 && (af(t, l), nu(l, null, null, e), uu()), u = t.memoizedState, n = l.memoizedState, u.parent !== a ? (u = { parent: a, cache: a }, l.memoizedState = u, l.lanes === 0 && (l.memoizedState = l.updateQueue.baseState = u), re(l, xt, a)) : (a = n.cache, re(l, xt, a), a !== u.cache && Fi(
          l,
          [xt],
          e,
          !0
        ))), Kt(
          t,
          l,
          l.pendingProps.children,
          e
        ), l.child;
      case 29:
        throw l.pendingProps;
    }
    throw Error(r(156, l.tag));
  }
  function wl(t) {
    t.flags |= 4;
  }
  function Lf(t, l, e, a, u) {
    if ((l = (t.mode & 32) !== 0) && (l = !1), l) {
      if (t.flags |= 16777216, (u & 335544128) === u)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (Xs()) t.flags |= 8192;
        else
          throw Qe = rn, lf;
    } else t.flags &= -16777217;
  }
  function ys(t, l) {
    if (l.type !== "stylesheet" || (l.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !Ud(l))
      if (Xs()) t.flags |= 8192;
      else
        throw Qe = rn, lf;
  }
  function Mn(t, l) {
    l !== null && (t.flags |= 4), t.flags & 16384 && (l = t.tag !== 22 ? wc() : 536870912, t.lanes |= l, _a |= l);
  }
  function su(t, l) {
    if (!it)
      switch (t.tailMode) {
        case "hidden":
          l = t.tail;
          for (var e = null; l !== null; )
            l.alternate !== null && (e = l), l = l.sibling;
          e === null ? t.tail = null : e.sibling = null;
          break;
        case "collapsed":
          e = t.tail;
          for (var a = null; e !== null; )
            e.alternate !== null && (a = e), e = e.sibling;
          a === null ? l || t.tail === null ? t.tail = null : t.tail.sibling = null : a.sibling = null;
      }
  }
  function zt(t) {
    var l = t.alternate !== null && t.alternate.child === t.child, e = 0, a = 0;
    if (l)
      for (var u = t.child; u !== null; )
        e |= u.lanes | u.childLanes, a |= u.subtreeFlags & 65011712, a |= u.flags & 65011712, u.return = t, u = u.sibling;
    else
      for (u = t.child; u !== null; )
        e |= u.lanes | u.childLanes, a |= u.subtreeFlags, a |= u.flags, u.return = t, u = u.sibling;
    return t.subtreeFlags |= a, t.childLanes = e, l;
  }
  function Vh(t, l, e) {
    var a = l.pendingProps;
    switch (Ji(l), l.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return zt(l), null;
      case 1:
        return zt(l), null;
      case 3:
        return e = l.stateNode, a = null, t !== null && (a = t.memoizedState.cache), l.memoizedState.cache !== a && (l.flags |= 2048), Zl(xt), Dt(), e.pendingContext && (e.context = e.pendingContext, e.pendingContext = null), (t === null || t.child === null) && (da(l) ? wl(l) : t === null || t.memoizedState.isDehydrated && (l.flags & 256) === 0 || (l.flags |= 1024, $i())), zt(l), null;
      case 26:
        var u = l.type, n = l.memoizedState;
        return t === null ? (wl(l), n !== null ? (zt(l), ys(l, n)) : (zt(l), Lf(
          l,
          u,
          null,
          a,
          e
        ))) : n ? n !== t.memoizedState ? (wl(l), zt(l), ys(l, n)) : (zt(l), l.flags &= -16777217) : (t = t.memoizedProps, t !== a && wl(l), zt(l), Lf(
          l,
          u,
          t,
          a,
          e
        )), null;
      case 27:
        if (ju(l), e = lt.current, u = l.type, t !== null && l.stateNode != null)
          t.memoizedProps !== a && wl(l);
        else {
          if (!a) {
            if (l.stateNode === null)
              throw Error(r(166));
            return zt(l), null;
          }
          t = X.current, da(l) ? wr(l) : (t = zd(u, a, e), l.stateNode = t, wl(l));
        }
        return zt(l), null;
      case 5:
        if (ju(l), u = l.type, t !== null && l.stateNode != null)
          t.memoizedProps !== a && wl(l);
        else {
          if (!a) {
            if (l.stateNode === null)
              throw Error(r(166));
            return zt(l), null;
          }
          if (n = X.current, da(l))
            wr(l);
          else {
            var i = Xn(
              lt.current
            );
            switch (n) {
              case 1:
                n = i.createElementNS(
                  "http://www.w3.org/2000/svg",
                  u
                );
                break;
              case 2:
                n = i.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  u
                );
                break;
              default:
                switch (u) {
                  case "svg":
                    n = i.createElementNS(
                      "http://www.w3.org/2000/svg",
                      u
                    );
                    break;
                  case "math":
                    n = i.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      u
                    );
                    break;
                  case "script":
                    n = i.createElement("div"), n.innerHTML = "<script><\/script>", n = n.removeChild(
                      n.firstChild
                    );
                    break;
                  case "select":
                    n = typeof a.is == "string" ? i.createElement("select", {
                      is: a.is
                    }) : i.createElement("select"), a.multiple ? n.multiple = !0 : a.size && (n.size = a.size);
                    break;
                  default:
                    n = typeof a.is == "string" ? i.createElement(u, { is: a.is }) : i.createElement(u);
                }
            }
            n[Qt] = l, n[It] = a;
            t: for (i = l.child; i !== null; ) {
              if (i.tag === 5 || i.tag === 6)
                n.appendChild(i.stateNode);
              else if (i.tag !== 4 && i.tag !== 27 && i.child !== null) {
                i.child.return = i, i = i.child;
                continue;
              }
              if (i === l) break t;
              for (; i.sibling === null; ) {
                if (i.return === null || i.return === l)
                  break t;
                i = i.return;
              }
              i.sibling.return = i.return, i = i.sibling;
            }
            l.stateNode = n;
            t: switch (Jt(n, u, a), u) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                a = !!a.autoFocus;
                break t;
              case "img":
                a = !0;
                break t;
              default:
                a = !1;
            }
            a && wl(l);
          }
        }
        return zt(l), Lf(
          l,
          l.type,
          t === null ? null : t.memoizedProps,
          l.pendingProps,
          e
        ), null;
      case 6:
        if (t && l.stateNode != null)
          t.memoizedProps !== a && wl(l);
        else {
          if (typeof a != "string" && l.stateNode === null)
            throw Error(r(166));
          if (t = lt.current, da(l)) {
            if (t = l.stateNode, e = l.memoizedProps, a = null, u = Zt, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  a = u.memoizedProps;
              }
            t[Qt] = l, t = !!(t.nodeValue === e || a !== null && a.suppressHydrationWarning === !0 || sd(t.nodeValue, e)), t || ce(l, !0);
          } else
            t = Xn(t).createTextNode(
              a
            ), t[Qt] = l, l.stateNode = t;
        }
        return zt(l), null;
      case 31:
        if (e = l.memoizedState, t === null || t.memoizedState !== null) {
          if (a = da(l), e !== null) {
            if (t === null) {
              if (!a) throw Error(r(318));
              if (t = l.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(557));
              t[Qt] = l;
            } else
              qe(), (l.flags & 128) === 0 && (l.memoizedState = null), l.flags |= 4;
            zt(l), t = !1;
          } else
            e = $i(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = e), t = !0;
          if (!t)
            return l.flags & 256 ? (sl(l), l) : (sl(l), null);
          if ((l.flags & 128) !== 0)
            throw Error(r(558));
        }
        return zt(l), null;
      case 13:
        if (a = l.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (u = da(l), a !== null && a.dehydrated !== null) {
            if (t === null) {
              if (!u) throw Error(r(318));
              if (u = l.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(r(317));
              u[Qt] = l;
            } else
              qe(), (l.flags & 128) === 0 && (l.memoizedState = null), l.flags |= 4;
            zt(l), u = !1;
          } else
            u = $i(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return l.flags & 256 ? (sl(l), l) : (sl(l), null);
        }
        return sl(l), (l.flags & 128) !== 0 ? (l.lanes = e, l) : (e = a !== null, t = t !== null && t.memoizedState !== null, e && (a = l.child, u = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (u = a.alternate.memoizedState.cachePool.pool), n = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (n = a.memoizedState.cachePool.pool), n !== u && (a.flags |= 2048)), e !== t && e && (l.child.flags |= 8192), Mn(l, l.updateQueue), zt(l), null);
      case 4:
        return Dt(), t === null && fc(l.stateNode.containerInfo), zt(l), null;
      case 10:
        return Zl(l.type), zt(l), null;
      case 19:
        if (N(Ut), a = l.memoizedState, a === null) return zt(l), null;
        if (u = (l.flags & 128) !== 0, n = a.rendering, n === null)
          if (u) su(a, !1);
          else {
            if (_t !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = l.child; t !== null; ) {
                if (n = mn(t), n !== null) {
                  for (l.flags |= 128, su(a, !1), t = n.updateQueue, l.updateQueue = t, Mn(l, t), l.subtreeFlags = 0, t = e, e = l.child; e !== null; )
                    Qr(e, t), e = e.sibling;
                  return q(
                    Ut,
                    Ut.current & 1 | 2
                  ), it && Xl(l, a.treeForkCount), l.child;
                }
                t = t.sibling;
              }
            a.tail !== null && nl() > Cn && (l.flags |= 128, u = !0, su(a, !1), l.lanes = 4194304);
          }
        else {
          if (!u)
            if (t = mn(n), t !== null) {
              if (l.flags |= 128, u = !0, t = t.updateQueue, l.updateQueue = t, Mn(l, t), su(a, !0), a.tail === null && a.tailMode === "hidden" && !n.alternate && !it)
                return zt(l), null;
            } else
              2 * nl() - a.renderingStartTime > Cn && e !== 536870912 && (l.flags |= 128, u = !0, su(a, !1), l.lanes = 4194304);
          a.isBackwards ? (n.sibling = l.child, l.child = n) : (t = a.last, t !== null ? t.sibling = n : l.child = n, a.last = n);
        }
        return a.tail !== null ? (t = a.tail, a.rendering = t, a.tail = t.sibling, a.renderingStartTime = nl(), t.sibling = null, e = Ut.current, q(
          Ut,
          u ? e & 1 | 2 : e & 1
        ), it && Xl(l, a.treeForkCount), t) : (zt(l), null);
      case 22:
      case 23:
        return sl(l), cf(), a = l.memoizedState !== null, t !== null ? t.memoizedState !== null !== a && (l.flags |= 8192) : a && (l.flags |= 8192), a ? (e & 536870912) !== 0 && (l.flags & 128) === 0 && (zt(l), l.subtreeFlags & 6 && (l.flags |= 8192)) : zt(l), e = l.updateQueue, e !== null && Mn(l, e.retryQueue), e = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), a = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (a = l.memoizedState.cachePool.pool), a !== e && (l.flags |= 2048), t !== null && N(Ge), null;
      case 24:
        return e = null, t !== null && (e = t.memoizedState.cache), l.memoizedState.cache !== e && (l.flags |= 2048), Zl(xt), zt(l), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(r(156, l.tag));
  }
  function Kh(t, l) {
    switch (Ji(l), l.tag) {
      case 1:
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 3:
        return Zl(xt), Dt(), t = l.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (l.flags = t & -65537 | 128, l) : null;
      case 26:
      case 27:
      case 5:
        return ju(l), null;
      case 31:
        if (l.memoizedState !== null) {
          if (sl(l), l.alternate === null)
            throw Error(r(340));
          qe();
        }
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 13:
        if (sl(l), t = l.memoizedState, t !== null && t.dehydrated !== null) {
          if (l.alternate === null)
            throw Error(r(340));
          qe();
        }
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 19:
        return N(Ut), null;
      case 4:
        return Dt(), null;
      case 10:
        return Zl(l.type), null;
      case 22:
      case 23:
        return sl(l), cf(), t !== null && N(Ge), t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 24:
        return Zl(xt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function vs(t, l) {
    switch (Ji(l), l.tag) {
      case 3:
        Zl(xt), Dt();
        break;
      case 26:
      case 27:
      case 5:
        ju(l);
        break;
      case 4:
        Dt();
        break;
      case 31:
        l.memoizedState !== null && sl(l);
        break;
      case 13:
        sl(l);
        break;
      case 19:
        N(Ut);
        break;
      case 10:
        Zl(l.type);
        break;
      case 22:
      case 23:
        sl(l), cf(), t !== null && N(Ge);
        break;
      case 24:
        Zl(xt);
    }
  }
  function du(t, l) {
    try {
      var e = l.updateQueue, a = e !== null ? e.lastEffect : null;
      if (a !== null) {
        var u = a.next;
        e = u;
        do {
          if ((e.tag & t) === t) {
            a = void 0;
            var n = e.create, i = e.inst;
            a = n(), i.destroy = a;
          }
          e = e.next;
        } while (e !== u);
      }
    } catch (c) {
      mt(l, l.return, c);
    }
  }
  function ye(t, l, e) {
    try {
      var a = l.updateQueue, u = a !== null ? a.lastEffect : null;
      if (u !== null) {
        var n = u.next;
        a = n;
        do {
          if ((a.tag & t) === t) {
            var i = a.inst, c = i.destroy;
            if (c !== void 0) {
              i.destroy = void 0, u = l;
              var d = e, b = c;
              try {
                b();
              } catch (M) {
                mt(
                  u,
                  d,
                  M
                );
              }
            }
          }
          a = a.next;
        } while (a !== n);
      }
    } catch (M) {
      mt(l, l.return, M);
    }
  }
  function gs(t) {
    var l = t.updateQueue;
    if (l !== null) {
      var e = t.stateNode;
      try {
        io(l, e);
      } catch (a) {
        mt(t, t.return, a);
      }
    }
  }
  function ps(t, l, e) {
    e.props = Ke(
      t.type,
      t.memoizedProps
    ), e.state = t.memoizedState;
    try {
      e.componentWillUnmount();
    } catch (a) {
      mt(t, l, a);
    }
  }
  function mu(t, l) {
    try {
      var e = t.ref;
      if (e !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var a = t.stateNode;
            break;
          case 30:
            a = t.stateNode;
            break;
          default:
            a = t.stateNode;
        }
        typeof e == "function" ? t.refCleanup = e(a) : e.current = a;
      }
    } catch (u) {
      mt(t, l, u);
    }
  }
  function Nl(t, l) {
    var e = t.ref, a = t.refCleanup;
    if (e !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (u) {
          mt(t, l, u);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof e == "function")
        try {
          e(null);
        } catch (u) {
          mt(t, l, u);
        }
      else e.current = null;
  }
  function Ss(t) {
    var l = t.type, e = t.memoizedProps, a = t.stateNode;
    try {
      t: switch (l) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          e.autoFocus && a.focus();
          break t;
        case "img":
          e.src ? a.src = e.src : e.srcSet && (a.srcset = e.srcSet);
      }
    } catch (u) {
      mt(t, t.return, u);
    }
  }
  function Gf(t, l, e) {
    try {
      var a = t.stateNode;
      my(a, t.type, e, l), a[It] = l;
    } catch (u) {
      mt(t, t.return, u);
    }
  }
  function bs(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && ze(t.type) || t.tag === 4;
  }
  function Xf(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || bs(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && ze(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function Qf(t, l, e) {
    var a = t.tag;
    if (a === 5 || a === 6)
      t = t.stateNode, l ? (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).insertBefore(t, l) : (l = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, l.appendChild(t), e = e._reactRootContainer, e != null || l.onclick !== null || (l.onclick = Yl));
    else if (a !== 4 && (a === 27 && ze(t.type) && (e = t.stateNode, l = null), t = t.child, t !== null))
      for (Qf(t, l, e), t = t.sibling; t !== null; )
        Qf(t, l, e), t = t.sibling;
  }
  function On(t, l, e) {
    var a = t.tag;
    if (a === 5 || a === 6)
      t = t.stateNode, l ? e.insertBefore(t, l) : e.appendChild(t);
    else if (a !== 4 && (a === 27 && ze(t.type) && (e = t.stateNode), t = t.child, t !== null))
      for (On(t, l, e), t = t.sibling; t !== null; )
        On(t, l, e), t = t.sibling;
  }
  function Es(t) {
    var l = t.stateNode, e = t.memoizedProps;
    try {
      for (var a = t.type, u = l.attributes; u.length; )
        l.removeAttributeNode(u[0]);
      Jt(l, a, e), l[Qt] = t, l[It] = e;
    } catch (n) {
      mt(t, t.return, n);
    }
  }
  var $l = !1, Bt = !1, Zf = !1, zs = typeof WeakSet == "function" ? WeakSet : Set, Lt = null;
  function Jh(t, l) {
    if (t = t.containerInfo, oc = $n, t = Nr(t), Bi(t)) {
      if ("selectionStart" in t)
        var e = {
          start: t.selectionStart,
          end: t.selectionEnd
        };
      else
        t: {
          e = (e = t.ownerDocument) && e.defaultView || window;
          var a = e.getSelection && e.getSelection();
          if (a && a.rangeCount !== 0) {
            e = a.anchorNode;
            var u = a.anchorOffset, n = a.focusNode;
            a = a.focusOffset;
            try {
              e.nodeType, n.nodeType;
            } catch {
              e = null;
              break t;
            }
            var i = 0, c = -1, d = -1, b = 0, M = 0, U = t, E = null;
            l: for (; ; ) {
              for (var A; U !== e || u !== 0 && U.nodeType !== 3 || (c = i + u), U !== n || a !== 0 && U.nodeType !== 3 || (d = i + a), U.nodeType === 3 && (i += U.nodeValue.length), (A = U.firstChild) !== null; )
                E = U, U = A;
              for (; ; ) {
                if (U === t) break l;
                if (E === e && ++b === u && (c = i), E === n && ++M === a && (d = i), (A = U.nextSibling) !== null) break;
                U = E, E = U.parentNode;
              }
              U = A;
            }
            e = c === -1 || d === -1 ? null : { start: c, end: d };
          } else e = null;
        }
      e = e || { start: 0, end: 0 };
    } else e = null;
    for (sc = { focusedElem: t, selectionRange: e }, $n = !1, Lt = l; Lt !== null; )
      if (l = Lt, t = l.child, (l.subtreeFlags & 1028) !== 0 && t !== null)
        t.return = l, Lt = t;
      else
        for (; Lt !== null; ) {
          switch (l = Lt, n = l.alternate, t = l.flags, l.tag) {
            case 0:
              if ((t & 4) !== 0 && (t = l.updateQueue, t = t !== null ? t.events : null, t !== null))
                for (e = 0; e < t.length; e++)
                  u = t[e], u.ref.impl = u.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && n !== null) {
                t = void 0, e = l, u = n.memoizedProps, n = n.memoizedState, a = e.stateNode;
                try {
                  var L = Ke(
                    e.type,
                    u
                  );
                  t = a.getSnapshotBeforeUpdate(
                    L,
                    n
                  ), a.__reactInternalSnapshotBeforeUpdate = t;
                } catch (K) {
                  mt(
                    e,
                    e.return,
                    K
                  );
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (t = l.stateNode.containerInfo, e = t.nodeType, e === 9)
                  hc(t);
                else if (e === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      hc(t);
                      break;
                    default:
                      t.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((t & 1024) !== 0) throw Error(r(163));
          }
          if (t = l.sibling, t !== null) {
            t.return = l.return, Lt = t;
            break;
          }
          Lt = l.return;
        }
  }
  function Ts(t, l, e) {
    var a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        kl(t, e), a & 4 && du(5, e);
        break;
      case 1:
        if (kl(t, e), a & 4)
          if (t = e.stateNode, l === null)
            try {
              t.componentDidMount();
            } catch (i) {
              mt(e, e.return, i);
            }
          else {
            var u = Ke(
              e.type,
              l.memoizedProps
            );
            l = l.memoizedState;
            try {
              t.componentDidUpdate(
                u,
                l,
                t.__reactInternalSnapshotBeforeUpdate
              );
            } catch (i) {
              mt(
                e,
                e.return,
                i
              );
            }
          }
        a & 64 && gs(e), a & 512 && mu(e, e.return);
        break;
      case 3:
        if (kl(t, e), a & 64 && (t = e.updateQueue, t !== null)) {
          if (l = null, e.child !== null)
            switch (e.child.tag) {
              case 27:
              case 5:
                l = e.child.stateNode;
                break;
              case 1:
                l = e.child.stateNode;
            }
          try {
            io(t, l);
          } catch (i) {
            mt(e, e.return, i);
          }
        }
        break;
      case 27:
        l === null && a & 4 && Es(e);
      case 26:
      case 5:
        kl(t, e), l === null && a & 4 && Ss(e), a & 512 && mu(e, e.return);
        break;
      case 12:
        kl(t, e);
        break;
      case 31:
        kl(t, e), a & 4 && Ms(t, e);
        break;
      case 13:
        kl(t, e), a & 4 && Os(t, e), a & 64 && (t = e.memoizedState, t !== null && (t = t.dehydrated, t !== null && (e = ly.bind(
          null,
          e
        ), Ey(t, e))));
        break;
      case 22:
        if (a = e.memoizedState !== null || $l, !a) {
          l = l !== null && l.memoizedState !== null || Bt, u = $l;
          var n = Bt;
          $l = a, (Bt = l) && !n ? Fl(
            t,
            e,
            (e.subtreeFlags & 8772) !== 0
          ) : kl(t, e), $l = u, Bt = n;
        }
        break;
      case 30:
        break;
      default:
        kl(t, e);
    }
  }
  function As(t) {
    var l = t.alternate;
    l !== null && (t.alternate = null, As(l)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (l = t.stateNode, l !== null && pi(l)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var Tt = null, tl = !1;
  function Wl(t, l, e) {
    for (e = e.child; e !== null; )
      _s(t, l, e), e = e.sibling;
  }
  function _s(t, l, e) {
    if (il && typeof il.onCommitFiberUnmount == "function")
      try {
        il.onCommitFiberUnmount(qa, e);
      } catch {
      }
    switch (e.tag) {
      case 26:
        Bt || Nl(e, l), Wl(
          t,
          l,
          e
        ), e.memoizedState ? e.memoizedState.count-- : e.stateNode && (e = e.stateNode, e.parentNode.removeChild(e));
        break;
      case 27:
        Bt || Nl(e, l);
        var a = Tt, u = tl;
        ze(e.type) && (Tt = e.stateNode, tl = !1), Wl(
          t,
          l,
          e
        ), zu(e.stateNode), Tt = a, tl = u;
        break;
      case 5:
        Bt || Nl(e, l);
      case 6:
        if (a = Tt, u = tl, Tt = null, Wl(
          t,
          l,
          e
        ), Tt = a, tl = u, Tt !== null)
          if (tl)
            try {
              (Tt.nodeType === 9 ? Tt.body : Tt.nodeName === "HTML" ? Tt.ownerDocument.body : Tt).removeChild(e.stateNode);
            } catch (n) {
              mt(
                e,
                l,
                n
              );
            }
          else
            try {
              Tt.removeChild(e.stateNode);
            } catch (n) {
              mt(
                e,
                l,
                n
              );
            }
        break;
      case 18:
        Tt !== null && (tl ? (t = Tt, gd(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          e.stateNode
        ), Na(t)) : gd(Tt, e.stateNode));
        break;
      case 4:
        a = Tt, u = tl, Tt = e.stateNode.containerInfo, tl = !0, Wl(
          t,
          l,
          e
        ), Tt = a, tl = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        ye(2, e, l), Bt || ye(4, e, l), Wl(
          t,
          l,
          e
        );
        break;
      case 1:
        Bt || (Nl(e, l), a = e.stateNode, typeof a.componentWillUnmount == "function" && ps(
          e,
          l,
          a
        )), Wl(
          t,
          l,
          e
        );
        break;
      case 21:
        Wl(
          t,
          l,
          e
        );
        break;
      case 22:
        Bt = (a = Bt) || e.memoizedState !== null, Wl(
          t,
          l,
          e
        ), Bt = a;
        break;
      default:
        Wl(
          t,
          l,
          e
        );
    }
  }
  function Ms(t, l) {
    if (l.memoizedState === null && (t = l.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        Na(t);
      } catch (e) {
        mt(l, l.return, e);
      }
    }
  }
  function Os(t, l) {
    if (l.memoizedState === null && (t = l.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        Na(t);
      } catch (e) {
        mt(l, l.return, e);
      }
  }
  function wh(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var l = t.stateNode;
        return l === null && (l = t.stateNode = new zs()), l;
      case 22:
        return t = t.stateNode, l = t._retryCache, l === null && (l = t._retryCache = new zs()), l;
      default:
        throw Error(r(435, t.tag));
    }
  }
  function Rn(t, l) {
    var e = wh(t);
    l.forEach(function(a) {
      if (!e.has(a)) {
        e.add(a);
        var u = ey.bind(null, t, a);
        a.then(u, u);
      }
    });
  }
  function ll(t, l) {
    var e = l.deletions;
    if (e !== null)
      for (var a = 0; a < e.length; a++) {
        var u = e[a], n = t, i = l, c = i;
        t: for (; c !== null; ) {
          switch (c.tag) {
            case 27:
              if (ze(c.type)) {
                Tt = c.stateNode, tl = !1;
                break t;
              }
              break;
            case 5:
              Tt = c.stateNode, tl = !1;
              break t;
            case 3:
            case 4:
              Tt = c.stateNode.containerInfo, tl = !0;
              break t;
          }
          c = c.return;
        }
        if (Tt === null) throw Error(r(160));
        _s(n, i, u), Tt = null, tl = !1, n = u.alternate, n !== null && (n.return = null), u.return = null;
      }
    if (l.subtreeFlags & 13886)
      for (l = l.child; l !== null; )
        Rs(l, t), l = l.sibling;
  }
  var Rl = null;
  function Rs(t, l) {
    var e = t.alternate, a = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        ll(l, t), el(t), a & 4 && (ye(3, t, t.return), du(3, t), ye(5, t, t.return));
        break;
      case 1:
        ll(l, t), el(t), a & 512 && (Bt || e === null || Nl(e, e.return)), a & 64 && $l && (t = t.updateQueue, t !== null && (a = t.callbacks, a !== null && (e = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = e === null ? a : e.concat(a))));
        break;
      case 26:
        var u = Rl;
        if (ll(l, t), el(t), a & 512 && (Bt || e === null || Nl(e, e.return)), a & 4) {
          var n = e !== null ? e.memoizedState : null;
          if (a = t.memoizedState, e === null)
            if (a === null)
              if (t.stateNode === null) {
                t: {
                  a = t.type, e = t.memoizedProps, u = u.ownerDocument || u;
                  l: switch (a) {
                    case "title":
                      n = u.getElementsByTagName("title")[0], (!n || n[Ga] || n[Qt] || n.namespaceURI === "http://www.w3.org/2000/svg" || n.hasAttribute("itemprop")) && (n = u.createElement(a), u.head.insertBefore(
                        n,
                        u.querySelector("head > title")
                      )), Jt(n, a, e), n[Qt] = t, Yt(n), a = n;
                      break t;
                    case "link":
                      var i = Rd(
                        "link",
                        "href",
                        u
                      ).get(a + (e.href || ""));
                      if (i) {
                        for (var c = 0; c < i.length; c++)
                          if (n = i[c], n.getAttribute("href") === (e.href == null || e.href === "" ? null : e.href) && n.getAttribute("rel") === (e.rel == null ? null : e.rel) && n.getAttribute("title") === (e.title == null ? null : e.title) && n.getAttribute("crossorigin") === (e.crossOrigin == null ? null : e.crossOrigin)) {
                            i.splice(c, 1);
                            break l;
                          }
                      }
                      n = u.createElement(a), Jt(n, a, e), u.head.appendChild(n);
                      break;
                    case "meta":
                      if (i = Rd(
                        "meta",
                        "content",
                        u
                      ).get(a + (e.content || ""))) {
                        for (c = 0; c < i.length; c++)
                          if (n = i[c], n.getAttribute("content") === (e.content == null ? null : "" + e.content) && n.getAttribute("name") === (e.name == null ? null : e.name) && n.getAttribute("property") === (e.property == null ? null : e.property) && n.getAttribute("http-equiv") === (e.httpEquiv == null ? null : e.httpEquiv) && n.getAttribute("charset") === (e.charSet == null ? null : e.charSet)) {
                            i.splice(c, 1);
                            break l;
                          }
                      }
                      n = u.createElement(a), Jt(n, a, e), u.head.appendChild(n);
                      break;
                    default:
                      throw Error(r(468, a));
                  }
                  n[Qt] = t, Yt(n), a = n;
                }
                t.stateNode = a;
              } else
                Dd(
                  u,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = Od(
                u,
                a,
                t.memoizedProps
              );
          else
            n !== a ? (n === null ? e.stateNode !== null && (e = e.stateNode, e.parentNode.removeChild(e)) : n.count--, a === null ? Dd(
              u,
              t.type,
              t.stateNode
            ) : Od(
              u,
              a,
              t.memoizedProps
            )) : a === null && t.stateNode !== null && Gf(
              t,
              t.memoizedProps,
              e.memoizedProps
            );
        }
        break;
      case 27:
        ll(l, t), el(t), a & 512 && (Bt || e === null || Nl(e, e.return)), e !== null && a & 4 && Gf(
          t,
          t.memoizedProps,
          e.memoizedProps
        );
        break;
      case 5:
        if (ll(l, t), el(t), a & 512 && (Bt || e === null || Nl(e, e.return)), t.flags & 32) {
          u = t.stateNode;
          try {
            ea(u, "");
          } catch (L) {
            mt(t, t.return, L);
          }
        }
        a & 4 && t.stateNode != null && (u = t.memoizedProps, Gf(
          t,
          u,
          e !== null ? e.memoizedProps : u
        )), a & 1024 && (Zf = !0);
        break;
      case 6:
        if (ll(l, t), el(t), a & 4) {
          if (t.stateNode === null)
            throw Error(r(162));
          a = t.memoizedProps, e = t.stateNode;
          try {
            e.nodeValue = a;
          } catch (L) {
            mt(t, t.return, L);
          }
        }
        break;
      case 3:
        if (Vn = null, u = Rl, Rl = Qn(l.containerInfo), ll(l, t), Rl = u, el(t), a & 4 && e !== null && e.memoizedState.isDehydrated)
          try {
            Na(l.containerInfo);
          } catch (L) {
            mt(t, t.return, L);
          }
        Zf && (Zf = !1, Ds(t));
        break;
      case 4:
        a = Rl, Rl = Qn(
          t.stateNode.containerInfo
        ), ll(l, t), el(t), Rl = a;
        break;
      case 12:
        ll(l, t), el(t);
        break;
      case 31:
        ll(l, t), el(t), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, Rn(t, a)));
        break;
      case 13:
        ll(l, t), el(t), t.child.flags & 8192 && t.memoizedState !== null != (e !== null && e.memoizedState !== null) && (Un = nl()), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, Rn(t, a)));
        break;
      case 22:
        u = t.memoizedState !== null;
        var d = e !== null && e.memoizedState !== null, b = $l, M = Bt;
        if ($l = b || u, Bt = M || d, ll(l, t), Bt = M, $l = b, el(t), a & 8192)
          t: for (l = t.stateNode, l._visibility = u ? l._visibility & -2 : l._visibility | 1, u && (e === null || d || $l || Bt || Je(t)), e = null, l = t; ; ) {
            if (l.tag === 5 || l.tag === 26) {
              if (e === null) {
                d = e = l;
                try {
                  if (n = d.stateNode, u)
                    i = n.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none";
                  else {
                    c = d.stateNode;
                    var U = d.memoizedProps.style, E = U != null && U.hasOwnProperty("display") ? U.display : null;
                    c.style.display = E == null || typeof E == "boolean" ? "" : ("" + E).trim();
                  }
                } catch (L) {
                  mt(d, d.return, L);
                }
              }
            } else if (l.tag === 6) {
              if (e === null) {
                d = l;
                try {
                  d.stateNode.nodeValue = u ? "" : d.memoizedProps;
                } catch (L) {
                  mt(d, d.return, L);
                }
              }
            } else if (l.tag === 18) {
              if (e === null) {
                d = l;
                try {
                  var A = d.stateNode;
                  u ? pd(A, !0) : pd(d.stateNode, !1);
                } catch (L) {
                  mt(d, d.return, L);
                }
              }
            } else if ((l.tag !== 22 && l.tag !== 23 || l.memoizedState === null || l === t) && l.child !== null) {
              l.child.return = l, l = l.child;
              continue;
            }
            if (l === t) break t;
            for (; l.sibling === null; ) {
              if (l.return === null || l.return === t) break t;
              e === l && (e = null), l = l.return;
            }
            e === l && (e = null), l.sibling.return = l.return, l = l.sibling;
          }
        a & 4 && (a = t.updateQueue, a !== null && (e = a.retryQueue, e !== null && (a.retryQueue = null, Rn(t, e))));
        break;
      case 19:
        ll(l, t), el(t), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, Rn(t, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        ll(l, t), el(t);
    }
  }
  function el(t) {
    var l = t.flags;
    if (l & 2) {
      try {
        for (var e, a = t.return; a !== null; ) {
          if (bs(a)) {
            e = a;
            break;
          }
          a = a.return;
        }
        if (e == null) throw Error(r(160));
        switch (e.tag) {
          case 27:
            var u = e.stateNode, n = Xf(t);
            On(t, n, u);
            break;
          case 5:
            var i = e.stateNode;
            e.flags & 32 && (ea(i, ""), e.flags &= -33);
            var c = Xf(t);
            On(t, c, i);
            break;
          case 3:
          case 4:
            var d = e.stateNode.containerInfo, b = Xf(t);
            Qf(
              t,
              b,
              d
            );
            break;
          default:
            throw Error(r(161));
        }
      } catch (M) {
        mt(t, t.return, M);
      }
      t.flags &= -3;
    }
    l & 4096 && (t.flags &= -4097);
  }
  function Ds(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var l = t;
        Ds(l), l.tag === 5 && l.flags & 1024 && l.stateNode.reset(), t = t.sibling;
      }
  }
  function kl(t, l) {
    if (l.subtreeFlags & 8772)
      for (l = l.child; l !== null; )
        Ts(t, l.alternate, l), l = l.sibling;
  }
  function Je(t) {
    for (t = t.child; t !== null; ) {
      var l = t;
      switch (l.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ye(4, l, l.return), Je(l);
          break;
        case 1:
          Nl(l, l.return);
          var e = l.stateNode;
          typeof e.componentWillUnmount == "function" && ps(
            l,
            l.return,
            e
          ), Je(l);
          break;
        case 27:
          zu(l.stateNode);
        case 26:
        case 5:
          Nl(l, l.return), Je(l);
          break;
        case 22:
          l.memoizedState === null && Je(l);
          break;
        case 30:
          Je(l);
          break;
        default:
          Je(l);
      }
      t = t.sibling;
    }
  }
  function Fl(t, l, e) {
    for (e = e && (l.subtreeFlags & 8772) !== 0, l = l.child; l !== null; ) {
      var a = l.alternate, u = t, n = l, i = n.flags;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          Fl(
            u,
            n,
            e
          ), du(4, n);
          break;
        case 1:
          if (Fl(
            u,
            n,
            e
          ), a = n, u = a.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (b) {
              mt(a, a.return, b);
            }
          if (a = n, u = a.updateQueue, u !== null) {
            var c = a.stateNode;
            try {
              var d = u.shared.hiddenCallbacks;
              if (d !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < d.length; u++)
                  no(d[u], c);
            } catch (b) {
              mt(a, a.return, b);
            }
          }
          e && i & 64 && gs(n), mu(n, n.return);
          break;
        case 27:
          Es(n);
        case 26:
        case 5:
          Fl(
            u,
            n,
            e
          ), e && a === null && i & 4 && Ss(n), mu(n, n.return);
          break;
        case 12:
          Fl(
            u,
            n,
            e
          );
          break;
        case 31:
          Fl(
            u,
            n,
            e
          ), e && i & 4 && Ms(u, n);
          break;
        case 13:
          Fl(
            u,
            n,
            e
          ), e && i & 4 && Os(u, n);
          break;
        case 22:
          n.memoizedState === null && Fl(
            u,
            n,
            e
          ), mu(n, n.return);
          break;
        case 30:
          break;
        default:
          Fl(
            u,
            n,
            e
          );
      }
      l = l.sibling;
    }
  }
  function Vf(t, l) {
    var e = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), t = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (t = l.memoizedState.cachePool.pool), t !== e && (t != null && t.refCount++, e != null && Pa(e));
  }
  function Kf(t, l) {
    t = null, l.alternate !== null && (t = l.alternate.memoizedState.cache), l = l.memoizedState.cache, l !== t && (l.refCount++, t != null && Pa(t));
  }
  function Dl(t, l, e, a) {
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; )
        Us(
          t,
          l,
          e,
          a
        ), l = l.sibling;
  }
  function Us(t, l, e, a) {
    var u = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Dl(
          t,
          l,
          e,
          a
        ), u & 2048 && du(9, l);
        break;
      case 1:
        Dl(
          t,
          l,
          e,
          a
        );
        break;
      case 3:
        Dl(
          t,
          l,
          e,
          a
        ), u & 2048 && (t = null, l.alternate !== null && (t = l.alternate.memoizedState.cache), l = l.memoizedState.cache, l !== t && (l.refCount++, t != null && Pa(t)));
        break;
      case 12:
        if (u & 2048) {
          Dl(
            t,
            l,
            e,
            a
          ), t = l.stateNode;
          try {
            var n = l.memoizedProps, i = n.id, c = n.onPostCommit;
            typeof c == "function" && c(
              i,
              l.alternate === null ? "mount" : "update",
              t.passiveEffectDuration,
              -0
            );
          } catch (d) {
            mt(l, l.return, d);
          }
        } else
          Dl(
            t,
            l,
            e,
            a
          );
        break;
      case 31:
        Dl(
          t,
          l,
          e,
          a
        );
        break;
      case 13:
        Dl(
          t,
          l,
          e,
          a
        );
        break;
      case 23:
        break;
      case 22:
        n = l.stateNode, i = l.alternate, l.memoizedState !== null ? n._visibility & 2 ? Dl(
          t,
          l,
          e,
          a
        ) : hu(t, l) : n._visibility & 2 ? Dl(
          t,
          l,
          e,
          a
        ) : (n._visibility |= 2, za(
          t,
          l,
          e,
          a,
          (l.subtreeFlags & 10256) !== 0 || !1
        )), u & 2048 && Vf(i, l);
        break;
      case 24:
        Dl(
          t,
          l,
          e,
          a
        ), u & 2048 && Kf(l.alternate, l);
        break;
      default:
        Dl(
          t,
          l,
          e,
          a
        );
    }
  }
  function za(t, l, e, a, u) {
    for (u = u && ((l.subtreeFlags & 10256) !== 0 || !1), l = l.child; l !== null; ) {
      var n = t, i = l, c = e, d = a, b = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          za(
            n,
            i,
            c,
            d,
            u
          ), du(8, i);
          break;
        case 23:
          break;
        case 22:
          var M = i.stateNode;
          i.memoizedState !== null ? M._visibility & 2 ? za(
            n,
            i,
            c,
            d,
            u
          ) : hu(
            n,
            i
          ) : (M._visibility |= 2, za(
            n,
            i,
            c,
            d,
            u
          )), u && b & 2048 && Vf(
            i.alternate,
            i
          );
          break;
        case 24:
          za(
            n,
            i,
            c,
            d,
            u
          ), u && b & 2048 && Kf(i.alternate, i);
          break;
        default:
          za(
            n,
            i,
            c,
            d,
            u
          );
      }
      l = l.sibling;
    }
  }
  function hu(t, l) {
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; ) {
        var e = t, a = l, u = a.flags;
        switch (a.tag) {
          case 22:
            hu(e, a), u & 2048 && Vf(
              a.alternate,
              a
            );
            break;
          case 24:
            hu(e, a), u & 2048 && Kf(a.alternate, a);
            break;
          default:
            hu(e, a);
        }
        l = l.sibling;
      }
  }
  var yu = 8192;
  function Ta(t, l, e) {
    if (t.subtreeFlags & yu)
      for (t = t.child; t !== null; )
        Cs(
          t,
          l,
          e
        ), t = t.sibling;
  }
  function Cs(t, l, e) {
    switch (t.tag) {
      case 26:
        Ta(
          t,
          l,
          e
        ), t.flags & yu && t.memoizedState !== null && Ny(
          e,
          Rl,
          t.memoizedState,
          t.memoizedProps
        );
        break;
      case 5:
        Ta(
          t,
          l,
          e
        );
        break;
      case 3:
      case 4:
        var a = Rl;
        Rl = Qn(t.stateNode.containerInfo), Ta(
          t,
          l,
          e
        ), Rl = a;
        break;
      case 22:
        t.memoizedState === null && (a = t.alternate, a !== null && a.memoizedState !== null ? (a = yu, yu = 16777216, Ta(
          t,
          l,
          e
        ), yu = a) : Ta(
          t,
          l,
          e
        ));
        break;
      default:
        Ta(
          t,
          l,
          e
        );
    }
  }
  function xs(t) {
    var l = t.alternate;
    if (l !== null && (t = l.child, t !== null)) {
      l.child = null;
      do
        l = t.sibling, t.sibling = null, t = l;
      while (t !== null);
    }
  }
  function vu(t) {
    var l = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (l !== null)
        for (var e = 0; e < l.length; e++) {
          var a = l[e];
          Lt = a, Hs(
            a,
            t
          );
        }
      xs(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        Ns(t), t = t.sibling;
  }
  function Ns(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        vu(t), t.flags & 2048 && ye(9, t, t.return);
        break;
      case 3:
        vu(t);
        break;
      case 12:
        vu(t);
        break;
      case 22:
        var l = t.stateNode;
        t.memoizedState !== null && l._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (l._visibility &= -3, Dn(t)) : vu(t);
        break;
      default:
        vu(t);
    }
  }
  function Dn(t) {
    var l = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (l !== null)
        for (var e = 0; e < l.length; e++) {
          var a = l[e];
          Lt = a, Hs(
            a,
            t
          );
        }
      xs(t);
    }
    for (t = t.child; t !== null; ) {
      switch (l = t, l.tag) {
        case 0:
        case 11:
        case 15:
          ye(8, l, l.return), Dn(l);
          break;
        case 22:
          e = l.stateNode, e._visibility & 2 && (e._visibility &= -3, Dn(l));
          break;
        default:
          Dn(l);
      }
      t = t.sibling;
    }
  }
  function Hs(t, l) {
    for (; Lt !== null; ) {
      var e = Lt;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          ye(8, e, l);
          break;
        case 23:
        case 22:
          if (e.memoizedState !== null && e.memoizedState.cachePool !== null) {
            var a = e.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          Pa(e.memoizedState.cache);
      }
      if (a = e.child, a !== null) a.return = e, Lt = a;
      else
        t: for (e = t; Lt !== null; ) {
          a = Lt;
          var u = a.sibling, n = a.return;
          if (As(a), a === e) {
            Lt = null;
            break t;
          }
          if (u !== null) {
            u.return = n, Lt = u;
            break t;
          }
          Lt = n;
        }
    }
  }
  var $h = {
    getCacheForType: function(t) {
      var l = Vt(xt), e = l.data.get(t);
      return e === void 0 && (e = t(), l.data.set(t, e)), e;
    },
    cacheSignal: function() {
      return Vt(xt).controller.signal;
    }
  }, Wh = typeof WeakMap == "function" ? WeakMap : Map, ot = 0, St = null, et = null, ut = 0, dt = 0, dl = null, ve = !1, Aa = !1, Jf = !1, Il = 0, _t = 0, ge = 0, we = 0, wf = 0, ml = 0, _a = 0, gu = null, al = null, $f = !1, Un = 0, Bs = 0, Cn = 1 / 0, xn = null, pe = null, jt = 0, Se = null, Ma = null, Pl = 0, Wf = 0, kf = null, js = null, pu = 0, Ff = null;
  function hl() {
    return (ot & 2) !== 0 && ut !== 0 ? ut & -ut : O.T !== null ? ac() : Fc();
  }
  function qs() {
    if (ml === 0)
      if ((ut & 536870912) === 0 || it) {
        var t = Lu;
        Lu <<= 1, (Lu & 3932160) === 0 && (Lu = 262144), ml = t;
      } else ml = 536870912;
    return t = ol.current, t !== null && (t.flags |= 32), ml;
  }
  function ul(t, l, e) {
    (t === St && (dt === 2 || dt === 9) || t.cancelPendingCommit !== null) && (Oa(t, 0), be(
      t,
      ut,
      ml,
      !1
    )), La(t, e), ((ot & 2) === 0 || t !== St) && (t === St && ((ot & 2) === 0 && (we |= e), _t === 4 && be(
      t,
      ut,
      ml,
      !1
    )), Hl(t));
  }
  function Ys(t, l, e) {
    if ((ot & 6) !== 0) throw Error(r(327));
    var a = !e && (l & 127) === 0 && (l & t.expiredLanes) === 0 || Ya(t, l), u = a ? Ih(t, l) : Pf(t, l, !0), n = a;
    do {
      if (u === 0) {
        Aa && !a && be(t, l, 0, !1);
        break;
      } else {
        if (e = t.current.alternate, n && !kh(e)) {
          u = Pf(t, l, !1), n = !1;
          continue;
        }
        if (u === 2) {
          if (n = l, t.errorRecoveryDisabledLanes & n)
            var i = 0;
          else
            i = t.pendingLanes & -536870913, i = i !== 0 ? i : i & 536870912 ? 536870912 : 0;
          if (i !== 0) {
            l = i;
            t: {
              var c = t;
              u = gu;
              var d = c.current.memoizedState.isDehydrated;
              if (d && (Oa(c, i).flags |= 256), i = Pf(
                c,
                i,
                !1
              ), i !== 2) {
                if (Jf && !d) {
                  c.errorRecoveryDisabledLanes |= n, we |= n, u = 4;
                  break t;
                }
                n = al, al = u, n !== null && (al === null ? al = n : al.push.apply(
                  al,
                  n
                ));
              }
              u = i;
            }
            if (n = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          Oa(t, 0), be(t, l, 0, !0);
          break;
        }
        t: {
          switch (a = t, n = u, n) {
            case 0:
            case 1:
              throw Error(r(345));
            case 4:
              if ((l & 4194048) !== l) break;
            case 6:
              be(
                a,
                l,
                ml,
                !ve
              );
              break t;
            case 2:
              al = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(r(329));
          }
          if ((l & 62914560) === l && (u = Un + 300 - nl(), 10 < u)) {
            if (be(
              a,
              l,
              ml,
              !ve
            ), Xu(a, 0, !0) !== 0) break t;
            Pl = l, a.timeoutHandle = yd(
              Ls.bind(
                null,
                a,
                e,
                al,
                xn,
                $f,
                l,
                ml,
                we,
                _a,
                ve,
                n,
                "Throttled",
                -0,
                0
              ),
              u
            );
            break t;
          }
          Ls(
            a,
            e,
            al,
            xn,
            $f,
            l,
            ml,
            we,
            _a,
            ve,
            n,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Hl(t);
  }
  function Ls(t, l, e, a, u, n, i, c, d, b, M, U, E, A) {
    if (t.timeoutHandle = -1, U = l.subtreeFlags, U & 8192 || (U & 16785408) === 16785408) {
      U = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Yl
      }, Cs(
        l,
        n,
        U
      );
      var L = (n & 62914560) === n ? Un - nl() : (n & 4194048) === n ? Bs - nl() : 0;
      if (L = Hy(
        U,
        L
      ), L !== null) {
        Pl = n, t.cancelPendingCommit = L(
          ws.bind(
            null,
            t,
            l,
            n,
            e,
            a,
            u,
            i,
            c,
            d,
            M,
            U,
            null,
            E,
            A
          )
        ), be(t, n, i, !b);
        return;
      }
    }
    ws(
      t,
      l,
      n,
      e,
      a,
      u,
      i,
      c,
      d
    );
  }
  function kh(t) {
    for (var l = t; ; ) {
      var e = l.tag;
      if ((e === 0 || e === 11 || e === 15) && l.flags & 16384 && (e = l.updateQueue, e !== null && (e = e.stores, e !== null)))
        for (var a = 0; a < e.length; a++) {
          var u = e[a], n = u.getSnapshot;
          u = u.value;
          try {
            if (!cl(n(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (e = l.child, l.subtreeFlags & 16384 && e !== null)
        e.return = l, l = e;
      else {
        if (l === t) break;
        for (; l.sibling === null; ) {
          if (l.return === null || l.return === t) return !0;
          l = l.return;
        }
        l.sibling.return = l.return, l = l.sibling;
      }
    }
    return !0;
  }
  function be(t, l, e, a) {
    l &= ~wf, l &= ~we, t.suspendedLanes |= l, t.pingedLanes &= ~l, a && (t.warmLanes |= l), a = t.expirationTimes;
    for (var u = l; 0 < u; ) {
      var n = 31 - fl(u), i = 1 << n;
      a[n] = -1, u &= ~i;
    }
    e !== 0 && $c(t, e, l);
  }
  function Nn() {
    return (ot & 6) === 0 ? (Su(0), !1) : !0;
  }
  function If() {
    if (et !== null) {
      if (dt === 0)
        var t = et.return;
      else
        t = et, Ql = Ye = null, hf(t), ga = null, lu = 0, t = et;
      for (; t !== null; )
        vs(t.alternate, t), t = t.return;
      et = null;
    }
  }
  function Oa(t, l) {
    var e = t.timeoutHandle;
    e !== -1 && (t.timeoutHandle = -1, vy(e)), e = t.cancelPendingCommit, e !== null && (t.cancelPendingCommit = null, e()), Pl = 0, If(), St = t, et = e = Gl(t.current, null), ut = l, dt = 0, dl = null, ve = !1, Aa = Ya(t, l), Jf = !1, _a = ml = wf = we = ge = _t = 0, al = gu = null, $f = !1, (l & 8) !== 0 && (l |= l & 32);
    var a = t.entangledLanes;
    if (a !== 0)
      for (t = t.entanglements, a &= l; 0 < a; ) {
        var u = 31 - fl(a), n = 1 << u;
        l |= t[u], a &= ~n;
      }
    return Il = l, Pu(), e;
  }
  function Gs(t, l) {
    P = null, O.H = ru, l === va || l === cn ? (l = lo(), dt = 3) : l === lf ? (l = lo(), dt = 4) : dt = l === Uf ? 8 : l !== null && typeof l == "object" && typeof l.then == "function" ? 6 : 1, dl = l, et === null && (_t = 1, zn(
      t,
      pl(l, t.current)
    ));
  }
  function Xs() {
    var t = ol.current;
    return t === null ? !0 : (ut & 4194048) === ut ? zl === null : (ut & 62914560) === ut || (ut & 536870912) !== 0 ? t === zl : !1;
  }
  function Qs() {
    var t = O.H;
    return O.H = ru, t === null ? ru : t;
  }
  function Zs() {
    var t = O.A;
    return O.A = $h, t;
  }
  function Hn() {
    _t = 4, ve || (ut & 4194048) !== ut && ol.current !== null || (Aa = !0), (ge & 134217727) === 0 && (we & 134217727) === 0 || St === null || be(
      St,
      ut,
      ml,
      !1
    );
  }
  function Pf(t, l, e) {
    var a = ot;
    ot |= 2;
    var u = Qs(), n = Zs();
    (St !== t || ut !== l) && (xn = null, Oa(t, l)), l = !1;
    var i = _t;
    t: do
      try {
        if (dt !== 0 && et !== null) {
          var c = et, d = dl;
          switch (dt) {
            case 8:
              If(), i = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              ol.current === null && (l = !0);
              var b = dt;
              if (dt = 0, dl = null, Ra(t, c, d, b), e && Aa) {
                i = 0;
                break t;
              }
              break;
            default:
              b = dt, dt = 0, dl = null, Ra(t, c, d, b);
          }
        }
        Fh(), i = _t;
        break;
      } catch (M) {
        Gs(t, M);
      }
    while (!0);
    return l && t.shellSuspendCounter++, Ql = Ye = null, ot = a, O.H = u, O.A = n, et === null && (St = null, ut = 0, Pu()), i;
  }
  function Fh() {
    for (; et !== null; ) Vs(et);
  }
  function Ih(t, l) {
    var e = ot;
    ot |= 2;
    var a = Qs(), u = Zs();
    St !== t || ut !== l ? (xn = null, Cn = nl() + 500, Oa(t, l)) : Aa = Ya(
      t,
      l
    );
    t: do
      try {
        if (dt !== 0 && et !== null) {
          l = et;
          var n = dl;
          l: switch (dt) {
            case 1:
              dt = 0, dl = null, Ra(t, l, n, 1);
              break;
            case 2:
            case 9:
              if (Pr(n)) {
                dt = 0, dl = null, Ks(l);
                break;
              }
              l = function() {
                dt !== 2 && dt !== 9 || St !== t || (dt = 7), Hl(t);
              }, n.then(l, l);
              break t;
            case 3:
              dt = 7;
              break t;
            case 4:
              dt = 5;
              break t;
            case 7:
              Pr(n) ? (dt = 0, dl = null, Ks(l)) : (dt = 0, dl = null, Ra(t, l, n, 7));
              break;
            case 5:
              var i = null;
              switch (et.tag) {
                case 26:
                  i = et.memoizedState;
                case 5:
                case 27:
                  var c = et;
                  if (i ? Ud(i) : c.stateNode.complete) {
                    dt = 0, dl = null;
                    var d = c.sibling;
                    if (d !== null) et = d;
                    else {
                      var b = c.return;
                      b !== null ? (et = b, Bn(b)) : et = null;
                    }
                    break l;
                  }
              }
              dt = 0, dl = null, Ra(t, l, n, 5);
              break;
            case 6:
              dt = 0, dl = null, Ra(t, l, n, 6);
              break;
            case 8:
              If(), _t = 6;
              break t;
            default:
              throw Error(r(462));
          }
        }
        Ph();
        break;
      } catch (M) {
        Gs(t, M);
      }
    while (!0);
    return Ql = Ye = null, O.H = a, O.A = u, ot = e, et !== null ? 0 : (St = null, ut = 0, Pu(), _t);
  }
  function Ph() {
    for (; et !== null && !zm(); )
      Vs(et);
  }
  function Vs(t) {
    var l = hs(t.alternate, t, Il);
    t.memoizedProps = t.pendingProps, l === null ? Bn(t) : et = l;
  }
  function Ks(t) {
    var l = t, e = l.alternate;
    switch (l.tag) {
      case 15:
      case 0:
        l = cs(
          e,
          l,
          l.pendingProps,
          l.type,
          void 0,
          ut
        );
        break;
      case 11:
        l = cs(
          e,
          l,
          l.pendingProps,
          l.type.render,
          l.ref,
          ut
        );
        break;
      case 5:
        hf(l);
      default:
        vs(e, l), l = et = Qr(l, Il), l = hs(e, l, Il);
    }
    t.memoizedProps = t.pendingProps, l === null ? Bn(t) : et = l;
  }
  function Ra(t, l, e, a) {
    Ql = Ye = null, hf(l), ga = null, lu = 0;
    var u = l.return;
    try {
      if (Xh(
        t,
        u,
        l,
        e,
        ut
      )) {
        _t = 1, zn(
          t,
          pl(e, t.current)
        ), et = null;
        return;
      }
    } catch (n) {
      if (u !== null) throw et = u, n;
      _t = 1, zn(
        t,
        pl(e, t.current)
      ), et = null;
      return;
    }
    l.flags & 32768 ? (it || a === 1 ? t = !0 : Aa || (ut & 536870912) !== 0 ? t = !1 : (ve = t = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = ol.current, a !== null && a.tag === 13 && (a.flags |= 16384))), Js(l, t)) : Bn(l);
  }
  function Bn(t) {
    var l = t;
    do {
      if ((l.flags & 32768) !== 0) {
        Js(
          l,
          ve
        );
        return;
      }
      t = l.return;
      var e = Vh(
        l.alternate,
        l,
        Il
      );
      if (e !== null) {
        et = e;
        return;
      }
      if (l = l.sibling, l !== null) {
        et = l;
        return;
      }
      et = l = t;
    } while (l !== null);
    _t === 0 && (_t = 5);
  }
  function Js(t, l) {
    do {
      var e = Kh(t.alternate, t);
      if (e !== null) {
        e.flags &= 32767, et = e;
        return;
      }
      if (e = t.return, e !== null && (e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null), !l && (t = t.sibling, t !== null)) {
        et = t;
        return;
      }
      et = t = e;
    } while (t !== null);
    _t = 6, et = null;
  }
  function ws(t, l, e, a, u, n, i, c, d) {
    t.cancelPendingCommit = null;
    do
      jn();
    while (jt !== 0);
    if ((ot & 6) !== 0) throw Error(r(327));
    if (l !== null) {
      if (l === t.current) throw Error(r(177));
      if (n = l.lanes | l.childLanes, n |= Gi, xm(
        t,
        e,
        n,
        i,
        c,
        d
      ), t === St && (et = St = null, ut = 0), Ma = l, Se = t, Pl = e, Wf = n, kf = u, js = a, (l.subtreeFlags & 10256) !== 0 || (l.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, ay(qu, function() {
        return Is(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), a = (l.flags & 13878) !== 0, (l.subtreeFlags & 13878) !== 0 || a) {
        a = O.T, O.T = null, u = j.p, j.p = 2, i = ot, ot |= 4;
        try {
          Jh(t, l, e);
        } finally {
          ot = i, j.p = u, O.T = a;
        }
      }
      jt = 1, $s(), Ws(), ks();
    }
  }
  function $s() {
    if (jt === 1) {
      jt = 0;
      var t = Se, l = Ma, e = (l.flags & 13878) !== 0;
      if ((l.subtreeFlags & 13878) !== 0 || e) {
        e = O.T, O.T = null;
        var a = j.p;
        j.p = 2;
        var u = ot;
        ot |= 4;
        try {
          Rs(l, t);
          var n = sc, i = Nr(t.containerInfo), c = n.focusedElem, d = n.selectionRange;
          if (i !== c && c && c.ownerDocument && xr(
            c.ownerDocument.documentElement,
            c
          )) {
            if (d !== null && Bi(c)) {
              var b = d.start, M = d.end;
              if (M === void 0 && (M = b), "selectionStart" in c)
                c.selectionStart = b, c.selectionEnd = Math.min(
                  M,
                  c.value.length
                );
              else {
                var U = c.ownerDocument || document, E = U && U.defaultView || window;
                if (E.getSelection) {
                  var A = E.getSelection(), L = c.textContent.length, K = Math.min(d.start, L), gt = d.end === void 0 ? K : Math.min(d.end, L);
                  !A.extend && K > gt && (i = gt, gt = K, K = i);
                  var v = Cr(
                    c,
                    K
                  ), m = Cr(
                    c,
                    gt
                  );
                  if (v && m && (A.rangeCount !== 1 || A.anchorNode !== v.node || A.anchorOffset !== v.offset || A.focusNode !== m.node || A.focusOffset !== m.offset)) {
                    var S = U.createRange();
                    S.setStart(v.node, v.offset), A.removeAllRanges(), K > gt ? (A.addRange(S), A.extend(m.node, m.offset)) : (S.setEnd(m.node, m.offset), A.addRange(S));
                  }
                }
              }
            }
            for (U = [], A = c; A = A.parentNode; )
              A.nodeType === 1 && U.push({
                element: A,
                left: A.scrollLeft,
                top: A.scrollTop
              });
            for (typeof c.focus == "function" && c.focus(), c = 0; c < U.length; c++) {
              var R = U[c];
              R.element.scrollLeft = R.left, R.element.scrollTop = R.top;
            }
          }
          $n = !!oc, sc = oc = null;
        } finally {
          ot = u, j.p = a, O.T = e;
        }
      }
      t.current = l, jt = 2;
    }
  }
  function Ws() {
    if (jt === 2) {
      jt = 0;
      var t = Se, l = Ma, e = (l.flags & 8772) !== 0;
      if ((l.subtreeFlags & 8772) !== 0 || e) {
        e = O.T, O.T = null;
        var a = j.p;
        j.p = 2;
        var u = ot;
        ot |= 4;
        try {
          Ts(t, l.alternate, l);
        } finally {
          ot = u, j.p = a, O.T = e;
        }
      }
      jt = 3;
    }
  }
  function ks() {
    if (jt === 4 || jt === 3) {
      jt = 0, Tm();
      var t = Se, l = Ma, e = Pl, a = js;
      (l.subtreeFlags & 10256) !== 0 || (l.flags & 10256) !== 0 ? jt = 5 : (jt = 0, Ma = Se = null, Fs(t, t.pendingLanes));
      var u = t.pendingLanes;
      if (u === 0 && (pe = null), vi(e), l = l.stateNode, il && typeof il.onCommitFiberRoot == "function")
        try {
          il.onCommitFiberRoot(
            qa,
            l,
            void 0,
            (l.current.flags & 128) === 128
          );
        } catch {
        }
      if (a !== null) {
        l = O.T, u = j.p, j.p = 2, O.T = null;
        try {
          for (var n = t.onRecoverableError, i = 0; i < a.length; i++) {
            var c = a[i];
            n(c.value, {
              componentStack: c.stack
            });
          }
        } finally {
          O.T = l, j.p = u;
        }
      }
      (Pl & 3) !== 0 && jn(), Hl(t), u = t.pendingLanes, (e & 261930) !== 0 && (u & 42) !== 0 ? t === Ff ? pu++ : (pu = 0, Ff = t) : pu = 0, Su(0);
    }
  }
  function Fs(t, l) {
    (t.pooledCacheLanes &= l) === 0 && (l = t.pooledCache, l != null && (t.pooledCache = null, Pa(l)));
  }
  function jn() {
    return $s(), Ws(), ks(), Is();
  }
  function Is() {
    if (jt !== 5) return !1;
    var t = Se, l = Wf;
    Wf = 0;
    var e = vi(Pl), a = O.T, u = j.p;
    try {
      j.p = 32 > e ? 32 : e, O.T = null, e = kf, kf = null;
      var n = Se, i = Pl;
      if (jt = 0, Ma = Se = null, Pl = 0, (ot & 6) !== 0) throw Error(r(331));
      var c = ot;
      if (ot |= 4, Ns(n.current), Us(
        n,
        n.current,
        i,
        e
      ), ot = c, Su(0, !1), il && typeof il.onPostCommitFiberRoot == "function")
        try {
          il.onPostCommitFiberRoot(qa, n);
        } catch {
        }
      return !0;
    } finally {
      j.p = u, O.T = a, Fs(t, l);
    }
  }
  function Ps(t, l, e) {
    l = pl(e, l), l = Df(t.stateNode, l, 2), t = de(t, l, 2), t !== null && (La(t, 2), Hl(t));
  }
  function mt(t, l, e) {
    if (t.tag === 3)
      Ps(t, t, e);
    else
      for (; l !== null; ) {
        if (l.tag === 3) {
          Ps(
            l,
            t,
            e
          );
          break;
        } else if (l.tag === 1) {
          var a = l.stateNode;
          if (typeof l.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (pe === null || !pe.has(a))) {
            t = pl(e, t), e = ts(2), a = de(l, e, 2), a !== null && (ls(
              e,
              a,
              l,
              t
            ), La(a, 2), Hl(a));
            break;
          }
        }
        l = l.return;
      }
  }
  function tc(t, l, e) {
    var a = t.pingCache;
    if (a === null) {
      a = t.pingCache = new Wh();
      var u = /* @__PURE__ */ new Set();
      a.set(l, u);
    } else
      u = a.get(l), u === void 0 && (u = /* @__PURE__ */ new Set(), a.set(l, u));
    u.has(e) || (Jf = !0, u.add(e), t = ty.bind(null, t, l, e), l.then(t, t));
  }
  function ty(t, l, e) {
    var a = t.pingCache;
    a !== null && a.delete(l), t.pingedLanes |= t.suspendedLanes & e, t.warmLanes &= ~e, St === t && (ut & e) === e && (_t === 4 || _t === 3 && (ut & 62914560) === ut && 300 > nl() - Un ? (ot & 2) === 0 && Oa(t, 0) : wf |= e, _a === ut && (_a = 0)), Hl(t);
  }
  function td(t, l) {
    l === 0 && (l = wc()), t = Be(t, l), t !== null && (La(t, l), Hl(t));
  }
  function ly(t) {
    var l = t.memoizedState, e = 0;
    l !== null && (e = l.retryLane), td(t, e);
  }
  function ey(t, l) {
    var e = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var a = t.stateNode, u = t.memoizedState;
        u !== null && (e = u.retryLane);
        break;
      case 19:
        a = t.stateNode;
        break;
      case 22:
        a = t.stateNode._retryCache;
        break;
      default:
        throw Error(r(314));
    }
    a !== null && a.delete(l), td(t, e);
  }
  function ay(t, l) {
    return di(t, l);
  }
  var qn = null, Da = null, lc = !1, Yn = !1, ec = !1, Ee = 0;
  function Hl(t) {
    t !== Da && t.next === null && (Da === null ? qn = Da = t : Da = Da.next = t), Yn = !0, lc || (lc = !0, ny());
  }
  function Su(t, l) {
    if (!ec && Yn) {
      ec = !0;
      do
        for (var e = !1, a = qn; a !== null; ) {
          if (t !== 0) {
            var u = a.pendingLanes;
            if (u === 0) var n = 0;
            else {
              var i = a.suspendedLanes, c = a.pingedLanes;
              n = (1 << 31 - fl(42 | t) + 1) - 1, n &= u & ~(i & ~c), n = n & 201326741 ? n & 201326741 | 1 : n ? n | 2 : 0;
            }
            n !== 0 && (e = !0, ud(a, n));
          } else
            n = ut, n = Xu(
              a,
              a === St ? n : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (n & 3) === 0 || Ya(a, n) || (e = !0, ud(a, n));
          a = a.next;
        }
      while (e);
      ec = !1;
    }
  }
  function uy() {
    ld();
  }
  function ld() {
    Yn = lc = !1;
    var t = 0;
    Ee !== 0 && yy() && (t = Ee);
    for (var l = nl(), e = null, a = qn; a !== null; ) {
      var u = a.next, n = ed(a, l);
      n === 0 ? (a.next = null, e === null ? qn = u : e.next = u, u === null && (Da = e)) : (e = a, (t !== 0 || (n & 3) !== 0) && (Yn = !0)), a = u;
    }
    jt !== 0 && jt !== 5 || Su(t), Ee !== 0 && (Ee = 0);
  }
  function ed(t, l) {
    for (var e = t.suspendedLanes, a = t.pingedLanes, u = t.expirationTimes, n = t.pendingLanes & -62914561; 0 < n; ) {
      var i = 31 - fl(n), c = 1 << i, d = u[i];
      d === -1 ? ((c & e) === 0 || (c & a) !== 0) && (u[i] = Cm(c, l)) : d <= l && (t.expiredLanes |= c), n &= ~c;
    }
    if (l = St, e = ut, e = Xu(
      t,
      t === l ? e : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a = t.callbackNode, e === 0 || t === l && (dt === 2 || dt === 9) || t.cancelPendingCommit !== null)
      return a !== null && a !== null && mi(a), t.callbackNode = null, t.callbackPriority = 0;
    if ((e & 3) === 0 || Ya(t, e)) {
      if (l = e & -e, l === t.callbackPriority) return l;
      switch (a !== null && mi(a), vi(e)) {
        case 2:
        case 8:
          e = Kc;
          break;
        case 32:
          e = qu;
          break;
        case 268435456:
          e = Jc;
          break;
        default:
          e = qu;
      }
      return a = ad.bind(null, t), e = di(e, a), t.callbackPriority = l, t.callbackNode = e, l;
    }
    return a !== null && a !== null && mi(a), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function ad(t, l) {
    if (jt !== 0 && jt !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var e = t.callbackNode;
    if (jn() && t.callbackNode !== e)
      return null;
    var a = ut;
    return a = Xu(
      t,
      t === St ? a : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a === 0 ? null : (Ys(t, a, l), ed(t, nl()), t.callbackNode != null && t.callbackNode === e ? ad.bind(null, t) : null);
  }
  function ud(t, l) {
    if (jn()) return null;
    Ys(t, l, !0);
  }
  function ny() {
    gy(function() {
      (ot & 6) !== 0 ? di(
        Vc,
        uy
      ) : ld();
    });
  }
  function ac() {
    if (Ee === 0) {
      var t = ha;
      t === 0 && (t = Yu, Yu <<= 1, (Yu & 261888) === 0 && (Yu = 256)), Ee = t;
    }
    return Ee;
  }
  function nd(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : Ku("" + t);
  }
  function id(t, l) {
    var e = l.ownerDocument.createElement("input");
    return e.name = l.name, e.value = l.value, t.id && e.setAttribute("form", t.id), l.parentNode.insertBefore(e, l), t = new FormData(t), e.parentNode.removeChild(e), t;
  }
  function iy(t, l, e, a, u) {
    if (l === "submit" && e && e.stateNode === u) {
      var n = nd(
        (u[It] || null).action
      ), i = a.submitter;
      i && (l = (l = i[It] || null) ? nd(l.formAction) : i.getAttribute("formAction"), l !== null && (n = l, i = null));
      var c = new Wu(
        "action",
        "action",
        null,
        a,
        u
      );
      t.push({
        event: c,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (a.defaultPrevented) {
                if (Ee !== 0) {
                  var d = i ? id(u, i) : new FormData(u);
                  Tf(
                    e,
                    {
                      pending: !0,
                      data: d,
                      method: u.method,
                      action: n
                    },
                    null,
                    d
                  );
                }
              } else
                typeof n == "function" && (c.preventDefault(), d = i ? id(u, i) : new FormData(u), Tf(
                  e,
                  {
                    pending: !0,
                    data: d,
                    method: u.method,
                    action: n
                  },
                  n,
                  d
                ));
            },
            currentTarget: u
          }
        ]
      });
    }
  }
  for (var uc = 0; uc < Li.length; uc++) {
    var nc = Li[uc], fy = nc.toLowerCase(), cy = nc[0].toUpperCase() + nc.slice(1);
    Ol(
      fy,
      "on" + cy
    );
  }
  Ol(jr, "onAnimationEnd"), Ol(qr, "onAnimationIteration"), Ol(Yr, "onAnimationStart"), Ol("dblclick", "onDoubleClick"), Ol("focusin", "onFocus"), Ol("focusout", "onBlur"), Ol(Ah, "onTransitionRun"), Ol(_h, "onTransitionStart"), Ol(Mh, "onTransitionCancel"), Ol(Lr, "onTransitionEnd"), ta("onMouseEnter", ["mouseout", "mouseover"]), ta("onMouseLeave", ["mouseout", "mouseover"]), ta("onPointerEnter", ["pointerout", "pointerover"]), ta("onPointerLeave", ["pointerout", "pointerover"]), Ce(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Ce(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Ce("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Ce(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Ce(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Ce(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var bu = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), ry = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(bu)
  );
  function fd(t, l) {
    l = (l & 4) !== 0;
    for (var e = 0; e < t.length; e++) {
      var a = t[e], u = a.event;
      a = a.listeners;
      t: {
        var n = void 0;
        if (l)
          for (var i = a.length - 1; 0 <= i; i--) {
            var c = a[i], d = c.instance, b = c.currentTarget;
            if (c = c.listener, d !== n && u.isPropagationStopped())
              break t;
            n = c, u.currentTarget = b;
            try {
              n(u);
            } catch (M) {
              Iu(M);
            }
            u.currentTarget = null, n = d;
          }
        else
          for (i = 0; i < a.length; i++) {
            if (c = a[i], d = c.instance, b = c.currentTarget, c = c.listener, d !== n && u.isPropagationStopped())
              break t;
            n = c, u.currentTarget = b;
            try {
              n(u);
            } catch (M) {
              Iu(M);
            }
            u.currentTarget = null, n = d;
          }
      }
    }
  }
  function at(t, l) {
    var e = l[gi];
    e === void 0 && (e = l[gi] = /* @__PURE__ */ new Set());
    var a = t + "__bubble";
    e.has(a) || (cd(l, t, 2, !1), e.add(a));
  }
  function ic(t, l, e) {
    var a = 0;
    l && (a |= 4), cd(
      e,
      t,
      a,
      l
    );
  }
  var Ln = "_reactListening" + Math.random().toString(36).slice(2);
  function fc(t) {
    if (!t[Ln]) {
      t[Ln] = !0, tr.forEach(function(e) {
        e !== "selectionchange" && (ry.has(e) || ic(e, !1, t), ic(e, !0, t));
      });
      var l = t.nodeType === 9 ? t : t.ownerDocument;
      l === null || l[Ln] || (l[Ln] = !0, ic("selectionchange", !1, l));
    }
  }
  function cd(t, l, e, a) {
    switch (qd(l)) {
      case 2:
        var u = qy;
        break;
      case 8:
        u = Yy;
        break;
      default:
        u = zc;
    }
    e = u.bind(
      null,
      l,
      e,
      t
    ), u = void 0, !Mi || l !== "touchstart" && l !== "touchmove" && l !== "wheel" || (u = !0), a ? u !== void 0 ? t.addEventListener(l, e, {
      capture: !0,
      passive: u
    }) : t.addEventListener(l, e, !0) : u !== void 0 ? t.addEventListener(l, e, {
      passive: u
    }) : t.addEventListener(l, e, !1);
  }
  function cc(t, l, e, a, u) {
    var n = a;
    if ((l & 1) === 0 && (l & 2) === 0 && a !== null)
      t: for (; ; ) {
        if (a === null) return;
        var i = a.tag;
        if (i === 3 || i === 4) {
          var c = a.stateNode.containerInfo;
          if (c === u) break;
          if (i === 4)
            for (i = a.return; i !== null; ) {
              var d = i.tag;
              if ((d === 3 || d === 4) && i.stateNode.containerInfo === u)
                return;
              i = i.return;
            }
          for (; c !== null; ) {
            if (i = Fe(c), i === null) return;
            if (d = i.tag, d === 5 || d === 6 || d === 26 || d === 27) {
              a = n = i;
              continue t;
            }
            c = c.parentNode;
          }
        }
        a = a.return;
      }
    dr(function() {
      var b = n, M = Ai(e), U = [];
      t: {
        var E = Gr.get(t);
        if (E !== void 0) {
          var A = Wu, L = t;
          switch (t) {
            case "keypress":
              if (wu(e) === 0) break t;
            case "keydown":
            case "keyup":
              A = eh;
              break;
            case "focusin":
              L = "focus", A = Ui;
              break;
            case "focusout":
              L = "blur", A = Ui;
              break;
            case "beforeblur":
            case "afterblur":
              A = Ui;
              break;
            case "click":
              if (e.button === 2) break t;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              A = yr;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              A = Vm;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              A = nh;
              break;
            case jr:
            case qr:
            case Yr:
              A = wm;
              break;
            case Lr:
              A = fh;
              break;
            case "scroll":
            case "scrollend":
              A = Qm;
              break;
            case "wheel":
              A = rh;
              break;
            case "copy":
            case "cut":
            case "paste":
              A = Wm;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              A = gr;
              break;
            case "toggle":
            case "beforetoggle":
              A = sh;
          }
          var K = (l & 4) !== 0, gt = !K && (t === "scroll" || t === "scrollend"), v = K ? E !== null ? E + "Capture" : null : E;
          K = [];
          for (var m = b, S; m !== null; ) {
            var R = m;
            if (S = R.stateNode, R = R.tag, R !== 5 && R !== 26 && R !== 27 || S === null || v === null || (R = Qa(m, v), R != null && K.push(
              Eu(m, R, S)
            )), gt) break;
            m = m.return;
          }
          0 < K.length && (E = new A(
            E,
            L,
            null,
            e,
            M
          ), U.push({ event: E, listeners: K }));
        }
      }
      if ((l & 7) === 0) {
        t: {
          if (E = t === "mouseover" || t === "pointerover", A = t === "mouseout" || t === "pointerout", E && e !== Ti && (L = e.relatedTarget || e.fromElement) && (Fe(L) || L[ke]))
            break t;
          if ((A || E) && (E = M.window === M ? M : (E = M.ownerDocument) ? E.defaultView || E.parentWindow : window, A ? (L = e.relatedTarget || e.toElement, A = b, L = L ? Fe(L) : null, L !== null && (gt = p(L), K = L.tag, L !== gt || K !== 5 && K !== 27 && K !== 6) && (L = null)) : (A = null, L = b), A !== L)) {
            if (K = yr, R = "onMouseLeave", v = "onMouseEnter", m = "mouse", (t === "pointerout" || t === "pointerover") && (K = gr, R = "onPointerLeave", v = "onPointerEnter", m = "pointer"), gt = A == null ? E : Xa(A), S = L == null ? E : Xa(L), E = new K(
              R,
              m + "leave",
              A,
              e,
              M
            ), E.target = gt, E.relatedTarget = S, R = null, Fe(M) === b && (K = new K(
              v,
              m + "enter",
              L,
              e,
              M
            ), K.target = S, K.relatedTarget = gt, R = K), gt = R, A && L)
              l: {
                for (K = oy, v = A, m = L, S = 0, R = v; R; R = K(R))
                  S++;
                R = 0;
                for (var Z = m; Z; Z = K(Z))
                  R++;
                for (; 0 < S - R; )
                  v = K(v), S--;
                for (; 0 < R - S; )
                  m = K(m), R--;
                for (; S--; ) {
                  if (v === m || m !== null && v === m.alternate) {
                    K = v;
                    break l;
                  }
                  v = K(v), m = K(m);
                }
                K = null;
              }
            else K = null;
            A !== null && rd(
              U,
              E,
              A,
              K,
              !1
            ), L !== null && gt !== null && rd(
              U,
              gt,
              L,
              K,
              !0
            );
          }
        }
        t: {
          if (E = b ? Xa(b) : window, A = E.nodeName && E.nodeName.toLowerCase(), A === "select" || A === "input" && E.type === "file")
            var ft = _r;
          else if (Tr(E))
            if (Mr)
              ft = Eh;
            else {
              ft = Sh;
              var Q = ph;
            }
          else
            A = E.nodeName, !A || A.toLowerCase() !== "input" || E.type !== "checkbox" && E.type !== "radio" ? b && zi(b.elementType) && (ft = _r) : ft = bh;
          if (ft && (ft = ft(t, b))) {
            Ar(
              U,
              ft,
              e,
              M
            );
            break t;
          }
          Q && Q(t, E, b), t === "focusout" && b && E.type === "number" && b.memoizedProps.value != null && Ei(E, "number", E.value);
        }
        switch (Q = b ? Xa(b) : window, t) {
          case "focusin":
            (Tr(Q) || Q.contentEditable === "true") && (ia = Q, ji = b, ka = null);
            break;
          case "focusout":
            ka = ji = ia = null;
            break;
          case "mousedown":
            qi = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            qi = !1, Hr(U, e, M);
            break;
          case "selectionchange":
            if (Th) break;
          case "keydown":
          case "keyup":
            Hr(U, e, M);
        }
        var tt;
        if (xi)
          t: {
            switch (t) {
              case "compositionstart":
                var nt = "onCompositionStart";
                break t;
              case "compositionend":
                nt = "onCompositionEnd";
                break t;
              case "compositionupdate":
                nt = "onCompositionUpdate";
                break t;
            }
            nt = void 0;
          }
        else
          na ? Er(t, e) && (nt = "onCompositionEnd") : t === "keydown" && e.keyCode === 229 && (nt = "onCompositionStart");
        nt && (pr && e.locale !== "ko" && (na || nt !== "onCompositionStart" ? nt === "onCompositionEnd" && na && (tt = mr()) : (ne = M, Oi = "value" in ne ? ne.value : ne.textContent, na = !0)), Q = Gn(b, nt), 0 < Q.length && (nt = new vr(
          nt,
          t,
          null,
          e,
          M
        ), U.push({ event: nt, listeners: Q }), tt ? nt.data = tt : (tt = zr(e), tt !== null && (nt.data = tt)))), (tt = mh ? hh(t, e) : yh(t, e)) && (nt = Gn(b, "onBeforeInput"), 0 < nt.length && (Q = new vr(
          "onBeforeInput",
          "beforeinput",
          null,
          e,
          M
        ), U.push({
          event: Q,
          listeners: nt
        }), Q.data = tt)), iy(
          U,
          t,
          b,
          e,
          M
        );
      }
      fd(U, l);
    });
  }
  function Eu(t, l, e) {
    return {
      instance: t,
      listener: l,
      currentTarget: e
    };
  }
  function Gn(t, l) {
    for (var e = l + "Capture", a = []; t !== null; ) {
      var u = t, n = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || n === null || (u = Qa(t, e), u != null && a.unshift(
        Eu(t, u, n)
      ), u = Qa(t, l), u != null && a.push(
        Eu(t, u, n)
      )), t.tag === 3) return a;
      t = t.return;
    }
    return [];
  }
  function oy(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function rd(t, l, e, a, u) {
    for (var n = l._reactName, i = []; e !== null && e !== a; ) {
      var c = e, d = c.alternate, b = c.stateNode;
      if (c = c.tag, d !== null && d === a) break;
      c !== 5 && c !== 26 && c !== 27 || b === null || (d = b, u ? (b = Qa(e, n), b != null && i.unshift(
        Eu(e, b, d)
      )) : u || (b = Qa(e, n), b != null && i.push(
        Eu(e, b, d)
      ))), e = e.return;
    }
    i.length !== 0 && t.push({ event: l, listeners: i });
  }
  var sy = /\r\n?/g, dy = /\u0000|\uFFFD/g;
  function od(t) {
    return (typeof t == "string" ? t : "" + t).replace(sy, `
`).replace(dy, "");
  }
  function sd(t, l) {
    return l = od(l), od(t) === l;
  }
  function vt(t, l, e, a, u, n) {
    switch (e) {
      case "children":
        typeof a == "string" ? l === "body" || l === "textarea" && a === "" || ea(t, a) : (typeof a == "number" || typeof a == "bigint") && l !== "body" && ea(t, "" + a);
        break;
      case "className":
        Zu(t, "class", a);
        break;
      case "tabIndex":
        Zu(t, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Zu(t, e, a);
        break;
      case "style":
        or(t, a, n);
        break;
      case "data":
        if (l !== "object") {
          Zu(t, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (l !== "a" || e !== "href")) {
          t.removeAttribute(e);
          break;
        }
        if (a == null || typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") {
          t.removeAttribute(e);
          break;
        }
        a = Ku("" + a), t.setAttribute(e, a);
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          t.setAttribute(
            e,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof n == "function" && (e === "formAction" ? (l !== "input" && vt(t, l, "name", u.name, u, null), vt(
            t,
            l,
            "formEncType",
            u.formEncType,
            u,
            null
          ), vt(
            t,
            l,
            "formMethod",
            u.formMethod,
            u,
            null
          ), vt(
            t,
            l,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : (vt(t, l, "encType", u.encType, u, null), vt(t, l, "method", u.method, u, null), vt(t, l, "target", u.target, u, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          t.removeAttribute(e);
          break;
        }
        a = Ku("" + a), t.setAttribute(e, a);
        break;
      case "onClick":
        a != null && (t.onclick = Yl);
        break;
      case "onScroll":
        a != null && at("scroll", t);
        break;
      case "onScrollEnd":
        a != null && at("scrollend", t);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(r(61));
          if (e = a.__html, e != null) {
            if (u.children != null) throw Error(r(60));
            t.innerHTML = e;
          }
        }
        break;
      case "multiple":
        t.multiple = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "muted":
        t.muted = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (a == null || typeof a == "function" || typeof a == "boolean" || typeof a == "symbol") {
          t.removeAttribute("xlink:href");
          break;
        }
        e = Ku("" + a), t.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          e
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        a != null && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(e, "" + a) : t.removeAttribute(e);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        a && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(e, "") : t.removeAttribute(e);
        break;
      case "capture":
      case "download":
        a === !0 ? t.setAttribute(e, "") : a !== !1 && a != null && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(e, a) : t.removeAttribute(e);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null && typeof a != "function" && typeof a != "symbol" && !isNaN(a) && 1 <= a ? t.setAttribute(e, a) : t.removeAttribute(e);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a) ? t.removeAttribute(e) : t.setAttribute(e, a);
        break;
      case "popover":
        at("beforetoggle", t), at("toggle", t), Qu(t, "popover", a);
        break;
      case "xlinkActuate":
        ql(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        ql(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        ql(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        ql(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        ql(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        ql(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        ql(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        ql(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        ql(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          a
        );
        break;
      case "is":
        Qu(t, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N") && (e = Gm.get(e) || e, Qu(t, e, a));
    }
  }
  function rc(t, l, e, a, u, n) {
    switch (e) {
      case "style":
        or(t, a, n);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(r(61));
          if (e = a.__html, e != null) {
            if (u.children != null) throw Error(r(60));
            t.innerHTML = e;
          }
        }
        break;
      case "children":
        typeof a == "string" ? ea(t, a) : (typeof a == "number" || typeof a == "bigint") && ea(t, "" + a);
        break;
      case "onScroll":
        a != null && at("scroll", t);
        break;
      case "onScrollEnd":
        a != null && at("scrollend", t);
        break;
      case "onClick":
        a != null && (t.onclick = Yl);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!lr.hasOwnProperty(e))
          t: {
            if (e[0] === "o" && e[1] === "n" && (u = e.endsWith("Capture"), l = e.slice(2, u ? e.length - 7 : void 0), n = t[It] || null, n = n != null ? n[e] : null, typeof n == "function" && t.removeEventListener(l, n, u), typeof a == "function")) {
              typeof n != "function" && n !== null && (e in t ? t[e] = null : t.hasAttribute(e) && t.removeAttribute(e)), t.addEventListener(l, a, u);
              break t;
            }
            e in t ? t[e] = a : a === !0 ? t.setAttribute(e, "") : Qu(t, e, a);
          }
    }
  }
  function Jt(t, l, e) {
    switch (l) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        at("error", t), at("load", t);
        var a = !1, u = !1, n;
        for (n in e)
          if (e.hasOwnProperty(n)) {
            var i = e[n];
            if (i != null)
              switch (n) {
                case "src":
                  a = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(r(137, l));
                default:
                  vt(t, l, n, i, e, null);
              }
          }
        u && vt(t, l, "srcSet", e.srcSet, e, null), a && vt(t, l, "src", e.src, e, null);
        return;
      case "input":
        at("invalid", t);
        var c = n = i = u = null, d = null, b = null;
        for (a in e)
          if (e.hasOwnProperty(a)) {
            var M = e[a];
            if (M != null)
              switch (a) {
                case "name":
                  u = M;
                  break;
                case "type":
                  i = M;
                  break;
                case "checked":
                  d = M;
                  break;
                case "defaultChecked":
                  b = M;
                  break;
                case "value":
                  n = M;
                  break;
                case "defaultValue":
                  c = M;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (M != null)
                    throw Error(r(137, l));
                  break;
                default:
                  vt(t, l, a, M, e, null);
              }
          }
        ir(
          t,
          n,
          c,
          d,
          b,
          i,
          u,
          !1
        );
        return;
      case "select":
        at("invalid", t), a = i = n = null;
        for (u in e)
          if (e.hasOwnProperty(u) && (c = e[u], c != null))
            switch (u) {
              case "value":
                n = c;
                break;
              case "defaultValue":
                i = c;
                break;
              case "multiple":
                a = c;
              default:
                vt(t, l, u, c, e, null);
            }
        l = n, e = i, t.multiple = !!a, l != null ? la(t, !!a, l, !1) : e != null && la(t, !!a, e, !0);
        return;
      case "textarea":
        at("invalid", t), n = u = a = null;
        for (i in e)
          if (e.hasOwnProperty(i) && (c = e[i], c != null))
            switch (i) {
              case "value":
                a = c;
                break;
              case "defaultValue":
                u = c;
                break;
              case "children":
                n = c;
                break;
              case "dangerouslySetInnerHTML":
                if (c != null) throw Error(r(91));
                break;
              default:
                vt(t, l, i, c, e, null);
            }
        cr(t, a, u, n);
        return;
      case "option":
        for (d in e)
          if (e.hasOwnProperty(d) && (a = e[d], a != null))
            switch (d) {
              case "selected":
                t.selected = a && typeof a != "function" && typeof a != "symbol";
                break;
              default:
                vt(t, l, d, a, e, null);
            }
        return;
      case "dialog":
        at("beforetoggle", t), at("toggle", t), at("cancel", t), at("close", t);
        break;
      case "iframe":
      case "object":
        at("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < bu.length; a++)
          at(bu[a], t);
        break;
      case "image":
        at("error", t), at("load", t);
        break;
      case "details":
        at("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        at("error", t), at("load", t);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (b in e)
          if (e.hasOwnProperty(b) && (a = e[b], a != null))
            switch (b) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(r(137, l));
              default:
                vt(t, l, b, a, e, null);
            }
        return;
      default:
        if (zi(l)) {
          for (M in e)
            e.hasOwnProperty(M) && (a = e[M], a !== void 0 && rc(
              t,
              l,
              M,
              a,
              e,
              void 0
            ));
          return;
        }
    }
    for (c in e)
      e.hasOwnProperty(c) && (a = e[c], a != null && vt(t, l, c, a, e, null));
  }
  function my(t, l, e, a) {
    switch (l) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var u = null, n = null, i = null, c = null, d = null, b = null, M = null;
        for (A in e) {
          var U = e[A];
          if (e.hasOwnProperty(A) && U != null)
            switch (A) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                d = U;
              default:
                a.hasOwnProperty(A) || vt(t, l, A, null, a, U);
            }
        }
        for (var E in a) {
          var A = a[E];
          if (U = e[E], a.hasOwnProperty(E) && (A != null || U != null))
            switch (E) {
              case "type":
                n = A;
                break;
              case "name":
                u = A;
                break;
              case "checked":
                b = A;
                break;
              case "defaultChecked":
                M = A;
                break;
              case "value":
                i = A;
                break;
              case "defaultValue":
                c = A;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (A != null)
                  throw Error(r(137, l));
                break;
              default:
                A !== U && vt(
                  t,
                  l,
                  E,
                  A,
                  a,
                  U
                );
            }
        }
        bi(
          t,
          i,
          c,
          d,
          b,
          M,
          n,
          u
        );
        return;
      case "select":
        A = i = c = E = null;
        for (n in e)
          if (d = e[n], e.hasOwnProperty(n) && d != null)
            switch (n) {
              case "value":
                break;
              case "multiple":
                A = d;
              default:
                a.hasOwnProperty(n) || vt(
                  t,
                  l,
                  n,
                  null,
                  a,
                  d
                );
            }
        for (u in a)
          if (n = a[u], d = e[u], a.hasOwnProperty(u) && (n != null || d != null))
            switch (u) {
              case "value":
                E = n;
                break;
              case "defaultValue":
                c = n;
                break;
              case "multiple":
                i = n;
              default:
                n !== d && vt(
                  t,
                  l,
                  u,
                  n,
                  a,
                  d
                );
            }
        l = c, e = i, a = A, E != null ? la(t, !!e, E, !1) : !!a != !!e && (l != null ? la(t, !!e, l, !0) : la(t, !!e, e ? [] : "", !1));
        return;
      case "textarea":
        A = E = null;
        for (c in e)
          if (u = e[c], e.hasOwnProperty(c) && u != null && !a.hasOwnProperty(c))
            switch (c) {
              case "value":
                break;
              case "children":
                break;
              default:
                vt(t, l, c, null, a, u);
            }
        for (i in a)
          if (u = a[i], n = e[i], a.hasOwnProperty(i) && (u != null || n != null))
            switch (i) {
              case "value":
                E = u;
                break;
              case "defaultValue":
                A = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(r(91));
                break;
              default:
                u !== n && vt(t, l, i, u, a, n);
            }
        fr(t, E, A);
        return;
      case "option":
        for (var L in e)
          if (E = e[L], e.hasOwnProperty(L) && E != null && !a.hasOwnProperty(L))
            switch (L) {
              case "selected":
                t.selected = !1;
                break;
              default:
                vt(
                  t,
                  l,
                  L,
                  null,
                  a,
                  E
                );
            }
        for (d in a)
          if (E = a[d], A = e[d], a.hasOwnProperty(d) && E !== A && (E != null || A != null))
            switch (d) {
              case "selected":
                t.selected = E && typeof E != "function" && typeof E != "symbol";
                break;
              default:
                vt(
                  t,
                  l,
                  d,
                  E,
                  a,
                  A
                );
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var K in e)
          E = e[K], e.hasOwnProperty(K) && E != null && !a.hasOwnProperty(K) && vt(t, l, K, null, a, E);
        for (b in a)
          if (E = a[b], A = e[b], a.hasOwnProperty(b) && E !== A && (E != null || A != null))
            switch (b) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (E != null)
                  throw Error(r(137, l));
                break;
              default:
                vt(
                  t,
                  l,
                  b,
                  E,
                  a,
                  A
                );
            }
        return;
      default:
        if (zi(l)) {
          for (var gt in e)
            E = e[gt], e.hasOwnProperty(gt) && E !== void 0 && !a.hasOwnProperty(gt) && rc(
              t,
              l,
              gt,
              void 0,
              a,
              E
            );
          for (M in a)
            E = a[M], A = e[M], !a.hasOwnProperty(M) || E === A || E === void 0 && A === void 0 || rc(
              t,
              l,
              M,
              E,
              a,
              A
            );
          return;
        }
    }
    for (var v in e)
      E = e[v], e.hasOwnProperty(v) && E != null && !a.hasOwnProperty(v) && vt(t, l, v, null, a, E);
    for (U in a)
      E = a[U], A = e[U], !a.hasOwnProperty(U) || E === A || E == null && A == null || vt(t, l, U, E, a, A);
  }
  function dd(t) {
    switch (t) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function hy() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, l = 0, e = performance.getEntriesByType("resource"), a = 0; a < e.length; a++) {
        var u = e[a], n = u.transferSize, i = u.initiatorType, c = u.duration;
        if (n && c && dd(i)) {
          for (i = 0, c = u.responseEnd, a += 1; a < e.length; a++) {
            var d = e[a], b = d.startTime;
            if (b > c) break;
            var M = d.transferSize, U = d.initiatorType;
            M && dd(U) && (d = d.responseEnd, i += M * (d < c ? 1 : (c - b) / (d - b)));
          }
          if (--a, l += 8 * (n + i) / (u.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return l / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var oc = null, sc = null;
  function Xn(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function md(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function hd(t, l) {
    if (t === 0)
      switch (l) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && l === "foreignObject" ? 0 : t;
  }
  function dc(t, l) {
    return t === "textarea" || t === "noscript" || typeof l.children == "string" || typeof l.children == "number" || typeof l.children == "bigint" || typeof l.dangerouslySetInnerHTML == "object" && l.dangerouslySetInnerHTML !== null && l.dangerouslySetInnerHTML.__html != null;
  }
  var mc = null;
  function yy() {
    var t = window.event;
    return t && t.type === "popstate" ? t === mc ? !1 : (mc = t, !0) : (mc = null, !1);
  }
  var yd = typeof setTimeout == "function" ? setTimeout : void 0, vy = typeof clearTimeout == "function" ? clearTimeout : void 0, vd = typeof Promise == "function" ? Promise : void 0, gy = typeof queueMicrotask == "function" ? queueMicrotask : typeof vd < "u" ? function(t) {
    return vd.resolve(null).then(t).catch(py);
  } : yd;
  function py(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function ze(t) {
    return t === "head";
  }
  function gd(t, l) {
    var e = l, a = 0;
    do {
      var u = e.nextSibling;
      if (t.removeChild(e), u && u.nodeType === 8)
        if (e = u.data, e === "/$" || e === "/&") {
          if (a === 0) {
            t.removeChild(u), Na(l);
            return;
          }
          a--;
        } else if (e === "$" || e === "$?" || e === "$~" || e === "$!" || e === "&")
          a++;
        else if (e === "html")
          zu(t.ownerDocument.documentElement);
        else if (e === "head") {
          e = t.ownerDocument.head, zu(e);
          for (var n = e.firstChild; n; ) {
            var i = n.nextSibling, c = n.nodeName;
            n[Ga] || c === "SCRIPT" || c === "STYLE" || c === "LINK" && n.rel.toLowerCase() === "stylesheet" || e.removeChild(n), n = i;
          }
        } else
          e === "body" && zu(t.ownerDocument.body);
      e = u;
    } while (e);
    Na(l);
  }
  function pd(t, l) {
    var e = t;
    t = 0;
    do {
      var a = e.nextSibling;
      if (e.nodeType === 1 ? l ? (e._stashedDisplay = e.style.display, e.style.display = "none") : (e.style.display = e._stashedDisplay || "", e.getAttribute("style") === "" && e.removeAttribute("style")) : e.nodeType === 3 && (l ? (e._stashedText = e.nodeValue, e.nodeValue = "") : e.nodeValue = e._stashedText || ""), a && a.nodeType === 8)
        if (e = a.data, e === "/$") {
          if (t === 0) break;
          t--;
        } else
          e !== "$" && e !== "$?" && e !== "$~" && e !== "$!" || t++;
      e = a;
    } while (e);
  }
  function hc(t) {
    var l = t.firstChild;
    for (l && l.nodeType === 10 && (l = l.nextSibling); l; ) {
      var e = l;
      switch (l = l.nextSibling, e.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          hc(e), pi(e);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (e.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(e);
    }
  }
  function Sy(t, l, e, a) {
    for (; t.nodeType === 1; ) {
      var u = e;
      if (t.nodeName.toLowerCase() !== l.toLowerCase()) {
        if (!a && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (a) {
        if (!t[Ga])
          switch (l) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (n = t.getAttribute("rel"), n === "stylesheet" && t.hasAttribute("data-precedence"))
                break;
              if (n !== u.rel || t.getAttribute("href") !== (u.href == null || u.href === "" ? null : u.href) || t.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin) || t.getAttribute("title") !== (u.title == null ? null : u.title))
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (n = t.getAttribute("src"), (n !== (u.src == null ? null : u.src) || t.getAttribute("type") !== (u.type == null ? null : u.type) || t.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin)) && n && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                break;
              return t;
            default:
              return t;
          }
      } else if (l === "input" && t.type === "hidden") {
        var n = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && t.getAttribute("name") === n)
          return t;
      } else return t;
      if (t = Tl(t.nextSibling), t === null) break;
    }
    return null;
  }
  function by(t, l, e) {
    if (l === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = Tl(t.nextSibling), t === null)) return null;
    return t;
  }
  function Sd(t, l) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !l || (t = Tl(t.nextSibling), t === null)) return null;
    return t;
  }
  function yc(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function vc(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function Ey(t, l) {
    var e = t.ownerDocument;
    if (t.data === "$~") t._reactRetry = l;
    else if (t.data !== "$?" || e.readyState !== "loading")
      l();
    else {
      var a = function() {
        l(), e.removeEventListener("DOMContentLoaded", a);
      };
      e.addEventListener("DOMContentLoaded", a), t._reactRetry = a;
    }
  }
  function Tl(t) {
    for (; t != null; t = t.nextSibling) {
      var l = t.nodeType;
      if (l === 1 || l === 3) break;
      if (l === 8) {
        if (l = t.data, l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&" || l === "F!" || l === "F")
          break;
        if (l === "/$" || l === "/&") return null;
      }
    }
    return t;
  }
  var gc = null;
  function bd(t) {
    t = t.nextSibling;
    for (var l = 0; t; ) {
      if (t.nodeType === 8) {
        var e = t.data;
        if (e === "/$" || e === "/&") {
          if (l === 0)
            return Tl(t.nextSibling);
          l--;
        } else
          e !== "$" && e !== "$!" && e !== "$?" && e !== "$~" && e !== "&" || l++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function Ed(t) {
    t = t.previousSibling;
    for (var l = 0; t; ) {
      if (t.nodeType === 8) {
        var e = t.data;
        if (e === "$" || e === "$!" || e === "$?" || e === "$~" || e === "&") {
          if (l === 0) return t;
          l--;
        } else e !== "/$" && e !== "/&" || l++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function zd(t, l, e) {
    switch (l = Xn(e), t) {
      case "html":
        if (t = l.documentElement, !t) throw Error(r(452));
        return t;
      case "head":
        if (t = l.head, !t) throw Error(r(453));
        return t;
      case "body":
        if (t = l.body, !t) throw Error(r(454));
        return t;
      default:
        throw Error(r(451));
    }
  }
  function zu(t) {
    for (var l = t.attributes; l.length; )
      t.removeAttributeNode(l[0]);
    pi(t);
  }
  var Al = /* @__PURE__ */ new Map(), Td = /* @__PURE__ */ new Set();
  function Qn(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var te = j.d;
  j.d = {
    f: zy,
    r: Ty,
    D: Ay,
    C: _y,
    L: My,
    m: Oy,
    X: Dy,
    S: Ry,
    M: Uy
  };
  function zy() {
    var t = te.f(), l = Nn();
    return t || l;
  }
  function Ty(t) {
    var l = Ie(t);
    l !== null && l.tag === 5 && l.type === "form" ? Go(l) : te.r(t);
  }
  var Ua = typeof document > "u" ? null : document;
  function Ad(t, l, e) {
    var a = Ua;
    if (a && typeof l == "string" && l) {
      var u = vl(l);
      u = 'link[rel="' + t + '"][href="' + u + '"]', typeof e == "string" && (u += '[crossorigin="' + e + '"]'), Td.has(u) || (Td.add(u), t = { rel: t, crossOrigin: e, href: l }, a.querySelector(u) === null && (l = a.createElement("link"), Jt(l, "link", t), Yt(l), a.head.appendChild(l)));
    }
  }
  function Ay(t) {
    te.D(t), Ad("dns-prefetch", t, null);
  }
  function _y(t, l) {
    te.C(t, l), Ad("preconnect", t, l);
  }
  function My(t, l, e) {
    te.L(t, l, e);
    var a = Ua;
    if (a && t && l) {
      var u = 'link[rel="preload"][as="' + vl(l) + '"]';
      l === "image" && e && e.imageSrcSet ? (u += '[imagesrcset="' + vl(
        e.imageSrcSet
      ) + '"]', typeof e.imageSizes == "string" && (u += '[imagesizes="' + vl(
        e.imageSizes
      ) + '"]')) : u += '[href="' + vl(t) + '"]';
      var n = u;
      switch (l) {
        case "style":
          n = Ca(t);
          break;
        case "script":
          n = xa(t);
      }
      Al.has(n) || (t = _(
        {
          rel: "preload",
          href: l === "image" && e && e.imageSrcSet ? void 0 : t,
          as: l
        },
        e
      ), Al.set(n, t), a.querySelector(u) !== null || l === "style" && a.querySelector(Tu(n)) || l === "script" && a.querySelector(Au(n)) || (l = a.createElement("link"), Jt(l, "link", t), Yt(l), a.head.appendChild(l)));
    }
  }
  function Oy(t, l) {
    te.m(t, l);
    var e = Ua;
    if (e && t) {
      var a = l && typeof l.as == "string" ? l.as : "script", u = 'link[rel="modulepreload"][as="' + vl(a) + '"][href="' + vl(t) + '"]', n = u;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          n = xa(t);
      }
      if (!Al.has(n) && (t = _({ rel: "modulepreload", href: t }, l), Al.set(n, t), e.querySelector(u) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (e.querySelector(Au(n)))
              return;
        }
        a = e.createElement("link"), Jt(a, "link", t), Yt(a), e.head.appendChild(a);
      }
    }
  }
  function Ry(t, l, e) {
    te.S(t, l, e);
    var a = Ua;
    if (a && t) {
      var u = Pe(a).hoistableStyles, n = Ca(t);
      l = l || "default";
      var i = u.get(n);
      if (!i) {
        var c = { loading: 0, preload: null };
        if (i = a.querySelector(
          Tu(n)
        ))
          c.loading = 5;
        else {
          t = _(
            { rel: "stylesheet", href: t, "data-precedence": l },
            e
          ), (e = Al.get(n)) && pc(t, e);
          var d = i = a.createElement("link");
          Yt(d), Jt(d, "link", t), d._p = new Promise(function(b, M) {
            d.onload = b, d.onerror = M;
          }), d.addEventListener("load", function() {
            c.loading |= 1;
          }), d.addEventListener("error", function() {
            c.loading |= 2;
          }), c.loading |= 4, Zn(i, l, a);
        }
        i = {
          type: "stylesheet",
          instance: i,
          count: 1,
          state: c
        }, u.set(n, i);
      }
    }
  }
  function Dy(t, l) {
    te.X(t, l);
    var e = Ua;
    if (e && t) {
      var a = Pe(e).hoistableScripts, u = xa(t), n = a.get(u);
      n || (n = e.querySelector(Au(u)), n || (t = _({ src: t, async: !0 }, l), (l = Al.get(u)) && Sc(t, l), n = e.createElement("script"), Yt(n), Jt(n, "link", t), e.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, a.set(u, n));
    }
  }
  function Uy(t, l) {
    te.M(t, l);
    var e = Ua;
    if (e && t) {
      var a = Pe(e).hoistableScripts, u = xa(t), n = a.get(u);
      n || (n = e.querySelector(Au(u)), n || (t = _({ src: t, async: !0, type: "module" }, l), (l = Al.get(u)) && Sc(t, l), n = e.createElement("script"), Yt(n), Jt(n, "link", t), e.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, a.set(u, n));
    }
  }
  function _d(t, l, e, a) {
    var u = (u = lt.current) ? Qn(u) : null;
    if (!u) throw Error(r(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof e.precedence == "string" && typeof e.href == "string" ? (l = Ca(e.href), e = Pe(
          u
        ).hoistableStyles, a = e.get(l), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, e.set(l, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (e.rel === "stylesheet" && typeof e.href == "string" && typeof e.precedence == "string") {
          t = Ca(e.href);
          var n = Pe(
            u
          ).hoistableStyles, i = n.get(t);
          if (i || (u = u.ownerDocument || u, i = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, n.set(t, i), (n = u.querySelector(
            Tu(t)
          )) && !n._p && (i.instance = n, i.state.loading = 5), Al.has(t) || (e = {
            rel: "preload",
            as: "style",
            href: e.href,
            crossOrigin: e.crossOrigin,
            integrity: e.integrity,
            media: e.media,
            hrefLang: e.hrefLang,
            referrerPolicy: e.referrerPolicy
          }, Al.set(t, e), n || Cy(
            u,
            t,
            e,
            i.state
          ))), l && a === null)
            throw Error(r(528, ""));
          return i;
        }
        if (l && a !== null)
          throw Error(r(529, ""));
        return null;
      case "script":
        return l = e.async, e = e.src, typeof e == "string" && l && typeof l != "function" && typeof l != "symbol" ? (l = xa(e), e = Pe(
          u
        ).hoistableScripts, a = e.get(l), a || (a = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, e.set(l, a)), a) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(r(444, t));
    }
  }
  function Ca(t) {
    return 'href="' + vl(t) + '"';
  }
  function Tu(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function Md(t) {
    return _({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function Cy(t, l, e, a) {
    t.querySelector('link[rel="preload"][as="style"][' + l + "]") ? a.loading = 1 : (l = t.createElement("link"), a.preload = l, l.addEventListener("load", function() {
      return a.loading |= 1;
    }), l.addEventListener("error", function() {
      return a.loading |= 2;
    }), Jt(l, "link", e), Yt(l), t.head.appendChild(l));
  }
  function xa(t) {
    return '[src="' + vl(t) + '"]';
  }
  function Au(t) {
    return "script[async]" + t;
  }
  function Od(t, l, e) {
    if (l.count++, l.instance === null)
      switch (l.type) {
        case "style":
          var a = t.querySelector(
            'style[data-href~="' + vl(e.href) + '"]'
          );
          if (a)
            return l.instance = a, Yt(a), a;
          var u = _({}, e, {
            "data-href": e.href,
            "data-precedence": e.precedence,
            href: null,
            precedence: null
          });
          return a = (t.ownerDocument || t).createElement(
            "style"
          ), Yt(a), Jt(a, "style", u), Zn(a, e.precedence, t), l.instance = a;
        case "stylesheet":
          u = Ca(e.href);
          var n = t.querySelector(
            Tu(u)
          );
          if (n)
            return l.state.loading |= 4, l.instance = n, Yt(n), n;
          a = Md(e), (u = Al.get(u)) && pc(a, u), n = (t.ownerDocument || t).createElement("link"), Yt(n);
          var i = n;
          return i._p = new Promise(function(c, d) {
            i.onload = c, i.onerror = d;
          }), Jt(n, "link", a), l.state.loading |= 4, Zn(n, e.precedence, t), l.instance = n;
        case "script":
          return n = xa(e.src), (u = t.querySelector(
            Au(n)
          )) ? (l.instance = u, Yt(u), u) : (a = e, (u = Al.get(n)) && (a = _({}, e), Sc(a, u)), t = t.ownerDocument || t, u = t.createElement("script"), Yt(u), Jt(u, "link", a), t.head.appendChild(u), l.instance = u);
        case "void":
          return null;
        default:
          throw Error(r(443, l.type));
      }
    else
      l.type === "stylesheet" && (l.state.loading & 4) === 0 && (a = l.instance, l.state.loading |= 4, Zn(a, e.precedence, t));
    return l.instance;
  }
  function Zn(t, l, e) {
    for (var a = e.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = a.length ? a[a.length - 1] : null, n = u, i = 0; i < a.length; i++) {
      var c = a[i];
      if (c.dataset.precedence === l) n = c;
      else if (n !== u) break;
    }
    n ? n.parentNode.insertBefore(t, n.nextSibling) : (l = e.nodeType === 9 ? e.head : e, l.insertBefore(t, l.firstChild));
  }
  function pc(t, l) {
    t.crossOrigin == null && (t.crossOrigin = l.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy), t.title == null && (t.title = l.title);
  }
  function Sc(t, l) {
    t.crossOrigin == null && (t.crossOrigin = l.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy), t.integrity == null && (t.integrity = l.integrity);
  }
  var Vn = null;
  function Rd(t, l, e) {
    if (Vn === null) {
      var a = /* @__PURE__ */ new Map(), u = Vn = /* @__PURE__ */ new Map();
      u.set(e, a);
    } else
      u = Vn, a = u.get(e), a || (a = /* @__PURE__ */ new Map(), u.set(e, a));
    if (a.has(t)) return a;
    for (a.set(t, null), e = e.getElementsByTagName(t), u = 0; u < e.length; u++) {
      var n = e[u];
      if (!(n[Ga] || n[Qt] || t === "link" && n.getAttribute("rel") === "stylesheet") && n.namespaceURI !== "http://www.w3.org/2000/svg") {
        var i = n.getAttribute(l) || "";
        i = t + i;
        var c = a.get(i);
        c ? c.push(n) : a.set(i, [n]);
      }
    }
    return a;
  }
  function Dd(t, l, e) {
    t = t.ownerDocument || t, t.head.insertBefore(
      e,
      l === "title" ? t.querySelector("head > title") : null
    );
  }
  function xy(t, l, e) {
    if (e === 1 || l.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof l.precedence != "string" || typeof l.href != "string" || l.href === "")
          break;
        return !0;
      case "link":
        if (typeof l.rel != "string" || typeof l.href != "string" || l.href === "" || l.onLoad || l.onError)
          break;
        switch (l.rel) {
          case "stylesheet":
            return t = l.disabled, typeof l.precedence == "string" && t == null;
          default:
            return !0;
        }
      case "script":
        if (l.async && typeof l.async != "function" && typeof l.async != "symbol" && !l.onLoad && !l.onError && l.src && typeof l.src == "string")
          return !0;
    }
    return !1;
  }
  function Ud(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function Ny(t, l, e, a) {
    if (e.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (e.state.loading & 4) === 0) {
      if (e.instance === null) {
        var u = Ca(a.href), n = l.querySelector(
          Tu(u)
        );
        if (n) {
          l = n._p, l !== null && typeof l == "object" && typeof l.then == "function" && (t.count++, t = Kn.bind(t), l.then(t, t)), e.state.loading |= 4, e.instance = n, Yt(n);
          return;
        }
        n = l.ownerDocument || l, a = Md(a), (u = Al.get(u)) && pc(a, u), n = n.createElement("link"), Yt(n);
        var i = n;
        i._p = new Promise(function(c, d) {
          i.onload = c, i.onerror = d;
        }), Jt(n, "link", a), e.instance = n;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(e, l), (l = e.state.preload) && (e.state.loading & 3) === 0 && (t.count++, e = Kn.bind(t), l.addEventListener("load", e), l.addEventListener("error", e));
    }
  }
  var bc = 0;
  function Hy(t, l) {
    return t.stylesheets && t.count === 0 && wn(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(e) {
      var a = setTimeout(function() {
        if (t.stylesheets && wn(t, t.stylesheets), t.unsuspend) {
          var n = t.unsuspend;
          t.unsuspend = null, n();
        }
      }, 6e4 + l);
      0 < t.imgBytes && bc === 0 && (bc = 62500 * hy());
      var u = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && wn(t, t.stylesheets), t.unsuspend)) {
            var n = t.unsuspend;
            t.unsuspend = null, n();
          }
        },
        (t.imgBytes > bc ? 50 : 800) + l
      );
      return t.unsuspend = e, function() {
        t.unsuspend = null, clearTimeout(a), clearTimeout(u);
      };
    } : null;
  }
  function Kn() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) wn(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var Jn = null;
  function wn(t, l) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, Jn = /* @__PURE__ */ new Map(), l.forEach(By, t), Jn = null, Kn.call(t));
  }
  function By(t, l) {
    if (!(l.state.loading & 4)) {
      var e = Jn.get(t);
      if (e) var a = e.get(null);
      else {
        e = /* @__PURE__ */ new Map(), Jn.set(t, e);
        for (var u = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), n = 0; n < u.length; n++) {
          var i = u[n];
          (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") && (e.set(i.dataset.precedence, i), a = i);
        }
        a && e.set(null, a);
      }
      u = l.instance, i = u.getAttribute("data-precedence"), n = e.get(i) || a, n === a && e.set(null, u), e.set(i, u), this.count++, a = Kn.bind(this), u.addEventListener("load", a), u.addEventListener("error", a), n ? n.parentNode.insertBefore(u, n.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(u, t.firstChild)), l.state.loading |= 4;
    }
  }
  var _u = {
    $$typeof: G,
    Provider: null,
    Consumer: null,
    _currentValue: $,
    _currentValue2: $,
    _threadCount: 0
  };
  function jy(t, l, e, a, u, n, i, c, d) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = hi(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = hi(0), this.hiddenUpdates = hi(null), this.identifierPrefix = a, this.onUncaughtError = u, this.onCaughtError = n, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = d, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Cd(t, l, e, a, u, n, i, c, d, b, M, U) {
    return t = new jy(
      t,
      l,
      e,
      i,
      d,
      b,
      M,
      U,
      c
    ), l = 1, n === !0 && (l |= 24), n = rl(3, null, null, l), t.current = n, n.stateNode = t, l = Ii(), l.refCount++, t.pooledCache = l, l.refCount++, n.memoizedState = {
      element: a,
      isDehydrated: e,
      cache: l
    }, ef(n), t;
  }
  function xd(t) {
    return t ? (t = ra, t) : ra;
  }
  function Nd(t, l, e, a, u, n) {
    u = xd(u), a.context === null ? a.context = u : a.pendingContext = u, a = se(l), a.payload = { element: e }, n = n === void 0 ? null : n, n !== null && (a.callback = n), e = de(t, a, l), e !== null && (ul(e, t, l), au(e, t, l));
  }
  function Hd(t, l) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var e = t.retryLane;
      t.retryLane = e !== 0 && e < l ? e : l;
    }
  }
  function Ec(t, l) {
    Hd(t, l), (t = t.alternate) && Hd(t, l);
  }
  function Bd(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = Be(t, 67108864);
      l !== null && ul(l, t, 67108864), Ec(t, 67108864);
    }
  }
  function jd(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = hl();
      l = yi(l);
      var e = Be(t, l);
      e !== null && ul(e, t, l), Ec(t, l);
    }
  }
  var $n = !0;
  function qy(t, l, e, a) {
    var u = O.T;
    O.T = null;
    var n = j.p;
    try {
      j.p = 2, zc(t, l, e, a);
    } finally {
      j.p = n, O.T = u;
    }
  }
  function Yy(t, l, e, a) {
    var u = O.T;
    O.T = null;
    var n = j.p;
    try {
      j.p = 8, zc(t, l, e, a);
    } finally {
      j.p = n, O.T = u;
    }
  }
  function zc(t, l, e, a) {
    if ($n) {
      var u = Tc(a);
      if (u === null)
        cc(
          t,
          l,
          a,
          Wn,
          e
        ), Yd(t, a);
      else if (Gy(
        u,
        t,
        l,
        e,
        a
      ))
        a.stopPropagation();
      else if (Yd(t, a), l & 4 && -1 < Ly.indexOf(t)) {
        for (; u !== null; ) {
          var n = Ie(u);
          if (n !== null)
            switch (n.tag) {
              case 3:
                if (n = n.stateNode, n.current.memoizedState.isDehydrated) {
                  var i = Ue(n.pendingLanes);
                  if (i !== 0) {
                    var c = n;
                    for (c.pendingLanes |= 2, c.entangledLanes |= 2; i; ) {
                      var d = 1 << 31 - fl(i);
                      c.entanglements[1] |= d, i &= ~d;
                    }
                    Hl(n), (ot & 6) === 0 && (Cn = nl() + 500, Su(0));
                  }
                }
                break;
              case 31:
              case 13:
                c = Be(n, 2), c !== null && ul(c, n, 2), Nn(), Ec(n, 2);
            }
          if (n = Tc(a), n === null && cc(
            t,
            l,
            a,
            Wn,
            e
          ), n === u) break;
          u = n;
        }
        u !== null && a.stopPropagation();
      } else
        cc(
          t,
          l,
          a,
          null,
          e
        );
    }
  }
  function Tc(t) {
    return t = Ai(t), Ac(t);
  }
  var Wn = null;
  function Ac(t) {
    if (Wn = null, t = Fe(t), t !== null) {
      var l = p(t);
      if (l === null) t = null;
      else {
        var e = l.tag;
        if (e === 13) {
          if (t = z(l), t !== null) return t;
          t = null;
        } else if (e === 31) {
          if (t = C(l), t !== null) return t;
          t = null;
        } else if (e === 3) {
          if (l.stateNode.current.memoizedState.isDehydrated)
            return l.tag === 3 ? l.stateNode.containerInfo : null;
          t = null;
        } else l !== t && (t = null);
      }
    }
    return Wn = t, null;
  }
  function qd(t) {
    switch (t) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Am()) {
          case Vc:
            return 2;
          case Kc:
            return 8;
          case qu:
          case _m:
            return 32;
          case Jc:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var _c = !1, Te = null, Ae = null, _e = null, Mu = /* @__PURE__ */ new Map(), Ou = /* @__PURE__ */ new Map(), Me = [], Ly = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Yd(t, l) {
    switch (t) {
      case "focusin":
      case "focusout":
        Te = null;
        break;
      case "dragenter":
      case "dragleave":
        Ae = null;
        break;
      case "mouseover":
      case "mouseout":
        _e = null;
        break;
      case "pointerover":
      case "pointerout":
        Mu.delete(l.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Ou.delete(l.pointerId);
    }
  }
  function Ru(t, l, e, a, u, n) {
    return t === null || t.nativeEvent !== n ? (t = {
      blockedOn: l,
      domEventName: e,
      eventSystemFlags: a,
      nativeEvent: n,
      targetContainers: [u]
    }, l !== null && (l = Ie(l), l !== null && Bd(l)), t) : (t.eventSystemFlags |= a, l = t.targetContainers, u !== null && l.indexOf(u) === -1 && l.push(u), t);
  }
  function Gy(t, l, e, a, u) {
    switch (l) {
      case "focusin":
        return Te = Ru(
          Te,
          t,
          l,
          e,
          a,
          u
        ), !0;
      case "dragenter":
        return Ae = Ru(
          Ae,
          t,
          l,
          e,
          a,
          u
        ), !0;
      case "mouseover":
        return _e = Ru(
          _e,
          t,
          l,
          e,
          a,
          u
        ), !0;
      case "pointerover":
        var n = u.pointerId;
        return Mu.set(
          n,
          Ru(
            Mu.get(n) || null,
            t,
            l,
            e,
            a,
            u
          )
        ), !0;
      case "gotpointercapture":
        return n = u.pointerId, Ou.set(
          n,
          Ru(
            Ou.get(n) || null,
            t,
            l,
            e,
            a,
            u
          )
        ), !0;
    }
    return !1;
  }
  function Ld(t) {
    var l = Fe(t.target);
    if (l !== null) {
      var e = p(l);
      if (e !== null) {
        if (l = e.tag, l === 13) {
          if (l = z(e), l !== null) {
            t.blockedOn = l, Ic(t.priority, function() {
              jd(e);
            });
            return;
          }
        } else if (l === 31) {
          if (l = C(e), l !== null) {
            t.blockedOn = l, Ic(t.priority, function() {
              jd(e);
            });
            return;
          }
        } else if (l === 3 && e.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = e.tag === 3 ? e.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function kn(t) {
    if (t.blockedOn !== null) return !1;
    for (var l = t.targetContainers; 0 < l.length; ) {
      var e = Tc(t.nativeEvent);
      if (e === null) {
        e = t.nativeEvent;
        var a = new e.constructor(
          e.type,
          e
        );
        Ti = a, e.target.dispatchEvent(a), Ti = null;
      } else
        return l = Ie(e), l !== null && Bd(l), t.blockedOn = e, !1;
      l.shift();
    }
    return !0;
  }
  function Gd(t, l, e) {
    kn(t) && e.delete(l);
  }
  function Xy() {
    _c = !1, Te !== null && kn(Te) && (Te = null), Ae !== null && kn(Ae) && (Ae = null), _e !== null && kn(_e) && (_e = null), Mu.forEach(Gd), Ou.forEach(Gd);
  }
  function Fn(t, l) {
    t.blockedOn === l && (t.blockedOn = null, _c || (_c = !0, f.unstable_scheduleCallback(
      f.unstable_NormalPriority,
      Xy
    )));
  }
  var In = null;
  function Xd(t) {
    In !== t && (In = t, f.unstable_scheduleCallback(
      f.unstable_NormalPriority,
      function() {
        In === t && (In = null);
        for (var l = 0; l < t.length; l += 3) {
          var e = t[l], a = t[l + 1], u = t[l + 2];
          if (typeof a != "function") {
            if (Ac(a || e) === null)
              continue;
            break;
          }
          var n = Ie(e);
          n !== null && (t.splice(l, 3), l -= 3, Tf(
            n,
            {
              pending: !0,
              data: u,
              method: e.method,
              action: a
            },
            a,
            u
          ));
        }
      }
    ));
  }
  function Na(t) {
    function l(d) {
      return Fn(d, t);
    }
    Te !== null && Fn(Te, t), Ae !== null && Fn(Ae, t), _e !== null && Fn(_e, t), Mu.forEach(l), Ou.forEach(l);
    for (var e = 0; e < Me.length; e++) {
      var a = Me[e];
      a.blockedOn === t && (a.blockedOn = null);
    }
    for (; 0 < Me.length && (e = Me[0], e.blockedOn === null); )
      Ld(e), e.blockedOn === null && Me.shift();
    if (e = (t.ownerDocument || t).$$reactFormReplay, e != null)
      for (a = 0; a < e.length; a += 3) {
        var u = e[a], n = e[a + 1], i = u[It] || null;
        if (typeof n == "function")
          i || Xd(e);
        else if (i) {
          var c = null;
          if (n && n.hasAttribute("formAction")) {
            if (u = n, i = n[It] || null)
              c = i.formAction;
            else if (Ac(u) !== null) continue;
          } else c = i.action;
          typeof c == "function" ? e[a + 1] = c : (e.splice(a, 3), a -= 3), Xd(e);
        }
      }
  }
  function Qd() {
    function t(n) {
      n.canIntercept && n.info === "react-transition" && n.intercept({
        handler: function() {
          return new Promise(function(i) {
            return u = i;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function l() {
      u !== null && (u(), u = null), a || setTimeout(e, 20);
    }
    function e() {
      if (!a && !navigation.transition) {
        var n = navigation.currentEntry;
        n && n.url != null && navigation.navigate(n.url, {
          state: n.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var a = !1, u = null;
      return navigation.addEventListener("navigate", t), navigation.addEventListener("navigatesuccess", l), navigation.addEventListener("navigateerror", l), setTimeout(e, 100), function() {
        a = !0, navigation.removeEventListener("navigate", t), navigation.removeEventListener("navigatesuccess", l), navigation.removeEventListener("navigateerror", l), u !== null && (u(), u = null);
      };
    }
  }
  function Mc(t) {
    this._internalRoot = t;
  }
  Pn.prototype.render = Mc.prototype.render = function(t) {
    var l = this._internalRoot;
    if (l === null) throw Error(r(409));
    var e = l.current, a = hl();
    Nd(e, a, t, l, null, null);
  }, Pn.prototype.unmount = Mc.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var l = t.containerInfo;
      Nd(t.current, 2, null, t, null, null), Nn(), l[ke] = null;
    }
  };
  function Pn(t) {
    this._internalRoot = t;
  }
  Pn.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var l = Fc();
      t = { blockedOn: null, target: t, priority: l };
      for (var e = 0; e < Me.length && l !== 0 && l < Me[e].priority; e++) ;
      Me.splice(e, 0, t), e === 0 && Ld(t);
    }
  };
  var Zd = s.version;
  if (Zd !== "19.2.3")
    throw Error(
      r(
        527,
        Zd,
        "19.2.3"
      )
    );
  j.findDOMNode = function(t) {
    var l = t._reactInternals;
    if (l === void 0)
      throw typeof t.render == "function" ? Error(r(188)) : (t = Object.keys(t).join(","), Error(r(268, t)));
    return t = y(l), t = t !== null ? D(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var Qy = {
    bundleType: 0,
    version: "19.2.3",
    rendererPackageName: "react-dom",
    currentDispatcherRef: O,
    reconcilerVersion: "19.2.3"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var ti = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!ti.isDisabled && ti.supportsFiber)
      try {
        qa = ti.inject(
          Qy
        ), il = ti;
      } catch {
      }
  }
  return Uu.createRoot = function(t, l) {
    if (!g(t)) throw Error(r(299));
    var e = !1, a = "", u = ko, n = Fo, i = Io;
    return l != null && (l.unstable_strictMode === !0 && (e = !0), l.identifierPrefix !== void 0 && (a = l.identifierPrefix), l.onUncaughtError !== void 0 && (u = l.onUncaughtError), l.onCaughtError !== void 0 && (n = l.onCaughtError), l.onRecoverableError !== void 0 && (i = l.onRecoverableError)), l = Cd(
      t,
      1,
      !1,
      null,
      null,
      e,
      a,
      null,
      u,
      n,
      i,
      Qd
    ), t[ke] = l.current, fc(t), new Mc(l);
  }, Uu.hydrateRoot = function(t, l, e) {
    if (!g(t)) throw Error(r(299));
    var a = !1, u = "", n = ko, i = Fo, c = Io, d = null;
    return e != null && (e.unstable_strictMode === !0 && (a = !0), e.identifierPrefix !== void 0 && (u = e.identifierPrefix), e.onUncaughtError !== void 0 && (n = e.onUncaughtError), e.onCaughtError !== void 0 && (i = e.onCaughtError), e.onRecoverableError !== void 0 && (c = e.onRecoverableError), e.formState !== void 0 && (d = e.formState)), l = Cd(
      t,
      1,
      !0,
      l,
      e ?? null,
      a,
      u,
      d,
      n,
      i,
      c,
      Qd
    ), l.context = xd(null), e = l.current, a = hl(), a = yi(a), u = se(a), u.callback = null, de(e, u, a), e = a, l.current.lanes = e, La(l, e), Hl(l), t[ke] = l.current, fc(t), new Pn(l);
  }, Uu.version = "19.2.3", Uu;
}
var Pd;
function Iy() {
  if (Pd) return Rc.exports;
  Pd = 1;
  function f() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f);
      } catch (s) {
        console.error(s);
      }
  }
  return f(), Rc.exports = Fy(), Rc.exports;
}
var Py = Iy(), x = jc();
/**
 * react-router v7.10.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function tv(f = {}) {
  let { initialEntries: s = ["/"], initialIndex: o, v5Compat: r = !1 } = f, g;
  g = s.map(
    (H, Y) => D(
      H,
      typeof H == "string" ? null : H.state,
      Y === 0 ? "default" : void 0
    )
  );
  let p = T(
    o ?? g.length - 1
  ), z = "POP", C = null;
  function T(H) {
    return Math.min(Math.max(H, 0), g.length - 1);
  }
  function y() {
    return g[p];
  }
  function D(H, Y = null, V) {
    let F = ev(
      g ? y().pathname : "/",
      H,
      Y,
      V
    );
    return _l(
      F.pathname.charAt(0) === "/",
      `relative pathnames are not supported in memory history: ${JSON.stringify(
        H
      )}`
    ), F;
  }
  function _(H) {
    return typeof H == "string" ? H : ui(H);
  }
  return {
    get index() {
      return p;
    },
    get action() {
      return z;
    },
    get location() {
      return y();
    },
    createHref: _,
    createURL(H) {
      return new URL(_(H), "http://localhost");
    },
    encodeLocation(H) {
      let Y = typeof H == "string" ? $e(H) : H;
      return {
        pathname: Y.pathname || "",
        search: Y.search || "",
        hash: Y.hash || ""
      };
    },
    push(H, Y) {
      z = "PUSH";
      let V = D(H, Y);
      p += 1, g.splice(p, g.length, V), r && C && C({ action: z, location: V, delta: 1 });
    },
    replace(H, Y) {
      z = "REPLACE";
      let V = D(H, Y);
      g[p] = V, r && C && C({ action: z, location: V, delta: 0 });
    },
    go(H) {
      z = "POP";
      let Y = T(p + H), V = g[Y];
      p = Y, C && C({ action: z, location: V, delta: H });
    },
    listen(H) {
      return C = H, () => {
        C = null;
      };
    }
  };
}
function Mt(f, s) {
  if (f === !1 || f === null || typeof f > "u")
    throw new Error(s);
}
function _l(f, s) {
  if (!f) {
    typeof console < "u" && console.warn(s);
    try {
      throw new Error(s);
    } catch {
    }
  }
}
function lv() {
  return Math.random().toString(36).substring(2, 10);
}
function ev(f, s, o = null, r) {
  return {
    pathname: typeof f == "string" ? f : f.pathname,
    search: "",
    hash: "",
    ...typeof s == "string" ? $e(s) : s,
    state: o,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: s && s.key || r || lv()
  };
}
function ui({
  pathname: f = "/",
  search: s = "",
  hash: o = ""
}) {
  return s && s !== "?" && (f += s.charAt(0) === "?" ? s : "?" + s), o && o !== "#" && (f += o.charAt(0) === "#" ? o : "#" + o), f;
}
function $e(f) {
  let s = {};
  if (f) {
    let o = f.indexOf("#");
    o >= 0 && (s.hash = f.substring(o), f = f.substring(0, o));
    let r = f.indexOf("?");
    r >= 0 && (s.search = f.substring(r), f = f.substring(0, r)), f && (s.pathname = f);
  }
  return s;
}
function um(f, s, o = "/") {
  return av(f, s, o, !1);
}
function av(f, s, o, r) {
  let g = typeof s == "string" ? $e(s) : s, p = ee(g.pathname || "/", o);
  if (p == null)
    return null;
  let z = nm(f);
  uv(z);
  let C = null;
  for (let T = 0; C == null && T < z.length; ++T) {
    let y = yv(p);
    C = mv(
      z[T],
      y,
      r
    );
  }
  return C;
}
function nm(f, s = [], o = [], r = "", g = !1) {
  let p = (z, C, T = g, y) => {
    let D = {
      relativePath: y === void 0 ? z.path || "" : y,
      caseSensitive: z.caseSensitive === !0,
      childrenIndex: C,
      route: z
    };
    if (D.relativePath.startsWith("/")) {
      if (!D.relativePath.startsWith(r) && T)
        return;
      Mt(
        D.relativePath.startsWith(r),
        `Absolute route path "${D.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ), D.relativePath = D.relativePath.slice(r.length);
    }
    let _ = le([r, D.relativePath]), B = o.concat(D);
    z.children && z.children.length > 0 && (Mt(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      z.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${_}".`
    ), nm(
      z.children,
      s,
      B,
      _,
      T
    )), !(z.path == null && !z.index) && s.push({
      path: _,
      score: sv(_, z.index),
      routesMeta: B
    });
  };
  return f.forEach((z, C) => {
    var T;
    if (z.path === "" || !((T = z.path) != null && T.includes("?")))
      p(z, C);
    else
      for (let y of im(z.path))
        p(z, C, !0, y);
  }), s;
}
function im(f) {
  let s = f.split("/");
  if (s.length === 0) return [];
  let [o, ...r] = s, g = o.endsWith("?"), p = o.replace(/\?$/, "");
  if (r.length === 0)
    return g ? [p, ""] : [p];
  let z = im(r.join("/")), C = [];
  return C.push(
    ...z.map(
      (T) => T === "" ? p : [p, T].join("/")
    )
  ), g && C.push(...z), C.map(
    (T) => f.startsWith("/") && T === "" ? "/" : T
  );
}
function uv(f) {
  f.sort(
    (s, o) => s.score !== o.score ? o.score - s.score : dv(
      s.routesMeta.map((r) => r.childrenIndex),
      o.routesMeta.map((r) => r.childrenIndex)
    )
  );
}
var nv = /^:[\w-]+$/, iv = 3, fv = 2, cv = 1, rv = 10, ov = -2, tm = (f) => f === "*";
function sv(f, s) {
  let o = f.split("/"), r = o.length;
  return o.some(tm) && (r += ov), s && (r += fv), o.filter((g) => !tm(g)).reduce(
    (g, p) => g + (nv.test(p) ? iv : p === "" ? cv : rv),
    r
  );
}
function dv(f, s) {
  return f.length === s.length && f.slice(0, -1).every((r, g) => r === s[g]) ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    f[f.length - 1] - s[s.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function mv(f, s, o = !1) {
  let { routesMeta: r } = f, g = {}, p = "/", z = [];
  for (let C = 0; C < r.length; ++C) {
    let T = r[C], y = C === r.length - 1, D = p === "/" ? s : s.slice(p.length) || "/", _ = ni(
      { path: T.relativePath, caseSensitive: T.caseSensitive, end: y },
      D
    ), B = T.route;
    if (!_ && y && o && !r[r.length - 1].route.index && (_ = ni(
      {
        path: T.relativePath,
        caseSensitive: T.caseSensitive,
        end: !1
      },
      D
    )), !_)
      return null;
    Object.assign(g, _.params), z.push({
      // TODO: Can this as be avoided?
      params: g,
      pathname: le([p, _.pathname]),
      pathnameBase: bv(
        le([p, _.pathnameBase])
      ),
      route: B
    }), _.pathnameBase !== "/" && (p = le([p, _.pathnameBase]));
  }
  return z;
}
function ni(f, s) {
  typeof f == "string" && (f = { path: f, caseSensitive: !1, end: !0 });
  let [o, r] = hv(
    f.path,
    f.caseSensitive,
    f.end
  ), g = s.match(o);
  if (!g) return null;
  let p = g[0], z = p.replace(/(.)\/+$/, "$1"), C = g.slice(1);
  return {
    params: r.reduce(
      (y, { paramName: D, isOptional: _ }, B) => {
        if (D === "*") {
          let Y = C[B] || "";
          z = p.slice(0, p.length - Y.length).replace(/(.)\/+$/, "$1");
        }
        const H = C[B];
        return _ && !H ? y[D] = void 0 : y[D] = (H || "").replace(/%2F/g, "/"), y;
      },
      {}
    ),
    pathname: p,
    pathnameBase: z,
    pattern: f
  };
}
function hv(f, s = !1, o = !0) {
  _l(
    f === "*" || !f.endsWith("*") || f.endsWith("/*"),
    `Route path "${f}" will be treated as if it were "${f.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${f.replace(/\*$/, "/*")}".`
  );
  let r = [], g = "^" + f.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (z, C, T) => (r.push({ paramName: C, isOptional: T != null }), T ? "/?([^\\/]+)?" : "/([^\\/]+)")
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return f.endsWith("*") ? (r.push({ paramName: "*" }), g += f === "*" || f === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : o ? g += "\\/*$" : f !== "" && f !== "/" && (g += "(?:(?=\\/|$))"), [new RegExp(g, s ? void 0 : "i"), r];
}
function yv(f) {
  try {
    return f.split("/").map((s) => decodeURIComponent(s).replace(/\//g, "%2F")).join("/");
  } catch (s) {
    return _l(
      !1,
      `The URL path "${f}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${s}).`
    ), f;
  }
}
function ee(f, s) {
  if (s === "/") return f;
  if (!f.toLowerCase().startsWith(s.toLowerCase()))
    return null;
  let o = s.endsWith("/") ? s.length - 1 : s.length, r = f.charAt(o);
  return r && r !== "/" ? null : f.slice(o) || "/";
}
var vv = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, gv = (f) => vv.test(f);
function pv(f, s = "/") {
  let {
    pathname: o,
    search: r = "",
    hash: g = ""
  } = typeof f == "string" ? $e(f) : f, p;
  if (o)
    if (gv(o))
      p = o;
    else {
      if (o.includes("//")) {
        let z = o;
        o = o.replace(/\/\/+/g, "/"), _l(
          !1,
          `Pathnames cannot have embedded double slashes - normalizing ${z} -> ${o}`
        );
      }
      o.startsWith("/") ? p = lm(o.substring(1), "/") : p = lm(o, s);
    }
  else
    p = s;
  return {
    pathname: p,
    search: Ev(r),
    hash: zv(g)
  };
}
function lm(f, s) {
  let o = s.replace(/\/+$/, "").split("/");
  return f.split("/").forEach((g) => {
    g === ".." ? o.length > 1 && o.pop() : g !== "." && o.push(g);
  }), o.length > 1 ? o.join("/") : "/";
}
function Nc(f, s, o, r) {
  return `Cannot include a '${f}' character in a manually specified \`to.${s}\` field [${JSON.stringify(
    r
  )}].  Please separate it out to the \`to.${o}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Sv(f) {
  return f.filter(
    (s, o) => o === 0 || s.route.path && s.route.path.length > 0
  );
}
function fm(f) {
  let s = Sv(f);
  return s.map(
    (o, r) => r === s.length - 1 ? o.pathname : o.pathnameBase
  );
}
function cm(f, s, o, r = !1) {
  let g;
  typeof f == "string" ? g = $e(f) : (g = { ...f }, Mt(
    !g.pathname || !g.pathname.includes("?"),
    Nc("?", "pathname", "search", g)
  ), Mt(
    !g.pathname || !g.pathname.includes("#"),
    Nc("#", "pathname", "hash", g)
  ), Mt(
    !g.search || !g.search.includes("#"),
    Nc("#", "search", "hash", g)
  ));
  let p = f === "" || g.pathname === "", z = p ? "/" : g.pathname, C;
  if (z == null)
    C = o;
  else {
    let _ = s.length - 1;
    if (!r && z.startsWith("..")) {
      let B = z.split("/");
      for (; B[0] === ".."; )
        B.shift(), _ -= 1;
      g.pathname = B.join("/");
    }
    C = _ >= 0 ? s[_] : "/";
  }
  let T = pv(g, C), y = z && z !== "/" && z.endsWith("/"), D = (p || z === ".") && o.endsWith("/");
  return !T.pathname.endsWith("/") && (y || D) && (T.pathname += "/"), T;
}
var le = (f) => f.join("/").replace(/\/\/+/g, "/"), bv = (f) => f.replace(/\/+$/, "").replace(/^\/*/, "/"), Ev = (f) => !f || f === "?" ? "" : f.startsWith("?") ? f : "?" + f, zv = (f) => !f || f === "#" ? "" : f.startsWith("#") ? f : "#" + f;
function Tv(f) {
  return f != null && typeof f.status == "number" && typeof f.statusText == "string" && typeof f.internal == "boolean" && "data" in f;
}
function Av(f) {
  return f.map((s) => s.route.path).filter(Boolean).join("/").replace(/\/\/*/g, "/") || "/";
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var rm = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
];
new Set(
  rm
);
var _v = [
  "GET",
  ...rm
];
new Set(_v);
var Ba = x.createContext(null);
Ba.displayName = "DataRouter";
var ii = x.createContext(null);
ii.displayName = "DataRouterState";
x.createContext(!1);
var om = x.createContext({
  isTransitioning: !1
});
om.displayName = "ViewTransition";
var Mv = x.createContext(
  /* @__PURE__ */ new Map()
);
Mv.displayName = "Fetchers";
var Ov = x.createContext(null);
Ov.displayName = "Await";
var Ul = x.createContext(
  null
);
Ul.displayName = "Navigation";
var Nu = x.createContext(
  null
);
Nu.displayName = "Location";
var Bl = x.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
Bl.displayName = "Route";
var qc = x.createContext(null);
qc.displayName = "RouteError";
function Rv(f, { relative: s } = {}) {
  Mt(
    Hu(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: o, navigator: r } = x.useContext(Ul), { hash: g, pathname: p, search: z } = Bu(f, { relative: s }), C = p;
  return o !== "/" && (C = p === "/" ? o : le([o, p])), r.createHref({ pathname: C, search: z, hash: g });
}
function Hu() {
  return x.useContext(Nu) != null;
}
function We() {
  return Mt(
    Hu(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), x.useContext(Nu).location;
}
var sm = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function dm(f) {
  x.useContext(Ul).static || x.useLayoutEffect(f);
}
function Dv() {
  let { isDataRoute: f } = x.useContext(Bl);
  return f ? Qv() : Uv();
}
function Uv() {
  Mt(
    Hu(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let f = x.useContext(Ba), { basename: s, navigator: o } = x.useContext(Ul), { matches: r } = x.useContext(Bl), { pathname: g } = We(), p = JSON.stringify(fm(r)), z = x.useRef(!1);
  return dm(() => {
    z.current = !0;
  }), x.useCallback(
    (T, y = {}) => {
      if (_l(z.current, sm), !z.current) return;
      if (typeof T == "number") {
        o.go(T);
        return;
      }
      let D = cm(
        T,
        JSON.parse(p),
        g,
        y.relative === "path"
      );
      f == null && s !== "/" && (D.pathname = D.pathname === "/" ? s : le([s, D.pathname])), (y.replace ? o.replace : o.push)(
        D,
        y.state,
        y
      );
    },
    [
      s,
      o,
      p,
      g,
      f
    ]
  );
}
x.createContext(null);
function mm() {
  let { matches: f } = x.useContext(Bl), s = f[f.length - 1];
  return s ? s.params : {};
}
function Bu(f, { relative: s } = {}) {
  let { matches: o } = x.useContext(Bl), { pathname: r } = We(), g = JSON.stringify(fm(o));
  return x.useMemo(
    () => cm(
      f,
      JSON.parse(g),
      r,
      s === "path"
    ),
    [f, g, r, s]
  );
}
function Cv(f, s) {
  return hm(f, s);
}
function hm(f, s, o, r, g) {
  var rt;
  Mt(
    Hu(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: p } = x.useContext(Ul), { matches: z } = x.useContext(Bl), C = z[z.length - 1], T = C ? C.params : {}, y = C ? C.pathname : "/", D = C ? C.pathnameBase : "/", _ = C && C.route;
  {
    let G = _ && _.path || "";
    ym(
      y,
      !_ || G.endsWith("*") || G.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${y}" (under <Route path="${G}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${G}"> to <Route path="${G === "/" ? "*" : `${G}/*`}">.`
    );
  }
  let B = We(), H;
  if (s) {
    let G = typeof s == "string" ? $e(s) : s;
    Mt(
      D === "/" || ((rt = G.pathname) == null ? void 0 : rt.startsWith(D)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${D}" but pathname "${G.pathname}" was given in the \`location\` prop.`
    ), H = G;
  } else
    H = B;
  let Y = H.pathname || "/", V = Y;
  if (D !== "/") {
    let G = D.replace(/^\//, "").split("/");
    V = "/" + Y.replace(/^\//, "").split("/").slice(G.length).join("/");
  }
  let F = um(f, { pathname: V });
  _l(
    _ || F != null,
    `No routes matched location "${H.pathname}${H.search}${H.hash}" `
  ), _l(
    F == null || F[F.length - 1].route.element !== void 0 || F[F.length - 1].route.Component !== void 0 || F[F.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${H.pathname}${H.search}${H.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  );
  let w = jv(
    F && F.map(
      (G) => Object.assign({}, G, {
        params: Object.assign({}, T, G.params),
        pathname: le([
          D,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          p.encodeLocation ? p.encodeLocation(
            G.pathname.replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : G.pathname
        ]),
        pathnameBase: G.pathnameBase === "/" ? D : le([
          D,
          // Re-encode pathnames that were decoded inside matchRoutes
          // Pre-encode `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          p.encodeLocation ? p.encodeLocation(
            G.pathnameBase.replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : G.pathnameBase
        ])
      })
    ),
    z,
    o,
    r,
    g
  );
  return s && w ? /* @__PURE__ */ x.createElement(
    Nu.Provider,
    {
      value: {
        location: {
          pathname: "/",
          search: "",
          hash: "",
          state: null,
          key: "default",
          ...H
        },
        navigationType: "POP"
        /* Pop */
      }
    },
    w
  ) : w;
}
function xv() {
  let f = Xv(), s = Tv(f) ? `${f.status} ${f.statusText}` : f instanceof Error ? f.message : JSON.stringify(f), o = f instanceof Error ? f.stack : null, r = "rgba(200,200,200, 0.5)", g = { padding: "0.5rem", backgroundColor: r }, p = { padding: "2px 4px", backgroundColor: r }, z = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    f
  ), z = /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ x.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ x.createElement("code", { style: p }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ x.createElement("code", { style: p }, "errorElement"), " prop on your route.")), /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ x.createElement("h3", { style: { fontStyle: "italic" } }, s), o ? /* @__PURE__ */ x.createElement("pre", { style: g }, o) : null, z);
}
var Nv = /* @__PURE__ */ x.createElement(xv, null), Hv = class extends x.Component {
  constructor(f) {
    super(f), this.state = {
      location: f.location,
      revalidation: f.revalidation,
      error: f.error
    };
  }
  static getDerivedStateFromError(f) {
    return { error: f };
  }
  static getDerivedStateFromProps(f, s) {
    return s.location !== f.location || s.revalidation !== "idle" && f.revalidation === "idle" ? {
      error: f.error,
      location: f.location,
      revalidation: f.revalidation
    } : {
      error: f.error !== void 0 ? f.error : s.error,
      location: s.location,
      revalidation: f.revalidation || s.revalidation
    };
  }
  componentDidCatch(f, s) {
    this.props.onError ? this.props.onError(f, s) : console.error(
      "React Router caught the following error during render",
      f
    );
  }
  render() {
    return this.state.error !== void 0 ? /* @__PURE__ */ x.createElement(Bl.Provider, { value: this.props.routeContext }, /* @__PURE__ */ x.createElement(
      qc.Provider,
      {
        value: this.state.error,
        children: this.props.component
      }
    )) : this.props.children;
  }
};
function Bv({ routeContext: f, match: s, children: o }) {
  let r = x.useContext(Ba);
  return r && r.static && r.staticContext && (s.route.errorElement || s.route.ErrorBoundary) && (r.staticContext._deepestRenderedBoundaryId = s.route.id), /* @__PURE__ */ x.createElement(Bl.Provider, { value: f }, o);
}
function jv(f, s = [], o = null, r = null, g = null) {
  if (f == null) {
    if (!o)
      return null;
    if (o.errors)
      f = o.matches;
    else if (s.length === 0 && !o.initialized && o.matches.length > 0)
      f = o.matches;
    else
      return null;
  }
  let p = f, z = o == null ? void 0 : o.errors;
  if (z != null) {
    let D = p.findIndex(
      (_) => _.route.id && (z == null ? void 0 : z[_.route.id]) !== void 0
    );
    Mt(
      D >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        z
      ).join(",")}`
    ), p = p.slice(
      0,
      Math.min(p.length, D + 1)
    );
  }
  let C = !1, T = -1;
  if (o)
    for (let D = 0; D < p.length; D++) {
      let _ = p[D];
      if ((_.route.HydrateFallback || _.route.hydrateFallbackElement) && (T = D), _.route.id) {
        let { loaderData: B, errors: H } = o, Y = _.route.loader && !B.hasOwnProperty(_.route.id) && (!H || H[_.route.id] === void 0);
        if (_.route.lazy || Y) {
          C = !0, T >= 0 ? p = p.slice(0, T + 1) : p = [p[0]];
          break;
        }
      }
    }
  let y = o && r ? (D, _) => {
    var B, H;
    r(D, {
      location: o.location,
      params: ((H = (B = o.matches) == null ? void 0 : B[0]) == null ? void 0 : H.params) ?? {},
      unstable_pattern: Av(o.matches),
      errorInfo: _
    });
  } : void 0;
  return p.reduceRight(
    (D, _, B) => {
      let H, Y = !1, V = null, F = null;
      o && (H = z && _.route.id ? z[_.route.id] : void 0, V = _.route.errorElement || Nv, C && (T < 0 && B === 0 ? (ym(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), Y = !0, F = null) : T === B && (Y = !0, F = _.route.hydrateFallbackElement || null)));
      let w = s.concat(p.slice(0, B + 1)), rt = () => {
        let G;
        return H ? G = V : Y ? G = F : _.route.Component ? G = /* @__PURE__ */ x.createElement(_.route.Component, null) : _.route.element ? G = _.route.element : G = D, /* @__PURE__ */ x.createElement(
          Bv,
          {
            match: _,
            routeContext: {
              outlet: D,
              matches: w,
              isDataRoute: o != null
            },
            children: G
          }
        );
      };
      return o && (_.route.ErrorBoundary || _.route.errorElement || B === 0) ? /* @__PURE__ */ x.createElement(
        Hv,
        {
          location: o.location,
          revalidation: o.revalidation,
          component: V,
          error: H,
          children: rt(),
          routeContext: { outlet: null, matches: w, isDataRoute: !0 },
          onError: y
        }
      ) : rt();
    },
    null
  );
}
function Yc(f) {
  return `${f} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function qv(f) {
  let s = x.useContext(Ba);
  return Mt(s, Yc(f)), s;
}
function Yv(f) {
  let s = x.useContext(ii);
  return Mt(s, Yc(f)), s;
}
function Lv(f) {
  let s = x.useContext(Bl);
  return Mt(s, Yc(f)), s;
}
function Lc(f) {
  let s = Lv(f), o = s.matches[s.matches.length - 1];
  return Mt(
    o.route.id,
    `${f} can only be used on routes that contain a unique "id"`
  ), o.route.id;
}
function Gv() {
  return Lc(
    "useRouteId"
    /* UseRouteId */
  );
}
function Xv() {
  var r;
  let f = x.useContext(qc), s = Yv(
    "useRouteError"
    /* UseRouteError */
  ), o = Lc(
    "useRouteError"
    /* UseRouteError */
  );
  return f !== void 0 ? f : (r = s.errors) == null ? void 0 : r[o];
}
function Qv() {
  let { router: f } = qv(
    "useNavigate"
    /* UseNavigateStable */
  ), s = Lc(
    "useNavigate"
    /* UseNavigateStable */
  ), o = x.useRef(!1);
  return dm(() => {
    o.current = !0;
  }), x.useCallback(
    async (g, p = {}) => {
      _l(o.current, sm), o.current && (typeof g == "number" ? await f.navigate(g) : await f.navigate(g, { fromRouteId: s, ...p }));
    },
    [f, s]
  );
}
var em = {};
function ym(f, s, o) {
  !s && !em[f] && (em[f] = !0, _l(!1, o));
}
x.memo(Zv);
function Zv({
  routes: f,
  future: s,
  state: o,
  unstable_onError: r
}) {
  return hm(f, void 0, o, r, s);
}
function Vv({
  basename: f,
  children: s,
  initialEntries: o,
  initialIndex: r,
  unstable_useTransitions: g
}) {
  let p = x.useRef();
  p.current == null && (p.current = tv({
    initialEntries: o,
    initialIndex: r,
    v5Compat: !0
  }));
  let z = p.current, [C, T] = x.useState({
    action: z.action,
    location: z.location
  }), y = x.useCallback(
    (D) => {
      g === !1 ? T(D) : x.startTransition(() => T(D));
    },
    [g]
  );
  return x.useLayoutEffect(() => z.listen(y), [z, y]), /* @__PURE__ */ x.createElement(
    Kv,
    {
      basename: f,
      children: s,
      location: C.location,
      navigationType: C.action,
      navigator: z,
      unstable_useTransitions: g === !0
    }
  );
}
function Ha(f) {
  Mt(
    !1,
    "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>."
  );
}
function Kv({
  basename: f = "/",
  children: s = null,
  location: o,
  navigationType: r = "POP",
  navigator: g,
  static: p = !1,
  unstable_useTransitions: z
}) {
  Mt(
    !Hu(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let C = f.replace(/^\/*/, "/"), T = x.useMemo(
    () => ({
      basename: C,
      navigator: g,
      static: p,
      unstable_useTransitions: z,
      future: {}
    }),
    [C, g, p, z]
  );
  typeof o == "string" && (o = $e(o));
  let {
    pathname: y = "/",
    search: D = "",
    hash: _ = "",
    state: B = null,
    key: H = "default"
  } = o, Y = x.useMemo(() => {
    let V = ee(y, C);
    return V == null ? null : {
      location: {
        pathname: V,
        search: D,
        hash: _,
        state: B,
        key: H
      },
      navigationType: r
    };
  }, [C, y, D, _, B, H, r]);
  return _l(
    Y != null,
    `<Router basename="${C}"> is not able to match the URL "${y}${D}${_}" because it does not start with the basename, so the <Router> won't render anything.`
  ), Y == null ? null : /* @__PURE__ */ x.createElement(Ul.Provider, { value: T }, /* @__PURE__ */ x.createElement(Nu.Provider, { children: s, value: Y }));
}
function Jv({
  children: f,
  location: s
}) {
  return Cv(Bc(f), s);
}
function Bc(f, s = []) {
  let o = [];
  return x.Children.forEach(f, (r, g) => {
    if (!x.isValidElement(r))
      return;
    let p = [...s, g];
    if (r.type === x.Fragment) {
      o.push.apply(
        o,
        Bc(r.props.children, p)
      );
      return;
    }
    Mt(
      r.type === Ha,
      `[${typeof r.type == "string" ? r.type : r.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
    ), Mt(
      !r.props.index || !r.props.children,
      "An index route cannot have child routes."
    );
    let z = {
      id: r.props.id || p.join("-"),
      caseSensitive: r.props.caseSensitive,
      element: r.props.element,
      Component: r.props.Component,
      index: r.props.index,
      path: r.props.path,
      middleware: r.props.middleware,
      loader: r.props.loader,
      action: r.props.action,
      hydrateFallbackElement: r.props.hydrateFallbackElement,
      HydrateFallback: r.props.HydrateFallback,
      errorElement: r.props.errorElement,
      ErrorBoundary: r.props.ErrorBoundary,
      hasErrorBoundary: r.props.hasErrorBoundary === !0 || r.props.ErrorBoundary != null || r.props.errorElement != null,
      shouldRevalidate: r.props.shouldRevalidate,
      handle: r.props.handle,
      lazy: r.props.lazy
    };
    r.props.children && (z.children = Bc(
      r.props.children,
      p
    )), o.push(z);
  }), o;
}
var ei = "get", ai = "application/x-www-form-urlencoded";
function fi(f) {
  return typeof HTMLElement < "u" && f instanceof HTMLElement;
}
function wv(f) {
  return fi(f) && f.tagName.toLowerCase() === "button";
}
function $v(f) {
  return fi(f) && f.tagName.toLowerCase() === "form";
}
function Wv(f) {
  return fi(f) && f.tagName.toLowerCase() === "input";
}
function kv(f) {
  return !!(f.metaKey || f.altKey || f.ctrlKey || f.shiftKey);
}
function Fv(f, s) {
  return f.button === 0 && // Ignore everything but left clicks
  (!s || s === "_self") && // Let browser handle "target=_blank" etc.
  !kv(f);
}
var li = null;
function Iv() {
  if (li === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), li = !1;
    } catch {
      li = !0;
    }
  return li;
}
var Pv = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function Hc(f) {
  return f != null && !Pv.has(f) ? (_l(
    !1,
    `"${f}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${ai}"`
  ), null) : f;
}
function t0(f, s) {
  let o, r, g, p, z;
  if ($v(f)) {
    let C = f.getAttribute("action");
    r = C ? ee(C, s) : null, o = f.getAttribute("method") || ei, g = Hc(f.getAttribute("enctype")) || ai, p = new FormData(f);
  } else if (wv(f) || Wv(f) && (f.type === "submit" || f.type === "image")) {
    let C = f.form;
    if (C == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let T = f.getAttribute("formaction") || C.getAttribute("action");
    if (r = T ? ee(T, s) : null, o = f.getAttribute("formmethod") || C.getAttribute("method") || ei, g = Hc(f.getAttribute("formenctype")) || Hc(C.getAttribute("enctype")) || ai, p = new FormData(C, f), !Iv()) {
      let { name: y, type: D, value: _ } = f;
      if (D === "image") {
        let B = y ? `${y}.` : "";
        p.append(`${B}x`, "0"), p.append(`${B}y`, "0");
      } else y && p.append(y, _);
    }
  } else {
    if (fi(f))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    o = ei, r = null, g = ai, z = f;
  }
  return p && g === "text/plain" && (z = p, p = void 0), { action: r, method: o.toLowerCase(), encType: g, formData: p, body: z };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function Gc(f, s) {
  if (f === !1 || f === null || typeof f > "u")
    throw new Error(s);
}
function l0(f, s, o) {
  let r = typeof f == "string" ? new URL(
    f,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : f;
  return r.pathname === "/" ? r.pathname = `_root.${o}` : s && ee(r.pathname, s) === "/" ? r.pathname = `${s.replace(/\/$/, "")}/_root.${o}` : r.pathname = `${r.pathname.replace(/\/$/, "")}.${o}`, r;
}
async function e0(f, s) {
  if (f.id in s)
    return s[f.id];
  try {
    let o = await import(
      /* @vite-ignore */
      /* webpackIgnore: true */
      f.module
    );
    return s[f.id] = o, o;
  } catch (o) {
    return console.error(
      `Error loading route module \`${f.module}\`, reloading page...`
    ), console.error(o), window.__reactRouterContext && window.__reactRouterContext.isSpaMode, window.location.reload(), new Promise(() => {
    });
  }
}
function a0(f) {
  return f == null ? !1 : f.href == null ? f.rel === "preload" && typeof f.imageSrcSet == "string" && typeof f.imageSizes == "string" : typeof f.rel == "string" && typeof f.href == "string";
}
async function u0(f, s, o) {
  let r = await Promise.all(
    f.map(async (g) => {
      let p = s.routes[g.route.id];
      if (p) {
        let z = await e0(p, o);
        return z.links ? z.links() : [];
      }
      return [];
    })
  );
  return c0(
    r.flat(1).filter(a0).filter((g) => g.rel === "stylesheet" || g.rel === "preload").map(
      (g) => g.rel === "stylesheet" ? { ...g, rel: "prefetch", as: "style" } : { ...g, rel: "prefetch" }
    )
  );
}
function am(f, s, o, r, g, p) {
  let z = (T, y) => o[y] ? T.route.id !== o[y].route.id : !0, C = (T, y) => {
    var D;
    return (
      // param change, /users/123 -> /users/456
      o[y].pathname !== T.pathname || // splat param changed, which is not present in match.path
      // e.g. /files/images/avatar.jpg -> files/finances.xls
      ((D = o[y].route.path) == null ? void 0 : D.endsWith("*")) && o[y].params["*"] !== T.params["*"]
    );
  };
  return p === "assets" ? s.filter(
    (T, y) => z(T, y) || C(T, y)
  ) : p === "data" ? s.filter((T, y) => {
    var _;
    let D = r.routes[T.route.id];
    if (!D || !D.hasLoader)
      return !1;
    if (z(T, y) || C(T, y))
      return !0;
    if (T.route.shouldRevalidate) {
      let B = T.route.shouldRevalidate({
        currentUrl: new URL(
          g.pathname + g.search + g.hash,
          window.origin
        ),
        currentParams: ((_ = o[0]) == null ? void 0 : _.params) || {},
        nextUrl: new URL(f, window.origin),
        nextParams: T.params,
        defaultShouldRevalidate: !0
      });
      if (typeof B == "boolean")
        return B;
    }
    return !0;
  }) : [];
}
function n0(f, s, { includeHydrateFallback: o } = {}) {
  return i0(
    f.map((r) => {
      let g = s.routes[r.route.id];
      if (!g) return [];
      let p = [g.module];
      return g.clientActionModule && (p = p.concat(g.clientActionModule)), g.clientLoaderModule && (p = p.concat(g.clientLoaderModule)), o && g.hydrateFallbackModule && (p = p.concat(g.hydrateFallbackModule)), g.imports && (p = p.concat(g.imports)), p;
    }).flat(1)
  );
}
function i0(f) {
  return [...new Set(f)];
}
function f0(f) {
  let s = {}, o = Object.keys(f).sort();
  for (let r of o)
    s[r] = f[r];
  return s;
}
function c0(f, s) {
  let o = /* @__PURE__ */ new Set();
  return new Set(s), f.reduce((r, g) => {
    let p = JSON.stringify(f0(g));
    return o.has(p) || (o.add(p), r.push({ key: p, link: g })), r;
  }, []);
}
function vm() {
  let f = x.useContext(Ba);
  return Gc(
    f,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), f;
}
function r0() {
  let f = x.useContext(ii);
  return Gc(
    f,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), f;
}
var Xc = x.createContext(void 0);
Xc.displayName = "FrameworkContext";
function gm() {
  let f = x.useContext(Xc);
  return Gc(
    f,
    "You must render this element inside a <HydratedRouter> element"
  ), f;
}
function o0(f, s) {
  let o = x.useContext(Xc), [r, g] = x.useState(!1), [p, z] = x.useState(!1), { onFocus: C, onBlur: T, onMouseEnter: y, onMouseLeave: D, onTouchStart: _ } = s, B = x.useRef(null);
  x.useEffect(() => {
    if (f === "render" && z(!0), f === "viewport") {
      let V = (w) => {
        w.forEach((rt) => {
          z(rt.isIntersecting);
        });
      }, F = new IntersectionObserver(V, { threshold: 0.5 });
      return B.current && F.observe(B.current), () => {
        F.disconnect();
      };
    }
  }, [f]), x.useEffect(() => {
    if (r) {
      let V = setTimeout(() => {
        z(!0);
      }, 100);
      return () => {
        clearTimeout(V);
      };
    }
  }, [r]);
  let H = () => {
    g(!0);
  }, Y = () => {
    g(!1), z(!1);
  };
  return o ? f !== "intent" ? [p, B, {}] : [
    p,
    B,
    {
      onFocus: Cu(C, H),
      onBlur: Cu(T, Y),
      onMouseEnter: Cu(y, H),
      onMouseLeave: Cu(D, Y),
      onTouchStart: Cu(_, H)
    }
  ] : [!1, B, {}];
}
function Cu(f, s) {
  return (o) => {
    f && f(o), o.defaultPrevented || s(o);
  };
}
function s0({ page: f, ...s }) {
  let { router: o } = vm(), r = x.useMemo(
    () => um(o.routes, f, o.basename),
    [o.routes, f, o.basename]
  );
  return r ? /* @__PURE__ */ x.createElement(m0, { page: f, matches: r, ...s }) : null;
}
function d0(f) {
  let { manifest: s, routeModules: o } = gm(), [r, g] = x.useState([]);
  return x.useEffect(() => {
    let p = !1;
    return u0(f, s, o).then(
      (z) => {
        p || g(z);
      }
    ), () => {
      p = !0;
    };
  }, [f, s, o]), r;
}
function m0({
  page: f,
  matches: s,
  ...o
}) {
  let r = We(), { manifest: g, routeModules: p } = gm(), { basename: z } = vm(), { loaderData: C, matches: T } = r0(), y = x.useMemo(
    () => am(
      f,
      s,
      T,
      g,
      r,
      "data"
    ),
    [f, s, T, g, r]
  ), D = x.useMemo(
    () => am(
      f,
      s,
      T,
      g,
      r,
      "assets"
    ),
    [f, s, T, g, r]
  ), _ = x.useMemo(() => {
    if (f === r.pathname + r.search + r.hash)
      return [];
    let Y = /* @__PURE__ */ new Set(), V = !1;
    if (s.forEach((w) => {
      var G;
      let rt = g.routes[w.route.id];
      !rt || !rt.hasLoader || (!y.some((bt) => bt.route.id === w.route.id) && w.route.id in C && ((G = p[w.route.id]) != null && G.shouldRevalidate) || rt.hasClientLoader ? V = !0 : Y.add(w.route.id));
    }), Y.size === 0)
      return [];
    let F = l0(f, z, "data");
    return V && Y.size > 0 && F.searchParams.set(
      "_routes",
      s.filter((w) => Y.has(w.route.id)).map((w) => w.route.id).join(",")
    ), [F.pathname + F.search];
  }, [
    z,
    C,
    r,
    g,
    y,
    s,
    f,
    p
  ]), B = x.useMemo(
    () => n0(D, g),
    [D, g]
  ), H = d0(D);
  return /* @__PURE__ */ x.createElement(x.Fragment, null, _.map((Y) => /* @__PURE__ */ x.createElement("link", { key: Y, rel: "prefetch", as: "fetch", href: Y, ...o })), B.map((Y) => /* @__PURE__ */ x.createElement("link", { key: Y, rel: "modulepreload", href: Y, ...o })), H.map(({ key: Y, link: V }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ x.createElement("link", { key: Y, nonce: o.nonce, ...V })
  )));
}
function h0(...f) {
  return (s) => {
    f.forEach((o) => {
      typeof o == "function" ? o(s) : o != null && (o.current = s);
    });
  };
}
var pm = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  pm && (window.__reactRouterVersion = // @ts-expect-error
  "7.10.1");
} catch {
}
var Sm = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, xu = x.forwardRef(
  function({
    onClick: s,
    discover: o = "render",
    prefetch: r = "none",
    relative: g,
    reloadDocument: p,
    replace: z,
    state: C,
    target: T,
    to: y,
    preventScrollReset: D,
    viewTransition: _,
    ...B
  }, H) {
    let { basename: Y, unstable_useTransitions: V } = x.useContext(Ul), F = typeof y == "string" && Sm.test(y), w, rt = !1;
    if (typeof y == "string" && F && (w = y, pm))
      try {
        let wt = new URL(window.location.href), Wt = y.startsWith("//") ? new URL(wt.protocol + y) : new URL(y), Xt = ee(Wt.pathname, Y);
        Wt.origin === wt.origin && Xt != null ? y = Xt + Wt.search + Wt.hash : rt = !0;
      } catch {
        _l(
          !1,
          `<Link to="${y}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
        );
      }
    let G = Rv(y, { relative: g }), [bt, Ot, Rt] = o0(
      r,
      B
    ), W = p0(y, {
      replace: z,
      state: C,
      target: T,
      preventScrollReset: D,
      relative: g,
      viewTransition: _,
      unstable_useTransitions: V
    });
    function qt(wt) {
      s && s(wt), wt.defaultPrevented || W(wt);
    }
    let Gt = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ x.createElement(
        "a",
        {
          ...B,
          ...Rt,
          href: w || G,
          onClick: rt || p ? s : qt,
          ref: h0(H, Ot),
          target: T,
          "data-discover": !F && o === "render" ? "true" : void 0
        }
      )
    );
    return bt && !F ? /* @__PURE__ */ x.createElement(x.Fragment, null, Gt, /* @__PURE__ */ x.createElement(s0, { page: G })) : Gt;
  }
);
xu.displayName = "Link";
var y0 = x.forwardRef(
  function({
    "aria-current": s = "page",
    caseSensitive: o = !1,
    className: r = "",
    end: g = !1,
    style: p,
    to: z,
    viewTransition: C,
    children: T,
    ...y
  }, D) {
    let _ = Bu(z, { relative: y.relative }), B = We(), H = x.useContext(ii), { navigator: Y, basename: V } = x.useContext(Ul), F = H != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    T0(_) && C === !0, w = Y.encodeLocation ? Y.encodeLocation(_).pathname : _.pathname, rt = B.pathname, G = H && H.navigation && H.navigation.location ? H.navigation.location.pathname : null;
    o || (rt = rt.toLowerCase(), G = G ? G.toLowerCase() : null, w = w.toLowerCase()), G && V && (G = ee(G, V) || G);
    const bt = w !== "/" && w.endsWith("/") ? w.length - 1 : w.length;
    let Ot = rt === w || !g && rt.startsWith(w) && rt.charAt(bt) === "/", Rt = G != null && (G === w || !g && G.startsWith(w) && G.charAt(w.length) === "/"), W = {
      isActive: Ot,
      isPending: Rt,
      isTransitioning: F
    }, qt = Ot ? s : void 0, Gt;
    typeof r == "function" ? Gt = r(W) : Gt = [
      r,
      Ot ? "active" : null,
      Rt ? "pending" : null,
      F ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let wt = typeof p == "function" ? p(W) : p;
    return /* @__PURE__ */ x.createElement(
      xu,
      {
        ...y,
        "aria-current": qt,
        className: Gt,
        ref: D,
        style: wt,
        to: z,
        viewTransition: C
      },
      typeof T == "function" ? T(W) : T
    );
  }
);
y0.displayName = "NavLink";
var v0 = x.forwardRef(
  ({
    discover: f = "render",
    fetcherKey: s,
    navigate: o,
    reloadDocument: r,
    replace: g,
    state: p,
    method: z = ei,
    action: C,
    onSubmit: T,
    relative: y,
    preventScrollReset: D,
    viewTransition: _,
    ...B
  }, H) => {
    let { unstable_useTransitions: Y } = x.useContext(Ul), V = E0(), F = z0(C, { relative: y }), w = z.toLowerCase() === "get" ? "get" : "post", rt = typeof C == "string" && Sm.test(C), G = (bt) => {
      if (T && T(bt), bt.defaultPrevented) return;
      bt.preventDefault();
      let Ot = bt.nativeEvent.submitter, Rt = (Ot == null ? void 0 : Ot.getAttribute("formmethod")) || z, W = () => V(Ot || bt.currentTarget, {
        fetcherKey: s,
        method: Rt,
        navigate: o,
        replace: g,
        state: p,
        relative: y,
        preventScrollReset: D,
        viewTransition: _
      });
      Y && o !== !1 ? x.startTransition(() => W()) : W();
    };
    return /* @__PURE__ */ x.createElement(
      "form",
      {
        ref: H,
        method: w,
        action: F,
        onSubmit: r ? T : G,
        ...B,
        "data-discover": !rt && f === "render" ? "true" : void 0
      }
    );
  }
);
v0.displayName = "Form";
function g0(f) {
  return `${f} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function bm(f) {
  let s = x.useContext(Ba);
  return Mt(s, g0(f)), s;
}
function p0(f, {
  target: s,
  replace: o,
  state: r,
  preventScrollReset: g,
  relative: p,
  viewTransition: z,
  unstable_useTransitions: C
} = {}) {
  let T = Dv(), y = We(), D = Bu(f, { relative: p });
  return x.useCallback(
    (_) => {
      if (Fv(_, s)) {
        _.preventDefault();
        let B = o !== void 0 ? o : ui(y) === ui(D), H = () => T(f, {
          replace: B,
          state: r,
          preventScrollReset: g,
          relative: p,
          viewTransition: z
        });
        C ? x.startTransition(() => H()) : H();
      }
    },
    [
      y,
      T,
      D,
      o,
      r,
      s,
      f,
      g,
      p,
      z,
      C
    ]
  );
}
var S0 = 0, b0 = () => `__${String(++S0)}__`;
function E0() {
  let { router: f } = bm(
    "useSubmit"
    /* UseSubmit */
  ), { basename: s } = x.useContext(Ul), o = Gv(), r = f.fetch, g = f.navigate;
  return x.useCallback(
    async (p, z = {}) => {
      let { action: C, method: T, encType: y, formData: D, body: _ } = t0(
        p,
        s
      );
      if (z.navigate === !1) {
        let B = z.fetcherKey || b0();
        await r(B, o, z.action || C, {
          preventScrollReset: z.preventScrollReset,
          formData: D,
          body: _,
          formMethod: z.method || T,
          formEncType: z.encType || y,
          flushSync: z.flushSync
        });
      } else
        await g(z.action || C, {
          preventScrollReset: z.preventScrollReset,
          formData: D,
          body: _,
          formMethod: z.method || T,
          formEncType: z.encType || y,
          replace: z.replace,
          state: z.state,
          fromRouteId: o,
          flushSync: z.flushSync,
          viewTransition: z.viewTransition
        });
    },
    [r, g, s, o]
  );
}
function z0(f, { relative: s } = {}) {
  let { basename: o } = x.useContext(Ul), r = x.useContext(Bl);
  Mt(r, "useFormAction must be used inside a RouteContext");
  let [g] = r.matches.slice(-1), p = { ...Bu(f || ".", { relative: s }) }, z = We();
  if (f == null) {
    p.search = z.search;
    let C = new URLSearchParams(p.search), T = C.getAll("index");
    if (T.some((D) => D === "")) {
      C.delete("index"), T.filter((_) => _).forEach((_) => C.append("index", _));
      let D = C.toString();
      p.search = D ? `?${D}` : "";
    }
  }
  return (!f || f === ".") && g.route.index && (p.search = p.search ? p.search.replace(/^\?/, "?index&") : "?index"), o !== "/" && (p.pathname = p.pathname === "/" ? o : le([o, p.pathname])), ui(p);
}
function T0(f, { relative: s } = {}) {
  let o = x.useContext(om);
  Mt(
    o != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: r } = bm(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), g = Bu(f, { relative: s });
  if (!o.isTransitioning)
    return !1;
  let p = ee(o.currentLocation.pathname, r) || o.currentLocation.pathname, z = ee(o.nextLocation.pathname, r) || o.nextLocation.pathname;
  return ni(g.pathname, z) != null || ni(g.pathname, p) != null;
}
function A0() {
  return /* @__PURE__ */ J.jsxs("div", { className: "p-8", children: [
    /* @__PURE__ */ J.jsx("h1", { className: "text-3xl font-bold text-appverse-black mb-4", children: "AppVerse Home" }),
    /* @__PURE__ */ J.jsxs("p", { className: "text-gray-600", children: [
      "Route: ",
      /* @__PURE__ */ J.jsx("code", { className: "bg-appverse-gray px-2 py-1 rounded", children: "/appverse/" })
    ] }),
    /* @__PURE__ */ J.jsx("p", { className: "mt-4 text-sm text-gray-500", children: "Featured apps and search will go here." })
  ] });
}
function _0() {
  return /* @__PURE__ */ J.jsxs("div", { className: "p-8", children: [
    /* @__PURE__ */ J.jsx("h1", { className: "text-3xl font-bold text-appverse-black mb-4", children: "Browse Apps" }),
    /* @__PURE__ */ J.jsxs("p", { className: "text-gray-600", children: [
      "Route: ",
      /* @__PURE__ */ J.jsx("code", { className: "bg-appverse-gray px-2 py-1 rounded", children: "/appverse/browse" })
    ] }),
    /* @__PURE__ */ J.jsx("p", { className: "mt-4 text-sm text-gray-500", children: "Full catalog with filters will go here." })
  ] });
}
function M0() {
  const { id: f } = mm();
  return /* @__PURE__ */ J.jsxs("div", { className: "p-8", children: [
    /* @__PURE__ */ J.jsx("h1", { className: "text-3xl font-bold text-appverse-black mb-4", children: "App Detail" }),
    /* @__PURE__ */ J.jsxs("p", { className: "text-gray-600", children: [
      "Route: ",
      /* @__PURE__ */ J.jsxs("code", { className: "bg-appverse-gray px-2 py-1 rounded", children: [
        "/appverse/apps/",
        f
      ] })
    ] }),
    /* @__PURE__ */ J.jsxs("p", { className: "mt-4", children: [
      /* @__PURE__ */ J.jsx("span", { className: "font-semibold", children: "App ID:" }),
      " ",
      /* @__PURE__ */ J.jsx("span", { className: "text-appverse-blue", children: f })
    ] }),
    /* @__PURE__ */ J.jsx("p", { className: "mt-4 text-sm text-gray-500", children: "App detail page will go here." })
  ] });
}
function O0() {
  return /* @__PURE__ */ J.jsxs("div", { className: "p-8", children: [
    /* @__PURE__ */ J.jsx("h1", { className: "text-3xl font-bold text-appverse-black mb-4", children: "Software Catalog" }),
    /* @__PURE__ */ J.jsxs("p", { className: "text-gray-600", children: [
      "Route: ",
      /* @__PURE__ */ J.jsx("code", { className: "bg-appverse-gray px-2 py-1 rounded", children: "/appverse/software" })
    ] }),
    /* @__PURE__ */ J.jsx("p", { className: "mt-4 text-sm text-gray-500", children: "Software catalog will go here." })
  ] });
}
function R0() {
  const { id: f } = mm();
  return /* @__PURE__ */ J.jsxs("div", { className: "p-8", children: [
    /* @__PURE__ */ J.jsx("h1", { className: "text-3xl font-bold text-appverse-black mb-4", children: "Software Detail" }),
    /* @__PURE__ */ J.jsxs("p", { className: "text-gray-600", children: [
      "Route: ",
      /* @__PURE__ */ J.jsxs("code", { className: "bg-appverse-gray px-2 py-1 rounded", children: [
        "/appverse/software/",
        f
      ] })
    ] }),
    /* @__PURE__ */ J.jsxs("p", { className: "mt-4", children: [
      /* @__PURE__ */ J.jsx("span", { className: "font-semibold", children: "Software ID:" }),
      " ",
      /* @__PURE__ */ J.jsx("span", { className: "text-appverse-blue", children: f })
    ] }),
    /* @__PURE__ */ J.jsx("p", { className: "mt-4 text-sm text-gray-500", children: "Software detail with all implementations will go here." })
  ] });
}
function D0() {
  return /* @__PURE__ */ J.jsxs("div", { className: "appverse-container min-h-screen bg-white", children: [
    /* @__PURE__ */ J.jsx("nav", { className: "bg-appverse-black text-white p-4", children: /* @__PURE__ */ J.jsxs("div", { className: "max-w-7xl mx-auto flex items-center gap-6", children: [
      /* @__PURE__ */ J.jsx(xu, { to: "/appverse/", className: "font-bold text-lg hover:text-appverse-pink", children: "AppVerse" }),
      /* @__PURE__ */ J.jsx(xu, { to: "/appverse/browse", className: "hover:text-appverse-gray", children: "Browse" }),
      /* @__PURE__ */ J.jsx(xu, { to: "/appverse/software", className: "hover:text-appverse-gray", children: "Software" })
    ] }) }),
    /* @__PURE__ */ J.jsx("main", { children: /* @__PURE__ */ J.jsxs(Jv, { children: [
      /* @__PURE__ */ J.jsx(Ha, { path: "/appverse/", element: /* @__PURE__ */ J.jsx(A0, {}) }),
      /* @__PURE__ */ J.jsx(Ha, { path: "/appverse/browse", element: /* @__PURE__ */ J.jsx(_0, {}) }),
      /* @__PURE__ */ J.jsx(Ha, { path: "/appverse/apps/:id", element: /* @__PURE__ */ J.jsx(M0, {}) }),
      /* @__PURE__ */ J.jsx(Ha, { path: "/appverse/software", element: /* @__PURE__ */ J.jsx(O0, {}) }),
      /* @__PURE__ */ J.jsx(Ha, { path: "/appverse/software/:id", element: /* @__PURE__ */ J.jsx(R0, {}) })
    ] }) })
  ] });
}
function U0(f, s = {}) {
  const { initialPath: o = "/appverse/" } = s, r = document.getElementById(f);
  if (!r)
    return console.error(`AppVerse: Element with id "${f}" not found`), null;
  const g = Py.createRoot(r);
  return g.render(
    /* @__PURE__ */ J.jsx(Vv, { initialEntries: [o], children: /* @__PURE__ */ J.jsx(D0, {}) })
  ), {
    unmount: () => {
      g.unmount();
    }
  };
}
export {
  D0 as AppVerseBrowser,
  U0 as default,
  U0 as mount
};
//# sourceMappingURL=appverse.es.js.map
