  class Parser {
    constructor() {}

    _parseFromString(xmlText) {
        xmlText = this._encodeCDATAValues(xmlText);
        let cleanXmlText = xmlText.replace(/\s{2,}/g, ' ').replace(/\\t\\n\\r/g, '').replace(/>/g, '>\n').replace(/\]\]/g, ']]\n');
        let rawXmlData = [];

        cleanXmlText.split('\n').map(element => {
            element = element.trim();

            if (!element || element.indexOf('?xml') > -1) {
                return;
            }

            if (element.indexOf('<') == 0 && element.indexOf('CDATA') < 0) {
                let parsedTag = this._parseTag(element);

                rawXmlData.push(parsedTag);

                if (element.match(/\/\s*>$/)) {
                    rawXmlData.push(this._parseTag('</' + parsedTag.name + '>'));
                }
            } else {
                rawXmlData[rawXmlData.length - 1].value += ` ${this._parseValue(element)}`;
            }

        });
        return this._convertTagsArrayToTree(rawXmlData)[0];
    }

    _encodeCDATAValues(xmlText) {
        let cdataRegex = new RegExp(/<!\[CDATA\[([^\]\]]+)\]\]/gi);
        let result = cdataRegex.exec(xmlText);
        while (result) {
            if (result.length > 1) {
                xmlText = xmlText.replace(result[1], encodeURIComponent(result[1]));
            }
            
            result = cdataRegex.exec(xmlText);
        }

        return xmlText;
    }

    _getElementsByTagName(tagName) {
        let matches = [];

        if (tagName == '*' || this.name.toLowerCase() === tagName.toLowerCase()) {
            matches.push(this);
        }

        this.children.map(child => {
            matches = matches.concat(child.getElementsByTagName(tagName));
        });

        return matches;
    }

    _parseTag(tagText, parent) {
        let cleanTagText = tagText.match(/([^\s]*)=('([^']*?)'|"([^"]*?)")|([\/?\w\-\:]+)/g);

        let tag = {
            name: cleanTagText.shift().replace(/\/\s*$/, ''),
            attributes: {},
            children: [],
            value: '',
            getElementsByTagName: this._getElementsByTagName
        };

        cleanTagText.map(attribute => {
            let attributeKeyVal = attribute.split('=');

            if (attributeKeyVal.length < 2) {
                return;
            }

            let attributeKey = attributeKeyVal[0];
            let attributeVal = '';

            if (attributeKeyVal.length === 2) {
                attributeVal = attributeKeyVal[1];
            } else {
                attributeKeyVal = attributeKeyVal.slice(1);
                attributeVal = attributeKeyVal.join('=');
            }
            tag.attributes[attributeKey] = 'string' === typeof attributeVal ? (attributeVal.replace(/^"/g, '').replace(/^'/g, '').replace(/"$/g, '').replace(/'$/g, '').trim()) : attributeVal;

            if (tag.attributes.href) {
                tag.value = tag.attributes.href
            }
        });

        return tag;
    }

    _parseValue(tagValue) {
        if (tagValue.indexOf('CDATA') < 0) {
            return tagValue.trim();
        }

        return tagValue.substring(tagValue.lastIndexOf('[') + 1, tagValue.indexOf(']'));
    }

    _convertTagsArrayToTree(xml) {
        let xmlTree = [];
        while(xml.length > 0) {
            let tag = xml.shift();

            if (tag.value.indexOf('</') > -1 || tag.name.match(/\/$/)) {
                // debugger;
                tag.name = tag.name.replace(/\/$/, '').trim();
                tag.value = tag.value.substring(0, tag.value.indexOf('</')).trim();
                xmlTree.push(tag);
                continue;
            } else {
                tag.value = tag.value.replace(/>/g, '');
            }

            if (tag.name.indexOf('/') == 0) {
                break;
            }

            xmlTree.push(tag);
            tag.children = this._convertTagsArrayToTree(xml);
            tag.value = decodeURIComponent(tag.value.trim());
        }
        return xmlTree;
    }

    _toString(xml) {
        let xmlText = this._convertTagToText(xml);


        if (xml.children.length > 0) {
            xml.children.map(child => {
                xmlText += this._toString(child);
            });

            xmlText += '</' + xml.name + '>';
        }

        return xmlText;
    }

    // _convertTagToText(tag) {
    //     let tagText = '<' + tag.name;
    //     let attributesText = [];

    //     for (let attribute in tag.attributes) {
    //         tagText += ' ' + attribute + '="' + tag.attributes[attribute] + '"';
    //     }

    //     if (tag.value.length > 0) {
    //         tagText += '>' + tag.value;
    //     } else {
    //         tagText += '>';
    //     }

    //     if (tag.children.length === 0) {
    //         tagText += '</' + tag.name + '>';
    //     }

    //     return tagText;
    // }

    parseFromString(xmlText) {
        return this._parseFromString(xmlText);
    }

    toString(xml) {
        return this._toString(xml);
    }
};
export default Parser;

