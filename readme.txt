What is YYParser?
-------------------------------------
YYParser is a yacc engine based on Parse::Yapp(a perl module of yacc, the LALR(1) parser).
You can use YYParser to generate any parser of LALR(1) gammar.

How to use YYParser for JavaScript?
-------------------------------------
0. install Yapp for perl.(use lib file or http://search.cpan.org/~fdesar/Parse-Yapp-1.05/lib/Parse/Yapp.pm)

1. build up a ypj file(yacc phase javascript description file)
2. run command:
> perl yyparser.pl <myfile>.ypj
to get <myfile>.yp.pm.js

3. use YYParser.js and <myfile>.yp.pm.js in your html files.

For more detail, see examples.  