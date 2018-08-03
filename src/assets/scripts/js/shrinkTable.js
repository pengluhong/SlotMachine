export function shrinkTable(cl) {
	$(cl).click(function() {
		if($(this).text() === '收起表格') {
			$(this).parent().siblings('tbody').slideUp();
			$(this).parent().siblings('tbody,tfoot').slideUp();
			$(this).text('打开表格');

		} else {
			$(this).parent().siblings('tbody').slideDown();
			$(this).text('收起表格');
		}
	});
}