!function () {
    var e, n, t = {};
    e = function (i) {
        var g = [], c = Object.keys, f = {}, o = {}, n = /^(no-?highlight|plain|text)$/i,
            l = /\blang(?:uage)?-([\w-]+)\b/i, t = /((^(<[^>]+>|\t|)+|(?:\n)))/gm, v = "</span>",
            N = {classPrefix: "hljs-", tabReplace: null, useBR: !1, languages: void 0};

        function h(e) {
            return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        }

        function u(e) {
            return e.nodeName.toLowerCase()
        }

        function y(e, n) {
            var t = e && e.exec(n);
            return t && 0 === t.index
        }

        function d(e) {
            return n.test(e)
        }

        function m(e) {
            var n, t = {}, a = Array.prototype.slice.call(arguments, 1);
            for (n in e) t[n] = e[n];
            return a.forEach(function (e) {
                for (n in e) t[n] = e[n]
            }), t
        }

        function _(e) {
            var i = [];
            return function e(n, t) {
                for (var a = n.firstChild; a; a = a.nextSibling) 3 === a.nodeType ? t += a.nodeValue.length : 1 === a.nodeType && (i.push({
                    event: "start",
                    offset: t,
                    node: a
                }), t = e(a, t), u(a).match(/br|hr|img|input/) || i.push({event: "stop", offset: t, node: a}));
                return t
            }(e, 0), i
        }

        function w(r) {
            function o(e) {
                return e && e.source || e
            }

            function l(e, n) {
                return new RegExp(o(e), "m" + (r.case_insensitive ? "i" : "") + (n ? "g" : ""))
            }

            !function n(t, e) {
                if (!t.compiled) {
                    if (t.compiled = !0, t.keywords = t.keywords || t.beginKeywords, t.keywords) {
                        function a(t, e) {
                            r.case_insensitive && (e = e.toLowerCase()), e.split(" ").forEach(function (e) {
                                var n = e.split("|");
                                i[n[0]] = [t, n[1] ? Number(n[1]) : 1]
                            })
                        }

                        var i = {};
                        "string" == typeof t.keywords ? a("keyword", t.keywords) : c(t.keywords).forEach(function (e) {
                            a(e, t.keywords[e])
                        }), t.keywords = i
                    }
                    t.lexemesRe = l(t.lexemes || /\w+/, !0), e && (t.beginKeywords && (t.begin = "\\b(" + t.beginKeywords.split(" ").join("|") + ")\\b"), t.begin || (t.begin = /\B|\b/), t.beginRe = l(t.begin), t.endSameAsBegin && (t.end = t.begin), t.end || t.endsWithParent || (t.end = /\B|\b/), t.end && (t.endRe = l(t.end)), t.terminator_end = o(t.end) || "", t.endsWithParent && e.terminator_end && (t.terminator_end += (t.end ? "|" : "") + e.terminator_end)), t.illegal && (t.illegalRe = l(t.illegal)), null == t.relevance && (t.relevance = 1), t.contains || (t.contains = []), t.contains = Array.prototype.concat.apply([], t.contains.map(function (e) {
                        return function (n) {
                            return n.variants && !n.cached_variants && (n.cached_variants = n.variants.map(function (e) {
                                return m(n, {variants: null}, e)
                            })), n.cached_variants || n.endsWithParent && [m(n)] || [n]
                        }("self" === e ? t : e)
                    })), t.contains.forEach(function (e) {
                        n(e, t)
                    }), t.starts && n(t.starts, e);
                    var s = t.contains.map(function (e) {
                        return e.beginKeywords ? "\\.?(" + e.begin + ")\\.?" : e.begin
                    }).concat([t.terminator_end, t.illegal]).map(o).filter(Boolean);
                    t.terminators = s.length ? l(s.join("|"), !0) : {
                        exec: function () {
                            return null
                        }
                    }
                }
            }(r)
        }

        function S(e, n, s, t) {
            function o(e, n, t, a) {
                var i = '<span class="' + (a ? "" : N.classPrefix);
                return (i += e + '">') + n + (t ? "" : v)
            }

            function r() {
                u += null != d.subLanguage ? function () {
                    var e = "string" == typeof d.subLanguage;
                    if (e && !f[d.subLanguage]) return h(m);
                    var n = e ? S(d.subLanguage, m, !0, g[d.subLanguage]) : M(m, d.subLanguage.length ? d.subLanguage : void 0);
                    return 0 < d.relevance && (_ += n.relevance), e && (g[d.subLanguage] = n.top), o(n.language, n.value, !1, !0)
                }() : function () {
                    var e, n, t, a, i, s, r;
                    if (!d.keywords) return h(m);
                    for (a = "", n = 0, d.lexemesRe.lastIndex = 0, t = d.lexemesRe.exec(m); t;) a += h(m.substring(n, t.index)), i = d, s = t, void 0, r = c.case_insensitive ? s[0].toLowerCase() : s[0], (e = i.keywords.hasOwnProperty(r) && i.keywords[r]) ? (_ += e[1], a += o(e[0], h(t[0]))) : a += h(t[0]), n = d.lexemesRe.lastIndex, t = d.lexemesRe.exec(m);
                    return a + h(m.substr(n))
                }(), m = ""
            }

            function l(e) {
                u += e.className ? o(e.className, "", !0) : "", d = Object.create(e, {parent: {value: d}})
            }

            function a(e, n) {
                if (m += e, null == n) return r(), 0;
                var t = function (e, n) {
                    var t, a, i;
                    for (t = 0, a = n.contains.length; t < a; t++) if (y(n.contains[t].beginRe, e)) return n.contains[t].endSameAsBegin && (n.contains[t].endRe = (i = n.contains[t].beginRe.exec(e)[0], new RegExp(i.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), "m"))), n.contains[t]
                }(n, d);
                if (t) return t.skip ? m += n : (t.excludeBegin && (m += n), r(), t.returnBegin || t.excludeBegin || (m = n)), l(t), t.returnBegin ? 0 : n.length;
                var a = function e(n, t) {
                    if (y(n.endRe, t)) {
                        for (; n.endsParent && n.parent;) n = n.parent;
                        return n
                    }
                    if (n.endsWithParent) return e(n.parent, t)
                }(d, n);
                if (a) {
                    var i = d;
                    for (i.skip ? m += n : (i.returnEnd || i.excludeEnd || (m += n), r(), i.excludeEnd && (m = n)); d.className && (u += v), d.skip || d.subLanguage || (_ += d.relevance), (d = d.parent) !== a.parent;) ;
                    return a.starts && (a.endSameAsBegin && (a.starts.endRe = a.endRe), l(a.starts)), i.returnEnd ? 0 : n.length
                }
                if (function (e, n) {
                    return !s && y(n.illegalRe, e)
                }(n, d)) throw new Error('Illegal lexeme "' + n + '" for mode "' + (d.className || "<unnamed>") + '"');
                return m += n, n.length || 1
            }

            var c = C(e);
            if (!c) throw new Error('Unknown language: "' + e + '"');
            w(c);
            var i, d = t || c, g = {}, u = "";
            for (i = d; i !== c; i = i.parent) i.className && (u = o(i.className, "", !0) + u);
            var m = "", _ = 0;
            try {
                for (var b, p, E = 0; d.terminators.lastIndex = E, b = d.terminators.exec(n);) p = a(n.substring(E, b.index), b[0]), E = b.index + p;
                for (a(n.substr(E)), i = d; i.parent; i = i.parent) i.className && (u += v);
                return {relevance: _, value: u, language: e, top: d}
            } catch (e) {
                if (e.message && -1 !== e.message.indexOf("Illegal")) return {relevance: 0, value: h(n)};
                throw e
            }
        }

        function M(t, e) {
            e = e || N.languages || c(f);
            var a = {relevance: 0, value: h(t)}, i = a;
            return e.filter(C).filter(r).forEach(function (e) {
                var n = S(e, t, !1);
                n.language = e, n.relevance > i.relevance && (i = n), n.relevance > a.relevance && (i = a, a = n)
            }), i.language && (a.second_best = i), a
        }

        function b(e) {
            return N.tabReplace || N.useBR ? e.replace(t, function (e, n) {
                return N.useBR && "\n" === e ? "<br>" : N.tabReplace ? n.replace(/\t/g, N.tabReplace) : ""
            }) : e
        }

        function a(e) {
            var n, t, a, i, s, r = function (e) {
                var n, t, a, i, s = e.className + " ";
                if (s += e.parentNode ? e.parentNode.className : "", t = l.exec(s)) return C(t[1]) ? t[1] : "no-highlight";
                for (n = 0, a = (s = s.split(/\s+/)).length; n < a; n++) if (d(i = s[n]) || C(i)) return i
            }(e);
            d(r) || (N.useBR ? (n = document.createElementNS("http://www.w3.org/1999/xhtml", "div")).innerHTML = e.innerHTML.replace(/\n/g, "").replace(/<br[ \/]*>/g, "\n") : n = e, s = n.textContent, a = r ? S(r, s, !0) : M(s), (t = _(n)).length && ((i = document.createElementNS("http://www.w3.org/1999/xhtml", "div")).innerHTML = a.value, a.value = function (e, n, t) {
                var a = 0, i = "", s = [];

                function r() {
                    return e.length && n.length ? e[0].offset !== n[0].offset ? e[0].offset < n[0].offset ? e : n : "start" === n[0].event ? e : n : e.length ? e : n
                }

                function o(e) {
                    i += "<" + u(e) + g.map.call(e.attributes, function (e) {
                        return " " + e.nodeName + '="' + h(e.value).replace('"', "&quot;") + '"'
                    }).join("") + ">"
                }

                function l(e) {
                    i += "</" + u(e) + ">"
                }

                function c(e) {
                    ("start" === e.event ? o : l)(e.node)
                }

                for (; e.length || n.length;) {
                    var d = r();
                    if (i += h(t.substring(a, d[0].offset)), a = d[0].offset, d === e) {
                        for (s.reverse().forEach(l); c(d.splice(0, 1)[0]), (d = r()) === e && d.length && d[0].offset === a;) ;
                        s.reverse().forEach(o)
                    } else "start" === d[0].event ? s.push(d[0].node) : s.pop(), c(d.splice(0, 1)[0])
                }
                return i + h(t.substr(a))
            }(t, _(i), s)), a.value = b(a.value), e.innerHTML = a.value, e.className = function (e, n, t) {
                var a = n ? o[n] : t, i = [e.trim()];
                return e.match(/\bhljs\b/) || i.push("hljs"), -1 === e.indexOf(a) && i.push(a), i.join(" ").trim()
            }(e.className, r, a.language), e.result = {
                language: a.language,
                re: a.relevance
            }, a.second_best && (e.second_best = {language: a.second_best.language, re: a.second_best.relevance}))
        }

        function s() {
            if (!s.called) {
                s.called = !0;
                var e = document.querySelectorAll("pre code");
                g.forEach.call(e, a)
            }
        }

        function C(e) {
            return e = (e || "").toLowerCase(), f[e] || f[o[e]]
        }

        function r(e) {
            var n = C(e);
            return n && !n.disableAutodetect
        }

        return i.highlight = S, i.highlightAuto = M, i.fixMarkup = b, i.highlightBlock = a, i.configure = function (e) {
            N = m(N, e)
        }, i.initHighlighting = s, i.initHighlightingOnLoad = function () {
            addEventListener("DOMContentLoaded", s, !1), addEventListener("load", s, !1)
        }, i.registerLanguage = function (n, e) {
            var t = f[n] = e(i);
            t.aliases && t.aliases.forEach(function (e) {
                o[e] = n
            })
        }, i.listLanguages = function () {
            return c(f)
        }, i.getLanguage = C, i.autoDetection = r, i.inherit = m, i.IDENT_RE = "[a-zA-Z]\\w*", i.UNDERSCORE_IDENT_RE = "[a-zA-Z_]\\w*", i.NUMBER_RE = "\\b\\d+(\\.\\d+)?", i.C_NUMBER_RE = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", i.BINARY_NUMBER_RE = "\\b(0b[01]+)", i.RE_STARTERS_RE = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", i.BACKSLASH_ESCAPE = {
            begin: "\\\\[\\s\\S]",
            relevance: 0
        }, i.APOS_STRING_MODE = {
            className: "string",
            begin: "'",
            end: "'",
            illegal: "\\n",
            contains: [i.BACKSLASH_ESCAPE]
        }, i.QUOTE_STRING_MODE = {
            className: "string",
            begin: '"',
            end: '"',
            illegal: "\\n",
            contains: [i.BACKSLASH_ESCAPE]
        }, i.PHRASAL_WORDS_MODE = {begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/}, i.COMMENT = function (e, n, t) {
            var a = i.inherit({className: "comment", begin: e, end: n, contains: []}, t || {});
            return a.contains.push(i.PHRASAL_WORDS_MODE), a.contains.push({
                className: "doctag",
                begin: "(?:TODO|FIXME|NOTE|BUG|XXX):",
                relevance: 0
            }), a
        }, i.C_LINE_COMMENT_MODE = i.COMMENT("//", "$"), i.C_BLOCK_COMMENT_MODE = i.COMMENT("/\\*", "\\*/"), i.HASH_COMMENT_MODE = i.COMMENT("#", "$"), i.NUMBER_MODE = {
            className: "number",
            begin: i.NUMBER_RE,
            relevance: 0
        }, i.C_NUMBER_MODE = {
            className: "number",
            begin: i.C_NUMBER_RE,
            relevance: 0
        }, i.BINARY_NUMBER_MODE = {
            className: "number",
            begin: i.BINARY_NUMBER_RE,
            relevance: 0
        }, i.CSS_NUMBER_MODE = {
            className: "number",
            begin: i.NUMBER_RE + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
            relevance: 0
        }, i.REGEXP_MODE = {
            className: "regexp",
            begin: /\//,
            end: /\/[gimuy]*/,
            illegal: /\n/,
            contains: [i.BACKSLASH_ESCAPE, {begin: /\[/, end: /\]/, relevance: 0, contains: [i.BACKSLASH_ESCAPE]}]
        }, i.TITLE_MODE = {
            className: "title",
            begin: i.IDENT_RE,
            relevance: 0
        }, i.UNDERSCORE_TITLE_MODE = {
            className: "title",
            begin: i.UNDERSCORE_IDENT_RE,
            relevance: 0
        }, i.METHOD_GUARD = {begin: "\\.\\s*" + i.UNDERSCORE_IDENT_RE, relevance: 0}, i
    }, n = "object" == typeof window && window || "object" == typeof self && self, void 0 !== t ? e(t) : n && (n.hljs = e({}), "function" == typeof define && define.amd && define([], function () {
        return n.hljs
    }));

    function a(e) {
        return {
            aliases: ["adoc"],
            contains: [e.COMMENT("^/{4,}\\n", "\\n/{4,}$", {relevance: 10}), e.COMMENT("^//", "$", {relevance: 0}), {
                className: "title",
                begin: "^\\.\\w.*$"
            }, {begin: "^[=\\*]{4,}\\n", end: "\\n^[=\\*]{4,}$", relevance: 10}, {
                className: "section",
                relevance: 10,
                variants: [{begin: "^(={1,5}) .+?( \\1)?$"}, {begin: "^[^\\[\\]\\n]+?\\n[=\\-~\\^\\+]{2,}$"}]
            }, {className: "meta", begin: "^:.+?:", end: "\\s", excludeEnd: !0, relevance: 10}, {
                className: "meta",
                begin: "^\\[.+?\\]$",
                relevance: 0
            }, {className: "quote", begin: "^_{4,}\\n", end: "\\n_{4,}$", relevance: 10}, {
                className: "code",
                begin: "^[\\-\\.]{4,}\\n",
                end: "\\n[\\-\\.]{4,}$",
                relevance: 10
            }, {
                begin: "^\\+{4,}\\n",
                end: "\\n\\+{4,}$",
                contains: [{begin: "<", end: ">", subLanguage: "xml", relevance: 0}],
                relevance: 10
            }, {className: "bullet", begin: "^(\\*+|\\-+|\\.+|[^\\n]+?::)\\s+"}, {
                className: "symbol",
                begin: "^(NOTE|TIP|IMPORTANT|WARNING|CAUTION):\\s+",
                relevance: 10
            }, {
                className: "strong",
                begin: "\\B\\*(?![\\*\\s])",
                end: "(\\n{2}|\\*)",
                contains: [{begin: "\\\\*\\w", relevance: 0}]
            }, {
                className: "emphasis",
                begin: "\\B'(?!['\\s])",
                end: "(\\n{2}|')",
                contains: [{begin: "\\\\'\\w", relevance: 0}],
                relevance: 0
            }, {className: "emphasis", begin: "_(?![_\\s])", end: "(\\n{2}|_)", relevance: 0}, {
                className: "string",
                variants: [{begin: "``.+?''"}, {begin: "`.+?'"}]
            }, {className: "code", begin: "(`.+?`|\\+.+?\\+)", relevance: 0}, {
                className: "code",
                begin: "^[ \\t]",
                end: "$",
                relevance: 0
            }, {
                begin: "^'{3,}[ \\t]*$",
                relevance: 10
            }, {
                begin: "(link:)?(http|https|ftp|file|irc|image:?):\\S+\\[.*?\\]",
                returnBegin: !0,
                contains: [{begin: "(link|image:?):", relevance: 0}, {
                    className: "link",
                    begin: "\\w",
                    end: "[^\\[]+",
                    relevance: 0
                }, {className: "string", begin: "\\[", end: "\\]", excludeBegin: !0, excludeEnd: !0, relevance: 0}],
                relevance: 10
            }]
        }
    }

    function i(e) {
        var n = {className: "variable", variants: [{begin: /\$[\w\d#@][\w\d_]*/}, {begin: /\$\{(.*?)}/}]}, t = {
            className: "string",
            begin: /"/,
            end: /"/,
            contains: [e.BACKSLASH_ESCAPE, n, {
                className: "variable",
                begin: /\$\(/,
                end: /\)/,
                contains: [e.BACKSLASH_ESCAPE]
            }]
        };
        return {
            aliases: ["sh", "zsh"],
            lexemes: /\b-?[a-z\._]+\b/,
            keywords: {
                keyword: "if then else elif fi for while in do done case esac function",
                literal: "true false",
                built_in: "break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp",
                _: "-ne -eq -lt -gt -f -d -e -s -l -a"
            },
            contains: [{className: "meta", begin: /^#![^\n]+sh\s*$/, relevance: 10}, {
                className: "function",
                begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
                returnBegin: !0,
                contains: [e.inherit(e.TITLE_MODE, {begin: /\w[\w\d_]*/})],
                relevance: 0
            }, e.HASH_COMMENT_MODE, t, {className: "string", begin: /'/, end: /'/}, n]
        }
    }

    function s(e) {
        var n = {className: "keyword", begin: "\\b[a-z\\d_]*_t\\b"}, t = {
            className: "string",
            variants: [{
                begin: '(u8?|U|L)?"',
                end: '"',
                illegal: "\\n",
                contains: [e.BACKSLASH_ESCAPE]
            }, {begin: '(u8?|U|L)?R"\\(', end: '\\)"'}, {begin: "'\\\\?.", end: "'", illegal: "."}]
        }, a = {
            className: "number",
            variants: [{begin: "\\b(0b[01']+)"}, {begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)(u|U|l|L|ul|UL|f|F|b|B)"}, {begin: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"}],
            relevance: 0
        }, i = {
            className: "meta",
            begin: /#\s*[a-z]+\b/,
            end: /$/,
            keywords: {"meta-keyword": "if else elif endif define undef warning error line pragma ifdef ifndef include"},
            contains: [{
                begin: /\\\n/,
                relevance: 0
            }, e.inherit(t, {className: "meta-string"}), {
                className: "meta-string",
                begin: /<[^\n>]*>/,
                end: /$/,
                illegal: "\\n"
            }, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
        }, s = e.IDENT_RE + "\\s*\\(", r = {
            keyword: "int float while private char catch import module export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const for static_cast|10 union namespace unsigned long volatile static protected bool template mutable if public friend do goto auto void enum else break extern using asm case typeid short reinterpret_cast|10 default double register explicit signed typename try this switch continue inline delete alignof constexpr decltype noexcept static_assert thread_local restrict _Bool complex _Complex _Imaginary atomic_bool atomic_char atomic_schar atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong atomic_ullong new throw return and or not",
            built_in: "std string cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr abort abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf endl initializer_list unique_ptr",
            literal: "true false nullptr NULL"
        }, o = [n, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, a, t];
        return {
            aliases: ["c", "cc", "h", "c++", "h++", "hpp"],
            keywords: r,
            illegal: "</",
            contains: o.concat([i, {
                begin: "\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",
                end: ">",
                keywords: r,
                contains: ["self", n]
            }, {begin: e.IDENT_RE + "::", keywords: r}, {
                variants: [{begin: /=/, end: /;/}, {
                    begin: /\(/,
                    end: /\)/
                }, {beginKeywords: "new throw return else", end: /;/}],
                keywords: r,
                contains: o.concat([{begin: /\(/, end: /\)/, keywords: r, contains: o.concat(["self"]), relevance: 0}]),
                relevance: 0
            }, {
                className: "function",
                begin: "(" + e.IDENT_RE + "[\\*&\\s]+)+" + s,
                returnBegin: !0,
                end: /[{;=]/,
                excludeEnd: !0,
                keywords: r,
                illegal: /[^\w\s\*&]/,
                contains: [{begin: s, returnBegin: !0, contains: [e.TITLE_MODE], relevance: 0}, {
                    className: "params",
                    begin: /\(/,
                    end: /\)/,
                    keywords: r,
                    relevance: 0,
                    contains: [e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, t, a, n, {
                        begin: /\(/,
                        end: /\)/,
                        keywords: r,
                        relevance: 0,
                        contains: ["self", e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, t, a, n]
                    }]
                }, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, i]
            }, {
                className: "class",
                beginKeywords: "class struct",
                end: /[{;:]/,
                contains: [{begin: /</, end: />/, contains: ["self"]}, e.TITLE_MODE]
            }]),
            exports: {preprocessor: i, strings: t, keywords: r}
        }
    }

    function r(e) {
        var n = {
                keyword: "abstract as base bool break byte case catch char checked const continue decimal default delegate do double enum event explicit extern finally fixed float for foreach goto if implicit in int interface internal is lock long nameof object operator out override params private protected public readonly ref sbyte sealed short sizeof stackalloc static string struct switch this try typeof uint ulong unchecked unsafe ushort using virtual void volatile while add alias ascending async await by descending dynamic equals from get global group into join let on orderby partial remove select set value var where yield",
                literal: "null false true"
            }, t = {
                className: "number",
                variants: [{begin: "\\b(0b[01']+)"}, {begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)(u|U|l|L|ul|UL|f|F|b|B)"}, {begin: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"}],
                relevance: 0
            }, a = {className: "string", begin: '@"', end: '"', contains: [{begin: '""'}]},
            i = e.inherit(a, {illegal: /\n/}), s = {className: "subst", begin: "{", end: "}", keywords: n},
            r = e.inherit(s, {illegal: /\n/}), o = {
                className: "string",
                begin: /\$"/,
                end: '"',
                illegal: /\n/,
                contains: [{begin: "{{"}, {begin: "}}"}, e.BACKSLASH_ESCAPE, r]
            }, l = {
                className: "string",
                begin: /\$@"/,
                end: '"',
                contains: [{begin: "{{"}, {begin: "}}"}, {begin: '""'}, s]
            }, c = e.inherit(l, {illegal: /\n/, contains: [{begin: "{{"}, {begin: "}}"}, {begin: '""'}, r]});
        s.contains = [l, o, a, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, t, e.C_BLOCK_COMMENT_MODE], r.contains = [c, o, i, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, t, e.inherit(e.C_BLOCK_COMMENT_MODE, {illegal: /\n/})];
        var d = {variants: [l, o, a, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE]},
            g = e.IDENT_RE + "(<" + e.IDENT_RE + "(\\s*,\\s*" + e.IDENT_RE + ")*>)?(\\[\\])?";
        return {
            aliases: ["csharp", "c#"],
            keywords: n,
            illegal: /::/,
            contains: [e.COMMENT("///", "$", {
                returnBegin: !0,
                contains: [{
                    className: "doctag",
                    variants: [{begin: "///", relevance: 0}, {begin: "\x3c!--|--\x3e"}, {begin: "</?", end: ">"}]
                }]
            }), e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, {
                className: "meta",
                begin: "#",
                end: "$",
                keywords: {"meta-keyword": "if else elif endif define undef warning error line region endregion pragma checksum"}
            }, d, t, {
                beginKeywords: "class interface",
                end: /[{;=]/,
                illegal: /[^\s:,]/,
                contains: [e.TITLE_MODE, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
            }, {
                beginKeywords: "namespace",
                end: /[{;=]/,
                illegal: /[^\s:]/,
                contains: [e.inherit(e.TITLE_MODE, {begin: "[a-zA-Z](\\.?\\w)*"}), e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
            }, {
                className: "meta",
                begin: "^\\s*\\[",
                excludeBegin: !0,
                end: "\\]",
                excludeEnd: !0,
                contains: [{className: "meta-string", begin: /"/, end: /"/}]
            }, {beginKeywords: "new return throw await else", relevance: 0}, {
                className: "function",
                begin: "(" + g + "\\s+)+" + e.IDENT_RE + "\\s*\\(",
                returnBegin: !0,
                end: /\s*[{;=]/,
                excludeEnd: !0,
                keywords: n,
                contains: [{
                    begin: e.IDENT_RE + "\\s*\\(",
                    returnBegin: !0,
                    contains: [e.TITLE_MODE],
                    relevance: 0
                }, {
                    className: "params",
                    begin: /\(/,
                    end: /\)/,
                    excludeBegin: !0,
                    excludeEnd: !0,
                    keywords: n,
                    relevance: 0,
                    contains: [d, t, e.C_BLOCK_COMMENT_MODE]
                }, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
            }]
        }
    }

    function o(e) {
        return {
            aliases: ["docker"],
            case_insensitive: !0,
            keywords: "from maintainer expose env arg user onbuild stopsignal",
            contains: [e.HASH_COMMENT_MODE, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, e.NUMBER_MODE, {
                beginKeywords: "run cmd entrypoint volume add copy workdir label healthcheck shell",
                starts: {end: /[^\\]$/, subLanguage: "bash"}
            }],
            illegal: "</"
        }
    }

    function l(e) {
        var n = {
            keyword: "break default func interface select case map struct chan else goto package switch const fallthrough if range type continue for import return var go defer bool byte complex64 complex128 float32 float64 int8 int16 int32 int64 string uint8 uint16 uint32 uint64 int uint uintptr rune",
            literal: "true false iota nil",
            built_in: "append cap close complex copy imag len make new panic print println real recover delete"
        };
        return {
            aliases: ["golang"],
            keywords: n,
            illegal: "</",
            contains: [e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, {
                className: "string",
                variants: [e.QUOTE_STRING_MODE, {begin: "'", end: "[^\\\\]'"}, {begin: "`", end: "`"}]
            }, {
                className: "number",
                variants: [{begin: e.C_NUMBER_RE + "[dflsi]", relevance: 1}, e.C_NUMBER_MODE]
            }, {begin: /:=/}, {
                className: "function",
                beginKeywords: "func",
                end: /\s*\{/,
                excludeEnd: !0,
                contains: [e.TITLE_MODE, {className: "params", begin: /\(/, end: /\)/, keywords: n, illegal: /["']/}]
            }]
        }
    }

    function c(e) {
        return {
            keywords: {
                literal: "true false null",
                keyword: "byte short char int long boolean float double void def as in assert trait super this abstract static volatile transient public private protected synchronized final class interface enum if else for while switch case break default continue throw throws try catch finally implements extends new import package return instanceof"
            },
            contains: [e.COMMENT("/\\*\\*", "\\*/", {
                relevance: 0,
                contains: [{begin: /\w+@/, relevance: 0}, {className: "doctag", begin: "@[A-Za-z]+"}]
            }), e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, {
                className: "string",
                begin: '"""',
                end: '"""'
            }, {className: "string", begin: "'''", end: "'''"}, {
                className: "string",
                begin: "\\$/",
                end: "/\\$",
                relevance: 10
            }, e.APOS_STRING_MODE, {
                className: "regexp",
                begin: /~?\/[^\/\n]+\//,
                contains: [e.BACKSLASH_ESCAPE]
            }, e.QUOTE_STRING_MODE, {
                className: "meta",
                begin: "^#!/usr/bin/env",
                end: "$",
                illegal: "\n"
            }, e.BINARY_NUMBER_MODE, {
                className: "class",
                beginKeywords: "class interface trait enum",
                end: "{",
                illegal: ":",
                contains: [{beginKeywords: "extends implements"}, e.UNDERSCORE_TITLE_MODE]
            }, e.C_NUMBER_MODE, {className: "meta", begin: "@[A-Za-z]+"}, {
                className: "string",
                begin: /[^\?]{0}[A-Za-z0-9_$]+ *:/
            }, {begin: /\?/, end: /\:/}, {className: "symbol", begin: "^\\s*[A-Za-z0-9_$]+:", relevance: 0}],
            illegal: /#|<\//
        }
    }

    function d(e) {
        var n = "false synchronized int abstract float private char boolean var static null if const for true while long strictfp finally protected import native final void enum else break transient catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private module requires exports do",
            t = {
                className: "number",
                begin: "\\b(0[bB]([01]+[01_]+[01]+|[01]+)|0[xX]([a-fA-F0-9]+[a-fA-F0-9_]+[a-fA-F0-9]+|[a-fA-F0-9]+)|(([\\d]+[\\d_]+[\\d]+|[\\d]+)(\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))?|\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))([eE][-+]?\\d+)?)[lLfF]?",
                relevance: 0
            };
        return {
            aliases: ["jsp"],
            keywords: n,
            illegal: /<\/|#/,
            contains: [e.COMMENT("/\\*\\*", "\\*/", {
                relevance: 0,
                contains: [{begin: /\w+@/, relevance: 0}, {className: "doctag", begin: "@[A-Za-z]+"}]
            }), e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, {
                className: "class",
                beginKeywords: "class interface",
                end: /[{;=]/,
                excludeEnd: !0,
                keywords: "class interface",
                illegal: /[:"\[\]]/,
                contains: [{beginKeywords: "extends implements"}, e.UNDERSCORE_TITLE_MODE]
            }, {beginKeywords: "new throw return else", relevance: 0}, {
                className: "function",
                begin: "([À-ʸa-zA-Z_$][À-ʸa-zA-Z_$0-9]*(<[À-ʸa-zA-Z_$][À-ʸa-zA-Z_$0-9]*(\\s*,\\s*[À-ʸa-zA-Z_$][À-ʸa-zA-Z_$0-9]*)*>)?\\s+)+" + e.UNDERSCORE_IDENT_RE + "\\s*\\(",
                returnBegin: !0,
                end: /[{;=]/,
                excludeEnd: !0,
                keywords: n,
                contains: [{
                    begin: e.UNDERSCORE_IDENT_RE + "\\s*\\(",
                    returnBegin: !0,
                    relevance: 0,
                    contains: [e.UNDERSCORE_TITLE_MODE]
                }, {
                    className: "params",
                    begin: /\(/,
                    end: /\)/,
                    keywords: n,
                    relevance: 0,
                    contains: [e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, e.C_NUMBER_MODE, e.C_BLOCK_COMMENT_MODE]
                }, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
            }, t, {className: "meta", begin: "@[A-Za-z]+"}]
        }
    }

    function g(e) {
        var n = "[A-Za-z$_][0-9A-Za-z$_]*", t = {
                keyword: "in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await static import from as",
                literal: "true false null undefined NaN Infinity",
                built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise"
            }, a = {
                className: "number",
                variants: [{begin: "\\b(0[bB][01]+)"}, {begin: "\\b(0[oO][0-7]+)"}, {begin: e.C_NUMBER_RE}],
                relevance: 0
            }, i = {className: "subst", begin: "\\$\\{", end: "\\}", keywords: t, contains: []},
            s = {className: "string", begin: "`", end: "`", contains: [e.BACKSLASH_ESCAPE, i]};
        i.contains = [e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, s, a, e.REGEXP_MODE];
        var r = i.contains.concat([e.C_BLOCK_COMMENT_MODE, e.C_LINE_COMMENT_MODE]);
        return {
            aliases: ["js", "jsx"],
            keywords: t,
            contains: [{className: "meta", relevance: 10, begin: /^\s*['"]use (strict|asm)['"]/}, {
                className: "meta",
                begin: /^#!/,
                end: /$/
            }, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, s, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, a, {
                begin: /[{,]\s*/,
                relevance: 0,
                contains: [{
                    begin: n + "\\s*:",
                    returnBegin: !0,
                    relevance: 0,
                    contains: [{className: "attr", begin: n, relevance: 0}]
                }]
            }, {
                begin: "(" + e.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
                keywords: "return throw case",
                contains: [e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, e.REGEXP_MODE, {
                    className: "function",
                    begin: "(\\(.*?\\)|" + n + ")\\s*=>",
                    returnBegin: !0,
                    end: "\\s*=>",
                    contains: [{
                        className: "params",
                        variants: [{begin: n}, {begin: /\(\s*\)/}, {
                            begin: /\(/,
                            end: /\)/,
                            excludeBegin: !0,
                            excludeEnd: !0,
                            keywords: t,
                            contains: r
                        }]
                    }]
                }, {
                    begin: /</,
                    end: /(\/\w+|\w+\/)>/,
                    subLanguage: "xml",
                    contains: [{begin: /<\w+\s*\/>/, skip: !0}, {
                        begin: /<\w+/,
                        end: /(\/\w+|\w+\/)>/,
                        skip: !0,
                        contains: [{begin: /<\w+\s*\/>/, skip: !0}, "self"]
                    }]
                }],
                relevance: 0
            }, {
                className: "function",
                beginKeywords: "function",
                end: /\{/,
                excludeEnd: !0,
                contains: [e.inherit(e.TITLE_MODE, {begin: n}), {
                    className: "params",
                    begin: /\(/,
                    end: /\)/,
                    excludeBegin: !0,
                    excludeEnd: !0,
                    contains: r
                }],
                illegal: /\[|%/
            }, {begin: /\$[(.]/}, e.METHOD_GUARD, {
                className: "class",
                beginKeywords: "class",
                end: /[{;=]/,
                excludeEnd: !0,
                illegal: /[:"\[\]]/,
                contains: [{beginKeywords: "extends"}, e.UNDERSCORE_TITLE_MODE]
            }, {beginKeywords: "constructor get set", end: /\{/, excludeEnd: !0}],
            illegal: /#(?!!)/
        }
    }

    function u(e) {
        var n = {literal: "true false null"}, t = [e.QUOTE_STRING_MODE, e.C_NUMBER_MODE],
            a = {end: ",", endsWithParent: !0, excludeEnd: !0, contains: t, keywords: n}, i = {
                begin: "{",
                end: "}",
                contains: [{
                    className: "attr",
                    begin: /"/,
                    end: /"/,
                    contains: [e.BACKSLASH_ESCAPE],
                    illegal: "\\n"
                }, e.inherit(a, {begin: /:/})],
                illegal: "\\S"
            }, s = {begin: "\\[", end: "\\]", contains: [e.inherit(a)], illegal: "\\S"};
        return t.splice(t.length, 0, i, s), {contains: t, keywords: n, illegal: "\\S"}
    }

    function m(e) {
        var n = {
                keyword: "abstract as val var vararg get set class object open private protected public noinline crossinline dynamic final enum if else do while for when throw try catch finally import package is in fun override companion reified inline lateinit init interface annotation data sealed internal infix operator out by constructor super tailrec where const inner suspend typealias external expect actual trait volatile transient native default",
                built_in: "Byte Short Char Int Long Boolean Float Double Void Unit Nothing",
                literal: "true false null"
            }, t = {className: "symbol", begin: e.UNDERSCORE_IDENT_RE + "@"},
            a = {className: "subst", begin: "\\${", end: "}", contains: [e.APOS_STRING_MODE, e.C_NUMBER_MODE]},
            i = {className: "variable", begin: "\\$" + e.UNDERSCORE_IDENT_RE}, s = {
                className: "string",
                variants: [{begin: '"""', end: '"""', contains: [i, a]}, {
                    begin: "'",
                    end: "'",
                    illegal: /\n/,
                    contains: [e.BACKSLASH_ESCAPE]
                }, {begin: '"', end: '"', illegal: /\n/, contains: [e.BACKSLASH_ESCAPE, i, a]}]
            }, r = {
                className: "meta",
                begin: "@(?:file|property|field|get|set|receiver|param|setparam|delegate)\\s*:(?:\\s*" + e.UNDERSCORE_IDENT_RE + ")?"
            }, o = {
                className: "meta",
                begin: "@" + e.UNDERSCORE_IDENT_RE,
                contains: [{begin: /\(/, end: /\)/, contains: [e.inherit(s, {className: "meta-string"})]}]
            }, l = {
                className: "number",
                begin: "\\b(0[bB]([01]+[01_]+[01]+|[01]+)|0[xX]([a-fA-F0-9]+[a-fA-F0-9_]+[a-fA-F0-9]+|[a-fA-F0-9]+)|(([\\d]+[\\d_]+[\\d]+|[\\d]+)(\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))?|\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))([eE][-+]?\\d+)?)[lLfF]?",
                relevance: 0
            };
        return {
            aliases: ["kt"],
            keywords: n,
            contains: [e.COMMENT("/\\*\\*", "\\*/", {
                relevance: 0,
                contains: [{className: "doctag", begin: "@[A-Za-z]+"}]
            }), e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, {
                className: "keyword",
                begin: /\b(break|continue|return|this)\b/,
                starts: {contains: [{className: "symbol", begin: /@\w+/}]}
            }, t, r, o, {
                className: "function",
                beginKeywords: "fun",
                end: "[(]|$",
                returnBegin: !0,
                excludeEnd: !0,
                keywords: n,
                illegal: /fun\s+(<.*>)?[^\s\(]+(\s+[^\s\(]+)\s*=/,
                relevance: 5,
                contains: [{
                    begin: e.UNDERSCORE_IDENT_RE + "\\s*\\(",
                    returnBegin: !0,
                    relevance: 0,
                    contains: [e.UNDERSCORE_TITLE_MODE]
                }, {className: "type", begin: /</, end: />/, keywords: "reified", relevance: 0}, {
                    className: "params",
                    begin: /\(/,
                    end: /\)/,
                    endsParent: !0,
                    keywords: n,
                    relevance: 0,
                    contains: [{
                        begin: /:/,
                        end: /[=,\/]/,
                        endsWithParent: !0,
                        contains: [{
                            className: "type",
                            begin: e.UNDERSCORE_IDENT_RE
                        }, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE],
                        relevance: 0
                    }, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, r, o, s, e.C_NUMBER_MODE]
                }, e.C_BLOCK_COMMENT_MODE]
            }, {
                className: "class",
                beginKeywords: "class interface trait",
                end: /[:\{(]|$/,
                excludeEnd: !0,
                illegal: "extends implements",
                contains: [{beginKeywords: "public protected internal private constructor"}, e.UNDERSCORE_TITLE_MODE, {
                    className: "type",
                    begin: /</,
                    end: />/,
                    excludeBegin: !0,
                    excludeEnd: !0,
                    relevance: 0
                }, {className: "type", begin: /[,:]\s*/, end: /[<\(,]|$/, excludeBegin: !0, returnEnd: !0}, r, o]
            }, s, {className: "meta", begin: "^#!/usr/bin/env", end: "$", illegal: "\n"}, l]
        }
    }

    function _(e) {
        var n = /[a-zA-Z@][a-zA-Z0-9_]*/, t = "@interface @class @protocol @implementation";
        return {
            aliases: ["mm", "objc", "obj-c"],
            keywords: {
                keyword: "int float while char export sizeof typedef const struct for union unsigned long volatile static bool mutable if do return goto void enum else break extern asm case short default double register explicit signed typename this switch continue wchar_t inline readonly assign readwrite self @synchronized id typeof nonatomic super unichar IBOutlet IBAction strong weak copy in out inout bycopy byref oneway __strong __weak __block __autoreleasing @private @protected @public @try @property @end @throw @catch @finally @autoreleasepool @synthesize @dynamic @selector @optional @required @encode @package @import @defs @compatibility_alias __bridge __bridge_transfer __bridge_retained __bridge_retain __covariant __contravariant __kindof _Nonnull _Nullable _Null_unspecified __FUNCTION__ __PRETTY_FUNCTION__ __attribute__ getter setter retain unsafe_unretained nonnull nullable null_unspecified null_resettable class instancetype NS_DESIGNATED_INITIALIZER NS_UNAVAILABLE NS_REQUIRES_SUPER NS_RETURNS_INNER_POINTER NS_INLINE NS_AVAILABLE NS_DEPRECATED NS_ENUM NS_OPTIONS NS_SWIFT_UNAVAILABLE NS_ASSUME_NONNULL_BEGIN NS_ASSUME_NONNULL_END NS_REFINED_FOR_SWIFT NS_SWIFT_NAME NS_SWIFT_NOTHROW NS_DURING NS_HANDLER NS_ENDHANDLER NS_VALUERETURN NS_VOIDRETURN",
                literal: "false true FALSE TRUE nil YES NO NULL",
                built_in: "BOOL dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once"
            },
            lexemes: n,
            illegal: "</",
            contains: [{
                className: "built_in",
                begin: "\\b(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)\\w+"
            }, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, e.C_NUMBER_MODE, e.QUOTE_STRING_MODE, {
                className: "string",
                variants: [{begin: '@"', end: '"', illegal: "\\n", contains: [e.BACKSLASH_ESCAPE]}, {
                    begin: "'",
                    end: "[^\\\\]'",
                    illegal: "[^\\\\][^']"
                }]
            }, {
                className: "meta",
                begin: "#",
                end: "$",
                contains: [{className: "meta-string", variants: [{begin: '"', end: '"'}, {begin: "<", end: ">"}]}]
            }, {
                className: "class",
                begin: "(" + t.split(" ").join("|") + ")\\b",
                end: "({|$)",
                excludeEnd: !0,
                keywords: t,
                lexemes: n,
                contains: [e.UNDERSCORE_TITLE_MODE]
            }, {begin: "\\." + e.UNDERSCORE_IDENT_RE, relevance: 0}]
        }
    }

    function b(e) {
        var n = "getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when",
            t = {className: "subst", begin: "[$@]\\{", end: "\\}", keywords: n}, a = {begin: "->{", end: "}"}, i = {
                variants: [{begin: /\$\d/}, {begin: /[\$%@](\^\w\b|#\w+(::\w+)*|{\w+}|\w+(::\w*)*)/}, {
                    begin: /[\$%@][^\s\w{]/,
                    relevance: 0
                }]
            }, s = [e.BACKSLASH_ESCAPE, t, i],
            r = [i, e.HASH_COMMENT_MODE, e.COMMENT("^\\=\\w", "\\=cut", {endsWithParent: !0}), a, {
                className: "string",
                contains: s,
                variants: [{begin: "q[qwxr]?\\s*\\(", end: "\\)", relevance: 5}, {
                    begin: "q[qwxr]?\\s*\\[",
                    end: "\\]",
                    relevance: 5
                }, {begin: "q[qwxr]?\\s*\\{", end: "\\}", relevance: 5}, {
                    begin: "q[qwxr]?\\s*\\|",
                    end: "\\|",
                    relevance: 5
                }, {begin: "q[qwxr]?\\s*\\<", end: "\\>", relevance: 5}, {
                    begin: "qw\\s+q",
                    end: "q",
                    relevance: 5
                }, {begin: "'", end: "'", contains: [e.BACKSLASH_ESCAPE]}, {begin: '"', end: '"'}, {
                    begin: "`",
                    end: "`",
                    contains: [e.BACKSLASH_ESCAPE]
                }, {begin: "{\\w+}", contains: [], relevance: 0}, {
                    begin: "-?\\w+\\s*\\=\\>",
                    contains: [],
                    relevance: 0
                }]
            }, {
                className: "number",
                begin: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
                relevance: 0
            }, {
                begin: "(\\/\\/|" + e.RE_STARTERS_RE + "|\\b(split|return|print|reverse|grep)\\b)\\s*",
                keywords: "split return print reverse grep",
                relevance: 0,
                contains: [e.HASH_COMMENT_MODE, {
                    className: "regexp",
                    begin: "(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*",
                    relevance: 10
                }, {
                    className: "regexp",
                    begin: "(m|qr)?/",
                    end: "/[a-z]*",
                    contains: [e.BACKSLASH_ESCAPE],
                    relevance: 0
                }]
            }, {
                className: "function",
                beginKeywords: "sub",
                end: "(\\s*\\(.*?\\))?[;{]",
                excludeEnd: !0,
                relevance: 5,
                contains: [e.TITLE_MODE]
            }, {begin: "-\\w\\b", relevance: 0}, {
                begin: "^__DATA__$",
                end: "^__END__$",
                subLanguage: "mojolicious",
                contains: [{begin: "^@@.*", end: "$", className: "comment"}]
            }];
        return t.contains = r, {aliases: ["pl", "pm"], lexemes: /[\w\.]+/, keywords: n, contains: a.contains = r}
    }

    function p(e) {
        var n = {begin: "\\$+[a-zA-Z_-ÿ][a-zA-Z0-9_-ÿ]*"}, t = {className: "meta", begin: /<\?(php)?|\?>/}, a = {
            className: "string",
            contains: [e.BACKSLASH_ESCAPE, t],
            variants: [{begin: 'b"', end: '"'}, {
                begin: "b'",
                end: "'"
            }, e.inherit(e.APOS_STRING_MODE, {illegal: null}), e.inherit(e.QUOTE_STRING_MODE, {illegal: null})]
        }, i = {variants: [e.BINARY_NUMBER_MODE, e.C_NUMBER_MODE]};
        return {
            aliases: ["php", "php3", "php4", "php5", "php6", "php7"],
            case_insensitive: !0,
            keywords: "and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally",
            contains: [e.HASH_COMMENT_MODE, e.COMMENT("//", "$", {contains: [t]}), e.COMMENT("/\\*", "\\*/", {
                contains: [{
                    className: "doctag",
                    begin: "@[A-Za-z]+"
                }]
            }), e.COMMENT("__halt_compiler.+?;", !1, {
                endsWithParent: !0,
                keywords: "__halt_compiler",
                lexemes: e.UNDERSCORE_IDENT_RE
            }), {
                className: "string",
                begin: /<<<['"]?\w+['"]?$/,
                end: /^\w+;?$/,
                contains: [e.BACKSLASH_ESCAPE, {
                    className: "subst",
                    variants: [{begin: /\$\w+/}, {begin: /\{\$/, end: /\}/}]
                }]
            }, t, {
                className: "keyword",
                begin: /\$this\b/
            }, n, {begin: /(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/}, {
                className: "function",
                beginKeywords: "function",
                end: /[;{]/,
                excludeEnd: !0,
                illegal: "\\$|\\[|%",
                contains: [e.UNDERSCORE_TITLE_MODE, {
                    className: "params",
                    begin: "\\(",
                    end: "\\)",
                    contains: ["self", n, e.C_BLOCK_COMMENT_MODE, a, i]
                }]
            }, {
                className: "class",
                beginKeywords: "class interface",
                end: "{",
                excludeEnd: !0,
                illegal: /[:\(\$"]/,
                contains: [{beginKeywords: "extends implements"}, e.UNDERSCORE_TITLE_MODE]
            }, {
                beginKeywords: "namespace",
                end: ";",
                illegal: /[\.']/,
                contains: [e.UNDERSCORE_TITLE_MODE]
            }, {beginKeywords: "use", end: ";", contains: [e.UNDERSCORE_TITLE_MODE]}, {begin: "=>"}, a, i]
        }
    }

    function E(e) {
        var n = {begin: "`[\\s\\S]", relevance: 0},
            t = {className: "variable", variants: [{begin: /\$[\w\d][\w\d_:]*/}]}, a = {
                className: "string",
                variants: [{begin: /"/, end: /"/}, {begin: /@"/, end: /^"@/}],
                contains: [n, t, {className: "variable", begin: /\$[A-z]/, end: /[^A-z]/}]
            }, i = e.inherit(e.COMMENT(null, null), {
                variants: [{begin: /#/, end: /$/}, {begin: /<#/, end: /#>/}],
                contains: [{
                    className: "doctag",
                    variants: [{begin: /\.(synopsis|description|example|inputs|outputs|notes|link|component|role|functionality)/}, {begin: /\.(parameter|forwardhelptargetname|forwardhelpcategory|remotehelprunspace|externalhelp)\s+\S+/}]
                }]
            });
        return {
            aliases: ["ps"],
            lexemes: /-?[A-z\.\-]+/,
            case_insensitive: !0,
            keywords: {
                keyword: "if else foreach return function do while until elseif begin for trap data dynamicparam end break throw param continue finally in switch exit filter try process catch",
                built_in: "Add-Computer Add-Content Add-History Add-JobTrigger Add-Member Add-PSSnapin Add-Type Checkpoint-Computer Clear-Content Clear-EventLog Clear-History Clear-Host Clear-Item Clear-ItemProperty Clear-Variable Compare-Object Complete-Transaction Connect-PSSession Connect-WSMan Convert-Path ConvertFrom-Csv ConvertFrom-Json ConvertFrom-SecureString ConvertFrom-StringData ConvertTo-Csv ConvertTo-Html ConvertTo-Json ConvertTo-SecureString ConvertTo-Xml Copy-Item Copy-ItemProperty Debug-Process Disable-ComputerRestore Disable-JobTrigger Disable-PSBreakpoint Disable-PSRemoting Disable-PSSessionConfiguration Disable-WSManCredSSP Disconnect-PSSession Disconnect-WSMan Disable-ScheduledJob Enable-ComputerRestore Enable-JobTrigger Enable-PSBreakpoint Enable-PSRemoting Enable-PSSessionConfiguration Enable-ScheduledJob Enable-WSManCredSSP Enter-PSSession Exit-PSSession Export-Alias Export-Clixml Export-Console Export-Counter Export-Csv Export-FormatData Export-ModuleMember Export-PSSession ForEach-Object Format-Custom Format-List Format-Table Format-Wide Get-Acl Get-Alias Get-AuthenticodeSignature Get-ChildItem Get-Command Get-ComputerRestorePoint Get-Content Get-ControlPanelItem Get-Counter Get-Credential Get-Culture Get-Date Get-Event Get-EventLog Get-EventSubscriber Get-ExecutionPolicy Get-FormatData Get-Host Get-HotFix Get-Help Get-History Get-IseSnippet Get-Item Get-ItemProperty Get-Job Get-JobTrigger Get-Location Get-Member Get-Module Get-PfxCertificate Get-Process Get-PSBreakpoint Get-PSCallStack Get-PSDrive Get-PSProvider Get-PSSession Get-PSSessionConfiguration Get-PSSnapin Get-Random Get-ScheduledJob Get-ScheduledJobOption Get-Service Get-TraceSource Get-Transaction Get-TypeData Get-UICulture Get-Unique Get-Variable Get-Verb Get-WinEvent Get-WmiObject Get-WSManCredSSP Get-WSManInstance Group-Object Import-Alias Import-Clixml Import-Counter Import-Csv Import-IseSnippet Import-LocalizedData Import-PSSession Import-Module Invoke-AsWorkflow Invoke-Command Invoke-Expression Invoke-History Invoke-Item Invoke-RestMethod Invoke-WebRequest Invoke-WmiMethod Invoke-WSManAction Join-Path Limit-EventLog Measure-Command Measure-Object Move-Item Move-ItemProperty New-Alias New-Event New-EventLog New-IseSnippet New-Item New-ItemProperty New-JobTrigger New-Object New-Module New-ModuleManifest New-PSDrive New-PSSession New-PSSessionConfigurationFile New-PSSessionOption New-PSTransportOption New-PSWorkflowExecutionOption New-PSWorkflowSession New-ScheduledJobOption New-Service New-TimeSpan New-Variable New-WebServiceProxy New-WinEvent New-WSManInstance New-WSManSessionOption Out-Default Out-File Out-GridView Out-Host Out-Null Out-Printer Out-String Pop-Location Push-Location Read-Host Receive-Job Register-EngineEvent Register-ObjectEvent Register-PSSessionConfiguration Register-ScheduledJob Register-WmiEvent Remove-Computer Remove-Event Remove-EventLog Remove-Item Remove-ItemProperty Remove-Job Remove-JobTrigger Remove-Module Remove-PSBreakpoint Remove-PSDrive Remove-PSSession Remove-PSSnapin Remove-TypeData Remove-Variable Remove-WmiObject Remove-WSManInstance Rename-Computer Rename-Item Rename-ItemProperty Reset-ComputerMachinePassword Resolve-Path Restart-Computer Restart-Service Restore-Computer Resume-Job Resume-Service Save-Help Select-Object Select-String Select-Xml Send-MailMessage Set-Acl Set-Alias Set-AuthenticodeSignature Set-Content Set-Date Set-ExecutionPolicy Set-Item Set-ItemProperty Set-JobTrigger Set-Location Set-PSBreakpoint Set-PSDebug Set-PSSessionConfiguration Set-ScheduledJob Set-ScheduledJobOption Set-Service Set-StrictMode Set-TraceSource Set-Variable Set-WmiInstance Set-WSManInstance Set-WSManQuickConfig Show-Command Show-ControlPanelItem Show-EventLog Sort-Object Split-Path Start-Job Start-Process Start-Service Start-Sleep Start-Transaction Start-Transcript Stop-Computer Stop-Job Stop-Process Stop-Service Stop-Transcript Suspend-Job Suspend-Service Tee-Object Test-ComputerSecureChannel Test-Connection Test-ModuleManifest Test-Path Test-PSSessionConfigurationFile Trace-Command Unblock-File Undo-Transaction Unregister-Event Unregister-PSSessionConfiguration Unregister-ScheduledJob Update-FormatData Update-Help Update-List Update-TypeData Use-Transaction Wait-Event Wait-Job Wait-Process Where-Object Write-Debug Write-Error Write-EventLog Write-Host Write-Output Write-Progress Write-Verbose Write-Warning Add-MDTPersistentDrive Disable-MDTMonitorService Enable-MDTMonitorService Get-MDTDeploymentShareStatistics Get-MDTMonitorData Get-MDTOperatingSystemCatalog Get-MDTPersistentDrive Import-MDTApplication Import-MDTDriver Import-MDTOperatingSystem Import-MDTPackage Import-MDTTaskSequence New-MDTDatabase Remove-MDTMonitorData Remove-MDTPersistentDrive Restore-MDTPersistentDrive Set-MDTMonitorData Test-MDTDeploymentShare Test-MDTMonitorData Update-MDTDatabaseSchema Update-MDTDeploymentShare Update-MDTLinkedDS Update-MDTMedia Update-MDTMedia Add-VamtProductKey Export-VamtData Find-VamtManagedMachine Get-VamtConfirmationId Get-VamtProduct Get-VamtProductKey Import-VamtData Initialize-VamtData Install-VamtConfirmationId Install-VamtProductActivation Install-VamtProductKey Update-VamtProduct",
                nomarkup: "-ne -eq -lt -gt -ge -le -not -like -notlike -match -notmatch -contains -notcontains -in -notin -replace"
            },
            contains: [n, e.NUMBER_MODE, a, {
                className: "string",
                variants: [{begin: /'/, end: /'/}, {begin: /@'/, end: /^'@/}]
            }, {className: "literal", begin: /\$(null|true|false)\b/}, t, i]
        }
    }

    function f(e) {
        var n = {
                keyword: "and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda async await nonlocal|10 None True False",
                built_in: "Ellipsis NotImplemented"
            }, t = {className: "meta", begin: /^(>>>|\.\.\.) /},
            a = {className: "subst", begin: /\{/, end: /\}/, keywords: n, illegal: /#/}, i = {
                className: "string",
                contains: [e.BACKSLASH_ESCAPE],
                variants: [{
                    begin: /(u|b)?r?'''/,
                    end: /'''/,
                    contains: [e.BACKSLASH_ESCAPE, t],
                    relevance: 10
                }, {
                    begin: /(u|b)?r?"""/,
                    end: /"""/,
                    contains: [e.BACKSLASH_ESCAPE, t],
                    relevance: 10
                }, {begin: /(fr|rf|f)'''/, end: /'''/, contains: [e.BACKSLASH_ESCAPE, t, a]}, {
                    begin: /(fr|rf|f)"""/,
                    end: /"""/,
                    contains: [e.BACKSLASH_ESCAPE, t, a]
                }, {begin: /(u|r|ur)'/, end: /'/, relevance: 10}, {
                    begin: /(u|r|ur)"/,
                    end: /"/,
                    relevance: 10
                }, {begin: /(b|br)'/, end: /'/}, {begin: /(b|br)"/, end: /"/}, {
                    begin: /(fr|rf|f)'/,
                    end: /'/,
                    contains: [e.BACKSLASH_ESCAPE, a]
                }, {
                    begin: /(fr|rf|f)"/,
                    end: /"/,
                    contains: [e.BACKSLASH_ESCAPE, a]
                }, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE]
            }, s = {
                className: "number",
                relevance: 0,
                variants: [{begin: e.BINARY_NUMBER_RE + "[lLjJ]?"}, {begin: "\\b(0o[0-7]+)[lLjJ]?"}, {begin: e.C_NUMBER_RE + "[lLjJ]?"}]
            }, r = {className: "params", begin: /\(/, end: /\)/, contains: ["self", t, s, i]};
        return a.contains = [i, s, t], {
            aliases: ["py", "gyp", "ipython"],
            keywords: n,
            illegal: /(<\/|->|\?)|=>/,
            contains: [t, s, i, e.HASH_COMMENT_MODE, {
                variants: [{
                    className: "function",
                    beginKeywords: "def"
                }, {className: "class", beginKeywords: "class"}],
                end: /:/,
                illegal: /[${=;\n,]/,
                contains: [e.UNDERSCORE_TITLE_MODE, r, {begin: /->/, endsWithParent: !0, keywords: "None"}]
            }, {className: "meta", begin: /^[\t ]*@/, end: /$/}, {begin: /\b(print|exec)\(/}]
        }
    }

    function v(e) {
        var n = "[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?", t = {
                keyword: "and then defined module in return redo if BEGIN retry end for self when next until do begin unless END rescue else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor",
                literal: "true false nil"
            }, a = {className: "doctag", begin: "@[A-Za-z]+"}, i = {begin: "#<", end: ">"},
            s = [e.COMMENT("#", "$", {contains: [a]}), e.COMMENT("^\\=begin", "^\\=end", {
                contains: [a],
                relevance: 10
            }), e.COMMENT("^__END__", "\\n$")], r = {className: "subst", begin: "#\\{", end: "}", keywords: t}, o = {
                className: "string",
                contains: [e.BACKSLASH_ESCAPE, r],
                variants: [{begin: /'/, end: /'/}, {begin: /"/, end: /"/}, {begin: /`/, end: /`/}, {
                    begin: "%[qQwWx]?\\(",
                    end: "\\)"
                }, {begin: "%[qQwWx]?\\[", end: "\\]"}, {begin: "%[qQwWx]?{", end: "}"}, {
                    begin: "%[qQwWx]?<",
                    end: ">"
                }, {begin: "%[qQwWx]?/", end: "/"}, {begin: "%[qQwWx]?%", end: "%"}, {
                    begin: "%[qQwWx]?-",
                    end: "-"
                }, {
                    begin: "%[qQwWx]?\\|",
                    end: "\\|"
                }, {begin: /\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/}, {
                    begin: /<<(-?)\w+$/,
                    end: /^\s*\w+$/
                }]
            }, l = {className: "params", begin: "\\(", end: "\\)", endsParent: !0, keywords: t}, c = [o, i, {
                className: "class",
                beginKeywords: "class module",
                end: "$|;",
                illegal: /=/,
                contains: [e.inherit(e.TITLE_MODE, {begin: "[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"}), {
                    begin: "<\\s*",
                    contains: [{begin: "(" + e.IDENT_RE + "::)?" + e.IDENT_RE}]
                }].concat(s)
            }, {
                className: "function",
                beginKeywords: "def",
                end: "$|;",
                contains: [e.inherit(e.TITLE_MODE, {begin: n}), l].concat(s)
            }, {begin: e.IDENT_RE + "::"}, {
                className: "symbol",
                begin: e.UNDERSCORE_IDENT_RE + "(\\!|\\?)?:",
                relevance: 0
            }, {className: "symbol", begin: ":(?!\\s)", contains: [o, {begin: n}], relevance: 0}, {
                className: "number",
                begin: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
                relevance: 0
            }, {begin: "(\\$\\W)|((\\$|\\@\\@?)(\\w+))"}, {
                className: "params",
                begin: /\|/,
                end: /\|/,
                keywords: t
            }, {
                begin: "(" + e.RE_STARTERS_RE + "|unless)\\s*",
                keywords: "unless",
                contains: [i, {
                    className: "regexp",
                    contains: [e.BACKSLASH_ESCAPE, r],
                    illegal: /\n/,
                    variants: [{begin: "/", end: "/[a-z]*"}, {begin: "%r{", end: "}[a-z]*"}, {
                        begin: "%r\\(",
                        end: "\\)[a-z]*"
                    }, {begin: "%r!", end: "![a-z]*"}, {begin: "%r\\[", end: "\\][a-z]*"}]
                }].concat(s),
                relevance: 0
            }].concat(s);
        r.contains = c;
        var d = [{begin: /^\s*=>/, starts: {end: "$", contains: l.contains = c}}, {
            className: "meta",
            begin: "^([>?]>|[\\w#]+\\(\\w+\\):\\d+:\\d+>|(\\w+-)?\\d+\\.\\d+\\.\\d(p\\d+)?[^>]+>)",
            starts: {end: "$", contains: c}
        }];
        return {
            aliases: ["rb", "gemspec", "podspec", "thor", "irb"],
            keywords: t,
            illegal: /\/\*/,
            contains: s.concat(d).concat(c)
        }
    }

    function N(e) {
        var n = {className: "subst", variants: [{begin: "\\$[A-Za-z0-9_]+"}, {begin: "\\${", end: "}"}]}, t = {
            className: "string",
            variants: [{begin: '"', end: '"', illegal: "\\n", contains: [e.BACKSLASH_ESCAPE]}, {
                begin: '"""',
                end: '"""',
                relevance: 10
            }, {begin: '[a-z]+"', end: '"', illegal: "\\n", contains: [e.BACKSLASH_ESCAPE, n]}, {
                className: "string",
                begin: '[a-z]+"""',
                end: '"""',
                contains: [n],
                relevance: 10
            }]
        }, a = {className: "type", begin: "\\b[A-Z][A-Za-z0-9_]*", relevance: 0}, i = {
            className: "title",
            begin: /[^0-9\n\t "'(),.`{}\[\]:;][^\n\t "'(),.`{}\[\]:;]+|[^0-9\n\t "'(),.`{}\[\]:;=]/,
            relevance: 0
        }, s = {
            className: "class",
            beginKeywords: "class object trait type",
            end: /[:={\[\n;]/,
            excludeEnd: !0,
            contains: [{beginKeywords: "extends with", relevance: 10}, {
                begin: /\[/,
                end: /\]/,
                excludeBegin: !0,
                excludeEnd: !0,
                relevance: 0,
                contains: [a]
            }, {
                className: "params",
                begin: /\(/,
                end: /\)/,
                excludeBegin: !0,
                excludeEnd: !0,
                relevance: 0,
                contains: [a]
            }, i]
        }, r = {className: "function", beginKeywords: "def", end: /[:={\[(\n;]/, excludeEnd: !0, contains: [i]};
        return {
            keywords: {
                literal: "true false null",
                keyword: "type yield lazy override def with val var sealed abstract private trait object if forSome for while throw finally protected extends import final return else break new catch super class case package default try this match continue throws implicit"
            },
            contains: [e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, t, {
                className: "symbol",
                begin: "'\\w[\\w\\d_]*(?!')"
            }, a, r, s, e.C_NUMBER_MODE, {className: "meta", begin: "@[A-Za-z]+"}]
        }
    }

    function h(e) {
        return {
            aliases: ["console"],
            contains: [{
                className: "meta",
                begin: "^\\s{0,3}[\\w\\d\\[\\]()@-]*[>%$#]",
                starts: {end: "$", subLanguage: "bash"}
            }]
        }
    }

    function y(e) {
        var n = e.COMMENT("--", "$");
        return {
            case_insensitive: !0, illegal: /[<>{}*]/, contains: [{
                beginKeywords: "begin end start commit rollback savepoint lock alter create drop rename call delete do handler insert load replace select truncate update set show pragma grant merge describe use explain help declare prepare execute deallocate release unlock purge reset change stop analyze cache flush optimize repair kill install uninstall checksum restore check backup revoke comment values with",
                end: /;/,
                endsWithParent: !0,
                lexemes: /[\w\.]+/,
                keywords: {
                    keyword: "as abort abs absolute acc acce accep accept access accessed accessible account acos action activate add addtime admin administer advanced advise aes_decrypt aes_encrypt after agent aggregate ali alia alias all allocate allow alter always analyze ancillary and anti any anydata anydataset anyschema anytype apply archive archived archivelog are as asc ascii asin assembly assertion associate asynchronous at atan atn2 attr attri attrib attribu attribut attribute attributes audit authenticated authentication authid authors auto autoallocate autodblink autoextend automatic availability avg backup badfile basicfile before begin beginning benchmark between bfile bfile_base big bigfile bin binary_double binary_float binlog bit_and bit_count bit_length bit_or bit_xor bitmap blob_base block blocksize body both bound bucket buffer_cache buffer_pool build bulk by byte byteordermark bytes cache caching call calling cancel capacity cascade cascaded case cast catalog category ceil ceiling chain change changed char_base char_length character_length characters characterset charindex charset charsetform charsetid check checksum checksum_agg child choose chr chunk class cleanup clear client clob clob_base clone close cluster_id cluster_probability cluster_set clustering coalesce coercibility col collate collation collect colu colum column column_value columns columns_updated comment commit compact compatibility compiled complete composite_limit compound compress compute concat concat_ws concurrent confirm conn connec connect connect_by_iscycle connect_by_isleaf connect_by_root connect_time connection consider consistent constant constraint constraints constructor container content contents context contributors controlfile conv convert convert_tz corr corr_k corr_s corresponding corruption cos cost count count_big counted covar_pop covar_samp cpu_per_call cpu_per_session crc32 create creation critical cross cube cume_dist curdate current current_date current_time current_timestamp current_user cursor curtime customdatum cycle data database databases datafile datafiles datalength date_add date_cache date_format date_sub dateadd datediff datefromparts datename datepart datetime2fromparts day day_to_second dayname dayofmonth dayofweek dayofyear days db_role_change dbtimezone ddl deallocate declare decode decompose decrement decrypt deduplicate def defa defau defaul default defaults deferred defi defin define degrees delayed delegate delete delete_all delimited demand dense_rank depth dequeue des_decrypt des_encrypt des_key_file desc descr descri describ describe descriptor deterministic diagnostics difference dimension direct_load directory disable disable_all disallow disassociate discardfile disconnect diskgroup distinct distinctrow distribute distributed div do document domain dotnet double downgrade drop dumpfile duplicate duration each edition editionable editions element ellipsis else elsif elt empty enable enable_all enclosed encode encoding encrypt end end-exec endian enforced engine engines enqueue enterprise entityescaping eomonth error errors escaped evalname evaluate event eventdata events except exception exceptions exchange exclude excluding execu execut execute exempt exists exit exp expire explain explode export export_set extended extent external external_1 external_2 externally extract failed failed_login_attempts failover failure far fast feature_set feature_value fetch field fields file file_name_convert filesystem_like_logging final finish first first_value fixed flash_cache flashback floor flush following follows for forall force foreign form forma format found found_rows freelist freelists freepools fresh from from_base64 from_days ftp full function general generated get get_format get_lock getdate getutcdate global global_name globally go goto grant grants greatest group group_concat group_id grouping grouping_id groups gtid_subtract guarantee guard handler hash hashkeys having hea head headi headin heading heap help hex hierarchy high high_priority hosts hour hours http id ident_current ident_incr ident_seed identified identity idle_time if ifnull ignore iif ilike ilm immediate import in include including increment index indexes indexing indextype indicator indices inet6_aton inet6_ntoa inet_aton inet_ntoa infile initial initialized initially initrans inmemory inner innodb input insert install instance instantiable instr interface interleaved intersect into invalidate invisible is is_free_lock is_ipv4 is_ipv4_compat is_not is_not_null is_used_lock isdate isnull isolation iterate java join json json_exists keep keep_duplicates key keys kill language large last last_day last_insert_id last_value lateral lax lcase lead leading least leaves left len lenght length less level levels library like like2 like4 likec limit lines link list listagg little ln load load_file lob lobs local localtime localtimestamp locate locator lock locked log log10 log2 logfile logfiles logging logical logical_reads_per_call logoff logon logs long loop low low_priority lower lpad lrtrim ltrim main make_set makedate maketime managed management manual map mapping mask master master_pos_wait match matched materialized max maxextents maximize maxinstances maxlen maxlogfiles maxloghistory maxlogmembers maxsize maxtrans md5 measures median medium member memcompress memory merge microsecond mid migration min minextents minimum mining minus minute minutes minvalue missing mod mode model modification modify module monitoring month months mount move movement multiset mutex name name_const names nan national native natural nav nchar nclob nested never new newline next nextval no no_write_to_binlog noarchivelog noaudit nobadfile nocheck nocompress nocopy nocycle nodelay nodiscardfile noentityescaping noguarantee nokeep nologfile nomapping nomaxvalue nominimize nominvalue nomonitoring none noneditionable nonschema noorder nopr nopro noprom nopromp noprompt norely noresetlogs noreverse normal norowdependencies noschemacheck noswitch not nothing notice notnull notrim novalidate now nowait nth_value nullif nulls num numb numbe nvarchar nvarchar2 object ocicoll ocidate ocidatetime ociduration ociinterval ociloblocator ocinumber ociref ocirefcursor ocirowid ocistring ocitype oct octet_length of off offline offset oid oidindex old on online only opaque open operations operator optimal optimize option optionally or oracle oracle_date oradata ord ordaudio orddicom orddoc order ordimage ordinality ordvideo organization orlany orlvary out outer outfile outline output over overflow overriding package pad parallel parallel_enable parameters parent parse partial partition partitions pascal passing password password_grace_time password_lock_time password_reuse_max password_reuse_time password_verify_function patch path patindex pctincrease pctthreshold pctused pctversion percent percent_rank percentile_cont percentile_disc performance period period_add period_diff permanent physical pi pipe pipelined pivot pluggable plugin policy position post_transaction pow power pragma prebuilt precedes preceding precision prediction prediction_cost prediction_details prediction_probability prediction_set prepare present preserve prior priority private private_sga privileges procedural procedure procedure_analyze processlist profiles project prompt protection public publishingservername purge quarter query quick quiesce quota quotename radians raise rand range rank raw read reads readsize rebuild record records recover recovery recursive recycle redo reduced ref reference referenced references referencing refresh regexp_like register regr_avgx regr_avgy regr_count regr_intercept regr_r2 regr_slope regr_sxx regr_sxy reject rekey relational relative relaylog release release_lock relies_on relocate rely rem remainder rename repair repeat replace replicate replication required reset resetlogs resize resource respect restore restricted result result_cache resumable resume retention return returning returns reuse reverse revoke right rlike role roles rollback rolling rollup round row row_count rowdependencies rowid rownum rows rtrim rules safe salt sample save savepoint sb1 sb2 sb4 scan schema schemacheck scn scope scroll sdo_georaster sdo_topo_geometry search sec_to_time second seconds section securefile security seed segment select self semi sequence sequential serializable server servererror session session_user sessions_per_user set sets settings sha sha1 sha2 share shared shared_pool short show shrink shutdown si_averagecolor si_colorhistogram si_featurelist si_positionalcolor si_stillimage si_texture siblings sid sign sin size size_t sizes skip slave sleep smalldatetimefromparts smallfile snapshot some soname sort soundex source space sparse spfile split sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_small_result sql_variant_property sqlcode sqldata sqlerror sqlname sqlstate sqrt square standalone standby start starting startup statement static statistics stats_binomial_test stats_crosstab stats_ks_test stats_mode stats_mw_test stats_one_way_anova stats_t_test_ stats_t_test_indep stats_t_test_one stats_t_test_paired stats_wsr_test status std stddev stddev_pop stddev_samp stdev stop storage store stored str str_to_date straight_join strcmp strict string struct stuff style subdate subpartition subpartitions substitutable substr substring subtime subtring_index subtype success sum suspend switch switchoffset switchover sync synchronous synonym sys sys_xmlagg sysasm sysaux sysdate sysdatetimeoffset sysdba sysoper system system_user sysutcdatetime table tables tablespace tablesample tan tdo template temporary terminated tertiary_weights test than then thread through tier ties time time_format time_zone timediff timefromparts timeout timestamp timestampadd timestampdiff timezone_abbr timezone_minute timezone_region to to_base64 to_date to_days to_seconds todatetimeoffset trace tracking transaction transactional translate translation treat trigger trigger_nestlevel triggers trim truncate try_cast try_convert try_parse type ub1 ub2 ub4 ucase unarchived unbounded uncompress under undo unhex unicode uniform uninstall union unique unix_timestamp unknown unlimited unlock unnest unpivot unrecoverable unsafe unsigned until untrusted unusable unused update updated upgrade upped upper upsert url urowid usable usage use use_stored_outlines user user_data user_resources users using utc_date utc_timestamp uuid uuid_short validate validate_password_strength validation valist value values var var_samp varcharc vari varia variab variabl variable variables variance varp varraw varrawc varray verify version versions view virtual visible void wait wallet warning warnings week weekday weekofyear wellformed when whene whenev wheneve whenever where while whitespace window with within without work wrapped xdb xml xmlagg xmlattributes xmlcast xmlcolattval xmlelement xmlexists xmlforest xmlindex xmlnamespaces xmlpi xmlquery xmlroot xmlschema xmlserialize xmltable xmltype xor year year_to_month years yearweek",
                    literal: "true false null unknown",
                    built_in: "array bigint binary bit blob bool boolean char character date dec decimal float int int8 integer interval number numeric real record serial serial8 smallint text time timestamp tinyint varchar varying void"
                },
                contains: [{
                    className: "string",
                    begin: "'",
                    end: "'",
                    contains: [e.BACKSLASH_ESCAPE, {begin: "''"}]
                }, {
                    className: "string",
                    begin: '"',
                    end: '"',
                    contains: [e.BACKSLASH_ESCAPE, {begin: '""'}]
                }, {
                    className: "string",
                    begin: "`",
                    end: "`",
                    contains: [e.BACKSLASH_ESCAPE]
                }, e.C_NUMBER_MODE, e.C_BLOCK_COMMENT_MODE, n, e.HASH_COMMENT_MODE]
            }, e.C_BLOCK_COMMENT_MODE, n, e.HASH_COMMENT_MODE]
        }
    }

    function w(e) {
        var n = {
                keyword: "#available #colorLiteral #column #else #elseif #endif #file #fileLiteral #function #if #imageLiteral #line #selector #sourceLocation _ __COLUMN__ __FILE__ __FUNCTION__ __LINE__ Any as as! as? associatedtype associativity break case catch class continue convenience default defer deinit didSet do dynamic dynamicType else enum extension fallthrough false fileprivate final for func get guard if import in indirect infix init inout internal is lazy left let mutating nil none nonmutating open operator optional override postfix precedence prefix private protocol Protocol public repeat required rethrows return right self Self set static struct subscript super switch throw throws true try try! try? Type typealias unowned var weak where while willSet",
                literal: "true false nil",
                built_in: "abs advance alignof alignofValue anyGenerator assert assertionFailure bridgeFromObjectiveC bridgeFromObjectiveCUnconditional bridgeToObjectiveC bridgeToObjectiveCUnconditional c contains count countElements countLeadingZeros debugPrint debugPrintln distance dropFirst dropLast dump encodeBitsAsWords enumerate equal fatalError filter find getBridgedObjectiveCType getVaList indices insertionSort isBridgedToObjectiveC isBridgedVerbatimToObjectiveC isUniquelyReferenced isUniquelyReferencedNonObjC join lazy lexicographicalCompare map max maxElement min minElement numericCast overlaps partition posix precondition preconditionFailure print println quickSort readLine reduce reflect reinterpretCast reverse roundUpToAlignment sizeof sizeofValue sort split startsWith stride strideof strideofValue swap toString transcode underestimateCount unsafeAddressOf unsafeBitCast unsafeDowncast unsafeUnwrap unsafeReflect withExtendedLifetime withObjectAtPlusZero withUnsafePointer withUnsafePointerToObject withUnsafeMutablePointer withUnsafeMutablePointers withUnsafePointer withUnsafePointers withVaList zip"
            }, t = e.COMMENT("/\\*", "\\*/", {contains: ["self"]}),
            a = {className: "subst", begin: /\\\(/, end: "\\)", keywords: n, contains: []}, i = {
                className: "string",
                contains: [e.BACKSLASH_ESCAPE, a],
                variants: [{begin: /"""/, end: /"""/}, {begin: /"/, end: /"/}]
            }, s = {
                className: "number",
                begin: "\\b([\\d_]+(\\.[\\deE_]+)?|0x[a-fA-F0-9_]+(\\.[a-fA-F0-9p_]+)?|0b[01_]+|0o[0-7_]+)\\b",
                relevance: 0
            };
        return a.contains = [s], {
            keywords: n,
            contains: [i, e.C_LINE_COMMENT_MODE, t, {
                className: "type",
                begin: "\\b[A-Z][\\wÀ-ʸ']*[!?]"
            }, {className: "type", begin: "\\b[A-Z][\\wÀ-ʸ']*", relevance: 0}, s, {
                className: "function",
                beginKeywords: "func",
                end: "{",
                excludeEnd: !0,
                contains: [e.inherit(e.TITLE_MODE, {begin: /[A-Za-z$_][0-9A-Za-z$_]*/}), {
                    begin: /</,
                    end: />/
                }, {
                    className: "params",
                    begin: /\(/,
                    end: /\)/,
                    endsParent: !0,
                    keywords: n,
                    contains: ["self", s, i, e.C_BLOCK_COMMENT_MODE, {begin: ":"}],
                    illegal: /["']/
                }],
                illegal: /\[|%/
            }, {
                className: "class",
                beginKeywords: "struct protocol class extension enum",
                keywords: n,
                end: "\\{",
                excludeEnd: !0,
                contains: [e.inherit(e.TITLE_MODE, {begin: /[A-Za-z$_][\u00C0-\u02B80-9A-Za-z$_]*/})]
            }, {
                className: "meta",
                begin: "(@discardableResult|@warn_unused_result|@exported|@lazy|@noescape|@NSCopying|@NSManaged|@objc|@objcMembers|@convention|@required|@noreturn|@IBAction|@IBDesignable|@IBInspectable|@IBOutlet|@infix|@prefix|@postfix|@autoclosure|@testable|@available|@nonobjc|@NSApplicationMain|@UIApplicationMain)"
            }, {beginKeywords: "import", end: /$/, contains: [e.C_LINE_COMMENT_MODE, t]}]
        }
    }

    function S(e) {
        var n = {
            endsWithParent: !0,
            illegal: /</,
            relevance: 0,
            contains: [{className: "attr", begin: "[A-Za-z0-9\\._:-]+", relevance: 0}, {
                begin: /=\s*/,
                relevance: 0,
                contains: [{
                    className: "string",
                    endsParent: !0,
                    variants: [{begin: /"/, end: /"/}, {begin: /'/, end: /'/}, {begin: /[^\s"'=<>`]+/}]
                }]
            }]
        };
        return {
            aliases: ["html", "xhtml", "rss", "atom", "xjb", "xsd", "xsl", "plist"],
            case_insensitive: !0,
            contains: [{
                className: "meta",
                begin: "<!DOCTYPE",
                end: ">",
                relevance: 10,
                contains: [{begin: "\\[", end: "\\]"}]
            }, e.COMMENT("\x3c!--", "--\x3e", {relevance: 10}), {
                begin: "<\\!\\[CDATA\\[",
                end: "\\]\\]>",
                relevance: 10
            }, {className: "meta", begin: /<\?xml/, end: /\?>/, relevance: 10}, {
                begin: /<\?(php)?/,
                end: /\?>/,
                subLanguage: "php",
                contains: [{begin: "/\\*", end: "\\*/", skip: !0}, {begin: 'b"', end: '"', skip: !0}, {
                    begin: "b'",
                    end: "'",
                    skip: !0
                }, e.inherit(e.APOS_STRING_MODE, {
                    illegal: null,
                    className: null,
                    contains: null,
                    skip: !0
                }), e.inherit(e.QUOTE_STRING_MODE, {illegal: null, className: null, contains: null, skip: !0})]
            }, {
                className: "tag",
                begin: "<style(?=\\s|>|$)",
                end: ">",
                keywords: {name: "style"},
                contains: [n],
                starts: {end: "</style>", returnEnd: !0, subLanguage: ["css", "xml"]}
            }, {
                className: "tag",
                begin: "<script(?=\\s|>|$)",
                end: ">",
                keywords: {name: "script"},
                contains: [n],
                starts: {
                    end: "<\/script>",
                    returnEnd: !0,
                    subLanguage: ["actionscript", "javascript", "handlebars", "xml"]
                }
            }, {
                className: "tag",
                begin: "</?",
                end: "/?>",
                contains: [{className: "name", begin: /[^\/><\s]+/, relevance: 0}, n]
            }]
        }
    }

    function M(e) {
        var n = "true false yes no null", t = "^[ \\-]*", a = "[a-zA-Z_][\\w\\-]*", i = {
            className: "attr",
            variants: [{begin: t + a + ":"}, {begin: t + '"' + a + '":'}, {begin: t + "'" + a + "':"}]
        }, s = {
            className: "string",
            relevance: 0,
            variants: [{begin: /'/, end: /'/}, {begin: /"/, end: /"/}, {begin: /\S+/}],
            contains: [e.BACKSLASH_ESCAPE, {
                className: "template-variable",
                variants: [{begin: "{{", end: "}}"}, {begin: "%{", end: "}"}]
            }]
        };
        return {
            case_insensitive: !0,
            aliases: ["yml", "YAML", "yaml"],
            contains: [i, {className: "meta", begin: "^---s*$", relevance: 10}, {
                className: "string",
                begin: "[\\|>] *$",
                returnEnd: !0,
                contains: s.contains,
                end: i.variants[0].begin
            }, {
                begin: "<%[%=-]?",
                end: "[%-]?%>",
                subLanguage: "ruby",
                excludeBegin: !0,
                excludeEnd: !0,
                relevance: 0
            }, {className: "type", begin: "!" + e.UNDERSCORE_IDENT_RE}, {
                className: "type",
                begin: "!!" + e.UNDERSCORE_IDENT_RE
            }, {className: "meta", begin: "&" + e.UNDERSCORE_IDENT_RE + "$"}, {
                className: "meta",
                begin: "\\*" + e.UNDERSCORE_IDENT_RE + "$"
            }, {className: "bullet", begin: "^ *-", relevance: 0}, e.HASH_COMMENT_MODE, {
                beginKeywords: n,
                keywords: {literal: n}
            }, e.C_NUMBER_MODE, s]
        }
    }

    !function () {
        "use strict";
        t.registerLanguage("asciidoc", a), t.registerLanguage("bash", i), t.registerLanguage("cpp", s), t.registerLanguage("cs", r), t.registerLanguage("dockerfile", o), t.registerLanguage("go", l), t.registerLanguage("groovy", c), t.registerLanguage("java", d), t.registerLanguage("javascript", g), t.registerLanguage("json", u), t.registerLanguage("kotlin", m), t.registerLanguage("n1ql", y), t.registerLanguage("objectivec", _), t.registerLanguage("perl", b), t.registerLanguage("php", p), t.registerLanguage("powershell", E), t.registerLanguage("python", f), t.registerLanguage("ruby", v), t.registerLanguage("scala", N), t.registerLanguage("shell", h), t.registerLanguage("sql", y), t.registerLanguage("swift", w), t.registerLanguage("xml", S), t.registerLanguage("yaml", M), t.initHighlighting()
    }()
}();