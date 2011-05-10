####################################################################
#
#    This file was generated using Parse::Yapp version 1.05.
#
#        Don't edit this file, use source file instead.
#
#             ANY CHANGE MADE HERE WILL BE LOST !
#
####################################################################
package Demo1;
use vars qw ( @ISA );
use strict;

@ISA= qw ( Parse::Yapp::Driver );
use Parse::Yapp::Driver;



sub new {
        my($class)=shift;
        ref($class)
    and $class=ref($class);

    my($self)=$class->SUPER::new( yyversion => '1.05',
                                  yystates =>
[
	{#State 0
		ACTIONS => {
			"b" => 3
		},
		DEFAULT => -2,
		GOTOS => {
			'S' => 2,
			'A' => 1
		}
	},
	{#State 1
		ACTIONS => {
			"b" => 3,
			";" => 5
		},
		GOTOS => {
			'A' => 4
		}
	},
	{#State 2
		ACTIONS => {
			'' => 6
		}
	},
	{#State 3
		DEFAULT => -4
	},
	{#State 4
		ACTIONS => {
			"b" => 3
		},
		GOTOS => {
			'A' => 7
		}
	},
	{#State 5
		ACTIONS => {
			"b" => 3
		},
		DEFAULT => -2,
		GOTOS => {
			'S' => 8,
			'A' => 1
		}
	},
	{#State 6
		DEFAULT => 0
	},
	{#State 7
		ACTIONS => {
			"a" => 9,
			"b" => 3
		},
		GOTOS => {
			'A' => 7
		}
	},
	{#State 8
		DEFAULT => -1
	},
	{#State 9
		DEFAULT => -3
	}
],
                                  yyrules  =>
[
	[#Rule 0
		 '$start', 2, undef
	],
	[#Rule 1
		 'S', 3, undef
	],
	[#Rule 2
		 'S', 0, undef
	],
	[#Rule 3
		 'A', 4, undef
	],
	[#Rule 4
		 'A', 1, undef
	]
],
                                  @_);
    bless($self,$class);
}

#line 18 "examples/demo1/Demo1.ypj.yp"


1;
