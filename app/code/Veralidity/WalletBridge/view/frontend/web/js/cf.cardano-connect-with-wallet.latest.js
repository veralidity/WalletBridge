/*! For license information please see index.js.LICENSE.txt */

! function(t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.CardanoConnectWithWalletCore = e() : t.CardanoConnectWithWalletCore = e()
}(this, (() => (() => {
    var t = {
            782: (t, e) => {
                "use strict";
                e.byteLength = function(t) {
                    var e = u(t),
                        n = e[0],
                        r = e[1];
                    return 3 * (n + r) / 4 - r
                }, e.toByteArray = function(t) {
                    var e, n, i = u(t),
                        s = i[0],
                        a = i[1],
                        c = new o(function(t, e, n) {
                            return 3 * (e + n) / 4 - n
                        }(0, s, a)),
                        f = 0,
                        l = a > 0 ? s - 4 : s;
                    for (n = 0; n < l; n += 4) e = r[t.charCodeAt(n)] << 18 | r[t.charCodeAt(n + 1)] << 12 | r[t.charCodeAt(n + 2)] << 6 | r[t.charCodeAt(n + 3)], c[f++] = e >> 16 & 255, c[f++] = e >> 8 & 255, c[f++] = 255 & e;
                    return 2 === a && (e = r[t.charCodeAt(n)] << 2 | r[t.charCodeAt(n + 1)] >> 4, c[f++] = 255 & e), 1 === a && (e = r[t.charCodeAt(n)] << 10 | r[t.charCodeAt(n + 1)] << 4 | r[t.charCodeAt(n + 2)] >> 2, c[f++] = e >> 8 & 255, c[f++] = 255 & e), c
                }, e.fromByteArray = function(t) {
                    for (var e, r = t.length, o = r % 3, i = [], s = 16383, u = 0, c = r - o; u < c; u += s) i.push(a(t, u, u + s > c ? c : u + s));
                    return 1 === o ? (e = t[r - 1], i.push(n[e >> 2] + n[e << 4 & 63] + "==")) : 2 === o && (e = (t[r - 2] << 8) + t[r - 1], i.push(n[e >> 10] + n[e >> 4 & 63] + n[e << 2 & 63] + "=")), i.join("")
                };
                for (var n = [], r = [], o = "undefined" != typeof Uint8Array ? Uint8Array : Array, i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s = 0; s < 64; ++s) n[s] = i[s], r[i.charCodeAt(s)] = s;

                function u(t) {
                    var e = t.length;
                    if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
                    var n = t.indexOf("=");
                    return -1 === n && (n = e), [n, n === e ? 0 : 4 - n % 4]
                }

                function a(t, e, r) {
                    for (var o, i, s = [], u = e; u < r; u += 3) o = (t[u] << 16 & 16711680) + (t[u + 1] << 8 & 65280) + (255 & t[u + 2]), s.push(n[(i = o) >> 18 & 63] + n[i >> 12 & 63] + n[i >> 6 & 63] + n[63 & i]);
                    return s.join("")
                }
                r["-".charCodeAt(0)] = 62, r["_".charCodeAt(0)] = 63
            },
            786: (t, e) => {
                "use strict";
                e.gW = void 0;
                const n = "qpzry9x8gf2tvdw0s3jn54khce6mua7l",
                    r = {};
                for (let t = 0; t < 32; t++) {
                    const e = n.charAt(t);
                    r[e] = t
                }

                function o(t) {
                    const e = t >> 25;
                    return (33554431 & t) << 5 ^ 996825010 & -(e >> 0 & 1) ^ 642813549 & -(e >> 1 & 1) ^ 513874426 & -(e >> 2 & 1) ^ 1027748829 & -(e >> 3 & 1) ^ 705979059 & -(e >> 4 & 1)
                }

                function i(t) {
                    let e = 1;
                    for (let n = 0; n < t.length; ++n) {
                        const r = t.charCodeAt(n);
                        if (r < 33 || r > 126) return "Invalid prefix (" + t + ")";
                        e = o(e) ^ r >> 5
                    }
                    e = o(e);
                    for (let n = 0; n < t.length; ++n) {
                        const r = t.charCodeAt(n);
                        e = o(e) ^ 31 & r
                    }
                    return e
                }

                function s(t, e, n, r) {
                    let o = 0,
                        i = 0;
                    const s = (1 << n) - 1,
                        u = [];
                    for (let r = 0; r < t.length; ++r)
                        for (o = o << e | t[r], i += e; i >= n;) i -= n, u.push(o >> i & s);
                    if (r) i > 0 && u.push(o << n - i & s);
                    else {
                        if (i >= e) return "Excess padding";
                        if (o << n - i & s) return "Non-zero padding"
                    }
                    return u
                }

                function u(t) {
                    return s(t, 8, 5, !0)
                }

                function a(t) {
                    const e = s(t, 5, 8, !1);
                    if (Array.isArray(e)) return e
                }

                function c(t) {
                    const e = s(t, 5, 8, !1);
                    if (Array.isArray(e)) return e;
                    throw new Error(e)
                }

                function f(t) {
                    let e;

                    function s(t, n) {
                        if (n = n || 90, t.length < 8) return t + " too short";
                        if (t.length > n) return "Exceeds length limit";
                        const s = t.toLowerCase(),
                            u = t.toUpperCase();
                        if (t !== s && t !== u) return "Mixed-case string " + t;
                        const a = (t = s).lastIndexOf("1");
                        if (-1 === a) return "No separator character for " + t;
                        if (0 === a) return "Missing prefix for " + t;
                        const c = t.slice(0, a),
                            f = t.slice(a + 1);
                        if (f.length < 6) return "Data too short";
                        let l = i(c);
                        if ("string" == typeof l) return l;
                        const h = [];
                        for (let t = 0; t < f.length; ++t) {
                            const e = f.charAt(t),
                                n = r[e];
                            if (void 0 === n) return "Unknown character " + e;
                            l = o(l) ^ n, t + 6 >= f.length || h.push(n)
                        }
                        return l !== e ? "Invalid checksum for " + t : {
                            prefix: c,
                            words: h
                        }
                    }
                    return e = "bech32" === t ? 1 : 734539939, {
                        decodeUnsafe: function(t, e) {
                            const n = s(t, e);
                            if ("object" == typeof n) return n
                        },
                        decode: function(t, e) {
                            const n = s(t, e);
                            if ("object" == typeof n) return n;
                            throw new Error(n)
                        },
                        encode: function(t, r, s) {
                            if (s = s || 90, t.length + 7 + r.length > s) throw new TypeError("Exceeds length limit");
                            let u = i(t = t.toLowerCase());
                            if ("string" == typeof u) throw new Error(u);
                            let a = t + "1";
                            for (let t = 0; t < r.length; ++t) {
                                const e = r[t];
                                if (e >> 5 != 0) throw new Error("Non 5-bit word");
                                u = o(u) ^ e, a += n.charAt(e)
                            }
                            for (let t = 0; t < 6; ++t) u = o(u);
                            u ^= e;
                            for (let t = 0; t < 6; ++t) a += n.charAt(u >> 5 * (5 - t) & 31);
                            return a
                        },
                        toWords: u,
                        fromWordsUnsafe: a,
                        fromWords: c
                    }
                }
                e.gW = f("bech32"), f("bech32m")
            },
            816: (t, e, n) => {
                "use strict";
                const r = n(782),
                    o = n(898),
                    i = "function" == typeof Symbol && "function" == typeof Symbol.for ? Symbol.for("nodejs.util.inspect.custom") : null;
                e.lW = a, e.h2 = 50;
                const s = 2147483647;

                function u(t) {
                    if (t > s) throw new RangeError('The value "' + t + '" is invalid for option "size"');
                    const e = new Uint8Array(t);
                    return Object.setPrototypeOf(e, a.prototype), e
                }

                function a(t, e, n) {
                    if ("number" == typeof t) {
                        if ("string" == typeof e) throw new TypeError('The "string" argument must be of type string. Received type number');
                        return l(t)
                    }
                    return c(t, e, n)
                }

                function c(t, e, n) {
                    if ("string" == typeof t) return function(t, e) {
                        if ("string" == typeof e && "" !== e || (e = "utf8"), !a.isEncoding(e)) throw new TypeError("Unknown encoding: " + e);
                        const n = 0 | A(t, e);
                        let r = u(n);
                        const o = r.write(t, e);
                        return o !== n && (r = r.slice(0, o)), r
                    }(t, e);
                    if (ArrayBuffer.isView(t)) return function(t) {
                        if (X(t, Uint8Array)) {
                            const e = new Uint8Array(t);
                            return g(e.buffer, e.byteOffset, e.byteLength)
                        }
                        return h(t)
                    }(t);
                    if (null == t) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t);
                    if (X(t, ArrayBuffer) || t && X(t.buffer, ArrayBuffer)) return g(t, e, n);
                    if ("undefined" != typeof SharedArrayBuffer && (X(t, SharedArrayBuffer) || t && X(t.buffer, SharedArrayBuffer))) return g(t, e, n);
                    if ("number" == typeof t) throw new TypeError('The "value" argument must not be of type number. Received type number');
                    const r = t.valueOf && t.valueOf();
                    if (null != r && r !== t) return a.from(r, e, n);
                    const o = function(t) {
                        if (a.isBuffer(t)) {
                            const e = 0 | d(t.length),
                                n = u(e);
                            return 0 === n.length || t.copy(n, 0, 0, e), n
                        }
                        return void 0 !== t.length ? "number" != typeof t.length || J(t.length) ? u(0) : h(t) : "Buffer" === t.type && Array.isArray(t.data) ? h(t.data) : void 0
                    }(t);
                    if (o) return o;
                    if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof t[Symbol.toPrimitive]) return a.from(t[Symbol.toPrimitive]("string"), e, n);
                    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t)
                }

                function f(t) {
                    if ("number" != typeof t) throw new TypeError('"size" argument must be of type number');
                    if (t < 0) throw new RangeError('The value "' + t + '" is invalid for option "size"')
                }

                function l(t) {
                    return f(t), u(t < 0 ? 0 : 0 | d(t))
                }

                function h(t) {
                    const e = t.length < 0 ? 0 : 0 | d(t.length),
                        n = u(e);
                    for (let r = 0; r < e; r += 1) n[r] = 255 & t[r];
                    return n
                }

                function g(t, e, n) {
                    if (e < 0 || t.byteLength < e) throw new RangeError('"offset" is outside of buffer bounds');
                    if (t.byteLength < e + (n || 0)) throw new RangeError('"length" is outside of buffer bounds');
                    let r;
                    return r = void 0 === e && void 0 === n ? new Uint8Array(t) : void 0 === n ? new Uint8Array(t, e) : new Uint8Array(t, e, n), Object.setPrototypeOf(r, a.prototype), r
                }

                function d(t) {
                    if (t >= s) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + s.toString(16) + " bytes");
                    return 0 | t
                }

                function A(t, e) {
                    if (a.isBuffer(t)) return t.length;
                    if (ArrayBuffer.isView(t) || X(t, ArrayBuffer)) return t.byteLength;
                    if ("string" != typeof t) throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof t);
                    const n = t.length,
                        r = arguments.length > 2 && !0 === arguments[2];
                    if (!r && 0 === n) return 0;
                    let o = !1;
                    for (;;) switch (e) {
                        case "ascii":
                        case "latin1":
                        case "binary":
                            return n;
                        case "utf8":
                        case "utf-8":
                            return H(t).length;
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return 2 * n;
                        case "hex":
                            return n >>> 1;
                        case "base64":
                            return Z(t).length;
                        default:
                            if (o) return r ? -1 : H(t).length;
                            e = ("" + e).toLowerCase(), o = !0
                    }
                }

                function p(t, e, n) {
                    let r = !1;
                    if ((void 0 === e || e < 0) && (e = 0), e > this.length) return "";
                    if ((void 0 === n || n > this.length) && (n = this.length), n <= 0) return "";
                    if ((n >>>= 0) <= (e >>>= 0)) return "";
                    for (t || (t = "utf8");;) switch (t) {
                        case "hex":
                            return U(this, e, n);
                        case "utf8":
                        case "utf-8":
                            return I(this, e, n);
                        case "ascii":
                            return N(this, e, n);
                        case "latin1":
                        case "binary":
                            return j(this, e, n);
                        case "base64":
                            return B(this, e, n);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return k(this, e, n);
                        default:
                            if (r) throw new TypeError("Unknown encoding: " + t);
                            t = (t + "").toLowerCase(), r = !0
                    }
                }

                function y(t, e, n) {
                    const r = t[e];
                    t[e] = t[n], t[n] = r
                }

                function w(t, e, n, r, o) {
                    if (0 === t.length) return -1;
                    if ("string" == typeof n ? (r = n, n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648), J(n = +n) && (n = o ? 0 : t.length - 1), n < 0 && (n = t.length + n), n >= t.length) {
                        if (o) return -1;
                        n = t.length - 1
                    } else if (n < 0) {
                        if (!o) return -1;
                        n = 0
                    }
                    if ("string" == typeof e && (e = a.from(e, r)), a.isBuffer(e)) return 0 === e.length ? -1 : v(t, e, n, r, o);
                    if ("number" == typeof e) return e &= 255, "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(t, e, n) : Uint8Array.prototype.lastIndexOf.call(t, e, n) : v(t, [e], n, r, o);
                    throw new TypeError("val must be string, number or Buffer")
                }

                function v(t, e, n, r, o) {
                    let i, s = 1,
                        u = t.length,
                        a = e.length;
                    if (void 0 !== r && ("ucs2" === (r = String(r).toLowerCase()) || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
                        if (t.length < 2 || e.length < 2) return -1;
                        s = 2, u /= 2, a /= 2, n /= 2
                    }

                    function c(t, e) {
                        return 1 === s ? t[e] : t.readUInt16BE(e * s)
                    }
                    if (o) {
                        let r = -1;
                        for (i = n; i < u; i++)
                            if (c(t, i) === c(e, -1 === r ? 0 : i - r)) {
                                if (-1 === r && (r = i), i - r + 1 === a) return r * s
                            } else - 1 !== r && (i -= i - r), r = -1
                    } else
                        for (n + a > u && (n = u - a), i = n; i >= 0; i--) {
                            let n = !0;
                            for (let r = 0; r < a; r++)
                                if (c(t, i + r) !== c(e, r)) {
                                    n = !1;
                                    break
                                } if (n) return i
                        }
                    return -1
                }

                function b(t, e, n, r) {
                    n = Number(n) || 0;
                    const o = t.length - n;
                    r ? (r = Number(r)) > o && (r = o) : r = o;
                    const i = e.length;
                    let s;
                    for (r > i / 2 && (r = i / 2), s = 0; s < r; ++s) {
                        const r = parseInt(e.substr(2 * s, 2), 16);
                        if (J(r)) return s;
                        t[n + s] = r
                    }
                    return s
                }

                function C(t, e, n, r) {
                    return K(H(e, t.length - n), t, n, r)
                }

                function m(t, e, n, r) {
                    return K(function(t) {
                        const e = [];
                        for (let n = 0; n < t.length; ++n) e.push(255 & t.charCodeAt(n));
                        return e
                    }(e), t, n, r)
                }

                function E(t, e, n, r) {
                    return K(Z(e), t, n, r)
                }

                function M(t, e, n, r) {
                    return K(function(t, e) {
                        let n, r, o;
                        const i = [];
                        for (let s = 0; s < t.length && !((e -= 2) < 0); ++s) n = t.charCodeAt(s), r = n >> 8, o = n % 256, i.push(o), i.push(r);
                        return i
                    }(e, t.length - n), t, n, r)
                }

                function B(t, e, n) {
                    return 0 === e && n === t.length ? r.fromByteArray(t) : r.fromByteArray(t.slice(e, n))
                }

                function I(t, e, n) {
                    n = Math.min(t.length, n);
                    const r = [];
                    let o = e;
                    for (; o < n;) {
                        const e = t[o];
                        let i = null,
                            s = e > 239 ? 4 : e > 223 ? 3 : e > 191 ? 2 : 1;
                        if (o + s <= n) {
                            let n, r, u, a;
                            switch (s) {
                                case 1:
                                    e < 128 && (i = e);
                                    break;
                                case 2:
                                    n = t[o + 1], 128 == (192 & n) && (a = (31 & e) << 6 | 63 & n, a > 127 && (i = a));
                                    break;
                                case 3:
                                    n = t[o + 1], r = t[o + 2], 128 == (192 & n) && 128 == (192 & r) && (a = (15 & e) << 12 | (63 & n) << 6 | 63 & r, a > 2047 && (a < 55296 || a > 57343) && (i = a));
                                    break;
                                case 4:
                                    n = t[o + 1], r = t[o + 2], u = t[o + 3], 128 == (192 & n) && 128 == (192 & r) && 128 == (192 & u) && (a = (15 & e) << 18 | (63 & n) << 12 | (63 & r) << 6 | 63 & u, a > 65535 && a < 1114112 && (i = a))
                            }
                        }
                        null === i ? (i = 65533, s = 1) : i > 65535 && (i -= 65536, r.push(i >>> 10 & 1023 | 55296), i = 56320 | 1023 & i), r.push(i), o += s
                    }
                    return function(t) {
                        const e = t.length;
                        if (e <= D) return String.fromCharCode.apply(String, t);
                        let n = "",
                            r = 0;
                        for (; r < e;) n += String.fromCharCode.apply(String, t.slice(r, r += D));
                        return n
                    }(r)
                }
                a.TYPED_ARRAY_SUPPORT = function() {
                    try {
                        const t = new Uint8Array(1),
                            e = {
                                foo: function() {
                                    return 42
                                }
                            };
                        return Object.setPrototypeOf(e, Uint8Array.prototype), Object.setPrototypeOf(t, e), 42 === t.foo()
                    } catch (t) {
                        return !1
                    }
                }(), a.TYPED_ARRAY_SUPPORT || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."), Object.defineProperty(a.prototype, "parent", {
                    enumerable: !0,
                    get: function() {
                        if (a.isBuffer(this)) return this.buffer
                    }
                }), Object.defineProperty(a.prototype, "offset", {
                    enumerable: !0,
                    get: function() {
                        if (a.isBuffer(this)) return this.byteOffset
                    }
                }), a.poolSize = 8192, a.from = function(t, e, n) {
                    return c(t, e, n)
                }, Object.setPrototypeOf(a.prototype, Uint8Array.prototype), Object.setPrototypeOf(a, Uint8Array), a.alloc = function(t, e, n) {
                    return function(t, e, n) {
                        return f(t), t <= 0 ? u(t) : void 0 !== e ? "string" == typeof n ? u(t).fill(e, n) : u(t).fill(e) : u(t)
                    }(t, e, n)
                }, a.allocUnsafe = function(t) {
                    return l(t)
                }, a.allocUnsafeSlow = function(t) {
                    return l(t)
                }, a.isBuffer = function(t) {
                    return null != t && !0 === t._isBuffer && t !== a.prototype
                }, a.compare = function(t, e) {
                    if (X(t, Uint8Array) && (t = a.from(t, t.offset, t.byteLength)), X(e, Uint8Array) && (e = a.from(e, e.offset, e.byteLength)), !a.isBuffer(t) || !a.isBuffer(e)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
                    if (t === e) return 0;
                    let n = t.length,
                        r = e.length;
                    for (let o = 0, i = Math.min(n, r); o < i; ++o)
                        if (t[o] !== e[o]) {
                            n = t[o], r = e[o];
                            break
                        } return n < r ? -1 : r < n ? 1 : 0
                }, a.isEncoding = function(t) {
                    switch (String(t).toLowerCase()) {
                        case "hex":
                        case "utf8":
                        case "utf-8":
                        case "ascii":
                        case "latin1":
                        case "binary":
                        case "base64":
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return !0;
                        default:
                            return !1
                    }
                }, a.concat = function(t, e) {
                    if (!Array.isArray(t)) throw new TypeError('"list" argument must be an Array of Buffers');
                    if (0 === t.length) return a.alloc(0);
                    let n;
                    if (void 0 === e)
                        for (e = 0, n = 0; n < t.length; ++n) e += t[n].length;
                    const r = a.allocUnsafe(e);
                    let o = 0;
                    for (n = 0; n < t.length; ++n) {
                        let e = t[n];
                        if (X(e, Uint8Array)) o + e.length > r.length ? (a.isBuffer(e) || (e = a.from(e)), e.copy(r, o)) : Uint8Array.prototype.set.call(r, e, o);
                        else {
                            if (!a.isBuffer(e)) throw new TypeError('"list" argument must be an Array of Buffers');
                            e.copy(r, o)
                        }
                        o += e.length
                    }
                    return r
                }, a.byteLength = A, a.prototype._isBuffer = !0, a.prototype.swap16 = function() {
                    const t = this.length;
                    if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                    for (let e = 0; e < t; e += 2) y(this, e, e + 1);
                    return this
                }, a.prototype.swap32 = function() {
                    const t = this.length;
                    if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                    for (let e = 0; e < t; e += 4) y(this, e, e + 3), y(this, e + 1, e + 2);
                    return this
                }, a.prototype.swap64 = function() {
                    const t = this.length;
                    if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                    for (let e = 0; e < t; e += 8) y(this, e, e + 7), y(this, e + 1, e + 6), y(this, e + 2, e + 5), y(this, e + 3, e + 4);
                    return this
                }, a.prototype.toString = function() {
                    const t = this.length;
                    return 0 === t ? "" : 0 === arguments.length ? I(this, 0, t) : p.apply(this, arguments)
                }, a.prototype.toLocaleString = a.prototype.toString, a.prototype.equals = function(t) {
                    if (!a.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                    return this === t || 0 === a.compare(this, t)
                }, a.prototype.inspect = function() {
                    let t = "";
                    const n = e.h2;
                    return t = this.toString("hex", 0, n).replace(/(.{2})/g, "$1 ").trim(), this.length > n && (t += " ... "), "<Buffer " + t + ">"
                }, i && (a.prototype[i] = a.prototype.inspect), a.prototype.compare = function(t, e, n, r, o) {
                    if (X(t, Uint8Array) && (t = a.from(t, t.offset, t.byteLength)), !a.isBuffer(t)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof t);
                    if (void 0 === e && (e = 0), void 0 === n && (n = t ? t.length : 0), void 0 === r && (r = 0), void 0 === o && (o = this.length), e < 0 || n > t.length || r < 0 || o > this.length) throw new RangeError("out of range index");
                    if (r >= o && e >= n) return 0;
                    if (r >= o) return -1;
                    if (e >= n) return 1;
                    if (this === t) return 0;
                    let i = (o >>>= 0) - (r >>>= 0),
                        s = (n >>>= 0) - (e >>>= 0);
                    const u = Math.min(i, s),
                        c = this.slice(r, o),
                        f = t.slice(e, n);
                    for (let t = 0; t < u; ++t)
                        if (c[t] !== f[t]) {
                            i = c[t], s = f[t];
                            break
                        } return i < s ? -1 : s < i ? 1 : 0
                }, a.prototype.includes = function(t, e, n) {
                    return -1 !== this.indexOf(t, e, n)
                }, a.prototype.indexOf = function(t, e, n) {
                    return w(this, t, e, n, !0)
                }, a.prototype.lastIndexOf = function(t, e, n) {
                    return w(this, t, e, n, !1)
                }, a.prototype.write = function(t, e, n, r) {
                    if (void 0 === e) r = "utf8", n = this.length, e = 0;
                    else if (void 0 === n && "string" == typeof e) r = e, n = this.length, e = 0;
                    else {
                        if (!isFinite(e)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                        e >>>= 0, isFinite(n) ? (n >>>= 0, void 0 === r && (r = "utf8")) : (r = n, n = void 0)
                    }
                    const o = this.length - e;
                    if ((void 0 === n || n > o) && (n = o), t.length > 0 && (n < 0 || e < 0) || e > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                    r || (r = "utf8");
                    let i = !1;
                    for (;;) switch (r) {
                        case "hex":
                            return b(this, t, e, n);
                        case "utf8":
                        case "utf-8":
                            return C(this, t, e, n);
                        case "ascii":
                        case "latin1":
                        case "binary":
                            return m(this, t, e, n);
                        case "base64":
                            return E(this, t, e, n);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return M(this, t, e, n);
                        default:
                            if (i) throw new TypeError("Unknown encoding: " + r);
                            r = ("" + r).toLowerCase(), i = !0
                    }
                }, a.prototype.toJSON = function() {
                    return {
                        type: "Buffer",
                        data: Array.prototype.slice.call(this._arr || this, 0)
                    }
                };
                const D = 4096;

                function N(t, e, n) {
                    let r = "";
                    n = Math.min(t.length, n);
                    for (let o = e; o < n; ++o) r += String.fromCharCode(127 & t[o]);
                    return r
                }

                function j(t, e, n) {
                    let r = "";
                    n = Math.min(t.length, n);
                    for (let o = e; o < n; ++o) r += String.fromCharCode(t[o]);
                    return r
                }

                function U(t, e, n) {
                    const r = t.length;
                    (!e || e < 0) && (e = 0), (!n || n < 0 || n > r) && (n = r);
                    let o = "";
                    for (let r = e; r < n; ++r) o += q[t[r]];
                    return o
                }

                function k(t, e, n) {
                    const r = t.slice(e, n);
                    let o = "";
                    for (let t = 0; t < r.length - 1; t += 2) o += String.fromCharCode(r[t] + 256 * r[t + 1]);
                    return o
                }

                function L(t, e, n) {
                    if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
                    if (t + e > n) throw new RangeError("Trying to access beyond buffer length")
                }

                function O(t, e, n, r, o, i) {
                    if (!a.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
                    if (e > o || e < i) throw new RangeError('"value" argument is out of bounds');
                    if (n + r > t.length) throw new RangeError("Index out of range")
                }

                function z(t, e, n, r, o) {
                    R(e, r, o, t, n, 7);
                    let i = Number(e & BigInt(4294967295));
                    t[n++] = i, i >>= 8, t[n++] = i, i >>= 8, t[n++] = i, i >>= 8, t[n++] = i;
                    let s = Number(e >> BigInt(32) & BigInt(4294967295));
                    return t[n++] = s, s >>= 8, t[n++] = s, s >>= 8, t[n++] = s, s >>= 8, t[n++] = s, n
                }

                function Q(t, e, n, r, o) {
                    R(e, r, o, t, n, 7);
                    let i = Number(e & BigInt(4294967295));
                    t[n + 7] = i, i >>= 8, t[n + 6] = i, i >>= 8, t[n + 5] = i, i >>= 8, t[n + 4] = i;
                    let s = Number(e >> BigInt(32) & BigInt(4294967295));
                    return t[n + 3] = s, s >>= 8, t[n + 2] = s, s >>= 8, t[n + 1] = s, s >>= 8, t[n] = s, n + 8
                }

                function x(t, e, n, r, o, i) {
                    if (n + r > t.length) throw new RangeError("Index out of range");
                    if (n < 0) throw new RangeError("Index out of range")
                }

                function T(t, e, n, r, i) {
                    return e = +e, n >>>= 0, i || x(t, 0, n, 4), o.write(t, e, n, r, 23, 4), n + 4
                }

                function F(t, e, n, r, i) {
                    return e = +e, n >>>= 0, i || x(t, 0, n, 8), o.write(t, e, n, r, 52, 8), n + 8
                }
                a.prototype.slice = function(t, e) {
                    const n = this.length;
                    (t = ~~t) < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n), (e = void 0 === e ? n : ~~e) < 0 ? (e += n) < 0 && (e = 0) : e > n && (e = n), e < t && (e = t);
                    const r = this.subarray(t, e);
                    return Object.setPrototypeOf(r, a.prototype), r
                }, a.prototype.readUintLE = a.prototype.readUIntLE = function(t, e, n) {
                    t >>>= 0, e >>>= 0, n || L(t, e, this.length);
                    let r = this[t],
                        o = 1,
                        i = 0;
                    for (; ++i < e && (o *= 256);) r += this[t + i] * o;
                    return r
                }, a.prototype.readUintBE = a.prototype.readUIntBE = function(t, e, n) {
                    t >>>= 0, e >>>= 0, n || L(t, e, this.length);
                    let r = this[t + --e],
                        o = 1;
                    for (; e > 0 && (o *= 256);) r += this[t + --e] * o;
                    return r
                }, a.prototype.readUint8 = a.prototype.readUInt8 = function(t, e) {
                    return t >>>= 0, e || L(t, 1, this.length), this[t]
                }, a.prototype.readUint16LE = a.prototype.readUInt16LE = function(t, e) {
                    return t >>>= 0, e || L(t, 2, this.length), this[t] | this[t + 1] << 8
                }, a.prototype.readUint16BE = a.prototype.readUInt16BE = function(t, e) {
                    return t >>>= 0, e || L(t, 2, this.length), this[t] << 8 | this[t + 1]
                }, a.prototype.readUint32LE = a.prototype.readUInt32LE = function(t, e) {
                    return t >>>= 0, e || L(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
                }, a.prototype.readUint32BE = a.prototype.readUInt32BE = function(t, e) {
                    return t >>>= 0, e || L(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
                }, a.prototype.readBigUInt64LE = _((function(t) {
                    P(t >>>= 0, "offset");
                    const e = this[t],
                        n = this[t + 7];
                    void 0 !== e && void 0 !== n || G(t, this.length - 8);
                    const r = e + 256 * this[++t] + 65536 * this[++t] + this[++t] * 2 ** 24,
                        o = this[++t] + 256 * this[++t] + 65536 * this[++t] + n * 2 ** 24;
                    return BigInt(r) + (BigInt(o) << BigInt(32))
                })), a.prototype.readBigUInt64BE = _((function(t) {
                    P(t >>>= 0, "offset");
                    const e = this[t],
                        n = this[t + 7];
                    void 0 !== e && void 0 !== n || G(t, this.length - 8);
                    const r = e * 2 ** 24 + 65536 * this[++t] + 256 * this[++t] + this[++t],
                        o = this[++t] * 2 ** 24 + 65536 * this[++t] + 256 * this[++t] + n;
                    return (BigInt(r) << BigInt(32)) + BigInt(o)
                })), a.prototype.readIntLE = function(t, e, n) {
                    t >>>= 0, e >>>= 0, n || L(t, e, this.length);
                    let r = this[t],
                        o = 1,
                        i = 0;
                    for (; ++i < e && (o *= 256);) r += this[t + i] * o;
                    return o *= 128, r >= o && (r -= Math.pow(2, 8 * e)), r
                }, a.prototype.readIntBE = function(t, e, n) {
                    t >>>= 0, e >>>= 0, n || L(t, e, this.length);
                    let r = e,
                        o = 1,
                        i = this[t + --r];
                    for (; r > 0 && (o *= 256);) i += this[t + --r] * o;
                    return o *= 128, i >= o && (i -= Math.pow(2, 8 * e)), i
                }, a.prototype.readInt8 = function(t, e) {
                    return t >>>= 0, e || L(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
                }, a.prototype.readInt16LE = function(t, e) {
                    t >>>= 0, e || L(t, 2, this.length);
                    const n = this[t] | this[t + 1] << 8;
                    return 32768 & n ? 4294901760 | n : n
                }, a.prototype.readInt16BE = function(t, e) {
                    t >>>= 0, e || L(t, 2, this.length);
                    const n = this[t + 1] | this[t] << 8;
                    return 32768 & n ? 4294901760 | n : n
                }, a.prototype.readInt32LE = function(t, e) {
                    return t >>>= 0, e || L(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
                }, a.prototype.readInt32BE = function(t, e) {
                    return t >>>= 0, e || L(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
                }, a.prototype.readBigInt64LE = _((function(t) {
                    P(t >>>= 0, "offset");
                    const e = this[t],
                        n = this[t + 7];
                    void 0 !== e && void 0 !== n || G(t, this.length - 8);
                    const r = this[t + 4] + 256 * this[t + 5] + 65536 * this[t + 6] + (n << 24);
                    return (BigInt(r) << BigInt(32)) + BigInt(e + 256 * this[++t] + 65536 * this[++t] + this[++t] * 2 ** 24)
                })), a.prototype.readBigInt64BE = _((function(t) {
                    P(t >>>= 0, "offset");
                    const e = this[t],
                        n = this[t + 7];
                    void 0 !== e && void 0 !== n || G(t, this.length - 8);
                    const r = (e << 24) + 65536 * this[++t] + 256 * this[++t] + this[++t];
                    return (BigInt(r) << BigInt(32)) + BigInt(this[++t] * 2 ** 24 + 65536 * this[++t] + 256 * this[++t] + n)
                })), a.prototype.readFloatLE = function(t, e) {
                    return t >>>= 0, e || L(t, 4, this.length), o.read(this, t, !0, 23, 4)
                }, a.prototype.readFloatBE = function(t, e) {
                    return t >>>= 0, e || L(t, 4, this.length), o.read(this, t, !1, 23, 4)
                }, a.prototype.readDoubleLE = function(t, e) {
                    return t >>>= 0, e || L(t, 8, this.length), o.read(this, t, !0, 52, 8)
                }, a.prototype.readDoubleBE = function(t, e) {
                    return t >>>= 0, e || L(t, 8, this.length), o.read(this, t, !1, 52, 8)
                }, a.prototype.writeUintLE = a.prototype.writeUIntLE = function(t, e, n, r) {
                    t = +t, e >>>= 0, n >>>= 0, r || O(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
                    let o = 1,
                        i = 0;
                    for (this[e] = 255 & t; ++i < n && (o *= 256);) this[e + i] = t / o & 255;
                    return e + n
                }, a.prototype.writeUintBE = a.prototype.writeUIntBE = function(t, e, n, r) {
                    t = +t, e >>>= 0, n >>>= 0, r || O(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
                    let o = n - 1,
                        i = 1;
                    for (this[e + o] = 255 & t; --o >= 0 && (i *= 256);) this[e + o] = t / i & 255;
                    return e + n
                }, a.prototype.writeUint8 = a.prototype.writeUInt8 = function(t, e, n) {
                    return t = +t, e >>>= 0, n || O(this, t, e, 1, 255, 0), this[e] = 255 & t, e + 1
                }, a.prototype.writeUint16LE = a.prototype.writeUInt16LE = function(t, e, n) {
                    return t = +t, e >>>= 0, n || O(this, t, e, 2, 65535, 0), this[e] = 255 & t, this[e + 1] = t >>> 8, e + 2
                }, a.prototype.writeUint16BE = a.prototype.writeUInt16BE = function(t, e, n) {
                    return t = +t, e >>>= 0, n || O(this, t, e, 2, 65535, 0), this[e] = t >>> 8, this[e + 1] = 255 & t, e + 2
                }, a.prototype.writeUint32LE = a.prototype.writeUInt32LE = function(t, e, n) {
                    return t = +t, e >>>= 0, n || O(this, t, e, 4, 4294967295, 0), this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = 255 & t, e + 4
                }, a.prototype.writeUint32BE = a.prototype.writeUInt32BE = function(t, e, n) {
                    return t = +t, e >>>= 0, n || O(this, t, e, 4, 4294967295, 0), this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t, e + 4
                }, a.prototype.writeBigUInt64LE = _((function(t, e = 0) {
                    return z(this, t, e, BigInt(0), BigInt("0xffffffffffffffff"))
                })), a.prototype.writeBigUInt64BE = _((function(t, e = 0) {
                    return Q(this, t, e, BigInt(0), BigInt("0xffffffffffffffff"))
                })), a.prototype.writeIntLE = function(t, e, n, r) {
                    if (t = +t, e >>>= 0, !r) {
                        const r = Math.pow(2, 8 * n - 1);
                        O(this, t, e, n, r - 1, -r)
                    }
                    let o = 0,
                        i = 1,
                        s = 0;
                    for (this[e] = 255 & t; ++o < n && (i *= 256);) t < 0 && 0 === s && 0 !== this[e + o - 1] && (s = 1), this[e + o] = (t / i >> 0) - s & 255;
                    return e + n
                }, a.prototype.writeIntBE = function(t, e, n, r) {
                    if (t = +t, e >>>= 0, !r) {
                        const r = Math.pow(2, 8 * n - 1);
                        O(this, t, e, n, r - 1, -r)
                    }
                    let o = n - 1,
                        i = 1,
                        s = 0;
                    for (this[e + o] = 255 & t; --o >= 0 && (i *= 256);) t < 0 && 0 === s && 0 !== this[e + o + 1] && (s = 1), this[e + o] = (t / i >> 0) - s & 255;
                    return e + n
                }, a.prototype.writeInt8 = function(t, e, n) {
                    return t = +t, e >>>= 0, n || O(this, t, e, 1, 127, -128), t < 0 && (t = 255 + t + 1), this[e] = 255 & t, e + 1
                }, a.prototype.writeInt16LE = function(t, e, n) {
                    return t = +t, e >>>= 0, n || O(this, t, e, 2, 32767, -32768), this[e] = 255 & t, this[e + 1] = t >>> 8, e + 2
                }, a.prototype.writeInt16BE = function(t, e, n) {
                    return t = +t, e >>>= 0, n || O(this, t, e, 2, 32767, -32768), this[e] = t >>> 8, this[e + 1] = 255 & t, e + 2
                }, a.prototype.writeInt32LE = function(t, e, n) {
                    return t = +t, e >>>= 0, n || O(this, t, e, 4, 2147483647, -2147483648), this[e] = 255 & t, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24, e + 4
                }, a.prototype.writeInt32BE = function(t, e, n) {
                    return t = +t, e >>>= 0, n || O(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t, e + 4
                }, a.prototype.writeBigInt64LE = _((function(t, e = 0) {
                    return z(this, t, e, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"))
                })), a.prototype.writeBigInt64BE = _((function(t, e = 0) {
                    return Q(this, t, e, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"))
                })), a.prototype.writeFloatLE = function(t, e, n) {
                    return T(this, t, e, !0, n)
                }, a.prototype.writeFloatBE = function(t, e, n) {
                    return T(this, t, e, !1, n)
                }, a.prototype.writeDoubleLE = function(t, e, n) {
                    return F(this, t, e, !0, n)
                }, a.prototype.writeDoubleBE = function(t, e, n) {
                    return F(this, t, e, !1, n)
                }, a.prototype.copy = function(t, e, n, r) {
                    if (!a.isBuffer(t)) throw new TypeError("argument should be a Buffer");
                    if (n || (n = 0), r || 0 === r || (r = this.length), e >= t.length && (e = t.length), e || (e = 0), r > 0 && r < n && (r = n), r === n) return 0;
                    if (0 === t.length || 0 === this.length) return 0;
                    if (e < 0) throw new RangeError("targetStart out of bounds");
                    if (n < 0 || n >= this.length) throw new RangeError("Index out of range");
                    if (r < 0) throw new RangeError("sourceEnd out of bounds");
                    r > this.length && (r = this.length), t.length - e < r - n && (r = t.length - e + n);
                    const o = r - n;
                    return this === t && "function" == typeof Uint8Array.prototype.copyWithin ? this.copyWithin(e, n, r) : Uint8Array.prototype.set.call(t, this.subarray(n, r), e), o
                }, a.prototype.fill = function(t, e, n, r) {
                    if ("string" == typeof t) {
                        if ("string" == typeof e ? (r = e, e = 0, n = this.length) : "string" == typeof n && (r = n, n = this.length), void 0 !== r && "string" != typeof r) throw new TypeError("encoding must be a string");
                        if ("string" == typeof r && !a.isEncoding(r)) throw new TypeError("Unknown encoding: " + r);
                        if (1 === t.length) {
                            const e = t.charCodeAt(0);
                            ("utf8" === r && e < 128 || "latin1" === r) && (t = e)
                        }
                    } else "number" == typeof t ? t &= 255 : "boolean" == typeof t && (t = Number(t));
                    if (e < 0 || this.length < e || this.length < n) throw new RangeError("Out of range index");
                    if (n <= e) return this;
                    let o;
                    if (e >>>= 0, n = void 0 === n ? this.length : n >>> 0, t || (t = 0), "number" == typeof t)
                        for (o = e; o < n; ++o) this[o] = t;
                    else {
                        const i = a.isBuffer(t) ? t : a.from(t, r),
                            s = i.length;
                        if (0 === s) throw new TypeError('The value "' + t + '" is invalid for argument "value"');
                        for (o = 0; o < n - e; ++o) this[o + e] = i[o % s]
                    }
                    return this
                };
                const S = {};

                function Y(t, e, n) {
                    S[t] = class extends n {
                        constructor() {
                            super(), Object.defineProperty(this, "message", {
                                value: e.apply(this, arguments),
                                writable: !0,
                                configurable: !0
                            }), this.name = `${this.name} [${t}]`, this.stack, delete this.name
                        }
                        get code() {
                            return t
                        }
                        set code(t) {
                            Object.defineProperty(this, "code", {
                                configurable: !0,
                                enumerable: !0,
                                value: t,
                                writable: !0
                            })
                        }
                        toString() {
                            return `${this.name} [${t}]: ${this.message}`
                        }
                    }
                }

                function W(t) {
                    let e = "",
                        n = t.length;
                    const r = "-" === t[0] ? 1 : 0;
                    for (; n >= r + 4; n -= 3) e = `_${t.slice(n-3,n)}${e}`;
                    return `${t.slice(0,n)}${e}`
                }

                function R(t, e, n, r, o, i) {
                    if (t > n || t < e) {
                        const r = "bigint" == typeof e ? "n" : "";
                        let o;
                        throw o = i > 3 ? 0 === e || e === BigInt(0) ? `>= 0${r} and < 2${r} ** ${8*(i+1)}${r}` : `>= -(2${r} ** ${8*(i+1)-1}${r}) and < 2 ** ${8*(i+1)-1}${r}` : `>= ${e}${r} and <= ${n}${r}`, new S.ERR_OUT_OF_RANGE("value", o, t)
                    }! function(t, e, n) {
                        P(e, "offset"), void 0 !== t[e] && void 0 !== t[e + n] || G(e, t.length - (n + 1))
                    }(r, o, i)
                }

                function P(t, e) {
                    if ("number" != typeof t) throw new S.ERR_INVALID_ARG_TYPE(e, "number", t)
                }

                function G(t, e, n) {
                    if (Math.floor(t) !== t) throw P(t, n), new S.ERR_OUT_OF_RANGE(n || "offset", "an integer", t);
                    if (e < 0) throw new S.ERR_BUFFER_OUT_OF_BOUNDS;
                    throw new S.ERR_OUT_OF_RANGE(n || "offset", `>= ${n?1:0} and <= ${e}`, t)
                }
                Y("ERR_BUFFER_OUT_OF_BOUNDS", (function(t) {
                    return t ? `${t} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds"
                }), RangeError), Y("ERR_INVALID_ARG_TYPE", (function(t, e) {
                    return `The "${t}" argument must be of type number. Received type ${typeof e}`
                }), TypeError), Y("ERR_OUT_OF_RANGE", (function(t, e, n) {
                    let r = `The value of "${t}" is out of range.`,
                        o = n;
                    return Number.isInteger(n) && Math.abs(n) > 2 ** 32 ? o = W(String(n)) : "bigint" == typeof n && (o = String(n), (n > BigInt(2) ** BigInt(32) || n < -(BigInt(2) ** BigInt(32))) && (o = W(o)), o += "n"), r += ` It must be ${e}. Received ${o}`, r
                }), RangeError);
                const V = /[^+/0-9A-Za-z-_]/g;

                function H(t, e) {
                    let n;
                    e = e || 1 / 0;
                    const r = t.length;
                    let o = null;
                    const i = [];
                    for (let s = 0; s < r; ++s) {
                        if (n = t.charCodeAt(s), n > 55295 && n < 57344) {
                            if (!o) {
                                if (n > 56319) {
                                    (e -= 3) > -1 && i.push(239, 191, 189);
                                    continue
                                }
                                if (s + 1 === r) {
                                    (e -= 3) > -1 && i.push(239, 191, 189);
                                    continue
                                }
                                o = n;
                                continue
                            }
                            if (n < 56320) {
                                (e -= 3) > -1 && i.push(239, 191, 189), o = n;
                                continue
                            }
                            n = 65536 + (o - 55296 << 10 | n - 56320)
                        } else o && (e -= 3) > -1 && i.push(239, 191, 189);
                        if (o = null, n < 128) {
                            if ((e -= 1) < 0) break;
                            i.push(n)
                        } else if (n < 2048) {
                            if ((e -= 2) < 0) break;
                            i.push(n >> 6 | 192, 63 & n | 128)
                        } else if (n < 65536) {
                            if ((e -= 3) < 0) break;
                            i.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128)
                        } else {
                            if (!(n < 1114112)) throw new Error("Invalid code point");
                            if ((e -= 4) < 0) break;
                            i.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128)
                        }
                    }
                    return i
                }

                function Z(t) {
                    return r.toByteArray(function(t) {
                        if ((t = (t = t.split("=")[0]).trim().replace(V, "")).length < 2) return "";
                        for (; t.length % 4 != 0;) t += "=";
                        return t
                    }(t))
                }

                function K(t, e, n, r) {
                    let o;
                    for (o = 0; o < r && !(o + n >= e.length || o >= t.length); ++o) e[o + n] = t[o];
                    return o
                }

                function X(t, e) {
                    return t instanceof e || null != t && null != t.constructor && null != t.constructor.name && t.constructor.name === e.name
                }

                function J(t) {
                    return t != t
                }
                const q = function() {
                    const t = "0123456789abcdef",
                        e = new Array(256);
                    for (let n = 0; n < 16; ++n) {
                        const r = 16 * n;
                        for (let o = 0; o < 16; ++o) e[r + o] = t[n] + t[o]
                    }
                    return e
                }();

                function _(t) {
                    return "undefined" == typeof BigInt ? $ : t
                }

                function $() {
                    throw new Error("BigInt not supported")
                }
            },
            898: (t, e) => {
                e.read = function(t, e, n, r, o) {
                    var i, s, u = 8 * o - r - 1,
                        a = (1 << u) - 1,
                        c = a >> 1,
                        f = -7,
                        l = n ? o - 1 : 0,
                        h = n ? -1 : 1,
                        g = t[e + l];
                    for (l += h, i = g & (1 << -f) - 1, g >>= -f, f += u; f > 0; i = 256 * i + t[e + l], l += h, f -= 8);
                    for (s = i & (1 << -f) - 1, i >>= -f, f += r; f > 0; s = 256 * s + t[e + l], l += h, f -= 8);
                    if (0 === i) i = 1 - c;
                    else {
                        if (i === a) return s ? NaN : 1 / 0 * (g ? -1 : 1);
                        s += Math.pow(2, r), i -= c
                    }
                    return (g ? -1 : 1) * s * Math.pow(2, i - r)
                }, e.write = function(t, e, n, r, o, i) {
                    var s, u, a, c = 8 * i - o - 1,
                        f = (1 << c) - 1,
                        l = f >> 1,
                        h = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                        g = r ? 0 : i - 1,
                        d = r ? 1 : -1,
                        A = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
                    for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (u = isNaN(e) ? 1 : 0, s = f) : (s = Math.floor(Math.log(e) / Math.LN2), e * (a = Math.pow(2, -s)) < 1 && (s--, a *= 2), (e += s + l >= 1 ? h / a : h * Math.pow(2, 1 - l)) * a >= 2 && (s++, a /= 2), s + l >= f ? (u = 0, s = f) : s + l >= 1 ? (u = (e * a - 1) * Math.pow(2, o), s += l) : (u = e * Math.pow(2, l - 1) * Math.pow(2, o), s = 0)); o >= 8; t[n + g] = 255 & u, g += d, u /= 256, o -= 8);
                    for (s = s << o | u, c += o; c > 0; t[n + g] = 255 & s, g += d, s /= 256, c -= 8);
                    t[n + g - d] |= 128 * A
                }
            }
        },
        e = {};

    function n(r) {
        var o = e[r];
        if (void 0 !== o) return o.exports;
        var i = e[r] = {
            exports: {}
        };
        return t[r](i, i.exports, n), i.exports
    }
    n.d = (t, e) => {
        for (var r in e) n.o(e, r) && !n.o(t, r) && Object.defineProperty(t, r, {
            enumerable: !0,
            get: e[r]
        })
    }, n.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e), n.r = t => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    };
    var r = {};
    return (() => {
        "use strict";

        function t(e) {
            return t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            }, t(e)
        }

        function e(e, n) {
            for (var r = 0; r < n.length; r++) {
                var o = n[r];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, (void 0, i = function(e, n) {
                    if ("object" !== t(e) || null === e) return e;
                    var r = e[Symbol.toPrimitive];
                    if (void 0 !== r) {
                        var o = r.call(e, "string");
                        if ("object" !== t(o)) return o;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return String(e)
                }(o.key), "symbol" === t(i) ? i : String(i)), o)
            }
            var i
        }

        function o(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), Object.defineProperty(t, "prototype", {
                writable: !1
            }), t
        }

        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function s(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(t, "prototype", {
                writable: !1
            }), e && l(t, e)
        }

        function u(e) {
            var n = f();
            return function() {
                var r, o = h(e);
                if (n) {
                    var i = h(this).constructor;
                    r = Reflect.construct(o, arguments, i)
                } else r = o.apply(this, arguments);
                return function(e, n) {
                    if (n && ("object" === t(n) || "function" == typeof n)) return n;
                    if (void 0 !== n) throw new TypeError("Derived constructors may only return object or undefined");
                    return function(t) {
                        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return t
                    }(e)
                }(this, r)
            }
        }

        function a(t) {
            var e = "function" == typeof Map ? new Map : void 0;
            return a = function(t) {
                if (null === t || (n = t, -1 === Function.toString.call(n).indexOf("[native code]"))) return t;
                var n;
                if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function");
                if (void 0 !== e) {
                    if (e.has(t)) return e.get(t);
                    e.set(t, r)
                }

                function r() {
                    return c(t, arguments, h(this).constructor)
                }
                return r.prototype = Object.create(t.prototype, {
                    constructor: {
                        value: r,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), l(r, t)
            }, a(t)
        }

        function c(t, e, n) {
            return c = f() ? Reflect.construct.bind() : function(t, e, n) {
                var r = [null];
                r.push.apply(r, e);
                var o = new(Function.bind.apply(t, r));
                return n && l(o, n.prototype), o
            }, c.apply(null, arguments)
        }

        function f() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
            } catch (t) {
                return !1
            }
        }

        function l(t, e) {
            return l = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
                return t.__proto__ = e, t
            }, l(t, e)
        }

        function h(t) {
            return h = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            }, h(t)
        }
        n.r(r), n.d(r, {
            EnablementFailedError: () => b,
            ExtensionNotInjectedError: () => y,
            InjectWalletListener: () => V,
            NetworkId: () => B,
            NetworkType: () => x,
            Observable: () => Q,
            UnavailableWalletVisibility: () => T,
            Wallet: () => de,
            WalletConnectError: () => d,
            WalletExtensionNotFoundError: () => v,
            WalletNotCip30CompatibleError: () => p,
            WalletNotInstalledError: () => w,
            WrongNetworkTypeError: () => A,
            capitalize: () => g,
            checkIsMobile: () => P,
            chromeStoreUrl: () => N,
            chromeWalletExtensions: () => j,
            decodeHexAddress: () => M,
            estimateAvailableWallets: () => G,
            flintDeepLink: () => D,
            formatSupportedWallets: () => R,
            getWalletIcon: () => U,
            isWalletInstalled: () => E,
            mobileWallets: () => I
        });
        var g = function(t) {
                return t.charAt(0).toUpperCase() + t.slice(1)
            },
            d = function(t) {
                s(n, t);
                var e = u(n);

                function n(t, r) {
                    var o;
                    i(this, n);
                    var s = "There was an error while connecting to the wallet. \n    Please ensure that you have created a wallet inside of your ".concat(t, " app and that your network or account has a proper configuration. \n    The error coming from this wallet is: ").concat(r, ".");
                    return (o = e.call(this, s)).name = "WalletConnectError", o
                }
                return o(n)
            }(a(Error)),
            A = function(t) {
                s(n, t);
                var e = u(n);

                function n(t, r) {
                    var o;
                    i(this, n);
                    var s = "You have tried to call functions on ".concat(g(r), ", while the network type is limited to ").concat(g(t), ".");
                    return (o = e.call(this, s)).name = "WrongNetworkTypeError", o
                }
                return o(n)
            }(a(Error)),
            p = function(t) {
                s(n, t);
                var e = u(n);

                function n(t) {
                    var r;
                    i(this, n);
                    var o = "It seems that the API of ".concat(g(t), " is not cip30 compatible.");
                    return (r = e.call(this, o)).name = "WalletNotCip30CompatibleError", r
                }
                return o(n)
            }(a(Error)),
            y = function(t) {
                s(n, t);
                var e = u(n);

                function n(t) {
                    var r;
                    i(this, n);
                    var o = "It seems that the API of ".concat(g(t), " is not injected and window.cardano.").concat(t, " is not available.");
                    return (r = e.call(this, o)).name = "ExtensionNotInjectedError", r
                }
                return o(n)
            }(a(Error)),
            w = function(t) {
                s(n, t);
                var e = u(n);

                function n(t) {
                    var r;
                    return i(this, n), (r = e.call(this, "The wallet ".concat(t, " is not installed."))).name = "WalletNotInstalledError", r
                }
                return o(n)
            }(a(Error)),
            v = function(t) {
                s(n, t);
                var e = u(n);

                function n(t) {
                    var r;
                    i(this, n);
                    var o = "".concat(g(t), " was not found. Please check if it is installed correctly.");
                    return (r = e.call(this, o)).name = "WalletExtensionNotFoundError", r
                }
                return o(n)
            }(a(Error)),
            b = function(t) {
                s(n, t);
                var e = u(n);

                function n(t) {
                    var r;
                    i(this, n);
                    var o = "Enablement of ".concat(g(t), " failed. Please check your setup.");
                    return (r = e.call(this, o)).name = "EnablementFailedError", r
                }
                return o(n)
            }(a(Error)),
            C = n(786),
            m = n(816),
            E = function(t) {
                var e = window.cardano;
                return void 0 !== e && Object.keys(e).includes(t)
            },
            M = function(t) {
                var e, n = (t = t.toLowerCase()).charAt(0),
                    r = Number(t.charAt(1)),
                    o = m.lW.from(t, "hex"),
                    i = C.gW.toWords(o);
                if (["e", "f"].includes(n)) {
                    if (r === B.MAINNET) e = "stake";
                    else {
                        if (r !== B.TESTNET) throw new TypeError("Unsupported network type");
                        e = "stake_test"
                    }
                    return C.gW.encode(e, i, 1e3)
                }
                if (r === B.MAINNET) e = "addr";
                else {
                    if (r !== B.TESTNET) throw new TypeError("Unsupported network type");
                    e = "addr_test"
                }
                return C.gW.encode(e, i, 1e3)
            },
            B = function(t) {
                return t[t.MAINNET = 1] = "MAINNET", t[t.TESTNET = 0] = "TESTNET", t
            }({}),
            I = ["flint"],
            D = "https://flint-wallet.app.link/browse?dappUrl=",
            N = "https://chrome.google.com/webstore/detail/",
            j = {
                NAMI: {
                    id: "lpfcbjknijpeeillifnkikgncikgfhdo",
                    name: "nami"
                },
                FLINT: {
                    id: "hnhobjmcibchnmglfbldbfabcgaknlkj",
                    name: "flint-wallet"
                },
                TYPHON: {
                    id: "kfdniefadaanbjodldohaedphafoffoh",
                    name: "typhon-wallet"
                },
                YOROI: {
                    id: "ffnbelfdoeiohenkjibnmadjiehjhajb",
                    name: "yoroi"
                },
                ETERNL: {
                    id: "gafhhkghbfjjkeiendhlofajokpaflmk",
                    name: "eternl"
                },
                GEROWALLET: {
                    id: "bgpipimickeadkjlklgciifhnalhdjhe",
                    name: "gerowallet"
                },
                NUFI: {
                    id: "gpnihlnnodeiiaakbikldcihojploeca",
                    name: "gerowallet"
                },
                LACE: {
                    id: "gafhhkghbfjjkeiendhlofajokpaflmk",
                    name: "lace"
                },
                EXODUS: {
                    id: "aholpfdialjgjfhomihkjbmgjidlcdno",
                    name: "exodus"
                }/*,
                NAUTILUS: {
                	id: "gjlmehlldlphhljhpnlddaodbjjcchai",
                	name: "nautilus"
                }*/
            },
            U = function(t) {
                var e = window.cardano || {};
                if (void 0 === e[t.toLowerCase()]) {
                    var n = [{
                        name: "nami",
                        icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 486.17 499.86'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%23349ea3;%7D%3C/style%3E%3C/defs%3E%3Cg id='Layer_2' data-name='Layer 2'%3E%3Cg id='Layer_1-2' data-name='Layer 1'%3E%3Cpath id='path16' class='cls-1' d='M73.87,52.15,62.11,40.07A23.93,23.93,0,0,1,41.9,61.87L54,73.09,486.17,476ZM102.4,168.93V409.47a23.76,23.76,0,0,1,32.13-2.14V245.94L395,499.86h44.87Zm303.36-55.58a23.84,23.84,0,0,1-16.64-6.68v162.8L133.46,15.57H84L421.28,345.79V107.6A23.72,23.72,0,0,1,405.76,113.35Z'/%3E%3Cpath id='path18' class='cls-1' d='M38.27,0A38.25,38.25,0,1,0,76.49,38.27v0A38.28,38.28,0,0,0,38.27,0ZM41.9,61.8a22,22,0,0,1-3.63.28A23.94,23.94,0,1,1,62.18,38.13V40A23.94,23.94,0,0,1,41.9,61.8Z'/%3E%3Cpath id='path20' class='cls-1' d='M405.76,51.2a38.24,38.24,0,0,0,0,76.46,37.57,37.57,0,0,0,15.52-3.3A38.22,38.22,0,0,0,405.76,51.2Zm15.52,56.4a23.91,23.91,0,1,1,8.39-18.18A23.91,23.91,0,0,1,421.28,107.6Z'/%3E%3Cpath id='path22' class='cls-1' d='M134.58,390.81A38.25,38.25,0,1,0,157.92,426a38.24,38.24,0,0,0-23.34-35.22Zm-15,59.13A23.91,23.91,0,1,1,143.54,426a23.9,23.9,0,0,1-23.94,23.91Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
                    }, {
                        name: "flint",
                        icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkwIiBoZWlnaHQ9IjE5MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSJub25lIj4KIDxnPgogIDx0aXRsZT5MYXllciAxPC90aXRsZT4KICA8cGF0aCBkPSJtNTYuMDExLDU5LjM4NWw0My40NjIyLC00NC4wODMzYzIuOTcwOCwtMy4yNTM0IDQuMDMxOCwtMi45MzY1IDUuMDQ0OCwwLjc4NzJsMC4zODgsMzEuNDg4MWMtMC4xMDgsNC45MTM2IC0wLjQ2NSw3LjAzMjYgLTEuOTQsOS4wNTI4bC0yNi4zODgxLDI3LjE1ODVjLTMuNDUwNCw0LjI2NjcgLTIuOTc2OSw1Ljk2OTggLTMuMTA0NCw3Ljg3MmMtMC4xMjc2LDEuOTAyMiAzLjM1NzQsNy40NDg0IDkuMzEzMyw3Ljg3MjFjMCwwIDE2LjE1MDUsMC4wMDMzIDE3Ljg1MDIsMGMxLjcsLTAuMDAzNCAyLjg5MSwyLjczNDYgMCw1LjUxMDZsLTM2LjQ3NjksMzYuNjA1Yy00LjUxNDMsNC4yNTIgLTcuMDY4LDQuMjQgLTExLjY0MTYsMi43NTVjLTcuMDE5NiwtMy45MzUgLTcuMTQ1LC03LjU2NyAtNy4zNjM4LC0xMy45MDFsLTAuMDA5MywtMC4yNjlsMCwtNDAuMTQ3MWMtMC4yNDMxLC0xMi43OTgzIDEuNTg2NiwtMTkuNjE4MSAxMC44NjU2LC0zMC43MDA5eiIgZmlsbD0iI0ZGNjEwMCIgaWQ9InN2Z18xIi8+CiAgPHBhdGggZD0ibTEzNC43MSwxMzEuNTlsLTQ0Ljc3ODgsNDQuMDgzYy0zLjA2MTEsMy4yNTQgLTQuMTU0LDIuOTM3IC01LjE5NzYsLTAuNzg3bC0wLjM5OTgsLTMxLjQ4OGMwLjExMDcsLTQuOTEzIC0wLjA3NTMsLTIuOTk4NTcgNi4zNTAyNiwtMTAuOTI0MjRsMjIuODM1OTQsLTI1LjI4Njc2YzMuNTU1LC00LjI2NyAzLjA2NywtNS45NyAzLjE5OSwtNy44NzIyYzAuMTMxLC0xLjkwMjIgLTMuNDU5LC03LjQ0ODQgLTkuNTk2LC03Ljg3MjFjMCwwIC0xNi42Mzk3LC0wLjAwMzMgLTE4LjM5MTMsMGMtMS43NTE1LDAuMDAzNCAtMi45Nzg3LC0yLjczNSAwLC01LjUxMDRsMzcuNTgyMywtMzYuNjA1YzQuNjUxLC00LjI1MjMgNy4yODMsLTQuMjQwNSAxMS45OTUsLTIuNzU1MmM3LjIzMiwzLjkzNSA3LjM2MSw3LjU2NzQgNy41ODcsMTMuOTAxM2wwLjAwOSwwLjI2ODRsMCw0MC4xNDcyYzAuMjUxLDEyLjc5OSAtMS42MzQsMTkuNjE4IC0xMS4xOTUsMzAuNzAxeiIgZmlsbD0iI0ZGNjEwMCIgaWQ9InN2Z18yIi8+CiA8L2c+Cgo8L3N2Zz4="
                    }, {
                        name: "yoroi",
                        icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzIiIGhlaWdodD0iNjMiIHZpZXdCb3g9IjAgMCA3MiA2MyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzExODRfODQyNDApIj4KPHBhdGggZD0iTTU1LjYyNzEgNDguOTEzNkw0OS45MjEgNTIuODcxMkw3LjkwMjMyIDIzLjg2MjNDNy45MDIzMiAyMy44MDU2IDcuOTAyMzIgMjMuNzQ4OCA3Ljg4NTYgMjMuNjkyVjIxLjEwMzdDNy44ODU2IDIwLjI2NDMgNy44ODU2IDE5LjQyNjEgNy44ODU2IDE4LjU4ODlWMTUuOTUzOUw1NS42MjcxIDQ4LjkxMzZaTTQzLjkwMDYgMTEuNDc1M0M0MS4zNjM1IDEzLjIxMTkgMzguODAyOSAxNC45MTUyIDM2LjI2NTggMTYuNjUxOUMzNi4xMzk2IDE2Ljc2NjYgMzUuOTc1MSAxNi44MzAyIDM1LjgwNDQgMTYuODMwMkMzNS42MzM4IDE2LjgzMDIgMzUuNDY5MyAxNi43NjY2IDM1LjM0MzEgMTYuNjUxOUMzMi4yMDc2IDE0LjQ3MSAyOS4wNTU0IDEyLjMxMDIgMjUuOTE2NSAxMC4xNDYxQzIyLjYxMzkgNy44NTUwMyAxOS4zMTM0IDUuNTU3MyAxNi4wMTUyIDMuMjUyODlMMTEuMzMyIDBIMEMwLjYwMTY5OSAwLjQyMDgwNSAxLjA5NjQzIDAuNzc0ODE2IDEuNTk0NSAxLjExODgxTDEwLjQ3NjMgNy4yNzA1OEMxMy40MDQ1IDkuMzA1NTkgMTYuMzMxNyAxMS4zNDA2IDE5LjI1NzcgMTMuMzc1NkMyMi4wMTIyIDE1LjI4OTMgMjQuNzU5OSAxNy4yMTI5IDI3LjUxNzcgMTkuMTIzM0MzMC4xMzUxIDIwLjkzNjcgMzIuNzU5MiAyMi43MzAyIDM1LjM3NjYgMjQuNTQ3QzM1LjQ4MjMgMjQuNjQyNyAzNS42MTk5IDI0LjY5NTggMzUuNzYyNyAyNC42OTU4QzM1LjkwNTQgMjQuNjk1OCAzNi4wNDMgMjQuNjQyNyAzNi4xNDg4IDI0LjU0N0MzOC4yNjE0IDIzLjEwMDkgNDAuMzk3NCAyMS42NzgyIDQyLjUgMjAuMjMyMUM0Ny43MzI2IDE2LjY0OTYgNTIuOTYwNyAxMy4wNjE3IDU4LjE4NDMgOS40NjgxMkw2OS42MDMyIDEuNjY5ODZDNzAuMzkyMSAxLjEzMjE3IDcxLjE3NzcgMC41ODQ0NTIgNzIgMEg2MC42MzQ2QzU1LjA1NDQgMy44MjI4NyA0OS40NzY0IDcuNjQ3OTcgNDMuOTAwNiAxMS40NzUzWk03Ljk0NTc3IDM1LjI0NzRDNy45MjA5NyAzNS4yOTU1IDcuOTAwODIgMzUuMzQ1OCA3Ljg4NTYgMzUuMzk3N1Y0MC4xNTM1QzcuODg1NiA0MS4xMDIgNy44ODU2IDQyLjA1MDUgNy44ODU2IDQyLjk5NTZDNy44ODgxNCA0My4wNTMzIDcuOTAxNzYgNDMuMTEgNy45MjU3MiA0My4xNjI2TDM1Ljk3MTYgNjIuNTMzSDM1Ljk5ODNMNDEuNzA0NCA1OC41Nzg4TDcuOTQ1NzcgMzUuMjQ3NFpNNjMuOTc0IDE1Ljk3MDZMNDMuMTAxNyAzMC4zOTE1QzQzLjE2NzYgMzAuNDgwNCA0My4yNDE1IDMwLjU2MzEgNDMuMzIyMyAzMC42Mzg2QzQ1LjA4NzMgMzEuODg3NyA0Ni44NTM0IDMzLjEzMTIgNDguNjIwNiAzNC4zNjkxQzQ4LjY3ODkgMzQuNDAwNCA0OC43NDU3IDM0LjQxMjEgNDguODExMiAzNC40MDI1TDYzLjkyMzkgMjMuOTQ5MkM2My45NDY2IDIzLjkwNDggNjMuOTYzNCAyMy44NTc2IDYzLjk3NCAyMy44MDg5VjE1Ljk3MDZaTTYzLjk5MDcgMzUuNTUxNEM2MS42MjA3IDM3LjE4NDUgNTkuMzM0MiAzOC43NjQyIDU3LjAyMSA0MC4zNjM5TDYyLjQ0MyA0NC4yMDQ2TDYzLjk5MDcgNDMuMTMyNVYzNS41NTE0WiIgZmlsbD0idXJsKCNwYWludDBfbGluZWFyXzExODRfODQyNDApIi8+CjwvZz4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhcl8xMTg0Xzg0MjQwIiB4MT0iOS4xNTU4NiIgeTE9IjQ0LjM4NDkiIHgyPSI2Mi43NDE3IiB5Mj0iLTkuMjQ5ODQiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzFBNDRCNyIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM0NzYwRkYiLz4KPC9saW5lYXJHcmFkaWVudD4KPGNsaXBQYXRoIGlkPSJjbGlwMF8xMTg0Xzg0MjQwIj4KPHJlY3Qgd2lkdGg9IjcyIiBoZWlnaHQ9IjYyLjUyNjMiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg=="
                    }, {
                        name: "eternl",
                    	icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDcuMS1jMDAwIDc5LmVkYTJiM2ZhYywgMjAyMS8xMS8xNy0xNzoyMzoxOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4ZmU4ODM0My1iMjExLTQ2YWEtYmE3MS0xZWFiZmZkNWZjMzEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NURCQTYwMDhBMTI1MTFFQzhBMjdGRTQzMjI4NjJBRDIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NURCQTYwMDdBMTI1MTFFQzhBMjdGRTQzMjI4NjJBRDIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIzLjEgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1YzY1MGU0NC04MzE3LTQxMjMtOGFlNy03ZWQyZTVlYmVhMTciIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo0N2NhMTg2Yy04YThlLThkNDYtYWE3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"
                    }, {
                        name: "lace",
                        icon: "data:image/svg+xml,%3Csvg width='45' height='45' viewBox='0 0 45 45' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7.20581 19.7194C6.97849 20.2972 6.78249 20.8867 6.61867 21.4856C5.89494 24.1253 5.77235 26.8937 6.25994 29.5871C6.28266 29.721 6.30896 29.855 6.33766 29.9877C6.4405 30.4971 6.56725 31.0065 6.71553 31.5052C6.87936 32.06 7.07427 32.6185 7.29789 33.1637C8.7964 36.8437 11.4627 39.9293 14.8864 41.9457C15.6873 42.4187 16.5242 42.8281 17.3892 43.1702C20.6506 44.4602 24.2155 44.7792 27.6541 44.0885C31.0927 43.3979 34.258 41.7272 36.7683 39.2778C38.3477 37.7378 39.6295 35.9197 40.5494 33.9147C40.3927 34.0797 40.2313 34.2435 40.0711 34.4038C37.4141 37.0117 34.0672 38.8061 30.4246 39.5756C30.2596 39.6569 30.0922 39.7311 29.9235 39.8052C27.3481 40.9225 24.5061 41.2775 21.735 40.8279C18.9638 40.3784 16.3798 39.1432 14.2897 37.2689C14.0505 37.0561 13.8182 36.8336 13.5926 36.6017L13.4909 36.4952C11.4347 34.3597 10.0778 31.6485 9.60099 28.7226C9.55794 28.4603 9.52167 28.1964 9.49217 27.9309C9.43497 27.4039 9.40583 26.8742 9.40488 26.3441C9.39359 23.459 10.2366 20.6351 11.8276 18.2282C12.2275 17.62 12.6732 17.0431 13.1609 16.5027C13.3666 16.2743 13.5818 16.0471 13.8066 15.8283C16.4992 13.1837 20.1109 11.6838 23.8848 11.643C23.9434 11.643 24.0115 11.643 24.0785 11.643H24.2339C27.4415 11.6683 30.5515 12.7496 33.0828 14.7198C32.9951 14.3953 32.8959 14.0741 32.7851 13.756C32.6954 13.5049 32.6009 13.2597 32.4969 13.017C31.9158 11.6256 31.0986 10.3452 30.0814 9.23227L30.0228 9.18803C29.1693 8.89153 28.2941 8.66125 27.4052 8.49925C25.1046 8.07597 22.7442 8.09749 20.4516 8.56263C19.3778 8.77909 18.3263 9.09412 17.3103 9.50372C16.8212 9.69983 16.3453 9.91507 15.8957 10.1447C14.904 10.6473 13.9608 11.2406 13.0784 11.9168L12.9994 11.9766C12.4412 12.4128 11.9078 12.8799 11.4019 13.3757C10.2717 14.4804 9.29155 15.7287 8.48651 17.0887C8.02665 17.8674 7.62689 18.6801 7.29071 19.5197L7.28114 19.7182L7.20581 19.7194ZM18.1521 5.9534C17.0596 5.95245 15.9692 6.05172 14.8948 6.24996C14.7537 6.27268 14.6174 6.29899 14.481 6.33008C13.9788 6.43292 13.473 6.56086 12.9719 6.71153C12.6802 6.79644 12.3896 6.89091 12.1014 6.99135C11.8132 7.0918 11.5477 7.19464 11.2739 7.30585C7.5843 8.79264 4.49573 11.4672 2.49676 14.9063C2.24206 15.3392 1.99931 15.7948 1.77929 16.26C1.60231 16.6295 1.43609 17.0061 1.28662 17.3828C-0.413844 21.6522 -0.429267 26.4081 1.24347 30.6884C2.91621 34.9687 6.15224 38.4539 10.2969 40.439L10.5481 40.5585C10.3806 40.3995 10.2144 40.2369 10.053 40.0719C7.44279 37.411 5.64753 34.0595 4.87879 30.4122C4.81063 30.2926 4.72334 30.1001 4.63963 29.9064C4.5069 29.6015 4.38732 29.2906 4.27491 28.9725C3.6319 27.1539 3.35445 25.2262 3.45849 23.3001C3.56253 21.374 4.04602 19.4875 4.88118 17.7487C5.16523 17.1562 5.48717 16.5827 5.84499 16.0316C6.24791 15.4151 6.69723 14.8303 7.18907 14.2821C7.4354 14.0059 7.69011 13.7404 7.95796 13.4857C8.45652 13.0044 8.99012 12.5607 9.55435 12.1584C10.4163 11.5414 11.343 11.0202 12.3178 10.6039C14.603 8.86233 17.2524 7.66007 20.0678 7.08702C21.112 6.8698 22.1722 6.73862 23.2379 6.6948L22.9987 6.62544C21.4217 6.1797 19.7909 5.95356 18.1521 5.9534V5.9534ZM21.2325 37.7616L21.4717 37.8273C24.1094 38.5547 26.8767 38.6805 29.5696 38.1957L29.6437 38.1825C29.7633 38.1598 29.8829 38.1383 30.0025 38.1119C30.4975 38.0127 30.9866 37.8883 31.5056 37.7341C32.0246 37.5798 32.5411 37.404 33.0601 37.196L33.2371 37.4351L33.1295 37.1673C35.3219 36.2836 37.3184 34.976 39.0044 33.3192C40.1359 32.2115 41.1179 30.9609 41.9258 29.5991C42.3923 28.8074 42.7973 27.9811 43.1371 27.1274C44.4487 23.8612 44.7818 20.2839 44.0958 16.8317C43.4098 13.3795 41.7342 10.2015 39.2735 7.68491V7.68491C37.7389 6.11162 35.9283 4.83362 33.9319 3.91457C36.1679 6.04959 37.8668 8.68359 38.8896 11.6011C39.1754 12.4129 39.4091 13.2421 39.5892 14.0836C39.6537 14.2032 39.7386 14.3897 39.8188 14.5751C40.2832 15.6624 40.6144 16.8019 40.8053 17.9688C40.9355 18.7637 41.0011 19.5679 41.0014 20.3735C41.007 23.2506 40.1648 26.0655 38.5799 28.4667C38.1801 29.0749 37.734 29.6514 37.2454 30.191C37.0397 30.4206 36.8245 30.6478 36.5997 30.8666L36.4956 30.9647C35.226 32.1895 33.7442 33.1733 32.1226 33.8681C30.5316 35.063 28.7658 36.0052 26.8874 36.6614C26.0713 36.9493 25.2372 37.1838 24.3906 37.3634C23.3504 37.5813 22.2942 37.7149 21.2325 37.7628V37.7616ZM14.3973 35.2504C15.2548 35.5521 16.1343 35.7867 17.0281 35.9523C19.3407 36.3904 21.7171 36.368 24.0211 35.8866C24.8231 35.719 25.6132 35.4989 26.3864 35.2277C26.659 35.132 26.9281 35.0292 27.1912 34.9228C27.6539 34.7362 28.1047 34.5305 28.534 34.3129C31.6453 32.7525 34.2367 30.3223 35.9934 27.3175C36.2457 26.8918 36.4873 26.4362 36.7109 25.9615C36.8807 25.6027 37.0349 25.2512 37.1808 24.8924L37.2012 24.8362C38.4673 21.6854 38.8136 18.2401 38.1997 14.9003V14.892C38.1793 14.7616 38.153 14.6337 38.1243 14.5045C38.0239 14.0071 37.8959 13.4953 37.7417 12.9799C37.6544 12.6869 37.5623 12.3964 37.4595 12.1058C37.365 11.8403 37.2669 11.5784 37.1605 11.3201C35.6856 7.63287 33.0272 4.54032 29.6031 2.52864C29.1415 2.2548 28.668 2.00369 28.1968 1.77888C27.8488 1.61266 27.4985 1.45601 27.1421 1.31491C22.8673 -0.40841 18.0966 -0.438843 13.8002 1.2298C9.50371 2.89845 6.00412 6.14088 4.01303 10.2977C3.97596 10.3755 3.93889 10.4532 3.90302 10.5369C6.03985 8.29653 8.67675 6.59391 11.598 5.56835C12.404 5.28601 13.2267 5.05359 14.0613 4.8724C14.194 4.79946 14.3937 4.70858 14.597 4.62368C14.8852 4.5041 15.1806 4.38452 15.4807 4.28048C16.2996 3.9932 17.1418 3.77716 17.9979 3.63475C21.6437 3.04462 25.3781 3.84571 28.4611 5.87926C29.0651 6.27329 29.6379 6.71304 30.1747 7.19464C30.4425 7.4338 30.7016 7.68212 30.9519 7.93962C32.1751 9.21219 33.1575 10.6958 33.8517 12.3186C33.9821 12.6247 34.1029 12.9333 34.2105 13.2502C34.498 14.0619 34.7133 14.8974 34.8538 15.747C34.9004 16.0112 34.9351 16.2803 34.965 16.5482C35.2664 19.2655 34.7947 22.0127 33.6042 24.4739C33.0016 25.7325 32.2247 26.8999 31.2963 27.9417C29.9367 29.4529 28.2794 30.6668 26.4284 31.5072C24.5774 32.3476 22.5728 32.7964 20.5401 32.8253C19.8147 32.8353 19.0896 32.7901 18.371 32.6902C16.8586 32.4808 15.388 32.037 14.0123 31.3748C13.077 30.9268 12.1909 30.3826 11.3684 29.7509C11.9155 31.8031 12.9543 33.691 14.3949 35.2516L14.3973 35.2504ZM10.963 27.3582C12.0346 28.4496 13.2893 29.3449 14.67 30.0033C14.9777 30.1507 15.2894 30.2859 15.6051 30.4086C13.3915 28.0523 12.0214 25.0287 11.7092 21.8109C11.0674 23.5868 10.813 25.4794 10.963 27.3617V27.3582ZM28.839 14.0382C31.0416 16.3937 32.4128 19.4053 32.7432 22.6132C33.3848 20.8547 33.6417 18.9789 33.4966 17.1126V17.1066C32.1808 15.7632 30.5926 14.7169 28.839 14.0382V14.0382Z' fill='url(%23paint0_radial_7152_190498)'/%3E%3Cdefs%3E%3CradialGradient id='paint0_radial_7152_190498' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate(22.219 22.2222) scale(22.2239)'%3E%3Cstop stop-color='%23FDC300'/%3E%3Cstop offset='0.11' stop-color='%23FDC205'/%3E%3Cstop offset='0.25' stop-color='%23FDBF13'/%3E%3Cstop offset='0.39' stop-color='%23FDB92B'/%3E%3Cstop offset='0.54' stop-color='%23FEB24C'/%3E%3Cstop offset='0.7' stop-color='%23FEA977'/%3E%3Cstop offset='0.86' stop-color='%23FF9DAA'/%3E%3Cstop offset='1' stop-color='%23FF92DE'/%3E%3C/radialGradient%3E%3C/defs%3E%3C/svg%3E%0A"
                    },/* {
                        name: "nautilus",
                        icon: "data:image/svg+xml,%3Csvg width='45' height='45' viewBox='0 0 45 45' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7.20581 19.7194C6.97849 20.2972 6.78249 20.8867 6.61867 21.4856C5.89494 24.1253 5.77235 26.8937 6.25994 29.5871C6.28266 29.721 6.30896 29.855 6.33766 29.9877C6.4405 30.4971 6.56725 31.0065 6.71553 31.5052C6.87936 32.06 7.07427 32.6185 7.29789 33.1637C8.7964 36.8437 11.4627 39.9293 14.8864 41.9457C15.6873 42.4187 16.5242 42.8281 17.3892 43.1702C20.6506 44.4602 24.2155 44.7792 27.6541 44.0885C31.0927 43.3979 34.258 41.7272 36.7683 39.2778C38.3477 37.7378 39.6295 35.9197 40.5494 33.9147C40.3927 34.0797 40.2313 34.2435 40.0711 34.4038C37.4141 37.0117 34.0672 38.8061 30.4246 39.5756C30.2596 39.6569 30.0922 39.7311 29.9235 39.8052C27.3481 40.9225 24.5061 41.2775 21.735 40.8279C18.9638 40.3784 16.3798 39.1432 14.2897 37.2689C14.0505 37.0561 13.8182 36.8336 13.5926 36.6017L13.4909 36.4952C11.4347 34.3597 10.0778 31.6485 9.60099 28.7226C9.55794 28.4603 9.52167 28.1964 9.49217 27.9309C9.43497 27.4039 9.40583 26.8742 9.40488 26.3441C9.39359 23.459 10.2366 20.6351 11.8276 18.2282C12.2275 17.62 12.6732 17.0431 13.1609 16.5027C13.3666 16.2743 13.5818 16.0471 13.8066 15.8283C16.4992 13.1837 20.1109 11.6838 23.8848 11.643C23.9434 11.643 24.0115 11.643 24.0785 11.643H24.2339C27.4415 11.6683 30.5515 12.7496 33.0828 14.7198C32.9951 14.3953 32.8959 14.0741 32.7851 13.756C32.6954 13.5049 32.6009 13.2597 32.4969 13.017C31.9158 11.6256 31.0986 10.3452 30.0814 9.23227L30.0228 9.18803C29.1693 8.89153 28.2941 8.66125 27.4052 8.49925C25.1046 8.07597 22.7442 8.09749 20.4516 8.56263C19.3778 8.77909 18.3263 9.09412 17.3103 9.50372C16.8212 9.69983 16.3453 9.91507 15.8957 10.1447C14.904 10.6473 13.9608 11.2406 13.0784 11.9168L12.9994 11.9766C12.4412 12.4128 11.9078 12.8799 11.4019 13.3757C10.2717 14.4804 9.29155 15.7287 8.48651 17.0887C8.02665 17.8674 7.62689 18.6801 7.29071 19.5197L7.28114 19.7182L7.20581 19.7194ZM18.1521 5.9534C17.0596 5.95245 15.9692 6.05172 14.8948 6.24996C14.7537 6.27268 14.6174 6.29899 14.481 6.33008C13.9788 6.43292 13.473 6.56086 12.9719 6.71153C12.6802 6.79644 12.3896 6.89091 12.1014 6.99135C11.8132 7.0918 11.5477 7.19464 11.2739 7.30585C7.5843 8.79264 4.49573 11.4672 2.49676 14.9063C2.24206 15.3392 1.99931 15.7948 1.77929 16.26C1.60231 16.6295 1.43609 17.0061 1.28662 17.3828C-0.413844 21.6522 -0.429267 26.4081 1.24347 30.6884C2.91621 34.9687 6.15224 38.4539 10.2969 40.439L10.5481 40.5585C10.3806 40.3995 10.2144 40.2369 10.053 40.0719C7.44279 37.411 5.64753 34.0595 4.87879 30.4122C4.81063 30.2926 4.72334 30.1001 4.63963 29.9064C4.5069 29.6015 4.38732 29.2906 4.27491 28.9725C3.6319 27.1539 3.35445 25.2262 3.45849 23.3001C3.56253 21.374 4.04602 19.4875 4.88118 17.7487C5.16523 17.1562 5.48717 16.5827 5.84499 16.0316C6.24791 15.4151 6.69723 14.8303 7.18907 14.2821C7.4354 14.0059 7.69011 13.7404 7.95796 13.4857C8.45652 13.0044 8.99012 12.5607 9.55435 12.1584C10.4163 11.5414 11.343 11.0202 12.3178 10.6039C14.603 8.86233 17.2524 7.66007 20.0678 7.08702C21.112 6.8698 22.1722 6.73862 23.2379 6.6948L22.9987 6.62544C21.4217 6.1797 19.7909 5.95356 18.1521 5.9534V5.9534ZM21.2325 37.7616L21.4717 37.8273C24.1094 38.5547 26.8767 38.6805 29.5696 38.1957L29.6437 38.1825C29.7633 38.1598 29.8829 38.1383 30.0025 38.1119C30.4975 38.0127 30.9866 37.8883 31.5056 37.7341C32.0246 37.5798 32.5411 37.404 33.0601 37.196L33.2371 37.4351L33.1295 37.1673C35.3219 36.2836 37.3184 34.976 39.0044 33.3192C40.1359 32.2115 41.1179 30.9609 41.9258 29.5991C42.3923 28.8074 42.7973 27.9811 43.1371 27.1274C44.4487 23.8612 44.7818 20.2839 44.0958 16.8317C43.4098 13.3795 41.7342 10.2015 39.2735 7.68491V7.68491C37.7389 6.11162 35.9283 4.83362 33.9319 3.91457C36.1679 6.04959 37.8668 8.68359 38.8896 11.6011C39.1754 12.4129 39.4091 13.2421 39.5892 14.0836C39.6537 14.2032 39.7386 14.3897 39.8188 14.5751C40.2832 15.6624 40.6144 16.8019 40.8053 17.9688C40.9355 18.7637 41.0011 19.5679 41.0014 20.3735C41.007 23.2506 40.1648 26.0655 38.5799 28.4667C38.1801 29.0749 37.734 29.6514 37.2454 30.191C37.0397 30.4206 36.8245 30.6478 36.5997 30.8666L36.4956 30.9647C35.226 32.1895 33.7442 33.1733 32.1226 33.8681C30.5316 35.063 28.7658 36.0052 26.8874 36.6614C26.0713 36.9493 25.2372 37.1838 24.3906 37.3634C23.3504 37.5813 22.2942 37.7149 21.2325 37.7628V37.7616ZM14.3973 35.2504C15.2548 35.5521 16.1343 35.7867 17.0281 35.9523C19.3407 36.3904 21.7171 36.368 24.0211 35.8866C24.8231 35.719 25.6132 35.4989 26.3864 35.2277C26.659 35.132 26.9281 35.0292 27.1912 34.9228C27.6539 34.7362 28.1047 34.5305 28.534 34.3129C31.6453 32.7525 34.2367 30.3223 35.9934 27.3175C36.2457 26.8918 36.4873 26.4362 36.7109 25.9615C36.8807 25.6027 37.0349 25.2512 37.1808 24.8924L37.2012 24.8362C38.4673 21.6854 38.8136 18.2401 38.1997 14.9003V14.892C38.1793 14.7616 38.153 14.6337 38.1243 14.5045C38.0239 14.0071 37.8959 13.4953 37.7417 12.9799C37.6544 12.6869 37.5623 12.3964 37.4595 12.1058C37.365 11.8403 37.2669 11.5784 37.1605 11.3201C35.6856 7.63287 33.0272 4.54032 29.6031 2.52864C29.1415 2.2548 28.668 2.00369 28.1968 1.77888C27.8488 1.61266 27.4985 1.45601 27.1421 1.31491C22.8673 -0.40841 18.0966 -0.438843 13.8002 1.2298C9.50371 2.89845 6.00412 6.14088 4.01303 10.2977C3.97596 10.3755 3.93889 10.4532 3.90302 10.5369C6.03985 8.29653 8.67675 6.59391 11.598 5.56835C12.404 5.28601 13.2267 5.05359 14.0613 4.8724C14.194 4.79946 14.3937 4.70858 14.597 4.62368C14.8852 4.5041 15.1806 4.38452 15.4807 4.28048C16.2996 3.9932 17.1418 3.77716 17.9979 3.63475C21.6437 3.04462 25.3781 3.84571 28.4611 5.87926C29.0651 6.27329 29.6379 6.71304 30.1747 7.19464C30.4425 7.4338 30.7016 7.68212 30.9519 7.93962C32.1751 9.21219 33.1575 10.6958 33.8517 12.3186C33.9821 12.6247 34.1029 12.9333 34.2105 13.2502C34.498 14.0619 34.7133 14.8974 34.8538 15.747C34.9004 16.0112 34.9351 16.2803 34.965 16.5482C35.2664 19.2655 34.7947 22.0127 33.6042 24.4739C33.0016 25.7325 32.2247 26.8999 31.2963 27.9417C29.9367 29.4529 28.2794 30.6668 26.4284 31.5072C24.5774 32.3476 22.5728 32.7964 20.5401 32.8253C19.8147 32.8353 19.0896 32.7901 18.371 32.6902C16.8586 32.4808 15.388 32.037 14.0123 31.3748C13.077 30.9268 12.1909 30.3826 11.3684 29.7509C11.9155 31.8031 12.9543 33.691 14.3949 35.2516L14.3973 35.2504ZM10.963 27.3582C12.0346 28.4496 13.2893 29.3449 14.67 30.0033C14.9777 30.1507 15.2894 30.2859 15.6051 30.4086C13.3915 28.0523 12.0214 25.0287 11.7092 21.8109C11.0674 23.5868 10.813 25.4794 10.963 27.3617V27.3582ZM28.839 14.0382C31.0416 16.3937 32.4128 19.4053 32.7432 22.6132C33.3848 20.8547 33.6417 18.9789 33.4966 17.1126V17.1066C32.1808 15.7632 30.5926 14.7169 28.839 14.0382V14.0382Z' fill='url(%23paint0_radial_7152_190498)'/%3E%3Cdefs%3E%3CradialGradient id='paint0_radial_7152_190498' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate(22.219 22.2222) scale(22.2239)'%3E%3Cstop stop-color='%23FDC300'/%3E%3Cstop offset='0.11' stop-color='%23FDC205'/%3E%3Cstop offset='0.25' stop-color='%23FDBF13'/%3E%3Cstop offset='0.39' stop-color='%23FDB92B'/%3E%3Cstop offset='0.54' stop-color='%23FEB24C'/%3E%3Cstop offset='0.7' stop-color='%23FEA977'/%3E%3Cstop offset='0.86' stop-color='%23FF9DAA'/%3E%3Cstop offset='1' stop-color='%23FF92DE'/%3E%3C/radialGradient%3E%3C/defs%3E%3C/svg%3E%0A"
                    },*/ {
                        name: "peer-connect",
                        icon: "data:image/svg+xml,%3Csvg%20width%3D%22100%25%22%20height%3D%22100%25%22%20viewBox%3D%220%200%2033%2033%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22m22%2028h-2v1h2zm4%201v-1h2v1h1v-5h-1v-1h-1v3h-3v1h-1v1h2v-1h1v1h-1v1zm-7%200v-2h-1v1h-2v1zm-6-1h-1v1h3v-1h-1v-1h-1zm-2%201h-7v-7h7zm-6-6v5h5v-5zm4%204h-3v-3h3zm4-8h-2v1h-1v1h1v-1h1v6h2v1h1v-2h-2v-2h1v1h1v-1h1v-1h1v-1h-2v1h-2v-1h2v-1h-2zm8-1v-2h1v1h2v-1h4v1h1v-3h-1v1h-2v-1h2v-1h1v-1h-3v1h-1v-1h-1v1h-1v1h-1v-2h-1v2h-1v-2h-1v1h-2v-1h-1v1h-2v1h-1v2h1v-1h1v2h2v-2h1v-1h1v1h1v2h-2v2h3v1h-1v3h-1v-2h-1v2h-2v2h1v-1h1v2h-2v1h2v-1h1v1h1v-2h1v2h1v-1h1v-1h2v-5h-1v-1h1v1h1v2h2v-2h-1v-1h1v1h1v-2h-1v-1h-1v1h-2v-1h-1v2h-1v-1zm0%203v3h3v-3zm2%201h-1v1h1zm6%200h-1v1h1zm-22-2v-1h-1v2h2v-1zm11%200h-1v1h1zm-13-2v-2h-1v5h1v-2h1v-1zm5%201h-2v1h2zm7-1h-2v2h1v-1h1zm-6%200h-1v1h1zm4-1h-2v1h2zm-4-3v-1h-2v1zm1%203h-1v1h1zm-1-1h-1v1h1zm-4%200h-1v1h1zm-1-1h-1v1h1zm1-1h-1v1h1zm17%200v1h1v-1zm-19%200h-1v1h1zm1-1h-1v1h1zm-1-1h-1v1h1zm14%200v-3h-1v2h-1v1zm-1-4v-2h-4v1h-1v1h-1v1h2v2h-1v1h2v-4h1v-1h1v1zm-5%202h-1v1h1zm4%200h-1v1h1zm4%201v-6h-1v1h-1v1h1v4zm-10%200h-7v-7h7zm18%200h-7v-7h7zm-6-6v5h5v-5zm-18%200v5h5v-5zm12%203h-1v1h1zm10%201h-3v-3h3zm-18%200h-3v-3h3zm9-5h-6v3h1v-2h5zm1%201h-1v1h1zm-12%207v2h1v4h1v-2h1v-1h1v1h1v-2h1v-2z%22%2F%3E%0A%3C%2Fsvg%3E"
                    }].find((function(e) {
                        return e.name === t.toLowerCase()
                    }));
                    return n ? n.icon : "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20version%3D%221.1%22%20id%3D%22Layer_1%22%20x%3D%220px%22%20y%3D%220px%22%20viewBox%3D%220%200%20122.88%20101.33%22%20style%3D%22enable-background%3Anew%200%200%20122.88%20101.33%22%20xml%3Aspace%3D%22preserve%22%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E.st0%7Bfill-rule%3Aevenodd%3Bclip-rule%3Aevenodd%3B%7D%3C%2Fstyle%3E%3Cg%3E%3Cpath%20class%3D%22st0%22%20d%3D%22M90.62%2C33.32h18.4v-2.79c-2.88-10.73-10.2-10.66-19.25-10.57c-1.49%2C0.02-2.84%2C0.03-2.92%2C0.03H18.07%20c-1.58%2C0-2.86-1.28-2.86-2.86c0-1.58%2C1.28-2.86%2C2.86-2.86h68.78c2.03%2C0%2C2.46%2C0%2C2.87-0.01c7.74-0.08%2C14.5-0.15%2C19.3%2C4.38v-1.31%20c0-3.2-1.31-6.1-3.42-8.21c-2.11-2.11-5.02-3.42-8.21-3.42H17.34c-3.2%2C0-6.1%2C1.31-8.21%2C3.42c-2.11%2C2.11-3.42%2C5.02-3.42%2C8.21v66.64%20c0%2C3.2%2C1.31%2C6.1%2C3.42%2C8.21c2.11%2C2.11%2C5.02%2C3.42%2C8.21%2C3.42h80.04c3.2%2C0%2C6.1-1.31%2C8.21-3.42c2.11-2.11%2C3.42-5.02%2C3.42-8.21v-9.46%20h-18.4c-5.55%2C0-10.6-2.27-14.25-5.92c-3.65-3.65-5.92-8.7-5.92-14.25v-0.87c0-5.55%2C2.27-10.6%2C5.92-14.25%20C80.02%2C35.59%2C85.06%2C33.32%2C90.62%2C33.32L90.62%2C33.32z%20M114.73%2C33.43c2.07%2C0.31%2C3.92%2C1.29%2C5.33%2C2.71c1.74%2C1.74%2C2.81%2C4.14%2C2.81%2C6.78%20v21.6c0%2C2.76-1.12%2C5.26-2.93%2C7.07c-1.39%2C1.39-3.2%2C2.38-5.21%2C2.76v9.63c0%2C4.77-1.95%2C9.11-5.09%2C12.25%20c-3.14%2C3.14-7.48%2C5.09-12.25%2C5.09H17.34c-4.77%2C0-9.11-1.95-12.25-5.09C1.95%2C93.1%2C0%2C88.76%2C0%2C83.99V17.34%20c0-4.77%2C1.95-9.11%2C5.09-12.25C8.23%2C1.95%2C12.57%2C0%2C17.34%2C0h80.04c4.77%2C0%2C9.11%2C1.95%2C12.25%2C5.09c3.14%2C3.14%2C5.09%2C7.48%2C5.09%2C12.25V33.43%20L114.73%2C33.43z%20M88.14%2C46.11c4.05%2C0%2C7.33%2C3.28%2C7.33%2C7.33c0%2C4.05-3.28%2C7.33-7.33%2C7.33c-4.05%2C0-7.33-3.28-7.33-7.33%20C80.81%2C49.39%2C84.09%2C46.11%2C88.14%2C46.11L88.14%2C46.11z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                }
                return e[t.toLowerCase()].icon
            };

        function k(t) {
            return k = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            }, k(t)
        }

        function L(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
            return r
        }

        function O(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, z(r.key), r)
            }
        }

        function z(t) {
            var e = function(t, e) {
                if ("object" !== k(t) || null === t) return t;
                var n = t[Symbol.toPrimitive];
                if (void 0 !== n) {
                    var r = n.call(t, "string");
                    if ("object" !== k(r)) return r;
                    throw new TypeError("@@toPrimitive must return a primitive value.")
                }
                return String(t)
            }(t);
            return "symbol" === k(e) ? e : String(e)
        }
        var Q = function() {
                function t(e) {
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, t),
                    function(t, e, n) {
                        (e = z(e)) in t ? Object.defineProperty(t, e, {
                            value: n,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0
                        }) : t[e] = n
                    }(this, "observers", new Array), this.value = e
                }
                var e, n;
                return e = t, (n = [{
                    key: "subscribe",
                    value: function(t) {
                        this.observers.push(t)
                    }
                }, {
                    key: "unsubscribe",
                    value: function(t) {
                        this.observers = this.observers.filter((function(e) {
                            return e !== t
                        }))
                    }
                }, {
                    key: "get",
                    value: function() {
                        return this.value
                    }
                }, {
                    key: "set",
                    value: function(t) {
                        if (this.value !== t) {
                            this.value = t;
                            var e, n = function(t, e) {
                                var n = "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
                                if (!n) {
                                    if (Array.isArray(t) || (n = function(t, e) {
                                            if (t) {
                                                if ("string" == typeof t) return L(t, e);
                                                var n = Object.prototype.toString.call(t).slice(8, -1);
                                                return "Object" === n && t.constructor && (n = t.constructor.name), "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? L(t, e) : void 0
                                            }
                                        }(t)) || e && t && "number" == typeof t.length) {
                                        n && (t = n);
                                        var r = 0,
                                            o = function() {};
                                        return {
                                            s: o,
                                            n: function() {
                                                return r >= t.length ? {
                                                    done: !0
                                                } : {
                                                    done: !1,
                                                    value: t[r++]
                                                }
                                            },
                                            e: function(t) {
                                                throw t
                                            },
                                            f: o
                                        }
                                    }
                                    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                                }
                                var i, s = !0,
                                    u = !1;
                                return {
                                    s: function() {
                                        n = n.call(t)
                                    },
                                    n: function() {
                                        var t = n.next();
                                        return s = t.done, t
                                    },
                                    e: function(t) {
                                        u = !0, i = t
                                    },
                                    f: function() {
                                        try {
                                            s || null == n.return || n.return()
                                        } finally {
                                            if (u) throw i
                                        }
                                    }
                                }
                            }(this.observers);
                            try {
                                for (n.s(); !(e = n.n()).done;)(0, e.value)(this.value)
                            } catch (t) {
                                n.e(t)
                            } finally {
                                n.f()
                            }
                        }
                    }
                }]) && O(e.prototype, n), Object.defineProperty(e, "prototype", {
                    writable: !1
                }), t
            }(),
            x = function(t) {
                return t.MAINNET = "mainnet", t.TESTNET = "testnet", t
            }({}),
            T = function(t) {
                return t[t.SHOW_UNAVAILABLE = 0] = "SHOW_UNAVAILABLE", t[t.HIDE_UNAVAILABLE = 1] = "HIDE_UNAVAILABLE", t[t.SHOW_UNAVAILABLE_ON_MOBILE = 2] = "SHOW_UNAVAILABLE_ON_MOBILE", t
            }({});

        function F(t) {
            return F = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            }, F(t)
        }

        function S(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, (void 0, o = function(t, e) {
                    if ("object" !== F(t) || null === t) return t;
                    var n = t[Symbol.toPrimitive];
                    if (void 0 !== n) {
                        var r = n.call(t, "string");
                        if ("object" !== F(r)) return r;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return String(t)
                }(r.key), "symbol" === F(o) ? o : String(o)), r)
            }
            var o
        }

        function Y(t) {
            return function(t) {
                if (Array.isArray(t)) return W(t)
            }(t) || function(t) {
                if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t)
            }(t) || function(t, e) {
                if (t) {
                    if ("string" == typeof t) return W(t, e);
                    var n = Object.prototype.toString.call(t).slice(8, -1);
                    return "Object" === n && t.constructor && (n = t.constructor.name), "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? W(t, e) : void 0
                }
            }(t) || function() {
                throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }

        function W(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
            return r
        }
        var R = function(t) {
                return t.length > 1 ? "".concat(t.slice(0, -1).join(", "), " or ").concat(t.slice(-1)[0]) : t[0]
            },
            P = function() {
                return "undefined" != typeof navigator && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
            },
            G = function(t, e, n, r) {
                var o = [],
                    i = T.HIDE_UNAVAILABLE,
                    s = T.SHOW_UNAVAILABLE;
                return o = e === i ? r.filter((function(e) {
                    return t.map((function(t) {
                        return t.toLowerCase()
                    })).includes(e)
                })) : e === s || P() ? t : r.filter((function(e) {
                    return t.map((function(t) {
                        return t.toLowerCase()
                    })).includes(e)
                })), Array.from(new Set([].concat(Y(n.map((function(t) {
                    return t.toLowerCase()
                }))), Y(o))))
            },
            V = function() {
                function t(e) {
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, t), this.interval = 20, this.timeoutId = null, this.onChangeCallback = e, this.wallets = []
                }
                var e, n;
                return e = t, (n = [{
                    key: "checkWallets",
                    value: function() {
                        if (void 0 !== window.cardano) {
                            var t = Object.keys(window.cardano).sort();
                            JSON.stringify(this.wallets) !== JSON.stringify(t) && (this.wallets = t, this.onChangeCallback(this.wallets))
                        } else this.wallets.length > 0 && (this.wallets = [], this.onChangeCallback(this.wallets))
                    }
                }, {
                    key: "start",
                    value: function() {
                        var t = this;
                        this.timeoutId = setTimeout((function() {
                            t.checkWallets(), t.interval < 1e4 && (t.interval = 1.5 * t.interval), t.start()
                        }), this.interval)
                    }
                }, {
                    key: "stop",
                    value: function() {
                        this.timeoutId && clearTimeout(this.timeoutId)
                    }
                }]) && S(e.prototype, n), Object.defineProperty(e, "prototype", {
                    writable: !1
                }), t
            }();
        const H = ["string", "number", "bigint", "symbol"],
            Z = ["Function", "Generator", "AsyncGenerator", "GeneratorFunction", "AsyncGeneratorFunction", "AsyncFunction", "Observable", "Array", "Buffer", "Object", "RegExp", "Date", "Error", "Map", "Set", "WeakMap", "WeakSet", "ArrayBuffer", "SharedArrayBuffer", "DataView", "Promise", "URL", "HTMLElement", "Int8Array", "Uint8Array", "Uint8ClampedArray", "Int16Array", "Uint16Array", "Int32Array", "Uint32Array", "Float32Array", "Float64Array", "BigInt64Array", "BigUint64Array"];
        class K {
            constructor(t, e, n) {
                this.major = t, this.majorEncoded = t << 5, this.name = e, this.terminal = n
            }
            toString() {
                return `Type[${this.major}].${this.name}`
            }
            compare(t) {
                return this.major < t.major ? -1 : this.major > t.major ? 1 : 0
            }
        }
        K.uint = new K(0, "uint", !0), K.negint = new K(1, "negint", !0), K.bytes = new K(2, "bytes", !0), K.string = new K(3, "string", !0), K.array = new K(4, "array", !1), K.map = new K(5, "map", !1), K.tag = new K(6, "tag", !1), K.float = new K(7, "float", !0), K.false = new K(7, "false", !0), K.true = new K(7, "true", !0), K.null = new K(7, "null", !0), K.undefined = new K(7, "undefined", !0), K.break = new K(7, "break", !0);
        class X {
            constructor(t, e, n) {
                this.type = t, this.value = e, this.encodedLength = n, this.encodedBytes = void 0, this.byteValue = void 0
            }
            toString() {
                return `Token[${this.type}].${this.value}`
            }
        }
        const J = globalThis.process && !globalThis.process.browser && globalThis.Buffer && "function" == typeof globalThis.Buffer.isBuffer,
            q = new TextDecoder,
            _ = new TextEncoder;

        function $(t) {
            return J && globalThis.Buffer.isBuffer(t)
        }
        const tt = J ? (t, e, n) => n - e > 64 ? globalThis.Buffer.from(t.subarray(e, n)).toString("utf8") : st(t, e, n) : (t, e, n) => n - e > 64 ? q.decode(t.subarray(e, n)) : st(t, e, n),
            et = J ? t => t.length > 64 ? globalThis.Buffer.from(t) : it(t) : t => t.length > 64 ? _.encode(t) : it(t),
            nt = J ? (t, e, n) => $(t) ? new Uint8Array(t.subarray(e, n)) : t.slice(e, n) : (t, e, n) => t.slice(e, n),
            rt = J ? (t, e) => {
                return t = t.map((t => t instanceof Uint8Array ? t : globalThis.Buffer.from(t))), (n = globalThis.Buffer.concat(t, e)) instanceof Uint8Array ? $(n) ? new Uint8Array(n.buffer, n.byteOffset, n.byteLength) : n : Uint8Array.from(n);
                var n
            } : (t, e) => {
                const n = new Uint8Array(e);
                let r = 0;
                for (let e of t) r + e.length > n.length && (e = e.subarray(0, n.length - r)), n.set(e, r), r += e.length;
                return n
            },
            ot = J ? t => globalThis.Buffer.allocUnsafe(t) : t => new Uint8Array(t);

        function it(t, e = 1 / 0) {
            let n;
            const r = t.length;
            let o = null;
            const i = [];
            for (let s = 0; s < r; ++s) {
                if (n = t.charCodeAt(s), n > 55295 && n < 57344) {
                    if (!o) {
                        if (n > 56319) {
                            (e -= 3) > -1 && i.push(239, 191, 189);
                            continue
                        }
                        if (s + 1 === r) {
                            (e -= 3) > -1 && i.push(239, 191, 189);
                            continue
                        }
                        o = n;
                        continue
                    }
                    if (n < 56320) {
                        (e -= 3) > -1 && i.push(239, 191, 189), o = n;
                        continue
                    }
                    n = 65536 + (o - 55296 << 10 | n - 56320)
                } else o && (e -= 3) > -1 && i.push(239, 191, 189);
                if (o = null, n < 128) {
                    if ((e -= 1) < 0) break;
                    i.push(n)
                } else if (n < 2048) {
                    if ((e -= 2) < 0) break;
                    i.push(n >> 6 | 192, 63 & n | 128)
                } else if (n < 65536) {
                    if ((e -= 3) < 0) break;
                    i.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128)
                } else {
                    if (!(n < 1114112)) throw new Error("Invalid code point");
                    if ((e -= 4) < 0) break;
                    i.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128)
                }
            }
            return i
        }

        function st(t, e, n) {
            const r = [];
            for (; e < n;) {
                const o = t[e];
                let i = null,
                    s = o > 239 ? 4 : o > 223 ? 3 : o > 191 ? 2 : 1;
                if (e + s <= n) {
                    let n, r, u, a;
                    switch (s) {
                        case 1:
                            o < 128 && (i = o);
                            break;
                        case 2:
                            n = t[e + 1], 128 == (192 & n) && (a = (31 & o) << 6 | 63 & n, a > 127 && (i = a));
                            break;
                        case 3:
                            n = t[e + 1], r = t[e + 2], 128 == (192 & n) && 128 == (192 & r) && (a = (15 & o) << 12 | (63 & n) << 6 | 63 & r, a > 2047 && (a < 55296 || a > 57343) && (i = a));
                            break;
                        case 4:
                            n = t[e + 1], r = t[e + 2], u = t[e + 3], 128 == (192 & n) && 128 == (192 & r) && 128 == (192 & u) && (a = (15 & o) << 18 | (63 & n) << 12 | (63 & r) << 6 | 63 & u, a > 65535 && a < 1114112 && (i = a))
                    }
                }
                null === i ? (i = 65533, s = 1) : i > 65535 && (i -= 65536, r.push(i >>> 10 & 1023 | 55296), i = 56320 | 1023 & i), r.push(i), e += s
            }
            return function(t) {
                const e = t.length;
                if (e <= ut) return String.fromCharCode.apply(String, t);
                let n = "",
                    r = 0;
                for (; r < e;) n += String.fromCharCode.apply(String, t.slice(r, r += ut));
                return n
            }(r)
        }
        const ut = 4096,
            at = "CBOR decode error:",
            ct = "CBOR encode error:",
            ft = [];

        function lt(t, e, n) {
            if (t.length - e < n) throw new Error(`${at} not enough data for type`)
        }
        ft[23] = 1, ft[24] = 2, ft[25] = 3, ft[26] = 5, ft[27] = 9;
        const ht = [24, 256, 65536, 4294967296, BigInt("18446744073709551616")];

        function gt(t, e, n) {
            lt(t, e, 1);
            const r = t[e];
            if (!0 === n.strict && r < ht[0]) throw new Error(`${at} integer encoded in more bytes than necessary (strict decode)`);
            return r
        }

        function dt(t, e, n) {
            lt(t, e, 2);
            const r = t[e] << 8 | t[e + 1];
            if (!0 === n.strict && r < ht[1]) throw new Error(`${at} integer encoded in more bytes than necessary (strict decode)`);
            return r
        }

        function At(t, e, n) {
            lt(t, e, 4);
            const r = 16777216 * t[e] + (t[e + 1] << 16) + (t[e + 2] << 8) + t[e + 3];
            if (!0 === n.strict && r < ht[2]) throw new Error(`${at} integer encoded in more bytes than necessary (strict decode)`);
            return r
        }

        function pt(t, e, n) {
            lt(t, e, 8);
            const r = 16777216 * t[e] + (t[e + 1] << 16) + (t[e + 2] << 8) + t[e + 3],
                o = 16777216 * t[e + 4] + (t[e + 5] << 16) + (t[e + 6] << 8) + t[e + 7],
                i = (BigInt(r) << BigInt(32)) + BigInt(o);
            if (!0 === n.strict && i < ht[3]) throw new Error(`${at} integer encoded in more bytes than necessary (strict decode)`);
            if (i <= Number.MAX_SAFE_INTEGER) return Number(i);
            if (!0 === n.allowBigInt) return i;
            throw new Error(`${at} integers outside of the safe integer range are not supported`)
        }

        function yt(t, e) {
            return wt(t, 0, e.value)
        }

        function wt(t, e, n) {
            if (n < ht[0]) {
                const r = Number(n);
                t.push([e | r])
            } else if (n < ht[1]) {
                const r = Number(n);
                t.push([24 | e, r])
            } else if (n < ht[2]) {
                const r = Number(n);
                t.push([25 | e, r >>> 8, 255 & r])
            } else if (n < ht[3]) {
                const r = Number(n);
                t.push([26 | e, r >>> 24 & 255, r >>> 16 & 255, r >>> 8 & 255, 255 & r])
            } else {
                const r = BigInt(n);
                if (!(r < ht[4])) throw new Error(`${at} encountered BigInt larger than allowable range`);
                {
                    const n = [27 | e, 0, 0, 0, 0, 0, 0, 0];
                    let o = Number(r & BigInt(4294967295)),
                        i = Number(r >> BigInt(32) & BigInt(4294967295));
                    n[8] = 255 & o, o >>= 8, n[7] = 255 & o, o >>= 8, n[6] = 255 & o, o >>= 8, n[5] = 255 & o, n[4] = 255 & i, i >>= 8, n[3] = 255 & i, i >>= 8, n[2] = 255 & i, i >>= 8, n[1] = 255 & i, t.push(n)
                }
            }
        }
        yt.encodedSize = function(t) {
            return wt.encodedSize(t.value)
        }, wt.encodedSize = function(t) {
            return t < ht[0] ? 1 : t < ht[1] ? 2 : t < ht[2] ? 3 : t < ht[3] ? 5 : 9
        }, yt.compareTokens = function(t, e) {
            return t.value < e.value ? -1 : t.value > e.value ? 1 : 0
        };
        const vt = BigInt(-1),
            bt = BigInt(1);

        function Ct(t, e) {
            const n = e.value,
                r = "bigint" == typeof n ? n * vt - bt : -1 * n - 1;
            wt(t, e.type.majorEncoded, r)
        }

        function mt(t, e, n, r) {
            lt(t, e, n + r);
            const o = nt(t, e + n, e + n + r);
            return new X(K.bytes, o, n + r)
        }

        function Et(t, e, n, r) {
            return mt(t, e, 1, n)
        }

        function Mt(t) {
            return void 0 === t.encodedBytes && (t.encodedBytes = t.type === K.string ? et(t.value) : t.value), t.encodedBytes
        }

        function Bt(t, e) {
            const n = Mt(e);
            wt(t, e.type.majorEncoded, n.length), t.push(n)
        }

        function It(t, e, n, r, o) {
            const i = n + r;
            lt(t, e, i);
            const s = new X(K.string, tt(t, e + n, e + i), i);
            return !0 === o.retainStringBytes && (s.byteValue = nt(t, e + n, e + i)), s
        }

        function Dt(t, e, n, r) {
            return It(t, e, 1, n, r)
        }
        Ct.encodedSize = function(t) {
            const e = t.value,
                n = "bigint" == typeof e ? e * vt - bt : -1 * e - 1;
            return n < ht[0] ? 1 : n < ht[1] ? 2 : n < ht[2] ? 3 : n < ht[3] ? 5 : 9
        }, Ct.compareTokens = function(t, e) {
            return t.value < e.value ? 1 : t.value > e.value ? -1 : 0
        }, Bt.encodedSize = function(t) {
            const e = Mt(t);
            return wt.encodedSize(e.length) + e.length
        }, Bt.compareTokens = function(t, e) {
            return n = Mt(t), r = Mt(e), n.length < r.length ? -1 : n.length > r.length ? 1 : function(t, e) {
                if ($(t) && $(e)) return t.compare(e);
                for (let n = 0; n < t.length; n++)
                    if (t[n] !== e[n]) return t[n] < e[n] ? -1 : 1;
                return 0
            }(n, r);
            var n, r
        };
        const Nt = Bt;

        function jt(t, e, n, r) {
            return new X(K.array, r, n)
        }

        function Ut(t, e, n, r) {
            return jt(0, 0, 1, n)
        }

        function kt(t, e) {
            wt(t, K.array.majorEncoded, e.value)
        }

        function Lt(t, e, n, r) {
            return new X(K.map, r, n)
        }

        function Ot(t, e, n, r) {
            return Lt(0, 0, 1, n)
        }

        function zt(t, e) {
            wt(t, K.map.majorEncoded, e.value)
        }

        function Qt(t, e, n, r) {
            return new X(K.tag, n, 1)
        }

        function xt(t, e) {
            wt(t, K.tag.majorEncoded, e.value)
        }
        kt.compareTokens = yt.compareTokens, kt.encodedSize = function(t) {
            return wt.encodedSize(t.value)
        }, zt.compareTokens = yt.compareTokens, zt.encodedSize = function(t) {
            return wt.encodedSize(t.value)
        }, xt.compareTokens = yt.compareTokens, xt.encodedSize = function(t) {
            return wt.encodedSize(t.value)
        };

        function Tt(t, e, n) {
            if (n) {
                if (!1 === n.allowNaN && Number.isNaN(t)) throw new Error(`${at} NaN values are not supported`);
                if (!1 === n.allowInfinity && (t === 1 / 0 || t === -1 / 0)) throw new Error(`${at} Infinity values are not supported`)
            }
            return new X(K.float, t, e)
        }

        function Ft(t, e, n) {
            const r = e.value;
            if (!1 === r) t.push([20 | K.float.majorEncoded]);
            else if (!0 === r) t.push([21 | K.float.majorEncoded]);
            else if (null === r) t.push([22 | K.float.majorEncoded]);
            else if (void 0 === r) t.push([23 | K.float.majorEncoded]);
            else {
                let e, i = !1;
                n && !0 === n.float64 || (Rt(r), e = Pt(Wt, 1), r === e || Number.isNaN(r) ? (Wt[0] = 249, t.push(Wt.slice(0, 3)), i = !0) : (Gt(r), e = Vt(Wt, 1), r === e && (Wt[0] = 250, t.push(Wt.slice(0, 5)), i = !0))), i || (o = r, Yt.setFloat64(0, o, !1), e = Ht(Wt, 1), Wt[0] = 251, t.push(Wt.slice(0, 9)))
            }
            var o
        }
        Ft.encodedSize = function(t, e) {
            const n = t.value;
            if (!1 === n || !0 === n || null == n) return 1;
            if (!e || !0 !== e.float64) {
                Rt(n);
                let t = Pt(Wt, 1);
                if (n === t || Number.isNaN(n)) return 3;
                if (Gt(n), t = Vt(Wt, 1), n === t) return 5
            }
            return 9
        };
        const St = new ArrayBuffer(9),
            Yt = new DataView(St, 1),
            Wt = new Uint8Array(St, 0);

        function Rt(t) {
            if (t === 1 / 0) Yt.setUint16(0, 31744, !1);
            else if (t === -1 / 0) Yt.setUint16(0, 64512, !1);
            else if (Number.isNaN(t)) Yt.setUint16(0, 32256, !1);
            else {
                Yt.setFloat32(0, t);
                const e = Yt.getUint32(0),
                    n = (2139095040 & e) >> 23,
                    r = 8388607 & e;
                if (255 === n) Yt.setUint16(0, 31744, !1);
                else if (0 === n) Yt.setUint16(0, (2147483648 & t) >> 16 | r >> 13, !1);
                else {
                    const t = n - 127;
                    t < -24 ? Yt.setUint16(0, 0) : t < -14 ? Yt.setUint16(0, (2147483648 & e) >> 16 | 1 << 24 + t, !1) : Yt.setUint16(0, (2147483648 & e) >> 16 | t + 15 << 10 | r >> 13, !1)
                }
            }
        }

        function Pt(t, e) {
            if (t.length - e < 2) throw new Error(`${at} not enough data for float16`);
            const n = (t[e] << 8) + t[e + 1];
            if (31744 === n) return 1 / 0;
            if (64512 === n) return -1 / 0;
            if (32256 === n) return NaN;
            const r = n >> 10 & 31,
                o = 1023 & n;
            let i;
            return i = 0 === r ? o * 2 ** -24 : 31 !== r ? (o + 1024) * 2 ** (r - 25) : 0 === o ? 1 / 0 : NaN, 32768 & n ? -i : i
        }

        function Gt(t) {
            Yt.setFloat32(0, t, !1)
        }

        function Vt(t, e) {
            if (t.length - e < 4) throw new Error(`${at} not enough data for float32`);
            const n = (t.byteOffset || 0) + e;
            return new DataView(t.buffer, n, 4).getFloat32(0, !1)
        }

        function Ht(t, e) {
            if (t.length - e < 8) throw new Error(`${at} not enough data for float64`);
            const n = (t.byteOffset || 0) + e;
            return new DataView(t.buffer, n, 8).getFloat64(0, !1)
        }

        function Zt(t, e, n) {
            throw new Error(`${at} encountered invalid minor (${n}) for major ${t[e]>>>5}`)
        }

        function Kt(t) {
            return () => {
                throw new Error(`${at} ${t}`)
            }
        }
        Ft.compareTokens = yt.compareTokens;
        const Xt = [];
        for (let t = 0; t <= 23; t++) Xt[t] = Zt;
        Xt[24] = function(t, e, n, r) {
            return new X(K.uint, gt(t, e + 1, r), 2)
        }, Xt[25] = function(t, e, n, r) {
            return new X(K.uint, dt(t, e + 1, r), 3)
        }, Xt[26] = function(t, e, n, r) {
            return new X(K.uint, At(t, e + 1, r), 5)
        }, Xt[27] = function(t, e, n, r) {
            return new X(K.uint, pt(t, e + 1, r), 9)
        }, Xt[28] = Zt, Xt[29] = Zt, Xt[30] = Zt, Xt[31] = Zt;
        for (let t = 32; t <= 55; t++) Xt[t] = Zt;
        Xt[56] = function(t, e, n, r) {
            return new X(K.negint, -1 - gt(t, e + 1, r), 2)
        }, Xt[57] = function(t, e, n, r) {
            return new X(K.negint, -1 - dt(t, e + 1, r), 3)
        }, Xt[58] = function(t, e, n, r) {
            return new X(K.negint, -1 - At(t, e + 1, r), 5)
        }, Xt[59] = function(t, e, n, r) {
            const o = pt(t, e + 1, r);
            if ("bigint" != typeof o) {
                const t = -1 - o;
                if (t >= Number.MIN_SAFE_INTEGER) return new X(K.negint, t, 9)
            }
            if (!0 !== r.allowBigInt) throw new Error(`${at} integers outside of the safe integer range are not supported`);
            return new X(K.negint, vt - BigInt(o), 9)
        }, Xt[60] = Zt, Xt[61] = Zt, Xt[62] = Zt, Xt[63] = Zt;
        for (let t = 64; t <= 87; t++) Xt[t] = Et;
        Xt[88] = function(t, e, n, r) {
            return mt(t, e, 2, gt(t, e + 1, r))
        }, Xt[89] = function(t, e, n, r) {
            return mt(t, e, 3, dt(t, e + 1, r))
        }, Xt[90] = function(t, e, n, r) {
            return mt(t, e, 5, At(t, e + 1, r))
        }, Xt[91] = function(t, e, n, r) {
            const o = pt(t, e + 1, r);
            if ("bigint" == typeof o) throw new Error(`${at} 64-bit integer bytes lengths not supported`);
            return mt(t, e, 9, o)
        }, Xt[92] = Zt, Xt[93] = Zt, Xt[94] = Zt, Xt[95] = Kt("indefinite length bytes/strings are not supported");
        for (let t = 96; t <= 119; t++) Xt[t] = Dt;
        Xt[120] = function(t, e, n, r) {
            return It(t, e, 2, gt(t, e + 1, r), r)
        }, Xt[121] = function(t, e, n, r) {
            return It(t, e, 3, dt(t, e + 1, r), r)
        }, Xt[122] = function(t, e, n, r) {
            return It(t, e, 5, At(t, e + 1, r), r)
        }, Xt[123] = function(t, e, n, r) {
            const o = pt(t, e + 1, r);
            if ("bigint" == typeof o) throw new Error(`${at} 64-bit integer string lengths not supported`);
            return It(t, e, 9, o, r)
        }, Xt[124] = Zt, Xt[125] = Zt, Xt[126] = Zt, Xt[127] = Kt("indefinite length bytes/strings are not supported");
        for (let t = 128; t <= 151; t++) Xt[t] = Ut;
        Xt[152] = function(t, e, n, r) {
            return jt(0, 0, 2, gt(t, e + 1, r))
        }, Xt[153] = function(t, e, n, r) {
            return jt(0, 0, 3, dt(t, e + 1, r))
        }, Xt[154] = function(t, e, n, r) {
            return jt(0, 0, 5, At(t, e + 1, r))
        }, Xt[155] = function(t, e, n, r) {
            const o = pt(t, e + 1, r);
            if ("bigint" == typeof o) throw new Error(`${at} 64-bit integer array lengths not supported`);
            return jt(0, 0, 9, o)
        }, Xt[156] = Zt, Xt[157] = Zt, Xt[158] = Zt, Xt[159] = function(t, e, n, r) {
            if (!1 === r.allowIndefinite) throw new Error(`${at} indefinite length items not allowed`);
            return jt(0, 0, 1, 1 / 0)
        };
        for (let t = 160; t <= 183; t++) Xt[t] = Ot;
        Xt[184] = function(t, e, n, r) {
            return Lt(0, 0, 2, gt(t, e + 1, r))
        }, Xt[185] = function(t, e, n, r) {
            return Lt(0, 0, 3, dt(t, e + 1, r))
        }, Xt[186] = function(t, e, n, r) {
            return Lt(0, 0, 5, At(t, e + 1, r))
        }, Xt[187] = function(t, e, n, r) {
            const o = pt(t, e + 1, r);
            if ("bigint" == typeof o) throw new Error(`${at} 64-bit integer map lengths not supported`);
            return Lt(0, 0, 9, o)
        }, Xt[188] = Zt, Xt[189] = Zt, Xt[190] = Zt, Xt[191] = function(t, e, n, r) {
            if (!1 === r.allowIndefinite) throw new Error(`${at} indefinite length items not allowed`);
            return Lt(0, 0, 1, 1 / 0)
        };
        for (let t = 192; t <= 215; t++) Xt[t] = Qt;
        Xt[216] = function(t, e, n, r) {
            return new X(K.tag, gt(t, e + 1, r), 2)
        }, Xt[217] = function(t, e, n, r) {
            return new X(K.tag, dt(t, e + 1, r), 3)
        }, Xt[218] = function(t, e, n, r) {
            return new X(K.tag, At(t, e + 1, r), 5)
        }, Xt[219] = function(t, e, n, r) {
            return new X(K.tag, pt(t, e + 1, r), 9)
        }, Xt[220] = Zt, Xt[221] = Zt, Xt[222] = Zt, Xt[223] = Zt;
        for (let t = 224; t <= 243; t++) Xt[t] = Kt("simple values are not supported");
        Xt[244] = Zt, Xt[245] = Zt, Xt[246] = Zt, Xt[247] = function(t, e, n, r) {
            if (!1 === r.allowUndefined) throw new Error(`${at} undefined values are not supported`);
            return !0 === r.coerceUndefinedToNull ? new X(K.null, null, 1) : new X(K.undefined, void 0, 1)
        }, Xt[248] = Kt("simple values are not supported"), Xt[249] = function(t, e, n, r) {
            return Tt(Pt(t, e + 1), 3, r)
        }, Xt[250] = function(t, e, n, r) {
            return Tt(Vt(t, e + 1), 5, r)
        }, Xt[251] = function(t, e, n, r) {
            return Tt(Ht(t, e + 1), 9, r)
        }, Xt[252] = Zt, Xt[253] = Zt, Xt[254] = Zt, Xt[255] = function(t, e, n, r) {
            if (!1 === r.allowIndefinite) throw new Error(`${at} indefinite length items not allowed`);
            return new X(K.break, void 0, 1)
        };
        const Jt = [];
        for (let t = 0; t < 24; t++) Jt[t] = new X(K.uint, t, 1);
        for (let t = -1; t >= -24; t--) Jt[31 - t] = new X(K.negint, t, 1);
        Jt[64] = new X(K.bytes, new Uint8Array(0), 1), Jt[96] = new X(K.string, "", 1), Jt[128] = new X(K.array, 0, 1), Jt[160] = new X(K.map, 0, 1), Jt[244] = new X(K.false, !1, 1), Jt[245] = new X(K.true, !0, 1), Jt[246] = new X(K.null, null, 1),
            function() {
                const t = [];
                t[K.uint.major] = yt, t[K.negint.major] = Ct, t[K.bytes.major] = Bt, t[K.string.major] = Nt, t[K.array.major] = kt, t[K.map.major] = zt, t[K.tag.major] = xt, t[K.float.major] = Ft
            }(), new class {
                constructor(t = 256) {
                    this.chunkSize = t, this.cursor = 0, this.maxCursor = -1, this.chunks = [], this._initReuseChunk = null
                }
                reset() {
                    this.cursor = 0, this.maxCursor = -1, this.chunks.length && (this.chunks = []), null !== this._initReuseChunk && (this.chunks.push(this._initReuseChunk), this.maxCursor = this._initReuseChunk.length - 1)
                }
                push(t) {
                    let e = this.chunks[this.chunks.length - 1];
                    if (this.cursor + t.length <= this.maxCursor + 1) {
                        const n = e.length - (this.maxCursor - this.cursor) - 1;
                        e.set(t, n)
                    } else {
                        if (e) {
                            const t = e.length - (this.maxCursor - this.cursor) - 1;
                            t < e.length && (this.chunks[this.chunks.length - 1] = e.subarray(0, t), this.maxCursor = this.cursor - 1)
                        }
                        t.length < 64 && t.length < this.chunkSize ? (e = ot(this.chunkSize), this.chunks.push(e), this.maxCursor += e.length, null === this._initReuseChunk && (this._initReuseChunk = e), e.set(t, 0)) : (this.chunks.push(t), this.maxCursor += t.length)
                    }
                    this.cursor += t.length
                }
                toBytes(t = !1) {
                    let e;
                    if (1 === this.chunks.length) {
                        const n = this.chunks[0];
                        t && this.cursor > n.length / 2 ? (e = this.cursor === n.length ? n : n.subarray(0, this.cursor), this._initReuseChunk = null, this.chunks = []) : e = nt(n, 0, this.cursor)
                    } else e = rt(this.chunks, this.cursor);
                    return t && this.reset(), e
                }
            };
        class qt {
            constructor(t, e) {
                this.obj = t, this.parent = e
            }
            includes(t) {
                let e = this;
                do {
                    if (e.obj === t) return !0
                } while (e = e.parent);
                return !1
            }
            static createCheck(t, e) {
                if (t && t.includes(e)) throw new Error(`${ct} object contains circular references`);
                return new qt(e, t)
            }
        }
        const _t = {
                null: new X(K.null, null),
                undefined: new X(K.undefined, void 0),
                true: new X(K.true, !0),
                false: new X(K.false, !1),
                emptyArray: new X(K.array, 0),
                emptyMap: new X(K.map, 0)
            },
            $t = {
                number: (t, e, n, r) => Number.isInteger(t) && Number.isSafeInteger(t) ? new X(t >= 0 ? K.uint : K.negint, t) : new X(K.float, t),
                bigint: (t, e, n, r) => t >= BigInt(0) ? new X(K.uint, t) : new X(K.negint, t),
                Uint8Array: (t, e, n, r) => new X(K.bytes, t),
                string: (t, e, n, r) => new X(K.string, t),
                boolean: (t, e, n, r) => t ? _t.true : _t.false,
                null: (t, e, n, r) => _t.null,
                undefined: (t, e, n, r) => _t.undefined,
                ArrayBuffer: (t, e, n, r) => new X(K.bytes, new Uint8Array(t)),
                DataView: (t, e, n, r) => new X(K.bytes, new Uint8Array(t.buffer, t.byteOffset, t.byteLength)),
                Array(t, e, n, r) {
                    if (!t.length) return !0 === n.addBreakTokens ? [_t.emptyArray, new X(K.break)] : _t.emptyArray;
                    r = qt.createCheck(r, t);
                    const o = [];
                    let i = 0;
                    for (const e of t) o[i++] = te(e, n, r);
                    return n.addBreakTokens ? [new X(K.array, t.length), o, new X(K.break)] : [new X(K.array, t.length), o]
                },
                Object(t, e, n, r) {
                    const o = "Object" !== e,
                        i = o ? t.keys() : Object.keys(t),
                        s = o ? t.size : i.length;
                    if (!s) return !0 === n.addBreakTokens ? [_t.emptyMap, new X(K.break)] : _t.emptyMap;
                    r = qt.createCheck(r, t);
                    const u = [];
                    let a = 0;
                    for (const e of i) u[a++] = [te(e, n, r), te(o ? t.get(e) : t[e], n, r)];
                    return function(t, e) {
                        e.mapSorter && t.sort(e.mapSorter)
                    }(u, n), n.addBreakTokens ? [new X(K.map, s), u, new X(K.break)] : [new X(K.map, s), u]
                }
            };
        $t.Map = $t.Object, $t.Buffer = $t.Uint8Array;
        for (const t of "Uint8Clamped Uint16 Uint32 Int8 Int16 Int32 BigUint64 BigInt64 Float32 Float64".split(" ")) $t[`${t}Array`] = $t.DataView;

        function te(t, e = {}, n) {
            const r = function(t) {
                    if (null === t) return "null";
                    if (void 0 === t) return "undefined";
                    if (!0 === t || !1 === t) return "boolean";
                    const e = typeof t;
                    if (H.includes(e)) return e;
                    if ("function" === e) return "Function";
                    if (Array.isArray(t)) return "Array";
                    if (function(t) {
                            return t && t.constructor && t.constructor.isBuffer && t.constructor.isBuffer.call(null, t)
                        }(t)) return "Buffer";
                    return function(t) {
                        const e = Object.prototype.toString.call(t).slice(8, -1);
                        if (Z.includes(e)) return e
                    }(t) || "Object"
                }(t),
                o = e && e.typeEncoders && e.typeEncoders[r] || $t[r];
            if ("function" == typeof o) {
                const i = o(t, r, e, n);
                if (null != i) return i
            }
            const i = $t[r];
            if (!i) throw new Error(`${ct} unsupported type: ${r}`);
            return i(t, r, e, n)
        }
        const ee = {
            strict: !1,
            allowIndefinite: !0,
            allowUndefined: !0,
            allowBigInt: !0
        };
        class ne {
            constructor(t, e = {}) {
                this.pos = 0, this.data = t, this.options = e
            }
            done() {
                return this.pos >= this.data.length
            }
            next() {
                const t = this.data[this.pos];
                let e = Jt[t];
                if (void 0 === e) {
                    const n = Xt[t];
                    if (!n) throw new Error(`${at} no decoder for major type ${t>>>5} (byte 0x${t.toString(16).padStart(2,"0")})`);
                    const r = 31 & t;
                    e = n(this.data, this.pos, r, this.options)
                }
                return this.pos += e.encodedLength, e
            }
        }
        const re = Symbol.for("DONE"),
            oe = Symbol.for("BREAK");

        function ie(t, e) {
            if (t.done()) return re;
            const n = t.next();
            if (n.type === K.break) return oe;
            if (n.type.terminal) return n.value;
            if (n.type === K.array) return function(t, e, n) {
                const r = [];
                for (let o = 0; o < t.value; o++) {
                    const i = ie(e, n);
                    if (i === oe) {
                        if (t.value === 1 / 0) break;
                        throw new Error(`${at} got unexpected break to lengthed array`)
                    }
                    if (i === re) throw new Error(`${at} found array but not enough entries (got ${o}, expected ${t.value})`);
                    r[o] = i
                }
                return r
            }(n, t, e);
            if (n.type === K.map) return function(t, e, n) {
                const r = !0 === n.useMaps,
                    o = r ? void 0 : {},
                    i = r ? new Map : void 0;
                for (let s = 0; s < t.value; s++) {
                    const u = ie(e, n);
                    if (u === oe) {
                        if (t.value === 1 / 0) break;
                        throw new Error(`${at} got unexpected break to lengthed map`)
                    }
                    if (u === re) throw new Error(`${at} found map but not enough entries (got ${s} [no key], expected ${t.value})`);
                    if (!0 !== r && "string" != typeof u) throw new Error(`${at} non-string keys not supported (got ${typeof u})`);
                    if (!0 === n.rejectDuplicateMapKeys && (r && i.has(u) || !r && u in o)) throw new Error(`${at} found repeat map key "${u}"`);
                    const a = ie(e, n);
                    if (a === re) throw new Error(`${at} found map but not enough entries (got ${s} [no value], expected ${t.value})`);
                    r ? i.set(u, a) : o[u] = a
                }
                return r ? i : o
            }(n, t, e);
            if (n.type === K.tag) {
                if (e.tags && "function" == typeof e.tags[n.value]) {
                    const r = ie(t, e);
                    return e.tags[n.value](r)
                }
                throw new Error(`${at} tag not supported (${n.value})`)
            }
            throw new Error("unsupported")
        }

        function se(t, e) {
            if (!(t instanceof Uint8Array)) throw new Error(`${at} data to decode must be a Uint8Array`);
            const n = (e = Object.assign({}, ee, e)).tokenizer || new ne(t, e),
                r = ie(n, e);
            if (r === re) throw new Error(`${at} did not find any content to decode`);
            if (r === oe) throw new Error(`${at} got unexpected break`);
            if (!n.done()) throw new Error(`${at} too many terminals, data makes no sense`);
            return r
        }

        function ue(t) {
            return ue = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            }, ue(t)
        }

        function ae() {
            ae = function() {
                return t
            };
            var t = {},
                e = Object.prototype,
                n = e.hasOwnProperty,
                r = Object.defineProperty || function(t, e, n) {
                    t[e] = n.value
                },
                o = "function" == typeof Symbol ? Symbol : {},
                i = o.iterator || "@@iterator",
                s = o.asyncIterator || "@@asyncIterator",
                u = o.toStringTag || "@@toStringTag";

            function a(t, e, n) {
                return Object.defineProperty(t, e, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }), t[e]
            }
            try {
                a({}, "")
            } catch (t) {
                a = function(t, e, n) {
                    return t[e] = n
                }
            }

            function c(t, e, n, o) {
                var i = e && e.prototype instanceof h ? e : h,
                    s = Object.create(i.prototype),
                    u = new B(o || []);
                return r(s, "_invoke", {
                    value: C(t, n, u)
                }), s
            }

            function f(t, e, n) {
                try {
                    return {
                        type: "normal",
                        arg: t.call(e, n)
                    }
                } catch (t) {
                    return {
                        type: "throw",
                        arg: t
                    }
                }
            }
            t.wrap = c;
            var l = {};

            function h() {}

            function g() {}

            function d() {}
            var A = {};
            a(A, i, (function() {
                return this
            }));
            var p = Object.getPrototypeOf,
                y = p && p(p(I([])));
            y && y !== e && n.call(y, i) && (A = y);
            var w = d.prototype = h.prototype = Object.create(A);

            function v(t) {
                ["next", "throw", "return"].forEach((function(e) {
                    a(t, e, (function(t) {
                        return this._invoke(e, t)
                    }))
                }))
            }

            function b(t, e) {
                function o(r, i, s, u) {
                    var a = f(t[r], t, i);
                    if ("throw" !== a.type) {
                        var c = a.arg,
                            l = c.value;
                        return l && "object" == ue(l) && n.call(l, "__await") ? e.resolve(l.__await).then((function(t) {
                            o("next", t, s, u)
                        }), (function(t) {
                            o("throw", t, s, u)
                        })) : e.resolve(l).then((function(t) {
                            c.value = t, s(c)
                        }), (function(t) {
                            return o("throw", t, s, u)
                        }))
                    }
                    u(a.arg)
                }
                var i;
                r(this, "_invoke", {
                    value: function(t, n) {
                        function r() {
                            return new e((function(e, r) {
                                o(t, n, e, r)
                            }))
                        }
                        return i = i ? i.then(r, r) : r()
                    }
                })
            }

            function C(t, e, n) {
                var r = "suspendedStart";
                return function(o, i) {
                    if ("executing" === r) throw new Error("Generator is already running");
                    if ("completed" === r) {
                        if ("throw" === o) throw i;
                        return {
                            value: void 0,
                            done: !0
                        }
                    }
                    for (n.method = o, n.arg = i;;) {
                        var s = n.delegate;
                        if (s) {
                            var u = m(s, n);
                            if (u) {
                                if (u === l) continue;
                                return u
                            }
                        }
                        if ("next" === n.method) n.sent = n._sent = n.arg;
                        else if ("throw" === n.method) {
                            if ("suspendedStart" === r) throw r = "completed", n.arg;
                            n.dispatchException(n.arg)
                        } else "return" === n.method && n.abrupt("return", n.arg);
                        r = "executing";
                        var a = f(t, e, n);
                        if ("normal" === a.type) {
                            if (r = n.done ? "completed" : "suspendedYield", a.arg === l) continue;
                            return {
                                value: a.arg,
                                done: n.done
                            }
                        }
                        "throw" === a.type && (r = "completed", n.method = "throw", n.arg = a.arg)
                    }
                }
            }

            function m(t, e) {
                var n = e.method,
                    r = t.iterator[n];
                if (void 0 === r) return e.delegate = null, "throw" === n && t.iterator.return && (e.method = "return", e.arg = void 0, m(t, e), "throw" === e.method) || "return" !== n && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + n + "' method")), l;
                var o = f(r, t.iterator, e.arg);
                if ("throw" === o.type) return e.method = "throw", e.arg = o.arg, e.delegate = null, l;
                var i = o.arg;
                return i ? i.done ? (e[t.resultName] = i.value, e.next = t.nextLoc, "return" !== e.method && (e.method = "next", e.arg = void 0), e.delegate = null, l) : i : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, l)
            }

            function E(t) {
                var e = {
                    tryLoc: t[0]
                };
                1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e)
            }

            function M(t) {
                var e = t.completion || {};
                e.type = "normal", delete e.arg, t.completion = e
            }

            function B(t) {
                this.tryEntries = [{
                    tryLoc: "root"
                }], t.forEach(E, this), this.reset(!0)
            }

            function I(t) {
                if (t || "" === t) {
                    var e = t[i];
                    if (e) return e.call(t);
                    if ("function" == typeof t.next) return t;
                    if (!isNaN(t.length)) {
                        var r = -1,
                            o = function e() {
                                for (; ++r < t.length;)
                                    if (n.call(t, r)) return e.value = t[r], e.done = !1, e;
                                return e.value = void 0, e.done = !0, e
                            };
                        return o.next = o
                    }
                }
                throw new TypeError(ue(t) + " is not iterable")
            }
            return g.prototype = d, r(w, "constructor", {
                value: d,
                configurable: !0
            }), r(d, "constructor", {
                value: g,
                configurable: !0
            }), g.displayName = a(d, u, "GeneratorFunction"), t.isGeneratorFunction = function(t) {
                var e = "function" == typeof t && t.constructor;
                return !!e && (e === g || "GeneratorFunction" === (e.displayName || e.name))
            }, t.mark = function(t) {
                return Object.setPrototypeOf ? Object.setPrototypeOf(t, d) : (t.__proto__ = d, a(t, u, "GeneratorFunction")), t.prototype = Object.create(w), t
            }, t.awrap = function(t) {
                return {
                    __await: t
                }
            }, v(b.prototype), a(b.prototype, s, (function() {
                return this
            })), t.AsyncIterator = b, t.async = function(e, n, r, o, i) {
                void 0 === i && (i = Promise);
                var s = new b(c(e, n, r, o), i);
                return t.isGeneratorFunction(n) ? s : s.next().then((function(t) {
                    return t.done ? t.value : s.next()
                }))
            }, v(w), a(w, u, "Generator"), a(w, i, (function() {
                return this
            })), a(w, "toString", (function() {
                return "[object Generator]"
            })), t.keys = function(t) {
                var e = Object(t),
                    n = [];
                for (var r in e) n.push(r);
                return n.reverse(),
                    function t() {
                        for (; n.length;) {
                            var r = n.pop();
                            if (r in e) return t.value = r, t.done = !1, t
                        }
                        return t.done = !0, t
                    }
            }, t.values = I, B.prototype = {
                constructor: B,
                reset: function(t) {
                    if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(M), !t)
                        for (var e in this) "t" === e.charAt(0) && n.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = void 0)
                },
                stop: function() {
                    this.done = !0;
                    var t = this.tryEntries[0].completion;
                    if ("throw" === t.type) throw t.arg;
                    return this.rval
                },
                dispatchException: function(t) {
                    if (this.done) throw t;
                    var e = this;

                    function r(n, r) {
                        return s.type = "throw", s.arg = t, e.next = n, r && (e.method = "next", e.arg = void 0), !!r
                    }
                    for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                        var i = this.tryEntries[o],
                            s = i.completion;
                        if ("root" === i.tryLoc) return r("end");
                        if (i.tryLoc <= this.prev) {
                            var u = n.call(i, "catchLoc"),
                                a = n.call(i, "finallyLoc");
                            if (u && a) {
                                if (this.prev < i.catchLoc) return r(i.catchLoc, !0);
                                if (this.prev < i.finallyLoc) return r(i.finallyLoc)
                            } else if (u) {
                                if (this.prev < i.catchLoc) return r(i.catchLoc, !0)
                            } else {
                                if (!a) throw new Error("try statement without catch or finally");
                                if (this.prev < i.finallyLoc) return r(i.finallyLoc)
                            }
                        }
                    }
                },
                abrupt: function(t, e) {
                    for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                        var o = this.tryEntries[r];
                        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
                            var i = o;
                            break
                        }
                    }
                    i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
                    var s = i ? i.completion : {};
                    return s.type = t, s.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, l) : this.complete(s)
                },
                complete: function(t, e) {
                    if ("throw" === t.type) throw t.arg;
                    return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), l
                },
                finish: function(t) {
                    for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                        var n = this.tryEntries[e];
                        if (n.finallyLoc === t) return this.complete(n.completion, n.afterLoc), M(n), l
                    }
                },
                catch: function(t) {
                    for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                        var n = this.tryEntries[e];
                        if (n.tryLoc === t) {
                            var r = n.completion;
                            if ("throw" === r.type) {
                                var o = r.arg;
                                M(n)
                            }
                            return o
                        }
                    }
                    throw new Error("illegal catch attempt")
                },
                delegateYield: function(t, e, n) {
                    return this.delegate = {
                        iterator: I(t),
                        resultName: e,
                        nextLoc: n
                    }, "next" === this.method && (this.arg = void 0), l
                }
            }, t
        }

        function ce(t, e, n, r, o, i, s) {
            try {
                var u = t[i](s),
                    a = u.value
            } catch (t) {
                return void n(t)
            }
            u.done ? e(a) : Promise.resolve(a).then(r, o)
        }

        function fe(t) {
            return function() {
                var e = this,
                    n = arguments;
                return new Promise((function(r, o) {
                    var i = t.apply(e, n);

                    function s(t) {
                        ce(i, r, o, s, u, "next", t)
                    }

                    function u(t) {
                        ce(i, r, o, s, u, "throw", t)
                    }
                    s(void 0)
                }))
            }
        }

        function le(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, ge(r.key), r)
            }
        }

        function he(t, e, n) {
            return (e = ge(e)) in t ? Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : t[e] = n, t
        }

        function ge(t) {
            var e = function(t, e) {
                if ("object" !== ue(t) || null === t) return t;
                var n = t[Symbol.toPrimitive];
                if (void 0 !== n) {
                    var r = n.call(t, "string");
                    if ("object" !== ue(r)) return r;
                    throw new TypeError("@@toPrimitive must return a primitive value.")
                }
                return String(t)
            }(t);
            return "symbol" === ue(e) ? e : String(e)
        }
        var de = function() {
            function t() {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t)
            }
            var e, n, r, o, i, s, u, a;
            return e = t, null, n = [{
                key: "disconnect",
                value: function() {
                    this.enabledObserver.set(!1), this.enabledWalletObserver.set(null), this.stakeAddressObserver.set(null), this.usedAddressesObserver.set([]), this.unusedAddressesObserver.set([]), this.accountBalanceObserver.set(0), this.isConnected.set(!1), this.lastConnectedWallet.set(""), this.meerkatAddressObserver.set(""), window.dispatchEvent(new Event("storage")), this.clearLocalStorage()
                }
            }, {
                key: "clearLocalStorage",
                value: function() {
                    window.localStorage.removeItem("cf-wallet-connected"), window.localStorage.removeItem("cf-last-connected-wallet")
                }
            }, {
                key: "addEventListener",
                value: function(t, e) {
                    if (!["enabled", "connecting", "enabledWallet", "stakeAddress", "usedAddresses", "unusedAddresses", "accountBalance", "connected", "lastConnectedWallet", "meerkatAddress", "installedWalletExtensions"].includes(t)) throw new Error("The Event ".concat(t, " is not supported. Please use one of the following events: enabled, connecting, enabledWallet, stakeAddress, usedAddresses, unusedAddresses, accountBalance, connected, lastConnectedWallet, meerkatAddress, installedWalletExtensions"));
                    "enabled" === t ? this.enabledObserver.subscribe(e) : "isConnecting" === t ? this.isConnectingObserver.subscribe(e) : "enabledWallet" === t ? this.enabledWalletObserver.subscribe(e) : "stakeAddress" === t ? this.stakeAddressObserver.subscribe(e) : "usedAddresses" === t ? this.usedAddressesObserver.subscribe(e) : "unusedAddresses" === t ? this.unusedAddressesObserver.subscribe(e) : "installedWalletExtensions" === t ? this.installedWalletExtensionsObserver.subscribe(e) : "accountBalance" === t ? this.accountBalanceObserver.subscribe(e) : "connected" === t ? this.isConnected.subscribe(e) : "lastConnectedWallet" === t ? this.lastConnectedWallet.subscribe(e) : "meerkatAddress" === t && this.meerkatAddressObserver.subscribe(e)
                }
            }, {
                key: "removeEventListener",
                value: function(t, e) {
                    if (!["enabled", "connecting", "enabledWallet", "stakeAddress", "usedAddresses", "unusedAddresses", "accountBalance", "connected", "lastConnectedWallet", "meerkatAddress", "installedWalletExtensions"].includes(t)) throw new Error("The Event ".concat(t, " is not supported. Please use one of the following events: enabled, connecting, enabledWallet, stakeAddress, usedAddresses, unusedAddresses, accountBalance, connected, lastConnectedWallet, meerkatAddress, installedWalletExtensions"));
                    "enabled" === t ? this.enabledObserver.unsubscribe(e) : "connecting" === t ? this.isConnectingObserver.unsubscribe(e) : "enabledWallet" === t ? this.enabledWalletObserver.unsubscribe(e) : "stakeAddress" === t ? this.stakeAddressObserver.unsubscribe(e) : "usedAddresses" === t ? this.usedAddressesObserver.unsubscribe(e) : "unusedAddresses" === t ? this.unusedAddressesObserver.unsubscribe(e) : "installedWalletExtensions" === t ? this.installedWalletExtensionsObserver.unsubscribe(e) : "accountBalance" === t ? this.accountBalanceObserver.unsubscribe(e) : "connected" === t ? this.isConnected.unsubscribe(e) : "lastConnectedWallet" === t ? this.lastConnectedWallet.unsubscribe(e) : "meerkatAddress" === t && this.meerkatAddressObserver.unsubscribe(e)
                }
            }, {
                key: "subscribeToObservables",
                value: function(t, e, n, r, o, i, s, u, a, c, f) {
                    this.enabledObserver.subscribe(t), this.isConnectingObserver.subscribe(e), this.enabledWalletObserver.subscribe(n), this.stakeAddressObserver.subscribe(r), this.usedAddressesObserver.subscribe(o), this.unusedAddressesObserver.subscribe(i), this.installedWalletExtensionsObserver.subscribe(s), this.accountBalanceObserver.subscribe(u), this.isConnected.subscribe(a), this.lastConnectedWallet.subscribe(c), this.meerkatAddressObserver.subscribe(f)
                }
            }, {
                key: "unsubscribeFromObservables",
                value: function(t, e, n, r, o, i, s, u, a, c, f) {
                    this.enabledObserver.unsubscribe(t), this.isConnectingObserver.unsubscribe(e), this.enabledWalletObserver.unsubscribe(n), this.stakeAddressObserver.unsubscribe(r), this.usedAddressesObserver.unsubscribe(o), this.unusedAddressesObserver.unsubscribe(i), this.installedWalletExtensionsObserver.unsubscribe(s), this.accountBalanceObserver.unsubscribe(u), this.isConnected.unsubscribe(a), this.lastConnectedWallet.unsubscribe(c), this.meerkatAddressObserver.unsubscribe(f)
                }
            }, {
                key: "startInjectWalletListener",
                value: function() {
                    var t = this;
                    this.injectWalletListener = new V((function() {
                        t.installedWalletExtensionsObserver.set(t.getInstalledWalletExtensions())
                    })), this.injectWalletListener.start()
                }
            }, {
                key: "stopInjectWalletListener",
                value: function() {
                    this.injectWalletListener && this.injectWalletListener.stop()
                }
            }, {
                key: "unwrapApi",
                value: (a = fe(ae().mark((function t() {
                    var e;
                    return ae().wrap((function(t) {
                        for (;;) switch (t.prev = t.next) {
                            case 0:
                                return e = window.cardano, t.next = 3, e["typhon" === this.lastConnectedWallet.get() ? "typhoncip30" : this.lastConnectedWallet.get()].enable();
                            case 3:
                                return t.abrupt("return", t.sent);
                            case 4:
                            case "end":
                                return t.stop()
                        }
                    }), t, this)
                }))), function() {
                    return a.apply(this, arguments)
                })
            }, {
                key: "checkEnabled",
                value: (u = fe(ae().mark((function e(n) {
                    return ae().wrap((function(e) {
                        for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (void 0 !== window.cardano) {
                                    e.next = 3;
                                    break
                                }
                                return e.abrupt("return");
                            case 3:
                                if ("" === t.lastConnectedWallet.get()) {
                                    e.next = 25;
                                    break
                                }
                                if ("typhon" !== t.lastConnectedWallet.get()) {
                                    e.next = 17;
                                    break
                                }
                                return e.prev = 5, e.next = 8, this.connectToWallet("typhoncip30", n);
                            case 8:
                                e.next = 13;
                                break;
                            case 10:
                                throw e.prev = 10, e.t0 = e.catch(5), e.t0;
                            case 13:
                                return e.next = 15, this.connectToWallet("typhoncip30", n);
                            case 15:
                            case 20:
                                e.next = 25;
                                break;
                            case 17:
                                return e.prev = 17, e.next = 20, this.connectToWallet(this.lastConnectedWallet.get(), n);
                            case 22:
                                throw e.prev = 22, e.t1 = e.catch(17), e.t1;
                            case 25:
                            case "end":
                                return e.stop()
                        }
                    }), e, this, [
                        [5, 10],
                        [17, 22]
                    ])
                }))), function(t) {
                    return u.apply(this, arguments)
                })
            }, {
                key: "connectToWallet",
                value: (s = fe(ae().mark((function t(e, n) {
                    var r, o, i, s, u = this,
                        a = arguments;
                    return ae().wrap((function(t) {
                        for (;;) switch (t.prev = t.next) {
                            case 0:
                                return r = a.length > 2 && void 0 !== a[2] ? a[2] : 20, o = a.length > 3 && void 0 !== a[3] ? a[3] : 25, i = function t(e, n, r) {
                                    return new Promise((function(o, i) {
                                        var s = window.cardano;
                                        void 0 === s || void 0 === s[e] ? n > 0 ? setTimeout((function() {
                                            return o(t(e, n - 1, r))
                                        }), r) : i() : o()
                                    }))
                                }, s = function() {
                                    var t = fe(ae().mark((function t(n) {
                                        var s, a, c, f, l, h;
                                        return ae().wrap((function(t) {
                                            for (;;) switch (t.prev = t.next) {
                                                case 0:
                                                    return t.prev = 0, t.next = 3, i(e, r, o);
                                                case 3:
                                                    t.next = 8;
                                                    break;
                                                case 5:
                                                    throw t.prev = 5, t.t0 = t.catch(0), new y(e);
                                                case 8:
                                                    if (void 0 === (s = window.cardano)[e] || "function" != typeof s[e].enable) {
                                                        t.next = 48;
                                                        break
                                                    }
                                                    return a = {}, t.prev = 11, t.next = 14, s[e].enable();
                                                case 14:
                                                    a = t.sent, t.next = 20;
                                                    break;
                                                case 17:
                                                    throw t.prev = 17, t.t1 = t.catch(11), new d(e, t.t1.message);
                                                case 20:
                                                    if ("function" != typeof a.getRewardAddresses) {
                                                        t.next = 47;
                                                        break
                                                    }
                                                    return t.next = 23, a.getRewardAddresses();
                                                case 23:
                                                    if (!((c = t.sent) && c.length > 0)) {
                                                        t.next = 45;
                                                        break
                                                    }
                                                    if (t.prev = 25, f = M(c[0]), l = x.MAINNET, f.startsWith("stake_test") && (l = x.TESTNET), !n || n === l) {
                                                        t.next = 31;
                                                        break
                                                    }
                                                    throw new A(n, l);
                                                case 31:
                                                    h = function() {
                                                        var t = fe(ae().mark((function t() {
                                                            var e, n, r, o;
                                                            return ae().wrap((function(t) {
                                                                for (;;) switch (t.prev = t.next) {
                                                                    case 0:
                                                                        if ("function" != typeof a.getUsedAddresses) {
                                                                            t.next = 5;
                                                                            break
                                                                        }
                                                                        return t.next = 3, a.getUsedAddresses();
                                                                    case 3:
                                                                        e = t.sent, u.usedAddressesObserver.set(e.map((function(t) {
                                                                            return M(t)
                                                                        })));
                                                                    case 5:
                                                                        if ("function" != typeof a.getUnusedAddresses) {
                                                                            t.next = 10;
                                                                            break
                                                                        }
                                                                        return t.next = 8, a.getUnusedAddresses();
                                                                    case 8:
                                                                        n = t.sent, u.unusedAddressesObserver.set(n.map((function(t) {
                                                                            return M(t)
                                                                        })));
                                                                    case 10:
                                                                        if ("function" != typeof a.getBalance) {
                                                                            t.next = 16;
                                                                            break
                                                                        }
                                                                        return t.next = 13, a.getBalance();
                                                                    case 13:
                                                                        r = t.sent, o = se(m.lW.from(r, "hex")), u.accountBalanceObserver.set(o / 1e6);
                                                                    case 16:
                                                                    case "end":
                                                                        return t.stop()
                                                                }
                                                            }), t)
                                                        })));
                                                        return function() {
                                                            return t.apply(this, arguments)
                                                        }
                                                    }(), h(), u.stakeAddressObserver.set(f), u.enabledWalletObserver.set(e), u.enabledObserver.set(!0), u.isConnected.set(!0), "typhoncip30" === e ? (window.localStorage.setItem("cf-last-connected-wallet", "typhon"), u.lastConnectedWallet.set("typhon")) : (window.localStorage.setItem("cf-last-connected-wallet", e), u.lastConnectedWallet.set(e)), window.localStorage.setItem("cf-wallet-connected", String(!0)), window.dispatchEvent(new Event("storage")), t.next = 45;
                                                    break;
                                                case 42:
                                                    throw t.prev = 42, t.t2 = t.catch(25), t.t2;
                                                case 45:
                                                    t.next = 48;
                                                    break;
                                                case 47:
                                                    throw new p(e);
                                                case 48:
                                                case "end":
                                                    return t.stop()
                                            }
                                        }), t, null, [
                                            [0, 5],
                                            [11, 17],
                                            [25, 42]
                                        ])
                                    })));
                                    return function(e) {
                                        return t.apply(this, arguments)
                                    }
                                }(), t.prev = 4, t.next = 7, s(n);
                            case 7:
                                t.next = 12;
                                break;
                            case 9:
                                throw t.prev = 9, t.t0 = t.catch(4), t.t0;
                            case 12:
                            case "end":
                                return t.stop()
                        }
                    }), t, null, [
                        [4, 9]
                    ])
                }))), function(t, e) {
                    return s.apply(this, arguments)
                })
            }, {
                key: "connect",
                value: (i = fe(ae().mark((function t(e, n, r, o) {
                    var i;
                    return ae().wrap((function(t) {
                        for (;;) switch (t.prev = t.next) {
                            case 0:
                                if (this.isConnecting.set(!0), i = window.cardano, e = e.toLowerCase(), void 0 === i) {
                                    t.next = 24;
                                    break
                                }
                                if (void 0 === i[e]) {
                                    t.next = 20;
                                    break
                                }
                                return t.prev = 5, "typhon" === e && (e = "typhoncip30"), t.next = 9, this.connectToWallet(e, n);
                            case 9:
                                "function" == typeof r && r(), t.next = 15;
                                break;
                            case 12:
                                t.prev = 12, t.t0 = t.catch(5), "function" == typeof o && o(t.t0);
                            case 15:
                                return t.prev = 15, this.isConnecting.set(!1), t.finish(15);
                            case 18:
                                t.next = 22;
                                break;
                            case 20:
                                this.isConnecting.set(!1), "function" == typeof o && o(new w(e));
                            case 22:
                                t.next = 26;
                                break;
                            case 24:
                                this.isConnecting.set(!1), "function" == typeof o && o(new y(e));
                            case 26:
                            case "end":
                                return t.stop()
                        }
                    }), t, this, [
                        [5, 12, 15, 18]
                    ])
                }))), function(t, e, n, r) {
                    return i.apply(this, arguments)
                })
            }, {
                key: "getInstalledWalletExtensions",
                value: function(t) {
                    var e = window.cardano;
                    return void 0 === e ? [] : t ? Object.keys(e).map((function(t) {
                        return t.toLowerCase()
                    })).filter((function(e) {
                        return t.map((function(t) {
                            return t.toLowerCase()
                        })).includes(e)
                    })) : Object.keys(e).filter((function(t) {
                        return "function" == typeof e[t].enable
                    })).map((function(t) {
                        return t.toLowerCase()
                    }))
                }
            }, {
                key: "getRewardAddresses",
                value: (o = fe(ae().mark((function t() {
                    var e, n;
                    return ae().wrap((function(t) {
                        for (;;) switch (t.prev = t.next) {
                            case 0:
                                return t.next = 2, this.unwrapApi();
                            case 2:
                                if ("function" != typeof(e = t.sent).getRewardAddresses) {
                                    t.next = 12;
                                    break
                                }
                                return t.next = 6, e.getRewardAddresses();
                            case 6:
                                if (!((n = t.sent) && n.length > 0)) {
                                    t.next = 11;
                                    break
                                }
                                return t.abrupt("return", n.map((function(t) {
                                    return M(t)
                                })));
                            case 11:
                                return t.abrupt("return", []);
                            case 12:
                            case "end":
                                return t.stop()
                        }
                    }), t, this)
                }))), function() {
                    return o.apply(this, arguments)
                })
            }, {
                key: "signMessage",
                value: (r = fe(ae().mark((function e(n, r, o, i) {
                    var s, u, a, c, f, l, h, g, d, p, y;
                    return ae().wrap((function(e) {
                        for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (this.enabledObserver.get() && this.enabledWalletObserver.get()) {
                                    e.next = 2;
                                    break
                                }
                                return e.abrupt("return");
                            case 2:
                                if (void 0 !== n) {
                                    e.next = 4;
                                    break
                                }
                                return e.abrupt("return");
                            case 4:
                                return e.next = 6, t.unwrapApi();
                            case 6:
                                return s = e.sent, e.next = 9, s.getRewardAddresses();
                            case 9:
                                if (!((u = e.sent).length > 0)) {
                                    e.next = 31;
                                    break
                                }
                                if (a = x.MAINNET, u[0] && M(u[0]).startsWith("stake_test") && (a = x.TESTNET), !i || i === a) {
                                    e.next = 17;
                                    break
                                }
                                return c = new A(i, a), "function" == typeof o ? o(c) : console.warn(c), e.abrupt("return");
                            case 17:
                                if (!(u.length > 0)) {
                                    e.next = 31;
                                    break
                                }
                                for (f = u[0], l = "", h = 0, g = n.length; h < g; h++) l += n.charCodeAt(h).toString(16);
                                return e.prev = 21, e.next = 24, s.signData(f, l);
                            case 24:
                                d = e.sent, "function" == typeof r && (p = d.signature, y = d.key, r(p, y)), e.next = 31;
                                break;
                            case 28:
                                e.prev = 28, e.t0 = e.catch(21), "function" == typeof o ? o(e.t0) : console.warn(e.t0);
                            case 31:
                            case "end":
                                return e.stop()
                        }
                    }), e, this, [
                        [21, 28]
                    ])
                }))), function(t, e, n, o) {
                    return r.apply(this, arguments)
                })
            }], n && le(e, n), Object.defineProperty(e, "prototype", {
                writable: !1
            }), t
        }();
        he(de, "isConnecting", new Q(Boolean(window.localStorage.getItem("cf-wallet-connected")))), he(de, "lastConnectedWallet", new Q(window.localStorage.getItem("cf-last-connected-wallet") || "")), he(de, "isConnected", new Q(!1)), he(de, "enabledObserver", new Q(!1)), he(de, "isConnectingObserver", new Q(!1)), he(de, "enabledWalletObserver", new Q(null)), he(de, "stakeAddressObserver", new Q(null)), he(de, "installedWalletExtensionsObserver", new Q([])), he(de, "usedAddressesObserver", new Q([])), he(de, "unusedAddressesObserver", new Q([])), he(de, "accountBalanceObserver", new Q(0)), he(de, "meerkatAddressObserver", new Q(""))
    })(), r
})()));
/*# sourceMappingURL=index.js.map*/