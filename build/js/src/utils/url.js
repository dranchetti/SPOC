
SPOC.Utils.Url = {};

/**
 * Converts a Javascript object to SP API query string format
 * @params  obj Object of props to convert
 * @return  string
 */
SPOC.Utils.Url.getQueryString = function(variable, query) {
    // Returns query string value from URL.
    // Can pass in a URL string via query parm
    if (query) {
        query = query.split('?')[1];
    } else {
        query = window.location.search.substring(1);
    }
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return unescape(pair[1]);
        }
    }
};

/**
 * Extracts and returns a list name from api url endpoint
 * @params  url
 * @return  string
 */
SPOC.Utils.Url.getListNameFromUrl = function(url) {
   var regex = /\%27(.*)\%27/g;
   var match = regex.exec(url);
    return match ? match[1] : null;
};


/**
 * Extracts and returns a list name from api url endpoint
 * @params  url
 * @return  string
 */
SPOC.Utils.Url.AppWebUrl = function(url) {
   return SPOC.Utils.Url.getQueryString('SPAppWebUrl');
};


/**
 * Converts a Javascript object to SP API query string format
 * @params  obj Object of props to convert
 * @return  string
 */
SPOC.Utils.Url.isSameDomain = function(url) {
    var current = window.location.href.toLowerCase();
    return url.toLowerCase().indexOf(current) > -1 ? true : false;
};

/**
 * Converts a API call to x domain format
 * @params  url string url of API call
 * @return  string
 */
SPOC.Utils.Url.convertToXDomain = function(url) {
    url = url.toLowerCase();
    url = url.replace('/_api/', '/_api/SP.AppContextSite(@target)/');
    var domain = url.split('/_api')[0];
    url = url.split('/_api')[1];

    if (url.indexOf('?') === -1){
        url = url + '?';
    }

    url = window.location.origin + '/_api' + url + '@target=%27' + domain + '%27';

    return url;
};
