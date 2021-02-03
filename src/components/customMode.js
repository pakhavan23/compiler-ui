export class Custom extends window.ace.acequire('ace/mode/text_highlight_rules') .TextHighlightRules {
    
	constructor(){
        super();
        var keywordMapper = this.createKeywordMapper({
            "keyword": "Ashari \n Harf \n Sahih \n agar \n ta \n &B \n &BM \n &K \n &KM \n &MM \n Jam \n YekiBala \n Kam \n YekiPain \n Zarb \n Tagsim \n Bagimonde \n Benevis \n Begir ",  
        }, "text", true, " ");
		this.$rules = {
			"start": [{
                token: 'constant.numeric', // hex
                regex: /0[xX][0-9a-fA-F]+|[xX]'[0-9a-fA-F]+'|0[bB][01]+|[bB]'[01]+'/
              }, {
                token: 'constant.numeric', // float
                regex: '[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b'
              },{
                token: 'keyword',
                regex:  "[\\[({]"
              },{
                token: 'keyword',
                regex: "[\\])}]"
              },{
				token: "string",
				regex: '".*?"'
			  }, {
                token: 'string',
                regex: "'.*?'"
              }, {
                token : keywordMapper,
                 regex : "\\b\\w+\\b"
                },
            ]
		};
	}
}

export default class CustomMode extends window.ace.acequire('ace/mode/text').Mode {
	constructor() {
		super();
		this.HighlightRules = Custom;
	}
}