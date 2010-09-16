XPath for JavaScript v1.0

支持的特性：
路径：
/ 绝对路径
  相对路径
. 当前路径
..上级路径

判定词：
轴：child、descendant、self、attribute、parent、ancestor、descendant-or-self、ancestor-or-self
NodeType：comment()|text()|processing-instruction()|node()

过滤器：
轴: self、attribute
函数：id()、position()、NodeType、last()、count()、string()、concat()、substring()、strlen()、
boolean()、not()、true()、false()、number()、floor()、ceiling()、round()、array()

非标准的部分(扩展)
strlen()函数，相当于string-length()
array()函数
!Expr，相当于not(Expr)
正则表达式： m?/expr/、s/expr/replace/、Expr =~ m?/expr/、Expr =~ s/expr/replace/
外部函数： window::alert 或简写 ::alert

例子：
/body/div/child::*	得到body下的所有div元素的所有儿子
/body/div[1]		得到body下的第一个div儿子
/body/div/*[id()='abc']	得到body下的所有div元素的儿子中id='abc'的那个
/body/div//text()	得到body/div下子孙中所有的TextNode节点
/body/div/*[position()>$pos]	
得到body下的所有div元素中position大于$pos的那个，其中$pos是通过[XPathObj].assign('pos',<num>)赋值的变量
/body/div/*[::alert(count())]	alert出/body/div下div儿子的个数
/body/div/child::*[/^d/]	得到body下的所有div元素的所有儿子中tagName以字母'd'开头的元素
/body/div/child::*[@name='abc']	得到body下的所有div元素的所有儿子中name属性等于'abc'的元素
/body/div/child::*[@name=~/^abc/]	得到body下的所有div元素的所有儿子中name属性以'abc'开头的元素
/body/div/child::*[@name=('abc'=~s/^a/x/)]	得到body下的所有div元素的所有儿子中name属性等于'xbc'的元素	

新增缩写 
~axis <=> axis::*
#id -> 快速查找元素id
.class -> 快速查找元素class