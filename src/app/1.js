function pegasus(t, e) {
    return e = new XMLHttpRequest, e.open("GET", t), t = [], e.onreadystatechange = e.then = function (n, r, o, i) {
        if (n && n.call && (t = [, n, r]), 4 == e.readyState && (o = t[0 | e.status / 200])) {
            try {
                i = JSON.parse(e.responseText)
            } catch (t) {
                i = null
            }
            o(i, e)
        }
    }, e.send(), e
}

function getNewUser() {
    function t(t, e) {
        var n = Array.prototype.slice.call(document.getElementsByTagName("li"));
        n.find(function (e) {
            return e.getAttribute("data-label") === t
        }).setAttribute("data-value", e)
    }

    var e = "";
    document.body.classList.contains("lego") && (e = "&lego");
    var n = pegasus("https://randomuser.me/api/0.4/?randomapi" + e);
    n.then(function (e) {
        if (!e.error) {
            var n = e.results[0].user;
            n.picture = n.picture.replace("http://api.", "https://"), n.picture = n.picture.replace(".me/", ".me/api/"), document.getElementById("user_photo").getElementsByTagName("img")[0].src = n.picture, t("name", n.name.first + " " + n.name.last), document.getElementById("user_value").innerHTML = n.name.first + " " + n.name.last, t("email", n.email);
            var r = new Date(1e3 * n.dob);
            t("birthday", r.getMonth() + 1 + "/" + (r.getDay() + 1) + "/19" + r.getYear()), t("location", n.location.street), t("phone", n.cell), t("pass", n.password)
        }
    })
}

!function (t, e) {
    "undefined" != typeof module ? module.exports = e() : "function" == typeof define && "object" == typeof define.amd ? define(e) : this[t] = e()
}("domready", function () {
    var t, e = [], n = document, r = n.documentElement.doScroll, o = "DOMContentLoaded",
        i = (r ? /^loaded|^c/ : /^loaded|^i|^c/).test(n.readyState);
    return i || n.addEventListener(o, t = function () {
        for (n.removeEventListener(o, t), i = 1; t = e.shift();) t()
    }), function (t) {
        i ? setTimeout(t, 0) : e.push(t)
    }
}), function () {
    if (document.title.indexOf("home") !== -1) {
        var t = pegasus("https://randomuser.me/api/?randomapi");
        t.then(function (t) {
            e(t)
        }, function (t) {
            e(t)
        });
        var e = function (t) {
            if (t.error) {
                var e = document.createElement("div");
                e.className = "alert", e.innerHTML = 'API Status: OFFLINE. Please tweet us <a href="https://twitter.com/randomapi">@randomapi</a> if you are seeing this message.';
                var n = document.getElementsByTagName("body")[0];
                n.insertBefore(e, n.firstChild)
            }
        }
    }
}(), function () {
    domready(function () {
        if (window.location.href.indexOf("stats") !== -1) {
            var t = pegasus("getStats/charts");
            t.then(function (t) {
                var e = t.map(function (t) {
                    return t.date
                }), n = t.map(function (t) {
                    return Number(t.total)
                }), r = t.map(function (t) {
                    return Math.round(t.bandwidth / 1024 / 1024 * 100) / 100
                });
                Highcharts.setOptions({lang: {thousandsSep: ","}}), new Highcharts.Chart({
                    chart: {renderTo: document.getElementById("charts")},
                    title: {text: ""},
                    xAxis: {title: {text: "Date"}, categories: e},
                    yAxis: [{
                        minPadding: .2,
                        maxPadding: .2,
                        labels: {style: {color: "#93B1C6"}},
                        title: {text: "Users"},
                        opposite: !0
                    }, {labels: {format: "{value} MB", style: {color: "#FF7148"}}, title: {text: "Bandwidth"}}],
                    series: [{name: "Bandwidth", yAxis: 1, color: "#FF7148", data: r}, {name: "Users", data: n, color: "#93B1C6"}],
                    tooltip: {shared: !0}
                })
            })
        }
    })
}(), function () {
    domready(function () {
        if (document.title.indexOf("Home") !== -1) {
            getNewUser();
            var t = Array.prototype.slice.call(document.getElementById("values_list").getElementsByTagName("li"));
            t.forEach(function (e) {
                e.addEventListener("mouseover", function () {
                    t.forEach(function (t) {
                        t.className = t.className.replace(/\bactive\b/, "")
                    });

                    var e = this;
                    e.className += " active",
                        document.getElementById("user_title").innerHTML = e.getAttribute("data-title"),
                        document.getElementById("user_value").innerHTML = e.getAttribute("data-value"),
                        e.getAttribute("data-caps")
                            ? document.getElementById("user_value").style.textTransform = "lowercase"
                            : document.getElementById("user_value").style.textTransform = "capitalize"
                })
            })
        }
    })
}(), function () {
    if (document.title.indexOf("Home") !== -1) {
        var t = [], e = "38,38,40,40,37,39,37,39,66,65";
        document.addEventListener("keydown", function (n) {
            t.push(n.keyCode), t.toString().indexOf(e) >= 0 && (t = [], document.getElementsByTagName("header")[0].getElementsByTagName("h1")[0].innerHTML = "Random Lego Generator", document.getElementsByTagName("body")[0].className += " lego", window.scrollTo(0, 0), getNewUser())
        })
    }
}(), function () {
    function t(t, e, n) {
        for (var r = e.split(" "), o = 0, i = r.length; o < i; o++) t.addEventListener(r[o], n, !1)
    }

    domready(function () {
        t(document.getElementsByClassName("nav_toggle")[0], "touchstart click", function () {
            document.getElementsByTagName("body")[0].classList.toggle("active")
        }), window.addEventListener("resize", function () {
            document.body.clientWidth > 1145 && (document.getElementsByTagName("body")[0].className = document.getElementsByTagName("body")[0].className.replace(/\bactive\b/, ""))
        })
    })
}(), function () {
    function t(t) {
        t.style.opacity = 1, function e() {
            (t.style.opacity -= .1) < 0 ? t.style.display = "none" : requestAnimationFrame(e)
        }()
    }

    function e(t, e) {
        t.style.opacity = 0, t.style.display = e || "block", function e() {
            var n = parseFloat(t.style.opacity);
            (n += .1) > 1 || (t.style.opacity = n, requestAnimationFrame(e))
        }()
    }

    function n(t) {
        function e(t) {
            for (var e, n, r = t.length; r;) n = Math.floor(Math.random() * r--), e = t[r], t[r] = t[n], t[n] = e;
            return t
        }

        return e(new Array(t).fill(0).map(function (t, e) {
            return e
        }))
    }

    window.location.href.match(/photos$/) && domready(function () {
        for (var r = function (t, e) {
            var n = document.createElement("img");
            n.src = "https://randomuser.me/api/portraits/" + e + "/" + t + ".jpg", n.setAttribute("data-int", t), n.setAttribute("data-gender", e), console.log(e), document.getElementById("photos_" + e).appendChild(n)
        }, o = n(95), i = n(95), s = n(9), a = 0; a <= 99; a++) r(o[a], "men");
        for (var a = 0; a <= 95; a++) r(i[a], "women");
        for (var a = 0; a <= 9; a++) r(s[a], "lego");
        Array.prototype.slice.call(document.getElementsByTagName("img")).forEach(function (t) {
            t.addEventListener("load", function () {
                this.className += " come_in", t.removeEventListener("load", function () {
                })
            }), t.addEventListener("click", function () {
                document.getElementById("large_img").setAttribute("src", "https://randomuser.me/api/portraits/" + this.getAttribute("data-gender") + "/" + this.getAttribute("data-int") + ".jpg"), e(document.getElementsByClassName("modal_mask")[0]), console.log("fadein")
            })
        }), document.getElementsByClassName("modal_mask")[0].addEventListener("click", function () {
            document.getElementsByClassName("modal_mask")[0], t(document.getElementsByClassName("modal_mask")[0])
        })
    })
}(), !function (t) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = t(); else if ("function" == typeof define && define.amd) define([], t); else {
        var e;
        e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, e.io = t()
    }
}(function () {
    var t;
    return function t(e, n, r) {
        function o(s, a) {
            if (!n[s]) {
                if (!e[s]) {
                    var c = "function" == typeof require && require;
                    if (!a && c) return c(s, !0);
                    if (i) return i(s, !0);
                    var u = new Error("Cannot find module '" + s + "'");
                    throw u.code = "MODULE_NOT_FOUND", u
                }
                var f = n[s] = {exports: {}};
                e[s][0].call(f.exports, function (t) {
                    var n = e[s][1][t];
                    return o(n ? n : t)
                }, f, f.exports, t, e, n, r)
            }
            return n[s].exports
        }

        for (var i = "function" == typeof require && require, s = 0; s < r.length; s++) o(r[s]);
        return o
    }({
        1: [function (t, e, n) {
            function r(t, e) {
                "object" == typeof t && (e = t, t = void 0), e = e || {};
                var n, r = o(t), i = r.source, u = r.id, f = r.path, l = c[u] && f in c[u].nsps,
                    p = e.forceNew || e["force new connection"] || !1 === e.multiplex || l;
                return p ? (a("ignoring socket cache for %s", i), n = s(i, e)) : (c[u] || (a("new io instance for %s", i), c[u] = s(i, e)), n = c[u]), n.socket(r.path)
            }

            var o = t("./url"), i = t("socket.io-parser"), s = t("./manager"), a = t("debug")("socket.io-client");
            e.exports = n = r;
            var c = n.managers = {};
            n.protocol = i.protocol, n.connect = r, n.Manager = t("./manager"), n.Socket = t("./socket")
        }, {"./manager": 2, "./socket": 4, "./url": 5, debug: 14, "socket.io-parser": 40}],
        2: [function (t, e, n) {
            function r(t, e) {
                return this instanceof r ? (t && "object" == typeof t && (e = t, t = void 0), e = e || {}, e.path = e.path || "/socket.io", this.nsps = {}, this.subs = [], this.opts = e, this.reconnection(e.reconnection !== !1), this.reconnectionAttempts(e.reconnectionAttempts || 1 / 0), this.reconnectionDelay(e.reconnectionDelay || 1e3), this.reconnectionDelayMax(e.reconnectionDelayMax || 5e3), this.randomizationFactor(e.randomizationFactor || .5), this.backoff = new p({
                    min: this.reconnectionDelay(),
                    max: this.reconnectionDelayMax(),
                    jitter: this.randomizationFactor()
                }), this.timeout(null == e.timeout ? 2e4 : e.timeout), this.readyState = "closed", this.uri = t, this.connecting = [], this.lastPing = null, this.encoding = !1, this.packetBuffer = [], this.encoder = new a.Encoder, this.decoder = new a.Decoder, this.autoConnect = e.autoConnect !== !1, void(this.autoConnect && this.open())) : new r(t, e)
            }

            var o = t("engine.io-client"), i = t("./socket"), s = t("component-emitter"), a = t("socket.io-parser"), c = t("./on"),
                u = t("component-bind"), f = t("debug")("socket.io-client:manager"), l = t("indexof"), p = t("backo2"),
                h = Object.prototype.hasOwnProperty;
            e.exports = r, r.prototype.emitAll = function () {
                this.emit.apply(this, arguments);
                for (var t in this.nsps) h.call(this.nsps, t) && this.nsps[t].emit.apply(this.nsps[t], arguments)
            }, r.prototype.updateSocketIds = function () {
                for (var t in this.nsps) h.call(this.nsps, t) && (this.nsps[t].id = this.engine.id)
            }, s(r.prototype), r.prototype.reconnection = function (t) {
                return arguments.length ? (this._reconnection = !!t, this) : this._reconnection
            }, r.prototype.reconnectionAttempts = function (t) {
                return arguments.length ? (this._reconnectionAttempts = t, this) : this._reconnectionAttempts
            }, r.prototype.reconnectionDelay = function (t) {
                return arguments.length ? (this._reconnectionDelay = t, this.backoff && this.backoff.setMin(t), this) : this._reconnectionDelay
            }, r.prototype.randomizationFactor = function (t) {
                return arguments.length ? (this._randomizationFactor = t, this.backoff && this.backoff.setJitter(t), this) : this._randomizationFactor
            }, r.prototype.reconnectionDelayMax = function (t) {
                return arguments.length ? (this._reconnectionDelayMax = t, this.backoff && this.backoff.setMax(t), this) : this._reconnectionDelayMax
            }, r.prototype.timeout = function (t) {
                return arguments.length ? (this._timeout = t, this) : this._timeout
            }, r.prototype.maybeReconnectOnOpen = function () {
                !this.reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect()
            }, r.prototype.open = r.prototype.connect = function (t) {
                if (f("readyState %s", this.readyState), ~this.readyState.indexOf("open")) return this;
                f("opening %s", this.uri), this.engine = o(this.uri, this.opts);
                var e = this.engine, n = this;
                this.readyState = "opening", this.skipReconnect = !1;
                var r = c(e, "open", function () {
                    n.onopen(), t && t()
                }), i = c(e, "error", function (e) {
                    if (f("connect_error"), n.cleanup(), n.readyState = "closed", n.emitAll("connect_error", e), t) {
                        var r = new Error("Connection error");
                        r.data = e, t(r)
                    } else n.maybeReconnectOnOpen()
                });
                if (!1 !== this._timeout) {
                    var s = this._timeout;
                    f("connect attempt will timeout after %d", s);
                    var a = setTimeout(function () {
                        f("connect attempt timed out after %d", s), r.destroy(), e.close(), e.emit("error", "timeout"), n.emitAll("connect_timeout", s)
                    }, s);
                    this.subs.push({
                        destroy: function () {
                            clearTimeout(a)
                        }
                    })
                }
                return this.subs.push(r), this.subs.push(i), this
            }, r.prototype.onopen = function () {
                f("open"), this.cleanup(), this.readyState = "open", this.emit("open");
                var t = this.engine;
                this.subs.push(c(t, "data", u(this, "ondata"))), this.subs.push(c(t, "ping", u(this, "onping"))), this.subs.push(c(t, "pong", u(this, "onpong"))), this.subs.push(c(t, "error", u(this, "onerror"))), this.subs.push(c(t, "close", u(this, "onclose"))), this.subs.push(c(this.decoder, "decoded", u(this, "ondecoded")))
            }, r.prototype.onping = function () {
                this.lastPing = new Date, this.emitAll("ping")
            }, r.prototype.onpong = function () {
                this.emitAll("pong", new Date - this.lastPing)
            }, r.prototype.ondata = function (t) {
                this.decoder.add(t)
            }, r.prototype.ondecoded = function (t) {
                this.emit("packet", t)
            }, r.prototype.onerror = function (t) {
                f("error", t), this.emitAll("error", t)
            }, r.prototype.socket = function (t) {
                function e() {
                    ~l(r.connecting, n) || r.connecting.push(n)
                }

                var n = this.nsps[t];
                if (!n) {
                    n = new i(this, t), this.nsps[t] = n;
                    var r = this;
                    n.on("connecting", e), n.on("connect", function () {
                        n.id = r.engine.id
                    }), this.autoConnect && e()
                }
                return n
            }, r.prototype.destroy = function (t) {
                var e = l(this.connecting, t);
                ~e && this.connecting.splice(e, 1), this.connecting.length || this.close()
            }, r.prototype.packet = function (t) {
                f("writing packet %j", t);
                var e = this;
                e.encoding ? e.packetBuffer.push(t) : (e.encoding = !0, this.encoder.encode(t, function (n) {
                    for (var r = 0; r < n.length; r++) e.engine.write(n[r], t.options);
                    e.encoding = !1, e.processPacketQueue()
                }))
            }, r.prototype.processPacketQueue = function () {
                if (this.packetBuffer.length > 0 && !this.encoding) {
                    var t = this.packetBuffer.shift();
                    this.packet(t)
                }
            }, r.prototype.cleanup = function () {
                f("cleanup");
                for (var t; t = this.subs.shift();) t.destroy();
                this.packetBuffer = [], this.encoding = !1, this.lastPing = null, this.decoder.destroy()
            }, r.prototype.close = r.prototype.disconnect = function () {
                f("disconnect"), this.skipReconnect = !0, this.reconnecting = !1, "opening" == this.readyState && this.cleanup(), this.backoff.reset(), this.readyState = "closed", this.engine && this.engine.close()
            }, r.prototype.onclose = function (t) {
                f("onclose"), this.cleanup(), this.backoff.reset(), this.readyState = "closed", this.emit("close", t), this._reconnection && !this.skipReconnect && this.reconnect()
            }, r.prototype.reconnect = function () {
                if (this.reconnecting || this.skipReconnect) return this;
                var t = this;
                if (this.backoff.attempts >= this._reconnectionAttempts) f("reconnect failed"), this.backoff.reset(), this.emitAll("reconnect_failed"), this.reconnecting = !1; else {
                    var e = this.backoff.duration();
                    f("will wait %dms before reconnect attempt", e), this.reconnecting = !0;
                    var n = setTimeout(function () {
                        t.skipReconnect || (f("attempting reconnect"), t.emitAll("reconnect_attempt", t.backoff.attempts), t.emitAll("reconnecting", t.backoff.attempts), t.skipReconnect || t.open(function (e) {
                            e ? (f("reconnect attempt error"), t.reconnecting = !1, t.reconnect(), t.emitAll("reconnect_error", e.data)) : (f("reconnect success"), t.onreconnect())
                        }))
                    }, e);
                    this.subs.push({
                        destroy: function () {
                            clearTimeout(n)
                        }
                    })
                }
            }, r.prototype.onreconnect = function () {
                var t = this.backoff.attempts;
                this.reconnecting = !1, this.backoff.reset(), this.updateSocketIds(), this.emitAll("reconnect", t)
            }
        }, {
            "./on": 3,
            "./socket": 4,
            backo2: 8,
            "component-bind": 11,
            "component-emitter": 12,
            debug: 14,
            "engine.io-client": 16,
            indexof: 32,
            "socket.io-parser": 40
        }],
        3: [function (t, e, n) {
            function r(t, e, n) {
                return t.on(e, n), {
                    destroy: function () {
                        t.removeListener(e, n)
                    }
                }
            }

            e.exports = r
        }, {}],
        4: [function (t, e, n) {
            function r(t, e) {
                this.io = t, this.nsp = e, this.json = this, this.ids = 0, this.acks = {}, this.receiveBuffer = [], this.sendBuffer = [], this.connected = !1, this.disconnected = !0, this.io.autoConnect && this.open()
            }

            var o = t("socket.io-parser"), i = t("component-emitter"), s = t("to-array"), a = t("./on"), c = t("component-bind"),
                u = t("debug")("socket.io-client:socket"), f = t("has-binary");
            e.exports = n = r;
            var l = {
                connect: 1,
                connect_error: 1,
                connect_timeout: 1,
                connecting: 1,
                disconnect: 1,
                error: 1,
                reconnect: 1,
                reconnect_attempt: 1,
                reconnect_failed: 1,
                reconnect_error: 1,
                reconnecting: 1,
                ping: 1,
                pong: 1
            }, p = i.prototype.emit;
            i(r.prototype), r.prototype.subEvents = function () {
                if (!this.subs) {
                    var t = this.io;
                    this.subs = [a(t, "open", c(this, "onopen")), a(t, "packet", c(this, "onpacket")), a(t, "close", c(this, "onclose"))]
                }
            }, r.prototype.open = r.prototype.connect = function () {
                return this.connected ? this : (this.subEvents(), this.io.open(), "open" == this.io.readyState && this.onopen(), this.emit("connecting"), this)
            }, r.prototype.send = function () {
                var t = s(arguments);
                return t.unshift("message"), this.emit.apply(this, t), this
            }, r.prototype.emit = function (t) {
                if (l.hasOwnProperty(t)) return p.apply(this, arguments), this;
                var e = s(arguments), n = o.EVENT;
                f(e) && (n = o.BINARY_EVENT);
                var r = {type: n, data: e};
                return r.options = {}, r.options.compress = !this.flags || !1 !== this.flags.compress, "function" == typeof e[e.length - 1] && (u("emitting packet with ack id %d", this.ids), this.acks[this.ids] = e.pop(), r.id = this.ids++), this.connected ? this.packet(r) : this.sendBuffer.push(r), delete this.flags, this
            }, r.prototype.packet = function (t) {
                t.nsp = this.nsp, this.io.packet(t)
            }, r.prototype.onopen = function () {
                u("transport is open - connecting"), "/" != this.nsp && this.packet({type: o.CONNECT})
            }, r.prototype.onclose = function (t) {
                u("close (%s)", t), this.connected = !1, this.disconnected = !0, delete this.id, this.emit("disconnect", t)
            }, r.prototype.onpacket = function (t) {
                if (t.nsp == this.nsp) switch (t.type) {
                    case o.CONNECT:
                        this.onconnect();
                        break;
                    case o.EVENT:
                        this.onevent(t);
                        break;
                    case o.BINARY_EVENT:
                        this.onevent(t);
                        break;
                    case o.ACK:
                        this.onack(t);
                        break;
                    case o.BINARY_ACK:
                        this.onack(t);
                        break;
                    case o.DISCONNECT:
                        this.ondisconnect();
                        break;
                    case o.ERROR:
                        this.emit("error", t.data)
                }
            }, r.prototype.onevent = function (t) {
                var e = t.data || [];
                u("emitting event %j", e), null != t.id && (u("attaching ack callback to event"), e.push(this.ack(t.id))), this.connected ? p.apply(this, e) : this.receiveBuffer.push(e)
            }, r.prototype.ack = function (t) {
                var e = this, n = !1;
                return function () {
                    if (!n) {
                        n = !0;
                        var r = s(arguments);
                        u("sending ack %j", r);
                        var i = f(r) ? o.BINARY_ACK : o.ACK;
                        e.packet({type: i, id: t, data: r})
                    }
                }
            }, r.prototype.onack = function (t) {
                var e = this.acks[t.id];
                "function" == typeof e ? (u("calling ack %s with %j", t.id, t.data), e.apply(this, t.data), delete this.acks[t.id]) : u("bad ack %s", t.id)
            }, r.prototype.onconnect = function () {
                this.connected = !0, this.disconnected = !1, this.emit("connect"), this.emitBuffered()
            }, r.prototype.emitBuffered = function () {
                var t;
                for (t = 0; t < this.receiveBuffer.length; t++) p.apply(this, this.receiveBuffer[t]);
                for (this.receiveBuffer = [], t = 0; t < this.sendBuffer.length; t++) this.packet(this.sendBuffer[t]);
                this.sendBuffer = []
            }, r.prototype.ondisconnect = function () {
                u("server disconnect (%s)", this.nsp), this.destroy(), this.onclose("io server disconnect")
            }, r.prototype.destroy = function () {
                if (this.subs) {
                    for (var t = 0; t < this.subs.length; t++) this.subs[t].destroy();
                    this.subs = null
                }
                this.io.destroy(this)
            }, r.prototype.close = r.prototype.disconnect = function () {
                return this.connected && (u("performing disconnect (%s)", this.nsp), this.packet({type: o.DISCONNECT})), this.destroy(), this.connected && this.onclose("io client disconnect"), this
            }, r.prototype.compress = function (t) {
                return this.flags = this.flags || {}, this.flags.compress = t, this
            }
        }, {"./on": 3, "component-bind": 11, "component-emitter": 12, debug: 14, "has-binary": 30, "socket.io-parser": 40, "to-array": 43}],
        5: [function (t, e, n) {
            (function (n) {
                function r(t, e) {
                    var r = t, e = e || n.location;
                    null == t && (t = e.protocol + "//" + e.host), "string" == typeof t && ("/" == t.charAt(0) && (t = "/" == t.charAt(1) ? e.protocol + t : e.host + t), /^(https?|wss?):\/\//.test(t) || (i("protocol-less url %s", t), t = "undefined" != typeof e ? e.protocol + "//" + t : "https://" + t), i("parse %s", t), r = o(t)), r.port || (/^(http|ws)$/.test(r.protocol) ? r.port = "80" : /^(http|ws)s$/.test(r.protocol) && (r.port = "443")), r.path = r.path || "/";
                    var s = -1 !== r.host.indexOf(":"), a = s ? "[" + r.host + "]" : r.host;
                    return r.id = r.protocol + "://" + a + ":" + r.port, r.href = r.protocol + "://" + a + (e && e.port == r.port ? "" : ":" + r.port), r
                }

                var o = t("parseuri"), i = t("debug")("socket.io-client:url");
                e.exports = r
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
        }, {debug: 14, parseuri: 38}],
        6: [function (t, e, n) {
            function r(t, e, n) {
                function r(t, o) {
                    if (r.count <= 0) throw new Error("after called too many times");
                    --r.count, t ? (i = !0, e(t), e = n) : 0 !== r.count || i || e(null, o)
                }

                var i = !1;
                return n = n || o, r.count = t, 0 === t ? e() : r
            }

            function o() {
            }

            e.exports = r
        }, {}],
        7: [function (t, e, n) {
            e.exports = function (t, e, n) {
                var r = t.byteLength;
                if (e = e || 0, n = n || r, t.slice) return t.slice(e, n);
                if (0 > e && (e += r), 0 > n && (n += r), n > r && (n = r), e >= r || e >= n || 0 === r) return new ArrayBuffer(0);
                for (var o = new Uint8Array(t), i = new Uint8Array(n - e), s = e, a = 0; n > s; s++, a++) i[a] = o[s];
                return i.buffer
            }
        }, {}],
        8: [function (t, e, n) {
            function r(t) {
                t = t || {}, this.ms = t.min || 100, this.max = t.max || 1e4, this.factor = t.factor || 2, this.jitter = t.jitter > 0 && t.jitter <= 1 ? t.jitter : 0, this.attempts = 0
            }

            e.exports = r, r.prototype.duration = function () {
                var t = this.ms * Math.pow(this.factor, this.attempts++);
                if (this.jitter) {
                    var e = Math.random(), n = Math.floor(e * this.jitter * t);
                    t = 0 == (1 & Math.floor(10 * e)) ? t - n : t + n
                }
                return 0 | Math.min(t, this.max)
            }, r.prototype.reset = function () {
                this.attempts = 0
            }, r.prototype.setMin = function (t) {
                this.ms = t
            }, r.prototype.setMax = function (t) {
                this.max = t
            }, r.prototype.setJitter = function (t) {
                this.jitter = t
            }
        }, {}],
        9: [function (t, e, n) {
            !function () {
                "use strict";
                for (var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", e = new Uint8Array(256), r = 0; r < t.length; r++) e[t.charCodeAt(r)] = r;
                n.encode = function (e) {
                    var n, r = new Uint8Array(e), o = r.length, i = "";
                    for (n = 0; o > n; n += 3) i += t[r[n] >> 2], i += t[(3 & r[n]) << 4 | r[n + 1] >> 4], i += t[(15 & r[n + 1]) << 2 | r[n + 2] >> 6], i += t[63 & r[n + 2]];
                    return o % 3 === 2 ? i = i.substring(0, i.length - 1) + "=" : o % 3 === 1 && (i = i.substring(0, i.length - 2) + "=="), i
                }, n.decode = function (t) {
                    var n, r, o, i, s, a = .75 * t.length, c = t.length, u = 0;
                    "=" === t[t.length - 1] && (a--, "=" === t[t.length - 2] && a--);
                    var f = new ArrayBuffer(a), l = new Uint8Array(f);
                    for (n = 0; c > n; n += 4) r = e[t.charCodeAt(n)], o = e[t.charCodeAt(n + 1)], i = e[t.charCodeAt(n + 2)], s = e[t.charCodeAt(n + 3)], l[u++] = r << 2 | o >> 4, l[u++] = (15 & o) << 4 | i >> 2, l[u++] = (3 & i) << 6 | 63 & s;
                    return f
                }
            }()
        }, {}],
        10: [function (t, e, n) {
            (function (t) {
                function n(t) {
                    for (var e = 0; e < t.length; e++) {
                        var n = t[e];
                        if (n.buffer instanceof ArrayBuffer) {
                            var r = n.buffer;
                            if (n.byteLength !== r.byteLength) {
                                var o = new Uint8Array(n.byteLength);
                                o.set(new Uint8Array(r, n.byteOffset, n.byteLength)), r = o.buffer
                            }
                            t[e] = r
                        }
                    }
                }

                function r(t, e) {
                    e = e || {};
                    var r = new i;
                    n(t);
                    for (var o = 0; o < t.length; o++) r.append(t[o]);
                    return e.type ? r.getBlob(e.type) : r.getBlob()
                }

                function o(t, e) {
                    return n(t), new Blob(t, e || {})
                }

                var i = t.BlobBuilder || t.WebKitBlobBuilder || t.MSBlobBuilder || t.MozBlobBuilder, s = function () {
                    try {
                        var t = new Blob(["hi"]);
                        return 2 === t.size
                    } catch (t) {
                        return !1
                    }
                }(), a = s && function () {
                    try {
                        var t = new Blob([new Uint8Array([1, 2])]);
                        return 2 === t.size
                    } catch (t) {
                        return !1
                    }
                }(), c = i && i.prototype.append && i.prototype.getBlob;
                e.exports = function () {
                    return s ? a ? t.Blob : o : c ? r : void 0
                }()
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
        }, {}],
        11: [function (t, e, n) {
            var r = [].slice;
            e.exports = function (t, e) {
                if ("string" == typeof e && (e = t[e]), "function" != typeof e) throw new Error("bind() requires a function");
                var n = r.call(arguments, 2);
                return function () {
                    return e.apply(t, n.concat(r.call(arguments)))
                }
            }
        }, {}],
        12: [function (t, e, n) {
            function r(t) {
                return t ? o(t) : void 0
            }

            function o(t) {
                for (var e in r.prototype) t[e] = r.prototype[e];
                return t
            }

            e.exports = r, r.prototype.on = r.prototype.addEventListener = function (t, e) {
                return this._callbacks = this._callbacks || {}, (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e), this
            }, r.prototype.once = function (t, e) {
                function n() {
                    this.off(t, n), e.apply(this, arguments)
                }

                return n.fn = e, this.on(t, n), this
            }, r.prototype.off = r.prototype.removeListener = r.prototype.removeAllListeners = r.prototype.removeEventListener = function (t, e) {
                if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
                var n = this._callbacks["$" + t];
                if (!n) return this;
                if (1 == arguments.length) return delete this._callbacks["$" + t], this;
                for (var r, o = 0; o < n.length; o++) if (r = n[o], r === e || r.fn === e) {
                    n.splice(o, 1);
                    break
                }
                return this
            }, r.prototype.emit = function (t) {
                this._callbacks = this._callbacks || {};
                var e = [].slice.call(arguments, 1), n = this._callbacks["$" + t];
                if (n) {
                    n = n.slice(0);
                    for (var r = 0, o = n.length; o > r; ++r) n[r].apply(this, e)
                }
                return this
            }, r.prototype.listeners = function (t) {
                return this._callbacks = this._callbacks || {}, this._callbacks["$" + t] || []
            }, r.prototype.hasListeners = function (t) {
                return !!this.listeners(t).length
            }
        }, {}],
        13: [function (t, e, n) {
            e.exports = function (t, e) {
                var n = function () {
                };
                n.prototype = e.prototype, t.prototype = new n, t.prototype.constructor = t
            }
        }, {}],
        14: [function (t, e, n) {
            function r() {
                return "WebkitAppearance" in document.documentElement.style || window.console && (console.firebug || console.exception && console.table) || navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31
            }

            function o() {
                var t = arguments, e = this.useColors;
                if (t[0] = (e ? "%c" : "") + this.namespace + (e ? " %c" : " ") + t[0] + (e ? "%c " : " ") + "+" + n.humanize(this.diff), !e) return t;
                var r = "color: " + this.color;
                t = [t[0], r, "color: inherit"].concat(Array.prototype.slice.call(t, 1));
                var o = 0, i = 0;
                return t[0].replace(/%[a-z%]/g, function (t) {
                    "%%" !== t && (o++, "%c" === t && (i = o))
                }), t.splice(i, 0, r), t
            }

            function i() {
                return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments)
            }

            function s(t) {
                try {
                    null == t ? n.storage.removeItem("debug") : n.storage.debug = t
                } catch (t) {
                }
            }

            function a() {
                var t;
                try {
                    t = n.storage.debug
                } catch (t) {
                }
                return t
            }

            function c() {
                try {
                    return window.localStorage
                } catch (t) {
                }
            }

            n = e.exports = t("./debug"), n.log = i, n.formatArgs = o, n.save = s, n.load = a, n.useColors = r, n.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : c(), n.colors = ["lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson"], n.formatters.j = function (t) {
                return JSON.stringify(t)
            }, n.enable(a())
        }, {"./debug": 15}],
        15: [function (t, e, n) {
            function r() {
                return n.colors[f++ % n.colors.length]
            }

            function o(t) {
                function e() {
                }

                function o() {
                    var t = o, e = +new Date, i = e - (u || e);
                    t.diff = i, t.prev = u, t.curr = e, u = e, null == t.useColors && (t.useColors = n.useColors()), null == t.color && t.useColors && (t.color = r());
                    var s = Array.prototype.slice.call(arguments);
                    s[0] = n.coerce(s[0]), "string" != typeof s[0] && (s = ["%o"].concat(s));
                    var a = 0;
                    s[0] = s[0].replace(/%([a-z%])/g, function (e, r) {
                        if ("%%" === e) return e;
                        a++;
                        var o = n.formatters[r];
                        if ("function" == typeof o) {
                            var i = s[a];
                            e = o.call(t, i), s.splice(a, 1), a--
                        }
                        return e
                    }), "function" == typeof n.formatArgs && (s = n.formatArgs.apply(t, s));
                    var c = o.log || n.log || console.log.bind(console);
                    c.apply(t, s)
                }

                e.enabled = !1, o.enabled = !0;
                var i = n.enabled(t) ? o : e;
                return i.namespace = t, i
            }

            function i(t) {
                n.save(t);
                for (var e = (t || "").split(/[\s,]+/), r = e.length, o = 0; r > o; o++) e[o] && (t = e[o].replace(/\*/g, ".*?"), "-" === t[0] ? n.skips.push(new RegExp("^" + t.substr(1) + "$")) : n.names.push(new RegExp("^" + t + "$")))
            }

            function s() {
                n.enable("")
            }

            function a(t) {
                var e, r;
                for (e = 0, r = n.skips.length; r > e; e++) if (n.skips[e].test(t)) return !1;
                for (e = 0, r = n.names.length; r > e; e++) if (n.names[e].test(t)) return !0;
                return !1
            }

            function c(t) {
                return t instanceof Error ? t.stack || t.message : t
            }

            n = e.exports = o, n.coerce = c, n.disable = s, n.enable = i, n.enabled = a, n.humanize = t("ms"), n.names = [], n.skips = [], n.formatters = {};
            var u, f = 0
        }, {ms: 35}],
        16: [function (t, e, n) {
            e.exports = t("./lib/")
        }, {"./lib/": 17}],
        17: [function (t, e, n) {
            e.exports = t("./socket"), e.exports.parser = t("engine.io-parser")
        }, {"./socket": 18, "engine.io-parser": 27}],
        18: [function (t, e, n) {
            (function (n) {
                function r(t, e) {
                    if (!(this instanceof r)) return new r(t, e);
                    e = e || {}, t && "object" == typeof t && (e = t, t = null), t ? (t = f(t), e.hostname = t.host, e.secure = "https" == t.protocol || "wss" == t.protocol, e.port = t.port, t.query && (e.query = t.query)) : e.host && (e.hostname = f(e.host).host), this.secure = null != e.secure ? e.secure : n.location && "https:" == location.protocol, e.hostname && !e.port && (e.port = this.secure ? "443" : "80"), this.agent = e.agent || !1, this.hostname = e.hostname || (n.location ? location.hostname : "localhost"), this.port = e.port || (n.location && location.port ? location.port : this.secure ? 443 : 80), this.query = e.query || {}, "string" == typeof this.query && (this.query = p.decode(this.query)), this.upgrade = !1 !== e.upgrade, this.path = (e.path || "/engine.io").replace(/\/$/, "") + "/", this.forceJSONP = !!e.forceJSONP, this.jsonp = !1 !== e.jsonp, this.forceBase64 = !!e.forceBase64, this.enablesXDR = !!e.enablesXDR, this.timestampParam = e.timestampParam || "t", this.timestampRequests = e.timestampRequests, this.transports = e.transports || ["polling", "websocket"], this.readyState = "", this.writeBuffer = [], this.policyPort = e.policyPort || 843, this.rememberUpgrade = e.rememberUpgrade || !1, this.binaryType = null, this.onlyBinaryUpgrades = e.onlyBinaryUpgrades, this.perMessageDeflate = !1 !== e.perMessageDeflate && (e.perMessageDeflate || {}), !0 === this.perMessageDeflate && (this.perMessageDeflate = {}), this.perMessageDeflate && null == this.perMessageDeflate.threshold && (this.perMessageDeflate.threshold = 1024), this.pfx = e.pfx || null, this.key = e.key || null, this.passphrase = e.passphrase || null, this.cert = e.cert || null, this.ca = e.ca || null, this.ciphers = e.ciphers || null, this.rejectUnauthorized = void 0 === e.rejectUnauthorized || e.rejectUnauthorized;
                    var o = "object" == typeof n && n;
                    o.global === o && e.extraHeaders && Object.keys(e.extraHeaders).length > 0 && (this.extraHeaders = e.extraHeaders), this.open()
                }

                function o(t) {
                    var e = {};
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
                    return e
                }

                var i = t("./transports"), s = t("component-emitter"), a = t("debug")("engine.io-client:socket"), c = t("indexof"),
                    u = t("engine.io-parser"), f = t("parseuri"), l = t("parsejson"), p = t("parseqs");
                e.exports = r, r.priorWebsocketSuccess = !1, s(r.prototype), r.protocol = u.protocol, r.Socket = r, r.Transport = t("./transport"), r.transports = t("./transports"), r.parser = t("engine.io-parser"), r.prototype.createTransport = function (t) {
                    a('creating transport "%s"', t);
                    var e = o(this.query);
                    e.EIO = u.protocol, e.transport = t, this.id && (e.sid = this.id);
                    var n = new i[t]({
                        agent: this.agent,
                        hostname: this.hostname,
                        port: this.port,
                        secure: this.secure,
                        path: this.path,
                        query: e,
                        forceJSONP: this.forceJSONP,
                        jsonp: this.jsonp,
                        forceBase64: this.forceBase64,
                        enablesXDR: this.enablesXDR,
                        timestampRequests: this.timestampRequests,
                        timestampParam: this.timestampParam,
                        policyPort: this.policyPort,
                        socket: this,
                        pfx: this.pfx,
                        key: this.key,
                        passphrase: this.passphrase,
                        cert: this.cert,
                        ca: this.ca,
                        ciphers: this.ciphers,
                        rejectUnauthorized: this.rejectUnauthorized,
                        perMessageDeflate: this.perMessageDeflate,
                        extraHeaders: this.extraHeaders
                    });
                    return n
                }, r.prototype.open = function () {
                    var t;
                    if (this.rememberUpgrade && r.priorWebsocketSuccess && -1 != this.transports.indexOf("websocket")) t = "websocket"; else {
                        if (0 === this.transports.length) {
                            var e = this;
                            return void setTimeout(function () {
                                e.emit("error", "No transports available")
                            }, 0)
                        }
                        t = this.transports[0]
                    }
                    this.readyState = "opening";
                    try {
                        t = this.createTransport(t)
                    } catch (t) {
                        return this.transports.shift(), void this.open()
                    }
                    t.open(), this.setTransport(t)
                }, r.prototype.setTransport = function (t) {
                    a("setting transport %s", t.name);
                    var e = this;
                    this.transport && (a("clearing existing transport %s", this.transport.name), this.transport.removeAllListeners()), this.transport = t, t.on("drain", function () {
                        e.onDrain()
                    }).on("packet", function (t) {
                        e.onPacket(t)
                    }).on("error", function (t) {
                        e.onError(t)
                    }).on("close", function () {
                        e.onClose("transport close")
                    })
                }, r.prototype.probe = function (t) {
                    function e() {
                        if (p.onlyBinaryUpgrades) {
                            var e = !this.supportsBinary && p.transport.supportsBinary;
                            l = l || e
                        }
                        l || (a('probe transport "%s" opened', t), f.send([{type: "ping", data: "probe"}]), f.once("packet", function (e) {
                            if (!l) if ("pong" == e.type && "probe" == e.data) {
                                if (a('probe transport "%s" pong', t), p.upgrading = !0, p.emit("upgrading", f), !f) return;
                                r.priorWebsocketSuccess = "websocket" == f.name, a('pausing current transport "%s"', p.transport.name), p.transport.pause(function () {
                                    l || "closed" != p.readyState && (a("changing transport and sending upgrade packet"), u(), p.setTransport(f), f.send([{type: "upgrade"}]), p.emit("upgrade", f), f = null, p.upgrading = !1, p.flush())
                                })
                            } else {
                                a('probe transport "%s" failed', t);
                                var n = new Error("probe error");
                                n.transport = f.name, p.emit("upgradeError", n)
                            }
                        }))
                    }

                    function n() {
                        l || (l = !0, u(), f.close(), f = null)
                    }

                    function o(e) {
                        var r = new Error("probe error: " + e);
                        r.transport = f.name, n(), a('probe transport "%s" failed because of error: %s', t, e), p.emit("upgradeError", r)
                    }

                    function i() {
                        o("transport closed")
                    }

                    function s() {
                        o("socket closed")
                    }

                    function c(t) {
                        f && t.name != f.name && (a('"%s" works - aborting "%s"', t.name, f.name), n())
                    }

                    function u() {
                        f.removeListener("open", e), f.removeListener("error", o), f.removeListener("close", i), p.removeListener("close", s), p.removeListener("upgrading", c)
                    }

                    a('probing transport "%s"', t);
                    var f = this.createTransport(t, {probe: 1}), l = !1, p = this;
                    r.priorWebsocketSuccess = !1, f.once("open", e), f.once("error", o), f.once("close", i), this.once("close", s), this.once("upgrading", c), f.open()
                }, r.prototype.onOpen = function () {
                    if (a("socket open"), this.readyState = "open", r.priorWebsocketSuccess = "websocket" == this.transport.name, this.emit("open"), this.flush(), "open" == this.readyState && this.upgrade && this.transport.pause) {
                        a("starting upgrade probes");
                        for (var t = 0, e = this.upgrades.length; e > t; t++) this.probe(this.upgrades[t])
                    }
                }, r.prototype.onPacket = function (t) {
                    if ("opening" == this.readyState || "open" == this.readyState) switch (a('socket receive: type "%s", data "%s"', t.type, t.data), this.emit("packet", t), this.emit("heartbeat"), t.type) {
                        case"open":
                            this.onHandshake(l(t.data));
                            break;
                        case"pong":
                            this.setPing(), this.emit("pong");
                            break;
                        case"error":
                            var e = new Error("server error");
                            e.code = t.data, this.onError(e);
                            break;
                        case"message":
                            this.emit("data", t.data), this.emit("message", t.data)
                    } else a('packet received with socket readyState "%s"', this.readyState)
                }, r.prototype.onHandshake = function (t) {
                    this.emit("handshake", t), this.id = t.sid, this.transport.query.sid = t.sid, this.upgrades = this.filterUpgrades(t.upgrades), this.pingInterval = t.pingInterval, this.pingTimeout = t.pingTimeout, this.onOpen(), "closed" != this.readyState && (this.setPing(), this.removeListener("heartbeat", this.onHeartbeat), this.on("heartbeat", this.onHeartbeat))
                }, r.prototype.onHeartbeat = function (t) {
                    clearTimeout(this.pingTimeoutTimer);
                    var e = this;
                    e.pingTimeoutTimer = setTimeout(function () {
                        "closed" != e.readyState && e.onClose("ping timeout")
                    }, t || e.pingInterval + e.pingTimeout)
                }, r.prototype.setPing = function () {
                    var t = this;
                    clearTimeout(t.pingIntervalTimer), t.pingIntervalTimer = setTimeout(function () {
                        a("writing ping packet - expecting pong within %sms", t.pingTimeout), t.ping(), t.onHeartbeat(t.pingTimeout)
                    }, t.pingInterval)
                }, r.prototype.ping = function () {
                    var t = this;
                    this.sendPacket("ping", function () {
                        t.emit("ping")
                    })
                }, r.prototype.onDrain = function () {
                    this.writeBuffer.splice(0, this.prevBufferLen), this.prevBufferLen = 0, 0 === this.writeBuffer.length ? this.emit("drain") : this.flush()
                }, r.prototype.flush = function () {
                    "closed" != this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (a("flushing %d packets in socket", this.writeBuffer.length), this.transport.send(this.writeBuffer), this.prevBufferLen = this.writeBuffer.length, this.emit("flush"))
                }, r.prototype.write = r.prototype.send = function (t, e, n) {
                    return this.sendPacket("message", t, e, n), this
                }, r.prototype.sendPacket = function (t, e, n, r) {
                    if ("function" == typeof e && (r = e, e = void 0), "function" == typeof n && (r = n, n = null), "closing" != this.readyState && "closed" != this.readyState) {
                        n = n || {}, n.compress = !1 !== n.compress;
                        var o = {type: t, data: e, options: n};
                        this.emit("packetCreate", o), this.writeBuffer.push(o), r && this.once("flush", r), this.flush()
                    }
                }, r.prototype.close = function () {
                    function t() {
                        r.onClose("forced close"), a("socket closing - telling transport to close"), r.transport.close()
                    }

                    function e() {
                        r.removeListener("upgrade", e), r.removeListener("upgradeError", e), t()
                    }

                    function n() {
                        r.once("upgrade", e), r.once("upgradeError", e)
                    }

                    if ("opening" == this.readyState || "open" == this.readyState) {
                        this.readyState = "closing";
                        var r = this;
                        this.writeBuffer.length ? this.once("drain", function () {
                            this.upgrading ? n() : t()
                        }) : this.upgrading ? n() : t()
                    }
                    return this
                }, r.prototype.onError = function (t) {
                    a("socket error %j", t), r.priorWebsocketSuccess = !1, this.emit("error", t), this.onClose("transport error", t)
                }, r.prototype.onClose = function (t, e) {
                    if ("opening" == this.readyState || "open" == this.readyState || "closing" == this.readyState) {
                        a('socket close with reason: "%s"', t);
                        var n = this;
                        clearTimeout(this.pingIntervalTimer), clearTimeout(this.pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), this.readyState = "closed", this.id = null, this.emit("close", t, e), n.writeBuffer = [], n.prevBufferLen = 0
                    }
                }, r.prototype.filterUpgrades = function (t) {
                    for (var e = [], n = 0, r = t.length; r > n; n++) ~c(this.transports, t[n]) && e.push(t[n]);
                    return e
                }
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
        }, {
            "./transport": 19,
            "./transports": 20,
            "component-emitter": 26,
            debug: 14,
            "engine.io-parser": 27,
            indexof: 32,
            parsejson: 36,
            parseqs: 37,
            parseuri: 38
        }],
        19: [function (t, e, n) {
            function r(t) {
                this.path = t.path, this.hostname = t.hostname, this.port = t.port, this.secure = t.secure, this.query = t.query, this.timestampParam = t.timestampParam, this.timestampRequests = t.timestampRequests, this.readyState = "", this.agent = t.agent || !1, this.socket = t.socket, this.enablesXDR = t.enablesXDR, this.pfx = t.pfx, this.key = t.key, this.passphrase = t.passphrase, this.cert = t.cert, this.ca = t.ca, this.ciphers = t.ciphers, this.rejectUnauthorized = t.rejectUnauthorized, this.extraHeaders = t.extraHeaders
            }

            var o = t("engine.io-parser"), i = t("component-emitter");
            e.exports = r, i(r.prototype), r.prototype.onError = function (t, e) {
                var n = new Error(t);
                return n.type = "TransportError", n.description = e, this.emit("error", n), this
            }, r.prototype.open = function () {
                return "closed" != this.readyState && "" != this.readyState || (this.readyState = "opening", this.doOpen()), this
            }, r.prototype.close = function () {
                return "opening" != this.readyState && "open" != this.readyState || (this.doClose(), this.onClose()), this
            }, r.prototype.send = function (t) {
                if ("open" != this.readyState) throw new Error("Transport not open");
                this.write(t)
            }, r.prototype.onOpen = function () {
                this.readyState = "open", this.writable = !0, this.emit("open")
            }, r.prototype.onData = function (t) {
                var e = o.decodePacket(t, this.socket.binaryType);
                this.onPacket(e)
            }, r.prototype.onPacket = function (t) {
                this.emit("packet", t)
            }, r.prototype.onClose = function () {
                this.readyState = "closed", this.emit("close")
            }
        }, {"component-emitter": 26, "engine.io-parser": 27}],
        20: [function (t, e, n) {
            (function (e) {
                function r(t) {
                    var n, r = !1, a = !1, c = !1 !== t.jsonp;
                    if (e.location) {
                        var u = "https:" == location.protocol, f = location.port;
                        f || (f = u ? 443 : 80), r = t.hostname != location.hostname || f != t.port, a = t.secure != u
                    }
                    if (t.xdomain = r, t.xscheme = a, n = new o(t), "open" in n && !t.forceJSONP) return new i(t);
                    if (!c) throw new Error("JSONP disabled");
                    return new s(t)
                }

                var o = t("xmlhttprequest-ssl"), i = t("./polling-xhr"), s = t("./polling-jsonp"), a = t("./websocket");
                n.polling = r, n.websocket = a
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
        }, {"./polling-jsonp": 21, "./polling-xhr": 22, "./websocket": 24, "xmlhttprequest-ssl": 25}],
        21: [function (t, e, n) {
            (function (n) {
                function r() {
                }

                function o(t) {
                    i.call(this, t), this.query = this.query || {}, a || (n.___eio || (n.___eio = []), a = n.___eio), this.index = a.length;
                    var e = this;
                    a.push(function (t) {
                        e.onData(t)
                    }), this.query.j = this.index, n.document && n.addEventListener && n.addEventListener("beforeunload", function () {
                        e.script && (e.script.onerror = r)
                    }, !1)
                }

                var i = t("./polling"), s = t("component-inherit");
                e.exports = o;
                var a, c = /\n/g, u = /\\n/g;
                s(o, i), o.prototype.supportsBinary = !1, o.prototype.doClose = function () {
                    this.script && (this.script.parentNode.removeChild(this.script), this.script = null), this.form && (this.form.parentNode.removeChild(this.form), this.form = null, this.iframe = null), i.prototype.doClose.call(this)
                }, o.prototype.doPoll = function () {
                    var t = this, e = document.createElement("script");
                    this.script && (this.script.parentNode.removeChild(this.script), this.script = null), e.async = !0, e.src = this.uri(), e.onerror = function (e) {
                        t.onError("jsonp poll error", e)
                    };
                    var n = document.getElementsByTagName("script")[0];
                    n ? n.parentNode.insertBefore(e, n) : (document.head || document.body).appendChild(e), this.script = e;
                    var r = "undefined" != typeof navigator && /gecko/i.test(navigator.userAgent);
                    r && setTimeout(function () {
                        var t = document.createElement("iframe");
                        document.body.appendChild(t), document.body.removeChild(t)
                    }, 100)
                }, o.prototype.doWrite = function (t, e) {
                    function n() {
                        r(), e()
                    }

                    function r() {
                        if (o.iframe) try {
                            o.form.removeChild(o.iframe)
                        } catch (t) {
                            o.onError("jsonp polling iframe removal error", t)
                        }
                        try {
                            var t = '<iframe src="javascript:0" name="' + o.iframeId + '">';
                            i = document.createElement(t)
                        } catch (t) {
                            i = document.createElement("iframe"), i.name = o.iframeId, i.src = "javascript:0"
                        }
                        i.id = o.iframeId, o.form.appendChild(i), o.iframe = i
                    }

                    var o = this;
                    if (!this.form) {
                        var i, s = document.createElement("form"), a = document.createElement("textarea"),
                            f = this.iframeId = "eio_iframe_" + this.index;
                        s.className = "socketio", s.style.position = "absolute", s.style.top = "-1000px", s.style.left = "-1000px", s.target = f, s.method = "POST", s.setAttribute("accept-charset", "utf-8"), a.name = "d", s.appendChild(a), document.body.appendChild(s), this.form = s, this.area = a
                    }
                    this.form.action = this.uri(), r(), t = t.replace(u, "\\\n"), this.area.value = t.replace(c, "\\n");
                    try {
                        this.form.submit()
                    } catch (t) {
                    }
                    this.iframe.attachEvent ? this.iframe.onreadystatechange = function () {
                        "complete" == o.iframe.readyState && n()
                    } : this.iframe.onload = n
                }
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
        }, {"./polling": 23, "component-inherit": 13}],
        22: [function (t, e, n) {
            (function (n) {
                function r() {
                }

                function o(t) {
                    if (c.call(this, t), n.location) {
                        var e = "https:" == location.protocol, r = location.port;
                        r || (r = e ? 443 : 80), this.xd = t.hostname != n.location.hostname || r != t.port, this.xs = t.secure != e
                    } else this.extraHeaders = t.extraHeaders
                }

                function i(t) {
                    this.method = t.method || "GET", this.uri = t.uri, this.xd = !!t.xd, this.xs = !!t.xs, this.async = !1 !== t.async, this.data = void 0 != t.data ? t.data : null, this.agent = t.agent, this.isBinary = t.isBinary, this.supportsBinary = t.supportsBinary, this.enablesXDR = t.enablesXDR, this.pfx = t.pfx, this.key = t.key, this.passphrase = t.passphrase, this.cert = t.cert, this.ca = t.ca, this.ciphers = t.ciphers, this.rejectUnauthorized = t.rejectUnauthorized, this.extraHeaders = t.extraHeaders, this.create()
                }

                function s() {
                    for (var t in i.requests) i.requests.hasOwnProperty(t) && i.requests[t].abort()
                }

                var a = t("xmlhttprequest-ssl"), c = t("./polling"), u = t("component-emitter"), f = t("component-inherit"),
                    l = t("debug")("engine.io-client:polling-xhr");
                e.exports = o, e.exports.Request = i, f(o, c), o.prototype.supportsBinary = !0, o.prototype.request = function (t) {
                    return t = t || {}, t.uri = this.uri(), t.xd = this.xd, t.xs = this.xs, t.agent = this.agent || !1, t.supportsBinary = this.supportsBinary, t.enablesXDR = this.enablesXDR, t.pfx = this.pfx, t.key = this.key, t.passphrase = this.passphrase, t.cert = this.cert, t.ca = this.ca, t.ciphers = this.ciphers, t.rejectUnauthorized = this.rejectUnauthorized, t.extraHeaders = this.extraHeaders, new i(t)
                }, o.prototype.doWrite = function (t, e) {
                    var n = "string" != typeof t && void 0 !== t, r = this.request({method: "POST", data: t, isBinary: n}), o = this;
                    r.on("success", e), r.on("error", function (t) {
                        o.onError("xhr post error", t)
                    }), this.sendXhr = r
                }, o.prototype.doPoll = function () {
                    l("xhr poll");
                    var t = this.request(), e = this;
                    t.on("data", function (t) {
                        e.onData(t)
                    }), t.on("error", function (t) {
                        e.onError("xhr poll error", t)
                    }), this.pollXhr = t
                }, u(i.prototype), i.prototype.create = function () {
                    var t = {agent: this.agent, xdomain: this.xd, xscheme: this.xs, enablesXDR: this.enablesXDR};
                    t.pfx = this.pfx, t.key = this.key, t.passphrase = this.passphrase, t.cert = this.cert, t.ca = this.ca, t.ciphers = this.ciphers, t.rejectUnauthorized = this.rejectUnauthorized;
                    var e = this.xhr = new a(t), r = this;
                    try {
                        l("xhr open %s: %s", this.method, this.uri), e.open(this.method, this.uri, this.async);
                        try {
                            if (this.extraHeaders) {
                                e.setDisableHeaderCheck(!0);
                                for (var o in this.extraHeaders) this.extraHeaders.hasOwnProperty(o) && e.setRequestHeader(o, this.extraHeaders[o])
                            }
                        } catch (t) {
                        }
                        if (this.supportsBinary && (e.responseType = "arraybuffer"), "POST" == this.method) try {
                            this.isBinary ? e.setRequestHeader("Content-type", "application/octet-stream") : e.setRequestHeader("Content-type", "text/plain;charset=UTF-8")
                        } catch (t) {
                        }
                        "withCredentials" in e && (e.withCredentials = !0), this.hasXDR() ? (e.onload = function () {
                            r.onLoad()
                        }, e.onerror = function () {
                            r.onError(e.responseText)
                        }) : e.onreadystatechange = function () {
                            4 == e.readyState && (200 == e.status || 1223 == e.status ? r.onLoad() : setTimeout(function () {
                                r.onError(e.status)
                            }, 0))
                        }, l("xhr data %s", this.data), e.send(this.data)
                    } catch (t) {
                        return void setTimeout(function () {
                            r.onError(t)
                        }, 0)
                    }
                    n.document && (this.index = i.requestsCount++, i.requests[this.index] = this)
                }, i.prototype.onSuccess = function () {
                    this.emit("success"), this.cleanup()
                }, i.prototype.onData = function (t) {
                    this.emit("data", t), this.onSuccess()
                }, i.prototype.onError = function (t) {
                    this.emit("error", t), this.cleanup(!0)
                }, i.prototype.cleanup = function (t) {
                    if ("undefined" != typeof this.xhr && null !== this.xhr) {
                        if (this.hasXDR() ? this.xhr.onload = this.xhr.onerror = r : this.xhr.onreadystatechange = r, t) try {
                            this.xhr.abort()
                        } catch (t) {
                        }
                        n.document && delete i.requests[this.index], this.xhr = null
                    }
                }, i.prototype.onLoad = function () {
                    var t;
                    try {
                        var e;
                        try {
                            e = this.xhr.getResponseHeader("Content-Type").split(";")[0]
                        } catch (t) {
                        }
                        if ("application/octet-stream" === e) t = this.xhr.response; else if (this.supportsBinary) try {
                            t = String.fromCharCode.apply(null, new Uint8Array(this.xhr.response))
                        } catch (e) {
                            for (var n = new Uint8Array(this.xhr.response), r = [], o = 0, i = n.length; i > o; o++) r.push(n[o]);
                            t = String.fromCharCode.apply(null, r)
                        } else t = this.xhr.responseText
                    } catch (t) {
                        this.onError(t)
                    }
                    null != t && this.onData(t)
                }, i.prototype.hasXDR = function () {
                    return "undefined" != typeof n.XDomainRequest && !this.xs && this.enablesXDR
                }, i.prototype.abort = function () {
                    this.cleanup()
                }, n.document && (i.requestsCount = 0, i.requests = {}, n.attachEvent ? n.attachEvent("onunload", s) : n.addEventListener && n.addEventListener("beforeunload", s, !1))
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
        }, {"./polling": 23, "component-emitter": 26, "component-inherit": 13, debug: 14, "xmlhttprequest-ssl": 25}],
        23: [function (t, e, n) {
            function r(t) {
                var e = t && t.forceBase64;
                f && !e || (this.supportsBinary = !1), o.call(this, t)
            }

            var o = t("../transport"), i = t("parseqs"), s = t("engine.io-parser"), a = t("component-inherit"), c = t("yeast"),
                u = t("debug")("engine.io-client:polling");
            e.exports = r;
            var f = function () {
                var e = t("xmlhttprequest-ssl"), n = new e({xdomain: !1});
                return null != n.responseType
            }();
            a(r, o), r.prototype.name = "polling", r.prototype.doOpen = function () {
                this.poll()
            }, r.prototype.pause = function (t) {
                function e() {
                    u("paused"), n.readyState = "paused", t()
                }

                var n = this;
                if (this.readyState = "pausing", this.polling || !this.writable) {
                    var r = 0;
                    this.polling && (u("we are currently polling - waiting to pause"), r++, this.once("pollComplete", function () {
                        u("pre-pause polling complete"), --r || e()
                    })), this.writable || (u("we are currently writing - waiting to pause"), r++, this.once("drain", function () {
                        u("pre-pause writing complete"), --r || e()
                    }))
                } else e()
            }, r.prototype.poll = function () {
                u("polling"), this.polling = !0, this.doPoll(), this.emit("poll")
            }, r.prototype.onData = function (t) {
                var e = this;
                u("polling got data %s", t);
                var n = function (t, n, r) {
                    return "opening" == e.readyState && e.onOpen(), "close" == t.type ? (e.onClose(), !1) : void e.onPacket(t)
                };
                s.decodePayload(t, this.socket.binaryType, n), "closed" != this.readyState && (this.polling = !1, this.emit("pollComplete"), "open" == this.readyState ? this.poll() : u('ignoring poll - transport state "%s"', this.readyState))
            }, r.prototype.doClose = function () {
                function t() {
                    u("writing close packet"), e.write([{type: "close"}])
                }

                var e = this;
                "open" == this.readyState ? (u("transport open - closing"), t()) : (u("transport not open - deferring close"), this.once("open", t))
            }, r.prototype.write = function (t) {
                var e = this;
                this.writable = !1;
                var n = function () {
                    e.writable = !0, e.emit("drain")
                }, e = this;
                s.encodePayload(t, this.supportsBinary, function (t) {
                    e.doWrite(t, n)
                })
            }, r.prototype.uri = function () {
                var t = this.query || {}, e = this.secure ? "https" : "http", n = "";
                !1 !== this.timestampRequests && (t[this.timestampParam] = c()), this.supportsBinary || t.sid || (t.b64 = 1), t = i.encode(t), this.port && ("https" == e && 443 != this.port || "http" == e && 80 != this.port) && (n = ":" + this.port), t.length && (t = "?" + t);
                var r = -1 !== this.hostname.indexOf(":");
                return e + "://" + (r ? "[" + this.hostname + "]" : this.hostname) + n + this.path + t
            }
        }, {
            "../transport": 19,
            "component-inherit": 13,
            debug: 14,
            "engine.io-parser": 27,
            parseqs: 37,
            "xmlhttprequest-ssl": 25,
            yeast: 45
        }],
        24: [function (t, e, n) {
            (function (n) {
                function r(t) {
                    var e = t && t.forceBase64;
                    e && (this.supportsBinary = !1), this.perMessageDeflate = t.perMessageDeflate, o.call(this, t)
                }

                var o = t("../transport"), i = t("engine.io-parser"), s = t("parseqs"), a = t("component-inherit"), c = t("yeast"),
                    u = t("debug")("engine.io-client:websocket"), f = n.WebSocket || n.MozWebSocket, l = f;
                if (!l && "undefined" == typeof window) try {
                    l = t("ws")
                } catch (t) {
                }
                e.exports = r, a(r, o), r.prototype.name = "websocket", r.prototype.supportsBinary = !0, r.prototype.doOpen = function () {
                    if (this.check()) {
                        var t = this.uri(), e = void 0, n = {agent: this.agent, perMessageDeflate: this.perMessageDeflate};
                        n.pfx = this.pfx, n.key = this.key, n.passphrase = this.passphrase, n.cert = this.cert, n.ca = this.ca, n.ciphers = this.ciphers, n.rejectUnauthorized = this.rejectUnauthorized, this.extraHeaders && (n.headers = this.extraHeaders), this.ws = f ? new l(t) : new l(t, e, n), void 0 === this.ws.binaryType && (this.supportsBinary = !1), this.ws.supports && this.ws.supports.binary ? (this.supportsBinary = !0, this.ws.binaryType = "buffer") : this.ws.binaryType = "arraybuffer", this.addEventListeners()
                    }
                }, r.prototype.addEventListeners = function () {
                    var t = this;
                    this.ws.onopen = function () {
                        t.onOpen()
                    }, this.ws.onclose = function () {
                        t.onClose()
                    }, this.ws.onmessage = function (e) {
                        t.onData(e.data)
                    }, this.ws.onerror = function (e) {
                        t.onError("websocket error", e)
                    }
                }, "undefined" != typeof navigator && /iPad|iPhone|iPod/i.test(navigator.userAgent) && (r.prototype.onData = function (t) {
                    var e = this;
                    setTimeout(function () {
                        o.prototype.onData.call(e, t)
                    }, 0)
                }), r.prototype.write = function (t) {
                    function e() {
                        r.emit("flush"), setTimeout(function () {
                            r.writable = !0, r.emit("drain")
                        }, 0)
                    }

                    var r = this;
                    this.writable = !1;
                    for (var o = t.length, s = 0, a = o; a > s; s++) !function (t) {
                        i.encodePacket(t, r.supportsBinary, function (i) {
                            if (!f) {
                                var s = {};
                                if (t.options && (s.compress = t.options.compress), r.perMessageDeflate) {
                                    var a = "string" == typeof i ? n.Buffer.byteLength(i) : i.length;
                                    a < r.perMessageDeflate.threshold && (s.compress = !1)
                                }
                            }
                            try {
                                f ? r.ws.send(i) : r.ws.send(i, s)
                            } catch (t) {
                                u("websocket closed before onclose event")
                            }
                            --o || e()
                        })
                    }(t[s])
                }, r.prototype.onClose = function () {
                    o.prototype.onClose.call(this)
                }, r.prototype.doClose = function () {
                    "undefined" != typeof this.ws && this.ws.close()
                }, r.prototype.uri = function () {
                    var t = this.query || {}, e = this.secure ? "wss" : "ws", n = "";
                    this.port && ("wss" == e && 443 != this.port || "ws" == e && 80 != this.port) && (n = ":" + this.port), this.timestampRequests && (t[this.timestampParam] = c()), this.supportsBinary || (t.b64 = 1), t = s.encode(t), t.length && (t = "?" + t);
                    var r = -1 !== this.hostname.indexOf(":");
                    return e + "://" + (r ? "[" + this.hostname + "]" : this.hostname) + n + this.path + t
                }, r.prototype.check = function () {
                    return !(!l || "__initialize" in l && this.name === r.prototype.name)
                }
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
        }, {"../transport": 19, "component-inherit": 13, debug: 14, "engine.io-parser": 27, parseqs: 37, ws: void 0, yeast: 45}],
        25: [function (t, e, n) {
            var r = t("has-cors");
            e.exports = function (t) {
                var e = t.xdomain, n = t.xscheme, o = t.enablesXDR;
                try {
                    if ("undefined" != typeof XMLHttpRequest && (!e || r)) return new XMLHttpRequest
                } catch (t) {
                }
                try {
                    if ("undefined" != typeof XDomainRequest && !n && o) return new XDomainRequest
                } catch (t) {
                }
                if (!e) try {
                    return new ActiveXObject("Microsoft.XMLHTTP")
                } catch (t) {
                }
            }
        }, {"has-cors": 31}],
        26: [function (t, e, n) {
            function r(t) {
                return t ? o(t) : void 0
            }

            function o(t) {
                for (var e in r.prototype) t[e] = r.prototype[e];
                return t
            }

            e.exports = r, r.prototype.on = r.prototype.addEventListener = function (t, e) {
                return this._callbacks = this._callbacks || {}, (this._callbacks[t] = this._callbacks[t] || []).push(e), this
            }, r.prototype.once = function (t, e) {
                function n() {
                    r.off(t, n), e.apply(this, arguments)
                }

                var r = this;
                return this._callbacks = this._callbacks || {}, n.fn = e, this.on(t, n), this
            }, r.prototype.off = r.prototype.removeListener = r.prototype.removeAllListeners = r.prototype.removeEventListener = function (t, e) {
                if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
                var n = this._callbacks[t];
                if (!n) return this;
                if (1 == arguments.length) return delete this._callbacks[t], this;
                for (var r, o = 0; o < n.length; o++) if (r = n[o], r === e || r.fn === e) {
                    n.splice(o, 1);
                    break
                }
                return this
            }, r.prototype.emit = function (t) {
                this._callbacks = this._callbacks || {};
                var e = [].slice.call(arguments, 1), n = this._callbacks[t];
                if (n) {
                    n = n.slice(0);
                    for (var r = 0, o = n.length; o > r; ++r) n[r].apply(this, e)
                }
                return this
            }, r.prototype.listeners = function (t) {
                return this._callbacks = this._callbacks || {}, this._callbacks[t] || []
            }, r.prototype.hasListeners = function (t) {
                return !!this.listeners(t).length
            }
        }, {}],
        27: [function (t, e, n) {
            (function (e) {
                function r(t, e) {
                    var r = "b" + n.packets[t.type] + t.data.data;
                    return e(r)
                }

                function o(t, e, r) {
                    if (!e) return n.encodeBase64Packet(t, r);
                    var o = t.data, i = new Uint8Array(o), s = new Uint8Array(1 + o.byteLength);
                    s[0] = g[t.type];
                    for (var a = 0; a < i.length; a++) s[a + 1] = i[a];
                    return r(s.buffer)
                }

                function i(t, e, r) {
                    if (!e) return n.encodeBase64Packet(t, r);
                    var o = new FileReader;
                    return o.onload = function () {
                        t.data = o.result, n.encodePacket(t, e, !0, r)
                    }, o.readAsArrayBuffer(t.data)
                }

                function s(t, e, r) {
                    if (!e) return n.encodeBase64Packet(t, r);
                    if (m) return i(t, e, r);
                    var o = new Uint8Array(1);
                    o[0] = g[t.type];
                    var s = new w([o.buffer, t.data]);
                    return r(s)
                }

                function a(t, e, n) {
                    for (var r = new Array(t.length), o = p(t.length, n), i = function (t, n, o) {
                        e(n, function (e, n) {
                            r[t] = n, o(e, r)
                        })
                    }, s = 0; s < t.length; s++) i(s, t[s], o)
                }

                var c = t("./keys"), u = t("has-binary"), f = t("arraybuffer.slice"), l = t("base64-arraybuffer"), p = t("after"),
                    h = t("utf8"), d = navigator.userAgent.match(/Android/i), y = /PhantomJS/i.test(navigator.userAgent), m = d || y;
                n.protocol = 3;
                var g = n.packets = {open: 0, close: 1, ping: 2, pong: 3, message: 4, upgrade: 5, noop: 6}, v = c(g),
                    b = {type: "error", data: "parser error"}, w = t("blob");
                n.encodePacket = function (t, n, i, a) {
                    "function" == typeof n && (a = n, n = !1), "function" == typeof i && (a = i, i = null);
                    var c = void 0 === t.data ? void 0 : t.data.buffer || t.data;
                    if (e.ArrayBuffer && c instanceof ArrayBuffer) return o(t, n, a);
                    if (w && c instanceof e.Blob) return s(t, n, a);
                    if (c && c.base64) return r(t, a);
                    var u = g[t.type];
                    return void 0 !== t.data && (u += i ? h.encode(String(t.data)) : String(t.data)), a("" + u)
                }, n.encodeBase64Packet = function (t, r) {
                    var o = "b" + n.packets[t.type];
                    if (w && t.data instanceof e.Blob) {
                        var i = new FileReader;
                        return i.onload = function () {
                            var t = i.result.split(",")[1];
                            r(o + t)
                        }, i.readAsDataURL(t.data)
                    }
                    var s;
                    try {
                        s = String.fromCharCode.apply(null, new Uint8Array(t.data))
                    } catch (e) {
                        for (var a = new Uint8Array(t.data), c = new Array(a.length), u = 0; u < a.length; u++) c[u] = a[u];
                        s = String.fromCharCode.apply(null, c)
                    }
                    return o += e.btoa(s), r(o)
                }, n.decodePacket = function (t, e, r) {
                    if ("string" == typeof t || void 0 === t) {
                        if ("b" == t.charAt(0)) return n.decodeBase64Packet(t.substr(1), e);
                        if (r) try {
                            t = h.decode(t)
                        } catch (t) {
                            return b
                        }
                        var o = t.charAt(0);
                        return Number(o) == o && v[o] ? t.length > 1 ? {type: v[o], data: t.substring(1)} : {type: v[o]} : b
                    }
                    var i = new Uint8Array(t), o = i[0], s = f(t, 1);
                    return w && "blob" === e && (s = new w([s])), {type: v[o], data: s}
                }, n.decodeBase64Packet = function (t, n) {
                    var r = v[t.charAt(0)];
                    if (!e.ArrayBuffer) return {type: r, data: {base64: !0, data: t.substr(1)}};
                    var o = l.decode(t.substr(1));
                    return "blob" === n && w && (o = new w([o])), {type: r, data: o}
                }, n.encodePayload = function (t, e, r) {
                    function o(t) {
                        return t.length + ":" + t
                    }

                    function i(t, r) {
                        n.encodePacket(t, !!s && e, !0, function (t) {
                            r(null, o(t))
                        })
                    }

                    "function" == typeof e && (r = e, e = null);
                    var s = u(t);
                    return e && s ? w && !m ? n.encodePayloadAsBlob(t, r) : n.encodePayloadAsArrayBuffer(t, r) : t.length ? void a(t, i, function (t, e) {
                        return r(e.join(""))
                    }) : r("0:")
                }, n.decodePayload = function (t, e, r) {
                    if ("string" != typeof t) return n.decodePayloadAsBinary(t, e, r);
                    "function" == typeof e && (r = e, e = null);
                    var o;
                    if ("" == t) return r(b, 0, 1);
                    for (var i, s, a = "", c = 0, u = t.length; u > c; c++) {
                        var f = t.charAt(c);
                        if (":" != f) a += f; else {
                            if ("" == a || a != (i = Number(a))) return r(b, 0, 1);
                            if (s = t.substr(c + 1, i), a != s.length) return r(b, 0, 1);
                            if (s.length) {
                                if (o = n.decodePacket(s, e, !0), b.type == o.type && b.data == o.data) return r(b, 0, 1);
                                var l = r(o, c + i, u);
                                if (!1 === l) return
                            }
                            c += i, a = ""
                        }
                    }
                    return "" != a ? r(b, 0, 1) : void 0
                }, n.encodePayloadAsArrayBuffer = function (t, e) {
                    function r(t, e) {
                        n.encodePacket(t, !0, !0, function (t) {
                            return e(null, t)
                        })
                    }

                    return t.length ? void a(t, r, function (t, n) {
                        var r = n.reduce(function (t, e) {
                            var n;
                            return n = "string" == typeof e ? e.length : e.byteLength, t + n.toString().length + n + 2
                        }, 0), o = new Uint8Array(r), i = 0;
                        return n.forEach(function (t) {
                            var e = "string" == typeof t, n = t;
                            if (e) {
                                for (var r = new Uint8Array(t.length), s = 0; s < t.length; s++) r[s] = t.charCodeAt(s);
                                n = r.buffer
                            }
                            e ? o[i++] = 0 : o[i++] = 1;
                            for (var a = n.byteLength.toString(), s = 0; s < a.length; s++) o[i++] = parseInt(a[s]);
                            o[i++] = 255;
                            for (var r = new Uint8Array(n), s = 0; s < r.length; s++) o[i++] = r[s]
                        }), e(o.buffer)
                    }) : e(new ArrayBuffer(0))
                }, n.encodePayloadAsBlob = function (t, e) {
                    function r(t, e) {
                        n.encodePacket(t, !0, !0, function (t) {
                            var n = new Uint8Array(1);
                            if (n[0] = 1, "string" == typeof t) {
                                for (var r = new Uint8Array(t.length), o = 0; o < t.length; o++) r[o] = t.charCodeAt(o);
                                t = r.buffer, n[0] = 0
                            }
                            for (var i = t instanceof ArrayBuffer ? t.byteLength : t.size, s = i.toString(), a = new Uint8Array(s.length + 1), o = 0; o < s.length; o++) a[o] = parseInt(s[o]);
                            if (a[s.length] = 255, w) {
                                var c = new w([n.buffer, a.buffer, t]);
                                e(null, c)
                            }
                        })
                    }

                    a(t, r, function (t, n) {
                        return e(new w(n))
                    })
                }, n.decodePayloadAsBinary = function (t, e, r) {
                    "function" == typeof e && (r = e, e = null);
                    for (var o = t, i = [], s = !1; o.byteLength > 0;) {
                        for (var a = new Uint8Array(o), c = 0 === a[0], u = "", l = 1; 255 != a[l]; l++) {
                            if (u.length > 310) {
                                s = !0;
                                break
                            }
                            u += a[l]
                        }
                        if (s) return r(b, 0, 1);
                        o = f(o, 2 + u.length), u = parseInt(u);
                        var p = f(o, 0, u);
                        if (c) try {
                            p = String.fromCharCode.apply(null, new Uint8Array(p))
                        } catch (t) {
                            var h = new Uint8Array(p);
                            p = "";
                            for (var l = 0; l < h.length; l++) p += String.fromCharCode(h[l])
                        }
                        i.push(p), o = f(o, u)
                    }
                    var d = i.length;
                    i.forEach(function (t, o) {
                        r(n.decodePacket(t, e, !0), o, d)
                    })
                }
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
        }, {"./keys": 28, after: 6, "arraybuffer.slice": 7, "base64-arraybuffer": 9, blob: 10, "has-binary": 29, utf8: 44}],
        28: [function (t, e, n) {
            e.exports = Object.keys || function (t) {
                var e = [], n = Object.prototype.hasOwnProperty;
                for (var r in t) n.call(t, r) && e.push(r);
                return e
            }
        }, {}],
        29: [function (t, e, n) {
            (function (n) {
                function r(t) {
                    function e(t) {
                        if (!t) return !1;
                        if (n.Buffer && n.Buffer.isBuffer(t) || n.ArrayBuffer && t instanceof ArrayBuffer || n.Blob && t instanceof Blob || n.File && t instanceof File) return !0;
                        if (o(t)) {
                            for (var r = 0; r < t.length; r++) if (e(t[r])) return !0
                        } else if (t && "object" == typeof t) {
                            t.toJSON && (t = t.toJSON());
                            for (var i in t) if (Object.prototype.hasOwnProperty.call(t, i) && e(t[i])) return !0
                        }
                        return !1
                    }

                    return e(t)
                }

                var o = t("isarray");
                e.exports = r
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
        }, {isarray: 33}],
        30: [function (t, e, n) {
            (function (n) {
                function r(t) {
                    function e(t) {
                        if (!t) return !1;
                        if (n.Buffer && n.Buffer.isBuffer && n.Buffer.isBuffer(t) || n.ArrayBuffer && t instanceof ArrayBuffer || n.Blob && t instanceof Blob || n.File && t instanceof File) return !0;
                        if (o(t)) {
                            for (var r = 0; r < t.length; r++) if (e(t[r])) return !0
                        } else if (t && "object" == typeof t) {
                            t.toJSON && "function" == typeof t.toJSON && (t = t.toJSON());
                            for (var i in t) if (Object.prototype.hasOwnProperty.call(t, i) && e(t[i])) return !0
                        }
                        return !1
                    }

                    return e(t)
                }

                var o = t("isarray");
                e.exports = r
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
        }, {isarray: 33}],
        31: [function (t, e, n) {
            try {
                e.exports = "undefined" != typeof XMLHttpRequest && "withCredentials" in new XMLHttpRequest
            } catch (t) {
                e.exports = !1
            }
        }, {}],
        32: [function (t, e, n) {
            var r = [].indexOf;
            e.exports = function (t, e) {
                if (r) return t.indexOf(e);
                for (var n = 0; n < t.length; ++n) if (t[n] === e) return n;
                return -1
            }
        }, {}],
        33: [function (t, e, n) {
            e.exports = Array.isArray || function (t) {
                return "[object Array]" == Object.prototype.toString.call(t)
            }
        }, {}],
        34: [function (e, n, r) {
            (function (e) {
                (function () {
                    function o(t, e) {
                        function n(t) {
                            if (n[t] !== m) return n[t];
                            var o;
                            if ("bug-string-char-index" == t) o = "a" != "a"[0]; else if ("json" == t) o = n("json-stringify") && n("json-parse"); else {
                                var s, a = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
                                if ("json-stringify" == t) {
                                    var c = e.stringify, f = "function" == typeof c && b;
                                    if (f) {
                                        (s = function () {
                                            return 1
                                        }).toJSON = s;
                                        try {
                                            f = "0" === c(0) && "0" === c(new r) && '""' == c(new i) && c(v) === m && c(m) === m && c() === m && "1" === c(s) && "[1]" == c([s]) && "[null]" == c([m]) && "null" == c(null) && "[null,null,null]" == c([m, v, null]) && c({a: [s, !0, !1, null, "\0\b\n\f\r\t"]}) == a && "1" === c(null, s) && "[\n 1,\n 2\n]" == c([1, 2], null, 1) && '"-271821-04-20T00:00:00.000Z"' == c(new u(-864e13)) && '"+275760-09-13T00:00:00.000Z"' == c(new u(864e13)) && '"-000001-01-01T00:00:00.000Z"' == c(new u(-621987552e5)) && '"1969-12-31T23:59:59.999Z"' == c(new u(-1))
                                        } catch (t) {
                                            f = !1
                                        }
                                    }
                                    o = f
                                }
                                if ("json-parse" == t) {
                                    var l = e.parse;
                                    if ("function" == typeof l) try {
                                        if (0 === l("0") && !l(!1)) {
                                            s = l(a);
                                            var p = 5 == s.a.length && 1 === s.a[0];
                                            if (p) {
                                                try {
                                                    p = !l('"\t"')
                                                } catch (t) {
                                                }
                                                if (p) try {
                                                    p = 1 !== l("01")
                                                } catch (t) {
                                                }
                                                if (p) try {
                                                    p = 1 !== l("1.")
                                                } catch (t) {
                                                }
                                            }
                                        }
                                    } catch (t) {
                                        p = !1
                                    }
                                    o = p
                                }
                            }
                            return n[t] = !!o
                        }

                        t || (t = c.Object()), e || (e = c.Object());
                        var r = t.Number || c.Number, i = t.String || c.String, a = t.Object || c.Object, u = t.Date || c.Date,
                            f = t.SyntaxError || c.SyntaxError, l = t.TypeError || c.TypeError, p = t.Math || c.Math, h = t.JSON || c.JSON;
                        "object" == typeof h && h && (e.stringify = h.stringify, e.parse = h.parse);
                        var d, y, m, g = a.prototype, v = g.toString, b = new u(-0xc782b5b800cec);
                        try {
                            b = -109252 == b.getUTCFullYear() && 0 === b.getUTCMonth() && 1 === b.getUTCDate() && 10 == b.getUTCHours() && 37 == b.getUTCMinutes() && 6 == b.getUTCSeconds() && 708 == b.getUTCMilliseconds()
                        } catch (t) {
                        }
                        if (!n("json")) {
                            var w = "[object Function]", x = "[object Date]", k = "[object Number]", E = "[object String]",
                                A = "[object Array]", C = "[object Boolean]", B = n("bug-string-char-index");
                            if (!b) var S = p.floor, T = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], N = function (t, e) {
                                return T[e] + 365 * (t - 1970) + S((t - 1969 + (e = +(e > 1))) / 4) - S((t - 1901 + e) / 100) + S((t - 1601 + e) / 400)
                            };
                            if ((d = g.hasOwnProperty) || (d = function (t) {
                                var e, n = {};
                                return (n.__proto__ = null, n.__proto__ = {toString: 1}, n).toString != v ? d = function (t) {
                                    var e = this.__proto__, n = t in (this.__proto__ = null, this);
                                    return this.__proto__ = e, n
                                } : (e = n.constructor, d = function (t) {
                                    var n = (this.constructor || e).prototype;
                                    return t in this && !(t in n && this[t] === n[t])
                                }), n = null, d.call(this, t)
                            }), y = function (t, e) {
                                var n, r, o, i = 0;
                                (n = function () {
                                    this.valueOf = 0
                                }).prototype.valueOf = 0, r = new n;
                                for (o in r) d.call(r, o) && i++;
                                return n = r = null, i ? y = 2 == i ? function (t, e) {
                                    var n, r = {}, o = v.call(t) == w;
                                    for (n in t) o && "prototype" == n || d.call(r, n) || !(r[n] = 1) || !d.call(t, n) || e(n)
                                } : function (t, e) {
                                    var n, r, o = v.call(t) == w;
                                    for (n in t) o && "prototype" == n || !d.call(t, n) || (r = "constructor" === n) || e(n);
                                    (r || d.call(t, n = "constructor")) && e(n)
                                } : (r = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"], y = function (t, e) {
                                    var n, o, i = v.call(t) == w,
                                        a = !i && "function" != typeof t.constructor && s[typeof t.hasOwnProperty] && t.hasOwnProperty || d;
                                    for (n in t) i && "prototype" == n || !a.call(t, n) || e(n);
                                    for (o = r.length; n = r[--o]; a.call(t, n) && e(n)) ;
                                }), y(t, e)
                            }, !n("json-stringify")) {
                                var j = {92: "\\\\", 34: '\\"', 8: "\\b", 12: "\\f", 10: "\\n", 13: "\\r", 9: "\\t"}, _ = "000000",
                                    O = function (t, e) {
                                        return (_ + (e || 0)).slice(-t)
                                    }, P = "\\u00", D = function (t) {
                                        for (var e = '"', n = 0, r = t.length, o = !B || r > 10, i = o && (B ? t.split("") : t); r > n; n++) {
                                            var s = t.charCodeAt(n);
                                            switch (s) {
                                                case 8:
                                                case 9:
                                                case 10:
                                                case 12:
                                                case 13:
                                                case 34:
                                                case 92:
                                                    e += j[s];
                                                    break;
                                                default:
                                                    if (32 > s) {
                                                        e += P + O(2, s.toString(16));
                                                        break
                                                    }
                                                    e += o ? i[n] : t.charAt(n)
                                            }
                                        }
                                        return e + '"'
                                    }, L = function (t, e, n, r, o, i, s) {
                                        var a, c, u, f, p, h, g, b, w, B, T, j, _, P, R, M;
                                        try {
                                            a = e[t]
                                        } catch (t) {
                                        }
                                        if ("object" == typeof a && a) if (c = v.call(a), c != x || d.call(a, "toJSON")) "function" == typeof a.toJSON && (c != k && c != E && c != A || d.call(a, "toJSON")) && (a = a.toJSON(t)); else if (a > -1 / 0 && 1 / 0 > a) {
                                            if (N) {
                                                for (p = S(a / 864e5), u = S(p / 365.2425) + 1970 - 1; N(u + 1, 0) <= p; u++) ;
                                                for (f = S((p - N(u, 0)) / 30.42); N(u, f + 1) <= p; f++) ;
                                                p = 1 + p - N(u, f), h = (a % 864e5 + 864e5) % 864e5, g = S(h / 36e5) % 24, b = S(h / 6e4) % 60, w = S(h / 1e3) % 60, B = h % 1e3
                                            } else u = a.getUTCFullYear(), f = a.getUTCMonth(), p = a.getUTCDate(), g = a.getUTCHours(), b = a.getUTCMinutes(), w = a.getUTCSeconds(), B = a.getUTCMilliseconds();
                                            a = (0 >= u || u >= 1e4 ? (0 > u ? "-" : "+") + O(6, 0 > u ? -u : u) : O(4, u)) + "-" + O(2, f + 1) + "-" + O(2, p) + "T" + O(2, g) + ":" + O(2, b) + ":" + O(2, w) + "." + O(3, B) + "Z"
                                        } else a = null;
                                        if (n && (a = n.call(e, t, a)), null === a) return "null";
                                        if (c = v.call(a), c == C) return "" + a;
                                        if (c == k) return a > -1 / 0 && 1 / 0 > a ? "" + a : "null";
                                        if (c == E) return D("" + a);
                                        if ("object" == typeof a) {
                                            for (P = s.length; P--;) if (s[P] === a) throw l();
                                            if (s.push(a), T = [], R = i, i += o, c == A) {
                                                for (_ = 0, P = a.length; P > _; _++) j = L(_, a, n, r, o, i, s), T.push(j === m ? "null" : j);
                                                M = T.length ? o ? "[\n" + i + T.join(",\n" + i) + "\n" + R + "]" : "[" + T.join(",") + "]" : "[]"
                                            } else y(r || a, function (t) {
                                                var e = L(t, a, n, r, o, i, s);
                                                e !== m && T.push(D(t) + ":" + (o ? " " : "") + e)
                                            }), M = T.length ? o ? "{\n" + i + T.join(",\n" + i) + "\n" + R + "}" : "{" + T.join(",") + "}" : "{}";
                                            return s.pop(), M
                                        }
                                    };
                                e.stringify = function (t, e, n) {
                                    var r, o, i, a;
                                    if (s[typeof e] && e) if ((a = v.call(e)) == w) o = e; else if (a == A) {
                                        i = {};
                                        for (var c, u = 0, f = e.length; f > u; c = e[u++], a = v.call(c), (a == E || a == k) && (i[c] = 1)) ;
                                    }
                                    if (n) if ((a = v.call(n)) == k) {
                                        if ((n -= n % 1) > 0) for (r = "", n > 10 && (n = 10); r.length < n; r += " ") ;
                                    } else a == E && (r = n.length <= 10 ? n : n.slice(0, 10));
                                    return L("", (c = {}, c[""] = t, c), o, i, r, "", [])
                                }
                            }
                            if (!n("json-parse")) {
                                var R, M, U = i.fromCharCode,
                                    q = {92: "\\", 34: '"', 47: "/", 98: "\b", 116: "\t", 110: "\n", 102: "\f", 114: "\r"},
                                    I = function () {
                                        throw R = M = null, f()
                                    }, H = function () {
                                        for (var t, e, n, r, o, i = M, s = i.length; s > R;) switch (o = i.charCodeAt(R)) {
                                            case 9:
                                            case 10:
                                            case 13:
                                            case 32:
                                                R++;
                                                break;
                                            case 123:
                                            case 125:
                                            case 91:
                                            case 93:
                                            case 58:
                                            case 44:
                                                return t = B ? i.charAt(R) : i[R], R++, t;
                                            case 34:
                                                for (t = "@", R++; s > R;) if (o = i.charCodeAt(R), 32 > o) I(); else if (92 == o) switch (o = i.charCodeAt(++R)) {
                                                    case 92:
                                                    case 34:
                                                    case 47:
                                                    case 98:
                                                    case 116:
                                                    case 110:
                                                    case 102:
                                                    case 114:
                                                        t += q[o], R++;
                                                        break;
                                                    case 117:
                                                        for (e = ++R, n = R + 4; n > R; R++) o = i.charCodeAt(R), o >= 48 && 57 >= o || o >= 97 && 102 >= o || o >= 65 && 70 >= o || I();
                                                        t += U("0x" + i.slice(e, R));
                                                        break;
                                                    default:
                                                        I()
                                                } else {
                                                    if (34 == o) break;
                                                    for (o = i.charCodeAt(R), e = R; o >= 32 && 92 != o && 34 != o;) o = i.charCodeAt(++R);
                                                    t += i.slice(e, R)
                                                }
                                                if (34 == i.charCodeAt(R)) return R++, t;
                                                I();
                                            default:
                                                if (e = R, 45 == o && (r = !0, o = i.charCodeAt(++R)), o >= 48 && 57 >= o) {
                                                    for (48 == o && (o = i.charCodeAt(R + 1), o >= 48 && 57 >= o) && I(), r = !1; s > R && (o = i.charCodeAt(R), o >= 48 && 57 >= o); R++) ;
                                                    if (46 == i.charCodeAt(R)) {
                                                        for (n = ++R; s > n && (o = i.charCodeAt(n), o >= 48 && 57 >= o); n++) ;
                                                        n == R && I(), R = n
                                                    }
                                                    if (o = i.charCodeAt(R), 101 == o || 69 == o) {
                                                        for (o = i.charCodeAt(++R), 43 != o && 45 != o || R++, n = R; s > n && (o = i.charCodeAt(n), o >= 48 && 57 >= o); n++) ;
                                                        n == R && I(), R = n
                                                    }
                                                    return +i.slice(e, R);
                                                }
                                                if (r && I(), "true" == i.slice(R, R + 4)) return R += 4, !0;
                                                if ("false" == i.slice(R, R + 5)) return R += 5, !1;
                                                if ("null" == i.slice(R, R + 4)) return R += 4, null;
                                                I()
                                        }
                                        return "$"
                                    }, F = function (t) {
                                        var e, n;
                                        if ("$" == t && I(), "string" == typeof t) {
                                            if ("@" == (B ? t.charAt(0) : t[0])) return t.slice(1);
                                            if ("[" == t) {
                                                for (e = []; t = H(), "]" != t; n || (n = !0)) n && ("," == t ? (t = H(), "]" == t && I()) : I()), "," == t && I(), e.push(F(t));
                                                return e
                                            }
                                            if ("{" == t) {
                                                for (e = {}; t = H(), "}" != t; n || (n = !0)) n && ("," == t ? (t = H(), "}" == t && I()) : I()), "," != t && "string" == typeof t && "@" == (B ? t.charAt(0) : t[0]) && ":" == H() || I(), e[t.slice(1)] = F(H());
                                                return e
                                            }
                                            I()
                                        }
                                        return t
                                    }, z = function (t, e, n) {
                                        var r = $(t, e, n);
                                        r === m ? delete t[e] : t[e] = r
                                    }, $ = function (t, e, n) {
                                        var r, o = t[e];
                                        if ("object" == typeof o && o) if (v.call(o) == A) for (r = o.length; r--;) z(o, r, n); else y(o, function (t) {
                                            z(o, t, n)
                                        });
                                        return n.call(t, e, o)
                                    };
                                e.parse = function (t, e) {
                                    var n, r;
                                    return R = 0, M = "" + t, n = F(H()), "$" != H() && I(), R = M = null, e && v.call(e) == w ? $((r = {}, r[""] = n, r), "", e) : n
                                }
                            }
                        }
                        return e.runInContext = o, e
                    }

                    var i = "function" == typeof t && t.amd, s = {function: !0, object: !0}, a = s[typeof r] && r && !r.nodeType && r,
                        c = s[typeof window] && window || this, u = a && s[typeof n] && n && !n.nodeType && "object" == typeof e && e;
                    if (!u || u.global !== u && u.window !== u && u.self !== u || (c = u), a && !i) o(c, a); else {
                        var f = c.JSON, l = c.JSON3, p = !1, h = o(c, c.JSON3 = {
                            noConflict: function () {
                                return p || (p = !0, c.JSON = f, c.JSON3 = l, f = l = null), h
                            }
                        });
                        c.JSON = {parse: h.parse, stringify: h.stringify}
                    }
                    i && t(function () {
                        return h
                    })
                }).call(this)
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
        }, {}],
        35: [function (t, e, n) {
            function r(t) {
                if (t = "" + t, !(t.length > 1e4)) {
                    var e = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(t);
                    if (e) {
                        var n = parseFloat(e[1]), r = (e[2] || "ms").toLowerCase();
                        switch (r) {
                            case"years":
                            case"year":
                            case"yrs":
                            case"yr":
                            case"y":
                                return n * l;
                            case"days":
                            case"day":
                            case"d":
                                return n * f;
                            case"hours":
                            case"hour":
                            case"hrs":
                            case"hr":
                            case"h":
                                return n * u;
                            case"minutes":
                            case"minute":
                            case"mins":
                            case"min":
                            case"m":
                                return n * c;
                            case"seconds":
                            case"second":
                            case"secs":
                            case"sec":
                            case"s":
                                return n * a;
                            case"milliseconds":
                            case"millisecond":
                            case"msecs":
                            case"msec":
                            case"ms":
                                return n
                        }
                    }
                }
            }

            function o(t) {
                return t >= f ? Math.round(t / f) + "d" : t >= u ? Math.round(t / u) + "h" : t >= c ? Math.round(t / c) + "m" : t >= a ? Math.round(t / a) + "s" : t + "ms"
            }

            function i(t) {
                return s(t, f, "day") || s(t, u, "hour") || s(t, c, "minute") || s(t, a, "second") || t + " ms"
            }

            function s(t, e, n) {
                return e > t ? void 0 : 1.5 * e > t ? Math.floor(t / e) + " " + n : Math.ceil(t / e) + " " + n + "s"
            }

            var a = 1e3, c = 60 * a, u = 60 * c, f = 24 * u, l = 365.25 * f;
            e.exports = function (t, e) {
                return e = e || {}, "string" == typeof t ? r(t) : e.long ? i(t) : o(t)
            }
        }, {}],
        36: [function (t, e, n) {
            (function (t) {
                var n = /^[\],:{}\s]*$/, r = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                    o = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, i = /(?:^|:|,)(?:\s*\[)+/g, s = /^\s+/,
                    a = /\s+$/;
                e.exports = function (e) {
                    return "string" == typeof e && e ? (e = e.replace(s, "").replace(a, ""), t.JSON && JSON.parse ? JSON.parse(e) : n.test(e.replace(r, "@").replace(o, "]").replace(i, "")) ? new Function("return " + e)() : void 0) : null
                }
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
        }, {}],
        37: [function (t, e, n) {
            n.encode = function (t) {
                var e = "";
                for (var n in t) t.hasOwnProperty(n) && (e.length && (e += "&"), e += encodeURIComponent(n) + "=" + encodeURIComponent(t[n]));
                return e
            }, n.decode = function (t) {
                for (var e = {}, n = t.split("&"), r = 0, o = n.length; o > r; r++) {
                    var i = n[r].split("=");
                    e[decodeURIComponent(i[0])] = decodeURIComponent(i[1])
                }
                return e
            }
        }, {}],
        38: [function (t, e, n) {
            var r = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
                o = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
            e.exports = function (t) {
                var e = t, n = t.indexOf("["), i = t.indexOf("]");
                -1 != n && -1 != i && (t = t.substring(0, n) + t.substring(n, i).replace(/:/g, ";") + t.substring(i, t.length));
                for (var s = r.exec(t || ""), a = {}, c = 14; c--;) a[o[c]] = s[c] || "";
                return -1 != n && -1 != i && (a.source = e, a.host = a.host.substring(1, a.host.length - 1).replace(/;/g, ":"), a.authority = a.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), a.ipv6uri = !0), a
            }
        }, {}],
        39: [function (t, e, n) {
            (function (e) {
                var r = t("isarray"), o = t("./is-buffer");
                n.deconstructPacket = function (t) {
                    function e(t) {
                        if (!t) return t;
                        if (o(t)) {
                            var i = {_placeholder: !0, num: n.length};
                            return n.push(t), i
                        }
                        if (r(t)) {
                            for (var s = new Array(t.length), a = 0; a < t.length; a++) s[a] = e(t[a]);
                            return s
                        }
                        if ("object" == typeof t && !(t instanceof Date)) {
                            var s = {};
                            for (var c in t) s[c] = e(t[c]);
                            return s
                        }
                        return t
                    }

                    var n = [], i = t.data, s = t;
                    return s.data = e(i), s.attachments = n.length, {packet: s, buffers: n}
                }, n.reconstructPacket = function (t, e) {
                    function n(t) {
                        if (t && t._placeholder) {
                            var o = e[t.num];
                            return o
                        }
                        if (r(t)) {
                            for (var i = 0; i < t.length; i++) t[i] = n(t[i]);
                            return t
                        }
                        if (t && "object" == typeof t) {
                            for (var s in t) t[s] = n(t[s]);
                            return t
                        }
                        return t
                    }

                    return t.data = n(t.data), t.attachments = void 0, t
                }, n.removeBlobs = function (t, n) {
                    function i(t, c, u) {
                        if (!t) return t;
                        if (e.Blob && t instanceof Blob || e.File && t instanceof File) {
                            s++;
                            var f = new FileReader;
                            f.onload = function () {
                                u ? u[c] = this.result : a = this.result, --s || n(a)
                            }, f.readAsArrayBuffer(t)
                        } else if (r(t)) for (var l = 0; l < t.length; l++) i(t[l], l, t); else if (t && "object" == typeof t && !o(t)) for (var p in t) i(t[p], p, t)
                    }

                    var s = 0, a = t;
                    i(a), s || n(a)
                }
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
        }, {"./is-buffer": 41, isarray: 33}],
        40: [function (t, e, n) {
            function r() {
            }

            function o(t) {
                var e = "", r = !1;
                return e += t.type, n.BINARY_EVENT != t.type && n.BINARY_ACK != t.type || (e += t.attachments, e += "-"), t.nsp && "/" != t.nsp && (r = !0, e += t.nsp), null != t.id && (r && (e += ",", r = !1), e += t.id), null != t.data && (r && (e += ","), e += l.stringify(t.data)), f("encoded %j as %s", t, e), e
            }

            function i(t, e) {
                function n(t) {
                    var n = h.deconstructPacket(t), r = o(n.packet), i = n.buffers;
                    i.unshift(r), e(i)
                }

                h.removeBlobs(t, n)
            }

            function s() {
                this.reconstructor = null
            }

            function a(t) {
                var e = {}, r = 0;
                if (e.type = Number(t.charAt(0)), null == n.types[e.type]) return u();
                if (n.BINARY_EVENT == e.type || n.BINARY_ACK == e.type) {
                    for (var o = ""; "-" != t.charAt(++r) && (o += t.charAt(r), r != t.length);) ;
                    if (o != Number(o) || "-" != t.charAt(r)) throw new Error("Illegal attachments");
                    e.attachments = Number(o)
                }
                if ("/" == t.charAt(r + 1)) for (e.nsp = ""; ++r;) {
                    var i = t.charAt(r);
                    if ("," == i) break;
                    if (e.nsp += i, r == t.length) break
                } else e.nsp = "/";
                var s = t.charAt(r + 1);
                if ("" !== s && Number(s) == s) {
                    for (e.id = ""; ++r;) {
                        var i = t.charAt(r);
                        if (null == i || Number(i) != i) {
                            --r;
                            break
                        }
                        if (e.id += t.charAt(r), r == t.length) break
                    }
                    e.id = Number(e.id)
                }
                if (t.charAt(++r)) try {
                    e.data = l.parse(t.substr(r))
                } catch (t) {
                    return u()
                }
                return f("decoded %s as %j", t, e), e
            }

            function c(t) {
                this.reconPack = t, this.buffers = []
            }

            function u(t) {
                return {type: n.ERROR, data: "parser error"}
            }

            var f = t("debug")("socket.io-parser"), l = t("json3"), p = (t("isarray"), t("component-emitter")), h = t("./binary"),
                d = t("./is-buffer");
            n.protocol = 4, n.types = ["CONNECT", "DISCONNECT", "EVENT", "ACK", "ERROR", "BINARY_EVENT", "BINARY_ACK"], n.CONNECT = 0, n.DISCONNECT = 1, n.EVENT = 2, n.ACK = 3, n.ERROR = 4, n.BINARY_EVENT = 5, n.BINARY_ACK = 6, n.Encoder = r, n.Decoder = s, r.prototype.encode = function (t, e) {
                if (f("encoding packet %j", t), n.BINARY_EVENT == t.type || n.BINARY_ACK == t.type) i(t, e); else {
                    var r = o(t);
                    e([r])
                }
            }, p(s.prototype), s.prototype.add = function (t) {
                var e;
                if ("string" == typeof t) e = a(t), n.BINARY_EVENT == e.type || n.BINARY_ACK == e.type ? (this.reconstructor = new c(e), 0 === this.reconstructor.reconPack.attachments && this.emit("decoded", e)) : this.emit("decoded", e); else {
                    if (!d(t) && !t.base64) throw new Error("Unknown type: " + t);
                    if (!this.reconstructor) throw new Error("got binary data when not reconstructing a packet");
                    e = this.reconstructor.takeBinaryData(t), e && (this.reconstructor = null, this.emit("decoded", e))
                }
            }, s.prototype.destroy = function () {
                this.reconstructor && this.reconstructor.finishedReconstruction()
            }, c.prototype.takeBinaryData = function (t) {
                if (this.buffers.push(t), this.buffers.length == this.reconPack.attachments) {
                    var e = h.reconstructPacket(this.reconPack, this.buffers);
                    return this.finishedReconstruction(), e
                }
                return null
            }, c.prototype.finishedReconstruction = function () {
                this.reconPack = null, this.buffers = []
            }
        }, {"./binary": 39, "./is-buffer": 41, "component-emitter": 42, debug: 14, isarray: 33, json3: 34}],
        41: [function (t, e, n) {
            (function (t) {
                function n(e) {
                    return t.Buffer && t.Buffer.isBuffer(e) || t.ArrayBuffer && e instanceof ArrayBuffer
                }

                e.exports = n
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
        }, {}],
        42: [function (t, e, n) {
            arguments[4][26][0].apply(n, arguments)
        }, {dup: 26}],
        43: [function (t, e, n) {
            function r(t, e) {
                var n = [];
                e = e || 0;
                for (var r = e || 0; r < t.length; r++) n[r - e] = t[r];
                return n
            }

            e.exports = r
        }, {}],
        44: [function (e, n, r) {
            (function (e) {
                !function (o) {
                    function i(t) {
                        for (var e, n, r = [], o = 0, i = t.length; i > o;) e = t.charCodeAt(o++), e >= 55296 && 56319 >= e && i > o ? (n = t.charCodeAt(o++), 56320 == (64512 & n) ? r.push(((1023 & e) << 10) + (1023 & n) + 65536) : (r.push(e), o--)) : r.push(e);
                        return r
                    }

                    function s(t) {
                        for (var e, n = t.length, r = -1, o = ""; ++r < n;) e = t[r], e > 65535 && (e -= 65536, o += w(e >>> 10 & 1023 | 55296), e = 56320 | 1023 & e), o += w(e);
                        return o
                    }

                    function a(t) {
                        if (t >= 55296 && 57343 >= t) throw Error("Lone surrogate U+" + t.toString(16).toUpperCase() + " is not a scalar value")
                    }

                    function c(t, e) {
                        return w(t >> e & 63 | 128)
                    }

                    function u(t) {
                        if (0 == (4294967168 & t)) return w(t);
                        var e = "";
                        return 0 == (4294965248 & t) ? e = w(t >> 6 & 31 | 192) : 0 == (4294901760 & t) ? (a(t), e = w(t >> 12 & 15 | 224), e += c(t, 6)) : 0 == (4292870144 & t) && (e = w(t >> 18 & 7 | 240), e += c(t, 12), e += c(t, 6)), e += w(63 & t | 128)
                    }

                    function f(t) {
                        for (var e, n = i(t), r = n.length, o = -1, s = ""; ++o < r;) e = n[o], s += u(e);
                        return s
                    }

                    function l() {
                        if (b >= v) throw Error("Invalid byte index");
                        var t = 255 & g[b];
                        if (b++, 128 == (192 & t)) return 63 & t;
                        throw Error("Invalid continuation byte")
                    }

                    function p() {
                        var t, e, n, r, o;
                        if (b > v) throw Error("Invalid byte index");
                        if (b == v) return !1;
                        if (t = 255 & g[b], b++, 0 == (128 & t)) return t;
                        if (192 == (224 & t)) {
                            var e = l();
                            if (o = (31 & t) << 6 | e, o >= 128) return o;
                            throw Error("Invalid continuation byte")
                        }
                        if (224 == (240 & t)) {
                            if (e = l(), n = l(), o = (15 & t) << 12 | e << 6 | n, o >= 2048) return a(o), o;
                            throw Error("Invalid continuation byte")
                        }
                        if (240 == (248 & t) && (e = l(), n = l(), r = l(), o = (15 & t) << 18 | e << 12 | n << 6 | r, o >= 65536 && 1114111 >= o)) return o;
                        throw Error("Invalid UTF-8 detected")
                    }

                    function h(t) {
                        g = i(t), v = g.length, b = 0;
                        for (var e, n = []; (e = p()) !== !1;) n.push(e);
                        return s(n)
                    }

                    var d = "object" == typeof r && r, y = "object" == typeof n && n && n.exports == d && n, m = "object" == typeof e && e;
                    m.global !== m && m.window !== m || (o = m);
                    var g, v, b, w = String.fromCharCode, x = {version: "2.0.0", encode: f, decode: h};
                    if ("function" == typeof t && "object" == typeof t.amd && t.amd) t(function () {
                        return x
                    }); else if (d && !d.nodeType) if (y) y.exports = x; else {
                        var k = {}, E = k.hasOwnProperty;
                        for (var A in x) E.call(x, A) && (d[A] = x[A])
                    } else o.utf8 = x
                }(this)
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
        }, {}],
        45: [function (t, e, n) {
            "use strict";

            function r(t) {
                var e = "";
                do e = a[t % c] + e, t = Math.floor(t / c); while (t > 0);
                return e
            }

            function o(t) {
                var e = 0;
                for (l = 0; l < t.length; l++) e = e * c + u[t.charAt(l)];
                return e
            }

            function i() {
                var t = r(+new Date);
                return t !== s ? (f = 0, s = t) : t + "." + r(f++)
            }

            for (var s, a = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), c = 64, u = {}, f = 0, l = 0; c > l; l++) u[a[l]] = l;
            i.encode = r, i.decode = o, e.exports = i
        }, {}]
    }, {}, [1])(1)
}), function () {
    domready(function () {
        socket = io(document.getElementsByTagName("server")[0].innerHTML), socket.on("statsResults", function (t) {
            document.getElementById("stat_total_users").innerHTML = t.all.total, document.getElementById("stat_total_bandwidth").innerHTML = t.all.bandwidth, document.getElementById("stat_today").innerHTML = t.today.total, document.getElementById("stat_thirty_avg").innerHTML = t[30].total, document.getElementById("stat_today_bandwidth").innerHTML = t.today.bandwidth, document.getElementById("stat_loadavg").innerHTML = t.load
        }), window.location.href.indexOf("stats") !== -1 && (socket.emit("stats"), setInterval(function () {
            socket.emit("stats")
        }, 1e3))
    })
}(), !function (t, e) {
    "function" == typeof define && define.amd ? define(function () {
        return e(t)
    }) : e(t)
}(this, function (t) {
    var e = function () {
        function e(t) {
            return null == t ? String(t) : Z[W.call(t)] || "object"
        }

        function n(t) {
            return "function" == e(t)
        }

        function r(t) {
            return null != t && t == t.window
        }

        function o(t) {
            return null != t && t.nodeType == t.DOCUMENT_NODE
        }

        function i(t) {
            return "object" == e(t)
        }

        function s(t) {
            return i(t) && !r(t) && Object.getPrototypeOf(t) == Object.prototype
        }

        function a(t) {
            var e = !!t && "length" in t && t.length, n = C.type(t);
            return "function" != n && !r(t) && ("array" == n || 0 === e || "number" == typeof e && e > 0 && e - 1 in t)
        }

        function c(t) {
            return _.call(t, function (t) {
                return null != t
            })
        }

        function u(t) {
            return t.length > 0 ? C.fn.concat.apply([], t) : t
        }

        function f(t) {
            return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
        }

        function l(t) {
            return t in L ? L[t] : L[t] = new RegExp("(^|\\s)" + t + "(\\s|$)")
        }

        function p(t, e) {
            return "number" != typeof e || R[f(t)] ? e : e + "px"
        }

        function h(t) {
            var e, n;
            return D[t] || (e = P.createElement(t), P.body.appendChild(e), n = getComputedStyle(e, "").getPropertyValue("display"), e.parentNode.removeChild(e), "none" == n && (n = "block"), D[t] = n), D[t]
        }

        function d(t) {
            return "children" in t ? O.call(t.children) : C.map(t.childNodes, function (t) {
                return 1 == t.nodeType ? t : void 0
            })
        }

        function y(t, e) {
            var n, r = t ? t.length : 0;
            for (n = 0; r > n; n++) this[n] = t[n];
            this.length = r, this.selector = e || ""
        }

        function m(t, e, n) {
            for (A in e) n && (s(e[A]) || tt(e[A])) ? (s(e[A]) && !s(t[A]) && (t[A] = {}), tt(e[A]) && !tt(t[A]) && (t[A] = []), m(t[A], e[A], n)) : e[A] !== E && (t[A] = e[A])
        }

        function g(t, e) {
            return null == e ? C(t) : C(t).filter(e)
        }

        function v(t, e, r, o) {
            return n(e) ? e.call(t, r, o) : e
        }

        function b(t, e, n) {
            null == n ? t.removeAttribute(e) : t.setAttribute(e, n)
        }

        function w(t, e) {
            var n = t.className || "", r = n && n.baseVal !== E;
            return e === E ? r ? n.baseVal : n : void(r ? n.baseVal = e : t.className = e)
        }

        function x(t) {
            try {
                return t ? "true" == t || "false" != t && ("null" == t ? null : +t + "" == t ? +t : /^[\[\{]/.test(t) ? C.parseJSON(t) : t) : t
            } catch (e) {
                return t
            }
        }

        function k(t, e) {
            e(t);
            for (var n = 0, r = t.childNodes.length; r > n; n++) k(t.childNodes[n], e)
        }

        var E, A, C, B, S, T, N = [], j = N.concat, _ = N.filter, O = N.slice, P = t.document, D = {}, L = {},
            R = {"column-count": 1, columns: 1, "font-weight": 1, "line-height": 1, opacity: 1, "z-index": 1, zoom: 1},
            M = /^\s*<(\w+|!)[^>]*>/, U = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
            q = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, I = /^(?:body|html)$/i, H = /([A-Z])/g,
            F = ["val", "css", "html", "text", "data", "width", "height", "offset"], z = ["after", "prepend", "before", "append"],
            $ = P.createElement("table"), J = P.createElement("tr"),
            X = {tr: P.createElement("tbody"), tbody: $, thead: $, tfoot: $, td: J, th: J, "*": P.createElement("div")},
            V = /complete|loaded|interactive/, Y = /^[\w-]*$/, Z = {}, W = Z.toString, K = {}, G = P.createElement("div"), Q = {
                tabindex: "tabIndex",
                readonly: "readOnly",
                for: "htmlFor",
                class: "className",
                maxlength: "maxLength",
                cellspacing: "cellSpacing",
                cellpadding: "cellPadding",
                rowspan: "rowSpan",
                colspan: "colSpan",
                usemap: "useMap",
                frameborder: "frameBorder",
                contenteditable: "contentEditable"
            }, tt = Array.isArray || function (t) {
                return t instanceof Array
            };
        return K.matches = function (t, e) {
            if (!e || !t || 1 !== t.nodeType) return !1;
            var n = t.matches || t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.matchesSelector;
            if (n) return n.call(t, e);
            var r, o = t.parentNode, i = !o;
            return i && (o = G).appendChild(t), r = ~K.qsa(o, e).indexOf(t), i && G.removeChild(t), r
        }, S = function (t) {
            return t.replace(/-+(.)?/g, function (t, e) {
                return e ? e.toUpperCase() : ""
            })
        }, T = function (t) {
            return _.call(t, function (e, n) {
                return t.indexOf(e) == n
            })
        }, K.fragment = function (t, e, n) {
            var r, o, i;
            return U.test(t) && (r = C(P.createElement(RegExp.$1))), r || (t.replace && (t = t.replace(q, "<$1></$2>")), e === E && (e = M.test(t) && RegExp.$1), e in X || (e = "*"), i = X[e], i.innerHTML = "" + t, r = C.each(O.call(i.childNodes), function () {
                i.removeChild(this)
            })), s(n) && (o = C(r), C.each(n, function (t, e) {
                F.indexOf(t) > -1 ? o[t](e) : o.attr(t, e)
            })), r
        }, K.Z = function (t, e) {
            return new y(t, e)
        }, K.isZ = function (t) {
            return t instanceof K.Z
        }, K.init = function (t, e) {
            var r;
            if (!t) return K.Z();
            if ("string" == typeof t) if (t = t.trim(), "<" == t[0] && M.test(t)) r = K.fragment(t, RegExp.$1, e), t = null; else {
                if (e !== E) return C(e).find(t);
                r = K.qsa(P, t)
            } else {
                if (n(t)) return C(P).ready(t);
                if (K.isZ(t)) return t;
                if (tt(t)) r = c(t); else if (i(t)) r = [t], t = null; else if (M.test(t)) r = K.fragment(t.trim(), RegExp.$1, e), t = null; else {
                    if (e !== E) return C(e).find(t);
                    r = K.qsa(P, t)
                }
            }
            return K.Z(r, t)
        }, C = function (t, e) {
            return K.init(t, e)
        }, C.extend = function (t) {
            var e, n = O.call(arguments, 1);
            return "boolean" == typeof t && (e = t, t = n.shift()), n.forEach(function (n) {
                m(t, n, e)
            }), t
        }, K.qsa = function (t, e) {
            var n, r = "#" == e[0], o = !r && "." == e[0], i = r || o ? e.slice(1) : e, s = Y.test(i);
            return t.getElementById && s && r ? (n = t.getElementById(i)) ? [n] : [] : 1 !== t.nodeType && 9 !== t.nodeType && 11 !== t.nodeType ? [] : O.call(s && !r && t.getElementsByClassName ? o ? t.getElementsByClassName(i) : t.getElementsByTagName(e) : t.querySelectorAll(e))
        }, C.contains = P.documentElement.contains ? function (t, e) {
            return t !== e && t.contains(e)
        } : function (t, e) {
            for (; e && (e = e.parentNode);) if (e === t) return !0;
            return !1
        }, C.type = e, C.isFunction = n, C.isWindow = r, C.isArray = tt, C.isPlainObject = s, C.isEmptyObject = function (t) {
            var e;
            for (e in t) return !1;
            return !0
        }, C.isNumeric = function (t) {
            var e = Number(t), n = typeof t;
            return null != t && "boolean" != n && ("string" != n || t.length) && !isNaN(e) && isFinite(e) || !1
        }, C.inArray = function (t, e, n) {
            return N.indexOf.call(e, t, n)
        }, C.camelCase = S, C.trim = function (t) {
            return null == t ? "" : String.prototype.trim.call(t)
        }, C.uuid = 0, C.support = {}, C.expr = {}, C.noop = function () {
        }, C.map = function (t, e) {
            var n, r, o, i = [];
            if (a(t)) for (r = 0; r < t.length; r++) n = e(t[r], r), null != n && i.push(n); else for (o in t) n = e(t[o], o), null != n && i.push(n);
            return u(i)
        }, C.each = function (t, e) {
            var n, r;
            if (a(t)) {
                for (n = 0; n < t.length; n++) if (e.call(t[n], n, t[n]) === !1) return t
            } else for (r in t) if (e.call(t[r], r, t[r]) === !1) return t;
            return t
        }, C.grep = function (t, e) {
            return _.call(t, e)
        }, t.JSON && (C.parseJSON = JSON.parse), C.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (t, e) {
            Z["[object " + e + "]"] = e.toLowerCase()
        }), C.fn = {
            constructor: K.Z,
            length: 0,
            forEach: N.forEach,
            reduce: N.reduce,
            push: N.push,
            sort: N.sort,
            splice: N.splice,
            indexOf: N.indexOf,
            concat: function () {
                var t, e, n = [];
                for (t = 0; t < arguments.length; t++) e = arguments[t], n[t] = K.isZ(e) ? e.toArray() : e;
                return j.apply(K.isZ(this) ? this.toArray() : this, n)
            },
            map: function (t) {
                return C(C.map(this, function (e, n) {
                    return t.call(e, n, e)
                }))
            },
            slice: function () {
                return C(O.apply(this, arguments))
            },
            ready: function (t) {
                return V.test(P.readyState) && P.body ? t(C) : P.addEventListener("DOMContentLoaded", function () {
                    t(C)
                }, !1), this
            },
            get: function (t) {
                return t === E ? O.call(this) : this[t >= 0 ? t : t + this.length]
            },
            toArray: function () {
                return this.get()
            },
            size: function () {
                return this.length
            },
            remove: function () {
                return this.each(function () {
                    null != this.parentNode && this.parentNode.removeChild(this)
                })
            },
            each: function (t) {
                return N.every.call(this, function (e, n) {
                    return t.call(e, n, e) !== !1
                }), this
            },
            filter: function (t) {
                return n(t) ? this.not(this.not(t)) : C(_.call(this, function (e) {
                    return K.matches(e, t)
                }))
            },
            add: function (t, e) {
                return C(T(this.concat(C(t, e))))
            },
            is: function (t) {
                return this.length > 0 && K.matches(this[0], t)
            },
            not: function (t) {
                var e = [];
                if (n(t) && t.call !== E) this.each(function (n) {
                    t.call(this, n) || e.push(this)
                }); else {
                    var r = "string" == typeof t ? this.filter(t) : a(t) && n(t.item) ? O.call(t) : C(t);
                    this.forEach(function (t) {
                        r.indexOf(t) < 0 && e.push(t)
                    })
                }
                return C(e)
            },
            has: function (t) {
                return this.filter(function () {
                    return i(t) ? C.contains(this, t) : C(this).find(t).size()
                })
            },
            eq: function (t) {
                return -1 === t ? this.slice(t) : this.slice(t, +t + 1)
            },
            first: function () {
                var t = this[0];
                return t && !i(t) ? t : C(t)
            },
            last: function () {
                var t = this[this.length - 1];
                return t && !i(t) ? t : C(t)
            },
            find: function (t) {
                var e, n = this;
                return e = t ? "object" == typeof t ? C(t).filter(function () {
                    var t = this;
                    return N.some.call(n, function (e) {
                        return C.contains(e, t)
                    })
                }) : 1 == this.length ? C(K.qsa(this[0], t)) : this.map(function () {
                    return K.qsa(this, t)
                }) : C()
            },
            closest: function (t, e) {
                var n = [], r = "object" == typeof t && C(t);
                return this.each(function (i, s) {
                    for (; s && !(r ? r.indexOf(s) >= 0 : K.matches(s, t));) s = s !== e && !o(s) && s.parentNode;
                    s && n.indexOf(s) < 0 && n.push(s)
                }), C(n)
            },
            parents: function (t) {
                for (var e = [], n = this; n.length > 0;) n = C.map(n, function (t) {
                    return (t = t.parentNode) && !o(t) && e.indexOf(t) < 0 ? (e.push(t), t) : void 0
                });
                return g(e, t)
            },
            parent: function (t) {
                return g(T(this.pluck("parentNode")), t)
            },
            children: function (t) {
                return g(this.map(function () {
                    return d(this)
                }), t)
            },
            contents: function () {
                return this.map(function () {
                    return this.contentDocument || O.call(this.childNodes)
                })
            },
            siblings: function (t) {
                return g(this.map(function (t, e) {
                    return _.call(d(e.parentNode), function (t) {
                        return t !== e
                    })
                }), t)
            },
            empty: function () {
                return this.each(function () {
                    this.innerHTML = ""
                })
            },
            pluck: function (t) {
                return C.map(this, function (e) {
                    return e[t]
                })
            },
            show: function () {
                return this.each(function () {
                    "none" == this.style.display && (this.style.display = ""), "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = h(this.nodeName))
                })
            },
            replaceWith: function (t) {
                return this.before(t).remove()
            },
            wrap: function (t) {
                var e = n(t);
                if (this[0] && !e) var r = C(t).get(0), o = r.parentNode || this.length > 1;
                return this.each(function (n) {
                    C(this).wrapAll(e ? t.call(this, n) : o ? r.cloneNode(!0) : r)
                })
            },
            wrapAll: function (t) {
                if (this[0]) {
                    C(this[0]).before(t = C(t));
                    for (var e; (e = t.children()).length;) t = e.first();
                    C(t).append(this)
                }
                return this
            },
            wrapInner: function (t) {
                var e = n(t);
                return this.each(function (n) {
                    var r = C(this), o = r.contents(), i = e ? t.call(this, n) : t;
                    o.length ? o.wrapAll(i) : r.append(i)
                })
            },
            unwrap: function () {
                return this.parent().each(function () {
                    C(this).replaceWith(C(this).children())
                }), this
            },
            clone: function () {
                return this.map(function () {
                    return this.cloneNode(!0)
                })
            },
            hide: function () {
                return this.css("display", "none")
            },
            toggle: function (t) {
                return this.each(function () {
                    var e = C(this);
                    (t === E ? "none" == e.css("display") : t) ? e.show() : e.hide()
                })
            },
            prev: function (t) {
                return C(this.pluck("previousElementSibling")).filter(t || "*")
            },
            next: function (t) {
                return C(this.pluck("nextElementSibling")).filter(t || "*")
            },
            html: function (t) {
                return 0 in arguments ? this.each(function (e) {
                    var n = this.innerHTML;
                    C(this).empty().append(v(this, t, e, n))
                }) : 0 in this ? this[0].innerHTML : null
            },
            text: function (t) {
                return 0 in arguments ? this.each(function (e) {
                    var n = v(this, t, e, this.textContent);
                    this.textContent = null == n ? "" : "" + n
                }) : 0 in this ? this.pluck("textContent").join("") : null
            },
            attr: function (t, e) {
                var n;
                return "string" != typeof t || 1 in arguments ? this.each(function (n) {
                    if (1 === this.nodeType) if (i(t)) for (A in t) b(this, A, t[A]); else b(this, t, v(this, e, n, this.getAttribute(t)))
                }) : 0 in this && 1 == this[0].nodeType && null != (n = this[0].getAttribute(t)) ? n : E
            },
            removeAttr: function (t) {
                return this.each(function () {
                    1 === this.nodeType && t.split(" ").forEach(function (t) {
                        b(this, t)
                    }, this)
                })
            },
            prop: function (t, e) {
                return t = Q[t] || t, 1 in arguments ? this.each(function (n) {
                    this[t] = v(this, e, n, this[t])
                }) : this[0] && this[0][t]
            },
            removeProp: function (t) {
                return t = Q[t] || t, this.each(function () {
                    delete this[t]
                })
            },
            data: function (t, e) {
                var n = "data-" + t.replace(H, "-$1").toLowerCase(), r = 1 in arguments ? this.attr(n, e) : this.attr(n);
                return null !== r ? x(r) : E
            },
            val: function (t) {
                return 0 in arguments ? (null == t && (t = ""), this.each(function (e) {
                    this.value = v(this, t, e, this.value)
                })) : this[0] && (this[0].multiple ? C(this[0]).find("option").filter(function () {
                    return this.selected
                }).pluck("value") : this[0].value)
            },
            offset: function (e) {
                if (e) return this.each(function (t) {
                    var n = C(this), r = v(this, e, t, n.offset()), o = n.offsetParent().offset(),
                        i = {top: r.top - o.top, left: r.left - o.left};
                    "static" == n.css("position") && (i.position = "relative"), n.css(i)
                });
                if (!this.length) return null;
                if (P.documentElement !== this[0] && !C.contains(P.documentElement, this[0])) return {top: 0, left: 0};
                var n = this[0].getBoundingClientRect();
                return {left: n.left + t.pageXOffset, top: n.top + t.pageYOffset, width: Math.round(n.width), height: Math.round(n.height)}
            },
            css: function (t, n) {
                if (arguments.length < 2) {
                    var r = this[0];
                    if ("string" == typeof t) {
                        if (!r) return;
                        return r.style[S(t)] || getComputedStyle(r, "").getPropertyValue(t)
                    }
                    if (tt(t)) {
                        if (!r) return;
                        var o = {}, i = getComputedStyle(r, "");
                        return C.each(t, function (t, e) {
                            o[e] = r.style[S(e)] || i.getPropertyValue(e)
                        }), o
                    }
                }
                var s = "";
                if ("string" == e(t)) n || 0 === n ? s = f(t) + ":" + p(t, n) : this.each(function () {
                    this.style.removeProperty(f(t))
                }); else for (A in t) t[A] || 0 === t[A] ? s += f(A) + ":" + p(A, t[A]) + ";" : this.each(function () {
                    this.style.removeProperty(f(A))
                });
                return this.each(function () {
                    this.style.cssText += ";" + s
                })
            },
            index: function (t) {
                return t ? this.indexOf(C(t)[0]) : this.parent().children().indexOf(this[0])
            },
            hasClass: function (t) {
                return !!t && N.some.call(this, function (t) {
                    return this.test(w(t))
                }, l(t))
            },
            addClass: function (t) {
                return t ? this.each(function (e) {
                    if ("className" in this) {
                        B = [];
                        var n = w(this), r = v(this, t, e, n);
                        r.split(/\s+/g).forEach(function (t) {
                            C(this).hasClass(t) || B.push(t)
                        }, this), B.length && w(this, n + (n ? " " : "") + B.join(" "))
                    }
                }) : this
            },
            removeClass: function (t) {
                return this.each(function (e) {
                    if ("className" in this) {
                        if (t === E) return w(this, "");
                        B = w(this), v(this, t, e, B).split(/\s+/g).forEach(function (t) {
                            B = B.replace(l(t), " ")
                        }), w(this, B.trim())
                    }
                })
            },
            toggleClass: function (t, e) {
                return t ? this.each(function (n) {
                    var r = C(this), o = v(this, t, n, w(this));
                    o.split(/\s+/g).forEach(function (t) {
                        (e === E ? !r.hasClass(t) : e) ? r.addClass(t) : r.removeClass(t)
                    })
                }) : this
            },
            scrollTop: function (t) {
                if (this.length) {
                    var e = "scrollTop" in this[0];
                    return t === E ? e ? this[0].scrollTop : this[0].pageYOffset : this.each(e ? function () {
                        this.scrollTop = t
                    } : function () {
                        this.scrollTo(this.scrollX, t)
                    })
                }
            },
            scrollLeft: function (t) {
                if (this.length) {
                    var e = "scrollLeft" in this[0];
                    return t === E ? e ? this[0].scrollLeft : this[0].pageXOffset : this.each(e ? function () {
                        this.scrollLeft = t
                    } : function () {
                        this.scrollTo(t, this.scrollY)
                    })
                }
            },
            position: function () {
                if (this.length) {
                    var t = this[0], e = this.offsetParent(), n = this.offset(), r = I.test(e[0].nodeName) ? {top: 0, left: 0} : e.offset();
                    return n.top -= parseFloat(C(t).css("margin-top")) || 0, n.left -= parseFloat(C(t).css("margin-left")) || 0, r.top += parseFloat(C(e[0]).css("border-top-width")) || 0, r.left += parseFloat(C(e[0]).css("border-left-width")) || 0, {
                        top: n.top - r.top,
                        left: n.left - r.left
                    }
                }
            },
            offsetParent: function () {
                return this.map(function () {
                    for (var t = this.offsetParent || P.body; t && !I.test(t.nodeName) && "static" == C(t).css("position");) t = t.offsetParent;
                    return t
                })
            }
        }, C.fn.detach = C.fn.remove, ["width", "height"].forEach(function (t) {
            var e = t.replace(/./, function (t) {
                return t[0].toUpperCase()
            });
            C.fn[t] = function (n) {
                var i, s = this[0];
                return n === E ? r(s) ? s["inner" + e] : o(s) ? s.documentElement["scroll" + e] : (i = this.offset()) && i[t] : this.each(function (e) {
                    s = C(this), s.css(t, v(this, n, e, s[t]()))
                })
            }
        }), z.forEach(function (n, r) {
            var o = r % 2;
            C.fn[n] = function () {
                var n, i, s = C.map(arguments, function (t) {
                    var r = [];
                    return n = e(t), "array" == n ? (t.forEach(function (t) {
                        return t.nodeType !== E ? r.push(t) : C.zepto.isZ(t) ? r = r.concat(t.get()) : void(r = r.concat(K.fragment(t)))
                    }), r) : "object" == n || null == t ? t : K.fragment(t)
                }), a = this.length > 1;
                return s.length < 1 ? this : this.each(function (e, n) {
                    i = o ? n : n.parentNode, n = 0 == r ? n.nextSibling : 1 == r ? n.firstChild : 2 == r ? n : null;
                    var c = C.contains(P.documentElement, i);
                    s.forEach(function (e) {
                        if (a) e = e.cloneNode(!0); else if (!i) return C(e).remove();
                        i.insertBefore(e, n), c && k(e, function (e) {
                            if (!(null == e.nodeName || "SCRIPT" !== e.nodeName.toUpperCase() || e.type && "text/javascript" !== e.type || e.src)) {
                                var n = e.ownerDocument ? e.ownerDocument.defaultView : t;
                                n.eval.call(n, e.innerHTML)
                            }
                        })
                    })
                })
            }, C.fn[o ? n + "To" : "insert" + (r ? "Before" : "After")] = function (t) {
                return C(t)[n](this), this
            }
        }), K.Z.prototype = y.prototype = C.fn, K.uniq = T, K.deserializeValue = x, C.zepto = K, C
    }();
    return t.Zepto = e, void 0 === t.$ && (t.$ = e), function (e) {
        function n(t) {
            return t._zid || (t._zid = h++)
        }

        function r(t, e, r, s) {
            if (e = o(e), e.ns) var a = i(e.ns);
            return (g[n(t)] || []).filter(function (t) {
                return t && (!e.e || t.e == e.e) && (!e.ns || a.test(t.ns)) && (!r || n(t.fn) === n(r)) && (!s || t.sel == s)
            })
        }

        function o(t) {
            var e = ("" + t).split(".");
            return {e: e[0], ns: e.slice(1).sort().join(" ")}
        }

        function i(t) {
            return new RegExp("(?:^| )" + t.replace(" ", " .* ?") + "(?: |$)")
        }

        function s(t, e) {
            return t.del && !b && t.e in w || !!e
        }

        function a(t) {
            return x[t] || b && w[t] || t
        }

        function c(t, r, i, c, u, l, h) {
            var d = n(t), y = g[d] || (g[d] = []);
            r.split(/\s/).forEach(function (n) {
                if ("ready" == n) return e(document).ready(i);
                var r = o(n);
                r.fn = i, r.sel = u, r.e in x && (i = function (t) {
                    var n = t.relatedTarget;
                    return !n || n !== this && !e.contains(this, n) ? r.fn.apply(this, arguments) : void 0
                }), r.del = l;
                var d = l || i;
                r.proxy = function (e) {
                    if (e = f(e), !e.isImmediatePropagationStopped()) {
                        e.data = c;
                        var n = d.apply(t, e._args == p ? [e] : [e].concat(e._args));
                        return n === !1 && (e.preventDefault(), e.stopPropagation()), n
                    }
                }, r.i = y.length, y.push(r), "addEventListener" in t && t.addEventListener(a(r.e), r.proxy, s(r, h))
            })
        }

        function u(t, e, o, i, c) {
            var u = n(t);
            (e || "").split(/\s/).forEach(function (e) {
                r(t, e, o, i).forEach(function (e) {
                    delete g[u][e.i], "removeEventListener" in t && t.removeEventListener(a(e.e), e.proxy, s(e, c))
                })
            })
        }

        function f(t, n) {
            return (n || !t.isDefaultPrevented) && (n || (n = t), e.each(C, function (e, r) {
                var o = n[e];
                t[e] = function () {
                    return this[r] = k, o && o.apply(n, arguments)
                }, t[r] = E
            }), t.timeStamp || (t.timeStamp = Date.now()), (n.defaultPrevented !== p ? n.defaultPrevented : "returnValue" in n ? n.returnValue === !1 : n.getPreventDefault && n.getPreventDefault()) && (t.isDefaultPrevented = k)), t
        }

        function l(t) {
            var e, n = {originalEvent: t};
            for (e in t) A.test(e) || t[e] === p || (n[e] = t[e]);
            return f(n, t)
        }

        var p, h = 1, d = Array.prototype.slice, y = e.isFunction, m = function (t) {
                return "string" == typeof t
            }, g = {}, v = {}, b = "onfocusin" in t, w = {focus: "focusin", blur: "focusout"},
            x = {mouseenter: "mouseover", mouseleave: "mouseout"};
        v.click = v.mousedown = v.mouseup = v.mousemove = "MouseEvents", e.event = {add: c, remove: u}, e.proxy = function (t, r) {
            var o = 2 in arguments && d.call(arguments, 2);
            if (y(t)) {
                var i = function () {
                    return t.apply(r, o ? o.concat(d.call(arguments)) : arguments)
                };
                return i._zid = n(t), i
            }
            if (m(r)) return o ? (o.unshift(t[r], t), e.proxy.apply(null, o)) : e.proxy(t[r], t);
            throw new TypeError("expected function")
        }, e.fn.bind = function (t, e, n) {
            return this.on(t, e, n)
        }, e.fn.unbind = function (t, e) {
            return this.off(t, e)
        }, e.fn.one = function (t, e, n, r) {
            return this.on(t, e, n, r, 1)
        };
        var k = function () {
            return !0
        }, E = function () {
            return !1
        }, A = /^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/, C = {
            preventDefault: "isDefaultPrevented",
            stopImmediatePropagation: "isImmediatePropagationStopped",
            stopPropagation: "isPropagationStopped"
        };
        e.fn.delegate = function (t, e, n) {
            return this.on(e, t, n)
        }, e.fn.undelegate = function (t, e, n) {
            return this.off(e, t, n)
        }, e.fn.live = function (t, n) {
            return e(document.body).delegate(this.selector, t, n), this
        }, e.fn.die = function (t, n) {
            return e(document.body).undelegate(this.selector, t, n), this
        }, e.fn.on = function (t, n, r, o, i) {
            var s, a, f = this;
            return t && !m(t) ? (e.each(t, function (t, e) {
                f.on(t, n, r, e, i)
            }), f) : (m(n) || y(o) || o === !1 || (o = r, r = n, n = p), (o === p || r === !1) && (o = r, r = p), o === !1 && (o = E), f.each(function (f, p) {
                i && (s = function (t) {
                    return u(p, t.type, o), o.apply(this, arguments)
                }), n && (a = function (t) {
                    var r, i = e(t.target).closest(n, p).get(0);
                    return i && i !== p ? (r = e.extend(l(t), {
                        currentTarget: i,
                        liveFired: p
                    }), (s || o).apply(i, [r].concat(d.call(arguments, 1)))) : void 0
                }), c(p, t, o, r, n, a || s)
            }))
        }, e.fn.off = function (t, n, r) {
            var o = this;
            return t && !m(t) ? (e.each(t, function (t, e) {
                o.off(t, n, e)
            }), o) : (m(n) || y(r) || r === !1 || (r = n, n = p), r === !1 && (r = E), o.each(function () {
                u(this, t, r, n)
            }))
        }, e.fn.trigger = function (t, n) {
            return t = m(t) || e.isPlainObject(t) ? e.Event(t) : f(t), t._args = n, this.each(function () {
                t.type in w && "function" == typeof this[t.type] ? this[t.type]() : "dispatchEvent" in this ? this.dispatchEvent(t) : e(this).triggerHandler(t, n)
            })
        }, e.fn.triggerHandler = function (t, n) {
            var o, i;
            return this.each(function (s, a) {
                o = l(m(t) ? e.Event(t) : t), o._args = n, o.target = a, e.each(r(a, t.type || t), function (t, e) {
                    return i = e.proxy(o), !o.isImmediatePropagationStopped() && void 0
                })
            }), i
        }, "focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function (t) {
            e.fn[t] = function (e) {
                return 0 in arguments ? this.bind(t, e) : this.trigger(t)
            }
        }), e.Event = function (t, e) {
            m(t) || (e = t, t = e.type);
            var n = document.createEvent(v[t] || "Events"), r = !0;
            if (e) for (var o in e) "bubbles" == o ? r = !!e[o] : n[o] = e[o];
            return n.initEvent(t, r, !0), f(n)
        }
    }(e), function (e) {
        function n(t, n, r) {
            var o = e.Event(n);
            return e(t).trigger(o, r), !o.isDefaultPrevented()
        }

        function r(t, e, r, o) {
            return t.global ? n(e || w, r, o) : void 0
        }

        function o(t) {
            t.global && 0 === e.active++ && r(t, null, "ajaxStart")
        }

        function i(t) {
            t.global && !--e.active && r(t, null, "ajaxStop")
        }

        function s(t, e) {
            var n = e.context;
            return e.beforeSend.call(n, t, e) !== !1 && r(e, n, "ajaxBeforeSend", [t, e]) !== !1 && void r(e, n, "ajaxSend", [t, e]);
        }

        function a(t, e, n, o) {
            var i = n.context, s = "success";
            n.success.call(i, t, s, e), o && o.resolveWith(i, [t, s, e]), r(n, i, "ajaxSuccess", [e, n, t]), u(s, e, n)
        }

        function c(t, e, n, o, i) {
            var s = o.context;
            o.error.call(s, n, e, t), i && i.rejectWith(s, [n, e, t]), r(o, s, "ajaxError", [n, o, t || e]), u(e, n, o)
        }

        function u(t, e, n) {
            var o = n.context;
            n.complete.call(o, e, t), r(n, o, "ajaxComplete", [e, n]), i(n)
        }

        function f(t, e, n) {
            if (n.dataFilter == l) return t;
            var r = n.context;
            return n.dataFilter.call(r, t, e)
        }

        function l() {
        }

        function p(t) {
            return t && (t = t.split(";", 2)[0]), t && (t == C ? "html" : t == A ? "json" : k.test(t) ? "script" : E.test(t) && "xml") || "text"
        }

        function h(t, e) {
            return "" == e ? t : (t + "&" + e).replace(/[&?]{1,2}/, "?")
        }

        function d(t) {
            t.processData && t.data && "string" != e.type(t.data) && (t.data = e.param(t.data, t.traditional)), !t.data || t.type && "GET" != t.type.toUpperCase() && "jsonp" != t.dataType || (t.url = h(t.url, t.data), t.data = void 0)
        }

        function y(t, n, r, o) {
            return e.isFunction(n) && (o = r, r = n, n = void 0), e.isFunction(r) || (o = r, r = void 0), {
                url: t,
                data: n,
                success: r,
                dataType: o
            }
        }

        function m(t, n, r, o) {
            var i, s = e.isArray(n), a = e.isPlainObject(n);
            e.each(n, function (n, c) {
                i = e.type(c), o && (n = r ? o : o + "[" + (a || "object" == i || "array" == i ? n : "") + "]"), !o && s ? t.add(c.name, c.value) : "array" == i || !r && "object" == i ? m(t, c, r, n) : t.add(n, c)
            })
        }

        var g, v, b = +new Date, w = t.document, x = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
            k = /^(?:text|application)\/javascript/i, E = /^(?:text|application)\/xml/i, A = "application/json", C = "text/html",
            B = /^\s*$/, S = w.createElement("a");
        S.href = t.location.href, e.active = 0, e.ajaxJSONP = function (n, r) {
            if (!("type" in n)) return e.ajax(n);
            var o, i, u = n.jsonpCallback, f = (e.isFunction(u) ? u() : u) || "Zepto" + b++, l = w.createElement("script"), p = t[f],
                h = function (t) {
                    e(l).triggerHandler("error", t || "abort")
                }, d = {abort: h};
            return r && r.promise(d), e(l).on("load error", function (s, u) {
                clearTimeout(i), e(l).off().remove(), "error" != s.type && o ? a(o[0], d, n, r) : c(null, u || "error", d, n, r), t[f] = p, o && e.isFunction(p) && p(o[0]), p = o = void 0
            }), s(d, n) === !1 ? (h("abort"), d) : (t[f] = function () {
                o = arguments
            }, l.src = n.url.replace(/\?(.+)=\?/, "?$1=" + f), w.head.appendChild(l), n.timeout > 0 && (i = setTimeout(function () {
                h("timeout")
            }, n.timeout)), d)
        }, e.ajaxSettings = {
            type: "GET",
            beforeSend: l,
            success: l,
            error: l,
            complete: l,
            context: null,
            global: !0,
            xhr: function () {
                return new t.XMLHttpRequest
            },
            accepts: {
                script: "text/javascript, application/javascript, application/x-javascript",
                json: A,
                xml: "application/xml, text/xml",
                html: C,
                text: "text/plain"
            },
            crossDomain: !1,
            timeout: 0,
            processData: !0,
            cache: !0,
            dataFilter: l
        }, e.ajax = function (n) {
            var r, i, u = e.extend({}, n || {}), y = e.Deferred && e.Deferred();
            for (g in e.ajaxSettings) void 0 === u[g] && (u[g] = e.ajaxSettings[g]);
            o(u), u.crossDomain || (r = w.createElement("a"), r.href = u.url, r.href = r.href, u.crossDomain = S.protocol + "//" + S.host != r.protocol + "//" + r.host), u.url || (u.url = t.location.toString()), (i = u.url.indexOf("#")) > -1 && (u.url = u.url.slice(0, i)), d(u);
            var m = u.dataType, b = /\?.+=\?/.test(u.url);
            if (b && (m = "jsonp"), u.cache !== !1 && (n && n.cache === !0 || "script" != m && "jsonp" != m) || (u.url = h(u.url, "_=" + Date.now())), "jsonp" == m) return b || (u.url = h(u.url, u.jsonp ? u.jsonp + "=?" : u.jsonp === !1 ? "" : "callback=?")), e.ajaxJSONP(u, y);
            var x, k = u.accepts[m], E = {}, A = function (t, e) {
                E[t.toLowerCase()] = [t, e]
            }, C = /^([\w-]+:)\/\//.test(u.url) ? RegExp.$1 : t.location.protocol, T = u.xhr(), N = T.setRequestHeader;
            if (y && y.promise(T), u.crossDomain || A("X-Requested-With", "XMLHttpRequest"), A("Accept", k || "*/*"), (k = u.mimeType || k) && (k.indexOf(",") > -1 && (k = k.split(",", 2)[0]), T.overrideMimeType && T.overrideMimeType(k)), (u.contentType || u.contentType !== !1 && u.data && "GET" != u.type.toUpperCase()) && A("Content-Type", u.contentType || "application/x-www-form-urlencoded"), u.headers) for (v in u.headers) A(v, u.headers[v]);
            if (T.setRequestHeader = A, T.onreadystatechange = function () {
                if (4 == T.readyState) {
                    T.onreadystatechange = l, clearTimeout(x);
                    var t, n = !1;
                    if (T.status >= 200 && T.status < 300 || 304 == T.status || 0 == T.status && "file:" == C) {
                        if (m = m || p(u.mimeType || T.getResponseHeader("content-type")), "arraybuffer" == T.responseType || "blob" == T.responseType) t = T.response; else {
                            t = T.responseText;
                            try {
                                t = f(t, m, u), "script" == m ? (0, eval)(t) : "xml" == m ? t = T.responseXML : "json" == m && (t = B.test(t) ? null : e.parseJSON(t))
                            } catch (t) {
                                n = t
                            }
                            if (n) return c(n, "parsererror", T, u, y)
                        }
                        a(t, T, u, y)
                    } else c(T.statusText || null, T.status ? "error" : "abort", T, u, y)
                }
            }, s(T, u) === !1) return T.abort(), c(null, "abort", T, u, y), T;
            var j = !("async" in u) || u.async;
            if (T.open(u.type, u.url, j, u.username, u.password), u.xhrFields) for (v in u.xhrFields) T[v] = u.xhrFields[v];
            for (v in E) N.apply(T, E[v]);
            return u.timeout > 0 && (x = setTimeout(function () {
                T.onreadystatechange = l, T.abort(), c(null, "timeout", T, u, y)
            }, u.timeout)), T.send(u.data ? u.data : null), T
        }, e.get = function () {
            return e.ajax(y.apply(null, arguments))
        }, e.post = function () {
            var t = y.apply(null, arguments);
            return t.type = "POST", e.ajax(t)
        }, e.getJSON = function () {
            var t = y.apply(null, arguments);
            return t.dataType = "json", e.ajax(t)
        }, e.fn.load = function (t, n, r) {
            if (!this.length) return this;
            var o, i = this, s = t.split(/\s/), a = y(t, n, r), c = a.success;
            return s.length > 1 && (a.url = s[0], o = s[1]), a.success = function (t) {
                i.html(o ? e("<div>").html(t.replace(x, "")).find(o) : t), c && c.apply(i, arguments)
            }, e.ajax(a), this
        };
        var T = encodeURIComponent;
        e.param = function (t, n) {
            var r = [];
            return r.add = function (t, n) {
                e.isFunction(n) && (n = n()), null == n && (n = ""), this.push(T(t) + "=" + T(n))
            }, m(r, t, n), r.join("&").replace(/%20/g, "+")
        }
    }(e), function (t) {
        t.fn.serializeArray = function () {
            var e, n, r = [], o = function (t) {
                return t.forEach ? t.forEach(o) : void r.push({name: e, value: t})
            };
            return this[0] && t.each(this[0].elements, function (r, i) {
                n = i.type, e = i.name, e && "fieldset" != i.nodeName.toLowerCase() && !i.disabled && "submit" != n && "reset" != n && "button" != n && "file" != n && ("radio" != n && "checkbox" != n || i.checked) && o(t(i).val())
            }), r
        }, t.fn.serialize = function () {
            var t = [];
            return this.serializeArray().forEach(function (e) {
                t.push(encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value))
            }), t.join("&")
        }, t.fn.submit = function (e) {
            if (0 in arguments) this.bind("submit", e); else if (this.length) {
                var n = t.Event("submit");
                this.eq(0).trigger(n), n.isDefaultPrevented() || this.get(0).submit()
            }
            return this
        }
    }(e), function () {
        try {
            getComputedStyle(void 0)
        } catch (n) {
            var e = getComputedStyle;
            t.getComputedStyle = function (t, n) {
                try {
                    return e(t, n)
                } catch (t) {
                    return null
                }
            }
        }
    }(), e
});
