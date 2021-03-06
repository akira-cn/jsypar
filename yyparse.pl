#!/usr/bin/perl
use strict;

my $module = @ARGV[0] || print('parseYPJ [moduleName]') && exit(-1);

my $ypFile = $module.".yp";
my $pmFile = $module.".pm";

print "perl parseYPJ.pl ".$module."\n";
print "perl yapp.pl -o ".$ypFile." ".$pmFile."\n";
print "perl yp2js.pl ".$pmFile."\n";

system "perl parseYPJ.pl ".$module;
system "perl yapp.pl -o ".$pmFile." ".$ypFile;
system "perl yp2js.pl ".$pmFile;
