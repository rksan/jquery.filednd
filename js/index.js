( function( $ ) {
	$( function() {
		var $document = $( document ),
			$file = $document.find( 'input[type=file]' ),
			//Initialize
			$filednd = $file.filednd();

		var text = {
			org: $filednd.filednd( 'text' ),
			before: '',
			done: '',
			fail: '',
			always: ''
		};

		//events demo
		$filednd.filednd('on', {
			'draghover': function($event, widget){
				var types = $event.originalEvent.originalEvent.dataTransfer.types;
				console.log( '['+types.join(',')+']' );
				text.before = text.org + ' : draghover';
				widget.text( text.before );
			},
			'dragfail': function($event, widget){
				text.before = text.org + ' : dragfail';
				widget.text( text.before );
			},
			'dropbefore': function($event, widget){
				text.before = text.org + ' : dropbefore';
				widget.text( text.before );
			},
			'dropdone': function($event, widget){
				text.done = text.org + ' : dropdone';
				widget.text( text.done );
			},
			'dropfail': function($event, widget){
				text.fail = text.org + ' : dropfail';
				widget.text( text.fail );
			},
			'dropalways': function($event, widget){
				text.always = text.org;
				widget.text( text.always );
			}
		});

		$document.find( '#btn1' )
			.on( 'click', function( $event ) {
				$( 'input[type=file]' )
					.filednd();
				return false;
			} );

		$document.find( '#btn2' )
			.on( 'click', function( $event ) {
				$( 'input[type=file]' )
					.filednd( 'destroy' );
				return false;
			} );

		$document.find( '#btn3' )
			.on( 'click', function( $event ) {
				$( 'input[type=file]' )
					.filednd( 'enable' );
				return false;
			} );

		$document.find( '#btn4' )
			.on( 'click', function( $event ) {
				$( 'input[type=file]' )
					.filednd( 'disable' );
				return false;
			} );

		$document.find( '#btn5' )
			.on( 'click', function( $event ){
				$( 'input[type=file]' )
					.filednd( {
						options: {
							accepts: ['text/*', '.txt', '.text']
						}
					} );
				return false;
			});
	} );
} )( window.jQuery );
