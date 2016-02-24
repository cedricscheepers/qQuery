"use strict";

/*
	Name			.matches
	Description		Polyfill for the javascript .matches() function
	Language		Javascript
*/

this.Element && function(ElementPrototype) {
    ElementPrototype.matches = ElementPrototype.matches ||
    ElementPrototype.matchesSelector ||
    ElementPrototype.webkitMatchesSelector ||
    ElementPrototype.msMatchesSelector ||
    function(selector) {
        var node = this, nodes = (node.parentNode || node.document).querySelectorAll(selector), i = -1;
        while (nodes[++i] && nodes[i] != node);
        return !!nodes[i];
    }
} (Element.prototype);

/*
	Name			isset
	Description		Global function to test is variables are set (i.e. !undefined && !null)
	Language		Javascript
*/

function isset(obj, hasContent) {
	return obj !== undefined && obj !== null &&
			(hasContent === undefined || hasContent === null ? true : (isNaN(obj) ? obj !== '' : parseFloat(obj) > 0));
}

/*
	Name			not applicable
	Description		JQuery-like object to manipulate DOM Elements
	Language		Javascript
 	More info		https://bjarneo.codes/how-to-create-a-simple-javascript-library-like-jquery/
*/

(function () {

	var Q = function (params) {
		return new Library(params);
	};
	
	var Library = function (params) {
		
		if (typeof params === 'string') {
			var selector = document.querySelectorAll(params),
				counter;
			
			this.length = selector.length;
			
			// Add selector to object for method chaining
			for (counter = 0; counter < this.length; counter++) {
				this[counter] = selector[counter];
			}
		} else {
			this.length = 1;
			
			this[0] = params;
		}
		
		// Return as object
		return this;        
	};
	 
	Q.fn = Library.prototype = {
		
		/*
			Name			addClass()
			Description		Adds a class to the objects
		 	Input			className TEXT
			Language		Javascript
		*/
		
		addClass: function (classNames) {
			var arr = classNames.split(' '),
				total = arr.length,
				counter,
				count;
			
			for (counter = 0; counter < this.length; counter++) {
				
				for (count = 0; count < total; count++) {
					
					if (!this[counter].classList.contains(arr[count])) {
						this[counter].classList.add(arr[count]);
					}
				}
			}
			
			// Return this to allow chained methods
			return this;
		},

		/*
			Name			append()
			Description		Either append text to innerHTML, or append node
		 	Input			params
			Language		Javascript
		*/
		
		append: function (params) {

			for (var counter = 0; counter < this.length; counter++) {
				
				if (typeof params === 'string') {
					this[counter].innerHTML += params;
				} else {
					this[counter].appendChild(params);
				}
			}
			
			// Return this to allow chained methods
			return this;
		},
		
		/*
			Name			attr()
			Description		GET / SET the objects attribute
		 	Input			property TEXT, value TEXT
			Output			GET:	Property value
							SET:	TRUE if successful
			Language		Javascript
		*/
		
		attr: function (property, value) {
			var counter,
				variable;
			
			for (counter = 0; counter < this.length; counter++) {
				
				if (isset(value)) {
					
					switch (property.toLowerCase()) {
						case 'checked':
							this[counter].checked = value;
							
							break;
							
						case 'contenteditable':
							this[counter].contentEditable = value;
							
							break;
							
						case 'disabled':
							this[counter].disabled = value;
						
							break;
							
						case 'id':
							this[counter].id = value;
						
							break;
							
						case 'required':
							this[counter].required = value;
						
							break;
							
						case 'selected':
							this[counter].selected = value;
						
							break;
							
						case 'text':
							this[counter].textContent = value;
						
							break;

						default:
							this[counter].setAttribute(property, value);
					}
				} else {
					switch (property.toLowerCase()) {
						case 'checked':
							variable = this[counter].checked || false;
							
							break;
							
						case 'contenteditable':
							variable = this[counter].contentEditable;
							
							break;
							
						case 'disabled':
							variable = this[counter].disabled || false;
							
							break;
							
						case 'id':
							variable = this[counter].id;
							
							break;
							
						case 'required':
							variable = this[counter].required || false;
							
							break;
							
						case 'selected':
							variable = this[counter].selected || false;
							
							break;
							
						case 'text':
							variable = this[counter].textContent;
							
							break;
							
						default:
							variable = this[counter].getAttribute(property);
					}
				}
			}
			
			// Return this to allow chained methods
			return isset(value) ? this : variable;
		},

		/*
			Name			css()
			Description		Sets the objects style
		 	Input			NONE
			Language		Javascript
		*/
		
		css: function (style) {

			for (var counter = 0; counter < this.length; counter++) {
				
				if (typeof this[counter].style.cssText !== undefined) {
					this[counter].style.cssText = style;
				} else {
					this[counter].setAttribute('style', style);
				}
			}
			
			// Return this to allow chained methods
			return this;
		},

		/*
			Name			find()
			Description		Finds all descendants of an element that meets params
		 	Input			params TEXT
		 	Output			DOM Objects
			Language		Javascript
		*/
		
		find: function (params) {
			var counter,
				length,
				arr = [],
				len = 0;
			
			params = params || '*';
			
			for (counter = 0; counter < this.length; counter++) {
				var selector = this[counter].querySelectorAll(params),
					counter;
					
				length = selector.length;
				
				// Add selector to object for method chaining
				for (counter = 0; counter < length; counter++) {
					arr[len + counter] = selector[counter];
				}
				
				len += length;
			}
						
			// Add selector to object for method chaining
			for (counter = 0; counter < arr.length; counter++) {
				this[counter] = arr[counter];
			}

			this.length = arr.length;

			// Return this to allow chained methods
			return this;
		},

		/*
			Name			hasClass()
			Description		Detects if a class exists
		 	Input			className TEXT
		 	Output			BOOLEAN
			Language		Javascript
		*/
		
		hasClass: function (className) {
			var counter,
				variable = true;
			
			for (counter = 0; counter < this.length; counter++) {
				variable = variable && this[counter].classList.contains(className);
			}
			
			// Return this to allow chained methods
			return variable;
		},

		/*
			Name			height()
			Description		Get the current computed height for the first element in the set of matched elements.
		 	Input			NONE
			Output			height INT
			Language		Javascript
		*/
		
		height: function () {
			return this[0].offsetHeight;
		},

		/*
			Name			hide()
			Description		Hide 1 or more DOM Objects
		 	Input			NONE
			Language		Javascript
		*/
		
		hide: function () {

			for (var counter = 0; counter < this.length; counter++) {
				
				if (!this[counter].classList.contains('hidden')) {
					this[counter].classList.add('hidden');
					this[counter].style.display = 'none';
				}
			}
			
			// Return this to allow chained methods
			return this;
		},
		
		/*
			Name			html()
			Description		Sets the innerHTML of an object
		 	Input			NONE
			Language		Javascript
		*/
		
		html: function (html) {

			for (var counter = 0; counter < this.length; counter++) {
				
				this[counter].innerHTML = html;
			}
			
			// Return this to allow chained methods
			return this;
		},
		
		/*
			Name			next()
			Description		Selects the next DOM Object element
		 	Input			NONE
			Language		Javascript
		*/
		
		next: function () {

			for (var counter = 0; counter < this.length; counter++) {
				
				this[counter] = this[counter].nextSibling;
			}
			
			// Return this to allow chained methods
			return this;
		},

		/*
			Name			off()
			Description		Removes an event from DOM Objects
		 	Input			NONE
			Language		Javascript
		*/
		
		off: function (eventName, eventHandler) {

			for (var counter = 0; counter < this.length; counter++) {
				
				this[counter].removeEventListener(eventName, eventHandler);
			}
			
			// Return this to allow chained methods
			return this;
		},

		/*
			Name			on()
			Description		Adds an event to DOM Objects
		 	Input			NONE
			Language		Javascript
		*/
		
		on: function (events) {
			var arr = events.split(' '),
				total = arr.length,
				counter,
				count;
			
			if (arguments.length === 2) {
				// .on('change', function(e) { ... });
				
				for (counter = 0; counter < this.length; counter++) {
					
					for (count = 0; count < total; count++) {
						this[counter].addEventListener(arr[count], arguments[1], false);
					}
				}
			} else {
				// .on('change', 'input', function(e) { ... });
				
				var doc = document,
					selector = arguments[1],
					func = arguments[2],
					counter;
				
				for (counter = 0; counter < this.length; counter++) {
					
					var obj = this[counter];
					
					if (isset(obj)) {
						
						for (count = 0; count < total; count++) {
							doc.addEventListener(arr[count], function() {
								
								if (arguments[0].target.matches(obj.tagName + ' ' + selector)) {
									func.call(arguments[0].target, arguments[0]);
								}
								
							}, false);
							
						}
					}
				}
			}
			
			// Return this to allow chained methods
			return this;
		},

		/*
			Name			offset()
			Description		Get the current coordinates of the first element in the set of matched elements, relative to the document.
		 	Input			NONE
			Language		Javascript
		*/
		
		offset: function () {

			var doc = document,
				rect = this[0].getBoundingClientRect();

			return {
				top		:	rect.top + doc.body.scrollTop,
				left	:	rect.left + doc.body.scrollLeft
			};
		},

		/*
			Name			parent()
			Description		Finds the parent Node
		 	Input			NONE
			Output			DOM Object
			Language		Javascript
		*/
		
		parent: function () {

			for (var counter = 0; counter < this.length; counter++) {
				
				this[counter] = this[counter].parentNode;
			}
			
			// Return this to allow chained methods
			return this;
		},

		/*
			Name			prepend()
			Description		Either prepend text to innerHTML, or prepend node
		 	Input			params
			Language		Javascript
		*/
		
		prepend: function (params) {

			for (var counter = 0; counter < this.length; counter++) {
				
				if (typeof params === 'string') {
					this[counter].innerHTML = params + this[counter].innerHTML;
				} else {
					this[counter].insertBefore(params, this[counter].firstChild);
				}
			}
			
			// Return this to allow chained methods
			return this;
		},

		/*
			Name			removeAttr()
			Description		Removes an attribute from the objects
		 	Input			property TEXT
			Language		Javascript
		*/
		
		removeAttr: function (property) {
			
			for (var counter = 0; counter < this.length; counter++) {
				
				this[counter].removeAttribute(property);
			}
			
			// Return this to allow chained methods
			return this;
		},

		/*
			Name			removeClass()
			Description		Removes a class from the objects
		 	Input			className TEXT
			Language		Javascript
		*/
		
		removeClass: function (classNames) {
			var arr = classNames.split(' '),
				total = arr.length,
				counter,
				count;
			
			for (counter = 0; counter < this.length; counter++) {
				
				for (count = 0; count < total; count++) {
					
					if (this[counter].classList.contains(arr[count])) {
						this[counter].classList.remove(arr[count]);
					}
				}
			}
			
			// Return this to allow chained methods
			return this;
		},

		/*
			Name			show()
			Description		Show 1 or more DOM Objects
		 	Input			NONE
			Language		Javascript
		*/
		
		show: function () {
			
			for (var counter = 0; counter < this.length; counter++) {

				if (this[counter].classList.contains('hidden')) {
					this[counter].classList.remove('hidden');
					this[counter].style.display = '';
				}
			}
			
			// Return this to allow chained methods
			return this;
		},

		/*
			Name			toggle()
			Description		Toggles the visibility of 1 or more objects
		 	Input			NONE
			Language		Javascript
		*/
		
		toggle: function () {
			
			for (var counter = 0; counter < this.length; counter++) {
				
				if (this[counter].classList.contains('hidden') || this[counter].style.display === 'none') {
					this[counter].classList.remove('hidden');
					this[counter].style.display = '';
				} else {
					this[counter].classList.add('hidden');
					this[counter].style.display = 'none';
				}
			}
			
			// Return this to allow chained methods
			return this;
		},

		/*
			Name			toggleClass()
			Description		Toggles a class on 1 or more objects
		 	Input			className TEXT
			Language		Javascript
		*/
		
		toggleClass: function (className) {
			
			for (var counter = 0; counter < this.length; counter++) {
				
				if (this[counter].classList.contains(className)) {
					this[counter].classList.remove(className);
				} else {
					this[counter].classList.add(className);
				}
			}
			
			// Return this to allow chained methods
			return this;
		},

		/*
			Name			trigger()
			Description		Triggers an event on the object
		 	Input			evt TEXT
			Language		Javascript
			Read more		Types of events: http://www.w3schools.com/jsref/dom_obj_event.asp
			
		*/
		
		trigger: function (event) {
			var doc = document,
				formEvents = ['blur', 'change', 'click', 'focus', 'focusin', 'focusout', 'input', 'invalid', 'reset', 'search', 'select', 'submit'],
				counter;
			
			event = event !== undefined ? event.toLowerCase() : '*';
			
			if ('createEvent' in doc) {
				var evt = formEvents.indexOf(event) > -1 ? doc.createEvent('HTMLEvents') : doc.createEvent('MouseEvents');
				
				evt.initEvent(event, true, false);
			} else if (doc.createEventObject) {
				var evt = doc.createEventObject();
			}

			for (counter = 0; counter < this.length; counter++) {
				
				if ('createEvent' in doc) {					
					this[counter].dispatchEvent(evt);
				} else if (doc.createEventObject) {
					this[counter].fireEvent('on' + event, evt);
				}
			}
			
			// Return this to allow chained methods
			return this;
		},
		
		/*
			Name			val()
			Description		GET / SET the objects value
		 	Input			newVal TEXT
			Output			GET:	value
							SET:	TRUE if successful
			Language		Javascript
		*/
		
		val: function (newVal) {
			var counter,
				variable;
			
			for (counter = 0; counter < this.length; counter++) {
				
				if (isset(newVal)) {
					this[counter].value = newVal;
				} else {
					variable = this[counter].value;
				}
			}
			
			// Return this to allow chained methods
			return variable || this;
		},

		/*
			Name			width()
			Description		Get the current computed width for the first element in the set of matched elements.
		 	Input			NONE
			Output			width INT
			Language		Javascript
		*/
		
		width: function () {
			return this[0].offsetWidth;
		},
	};   
	
	// Assign our Q object to global window object.
	if (!window.Q) {
		window.Q = Q;
	}
})();