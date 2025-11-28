const documentation = [
    {
        "function": "contains(str, seed [, options])",
        "documentation": "check if the string contains the seed.\n\noptions is an object that defaults to { ignoreCase: false, minOccurrences: 1 }.\nOptions:\nignoreCase: Ignore case when doing comparison, default false.\nminOccurrences: Minimum number of occurrences for the seed in the string. Defaults to 1."
    },
    {
        "function": "equals(str, comparison)",
        "documentation": "check if the string matches the comparison."
    },
    {
        "function": "isAbaRouting(str)",
        "documentation": "check if the string is an ABA routing number for US bank account / cheque."
    },
    {
        "function": "isAfter(str [, options])",
        "documentation": "check if the string is a date that is after the specified date.\n\noptions is an object that defaults to { comparisonDate: Date().toString() }.\nOptions:\ncomparisonDate: Date to compare to. Defaults to Date().toString() (now)."
    },
    {
        "function": "isAlpha(str [, locale, options])",
        "documentation": "check if the string contains only letters (a-zA-Z).\n\nlocale is one of ['ar', 'ar-AE', 'ar-BH', 'ar-DZ', 'ar-EG', 'ar-IQ', 'ar-JO', 'ar-KW', 'ar-LB', 'ar-LY', 'ar-MA', 'ar-QA', 'ar-QM', 'ar-SA', 'ar-SD', 'ar-SY', 'ar-TN', 'ar-YE', 'bg-BG', 'bn', 'bn-IN', 'cs-CZ', 'da-DK', 'de-DE', 'el-GR', 'en-AU', 'en-GB', 'en-HK', 'en-IN', 'en-NZ', 'en-US', 'en-ZA', 'en-ZM', 'eo', 'es-ES', 'fa-IR', 'fi-FI', 'fr-CA', 'fr-FR', 'gu-IN', 'he', 'hi-IN', 'hu-HU', 'it-IT', 'ja-JP', 'kk-KZ', 'kn-IN', 'ko-KR', 'ku-IQ', 'ml-IN', 'nb-NO', 'nl-NL', 'nn-NO', 'or-IN', 'pa-IN', 'pl-PL', 'pt-BR', 'pt-PT', 'ru-RU', 'si-LK', 'sk-SK', 'sl-SI', 'sr-RS', 'sr-RS@latin', 'sv-SE', 'ta-IN', 'te-IN', 'th-TH', 'tr-TR', 'uk-UA'] and defaults to en-US. Locale list is validator.isAlphaLocales. options is an optional object that can be supplied with the following key(s): ignore which can either be a String or RegExp of characters to be ignored e.g. \" -\" will ignore spaces and -'s."
    },
    {
        "function": "isAlphanumeric(str [, locale, options])",
        "documentation": "check if the string contains only letters and numbers (a-zA-Z0-9).\n\nlocale is one of ['ar', 'ar-AE', 'ar-BH', 'ar-DZ', 'ar-EG', 'ar-IQ', 'ar-JO', 'ar-KW', 'ar-LB', 'ar-LY', 'ar-MA', 'ar-QA', 'ar-QM', 'ar-SA', 'ar-SD', 'ar-SY', 'ar-TN', 'ar-YE', 'bg-BG', 'bn', 'bn-IN', 'cs-CZ', 'da-DK', 'de-DE', 'el-GR', 'en-AU', 'en-GB', 'en-HK', 'en-IN', 'en-NZ', 'en-US', 'en-ZA', 'en-ZM', 'eo', 'es-ES', 'fa-IR', 'fi-FI', 'fr-CA', 'fr-FR', 'gu-IN', 'he', 'hi-IN', 'hu-HU', 'it-IT', 'ja-JP', 'kk-KZ', 'kn-IN', 'ko-KR', 'ku-IQ', 'ml-IN', 'nb-NO', 'nl-NL', 'nn-NO', 'or-IN', 'pa-IN', 'pl-PL', 'pt-BR', 'pt-PT', 'ru-RU', 'si-LK', 'sk-SK', 'sl-SI', 'sr-RS', 'sr-RS@latin', 'sv-SE', 'ta-IN', 'te-IN', 'th-TH', 'tr-TR', 'uk-UA']) and defaults to en-US. Locale list is validator.isAlphanumericLocales. options is an optional object that can be supplied with the following key(s): ignore which can either be a String or RegExp of characters to be ignored e.g. \" -\" will ignore spaces and -'s."
    },
    {
        "function": "isAscii(str)",
        "documentation": "check if the string contains ASCII chars only."
    },
    {
        "function": "isBase32(str [, options])",
        "documentation": "check if the string is base32 encoded. options is optional and defaults to { crockford: false }.\nWhen crockford is true it tests the given base32 encoded string using Crockford's base32 alternative."
    },
    {
        "function": "isBase58(str)",
        "documentation": "check if the string is base58 encoded."
    },
    {
        "function": "isBase64(str [, options])",
        "documentation": "check if the string is base64 encoded. options is optional and defaults to { urlSafe: false, padding: true }\nwhen urlSafe is true default value for padding is false and it tests the given base64 encoded string is url safe."
    },
    {
        "function": "isBefore(str [, options])",
        "documentation": "check if the string is a date that is before the specified date.\n\noptions is an object that defaults to { comparisonDate: Date().toString() }.\n\nOptions:\ncomparisonDate: Date to compare to. Defaults to Date().toString() (now)."
    },
    {
        "function": "isBIC(str)",
        "documentation": "check if the string is a BIC (Bank Identification Code) or SWIFT code."
    },
    {
        "function": "isBoolean(str [, options])",
        "documentation": "check if the string is a boolean.\noptions is an object which defaults to { loose: false }. If loose is set to false, the validator will strictly match ['true', 'false', '0', '1']. If loose is set to true, the validator will also match 'yes', 'no', and will match a valid boolean string of any case. (e.g.: ['true', 'True', 'TRUE'])."
    },
    {
        "function": "isBtcAddress(str)",
        "documentation": "check if the string is a valid BTC address."
    },
    {
        "function": "isByteLength(str [, options])",
        "documentation": "check if the string's length (in UTF-8 bytes) falls in a range.\n\noptions is an object which defaults to { min: 0, max: undefined }."
    },
    {
        "function": "isCreditCard(str [, options])",
        "documentation": "check if the string is a credit card number.\n\noptions is an optional object that can be supplied with the following key(s): provider is an optional key whose value should be a string, and defines the company issuing the credit card. Valid values include ['amex', 'dinersclub', 'discover', 'jcb', 'mastercard', 'unionpay', 'visa'] or blank will check for any provider."
    },
    {
        "function": "isCurrency(str [, options])",
        "documentation": "check if the string is a valid currency amount.\n\noptions is an object which defaults to { symbol: '$', require_symbol: false, allow_space_after_symbol: false, symbol_after_digits: false, allow_negatives: true, parens_for_negatives: false, negative_sign_before_digits: false, negative_sign_after_digits: false, allow_negative_sign_placeholder: false, thousands_separator: ',', decimal_separator: '.', allow_decimal: true, require_decimal: false, digits_after_decimal: [2], allow_space_after_digits: false }.\nNote: The array digits_after_decimal is filled with the exact number of digits allowed not a range, for example a range 1 to 3 will be given as [1, 2, 3]."
    },
    {
        "function": "isDataURI(str)",
        "documentation": "check if the string is a data uri format."
    },
    {
        "function": "isDate(str [, options])",
        "documentation": "check if the string is a valid date. e.g. [2002-07-15, new Date()].\n\noptions is an object which can contain the keys format, strictMode and/or delimiters.\n\nformat is a string and defaults to YYYY/MM/DD.\n\nstrictMode is a boolean and defaults to false. If strictMode is set to true, the validator will reject strings different from format.\n\ndelimiters is an array of allowed date delimiters and defaults to ['/', '-']."
    },
    {
        "function": "isDecimal(str [, options])",
        "documentation": "check if the string represents a decimal number, such as 0.1, .3, 1.1, 1.00003, 4.0, etc.\n\noptions is an object which defaults to {force_decimal: false, decimal_digits: '1,', locale: 'en-US'}.\n\nlocale determines the decimal separator and is one of ['ar', 'ar-AE', 'ar-BH', 'ar-DZ', 'ar-EG', 'ar-IQ', 'ar-JO', 'ar-KW', 'ar-LB', 'ar-LY', 'ar-MA', 'ar-QA', 'ar-QM', 'ar-SA', 'ar-SD', 'ar-SY', 'ar-TN', 'ar-YE', 'bg-BG', 'cs-CZ', 'da-DK', 'de-DE', 'el-GR', 'en-AU', 'en-GB', 'en-HK', 'en-IN', 'en-NZ', 'en-US', 'en-ZA', 'en-ZM', 'eo', 'es-ES', 'fa', 'fa-AF', 'fa-IR', 'fr-FR', 'fr-CA', 'hu-HU', 'id-ID', 'it-IT', 'ku-IQ', 'nb-NO', 'nl-NL', 'nn-NO', 'pl-PL', 'pl-Pl', 'pt-BR', 'pt-PT', 'ru-RU', 'sl-SI', 'sr-RS', 'sr-RS@latin', 'sv-SE', 'tr-TR', 'uk-UA', 'vi-VN'].\nNote: decimal_digits is given as a range like '1,3', a specific value like '3' or min like '1,'."
    },
    {
        "function": "isDivisibleBy(str, number)",
        "documentation": "check if the string is a number that is divisible by another."
    },
    {
        "function": "isEAN(str)",
        "documentation": "check if the string is an EAN (European Article Number)."
    },
    {
        "function": "isEmail(str [, options])",
        "documentation": "check if the string is an email.\n\noptions is an object which defaults to { allow_display_name: false, require_display_name: false, allow_utf8_local_part: true, require_tld: true, allow_ip_domain: false, allow_underscores: false, domain_specific_validation: false, blacklisted_chars: '', host_blacklist: [] }. If allow_display_name is set to true, the validator will also match Display Name <email-address>. If require_display_name is set to true, the validator will reject strings without the format Display Name <email-address>. If allow_utf8_local_part is set to false, the validator will not allow any non-English UTF8 character in email address' local part. If require_tld is set to false, email addresses without a TLD in their domain will also be matched. If ignore_max_length is set to true, the validator will not check for the standard max length of an email. If allow_ip_domain is set to true, the validator will allow IP addresses in the host part. If domain_specific_validation is true, some additional validation will be enabled, e.g. disallowing certain syntactically valid email addresses that are rejected by Gmail. If blacklisted_chars receives a string, then the validator will reject emails that include any of the characters in the string, in the name part. If host_blacklist is set to an array of strings or regexp, and the part of the email after the @ symbol matches one of the strings defined in it, the validation fails. If host_whitelist is set to an array of strings or regexp, and the part of the email after the @ symbol matches none of the strings defined in it, the validation fails."
    },
    {
        "function": "isEmpty(str [, options])",
        "documentation": "check if the string has a length of zero.\n\noptions is an object which defaults to { ignore_whitespace: false }."
    },
    {
        "function": "isEthereumAddress(str)",
        "documentation": "check if the string is an Ethereum address. Does not validate address checksums."
    },
    {
        "function": "isFloat(str [, options])",
        "documentation": "check if the string is a float.\n\noptions is an object which can contain the keys min, max, gt, and/or lt to validate the float is within boundaries (e.g. { min: 7.22, max: 9.55 }) it also has locale as an option.\n\nmin and max are equivalent to 'greater or equal' and 'less or equal', respectively while gt and lt are their strict counterparts.\n\nlocale determines the decimal separator and is one of ['ar', 'ar-AE', 'ar-BH', 'ar-DZ', 'ar-EG', 'ar-IQ', 'ar-JO', 'ar-KW', 'ar-LB', 'ar-LY', 'ar-MA', 'ar-QA', 'ar-QM', 'ar-SA', 'ar-SD', 'ar-SY', 'ar-TN', 'ar-YE', 'bg-BG', 'cs-CZ', 'da-DK', 'de-DE', 'en-AU', 'en-GB', 'en-HK', 'en-IN', 'en-NZ', 'en-US', 'en-ZA', 'en-ZM', 'eo', 'es-ES', 'fr-CA', 'fr-FR', 'hu-HU', 'it-IT', 'nb-NO', 'nl-NL', 'nn-NO', 'pl-PL', 'pt-BR', 'pt-PT', 'ru-RU', 'sl-SI', 'sr-RS', 'sr-RS@latin', 'sv-SE', 'tr-TR', 'uk-UA']. Locale list is validator.isFloatLocales."
    },
    {
        "function": "isFQDN(str [, options])",
        "documentation": "check if the string is a fully qualified domain name (e.g. domain.com).\n\noptions is an object which defaults to { require_tld: true, allow_underscores: false, allow_trailing_dot: false, allow_numeric_tld: false, allow_wildcard: false, ignore_max_length: false }.\n\nrequire_tld - If set to false the validator will not check if the domain includes a TLD.\nallow_underscores - if set to true, the validator will allow underscores in the domain.\nallow_trailing_dot - if set to true, the validator will allow the domain to end with a . character.\nallow_numeric_tld - if set to true, the validator will allow the TLD of the domain to be made up solely of numbers.\nallow_wildcard - if set to true, the validator will allow domains starting with *. (e.g. *.example.com or *.shop.example.com).\nignore_max_length - if set to true, the validator will not check for the standard max length of a domain.\n"
    },
    {
        "function": "isFreightContainerID(str)",
        "documentation": "alias for isISO6346, check if the string is a valid ISO 6346 shipping container identification."
    },
    {
        "function": "isFullWidth(str)",
        "documentation": "check if the string contains any full-width chars."
    },
    {
        "function": "isHalfWidth(str)",
        "documentation": "check if the string contains any half-width chars."
    },
    {
        "function": "isHash(str, algorithm)",
        "documentation": "check if the string is a hash of type algorithm.\n\nAlgorithm is one of ['crc32', 'crc32b', 'md4', 'md5', 'ripemd128', 'ripemd160', 'sha1', 'sha256', 'sha384', 'sha512', 'tiger128', 'tiger160', 'tiger192']."
    },
    {
        "function": "isHexadecimal(str)",
        "documentation": "check if the string is a hexadecimal number."
    },
    {
        "function": "isHexColor(str)",
        "documentation": "check if the string is a hexadecimal color."
    },
    {
        "function": "isHSL(str)",
        "documentation": "check if the string is an HSL (hue, saturation, lightness, optional alpha) color based on CSS Colors Level 4 specification.\n\nComma-separated format supported. Space-separated format supported with the exception of a few edge cases (ex: hsl(200grad+.1%62%/1))."
    },
    {
        "function": "isIBAN(str, [, options])",
        "documentation": "check if the string is an IBAN (International Bank Account Number).\n\noptions is an object which accepts two attributes: whitelist: where you can restrict IBAN codes you want to receive data from and blacklist: where you can remove some of the countries from the current list. For both you can use an array with the following values ['AD','AE','AL','AT','AZ','BA','BE','BG','BH','BR','BY','CH','CR','CY','CZ','DE','DK','DO','EE','EG','ES','FI','FO','FR','GB','GE','GI','GL','GR','GT','HR','HU','IE','IL','IQ','IR','IS','IT','JO','KW','KZ','LB','LC','LI','LT','LU','LV','MC','MD','ME','MK','MR','MT','MU','MZ','NL','NO','PK','PL','PS','PT','QA','RO','RS','SA','SC','SE','SI','SK','SM','SV','TL','TN','TR','UA','VA','VG','XK']."
    },
    {
        "function": "isIdentityCard(str [, locale])",
        "documentation": "check if the string is a valid identity card code.\n\nlocale is one of ['LK', 'PL', 'ES', 'FI', 'IN', 'IT', 'IR', 'MZ', 'NO', 'TH', 'zh-TW', 'he-IL', 'ar-LY', 'ar-TN', 'zh-CN', 'zh-HK', 'PK'] OR 'any'. If 'any' is used, function will check if any of the locales match.\n\nDefaults to 'any'."
    },
    {
        "function": "isIMEI(str [, options]))",
        "documentation": "check if the string is a valid IMEI number. IMEI should be of format ############### or ##-######-######-#.\n\noptions is an object which can contain the keys allow_hyphens. Defaults to first format. If allow_hyphens is set to true, the validator will validate the second format."
    },
    {
        "function": "isIn(str, values)",
        "documentation": "check if the string is in an array of allowed values."
    },
    {
        "function": "isInt(str [, options])",
        "documentation": "check if the string is an integer.\n\noptions is an object which can contain the keys min and/or max to check the integer is within boundaries (e.g. { min: 10, max: 99 }). options can also contain the key allow_leading_zeroes, which when set to false will disallow integer values with leading zeroes (e.g. { allow_leading_zeroes: false }). Finally, options can contain the keys gt and/or lt which will enforce integers being greater than or less than, respectively, the value provided (e.g. {gt: 1, lt: 4} for a number between 1 and 4)."
    },
    {
        "function": "isIP(str [, options])",
        "documentation": "check if the string is an IP address (version 4 or 6).\n\noptions is an object that defaults to { version: '' }.\n\nOptions:\nversion: defines which IP version to compare to. Accepted values: 4, 6, '4', '6'."
    },
    {
        "function": "isIPRange(str [, version])",
        "documentation": "check if the string is an IP Range (version 4 or 6)."
    },
    {
        "function": "isISBN(str [, options])",
        "documentation": "check if the string is an ISBN.\n\noptions is an object that has no default.\nOptions:\nversion: ISBN version to compare to. Accepted values are '10' and '13'. If none provided, both will be tested."
    },
    {
        "function": "isISIN(str)",
        "documentation": "check if the string is an ISIN (stock/security identifier)."
    },
    {
        "function": "isISO6346(str)",
        "documentation": "check if the string is a valid ISO 6346 shipping container identification."
    },
    {
        "function": "isISO6391(str)",
        "documentation": "check if the string is a valid ISO 639-1 language code."
    },
    {
        "function": "isISO8601(str [, options])",
        "documentation": "check if the string is a valid ISO 8601 date.\noptions is an object which defaults to { strict: false, strictSeparator: false }. If strict is true, date strings with invalid dates like 2009-02-29 will be invalid. If strictSeparator is true, date strings with date and time separated by anything other than a T will be invalid."
    },
    {
        "function": "isISO15924(str)",
        "documentation": "check if the string is a valid ISO 15924 officially assigned script code."
    },
    {
        "function": "isISO31661Alpha2(str)",
        "documentation": "check if the string is a valid ISO 3166-1 alpha-2 officially assigned country code."
    },
    {
        "function": "isISO31661Alpha3(str)",
        "documentation": "check if the string is a valid ISO 3166-1 alpha-3 officially assigned country code."
    },
    {
        "function": "isISO31661Numeric(str)",
        "documentation": "check if the string is a valid ISO 3166-1 numeric officially assigned country code."
    },
    {
        "function": "isISO4217(str)",
        "documentation": "check if the string is a valid ISO 4217 officially assigned currency code."
    },
    {
        "function": "isISRC(str)",
        "documentation": "check if the string is an ISRC."
    },
    {
        "function": "isISSN(str [, options])",
        "documentation": "check if the string is an ISSN.\n\noptions is an object which defaults to { case_sensitive: false, require_hyphen: false }. If case_sensitive is true, ISSNs with a lowercase 'x' as the check digit are rejected."
    },
    {
        "function": "isJSON(str [, options])",
        "documentation": "check if the string is valid JSON (note: uses JSON.parse).\n\noptions is an object which defaults to { allow_primitives: false }. If allow_primitives is true, the primitives 'true', 'false' and 'null' are accepted as valid JSON values."
    },
    {
        "function": "isJWT(str)",
        "documentation": "check if the string is valid JWT token."
    },
    {
        "function": "isLatLong(str [, options])",
        "documentation": "check if the string is a valid latitude-longitude coordinate in the format lat,long or lat, long.\n\noptions is an object that defaults to { checkDMS: false }. Pass checkDMS as true to validate DMS(degrees, minutes, and seconds) latitude-longitude format."
    },
    {
        "function": "isLength(str [, options])",
        "documentation": "check if the string's length falls in a range and equal to any of the integers of the discreteLengths array if provided.\n\noptions is an object which defaults to { min: 0, max: undefined, discreteLengths: undefined }. Note: this function takes into account surrogate pairs."
    },
    {
        "function": "isLicensePlate(str, locale)",
        "documentation": "check if the string matches the format of a country's license plate.\n\nlocale is one of ['cs-CZ', 'de-DE', 'de-LI', 'en-IN', 'en-SG', 'en-PK', 'es-AR', 'hu-HU', 'pt-BR', 'pt-PT', 'sq-AL', 'sv-SE'] or 'any'."
    },
    {
        "function": "isLocale(str)",
        "documentation": "check if the string is a locale."
    },
    {
        "function": "isLowercase(str)",
        "documentation": "check if the string is lowercase."
    },
    {
        "function": "isLuhnNumber(str)",
        "documentation": "check if the string passes the Luhn algorithm check."
    },
    {
        "function": "isMACAddress(str [, options])",
        "documentation": "check if the string is a MAC address.\n\noptions is an object which defaults to { no_separators: false }. It allows the use of hyphens, spaces or dots e.g. '01 02 03 04 05 ab', '01-02-03-04-05-ab' or '0102.0304.05ab'. If no_separators is true, the validator will then only check MAC addresses without separators. The options also allow a eui property to specify if it needs to be validated against EUI-48 or EUI-64. The accepted values of eui are: 48, 64."
    },
    {
        "function": "isMagnetURI(str)",
        "documentation": "check if the string is a Magnet URI format."
    },
    {
        "function": "isMailtoURI(str, [, options])",
        "documentation": "check if the string is a Mailto URI format.\n\noptions is an object of validating emails inside the URI (check isEmails options for details)."
    },
    {
        "function": "isMD5(str)",
        "documentation": "check if the string is a MD5 hash.\n\nPlease note that you can also use the isHash(str, 'md5') function. Keep in mind that MD5 has some collision weaknesses compared to other algorithms (e.g., SHA)."
    },
    {
        "function": "isMimeType(str)",
        "documentation": "check if the string matches to a valid MIME type format."
    },
    {
        "function": "isMobilePhone(str [, locale [, options]])",
        "documentation": "check if the string is a mobile phone number,\n\nlocale is either an array of locales (e.g. ['sk-SK', 'sr-RS']) OR one of ['am-Am', 'ar-AE', 'ar-BH', 'ar-DZ', 'ar-EG', 'ar-EH', 'ar-IQ', 'ar-JO', 'ar-KW', 'ar-PS', 'ar-SA', 'ar-SD', 'ar-SY', 'ar-TN', 'ar-YE', 'az-AZ', 'az-LB', 'az-LY', 'be-BY', 'bg-BG', 'bn-BD', 'bs-BA', 'ca-AD', 'cs-CZ', 'da-DK', 'de-AT', 'de-CH', 'de-DE', 'de-LU', 'dv-MV', 'dz-BT', 'el-CY', 'el-GR', 'en-AG', 'en-AI', 'en-AU', 'en-BM', 'en-BS', 'en-BW', 'en-CA', 'en-GB', 'en-GG', 'en-GH', 'en-GY', 'en-HK', 'en-IE', 'en-IN', 'en-JM', 'en-KE', 'en-KI', 'en-KN', 'en-LS', 'en-MO', 'en-MT', 'en-MU', 'en-MW', 'en-NG', 'en-NZ', 'en-PG', 'en-PH', 'en-PK', 'en-RW', 'en-SG', 'en-SL', 'en-SS', 'en-TZ', 'en-UG', 'en-US', 'en-ZA', 'en-ZM', 'en-ZW', 'es-AR', 'es-BO', 'es-CL', 'es-CO', 'es-CR', 'es-CU', 'es-DO', 'es-EC', 'es-ES', 'es-GT','es-HN', 'es-MX', 'es-NI', 'es-PA', 'es-PE', 'es-PY', 'es-SV', 'es-UY', 'es-VE', 'et-EE', 'fa-AF', 'fa-IR', 'fi-FI', 'fj-FJ', 'fo-FO', 'fr-BE', 'fr-BF', 'fr-BJ', 'fr-CD', 'fr-CF', 'fr-FR', 'fr-GF', 'fr-GP', 'fr-MQ', 'fr-PF', 'fr-RE', 'fr-WF', 'ga-IE', 'he-IL', 'hu-HU', 'id-ID', 'ir-IR', 'it-IT', 'it-SM', 'ja-JP', 'ka-GE', 'kk-KZ', 'kl-GL', 'ko-KR', 'ky-KG', 'lt-LT', 'mg-MG', 'mn-MN', 'mk-MK', 'ms-MY', 'my-MM', 'mz-MZ', 'nb-NO', 'ne-NP', 'nl-AW', 'nl-BE', 'nl-NL', 'nn-NO', 'pl-PL', 'pt-AO', 'pt-BR', 'pt-PT', 'ro-Md', 'ro-RO', 'ru-RU', 'si-LK', 'sk-SK', 'sl-SI', 'so-SO', 'sq-AL', 'sr-RS', 'sv-SE', 'tg-TJ', 'th-TH', 'tk-TM', 'tr-TR', 'uk-UA', 'uz-UZ', 'vi-VN', 'zh-CN', 'zh-HK', 'zh-MO', 'zh-TW'] OR defaults to 'any'. If 'any' or a falsey value is used, function will check if any of the locales match).\n\noptions is an optional object that can be supplied with the following keys: strictMode, if this is set to true, the mobile phone number must be supplied with the country code and therefore must start with +. Locale list is validator.isMobilePhoneLocales."
    },
    {
        "function": "isMongoId(str)",
        "documentation": "check if the string is a valid hex-encoded representation of a MongoDB ObjectId."
    },
    {
        "function": "isMultibyte(str)",
        "documentation": "check if the string contains one or more multibyte chars."
    },
    {
        "function": "isNumeric(str [, options])",
        "documentation": "check if the string contains only numbers.\n\noptions is an object which defaults to { no_symbols: false } it also has locale as an option. If no_symbols is true, the validator will reject numeric strings that feature a symbol (e.g. +, -, or .).\n\nlocale determines the decimal separator and is one of ['ar', 'ar-AE', 'ar-BH', 'ar-DZ', 'ar-EG', 'ar-IQ', 'ar-JO', 'ar-KW', 'ar-LB', 'ar-LY', 'ar-MA', 'ar-QA', 'ar-QM', 'ar-SA', 'ar-SD', 'ar-SY', 'ar-TN', 'ar-YE', 'bg-BG', 'cs-CZ', 'da-DK', 'de-DE', 'en-AU', 'en-GB', 'en-HK', 'en-IN', 'en-NZ', 'en-US', 'en-ZA', 'en-ZM', 'eo', 'es-ES', 'fr-FR', 'fr-CA', 'hu-HU', 'it-IT', 'nb-NO', 'nl-NL', 'nn-NO', 'pl-PL', 'pt-BR', 'pt-PT', 'ru-RU', 'sl-SI', 'sr-RS', 'sr-RS@latin', 'sv-SE', 'tr-TR', 'uk-UA']."
    },
    {
        "function": "isOctal(str)",
        "documentation": "check if the string is a valid octal number."
    },
    {
        "function": "isPassportNumber(str, countryCode)",
        "documentation": "check if the string is a valid passport number.\n\ncountryCode is one of ['AM', 'AR', 'AT', 'AU', 'AZ', 'BE', 'BG', 'BY', 'BR', 'CA', 'CH', 'CN', 'CY', 'CZ', 'DE', 'DK', 'DZ', 'EE', 'ES', 'FI', 'FR', 'GB', 'GR', 'HR', 'HU', 'IE', 'IN', 'IR', 'ID', 'IS', 'IT', 'JM', 'JP', 'KR', 'KZ', 'LI', 'LT', 'LU', 'LV', 'LY', 'MT', 'MX', 'MY', 'MZ', 'NL', 'NZ', 'PH', 'PK', 'PL', 'PT', 'RO', 'RU', 'SE', 'SL', 'SK', 'TH', 'TR', 'UA', 'US', 'ZA']. Locale list is validator.passportNumberLocales."
    },
    {
        "function": "isPort(str)",
        "documentation": "check if the string is a valid port number."
    },
    {
        "function": "isPostalCode(str, locale)",
        "documentation": "check if the string is a postal code.\n\nlocale is one of ['AD', 'AT', 'AU', 'AZ', 'BA', 'BD', 'BE', 'BG', 'BR', 'BY', 'CA', 'CH', 'CN', 'CO', 'CZ', 'DE', 'DK', 'DO', 'DZ', 'EE', 'ES', 'FI', 'FR', 'GB', 'GR', 'HR', 'HT', 'HU', 'ID', 'IE', 'IL', 'IN', 'IR', 'IS', 'IT', 'JP', 'KE', 'KR', 'LI', 'LK', 'LT', 'LU', 'LV', 'MG', 'MT', 'MX', 'MY', 'NL', 'NO', 'NP', 'NZ', 'PK', 'PL', 'PR', 'PT', 'RO', 'RU', 'SA', 'SE', 'SG', 'SI', 'SK', 'TH', 'TN', 'TW', 'UA', 'US', 'ZA', 'ZM'] OR 'any'. If 'any' is used, function will check if any of the locales match. Locale list is validator.isPostalCodeLocales."
    },
    {
        "function": "isRFC3339(str)",
        "documentation": "check if the string is a valid RFC 3339 date."
    },
    {
        "function": "isRgbColor(str [,options])",
        "documentation": "check if the string is a rgb or rgba color.\n\noptions is an object with the following properties\n\nincludePercentValues defaults to true. If you don't want to allow to set rgb or rgba values with percents, like rgb(5%,5%,5%), or rgba(90%,90%,90%,.3), then set it to false.\n\nallowSpaces defaults to true, which prohibits whitespace. If set to false, whitespace between color values is allowed, such as rgb(255, 255, 255) or even rgba(255,       128,        0,      0.7)."
    },
    {
        "function": "isSemVer(str)",
        "documentation": "check if the string is a Semantic Versioning Specification (SemVer)."
    },
    {
        "function": "isSurrogatePair(str)",
        "documentation": "check if the string contains any surrogate pairs chars."
    },
    {
        "function": "isUppercase(str)",
        "documentation": "check if the string is uppercase."
    },
    {
        "function": "isSlug(str)",
        "documentation": "check if the string is of type slug."
    },
    {
        "function": "isStrongPassword(str [, options])",
        "documentation": "check if the string can be considered a strong password or not. Allows for custom requirements or scoring rules. If returnScore is true, then the function returns an integer score for the password rather than a boolean.\nDefault options:\n{ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 }"
    },
    {
        "function": "isTime(str [, options])",
        "documentation": "check if the string is a valid time e.g. [23:01:59, new Date().toLocaleTimeString()].\n\noptions is an object which can contain the keys hourFormat or mode.\n\nhourFormat is a key and defaults to 'hour24'.\n\nmode is a key and defaults to 'default'.\n\nhourFormat can contain the values 'hour12' or 'hour24', 'hour24' will validate hours in 24 format and 'hour12' will validate hours in 12 format.\n\nmode can contain the values 'default', 'withSeconds', withOptionalSeconds, 'default' will validate HH:MM format, 'withSeconds' will validate the HH:MM:SS format, 'withOptionalSeconds' will validate 'HH:MM' and 'HH:MM:SS' formats."
    },
    {
        "function": "isTaxID(str, locale)",
        "documentation": "check if the string is a valid Tax Identification Number. Default locale is en-US.\n\nMore info about exact TIN support can be found in src/lib/isTaxID.js.\n\nSupported locales: [ 'bg-BG', 'cs-CZ', 'de-AT', 'de-DE', 'dk-DK', 'el-CY', 'el-GR', 'en-CA', 'en-GB', 'en-IE', 'en-US', 'es-AR', 'es-ES', 'et-EE', 'fi-FI', 'fr-BE', 'fr-CA', 'fr-FR', 'fr-LU', 'hr-HR', 'hu-HU', 'it-IT', 'lb-LU', 'lt-LT', 'lv-LV', 'mt-MT', 'nl-BE', 'nl-NL', 'pl-PL', 'pt-BR', 'pt-PT', 'ro-RO', 'sk-SK', 'sl-SI', 'sv-SE', 'uk-UA']."
    },
    {
        "function": "isURL(str [, options])",
        "documentation": "check if the string is a URL.\n\noptions is an object which defaults to { protocols: ['http','https','ftp'], require_tld: true, require_protocol: false, require_host: true, require_port: false, require_valid_protocol: true, allow_underscores: false, host_whitelist: false, host_blacklist: false, allow_trailing_dot: false, allow_protocol_relative_urls: false, allow_fragments: true, allow_query_components: true, disallow_auth: false, validate_length: true }.\n\nprotocols - valid protocols can be modified with this option.\nrequire_tld - If set to false isURL will not check if the URL's host includes a top-level domain.\nrequire_protocol - if set to true isURL will return false if protocol is not present in the URL.\nrequire_host - if set to false isURL will not check if host is present in the URL.\nrequire_port - if set to true isURL will check if port is present in the URL.\nrequire_valid_protocol - isURL will check if the URL's protocol is present in the protocols option.\nallow_underscores - if set to true, the validator will allow underscores in the URL.\nhost_whitelist - if set to an array of strings or regexp, and the domain matches none of the strings defined in it, the validation fails.\nhost_blacklist - if set to an array of strings or regexp, and the domain matches any of the strings defined in it, the validation fails.\nallow_trailing_dot - if set to true, the validator will allow the domain to end with a . character.\nallow_protocol_relative_urls - if set to true protocol relative URLs will be allowed.\nallow_fragments - if set to false isURL will return false if fragments are present.\nallow_query_components - if set to false isURL will return false if query components are present.\ndisallow_auth - if set to true, the validator will fail if the URL contains an authentication component, e.g. http://username:password@example.com.\nvalidate_length - if set to false isURL will skip string length validation. max_allowed_length will be ignored if this is set as false.\nmax_allowed_length - if set, isURL will not allow URLs longer than the specified value (default is 2084 that IE maximum URL length).\n"
    },
    {
        "function": "isULID(str)",
        "documentation": "check if the string is a ULID."
    },
    {
        "function": "isUUID(str [, version])",
        "documentation": "check if the string is an RFC9562 UUID.\nversion is one of '1'-'8', 'nil', 'max', 'all' or 'loose'. The 'loose' option checks if the string is a UUID-like string with hexadecimal values, ignoring RFC9565."
    },
    {
        "function": "isVariableWidth(str)",
        "documentation": "check if the string contains a mixture of full and half-width chars."
    },
    {
        "function": "isVAT(str, countryCode)",
        "documentation": "check if the string is a valid VAT number if validation is available for the given country code matching ISO 3166-1 alpha-2.\n\ncountryCode is one of ['AL', 'AR', 'AT', 'AU', 'BE', 'BG', 'BO', 'BR', 'BY', 'CA', 'CH', 'CL', 'CO', 'CR', 'CY', 'CZ', 'DE', 'DK', 'DO', 'EC', 'EE', 'EL', 'ES', 'FI', 'FR', 'GB', 'GT', 'HN', 'HR', 'HU', 'ID', 'IE', 'IL', 'IN', 'IS', 'IT', 'KZ', 'LT', 'LU', 'LV', 'MK', 'MT', 'MX', 'NG', 'NI', 'NL', 'NO', 'NZ', 'PA', 'PE', 'PH', 'PL', 'PT', 'PY', 'RO', 'RS', 'RU', 'SA', 'SE', 'SI', 'SK', 'SM', 'SV', 'TR', 'UA', 'UY', 'UZ', 'VE']."
    },
    {
        "function": "isWhitelisted(str, chars)",
        "documentation": "check if the string consists only of characters that appear in the whitelist chars."
    },
    {
        "function": "matches(str, pattern [, modifiers])",
        "documentation": "check if the string matches the pattern.\n\nEither matches('foo', /foo/i) or matches('foo', 'foo', 'i')."
    }
]

export default function getFunctionDocs(fnName:string){
  return documentation.find(it => it.function.startsWith(fnName))
}