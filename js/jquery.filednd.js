//
//use jquery.widget
//
( function( $ ) {

	//is inner object
	//naming rule
	// _[name] : property
	// [name]() : method
	var _widget = {
		_namespace: 'custom',

		namespace: function namespace() {
			return this._namespace;
		},

		_widgetname: 'filednd',

		widgetname: function widgetname(){
			return this._widgetname;
		},

		widgetfullname: function widgetfullname(){
			return this.namespace()+'.'+this.widgetname();
		},

		_roles: {
			//attr name
			'name': 'data-filedrop-role',
			//under : attr values
			'input': 'filedrop-input',
			'droparea': 'filedrop-droparea',
			'droparea-outer': 'filedrop-droparea-outer',
			'droparea-inner': 'filedrop-droparea-inner',
			'droparea-icon': 'filedrop-droparea-icon',
			'droparea-text': 'filedrop-droparea-text'
		},

		//getter .roles( [namespace][, roles] );
		//setter .roles( roles );
		//@param namespace : String
		//@param roles : plain object
		roles: function _widget_roles() {
			var namespace,
				roles;

			if ( arguments[ 0 ] ) {
				if ( typeof arguments[ 0 ] === 'string' ) {
					//get
					namespace = arguments[ 0 ];
					roles = ( arguments[ 1 ] || this._roles );

					var names = namespace.split( '.' );

					for ( var i = 0, len = names.length; i < len; i++ ) {
						roles = roles[ names[ i ] ];
					}

					return roles;

				} else if ( $.isPlainObject( arguments[ 0 ] ) ) {
					//set
					roles = arguments[ 0 ];

					return $.extend( true, this._roles, roles );
				}
			} else {
				//get
				return this._roles;
			}

		},

		dropareaouter: function _widget_dropareaouter( widget ) {
			var name = this.roles( 'name' );

			var $elem = widget.element,
				$outer = $elem.prev( '[' + name + '=' + this.roles( 'droparea-outer' ) + ']' );

			return $outer;
		},

		droparea: function _widget_droparea( widget ) {
			var name = this.roles( 'name' );

			var $outer = this.dropareaouter( widget ),
				$drop = $outer.find( '[' + name + '=' + this.roles( 'droparea' ) + ']' );

			if ( $drop.length === 0 ) {
				$drop = this.createdroparea( widget );
			}

			return $drop;
		},

		dropareainner: function _widget_dropareainner( widget ) {
			var name = this.roles( 'name' );

			var $drop = this.droparea( widget ),
				$inner = $drop.find( '[' + name + '=' + this.roles( 'droparea-inner' ) + ']' );

			return $inner;
		},

		createdroparea: function _widget_createdroparea( widget ) {
			var $elem = widget.element,
				options = widget.options;

			var name = this.roles( 'name' );

			var $outer = $( '<div />' )
				.attr( name, this.roles( 'droparea-outer' ) );

			widget._addClass( $outer, 'ui-widget' );

			var $drop = $( '<div />' )
				.attr( name, this.roles( 'droparea' ) );

			widget._addClass( $drop, widget.option( 'classes.ui-droppable' ) );

			var $inner = $( '<div />' )
				.attr( name, this.roles( 'droparea-inner' ) );

			widget._addClass( $inner, widget.option( 'classes.ui-droppable-text' ) );

			var $icon = this.createicon( widget )
				.attr( name, this.roles('droparea-icon') );

			var $text = $( '<span />' )
				.attr( name, this.roles( 'droparea-text' ) )
				.text( widget.option('text') || '' );

			$inner.append( $icon );
			$inner.append( $text );

			$outer.append( $drop.append( $inner ) );
			$elem.before( $outer );

			$elem
				.attr( name, this.roles( 'input' ) );

			widget._addClass( $elem, widget.option( 'classes.ui-droppable-input' ) );

			this.addAllEvents( $drop, widget );

			return $drop;
		},

		createicon: function( widget ){
			//create svg
			var ns = 'http://www.w3.org/2000/svg',
				svg = document.createElementNS( ns, 'svg' ),
				path = document.createElementNS( ns, 'path' );

			svg.appendChild( path );

			//setup svg
			svg.setAttribute( 'xmlns', ns );
			svg.setAttribute( 'width', '24' );
			svg.setAttribute( 'height', '24' );
			svg.setAttribute( 'viewBox', '0 0 24 24' );

			path.setAttribute( 'd', 'M16.5,6V17.5A4,4 0 0,1 12.5,21.5A4,4 0 0,1 8.5,17.5V5A2.5,2.5 0 0,1 11,2.5A2.5,2.5 0 0,1 13.5,5V15.5A1,1 0 0,1 12.5,16.5A1,1 0 0,1 11.5,15.5V6H10V15.5A2.5,2.5 0 0,0 12.5,18A2.5,2.5 0 0,0 15,15.5V5A4,4 0 0,0 11,1A4,4 0 0,0 7,5V17.5A5.5,5.5 0 0,0 12.5,23A5.5,5.5 0 0,0 18,17.5V6H16.5Z' );

			var $icon = $( '<span />' ).attr( _widget.roles( 'name' ), _widget.roles( 'droparea-icon' ) );

			$icon.append( svg );

			return $icon;
		},

		create: function _widget_create( widget ) {
			var $document = $( document ),
				name = this.namespace() + '.init';

			if ( $document.data( name ) !== true ) {
				$document.data( name, true );
				this.addAllEvents( $document, widget );
			}
		},

		//@param types : DataTransfer.types
		unacceptDataTransferType: function( types, widget ) {
			if ( !types ) {
				return types;
			}

			var accepts = ( widget.option( 'types' ) || [] );

			if ( typeof accepts === 'string' ) {
				accepts = accepts.split( ',' );
			}

			if ( accepts.length === 0 ) {
				//all accept
				return accepts;
			}

			var param = {
				types: []
			}

			$.each( types, function( idx, type ) {
				type = $.trim( type );

				if ( !param[ type ] ) {
					var isAccept = false;

					$.each( accepts, function( idx, accept ) {
						accept = $.trim( accept );

						if ( type === accept ) {
							isAccept = true;
							return false;
						}
					} );

					if ( isAccept === false ) {
						param[ type ] = true;
						param.types[ param.types.length ] = type;
					}

				}

			} );

			return param.types;
		},

		//@param types : DataTransfer.types
		IsAcceptDataTransferType: function( types, widget ) {
			var unaccept = this.unacceptDataTransferType( types, widget );

			if ( unaccept ) {
				return unaccept.length === 0 ? true : false;
			} else {
				return true;
			}
		},

		//@param files : DataTransfer.files
		unacceptFiles: function( files, widget ) {
			if ( !files ) {
				return;
			}

			var accepts = ( widget.option( 'accept' ) || [] );

			if ( typeof accepts === 'string' ) {
				accepts = accepts.split( ',' );
			}

			if ( accepts.length === 0 ) {
				return accepts;
			}

			var param = {
					files: [],
					regs: {}
				},
				_trim = $.trim;

			$.each( files, function( idx, file ) {
				var symbole = Symbol( file );

				if ( !param[ symbole ] ) {
					var isAccept = false;

					$.each( accepts, function( idx, accept ) {
						accept = _trim( accept );

						var text,
							reg;

						if ( accept.charAt( 0 ) === '.' ) {
							reg = param.regs[ Symbol( accept ) ] || new RegExp( accept + '$', 'ig' );
							text = file.name;
						} else {
							reg = param.regs[ Symbol( accept ) ] || new RegExp( accept, 'ig' );
							text = file.type;
						}

						if ( text.match( reg ) ) {
							isAccept = true;
							return false;
						}

					} );

					if ( isAccept === false ) {
						param[ symbole ] = true;
						param.files[ param.files.length ] = file;
					}

				}

			} );

			return param.files;
		},

		IsAcceptFiles: function( files, widget ) {
			var unaccept = this.unacceptFiles( files, widget );

			if ( unaccept ) {
				return unaccept.length === 0 ? true : false;
			} else {
				return true;
			}
		},

		addAllEvents: function($elem, widget){

			if( $elem[0].nodeType === Node.DOCUMENT_NODE ){
				//document
				widget._on( $elem, {
					'dragover': function( $event ) {
						var dt = $event.originalEvent.dataTransfer;
						//dt.effectAllowed = "none";
						dt.dropEffect = "none";
						return _widget.events.cancel.call( this.document[ 0 ], $event, this );
					},
					'drop': function( $event, data ) {
						return _widget.events.cancel.call( this.document[ 0 ], $event, this );
					}
				} );

			}else if($elem[0].nodeType === Node.ELEMENT_NODE){
				//HTML Element
				widget._on( $elem, {
					'dragover': function( $event ) {
						return _widget.events.dragover.call( this.element[ 0 ], $event, this );
					},

					'dragenter': function( $event ) {
						return _widget.events.dragenter.call( this.element[ 0 ], $event, this );
					},

					'dragleave': function( $event ) {
						return _widget.events.dragleave.call( this.element[ 0 ], $event, this );
					},

					'drop': function( $event ) {
						return _widget.events.drop.call( this.element[ 0 ], $event, this );
					},

					'click': function( $event ) {
						return _widget.events.click.call( this.element[ 0 ], $event, this );
					}
				});
			}

			return $elem;
		},

		events: {
			cancel: function _widget_events_cancel( $event, widget ) {

				$event.preventDefault();

				$event.stopPropagation();

				return false;
			},

			dragover: function _widget_events_dragover( $event, widget ) {

				var //The Datatransfer object of the original event
					dt = $event.originalEvent.dataTransfer;

				//Check if it is allowable Datatransfer
				if ( _widget.IsAcceptDataTransferType( dt.types, widget ) === true ) {
					dt.allowEffect = "copy";
					dt.dropEffect = "copy";
				}else{
					dt.allowEffect = "none";
					dt.dropEffect = "none";
				}

				return _widget.events.cancel.call( this, $event, widget );
			},

			dragenter: function( $event, widget ){

				var //Related elements (probably the element at the current pointer position)
					related = $event.relatedTarget,
					//Flag to be in the drag area
					fromoutside = true;

				//When there are related elements
				if( related ){
					//---------------------------
					//I'm still dragging in HTML
					//---------------------------
					var //Attribute name
						name = _widget.roles('name'),
						//Attribute value
						role = _widget.roles('droparea'),
						//Find a drop area that should be the parent element
						$parent = $(related).closest( '['+name+'='+role+']' );

					//If a drop area is found as a parent element,
					//it can be determined that it is a drag in the drop area
					if( $parent.length !== 0 ){
						//It is a drag in the drop area
						fromoutside = false;
					}
				}else{
					//----------------------------------------------
					//It seems that it went outside the HTML screen
					//----------------------------------------------
				}

				if( fromoutside === true ){
					//When adding a class
					//(Judging that it entered from outside the drag area, not dragging in the drag area)

					var //The Datatransfer object of the original event
						dt = $event.originalEvent.dataTransfer,
						//Class to add or delete
						css = {
							hover: widget.option( 'classes.ui-droppable-hover' ),
							fail: widget.option( 'classes.ui-droppable-fail' )
						},
						//droparea
						$drop = widget.droparea();

					//Check if it is allowable Datatransfer
					if ( _widget.IsAcceptDataTransferType( dt.types, widget ) === true ) {
						//drag done
						$drop.removeClass( css.fail );
						$drop.addClass( css.hover );

						widget._trigger('draghover', $event, widget);

					} else {
						//drag fail
						dt.allowEffect = "none";
						dt.dropEffect = "none";

						$drop.removeClass( css.hover );
						$drop.addClass( css.fail );

						widget._trigger('dragfail', $event, widget);
					}
				}

				//Cancel the default behavior
				return _widget.events.cancel.call( this, $event, widget );
			},

			dragleave: function( $event, widget ) {
				//console.log( $($event.target).attr( _widget.roles('name') )+'.dragleave' );

				var //Related elements (probably the element at the current pointer position)
					related = $event.relatedTarget,
					//Flag to be in the drag area
					fromoutside = true;

				//When there are related elements
				if( related ){
					//---------------------------
					//I'm still dragging in HTML
					//---------------------------
					var //Attribute name
						name = _widget.roles('name'),
						//Attribute value
						role = _widget.roles('droparea'),
						//Find a drop area that should be the parent element
						$parent = $(related).closest( '['+name+'='+role+']' );

					if( $parent.length !== 0 ){
						fromoutside = false;
					}
				}

				if( fromoutside === true ){
					var css = [
						widget.option( 'classes.ui-droppable-hover' ),
						widget.option( 'classes.ui-droppable-fail' )
					],
					$drop = widget.droparea();

					$drop.removeClass( css );
				}

				return _widget.events.cancel.call( this, $event, widget );
			},

			drop: function _widget_events_drop( $event, widget ) {

				widget._trigger('dropbefore', $event, widget);

				var dt = $event.originalEvent.dataTransfer,
					css = {
						hover: widget.option( 'classes.ui-droppable-hover' ),
						done: widget.option( 'classes.ui-droppable-done' ),
						fail: widget.option( 'classes.ui-droppable-fail' )
					},
					$drop = widget.droparea();

				if ( _widget.IsAcceptFiles( dt.files, widget ) === true ) {
					$drop
						.removeClass( [ css.hover, css.fail ] )
						.addClass( css.done );

					widget._trigger('dropdone', $event, widget);

					$drop.removeClass( css.done, 2000 );

				} else {
					$drop
						.removeClass( [ css.hover, css.done ] )
						.addClass( css.fail );

					widget._trigger('dropfail', $event, widget);

					$drop.removeClass( css.fail, 2000 );
				}

				widget._trigger('dropafter', $event, widget);

				return _widget.events.cancel.call( this, $event, widget );
			},

			click: function _widget_events_click( $event, widget ) {
				var $elem = widget.element;

				$elem.trigger( 'click' );

				return _widget.events.cancel.call( this, $event, widget );
			}
		}
	}// _widget end.

	//create widget
	var widget = $.widget( _widget.widgetfullname(), {
		options: {
			droparea: undefined,
			//property 'dataTransfer.type'
			types: [ 'Files' ],
			//attr 'input[type=file].accept'
			accept: [ 'image/*' ],
			//droparea text
			text: 'Tap to select a file or drag a file.',
			//class
			classes: {
				'ui-droppable-input': 'ui-helper-hidden',
				'ui-droppable': 'ui-widget-content ui-state-default ui-state-focus ui-corner-all',
				'ui-droppable-icon': '',
				'ui-droppable-text': '',
				'ui-droppable-outer': 'ui-widget',
				'ui-droppable-hover': 'ui-state-hover ui-state-highlight',
				'ui-droppable-done': 'ui-state-active',
				'ui-droppable-fail': 'ui-state-error',
				'ui-droppable-fail-text': 'ui-state-error-text'
			}
		},

		_init: function() {
			var $document = $( this.document ),
				selector = this.options.droparea,
				$drop;

			if ( !selector ) {
				$drop = _widget.droparea( this );
			} else if ( $.isFunction( selector ) ) {
				$drop = $( selector.call( this ) );
			} else {
				$drop = $( selector );
			}

			_widget.create( this );

			if ( $drop.length === 0 ) {
				$drop = _widget.droparea( this );
			}
		},

		//@override
		_addClass: function(element, keys, extra){
			if( $.isArray(keys) ){
				keys = keys.join(' ');
			}
			return this._super(element, keys, extra);
		},

		//@override
		_removeClass: function(element, keys, extra){
			if( $.isArray(keys) ){
				keys = keys.join(' ');
			}
			return this._super(element, keys, extra);
		},

		//@override
		_destroy: function() {
			_widget.dropareaouter( this )
				.remove();
		},

		//@override
		_enable: function(){
			this.droparea().removeClass('ui-state-disabled');
		},

		//@override
		_disabled: function(){
			this.droparea().addClass('ui-state-disabled');
		},

		on: function(suppressDisabledCheck, element, handlers){
			return this._on(suppressDisabledCheck, element, handlers);
		}

	} );

	$.extend( widget.prototype, {
		droparea: function() {
			return _widget.droparea( this );
		}
	} );

} )( window.jQuery );
