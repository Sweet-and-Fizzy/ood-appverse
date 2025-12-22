function qm(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var jf = { exports: {} }, Cn = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ym;
function qv() {
  if (ym) return Cn;
  ym = 1;
  var i = Symbol.for("react.transitional.element"), s = Symbol.for("react.fragment");
  function r(c, d, m) {
    var p = null;
    if (m !== void 0 && (p = "" + m), d.key !== void 0 && (p = "" + d.key), "key" in d) {
      m = {};
      for (var g in d)
        g !== "key" && (m[g] = d[g]);
    } else m = d;
    return d = m.ref, {
      $$typeof: i,
      type: c,
      key: p,
      ref: d !== void 0 ? d : null,
      props: m
    };
  }
  return Cn.Fragment = s, Cn.jsx = r, Cn.jsxs = r, Cn;
}
var pm;
function Yv() {
  return pm || (pm = 1, jf.exports = qv()), jf.exports;
}
var R = Yv(), Df = { exports: {} }, Un = {}, Cf = { exports: {} }, Uf = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var gm;
function Gv() {
  return gm || (gm = 1, (function(i) {
    function s(j, X) {
      var F = j.length;
      j.push(X);
      e: for (; 0 < F; ) {
        var ge = F - 1 >>> 1, xe = j[ge];
        if (0 < d(xe, X))
          j[ge] = X, j[F] = xe, F = ge;
        else break e;
      }
    }
    function r(j) {
      return j.length === 0 ? null : j[0];
    }
    function c(j) {
      if (j.length === 0) return null;
      var X = j[0], F = j.pop();
      if (F !== X) {
        j[0] = F;
        e: for (var ge = 0, xe = j.length, S = xe >>> 1; ge < S; ) {
          var U = 2 * (ge + 1) - 1, Q = j[U], K = U + 1, ee = j[K];
          if (0 > d(Q, F))
            K < xe && 0 > d(ee, Q) ? (j[ge] = ee, j[K] = F, ge = K) : (j[ge] = Q, j[U] = F, ge = U);
          else if (K < xe && 0 > d(ee, F))
            j[ge] = ee, j[K] = F, ge = K;
          else break e;
        }
      }
      return X;
    }
    function d(j, X) {
      var F = j.sortIndex - X.sortIndex;
      return F !== 0 ? F : j.id - X.id;
    }
    if (i.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var m = performance;
      i.unstable_now = function() {
        return m.now();
      };
    } else {
      var p = Date, g = p.now();
      i.unstable_now = function() {
        return p.now() - g;
      };
    }
    var v = [], h = [], x = 1, z = null, w = 3, Y = !1, L = !1, B = !1, H = !1, G = typeof setTimeout == "function" ? setTimeout : null, $ = typeof clearTimeout == "function" ? clearTimeout : null, q = typeof setImmediate < "u" ? setImmediate : null;
    function ne(j) {
      for (var X = r(h); X !== null; ) {
        if (X.callback === null) c(h);
        else if (X.startTime <= j)
          c(h), X.sortIndex = X.expirationTime, s(v, X);
        else break;
        X = r(h);
      }
    }
    function pe(j) {
      if (B = !1, ne(j), !L)
        if (r(v) !== null)
          L = !0, Oe || (Oe = !0, Qe());
        else {
          var X = r(h);
          X !== null && Rt(pe, X.startTime - j);
        }
    }
    var Oe = !1, P = -1, qe = 5, Xe = -1;
    function We() {
      return H ? !0 : !(i.unstable_now() - Xe < qe);
    }
    function Fe() {
      if (H = !1, Oe) {
        var j = i.unstable_now();
        Xe = j;
        var X = !0;
        try {
          e: {
            L = !1, B && (B = !1, $(P), P = -1), Y = !0;
            var F = w;
            try {
              t: {
                for (ne(j), z = r(v); z !== null && !(z.expirationTime > j && We()); ) {
                  var ge = z.callback;
                  if (typeof ge == "function") {
                    z.callback = null, w = z.priorityLevel;
                    var xe = ge(
                      z.expirationTime <= j
                    );
                    if (j = i.unstable_now(), typeof xe == "function") {
                      z.callback = xe, ne(j), X = !0;
                      break t;
                    }
                    z === r(v) && c(v), ne(j);
                  } else c(v);
                  z = r(v);
                }
                if (z !== null) X = !0;
                else {
                  var S = r(h);
                  S !== null && Rt(
                    pe,
                    S.startTime - j
                  ), X = !1;
                }
              }
              break e;
            } finally {
              z = null, w = F, Y = !1;
            }
            X = void 0;
          }
        } finally {
          X ? Qe() : Oe = !1;
        }
      }
    }
    var Qe;
    if (typeof q == "function")
      Qe = function() {
        q(Fe);
      };
    else if (typeof MessageChannel < "u") {
      var jl = new MessageChannel(), Lt = jl.port2;
      jl.port1.onmessage = Fe, Qe = function() {
        Lt.postMessage(null);
      };
    } else
      Qe = function() {
        G(Fe, 0);
      };
    function Rt(j, X) {
      P = G(function() {
        j(i.unstable_now());
      }, X);
    }
    i.unstable_IdlePriority = 5, i.unstable_ImmediatePriority = 1, i.unstable_LowPriority = 4, i.unstable_NormalPriority = 3, i.unstable_Profiling = null, i.unstable_UserBlockingPriority = 2, i.unstable_cancelCallback = function(j) {
      j.callback = null;
    }, i.unstable_forceFrameRate = function(j) {
      0 > j || 125 < j ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : qe = 0 < j ? Math.floor(1e3 / j) : 5;
    }, i.unstable_getCurrentPriorityLevel = function() {
      return w;
    }, i.unstable_next = function(j) {
      switch (w) {
        case 1:
        case 2:
        case 3:
          var X = 3;
          break;
        default:
          X = w;
      }
      var F = w;
      w = X;
      try {
        return j();
      } finally {
        w = F;
      }
    }, i.unstable_requestPaint = function() {
      H = !0;
    }, i.unstable_runWithPriority = function(j, X) {
      switch (j) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          j = 3;
      }
      var F = w;
      w = j;
      try {
        return X();
      } finally {
        w = F;
      }
    }, i.unstable_scheduleCallback = function(j, X, F) {
      var ge = i.unstable_now();
      switch (typeof F == "object" && F !== null ? (F = F.delay, F = typeof F == "number" && 0 < F ? ge + F : ge) : F = ge, j) {
        case 1:
          var xe = -1;
          break;
        case 2:
          xe = 250;
          break;
        case 5:
          xe = 1073741823;
          break;
        case 4:
          xe = 1e4;
          break;
        default:
          xe = 5e3;
      }
      return xe = F + xe, j = {
        id: x++,
        callback: X,
        priorityLevel: j,
        startTime: F,
        expirationTime: xe,
        sortIndex: -1
      }, F > ge ? (j.sortIndex = F, s(h, j), r(v) === null && j === r(h) && (B ? ($(P), P = -1) : B = !0, Rt(pe, F - ge))) : (j.sortIndex = xe, s(v, j), L || Y || (L = !0, Oe || (Oe = !0, Qe()))), j;
    }, i.unstable_shouldYield = We, i.unstable_wrapCallback = function(j) {
      var X = w;
      return function() {
        var F = w;
        w = X;
        try {
          return j.apply(this, arguments);
        } finally {
          w = F;
        }
      };
    };
  })(Uf)), Uf;
}
var bm;
function Xv() {
  return bm || (bm = 1, Cf.exports = Gv()), Cf.exports;
}
var wf = { exports: {} }, I = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Sm;
function Qv() {
  if (Sm) return I;
  Sm = 1;
  var i = Symbol.for("react.transitional.element"), s = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), c = Symbol.for("react.strict_mode"), d = Symbol.for("react.profiler"), m = Symbol.for("react.consumer"), p = Symbol.for("react.context"), g = Symbol.for("react.forward_ref"), v = Symbol.for("react.suspense"), h = Symbol.for("react.memo"), x = Symbol.for("react.lazy"), z = Symbol.for("react.activity"), w = Symbol.iterator;
  function Y(S) {
    return S === null || typeof S != "object" ? null : (S = w && S[w] || S["@@iterator"], typeof S == "function" ? S : null);
  }
  var L = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, B = Object.assign, H = {};
  function G(S, U, Q) {
    this.props = S, this.context = U, this.refs = H, this.updater = Q || L;
  }
  G.prototype.isReactComponent = {}, G.prototype.setState = function(S, U) {
    if (typeof S != "object" && typeof S != "function" && S != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, S, U, "setState");
  }, G.prototype.forceUpdate = function(S) {
    this.updater.enqueueForceUpdate(this, S, "forceUpdate");
  };
  function $() {
  }
  $.prototype = G.prototype;
  function q(S, U, Q) {
    this.props = S, this.context = U, this.refs = H, this.updater = Q || L;
  }
  var ne = q.prototype = new $();
  ne.constructor = q, B(ne, G.prototype), ne.isPureReactComponent = !0;
  var pe = Array.isArray;
  function Oe() {
  }
  var P = { H: null, A: null, T: null, S: null }, qe = Object.prototype.hasOwnProperty;
  function Xe(S, U, Q) {
    var K = Q.ref;
    return {
      $$typeof: i,
      type: S,
      key: U,
      ref: K !== void 0 ? K : null,
      props: Q
    };
  }
  function We(S, U) {
    return Xe(S.type, U, S.props);
  }
  function Fe(S) {
    return typeof S == "object" && S !== null && S.$$typeof === i;
  }
  function Qe(S) {
    var U = { "=": "=0", ":": "=2" };
    return "$" + S.replace(/[=:]/g, function(Q) {
      return U[Q];
    });
  }
  var jl = /\/+/g;
  function Lt(S, U) {
    return typeof S == "object" && S !== null && S.key != null ? Qe("" + S.key) : U.toString(36);
  }
  function Rt(S) {
    switch (S.status) {
      case "fulfilled":
        return S.value;
      case "rejected":
        throw S.reason;
      default:
        switch (typeof S.status == "string" ? S.then(Oe, Oe) : (S.status = "pending", S.then(
          function(U) {
            S.status === "pending" && (S.status = "fulfilled", S.value = U);
          },
          function(U) {
            S.status === "pending" && (S.status = "rejected", S.reason = U);
          }
        )), S.status) {
          case "fulfilled":
            return S.value;
          case "rejected":
            throw S.reason;
        }
    }
    throw S;
  }
  function j(S, U, Q, K, ee) {
    var ue = typeof S;
    (ue === "undefined" || ue === "boolean") && (S = null);
    var he = !1;
    if (S === null) he = !0;
    else
      switch (ue) {
        case "bigint":
        case "string":
        case "number":
          he = !0;
          break;
        case "object":
          switch (S.$$typeof) {
            case i:
            case s:
              he = !0;
              break;
            case x:
              return he = S._init, j(
                he(S._payload),
                U,
                Q,
                K,
                ee
              );
          }
      }
    if (he)
      return ee = ee(S), he = K === "" ? "." + Lt(S, 0) : K, pe(ee) ? (Q = "", he != null && (Q = he.replace(jl, "$&/") + "/"), j(ee, U, Q, "", function(qa) {
        return qa;
      })) : ee != null && (Fe(ee) && (ee = We(
        ee,
        Q + (ee.key == null || S && S.key === ee.key ? "" : ("" + ee.key).replace(
          jl,
          "$&/"
        ) + "/") + he
      )), U.push(ee)), 1;
    he = 0;
    var Pe = K === "" ? "." : K + ":";
    if (pe(S))
      for (var je = 0; je < S.length; je++)
        K = S[je], ue = Pe + Lt(K, je), he += j(
          K,
          U,
          Q,
          ue,
          ee
        );
    else if (je = Y(S), typeof je == "function")
      for (S = je.call(S), je = 0; !(K = S.next()).done; )
        K = K.value, ue = Pe + Lt(K, je++), he += j(
          K,
          U,
          Q,
          ue,
          ee
        );
    else if (ue === "object") {
      if (typeof S.then == "function")
        return j(
          Rt(S),
          U,
          Q,
          K,
          ee
        );
      throw U = String(S), Error(
        "Objects are not valid as a React child (found: " + (U === "[object Object]" ? "object with keys {" + Object.keys(S).join(", ") + "}" : U) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return he;
  }
  function X(S, U, Q) {
    if (S == null) return S;
    var K = [], ee = 0;
    return j(S, K, "", "", function(ue) {
      return U.call(Q, ue, ee++);
    }), K;
  }
  function F(S) {
    if (S._status === -1) {
      var U = S._result;
      U = U(), U.then(
        function(Q) {
          (S._status === 0 || S._status === -1) && (S._status = 1, S._result = Q);
        },
        function(Q) {
          (S._status === 0 || S._status === -1) && (S._status = 2, S._result = Q);
        }
      ), S._status === -1 && (S._status = 0, S._result = U);
    }
    if (S._status === 1) return S._result.default;
    throw S._result;
  }
  var ge = typeof reportError == "function" ? reportError : function(S) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var U = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof S == "object" && S !== null && typeof S.message == "string" ? String(S.message) : String(S),
        error: S
      });
      if (!window.dispatchEvent(U)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", S);
      return;
    }
    console.error(S);
  }, xe = {
    map: X,
    forEach: function(S, U, Q) {
      X(
        S,
        function() {
          U.apply(this, arguments);
        },
        Q
      );
    },
    count: function(S) {
      var U = 0;
      return X(S, function() {
        U++;
      }), U;
    },
    toArray: function(S) {
      return X(S, function(U) {
        return U;
      }) || [];
    },
    only: function(S) {
      if (!Fe(S))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return S;
    }
  };
  return I.Activity = z, I.Children = xe, I.Component = G, I.Fragment = r, I.Profiler = d, I.PureComponent = q, I.StrictMode = c, I.Suspense = v, I.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = P, I.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(S) {
      return P.H.useMemoCache(S);
    }
  }, I.cache = function(S) {
    return function() {
      return S.apply(null, arguments);
    };
  }, I.cacheSignal = function() {
    return null;
  }, I.cloneElement = function(S, U, Q) {
    if (S == null)
      throw Error(
        "The argument must be a React element, but you passed " + S + "."
      );
    var K = B({}, S.props), ee = S.key;
    if (U != null)
      for (ue in U.key !== void 0 && (ee = "" + U.key), U)
        !qe.call(U, ue) || ue === "key" || ue === "__self" || ue === "__source" || ue === "ref" && U.ref === void 0 || (K[ue] = U[ue]);
    var ue = arguments.length - 2;
    if (ue === 1) K.children = Q;
    else if (1 < ue) {
      for (var he = Array(ue), Pe = 0; Pe < ue; Pe++)
        he[Pe] = arguments[Pe + 2];
      K.children = he;
    }
    return Xe(S.type, ee, K);
  }, I.createContext = function(S) {
    return S = {
      $$typeof: p,
      _currentValue: S,
      _currentValue2: S,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, S.Provider = S, S.Consumer = {
      $$typeof: m,
      _context: S
    }, S;
  }, I.createElement = function(S, U, Q) {
    var K, ee = {}, ue = null;
    if (U != null)
      for (K in U.key !== void 0 && (ue = "" + U.key), U)
        qe.call(U, K) && K !== "key" && K !== "__self" && K !== "__source" && (ee[K] = U[K]);
    var he = arguments.length - 2;
    if (he === 1) ee.children = Q;
    else if (1 < he) {
      for (var Pe = Array(he), je = 0; je < he; je++)
        Pe[je] = arguments[je + 2];
      ee.children = Pe;
    }
    if (S && S.defaultProps)
      for (K in he = S.defaultProps, he)
        ee[K] === void 0 && (ee[K] = he[K]);
    return Xe(S, ue, ee);
  }, I.createRef = function() {
    return { current: null };
  }, I.forwardRef = function(S) {
    return { $$typeof: g, render: S };
  }, I.isValidElement = Fe, I.lazy = function(S) {
    return {
      $$typeof: x,
      _payload: { _status: -1, _result: S },
      _init: F
    };
  }, I.memo = function(S, U) {
    return {
      $$typeof: h,
      type: S,
      compare: U === void 0 ? null : U
    };
  }, I.startTransition = function(S) {
    var U = P.T, Q = {};
    P.T = Q;
    try {
      var K = S(), ee = P.S;
      ee !== null && ee(Q, K), typeof K == "object" && K !== null && typeof K.then == "function" && K.then(Oe, ge);
    } catch (ue) {
      ge(ue);
    } finally {
      U !== null && Q.types !== null && (U.types = Q.types), P.T = U;
    }
  }, I.unstable_useCacheRefresh = function() {
    return P.H.useCacheRefresh();
  }, I.use = function(S) {
    return P.H.use(S);
  }, I.useActionState = function(S, U, Q) {
    return P.H.useActionState(S, U, Q);
  }, I.useCallback = function(S, U) {
    return P.H.useCallback(S, U);
  }, I.useContext = function(S) {
    return P.H.useContext(S);
  }, I.useDebugValue = function() {
  }, I.useDeferredValue = function(S, U) {
    return P.H.useDeferredValue(S, U);
  }, I.useEffect = function(S, U) {
    return P.H.useEffect(S, U);
  }, I.useEffectEvent = function(S) {
    return P.H.useEffectEvent(S);
  }, I.useId = function() {
    return P.H.useId();
  }, I.useImperativeHandle = function(S, U, Q) {
    return P.H.useImperativeHandle(S, U, Q);
  }, I.useInsertionEffect = function(S, U) {
    return P.H.useInsertionEffect(S, U);
  }, I.useLayoutEffect = function(S, U) {
    return P.H.useLayoutEffect(S, U);
  }, I.useMemo = function(S, U) {
    return P.H.useMemo(S, U);
  }, I.useOptimistic = function(S, U) {
    return P.H.useOptimistic(S, U);
  }, I.useReducer = function(S, U, Q) {
    return P.H.useReducer(S, U, Q);
  }, I.useRef = function(S) {
    return P.H.useRef(S);
  }, I.useState = function(S) {
    return P.H.useState(S);
  }, I.useSyncExternalStore = function(S, U, Q) {
    return P.H.useSyncExternalStore(
      S,
      U,
      Q
    );
  }, I.useTransition = function() {
    return P.H.useTransition();
  }, I.version = "19.2.3", I;
}
var Em;
function ar() {
  return Em || (Em = 1, wf.exports = Qv()), wf.exports;
}
var Hf = { exports: {} }, ke = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var xm;
function Zv() {
  if (xm) return ke;
  xm = 1;
  var i = ar();
  function s(v) {
    var h = "https://react.dev/errors/" + v;
    if (1 < arguments.length) {
      h += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var x = 2; x < arguments.length; x++)
        h += "&args[]=" + encodeURIComponent(arguments[x]);
    }
    return "Minified React error #" + v + "; visit " + h + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function r() {
  }
  var c = {
    d: {
      f: r,
      r: function() {
        throw Error(s(522));
      },
      D: r,
      C: r,
      L: r,
      m: r,
      X: r,
      S: r,
      M: r
    },
    p: 0,
    findDOMNode: null
  }, d = Symbol.for("react.portal");
  function m(v, h, x) {
    var z = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: d,
      key: z == null ? null : "" + z,
      children: v,
      containerInfo: h,
      implementation: x
    };
  }
  var p = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function g(v, h) {
    if (v === "font") return "";
    if (typeof h == "string")
      return h === "use-credentials" ? h : "";
  }
  return ke.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = c, ke.createPortal = function(v, h) {
    var x = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!h || h.nodeType !== 1 && h.nodeType !== 9 && h.nodeType !== 11)
      throw Error(s(299));
    return m(v, h, null, x);
  }, ke.flushSync = function(v) {
    var h = p.T, x = c.p;
    try {
      if (p.T = null, c.p = 2, v) return v();
    } finally {
      p.T = h, c.p = x, c.d.f();
    }
  }, ke.preconnect = function(v, h) {
    typeof v == "string" && (h ? (h = h.crossOrigin, h = typeof h == "string" ? h === "use-credentials" ? h : "" : void 0) : h = null, c.d.C(v, h));
  }, ke.prefetchDNS = function(v) {
    typeof v == "string" && c.d.D(v);
  }, ke.preinit = function(v, h) {
    if (typeof v == "string" && h && typeof h.as == "string") {
      var x = h.as, z = g(x, h.crossOrigin), w = typeof h.integrity == "string" ? h.integrity : void 0, Y = typeof h.fetchPriority == "string" ? h.fetchPriority : void 0;
      x === "style" ? c.d.S(
        v,
        typeof h.precedence == "string" ? h.precedence : void 0,
        {
          crossOrigin: z,
          integrity: w,
          fetchPriority: Y
        }
      ) : x === "script" && c.d.X(v, {
        crossOrigin: z,
        integrity: w,
        fetchPriority: Y,
        nonce: typeof h.nonce == "string" ? h.nonce : void 0
      });
    }
  }, ke.preinitModule = function(v, h) {
    if (typeof v == "string")
      if (typeof h == "object" && h !== null) {
        if (h.as == null || h.as === "script") {
          var x = g(
            h.as,
            h.crossOrigin
          );
          c.d.M(v, {
            crossOrigin: x,
            integrity: typeof h.integrity == "string" ? h.integrity : void 0,
            nonce: typeof h.nonce == "string" ? h.nonce : void 0
          });
        }
      } else h == null && c.d.M(v);
  }, ke.preload = function(v, h) {
    if (typeof v == "string" && typeof h == "object" && h !== null && typeof h.as == "string") {
      var x = h.as, z = g(x, h.crossOrigin);
      c.d.L(v, x, {
        crossOrigin: z,
        integrity: typeof h.integrity == "string" ? h.integrity : void 0,
        nonce: typeof h.nonce == "string" ? h.nonce : void 0,
        type: typeof h.type == "string" ? h.type : void 0,
        fetchPriority: typeof h.fetchPriority == "string" ? h.fetchPriority : void 0,
        referrerPolicy: typeof h.referrerPolicy == "string" ? h.referrerPolicy : void 0,
        imageSrcSet: typeof h.imageSrcSet == "string" ? h.imageSrcSet : void 0,
        imageSizes: typeof h.imageSizes == "string" ? h.imageSizes : void 0,
        media: typeof h.media == "string" ? h.media : void 0
      });
    }
  }, ke.preloadModule = function(v, h) {
    if (typeof v == "string")
      if (h) {
        var x = g(h.as, h.crossOrigin);
        c.d.m(v, {
          as: typeof h.as == "string" && h.as !== "script" ? h.as : void 0,
          crossOrigin: x,
          integrity: typeof h.integrity == "string" ? h.integrity : void 0
        });
      } else c.d.m(v);
  }, ke.requestFormReset = function(v) {
    c.d.r(v);
  }, ke.unstable_batchedUpdates = function(v, h) {
    return v(h);
  }, ke.useFormState = function(v, h, x) {
    return p.H.useFormState(v, h, x);
  }, ke.useFormStatus = function() {
    return p.H.useHostTransitionStatus();
  }, ke.version = "19.2.3", ke;
}
var zm;
function Vv() {
  if (zm) return Hf.exports;
  zm = 1;
  function i() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i);
      } catch (s) {
        console.error(s);
      }
  }
  return i(), Hf.exports = Zv(), Hf.exports;
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
var Tm;
function Kv() {
  if (Tm) return Un;
  Tm = 1;
  var i = Xv(), s = ar(), r = Vv();
  function c(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++)
        t += "&args[]=" + encodeURIComponent(arguments[l]);
    }
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function d(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function m(e) {
    var t = e, l = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do
        t = e, (t.flags & 4098) !== 0 && (l = t.return), e = t.return;
      while (e);
    }
    return t.tag === 3 ? l : null;
  }
  function p(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function g(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function v(e) {
    if (m(e) !== e)
      throw Error(c(188));
  }
  function h(e) {
    var t = e.alternate;
    if (!t) {
      if (t = m(e), t === null) throw Error(c(188));
      return t !== e ? null : e;
    }
    for (var l = e, a = t; ; ) {
      var n = l.return;
      if (n === null) break;
      var u = n.alternate;
      if (u === null) {
        if (a = n.return, a !== null) {
          l = a;
          continue;
        }
        break;
      }
      if (n.child === u.child) {
        for (u = n.child; u; ) {
          if (u === l) return v(n), e;
          if (u === a) return v(n), t;
          u = u.sibling;
        }
        throw Error(c(188));
      }
      if (l.return !== a.return) l = n, a = u;
      else {
        for (var f = !1, o = n.child; o; ) {
          if (o === l) {
            f = !0, l = n, a = u;
            break;
          }
          if (o === a) {
            f = !0, a = n, l = u;
            break;
          }
          o = o.sibling;
        }
        if (!f) {
          for (o = u.child; o; ) {
            if (o === l) {
              f = !0, l = u, a = n;
              break;
            }
            if (o === a) {
              f = !0, a = u, l = n;
              break;
            }
            o = o.sibling;
          }
          if (!f) throw Error(c(189));
        }
      }
      if (l.alternate !== a) throw Error(c(190));
    }
    if (l.tag !== 3) throw Error(c(188));
    return l.stateNode.current === l ? e : t;
  }
  function x(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (t = x(e), t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var z = Object.assign, w = Symbol.for("react.element"), Y = Symbol.for("react.transitional.element"), L = Symbol.for("react.portal"), B = Symbol.for("react.fragment"), H = Symbol.for("react.strict_mode"), G = Symbol.for("react.profiler"), $ = Symbol.for("react.consumer"), q = Symbol.for("react.context"), ne = Symbol.for("react.forward_ref"), pe = Symbol.for("react.suspense"), Oe = Symbol.for("react.suspense_list"), P = Symbol.for("react.memo"), qe = Symbol.for("react.lazy"), Xe = Symbol.for("react.activity"), We = Symbol.for("react.memo_cache_sentinel"), Fe = Symbol.iterator;
  function Qe(e) {
    return e === null || typeof e != "object" ? null : (e = Fe && e[Fe] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var jl = Symbol.for("react.client.reference");
  function Lt(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === jl ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case B:
        return "Fragment";
      case G:
        return "Profiler";
      case H:
        return "StrictMode";
      case pe:
        return "Suspense";
      case Oe:
        return "SuspenseList";
      case Xe:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case L:
          return "Portal";
        case q:
          return e.displayName || "Context";
        case $:
          return (e._context.displayName || "Context") + ".Consumer";
        case ne:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case P:
          return t = e.displayName || null, t !== null ? t : Lt(e.type) || "Memo";
        case qe:
          t = e._payload, e = e._init;
          try {
            return Lt(e(t));
          } catch {
          }
      }
    return null;
  }
  var Rt = Array.isArray, j = s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, X = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, F = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ge = [], xe = -1;
  function S(e) {
    return { current: e };
  }
  function U(e) {
    0 > xe || (e.current = ge[xe], ge[xe] = null, xe--);
  }
  function Q(e, t) {
    xe++, ge[xe] = e.current, e.current = t;
  }
  var K = S(null), ee = S(null), ue = S(null), he = S(null);
  function Pe(e, t) {
    switch (Q(ue, t), Q(ee, e), Q(K, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? qd(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = qd(t), e = Yd(t, e);
        else
          switch (e) {
            case "svg":
              e = 1;
              break;
            case "math":
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    U(K), Q(K, e);
  }
  function je() {
    U(K), U(ee), U(ue);
  }
  function qa(e) {
    e.memoizedState !== null && Q(he, e);
    var t = K.current, l = Yd(t, e.type);
    t !== l && (Q(ee, e), Q(K, l));
  }
  function Yn(e) {
    ee.current === e && (U(K), U(ee)), he.current === e && (U(he), Rn._currentValue = F);
  }
  var di, hr;
  function Dl(e) {
    if (di === void 0)
      try {
        throw Error();
      } catch (l) {
        var t = l.stack.trim().match(/\n( *(at )?)/);
        di = t && t[1] || "", hr = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + di + e + hr;
  }
  var mi = !1;
  function hi(e, t) {
    if (!e || mi) return "";
    mi = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var C = function() {
                throw Error();
              };
              if (Object.defineProperty(C.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(C, []);
                } catch (N) {
                  var O = N;
                }
                Reflect.construct(e, [], C);
              } else {
                try {
                  C.call();
                } catch (N) {
                  O = N;
                }
                e.call(C.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (N) {
                O = N;
              }
              (C = e()) && typeof C.catch == "function" && C.catch(function() {
              });
            }
          } catch (N) {
            if (N && O && typeof N.stack == "string")
              return [N.stack, O.stack];
          }
          return [null, null];
        }
      };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var n = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        "name"
      );
      n && n.configurable && Object.defineProperty(
        a.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var u = a.DetermineComponentFrameRoot(), f = u[0], o = u[1];
      if (f && o) {
        var y = f.split(`
`), _ = o.split(`
`);
        for (n = a = 0; a < y.length && !y[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; n < _.length && !_[n].includes(
          "DetermineComponentFrameRoot"
        ); )
          n++;
        if (a === y.length || n === _.length)
          for (a = y.length - 1, n = _.length - 1; 1 <= a && 0 <= n && y[a] !== _[n]; )
            n--;
        for (; 1 <= a && 0 <= n; a--, n--)
          if (y[a] !== _[n]) {
            if (a !== 1 || n !== 1)
              do
                if (a--, n--, 0 > n || y[a] !== _[n]) {
                  var M = `
` + y[a].replace(" at new ", " at ");
                  return e.displayName && M.includes("<anonymous>") && (M = M.replace("<anonymous>", e.displayName)), M;
                }
              while (1 <= a && 0 <= n);
            break;
          }
      }
    } finally {
      mi = !1, Error.prepareStackTrace = l;
    }
    return (l = e ? e.displayName || e.name : "") ? Dl(l) : "";
  }
  function yh(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Dl(e.type);
      case 16:
        return Dl("Lazy");
      case 13:
        return e.child !== t && t !== null ? Dl("Suspense Fallback") : Dl("Suspense");
      case 19:
        return Dl("SuspenseList");
      case 0:
      case 15:
        return hi(e.type, !1);
      case 11:
        return hi(e.type.render, !1);
      case 1:
        return hi(e.type, !0);
      case 31:
        return Dl("Activity");
      default:
        return "";
    }
  }
  function vr(e) {
    try {
      var t = "", l = null;
      do
        t += yh(e, l), l = e, e = e.return;
      while (e);
      return t;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var vi = Object.prototype.hasOwnProperty, yi = i.unstable_scheduleCallback, pi = i.unstable_cancelCallback, ph = i.unstable_shouldYield, gh = i.unstable_requestPaint, ct = i.unstable_now, bh = i.unstable_getCurrentPriorityLevel, yr = i.unstable_ImmediatePriority, pr = i.unstable_UserBlockingPriority, Gn = i.unstable_NormalPriority, Sh = i.unstable_LowPriority, gr = i.unstable_IdlePriority, Eh = i.log, xh = i.unstable_setDisableYieldValue, Ya = null, ft = null;
  function il(e) {
    if (typeof Eh == "function" && xh(e), ft && typeof ft.setStrictMode == "function")
      try {
        ft.setStrictMode(Ya, e);
      } catch {
      }
  }
  var rt = Math.clz32 ? Math.clz32 : _h, zh = Math.log, Th = Math.LN2;
  function _h(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (zh(e) / Th | 0) | 0;
  }
  var Xn = 256, Qn = 262144, Zn = 4194304;
  function Cl(e) {
    var t = e & 42;
    if (t !== 0) return t;
    switch (e & -e) {
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
        return e & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
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
        return e;
    }
  }
  function Vn(e, t, l) {
    var a = e.pendingLanes;
    if (a === 0) return 0;
    var n = 0, u = e.suspendedLanes, f = e.pingedLanes;
    e = e.warmLanes;
    var o = a & 134217727;
    return o !== 0 ? (a = o & ~u, a !== 0 ? n = Cl(a) : (f &= o, f !== 0 ? n = Cl(f) : l || (l = o & ~e, l !== 0 && (n = Cl(l))))) : (o = a & ~u, o !== 0 ? n = Cl(o) : f !== 0 ? n = Cl(f) : l || (l = a & ~e, l !== 0 && (n = Cl(l)))), n === 0 ? 0 : t !== 0 && t !== n && (t & u) === 0 && (u = n & -n, l = t & -t, u >= l || u === 32 && (l & 4194048) !== 0) ? t : n;
  }
  function Ga(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Oh(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
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
        return t + 5e3;
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
  function br() {
    var e = Zn;
    return Zn <<= 1, (Zn & 62914560) === 0 && (Zn = 4194304), e;
  }
  function gi(e) {
    for (var t = [], l = 0; 31 > l; l++) t.push(e);
    return t;
  }
  function Xa(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function Ah(e, t, l, a, n, u) {
    var f = e.pendingLanes;
    e.pendingLanes = l, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= l, e.entangledLanes &= l, e.errorRecoveryDisabledLanes &= l, e.shellSuspendCounter = 0;
    var o = e.entanglements, y = e.expirationTimes, _ = e.hiddenUpdates;
    for (l = f & ~l; 0 < l; ) {
      var M = 31 - rt(l), C = 1 << M;
      o[M] = 0, y[M] = -1;
      var O = _[M];
      if (O !== null)
        for (_[M] = null, M = 0; M < O.length; M++) {
          var N = O[M];
          N !== null && (N.lane &= -536870913);
        }
      l &= ~C;
    }
    a !== 0 && Sr(e, a, 0), u !== 0 && n === 0 && e.tag !== 0 && (e.suspendedLanes |= u & ~(f & ~t));
  }
  function Sr(e, t, l) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var a = 31 - rt(t);
    e.entangledLanes |= t, e.entanglements[a] = e.entanglements[a] | 1073741824 | l & 261930;
  }
  function Er(e, t) {
    var l = e.entangledLanes |= t;
    for (e = e.entanglements; l; ) {
      var a = 31 - rt(l), n = 1 << a;
      n & t | e[a] & t && (e[a] |= t), l &= ~n;
    }
  }
  function xr(e, t) {
    var l = t & -t;
    return l = (l & 42) !== 0 ? 1 : bi(l), (l & (e.suspendedLanes | t)) !== 0 ? 0 : l;
  }
  function bi(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
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
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function Si(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function zr() {
    var e = X.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : rm(e.type));
  }
  function Tr(e, t) {
    var l = X.p;
    try {
      return X.p = e, t();
    } finally {
      X.p = l;
    }
  }
  var cl = Math.random().toString(36).slice(2), Ze = "__reactFiber$" + cl, et = "__reactProps$" + cl, Fl = "__reactContainer$" + cl, Ei = "__reactEvents$" + cl, Nh = "__reactListeners$" + cl, Rh = "__reactHandles$" + cl, _r = "__reactResources$" + cl, Qa = "__reactMarker$" + cl;
  function xi(e) {
    delete e[Ze], delete e[et], delete e[Ei], delete e[Nh], delete e[Rh];
  }
  function Pl(e) {
    var t = e[Ze];
    if (t) return t;
    for (var l = e.parentNode; l; ) {
      if (t = l[Fl] || l[Ze]) {
        if (l = t.alternate, t.child !== null || l !== null && l.child !== null)
          for (e = Jd(e); e !== null; ) {
            if (l = e[Ze]) return l;
            e = Jd(e);
          }
        return t;
      }
      e = l, l = e.parentNode;
    }
    return null;
  }
  function Il(e) {
    if (e = e[Ze] || e[Fl]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function Za(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(c(33));
  }
  function ea(e) {
    var t = e[_r];
    return t || (t = e[_r] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function Ye(e) {
    e[Qa] = !0;
  }
  var Or = /* @__PURE__ */ new Set(), Ar = {};
  function Ul(e, t) {
    ta(e, t), ta(e + "Capture", t);
  }
  function ta(e, t) {
    for (Ar[e] = t, e = 0; e < t.length; e++)
      Or.add(t[e]);
  }
  var Mh = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Nr = {}, Rr = {};
  function jh(e) {
    return vi.call(Rr, e) ? !0 : vi.call(Nr, e) ? !1 : Mh.test(e) ? Rr[e] = !0 : (Nr[e] = !0, !1);
  }
  function Kn(e, t, l) {
    if (jh(t))
      if (l === null) e.removeAttribute(t);
      else {
        switch (typeof l) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var a = t.toLowerCase().slice(0, 5);
            if (a !== "data-" && a !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, "" + l);
      }
  }
  function Jn(e, t, l) {
    if (l === null) e.removeAttribute(t);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, "" + l);
    }
  }
  function qt(e, t, l, a) {
    if (a === null) e.removeAttribute(l);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(l);
          return;
      }
      e.setAttributeNS(t, l, "" + a);
    }
  }
  function gt(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function Mr(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Dh(e, t, l) {
    var a = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      t
    );
    if (!e.hasOwnProperty(t) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
      var n = a.get, u = a.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return n.call(this);
        },
        set: function(f) {
          l = "" + f, u.call(this, f);
        }
      }), Object.defineProperty(e, t, {
        enumerable: a.enumerable
      }), {
        getValue: function() {
          return l;
        },
        setValue: function(f) {
          l = "" + f;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[t];
        }
      };
    }
  }
  function zi(e) {
    if (!e._valueTracker) {
      var t = Mr(e) ? "checked" : "value";
      e._valueTracker = Dh(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function jr(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var l = t.getValue(), a = "";
    return e && (a = Mr(e) ? e.checked ? "true" : "false" : e.value), e = a, e !== l ? (t.setValue(e), !0) : !1;
  }
  function $n(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Ch = /[\n"\\]/g;
  function bt(e) {
    return e.replace(
      Ch,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Ti(e, t, l, a, n, u, f, o) {
    e.name = "", f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" ? e.type = f : e.removeAttribute("type"), t != null ? f === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + gt(t)) : e.value !== "" + gt(t) && (e.value = "" + gt(t)) : f !== "submit" && f !== "reset" || e.removeAttribute("value"), t != null ? _i(e, f, gt(t)) : l != null ? _i(e, f, gt(l)) : a != null && e.removeAttribute("value"), n == null && u != null && (e.defaultChecked = !!u), n != null && (e.checked = n && typeof n != "function" && typeof n != "symbol"), o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.name = "" + gt(o) : e.removeAttribute("name");
  }
  function Dr(e, t, l, a, n, u, f, o) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (e.type = u), t != null || l != null) {
      if (!(u !== "submit" && u !== "reset" || t != null)) {
        zi(e);
        return;
      }
      l = l != null ? "" + gt(l) : "", t = t != null ? "" + gt(t) : l, o || t === e.value || (e.value = t), e.defaultValue = t;
    }
    a = a ?? n, a = typeof a != "function" && typeof a != "symbol" && !!a, e.checked = o ? e.checked : !!a, e.defaultChecked = !!a, f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (e.name = f), zi(e);
  }
  function _i(e, t, l) {
    t === "number" && $n(e.ownerDocument) === e || e.defaultValue === "" + l || (e.defaultValue = "" + l);
  }
  function la(e, t, l, a) {
    if (e = e.options, t) {
      t = {};
      for (var n = 0; n < l.length; n++)
        t["$" + l[n]] = !0;
      for (l = 0; l < e.length; l++)
        n = t.hasOwnProperty("$" + e[l].value), e[l].selected !== n && (e[l].selected = n), n && a && (e[l].defaultSelected = !0);
    } else {
      for (l = "" + gt(l), t = null, n = 0; n < e.length; n++) {
        if (e[n].value === l) {
          e[n].selected = !0, a && (e[n].defaultSelected = !0);
          return;
        }
        t !== null || e[n].disabled || (t = e[n]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Cr(e, t, l) {
    if (t != null && (t = "" + gt(t), t !== e.value && (e.value = t), l == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = l != null ? "" + gt(l) : "";
  }
  function Ur(e, t, l, a) {
    if (t == null) {
      if (a != null) {
        if (l != null) throw Error(c(92));
        if (Rt(a)) {
          if (1 < a.length) throw Error(c(93));
          a = a[0];
        }
        l = a;
      }
      l == null && (l = ""), t = l;
    }
    l = gt(t), e.defaultValue = l, a = e.textContent, a === l && a !== "" && a !== null && (e.value = a), zi(e);
  }
  function aa(e, t) {
    if (t) {
      var l = e.firstChild;
      if (l && l === e.lastChild && l.nodeType === 3) {
        l.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Uh = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function wr(e, t, l) {
    var a = t.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === "" ? a ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : a ? e.setProperty(t, l) : typeof l != "number" || l === 0 || Uh.has(t) ? t === "float" ? e.cssFloat = l : e[t] = ("" + l).trim() : e[t] = l + "px";
  }
  function Hr(e, t, l) {
    if (t != null && typeof t != "object")
      throw Error(c(62));
    if (e = e.style, l != null) {
      for (var a in l)
        !l.hasOwnProperty(a) || t != null && t.hasOwnProperty(a) || (a.indexOf("--") === 0 ? e.setProperty(a, "") : a === "float" ? e.cssFloat = "" : e[a] = "");
      for (var n in t)
        a = t[n], t.hasOwnProperty(n) && l[n] !== a && wr(e, n, a);
    } else
      for (var u in t)
        t.hasOwnProperty(u) && wr(e, u, t[u]);
  }
  function Oi(e) {
    if (e.indexOf("-") === -1) return !1;
    switch (e) {
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
  var wh = /* @__PURE__ */ new Map([
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
  ]), Hh = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Wn(e) {
    return Hh.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function Yt() {
  }
  var Ai = null;
  function Ni(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var na = null, ua = null;
  function Br(e) {
    var t = Il(e);
    if (t && (e = t.stateNode)) {
      var l = e[et] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (Ti(
            e,
            l.value,
            l.defaultValue,
            l.defaultValue,
            l.checked,
            l.defaultChecked,
            l.type,
            l.name
          ), t = l.name, l.type === "radio" && t != null) {
            for (l = e; l.parentNode; ) l = l.parentNode;
            for (l = l.querySelectorAll(
              'input[name="' + bt(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < l.length; t++) {
              var a = l[t];
              if (a !== e && a.form === e.form) {
                var n = a[et] || null;
                if (!n) throw Error(c(90));
                Ti(
                  a,
                  n.value,
                  n.defaultValue,
                  n.defaultValue,
                  n.checked,
                  n.defaultChecked,
                  n.type,
                  n.name
                );
              }
            }
            for (t = 0; t < l.length; t++)
              a = l[t], a.form === e.form && jr(a);
          }
          break e;
        case "textarea":
          Cr(e, l.value, l.defaultValue);
          break e;
        case "select":
          t = l.value, t != null && la(e, !!l.multiple, t, !1);
      }
    }
  }
  var Ri = !1;
  function Lr(e, t, l) {
    if (Ri) return e(t, l);
    Ri = !0;
    try {
      var a = e(t);
      return a;
    } finally {
      if (Ri = !1, (na !== null || ua !== null) && (Hu(), na && (t = na, e = ua, ua = na = null, Br(t), e)))
        for (t = 0; t < e.length; t++) Br(e[t]);
    }
  }
  function Va(e, t) {
    var l = e.stateNode;
    if (l === null) return null;
    var a = l[et] || null;
    if (a === null) return null;
    l = a[t];
    e: switch (t) {
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
        (a = !a.disabled) || (e = e.type, a = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !a;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (l && typeof l != "function")
      throw Error(
        c(231, t, typeof l)
      );
    return l;
  }
  var Gt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Mi = !1;
  if (Gt)
    try {
      var Ka = {};
      Object.defineProperty(Ka, "passive", {
        get: function() {
          Mi = !0;
        }
      }), window.addEventListener("test", Ka, Ka), window.removeEventListener("test", Ka, Ka);
    } catch {
      Mi = !1;
    }
  var fl = null, ji = null, kn = null;
  function qr() {
    if (kn) return kn;
    var e, t = ji, l = t.length, a, n = "value" in fl ? fl.value : fl.textContent, u = n.length;
    for (e = 0; e < l && t[e] === n[e]; e++) ;
    var f = l - e;
    for (a = 1; a <= f && t[l - a] === n[u - a]; a++) ;
    return kn = n.slice(e, 1 < a ? 1 - a : void 0);
  }
  function Fn(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Pn() {
    return !0;
  }
  function Yr() {
    return !1;
  }
  function tt(e) {
    function t(l, a, n, u, f) {
      this._reactName = l, this._targetInst = n, this.type = a, this.nativeEvent = u, this.target = f, this.currentTarget = null;
      for (var o in e)
        e.hasOwnProperty(o) && (l = e[o], this[o] = l ? l(u) : u[o]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? Pn : Yr, this.isPropagationStopped = Yr, this;
    }
    return z(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var l = this.nativeEvent;
        l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = Pn);
      },
      stopPropagation: function() {
        var l = this.nativeEvent;
        l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = Pn);
      },
      persist: function() {
      },
      isPersistent: Pn
    }), t;
  }
  var wl = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, In = tt(wl), Ja = z({}, wl, { view: 0, detail: 0 }), Bh = tt(Ja), Di, Ci, $a, eu = z({}, Ja, {
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
    getModifierState: wi,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== $a && ($a && e.type === "mousemove" ? (Di = e.screenX - $a.screenX, Ci = e.screenY - $a.screenY) : Ci = Di = 0, $a = e), Di);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Ci;
    }
  }), Gr = tt(eu), Lh = z({}, eu, { dataTransfer: 0 }), qh = tt(Lh), Yh = z({}, Ja, { relatedTarget: 0 }), Ui = tt(Yh), Gh = z({}, wl, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Xh = tt(Gh), Qh = z({}, wl, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), Zh = tt(Qh), Vh = z({}, wl, { data: 0 }), Xr = tt(Vh), Kh = {
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
  }, Jh = {
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
  }, $h = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Wh(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = $h[e]) ? !!t[e] : !1;
  }
  function wi() {
    return Wh;
  }
  var kh = z({}, Ja, {
    key: function(e) {
      if (e.key) {
        var t = Kh[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = Fn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Jh[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: wi,
    charCode: function(e) {
      return e.type === "keypress" ? Fn(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Fn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), Fh = tt(kh), Ph = z({}, eu, {
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
  }), Qr = tt(Ph), Ih = z({}, Ja, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: wi
  }), e0 = tt(Ih), t0 = z({}, wl, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), l0 = tt(t0), a0 = z({}, eu, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), n0 = tt(a0), u0 = z({}, wl, {
    newState: 0,
    oldState: 0
  }), i0 = tt(u0), c0 = [9, 13, 27, 32], Hi = Gt && "CompositionEvent" in window, Wa = null;
  Gt && "documentMode" in document && (Wa = document.documentMode);
  var f0 = Gt && "TextEvent" in window && !Wa, Zr = Gt && (!Hi || Wa && 8 < Wa && 11 >= Wa), Vr = " ", Kr = !1;
  function Jr(e, t) {
    switch (e) {
      case "keyup":
        return c0.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function $r(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var ia = !1;
  function r0(e, t) {
    switch (e) {
      case "compositionend":
        return $r(t);
      case "keypress":
        return t.which !== 32 ? null : (Kr = !0, Vr);
      case "textInput":
        return e = t.data, e === Vr && Kr ? null : e;
      default:
        return null;
    }
  }
  function s0(e, t) {
    if (ia)
      return e === "compositionend" || !Hi && Jr(e, t) ? (e = qr(), kn = ji = fl = null, ia = !1, e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
          if (t.char && 1 < t.char.length)
            return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return Zr && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var o0 = {
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
  function Wr(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!o0[e.type] : t === "textarea";
  }
  function kr(e, t, l, a) {
    na ? ua ? ua.push(a) : ua = [a] : na = a, t = Qu(t, "onChange"), 0 < t.length && (l = new In(
      "onChange",
      "change",
      null,
      l,
      a
    ), e.push({ event: l, listeners: t }));
  }
  var ka = null, Fa = null;
  function d0(e) {
    Cd(e, 0);
  }
  function tu(e) {
    var t = Za(e);
    if (jr(t)) return e;
  }
  function Fr(e, t) {
    if (e === "change") return t;
  }
  var Pr = !1;
  if (Gt) {
    var Bi;
    if (Gt) {
      var Li = "oninput" in document;
      if (!Li) {
        var Ir = document.createElement("div");
        Ir.setAttribute("oninput", "return;"), Li = typeof Ir.oninput == "function";
      }
      Bi = Li;
    } else Bi = !1;
    Pr = Bi && (!document.documentMode || 9 < document.documentMode);
  }
  function es() {
    ka && (ka.detachEvent("onpropertychange", ts), Fa = ka = null);
  }
  function ts(e) {
    if (e.propertyName === "value" && tu(Fa)) {
      var t = [];
      kr(
        t,
        Fa,
        e,
        Ni(e)
      ), Lr(d0, t);
    }
  }
  function m0(e, t, l) {
    e === "focusin" ? (es(), ka = t, Fa = l, ka.attachEvent("onpropertychange", ts)) : e === "focusout" && es();
  }
  function h0(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return tu(Fa);
  }
  function v0(e, t) {
    if (e === "click") return tu(t);
  }
  function y0(e, t) {
    if (e === "input" || e === "change")
      return tu(t);
  }
  function p0(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var st = typeof Object.is == "function" ? Object.is : p0;
  function Pa(e, t) {
    if (st(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var l = Object.keys(e), a = Object.keys(t);
    if (l.length !== a.length) return !1;
    for (a = 0; a < l.length; a++) {
      var n = l[a];
      if (!vi.call(t, n) || !st(e[n], t[n]))
        return !1;
    }
    return !0;
  }
  function ls(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function as(e, t) {
    var l = ls(e);
    e = 0;
    for (var a; l; ) {
      if (l.nodeType === 3) {
        if (a = e + l.textContent.length, e <= t && a >= t)
          return { node: l, offset: t - e };
        e = a;
      }
      e: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break e;
          }
          l = l.parentNode;
        }
        l = void 0;
      }
      l = ls(l);
    }
  }
  function ns(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? ns(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function us(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = $n(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var l = typeof t.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) e = t.contentWindow;
      else break;
      t = $n(e.document);
    }
    return t;
  }
  function qi(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var g0 = Gt && "documentMode" in document && 11 >= document.documentMode, ca = null, Yi = null, Ia = null, Gi = !1;
  function is(e, t, l) {
    var a = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Gi || ca == null || ca !== $n(a) || (a = ca, "selectionStart" in a && qi(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), Ia && Pa(Ia, a) || (Ia = a, a = Qu(Yi, "onSelect"), 0 < a.length && (t = new In(
      "onSelect",
      "select",
      null,
      t,
      l
    ), e.push({ event: t, listeners: a }), t.target = ca)));
  }
  function Hl(e, t) {
    var l = {};
    return l[e.toLowerCase()] = t.toLowerCase(), l["Webkit" + e] = "webkit" + t, l["Moz" + e] = "moz" + t, l;
  }
  var fa = {
    animationend: Hl("Animation", "AnimationEnd"),
    animationiteration: Hl("Animation", "AnimationIteration"),
    animationstart: Hl("Animation", "AnimationStart"),
    transitionrun: Hl("Transition", "TransitionRun"),
    transitionstart: Hl("Transition", "TransitionStart"),
    transitioncancel: Hl("Transition", "TransitionCancel"),
    transitionend: Hl("Transition", "TransitionEnd")
  }, Xi = {}, cs = {};
  Gt && (cs = document.createElement("div").style, "AnimationEvent" in window || (delete fa.animationend.animation, delete fa.animationiteration.animation, delete fa.animationstart.animation), "TransitionEvent" in window || delete fa.transitionend.transition);
  function Bl(e) {
    if (Xi[e]) return Xi[e];
    if (!fa[e]) return e;
    var t = fa[e], l;
    for (l in t)
      if (t.hasOwnProperty(l) && l in cs)
        return Xi[e] = t[l];
    return e;
  }
  var fs = Bl("animationend"), rs = Bl("animationiteration"), ss = Bl("animationstart"), b0 = Bl("transitionrun"), S0 = Bl("transitionstart"), E0 = Bl("transitioncancel"), os = Bl("transitionend"), ds = /* @__PURE__ */ new Map(), Qi = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Qi.push("scrollEnd");
  function Mt(e, t) {
    ds.set(e, t), Ul(t, [e]);
  }
  var lu = typeof reportError == "function" ? reportError : function(e) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var t = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
        error: e
      });
      if (!window.dispatchEvent(t)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", e);
      return;
    }
    console.error(e);
  }, St = [], ra = 0, Zi = 0;
  function au() {
    for (var e = ra, t = Zi = ra = 0; t < e; ) {
      var l = St[t];
      St[t++] = null;
      var a = St[t];
      St[t++] = null;
      var n = St[t];
      St[t++] = null;
      var u = St[t];
      if (St[t++] = null, a !== null && n !== null) {
        var f = a.pending;
        f === null ? n.next = n : (n.next = f.next, f.next = n), a.pending = n;
      }
      u !== 0 && ms(l, n, u);
    }
  }
  function nu(e, t, l, a) {
    St[ra++] = e, St[ra++] = t, St[ra++] = l, St[ra++] = a, Zi |= a, e.lanes |= a, e = e.alternate, e !== null && (e.lanes |= a);
  }
  function Vi(e, t, l, a) {
    return nu(e, t, l, a), uu(e);
  }
  function Ll(e, t) {
    return nu(e, null, null, t), uu(e);
  }
  function ms(e, t, l) {
    e.lanes |= l;
    var a = e.alternate;
    a !== null && (a.lanes |= l);
    for (var n = !1, u = e.return; u !== null; )
      u.childLanes |= l, a = u.alternate, a !== null && (a.childLanes |= l), u.tag === 22 && (e = u.stateNode, e === null || e._visibility & 1 || (n = !0)), e = u, u = u.return;
    return e.tag === 3 ? (u = e.stateNode, n && t !== null && (n = 31 - rt(l), e = u.hiddenUpdates, a = e[n], a === null ? e[n] = [t] : a.push(t), t.lane = l | 536870912), u) : null;
  }
  function uu(e) {
    if (50 < xn)
      throw xn = 0, ef = null, Error(c(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var sa = {};
  function x0(e, t, l, a) {
    this.tag = e, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function ot(e, t, l, a) {
    return new x0(e, t, l, a);
  }
  function Ki(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Xt(e, t) {
    var l = e.alternate;
    return l === null ? (l = ot(
      e.tag,
      t,
      e.key,
      e.mode
    ), l.elementType = e.elementType, l.type = e.type, l.stateNode = e.stateNode, l.alternate = e, e.alternate = l) : (l.pendingProps = t, l.type = e.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = e.flags & 65011712, l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue, t = e.dependencies, l.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, l.sibling = e.sibling, l.index = e.index, l.ref = e.ref, l.refCleanup = e.refCleanup, l;
  }
  function hs(e, t) {
    e.flags &= 65011714;
    var l = e.alternate;
    return l === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = l.childLanes, e.lanes = l.lanes, e.child = l.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = l.memoizedProps, e.memoizedState = l.memoizedState, e.updateQueue = l.updateQueue, e.type = l.type, t = l.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function iu(e, t, l, a, n, u) {
    var f = 0;
    if (a = e, typeof e == "function") Ki(e) && (f = 1);
    else if (typeof e == "string")
      f = Av(
        e,
        l,
        K.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case Xe:
          return e = ot(31, l, t, n), e.elementType = Xe, e.lanes = u, e;
        case B:
          return ql(l.children, n, u, t);
        case H:
          f = 8, n |= 24;
          break;
        case G:
          return e = ot(12, l, t, n | 2), e.elementType = G, e.lanes = u, e;
        case pe:
          return e = ot(13, l, t, n), e.elementType = pe, e.lanes = u, e;
        case Oe:
          return e = ot(19, l, t, n), e.elementType = Oe, e.lanes = u, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case q:
                f = 10;
                break e;
              case $:
                f = 9;
                break e;
              case ne:
                f = 11;
                break e;
              case P:
                f = 14;
                break e;
              case qe:
                f = 16, a = null;
                break e;
            }
          f = 29, l = Error(
            c(130, e === null ? "null" : typeof e, "")
          ), a = null;
      }
    return t = ot(f, l, t, n), t.elementType = e, t.type = a, t.lanes = u, t;
  }
  function ql(e, t, l, a) {
    return e = ot(7, e, a, t), e.lanes = l, e;
  }
  function Ji(e, t, l) {
    return e = ot(6, e, null, t), e.lanes = l, e;
  }
  function vs(e) {
    var t = ot(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function $i(e, t, l) {
    return t = ot(
      4,
      e.children !== null ? e.children : [],
      e.key,
      t
    ), t.lanes = l, t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation
    }, t;
  }
  var ys = /* @__PURE__ */ new WeakMap();
  function Et(e, t) {
    if (typeof e == "object" && e !== null) {
      var l = ys.get(e);
      return l !== void 0 ? l : (t = {
        value: e,
        source: t,
        stack: vr(t)
      }, ys.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: vr(t)
    };
  }
  var oa = [], da = 0, cu = null, en = 0, xt = [], zt = 0, rl = null, Ut = 1, wt = "";
  function Qt(e, t) {
    oa[da++] = en, oa[da++] = cu, cu = e, en = t;
  }
  function ps(e, t, l) {
    xt[zt++] = Ut, xt[zt++] = wt, xt[zt++] = rl, rl = e;
    var a = Ut;
    e = wt;
    var n = 32 - rt(a) - 1;
    a &= ~(1 << n), l += 1;
    var u = 32 - rt(t) + n;
    if (30 < u) {
      var f = n - n % 5;
      u = (a & (1 << f) - 1).toString(32), a >>= f, n -= f, Ut = 1 << 32 - rt(t) + n | l << n | a, wt = u + e;
    } else
      Ut = 1 << u | l << n | a, wt = e;
  }
  function Wi(e) {
    e.return !== null && (Qt(e, 1), ps(e, 1, 0));
  }
  function ki(e) {
    for (; e === cu; )
      cu = oa[--da], oa[da] = null, en = oa[--da], oa[da] = null;
    for (; e === rl; )
      rl = xt[--zt], xt[zt] = null, wt = xt[--zt], xt[zt] = null, Ut = xt[--zt], xt[zt] = null;
  }
  function gs(e, t) {
    xt[zt++] = Ut, xt[zt++] = wt, xt[zt++] = rl, Ut = t.id, wt = t.overflow, rl = e;
  }
  var Ve = null, Te = null, se = !1, sl = null, Tt = !1, Fi = Error(c(519));
  function ol(e) {
    var t = Error(
      c(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw tn(Et(t, e)), Fi;
  }
  function bs(e) {
    var t = e.stateNode, l = e.type, a = e.memoizedProps;
    switch (t[Ze] = e, t[et] = a, l) {
      case "dialog":
        ce("cancel", t), ce("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        ce("load", t);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Tn.length; l++)
          ce(Tn[l], t);
        break;
      case "source":
        ce("error", t);
        break;
      case "img":
      case "image":
      case "link":
        ce("error", t), ce("load", t);
        break;
      case "details":
        ce("toggle", t);
        break;
      case "input":
        ce("invalid", t), Dr(
          t,
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
        ce("invalid", t);
        break;
      case "textarea":
        ce("invalid", t), Ur(t, a.value, a.defaultValue, a.children);
    }
    l = a.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || t.textContent === "" + l || a.suppressHydrationWarning === !0 || Bd(t.textContent, l) ? (a.popover != null && (ce("beforetoggle", t), ce("toggle", t)), a.onScroll != null && ce("scroll", t), a.onScrollEnd != null && ce("scrollend", t), a.onClick != null && (t.onclick = Yt), t = !0) : t = !1, t || ol(e, !0);
  }
  function Ss(e) {
    for (Ve = e.return; Ve; )
      switch (Ve.tag) {
        case 5:
        case 31:
        case 13:
          Tt = !1;
          return;
        case 27:
        case 3:
          Tt = !0;
          return;
        default:
          Ve = Ve.return;
      }
  }
  function ma(e) {
    if (e !== Ve) return !1;
    if (!se) return Ss(e), se = !0, !1;
    var t = e.tag, l;
    if ((l = t !== 3 && t !== 27) && ((l = t === 5) && (l = e.type, l = !(l !== "form" && l !== "button") || yf(e.type, e.memoizedProps)), l = !l), l && Te && ol(e), Ss(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(c(317));
      Te = Kd(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(c(317));
      Te = Kd(e);
    } else
      t === 27 ? (t = Te, _l(e.type) ? (e = Ef, Ef = null, Te = e) : Te = t) : Te = Ve ? Ot(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Yl() {
    Te = Ve = null, se = !1;
  }
  function Pi() {
    var e = sl;
    return e !== null && (ut === null ? ut = e : ut.push.apply(
      ut,
      e
    ), sl = null), e;
  }
  function tn(e) {
    sl === null ? sl = [e] : sl.push(e);
  }
  var Ii = S(null), Gl = null, Zt = null;
  function dl(e, t, l) {
    Q(Ii, t._currentValue), t._currentValue = l;
  }
  function Vt(e) {
    e._currentValue = Ii.current, U(Ii);
  }
  function ec(e, t, l) {
    for (; e !== null; ) {
      var a = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, a !== null && (a.childLanes |= t)) : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t), e === l) break;
      e = e.return;
    }
  }
  function tc(e, t, l, a) {
    var n = e.child;
    for (n !== null && (n.return = e); n !== null; ) {
      var u = n.dependencies;
      if (u !== null) {
        var f = n.child;
        u = u.firstContext;
        e: for (; u !== null; ) {
          var o = u;
          u = n;
          for (var y = 0; y < t.length; y++)
            if (o.context === t[y]) {
              u.lanes |= l, o = u.alternate, o !== null && (o.lanes |= l), ec(
                u.return,
                l,
                e
              ), a || (f = null);
              break e;
            }
          u = o.next;
        }
      } else if (n.tag === 18) {
        if (f = n.return, f === null) throw Error(c(341));
        f.lanes |= l, u = f.alternate, u !== null && (u.lanes |= l), ec(f, l, e), f = null;
      } else f = n.child;
      if (f !== null) f.return = n;
      else
        for (f = n; f !== null; ) {
          if (f === e) {
            f = null;
            break;
          }
          if (n = f.sibling, n !== null) {
            n.return = f.return, f = n;
            break;
          }
          f = f.return;
        }
      n = f;
    }
  }
  function ha(e, t, l, a) {
    e = null;
    for (var n = t, u = !1; n !== null; ) {
      if (!u) {
        if ((n.flags & 524288) !== 0) u = !0;
        else if ((n.flags & 262144) !== 0) break;
      }
      if (n.tag === 10) {
        var f = n.alternate;
        if (f === null) throw Error(c(387));
        if (f = f.memoizedProps, f !== null) {
          var o = n.type;
          st(n.pendingProps.value, f.value) || (e !== null ? e.push(o) : e = [o]);
        }
      } else if (n === he.current) {
        if (f = n.alternate, f === null) throw Error(c(387));
        f.memoizedState.memoizedState !== n.memoizedState.memoizedState && (e !== null ? e.push(Rn) : e = [Rn]);
      }
      n = n.return;
    }
    e !== null && tc(
      t,
      e,
      l,
      a
    ), t.flags |= 262144;
  }
  function fu(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!st(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function Xl(e) {
    Gl = e, Zt = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function Ke(e) {
    return Es(Gl, e);
  }
  function ru(e, t) {
    return Gl === null && Xl(e), Es(e, t);
  }
  function Es(e, t) {
    var l = t._currentValue;
    if (t = { context: t, memoizedValue: l, next: null }, Zt === null) {
      if (e === null) throw Error(c(308));
      Zt = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else Zt = Zt.next = t;
    return l;
  }
  var z0 = typeof AbortController < "u" ? AbortController : function() {
    var e = [], t = this.signal = {
      aborted: !1,
      addEventListener: function(l, a) {
        e.push(a);
      }
    };
    this.abort = function() {
      t.aborted = !0, e.forEach(function(l) {
        return l();
      });
    };
  }, T0 = i.unstable_scheduleCallback, _0 = i.unstable_NormalPriority, Ue = {
    $$typeof: q,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function lc() {
    return {
      controller: new z0(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function ln(e) {
    e.refCount--, e.refCount === 0 && T0(_0, function() {
      e.controller.abort();
    });
  }
  var an = null, ac = 0, va = 0, ya = null;
  function O0(e, t) {
    if (an === null) {
      var l = an = [];
      ac = 0, va = cf(), ya = {
        status: "pending",
        value: void 0,
        then: function(a) {
          l.push(a);
        }
      };
    }
    return ac++, t.then(xs, xs), t;
  }
  function xs() {
    if (--ac === 0 && an !== null) {
      ya !== null && (ya.status = "fulfilled");
      var e = an;
      an = null, va = 0, ya = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function A0(e, t) {
    var l = [], a = {
      status: "pending",
      value: null,
      reason: null,
      then: function(n) {
        l.push(n);
      }
    };
    return e.then(
      function() {
        a.status = "fulfilled", a.value = t;
        for (var n = 0; n < l.length; n++) (0, l[n])(t);
      },
      function(n) {
        for (a.status = "rejected", a.reason = n, n = 0; n < l.length; n++)
          (0, l[n])(void 0);
      }
    ), a;
  }
  var zs = j.S;
  j.S = function(e, t) {
    cd = ct(), typeof t == "object" && t !== null && typeof t.then == "function" && O0(e, t), zs !== null && zs(e, t);
  };
  var Ql = S(null);
  function nc() {
    var e = Ql.current;
    return e !== null ? e : ze.pooledCache;
  }
  function su(e, t) {
    t === null ? Q(Ql, Ql.current) : Q(Ql, t.pool);
  }
  function Ts() {
    var e = nc();
    return e === null ? null : { parent: Ue._currentValue, pool: e };
  }
  var pa = Error(c(460)), uc = Error(c(474)), ou = Error(c(542)), du = { then: function() {
  } };
  function _s(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function Os(e, t, l) {
    switch (l = e[l], l === void 0 ? e.push(t) : l !== t && (t.then(Yt, Yt), t = l), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, Ns(e), e;
      default:
        if (typeof t.status == "string") t.then(Yt, Yt);
        else {
          if (e = ze, e !== null && 100 < e.shellSuspendCounter)
            throw Error(c(482));
          e = t, e.status = "pending", e.then(
            function(a) {
              if (t.status === "pending") {
                var n = t;
                n.status = "fulfilled", n.value = a;
              }
            },
            function(a) {
              if (t.status === "pending") {
                var n = t;
                n.status = "rejected", n.reason = a;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw e = t.reason, Ns(e), e;
        }
        throw Vl = t, pa;
    }
  }
  function Zl(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function" ? (Vl = l, pa) : l;
    }
  }
  var Vl = null;
  function As() {
    if (Vl === null) throw Error(c(459));
    var e = Vl;
    return Vl = null, e;
  }
  function Ns(e) {
    if (e === pa || e === ou)
      throw Error(c(483));
  }
  var ga = null, nn = 0;
  function mu(e) {
    var t = nn;
    return nn += 1, ga === null && (ga = []), Os(ga, e, t);
  }
  function un(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function hu(e, t) {
    throw t.$$typeof === w ? Error(c(525)) : (e = Object.prototype.toString.call(t), Error(
      c(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function Rs(e) {
    function t(E, b) {
      if (e) {
        var T = E.deletions;
        T === null ? (E.deletions = [b], E.flags |= 16) : T.push(b);
      }
    }
    function l(E, b) {
      if (!e) return null;
      for (; b !== null; )
        t(E, b), b = b.sibling;
      return null;
    }
    function a(E) {
      for (var b = /* @__PURE__ */ new Map(); E !== null; )
        E.key !== null ? b.set(E.key, E) : b.set(E.index, E), E = E.sibling;
      return b;
    }
    function n(E, b) {
      return E = Xt(E, b), E.index = 0, E.sibling = null, E;
    }
    function u(E, b, T) {
      return E.index = T, e ? (T = E.alternate, T !== null ? (T = T.index, T < b ? (E.flags |= 67108866, b) : T) : (E.flags |= 67108866, b)) : (E.flags |= 1048576, b);
    }
    function f(E) {
      return e && E.alternate === null && (E.flags |= 67108866), E;
    }
    function o(E, b, T, D) {
      return b === null || b.tag !== 6 ? (b = Ji(T, E.mode, D), b.return = E, b) : (b = n(b, T), b.return = E, b);
    }
    function y(E, b, T, D) {
      var W = T.type;
      return W === B ? M(
        E,
        b,
        T.props.children,
        D,
        T.key
      ) : b !== null && (b.elementType === W || typeof W == "object" && W !== null && W.$$typeof === qe && Zl(W) === b.type) ? (b = n(b, T.props), un(b, T), b.return = E, b) : (b = iu(
        T.type,
        T.key,
        T.props,
        null,
        E.mode,
        D
      ), un(b, T), b.return = E, b);
    }
    function _(E, b, T, D) {
      return b === null || b.tag !== 4 || b.stateNode.containerInfo !== T.containerInfo || b.stateNode.implementation !== T.implementation ? (b = $i(T, E.mode, D), b.return = E, b) : (b = n(b, T.children || []), b.return = E, b);
    }
    function M(E, b, T, D, W) {
      return b === null || b.tag !== 7 ? (b = ql(
        T,
        E.mode,
        D,
        W
      ), b.return = E, b) : (b = n(b, T), b.return = E, b);
    }
    function C(E, b, T) {
      if (typeof b == "string" && b !== "" || typeof b == "number" || typeof b == "bigint")
        return b = Ji(
          "" + b,
          E.mode,
          T
        ), b.return = E, b;
      if (typeof b == "object" && b !== null) {
        switch (b.$$typeof) {
          case Y:
            return T = iu(
              b.type,
              b.key,
              b.props,
              null,
              E.mode,
              T
            ), un(T, b), T.return = E, T;
          case L:
            return b = $i(
              b,
              E.mode,
              T
            ), b.return = E, b;
          case qe:
            return b = Zl(b), C(E, b, T);
        }
        if (Rt(b) || Qe(b))
          return b = ql(
            b,
            E.mode,
            T,
            null
          ), b.return = E, b;
        if (typeof b.then == "function")
          return C(E, mu(b), T);
        if (b.$$typeof === q)
          return C(
            E,
            ru(E, b),
            T
          );
        hu(E, b);
      }
      return null;
    }
    function O(E, b, T, D) {
      var W = b !== null ? b.key : null;
      if (typeof T == "string" && T !== "" || typeof T == "number" || typeof T == "bigint")
        return W !== null ? null : o(E, b, "" + T, D);
      if (typeof T == "object" && T !== null) {
        switch (T.$$typeof) {
          case Y:
            return T.key === W ? y(E, b, T, D) : null;
          case L:
            return T.key === W ? _(E, b, T, D) : null;
          case qe:
            return T = Zl(T), O(E, b, T, D);
        }
        if (Rt(T) || Qe(T))
          return W !== null ? null : M(E, b, T, D, null);
        if (typeof T.then == "function")
          return O(
            E,
            b,
            mu(T),
            D
          );
        if (T.$$typeof === q)
          return O(
            E,
            b,
            ru(E, T),
            D
          );
        hu(E, T);
      }
      return null;
    }
    function N(E, b, T, D, W) {
      if (typeof D == "string" && D !== "" || typeof D == "number" || typeof D == "bigint")
        return E = E.get(T) || null, o(b, E, "" + D, W);
      if (typeof D == "object" && D !== null) {
        switch (D.$$typeof) {
          case Y:
            return E = E.get(
              D.key === null ? T : D.key
            ) || null, y(b, E, D, W);
          case L:
            return E = E.get(
              D.key === null ? T : D.key
            ) || null, _(b, E, D, W);
          case qe:
            return D = Zl(D), N(
              E,
              b,
              T,
              D,
              W
            );
        }
        if (Rt(D) || Qe(D))
          return E = E.get(T) || null, M(b, E, D, W, null);
        if (typeof D.then == "function")
          return N(
            E,
            b,
            T,
            mu(D),
            W
          );
        if (D.$$typeof === q)
          return N(
            E,
            b,
            T,
            ru(b, D),
            W
          );
        hu(b, D);
      }
      return null;
    }
    function V(E, b, T, D) {
      for (var W = null, oe = null, J = b, le = b = 0, re = null; J !== null && le < T.length; le++) {
        J.index > le ? (re = J, J = null) : re = J.sibling;
        var de = O(
          E,
          J,
          T[le],
          D
        );
        if (de === null) {
          J === null && (J = re);
          break;
        }
        e && J && de.alternate === null && t(E, J), b = u(de, b, le), oe === null ? W = de : oe.sibling = de, oe = de, J = re;
      }
      if (le === T.length)
        return l(E, J), se && Qt(E, le), W;
      if (J === null) {
        for (; le < T.length; le++)
          J = C(E, T[le], D), J !== null && (b = u(
            J,
            b,
            le
          ), oe === null ? W = J : oe.sibling = J, oe = J);
        return se && Qt(E, le), W;
      }
      for (J = a(J); le < T.length; le++)
        re = N(
          J,
          E,
          le,
          T[le],
          D
        ), re !== null && (e && re.alternate !== null && J.delete(
          re.key === null ? le : re.key
        ), b = u(
          re,
          b,
          le
        ), oe === null ? W = re : oe.sibling = re, oe = re);
      return e && J.forEach(function(Ml) {
        return t(E, Ml);
      }), se && Qt(E, le), W;
    }
    function k(E, b, T, D) {
      if (T == null) throw Error(c(151));
      for (var W = null, oe = null, J = b, le = b = 0, re = null, de = T.next(); J !== null && !de.done; le++, de = T.next()) {
        J.index > le ? (re = J, J = null) : re = J.sibling;
        var Ml = O(E, J, de.value, D);
        if (Ml === null) {
          J === null && (J = re);
          break;
        }
        e && J && Ml.alternate === null && t(E, J), b = u(Ml, b, le), oe === null ? W = Ml : oe.sibling = Ml, oe = Ml, J = re;
      }
      if (de.done)
        return l(E, J), se && Qt(E, le), W;
      if (J === null) {
        for (; !de.done; le++, de = T.next())
          de = C(E, de.value, D), de !== null && (b = u(de, b, le), oe === null ? W = de : oe.sibling = de, oe = de);
        return se && Qt(E, le), W;
      }
      for (J = a(J); !de.done; le++, de = T.next())
        de = N(J, E, le, de.value, D), de !== null && (e && de.alternate !== null && J.delete(de.key === null ? le : de.key), b = u(de, b, le), oe === null ? W = de : oe.sibling = de, oe = de);
      return e && J.forEach(function(Lv) {
        return t(E, Lv);
      }), se && Qt(E, le), W;
    }
    function Ee(E, b, T, D) {
      if (typeof T == "object" && T !== null && T.type === B && T.key === null && (T = T.props.children), typeof T == "object" && T !== null) {
        switch (T.$$typeof) {
          case Y:
            e: {
              for (var W = T.key; b !== null; ) {
                if (b.key === W) {
                  if (W = T.type, W === B) {
                    if (b.tag === 7) {
                      l(
                        E,
                        b.sibling
                      ), D = n(
                        b,
                        T.props.children
                      ), D.return = E, E = D;
                      break e;
                    }
                  } else if (b.elementType === W || typeof W == "object" && W !== null && W.$$typeof === qe && Zl(W) === b.type) {
                    l(
                      E,
                      b.sibling
                    ), D = n(b, T.props), un(D, T), D.return = E, E = D;
                    break e;
                  }
                  l(E, b);
                  break;
                } else t(E, b);
                b = b.sibling;
              }
              T.type === B ? (D = ql(
                T.props.children,
                E.mode,
                D,
                T.key
              ), D.return = E, E = D) : (D = iu(
                T.type,
                T.key,
                T.props,
                null,
                E.mode,
                D
              ), un(D, T), D.return = E, E = D);
            }
            return f(E);
          case L:
            e: {
              for (W = T.key; b !== null; ) {
                if (b.key === W)
                  if (b.tag === 4 && b.stateNode.containerInfo === T.containerInfo && b.stateNode.implementation === T.implementation) {
                    l(
                      E,
                      b.sibling
                    ), D = n(b, T.children || []), D.return = E, E = D;
                    break e;
                  } else {
                    l(E, b);
                    break;
                  }
                else t(E, b);
                b = b.sibling;
              }
              D = $i(T, E.mode, D), D.return = E, E = D;
            }
            return f(E);
          case qe:
            return T = Zl(T), Ee(
              E,
              b,
              T,
              D
            );
        }
        if (Rt(T))
          return V(
            E,
            b,
            T,
            D
          );
        if (Qe(T)) {
          if (W = Qe(T), typeof W != "function") throw Error(c(150));
          return T = W.call(T), k(
            E,
            b,
            T,
            D
          );
        }
        if (typeof T.then == "function")
          return Ee(
            E,
            b,
            mu(T),
            D
          );
        if (T.$$typeof === q)
          return Ee(
            E,
            b,
            ru(E, T),
            D
          );
        hu(E, T);
      }
      return typeof T == "string" && T !== "" || typeof T == "number" || typeof T == "bigint" ? (T = "" + T, b !== null && b.tag === 6 ? (l(E, b.sibling), D = n(b, T), D.return = E, E = D) : (l(E, b), D = Ji(T, E.mode, D), D.return = E, E = D), f(E)) : l(E, b);
    }
    return function(E, b, T, D) {
      try {
        nn = 0;
        var W = Ee(
          E,
          b,
          T,
          D
        );
        return ga = null, W;
      } catch (J) {
        if (J === pa || J === ou) throw J;
        var oe = ot(29, J, null, E.mode);
        return oe.lanes = D, oe.return = E, oe;
      } finally {
      }
    };
  }
  var Kl = Rs(!0), Ms = Rs(!1), ml = !1;
  function ic(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function cc(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function hl(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function vl(e, t, l) {
    var a = e.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (me & 2) !== 0) {
      var n = a.pending;
      return n === null ? t.next = t : (t.next = n.next, n.next = t), a.pending = t, t = uu(e), ms(e, null, l), t;
    }
    return nu(e, a, t, l), uu(e);
  }
  function cn(e, t, l) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (l & 4194048) !== 0)) {
      var a = t.lanes;
      a &= e.pendingLanes, l |= a, t.lanes = l, Er(e, l);
    }
  }
  function fc(e, t) {
    var l = e.updateQueue, a = e.alternate;
    if (a !== null && (a = a.updateQueue, l === a)) {
      var n = null, u = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var f = {
            lane: l.lane,
            tag: l.tag,
            payload: l.payload,
            callback: null,
            next: null
          };
          u === null ? n = u = f : u = u.next = f, l = l.next;
        } while (l !== null);
        u === null ? n = u = t : u = u.next = t;
      } else n = u = t;
      l = {
        baseState: a.baseState,
        firstBaseUpdate: n,
        lastBaseUpdate: u,
        shared: a.shared,
        callbacks: a.callbacks
      }, e.updateQueue = l;
      return;
    }
    e = l.lastBaseUpdate, e === null ? l.firstBaseUpdate = t : e.next = t, l.lastBaseUpdate = t;
  }
  var rc = !1;
  function fn() {
    if (rc) {
      var e = ya;
      if (e !== null) throw e;
    }
  }
  function rn(e, t, l, a) {
    rc = !1;
    var n = e.updateQueue;
    ml = !1;
    var u = n.firstBaseUpdate, f = n.lastBaseUpdate, o = n.shared.pending;
    if (o !== null) {
      n.shared.pending = null;
      var y = o, _ = y.next;
      y.next = null, f === null ? u = _ : f.next = _, f = y;
      var M = e.alternate;
      M !== null && (M = M.updateQueue, o = M.lastBaseUpdate, o !== f && (o === null ? M.firstBaseUpdate = _ : o.next = _, M.lastBaseUpdate = y));
    }
    if (u !== null) {
      var C = n.baseState;
      f = 0, M = _ = y = null, o = u;
      do {
        var O = o.lane & -536870913, N = O !== o.lane;
        if (N ? (fe & O) === O : (a & O) === O) {
          O !== 0 && O === va && (rc = !0), M !== null && (M = M.next = {
            lane: 0,
            tag: o.tag,
            payload: o.payload,
            callback: null,
            next: null
          });
          e: {
            var V = e, k = o;
            O = t;
            var Ee = l;
            switch (k.tag) {
              case 1:
                if (V = k.payload, typeof V == "function") {
                  C = V.call(Ee, C, O);
                  break e;
                }
                C = V;
                break e;
              case 3:
                V.flags = V.flags & -65537 | 128;
              case 0:
                if (V = k.payload, O = typeof V == "function" ? V.call(Ee, C, O) : V, O == null) break e;
                C = z({}, C, O);
                break e;
              case 2:
                ml = !0;
            }
          }
          O = o.callback, O !== null && (e.flags |= 64, N && (e.flags |= 8192), N = n.callbacks, N === null ? n.callbacks = [O] : N.push(O));
        } else
          N = {
            lane: O,
            tag: o.tag,
            payload: o.payload,
            callback: o.callback,
            next: null
          }, M === null ? (_ = M = N, y = C) : M = M.next = N, f |= O;
        if (o = o.next, o === null) {
          if (o = n.shared.pending, o === null)
            break;
          N = o, o = N.next, N.next = null, n.lastBaseUpdate = N, n.shared.pending = null;
        }
      } while (!0);
      M === null && (y = C), n.baseState = y, n.firstBaseUpdate = _, n.lastBaseUpdate = M, u === null && (n.shared.lanes = 0), Sl |= f, e.lanes = f, e.memoizedState = C;
    }
  }
  function js(e, t) {
    if (typeof e != "function")
      throw Error(c(191, e));
    e.call(t);
  }
  function Ds(e, t) {
    var l = e.callbacks;
    if (l !== null)
      for (e.callbacks = null, e = 0; e < l.length; e++)
        js(l[e], t);
  }
  var ba = S(null), vu = S(0);
  function Cs(e, t) {
    e = el, Q(vu, e), Q(ba, t), el = e | t.baseLanes;
  }
  function sc() {
    Q(vu, el), Q(ba, ba.current);
  }
  function oc() {
    el = vu.current, U(ba), U(vu);
  }
  var dt = S(null), _t = null;
  function yl(e) {
    var t = e.alternate;
    Q(De, De.current & 1), Q(dt, e), _t === null && (t === null || ba.current !== null || t.memoizedState !== null) && (_t = e);
  }
  function dc(e) {
    Q(De, De.current), Q(dt, e), _t === null && (_t = e);
  }
  function Us(e) {
    e.tag === 22 ? (Q(De, De.current), Q(dt, e), _t === null && (_t = e)) : pl();
  }
  function pl() {
    Q(De, De.current), Q(dt, dt.current);
  }
  function mt(e) {
    U(dt), _t === e && (_t = null), U(De);
  }
  var De = S(0);
  function yu(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var l = t.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || bf(l) || Sf(l)))
          return t;
      } else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var Kt = 0, te = null, be = null, we = null, pu = !1, Sa = !1, Jl = !1, gu = 0, sn = 0, Ea = null, N0 = 0;
  function Re() {
    throw Error(c(321));
  }
  function mc(e, t) {
    if (t === null) return !1;
    for (var l = 0; l < t.length && l < e.length; l++)
      if (!st(e[l], t[l])) return !1;
    return !0;
  }
  function hc(e, t, l, a, n, u) {
    return Kt = u, te = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, j.H = e === null || e.memoizedState === null ? go : Rc, Jl = !1, u = l(a, n), Jl = !1, Sa && (u = Hs(
      t,
      l,
      a,
      n
    )), ws(e), u;
  }
  function ws(e) {
    j.H = mn;
    var t = be !== null && be.next !== null;
    if (Kt = 0, we = be = te = null, pu = !1, sn = 0, Ea = null, t) throw Error(c(300));
    e === null || He || (e = e.dependencies, e !== null && fu(e) && (He = !0));
  }
  function Hs(e, t, l, a) {
    te = e;
    var n = 0;
    do {
      if (Sa && (Ea = null), sn = 0, Sa = !1, 25 <= n) throw Error(c(301));
      if (n += 1, we = be = null, e.updateQueue != null) {
        var u = e.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      j.H = bo, u = t(l, a);
    } while (Sa);
    return u;
  }
  function R0() {
    var e = j.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? on(t) : t, e = e.useState()[0], (be !== null ? be.memoizedState : null) !== e && (te.flags |= 1024), t;
  }
  function vc() {
    var e = gu !== 0;
    return gu = 0, e;
  }
  function yc(e, t, l) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l;
  }
  function pc(e) {
    if (pu) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      pu = !1;
    }
    Kt = 0, we = be = te = null, Sa = !1, sn = gu = 0, Ea = null;
  }
  function Ie() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return we === null ? te.memoizedState = we = e : we = we.next = e, we;
  }
  function Ce() {
    if (be === null) {
      var e = te.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = be.next;
    var t = we === null ? te.memoizedState : we.next;
    if (t !== null)
      we = t, be = e;
    else {
      if (e === null)
        throw te.alternate === null ? Error(c(467)) : Error(c(310));
      be = e, e = {
        memoizedState: be.memoizedState,
        baseState: be.baseState,
        baseQueue: be.baseQueue,
        queue: be.queue,
        next: null
      }, we === null ? te.memoizedState = we = e : we = we.next = e;
    }
    return we;
  }
  function bu() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function on(e) {
    var t = sn;
    return sn += 1, Ea === null && (Ea = []), e = Os(Ea, e, t), t = te, (we === null ? t.memoizedState : we.next) === null && (t = t.alternate, j.H = t === null || t.memoizedState === null ? go : Rc), e;
  }
  function Su(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return on(e);
      if (e.$$typeof === q) return Ke(e);
    }
    throw Error(c(438, String(e)));
  }
  function gc(e) {
    var t = null, l = te.updateQueue;
    if (l !== null && (t = l.memoCache), t == null) {
      var a = te.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (t = {
        data: a.data.map(function(n) {
          return n.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), l === null && (l = bu(), te.updateQueue = l), l.memoCache = t, l = t.data[t.index], l === void 0)
      for (l = t.data[t.index] = Array(e), a = 0; a < e; a++)
        l[a] = We;
    return t.index++, l;
  }
  function Jt(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Eu(e) {
    var t = Ce();
    return bc(t, be, e);
  }
  function bc(e, t, l) {
    var a = e.queue;
    if (a === null) throw Error(c(311));
    a.lastRenderedReducer = l;
    var n = e.baseQueue, u = a.pending;
    if (u !== null) {
      if (n !== null) {
        var f = n.next;
        n.next = u.next, u.next = f;
      }
      t.baseQueue = n = u, a.pending = null;
    }
    if (u = e.baseState, n === null) e.memoizedState = u;
    else {
      t = n.next;
      var o = f = null, y = null, _ = t, M = !1;
      do {
        var C = _.lane & -536870913;
        if (C !== _.lane ? (fe & C) === C : (Kt & C) === C) {
          var O = _.revertLane;
          if (O === 0)
            y !== null && (y = y.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: _.action,
              hasEagerState: _.hasEagerState,
              eagerState: _.eagerState,
              next: null
            }), C === va && (M = !0);
          else if ((Kt & O) === O) {
            _ = _.next, O === va && (M = !0);
            continue;
          } else
            C = {
              lane: 0,
              revertLane: _.revertLane,
              gesture: null,
              action: _.action,
              hasEagerState: _.hasEagerState,
              eagerState: _.eagerState,
              next: null
            }, y === null ? (o = y = C, f = u) : y = y.next = C, te.lanes |= O, Sl |= O;
          C = _.action, Jl && l(u, C), u = _.hasEagerState ? _.eagerState : l(u, C);
        } else
          O = {
            lane: C,
            revertLane: _.revertLane,
            gesture: _.gesture,
            action: _.action,
            hasEagerState: _.hasEagerState,
            eagerState: _.eagerState,
            next: null
          }, y === null ? (o = y = O, f = u) : y = y.next = O, te.lanes |= C, Sl |= C;
        _ = _.next;
      } while (_ !== null && _ !== t);
      if (y === null ? f = u : y.next = o, !st(u, e.memoizedState) && (He = !0, M && (l = ya, l !== null)))
        throw l;
      e.memoizedState = u, e.baseState = f, e.baseQueue = y, a.lastRenderedState = u;
    }
    return n === null && (a.lanes = 0), [e.memoizedState, a.dispatch];
  }
  function Sc(e) {
    var t = Ce(), l = t.queue;
    if (l === null) throw Error(c(311));
    l.lastRenderedReducer = e;
    var a = l.dispatch, n = l.pending, u = t.memoizedState;
    if (n !== null) {
      l.pending = null;
      var f = n = n.next;
      do
        u = e(u, f.action), f = f.next;
      while (f !== n);
      st(u, t.memoizedState) || (He = !0), t.memoizedState = u, t.baseQueue === null && (t.baseState = u), l.lastRenderedState = u;
    }
    return [u, a];
  }
  function Bs(e, t, l) {
    var a = te, n = Ce(), u = se;
    if (u) {
      if (l === void 0) throw Error(c(407));
      l = l();
    } else l = t();
    var f = !st(
      (be || n).memoizedState,
      l
    );
    if (f && (n.memoizedState = l, He = !0), n = n.queue, zc(Ys.bind(null, a, n, e), [
      e
    ]), n.getSnapshot !== t || f || we !== null && we.memoizedState.tag & 1) {
      if (a.flags |= 2048, xa(
        9,
        { destroy: void 0 },
        qs.bind(
          null,
          a,
          n,
          l,
          t
        ),
        null
      ), ze === null) throw Error(c(349));
      u || (Kt & 127) !== 0 || Ls(a, t, l);
    }
    return l;
  }
  function Ls(e, t, l) {
    e.flags |= 16384, e = { getSnapshot: t, value: l }, t = te.updateQueue, t === null ? (t = bu(), te.updateQueue = t, t.stores = [e]) : (l = t.stores, l === null ? t.stores = [e] : l.push(e));
  }
  function qs(e, t, l, a) {
    t.value = l, t.getSnapshot = a, Gs(t) && Xs(e);
  }
  function Ys(e, t, l) {
    return l(function() {
      Gs(t) && Xs(e);
    });
  }
  function Gs(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var l = t();
      return !st(e, l);
    } catch {
      return !0;
    }
  }
  function Xs(e) {
    var t = Ll(e, 2);
    t !== null && it(t, e, 2);
  }
  function Ec(e) {
    var t = Ie();
    if (typeof e == "function") {
      var l = e;
      if (e = l(), Jl) {
        il(!0);
        try {
          l();
        } finally {
          il(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Jt,
      lastRenderedState: e
    }, t;
  }
  function Qs(e, t, l, a) {
    return e.baseState = l, bc(
      e,
      be,
      typeof a == "function" ? a : Jt
    );
  }
  function M0(e, t, l, a, n) {
    if (Tu(e)) throw Error(c(485));
    if (e = t.action, e !== null) {
      var u = {
        payload: n,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(f) {
          u.listeners.push(f);
        }
      };
      j.T !== null ? l(!0) : u.isTransition = !1, a(u), l = t.pending, l === null ? (u.next = t.pending = u, Zs(t, u)) : (u.next = l.next, t.pending = l.next = u);
    }
  }
  function Zs(e, t) {
    var l = t.action, a = t.payload, n = e.state;
    if (t.isTransition) {
      var u = j.T, f = {};
      j.T = f;
      try {
        var o = l(n, a), y = j.S;
        y !== null && y(f, o), Vs(e, t, o);
      } catch (_) {
        xc(e, t, _);
      } finally {
        u !== null && f.types !== null && (u.types = f.types), j.T = u;
      }
    } else
      try {
        u = l(n, a), Vs(e, t, u);
      } catch (_) {
        xc(e, t, _);
      }
  }
  function Vs(e, t, l) {
    l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
      function(a) {
        Ks(e, t, a);
      },
      function(a) {
        return xc(e, t, a);
      }
    ) : Ks(e, t, l);
  }
  function Ks(e, t, l) {
    t.status = "fulfilled", t.value = l, Js(t), e.state = l, t = e.pending, t !== null && (l = t.next, l === t ? e.pending = null : (l = l.next, t.next = l, Zs(e, l)));
  }
  function xc(e, t, l) {
    var a = e.pending;
    if (e.pending = null, a !== null) {
      a = a.next;
      do
        t.status = "rejected", t.reason = l, Js(t), t = t.next;
      while (t !== a);
    }
    e.action = null;
  }
  function Js(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function $s(e, t) {
    return t;
  }
  function Ws(e, t) {
    if (se) {
      var l = ze.formState;
      if (l !== null) {
        e: {
          var a = te;
          if (se) {
            if (Te) {
              t: {
                for (var n = Te, u = Tt; n.nodeType !== 8; ) {
                  if (!u) {
                    n = null;
                    break t;
                  }
                  if (n = Ot(
                    n.nextSibling
                  ), n === null) {
                    n = null;
                    break t;
                  }
                }
                u = n.data, n = u === "F!" || u === "F" ? n : null;
              }
              if (n) {
                Te = Ot(
                  n.nextSibling
                ), a = n.data === "F!";
                break e;
              }
            }
            ol(a);
          }
          a = !1;
        }
        a && (t = l[0]);
      }
    }
    return l = Ie(), l.memoizedState = l.baseState = t, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: $s,
      lastRenderedState: t
    }, l.queue = a, l = vo.bind(
      null,
      te,
      a
    ), a.dispatch = l, a = Ec(!1), u = Nc.bind(
      null,
      te,
      !1,
      a.queue
    ), a = Ie(), n = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, a.queue = n, l = M0.bind(
      null,
      te,
      n,
      u,
      l
    ), n.dispatch = l, a.memoizedState = e, [t, l, !1];
  }
  function ks(e) {
    var t = Ce();
    return Fs(t, be, e);
  }
  function Fs(e, t, l) {
    if (t = bc(
      e,
      t,
      $s
    )[0], e = Eu(Jt)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var a = on(t);
      } catch (f) {
        throw f === pa ? ou : f;
      }
    else a = t;
    t = Ce();
    var n = t.queue, u = n.dispatch;
    return l !== t.memoizedState && (te.flags |= 2048, xa(
      9,
      { destroy: void 0 },
      j0.bind(null, n, l),
      null
    )), [a, u, e];
  }
  function j0(e, t) {
    e.action = t;
  }
  function Ps(e) {
    var t = Ce(), l = be;
    if (l !== null)
      return Fs(t, l, e);
    Ce(), t = t.memoizedState, l = Ce();
    var a = l.queue.dispatch;
    return l.memoizedState = e, [t, a, !1];
  }
  function xa(e, t, l, a) {
    return e = { tag: e, create: l, deps: a, inst: t, next: null }, t = te.updateQueue, t === null && (t = bu(), te.updateQueue = t), l = t.lastEffect, l === null ? t.lastEffect = e.next = e : (a = l.next, l.next = e, e.next = a, t.lastEffect = e), e;
  }
  function Is() {
    return Ce().memoizedState;
  }
  function xu(e, t, l, a) {
    var n = Ie();
    te.flags |= e, n.memoizedState = xa(
      1 | t,
      { destroy: void 0 },
      l,
      a === void 0 ? null : a
    );
  }
  function zu(e, t, l, a) {
    var n = Ce();
    a = a === void 0 ? null : a;
    var u = n.memoizedState.inst;
    be !== null && a !== null && mc(a, be.memoizedState.deps) ? n.memoizedState = xa(t, u, l, a) : (te.flags |= e, n.memoizedState = xa(
      1 | t,
      u,
      l,
      a
    ));
  }
  function eo(e, t) {
    xu(8390656, 8, e, t);
  }
  function zc(e, t) {
    zu(2048, 8, e, t);
  }
  function D0(e) {
    te.flags |= 4;
    var t = te.updateQueue;
    if (t === null)
      t = bu(), te.updateQueue = t, t.events = [e];
    else {
      var l = t.events;
      l === null ? t.events = [e] : l.push(e);
    }
  }
  function to(e) {
    var t = Ce().memoizedState;
    return D0({ ref: t, nextImpl: e }), function() {
      if ((me & 2) !== 0) throw Error(c(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function lo(e, t) {
    return zu(4, 2, e, t);
  }
  function ao(e, t) {
    return zu(4, 4, e, t);
  }
  function no(e, t) {
    if (typeof t == "function") {
      e = e();
      var l = t(e);
      return function() {
        typeof l == "function" ? l() : t(null);
      };
    }
    if (t != null)
      return e = e(), t.current = e, function() {
        t.current = null;
      };
  }
  function uo(e, t, l) {
    l = l != null ? l.concat([e]) : null, zu(4, 4, no.bind(null, t, e), l);
  }
  function Tc() {
  }
  function io(e, t) {
    var l = Ce();
    t = t === void 0 ? null : t;
    var a = l.memoizedState;
    return t !== null && mc(t, a[1]) ? a[0] : (l.memoizedState = [e, t], e);
  }
  function co(e, t) {
    var l = Ce();
    t = t === void 0 ? null : t;
    var a = l.memoizedState;
    if (t !== null && mc(t, a[1]))
      return a[0];
    if (a = e(), Jl) {
      il(!0);
      try {
        e();
      } finally {
        il(!1);
      }
    }
    return l.memoizedState = [a, t], a;
  }
  function _c(e, t, l) {
    return l === void 0 || (Kt & 1073741824) !== 0 && (fe & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = l, e = rd(), te.lanes |= e, Sl |= e, l);
  }
  function fo(e, t, l, a) {
    return st(l, t) ? l : ba.current !== null ? (e = _c(e, l, a), st(e, t) || (He = !0), e) : (Kt & 42) === 0 || (Kt & 1073741824) !== 0 && (fe & 261930) === 0 ? (He = !0, e.memoizedState = l) : (e = rd(), te.lanes |= e, Sl |= e, t);
  }
  function ro(e, t, l, a, n) {
    var u = X.p;
    X.p = u !== 0 && 8 > u ? u : 8;
    var f = j.T, o = {};
    j.T = o, Nc(e, !1, t, l);
    try {
      var y = n(), _ = j.S;
      if (_ !== null && _(o, y), y !== null && typeof y == "object" && typeof y.then == "function") {
        var M = A0(
          y,
          a
        );
        dn(
          e,
          t,
          M,
          yt(e)
        );
      } else
        dn(
          e,
          t,
          a,
          yt(e)
        );
    } catch (C) {
      dn(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: C },
        yt()
      );
    } finally {
      X.p = u, f !== null && o.types !== null && (f.types = o.types), j.T = f;
    }
  }
  function C0() {
  }
  function Oc(e, t, l, a) {
    if (e.tag !== 5) throw Error(c(476));
    var n = so(e).queue;
    ro(
      e,
      n,
      t,
      F,
      l === null ? C0 : function() {
        return oo(e), l(a);
      }
    );
  }
  function so(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: F,
      baseState: F,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Jt,
        lastRenderedState: F
      },
      next: null
    };
    var l = {};
    return t.next = {
      memoizedState: l,
      baseState: l,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Jt,
        lastRenderedState: l
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function oo(e) {
    var t = so(e);
    t.next === null && (t = e.alternate.memoizedState), dn(
      e,
      t.next.queue,
      {},
      yt()
    );
  }
  function Ac() {
    return Ke(Rn);
  }
  function mo() {
    return Ce().memoizedState;
  }
  function ho() {
    return Ce().memoizedState;
  }
  function U0(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var l = yt();
          e = hl(l);
          var a = vl(t, e, l);
          a !== null && (it(a, t, l), cn(a, t, l)), t = { cache: lc() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function w0(e, t, l) {
    var a = yt();
    l = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Tu(e) ? yo(t, l) : (l = Vi(e, t, l, a), l !== null && (it(l, e, a), po(l, t, a)));
  }
  function vo(e, t, l) {
    var a = yt();
    dn(e, t, l, a);
  }
  function dn(e, t, l, a) {
    var n = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Tu(e)) yo(t, n);
    else {
      var u = e.alternate;
      if (e.lanes === 0 && (u === null || u.lanes === 0) && (u = t.lastRenderedReducer, u !== null))
        try {
          var f = t.lastRenderedState, o = u(f, l);
          if (n.hasEagerState = !0, n.eagerState = o, st(o, f))
            return nu(e, t, n, 0), ze === null && au(), !1;
        } catch {
        } finally {
        }
      if (l = Vi(e, t, n, a), l !== null)
        return it(l, e, a), po(l, t, a), !0;
    }
    return !1;
  }
  function Nc(e, t, l, a) {
    if (a = {
      lane: 2,
      revertLane: cf(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Tu(e)) {
      if (t) throw Error(c(479));
    } else
      t = Vi(
        e,
        l,
        a,
        2
      ), t !== null && it(t, e, 2);
  }
  function Tu(e) {
    var t = e.alternate;
    return e === te || t !== null && t === te;
  }
  function yo(e, t) {
    Sa = pu = !0;
    var l = e.pending;
    l === null ? t.next = t : (t.next = l.next, l.next = t), e.pending = t;
  }
  function po(e, t, l) {
    if ((l & 4194048) !== 0) {
      var a = t.lanes;
      a &= e.pendingLanes, l |= a, t.lanes = l, Er(e, l);
    }
  }
  var mn = {
    readContext: Ke,
    use: Su,
    useCallback: Re,
    useContext: Re,
    useEffect: Re,
    useImperativeHandle: Re,
    useLayoutEffect: Re,
    useInsertionEffect: Re,
    useMemo: Re,
    useReducer: Re,
    useRef: Re,
    useState: Re,
    useDebugValue: Re,
    useDeferredValue: Re,
    useTransition: Re,
    useSyncExternalStore: Re,
    useId: Re,
    useHostTransitionStatus: Re,
    useFormState: Re,
    useActionState: Re,
    useOptimistic: Re,
    useMemoCache: Re,
    useCacheRefresh: Re
  };
  mn.useEffectEvent = Re;
  var go = {
    readContext: Ke,
    use: Su,
    useCallback: function(e, t) {
      return Ie().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: Ke,
    useEffect: eo,
    useImperativeHandle: function(e, t, l) {
      l = l != null ? l.concat([e]) : null, xu(
        4194308,
        4,
        no.bind(null, t, e),
        l
      );
    },
    useLayoutEffect: function(e, t) {
      return xu(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      xu(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var l = Ie();
      t = t === void 0 ? null : t;
      var a = e();
      if (Jl) {
        il(!0);
        try {
          e();
        } finally {
          il(!1);
        }
      }
      return l.memoizedState = [a, t], a;
    },
    useReducer: function(e, t, l) {
      var a = Ie();
      if (l !== void 0) {
        var n = l(t);
        if (Jl) {
          il(!0);
          try {
            l(t);
          } finally {
            il(!1);
          }
        }
      } else n = t;
      return a.memoizedState = a.baseState = n, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: n
      }, a.queue = e, e = e.dispatch = w0.bind(
        null,
        te,
        e
      ), [a.memoizedState, e];
    },
    useRef: function(e) {
      var t = Ie();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = Ec(e);
      var t = e.queue, l = vo.bind(null, te, t);
      return t.dispatch = l, [e.memoizedState, l];
    },
    useDebugValue: Tc,
    useDeferredValue: function(e, t) {
      var l = Ie();
      return _c(l, e, t);
    },
    useTransition: function() {
      var e = Ec(!1);
      return e = ro.bind(
        null,
        te,
        e.queue,
        !0,
        !1
      ), Ie().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, l) {
      var a = te, n = Ie();
      if (se) {
        if (l === void 0)
          throw Error(c(407));
        l = l();
      } else {
        if (l = t(), ze === null)
          throw Error(c(349));
        (fe & 127) !== 0 || Ls(a, t, l);
      }
      n.memoizedState = l;
      var u = { value: l, getSnapshot: t };
      return n.queue = u, eo(Ys.bind(null, a, u, e), [
        e
      ]), a.flags |= 2048, xa(
        9,
        { destroy: void 0 },
        qs.bind(
          null,
          a,
          u,
          l,
          t
        ),
        null
      ), l;
    },
    useId: function() {
      var e = Ie(), t = ze.identifierPrefix;
      if (se) {
        var l = wt, a = Ut;
        l = (a & ~(1 << 32 - rt(a) - 1)).toString(32) + l, t = "_" + t + "R_" + l, l = gu++, 0 < l && (t += "H" + l.toString(32)), t += "_";
      } else
        l = N0++, t = "_" + t + "r_" + l.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: Ac,
    useFormState: Ws,
    useActionState: Ws,
    useOptimistic: function(e) {
      var t = Ie();
      t.memoizedState = t.baseState = e;
      var l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = l, t = Nc.bind(
        null,
        te,
        !0,
        l
      ), l.dispatch = t, [e, t];
    },
    useMemoCache: gc,
    useCacheRefresh: function() {
      return Ie().memoizedState = U0.bind(
        null,
        te
      );
    },
    useEffectEvent: function(e) {
      var t = Ie(), l = { impl: e };
      return t.memoizedState = l, function() {
        if ((me & 2) !== 0)
          throw Error(c(440));
        return l.impl.apply(void 0, arguments);
      };
    }
  }, Rc = {
    readContext: Ke,
    use: Su,
    useCallback: io,
    useContext: Ke,
    useEffect: zc,
    useImperativeHandle: uo,
    useInsertionEffect: lo,
    useLayoutEffect: ao,
    useMemo: co,
    useReducer: Eu,
    useRef: Is,
    useState: function() {
      return Eu(Jt);
    },
    useDebugValue: Tc,
    useDeferredValue: function(e, t) {
      var l = Ce();
      return fo(
        l,
        be.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Eu(Jt)[0], t = Ce().memoizedState;
      return [
        typeof e == "boolean" ? e : on(e),
        t
      ];
    },
    useSyncExternalStore: Bs,
    useId: mo,
    useHostTransitionStatus: Ac,
    useFormState: ks,
    useActionState: ks,
    useOptimistic: function(e, t) {
      var l = Ce();
      return Qs(l, be, e, t);
    },
    useMemoCache: gc,
    useCacheRefresh: ho
  };
  Rc.useEffectEvent = to;
  var bo = {
    readContext: Ke,
    use: Su,
    useCallback: io,
    useContext: Ke,
    useEffect: zc,
    useImperativeHandle: uo,
    useInsertionEffect: lo,
    useLayoutEffect: ao,
    useMemo: co,
    useReducer: Sc,
    useRef: Is,
    useState: function() {
      return Sc(Jt);
    },
    useDebugValue: Tc,
    useDeferredValue: function(e, t) {
      var l = Ce();
      return be === null ? _c(l, e, t) : fo(
        l,
        be.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Sc(Jt)[0], t = Ce().memoizedState;
      return [
        typeof e == "boolean" ? e : on(e),
        t
      ];
    },
    useSyncExternalStore: Bs,
    useId: mo,
    useHostTransitionStatus: Ac,
    useFormState: Ps,
    useActionState: Ps,
    useOptimistic: function(e, t) {
      var l = Ce();
      return be !== null ? Qs(l, be, e, t) : (l.baseState = e, [e, l.queue.dispatch]);
    },
    useMemoCache: gc,
    useCacheRefresh: ho
  };
  bo.useEffectEvent = to;
  function Mc(e, t, l, a) {
    t = e.memoizedState, l = l(a, t), l = l == null ? t : z({}, t, l), e.memoizedState = l, e.lanes === 0 && (e.updateQueue.baseState = l);
  }
  var jc = {
    enqueueSetState: function(e, t, l) {
      e = e._reactInternals;
      var a = yt(), n = hl(a);
      n.payload = t, l != null && (n.callback = l), t = vl(e, n, a), t !== null && (it(t, e, a), cn(t, e, a));
    },
    enqueueReplaceState: function(e, t, l) {
      e = e._reactInternals;
      var a = yt(), n = hl(a);
      n.tag = 1, n.payload = t, l != null && (n.callback = l), t = vl(e, n, a), t !== null && (it(t, e, a), cn(t, e, a));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var l = yt(), a = hl(l);
      a.tag = 2, t != null && (a.callback = t), t = vl(e, a, l), t !== null && (it(t, e, l), cn(t, e, l));
    }
  };
  function So(e, t, l, a, n, u, f) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(a, u, f) : t.prototype && t.prototype.isPureReactComponent ? !Pa(l, a) || !Pa(n, u) : !0;
  }
  function Eo(e, t, l, a) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(l, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(l, a), t.state !== e && jc.enqueueReplaceState(t, t.state, null);
  }
  function $l(e, t) {
    var l = t;
    if ("ref" in t) {
      l = {};
      for (var a in t)
        a !== "ref" && (l[a] = t[a]);
    }
    if (e = e.defaultProps) {
      l === t && (l = z({}, l));
      for (var n in e)
        l[n] === void 0 && (l[n] = e[n]);
    }
    return l;
  }
  function xo(e) {
    lu(e);
  }
  function zo(e) {
    console.error(e);
  }
  function To(e) {
    lu(e);
  }
  function _u(e, t) {
    try {
      var l = e.onUncaughtError;
      l(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function _o(e, t, l) {
    try {
      var a = e.onCaughtError;
      a(l.value, {
        componentStack: l.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  function Dc(e, t, l) {
    return l = hl(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
      _u(e, t);
    }, l;
  }
  function Oo(e) {
    return e = hl(e), e.tag = 3, e;
  }
  function Ao(e, t, l, a) {
    var n = l.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var u = a.value;
      e.payload = function() {
        return n(u);
      }, e.callback = function() {
        _o(t, l, a);
      };
    }
    var f = l.stateNode;
    f !== null && typeof f.componentDidCatch == "function" && (e.callback = function() {
      _o(t, l, a), typeof n != "function" && (El === null ? El = /* @__PURE__ */ new Set([this]) : El.add(this));
      var o = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: o !== null ? o : ""
      });
    });
  }
  function H0(e, t, l, a, n) {
    if (l.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (t = l.alternate, t !== null && ha(
        t,
        l,
        n,
        !0
      ), l = dt.current, l !== null) {
        switch (l.tag) {
          case 31:
          case 13:
            return _t === null ? Bu() : l.alternate === null && Me === 0 && (Me = 3), l.flags &= -257, l.flags |= 65536, l.lanes = n, a === du ? l.flags |= 16384 : (t = l.updateQueue, t === null ? l.updateQueue = /* @__PURE__ */ new Set([a]) : t.add(a), af(e, a, n)), !1;
          case 22:
            return l.flags |= 65536, a === du ? l.flags |= 16384 : (t = l.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, l.updateQueue = t) : (l = t.retryQueue, l === null ? t.retryQueue = /* @__PURE__ */ new Set([a]) : l.add(a)), af(e, a, n)), !1;
        }
        throw Error(c(435, l.tag));
      }
      return af(e, a, n), Bu(), !1;
    }
    if (se)
      return t = dt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = n, a !== Fi && (e = Error(c(422), { cause: a }), tn(Et(e, l)))) : (a !== Fi && (t = Error(c(423), {
        cause: a
      }), tn(
        Et(t, l)
      )), e = e.current.alternate, e.flags |= 65536, n &= -n, e.lanes |= n, a = Et(a, l), n = Dc(
        e.stateNode,
        a,
        n
      ), fc(e, n), Me !== 4 && (Me = 2)), !1;
    var u = Error(c(520), { cause: a });
    if (u = Et(u, l), En === null ? En = [u] : En.push(u), Me !== 4 && (Me = 2), t === null) return !0;
    a = Et(a, l), l = t;
    do {
      switch (l.tag) {
        case 3:
          return l.flags |= 65536, e = n & -n, l.lanes |= e, e = Dc(l.stateNode, a, e), fc(l, e), !1;
        case 1:
          if (t = l.type, u = l.stateNode, (l.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (El === null || !El.has(u))))
            return l.flags |= 65536, n &= -n, l.lanes |= n, n = Oo(n), Ao(
              n,
              e,
              l,
              a
            ), fc(l, n), !1;
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var Cc = Error(c(461)), He = !1;
  function Je(e, t, l, a) {
    t.child = e === null ? Ms(t, null, l, a) : Kl(
      t,
      e.child,
      l,
      a
    );
  }
  function No(e, t, l, a, n) {
    l = l.render;
    var u = t.ref;
    if ("ref" in a) {
      var f = {};
      for (var o in a)
        o !== "ref" && (f[o] = a[o]);
    } else f = a;
    return Xl(t), a = hc(
      e,
      t,
      l,
      f,
      u,
      n
    ), o = vc(), e !== null && !He ? (yc(e, t, n), $t(e, t, n)) : (se && o && Wi(t), t.flags |= 1, Je(e, t, a, n), t.child);
  }
  function Ro(e, t, l, a, n) {
    if (e === null) {
      var u = l.type;
      return typeof u == "function" && !Ki(u) && u.defaultProps === void 0 && l.compare === null ? (t.tag = 15, t.type = u, Mo(
        e,
        t,
        u,
        a,
        n
      )) : (e = iu(
        l.type,
        null,
        a,
        t,
        t.mode,
        n
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (u = e.child, !Gc(e, n)) {
      var f = u.memoizedProps;
      if (l = l.compare, l = l !== null ? l : Pa, l(f, a) && e.ref === t.ref)
        return $t(e, t, n);
    }
    return t.flags |= 1, e = Xt(u, a), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Mo(e, t, l, a, n) {
    if (e !== null) {
      var u = e.memoizedProps;
      if (Pa(u, a) && e.ref === t.ref)
        if (He = !1, t.pendingProps = a = u, Gc(e, n))
          (e.flags & 131072) !== 0 && (He = !0);
        else
          return t.lanes = e.lanes, $t(e, t, n);
    }
    return Uc(
      e,
      t,
      l,
      a,
      n
    );
  }
  function jo(e, t, l, a) {
    var n = a.children, u = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), a.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (u = u !== null ? u.baseLanes | l : l, e !== null) {
          for (a = t.child = e.child, n = 0; a !== null; )
            n = n | a.lanes | a.childLanes, a = a.sibling;
          a = n & ~u;
        } else a = 0, t.child = null;
        return Do(
          e,
          t,
          u,
          l,
          a
        );
      }
      if ((l & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && su(
          t,
          u !== null ? u.cachePool : null
        ), u !== null ? Cs(t, u) : sc(), Us(t);
      else
        return a = t.lanes = 536870912, Do(
          e,
          t,
          u !== null ? u.baseLanes | l : l,
          l,
          a
        );
    } else
      u !== null ? (su(t, u.cachePool), Cs(t, u), pl(), t.memoizedState = null) : (e !== null && su(t, null), sc(), pl());
    return Je(e, t, n, l), t.child;
  }
  function hn(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function Do(e, t, l, a, n) {
    var u = nc();
    return u = u === null ? null : { parent: Ue._currentValue, pool: u }, t.memoizedState = {
      baseLanes: l,
      cachePool: u
    }, e !== null && su(t, null), sc(), Us(t), e !== null && ha(e, t, a, !0), t.childLanes = n, null;
  }
  function Ou(e, t) {
    return t = Nu(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Co(e, t, l) {
    return Kl(t, e.child, null, l), e = Ou(t, t.pendingProps), e.flags |= 2, mt(t), t.memoizedState = null, e;
  }
  function B0(e, t, l) {
    var a = t.pendingProps, n = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (se) {
        if (a.mode === "hidden")
          return e = Ou(t, a), t.lanes = 536870912, hn(null, e);
        if (dc(t), (e = Te) ? (e = Vd(
          e,
          Tt
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: rl !== null ? { id: Ut, overflow: wt } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = vs(e), l.return = t, t.child = l, Ve = t, Te = null)) : e = null, e === null) throw ol(t);
        return t.lanes = 536870912, null;
      }
      return Ou(t, a);
    }
    var u = e.memoizedState;
    if (u !== null) {
      var f = u.dehydrated;
      if (dc(t), n)
        if (t.flags & 256)
          t.flags &= -257, t = Co(
            e,
            t,
            l
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(c(558));
      else if (He || ha(e, t, l, !1), n = (l & e.childLanes) !== 0, He || n) {
        if (a = ze, a !== null && (f = xr(a, l), f !== 0 && f !== u.retryLane))
          throw u.retryLane = f, Ll(e, f), it(a, e, f), Cc;
        Bu(), t = Co(
          e,
          t,
          l
        );
      } else
        e = u.treeContext, Te = Ot(f.nextSibling), Ve = t, se = !0, sl = null, Tt = !1, e !== null && gs(t, e), t = Ou(t, a), t.flags |= 4096;
      return t;
    }
    return e = Xt(e.child, {
      mode: a.mode,
      children: a.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function Au(e, t) {
    var l = t.ref;
    if (l === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object")
        throw Error(c(284));
      (e === null || e.ref !== l) && (t.flags |= 4194816);
    }
  }
  function Uc(e, t, l, a, n) {
    return Xl(t), l = hc(
      e,
      t,
      l,
      a,
      void 0,
      n
    ), a = vc(), e !== null && !He ? (yc(e, t, n), $t(e, t, n)) : (se && a && Wi(t), t.flags |= 1, Je(e, t, l, n), t.child);
  }
  function Uo(e, t, l, a, n, u) {
    return Xl(t), t.updateQueue = null, l = Hs(
      t,
      a,
      l,
      n
    ), ws(e), a = vc(), e !== null && !He ? (yc(e, t, u), $t(e, t, u)) : (se && a && Wi(t), t.flags |= 1, Je(e, t, l, u), t.child);
  }
  function wo(e, t, l, a, n) {
    if (Xl(t), t.stateNode === null) {
      var u = sa, f = l.contextType;
      typeof f == "object" && f !== null && (u = Ke(f)), u = new l(a, u), t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = jc, t.stateNode = u, u._reactInternals = t, u = t.stateNode, u.props = a, u.state = t.memoizedState, u.refs = {}, ic(t), f = l.contextType, u.context = typeof f == "object" && f !== null ? Ke(f) : sa, u.state = t.memoizedState, f = l.getDerivedStateFromProps, typeof f == "function" && (Mc(
        t,
        l,
        f,
        a
      ), u.state = t.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (f = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), f !== u.state && jc.enqueueReplaceState(u, u.state, null), rn(t, a, u, n), fn(), u.state = t.memoizedState), typeof u.componentDidMount == "function" && (t.flags |= 4194308), a = !0;
    } else if (e === null) {
      u = t.stateNode;
      var o = t.memoizedProps, y = $l(l, o);
      u.props = y;
      var _ = u.context, M = l.contextType;
      f = sa, typeof M == "object" && M !== null && (f = Ke(M));
      var C = l.getDerivedStateFromProps;
      M = typeof C == "function" || typeof u.getSnapshotBeforeUpdate == "function", o = t.pendingProps !== o, M || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (o || _ !== f) && Eo(
        t,
        u,
        a,
        f
      ), ml = !1;
      var O = t.memoizedState;
      u.state = O, rn(t, a, u, n), fn(), _ = t.memoizedState, o || O !== _ || ml ? (typeof C == "function" && (Mc(
        t,
        l,
        C,
        a
      ), _ = t.memoizedState), (y = ml || So(
        t,
        l,
        y,
        a,
        O,
        _,
        f
      )) ? (M || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = _), u.props = a, u.state = _, u.context = f, a = y) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), a = !1);
    } else {
      u = t.stateNode, cc(e, t), f = t.memoizedProps, M = $l(l, f), u.props = M, C = t.pendingProps, O = u.context, _ = l.contextType, y = sa, typeof _ == "object" && _ !== null && (y = Ke(_)), o = l.getDerivedStateFromProps, (_ = typeof o == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (f !== C || O !== y) && Eo(
        t,
        u,
        a,
        y
      ), ml = !1, O = t.memoizedState, u.state = O, rn(t, a, u, n), fn();
      var N = t.memoizedState;
      f !== C || O !== N || ml || e !== null && e.dependencies !== null && fu(e.dependencies) ? (typeof o == "function" && (Mc(
        t,
        l,
        o,
        a
      ), N = t.memoizedState), (M = ml || So(
        t,
        l,
        M,
        a,
        O,
        N,
        y
      ) || e !== null && e.dependencies !== null && fu(e.dependencies)) ? (_ || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(a, N, y), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        a,
        N,
        y
      )), typeof u.componentDidUpdate == "function" && (t.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || f === e.memoizedProps && O === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || f === e.memoizedProps && O === e.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = N), u.props = a, u.state = N, u.context = y, a = M) : (typeof u.componentDidUpdate != "function" || f === e.memoizedProps && O === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || f === e.memoizedProps && O === e.memoizedState || (t.flags |= 1024), a = !1);
    }
    return u = a, Au(e, t), a = (t.flags & 128) !== 0, u || a ? (u = t.stateNode, l = a && typeof l.getDerivedStateFromError != "function" ? null : u.render(), t.flags |= 1, e !== null && a ? (t.child = Kl(
      t,
      e.child,
      null,
      n
    ), t.child = Kl(
      t,
      null,
      l,
      n
    )) : Je(e, t, l, n), t.memoizedState = u.state, e = t.child) : e = $t(
      e,
      t,
      n
    ), e;
  }
  function Ho(e, t, l, a) {
    return Yl(), t.flags |= 256, Je(e, t, l, a), t.child;
  }
  var wc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Hc(e) {
    return { baseLanes: e, cachePool: Ts() };
  }
  function Bc(e, t, l) {
    return e = e !== null ? e.childLanes & ~l : 0, t && (e |= vt), e;
  }
  function Bo(e, t, l) {
    var a = t.pendingProps, n = !1, u = (t.flags & 128) !== 0, f;
    if ((f = u) || (f = e !== null && e.memoizedState === null ? !1 : (De.current & 2) !== 0), f && (n = !0, t.flags &= -129), f = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (se) {
        if (n ? yl(t) : pl(), (e = Te) ? (e = Vd(
          e,
          Tt
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: rl !== null ? { id: Ut, overflow: wt } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = vs(e), l.return = t, t.child = l, Ve = t, Te = null)) : e = null, e === null) throw ol(t);
        return Sf(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var o = a.children;
      return a = a.fallback, n ? (pl(), n = t.mode, o = Nu(
        { mode: "hidden", children: o },
        n
      ), a = ql(
        a,
        n,
        l,
        null
      ), o.return = t, a.return = t, o.sibling = a, t.child = o, a = t.child, a.memoizedState = Hc(l), a.childLanes = Bc(
        e,
        f,
        l
      ), t.memoizedState = wc, hn(null, a)) : (yl(t), Lc(t, o));
    }
    var y = e.memoizedState;
    if (y !== null && (o = y.dehydrated, o !== null)) {
      if (u)
        t.flags & 256 ? (yl(t), t.flags &= -257, t = qc(
          e,
          t,
          l
        )) : t.memoizedState !== null ? (pl(), t.child = e.child, t.flags |= 128, t = null) : (pl(), o = a.fallback, n = t.mode, a = Nu(
          { mode: "visible", children: a.children },
          n
        ), o = ql(
          o,
          n,
          l,
          null
        ), o.flags |= 2, a.return = t, o.return = t, a.sibling = o, t.child = a, Kl(
          t,
          e.child,
          null,
          l
        ), a = t.child, a.memoizedState = Hc(l), a.childLanes = Bc(
          e,
          f,
          l
        ), t.memoizedState = wc, t = hn(null, a));
      else if (yl(t), Sf(o)) {
        if (f = o.nextSibling && o.nextSibling.dataset, f) var _ = f.dgst;
        f = _, a = Error(c(419)), a.stack = "", a.digest = f, tn({ value: a, source: null, stack: null }), t = qc(
          e,
          t,
          l
        );
      } else if (He || ha(e, t, l, !1), f = (l & e.childLanes) !== 0, He || f) {
        if (f = ze, f !== null && (a = xr(f, l), a !== 0 && a !== y.retryLane))
          throw y.retryLane = a, Ll(e, a), it(f, e, a), Cc;
        bf(o) || Bu(), t = qc(
          e,
          t,
          l
        );
      } else
        bf(o) ? (t.flags |= 192, t.child = e.child, t = null) : (e = y.treeContext, Te = Ot(
          o.nextSibling
        ), Ve = t, se = !0, sl = null, Tt = !1, e !== null && gs(t, e), t = Lc(
          t,
          a.children
        ), t.flags |= 4096);
      return t;
    }
    return n ? (pl(), o = a.fallback, n = t.mode, y = e.child, _ = y.sibling, a = Xt(y, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = y.subtreeFlags & 65011712, _ !== null ? o = Xt(
      _,
      o
    ) : (o = ql(
      o,
      n,
      l,
      null
    ), o.flags |= 2), o.return = t, a.return = t, a.sibling = o, t.child = a, hn(null, a), a = t.child, o = e.child.memoizedState, o === null ? o = Hc(l) : (n = o.cachePool, n !== null ? (y = Ue._currentValue, n = n.parent !== y ? { parent: y, pool: y } : n) : n = Ts(), o = {
      baseLanes: o.baseLanes | l,
      cachePool: n
    }), a.memoizedState = o, a.childLanes = Bc(
      e,
      f,
      l
    ), t.memoizedState = wc, hn(e.child, a)) : (yl(t), l = e.child, e = l.sibling, l = Xt(l, {
      mode: "visible",
      children: a.children
    }), l.return = t, l.sibling = null, e !== null && (f = t.deletions, f === null ? (t.deletions = [e], t.flags |= 16) : f.push(e)), t.child = l, t.memoizedState = null, l);
  }
  function Lc(e, t) {
    return t = Nu(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function Nu(e, t) {
    return e = ot(22, e, null, t), e.lanes = 0, e;
  }
  function qc(e, t, l) {
    return Kl(t, e.child, null, l), e = Lc(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function Lo(e, t, l) {
    e.lanes |= t;
    var a = e.alternate;
    a !== null && (a.lanes |= t), ec(e.return, t, l);
  }
  function Yc(e, t, l, a, n, u) {
    var f = e.memoizedState;
    f === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: a,
      tail: l,
      tailMode: n,
      treeForkCount: u
    } : (f.isBackwards = t, f.rendering = null, f.renderingStartTime = 0, f.last = a, f.tail = l, f.tailMode = n, f.treeForkCount = u);
  }
  function qo(e, t, l) {
    var a = t.pendingProps, n = a.revealOrder, u = a.tail;
    a = a.children;
    var f = De.current, o = (f & 2) !== 0;
    if (o ? (f = f & 1 | 2, t.flags |= 128) : f &= 1, Q(De, f), Je(e, t, a, l), a = se ? en : 0, !o && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Lo(e, l, t);
        else if (e.tag === 19)
          Lo(e, l, t);
        else if (e.child !== null) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t)
            break e;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
    switch (n) {
      case "forwards":
        for (l = t.child, n = null; l !== null; )
          e = l.alternate, e !== null && yu(e) === null && (n = l), l = l.sibling;
        l = n, l === null ? (n = t.child, t.child = null) : (n = l.sibling, l.sibling = null), Yc(
          t,
          !1,
          n,
          l,
          u,
          a
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (l = null, n = t.child, t.child = null; n !== null; ) {
          if (e = n.alternate, e !== null && yu(e) === null) {
            t.child = n;
            break;
          }
          e = n.sibling, n.sibling = l, l = n, n = e;
        }
        Yc(
          t,
          !0,
          l,
          null,
          u,
          a
        );
        break;
      case "together":
        Yc(
          t,
          !1,
          null,
          null,
          void 0,
          a
        );
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function $t(e, t, l) {
    if (e !== null && (t.dependencies = e.dependencies), Sl |= t.lanes, (l & t.childLanes) === 0)
      if (e !== null) {
        if (ha(
          e,
          t,
          l,
          !1
        ), (l & t.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && t.child !== e.child)
      throw Error(c(153));
    if (t.child !== null) {
      for (e = t.child, l = Xt(e, e.pendingProps), t.child = l, l.return = t; e.sibling !== null; )
        e = e.sibling, l = l.sibling = Xt(e, e.pendingProps), l.return = t;
      l.sibling = null;
    }
    return t.child;
  }
  function Gc(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && fu(e)));
  }
  function L0(e, t, l) {
    switch (t.tag) {
      case 3:
        Pe(t, t.stateNode.containerInfo), dl(t, Ue, e.memoizedState.cache), Yl();
        break;
      case 27:
      case 5:
        qa(t);
        break;
      case 4:
        Pe(t, t.stateNode.containerInfo);
        break;
      case 10:
        dl(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, dc(t), null;
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null)
          return a.dehydrated !== null ? (yl(t), t.flags |= 128, null) : (l & t.child.childLanes) !== 0 ? Bo(e, t, l) : (yl(t), e = $t(
            e,
            t,
            l
          ), e !== null ? e.sibling : null);
        yl(t);
        break;
      case 19:
        var n = (e.flags & 128) !== 0;
        if (a = (l & t.childLanes) !== 0, a || (ha(
          e,
          t,
          l,
          !1
        ), a = (l & t.childLanes) !== 0), n) {
          if (a)
            return qo(
              e,
              t,
              l
            );
          t.flags |= 128;
        }
        if (n = t.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), Q(De, De.current), a) break;
        return null;
      case 22:
        return t.lanes = 0, jo(
          e,
          t,
          l,
          t.pendingProps
        );
      case 24:
        dl(t, Ue, e.memoizedState.cache);
    }
    return $t(e, t, l);
  }
  function Yo(e, t, l) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        He = !0;
      else {
        if (!Gc(e, l) && (t.flags & 128) === 0)
          return He = !1, L0(
            e,
            t,
            l
          );
        He = (e.flags & 131072) !== 0;
      }
    else
      He = !1, se && (t.flags & 1048576) !== 0 && ps(t, en, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var a = t.pendingProps;
          if (e = Zl(t.elementType), t.type = e, typeof e == "function")
            Ki(e) ? (a = $l(e, a), t.tag = 1, t = wo(
              null,
              t,
              e,
              a,
              l
            )) : (t.tag = 0, t = Uc(
              null,
              t,
              e,
              a,
              l
            ));
          else {
            if (e != null) {
              var n = e.$$typeof;
              if (n === ne) {
                t.tag = 11, t = No(
                  null,
                  t,
                  e,
                  a,
                  l
                );
                break e;
              } else if (n === P) {
                t.tag = 14, t = Ro(
                  null,
                  t,
                  e,
                  a,
                  l
                );
                break e;
              }
            }
            throw t = Lt(e) || e, Error(c(306, t, ""));
          }
        }
        return t;
      case 0:
        return Uc(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 1:
        return a = t.type, n = $l(
          a,
          t.pendingProps
        ), wo(
          e,
          t,
          a,
          n,
          l
        );
      case 3:
        e: {
          if (Pe(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(c(387));
          a = t.pendingProps;
          var u = t.memoizedState;
          n = u.element, cc(e, t), rn(t, a, null, l);
          var f = t.memoizedState;
          if (a = f.cache, dl(t, Ue, a), a !== u.cache && tc(
            t,
            [Ue],
            l,
            !0
          ), fn(), a = f.element, u.isDehydrated)
            if (u = {
              element: a,
              isDehydrated: !1,
              cache: f.cache
            }, t.updateQueue.baseState = u, t.memoizedState = u, t.flags & 256) {
              t = Ho(
                e,
                t,
                a,
                l
              );
              break e;
            } else if (a !== n) {
              n = Et(
                Error(c(424)),
                t
              ), tn(n), t = Ho(
                e,
                t,
                a,
                l
              );
              break e;
            } else {
              switch (e = t.stateNode.containerInfo, e.nodeType) {
                case 9:
                  e = e.body;
                  break;
                default:
                  e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
              }
              for (Te = Ot(e.firstChild), Ve = t, se = !0, sl = null, Tt = !0, l = Ms(
                t,
                null,
                a,
                l
              ), t.child = l; l; )
                l.flags = l.flags & -3 | 4096, l = l.sibling;
            }
          else {
            if (Yl(), a === n) {
              t = $t(
                e,
                t,
                l
              );
              break e;
            }
            Je(e, t, a, l);
          }
          t = t.child;
        }
        return t;
      case 26:
        return Au(e, t), e === null ? (l = Fd(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = l : se || (l = t.type, e = t.pendingProps, a = Zu(
          ue.current
        ).createElement(l), a[Ze] = t, a[et] = e, $e(a, l, e), Ye(a), t.stateNode = a) : t.memoizedState = Fd(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return qa(t), e === null && se && (a = t.stateNode = $d(
          t.type,
          t.pendingProps,
          ue.current
        ), Ve = t, Tt = !0, n = Te, _l(t.type) ? (Ef = n, Te = Ot(a.firstChild)) : Te = n), Je(
          e,
          t,
          t.pendingProps.children,
          l
        ), Au(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && se && ((n = a = Te) && (a = hv(
          a,
          t.type,
          t.pendingProps,
          Tt
        ), a !== null ? (t.stateNode = a, Ve = t, Te = Ot(a.firstChild), Tt = !1, n = !0) : n = !1), n || ol(t)), qa(t), n = t.type, u = t.pendingProps, f = e !== null ? e.memoizedProps : null, a = u.children, yf(n, u) ? a = null : f !== null && yf(n, f) && (t.flags |= 32), t.memoizedState !== null && (n = hc(
          e,
          t,
          R0,
          null,
          null,
          l
        ), Rn._currentValue = n), Au(e, t), Je(e, t, a, l), t.child;
      case 6:
        return e === null && se && ((e = l = Te) && (l = vv(
          l,
          t.pendingProps,
          Tt
        ), l !== null ? (t.stateNode = l, Ve = t, Te = null, e = !0) : e = !1), e || ol(t)), null;
      case 13:
        return Bo(e, t, l);
      case 4:
        return Pe(
          t,
          t.stateNode.containerInfo
        ), a = t.pendingProps, e === null ? t.child = Kl(
          t,
          null,
          a,
          l
        ) : Je(e, t, a, l), t.child;
      case 11:
        return No(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 7:
        return Je(
          e,
          t,
          t.pendingProps,
          l
        ), t.child;
      case 8:
        return Je(
          e,
          t,
          t.pendingProps.children,
          l
        ), t.child;
      case 12:
        return Je(
          e,
          t,
          t.pendingProps.children,
          l
        ), t.child;
      case 10:
        return a = t.pendingProps, dl(t, t.type, a.value), Je(e, t, a.children, l), t.child;
      case 9:
        return n = t.type._context, a = t.pendingProps.children, Xl(t), n = Ke(n), a = a(n), t.flags |= 1, Je(e, t, a, l), t.child;
      case 14:
        return Ro(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 15:
        return Mo(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 19:
        return qo(e, t, l);
      case 31:
        return B0(e, t, l);
      case 22:
        return jo(
          e,
          t,
          l,
          t.pendingProps
        );
      case 24:
        return Xl(t), a = Ke(Ue), e === null ? (n = nc(), n === null && (n = ze, u = lc(), n.pooledCache = u, u.refCount++, u !== null && (n.pooledCacheLanes |= l), n = u), t.memoizedState = { parent: a, cache: n }, ic(t), dl(t, Ue, n)) : ((e.lanes & l) !== 0 && (cc(e, t), rn(t, null, null, l), fn()), n = e.memoizedState, u = t.memoizedState, n.parent !== a ? (n = { parent: a, cache: a }, t.memoizedState = n, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = n), dl(t, Ue, a)) : (a = u.cache, dl(t, Ue, a), a !== n.cache && tc(
          t,
          [Ue],
          l,
          !0
        ))), Je(
          e,
          t,
          t.pendingProps.children,
          l
        ), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(c(156, t.tag));
  }
  function Wt(e) {
    e.flags |= 4;
  }
  function Xc(e, t, l, a, n) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (n & 335544128) === n)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (md()) e.flags |= 8192;
        else
          throw Vl = du, uc;
    } else e.flags &= -16777217;
  }
  function Go(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !lm(t))
      if (md()) e.flags |= 8192;
      else
        throw Vl = du, uc;
  }
  function Ru(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? br() : 536870912, e.lanes |= t, Oa |= t);
  }
  function vn(e, t) {
    if (!se)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var l = null; t !== null; )
            t.alternate !== null && (l = t), t = t.sibling;
          l === null ? e.tail = null : l.sibling = null;
          break;
        case "collapsed":
          l = e.tail;
          for (var a = null; l !== null; )
            l.alternate !== null && (a = l), l = l.sibling;
          a === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : a.sibling = null;
      }
  }
  function _e(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, l = 0, a = 0;
    if (t)
      for (var n = e.child; n !== null; )
        l |= n.lanes | n.childLanes, a |= n.subtreeFlags & 65011712, a |= n.flags & 65011712, n.return = e, n = n.sibling;
    else
      for (n = e.child; n !== null; )
        l |= n.lanes | n.childLanes, a |= n.subtreeFlags, a |= n.flags, n.return = e, n = n.sibling;
    return e.subtreeFlags |= a, e.childLanes = l, t;
  }
  function q0(e, t, l) {
    var a = t.pendingProps;
    switch (ki(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return _e(t), null;
      case 1:
        return _e(t), null;
      case 3:
        return l = t.stateNode, a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), Vt(Ue), je(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (e === null || e.child === null) && (ma(t) ? Wt(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Pi())), _e(t), null;
      case 26:
        var n = t.type, u = t.memoizedState;
        return e === null ? (Wt(t), u !== null ? (_e(t), Go(t, u)) : (_e(t), Xc(
          t,
          n,
          null,
          a,
          l
        ))) : u ? u !== e.memoizedState ? (Wt(t), _e(t), Go(t, u)) : (_e(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== a && Wt(t), _e(t), Xc(
          t,
          n,
          e,
          a,
          l
        )), null;
      case 27:
        if (Yn(t), l = ue.current, n = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== a && Wt(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(c(166));
            return _e(t), null;
          }
          e = K.current, ma(t) ? bs(t) : (e = $d(n, a, l), t.stateNode = e, Wt(t));
        }
        return _e(t), null;
      case 5:
        if (Yn(t), n = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== a && Wt(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(c(166));
            return _e(t), null;
          }
          if (u = K.current, ma(t))
            bs(t);
          else {
            var f = Zu(
              ue.current
            );
            switch (u) {
              case 1:
                u = f.createElementNS(
                  "http://www.w3.org/2000/svg",
                  n
                );
                break;
              case 2:
                u = f.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  n
                );
                break;
              default:
                switch (n) {
                  case "svg":
                    u = f.createElementNS(
                      "http://www.w3.org/2000/svg",
                      n
                    );
                    break;
                  case "math":
                    u = f.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      n
                    );
                    break;
                  case "script":
                    u = f.createElement("div"), u.innerHTML = "<script><\/script>", u = u.removeChild(
                      u.firstChild
                    );
                    break;
                  case "select":
                    u = typeof a.is == "string" ? f.createElement("select", {
                      is: a.is
                    }) : f.createElement("select"), a.multiple ? u.multiple = !0 : a.size && (u.size = a.size);
                    break;
                  default:
                    u = typeof a.is == "string" ? f.createElement(n, { is: a.is }) : f.createElement(n);
                }
            }
            u[Ze] = t, u[et] = a;
            e: for (f = t.child; f !== null; ) {
              if (f.tag === 5 || f.tag === 6)
                u.appendChild(f.stateNode);
              else if (f.tag !== 4 && f.tag !== 27 && f.child !== null) {
                f.child.return = f, f = f.child;
                continue;
              }
              if (f === t) break e;
              for (; f.sibling === null; ) {
                if (f.return === null || f.return === t)
                  break e;
                f = f.return;
              }
              f.sibling.return = f.return, f = f.sibling;
            }
            t.stateNode = u;
            e: switch ($e(u, n, a), n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                a = !!a.autoFocus;
                break e;
              case "img":
                a = !0;
                break e;
              default:
                a = !1;
            }
            a && Wt(t);
          }
        }
        return _e(t), Xc(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          l
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== a && Wt(t);
        else {
          if (typeof a != "string" && t.stateNode === null)
            throw Error(c(166));
          if (e = ue.current, ma(t)) {
            if (e = t.stateNode, l = t.memoizedProps, a = null, n = Ve, n !== null)
              switch (n.tag) {
                case 27:
                case 5:
                  a = n.memoizedProps;
              }
            e[Ze] = t, e = !!(e.nodeValue === l || a !== null && a.suppressHydrationWarning === !0 || Bd(e.nodeValue, l)), e || ol(t, !0);
          } else
            e = Zu(e).createTextNode(
              a
            ), e[Ze] = t, t.stateNode = e;
        }
        return _e(t), null;
      case 31:
        if (l = t.memoizedState, e === null || e.memoizedState !== null) {
          if (a = ma(t), l !== null) {
            if (e === null) {
              if (!a) throw Error(c(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(c(557));
              e[Ze] = t;
            } else
              Yl(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            _e(t), e = !1;
          } else
            l = Pi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = l), e = !0;
          if (!e)
            return t.flags & 256 ? (mt(t), t) : (mt(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(c(558));
        }
        return _e(t), null;
      case 13:
        if (a = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (n = ma(t), a !== null && a.dehydrated !== null) {
            if (e === null) {
              if (!n) throw Error(c(318));
              if (n = t.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(c(317));
              n[Ze] = t;
            } else
              Yl(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            _e(t), n = !1;
          } else
            n = Pi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), n = !0;
          if (!n)
            return t.flags & 256 ? (mt(t), t) : (mt(t), null);
        }
        return mt(t), (t.flags & 128) !== 0 ? (t.lanes = l, t) : (l = a !== null, e = e !== null && e.memoizedState !== null, l && (a = t.child, n = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (n = a.alternate.memoizedState.cachePool.pool), u = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (u = a.memoizedState.cachePool.pool), u !== n && (a.flags |= 2048)), l !== e && l && (t.child.flags |= 8192), Ru(t, t.updateQueue), _e(t), null);
      case 4:
        return je(), e === null && of(t.stateNode.containerInfo), _e(t), null;
      case 10:
        return Vt(t.type), _e(t), null;
      case 19:
        if (U(De), a = t.memoizedState, a === null) return _e(t), null;
        if (n = (t.flags & 128) !== 0, u = a.rendering, u === null)
          if (n) vn(a, !1);
          else {
            if (Me !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (u = yu(e), u !== null) {
                  for (t.flags |= 128, vn(a, !1), e = u.updateQueue, t.updateQueue = e, Ru(t, e), t.subtreeFlags = 0, e = l, l = t.child; l !== null; )
                    hs(l, e), l = l.sibling;
                  return Q(
                    De,
                    De.current & 1 | 2
                  ), se && Qt(t, a.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            a.tail !== null && ct() > Uu && (t.flags |= 128, n = !0, vn(a, !1), t.lanes = 4194304);
          }
        else {
          if (!n)
            if (e = yu(u), e !== null) {
              if (t.flags |= 128, n = !0, e = e.updateQueue, t.updateQueue = e, Ru(t, e), vn(a, !0), a.tail === null && a.tailMode === "hidden" && !u.alternate && !se)
                return _e(t), null;
            } else
              2 * ct() - a.renderingStartTime > Uu && l !== 536870912 && (t.flags |= 128, n = !0, vn(a, !1), t.lanes = 4194304);
          a.isBackwards ? (u.sibling = t.child, t.child = u) : (e = a.last, e !== null ? e.sibling = u : t.child = u, a.last = u);
        }
        return a.tail !== null ? (e = a.tail, a.rendering = e, a.tail = e.sibling, a.renderingStartTime = ct(), e.sibling = null, l = De.current, Q(
          De,
          n ? l & 1 | 2 : l & 1
        ), se && Qt(t, a.treeForkCount), e) : (_e(t), null);
      case 22:
      case 23:
        return mt(t), oc(), a = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192), a ? (l & 536870912) !== 0 && (t.flags & 128) === 0 && (_e(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : _e(t), l = t.updateQueue, l !== null && Ru(t, l.retryQueue), l = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== l && (t.flags |= 2048), e !== null && U(Ql), null;
      case 24:
        return l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), Vt(Ue), _e(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(c(156, t.tag));
  }
  function Y0(e, t) {
    switch (ki(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return Vt(Ue), je(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return Yn(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (mt(t), t.alternate === null)
            throw Error(c(340));
          Yl();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (mt(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(c(340));
          Yl();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return U(De), null;
      case 4:
        return je(), null;
      case 10:
        return Vt(t.type), null;
      case 22:
      case 23:
        return mt(t), oc(), e !== null && U(Ql), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return Vt(Ue), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Xo(e, t) {
    switch (ki(t), t.tag) {
      case 3:
        Vt(Ue), je();
        break;
      case 26:
      case 27:
      case 5:
        Yn(t);
        break;
      case 4:
        je();
        break;
      case 31:
        t.memoizedState !== null && mt(t);
        break;
      case 13:
        mt(t);
        break;
      case 19:
        U(De);
        break;
      case 10:
        Vt(t.type);
        break;
      case 22:
      case 23:
        mt(t), oc(), e !== null && U(Ql);
        break;
      case 24:
        Vt(Ue);
    }
  }
  function yn(e, t) {
    try {
      var l = t.updateQueue, a = l !== null ? l.lastEffect : null;
      if (a !== null) {
        var n = a.next;
        l = n;
        do {
          if ((l.tag & e) === e) {
            a = void 0;
            var u = l.create, f = l.inst;
            a = u(), f.destroy = a;
          }
          l = l.next;
        } while (l !== n);
      }
    } catch (o) {
      ye(t, t.return, o);
    }
  }
  function gl(e, t, l) {
    try {
      var a = t.updateQueue, n = a !== null ? a.lastEffect : null;
      if (n !== null) {
        var u = n.next;
        a = u;
        do {
          if ((a.tag & e) === e) {
            var f = a.inst, o = f.destroy;
            if (o !== void 0) {
              f.destroy = void 0, n = t;
              var y = l, _ = o;
              try {
                _();
              } catch (M) {
                ye(
                  n,
                  y,
                  M
                );
              }
            }
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (M) {
      ye(t, t.return, M);
    }
  }
  function Qo(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var l = e.stateNode;
      try {
        Ds(t, l);
      } catch (a) {
        ye(e, e.return, a);
      }
    }
  }
  function Zo(e, t, l) {
    l.props = $l(
      e.type,
      e.memoizedProps
    ), l.state = e.memoizedState;
    try {
      l.componentWillUnmount();
    } catch (a) {
      ye(e, t, a);
    }
  }
  function pn(e, t) {
    try {
      var l = e.ref;
      if (l !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var a = e.stateNode;
            break;
          case 30:
            a = e.stateNode;
            break;
          default:
            a = e.stateNode;
        }
        typeof l == "function" ? e.refCleanup = l(a) : l.current = a;
      }
    } catch (n) {
      ye(e, t, n);
    }
  }
  function Ht(e, t) {
    var l = e.ref, a = e.refCleanup;
    if (l !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (n) {
          ye(e, t, n);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof l == "function")
        try {
          l(null);
        } catch (n) {
          ye(e, t, n);
        }
      else l.current = null;
  }
  function Vo(e) {
    var t = e.type, l = e.memoizedProps, a = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          l.autoFocus && a.focus();
          break e;
        case "img":
          l.src ? a.src = l.src : l.srcSet && (a.srcset = l.srcSet);
      }
    } catch (n) {
      ye(e, e.return, n);
    }
  }
  function Qc(e, t, l) {
    try {
      var a = e.stateNode;
      fv(a, e.type, l, t), a[et] = t;
    } catch (n) {
      ye(e, e.return, n);
    }
  }
  function Ko(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && _l(e.type) || e.tag === 4;
  }
  function Zc(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Ko(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && _l(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Vc(e, t, l) {
    var a = e.tag;
    if (a === 5 || a === 6)
      e = e.stateNode, t ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(e, t) : (t = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, t.appendChild(e), l = l._reactRootContainer, l != null || t.onclick !== null || (t.onclick = Yt));
    else if (a !== 4 && (a === 27 && _l(e.type) && (l = e.stateNode, t = null), e = e.child, e !== null))
      for (Vc(e, t, l), e = e.sibling; e !== null; )
        Vc(e, t, l), e = e.sibling;
  }
  function Mu(e, t, l) {
    var a = e.tag;
    if (a === 5 || a === 6)
      e = e.stateNode, t ? l.insertBefore(e, t) : l.appendChild(e);
    else if (a !== 4 && (a === 27 && _l(e.type) && (l = e.stateNode), e = e.child, e !== null))
      for (Mu(e, t, l), e = e.sibling; e !== null; )
        Mu(e, t, l), e = e.sibling;
  }
  function Jo(e) {
    var t = e.stateNode, l = e.memoizedProps;
    try {
      for (var a = e.type, n = t.attributes; n.length; )
        t.removeAttributeNode(n[0]);
      $e(t, a, l), t[Ze] = e, t[et] = l;
    } catch (u) {
      ye(e, e.return, u);
    }
  }
  var kt = !1, Be = !1, Kc = !1, $o = typeof WeakSet == "function" ? WeakSet : Set, Ge = null;
  function G0(e, t) {
    if (e = e.containerInfo, hf = Fu, e = us(e), qi(e)) {
      if ("selectionStart" in e)
        var l = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      else
        e: {
          l = (l = e.ownerDocument) && l.defaultView || window;
          var a = l.getSelection && l.getSelection();
          if (a && a.rangeCount !== 0) {
            l = a.anchorNode;
            var n = a.anchorOffset, u = a.focusNode;
            a = a.focusOffset;
            try {
              l.nodeType, u.nodeType;
            } catch {
              l = null;
              break e;
            }
            var f = 0, o = -1, y = -1, _ = 0, M = 0, C = e, O = null;
            t: for (; ; ) {
              for (var N; C !== l || n !== 0 && C.nodeType !== 3 || (o = f + n), C !== u || a !== 0 && C.nodeType !== 3 || (y = f + a), C.nodeType === 3 && (f += C.nodeValue.length), (N = C.firstChild) !== null; )
                O = C, C = N;
              for (; ; ) {
                if (C === e) break t;
                if (O === l && ++_ === n && (o = f), O === u && ++M === a && (y = f), (N = C.nextSibling) !== null) break;
                C = O, O = C.parentNode;
              }
              C = N;
            }
            l = o === -1 || y === -1 ? null : { start: o, end: y };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (vf = { focusedElem: e, selectionRange: l }, Fu = !1, Ge = t; Ge !== null; )
      if (t = Ge, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, Ge = e;
      else
        for (; Ge !== null; ) {
          switch (t = Ge, u = t.alternate, e = t.flags, t.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = t.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (l = 0; l < e.length; l++)
                  n = e[l], n.ref.impl = n.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && u !== null) {
                e = void 0, l = t, n = u.memoizedProps, u = u.memoizedState, a = l.stateNode;
                try {
                  var V = $l(
                    l.type,
                    n
                  );
                  e = a.getSnapshotBeforeUpdate(
                    V,
                    u
                  ), a.__reactInternalSnapshotBeforeUpdate = e;
                } catch (k) {
                  ye(
                    l,
                    l.return,
                    k
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = t.stateNode.containerInfo, l = e.nodeType, l === 9)
                  gf(e);
                else if (l === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      gf(e);
                      break;
                    default:
                      e.textContent = "";
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
              if ((e & 1024) !== 0) throw Error(c(163));
          }
          if (e = t.sibling, e !== null) {
            e.return = t.return, Ge = e;
            break;
          }
          Ge = t.return;
        }
  }
  function Wo(e, t, l) {
    var a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Pt(e, l), a & 4 && yn(5, l);
        break;
      case 1:
        if (Pt(e, l), a & 4)
          if (e = l.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (f) {
              ye(l, l.return, f);
            }
          else {
            var n = $l(
              l.type,
              t.memoizedProps
            );
            t = t.memoizedState;
            try {
              e.componentDidUpdate(
                n,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (f) {
              ye(
                l,
                l.return,
                f
              );
            }
          }
        a & 64 && Qo(l), a & 512 && pn(l, l.return);
        break;
      case 3:
        if (Pt(e, l), a & 64 && (e = l.updateQueue, e !== null)) {
          if (t = null, l.child !== null)
            switch (l.child.tag) {
              case 27:
              case 5:
                t = l.child.stateNode;
                break;
              case 1:
                t = l.child.stateNode;
            }
          try {
            Ds(e, t);
          } catch (f) {
            ye(l, l.return, f);
          }
        }
        break;
      case 27:
        t === null && a & 4 && Jo(l);
      case 26:
      case 5:
        Pt(e, l), t === null && a & 4 && Vo(l), a & 512 && pn(l, l.return);
        break;
      case 12:
        Pt(e, l);
        break;
      case 31:
        Pt(e, l), a & 4 && Po(e, l);
        break;
      case 13:
        Pt(e, l), a & 4 && Io(e, l), a & 64 && (e = l.memoizedState, e !== null && (e = e.dehydrated, e !== null && (l = k0.bind(
          null,
          l
        ), yv(e, l))));
        break;
      case 22:
        if (a = l.memoizedState !== null || kt, !a) {
          t = t !== null && t.memoizedState !== null || Be, n = kt;
          var u = Be;
          kt = a, (Be = t) && !u ? It(
            e,
            l,
            (l.subtreeFlags & 8772) !== 0
          ) : Pt(e, l), kt = n, Be = u;
        }
        break;
      case 30:
        break;
      default:
        Pt(e, l);
    }
  }
  function ko(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, ko(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && xi(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Ae = null, lt = !1;
  function Ft(e, t, l) {
    for (l = l.child; l !== null; )
      Fo(e, t, l), l = l.sibling;
  }
  function Fo(e, t, l) {
    if (ft && typeof ft.onCommitFiberUnmount == "function")
      try {
        ft.onCommitFiberUnmount(Ya, l);
      } catch {
      }
    switch (l.tag) {
      case 26:
        Be || Ht(l, t), Ft(
          e,
          t,
          l
        ), l.memoizedState ? l.memoizedState.count-- : l.stateNode && (l = l.stateNode, l.parentNode.removeChild(l));
        break;
      case 27:
        Be || Ht(l, t);
        var a = Ae, n = lt;
        _l(l.type) && (Ae = l.stateNode, lt = !1), Ft(
          e,
          t,
          l
        ), On(l.stateNode), Ae = a, lt = n;
        break;
      case 5:
        Be || Ht(l, t);
      case 6:
        if (a = Ae, n = lt, Ae = null, Ft(
          e,
          t,
          l
        ), Ae = a, lt = n, Ae !== null)
          if (lt)
            try {
              (Ae.nodeType === 9 ? Ae.body : Ae.nodeName === "HTML" ? Ae.ownerDocument.body : Ae).removeChild(l.stateNode);
            } catch (u) {
              ye(
                l,
                t,
                u
              );
            }
          else
            try {
              Ae.removeChild(l.stateNode);
            } catch (u) {
              ye(
                l,
                t,
                u
              );
            }
        break;
      case 18:
        Ae !== null && (lt ? (e = Ae, Qd(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          l.stateNode
        ), Ua(e)) : Qd(Ae, l.stateNode));
        break;
      case 4:
        a = Ae, n = lt, Ae = l.stateNode.containerInfo, lt = !0, Ft(
          e,
          t,
          l
        ), Ae = a, lt = n;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        gl(2, l, t), Be || gl(4, l, t), Ft(
          e,
          t,
          l
        );
        break;
      case 1:
        Be || (Ht(l, t), a = l.stateNode, typeof a.componentWillUnmount == "function" && Zo(
          l,
          t,
          a
        )), Ft(
          e,
          t,
          l
        );
        break;
      case 21:
        Ft(
          e,
          t,
          l
        );
        break;
      case 22:
        Be = (a = Be) || l.memoizedState !== null, Ft(
          e,
          t,
          l
        ), Be = a;
        break;
      default:
        Ft(
          e,
          t,
          l
        );
    }
  }
  function Po(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Ua(e);
      } catch (l) {
        ye(t, t.return, l);
      }
    }
  }
  function Io(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Ua(e);
      } catch (l) {
        ye(t, t.return, l);
      }
  }
  function X0(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new $o()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new $o()), t;
      default:
        throw Error(c(435, e.tag));
    }
  }
  function ju(e, t) {
    var l = X0(e);
    t.forEach(function(a) {
      if (!l.has(a)) {
        l.add(a);
        var n = F0.bind(null, e, a);
        a.then(n, n);
      }
    });
  }
  function at(e, t) {
    var l = t.deletions;
    if (l !== null)
      for (var a = 0; a < l.length; a++) {
        var n = l[a], u = e, f = t, o = f;
        e: for (; o !== null; ) {
          switch (o.tag) {
            case 27:
              if (_l(o.type)) {
                Ae = o.stateNode, lt = !1;
                break e;
              }
              break;
            case 5:
              Ae = o.stateNode, lt = !1;
              break e;
            case 3:
            case 4:
              Ae = o.stateNode.containerInfo, lt = !0;
              break e;
          }
          o = o.return;
        }
        if (Ae === null) throw Error(c(160));
        Fo(u, f, n), Ae = null, lt = !1, u = n.alternate, u !== null && (u.return = null), n.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        ed(t, e), t = t.sibling;
  }
  var jt = null;
  function ed(e, t) {
    var l = e.alternate, a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        at(t, e), nt(e), a & 4 && (gl(3, e, e.return), yn(3, e), gl(5, e, e.return));
        break;
      case 1:
        at(t, e), nt(e), a & 512 && (Be || l === null || Ht(l, l.return)), a & 64 && kt && (e = e.updateQueue, e !== null && (a = e.callbacks, a !== null && (l = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = l === null ? a : l.concat(a))));
        break;
      case 26:
        var n = jt;
        if (at(t, e), nt(e), a & 512 && (Be || l === null || Ht(l, l.return)), a & 4) {
          var u = l !== null ? l.memoizedState : null;
          if (a = e.memoizedState, l === null)
            if (a === null)
              if (e.stateNode === null) {
                e: {
                  a = e.type, l = e.memoizedProps, n = n.ownerDocument || n;
                  t: switch (a) {
                    case "title":
                      u = n.getElementsByTagName("title")[0], (!u || u[Qa] || u[Ze] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = n.createElement(a), n.head.insertBefore(
                        u,
                        n.querySelector("head > title")
                      )), $e(u, a, l), u[Ze] = e, Ye(u), a = u;
                      break e;
                    case "link":
                      var f = em(
                        "link",
                        "href",
                        n
                      ).get(a + (l.href || ""));
                      if (f) {
                        for (var o = 0; o < f.length; o++)
                          if (u = f[o], u.getAttribute("href") === (l.href == null || l.href === "" ? null : l.href) && u.getAttribute("rel") === (l.rel == null ? null : l.rel) && u.getAttribute("title") === (l.title == null ? null : l.title) && u.getAttribute("crossorigin") === (l.crossOrigin == null ? null : l.crossOrigin)) {
                            f.splice(o, 1);
                            break t;
                          }
                      }
                      u = n.createElement(a), $e(u, a, l), n.head.appendChild(u);
                      break;
                    case "meta":
                      if (f = em(
                        "meta",
                        "content",
                        n
                      ).get(a + (l.content || ""))) {
                        for (o = 0; o < f.length; o++)
                          if (u = f[o], u.getAttribute("content") === (l.content == null ? null : "" + l.content) && u.getAttribute("name") === (l.name == null ? null : l.name) && u.getAttribute("property") === (l.property == null ? null : l.property) && u.getAttribute("http-equiv") === (l.httpEquiv == null ? null : l.httpEquiv) && u.getAttribute("charset") === (l.charSet == null ? null : l.charSet)) {
                            f.splice(o, 1);
                            break t;
                          }
                      }
                      u = n.createElement(a), $e(u, a, l), n.head.appendChild(u);
                      break;
                    default:
                      throw Error(c(468, a));
                  }
                  u[Ze] = e, Ye(u), a = u;
                }
                e.stateNode = a;
              } else
                tm(
                  n,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = Id(
                n,
                a,
                e.memoizedProps
              );
          else
            u !== a ? (u === null ? l.stateNode !== null && (l = l.stateNode, l.parentNode.removeChild(l)) : u.count--, a === null ? tm(
              n,
              e.type,
              e.stateNode
            ) : Id(
              n,
              a,
              e.memoizedProps
            )) : a === null && e.stateNode !== null && Qc(
              e,
              e.memoizedProps,
              l.memoizedProps
            );
        }
        break;
      case 27:
        at(t, e), nt(e), a & 512 && (Be || l === null || Ht(l, l.return)), l !== null && a & 4 && Qc(
          e,
          e.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (at(t, e), nt(e), a & 512 && (Be || l === null || Ht(l, l.return)), e.flags & 32) {
          n = e.stateNode;
          try {
            aa(n, "");
          } catch (V) {
            ye(e, e.return, V);
          }
        }
        a & 4 && e.stateNode != null && (n = e.memoizedProps, Qc(
          e,
          n,
          l !== null ? l.memoizedProps : n
        )), a & 1024 && (Kc = !0);
        break;
      case 6:
        if (at(t, e), nt(e), a & 4) {
          if (e.stateNode === null)
            throw Error(c(162));
          a = e.memoizedProps, l = e.stateNode;
          try {
            l.nodeValue = a;
          } catch (V) {
            ye(e, e.return, V);
          }
        }
        break;
      case 3:
        if (Ju = null, n = jt, jt = Vu(t.containerInfo), at(t, e), jt = n, nt(e), a & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            Ua(t.containerInfo);
          } catch (V) {
            ye(e, e.return, V);
          }
        Kc && (Kc = !1, td(e));
        break;
      case 4:
        a = jt, jt = Vu(
          e.stateNode.containerInfo
        ), at(t, e), nt(e), jt = a;
        break;
      case 12:
        at(t, e), nt(e);
        break;
      case 31:
        at(t, e), nt(e), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, ju(e, a)));
        break;
      case 13:
        at(t, e), nt(e), e.child.flags & 8192 && e.memoizedState !== null != (l !== null && l.memoizedState !== null) && (Cu = ct()), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, ju(e, a)));
        break;
      case 22:
        n = e.memoizedState !== null;
        var y = l !== null && l.memoizedState !== null, _ = kt, M = Be;
        if (kt = _ || n, Be = M || y, at(t, e), Be = M, kt = _, nt(e), a & 8192)
          e: for (t = e.stateNode, t._visibility = n ? t._visibility & -2 : t._visibility | 1, n && (l === null || y || kt || Be || Wl(e)), l = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (l === null) {
                y = l = t;
                try {
                  if (u = y.stateNode, n)
                    f = u.style, typeof f.setProperty == "function" ? f.setProperty("display", "none", "important") : f.display = "none";
                  else {
                    o = y.stateNode;
                    var C = y.memoizedProps.style, O = C != null && C.hasOwnProperty("display") ? C.display : null;
                    o.style.display = O == null || typeof O == "boolean" ? "" : ("" + O).trim();
                  }
                } catch (V) {
                  ye(y, y.return, V);
                }
              }
            } else if (t.tag === 6) {
              if (l === null) {
                y = t;
                try {
                  y.stateNode.nodeValue = n ? "" : y.memoizedProps;
                } catch (V) {
                  ye(y, y.return, V);
                }
              }
            } else if (t.tag === 18) {
              if (l === null) {
                y = t;
                try {
                  var N = y.stateNode;
                  n ? Zd(N, !0) : Zd(y.stateNode, !1);
                } catch (V) {
                  ye(y, y.return, V);
                }
              }
            } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
              t.child.return = t, t = t.child;
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              l === t && (l = null), t = t.return;
            }
            l === t && (l = null), t.sibling.return = t.return, t = t.sibling;
          }
        a & 4 && (a = e.updateQueue, a !== null && (l = a.retryQueue, l !== null && (a.retryQueue = null, ju(e, l))));
        break;
      case 19:
        at(t, e), nt(e), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, ju(e, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        at(t, e), nt(e);
    }
  }
  function nt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var l, a = e.return; a !== null; ) {
          if (Ko(a)) {
            l = a;
            break;
          }
          a = a.return;
        }
        if (l == null) throw Error(c(160));
        switch (l.tag) {
          case 27:
            var n = l.stateNode, u = Zc(e);
            Mu(e, u, n);
            break;
          case 5:
            var f = l.stateNode;
            l.flags & 32 && (aa(f, ""), l.flags &= -33);
            var o = Zc(e);
            Mu(e, o, f);
            break;
          case 3:
          case 4:
            var y = l.stateNode.containerInfo, _ = Zc(e);
            Vc(
              e,
              _,
              y
            );
            break;
          default:
            throw Error(c(161));
        }
      } catch (M) {
        ye(e, e.return, M);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function td(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        td(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function Pt(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        Wo(e, t.alternate, t), t = t.sibling;
  }
  function Wl(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          gl(4, t, t.return), Wl(t);
          break;
        case 1:
          Ht(t, t.return);
          var l = t.stateNode;
          typeof l.componentWillUnmount == "function" && Zo(
            t,
            t.return,
            l
          ), Wl(t);
          break;
        case 27:
          On(t.stateNode);
        case 26:
        case 5:
          Ht(t, t.return), Wl(t);
          break;
        case 22:
          t.memoizedState === null && Wl(t);
          break;
        case 30:
          Wl(t);
          break;
        default:
          Wl(t);
      }
      e = e.sibling;
    }
  }
  function It(e, t, l) {
    for (l = l && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var a = t.alternate, n = e, u = t, f = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          It(
            n,
            u,
            l
          ), yn(4, u);
          break;
        case 1:
          if (It(
            n,
            u,
            l
          ), a = u, n = a.stateNode, typeof n.componentDidMount == "function")
            try {
              n.componentDidMount();
            } catch (_) {
              ye(a, a.return, _);
            }
          if (a = u, n = a.updateQueue, n !== null) {
            var o = a.stateNode;
            try {
              var y = n.shared.hiddenCallbacks;
              if (y !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < y.length; n++)
                  js(y[n], o);
            } catch (_) {
              ye(a, a.return, _);
            }
          }
          l && f & 64 && Qo(u), pn(u, u.return);
          break;
        case 27:
          Jo(u);
        case 26:
        case 5:
          It(
            n,
            u,
            l
          ), l && a === null && f & 4 && Vo(u), pn(u, u.return);
          break;
        case 12:
          It(
            n,
            u,
            l
          );
          break;
        case 31:
          It(
            n,
            u,
            l
          ), l && f & 4 && Po(n, u);
          break;
        case 13:
          It(
            n,
            u,
            l
          ), l && f & 4 && Io(n, u);
          break;
        case 22:
          u.memoizedState === null && It(
            n,
            u,
            l
          ), pn(u, u.return);
          break;
        case 30:
          break;
        default:
          It(
            n,
            u,
            l
          );
      }
      t = t.sibling;
    }
  }
  function Jc(e, t) {
    var l = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== l && (e != null && e.refCount++, l != null && ln(l));
  }
  function $c(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ln(e));
  }
  function Dt(e, t, l, a) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        ld(
          e,
          t,
          l,
          a
        ), t = t.sibling;
  }
  function ld(e, t, l, a) {
    var n = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Dt(
          e,
          t,
          l,
          a
        ), n & 2048 && yn(9, t);
        break;
      case 1:
        Dt(
          e,
          t,
          l,
          a
        );
        break;
      case 3:
        Dt(
          e,
          t,
          l,
          a
        ), n & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ln(e)));
        break;
      case 12:
        if (n & 2048) {
          Dt(
            e,
            t,
            l,
            a
          ), e = t.stateNode;
          try {
            var u = t.memoizedProps, f = u.id, o = u.onPostCommit;
            typeof o == "function" && o(
              f,
              t.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (y) {
            ye(t, t.return, y);
          }
        } else
          Dt(
            e,
            t,
            l,
            a
          );
        break;
      case 31:
        Dt(
          e,
          t,
          l,
          a
        );
        break;
      case 13:
        Dt(
          e,
          t,
          l,
          a
        );
        break;
      case 23:
        break;
      case 22:
        u = t.stateNode, f = t.alternate, t.memoizedState !== null ? u._visibility & 2 ? Dt(
          e,
          t,
          l,
          a
        ) : gn(e, t) : u._visibility & 2 ? Dt(
          e,
          t,
          l,
          a
        ) : (u._visibility |= 2, za(
          e,
          t,
          l,
          a,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), n & 2048 && Jc(f, t);
        break;
      case 24:
        Dt(
          e,
          t,
          l,
          a
        ), n & 2048 && $c(t.alternate, t);
        break;
      default:
        Dt(
          e,
          t,
          l,
          a
        );
    }
  }
  function za(e, t, l, a, n) {
    for (n = n && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var u = e, f = t, o = l, y = a, _ = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          za(
            u,
            f,
            o,
            y,
            n
          ), yn(8, f);
          break;
        case 23:
          break;
        case 22:
          var M = f.stateNode;
          f.memoizedState !== null ? M._visibility & 2 ? za(
            u,
            f,
            o,
            y,
            n
          ) : gn(
            u,
            f
          ) : (M._visibility |= 2, za(
            u,
            f,
            o,
            y,
            n
          )), n && _ & 2048 && Jc(
            f.alternate,
            f
          );
          break;
        case 24:
          za(
            u,
            f,
            o,
            y,
            n
          ), n && _ & 2048 && $c(f.alternate, f);
          break;
        default:
          za(
            u,
            f,
            o,
            y,
            n
          );
      }
      t = t.sibling;
    }
  }
  function gn(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var l = e, a = t, n = a.flags;
        switch (a.tag) {
          case 22:
            gn(l, a), n & 2048 && Jc(
              a.alternate,
              a
            );
            break;
          case 24:
            gn(l, a), n & 2048 && $c(a.alternate, a);
            break;
          default:
            gn(l, a);
        }
        t = t.sibling;
      }
  }
  var bn = 8192;
  function Ta(e, t, l) {
    if (e.subtreeFlags & bn)
      for (e = e.child; e !== null; )
        ad(
          e,
          t,
          l
        ), e = e.sibling;
  }
  function ad(e, t, l) {
    switch (e.tag) {
      case 26:
        Ta(
          e,
          t,
          l
        ), e.flags & bn && e.memoizedState !== null && Nv(
          l,
          jt,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        Ta(
          e,
          t,
          l
        );
        break;
      case 3:
      case 4:
        var a = jt;
        jt = Vu(e.stateNode.containerInfo), Ta(
          e,
          t,
          l
        ), jt = a;
        break;
      case 22:
        e.memoizedState === null && (a = e.alternate, a !== null && a.memoizedState !== null ? (a = bn, bn = 16777216, Ta(
          e,
          t,
          l
        ), bn = a) : Ta(
          e,
          t,
          l
        ));
        break;
      default:
        Ta(
          e,
          t,
          l
        );
    }
  }
  function nd(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function Sn(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var a = t[l];
          Ge = a, id(
            a,
            e
          );
        }
      nd(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        ud(e), e = e.sibling;
  }
  function ud(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Sn(e), e.flags & 2048 && gl(9, e, e.return);
        break;
      case 3:
        Sn(e);
        break;
      case 12:
        Sn(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Du(e)) : Sn(e);
        break;
      default:
        Sn(e);
    }
  }
  function Du(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var a = t[l];
          Ge = a, id(
            a,
            e
          );
        }
      nd(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          gl(8, t, t.return), Du(t);
          break;
        case 22:
          l = t.stateNode, l._visibility & 2 && (l._visibility &= -3, Du(t));
          break;
        default:
          Du(t);
      }
      e = e.sibling;
    }
  }
  function id(e, t) {
    for (; Ge !== null; ) {
      var l = Ge;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          gl(8, l, t);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var a = l.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          ln(l.memoizedState.cache);
      }
      if (a = l.child, a !== null) a.return = l, Ge = a;
      else
        e: for (l = e; Ge !== null; ) {
          a = Ge;
          var n = a.sibling, u = a.return;
          if (ko(a), a === l) {
            Ge = null;
            break e;
          }
          if (n !== null) {
            n.return = u, Ge = n;
            break e;
          }
          Ge = u;
        }
    }
  }
  var Q0 = {
    getCacheForType: function(e) {
      var t = Ke(Ue), l = t.data.get(e);
      return l === void 0 && (l = e(), t.data.set(e, l)), l;
    },
    cacheSignal: function() {
      return Ke(Ue).controller.signal;
    }
  }, Z0 = typeof WeakMap == "function" ? WeakMap : Map, me = 0, ze = null, ie = null, fe = 0, ve = 0, ht = null, bl = !1, _a = !1, Wc = !1, el = 0, Me = 0, Sl = 0, kl = 0, kc = 0, vt = 0, Oa = 0, En = null, ut = null, Fc = !1, Cu = 0, cd = 0, Uu = 1 / 0, wu = null, El = null, Le = 0, xl = null, Aa = null, tl = 0, Pc = 0, Ic = null, fd = null, xn = 0, ef = null;
  function yt() {
    return (me & 2) !== 0 && fe !== 0 ? fe & -fe : j.T !== null ? cf() : zr();
  }
  function rd() {
    if (vt === 0)
      if ((fe & 536870912) === 0 || se) {
        var e = Qn;
        Qn <<= 1, (Qn & 3932160) === 0 && (Qn = 262144), vt = e;
      } else vt = 536870912;
    return e = dt.current, e !== null && (e.flags |= 32), vt;
  }
  function it(e, t, l) {
    (e === ze && (ve === 2 || ve === 9) || e.cancelPendingCommit !== null) && (Na(e, 0), zl(
      e,
      fe,
      vt,
      !1
    )), Xa(e, l), ((me & 2) === 0 || e !== ze) && (e === ze && ((me & 2) === 0 && (kl |= l), Me === 4 && zl(
      e,
      fe,
      vt,
      !1
    )), Bt(e));
  }
  function sd(e, t, l) {
    if ((me & 6) !== 0) throw Error(c(327));
    var a = !l && (t & 127) === 0 && (t & e.expiredLanes) === 0 || Ga(e, t), n = a ? J0(e, t) : lf(e, t, !0), u = a;
    do {
      if (n === 0) {
        _a && !a && zl(e, t, 0, !1);
        break;
      } else {
        if (l = e.current.alternate, u && !V0(l)) {
          n = lf(e, t, !1), u = !1;
          continue;
        }
        if (n === 2) {
          if (u = t, e.errorRecoveryDisabledLanes & u)
            var f = 0;
          else
            f = e.pendingLanes & -536870913, f = f !== 0 ? f : f & 536870912 ? 536870912 : 0;
          if (f !== 0) {
            t = f;
            e: {
              var o = e;
              n = En;
              var y = o.current.memoizedState.isDehydrated;
              if (y && (Na(o, f).flags |= 256), f = lf(
                o,
                f,
                !1
              ), f !== 2) {
                if (Wc && !y) {
                  o.errorRecoveryDisabledLanes |= u, kl |= u, n = 4;
                  break e;
                }
                u = ut, ut = n, u !== null && (ut === null ? ut = u : ut.push.apply(
                  ut,
                  u
                ));
              }
              n = f;
            }
            if (u = !1, n !== 2) continue;
          }
        }
        if (n === 1) {
          Na(e, 0), zl(e, t, 0, !0);
          break;
        }
        e: {
          switch (a = e, u = n, u) {
            case 0:
            case 1:
              throw Error(c(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              zl(
                a,
                t,
                vt,
                !bl
              );
              break e;
            case 2:
              ut = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(c(329));
          }
          if ((t & 62914560) === t && (n = Cu + 300 - ct(), 10 < n)) {
            if (zl(
              a,
              t,
              vt,
              !bl
            ), Vn(a, 0, !0) !== 0) break e;
            tl = t, a.timeoutHandle = Gd(
              od.bind(
                null,
                a,
                l,
                ut,
                wu,
                Fc,
                t,
                vt,
                kl,
                Oa,
                bl,
                u,
                "Throttled",
                -0,
                0
              ),
              n
            );
            break e;
          }
          od(
            a,
            l,
            ut,
            wu,
            Fc,
            t,
            vt,
            kl,
            Oa,
            bl,
            u,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Bt(e);
  }
  function od(e, t, l, a, n, u, f, o, y, _, M, C, O, N) {
    if (e.timeoutHandle = -1, C = t.subtreeFlags, C & 8192 || (C & 16785408) === 16785408) {
      C = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Yt
      }, ad(
        t,
        u,
        C
      );
      var V = (u & 62914560) === u ? Cu - ct() : (u & 4194048) === u ? cd - ct() : 0;
      if (V = Rv(
        C,
        V
      ), V !== null) {
        tl = u, e.cancelPendingCommit = V(
          bd.bind(
            null,
            e,
            t,
            u,
            l,
            a,
            n,
            f,
            o,
            y,
            M,
            C,
            null,
            O,
            N
          )
        ), zl(e, u, f, !_);
        return;
      }
    }
    bd(
      e,
      t,
      u,
      l,
      a,
      n,
      f,
      o,
      y
    );
  }
  function V0(e) {
    for (var t = e; ; ) {
      var l = t.tag;
      if ((l === 0 || l === 11 || l === 15) && t.flags & 16384 && (l = t.updateQueue, l !== null && (l = l.stores, l !== null)))
        for (var a = 0; a < l.length; a++) {
          var n = l[a], u = n.getSnapshot;
          n = n.value;
          try {
            if (!st(u(), n)) return !1;
          } catch {
            return !1;
          }
        }
      if (l = t.child, t.subtreeFlags & 16384 && l !== null)
        l.return = t, t = l;
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return !0;
  }
  function zl(e, t, l, a) {
    t &= ~kc, t &= ~kl, e.suspendedLanes |= t, e.pingedLanes &= ~t, a && (e.warmLanes |= t), a = e.expirationTimes;
    for (var n = t; 0 < n; ) {
      var u = 31 - rt(n), f = 1 << u;
      a[u] = -1, n &= ~f;
    }
    l !== 0 && Sr(e, l, t);
  }
  function Hu() {
    return (me & 6) === 0 ? (zn(0), !1) : !0;
  }
  function tf() {
    if (ie !== null) {
      if (ve === 0)
        var e = ie.return;
      else
        e = ie, Zt = Gl = null, pc(e), ga = null, nn = 0, e = ie;
      for (; e !== null; )
        Xo(e.alternate, e), e = e.return;
      ie = null;
    }
  }
  function Na(e, t) {
    var l = e.timeoutHandle;
    l !== -1 && (e.timeoutHandle = -1, ov(l)), l = e.cancelPendingCommit, l !== null && (e.cancelPendingCommit = null, l()), tl = 0, tf(), ze = e, ie = l = Xt(e.current, null), fe = t, ve = 0, ht = null, bl = !1, _a = Ga(e, t), Wc = !1, Oa = vt = kc = kl = Sl = Me = 0, ut = En = null, Fc = !1, (t & 8) !== 0 && (t |= t & 32);
    var a = e.entangledLanes;
    if (a !== 0)
      for (e = e.entanglements, a &= t; 0 < a; ) {
        var n = 31 - rt(a), u = 1 << n;
        t |= e[n], a &= ~u;
      }
    return el = t, au(), l;
  }
  function dd(e, t) {
    te = null, j.H = mn, t === pa || t === ou ? (t = As(), ve = 3) : t === uc ? (t = As(), ve = 4) : ve = t === Cc ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, ht = t, ie === null && (Me = 1, _u(
      e,
      Et(t, e.current)
    ));
  }
  function md() {
    var e = dt.current;
    return e === null ? !0 : (fe & 4194048) === fe ? _t === null : (fe & 62914560) === fe || (fe & 536870912) !== 0 ? e === _t : !1;
  }
  function hd() {
    var e = j.H;
    return j.H = mn, e === null ? mn : e;
  }
  function vd() {
    var e = j.A;
    return j.A = Q0, e;
  }
  function Bu() {
    Me = 4, bl || (fe & 4194048) !== fe && dt.current !== null || (_a = !0), (Sl & 134217727) === 0 && (kl & 134217727) === 0 || ze === null || zl(
      ze,
      fe,
      vt,
      !1
    );
  }
  function lf(e, t, l) {
    var a = me;
    me |= 2;
    var n = hd(), u = vd();
    (ze !== e || fe !== t) && (wu = null, Na(e, t)), t = !1;
    var f = Me;
    e: do
      try {
        if (ve !== 0 && ie !== null) {
          var o = ie, y = ht;
          switch (ve) {
            case 8:
              tf(), f = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              dt.current === null && (t = !0);
              var _ = ve;
              if (ve = 0, ht = null, Ra(e, o, y, _), l && _a) {
                f = 0;
                break e;
              }
              break;
            default:
              _ = ve, ve = 0, ht = null, Ra(e, o, y, _);
          }
        }
        K0(), f = Me;
        break;
      } catch (M) {
        dd(e, M);
      }
    while (!0);
    return t && e.shellSuspendCounter++, Zt = Gl = null, me = a, j.H = n, j.A = u, ie === null && (ze = null, fe = 0, au()), f;
  }
  function K0() {
    for (; ie !== null; ) yd(ie);
  }
  function J0(e, t) {
    var l = me;
    me |= 2;
    var a = hd(), n = vd();
    ze !== e || fe !== t ? (wu = null, Uu = ct() + 500, Na(e, t)) : _a = Ga(
      e,
      t
    );
    e: do
      try {
        if (ve !== 0 && ie !== null) {
          t = ie;
          var u = ht;
          t: switch (ve) {
            case 1:
              ve = 0, ht = null, Ra(e, t, u, 1);
              break;
            case 2:
            case 9:
              if (_s(u)) {
                ve = 0, ht = null, pd(t);
                break;
              }
              t = function() {
                ve !== 2 && ve !== 9 || ze !== e || (ve = 7), Bt(e);
              }, u.then(t, t);
              break e;
            case 3:
              ve = 7;
              break e;
            case 4:
              ve = 5;
              break e;
            case 7:
              _s(u) ? (ve = 0, ht = null, pd(t)) : (ve = 0, ht = null, Ra(e, t, u, 7));
              break;
            case 5:
              var f = null;
              switch (ie.tag) {
                case 26:
                  f = ie.memoizedState;
                case 5:
                case 27:
                  var o = ie;
                  if (f ? lm(f) : o.stateNode.complete) {
                    ve = 0, ht = null;
                    var y = o.sibling;
                    if (y !== null) ie = y;
                    else {
                      var _ = o.return;
                      _ !== null ? (ie = _, Lu(_)) : ie = null;
                    }
                    break t;
                  }
              }
              ve = 0, ht = null, Ra(e, t, u, 5);
              break;
            case 6:
              ve = 0, ht = null, Ra(e, t, u, 6);
              break;
            case 8:
              tf(), Me = 6;
              break e;
            default:
              throw Error(c(462));
          }
        }
        $0();
        break;
      } catch (M) {
        dd(e, M);
      }
    while (!0);
    return Zt = Gl = null, j.H = a, j.A = n, me = l, ie !== null ? 0 : (ze = null, fe = 0, au(), Me);
  }
  function $0() {
    for (; ie !== null && !ph(); )
      yd(ie);
  }
  function yd(e) {
    var t = Yo(e.alternate, e, el);
    e.memoizedProps = e.pendingProps, t === null ? Lu(e) : ie = t;
  }
  function pd(e) {
    var t = e, l = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Uo(
          l,
          t,
          t.pendingProps,
          t.type,
          void 0,
          fe
        );
        break;
      case 11:
        t = Uo(
          l,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          fe
        );
        break;
      case 5:
        pc(t);
      default:
        Xo(l, t), t = ie = hs(t, el), t = Yo(l, t, el);
    }
    e.memoizedProps = e.pendingProps, t === null ? Lu(e) : ie = t;
  }
  function Ra(e, t, l, a) {
    Zt = Gl = null, pc(t), ga = null, nn = 0;
    var n = t.return;
    try {
      if (H0(
        e,
        n,
        t,
        l,
        fe
      )) {
        Me = 1, _u(
          e,
          Et(l, e.current)
        ), ie = null;
        return;
      }
    } catch (u) {
      if (n !== null) throw ie = n, u;
      Me = 1, _u(
        e,
        Et(l, e.current)
      ), ie = null;
      return;
    }
    t.flags & 32768 ? (se || a === 1 ? e = !0 : _a || (fe & 536870912) !== 0 ? e = !1 : (bl = e = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = dt.current, a !== null && a.tag === 13 && (a.flags |= 16384))), gd(t, e)) : Lu(t);
  }
  function Lu(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        gd(
          t,
          bl
        );
        return;
      }
      e = t.return;
      var l = q0(
        t.alternate,
        t,
        el
      );
      if (l !== null) {
        ie = l;
        return;
      }
      if (t = t.sibling, t !== null) {
        ie = t;
        return;
      }
      ie = t = e;
    } while (t !== null);
    Me === 0 && (Me = 5);
  }
  function gd(e, t) {
    do {
      var l = Y0(e.alternate, e);
      if (l !== null) {
        l.flags &= 32767, ie = l;
        return;
      }
      if (l = e.return, l !== null && (l.flags |= 32768, l.subtreeFlags = 0, l.deletions = null), !t && (e = e.sibling, e !== null)) {
        ie = e;
        return;
      }
      ie = e = l;
    } while (e !== null);
    Me = 6, ie = null;
  }
  function bd(e, t, l, a, n, u, f, o, y) {
    e.cancelPendingCommit = null;
    do
      qu();
    while (Le !== 0);
    if ((me & 6) !== 0) throw Error(c(327));
    if (t !== null) {
      if (t === e.current) throw Error(c(177));
      if (u = t.lanes | t.childLanes, u |= Zi, Ah(
        e,
        l,
        u,
        f,
        o,
        y
      ), e === ze && (ie = ze = null, fe = 0), Aa = t, xl = e, tl = l, Pc = u, Ic = n, fd = a, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, P0(Gn, function() {
        return Td(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), a = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || a) {
        a = j.T, j.T = null, n = X.p, X.p = 2, f = me, me |= 4;
        try {
          G0(e, t, l);
        } finally {
          me = f, X.p = n, j.T = a;
        }
      }
      Le = 1, Sd(), Ed(), xd();
    }
  }
  function Sd() {
    if (Le === 1) {
      Le = 0;
      var e = xl, t = Aa, l = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || l) {
        l = j.T, j.T = null;
        var a = X.p;
        X.p = 2;
        var n = me;
        me |= 4;
        try {
          ed(t, e);
          var u = vf, f = us(e.containerInfo), o = u.focusedElem, y = u.selectionRange;
          if (f !== o && o && o.ownerDocument && ns(
            o.ownerDocument.documentElement,
            o
          )) {
            if (y !== null && qi(o)) {
              var _ = y.start, M = y.end;
              if (M === void 0 && (M = _), "selectionStart" in o)
                o.selectionStart = _, o.selectionEnd = Math.min(
                  M,
                  o.value.length
                );
              else {
                var C = o.ownerDocument || document, O = C && C.defaultView || window;
                if (O.getSelection) {
                  var N = O.getSelection(), V = o.textContent.length, k = Math.min(y.start, V), Ee = y.end === void 0 ? k : Math.min(y.end, V);
                  !N.extend && k > Ee && (f = Ee, Ee = k, k = f);
                  var E = as(
                    o,
                    k
                  ), b = as(
                    o,
                    Ee
                  );
                  if (E && b && (N.rangeCount !== 1 || N.anchorNode !== E.node || N.anchorOffset !== E.offset || N.focusNode !== b.node || N.focusOffset !== b.offset)) {
                    var T = C.createRange();
                    T.setStart(E.node, E.offset), N.removeAllRanges(), k > Ee ? (N.addRange(T), N.extend(b.node, b.offset)) : (T.setEnd(b.node, b.offset), N.addRange(T));
                  }
                }
              }
            }
            for (C = [], N = o; N = N.parentNode; )
              N.nodeType === 1 && C.push({
                element: N,
                left: N.scrollLeft,
                top: N.scrollTop
              });
            for (typeof o.focus == "function" && o.focus(), o = 0; o < C.length; o++) {
              var D = C[o];
              D.element.scrollLeft = D.left, D.element.scrollTop = D.top;
            }
          }
          Fu = !!hf, vf = hf = null;
        } finally {
          me = n, X.p = a, j.T = l;
        }
      }
      e.current = t, Le = 2;
    }
  }
  function Ed() {
    if (Le === 2) {
      Le = 0;
      var e = xl, t = Aa, l = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || l) {
        l = j.T, j.T = null;
        var a = X.p;
        X.p = 2;
        var n = me;
        me |= 4;
        try {
          Wo(e, t.alternate, t);
        } finally {
          me = n, X.p = a, j.T = l;
        }
      }
      Le = 3;
    }
  }
  function xd() {
    if (Le === 4 || Le === 3) {
      Le = 0, gh();
      var e = xl, t = Aa, l = tl, a = fd;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Le = 5 : (Le = 0, Aa = xl = null, zd(e, e.pendingLanes));
      var n = e.pendingLanes;
      if (n === 0 && (El = null), Si(l), t = t.stateNode, ft && typeof ft.onCommitFiberRoot == "function")
        try {
          ft.onCommitFiberRoot(
            Ya,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (a !== null) {
        t = j.T, n = X.p, X.p = 2, j.T = null;
        try {
          for (var u = e.onRecoverableError, f = 0; f < a.length; f++) {
            var o = a[f];
            u(o.value, {
              componentStack: o.stack
            });
          }
        } finally {
          j.T = t, X.p = n;
        }
      }
      (tl & 3) !== 0 && qu(), Bt(e), n = e.pendingLanes, (l & 261930) !== 0 && (n & 42) !== 0 ? e === ef ? xn++ : (xn = 0, ef = e) : xn = 0, zn(0);
    }
  }
  function zd(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, ln(t)));
  }
  function qu() {
    return Sd(), Ed(), xd(), Td();
  }
  function Td() {
    if (Le !== 5) return !1;
    var e = xl, t = Pc;
    Pc = 0;
    var l = Si(tl), a = j.T, n = X.p;
    try {
      X.p = 32 > l ? 32 : l, j.T = null, l = Ic, Ic = null;
      var u = xl, f = tl;
      if (Le = 0, Aa = xl = null, tl = 0, (me & 6) !== 0) throw Error(c(331));
      var o = me;
      if (me |= 4, ud(u.current), ld(
        u,
        u.current,
        f,
        l
      ), me = o, zn(0, !1), ft && typeof ft.onPostCommitFiberRoot == "function")
        try {
          ft.onPostCommitFiberRoot(Ya, u);
        } catch {
        }
      return !0;
    } finally {
      X.p = n, j.T = a, zd(e, t);
    }
  }
  function _d(e, t, l) {
    t = Et(l, t), t = Dc(e.stateNode, t, 2), e = vl(e, t, 2), e !== null && (Xa(e, 2), Bt(e));
  }
  function ye(e, t, l) {
    if (e.tag === 3)
      _d(e, e, l);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          _d(
            t,
            e,
            l
          );
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (El === null || !El.has(a))) {
            e = Et(l, e), l = Oo(2), a = vl(t, l, 2), a !== null && (Ao(
              l,
              a,
              t,
              e
            ), Xa(a, 2), Bt(a));
            break;
          }
        }
        t = t.return;
      }
  }
  function af(e, t, l) {
    var a = e.pingCache;
    if (a === null) {
      a = e.pingCache = new Z0();
      var n = /* @__PURE__ */ new Set();
      a.set(t, n);
    } else
      n = a.get(t), n === void 0 && (n = /* @__PURE__ */ new Set(), a.set(t, n));
    n.has(l) || (Wc = !0, n.add(l), e = W0.bind(null, e, t, l), t.then(e, e));
  }
  function W0(e, t, l) {
    var a = e.pingCache;
    a !== null && a.delete(t), e.pingedLanes |= e.suspendedLanes & l, e.warmLanes &= ~l, ze === e && (fe & l) === l && (Me === 4 || Me === 3 && (fe & 62914560) === fe && 300 > ct() - Cu ? (me & 2) === 0 && Na(e, 0) : kc |= l, Oa === fe && (Oa = 0)), Bt(e);
  }
  function Od(e, t) {
    t === 0 && (t = br()), e = Ll(e, t), e !== null && (Xa(e, t), Bt(e));
  }
  function k0(e) {
    var t = e.memoizedState, l = 0;
    t !== null && (l = t.retryLane), Od(e, l);
  }
  function F0(e, t) {
    var l = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var a = e.stateNode, n = e.memoizedState;
        n !== null && (l = n.retryLane);
        break;
      case 19:
        a = e.stateNode;
        break;
      case 22:
        a = e.stateNode._retryCache;
        break;
      default:
        throw Error(c(314));
    }
    a !== null && a.delete(t), Od(e, l);
  }
  function P0(e, t) {
    return yi(e, t);
  }
  var Yu = null, Ma = null, nf = !1, Gu = !1, uf = !1, Tl = 0;
  function Bt(e) {
    e !== Ma && e.next === null && (Ma === null ? Yu = Ma = e : Ma = Ma.next = e), Gu = !0, nf || (nf = !0, ev());
  }
  function zn(e, t) {
    if (!uf && Gu) {
      uf = !0;
      do
        for (var l = !1, a = Yu; a !== null; ) {
          if (e !== 0) {
            var n = a.pendingLanes;
            if (n === 0) var u = 0;
            else {
              var f = a.suspendedLanes, o = a.pingedLanes;
              u = (1 << 31 - rt(42 | e) + 1) - 1, u &= n & ~(f & ~o), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (l = !0, Md(a, u));
          } else
            u = fe, u = Vn(
              a,
              a === ze ? u : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (u & 3) === 0 || Ga(a, u) || (l = !0, Md(a, u));
          a = a.next;
        }
      while (l);
      uf = !1;
    }
  }
  function I0() {
    Ad();
  }
  function Ad() {
    Gu = nf = !1;
    var e = 0;
    Tl !== 0 && sv() && (e = Tl);
    for (var t = ct(), l = null, a = Yu; a !== null; ) {
      var n = a.next, u = Nd(a, t);
      u === 0 ? (a.next = null, l === null ? Yu = n : l.next = n, n === null && (Ma = l)) : (l = a, (e !== 0 || (u & 3) !== 0) && (Gu = !0)), a = n;
    }
    Le !== 0 && Le !== 5 || zn(e), Tl !== 0 && (Tl = 0);
  }
  function Nd(e, t) {
    for (var l = e.suspendedLanes, a = e.pingedLanes, n = e.expirationTimes, u = e.pendingLanes & -62914561; 0 < u; ) {
      var f = 31 - rt(u), o = 1 << f, y = n[f];
      y === -1 ? ((o & l) === 0 || (o & a) !== 0) && (n[f] = Oh(o, t)) : y <= t && (e.expiredLanes |= o), u &= ~o;
    }
    if (t = ze, l = fe, l = Vn(
      e,
      e === t ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), a = e.callbackNode, l === 0 || e === t && (ve === 2 || ve === 9) || e.cancelPendingCommit !== null)
      return a !== null && a !== null && pi(a), e.callbackNode = null, e.callbackPriority = 0;
    if ((l & 3) === 0 || Ga(e, l)) {
      if (t = l & -l, t === e.callbackPriority) return t;
      switch (a !== null && pi(a), Si(l)) {
        case 2:
        case 8:
          l = pr;
          break;
        case 32:
          l = Gn;
          break;
        case 268435456:
          l = gr;
          break;
        default:
          l = Gn;
      }
      return a = Rd.bind(null, e), l = yi(l, a), e.callbackPriority = t, e.callbackNode = l, t;
    }
    return a !== null && a !== null && pi(a), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function Rd(e, t) {
    if (Le !== 0 && Le !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var l = e.callbackNode;
    if (qu() && e.callbackNode !== l)
      return null;
    var a = fe;
    return a = Vn(
      e,
      e === ze ? a : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), a === 0 ? null : (sd(e, a, t), Nd(e, ct()), e.callbackNode != null && e.callbackNode === l ? Rd.bind(null, e) : null);
  }
  function Md(e, t) {
    if (qu()) return null;
    sd(e, t, !0);
  }
  function ev() {
    dv(function() {
      (me & 6) !== 0 ? yi(
        yr,
        I0
      ) : Ad();
    });
  }
  function cf() {
    if (Tl === 0) {
      var e = va;
      e === 0 && (e = Xn, Xn <<= 1, (Xn & 261888) === 0 && (Xn = 256)), Tl = e;
    }
    return Tl;
  }
  function jd(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Wn("" + e);
  }
  function Dd(e, t) {
    var l = t.ownerDocument.createElement("input");
    return l.name = t.name, l.value = t.value, e.id && l.setAttribute("form", e.id), t.parentNode.insertBefore(l, t), e = new FormData(e), l.parentNode.removeChild(l), e;
  }
  function tv(e, t, l, a, n) {
    if (t === "submit" && l && l.stateNode === n) {
      var u = jd(
        (n[et] || null).action
      ), f = a.submitter;
      f && (t = (t = f[et] || null) ? jd(t.formAction) : f.getAttribute("formAction"), t !== null && (u = t, f = null));
      var o = new In(
        "action",
        "action",
        null,
        a,
        n
      );
      e.push({
        event: o,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (a.defaultPrevented) {
                if (Tl !== 0) {
                  var y = f ? Dd(n, f) : new FormData(n);
                  Oc(
                    l,
                    {
                      pending: !0,
                      data: y,
                      method: n.method,
                      action: u
                    },
                    null,
                    y
                  );
                }
              } else
                typeof u == "function" && (o.preventDefault(), y = f ? Dd(n, f) : new FormData(n), Oc(
                  l,
                  {
                    pending: !0,
                    data: y,
                    method: n.method,
                    action: u
                  },
                  u,
                  y
                ));
            },
            currentTarget: n
          }
        ]
      });
    }
  }
  for (var ff = 0; ff < Qi.length; ff++) {
    var rf = Qi[ff], lv = rf.toLowerCase(), av = rf[0].toUpperCase() + rf.slice(1);
    Mt(
      lv,
      "on" + av
    );
  }
  Mt(fs, "onAnimationEnd"), Mt(rs, "onAnimationIteration"), Mt(ss, "onAnimationStart"), Mt("dblclick", "onDoubleClick"), Mt("focusin", "onFocus"), Mt("focusout", "onBlur"), Mt(b0, "onTransitionRun"), Mt(S0, "onTransitionStart"), Mt(E0, "onTransitionCancel"), Mt(os, "onTransitionEnd"), ta("onMouseEnter", ["mouseout", "mouseover"]), ta("onMouseLeave", ["mouseout", "mouseover"]), ta("onPointerEnter", ["pointerout", "pointerover"]), ta("onPointerLeave", ["pointerout", "pointerover"]), Ul(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Ul(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Ul("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Ul(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Ul(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Ul(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Tn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), nv = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Tn)
  );
  function Cd(e, t) {
    t = (t & 4) !== 0;
    for (var l = 0; l < e.length; l++) {
      var a = e[l], n = a.event;
      a = a.listeners;
      e: {
        var u = void 0;
        if (t)
          for (var f = a.length - 1; 0 <= f; f--) {
            var o = a[f], y = o.instance, _ = o.currentTarget;
            if (o = o.listener, y !== u && n.isPropagationStopped())
              break e;
            u = o, n.currentTarget = _;
            try {
              u(n);
            } catch (M) {
              lu(M);
            }
            n.currentTarget = null, u = y;
          }
        else
          for (f = 0; f < a.length; f++) {
            if (o = a[f], y = o.instance, _ = o.currentTarget, o = o.listener, y !== u && n.isPropagationStopped())
              break e;
            u = o, n.currentTarget = _;
            try {
              u(n);
            } catch (M) {
              lu(M);
            }
            n.currentTarget = null, u = y;
          }
      }
    }
  }
  function ce(e, t) {
    var l = t[Ei];
    l === void 0 && (l = t[Ei] = /* @__PURE__ */ new Set());
    var a = e + "__bubble";
    l.has(a) || (Ud(t, e, 2, !1), l.add(a));
  }
  function sf(e, t, l) {
    var a = 0;
    t && (a |= 4), Ud(
      l,
      e,
      a,
      t
    );
  }
  var Xu = "_reactListening" + Math.random().toString(36).slice(2);
  function of(e) {
    if (!e[Xu]) {
      e[Xu] = !0, Or.forEach(function(l) {
        l !== "selectionchange" && (nv.has(l) || sf(l, !1, e), sf(l, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Xu] || (t[Xu] = !0, sf("selectionchange", !1, t));
    }
  }
  function Ud(e, t, l, a) {
    switch (rm(t)) {
      case 2:
        var n = Dv;
        break;
      case 8:
        n = Cv;
        break;
      default:
        n = Of;
    }
    l = n.bind(
      null,
      t,
      l,
      e
    ), n = void 0, !Mi || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (n = !0), a ? n !== void 0 ? e.addEventListener(t, l, {
      capture: !0,
      passive: n
    }) : e.addEventListener(t, l, !0) : n !== void 0 ? e.addEventListener(t, l, {
      passive: n
    }) : e.addEventListener(t, l, !1);
  }
  function df(e, t, l, a, n) {
    var u = a;
    if ((t & 1) === 0 && (t & 2) === 0 && a !== null)
      e: for (; ; ) {
        if (a === null) return;
        var f = a.tag;
        if (f === 3 || f === 4) {
          var o = a.stateNode.containerInfo;
          if (o === n) break;
          if (f === 4)
            for (f = a.return; f !== null; ) {
              var y = f.tag;
              if ((y === 3 || y === 4) && f.stateNode.containerInfo === n)
                return;
              f = f.return;
            }
          for (; o !== null; ) {
            if (f = Pl(o), f === null) return;
            if (y = f.tag, y === 5 || y === 6 || y === 26 || y === 27) {
              a = u = f;
              continue e;
            }
            o = o.parentNode;
          }
        }
        a = a.return;
      }
    Lr(function() {
      var _ = u, M = Ni(l), C = [];
      e: {
        var O = ds.get(e);
        if (O !== void 0) {
          var N = In, V = e;
          switch (e) {
            case "keypress":
              if (Fn(l) === 0) break e;
            case "keydown":
            case "keyup":
              N = Fh;
              break;
            case "focusin":
              V = "focus", N = Ui;
              break;
            case "focusout":
              V = "blur", N = Ui;
              break;
            case "beforeblur":
            case "afterblur":
              N = Ui;
              break;
            case "click":
              if (l.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              N = Gr;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              N = qh;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              N = e0;
              break;
            case fs:
            case rs:
            case ss:
              N = Xh;
              break;
            case os:
              N = l0;
              break;
            case "scroll":
            case "scrollend":
              N = Bh;
              break;
            case "wheel":
              N = n0;
              break;
            case "copy":
            case "cut":
            case "paste":
              N = Zh;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              N = Qr;
              break;
            case "toggle":
            case "beforetoggle":
              N = i0;
          }
          var k = (t & 4) !== 0, Ee = !k && (e === "scroll" || e === "scrollend"), E = k ? O !== null ? O + "Capture" : null : O;
          k = [];
          for (var b = _, T; b !== null; ) {
            var D = b;
            if (T = D.stateNode, D = D.tag, D !== 5 && D !== 26 && D !== 27 || T === null || E === null || (D = Va(b, E), D != null && k.push(
              _n(b, D, T)
            )), Ee) break;
            b = b.return;
          }
          0 < k.length && (O = new N(
            O,
            V,
            null,
            l,
            M
          ), C.push({ event: O, listeners: k }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (O = e === "mouseover" || e === "pointerover", N = e === "mouseout" || e === "pointerout", O && l !== Ai && (V = l.relatedTarget || l.fromElement) && (Pl(V) || V[Fl]))
            break e;
          if ((N || O) && (O = M.window === M ? M : (O = M.ownerDocument) ? O.defaultView || O.parentWindow : window, N ? (V = l.relatedTarget || l.toElement, N = _, V = V ? Pl(V) : null, V !== null && (Ee = m(V), k = V.tag, V !== Ee || k !== 5 && k !== 27 && k !== 6) && (V = null)) : (N = null, V = _), N !== V)) {
            if (k = Gr, D = "onMouseLeave", E = "onMouseEnter", b = "mouse", (e === "pointerout" || e === "pointerover") && (k = Qr, D = "onPointerLeave", E = "onPointerEnter", b = "pointer"), Ee = N == null ? O : Za(N), T = V == null ? O : Za(V), O = new k(
              D,
              b + "leave",
              N,
              l,
              M
            ), O.target = Ee, O.relatedTarget = T, D = null, Pl(M) === _ && (k = new k(
              E,
              b + "enter",
              V,
              l,
              M
            ), k.target = T, k.relatedTarget = Ee, D = k), Ee = D, N && V)
              t: {
                for (k = uv, E = N, b = V, T = 0, D = E; D; D = k(D))
                  T++;
                D = 0;
                for (var W = b; W; W = k(W))
                  D++;
                for (; 0 < T - D; )
                  E = k(E), T--;
                for (; 0 < D - T; )
                  b = k(b), D--;
                for (; T--; ) {
                  if (E === b || b !== null && E === b.alternate) {
                    k = E;
                    break t;
                  }
                  E = k(E), b = k(b);
                }
                k = null;
              }
            else k = null;
            N !== null && wd(
              C,
              O,
              N,
              k,
              !1
            ), V !== null && Ee !== null && wd(
              C,
              Ee,
              V,
              k,
              !0
            );
          }
        }
        e: {
          if (O = _ ? Za(_) : window, N = O.nodeName && O.nodeName.toLowerCase(), N === "select" || N === "input" && O.type === "file")
            var oe = Fr;
          else if (Wr(O))
            if (Pr)
              oe = y0;
            else {
              oe = h0;
              var J = m0;
            }
          else
            N = O.nodeName, !N || N.toLowerCase() !== "input" || O.type !== "checkbox" && O.type !== "radio" ? _ && Oi(_.elementType) && (oe = Fr) : oe = v0;
          if (oe && (oe = oe(e, _))) {
            kr(
              C,
              oe,
              l,
              M
            );
            break e;
          }
          J && J(e, O, _), e === "focusout" && _ && O.type === "number" && _.memoizedProps.value != null && _i(O, "number", O.value);
        }
        switch (J = _ ? Za(_) : window, e) {
          case "focusin":
            (Wr(J) || J.contentEditable === "true") && (ca = J, Yi = _, Ia = null);
            break;
          case "focusout":
            Ia = Yi = ca = null;
            break;
          case "mousedown":
            Gi = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Gi = !1, is(C, l, M);
            break;
          case "selectionchange":
            if (g0) break;
          case "keydown":
          case "keyup":
            is(C, l, M);
        }
        var le;
        if (Hi)
          e: {
            switch (e) {
              case "compositionstart":
                var re = "onCompositionStart";
                break e;
              case "compositionend":
                re = "onCompositionEnd";
                break e;
              case "compositionupdate":
                re = "onCompositionUpdate";
                break e;
            }
            re = void 0;
          }
        else
          ia ? Jr(e, l) && (re = "onCompositionEnd") : e === "keydown" && l.keyCode === 229 && (re = "onCompositionStart");
        re && (Zr && l.locale !== "ko" && (ia || re !== "onCompositionStart" ? re === "onCompositionEnd" && ia && (le = qr()) : (fl = M, ji = "value" in fl ? fl.value : fl.textContent, ia = !0)), J = Qu(_, re), 0 < J.length && (re = new Xr(
          re,
          e,
          null,
          l,
          M
        ), C.push({ event: re, listeners: J }), le ? re.data = le : (le = $r(l), le !== null && (re.data = le)))), (le = f0 ? r0(e, l) : s0(e, l)) && (re = Qu(_, "onBeforeInput"), 0 < re.length && (J = new Xr(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          M
        ), C.push({
          event: J,
          listeners: re
        }), J.data = le)), tv(
          C,
          e,
          _,
          l,
          M
        );
      }
      Cd(C, t);
    });
  }
  function _n(e, t, l) {
    return {
      instance: e,
      listener: t,
      currentTarget: l
    };
  }
  function Qu(e, t) {
    for (var l = t + "Capture", a = []; e !== null; ) {
      var n = e, u = n.stateNode;
      if (n = n.tag, n !== 5 && n !== 26 && n !== 27 || u === null || (n = Va(e, l), n != null && a.unshift(
        _n(e, n, u)
      ), n = Va(e, t), n != null && a.push(
        _n(e, n, u)
      )), e.tag === 3) return a;
      e = e.return;
    }
    return [];
  }
  function uv(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function wd(e, t, l, a, n) {
    for (var u = t._reactName, f = []; l !== null && l !== a; ) {
      var o = l, y = o.alternate, _ = o.stateNode;
      if (o = o.tag, y !== null && y === a) break;
      o !== 5 && o !== 26 && o !== 27 || _ === null || (y = _, n ? (_ = Va(l, u), _ != null && f.unshift(
        _n(l, _, y)
      )) : n || (_ = Va(l, u), _ != null && f.push(
        _n(l, _, y)
      ))), l = l.return;
    }
    f.length !== 0 && e.push({ event: t, listeners: f });
  }
  var iv = /\r\n?/g, cv = /\u0000|\uFFFD/g;
  function Hd(e) {
    return (typeof e == "string" ? e : "" + e).replace(iv, `
`).replace(cv, "");
  }
  function Bd(e, t) {
    return t = Hd(t), Hd(e) === t;
  }
  function Se(e, t, l, a, n, u) {
    switch (l) {
      case "children":
        typeof a == "string" ? t === "body" || t === "textarea" && a === "" || aa(e, a) : (typeof a == "number" || typeof a == "bigint") && t !== "body" && aa(e, "" + a);
        break;
      case "className":
        Jn(e, "class", a);
        break;
      case "tabIndex":
        Jn(e, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Jn(e, l, a);
        break;
      case "style":
        Hr(e, a, u);
        break;
      case "data":
        if (t !== "object") {
          Jn(e, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (t !== "a" || l !== "href")) {
          e.removeAttribute(l);
          break;
        }
        if (a == null || typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") {
          e.removeAttribute(l);
          break;
        }
        a = Wn("" + a), e.setAttribute(l, a);
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          e.setAttribute(
            l,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof u == "function" && (l === "formAction" ? (t !== "input" && Se(e, t, "name", n.name, n, null), Se(
            e,
            t,
            "formEncType",
            n.formEncType,
            n,
            null
          ), Se(
            e,
            t,
            "formMethod",
            n.formMethod,
            n,
            null
          ), Se(
            e,
            t,
            "formTarget",
            n.formTarget,
            n,
            null
          )) : (Se(e, t, "encType", n.encType, n, null), Se(e, t, "method", n.method, n, null), Se(e, t, "target", n.target, n, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          e.removeAttribute(l);
          break;
        }
        a = Wn("" + a), e.setAttribute(l, a);
        break;
      case "onClick":
        a != null && (e.onclick = Yt);
        break;
      case "onScroll":
        a != null && ce("scroll", e);
        break;
      case "onScrollEnd":
        a != null && ce("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(c(61));
          if (l = a.__html, l != null) {
            if (n.children != null) throw Error(c(60));
            e.innerHTML = l;
          }
        }
        break;
      case "multiple":
        e.multiple = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "muted":
        e.muted = a && typeof a != "function" && typeof a != "symbol";
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
          e.removeAttribute("xlink:href");
          break;
        }
        l = Wn("" + a), e.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          l
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
        a != null && typeof a != "function" && typeof a != "symbol" ? e.setAttribute(l, "" + a) : e.removeAttribute(l);
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
        a && typeof a != "function" && typeof a != "symbol" ? e.setAttribute(l, "") : e.removeAttribute(l);
        break;
      case "capture":
      case "download":
        a === !0 ? e.setAttribute(l, "") : a !== !1 && a != null && typeof a != "function" && typeof a != "symbol" ? e.setAttribute(l, a) : e.removeAttribute(l);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null && typeof a != "function" && typeof a != "symbol" && !isNaN(a) && 1 <= a ? e.setAttribute(l, a) : e.removeAttribute(l);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a) ? e.removeAttribute(l) : e.setAttribute(l, a);
        break;
      case "popover":
        ce("beforetoggle", e), ce("toggle", e), Kn(e, "popover", a);
        break;
      case "xlinkActuate":
        qt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        qt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        qt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        qt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        qt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        qt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        qt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        qt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        qt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          a
        );
        break;
      case "is":
        Kn(e, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") && (l = wh.get(l) || l, Kn(e, l, a));
    }
  }
  function mf(e, t, l, a, n, u) {
    switch (l) {
      case "style":
        Hr(e, a, u);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(c(61));
          if (l = a.__html, l != null) {
            if (n.children != null) throw Error(c(60));
            e.innerHTML = l;
          }
        }
        break;
      case "children":
        typeof a == "string" ? aa(e, a) : (typeof a == "number" || typeof a == "bigint") && aa(e, "" + a);
        break;
      case "onScroll":
        a != null && ce("scroll", e);
        break;
      case "onScrollEnd":
        a != null && ce("scrollend", e);
        break;
      case "onClick":
        a != null && (e.onclick = Yt);
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
        if (!Ar.hasOwnProperty(l))
          e: {
            if (l[0] === "o" && l[1] === "n" && (n = l.endsWith("Capture"), t = l.slice(2, n ? l.length - 7 : void 0), u = e[et] || null, u = u != null ? u[l] : null, typeof u == "function" && e.removeEventListener(t, u, n), typeof a == "function")) {
              typeof u != "function" && u !== null && (l in e ? e[l] = null : e.hasAttribute(l) && e.removeAttribute(l)), e.addEventListener(t, a, n);
              break e;
            }
            l in e ? e[l] = a : a === !0 ? e.setAttribute(l, "") : Kn(e, l, a);
          }
    }
  }
  function $e(e, t, l) {
    switch (t) {
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
        ce("error", e), ce("load", e);
        var a = !1, n = !1, u;
        for (u in l)
          if (l.hasOwnProperty(u)) {
            var f = l[u];
            if (f != null)
              switch (u) {
                case "src":
                  a = !0;
                  break;
                case "srcSet":
                  n = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(c(137, t));
                default:
                  Se(e, t, u, f, l, null);
              }
          }
        n && Se(e, t, "srcSet", l.srcSet, l, null), a && Se(e, t, "src", l.src, l, null);
        return;
      case "input":
        ce("invalid", e);
        var o = u = f = n = null, y = null, _ = null;
        for (a in l)
          if (l.hasOwnProperty(a)) {
            var M = l[a];
            if (M != null)
              switch (a) {
                case "name":
                  n = M;
                  break;
                case "type":
                  f = M;
                  break;
                case "checked":
                  y = M;
                  break;
                case "defaultChecked":
                  _ = M;
                  break;
                case "value":
                  u = M;
                  break;
                case "defaultValue":
                  o = M;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (M != null)
                    throw Error(c(137, t));
                  break;
                default:
                  Se(e, t, a, M, l, null);
              }
          }
        Dr(
          e,
          u,
          o,
          y,
          _,
          f,
          n,
          !1
        );
        return;
      case "select":
        ce("invalid", e), a = f = u = null;
        for (n in l)
          if (l.hasOwnProperty(n) && (o = l[n], o != null))
            switch (n) {
              case "value":
                u = o;
                break;
              case "defaultValue":
                f = o;
                break;
              case "multiple":
                a = o;
              default:
                Se(e, t, n, o, l, null);
            }
        t = u, l = f, e.multiple = !!a, t != null ? la(e, !!a, t, !1) : l != null && la(e, !!a, l, !0);
        return;
      case "textarea":
        ce("invalid", e), u = n = a = null;
        for (f in l)
          if (l.hasOwnProperty(f) && (o = l[f], o != null))
            switch (f) {
              case "value":
                a = o;
                break;
              case "defaultValue":
                n = o;
                break;
              case "children":
                u = o;
                break;
              case "dangerouslySetInnerHTML":
                if (o != null) throw Error(c(91));
                break;
              default:
                Se(e, t, f, o, l, null);
            }
        Ur(e, a, n, u);
        return;
      case "option":
        for (y in l)
          if (l.hasOwnProperty(y) && (a = l[y], a != null))
            switch (y) {
              case "selected":
                e.selected = a && typeof a != "function" && typeof a != "symbol";
                break;
              default:
                Se(e, t, y, a, l, null);
            }
        return;
      case "dialog":
        ce("beforetoggle", e), ce("toggle", e), ce("cancel", e), ce("close", e);
        break;
      case "iframe":
      case "object":
        ce("load", e);
        break;
      case "video":
      case "audio":
        for (a = 0; a < Tn.length; a++)
          ce(Tn[a], e);
        break;
      case "image":
        ce("error", e), ce("load", e);
        break;
      case "details":
        ce("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        ce("error", e), ce("load", e);
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
        for (_ in l)
          if (l.hasOwnProperty(_) && (a = l[_], a != null))
            switch (_) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(c(137, t));
              default:
                Se(e, t, _, a, l, null);
            }
        return;
      default:
        if (Oi(t)) {
          for (M in l)
            l.hasOwnProperty(M) && (a = l[M], a !== void 0 && mf(
              e,
              t,
              M,
              a,
              l,
              void 0
            ));
          return;
        }
    }
    for (o in l)
      l.hasOwnProperty(o) && (a = l[o], a != null && Se(e, t, o, a, l, null));
  }
  function fv(e, t, l, a) {
    switch (t) {
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
        var n = null, u = null, f = null, o = null, y = null, _ = null, M = null;
        for (N in l) {
          var C = l[N];
          if (l.hasOwnProperty(N) && C != null)
            switch (N) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                y = C;
              default:
                a.hasOwnProperty(N) || Se(e, t, N, null, a, C);
            }
        }
        for (var O in a) {
          var N = a[O];
          if (C = l[O], a.hasOwnProperty(O) && (N != null || C != null))
            switch (O) {
              case "type":
                u = N;
                break;
              case "name":
                n = N;
                break;
              case "checked":
                _ = N;
                break;
              case "defaultChecked":
                M = N;
                break;
              case "value":
                f = N;
                break;
              case "defaultValue":
                o = N;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (N != null)
                  throw Error(c(137, t));
                break;
              default:
                N !== C && Se(
                  e,
                  t,
                  O,
                  N,
                  a,
                  C
                );
            }
        }
        Ti(
          e,
          f,
          o,
          y,
          _,
          M,
          u,
          n
        );
        return;
      case "select":
        N = f = o = O = null;
        for (u in l)
          if (y = l[u], l.hasOwnProperty(u) && y != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                N = y;
              default:
                a.hasOwnProperty(u) || Se(
                  e,
                  t,
                  u,
                  null,
                  a,
                  y
                );
            }
        for (n in a)
          if (u = a[n], y = l[n], a.hasOwnProperty(n) && (u != null || y != null))
            switch (n) {
              case "value":
                O = u;
                break;
              case "defaultValue":
                o = u;
                break;
              case "multiple":
                f = u;
              default:
                u !== y && Se(
                  e,
                  t,
                  n,
                  u,
                  a,
                  y
                );
            }
        t = o, l = f, a = N, O != null ? la(e, !!l, O, !1) : !!a != !!l && (t != null ? la(e, !!l, t, !0) : la(e, !!l, l ? [] : "", !1));
        return;
      case "textarea":
        N = O = null;
        for (o in l)
          if (n = l[o], l.hasOwnProperty(o) && n != null && !a.hasOwnProperty(o))
            switch (o) {
              case "value":
                break;
              case "children":
                break;
              default:
                Se(e, t, o, null, a, n);
            }
        for (f in a)
          if (n = a[f], u = l[f], a.hasOwnProperty(f) && (n != null || u != null))
            switch (f) {
              case "value":
                O = n;
                break;
              case "defaultValue":
                N = n;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (n != null) throw Error(c(91));
                break;
              default:
                n !== u && Se(e, t, f, n, a, u);
            }
        Cr(e, O, N);
        return;
      case "option":
        for (var V in l)
          if (O = l[V], l.hasOwnProperty(V) && O != null && !a.hasOwnProperty(V))
            switch (V) {
              case "selected":
                e.selected = !1;
                break;
              default:
                Se(
                  e,
                  t,
                  V,
                  null,
                  a,
                  O
                );
            }
        for (y in a)
          if (O = a[y], N = l[y], a.hasOwnProperty(y) && O !== N && (O != null || N != null))
            switch (y) {
              case "selected":
                e.selected = O && typeof O != "function" && typeof O != "symbol";
                break;
              default:
                Se(
                  e,
                  t,
                  y,
                  O,
                  a,
                  N
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
        for (var k in l)
          O = l[k], l.hasOwnProperty(k) && O != null && !a.hasOwnProperty(k) && Se(e, t, k, null, a, O);
        for (_ in a)
          if (O = a[_], N = l[_], a.hasOwnProperty(_) && O !== N && (O != null || N != null))
            switch (_) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (O != null)
                  throw Error(c(137, t));
                break;
              default:
                Se(
                  e,
                  t,
                  _,
                  O,
                  a,
                  N
                );
            }
        return;
      default:
        if (Oi(t)) {
          for (var Ee in l)
            O = l[Ee], l.hasOwnProperty(Ee) && O !== void 0 && !a.hasOwnProperty(Ee) && mf(
              e,
              t,
              Ee,
              void 0,
              a,
              O
            );
          for (M in a)
            O = a[M], N = l[M], !a.hasOwnProperty(M) || O === N || O === void 0 && N === void 0 || mf(
              e,
              t,
              M,
              O,
              a,
              N
            );
          return;
        }
    }
    for (var E in l)
      O = l[E], l.hasOwnProperty(E) && O != null && !a.hasOwnProperty(E) && Se(e, t, E, null, a, O);
    for (C in a)
      O = a[C], N = l[C], !a.hasOwnProperty(C) || O === N || O == null && N == null || Se(e, t, C, O, a, N);
  }
  function Ld(e) {
    switch (e) {
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
  function rv() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, l = performance.getEntriesByType("resource"), a = 0; a < l.length; a++) {
        var n = l[a], u = n.transferSize, f = n.initiatorType, o = n.duration;
        if (u && o && Ld(f)) {
          for (f = 0, o = n.responseEnd, a += 1; a < l.length; a++) {
            var y = l[a], _ = y.startTime;
            if (_ > o) break;
            var M = y.transferSize, C = y.initiatorType;
            M && Ld(C) && (y = y.responseEnd, f += M * (y < o ? 1 : (o - _) / (y - _)));
          }
          if (--a, t += 8 * (u + f) / (n.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var hf = null, vf = null;
  function Zu(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function qd(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Yd(e, t) {
    if (e === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && t === "foreignObject" ? 0 : e;
  }
  function yf(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var pf = null;
  function sv() {
    var e = window.event;
    return e && e.type === "popstate" ? e === pf ? !1 : (pf = e, !0) : (pf = null, !1);
  }
  var Gd = typeof setTimeout == "function" ? setTimeout : void 0, ov = typeof clearTimeout == "function" ? clearTimeout : void 0, Xd = typeof Promise == "function" ? Promise : void 0, dv = typeof queueMicrotask == "function" ? queueMicrotask : typeof Xd < "u" ? function(e) {
    return Xd.resolve(null).then(e).catch(mv);
  } : Gd;
  function mv(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function _l(e) {
    return e === "head";
  }
  function Qd(e, t) {
    var l = t, a = 0;
    do {
      var n = l.nextSibling;
      if (e.removeChild(l), n && n.nodeType === 8)
        if (l = n.data, l === "/$" || l === "/&") {
          if (a === 0) {
            e.removeChild(n), Ua(t);
            return;
          }
          a--;
        } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&")
          a++;
        else if (l === "html")
          On(e.ownerDocument.documentElement);
        else if (l === "head") {
          l = e.ownerDocument.head, On(l);
          for (var u = l.firstChild; u; ) {
            var f = u.nextSibling, o = u.nodeName;
            u[Qa] || o === "SCRIPT" || o === "STYLE" || o === "LINK" && u.rel.toLowerCase() === "stylesheet" || l.removeChild(u), u = f;
          }
        } else
          l === "body" && On(e.ownerDocument.body);
      l = n;
    } while (l);
    Ua(t);
  }
  function Zd(e, t) {
    var l = e;
    e = 0;
    do {
      var a = l.nextSibling;
      if (l.nodeType === 1 ? t ? (l._stashedDisplay = l.style.display, l.style.display = "none") : (l.style.display = l._stashedDisplay || "", l.getAttribute("style") === "" && l.removeAttribute("style")) : l.nodeType === 3 && (t ? (l._stashedText = l.nodeValue, l.nodeValue = "") : l.nodeValue = l._stashedText || ""), a && a.nodeType === 8)
        if (l = a.data, l === "/$") {
          if (e === 0) break;
          e--;
        } else
          l !== "$" && l !== "$?" && l !== "$~" && l !== "$!" || e++;
      l = a;
    } while (l);
  }
  function gf(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var l = t;
      switch (t = t.nextSibling, l.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          gf(l), xi(l);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (l.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(l);
    }
  }
  function hv(e, t, l, a) {
    for (; e.nodeType === 1; ) {
      var n = l;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (a) {
        if (!e[Qa])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (u = e.getAttribute("rel"), u === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (u !== n.rel || e.getAttribute("href") !== (n.href == null || n.href === "" ? null : n.href) || e.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin) || e.getAttribute("title") !== (n.title == null ? null : n.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (u = e.getAttribute("src"), (u !== (n.src == null ? null : n.src) || e.getAttribute("type") !== (n.type == null ? null : n.type) || e.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin)) && u && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var u = n.name == null ? null : "" + n.name;
        if (n.type === "hidden" && e.getAttribute("name") === u)
          return e;
      } else return e;
      if (e = Ot(e.nextSibling), e === null) break;
    }
    return null;
  }
  function vv(e, t, l) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !l || (e = Ot(e.nextSibling), e === null)) return null;
    return e;
  }
  function Vd(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Ot(e.nextSibling), e === null)) return null;
    return e;
  }
  function bf(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Sf(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function yv(e, t) {
    var l = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = t;
    else if (e.data !== "$?" || l.readyState !== "loading")
      t();
    else {
      var a = function() {
        t(), l.removeEventListener("DOMContentLoaded", a);
      };
      l.addEventListener("DOMContentLoaded", a), e._reactRetry = a;
    }
  }
  function Ot(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F")
          break;
        if (t === "/$" || t === "/&") return null;
      }
    }
    return e;
  }
  var Ef = null;
  function Kd(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data;
        if (l === "/$" || l === "/&") {
          if (t === 0)
            return Ot(e.nextSibling);
          t--;
        } else
          l !== "$" && l !== "$!" && l !== "$?" && l !== "$~" && l !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function Jd(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data;
        if (l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&") {
          if (t === 0) return e;
          t--;
        } else l !== "/$" && l !== "/&" || t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function $d(e, t, l) {
    switch (t = Zu(l), e) {
      case "html":
        if (e = t.documentElement, !e) throw Error(c(452));
        return e;
      case "head":
        if (e = t.head, !e) throw Error(c(453));
        return e;
      case "body":
        if (e = t.body, !e) throw Error(c(454));
        return e;
      default:
        throw Error(c(451));
    }
  }
  function On(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    xi(e);
  }
  var At = /* @__PURE__ */ new Map(), Wd = /* @__PURE__ */ new Set();
  function Vu(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var ll = X.d;
  X.d = {
    f: pv,
    r: gv,
    D: bv,
    C: Sv,
    L: Ev,
    m: xv,
    X: Tv,
    S: zv,
    M: _v
  };
  function pv() {
    var e = ll.f(), t = Hu();
    return e || t;
  }
  function gv(e) {
    var t = Il(e);
    t !== null && t.tag === 5 && t.type === "form" ? oo(t) : ll.r(e);
  }
  var ja = typeof document > "u" ? null : document;
  function kd(e, t, l) {
    var a = ja;
    if (a && typeof t == "string" && t) {
      var n = bt(t);
      n = 'link[rel="' + e + '"][href="' + n + '"]', typeof l == "string" && (n += '[crossorigin="' + l + '"]'), Wd.has(n) || (Wd.add(n), e = { rel: e, crossOrigin: l, href: t }, a.querySelector(n) === null && (t = a.createElement("link"), $e(t, "link", e), Ye(t), a.head.appendChild(t)));
    }
  }
  function bv(e) {
    ll.D(e), kd("dns-prefetch", e, null);
  }
  function Sv(e, t) {
    ll.C(e, t), kd("preconnect", e, t);
  }
  function Ev(e, t, l) {
    ll.L(e, t, l);
    var a = ja;
    if (a && e && t) {
      var n = 'link[rel="preload"][as="' + bt(t) + '"]';
      t === "image" && l && l.imageSrcSet ? (n += '[imagesrcset="' + bt(
        l.imageSrcSet
      ) + '"]', typeof l.imageSizes == "string" && (n += '[imagesizes="' + bt(
        l.imageSizes
      ) + '"]')) : n += '[href="' + bt(e) + '"]';
      var u = n;
      switch (t) {
        case "style":
          u = Da(e);
          break;
        case "script":
          u = Ca(e);
      }
      At.has(u) || (e = z(
        {
          rel: "preload",
          href: t === "image" && l && l.imageSrcSet ? void 0 : e,
          as: t
        },
        l
      ), At.set(u, e), a.querySelector(n) !== null || t === "style" && a.querySelector(An(u)) || t === "script" && a.querySelector(Nn(u)) || (t = a.createElement("link"), $e(t, "link", e), Ye(t), a.head.appendChild(t)));
    }
  }
  function xv(e, t) {
    ll.m(e, t);
    var l = ja;
    if (l && e) {
      var a = t && typeof t.as == "string" ? t.as : "script", n = 'link[rel="modulepreload"][as="' + bt(a) + '"][href="' + bt(e) + '"]', u = n;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = Ca(e);
      }
      if (!At.has(u) && (e = z({ rel: "modulepreload", href: e }, t), At.set(u, e), l.querySelector(n) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(Nn(u)))
              return;
        }
        a = l.createElement("link"), $e(a, "link", e), Ye(a), l.head.appendChild(a);
      }
    }
  }
  function zv(e, t, l) {
    ll.S(e, t, l);
    var a = ja;
    if (a && e) {
      var n = ea(a).hoistableStyles, u = Da(e);
      t = t || "default";
      var f = n.get(u);
      if (!f) {
        var o = { loading: 0, preload: null };
        if (f = a.querySelector(
          An(u)
        ))
          o.loading = 5;
        else {
          e = z(
            { rel: "stylesheet", href: e, "data-precedence": t },
            l
          ), (l = At.get(u)) && xf(e, l);
          var y = f = a.createElement("link");
          Ye(y), $e(y, "link", e), y._p = new Promise(function(_, M) {
            y.onload = _, y.onerror = M;
          }), y.addEventListener("load", function() {
            o.loading |= 1;
          }), y.addEventListener("error", function() {
            o.loading |= 2;
          }), o.loading |= 4, Ku(f, t, a);
        }
        f = {
          type: "stylesheet",
          instance: f,
          count: 1,
          state: o
        }, n.set(u, f);
      }
    }
  }
  function Tv(e, t) {
    ll.X(e, t);
    var l = ja;
    if (l && e) {
      var a = ea(l).hoistableScripts, n = Ca(e), u = a.get(n);
      u || (u = l.querySelector(Nn(n)), u || (e = z({ src: e, async: !0 }, t), (t = At.get(n)) && zf(e, t), u = l.createElement("script"), Ye(u), $e(u, "link", e), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function _v(e, t) {
    ll.M(e, t);
    var l = ja;
    if (l && e) {
      var a = ea(l).hoistableScripts, n = Ca(e), u = a.get(n);
      u || (u = l.querySelector(Nn(n)), u || (e = z({ src: e, async: !0, type: "module" }, t), (t = At.get(n)) && zf(e, t), u = l.createElement("script"), Ye(u), $e(u, "link", e), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function Fd(e, t, l, a) {
    var n = (n = ue.current) ? Vu(n) : null;
    if (!n) throw Error(c(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string" ? (t = Da(l.href), l = ea(
          n
        ).hoistableStyles, a = l.get(t), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, l.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
          e = Da(l.href);
          var u = ea(
            n
          ).hoistableStyles, f = u.get(e);
          if (f || (n = n.ownerDocument || n, f = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(e, f), (u = n.querySelector(
            An(e)
          )) && !u._p && (f.instance = u, f.state.loading = 5), At.has(e) || (l = {
            rel: "preload",
            as: "style",
            href: l.href,
            crossOrigin: l.crossOrigin,
            integrity: l.integrity,
            media: l.media,
            hrefLang: l.hrefLang,
            referrerPolicy: l.referrerPolicy
          }, At.set(e, l), u || Ov(
            n,
            e,
            l,
            f.state
          ))), t && a === null)
            throw Error(c(528, ""));
          return f;
        }
        if (t && a !== null)
          throw Error(c(529, ""));
        return null;
      case "script":
        return t = l.async, l = l.src, typeof l == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Ca(l), l = ea(
          n
        ).hoistableScripts, a = l.get(t), a || (a = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, l.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(c(444, e));
    }
  }
  function Da(e) {
    return 'href="' + bt(e) + '"';
  }
  function An(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function Pd(e) {
    return z({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function Ov(e, t, l, a) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? a.loading = 1 : (t = e.createElement("link"), a.preload = t, t.addEventListener("load", function() {
      return a.loading |= 1;
    }), t.addEventListener("error", function() {
      return a.loading |= 2;
    }), $e(t, "link", l), Ye(t), e.head.appendChild(t));
  }
  function Ca(e) {
    return '[src="' + bt(e) + '"]';
  }
  function Nn(e) {
    return "script[async]" + e;
  }
  function Id(e, t, l) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var a = e.querySelector(
            'style[data-href~="' + bt(l.href) + '"]'
          );
          if (a)
            return t.instance = a, Ye(a), a;
          var n = z({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null
          });
          return a = (e.ownerDocument || e).createElement(
            "style"
          ), Ye(a), $e(a, "style", n), Ku(a, l.precedence, e), t.instance = a;
        case "stylesheet":
          n = Da(l.href);
          var u = e.querySelector(
            An(n)
          );
          if (u)
            return t.state.loading |= 4, t.instance = u, Ye(u), u;
          a = Pd(l), (n = At.get(n)) && xf(a, n), u = (e.ownerDocument || e).createElement("link"), Ye(u);
          var f = u;
          return f._p = new Promise(function(o, y) {
            f.onload = o, f.onerror = y;
          }), $e(u, "link", a), t.state.loading |= 4, Ku(u, l.precedence, e), t.instance = u;
        case "script":
          return u = Ca(l.src), (n = e.querySelector(
            Nn(u)
          )) ? (t.instance = n, Ye(n), n) : (a = l, (n = At.get(u)) && (a = z({}, l), zf(a, n)), e = e.ownerDocument || e, n = e.createElement("script"), Ye(n), $e(n, "link", a), e.head.appendChild(n), t.instance = n);
        case "void":
          return null;
        default:
          throw Error(c(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (a = t.instance, t.state.loading |= 4, Ku(a, l.precedence, e));
    return t.instance;
  }
  function Ku(e, t, l) {
    for (var a = l.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), n = a.length ? a[a.length - 1] : null, u = n, f = 0; f < a.length; f++) {
      var o = a[f];
      if (o.dataset.precedence === t) u = o;
      else if (u !== n) break;
    }
    u ? u.parentNode.insertBefore(e, u.nextSibling) : (t = l.nodeType === 9 ? l.head : l, t.insertBefore(e, t.firstChild));
  }
  function xf(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function zf(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var Ju = null;
  function em(e, t, l) {
    if (Ju === null) {
      var a = /* @__PURE__ */ new Map(), n = Ju = /* @__PURE__ */ new Map();
      n.set(l, a);
    } else
      n = Ju, a = n.get(l), a || (a = /* @__PURE__ */ new Map(), n.set(l, a));
    if (a.has(e)) return a;
    for (a.set(e, null), l = l.getElementsByTagName(e), n = 0; n < l.length; n++) {
      var u = l[n];
      if (!(u[Qa] || u[Ze] || e === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var f = u.getAttribute(t) || "";
        f = e + f;
        var o = a.get(f);
        o ? o.push(u) : a.set(f, [u]);
      }
    }
    return a;
  }
  function tm(e, t, l) {
    e = e.ownerDocument || e, e.head.insertBefore(
      l,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function Av(e, t, l) {
    if (l === 1 || t.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "")
          break;
        return !0;
      case "link":
        if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError)
          break;
        switch (t.rel) {
          case "stylesheet":
            return e = t.disabled, typeof t.precedence == "string" && e == null;
          default:
            return !0;
        }
      case "script":
        if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string")
          return !0;
    }
    return !1;
  }
  function lm(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function Nv(e, t, l, a) {
    if (l.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (l.state.loading & 4) === 0) {
      if (l.instance === null) {
        var n = Da(a.href), u = t.querySelector(
          An(n)
        );
        if (u) {
          t = u._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = $u.bind(e), t.then(e, e)), l.state.loading |= 4, l.instance = u, Ye(u);
          return;
        }
        u = t.ownerDocument || t, a = Pd(a), (n = At.get(n)) && xf(a, n), u = u.createElement("link"), Ye(u);
        var f = u;
        f._p = new Promise(function(o, y) {
          f.onload = o, f.onerror = y;
        }), $e(u, "link", a), l.instance = u;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(l, t), (t = l.state.preload) && (l.state.loading & 3) === 0 && (e.count++, l = $u.bind(e), t.addEventListener("load", l), t.addEventListener("error", l));
    }
  }
  var Tf = 0;
  function Rv(e, t) {
    return e.stylesheets && e.count === 0 && ku(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(l) {
      var a = setTimeout(function() {
        if (e.stylesheets && ku(e, e.stylesheets), e.unsuspend) {
          var u = e.unsuspend;
          e.unsuspend = null, u();
        }
      }, 6e4 + t);
      0 < e.imgBytes && Tf === 0 && (Tf = 62500 * rv());
      var n = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && ku(e, e.stylesheets), e.unsuspend)) {
            var u = e.unsuspend;
            e.unsuspend = null, u();
          }
        },
        (e.imgBytes > Tf ? 50 : 800) + t
      );
      return e.unsuspend = l, function() {
        e.unsuspend = null, clearTimeout(a), clearTimeout(n);
      };
    } : null;
  }
  function $u() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) ku(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var Wu = null;
  function ku(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Wu = /* @__PURE__ */ new Map(), t.forEach(Mv, e), Wu = null, $u.call(e));
  }
  function Mv(e, t) {
    if (!(t.state.loading & 4)) {
      var l = Wu.get(e);
      if (l) var a = l.get(null);
      else {
        l = /* @__PURE__ */ new Map(), Wu.set(e, l);
        for (var n = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < n.length; u++) {
          var f = n[u];
          (f.nodeName === "LINK" || f.getAttribute("media") !== "not all") && (l.set(f.dataset.precedence, f), a = f);
        }
        a && l.set(null, a);
      }
      n = t.instance, f = n.getAttribute("data-precedence"), u = l.get(f) || a, u === a && l.set(null, n), l.set(f, n), this.count++, a = $u.bind(this), n.addEventListener("load", a), n.addEventListener("error", a), u ? u.parentNode.insertBefore(n, u.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(n, e.firstChild)), t.state.loading |= 4;
    }
  }
  var Rn = {
    $$typeof: q,
    Provider: null,
    Consumer: null,
    _currentValue: F,
    _currentValue2: F,
    _threadCount: 0
  };
  function jv(e, t, l, a, n, u, f, o, y) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = gi(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = gi(0), this.hiddenUpdates = gi(null), this.identifierPrefix = a, this.onUncaughtError = n, this.onCaughtError = u, this.onRecoverableError = f, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = y, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function am(e, t, l, a, n, u, f, o, y, _, M, C) {
    return e = new jv(
      e,
      t,
      l,
      f,
      y,
      _,
      M,
      C,
      o
    ), t = 1, u === !0 && (t |= 24), u = ot(3, null, null, t), e.current = u, u.stateNode = e, t = lc(), t.refCount++, e.pooledCache = t, t.refCount++, u.memoizedState = {
      element: a,
      isDehydrated: l,
      cache: t
    }, ic(u), e;
  }
  function nm(e) {
    return e ? (e = sa, e) : sa;
  }
  function um(e, t, l, a, n, u) {
    n = nm(n), a.context === null ? a.context = n : a.pendingContext = n, a = hl(t), a.payload = { element: l }, u = u === void 0 ? null : u, u !== null && (a.callback = u), l = vl(e, a, t), l !== null && (it(l, e, t), cn(l, e, t));
  }
  function im(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var l = e.retryLane;
      e.retryLane = l !== 0 && l < t ? l : t;
    }
  }
  function _f(e, t) {
    im(e, t), (e = e.alternate) && im(e, t);
  }
  function cm(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Ll(e, 67108864);
      t !== null && it(t, e, 67108864), _f(e, 67108864);
    }
  }
  function fm(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = yt();
      t = bi(t);
      var l = Ll(e, t);
      l !== null && it(l, e, t), _f(e, t);
    }
  }
  var Fu = !0;
  function Dv(e, t, l, a) {
    var n = j.T;
    j.T = null;
    var u = X.p;
    try {
      X.p = 2, Of(e, t, l, a);
    } finally {
      X.p = u, j.T = n;
    }
  }
  function Cv(e, t, l, a) {
    var n = j.T;
    j.T = null;
    var u = X.p;
    try {
      X.p = 8, Of(e, t, l, a);
    } finally {
      X.p = u, j.T = n;
    }
  }
  function Of(e, t, l, a) {
    if (Fu) {
      var n = Af(a);
      if (n === null)
        df(
          e,
          t,
          a,
          Pu,
          l
        ), sm(e, a);
      else if (wv(
        n,
        e,
        t,
        l,
        a
      ))
        a.stopPropagation();
      else if (sm(e, a), t & 4 && -1 < Uv.indexOf(e)) {
        for (; n !== null; ) {
          var u = Il(n);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var f = Cl(u.pendingLanes);
                  if (f !== 0) {
                    var o = u;
                    for (o.pendingLanes |= 2, o.entangledLanes |= 2; f; ) {
                      var y = 1 << 31 - rt(f);
                      o.entanglements[1] |= y, f &= ~y;
                    }
                    Bt(u), (me & 6) === 0 && (Uu = ct() + 500, zn(0));
                  }
                }
                break;
              case 31:
              case 13:
                o = Ll(u, 2), o !== null && it(o, u, 2), Hu(), _f(u, 2);
            }
          if (u = Af(a), u === null && df(
            e,
            t,
            a,
            Pu,
            l
          ), u === n) break;
          n = u;
        }
        n !== null && a.stopPropagation();
      } else
        df(
          e,
          t,
          a,
          null,
          l
        );
    }
  }
  function Af(e) {
    return e = Ni(e), Nf(e);
  }
  var Pu = null;
  function Nf(e) {
    if (Pu = null, e = Pl(e), e !== null) {
      var t = m(e);
      if (t === null) e = null;
      else {
        var l = t.tag;
        if (l === 13) {
          if (e = p(t), e !== null) return e;
          e = null;
        } else if (l === 31) {
          if (e = g(t), e !== null) return e;
          e = null;
        } else if (l === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return Pu = e, null;
  }
  function rm(e) {
    switch (e) {
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
        switch (bh()) {
          case yr:
            return 2;
          case pr:
            return 8;
          case Gn:
          case Sh:
            return 32;
          case gr:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Rf = !1, Ol = null, Al = null, Nl = null, Mn = /* @__PURE__ */ new Map(), jn = /* @__PURE__ */ new Map(), Rl = [], Uv = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function sm(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Ol = null;
        break;
      case "dragenter":
      case "dragleave":
        Al = null;
        break;
      case "mouseover":
      case "mouseout":
        Nl = null;
        break;
      case "pointerover":
      case "pointerout":
        Mn.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        jn.delete(t.pointerId);
    }
  }
  function Dn(e, t, l, a, n, u) {
    return e === null || e.nativeEvent !== u ? (e = {
      blockedOn: t,
      domEventName: l,
      eventSystemFlags: a,
      nativeEvent: u,
      targetContainers: [n]
    }, t !== null && (t = Il(t), t !== null && cm(t)), e) : (e.eventSystemFlags |= a, t = e.targetContainers, n !== null && t.indexOf(n) === -1 && t.push(n), e);
  }
  function wv(e, t, l, a, n) {
    switch (t) {
      case "focusin":
        return Ol = Dn(
          Ol,
          e,
          t,
          l,
          a,
          n
        ), !0;
      case "dragenter":
        return Al = Dn(
          Al,
          e,
          t,
          l,
          a,
          n
        ), !0;
      case "mouseover":
        return Nl = Dn(
          Nl,
          e,
          t,
          l,
          a,
          n
        ), !0;
      case "pointerover":
        var u = n.pointerId;
        return Mn.set(
          u,
          Dn(
            Mn.get(u) || null,
            e,
            t,
            l,
            a,
            n
          )
        ), !0;
      case "gotpointercapture":
        return u = n.pointerId, jn.set(
          u,
          Dn(
            jn.get(u) || null,
            e,
            t,
            l,
            a,
            n
          )
        ), !0;
    }
    return !1;
  }
  function om(e) {
    var t = Pl(e.target);
    if (t !== null) {
      var l = m(t);
      if (l !== null) {
        if (t = l.tag, t === 13) {
          if (t = p(l), t !== null) {
            e.blockedOn = t, Tr(e.priority, function() {
              fm(l);
            });
            return;
          }
        } else if (t === 31) {
          if (t = g(l), t !== null) {
            e.blockedOn = t, Tr(e.priority, function() {
              fm(l);
            });
            return;
          }
        } else if (t === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Iu(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var l = Af(e.nativeEvent);
      if (l === null) {
        l = e.nativeEvent;
        var a = new l.constructor(
          l.type,
          l
        );
        Ai = a, l.target.dispatchEvent(a), Ai = null;
      } else
        return t = Il(l), t !== null && cm(t), e.blockedOn = l, !1;
      t.shift();
    }
    return !0;
  }
  function dm(e, t, l) {
    Iu(e) && l.delete(t);
  }
  function Hv() {
    Rf = !1, Ol !== null && Iu(Ol) && (Ol = null), Al !== null && Iu(Al) && (Al = null), Nl !== null && Iu(Nl) && (Nl = null), Mn.forEach(dm), jn.forEach(dm);
  }
  function ei(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Rf || (Rf = !0, i.unstable_scheduleCallback(
      i.unstable_NormalPriority,
      Hv
    )));
  }
  var ti = null;
  function mm(e) {
    ti !== e && (ti = e, i.unstable_scheduleCallback(
      i.unstable_NormalPriority,
      function() {
        ti === e && (ti = null);
        for (var t = 0; t < e.length; t += 3) {
          var l = e[t], a = e[t + 1], n = e[t + 2];
          if (typeof a != "function") {
            if (Nf(a || l) === null)
              continue;
            break;
          }
          var u = Il(l);
          u !== null && (e.splice(t, 3), t -= 3, Oc(
            u,
            {
              pending: !0,
              data: n,
              method: l.method,
              action: a
            },
            a,
            n
          ));
        }
      }
    ));
  }
  function Ua(e) {
    function t(y) {
      return ei(y, e);
    }
    Ol !== null && ei(Ol, e), Al !== null && ei(Al, e), Nl !== null && ei(Nl, e), Mn.forEach(t), jn.forEach(t);
    for (var l = 0; l < Rl.length; l++) {
      var a = Rl[l];
      a.blockedOn === e && (a.blockedOn = null);
    }
    for (; 0 < Rl.length && (l = Rl[0], l.blockedOn === null); )
      om(l), l.blockedOn === null && Rl.shift();
    if (l = (e.ownerDocument || e).$$reactFormReplay, l != null)
      for (a = 0; a < l.length; a += 3) {
        var n = l[a], u = l[a + 1], f = n[et] || null;
        if (typeof u == "function")
          f || mm(l);
        else if (f) {
          var o = null;
          if (u && u.hasAttribute("formAction")) {
            if (n = u, f = u[et] || null)
              o = f.formAction;
            else if (Nf(n) !== null) continue;
          } else o = f.action;
          typeof o == "function" ? l[a + 1] = o : (l.splice(a, 3), a -= 3), mm(l);
        }
      }
  }
  function hm() {
    function e(u) {
      u.canIntercept && u.info === "react-transition" && u.intercept({
        handler: function() {
          return new Promise(function(f) {
            return n = f;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function t() {
      n !== null && (n(), n = null), a || setTimeout(l, 20);
    }
    function l() {
      if (!a && !navigation.transition) {
        var u = navigation.currentEntry;
        u && u.url != null && navigation.navigate(u.url, {
          state: u.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var a = !1, n = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(l, 100), function() {
        a = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), n !== null && (n(), n = null);
      };
    }
  }
  function Mf(e) {
    this._internalRoot = e;
  }
  li.prototype.render = Mf.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(c(409));
    var l = t.current, a = yt();
    um(l, a, e, t, null, null);
  }, li.prototype.unmount = Mf.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      um(e.current, 2, null, e, null, null), Hu(), t[Fl] = null;
    }
  };
  function li(e) {
    this._internalRoot = e;
  }
  li.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = zr();
      e = { blockedOn: null, target: e, priority: t };
      for (var l = 0; l < Rl.length && t !== 0 && t < Rl[l].priority; l++) ;
      Rl.splice(l, 0, e), l === 0 && om(e);
    }
  };
  var vm = s.version;
  if (vm !== "19.2.3")
    throw Error(
      c(
        527,
        vm,
        "19.2.3"
      )
    );
  X.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(c(188)) : (e = Object.keys(e).join(","), Error(c(268, e)));
    return e = h(t), e = e !== null ? x(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var Bv = {
    bundleType: 0,
    version: "19.2.3",
    rendererPackageName: "react-dom",
    currentDispatcherRef: j,
    reconcilerVersion: "19.2.3"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var ai = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!ai.isDisabled && ai.supportsFiber)
      try {
        Ya = ai.inject(
          Bv
        ), ft = ai;
      } catch {
      }
  }
  return Un.createRoot = function(e, t) {
    if (!d(e)) throw Error(c(299));
    var l = !1, a = "", n = xo, u = zo, f = To;
    return t != null && (t.unstable_strictMode === !0 && (l = !0), t.identifierPrefix !== void 0 && (a = t.identifierPrefix), t.onUncaughtError !== void 0 && (n = t.onUncaughtError), t.onCaughtError !== void 0 && (u = t.onCaughtError), t.onRecoverableError !== void 0 && (f = t.onRecoverableError)), t = am(
      e,
      1,
      !1,
      null,
      null,
      l,
      a,
      null,
      n,
      u,
      f,
      hm
    ), e[Fl] = t.current, of(e), new Mf(t);
  }, Un.hydrateRoot = function(e, t, l) {
    if (!d(e)) throw Error(c(299));
    var a = !1, n = "", u = xo, f = zo, o = To, y = null;
    return l != null && (l.unstable_strictMode === !0 && (a = !0), l.identifierPrefix !== void 0 && (n = l.identifierPrefix), l.onUncaughtError !== void 0 && (u = l.onUncaughtError), l.onCaughtError !== void 0 && (f = l.onCaughtError), l.onRecoverableError !== void 0 && (o = l.onRecoverableError), l.formState !== void 0 && (y = l.formState)), t = am(
      e,
      1,
      !0,
      t,
      l ?? null,
      a,
      n,
      y,
      u,
      f,
      o,
      hm
    ), t.context = nm(null), l = t.current, a = yt(), a = bi(a), n = hl(a), n.callback = null, vl(l, n, a), l = a, t.current.lanes = l, Xa(t, l), Bt(t), e[Fl] = t.current, of(e), new li(t);
  }, Un.version = "19.2.3", Un;
}
var _m;
function Jv() {
  if (_m) return Df.exports;
  _m = 1;
  function i() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i);
      } catch (s) {
        console.error(s);
      }
  }
  return i(), Df.exports = Kv(), Df.exports;
}
var $v = Jv(), A = ar();
const ae = /* @__PURE__ */ qm(A);
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
var Om = "popstate";
function Wv(i = {}) {
  function s(c, d) {
    let { pathname: m, search: p, hash: g } = c.location;
    return Xf(
      "",
      { pathname: m, search: p, hash: g },
      // state defaults to `null` because `window.history.state` does
      d.state && d.state.usr || null,
      d.state && d.state.key || "default"
    );
  }
  function r(c, d) {
    return typeof d == "string" ? d : Hn(d);
  }
  return Fv(
    s,
    r,
    null,
    i
  );
}
function Ne(i, s) {
  if (i === !1 || i === null || typeof i > "u")
    throw new Error(s);
}
function pt(i, s) {
  if (!i) {
    typeof console < "u" && console.warn(s);
    try {
      throw new Error(s);
    } catch {
    }
  }
}
function kv() {
  return Math.random().toString(36).substring(2, 10);
}
function Am(i, s) {
  return {
    usr: i.state,
    key: i.key,
    idx: s
  };
}
function Xf(i, s, r = null, c) {
  return {
    pathname: typeof i == "string" ? i : i.pathname,
    search: "",
    hash: "",
    ...typeof s == "string" ? Ha(s) : s,
    state: r,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: s && s.key || c || kv()
  };
}
function Hn({
  pathname: i = "/",
  search: s = "",
  hash: r = ""
}) {
  return s && s !== "?" && (i += s.charAt(0) === "?" ? s : "?" + s), r && r !== "#" && (i += r.charAt(0) === "#" ? r : "#" + r), i;
}
function Ha(i) {
  let s = {};
  if (i) {
    let r = i.indexOf("#");
    r >= 0 && (s.hash = i.substring(r), i = i.substring(0, r));
    let c = i.indexOf("?");
    c >= 0 && (s.search = i.substring(c), i = i.substring(0, c)), i && (s.pathname = i);
  }
  return s;
}
function Fv(i, s, r, c = {}) {
  let { window: d = document.defaultView, v5Compat: m = !1 } = c, p = d.history, g = "POP", v = null, h = x();
  h == null && (h = 0, p.replaceState({ ...p.state, idx: h }, ""));
  function x() {
    return (p.state || { idx: null }).idx;
  }
  function z() {
    g = "POP";
    let H = x(), G = H == null ? null : H - h;
    h = H, v && v({ action: g, location: B.location, delta: G });
  }
  function w(H, G) {
    g = "PUSH";
    let $ = Xf(B.location, H, G);
    h = x() + 1;
    let q = Am($, h), ne = B.createHref($);
    try {
      p.pushState(q, "", ne);
    } catch (pe) {
      if (pe instanceof DOMException && pe.name === "DataCloneError")
        throw pe;
      d.location.assign(ne);
    }
    m && v && v({ action: g, location: B.location, delta: 1 });
  }
  function Y(H, G) {
    g = "REPLACE";
    let $ = Xf(B.location, H, G);
    h = x();
    let q = Am($, h), ne = B.createHref($);
    p.replaceState(q, "", ne), m && v && v({ action: g, location: B.location, delta: 0 });
  }
  function L(H) {
    return Pv(H);
  }
  let B = {
    get action() {
      return g;
    },
    get location() {
      return i(d, p);
    },
    listen(H) {
      if (v)
        throw new Error("A history only accepts one active listener");
      return d.addEventListener(Om, z), v = H, () => {
        d.removeEventListener(Om, z), v = null;
      };
    },
    createHref(H) {
      return s(d, H);
    },
    createURL: L,
    encodeLocation(H) {
      let G = L(H);
      return {
        pathname: G.pathname,
        search: G.search,
        hash: G.hash
      };
    },
    push: w,
    replace: Y,
    go(H) {
      return p.go(H);
    }
  };
  return B;
}
function Pv(i, s = !1) {
  let r = "http://localhost";
  typeof window < "u" && (r = window.location.origin !== "null" ? window.location.origin : window.location.href), Ne(r, "No window.location.(origin|href) available to create URL");
  let c = typeof i == "string" ? i : Hn(i);
  return c = c.replace(/ $/, "%20"), !s && c.startsWith("//") && (c = r + c), new URL(c, r);
}
function Ym(i, s, r = "/") {
  return Iv(i, s, r, !1);
}
function Iv(i, s, r, c) {
  let d = typeof s == "string" ? Ha(s) : s, m = nl(d.pathname || "/", r);
  if (m == null)
    return null;
  let p = Gm(i);
  ey(p);
  let g = null;
  for (let v = 0; g == null && v < p.length; ++v) {
    let h = oy(m);
    g = ry(
      p[v],
      h,
      c
    );
  }
  return g;
}
function Gm(i, s = [], r = [], c = "", d = !1) {
  let m = (p, g, v = d, h) => {
    let x = {
      relativePath: h === void 0 ? p.path || "" : h,
      caseSensitive: p.caseSensitive === !0,
      childrenIndex: g,
      route: p
    };
    if (x.relativePath.startsWith("/")) {
      if (!x.relativePath.startsWith(c) && v)
        return;
      Ne(
        x.relativePath.startsWith(c),
        `Absolute route path "${x.relativePath}" nested under path "${c}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ), x.relativePath = x.relativePath.slice(c.length);
    }
    let z = al([c, x.relativePath]), w = r.concat(x);
    p.children && p.children.length > 0 && (Ne(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      p.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${z}".`
    ), Gm(
      p.children,
      s,
      w,
      z,
      v
    )), !(p.path == null && !p.index) && s.push({
      path: z,
      score: cy(z, p.index),
      routesMeta: w
    });
  };
  return i.forEach((p, g) => {
    var v;
    if (p.path === "" || !((v = p.path) != null && v.includes("?")))
      m(p, g);
    else
      for (let h of Xm(p.path))
        m(p, g, !0, h);
  }), s;
}
function Xm(i) {
  let s = i.split("/");
  if (s.length === 0) return [];
  let [r, ...c] = s, d = r.endsWith("?"), m = r.replace(/\?$/, "");
  if (c.length === 0)
    return d ? [m, ""] : [m];
  let p = Xm(c.join("/")), g = [];
  return g.push(
    ...p.map(
      (v) => v === "" ? m : [m, v].join("/")
    )
  ), d && g.push(...p), g.map(
    (v) => i.startsWith("/") && v === "" ? "/" : v
  );
}
function ey(i) {
  i.sort(
    (s, r) => s.score !== r.score ? r.score - s.score : fy(
      s.routesMeta.map((c) => c.childrenIndex),
      r.routesMeta.map((c) => c.childrenIndex)
    )
  );
}
var ty = /^:[\w-]+$/, ly = 3, ay = 2, ny = 1, uy = 10, iy = -2, Nm = (i) => i === "*";
function cy(i, s) {
  let r = i.split("/"), c = r.length;
  return r.some(Nm) && (c += iy), s && (c += ay), r.filter((d) => !Nm(d)).reduce(
    (d, m) => d + (ty.test(m) ? ly : m === "" ? ny : uy),
    c
  );
}
function fy(i, s) {
  return i.length === s.length && i.slice(0, -1).every((c, d) => c === s[d]) ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    i[i.length - 1] - s[s.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function ry(i, s, r = !1) {
  let { routesMeta: c } = i, d = {}, m = "/", p = [];
  for (let g = 0; g < c.length; ++g) {
    let v = c[g], h = g === c.length - 1, x = m === "/" ? s : s.slice(m.length) || "/", z = fi(
      { path: v.relativePath, caseSensitive: v.caseSensitive, end: h },
      x
    ), w = v.route;
    if (!z && h && r && !c[c.length - 1].route.index && (z = fi(
      {
        path: v.relativePath,
        caseSensitive: v.caseSensitive,
        end: !1
      },
      x
    )), !z)
      return null;
    Object.assign(d, z.params), p.push({
      // TODO: Can this as be avoided?
      params: d,
      pathname: al([m, z.pathname]),
      pathnameBase: yy(
        al([m, z.pathnameBase])
      ),
      route: w
    }), z.pathnameBase !== "/" && (m = al([m, z.pathnameBase]));
  }
  return p;
}
function fi(i, s) {
  typeof i == "string" && (i = { path: i, caseSensitive: !1, end: !0 });
  let [r, c] = sy(
    i.path,
    i.caseSensitive,
    i.end
  ), d = s.match(r);
  if (!d) return null;
  let m = d[0], p = m.replace(/(.)\/+$/, "$1"), g = d.slice(1);
  return {
    params: c.reduce(
      (h, { paramName: x, isOptional: z }, w) => {
        if (x === "*") {
          let L = g[w] || "";
          p = m.slice(0, m.length - L.length).replace(/(.)\/+$/, "$1");
        }
        const Y = g[w];
        return z && !Y ? h[x] = void 0 : h[x] = (Y || "").replace(/%2F/g, "/"), h;
      },
      {}
    ),
    pathname: m,
    pathnameBase: p,
    pattern: i
  };
}
function sy(i, s = !1, r = !0) {
  pt(
    i === "*" || !i.endsWith("*") || i.endsWith("/*"),
    `Route path "${i}" will be treated as if it were "${i.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${i.replace(/\*$/, "/*")}".`
  );
  let c = [], d = "^" + i.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (p, g, v) => (c.push({ paramName: g, isOptional: v != null }), v ? "/?([^\\/]+)?" : "/([^\\/]+)")
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return i.endsWith("*") ? (c.push({ paramName: "*" }), d += i === "*" || i === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : r ? d += "\\/*$" : i !== "" && i !== "/" && (d += "(?:(?=\\/|$))"), [new RegExp(d, s ? void 0 : "i"), c];
}
function oy(i) {
  try {
    return i.split("/").map((s) => decodeURIComponent(s).replace(/\//g, "%2F")).join("/");
  } catch (s) {
    return pt(
      !1,
      `The URL path "${i}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${s}).`
    ), i;
  }
}
function nl(i, s) {
  if (s === "/") return i;
  if (!i.toLowerCase().startsWith(s.toLowerCase()))
    return null;
  let r = s.endsWith("/") ? s.length - 1 : s.length, c = i.charAt(r);
  return c && c !== "/" ? null : i.slice(r) || "/";
}
var dy = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, my = (i) => dy.test(i);
function hy(i, s = "/") {
  let {
    pathname: r,
    search: c = "",
    hash: d = ""
  } = typeof i == "string" ? Ha(i) : i, m;
  if (r)
    if (my(r))
      m = r;
    else {
      if (r.includes("//")) {
        let p = r;
        r = r.replace(/\/\/+/g, "/"), pt(
          !1,
          `Pathnames cannot have embedded double slashes - normalizing ${p} -> ${r}`
        );
      }
      r.startsWith("/") ? m = Rm(r.substring(1), "/") : m = Rm(r, s);
    }
  else
    m = s;
  return {
    pathname: m,
    search: py(c),
    hash: gy(d)
  };
}
function Rm(i, s) {
  let r = s.replace(/\/+$/, "").split("/");
  return i.split("/").forEach((d) => {
    d === ".." ? r.length > 1 && r.pop() : d !== "." && r.push(d);
  }), r.length > 1 ? r.join("/") : "/";
}
function Bf(i, s, r, c) {
  return `Cannot include a '${i}' character in a manually specified \`to.${s}\` field [${JSON.stringify(
    c
  )}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function vy(i) {
  return i.filter(
    (s, r) => r === 0 || s.route.path && s.route.path.length > 0
  );
}
function nr(i) {
  let s = vy(i);
  return s.map(
    (r, c) => c === s.length - 1 ? r.pathname : r.pathnameBase
  );
}
function ur(i, s, r, c = !1) {
  let d;
  typeof i == "string" ? d = Ha(i) : (d = { ...i }, Ne(
    !d.pathname || !d.pathname.includes("?"),
    Bf("?", "pathname", "search", d)
  ), Ne(
    !d.pathname || !d.pathname.includes("#"),
    Bf("#", "pathname", "hash", d)
  ), Ne(
    !d.search || !d.search.includes("#"),
    Bf("#", "search", "hash", d)
  ));
  let m = i === "" || d.pathname === "", p = m ? "/" : d.pathname, g;
  if (p == null)
    g = r;
  else {
    let z = s.length - 1;
    if (!c && p.startsWith("..")) {
      let w = p.split("/");
      for (; w[0] === ".."; )
        w.shift(), z -= 1;
      d.pathname = w.join("/");
    }
    g = z >= 0 ? s[z] : "/";
  }
  let v = hy(d, g), h = p && p !== "/" && p.endsWith("/"), x = (m || p === ".") && r.endsWith("/");
  return !v.pathname.endsWith("/") && (h || x) && (v.pathname += "/"), v;
}
var al = (i) => i.join("/").replace(/\/\/+/g, "/"), yy = (i) => i.replace(/\/+$/, "").replace(/^\/*/, "/"), py = (i) => !i || i === "?" ? "" : i.startsWith("?") ? i : "?" + i, gy = (i) => !i || i === "#" ? "" : i.startsWith("#") ? i : "#" + i;
function by(i) {
  return i != null && typeof i.status == "number" && typeof i.statusText == "string" && typeof i.internal == "boolean" && "data" in i;
}
function Sy(i) {
  return i.map((s) => s.route.path).filter(Boolean).join("/").replace(/\/\/*/g, "/") || "/";
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var Qm = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
];
new Set(
  Qm
);
var Ey = [
  "GET",
  ...Qm
];
new Set(Ey);
var Ba = A.createContext(null);
Ba.displayName = "DataRouter";
var ri = A.createContext(null);
ri.displayName = "DataRouterState";
A.createContext(!1);
var Zm = A.createContext({
  isTransitioning: !1
});
Zm.displayName = "ViewTransition";
var xy = A.createContext(
  /* @__PURE__ */ new Map()
);
xy.displayName = "Fetchers";
var zy = A.createContext(null);
zy.displayName = "Await";
var Nt = A.createContext(
  null
);
Nt.displayName = "Navigation";
var Bn = A.createContext(
  null
);
Bn.displayName = "Location";
var Ct = A.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
Ct.displayName = "Route";
var ir = A.createContext(null);
ir.displayName = "RouteError";
function Ty(i, { relative: s } = {}) {
  Ne(
    La(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: r, navigator: c } = A.useContext(Nt), { hash: d, pathname: m, search: p } = Ln(i, { relative: s }), g = m;
  return r !== "/" && (g = m === "/" ? r : al([r, m])), c.createHref({ pathname: g, search: p, hash: d });
}
function La() {
  return A.useContext(Bn) != null;
}
function ul() {
  return Ne(
    La(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), A.useContext(Bn).location;
}
var Vm = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Km(i) {
  A.useContext(Nt).static || A.useLayoutEffect(i);
}
function cr() {
  let { isDataRoute: i } = A.useContext(Ct);
  return i ? Ly() : _y();
}
function _y() {
  Ne(
    La(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let i = A.useContext(Ba), { basename: s, navigator: r } = A.useContext(Nt), { matches: c } = A.useContext(Ct), { pathname: d } = ul(), m = JSON.stringify(nr(c)), p = A.useRef(!1);
  return Km(() => {
    p.current = !0;
  }), A.useCallback(
    (v, h = {}) => {
      if (pt(p.current, Vm), !p.current) return;
      if (typeof v == "number") {
        r.go(v);
        return;
      }
      let x = ur(
        v,
        JSON.parse(m),
        d,
        h.relative === "path"
      );
      i == null && s !== "/" && (x.pathname = x.pathname === "/" ? s : al([s, x.pathname])), (h.replace ? r.replace : r.push)(
        x,
        h.state,
        h
      );
    },
    [
      s,
      r,
      m,
      d,
      i
    ]
  );
}
A.createContext(null);
function Oy() {
  let { matches: i } = A.useContext(Ct), s = i[i.length - 1];
  return s ? s.params : {};
}
function Ln(i, { relative: s } = {}) {
  let { matches: r } = A.useContext(Ct), { pathname: c } = ul(), d = JSON.stringify(nr(r));
  return A.useMemo(
    () => ur(
      i,
      JSON.parse(d),
      c,
      s === "path"
    ),
    [i, d, c, s]
  );
}
function Ay(i, s) {
  return Jm(i, s);
}
function Jm(i, s, r, c, d) {
  var $;
  Ne(
    La(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: m } = A.useContext(Nt), { matches: p } = A.useContext(Ct), g = p[p.length - 1], v = g ? g.params : {}, h = g ? g.pathname : "/", x = g ? g.pathnameBase : "/", z = g && g.route;
  {
    let q = z && z.path || "";
    $m(
      h,
      !z || q.endsWith("*") || q.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${h}" (under <Route path="${q}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${q}"> to <Route path="${q === "/" ? "*" : `${q}/*`}">.`
    );
  }
  let w = ul(), Y;
  if (s) {
    let q = typeof s == "string" ? Ha(s) : s;
    Ne(
      x === "/" || (($ = q.pathname) == null ? void 0 : $.startsWith(x)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${x}" but pathname "${q.pathname}" was given in the \`location\` prop.`
    ), Y = q;
  } else
    Y = w;
  let L = Y.pathname || "/", B = L;
  if (x !== "/") {
    let q = x.replace(/^\//, "").split("/");
    B = "/" + L.replace(/^\//, "").split("/").slice(q.length).join("/");
  }
  let H = Ym(i, { pathname: B });
  pt(
    z || H != null,
    `No routes matched location "${Y.pathname}${Y.search}${Y.hash}" `
  ), pt(
    H == null || H[H.length - 1].route.element !== void 0 || H[H.length - 1].route.Component !== void 0 || H[H.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${Y.pathname}${Y.search}${Y.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  );
  let G = Dy(
    H && H.map(
      (q) => Object.assign({}, q, {
        params: Object.assign({}, v, q.params),
        pathname: al([
          x,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          m.encodeLocation ? m.encodeLocation(
            q.pathname.replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : q.pathname
        ]),
        pathnameBase: q.pathnameBase === "/" ? x : al([
          x,
          // Re-encode pathnames that were decoded inside matchRoutes
          // Pre-encode `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          m.encodeLocation ? m.encodeLocation(
            q.pathnameBase.replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : q.pathnameBase
        ])
      })
    ),
    p,
    r,
    c,
    d
  );
  return s && G ? /* @__PURE__ */ A.createElement(
    Bn.Provider,
    {
      value: {
        location: {
          pathname: "/",
          search: "",
          hash: "",
          state: null,
          key: "default",
          ...Y
        },
        navigationType: "POP"
        /* Pop */
      }
    },
    G
  ) : G;
}
function Ny() {
  let i = By(), s = by(i) ? `${i.status} ${i.statusText}` : i instanceof Error ? i.message : JSON.stringify(i), r = i instanceof Error ? i.stack : null, c = "rgba(200,200,200, 0.5)", d = { padding: "0.5rem", backgroundColor: c }, m = { padding: "2px 4px", backgroundColor: c }, p = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    i
  ), p = /* @__PURE__ */ A.createElement(A.Fragment, null, /* @__PURE__ */ A.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ A.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ A.createElement("code", { style: m }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ A.createElement("code", { style: m }, "errorElement"), " prop on your route.")), /* @__PURE__ */ A.createElement(A.Fragment, null, /* @__PURE__ */ A.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ A.createElement("h3", { style: { fontStyle: "italic" } }, s), r ? /* @__PURE__ */ A.createElement("pre", { style: d }, r) : null, p);
}
var Ry = /* @__PURE__ */ A.createElement(Ny, null), My = class extends A.Component {
  constructor(i) {
    super(i), this.state = {
      location: i.location,
      revalidation: i.revalidation,
      error: i.error
    };
  }
  static getDerivedStateFromError(i) {
    return { error: i };
  }
  static getDerivedStateFromProps(i, s) {
    return s.location !== i.location || s.revalidation !== "idle" && i.revalidation === "idle" ? {
      error: i.error,
      location: i.location,
      revalidation: i.revalidation
    } : {
      error: i.error !== void 0 ? i.error : s.error,
      location: s.location,
      revalidation: i.revalidation || s.revalidation
    };
  }
  componentDidCatch(i, s) {
    this.props.onError ? this.props.onError(i, s) : console.error(
      "React Router caught the following error during render",
      i
    );
  }
  render() {
    return this.state.error !== void 0 ? /* @__PURE__ */ A.createElement(Ct.Provider, { value: this.props.routeContext }, /* @__PURE__ */ A.createElement(
      ir.Provider,
      {
        value: this.state.error,
        children: this.props.component
      }
    )) : this.props.children;
  }
};
function jy({ routeContext: i, match: s, children: r }) {
  let c = A.useContext(Ba);
  return c && c.static && c.staticContext && (s.route.errorElement || s.route.ErrorBoundary) && (c.staticContext._deepestRenderedBoundaryId = s.route.id), /* @__PURE__ */ A.createElement(Ct.Provider, { value: i }, r);
}
function Dy(i, s = [], r = null, c = null, d = null) {
  if (i == null) {
    if (!r)
      return null;
    if (r.errors)
      i = r.matches;
    else if (s.length === 0 && !r.initialized && r.matches.length > 0)
      i = r.matches;
    else
      return null;
  }
  let m = i, p = r == null ? void 0 : r.errors;
  if (p != null) {
    let x = m.findIndex(
      (z) => z.route.id && (p == null ? void 0 : p[z.route.id]) !== void 0
    );
    Ne(
      x >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        p
      ).join(",")}`
    ), m = m.slice(
      0,
      Math.min(m.length, x + 1)
    );
  }
  let g = !1, v = -1;
  if (r)
    for (let x = 0; x < m.length; x++) {
      let z = m[x];
      if ((z.route.HydrateFallback || z.route.hydrateFallbackElement) && (v = x), z.route.id) {
        let { loaderData: w, errors: Y } = r, L = z.route.loader && !w.hasOwnProperty(z.route.id) && (!Y || Y[z.route.id] === void 0);
        if (z.route.lazy || L) {
          g = !0, v >= 0 ? m = m.slice(0, v + 1) : m = [m[0]];
          break;
        }
      }
    }
  let h = r && c ? (x, z) => {
    var w, Y;
    c(x, {
      location: r.location,
      params: ((Y = (w = r.matches) == null ? void 0 : w[0]) == null ? void 0 : Y.params) ?? {},
      unstable_pattern: Sy(r.matches),
      errorInfo: z
    });
  } : void 0;
  return m.reduceRight(
    (x, z, w) => {
      let Y, L = !1, B = null, H = null;
      r && (Y = p && z.route.id ? p[z.route.id] : void 0, B = z.route.errorElement || Ry, g && (v < 0 && w === 0 ? ($m(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), L = !0, H = null) : v === w && (L = !0, H = z.route.hydrateFallbackElement || null)));
      let G = s.concat(m.slice(0, w + 1)), $ = () => {
        let q;
        return Y ? q = B : L ? q = H : z.route.Component ? q = /* @__PURE__ */ A.createElement(z.route.Component, null) : z.route.element ? q = z.route.element : q = x, /* @__PURE__ */ A.createElement(
          jy,
          {
            match: z,
            routeContext: {
              outlet: x,
              matches: G,
              isDataRoute: r != null
            },
            children: q
          }
        );
      };
      return r && (z.route.ErrorBoundary || z.route.errorElement || w === 0) ? /* @__PURE__ */ A.createElement(
        My,
        {
          location: r.location,
          revalidation: r.revalidation,
          component: B,
          error: Y,
          children: $(),
          routeContext: { outlet: null, matches: G, isDataRoute: !0 },
          onError: h
        }
      ) : $();
    },
    null
  );
}
function fr(i) {
  return `${i} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Cy(i) {
  let s = A.useContext(Ba);
  return Ne(s, fr(i)), s;
}
function Uy(i) {
  let s = A.useContext(ri);
  return Ne(s, fr(i)), s;
}
function wy(i) {
  let s = A.useContext(Ct);
  return Ne(s, fr(i)), s;
}
function rr(i) {
  let s = wy(i), r = s.matches[s.matches.length - 1];
  return Ne(
    r.route.id,
    `${i} can only be used on routes that contain a unique "id"`
  ), r.route.id;
}
function Hy() {
  return rr(
    "useRouteId"
    /* UseRouteId */
  );
}
function By() {
  var c;
  let i = A.useContext(ir), s = Uy(
    "useRouteError"
    /* UseRouteError */
  ), r = rr(
    "useRouteError"
    /* UseRouteError */
  );
  return i !== void 0 ? i : (c = s.errors) == null ? void 0 : c[r];
}
function Ly() {
  let { router: i } = Cy(
    "useNavigate"
    /* UseNavigateStable */
  ), s = rr(
    "useNavigate"
    /* UseNavigateStable */
  ), r = A.useRef(!1);
  return Km(() => {
    r.current = !0;
  }), A.useCallback(
    async (d, m = {}) => {
      pt(r.current, Vm), r.current && (typeof d == "number" ? await i.navigate(d) : await i.navigate(d, { fromRouteId: s, ...m }));
    },
    [i, s]
  );
}
var Mm = {};
function $m(i, s, r) {
  !s && !Mm[i] && (Mm[i] = !0, pt(!1, r));
}
A.memo(qy);
function qy({
  routes: i,
  future: s,
  state: r,
  unstable_onError: c
}) {
  return Jm(i, void 0, r, c, s);
}
function Yy({
  to: i,
  replace: s,
  state: r,
  relative: c
}) {
  Ne(
    La(),
    // TODO: This error is probably because they somehow have 2 versions of
    // the router loaded. We can help them understand how to avoid that.
    "<Navigate> may be used only in the context of a <Router> component."
  );
  let { static: d } = A.useContext(Nt);
  pt(
    !d,
    "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change."
  );
  let { matches: m } = A.useContext(Ct), { pathname: p } = ul(), g = cr(), v = ur(
    i,
    nr(m),
    p,
    c === "path"
  ), h = JSON.stringify(v);
  return A.useEffect(() => {
    g(JSON.parse(h), { replace: s, state: r, relative: c });
  }, [g, h, c, s, r]), null;
}
function ui(i) {
  Ne(
    !1,
    "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>."
  );
}
function Gy({
  basename: i = "/",
  children: s = null,
  location: r,
  navigationType: c = "POP",
  navigator: d,
  static: m = !1,
  unstable_useTransitions: p
}) {
  Ne(
    !La(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let g = i.replace(/^\/*/, "/"), v = A.useMemo(
    () => ({
      basename: g,
      navigator: d,
      static: m,
      unstable_useTransitions: p,
      future: {}
    }),
    [g, d, m, p]
  );
  typeof r == "string" && (r = Ha(r));
  let {
    pathname: h = "/",
    search: x = "",
    hash: z = "",
    state: w = null,
    key: Y = "default"
  } = r, L = A.useMemo(() => {
    let B = nl(h, g);
    return B == null ? null : {
      location: {
        pathname: B,
        search: x,
        hash: z,
        state: w,
        key: Y
      },
      navigationType: c
    };
  }, [g, h, x, z, w, Y, c]);
  return pt(
    L != null,
    `<Router basename="${g}"> is not able to match the URL "${h}${x}${z}" because it does not start with the basename, so the <Router> won't render anything.`
  ), L == null ? null : /* @__PURE__ */ A.createElement(Nt.Provider, { value: v }, /* @__PURE__ */ A.createElement(Bn.Provider, { children: s, value: L }));
}
function Xy({
  children: i,
  location: s
}) {
  return Ay(Qf(i), s);
}
function Qf(i, s = []) {
  let r = [];
  return A.Children.forEach(i, (c, d) => {
    if (!A.isValidElement(c))
      return;
    let m = [...s, d];
    if (c.type === A.Fragment) {
      r.push.apply(
        r,
        Qf(c.props.children, m)
      );
      return;
    }
    Ne(
      c.type === ui,
      `[${typeof c.type == "string" ? c.type : c.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
    ), Ne(
      !c.props.index || !c.props.children,
      "An index route cannot have child routes."
    );
    let p = {
      id: c.props.id || m.join("-"),
      caseSensitive: c.props.caseSensitive,
      element: c.props.element,
      Component: c.props.Component,
      index: c.props.index,
      path: c.props.path,
      middleware: c.props.middleware,
      loader: c.props.loader,
      action: c.props.action,
      hydrateFallbackElement: c.props.hydrateFallbackElement,
      HydrateFallback: c.props.HydrateFallback,
      errorElement: c.props.errorElement,
      ErrorBoundary: c.props.ErrorBoundary,
      hasErrorBoundary: c.props.hasErrorBoundary === !0 || c.props.ErrorBoundary != null || c.props.errorElement != null,
      shouldRevalidate: c.props.shouldRevalidate,
      handle: c.props.handle,
      lazy: c.props.lazy
    };
    c.props.children && (p.children = Qf(
      c.props.children,
      m
    )), r.push(p);
  }), r;
}
var ii = "get", ci = "application/x-www-form-urlencoded";
function si(i) {
  return typeof HTMLElement < "u" && i instanceof HTMLElement;
}
function Qy(i) {
  return si(i) && i.tagName.toLowerCase() === "button";
}
function Zy(i) {
  return si(i) && i.tagName.toLowerCase() === "form";
}
function Vy(i) {
  return si(i) && i.tagName.toLowerCase() === "input";
}
function Ky(i) {
  return !!(i.metaKey || i.altKey || i.ctrlKey || i.shiftKey);
}
function Jy(i, s) {
  return i.button === 0 && // Ignore everything but left clicks
  (!s || s === "_self") && // Let browser handle "target=_blank" etc.
  !Ky(i);
}
function Zf(i = "") {
  return new URLSearchParams(
    typeof i == "string" || Array.isArray(i) || i instanceof URLSearchParams ? i : Object.keys(i).reduce((s, r) => {
      let c = i[r];
      return s.concat(
        Array.isArray(c) ? c.map((d) => [r, d]) : [[r, c]]
      );
    }, [])
  );
}
function $y(i, s) {
  let r = Zf(i);
  return s && s.forEach((c, d) => {
    r.has(d) || s.getAll(d).forEach((m) => {
      r.append(d, m);
    });
  }), r;
}
var ni = null;
function Wy() {
  if (ni === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), ni = !1;
    } catch {
      ni = !0;
    }
  return ni;
}
var ky = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function Lf(i) {
  return i != null && !ky.has(i) ? (pt(
    !1,
    `"${i}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${ci}"`
  ), null) : i;
}
function Fy(i, s) {
  let r, c, d, m, p;
  if (Zy(i)) {
    let g = i.getAttribute("action");
    c = g ? nl(g, s) : null, r = i.getAttribute("method") || ii, d = Lf(i.getAttribute("enctype")) || ci, m = new FormData(i);
  } else if (Qy(i) || Vy(i) && (i.type === "submit" || i.type === "image")) {
    let g = i.form;
    if (g == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let v = i.getAttribute("formaction") || g.getAttribute("action");
    if (c = v ? nl(v, s) : null, r = i.getAttribute("formmethod") || g.getAttribute("method") || ii, d = Lf(i.getAttribute("formenctype")) || Lf(g.getAttribute("enctype")) || ci, m = new FormData(g, i), !Wy()) {
      let { name: h, type: x, value: z } = i;
      if (x === "image") {
        let w = h ? `${h}.` : "";
        m.append(`${w}x`, "0"), m.append(`${w}y`, "0");
      } else h && m.append(h, z);
    }
  } else {
    if (si(i))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    r = ii, c = null, d = ci, p = i;
  }
  return m && d === "text/plain" && (p = m, m = void 0), { action: c, method: r.toLowerCase(), encType: d, formData: m, body: p };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function sr(i, s) {
  if (i === !1 || i === null || typeof i > "u")
    throw new Error(s);
}
function Py(i, s, r) {
  let c = typeof i == "string" ? new URL(
    i,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : i;
  return c.pathname === "/" ? c.pathname = `_root.${r}` : s && nl(c.pathname, s) === "/" ? c.pathname = `${s.replace(/\/$/, "")}/_root.${r}` : c.pathname = `${c.pathname.replace(/\/$/, "")}.${r}`, c;
}
async function Iy(i, s) {
  if (i.id in s)
    return s[i.id];
  try {
    let r = await import(
      /* @vite-ignore */
      /* webpackIgnore: true */
      i.module
    );
    return s[i.id] = r, r;
  } catch (r) {
    return console.error(
      `Error loading route module \`${i.module}\`, reloading page...`
    ), console.error(r), window.__reactRouterContext && window.__reactRouterContext.isSpaMode, window.location.reload(), new Promise(() => {
    });
  }
}
function e1(i) {
  return i == null ? !1 : i.href == null ? i.rel === "preload" && typeof i.imageSrcSet == "string" && typeof i.imageSizes == "string" : typeof i.rel == "string" && typeof i.href == "string";
}
async function t1(i, s, r) {
  let c = await Promise.all(
    i.map(async (d) => {
      let m = s.routes[d.route.id];
      if (m) {
        let p = await Iy(m, r);
        return p.links ? p.links() : [];
      }
      return [];
    })
  );
  return u1(
    c.flat(1).filter(e1).filter((d) => d.rel === "stylesheet" || d.rel === "preload").map(
      (d) => d.rel === "stylesheet" ? { ...d, rel: "prefetch", as: "style" } : { ...d, rel: "prefetch" }
    )
  );
}
function jm(i, s, r, c, d, m) {
  let p = (v, h) => r[h] ? v.route.id !== r[h].route.id : !0, g = (v, h) => {
    var x;
    return (
      // param change, /users/123 -> /users/456
      r[h].pathname !== v.pathname || // splat param changed, which is not present in match.path
      // e.g. /files/images/avatar.jpg -> files/finances.xls
      ((x = r[h].route.path) == null ? void 0 : x.endsWith("*")) && r[h].params["*"] !== v.params["*"]
    );
  };
  return m === "assets" ? s.filter(
    (v, h) => p(v, h) || g(v, h)
  ) : m === "data" ? s.filter((v, h) => {
    var z;
    let x = c.routes[v.route.id];
    if (!x || !x.hasLoader)
      return !1;
    if (p(v, h) || g(v, h))
      return !0;
    if (v.route.shouldRevalidate) {
      let w = v.route.shouldRevalidate({
        currentUrl: new URL(
          d.pathname + d.search + d.hash,
          window.origin
        ),
        currentParams: ((z = r[0]) == null ? void 0 : z.params) || {},
        nextUrl: new URL(i, window.origin),
        nextParams: v.params,
        defaultShouldRevalidate: !0
      });
      if (typeof w == "boolean")
        return w;
    }
    return !0;
  }) : [];
}
function l1(i, s, { includeHydrateFallback: r } = {}) {
  return a1(
    i.map((c) => {
      let d = s.routes[c.route.id];
      if (!d) return [];
      let m = [d.module];
      return d.clientActionModule && (m = m.concat(d.clientActionModule)), d.clientLoaderModule && (m = m.concat(d.clientLoaderModule)), r && d.hydrateFallbackModule && (m = m.concat(d.hydrateFallbackModule)), d.imports && (m = m.concat(d.imports)), m;
    }).flat(1)
  );
}
function a1(i) {
  return [...new Set(i)];
}
function n1(i) {
  let s = {}, r = Object.keys(i).sort();
  for (let c of r)
    s[c] = i[c];
  return s;
}
function u1(i, s) {
  let r = /* @__PURE__ */ new Set();
  return new Set(s), i.reduce((c, d) => {
    let m = JSON.stringify(n1(d));
    return r.has(m) || (r.add(m), c.push({ key: m, link: d })), c;
  }, []);
}
function Wm() {
  let i = A.useContext(Ba);
  return sr(
    i,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), i;
}
function i1() {
  let i = A.useContext(ri);
  return sr(
    i,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), i;
}
var or = A.createContext(void 0);
or.displayName = "FrameworkContext";
function km() {
  let i = A.useContext(or);
  return sr(
    i,
    "You must render this element inside a <HydratedRouter> element"
  ), i;
}
function c1(i, s) {
  let r = A.useContext(or), [c, d] = A.useState(!1), [m, p] = A.useState(!1), { onFocus: g, onBlur: v, onMouseEnter: h, onMouseLeave: x, onTouchStart: z } = s, w = A.useRef(null);
  A.useEffect(() => {
    if (i === "render" && p(!0), i === "viewport") {
      let B = (G) => {
        G.forEach(($) => {
          p($.isIntersecting);
        });
      }, H = new IntersectionObserver(B, { threshold: 0.5 });
      return w.current && H.observe(w.current), () => {
        H.disconnect();
      };
    }
  }, [i]), A.useEffect(() => {
    if (c) {
      let B = setTimeout(() => {
        p(!0);
      }, 100);
      return () => {
        clearTimeout(B);
      };
    }
  }, [c]);
  let Y = () => {
    d(!0);
  }, L = () => {
    d(!1), p(!1);
  };
  return r ? i !== "intent" ? [m, w, {}] : [
    m,
    w,
    {
      onFocus: wn(g, Y),
      onBlur: wn(v, L),
      onMouseEnter: wn(h, Y),
      onMouseLeave: wn(x, L),
      onTouchStart: wn(z, Y)
    }
  ] : [!1, w, {}];
}
function wn(i, s) {
  return (r) => {
    i && i(r), r.defaultPrevented || s(r);
  };
}
function f1({ page: i, ...s }) {
  let { router: r } = Wm(), c = A.useMemo(
    () => Ym(r.routes, i, r.basename),
    [r.routes, i, r.basename]
  );
  return c ? /* @__PURE__ */ A.createElement(s1, { page: i, matches: c, ...s }) : null;
}
function r1(i) {
  let { manifest: s, routeModules: r } = km(), [c, d] = A.useState([]);
  return A.useEffect(() => {
    let m = !1;
    return t1(i, s, r).then(
      (p) => {
        m || d(p);
      }
    ), () => {
      m = !0;
    };
  }, [i, s, r]), c;
}
function s1({
  page: i,
  matches: s,
  ...r
}) {
  let c = ul(), { manifest: d, routeModules: m } = km(), { basename: p } = Wm(), { loaderData: g, matches: v } = i1(), h = A.useMemo(
    () => jm(
      i,
      s,
      v,
      d,
      c,
      "data"
    ),
    [i, s, v, d, c]
  ), x = A.useMemo(
    () => jm(
      i,
      s,
      v,
      d,
      c,
      "assets"
    ),
    [i, s, v, d, c]
  ), z = A.useMemo(() => {
    if (i === c.pathname + c.search + c.hash)
      return [];
    let L = /* @__PURE__ */ new Set(), B = !1;
    if (s.forEach((G) => {
      var q;
      let $ = d.routes[G.route.id];
      !$ || !$.hasLoader || (!h.some((ne) => ne.route.id === G.route.id) && G.route.id in g && ((q = m[G.route.id]) != null && q.shouldRevalidate) || $.hasClientLoader ? B = !0 : L.add(G.route.id));
    }), L.size === 0)
      return [];
    let H = Py(i, p, "data");
    return B && L.size > 0 && H.searchParams.set(
      "_routes",
      s.filter((G) => L.has(G.route.id)).map((G) => G.route.id).join(",")
    ), [H.pathname + H.search];
  }, [
    p,
    g,
    c,
    d,
    h,
    s,
    i,
    m
  ]), w = A.useMemo(
    () => l1(x, d),
    [x, d]
  ), Y = r1(x);
  return /* @__PURE__ */ A.createElement(A.Fragment, null, z.map((L) => /* @__PURE__ */ A.createElement("link", { key: L, rel: "prefetch", as: "fetch", href: L, ...r })), w.map((L) => /* @__PURE__ */ A.createElement("link", { key: L, rel: "modulepreload", href: L, ...r })), Y.map(({ key: L, link: B }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ A.createElement("link", { key: L, nonce: r.nonce, ...B })
  )));
}
function o1(...i) {
  return (s) => {
    i.forEach((r) => {
      typeof r == "function" ? r(s) : r != null && (r.current = s);
    });
  };
}
var Fm = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  Fm && (window.__reactRouterVersion = // @ts-expect-error
  "7.10.1");
} catch {
}
function d1({
  basename: i,
  children: s,
  unstable_useTransitions: r,
  window: c
}) {
  let d = A.useRef();
  d.current == null && (d.current = Wv({ window: c, v5Compat: !0 }));
  let m = d.current, [p, g] = A.useState({
    action: m.action,
    location: m.location
  }), v = A.useCallback(
    (h) => {
      r === !1 ? g(h) : A.startTransition(() => g(h));
    },
    [r]
  );
  return A.useLayoutEffect(() => m.listen(v), [m, v]), /* @__PURE__ */ A.createElement(
    Gy,
    {
      basename: i,
      children: s,
      location: p.location,
      navigationType: p.action,
      navigator: m,
      unstable_useTransitions: r === !0
    }
  );
}
var Pm = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, oi = A.forwardRef(
  function({
    onClick: s,
    discover: r = "render",
    prefetch: c = "none",
    relative: d,
    reloadDocument: m,
    replace: p,
    state: g,
    target: v,
    to: h,
    preventScrollReset: x,
    viewTransition: z,
    ...w
  }, Y) {
    let { basename: L, unstable_useTransitions: B } = A.useContext(Nt), H = typeof h == "string" && Pm.test(h), G, $ = !1;
    if (typeof h == "string" && H && (G = h, Fm))
      try {
        let We = new URL(window.location.href), Fe = h.startsWith("//") ? new URL(We.protocol + h) : new URL(h), Qe = nl(Fe.pathname, L);
        Fe.origin === We.origin && Qe != null ? h = Qe + Fe.search + Fe.hash : $ = !0;
      } catch {
        pt(
          !1,
          `<Link to="${h}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
        );
      }
    let q = Ty(h, { relative: d }), [ne, pe, Oe] = c1(
      c,
      w
    ), P = y1(h, {
      replace: p,
      state: g,
      target: v,
      preventScrollReset: x,
      relative: d,
      viewTransition: z,
      unstable_useTransitions: B
    });
    function qe(We) {
      s && s(We), We.defaultPrevented || P(We);
    }
    let Xe = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ A.createElement(
        "a",
        {
          ...w,
          ...Oe,
          href: G || q,
          onClick: $ || m ? s : qe,
          ref: o1(Y, pe),
          target: v,
          "data-discover": !H && r === "render" ? "true" : void 0
        }
      )
    );
    return ne && !H ? /* @__PURE__ */ A.createElement(A.Fragment, null, Xe, /* @__PURE__ */ A.createElement(f1, { page: q })) : Xe;
  }
);
oi.displayName = "Link";
var m1 = A.forwardRef(
  function({
    "aria-current": s = "page",
    caseSensitive: r = !1,
    className: c = "",
    end: d = !1,
    style: m,
    to: p,
    viewTransition: g,
    children: v,
    ...h
  }, x) {
    let z = Ln(p, { relative: h.relative }), w = ul(), Y = A.useContext(ri), { navigator: L, basename: B } = A.useContext(Nt), H = Y != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    E1(z) && g === !0, G = L.encodeLocation ? L.encodeLocation(z).pathname : z.pathname, $ = w.pathname, q = Y && Y.navigation && Y.navigation.location ? Y.navigation.location.pathname : null;
    r || ($ = $.toLowerCase(), q = q ? q.toLowerCase() : null, G = G.toLowerCase()), q && B && (q = nl(q, B) || q);
    const ne = G !== "/" && G.endsWith("/") ? G.length - 1 : G.length;
    let pe = $ === G || !d && $.startsWith(G) && $.charAt(ne) === "/", Oe = q != null && (q === G || !d && q.startsWith(G) && q.charAt(G.length) === "/"), P = {
      isActive: pe,
      isPending: Oe,
      isTransitioning: H
    }, qe = pe ? s : void 0, Xe;
    typeof c == "function" ? Xe = c(P) : Xe = [
      c,
      pe ? "active" : null,
      Oe ? "pending" : null,
      H ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let We = typeof m == "function" ? m(P) : m;
    return /* @__PURE__ */ A.createElement(
      oi,
      {
        ...h,
        "aria-current": qe,
        className: Xe,
        ref: x,
        style: We,
        to: p,
        viewTransition: g
      },
      typeof v == "function" ? v(P) : v
    );
  }
);
m1.displayName = "NavLink";
var h1 = A.forwardRef(
  ({
    discover: i = "render",
    fetcherKey: s,
    navigate: r,
    reloadDocument: c,
    replace: d,
    state: m,
    method: p = ii,
    action: g,
    onSubmit: v,
    relative: h,
    preventScrollReset: x,
    viewTransition: z,
    ...w
  }, Y) => {
    let { unstable_useTransitions: L } = A.useContext(Nt), B = b1(), H = S1(g, { relative: h }), G = p.toLowerCase() === "get" ? "get" : "post", $ = typeof g == "string" && Pm.test(g), q = (ne) => {
      if (v && v(ne), ne.defaultPrevented) return;
      ne.preventDefault();
      let pe = ne.nativeEvent.submitter, Oe = (pe == null ? void 0 : pe.getAttribute("formmethod")) || p, P = () => B(pe || ne.currentTarget, {
        fetcherKey: s,
        method: Oe,
        navigate: r,
        replace: d,
        state: m,
        relative: h,
        preventScrollReset: x,
        viewTransition: z
      });
      L && r !== !1 ? A.startTransition(() => P()) : P();
    };
    return /* @__PURE__ */ A.createElement(
      "form",
      {
        ref: Y,
        method: G,
        action: H,
        onSubmit: c ? v : q,
        ...w,
        "data-discover": !$ && i === "render" ? "true" : void 0
      }
    );
  }
);
h1.displayName = "Form";
function v1(i) {
  return `${i} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Im(i) {
  let s = A.useContext(Ba);
  return Ne(s, v1(i)), s;
}
function y1(i, {
  target: s,
  replace: r,
  state: c,
  preventScrollReset: d,
  relative: m,
  viewTransition: p,
  unstable_useTransitions: g
} = {}) {
  let v = cr(), h = ul(), x = Ln(i, { relative: m });
  return A.useCallback(
    (z) => {
      if (Jy(z, s)) {
        z.preventDefault();
        let w = r !== void 0 ? r : Hn(h) === Hn(x), Y = () => v(i, {
          replace: w,
          state: c,
          preventScrollReset: d,
          relative: m,
          viewTransition: p
        });
        g ? A.startTransition(() => Y()) : Y();
      }
    },
    [
      h,
      v,
      x,
      r,
      c,
      s,
      i,
      d,
      m,
      p,
      g
    ]
  );
}
function eh(i) {
  pt(
    typeof URLSearchParams < "u",
    "You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params."
  );
  let s = A.useRef(Zf(i)), r = A.useRef(!1), c = ul(), d = A.useMemo(
    () => (
      // Only merge in the defaults if we haven't yet called setSearchParams.
      // Once we call that we want those to take precedence, otherwise you can't
      // remove a param with setSearchParams({}) if it has an initial value
      $y(
        c.search,
        r.current ? null : s.current
      )
    ),
    [c.search]
  ), m = cr(), p = A.useCallback(
    (g, v) => {
      const h = Zf(
        typeof g == "function" ? g(new URLSearchParams(d)) : g
      );
      r.current = !0, m("?" + h, v);
    },
    [m, d]
  );
  return [d, p];
}
var p1 = 0, g1 = () => `__${String(++p1)}__`;
function b1() {
  let { router: i } = Im(
    "useSubmit"
    /* UseSubmit */
  ), { basename: s } = A.useContext(Nt), r = Hy(), c = i.fetch, d = i.navigate;
  return A.useCallback(
    async (m, p = {}) => {
      let { action: g, method: v, encType: h, formData: x, body: z } = Fy(
        m,
        s
      );
      if (p.navigate === !1) {
        let w = p.fetcherKey || g1();
        await c(w, r, p.action || g, {
          preventScrollReset: p.preventScrollReset,
          formData: x,
          body: z,
          formMethod: p.method || v,
          formEncType: p.encType || h,
          flushSync: p.flushSync
        });
      } else
        await d(p.action || g, {
          preventScrollReset: p.preventScrollReset,
          formData: x,
          body: z,
          formMethod: p.method || v,
          formEncType: p.encType || h,
          replace: p.replace,
          state: p.state,
          fromRouteId: r,
          flushSync: p.flushSync,
          viewTransition: p.viewTransition
        });
    },
    [c, d, s, r]
  );
}
function S1(i, { relative: s } = {}) {
  let { basename: r } = A.useContext(Nt), c = A.useContext(Ct);
  Ne(c, "useFormAction must be used inside a RouteContext");
  let [d] = c.matches.slice(-1), m = { ...Ln(i || ".", { relative: s }) }, p = ul();
  if (i == null) {
    m.search = p.search;
    let g = new URLSearchParams(m.search), v = g.getAll("index");
    if (v.some((x) => x === "")) {
      g.delete("index"), v.filter((z) => z).forEach((z) => g.append("index", z));
      let x = g.toString();
      m.search = x ? `?${x}` : "";
    }
  }
  return (!i || i === ".") && d.route.index && (m.search = m.search ? m.search.replace(/^\?/, "?index&") : "?index"), r !== "/" && (m.pathname = m.pathname === "/" ? r : al([r, m.pathname])), Hn(m);
}
function E1(i, { relative: s } = {}) {
  let r = A.useContext(Zm);
  Ne(
    r != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: c } = Im(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), d = Ln(i, { relative: s });
  if (!r.isTransitioning)
    return !1;
  let m = nl(r.currentLocation.pathname, c) || r.currentLocation.pathname, p = nl(r.nextLocation.pathname, c) || r.nextLocation.pathname;
  return fi(d.pathname, p) != null || fi(d.pathname, m) != null;
}
const wa = (i, s, r) => {
  console.log(`
`), console.log("| Endpoint:", i), console.log("| URL:", s), console.log("| Response:", r);
}, qn = "/api", th = "https://md-2622-accessmatch.pantheonsite.io", Dm = `${qn}/node/appverse_software?include=field_appverse_logo`, Cm = `${qn}/node/appverse_app?include=field_appverse_software_implemen`, x1 = (i) => `${qn}/node/appverse_software/${i}?include=field_appverse_logo`, z1 = (i) => `${qn}/node/appverse_app?filter[field_appverse_software_implemen.id]=${i}`, lh = (i) => `${qn}/file/file/${i}`;
async function T1() {
  try {
    const i = await fetch(Dm);
    if (!i.ok)
      throw new Error(`Failed to fetch software: ${i.statusText}`);
    const s = await i.json();
    wa("ALL_SOFTWARE_WITH_LOGOS", Dm, s);
    const r = s.data || [], c = s.included || [], d = {};
    for (const h of c)
      h.type === "media--svg" && (d[h.id] = h);
    const m = Object.keys(d).map(async (h) => {
      var w, Y, L, B, H, G;
      const z = (L = (Y = (w = d[h].relationships) == null ? void 0 : w.field_media_image_1) == null ? void 0 : Y.data) == null ? void 0 : L.id;
      if (!z) return null;
      try {
        const $ = lh(z), ne = await (await fetch($)).json();
        return wa("FILE_BY_ID", $, ne), {
          mediaId: h,
          fileUrl: ((G = (H = (B = ne.data) == null ? void 0 : B.attributes) == null ? void 0 : H.uri) == null ? void 0 : G.url) || null
        };
      } catch ($) {
        return console.error(`Failed to fetch file for media ${h}:`, $), null;
      }
    }), p = await Promise.all(m), g = {};
    for (const h of p)
      h && h.fileUrl && (g[h.mediaId] = `${th}${h.fileUrl}`);
    return r.map((h) => {
      var w, Y, L;
      const x = (L = (Y = (w = h.relationships) == null ? void 0 : w.field_appverse_logo) == null ? void 0 : Y.data) == null ? void 0 : L.id, z = x ? g[x] : null;
      return {
        ...h,
        logoUrl: z
        // Add resolved logo URL directly to software object
      };
    });
  } catch (i) {
    throw console.error("Error fetching software:", i), i;
  }
}
async function _1() {
  try {
    const i = await fetch(Cm);
    if (!i.ok)
      throw new Error(`Failed to fetch apps: ${i.statusText}`);
    const s = await i.json();
    return wa("ALL_APPS_WITH_SOFTWARE", Cm, s), s.data || [];
  } catch (i) {
    throw console.error("Error fetching apps:", i), i;
  }
}
async function Um(i) {
  var s, r, c, d, m, p, g, v, h;
  try {
    const x = x1(i), z = await fetch(x);
    if (!z.ok)
      throw new Error(`Failed to fetch software: ${z.statusText}`);
    const w = await z.json();
    wa("SOFTWARE_BY_ID_WITH_LOGO", x, w);
    const Y = w.data, L = w.included || [], B = (c = (r = (s = Y.relationships) == null ? void 0 : s.field_appverse_logo) == null ? void 0 : r.data) == null ? void 0 : c.id;
    let H = null;
    if (B) {
      const G = L.find((q) => q.id === B), $ = (p = (m = (d = G == null ? void 0 : G.relationships) == null ? void 0 : d.field_media_image_1) == null ? void 0 : m.data) == null ? void 0 : p.id;
      if ($)
        try {
          const q = lh($), pe = await (await fetch(q)).json();
          wa("FILE_BY_ID", q, pe);
          const Oe = (h = (v = (g = pe.data) == null ? void 0 : g.attributes) == null ? void 0 : v.uri) == null ? void 0 : h.url;
          Oe && (H = `${th}${Oe}`);
        } catch (q) {
          console.error("Failed to fetch logo file:", q);
        }
    }
    return {
      ...Y,
      logoUrl: H
    };
  } catch (x) {
    throw console.error("Error fetching software by ID:", x), x;
  }
}
async function wm(i) {
  try {
    const s = z1(i), r = await fetch(s);
    if (!r.ok)
      throw new Error(`Failed to fetch apps: ${r.statusText}`);
    const c = await r.json();
    return wa("APPS_BY_SOFTWARE_ID", s, c), c.data || [];
  } catch (s) {
    throw console.error("Error fetching apps by software:", s), s;
  }
}
function O1(i) {
  var r, c, d;
  const s = {};
  for (const m of i) {
    const p = (d = (c = (r = m.relationships) == null ? void 0 : r.field_appverse_software_implemen) == null ? void 0 : c.data) == null ? void 0 : d.id;
    p && (s[p] || (s[p] = []), s[p].push(m));
  }
  return s;
}
const ah = A.createContext(null);
function A1({ children: i }) {
  const [s, r] = A.useState({
    software: [],
    apps: [],
    appsBySoftwareId: {},
    loading: !0,
    error: null
  }), c = async () => {
    r((m) => ({ ...m, loading: !0, error: null }));
    try {
      const [m, p] = await Promise.all([
        T1(),
        _1()
      ]), g = O1(p);
      r({
        software: m,
        apps: p,
        appsBySoftwareId: g,
        loading: !1,
        error: null
      });
    } catch (m) {
      console.error("Failed to fetch AppVerse data:", m), r((p) => ({
        ...p,
        loading: !1,
        error: m
      }));
    }
  };
  A.useEffect(() => {
    c();
  }, []);
  const d = {
    ...s,
    refetch: c
    // Allow manual refetch if needed
  };
  return /* @__PURE__ */ R.jsx(ah.Provider, { value: d, children: i });
}
function N1() {
  const i = A.useContext(ah);
  if (!i)
    throw new Error("useAppverseData must be used within AppverseDataProvider");
  return i;
}
function nh({ message: i = "Loading..." }) {
  return /* @__PURE__ */ R.jsxs("div", { className: "flex flex-col items-center justify-center min-h-[400px] py-12", children: [
    /* @__PURE__ */ R.jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-4 border-appverse-gray border-t-appverse-red mb-4" }),
    /* @__PURE__ */ R.jsx("p", { className: "text-appverse-black text-lg font-sans", children: i })
  ] });
}
var qf = { exports: {} }, Yf, Hm;
function R1() {
  if (Hm) return Yf;
  Hm = 1;
  var i = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Yf = i, Yf;
}
var Gf, Bm;
function M1() {
  if (Bm) return Gf;
  Bm = 1;
  var i = /* @__PURE__ */ R1();
  function s() {
  }
  function r() {
  }
  return r.resetWarningCache = s, Gf = function() {
    function c(p, g, v, h, x, z) {
      if (z !== i) {
        var w = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw w.name = "Invariant Violation", w;
      }
    }
    c.isRequired = c;
    function d() {
      return c;
    }
    var m = {
      array: c,
      bigint: c,
      bool: c,
      func: c,
      number: c,
      object: c,
      string: c,
      symbol: c,
      any: c,
      arrayOf: d,
      element: c,
      elementType: c,
      instanceOf: d,
      node: c,
      objectOf: d,
      oneOf: d,
      oneOfType: d,
      shape: d,
      exact: d,
      checkPropTypes: r,
      resetWarningCache: s
    };
    return m.PropTypes = m, m;
  }, Gf;
}
var Lm;
function j1() {
  return Lm || (Lm = 1, qf.exports = /* @__PURE__ */ M1()()), qf.exports;
}
var D1 = /* @__PURE__ */ j1();
const Z = /* @__PURE__ */ qm(D1);
var C1 = ["color", "size", "title", "className"];
function Vf() {
  return Vf = Object.assign ? Object.assign.bind() : function(i) {
    for (var s = 1; s < arguments.length; s++) {
      var r = arguments[s];
      for (var c in r) ({}).hasOwnProperty.call(r, c) && (i[c] = r[c]);
    }
    return i;
  }, Vf.apply(null, arguments);
}
function U1(i, s) {
  if (i == null) return {};
  var r, c, d = w1(i, s);
  if (Object.getOwnPropertySymbols) {
    var m = Object.getOwnPropertySymbols(i);
    for (c = 0; c < m.length; c++) r = m[c], s.indexOf(r) === -1 && {}.propertyIsEnumerable.call(i, r) && (d[r] = i[r]);
  }
  return d;
}
function w1(i, s) {
  if (i == null) return {};
  var r = {};
  for (var c in i) if ({}.hasOwnProperty.call(i, c)) {
    if (s.indexOf(c) !== -1) continue;
    r[c] = i[c];
  }
  return r;
}
var uh = /* @__PURE__ */ A.forwardRef(function(i, s) {
  var r = i.color, c = r === void 0 ? "currentColor" : r, d = i.size, m = d === void 0 ? "1em" : d, p = i.title, g = p === void 0 ? null : p, v = i.className, h = v === void 0 ? "" : v, x = U1(i, C1);
  return /* @__PURE__ */ ae.createElement("svg", Vf({
    ref: s,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    width: m,
    height: m,
    fill: c,
    className: ["bi", "bi-book", h].filter(Boolean).join(" ")
  }, x), g ? /* @__PURE__ */ ae.createElement("title", null, g) : null, /* @__PURE__ */ ae.createElement("path", {
    d: "M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"
  }));
});
uh.propTypes = {
  color: Z.string,
  size: Z.oneOfType([Z.string, Z.number]),
  title: Z.string,
  className: Z.string
};
var H1 = ["color", "size", "title", "className"];
function Kf() {
  return Kf = Object.assign ? Object.assign.bind() : function(i) {
    for (var s = 1; s < arguments.length; s++) {
      var r = arguments[s];
      for (var c in r) ({}).hasOwnProperty.call(r, c) && (i[c] = r[c]);
    }
    return i;
  }, Kf.apply(null, arguments);
}
function B1(i, s) {
  if (i == null) return {};
  var r, c, d = L1(i, s);
  if (Object.getOwnPropertySymbols) {
    var m = Object.getOwnPropertySymbols(i);
    for (c = 0; c < m.length; c++) r = m[c], s.indexOf(r) === -1 && {}.propertyIsEnumerable.call(i, r) && (d[r] = i[r]);
  }
  return d;
}
function L1(i, s) {
  if (i == null) return {};
  var r = {};
  for (var c in i) if ({}.hasOwnProperty.call(i, c)) {
    if (s.indexOf(c) !== -1) continue;
    r[c] = i[c];
  }
  return r;
}
var ih = /* @__PURE__ */ A.forwardRef(function(i, s) {
  var r = i.color, c = r === void 0 ? "currentColor" : r, d = i.size, m = d === void 0 ? "1em" : d, p = i.title, g = p === void 0 ? null : p, v = i.className, h = v === void 0 ? "" : v, x = B1(i, H1);
  return /* @__PURE__ */ ae.createElement("svg", Kf({
    ref: s,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    width: m,
    height: m,
    fill: c,
    className: ["bi", "bi-calendar3", h].filter(Boolean).join(" ")
  }, x), g ? /* @__PURE__ */ ae.createElement("title", null, g) : null, /* @__PURE__ */ ae.createElement("path", {
    d: "M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z"
  }), /* @__PURE__ */ ae.createElement("path", {
    d: "M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
  }));
});
ih.propTypes = {
  color: Z.string,
  size: Z.oneOfType([Z.string, Z.number]),
  title: Z.string,
  className: Z.string
};
var q1 = ["color", "size", "title", "className"];
function Jf() {
  return Jf = Object.assign ? Object.assign.bind() : function(i) {
    for (var s = 1; s < arguments.length; s++) {
      var r = arguments[s];
      for (var c in r) ({}).hasOwnProperty.call(r, c) && (i[c] = r[c]);
    }
    return i;
  }, Jf.apply(null, arguments);
}
function Y1(i, s) {
  if (i == null) return {};
  var r, c, d = G1(i, s);
  if (Object.getOwnPropertySymbols) {
    var m = Object.getOwnPropertySymbols(i);
    for (c = 0; c < m.length; c++) r = m[c], s.indexOf(r) === -1 && {}.propertyIsEnumerable.call(i, r) && (d[r] = i[r]);
  }
  return d;
}
function G1(i, s) {
  if (i == null) return {};
  var r = {};
  for (var c in i) if ({}.hasOwnProperty.call(i, c)) {
    if (s.indexOf(c) !== -1) continue;
    r[c] = i[c];
  }
  return r;
}
var dr = /* @__PURE__ */ A.forwardRef(function(i, s) {
  var r = i.color, c = r === void 0 ? "currentColor" : r, d = i.size, m = d === void 0 ? "1em" : d, p = i.title, g = p === void 0 ? null : p, v = i.className, h = v === void 0 ? "" : v, x = Y1(i, q1);
  return /* @__PURE__ */ ae.createElement("svg", Jf({
    ref: s,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    width: m,
    height: m,
    fill: c,
    className: ["bi", "bi-chevron-down", h].filter(Boolean).join(" ")
  }, x), g ? /* @__PURE__ */ ae.createElement("title", null, g) : null, /* @__PURE__ */ ae.createElement("path", {
    fillRule: "evenodd",
    d: "M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
  }));
});
dr.propTypes = {
  color: Z.string,
  size: Z.oneOfType([Z.string, Z.number]),
  title: Z.string,
  className: Z.string
};
var X1 = ["color", "size", "title", "className"];
function $f() {
  return $f = Object.assign ? Object.assign.bind() : function(i) {
    for (var s = 1; s < arguments.length; s++) {
      var r = arguments[s];
      for (var c in r) ({}).hasOwnProperty.call(r, c) && (i[c] = r[c]);
    }
    return i;
  }, $f.apply(null, arguments);
}
function Q1(i, s) {
  if (i == null) return {};
  var r, c, d = Z1(i, s);
  if (Object.getOwnPropertySymbols) {
    var m = Object.getOwnPropertySymbols(i);
    for (c = 0; c < m.length; c++) r = m[c], s.indexOf(r) === -1 && {}.propertyIsEnumerable.call(i, r) && (d[r] = i[r]);
  }
  return d;
}
function Z1(i, s) {
  if (i == null) return {};
  var r = {};
  for (var c in i) if ({}.hasOwnProperty.call(i, c)) {
    if (s.indexOf(c) !== -1) continue;
    r[c] = i[c];
  }
  return r;
}
var mr = /* @__PURE__ */ A.forwardRef(function(i, s) {
  var r = i.color, c = r === void 0 ? "currentColor" : r, d = i.size, m = d === void 0 ? "1em" : d, p = i.title, g = p === void 0 ? null : p, v = i.className, h = v === void 0 ? "" : v, x = Q1(i, X1);
  return /* @__PURE__ */ ae.createElement("svg", $f({
    ref: s,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    width: m,
    height: m,
    fill: c,
    className: ["bi", "bi-chevron-left", h].filter(Boolean).join(" ")
  }, x), g ? /* @__PURE__ */ ae.createElement("title", null, g) : null, /* @__PURE__ */ ae.createElement("path", {
    fillRule: "evenodd",
    d: "M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
  }));
});
mr.propTypes = {
  color: Z.string,
  size: Z.oneOfType([Z.string, Z.number]),
  title: Z.string,
  className: Z.string
};
var V1 = ["color", "size", "title", "className"];
function Wf() {
  return Wf = Object.assign ? Object.assign.bind() : function(i) {
    for (var s = 1; s < arguments.length; s++) {
      var r = arguments[s];
      for (var c in r) ({}).hasOwnProperty.call(r, c) && (i[c] = r[c]);
    }
    return i;
  }, Wf.apply(null, arguments);
}
function K1(i, s) {
  if (i == null) return {};
  var r, c, d = J1(i, s);
  if (Object.getOwnPropertySymbols) {
    var m = Object.getOwnPropertySymbols(i);
    for (c = 0; c < m.length; c++) r = m[c], s.indexOf(r) === -1 && {}.propertyIsEnumerable.call(i, r) && (d[r] = i[r]);
  }
  return d;
}
function J1(i, s) {
  if (i == null) return {};
  var r = {};
  for (var c in i) if ({}.hasOwnProperty.call(i, c)) {
    if (s.indexOf(c) !== -1) continue;
    r[c] = i[c];
  }
  return r;
}
var ch = /* @__PURE__ */ A.forwardRef(function(i, s) {
  var r = i.color, c = r === void 0 ? "currentColor" : r, d = i.size, m = d === void 0 ? "1em" : d, p = i.title, g = p === void 0 ? null : p, v = i.className, h = v === void 0 ? "" : v, x = K1(i, V1);
  return /* @__PURE__ */ ae.createElement("svg", Wf({
    ref: s,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    width: m,
    height: m,
    fill: c,
    className: ["bi", "bi-chevron-right", h].filter(Boolean).join(" ")
  }, x), g ? /* @__PURE__ */ ae.createElement("title", null, g) : null, /* @__PURE__ */ ae.createElement("path", {
    fillRule: "evenodd",
    d: "M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
  }));
});
ch.propTypes = {
  color: Z.string,
  size: Z.oneOfType([Z.string, Z.number]),
  title: Z.string,
  className: Z.string
};
var $1 = ["color", "size", "title", "className"];
function kf() {
  return kf = Object.assign ? Object.assign.bind() : function(i) {
    for (var s = 1; s < arguments.length; s++) {
      var r = arguments[s];
      for (var c in r) ({}).hasOwnProperty.call(r, c) && (i[c] = r[c]);
    }
    return i;
  }, kf.apply(null, arguments);
}
function W1(i, s) {
  if (i == null) return {};
  var r, c, d = k1(i, s);
  if (Object.getOwnPropertySymbols) {
    var m = Object.getOwnPropertySymbols(i);
    for (c = 0; c < m.length; c++) r = m[c], s.indexOf(r) === -1 && {}.propertyIsEnumerable.call(i, r) && (d[r] = i[r]);
  }
  return d;
}
function k1(i, s) {
  if (i == null) return {};
  var r = {};
  for (var c in i) if ({}.hasOwnProperty.call(i, c)) {
    if (s.indexOf(c) !== -1) continue;
    r[c] = i[c];
  }
  return r;
}
var fh = /* @__PURE__ */ A.forwardRef(function(i, s) {
  var r = i.color, c = r === void 0 ? "currentColor" : r, d = i.size, m = d === void 0 ? "1em" : d, p = i.title, g = p === void 0 ? null : p, v = i.className, h = v === void 0 ? "" : v, x = W1(i, $1);
  return /* @__PURE__ */ ae.createElement("svg", kf({
    ref: s,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    width: m,
    height: m,
    fill: c,
    className: ["bi", "bi-chevron-up", h].filter(Boolean).join(" ")
  }, x), g ? /* @__PURE__ */ ae.createElement("title", null, g) : null, /* @__PURE__ */ ae.createElement("path", {
    fillRule: "evenodd",
    d: "M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"
  }));
});
fh.propTypes = {
  color: Z.string,
  size: Z.oneOfType([Z.string, Z.number]),
  title: Z.string,
  className: Z.string
};
var F1 = ["color", "size", "title", "className"];
function Ff() {
  return Ff = Object.assign ? Object.assign.bind() : function(i) {
    for (var s = 1; s < arguments.length; s++) {
      var r = arguments[s];
      for (var c in r) ({}).hasOwnProperty.call(r, c) && (i[c] = r[c]);
    }
    return i;
  }, Ff.apply(null, arguments);
}
function P1(i, s) {
  if (i == null) return {};
  var r, c, d = I1(i, s);
  if (Object.getOwnPropertySymbols) {
    var m = Object.getOwnPropertySymbols(i);
    for (c = 0; c < m.length; c++) r = m[c], s.indexOf(r) === -1 && {}.propertyIsEnumerable.call(i, r) && (d[r] = i[r]);
  }
  return d;
}
function I1(i, s) {
  if (i == null) return {};
  var r = {};
  for (var c in i) if ({}.hasOwnProperty.call(i, c)) {
    if (s.indexOf(c) !== -1) continue;
    r[c] = i[c];
  }
  return r;
}
var rh = /* @__PURE__ */ A.forwardRef(function(i, s) {
  var r = i.color, c = r === void 0 ? "currentColor" : r, d = i.size, m = d === void 0 ? "1em" : d, p = i.title, g = p === void 0 ? null : p, v = i.className, h = v === void 0 ? "" : v, x = P1(i, F1);
  return /* @__PURE__ */ ae.createElement("svg", Ff({
    ref: s,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    width: m,
    height: m,
    fill: c,
    className: ["bi", "bi-emoji-neutral", h].filter(Boolean).join(" ")
  }, x), g ? /* @__PURE__ */ ae.createElement("title", null, g) : null, /* @__PURE__ */ ae.createElement("path", {
    d: "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"
  }), /* @__PURE__ */ ae.createElement("path", {
    d: "M4 10.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5m3-4C7 5.672 6.552 5 6 5s-1 .672-1 1.5S5.448 8 6 8s1-.672 1-1.5m4 0c0-.828-.448-1.5-1-1.5s-1 .672-1 1.5S9.448 8 10 8s1-.672 1-1.5"
  }));
});
rh.propTypes = {
  color: Z.string,
  size: Z.oneOfType([Z.string, Z.number]),
  title: Z.string,
  className: Z.string
};
var ep = ["color", "size", "title", "className"];
function Pf() {
  return Pf = Object.assign ? Object.assign.bind() : function(i) {
    for (var s = 1; s < arguments.length; s++) {
      var r = arguments[s];
      for (var c in r) ({}).hasOwnProperty.call(r, c) && (i[c] = r[c]);
    }
    return i;
  }, Pf.apply(null, arguments);
}
function tp(i, s) {
  if (i == null) return {};
  var r, c, d = lp(i, s);
  if (Object.getOwnPropertySymbols) {
    var m = Object.getOwnPropertySymbols(i);
    for (c = 0; c < m.length; c++) r = m[c], s.indexOf(r) === -1 && {}.propertyIsEnumerable.call(i, r) && (d[r] = i[r]);
  }
  return d;
}
function lp(i, s) {
  if (i == null) return {};
  var r = {};
  for (var c in i) if ({}.hasOwnProperty.call(i, c)) {
    if (s.indexOf(c) !== -1) continue;
    r[c] = i[c];
  }
  return r;
}
var sh = /* @__PURE__ */ A.forwardRef(function(i, s) {
  var r = i.color, c = r === void 0 ? "currentColor" : r, d = i.size, m = d === void 0 ? "1em" : d, p = i.title, g = p === void 0 ? null : p, v = i.className, h = v === void 0 ? "" : v, x = tp(i, ep);
  return /* @__PURE__ */ ae.createElement("svg", Pf({
    ref: s,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    width: m,
    height: m,
    fill: c,
    className: ["bi", "bi-exclamation-circle", h].filter(Boolean).join(" ")
  }, x), g ? /* @__PURE__ */ ae.createElement("title", null, g) : null, /* @__PURE__ */ ae.createElement("path", {
    d: "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"
  }), /* @__PURE__ */ ae.createElement("path", {
    d: "M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"
  }));
});
sh.propTypes = {
  color: Z.string,
  size: Z.oneOfType([Z.string, Z.number]),
  title: Z.string,
  className: Z.string
};
var ap = ["color", "size", "title", "className"];
function If() {
  return If = Object.assign ? Object.assign.bind() : function(i) {
    for (var s = 1; s < arguments.length; s++) {
      var r = arguments[s];
      for (var c in r) ({}).hasOwnProperty.call(r, c) && (i[c] = r[c]);
    }
    return i;
  }, If.apply(null, arguments);
}
function np(i, s) {
  if (i == null) return {};
  var r, c, d = up(i, s);
  if (Object.getOwnPropertySymbols) {
    var m = Object.getOwnPropertySymbols(i);
    for (c = 0; c < m.length; c++) r = m[c], s.indexOf(r) === -1 && {}.propertyIsEnumerable.call(i, r) && (d[r] = i[r]);
  }
  return d;
}
function up(i, s) {
  if (i == null) return {};
  var r = {};
  for (var c in i) if ({}.hasOwnProperty.call(i, c)) {
    if (s.indexOf(c) !== -1) continue;
    r[c] = i[c];
  }
  return r;
}
var oh = /* @__PURE__ */ A.forwardRef(function(i, s) {
  var r = i.color, c = r === void 0 ? "currentColor" : r, d = i.size, m = d === void 0 ? "1em" : d, p = i.title, g = p === void 0 ? null : p, v = i.className, h = v === void 0 ? "" : v, x = np(i, ap);
  return /* @__PURE__ */ ae.createElement("svg", If({
    ref: s,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    width: m,
    height: m,
    fill: c,
    className: ["bi", "bi-file-text", h].filter(Boolean).join(" ")
  }, x), g ? /* @__PURE__ */ ae.createElement("title", null, g) : null, /* @__PURE__ */ ae.createElement("path", {
    d: "M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5M5 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1z"
  }), /* @__PURE__ */ ae.createElement("path", {
    d: "M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1"
  }));
});
oh.propTypes = {
  color: Z.string,
  size: Z.oneOfType([Z.string, Z.number]),
  title: Z.string,
  className: Z.string
};
var ip = ["color", "size", "title", "className"];
function er() {
  return er = Object.assign ? Object.assign.bind() : function(i) {
    for (var s = 1; s < arguments.length; s++) {
      var r = arguments[s];
      for (var c in r) ({}).hasOwnProperty.call(r, c) && (i[c] = r[c]);
    }
    return i;
  }, er.apply(null, arguments);
}
function cp(i, s) {
  if (i == null) return {};
  var r, c, d = fp(i, s);
  if (Object.getOwnPropertySymbols) {
    var m = Object.getOwnPropertySymbols(i);
    for (c = 0; c < m.length; c++) r = m[c], s.indexOf(r) === -1 && {}.propertyIsEnumerable.call(i, r) && (d[r] = i[r]);
  }
  return d;
}
function fp(i, s) {
  if (i == null) return {};
  var r = {};
  for (var c in i) if ({}.hasOwnProperty.call(i, c)) {
    if (s.indexOf(c) !== -1) continue;
    r[c] = i[c];
  }
  return r;
}
var dh = /* @__PURE__ */ A.forwardRef(function(i, s) {
  var r = i.color, c = r === void 0 ? "currentColor" : r, d = i.size, m = d === void 0 ? "1em" : d, p = i.title, g = p === void 0 ? null : p, v = i.className, h = v === void 0 ? "" : v, x = cp(i, ip);
  return /* @__PURE__ */ ae.createElement("svg", er({
    ref: s,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    width: m,
    height: m,
    fill: c,
    className: ["bi", "bi-github", h].filter(Boolean).join(" ")
  }, x), g ? /* @__PURE__ */ ae.createElement("title", null, g) : null, /* @__PURE__ */ ae.createElement("path", {
    d: "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"
  }));
});
dh.propTypes = {
  color: Z.string,
  size: Z.oneOfType([Z.string, Z.number]),
  title: Z.string,
  className: Z.string
};
var rp = ["color", "size", "title", "className"];
function tr() {
  return tr = Object.assign ? Object.assign.bind() : function(i) {
    for (var s = 1; s < arguments.length; s++) {
      var r = arguments[s];
      for (var c in r) ({}).hasOwnProperty.call(r, c) && (i[c] = r[c]);
    }
    return i;
  }, tr.apply(null, arguments);
}
function sp(i, s) {
  if (i == null) return {};
  var r, c, d = op(i, s);
  if (Object.getOwnPropertySymbols) {
    var m = Object.getOwnPropertySymbols(i);
    for (c = 0; c < m.length; c++) r = m[c], s.indexOf(r) === -1 && {}.propertyIsEnumerable.call(i, r) && (d[r] = i[r]);
  }
  return d;
}
function op(i, s) {
  if (i == null) return {};
  var r = {};
  for (var c in i) if ({}.hasOwnProperty.call(i, c)) {
    if (s.indexOf(c) !== -1) continue;
    r[c] = i[c];
  }
  return r;
}
var mh = /* @__PURE__ */ A.forwardRef(function(i, s) {
  var r = i.color, c = r === void 0 ? "currentColor" : r, d = i.size, m = d === void 0 ? "1em" : d, p = i.title, g = p === void 0 ? null : p, v = i.className, h = v === void 0 ? "" : v, x = sp(i, rp);
  return /* @__PURE__ */ ae.createElement("svg", tr({
    ref: s,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    width: m,
    height: m,
    fill: c,
    className: ["bi", "bi-globe", h].filter(Boolean).join(" ")
  }, x), g ? /* @__PURE__ */ ae.createElement("title", null, g) : null, /* @__PURE__ */ ae.createElement("path", {
    d: "M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z"
  }));
});
mh.propTypes = {
  color: Z.string,
  size: Z.oneOfType([Z.string, Z.number]),
  title: Z.string,
  className: Z.string
};
var dp = ["color", "size", "title", "className"];
function lr() {
  return lr = Object.assign ? Object.assign.bind() : function(i) {
    for (var s = 1; s < arguments.length; s++) {
      var r = arguments[s];
      for (var c in r) ({}).hasOwnProperty.call(r, c) && (i[c] = r[c]);
    }
    return i;
  }, lr.apply(null, arguments);
}
function mp(i, s) {
  if (i == null) return {};
  var r, c, d = hp(i, s);
  if (Object.getOwnPropertySymbols) {
    var m = Object.getOwnPropertySymbols(i);
    for (c = 0; c < m.length; c++) r = m[c], s.indexOf(r) === -1 && {}.propertyIsEnumerable.call(i, r) && (d[r] = i[r]);
  }
  return d;
}
function hp(i, s) {
  if (i == null) return {};
  var r = {};
  for (var c in i) if ({}.hasOwnProperty.call(i, c)) {
    if (s.indexOf(c) !== -1) continue;
    r[c] = i[c];
  }
  return r;
}
var hh = /* @__PURE__ */ A.forwardRef(function(i, s) {
  var r = i.color, c = r === void 0 ? "currentColor" : r, d = i.size, m = d === void 0 ? "1em" : d, p = i.title, g = p === void 0 ? null : p, v = i.className, h = v === void 0 ? "" : v, x = mp(i, dp);
  return /* @__PURE__ */ ae.createElement("svg", lr({
    ref: s,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    width: m,
    height: m,
    fill: c,
    className: ["bi", "bi-search", h].filter(Boolean).join(" ")
  }, x), g ? /* @__PURE__ */ ae.createElement("title", null, g) : null, /* @__PURE__ */ ae.createElement("path", {
    d: "M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
  }));
});
hh.propTypes = {
  color: Z.string,
  size: Z.oneOfType([Z.string, Z.number]),
  title: Z.string,
  className: Z.string
};
function vh({ error: i, onRetry: s }) {
  return /* @__PURE__ */ R.jsxs("div", { className: "flex flex-col items-center justify-center min-h-[400px] py-12 px-4", children: [
    /* @__PURE__ */ R.jsx("div", { className: "w-16 h-16 rounded-full bg-appverse-pink flex items-center justify-center mb-4", children: /* @__PURE__ */ R.jsx(sh, { className: "w-8 h-8 text-appverse-red" }) }),
    /* @__PURE__ */ R.jsx("h2", { className: "text-2xl font-serif text-appverse-black mb-2", children: "Unable to Load Data" }),
    /* @__PURE__ */ R.jsx("p", { className: "text-appverse-black text-center max-w-md mb-6", children: (i == null ? void 0 : i.message) || "An unexpected error occurred. Please try again." }),
    s && /* @__PURE__ */ R.jsx(
      "button",
      {
        onClick: s,
        className: "px-6 py-2 bg-appverse-red text-white rounded-appverse font-sans font-semibold hover:opacity-90 transition-opacity",
        children: "Try Again"
      }
    )
  ] });
}
function vp({
  value: i,
  onChange: s,
  placeholder: r = "Search software..."
}) {
  return /* @__PURE__ */ R.jsxs("div", { className: "relative w-full max-w-2xl", children: [
    /* @__PURE__ */ R.jsx(
      "input",
      {
        type: "text",
        value: i,
        onChange: (c) => s(c.target.value),
        placeholder: r,
        className: "w-full pl-4 pr-12 py-2 border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 hover:border-gray-400 focus:ring-0 transition-colors"
      }
    ),
    /* @__PURE__ */ R.jsx("div", { className: "absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none", children: /* @__PURE__ */ R.jsx(hh, { className: "h-4 w-4 text-gray-600" }) })
  ] });
}
function yp({ filters: i, onFilterChange: s }) {
  const [r, c] = A.useState({ type: !0 }), d = [
    {
      title: "Type",
      key: "type",
      options: [
        { label: "All", value: "all" },
        { label: "Open Source", value: "open_source_software" },
        { label: "Licensed Software", value: "licensed_software" }
      ]
    }
  ], m = (g, v, h) => {
    if (v === "all") {
      const w = { ...i };
      delete w[g], s(w);
      return;
    }
    const x = i[g] || [], z = h ? [...x, v] : x.filter((w) => w !== v);
    s({
      ...i,
      [g]: z.length > 0 ? z : void 0
    });
  }, p = (g, v) => v === "all" ? !i[g] || i[g].length === 0 : (i[g] || []).includes(v);
  return /* @__PURE__ */ R.jsx("aside", { className: "w-64 pr-8 flex-shrink-0", children: /* @__PURE__ */ R.jsxs("div", { className: "sticky top-4", children: [
    d.map((g) => {
      const v = r[g.key];
      return /* @__PURE__ */ R.jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ R.jsxs(
          "button",
          {
            onClick: () => c({
              ...r,
              [g.key]: !v
            }),
            className: "w-full flex items-center justify-between bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 transition-colors",
            children: [
              /* @__PURE__ */ R.jsx("h3", { className: "text-base font-serif font-bold text-gray-900", children: g.title }),
              /* @__PURE__ */ R.jsx(
                dr,
                {
                  className: `w-4 h-4 text-gray-600 transition-transform ${v ? "rotate-180" : ""}`
                }
              )
            ]
          }
        ),
        v && /* @__PURE__ */ R.jsx("div", { className: "mt-3 space-y-2 px-2", children: g.options.map((h) => {
          const x = p(g.key, h.value);
          return /* @__PURE__ */ R.jsxs(
            "label",
            {
              className: "flex items-center cursor-pointer group",
              children: [
                /* @__PURE__ */ R.jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: x,
                    onChange: (z) => m(
                      g.key,
                      h.value,
                      z.target.checked
                    ),
                    className: "w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  }
                ),
                /* @__PURE__ */ R.jsx("span", { className: "ml-3 text-sm font-sans text-gray-900", children: h.label })
              ]
            },
            h.value
          );
        }) })
      ] }, g.key);
    }),
    Object.keys(i).some((g) => {
      var v;
      return ((v = i[g]) == null ? void 0 : v.length) > 0;
    }) && /* @__PURE__ */ R.jsx(
      "button",
      {
        onClick: () => s({}),
        className: "w-full mt-4 px-4 py-2 text-sm font-sans font-semibold text-appverse-red border-2 border-appverse-red rounded-appverse hover:bg-appverse-pink transition-colors",
        children: "Clear All Filters"
      }
    )
  ] }) });
}
function pp({ software: i, appCount: s = 0 }) {
  var p, g;
  const r = ((p = i.attributes) == null ? void 0 : p.title) || "Untitled Software", c = i.logoUrl;
  (g = i.attributes) == null || g.field_appverse_software_type;
  const d = s === 1 ? "1 repo" : `${s} repos`, m = (v) => {
    console.error(`Failed to load logo for ${r}:`, c);
  };
  return /* @__PURE__ */ R.jsx(
    oi,
    {
      to: `/appverse/software/${i.id}`,
      className: "block group",
      children: /* @__PURE__ */ R.jsxs("div", { className: "flex flex-col items-center gap-4 border-appverse-black border-2 rounded-lg p-6 bg-white h-[199px] min-w-[199px] hover:border-red-500 transition-all duration-200", children: [
        /* @__PURE__ */ R.jsx("div", { className: "h-[60px] w-full flex items-center justify-center", children: c ? /* @__PURE__ */ R.jsx(
          "img",
          {
            src: c,
            alt: `${r} logo`,
            className: "max-h-[60px] max-w-full object-contain",
            onError: m
          }
        ) : (
          // Placeholder if no logo
          /* @__PURE__ */ R.jsx("div", { className: "w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center", children: /* @__PURE__ */ R.jsx("span", { className: "text-4xl font-bold text-gray-600", children: r.charAt(0).toUpperCase() }) })
        ) }),
        /* @__PURE__ */ R.jsx("h3", { className: "text-xl font-semibold text-center text-gray-900 line-clamp-2", children: r }),
        /* @__PURE__ */ R.jsx("div", { className: "mt-auto", children: /* @__PURE__ */ R.jsxs("span", { className: "inline-flex items-center gap-1.5 text-base font-medium", children: [
          /* @__PURE__ */ R.jsx("span", { className: "relative inline-flex items-center justify-center w-5 h-5 bg-appverse-blue rounded-full", children: /* @__PURE__ */ R.jsx("span", { className: "text-[10px] font-bold text-white leading-none", children: s }) }),
          /* @__PURE__ */ R.jsx("span", { className: "text-appverse-black", children: d })
        ] }) })
      ] })
    }
  );
}
function gp({ software: i, appsBySoftwareId: s }) {
  return !i || i.length === 0 ? /* @__PURE__ */ R.jsxs("div", { className: "flex flex-col items-center justify-center py-16", children: [
    /* @__PURE__ */ R.jsx("div", { className: "w-20 h-20 rounded-full bg-appverse-gray flex items-center justify-center mb-4", children: /* @__PURE__ */ R.jsx(rh, { className: "w-10 h-10 text-gray-400" }) }),
    /* @__PURE__ */ R.jsx("h3", { className: "text-xl font-serif font-bold text-appverse-black mb-2", children: "No Software Found" }),
    /* @__PURE__ */ R.jsx("p", { className: "text-gray-600 font-sans text-center max-w-md", children: "No software matches your current filters. Try adjusting your search or clearing filters." })
  ] }) : /* @__PURE__ */ R.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: i.map((r) => {
    const c = (s[r.id] || []).length;
    return /* @__PURE__ */ R.jsx(
      pp,
      {
        software: r,
        appCount: c
      },
      r.id
    );
  }) });
}
function bp() {
  const { software: i, appsBySoftwareId: s, loading: r, error: c, refetch: d } = N1(), [m, p] = eh(), [g, v] = A.useState(
    m.get("search") || ""
  ), [h, x] = A.useState(!0), z = A.useMemo(() => {
    const B = {};
    for (const [H, G] of m.entries())
      H !== "search" && (B[H] ? B[H].push(G) : B[H] = [G]);
    return B;
  }, [m]), w = (B) => {
    v(B);
    const H = new URLSearchParams(m);
    B ? H.set("search", B) : H.delete("search"), p(H);
  }, Y = (B) => {
    const H = new URLSearchParams();
    g && H.set("search", g), Object.entries(B).forEach(([G, $]) => {
      Array.isArray($) && $.length > 0 && $.forEach((q) => {
        H.append(G, q);
      });
    }), p(H);
  }, L = A.useMemo(() => {
    if (!i) return [];
    let B = [...i];
    if (g) {
      const H = g.toLowerCase();
      B = B.filter(
        (G) => {
          var $, q;
          return (q = ($ = G.attributes) == null ? void 0 : $.title) == null ? void 0 : q.toLowerCase().includes(H);
        }
      );
    }
    return z.type && z.type.length > 0 && (B = B.filter(
      (H) => {
        var G;
        return z.type.includes((G = H.attributes) == null ? void 0 : G.field_appverse_software_type);
      }
    )), B;
  }, [i, g, z]);
  return r ? /* @__PURE__ */ R.jsx(nh, { message: "Loading software..." }) : c ? /* @__PURE__ */ R.jsx(vh, { error: c, onRetry: d }) : /* @__PURE__ */ R.jsxs("div", { className: "min-h-screen bg-white", children: [
    /* @__PURE__ */ R.jsx("div", { className: "mx-6 my-6 bg-appverse-black px-6 py-3", children: /* @__PURE__ */ R.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ R.jsxs(
        "button",
        {
          onClick: () => x(!h),
          className: "flex items-center gap-2 text-white font-sans font-medium hover:opacity-80 transition-opacity",
          children: [
            h ? /* @__PURE__ */ R.jsx(mr, { className: "w-4 h-4" }) : /* @__PURE__ */ R.jsx(ch, { className: "w-4 h-4" }),
            h ? "Hide Filters" : "Show Filters"
          ]
        }
      ),
      /* @__PURE__ */ R.jsx("div", { className: "w-80", children: /* @__PURE__ */ R.jsx(
        vp,
        {
          value: g,
          onChange: w,
          placeholder: "Search for apps"
        }
      ) })
    ] }) }),
    /* @__PURE__ */ R.jsx("div", { className: "mx-6 mb-6", children: /* @__PURE__ */ R.jsxs("div", { className: "flex gap-8", children: [
      h && /* @__PURE__ */ R.jsx(
        yp,
        {
          filters: z,
          onFilterChange: Y
        }
      ),
      /* @__PURE__ */ R.jsx("main", { className: "flex-1 min-w-0", children: /* @__PURE__ */ R.jsx(
        gp,
        {
          software: L,
          appsBySoftwareId: s
        }
      ) })
    ] }) })
  ] });
}
function Sp({ software: i }) {
  var g, v, h, x, z, w, Y, L, B, H;
  const s = ((g = i.attributes) == null ? void 0 : g.title) || "Untitled Software", r = ((h = (v = i.attributes) == null ? void 0 : v.body) == null ? void 0 : h.processed) || ((z = (x = i.attributes) == null ? void 0 : x.body) == null ? void 0 : z.value) || "", c = i.logoUrl, d = (Y = (w = i.attributes) == null ? void 0 : w.field_appverse_software_website) == null ? void 0 : Y.uri, m = (B = (L = i.attributes) == null ? void 0 : L.field_appverse_software_doc) == null ? void 0 : B.uri, p = (H = i.attributes) == null ? void 0 : H.field_appverse_software_type;
  return /* @__PURE__ */ R.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ R.jsxs(
      oi,
      {
        to: "/appverse/",
        className: "inline-flex items-center text-appverse-blue hover:text-appverse-red transition-colors mb-6 font-sans",
        children: [
          /* @__PURE__ */ R.jsx(mr, { className: "w-5 h-5 mr-2" }),
          "Back to Software Grid"
        ]
      }
    ),
    /* @__PURE__ */ R.jsx("div", { className: "flex items-center justify-center mb-4", children: c ? /* @__PURE__ */ R.jsx(
      "img",
      {
        src: c,
        alt: `${s} logo`,
        className: "w-32 h-32 object-contain"
      }
    ) : /* @__PURE__ */ R.jsx("div", { className: "w-32 h-32 rounded-appverse bg-appverse-gray flex items-center justify-center", children: /* @__PURE__ */ R.jsx("span", { className: "text-5xl font-serif font-bold text-white", children: s.charAt(0).toUpperCase() }) }) }),
    /* @__PURE__ */ R.jsx("h1", { className: "text-2xl font-serif font-bold text-appverse-black text-center mb-4", children: s }),
    /* @__PURE__ */ R.jsxs("div", { className: "flex flex-col gap-2 mb-4", children: [
      d && /* @__PURE__ */ R.jsxs(
        "a",
        {
          href: d,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "inline-flex items-center justify-center gap-2 text-appverse-blue hover:text-appverse-red transition-colors font-sans text-sm",
          children: [
            /* @__PURE__ */ R.jsx(mh, { className: "w-4 h-4" }),
            "WWW"
          ]
        }
      ),
      m && /* @__PURE__ */ R.jsxs(
        "a",
        {
          href: m,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "inline-flex items-center justify-center gap-2 text-appverse-blue hover:text-appverse-red transition-colors font-sans text-sm",
          children: [
            /* @__PURE__ */ R.jsx(uh, { className: "w-4 h-4" }),
            "DOCS"
          ]
        }
      ),
      p === "open_source_software" && /* @__PURE__ */ R.jsxs("div", { className: "inline-flex items-center justify-center gap-2 text-appverse-blue font-sans text-sm", children: [
        /* @__PURE__ */ R.jsx("span", { children: "📄" }),
        "OPEN-SOURCE"
      ] })
    ] }),
    r && /* @__PURE__ */ R.jsx(
      "div",
      {
        className: "text-sm font-sans text-gray-700 mb-4 prose prose-sm max-w-none",
        dangerouslySetInnerHTML: { __html: r }
      }
    )
  ] });
}
function Ep({ app: i, isExpanded: s, onToggle: r }) {
  var h, x, z, w, Y, L, B, H, G, $, q, ne;
  const c = ((h = i.attributes) == null ? void 0 : h.title) || "Untitled App", d = ((z = (x = i.attributes) == null ? void 0 : x.body) == null ? void 0 : z.processed) || ((Y = (w = i.attributes) == null ? void 0 : w.body) == null ? void 0 : Y.value) || "", m = (B = (L = i.attributes) == null ? void 0 : L.field_appverse_github_url) == null ? void 0 : B.uri, p = ((G = (H = i.attributes) == null ? void 0 : H.field_appverse_readme) == null ? void 0 : G.processed) || ((q = ($ = i.attributes) == null ? void 0 : $.field_appverse_readme) == null ? void 0 : q.value), g = (ne = i.attributes) == null ? void 0 : ne.field_appverse_lastupdated, v = g ? new Date(g).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }) : "Not available";
  return /* @__PURE__ */ R.jsxs("div", { className: "border-2 border-appverse-gray rounded-appverse overflow-hidden", children: [
    /* @__PURE__ */ R.jsx("div", { className: "p-6 bg-white", children: /* @__PURE__ */ R.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ R.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ R.jsx("h3", { className: "text-2xl font-serif font-bold text-appverse-black mb-2", children: c }),
        d && /* @__PURE__ */ R.jsx(
          "div",
          {
            className: "text-gray-700 font-sans mb-4 prose max-w-none",
            dangerouslySetInnerHTML: { __html: d }
          }
        ),
        /* @__PURE__ */ R.jsx("div", { className: "flex items-center gap-6 text-sm font-sans text-gray-600", children: g && /* @__PURE__ */ R.jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ R.jsx(ih, { className: "w-4 h-4 mr-1.5" }),
          "Last updated: ",
          v
        ] }) })
      ] }),
      /* @__PURE__ */ R.jsxs("div", { className: "flex gap-3 flex-shrink-0", children: [
        m && /* @__PURE__ */ R.jsxs(
          "a",
          {
            href: m,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "inline-flex items-center px-4 py-2 bg-appverse-black text-white font-sans font-semibold rounded-appverse hover:opacity-90 transition-opacity whitespace-nowrap",
            children: [
              /* @__PURE__ */ R.jsx(dh, { className: "w-5 h-5 mr-2" }),
              "View Repository"
            ]
          }
        ),
        p && /* @__PURE__ */ R.jsx(
          "button",
          {
            onClick: r,
            className: "inline-flex items-center px-4 py-2 border-2 border-appverse-red text-appverse-red font-sans font-semibold rounded-appverse hover:bg-appverse-pink transition-colors whitespace-nowrap",
            children: s ? /* @__PURE__ */ R.jsxs(R.Fragment, { children: [
              /* @__PURE__ */ R.jsx(fh, { className: "w-5 h-5 mr-2" }),
              "Hide README"
            ] }) : /* @__PURE__ */ R.jsxs(R.Fragment, { children: [
              /* @__PURE__ */ R.jsx(dr, { className: "w-5 h-5 mr-2" }),
              "Show README"
            ] })
          }
        )
      ] })
    ] }) }),
    s && p && /* @__PURE__ */ R.jsx("div", { className: "bg-white border-t-2 border-appverse-gray p-6", children: /* @__PURE__ */ R.jsx(
      "div",
      {
        className: "prose max-w-none font-sans",
        dangerouslySetInnerHTML: { __html: p }
      }
    ) })
  ] });
}
function xp({ apps: i, expandedAppId: s, onToggleApp: r }) {
  return !i || i.length === 0 ? /* @__PURE__ */ R.jsxs("div", { className: "flex flex-col items-center justify-center py-16", children: [
    /* @__PURE__ */ R.jsx("div", { className: "w-20 h-20 rounded-full bg-appverse-gray flex items-center justify-center mb-4", children: /* @__PURE__ */ R.jsx(oh, { className: "w-10 h-10 text-gray-400" }) }),
    /* @__PURE__ */ R.jsx("h3", { className: "text-xl font-serif font-bold text-appverse-black mb-2", children: "No Apps Found" }),
    /* @__PURE__ */ R.jsx("p", { className: "text-gray-600 font-sans text-center max-w-md", children: "There are no applications implementing this software yet." })
  ] }) : /* @__PURE__ */ R.jsxs("div", { children: [
    /* @__PURE__ */ R.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ R.jsx("h2", { className: "text-2xl font-serif font-bold text-appverse-black", children: "Applications" }),
      /* @__PURE__ */ R.jsxs("span", { className: "text-sm font-sans text-gray-600", children: [
        i.length,
        " ",
        i.length === 1 ? "app" : "apps"
      ] })
    ] }),
    /* @__PURE__ */ R.jsx("div", { className: "space-y-4", children: i.map((c) => /* @__PURE__ */ R.jsx(
      Ep,
      {
        app: c,
        isExpanded: s === c.id,
        onToggle: () => r(c.id)
      },
      c.id
    )) })
  ] });
}
function zp() {
  const { id: i } = Oy(), [s, r] = eh(), [c, d] = A.useState(null), [m, p] = A.useState([]), [g, v] = A.useState(!0), [h, x] = A.useState(null), z = s.get("app");
  A.useEffect(() => {
    async function L() {
      v(!0), x(null);
      try {
        const [B, H] = await Promise.all([
          Um(i),
          wm(i)
        ]);
        d(B), p(H);
      } catch (B) {
        console.error("Failed to fetch software detail:", B), x(B);
      } finally {
        v(!1);
      }
    }
    i && L();
  }, [i]);
  const w = (L) => {
    const B = new URLSearchParams(s);
    z === L ? B.delete("app") : B.set("app", L), r(B);
  }, Y = () => {
    d(null), p([]), v(!0), x(null), Um(i).then((L) => d(L)).catch((L) => x(L)).finally(() => v(!1)), wm(i).then((L) => p(L)).catch((L) => console.error("Failed to fetch apps:", L));
  };
  return g ? /* @__PURE__ */ R.jsx(nh, { message: "Loading software details..." }) : h ? /* @__PURE__ */ R.jsx(vh, { error: h, onRetry: Y }) : c ? /* @__PURE__ */ R.jsx("div", { className: "min-h-screen bg-white", children: /* @__PURE__ */ R.jsx("div", { className: "mx-auto px-6 py-8", children: /* @__PURE__ */ R.jsxs("div", { className: "flex gap-8", children: [
    /* @__PURE__ */ R.jsx("div", { className: "w-[275px] flex-shrink-0", children: /* @__PURE__ */ R.jsx(Sp, { software: c }) }),
    /* @__PURE__ */ R.jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ R.jsx(
      xp,
      {
        apps: m,
        expandedAppId: z,
        onToggleApp: w
      }
    ) })
  ] }) }) }) : /* @__PURE__ */ R.jsxs("div", { className: "flex flex-col items-center justify-center min-h-[400px] py-12 px-4", children: [
    /* @__PURE__ */ R.jsx("h2", { className: "text-2xl font-serif text-appverse-black mb-2", children: "Software Not Found" }),
    /* @__PURE__ */ R.jsx("p", { className: "text-appverse-black text-center max-w-md", children: "The software you're looking for doesn't exist or has been removed." })
  ] });
}
function Tp() {
  return /* @__PURE__ */ R.jsx(A1, { children: /* @__PURE__ */ R.jsx("div", { className: "appverse-container", children: /* @__PURE__ */ R.jsx("main", { children: /* @__PURE__ */ R.jsxs(Xy, { children: [
    /* @__PURE__ */ R.jsx(ui, { path: "/appverse/", element: /* @__PURE__ */ R.jsx(bp, {}) }),
    /* @__PURE__ */ R.jsx(ui, { path: "/appverse/software/:id", element: /* @__PURE__ */ R.jsx(zp, {}) }),
    /* @__PURE__ */ R.jsx(ui, { path: "*", element: /* @__PURE__ */ R.jsx(Yy, { to: "/appverse/", replace: !0 }) })
  ] }) }) }) });
}
function _p(i) {
  const s = document.getElementById(i);
  if (!s)
    return console.error(`AppVerse: Element with id "${i}" not found`), null;
  const r = $v.createRoot(s);
  return r.render(
    /* @__PURE__ */ R.jsx(d1, { children: /* @__PURE__ */ R.jsx(Tp, {}) })
  ), {
    unmount: () => {
      r.unmount();
    }
  };
}
export {
  Tp as AppVerseBrowser,
  _p as default,
  _p as mount
};
//# sourceMappingURL=appverse.es.js.map
