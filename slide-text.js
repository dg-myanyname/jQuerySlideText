$('.my-class').myanSlideText('destroy');
$('.my-class').myanSlideText();

/**
* jQuery плагин, который скрывает часть текста, а по кнопке открывает его
* обязательная структура <div class="%your wrapper%"><div class="slide-content"><a class="slide-button"></a></div></div>
**/

(function($) {
	// актуальные настройки, глобальные
	var options;

	var methods = {
		init:function(params) {
			var slideText = this.find('.slide-content'),				// массив эл-ов с тектом для сворачивания
				slideButton = this.find('.slide-button'),				// массив кнопок
				blockAfter = this.find('.after'),						// массив эл-ов для визуальных эффектов
				gradientImgLeft = this.find('.gradient-img-left');		// массив эл-ов для визуальных эффектов

			if(!slideText.length || !slideButton.length ) return this;

			// при многократном вызове настройки будут сохранятся
			// и замещаться при необходимости
			options = $.extend({ minHeight:0, animateTimeout: 200}, options, params);

			this.each(function(index, el) {
				var fullHeight = $(slideText[index]).height();
				$(slideText[index]).data('fullHeight', fullHeight);
				
				if (fullHeight >= options.minHeight) {
					$(slideText[index]).data('fullHeight', fullHeight).css('height', options.minHeight);
				} else {
					$(slideButton[index]).css('display', 'none');
					$(blockAfter[index]).css('display', 'none');
					$(gradientImgLeft[index]).css('display', 'none');
				};
			});

			slideButton.each(function(index, el) {
				$(this).on('click.myanSlideText', function(){
					var fullHeight = $(slideText[index]).data('fullHeight');
					if (fullHeight) {
						if($(slideText[index]).height() <= options.minHeight){
							$(slideText[index]).animate({height: fullHeight}, options.animateTimeout);
							$(gradientImgLeft[index]).animate({opacity: 0}, options.animateTimeout);
							$(blockAfter[index]).animate({opacity: 0}, options.animateTimeout);
						} else {
							$(slideText[index]).animate({height: options.minHeight}, options.animateTimeout);
							$(gradientImgLeft[index]).animate({opacity: 1}, options.animateTimeout);
							$(blockAfter[index]).animate({opacity: 1}, options.animateTimeout);
						}
					};
				});
				
			});


			return this;
		},

		destroy:function(params) {
			var slideText = this.find('.slide-content'),
				slideButton = this.find('.slide-button'),
				blockAfter = this.find('.after'),
				gradientImgLeft = this.find('.gradient-img-left');

			if(!slideText.length || !slideButton.length ) return this;
			
			var ownHeight = slideText.height();
			slideButton.show(0);
			blockAfter.show(0);
			gradientImgLeft.show(0);
			slideText.attr('fullHeight', ownHeight);
			slideText.css('height', 'auto');
			slideText.removeAttr('fullHeight');
			slideButton.off('click.myanSlideText');
			return this;
		}
	}
	
	$.fn.myanSlideText = function(method){
		if ( methods[method] ) {
		       // если запрашиваемый метод существует, мы его вызываем
		       // все параметры, кроме имени метода прийдут в метод
		       // this так же перекочует в метод
		       return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		   } else if ( typeof method === 'object' || ! method ) {
		       // если первым параметром идет объект, либо совсем пусто
		       // выполняем метод init
		       return methods.init.apply( this, arguments );
		   } else {
		       // если ничего не получилось
		       $.error( 'Метод "' +  method + '" не найден в плагине jQuery.mySimplePlugin' );
		   }
	};
})(jQuery);