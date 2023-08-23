////////////////////////////////////////////////////
/*  A collection of utility methods for client-hints
    https://github.com/faisalman/ua-parser-js
    Author: Faisal Salman <f@faisalman.com>
    MIT License */
///////////////////////////////////////////////////

/*jshint esversion: 11 */ 

const UACHMap = {
    'sec-ch-ua-arch' : {
        prop    : 'architecture', 
        type    : 'sf-string'
    },
    'sec-ch-ua-bitness' : {
        prop    : 'bitness', 
        type    : 'sf-string'
    },
    'sec-ch-ua' : {
        prop    : 'brands', 
        type    : 'sf-list'
    },
    'sec-ch-ua-form-factor' : {
        prop    : 'formFactor', 
        type    : 'sf-string'
    },
    'sec-ch-ua-full-version-list' : {
        prop    : 'fullVersionList', 
        type    : 'sf-list'
    },
    'sec-ch-ua-mobile' : {
        prop    : 'mobile', 
        type    : 'sf-boolean',
    },
    'sec-ch-ua-model' : {
        prop    : 'model', 
        type    : 'sf-string',
    },
    'sec-ch-ua-platform' : {
        prop    : 'platform',
        type    : 'sf-string'
    }, 
    'sec-ch-ua-platform-version' : {
        prop    : 'platformVersion', 
        type    : 'sf-string'
    },
    'sec-ch-ua-wow64' : {
        prop    : 'wow64',
        type    : 'sf-boolean'
    }
};

const UACHParser = (headers) => {
    const parse = (str, type) => {
        if (!str) {
            return '';
        }
        switch (type) {
            case 'sf-boolean':
                return /\?1/.test(str);
            case 'sf-list':
                return str.replace(/\\?\"/g, '')
                    .split(', ')
                    .map(brands => {
                        const [brand, version] = brands.split(';v=');
                        return { 
                            brand : brand, 
                            version : version
                        };
                });
            case 'sf-string':
            default:
                return str.replace(/\\?\"/g, '');
        }
    };
    let ch = {};
    Object.keys(UACHMap).forEach(field => {
        if (headers.hasOwnProperty(field)) {
            const { prop, type } = UACHMap[field];
            ch[prop] = parse(headers[field], type);
        }
    });
    return ch;
};

module.exports = { 
    UACHParser
};