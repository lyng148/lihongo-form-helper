!function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.notie = t() : e.notie = t()
}(this, function () {
    return function (e) {
        function t(s) {
            if (n[s]) return n[s].exports;
            var a = n[s] = {i: s, l: !1, exports: {}};
            return e[s].call(a.exports, a, a.exports, t), a.l = !0, a.exports
        }

        var n = {};
        return t.m = e, t.c = n, t.i = function (e) {
            return e
        }, t.d = function (e, n, s) {
            t.o(e, n) || Object.defineProperty(e, n, {configurable: !1, enumerable: !0, get: s})
        }, t.n = function (e) {
            var n = e && e.__esModule ? function () {
                return e.default
            } : function () {
                return e
            };
            return t.d(n, "a", n), n
        }, t.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, t.p = "", t(t.s = 1)
    }([function (e, t) {
        e.exports = function (e) {
            return e.webpackPolyfill || (e.deprecate = function () {
            }, e.paths = [], e.children || (e.children = []), Object.defineProperty(e, "loaded", {
                enumerable: !0,
                get: function () {
                    return e.l
                }
            }), Object.defineProperty(e, "id", {
                enumerable: !0, get: function () {
                    return e.i
                }
            }), e.webpackPolyfill = 1), e
        }
    }, function (e, t, n) {
        "use strict";
        (function (e) {
            var n, s, a, i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            };
            !function (c, o) {
                "object" === i(t) && "object" === i(e) ? e.exports = o() : (s = [], n = o, a = "function" == typeof n ? n.apply(t, s) : n, !(void 0 !== a && (e.exports = a)))
            }(void 0, function () {
                return function (e) {
                    function t(s) {
                        if (n[s]) return n[s].exports;
                        var a = n[s] = {i: s, l: !1, exports: {}};
                        return e[s].call(a.exports, a, a.exports, t), a.l = !0, a.exports
                    }

                    var n = {};
                    return t.m = e, t.c = n, t.i = function (e) {
                        return e
                    }, t.d = function (e, n, s) {
                        t.o(e, n) || Object.defineProperty(e, n, {configurable: !1, enumerable: !0, get: s})
                    }, t.n = function (e) {
                        var n = e && e.__esModule ? function () {
                            return e.default
                        } : function () {
                            return e
                        };
                        return t.d(n, "a", n), n
                    }, t.o = function (e, t) {
                        return Object.prototype.hasOwnProperty.call(e, t)
                    }, t.p = "", t(t.s = 0)
                }([function (e, t, n) {
                    function s(e, t) {
                        var n = {};
                        for (var s in e) t.indexOf(s) >= 0 || Object.prototype.hasOwnProperty.call(e, s) && (n[s] = e[s]);
                        return n
                    }

                    Object.defineProperty(t, "__esModule", {value: !0});
                    var a = "function" == typeof Symbol && "symbol" === i(Symbol.iterator) ? function (e) {
                        return "undefined" == typeof e ? "undefined" : i(e)
                    } : function (e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : "undefined" == typeof e ? "undefined" : i(e)
                    }, c = Object.assign || function (e) {
                        for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var s in n) Object.prototype.hasOwnProperty.call(n, s) && (e[s] = n[s])
                        }
                        return e
                    }, o = {top: "top", bottom: "bottom"}, r = {
                        alertTime: 3,
                        dateMonths: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                        overlayClickDismiss: !0,
                        overlayOpacity: .75,
                        transitionCurve: "ease",
                        transitionDuration: .3,
                        transitionSelector: "all",
                        classes: {
                            container: "notie-container",
                            textbox: "notie-textbox",
                            textboxInner: "notie-textbox-inner",
                            button: "notie-button",
                            element: "notie-element",
                            elementHalf: "notie-element-half",
                            elementThird: "notie-element-third",
                            overlay: "notie-overlay",
                            backgroundSuccess: "notie-background-success",
                            backgroundWarning: "notie-background-warning",
                            backgroundError: "notie-background-error",
                            backgroundInfo: "notie-background-info",
                            backgroundNeutral: "notie-background-neutral",
                            backgroundOverlay: "notie-background-overlay",
                            alert: "notie-alert",
                            inputField: "notie-input-field",
                            selectChoiceRepeated: "notie-select-choice-repeated",
                            dateSelectorInner: "notie-date-selector-inner",
                            dateSelectorUp: "notie-date-selector-up"
                        },
                        ids: {overlay: "notie-overlay"},
                        positions: {
                            alert: o.top,
                            force: o.top,
                            confirm: o.top,
                            input: o.top,
                            select: o.bottom,
                            date: o.top
                        }
                    }, l = t.setOptions = function (e) {
                        r = c({}, r, e, {
                            classes: c({}, r.classes, e.classes),
                            ids: c({}, r.ids, e.ids),
                            positions: c({}, r.positions, e.positions)
                        })
                    }, d = function () {
                        return new Promise(function (e) {
                            return setTimeout(e, 0)
                        })
                    }, u = function (e) {
                        return new Promise(function (t) {
                            return setTimeout(t, 1e3 * e)
                        })
                    }, p = function () {
                        document.activeElement && document.activeElement.blur()
                    }, f = function () {
                        var e = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (e) {
                            var t = 16 * Math.random() | 0, n = "x" === e ? t : 3 & t | 8;
                            return n.toString(16)
                        });
                        return "notie-" + e
                    }, m = {
                        1: r.classes.backgroundSuccess,
                        success: r.classes.backgroundSuccess,
                        2: r.classes.backgroundWarning,
                        warning: r.classes.backgroundWarning,
                        3: r.classes.backgroundError,
                        error: r.classes.backgroundError,
                        4: r.classes.backgroundInfo,
                        info: r.classes.backgroundInfo,
                        5: r.classes.backgroundNeutral,
                        neutral: r.classes.backgroundNeutral
                    }, v = function () {
                        return r.transitionSelector + " " + r.transitionDuration + "s " + r.transitionCurve
                    }, b = function (e) {
                        return 13 === e.keyCode
                    }, x = function (e) {
                        return 27 === e.keyCode
                    }, y = function (e, t) {
                        e.classList.add(r.classes.container), e.style[t] = "-10000px", document.body.appendChild(e), e.style[t] = "-" + e.offsetHeight + "px", e.listener && window.addEventListener("keydown", e.listener), d().then(function () {
                            e.style.transition = v(), e.style[t] = 0
                        })
                    }, L = function (e, t) {
                        var n = document.getElementById(e);
                        n && (n.style[t] = "-" + n.offsetHeight + "px", n.listener && window.removeEventListener("keydown", n.listener), u(r.transitionDuration).then(function () {
                            n.parentNode && n.parentNode.removeChild(n)
                        }))
                    }, g = function (e, t) {
                        var n = document.createElement("div");
                        n.id = r.ids.overlay, n.classList.add(r.classes.overlay), n.classList.add(r.classes.backgroundOverlay), n.style.opacity = 0, e && r.overlayClickDismiss && (n.onclick = function () {
                            L(e.id, t), h()
                        }), document.body.appendChild(n), d().then(function () {
                            n.style.transition = v(), n.style.opacity = r.overlayOpacity
                        })
                    }, h = function () {
                        var e = document.getElementById(r.ids.overlay);
                        e.style.opacity = 0, u(r.transitionDuration).then(function () {
                            e.parentNode && e.parentNode.removeChild(e)
                        })
                    }, k = t.hideAlerts = function (e) {
                        var t = document.getElementsByClassName(r.classes.alert);
                        if (t.length) {
                            for (var n = 0; n < t.length; n++) {
                                var s = t[n];
                                L(s.id, s.position)
                            }
                            e && u(r.transitionDuration).then(function () {
                                return e()
                            })
                        }
                    }, C = t.alert = function (e) {
                        var t = e.type, n = void 0 === t ? 4 : t, s = e.text, a = e.time,
                            i = void 0 === a ? r.alertTime : a, c = e.stay, o = void 0 !== c && c, l = e.position,
                            d = void 0 === l ? r.positions.alert || d.top : l;
                        p(), k();
                        var v = document.createElement("div"), g = f();
                        v.id = g, v.position = d, v.classList.add(r.classes.textbox), v.classList.add(m[n]), v.classList.add(r.classes.alert), v.innerHTML = '<div class="' + r.classes.textboxInner + '">' + s + "</div>", v.onclick = function () {
                            return L(g, d)
                        }, v.listener = function (e) {
                            (b(e) || x(e)) && k()
                        }, y(v, d), i && i < 1 && (i = 1), !o && i && u(i).then(function () {
                            return L(g, d)
                        })
                    }, E = t.force = function (e, t) {
                        var n = e.type, s = void 0 === n ? 5 : n, a = e.text, i = e.buttonText,
                            c = void 0 === i ? "OK" : i, o = e.callback, l = e.position,
                            d = void 0 === l ? r.positions.force || d.top : l;
                        p(), k();
                        var u = document.createElement("div"), v = f();
                        u.id = v;
                        var x = document.createElement("div");
                        x.classList.add(r.classes.textbox), x.classList.add(r.classes.backgroundInfo), x.innerHTML = '<div class="' + r.classes.textboxInner + '">' + a + "</div>";
                        var C = document.createElement("div");
                        C.classList.add(r.classes.button), C.classList.add(m[s]), C.innerHTML = c, C.onclick = function () {
                            L(v, d), h(), o ? o() : t && t()
                        }, u.appendChild(x), u.appendChild(C), u.listener = function (e) {
                            b(e) && C.click()
                        }, y(u, d), g()
                    }, T = t.confirm = function (e, t, n) {
                        var s = e.text, a = e.submitText, i = void 0 === a ? "Yes" : a, c = e.cancelText,
                            o = void 0 === c ? "Cancel" : c, l = e.submitCallback, d = e.cancelCallback, u = e.position,
                            m = void 0 === u ? r.positions.confirm || m.top : u;
                        p(), k();
                        var v = document.createElement("div"), C = f();
                        v.id = C;
                        var E = document.createElement("div");
                        E.classList.add(r.classes.textbox), E.classList.add(r.classes.backgroundInfo), E.innerHTML = '<div class="' + r.classes.textboxInner + '">' + s + "</div>";
                        var T = document.createElement("div");
                        T.classList.add(r.classes.button), T.classList.add(r.classes.elementHalf), T.classList.add(r.classes.backgroundSuccess), T.innerHTML = i, T.onclick = function () {
                            L(C, m), h(), l ? l() : t && t()
                        };
                        var M = document.createElement("div");
                        M.classList.add(r.classes.button), M.classList.add(r.classes.elementHalf), M.classList.add(r.classes.backgroundError), M.innerHTML = o, M.onclick = function () {
                            L(C, m), h(), d ? d() : n && n()
                        }, v.appendChild(E), v.appendChild(T), v.appendChild(M), v.listener = function (e) {
                            b(e) ? T.click() : x(e) && M.click()
                        }, y(v, m), g(v, m)
                    }, M = function (e, t, n) {
                        var i = e.text, c = e.submitText, o = void 0 === c ? "Submit" : c, l = e.cancelText,
                            d = void 0 === l ? "Cancel" : l, u = e.submitCallback, m = e.cancelCallback, v = e.position,
                            C = void 0 === v ? r.positions.input || C.top : v,
                            E = s(e, ["text", "submitText", "cancelText", "submitCallback", "cancelCallback", "position"]);
                        p(), k();
                        var T = document.createElement("div"), M = f();
                        T.id = M;
                        var H = document.createElement("div");
                        H.classList.add(r.classes.textbox), H.classList.add(r.classes.backgroundInfo), H.innerHTML = '<div class="' + r.classes.textboxInner + '">' + i + "</div>";
                        var S = document.createElement("input");
                        S.classList.add(r.classes.inputField), S.setAttribute("autocapitalize", E.autocapitalize || "none"), S.setAttribute("autocomplete", E.autocomplete || "off"), S.setAttribute("autocorrect", E.autocorrect || "off"), S.setAttribute("autofocus", E.autofocus || "true"), S.setAttribute("inputmode", E.inputmode || "verbatim"), S.setAttribute("max", E.max || ""), S.setAttribute("maxlength", E.maxlength || ""), S.setAttribute("min", E.min || ""), S.setAttribute("minlength", E.minlength || ""), S.setAttribute("placeholder", E.placeholder || ""), S.setAttribute("spellcheck", E.spellcheck || "default"), S.setAttribute("step", E.step || "any"), S.setAttribute("type", E.type || "text"), S.value = E.value || "", E.allowed && (S.oninput = function () {
                            var e = void 0;
                            if (Array.isArray(E.allowed)) {
                                for (var t = "", n = E.allowed, s = 0; s < n.length; s++) "an" === n[s] ? t += "0-9a-zA-Z" : "a" === n[s] ? t += "a-zA-Z" : "n" === n[s] && (t += "0-9"), "s" === n[s] && (t += " ");
                                e = new RegExp("[^" + t + "]", "g")
                            } else "object" === a(E.allowed) && (e = E.allowed);
                            S.value = S.value.replace(e, "")
                        });
                        var w = document.createElement("div");
                        w.classList.add(r.classes.button), w.classList.add(r.classes.elementHalf), w.classList.add(r.classes.backgroundSuccess), w.innerHTML = o, w.onclick = function () {
                            L(M, C), h(), u ? u(S.value) : t && t(S.value)
                        };
                        var O = document.createElement("div");
                        O.classList.add(r.classes.button), O.classList.add(r.classes.elementHalf), O.classList.add(r.classes.backgroundError), O.innerHTML = d, O.onclick = function () {
                            L(M, C), h(), m ? m(S.value) : n && n(S.value)
                        }, T.appendChild(H), T.appendChild(S), T.appendChild(w), T.appendChild(O), T.listener = function (e) {
                            b(e) ? w.click() : x(e) && O.click()
                        }, y(T, C), S.focus(), g(T, C)
                    };
                    t.input = M;
                    var H = t.select = function (e, t) {
                        var n = e.text, s = e.cancelText, a = void 0 === s ? "Cancel" : s, i = e.cancelCallback,
                            c = e.choices, o = e.position, l = void 0 === o ? r.positions.select || l.top : o;
                        p(), k();
                        var d = document.createElement("div"), u = f();
                        d.id = u;
                        var v = document.createElement("div");
                        v.classList.add(r.classes.textbox), v.classList.add(r.classes.backgroundInfo), v.innerHTML = '<div class="' + r.classes.textboxInner + '">' + n + "</div>", d.appendChild(v), c.forEach(function (e, t) {
                            var n = e.type, s = void 0 === n ? 1 : n, a = e.text, i = e.handler,
                                o = document.createElement("div");
                            o.classList.add(m[s]), o.classList.add(r.classes.button), o.classList.add(r.classes.selectChoice);
                            var p = c[t + 1];
                            p && !p.type && (p.type = 1), p && p.type === s && o.classList.add(r.classes.selectChoiceRepeated), o.innerHTML = a, o.onclick = function () {
                                L(u, l), h(), i()
                            }, d.appendChild(o)
                        });
                        var b = document.createElement("div");
                        b.classList.add(r.classes.backgroundNeutral), b.classList.add(r.classes.button), b.innerHTML = a, b.onclick = function () {
                            L(u, l), h(), i ? i() : t && t()
                        }, d.appendChild(b), d.listener = function (e) {
                            x(e) && b.click()
                        }, y(d, l), g(d, l)
                    }, S = t.date = function (e, t, n) {
                        var s = e.value, a = void 0 === s ? new Date : s, i = e.submitText, c = void 0 === i ? "OK" : i,
                            o = e.cancelText, l = void 0 === o ? "Cancel" : o, d = e.submitCallback,
                            u = e.cancelCallback, m = e.position, v = void 0 === m ? r.positions.date || v.top : m;
                        p(), k();
                        var C = "&#9662", E = document.createElement("div"), T = document.createElement("div"),
                            M = document.createElement("div"), H = function (e) {
                                E.innerHTML = r.dateMonths[e.getMonth()], T.innerHTML = e.getDate(), M.innerHTML = e.getFullYear()
                            }, S = function (e) {
                                var t = new Date(a.getFullYear(), a.getMonth() + 1, 0).getDate(),
                                    n = e.target.textContent.replace(/^0+/, "").replace(/[^\d]/g, "").slice(0, 2);
                                Number(n) > t && (n = t.toString()), e.target.textContent = n, Number(n) < 1 && (n = "1"), a.setDate(Number(n))
                            }, w = function (e) {
                                var t = e.target.textContent.replace(/^0+/, "").replace(/[^\d]/g, "").slice(0, 4);
                                e.target.textContent = t, a.setFullYear(Number(t))
                            }, O = function (e) {
                                H(a)
                            }, A = function (e) {
                                var t = new Date(a.getFullYear(), a.getMonth() + e + 1, 0).getDate();
                                a.getDate() > t && a.setDate(t), a.setMonth(a.getMonth() + e), H(a)
                            }, D = function (e) {
                                a.setDate(a.getDate() + e), H(a)
                            }, I = function (e) {
                                var t = a.getFullYear() + e;
                                t < 0 ? a.setFullYear(0) : a.setFullYear(a.getFullYear() + e), H(a)
                            }, j = document.createElement("div"), N = f();
                        j.id = N;
                        var P = document.createElement("div");
                        P.classList.add(r.classes.backgroundInfo);
                        var F = document.createElement("div");
                        F.classList.add(r.classes.dateSelectorInner);
                        var Y = document.createElement("div");
                        Y.classList.add(r.classes.button), Y.classList.add(r.classes.elementThird), Y.classList.add(r.classes.dateSelectorUp), Y.innerHTML = C;
                        var _ = document.createElement("div");
                        _.classList.add(r.classes.button), _.classList.add(r.classes.elementThird), _.classList.add(r.classes.dateSelectorUp), _.innerHTML = C;
                        var z = document.createElement("div");
                        z.classList.add(r.classes.button), z.classList.add(r.classes.elementThird), z.classList.add(r.classes.dateSelectorUp), z.innerHTML = C, E.classList.add(r.classes.element), E.classList.add(r.classes.elementThird), E.innerHTML = r.dateMonths[a.getMonth()], T.classList.add(r.classes.element), T.classList.add(r.classes.elementThird), T.setAttribute("contentEditable", !0), T.addEventListener("input", S), T.addEventListener("blur", O), T.innerHTML = a.getDate(), M.classList.add(r.classes.element), M.classList.add(r.classes.elementThird), M.setAttribute("contentEditable", !0), M.addEventListener("input", w), M.addEventListener("blur", O), M.innerHTML = a.getFullYear();
                        var U = document.createElement("div");
                        U.classList.add(r.classes.button), U.classList.add(r.classes.elementThird), U.innerHTML = C;
                        var B = document.createElement("div");
                        B.classList.add(r.classes.button), B.classList.add(r.classes.elementThird), B.innerHTML = C;
                        var J = document.createElement("div");
                        J.classList.add(r.classes.button), J.classList.add(r.classes.elementThird), J.innerHTML = C, Y.onclick = function () {
                            return A(1)
                        }, _.onclick = function () {
                            return D(1)
                        }, z.onclick = function () {
                            return I(1)
                        }, U.onclick = function () {
                            return A(-1)
                        }, B.onclick = function () {
                            return D(-1)
                        }, J.onclick = function () {
                            return I(-1)
                        };
                        var R = document.createElement("div");
                        R.classList.add(r.classes.button), R.classList.add(r.classes.elementHalf), R.classList.add(r.classes.backgroundSuccess), R.innerHTML = c, R.onclick = function () {
                            L(N, v), h(), d ? d(a) : t && t(a)
                        };
                        var W = document.createElement("div");
                        W.classList.add(r.classes.button), W.classList.add(r.classes.elementHalf), W.classList.add(r.classes.backgroundError), W.innerHTML = l, W.onclick = function () {
                            L(N, v), h(), u ? u(a) : n && n(a)
                        }, F.appendChild(Y), F.appendChild(_), F.appendChild(z), F.appendChild(E), F.appendChild(T), F.appendChild(M), F.appendChild(U), F.appendChild(B), F.appendChild(J), P.appendChild(F), j.appendChild(P), j.appendChild(R), j.appendChild(W), j.listener = function (e) {
                            b(e) ? R.click() : x(e) && W.click()
                        }, y(j, v), g(j, v)
                    };
                    t.default = {
                        alert: C,
                        force: E,
                        confirm: T,
                        input: M,
                        select: H,
                        date: S,
                        setOptions: l,
                        hideAlerts: k
                    }
                }])
            })
        }).call(t, n(0)(e))
    }])
});