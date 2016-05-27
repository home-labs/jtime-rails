"use strict";

var
    Extensor,
    Location;

(function ($) {

    Extensor.new($, {

        prototype: {

            queryParam: function (param, value) {
                if (param) param = param.trim();

                var
                    self = window.location,
                    uri = self.href,
                    search = self.search,
                    query = search.replace(/^\?/, ''),
                    // (?=...) capture what has ... before, but don't capture ...
                    // ?!. non capture nothing unless \n
                    searchRE,
                    results,

                    set = function (param, value) {
                        value = encodeURIComponent(value.toString().trim());
                        var
                            globalRE = new RegExp("[?&]((" + param + "\=[^&#]*)|(" + param + "(?=[&#]))|(" + param + "(?!.)))", "g"),
                            re = new RegExp("^(" + param + "=)|^(" + param + ")(?!.)"),
                            params,
                            separator;

                        if (globalRE.test(search)) {
                            params = query.split('&').uniq();

                            params.forEach(function (p, i) {
                                if (re.test(p)) {
                                    params[i] = param + "=" + value;
                                }
                            });
                            // $n(1..9) is a placeholder flag to method "replace", it indicates which matching groups should be selected to replace
                            uri = self.origin + self.pathname + "?" + params.uniq().join("&") + self.hash;
                        } else {
                            separator = /^\?/.test(search) ? "&" : "?";
                            uri = location.origin + location.pathname + location.search + separator + param + "=" + value + location.hash;
                        }

                        window.history.pushState("", "", uri);
                    };

                if (value) {
                    set(param, value);
                    return self;
                }

                searchRE = new RegExp("[?&]" + param + "(=([^&#]*)|(?=[&#])|(?!.))", "g");
                results = searchRE.exec(uri);
                if (!results) return null;
                // undefined
                if (!results[2]) return "";
                return decodeURIComponent(results[2].replace(/\+/g, " "));
            }

        }

    });

})(Location);

// the solution with positive lookbehind. Works with python, for example, but doesn't with JS.

// (?<=[?&])((foo\=[^&#]*)|(foo(?=[&#]))|(foo(?!.)))

// the string to test
// ?foo=bar&?foo&foo=foo&foo&nonfoo=bar&nonfoo&foo#foo

// better solution for now in JS

// [?&]((foo\=[^&#]*)|(foo(?=[&#]))|(foo(?!.)))

// - [^\&\#] - vai do ponto atual para até qualquer coisa que não seja & ou #, pela direita
// - para conjunto de caracteres use [], e para dois ou mais caracteres que devem respeitar uma sequência use a sintaxe de agrupamento ().

// - não pode selecionar apenas a chave porque podem haver chaves com ou sem valor, nesse caso a substituição (.replace), em casos que se têm chave, ficaria com o formato errado, como "foo=bar=bar";