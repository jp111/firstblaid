var _text = "";
var _current_question = 0;
var _total_questions = 5;

function StrikeThrough(selector) {
	_text = $(selector).text();
	console.log(selector);
	console.log(_text);
	StrikeThroughInner(0, selector);
};

function StrikeThroughInner(index, selector) {
	if (index >= _text.length){
		_current_question = _current_question + 1;
		$(".confirm-question-wrapper").hide();
		$($(".confirm-question-wrapper")[_current_question]).show();
		if(_current_question == _total_questions){
			console.log("DONE");
			$(".confirm-button").hide();
			$(".cancel-donate").text("Cancel");
		}
		return false;
	}
	var sToStrike = _text.substr(0, index + 1);
	var sAfter = (index < (_text.length - 1)) ? _text.substr(index + 1, _text.length - index) : "";
	$(selector).html("<strike>" + sToStrike + "</strike>" + sAfter);
	window.setTimeout(function() {
			StrikeThroughInner(index + 1, selector);
			}, 5);
}

$(document).ready(function(){
		_total_questions = $(".confirm-question-wrapper").length - 1;
		$(".confirm-question-wrapper").hide();
		$($(".confirm-question-wrapper")[_current_question]).show();
		$(".cancel-donate").click(function(){
			_current_question = 0;
			$(".confirm-question-wrapper").hide();
			$($(".confirm-question-wrapper")[_current_question]).show();
			$.each($(".confirm-question"),function(e,v){
				$(v).text($(v).text());
				});
			$(".confirm-button").show();
			$(".confirm-button").text("Nah!");
			$(".confirm-button").prepend("<i class=\"icon-ok icon-white\"></i> ");
			$(this).text("Oops!");
			$(this).prepend("<i class=\"icon-remove\"></i> ");
			$($(".checkmark")).removeClass('icon-ok');
			$($(".checkmark")).addClass('icon-chevron-right');
			});
		$(".confirm-button").click(function(){
			// console.log($(this).data('id'));
			$($(".checkmark")[_current_question]).removeClass('icon-chevron-right');
			$($(".checkmark")[_current_question]).addClass('icon-ok');
			StrikeThrough($(".confirm-question")[_current_question]);
			});
});
