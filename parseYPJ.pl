#!/usr/bin/perl
use strict;

my $file = @ARGV[0] || print('parseYPJ [fileName]') && exit(-1);

if($file){
	open(FILE, $file) || die('open file error!');
}

my $out = $file.".yp";
open(OUT, ">".$out) || die('open file error!');

while(<FILE>){
	s/\#Lexical definitions/sub _Error{}\nsub _Lexer{}\n\__END__\n\#Lexical definitions/;
	print OUT $_;
}

close(FILE);
close(OUT);