XPath for JavaScript v1.0

֧�ֵ����ԣ�
·����
/ ����·��
  ���·��
. ��ǰ·��
..�ϼ�·��

�ж��ʣ�
�᣺child��descendant��self��attribute��parent��ancestor��descendant-or-self��ancestor-or-self
NodeType��comment()|text()|processing-instruction()|node()

��������
��: self��attribute
������id()��position()��NodeType��last()��count()��string()��concat()��substring()��strlen()��
boolean()��not()��true()��false()��number()��floor()��ceiling()��round()��array()

�Ǳ�׼�Ĳ���(��չ)
strlen()�������൱��string-length()
array()����
!Expr���൱��not(Expr)
������ʽ�� m?/expr/��s/expr/replace/��Expr =~ m?/expr/��Expr =~ s/expr/replace/
�ⲿ������ window::alert ���д ::alert

���ӣ�
/body/div/child::*	�õ�body�µ�����divԪ�ص����ж���
/body/div[1]		�õ�body�µĵ�һ��div����
/body/div/*[id()='abc']	�õ�body�µ�����divԪ�صĶ�����id='abc'���Ǹ�
/body/div//text()	�õ�body/div�����������е�TextNode�ڵ�
/body/div/*[position()>$pos]	
�õ�body�µ�����divԪ����position����$pos���Ǹ�������$pos��ͨ��[XPathObj].assign('pos',<num>)��ֵ�ı���
/body/div/*[::alert(count())]	alert��/body/div��div���ӵĸ���
/body/div/child::*[/^d/]	�õ�body�µ�����divԪ�ص����ж�����tagName����ĸ'd'��ͷ��Ԫ��
/body/div/child::*[@name='abc']	�õ�body�µ�����divԪ�ص����ж�����name���Ե���'abc'��Ԫ��
/body/div/child::*[@name=~/^abc/]	�õ�body�µ�����divԪ�ص����ж�����name������'abc'��ͷ��Ԫ��
/body/div/child::*[@name=('abc'=~s/^a/x/)]	�õ�body�µ�����divԪ�ص����ж�����name���Ե���'xbc'��Ԫ��	

������д 
~axis <=> axis::*
#id -> ���ٲ���Ԫ��id
.class -> ���ٲ���Ԫ��class