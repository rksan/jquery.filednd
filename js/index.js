( function( $ ) {
	$( function() {
		var $document = $( document ),
			$file = $document.find( 'input[type=file]' ),
			$filednd = $file.filednd();

		$filednd.filednd('on', {
			'dropbefore': function($event){
				console.log( $event.type );
				return false;
			},
			'dropdone': function($event){
				console.log( $event.type );
			},
			'dropfail': function($event){
				console.log( $event.type );
			},
			'dropafger': function($event){
				console.log( $event.type );
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

	} );
} )( window.jQuery );
