/**
 * YYParser-for-JavaScript
 * License LGPL
 *
 * This library is free software; you can redistribute it and/or modify it under the terms of the GNU Lesser General 
 * Public License as published by the Free Software Foundation; either version 2.1 of the License, or (at your option) 
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied 
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more 
 * details.
 *
 * @author Akira Wu
 * @version v_1.1 2008/09/20 16:36:27
 **/

/*
_status [{
	actions : {
		...
	}
	gotos : {
		...
	}
	Default : {
		...
	}
}]

_stack [
	state : ...
	token : {
		id:...,
		value:...
	}
]
*/

function YYParser(status, rules){

	this._stack = [{state:0,token:{id:"$start",value:0}}];  //initialize stack
	
	this._rules = rules;	//initialize rules
	this._status = status;	//initialize status

	this._source = '';

	this._errors = [];	//error stack
	this._errors.toString = function(){return this.join('\n');};

	this._lineno = 0;  //line no
	this._charoff = 0;  //character reading offset

	this._reduce = {}; //reduce check-table,check reduce-reduce recursion.
};

/**
 * the constructor of YYParser
 * you MAY OVERRIDE this method
 **/
YYParser.prototype.initialize = function(){
};

YYParser.prototype._Assert = function(cond, failMsg, recoverable){
	if(!cond)
		return this.Error(failMsg, recoverable);
	return true;
};

/**
 * get the tokens expected for current state.
 **/
YYParser.prototype.ExpectList = function(){		
	var stackTop = this._stack[this._stack.length - 1]; 
	var state = stackTop.state;		

	var act = this._status[state];
	var actions = act.actions;

	if(actions){
		return actions;
	}
	return {};
};
/**
 * check the token expected or not expected for current state
 **/
YYParser.prototype.ExpectFor = function(tokenID){	
	var stackTop = this._stack[this._stack.length - 1]; //read stack
	var state = stackTop.state;		//get current state
	var act = this._status[state];
	var actions = act.actions;
	
	return actions && (actions[tokenID] != null);
};

/**
 * @private
 * force the parser to proceed
 **/
YYParser.prototype._process = function(){
	var $me = this;
	var token = null;

	if(this._source == '') return;
	
	while(1){
		var stackTop = this._stack[this._stack.length - 1]; //read stack
		var state = stackTop.state;		//get current state

		if(state < 0) throw new Error('state in stack must >= 0');

		var act = this._status[state];	//get transition table
		token = this._lexer();	//read next token
	
		var nextState = null;
		
		if(act.actions){
			nextState = act.actions[token.id]; //try to get next state
		}
		if(nextState == null){
			nextState = act.Default;
		}
	
		if(nextState == null)	//still no state
		{
			if(token.value.toString() == '')	//if no input token, over
			{
				this.Error("reduce error: the code sequence is not accomplished.", false);
			}
			else
				this.Error("reduce error: unexpected token '" + token.id + "'.");
			token = null; //drop current token
		}

		if(nextState > 0) //shift
		{
			if(token.value.toString() == '') break;
			this._stack.push({state:nextState, token:token});	
			token = null;
		}
		else if(nextState <= 0)	//reduce
		{
			this.RecoverInput(); //restore back
			this._stack.push(_reduce(-nextState));
		}
	}
	function _reduce(ruleno)	//reduce token by rule
	{
		var rule = $me._rules[ruleno];

		if(ruleno in $me._reduce)
			$me.Error('reduce error: a reduce-reduce recursion accured.',true);

		$me._reduce[ruleno] = ruleno;
		

		//throw an error if there is no rule to reduce.
		if($me._Assert(rule!=null, "reduce error: no rule matched.",false)){	
			var token = {};
			token.id = rule[0];
			var stackpops = new Array(rule[1]);
			var reducer = rule[2];

			for(var i = 0; i < stackpops.length; i++){
				//pop tokens
				stackpops[stackpops.length-i-1] = $me._stack.pop().token;		
			}
			if(reducer){
				token.value = reducer([$me].concat(stackpops));
			}
			else{
				if(stackpops[i-1])
					token.value = stackpops[i-1].value;
			}

			var stackTop = $me._stack[$me._stack.length - 1]; 

			if($me._Assert(stackTop!=null,"reduce error: null stack error.",true)){
				
				//get current state from the top of stack
				var state = stackTop.state;

				//get reduce-gotos of current state
				var gotos = $me._status[state].gotos;	

				var newState = gotos[token.id] || stackTop.state;

				if($me._Assert(newState != null)){
					return {state:newState, token:token};		
				}
			}

		}
	}
}

/**
 *	Use this method to parse source code
 **/
YYParser.prototype.Parse = function(src){
	(src != null) && (this._source = src);
	
	this._lineno = 1;
	this._charoff = 0;
	this.Recovering();
	this.Errok();

	this._process();

	if(this._errors.length > 0){
		throw new Error(this._errors);
	}
	else{
		this.Accept();
		return this._stack[this._stack.length - 1].token.value;
	}
};

/**
 * default user lexer 
 * you MAY OVERRIDE this method
 **/
YYParser.prototype.Lexer = function(){
	return null;
};

/**
 * while no errors found during parsing, an accept method called by parser
 * you MAY OVERRIDE this method
 **/
YYParser.prototype.Accept = function(){
	if(this.onaccept) 
		if(false === this.onAccept()){
			return false;
		}
};

/**
 *	Recover parser to previous input state
 **/
YYParser.prototype.RecoverInput = function(){
	this._source = this._srcbak; 
	this._lineno = this._linenobak;
	this._charoff = this._charoffbak;
};

/**
 * default system lexer.
 **/
YYParser.prototype._lexer = function(){
	this._srcbak = this._source;
	this._linenobak = this._lineno;
	this._charoffbak = this._charoff;

	this._reduce = {};
	var tok = this._source.match(/^[\s\n\t]+/);
	var ln;
	if(tok){;
		if(ln = tok[0].match(/\n/g)){
			this._lineno += ln.length;
			this._charoff = 0;
		}
		if(tok = tok[0].match(/\n[^\n]*$/)){
			this._charoff += tok[0].length-1;
		}
	}

	this._source = this._source.replace(/^[\s\n\t]+/,'');
	
	tok = this.Lexer();

	if(!tok && (tok = this._source.match(/^./))){
		this._source = this._source.replace(/^./,'');
		this._charoff++;
		
		this._input = tok = {id:tok[0],value:tok[0]};
		return tok;
	}
	else if(tok){
		this._charoff += tok.value.toString().length;
		this._input = tok;
		return tok;
	}
	
	return {id:'',value:''};
};

/**
 * record an error cause by parser
 **/
YYParser.prototype.Error = function(errmsg, recoverable, check){
	if(this.onError) 
		if(this.onError(errmsg) === false){
			return false;
		}
	errmsg = errmsg || "unknown error.";
	check = check || "ERROR";

	if(recoverable == null) recoverable = true;

	var YYError = {
		lineno : this._lineno,		//rows the error found
		charoff : this._charoff,	//column the error found
		errmsg : errmsg,			//error message
		expect : this.ExpectList(),	//current expect list
		input : this._input.value||'',		//current input(token)
		check : check,
		toString : function(){
			return this.errmsg + "(row:" + this.lineno + ",column:" + this.charoff + ",near:'"+(this.input?this.input:'')+"')";
		}
	}

	this._errors.push(YYError);		//record error
	
	if(!recoverable){
		throw new Error(this._errors);
	}

	this._reduce = {};

	return false;
};

/**
 * clear error stack
 **/
YYParser.prototype.Errok = function(){	
	this._errors.length = 0;
};

/**
 *	drop current token and recover to state 0
 **/
YYParser.prototype.Recovering = function(){	

	//initialize stack
	this._stack = [{state:0,token:{id:"$start",value:0}}]; 
	this._reduce = {};
};

/**
 *	seize current parsing
 **/
YYParser.prototype.Abort = function(){	
	this.Error('parsing abort.',false,"ABORT");
};