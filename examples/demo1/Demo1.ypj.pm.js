function Demo1(){this.initialize();};Demo1.prototype = new YYParser([
	{//State 0
		actions : {
			"b" : 3
		},
		Default : -2,
		gotos : {
			'S' : 2,
			'A' : 1
		}
	},
	{//State 1
		actions : {
			"b" : 3,
			";" : 5
		},
		gotos : {
			'A' : 4
		}
	},
	{//State 2
		actions : {
			'' : 6
		}
	},
	{//State 3
		Default : -4
	},
	{//State 4
		actions : {
			"b" : 3
		},
		gotos : {
			'A' : 7
		}
	},
	{//State 5
		actions : {
			"b" : 3
		},
		Default : -2,
		gotos : {
			'S' : 8,
			'A' : 1
		}
	},
	{//State 6
		Default : 0
	},
	{//State 7
		actions : {
			"a" : 9,
			"b" : 3
		},
		gotos : {
			'A' : 7
		}
	},
	{//State 8
		Default : -1
	},
	{//State 9
		Default : -3
	}
],
                                  
[
	[//Rule 0
		 '$start', 2,undefined
	],
	[//Rule 1
		 'S', 3,undefined
	],
	[//Rule 2
		 'S', 0,undefined
	],
	[//Rule 3
		 'A', 4,undefined
	],
	[//Rule 4
		 'A', 1,undefined
	]
]);
