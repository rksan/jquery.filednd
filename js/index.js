( function( $ ) {
	$( function() {
		var $document = $( document ),
			$file = $document.find( 'input[type=file]' ),
			$filednd = $file.filednd();

		var text = {
			org: '',
			before: '',
			done: '',
			fail: '',
			always: ''
		};

		//events demo
		$filednd.filednd('on', {
			'dropbefore': function($event){
				text.org = this.text();
				text.before = text.org + ' : dropbefore';
				this.text( text.before );
			},
			'dropdone': function($event){
				text.done = text.org + ' : dropdone';
				this.text( text.done );
			},
			'dropfail': function($event){
				text.fail = text.org + ' : dropfail';
				this.text( text.fail );
			},
			'dropalways': function($event){
				text.always = text.org + ' : dropalways';
				this.text( text.always );
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
