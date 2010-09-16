#!/usr/bin/perl
use strict;

my $file = @ARGV[0] || die('arguments error');

if($file){
	open(FILE, $file) || die('open file error!');
}

my $out = $file.".js";
open(OUT, ">".$out) || die('open file error!');


my $ctag = 0;
my $ltag = 0;
my $stag = 0;
my $pname;
while(<FILE>){
	if(/^package ([\w]+)/){
		print OUT "function ".$1."(){this.initialize();};".$1.".prototype = new YYParser(";
		$pname = $1;
	}
	if(/^\[/ or /^\]\,/){
		$ctag++;
		if($ctag == 4){
			print OUT "]);\n";
		}
	}
	if(/^\{\%/){
		$ltag++;
		print OUT $pname.".prototype.Lexer = function(){var tok;";
	}
	if(/^__endscript__/){
		$stag = 0;
	}
	if($ctag > 0 && $ctag < 4){
		s/\#State/\/\/State/;
		s/\#Rule/\/\/Rule/;
		s/\#line/\/\/line/;
		s/yyrules  =>//;
		s/\=\>/\:/;
		s/ACTIONS/actions/;
		s/GOTOS/gotos/;
		s/DEFAULT/Default/;
		s/^sub\n/function(\$_)/;
		s/(^|\s)undef(?=\s|$)/undefined/;
		print OUT $_;
	}
	if($ltag == 1){
		if(/(\w+)\s*:\s*(\%expect\%)?\s*([^\s]+)(\s+{(.+)})?/){
			my $prec = '';
			if($4){
				$prec = "tok[0]=".$5."(tok[0]);";
			}
			if($2){
				print OUT "if(this.ExpectFor('".$1."')){";
			}
			print OUT "if(tok = this._source.match(".$3.")){".$prec."this._source = this._source.replace(".$3.",'');return{id:'".$1."',value:tok[0]};}";
			if($2){
				print OUT "}";
			}
		}
	}
	if(/^\%\}/){
		$ltag++;
		print OUT "};";
	}
	if($stag == 1){
		print OUT $_;
	}
	if(/^__script__/){
		$stag = 1;
		print OUT "\n";
	}
}

close(FILE);
close(OUT);