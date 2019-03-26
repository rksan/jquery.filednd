( function( $ ) {
	$( function() {
		var $document = $( document ),
			$file = $document.find( 'input[type=file]' ),
			$drop = $file.filednd();
/*
		$file.on( 'filedropdraghover', function($event, widget){

			console.log( 'drophover' );

		} );
		*/
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

	} );
} )( window.jQuery );
