$(document).ready(function() {
	var squares = "";
	var letterArray = ['a','b','c','d','e','f','g','h'];
	var turn = "white";
	
	for (i = 8; i > 0; i--) {
		squares += '<div class="chessRow">';
		for (j = 0; j < 8; j++) {
			squares += '<div class="chessSquare" id="' + letterArray[j] + i + '"></div>';
		}
		squares += '</div>'
	}
	$('#chessBoard').html(squares);
	
	var pieces = [
		['<div class="chessman white rook" id="wqr" title="Rook">&#9814;</div>','a1'],
		['<div class="chessman white knight" id="wqn" title="Knight">&#9816;</div>','b1'],
		['<div class="chessman white bishop" id="wqb" title="Bishop">&#9815;</div>','c1'],
		['<div class="chessman white queen" id="wq" title="Queen">&#9813;</div>','d1'],
		['<div class="chessman white king" id="wk" title="King">&#9812;</div>','e1'],
		['<div class="chessman white bishop" id="wqb" title="Bishop">&#9815;</div>','f1'],
		['<div class="chessman white knight" id="wkn" title="Knight">&#9816;</div>','g1'],		
		['<div class="chessman white rook"  id="wkr" title="Rook">&#9814;</div>','h1'],

		['<div class="chessman white pawn" id="wqrp" title="Pawn">&#9817;</div>','a2'],
		['<div class="chessman white pawn" id="wqnp" title="Pawn">&#9817;</div>','b2'],
		['<div class="chessman white pawn" id="wqbp" title="Pawn">&#9817;</div>','c2'],
		['<div class="chessman white pawn" id="wqp" title="Pawn">&#9817;</div>','d2'],
		['<div class="chessman white pawn" id="wkp" title="Pawn">&#9817;</div>','e2'],
		['<div class="chessman white pawn" id="wkbp" title="Pawn">&#9817;</div>','f2'],
		['<div class="chessman white pawn" id="wknp" title="Pawn">&#9817;</div>','g2'],
		['<div class="chessman white pawn" id="wkrp" title="Pawn">&#9817;</div>','h2'],
		
		['<div class="chessman black rook" id="wqr" title="Rook">&#9820;</div>','h8'],
		['<div class="chessman black knight" id="bqn" title="Knight">&#9822;</div>','g8'],
		['<div class="chessman black bishop" id="wqb" title="Bishop">&#9821;</div>','f8'],
		['<div class="chessman black king" id="bk" title="King">&#9818;</div>','e8'],
		['<div class="chessman black queen" id="bq" title="Queen">&#9819;</div>','d8'],
		['<div class="chessman black bishop" id="wqb" title="Bishop">&#9821;</div>','c8'],
		['<div class="chessman black knight" id="bkn" title="Knight">&#9822;</div>','b8'],		
		['<div class="chessman black rook"  id="bkr"  title="Rook">&#9820;</div>','a8'],

		['<div class="chessman black pawn" id="bqrp" title="Pawn">&#9823;</div>','h7'],
		['<div class="chessman black pawn" id="bqnp" title="Pawn">&#9823;</div>','g7'],
		['<div class="chessman black pawn" id="bqbp" title="Pawn">&#9823;</div>','f7'],
		['<div class="chessman black pawn" id="bqp" title="Pawn">&#9823;</div>','e7'],
		['<div class="chessman black pawn" id="bkp" title="Pawn">&#9823;</div>','d7'],
		['<div class="chessman black pawn" id="bkbp" title="Pawn">&#9823;</div>','c7'],
		['<div class="chessman black pawn" id="bknp" title="Pawn">&#9823;</div>','b7'],
		['<div class="chessman black pawn" id="bkrp" title="Pawn">&#9823;</div>','a7']
	]
	
	for (i = 0; i < pieces.length; i++) {
		$('#' + pieces[i][1]).html(pieces[i][0]);
	}

	$('.chessman').draggable({
		cursor: 'move',
		containment: "#chessBoard",
		revert: "valid",
		start: function(event,ui) {
			var row = parseInt($(this).parent().attr('id').substring(1));
			var column = $(this).parent().attr('id').substring(0,1);
			var columnPos = letterArray.indexOf(column);
			var validMoves = new Array();
			var color;
			var oppColor;
			
			if ($(this).hasClass('white')) {
				color = '.white';
				oppColor = '.black';
			} else {
				color = '.black';
				oppColor = '.white';
			}
			if ($(this).hasClass('pawn')) {
				if (color == '.white') {

					if ($('#' + column + (row + 1)).children().length) {
					} else {
						validMoves.push(column + (row + 1));
						if (row == 2) { //check if pawn is in starting row)
							if ($('#' + column + (row + 2)).children().length) {
							} else {
								validMoves.push(column + (row + 2));
							}
						}

					}
					
					if ($('#' + letterArray[columnPos + 1] + (row + 1)).children(oppColor).length) {
						validMoves.push(letterArray[columnPos + 1] + (row + 1));
					}

					if ($('#' + letterArray[columnPos - 1] + (row + 1)).children(oppColor).length) {
						validMoves.push(letterArray[columnPos - 1] + (row + 1));
					}
							
				} else {

					if ($('#' + column + (row - 1)).children().length) {
					} else {
						validMoves.push(column + (row - 1));
						if (row == 7) { //check if pawn is in starting row)
							if ($('#' + column + (row - 2)).children().length) {
							} else {
								validMoves.push(column + (row - 2));
							}
						}

					}
					
					if ($('#' + letterArray[columnPos + 1] + (row - 1)).children(oppColor).length) {
						validMoves.push(letterArray[columnPos + 1] + (row - 1));
					}

					if ($('#' + letterArray[columnPos - 1] + (row - 1)).children(oppColor).length) {
						validMoves.push(letterArray[columnPos - 1] + (row - 1));
					}
				}
			
			} else if ($(this).hasClass('knight')) {
					if (!$('#' + letterArray[columnPos + 1] + (row + 2)).children(color).length) {
						validMoves.push(letterArray[columnPos + 1] + (row + 2));
					}

					if (!$('#' + letterArray[columnPos - 1] + (row + 2)).children(color).length) {
						validMoves.push(letterArray[columnPos - 1] + (row + 2));
					}
					
					if (!$('#' + letterArray[columnPos + 2] + (row + 1)).children(color).length) {
						validMoves.push(letterArray[columnPos + 2] + (row + 1));
					}
					
					if (!$('#' + letterArray[columnPos + 2] + (row - 1)).children(color).length) {
						validMoves.push(letterArray[columnPos + 2] + (row - 1));
					}
					
					if (!$('#' + letterArray[columnPos - 2] + (row - 1)).children(color).length) {
						validMoves.push(letterArray[columnPos - 2] + (row - 1));
					}

					if (!$('#' + letterArray[columnPos - 2] + (row + 1)).children(color).length) {
						validMoves.push(letterArray[columnPos - 2] + (row + 1));
					}

					if (!$('#' + letterArray[columnPos + 1] + (row - 2)).children(color).length) {
						validMoves.push(letterArray[columnPos + 1] + (row - 2));
					}

					if (!$('#' + letterArray[columnPos - 1] + (row - 2)).children(color).length) {
						validMoves.push(letterArray[columnPos - 1] + (row - 2));
					}

			} else if ($(this).hasClass('bishop')) {

				var i = row + 1;
				var j = columnPos + 1;
	
				while ((i <= 8) && (j < 8)) {
					if ($('#' + letterArray[j] + i).children(color).length) {
							break;
						}
						validMoves.push(letterArray[j] + i);
			
						if ($('#' + letterArray[j] + i).children(oppColor).length) {
							break;
						}
					i++;
					j++;
				}

				i = row - 1;
				j = columnPos - 1;
	
				while ((i > 0) && (j >= 0)) {
					if ($('#' + letterArray[j] + i).children(color).length) {
							break;
						}
						validMoves.push(letterArray[j] + i);
	
						if ($('#' + letterArray[j] + i).children(oppColor).length) {
							break;
						}
					i--;
					j--;
				}

				i = row + 1;
				j = columnPos - 1;

				while ((i <= 8) && (j >= 0)) {
					if ($('#' + letterArray[j] + i).children(color).length) {
							break;
						}
						validMoves.push(letterArray[j] + i);
	
						if ($('#' + letterArray[j] + i).children(oppColor).length) {
							break;
						}
					i++;
					j--;
				}

				i = row - 1;
				j = columnPos + 1;
	
				while ((i > 0) && (j < 8)) {
					if ($('#' + letterArray[j] + i).children(color).length) {
							break;
						}
						validMoves.push(letterArray[j] + i);
	
						if ($('#' + letterArray[j] + i).children(oppColor).length) {
							break;
						}
					i--;
					j++;
				}


			} else if ($(this).hasClass('rook')) {
			
				for (i = row + 1; i <= 8; i++) { //higher rows
					if ($('#' + column + i).children(color).length) {
						break;
					}
					validMoves.push(column + i);

					if ($('#' + column + i).children(oppColor).length) {
						break;
					}
				}

				for (i = row - 1; i > 0; i--) { //lower rows
					if ($('#' + column + i).children(color).length) {
						break;
					}
					validMoves.push(column + i);

					if ($('#' + column + i).children(oppColor).length) {
						break;
					}
				}

				for (i = columnPos + 1; i < 8; i++) { //higher rows
					if ($('#' + letterArray[i] + row).children(color).length) {
						break;
					}
					validMoves.push(letterArray[i] + row);

					if ($('#' + letterArray[i] + row).children(oppColor).length) {
						break;
					}
				}

				for (i = columnPos - 1; i >= 0; i--) { //higher rows
					if ($('#' + letterArray[i] + row).children(color).length) {
						break;
					}
					validMoves.push(letterArray[i] + row);

					if ($('#' + letterArray[i] + row).children(oppColor).length) {
						break;
					}
				}

			} else if ($(this).hasClass('queen')) {
			
				var i = row + 1;
				var j = columnPos + 1;
	
				while ((i <= 8) && (j < 8)) {
					if ($('#' + letterArray[j] + i).children(color).length) {
							break;
						}
						validMoves.push(letterArray[j] + i);
	
						if ($('#' + letterArray[j] + i).children(oppColor).length) {
							break;
						}
						
					i++;
					j++;
				}

				i = row - 1;
				j = columnPos - 1;
	
				while ((i > 0) && (j >= 0)) {
					if ($('#' + letterArray[j] + i).children(color).length) {
							break;
						}
						validMoves.push(letterArray[j] + i);
	
						if ($('#' + letterArray[j] + i).children(oppColor).length) {
							break;
						}
						
					i--;
					j--;
				}

				i = row + 1;
				j = columnPos - 1;

				while ((i <= 8) && (j >= 0)) {
					if ($('#' + letterArray[j] + i).children(color).length) {
							break;
						}
						validMoves.push(letterArray[j] + i);
	
						if ($('#' + letterArray[j] + i).children(oppColor).length) {
							break;
						}
						
					i++;
					j--;
				}

				i = row - 1;
				j = columnPos + 1;
	
				while ((i > 0) && (j < 8)) {
					if ($('#' + letterArray[j] + i).children(color).length) {
							break;
						}
						validMoves.push(letterArray[j] + i);
	
						if ($('#' + letterArray[j] + i).children(oppColor).length) {
							break;
						}
						
					i--;
					j++;
				}
				
				for (i = row + 1; i <= 8; i++) { //higher rows
					if ($('#' + column + i).children(color).length) {
						break;
					}
					validMoves.push(column + i);

					if ($('#' + column + i).children(oppColor).length) {
						break;
					}
				}

				for (i = row - 1; i > 0; i--) { //lower rows
					if ($('#' + column + i).children(color).length) {
						break;
					}
					validMoves.push(column + i);

					if ($('#' + column + i).children(oppColor).length) {
						break;
					}
				}

				for (i = columnPos + 1; i < 8; i++) { //higher rows
					if ($('#' + letterArray[i] + row).children(color).length) {
						break;
					}
					validMoves.push(letterArray[i] + row);

					if ($('#' + letterArray[i] + row).children(oppColor).length) {
						break;
					}
				}

				for (i = columnPos - 1; i >= 0; i--) { //higher rows
					if ($('#' + letterArray[i] + row).children(color).length) {
						break;
					}
					validMoves.push(letterArray[i] + row);

					if ($('#' + letterArray[i] + row).children(oppColor).length) {
						break;
					}
				}		

			} else if ($(this).hasClass('king')) {

					if (!$('#' + letterArray[columnPos + 1] + row).children(color).length) {
						validMoves.push(letterArray[columnPos + 1] + row);
					}

					if (!$('#' + letterArray[columnPos - 1] + row).children(color).length) {
						validMoves.push(letterArray[columnPos - 1] + row);
					}

					if (!$('#' + column + (row + 1)).children(color).length) {
						validMoves.push(column + (row + 1));
					}

					if (!$('#' + column + (row - 1)).children(color).length) {
						validMoves.push(column + (row - 1));
					}

					if (!$('#' + letterArray[columnPos + 1] + (row + 1)).children(color).length) {
						validMoves.push(letterArray[columnPos + 1] + (row + 1));
					}

					if (!$('#' + letterArray[columnPos - 1] + (row + 1)).children(color).length) {
						validMoves.push(letterArray[columnPos - 1] + (row + 1));
					}

					if (!$('#' + letterArray[columnPos + 1] + (row - 1)).children(color).length) {
						validMoves.push(letterArray[columnPos + 1] + (row - 1));
					}

					if (!$('#' + letterArray[columnPos - 1] + (row - 1)).children(color).length) {
						validMoves.push(letterArray[columnPos - 1] + (row - 1));
					}
			
			}
			
			console.log(validMoves);
			for (i=0; i < validMoves.length; i++) {
				$('#' + validMoves[i]).addClass('validMove');
			}
		},
		stop: function(event,ui) {
			$('.chessSquare').removeClass('validMove');
		}
     }); 
	 
    $('.chessSquare').droppable({
		hoverClass: "hoverSquare",
		drop: function(event,ui) {
			var row = parseInt($(this).parent().attr('id').substring(1));
			var column = $(this).parent().attr('id').substring(0,1);
			var columnPos = letterArray.indexOf(column);
			var validMoves = new Array();
			var color;
			var oppColor;
			
			var legalMove = false;
			
			if ($(this).hasClass('validMove')) {
				legalMove = true;
			}
			
			var capture = false;
			if (legalMove) {
				//see if this leaves king in check
				if ($(this).children('.black').length) {
					$(this).children('.black').appendTo('#black_deck').draggable({'disabled': true});
					capture = true;
				} else if ($(this).children('.white').length) {
					$(this).children('.white').appendTo('#white_deck').draggable({'disabled': true});
					capture = true;
				}
				
				var startSquare = $(ui.draggable).parent().attr('id');
				$(ui.draggable).appendTo(this).css({
					'top': 0,
					'left': 0
				});

				var blackKingSquare = $('#chessBoard').find('#bk').parent().attr('id');
				var whiteKingSquare = $('#chessBoard').find('#wk').parent().attr('id');
				
				var pieceCode = "";
				
				if ($(ui.draggable).hasClass('pawn')) {

				} else if ($(ui.draggable).hasClass('bishop')) {
					pieceCode = "B";
				} else if ($(ui.draggable).hasClass('knight')) {
					pieceCode = "N";
				} else if ($(ui.draggable).hasClass('rook')) {
					pieceCode = "R";
				} else if ($(ui.draggable).hasClass('queen')) {
					pieceCode = "Q";
				} else if ($(ui.draggable).hasClass('king')) {
					pieceCode = "K";
				}

				var move = "";

				if (turn == "white") { //check if white king is in check
					if (isWhiteInCheck(whiteKingSquare)) { //white is in check
						$(ui.draggable).appendTo($('#' + startSquare)).css({
							'top': 0,
							'left': 0
						});
					alert("Your king is on check.");
					} else {

						if (capture) {
							move = '<li>' + pieceCode + startSquare + "x" + $(this).attr('id') + '</li>';						
						} else {
							move = '<li>' + pieceCode + startSquare + "-" + $(this).attr('id') + '</li>';
						}
						$('#movesList').append(move);
	
						turn = "black";
						$('#chessBoard').find('.black').draggable({'disabled': false});
						$("#chessBoard").find('.white').draggable({'disabled': true});
						$('button:first').html("Black's turn &#10003;");
					}

				} else {
					if (isBlackInCheck(blackKingSquare)) { //white is in check
						$(ui.draggable).appendTo($('#' + startSquare)).css({
							'top': 0,
							'left': 0
						});
					alert("Your king is on check.");
					} else {
						if (capture) {
							move = " " + pieceCode + startSquare + "x" + $(this).attr('id');
						} else {
							move = " " + pieceCode + startSquare + "-" + $(this).attr('id');
						}
						$('#movesList').children('li:last-child').append(move);

						turn = "white";
						$('#chessBoard').find('.black').draggable({'disabled': true});
						$('#chessBoard').find('.white').draggable({'disabled': false});
						$('button:first').html("White's turn &#10003;");
					}
				}
			}
		}
    });
	$("#chessBoard").find('.black').draggable({'disabled': true});
	$('button:first').html("White's turn &#10003;");
	
//Functions for the black and white kings	
	function isWhiteInCheck(whiteKingSquare) {
		var row = parseInt(whiteKingSquare.substring(1));
		var column = whiteKingSquare.substring(0,1);
		var columnPos = letterArray.indexOf(column);
	
		if ($('#' + letterArray[columnPos + 1] + row).children('.black:first').is('.king, .queen, .rook')) {
			return true;
		} else if ($('#' + letterArray[columnPos - 1] + row).children('.black:first').is('.king, .queen, .rook')) {
			return true;
		} else if ($('#' + column + (row + 1)).children('.black:first').is('.king, .queen, .rook')) {
			return true;
		} else if ($('#' + column + (row - 1)).children('.black:first').is('.king, .queen, .rook')) {
			return true;
		} else if ($('#' + letterArray[columnPos + 1] + (row + 1)).children('.black:first').is('.king, .queen, .pawn, .bishop')) {
			return true;
		} else if ($('#' + letterArray[columnPos - 1] + (row + 1)).children('.black:first').is('.king, .queen, .pawn, .bishop')) {
			return true;
		} else if ($('#' + letterArray[columnPos + 1] + (row - 1)).children('.black:first').is('.king, .queen, .bishop')) {
			return true;
		} else if ($('#' + letterArray[columnPos - 1] + (row - 1)).children('.black:first').is('.king, .queen, .bishop')) { //last adjacent square
			return true;
		} else if ($('#' + letterArray[columnPos + 1] + (row + 2)).children('.black:first').is('.knight')) { // first knight square
			return true;
		} else if ($('#' + letterArray[columnPos - 1] + (row + 2)).children('.black:first').is('.knight')) {
			return true;
		} else if ($('#' + letterArray[columnPos + 1] + (row - 2)).children('.black:first').is('.knight')) {
			return true;
		} else if ($('#' + letterArray[columnPos - 1] + (row - 2)).children('.black:first').is('.knight')) {
			return true;
		} else if ($('#' + letterArray[columnPos + 2] + (row + 1)).children('.black:first').is('.knight')) {
			return true;
		} else if ($('#' + letterArray[columnPos - 2] + (row + 1)).children('.black:first').is('.knight')) {
			return true;
		} else if ($('#' + letterArray[columnPos + 2] + (row - 1)).children('.black:first').is('.knight')) {
			return true;
		} else if ($('#' + letterArray[columnPos - 2] + (row - 1)).children('.black:first').is('.knight')) {
			return true;
		} 
		
//check for queen or bishop
		var i = row + 1;
		var j = columnPos + 1;

		while ((i <= 8) && (j < 8)) {
			if ($('#' + letterArray[j] + i).children().length) {
				if ($('#' + letterArray[j] + i).children('.black:first').is('.queen, .bishop')) {
					return true;
				} else {
					break;
				}
			}
				
			i++;
			j++;
		}

		i = row - 1;
		j = columnPos - 1;
		
		//
		while ((i > 0) && (j >= 0)) {
			if ($('#' + letterArray[j] + i).children().length) {
				if ($('#' + letterArray[j] + i).children('.black:first').is('.queen, .bishop')) {
					return true;
				} else {
					break;
				}
			}
				
			i--;
			j--;
		}

		i = row + 1;
		j = columnPos - 1;

		while ((i <= 8) && (j >= 0)) {
			if ($('#' + letterArray[j] + i).children().length) {
				if ($('#' + letterArray[j] + i).children('.black:first').is('.queen, .bishop')) {
					return true;
				} else {
					break;
				}
			}
			i++;
			j--;
		}

		i = row - 1;
		j = columnPos + 1;

		while ((i > 0) && (j < 8)) {
			if ($('#' + letterArray[j] + i).children().length) {
				if ($('#' + letterArray[j] + i).children('.black:first').is('.queen, .bishop')) {
					return true;
				} else {
					break;
				}
			}
			i--;
			j++;
		}
//end check for queen or bishop
		
		
//check for queen and rook
		for (i = row + 1; i <= 8; i++) { //higher rows
			if ($('#' + column + i).children().length) {
				if($('#' + column + i).children('.black:first').is('.queen, .rook')){
					return true;
				}
				else {
					break;
				}
			}
		}

		for (i = row - 1; i > 0; i--) { //lower rows
			if ($('#' + column + i).children().length) {
				if($('#' + column + i).children('.black:first').is('.queen, .rook')){
					return true;
				}
				else {
					break;
				}
			}
		}

		for (i = columnPos + 1; i < 8; i++) { //higher rows
			if ($('#' + letterArray[i] + row).children().length) {
				if ($('#' + letterArray[i] + row).children('.black:first').is('.queen, .rook')){
					return true;
				}
				else {
					break;
				}
			}
		}

		for (i = columnPos - 1; i >= 0; i--) { //higher rows
			if ($('#' + letterArray[i] + row).children().length) {
				if ($('#' + letterArray[i] + row).children('.black:first').is('.queen, .rook')){
					return true;
				}
				else {
					break;
				}
			}
		}
//end - check for queen and rook		


		return false;
	}

	function isBlackInCheck(blackKingSquare) {
		var row = parseInt(blackKingSquare.substring(1));
		var column = blackKingSquare.substring(0,1);
		var columnPos = letterArray.indexOf(column);
	
		if ($('#' + letterArray[columnPos + 1] + row).children('.white:first').is('.king, .queen, .rook')) {
			return true;
		} else if ($('#' + letterArray[columnPos - 1] + row).children('.white:first').is('.king, .queen, .rook')) {
			return true;
		} else if ($('#' + column + (row + 1)).children('.white:first').is('.king, .queen, .rook')) {
			return true;
		} else if ($('#' + column + (row - 1)).children('.white:first').is('.king, .queen, .rook')) {
			return true;
		} else if ($('#' + letterArray[columnPos + 1] + (row + 1)).children('.white:first').is('.king, .queen, .pawn, .bishop')) {
			return true;
		} else if ($('#' + letterArray[columnPos - 1] + (row + 1)).children('.white:first').is('.king, .queen, .pawn, .bishop')) {
			return true;
		} else if ($('#' + letterArray[columnPos + 1] + (row - 1)).children('.white:first').is('.king, .queen, .bishop')) {
			return true;
		} else if ($('#' + letterArray[columnPos - 1] + (row - 1)).children('.white:first').is('.king, .queen, .bishop')) { //last adjacent square
			return true;
		} else if ($('#' + letterArray[columnPos + 1] + (row + 2)).children('.white:first').is('.knight')) { // first knight square
			return true;
		} else if ($('#' + letterArray[columnPos - 1] + (row + 2)).children('.white:first').is('.knight')) {
			return true;
		} else if ($('#' + letterArray[columnPos + 1] + (row - 2)).children('.white:first').is('.knight')) {
			return true;
		} else if ($('#' + letterArray[columnPos - 1] + (row - 2)).children('.white:first').is('.knight')) {
			return true;
		} else if ($('#' + letterArray[columnPos + 2] + (row + 1)).children('.white:first').is('.knight')) {
			return true;
		} else if ($('#' + letterArray[columnPos - 2] + (row + 1)).children('.white:first').is('.knight')) {
			return true;
		} else if ($('#' + letterArray[columnPos + 2] + (row - 1)).children('.white:first').is('.knight')) {
			return true;
		} else if ($('#' + letterArray[columnPos - 2] + (row - 1)).children('.white:first').is('.knight')) {
			return true;
		} 
		
//check for queen or bishop
		var i = row + 1;
		var j = columnPos + 1;

		while ((i <= 8) && (j < 8)) {
			if ($('#' + letterArray[j] + i).children().length) {
				if ($('#' + letterArray[j] + i).children('.white:first').is('.queen, .bishop')) {
					return true;
				} else {
					break;
				}
			}
				
			i++;
			j++;
		}

		i = row - 1;
		j = columnPos - 1;
		
		//
		while ((i > 0) && (j >= 0)) {
			if ($('#' + letterArray[j] + i).children().length) {
				if ($('#' + letterArray[j] + i).children('.white:first').is('.queen, .bishop')) {
					return true;
				} else {
					break;
				}
			}
				
			i--;
			j--;
		}

		i = row + 1;
		j = columnPos - 1;

		while ((i <= 8) && (j >= 0)) {
			if ($('#' + letterArray[j] + i).children().length) {
				if ($('#' + letterArray[j] + i).children('.white:first').is('.queen, .bishop')) {
					return true;
				} else {
					break;
				}
			}
			i++;
			j--;
		}

		i = row - 1;
		j = columnPos + 1;

		while ((i > 0) && (j < 8)) {
			if ($('#' + letterArray[j] + i).children().length) {
				if ($('#' + letterArray[j] + i).children('.white:first').is('.queen, .bishop')) {
					return true;
				} else {
					break;
				}
			}
			i--;
			j++;
		}
//end check for queen or bishop
		
		
//check for queen and rook
		for (i = row + 1; i <= 8; i++) { //higher rows
			if ($('#' + column + i).children().length) {
				if($('#' + column + i).children('.white:first').is('.queen, .rook')){
					return true;
				}
				else {
					break;
				}
			}
		}

		for (i = row - 1; i > 0; i--) { //lower rows
			if ($('#' + column + i).children().length) {
				if($('#' + column + i).children('.white:first').is('.queen, .rook')){
					return true;
				}
				else {
					break;
				}
			}
		}

		for (i = columnPos + 1; i < 8; i++) { //higher rows
			if ($('#' + letterArray[i] + row).children().length) {
				if ($('#' + letterArray[i] + row).children('.white:first').is('.queen, .rook')){
					return true;
				}
				else {
					break;
				}
			}
		}

		for (i = columnPos - 1; i >= 0; i--) { //higher rows
			if ($('#' + letterArray[i] + row).children().length) {
				if ($('#' + letterArray[i] + row).children('.white:first').is('.queen, .rook')){
					return true;
				}
				else {
					break;
				}
			}
		}
		return false;
	}
//END - Functions for the black and white kings
// DIALOG ABOUT BOX 

var halfsc = $(window).height()/2; 
var halfh = $('.dialog').height() / 2;  
var halfscrn = screen.width/2; 
var halfobj = $('.dialog').width() / 2;  
var goRight =  halfscrn - halfobj ; 
var goBottom = halfsc - halfh; 
$('.dialog').css({marginLeft: goRight }).css({marginTop: goBottom });
$('.dialog').draggable();
$('.closeBar button').click(function(){
	$('.dialog').hide();				
});

//about button
$('button:nth-child(4)').click(function(){
	$('.dialog').show();
});
// END - DIALOG ABOUT BOX
});