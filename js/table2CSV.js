jQuery.fn.TableCSVExport = function(options) {
    var options = jQuery.extend({
       separator: '\t',
       header: [],
       columns: [],
       extraHeader: "",
	  extraData: [],
	  insertBefore: "",
       delivery: 'download' /* popup, value, download */
    },
    options);

    var csvData = [];
    var headerArr = [];
    var el = this;
    var basic = options.columns.length == 0 ? true : false;
    var columnNumbers = [];
    var columnCounter = 0;
    var insertBeforeNum = null;
    //header
    var numCols = options.header.length; 
    var tmpRow = []; // construct header avalible array
   
    if (numCols > 0) {
       if (basic) {
          for (var i = 0; i < numCols; i++) {
	      if (options.header[i] == options.insertBefore) {
		  tmpRow[tmpRow.length] = options.extraHeader;
		  insertBeforeNum = i;
	      }
             tmpRow[tmpRow.length] = formatData(options.header[i]);
          }
       } else if (!basic) {
          for (var o = 0; o < numCols; o++) {
             for (var i = 0; i < options.columns.length; i++) {
                if (options.columns[i] == options.header[o]) {
                   if (options.columns[i] == options.insertBefore) {
		      tmpRow[tmpRow.length] = options.extraHeader;
                      insertBeforeNum = o;
		   }
                   tmpRow[tmpRow.length] = formatData(options.header[o]);
		   columnNumbers[columnCounter] = o;
		   columnCounter++;
                }
             }
          }       
       }
    } else {
       jQuery(el).filter(':visible').find('th').each(function() {
          if (jQuery(this).css('display') != 'none') tmpRow[tmpRow.length] = formatData(jQuery(this).html());
       });
    }

    row2CSV(tmpRow);

    // actual data
    if (basic) {
       var trCounter = 0;
       jQuery(el).find('tr').each(function() {
           var tmpRow = [];
	   var extraDataCounter = 0;
           jQuery(this).filter(':visible').find('td').each(function() {
              if (extraDataCounter == insertBeforeNum) {
		  tmpRow[tmpRow.length] = jQuery.trim(options.extraData[trCounter-1]);
	      }
              if (jQuery(this).css('display') != 'none') {
                 tmpRow[tmpRow.length] = jQuery.trim(formatData(jQuery(this).html()));
              }
              extraDataCounter++;
           });
           row2CSV(tmpRow);
           trCounter++;
       });
    } else {
       var trCounter = 0;
       jQuery(el).find('tr').each(function() {
          var tmpRow = [];
          var columnCounter = 0;
	  var extraDataCounter = 0;
          jQuery(this).filter(':visible').find('td').each(function() {
	     if ((columnCounter in columnNumbers) && (extraDataCounter == insertBeforeNum)) {
		tmpRow[tmpRow.length] = jQuery.trim(options.extraData[trCounter - 1]); 
	     }
             if ((jQuery(this).css('display') != 'none') && (columnCounter in columnNumbers)) {
                tmpRow[tmpRow.length] = jQuery.trim(formatData(jQuery(this).html()));
             }
             columnCounter++;
	     extraDataCounter++;
          });
          row2CSV(tmpRow);
           trCounter++;
       });
    }
    if ((options.delivery == 'popup')||(options.delivery == 'download')) {
        var mydata = csvData.join('\n');
        return popup(mydata);
    } else {
        var mydata = csvData.join('\n');
        return mydata;
    }

    function row2CSV(tmpRow) {
        var tmp = tmpRow.join('') // to remove any blank rows
        // alert(tmp);
        if (tmpRow.length > 0 && tmp != '') {
            var mystr = tmpRow.join(options.separator);
            csvData[csvData.length] = jQuery.trim(mystr);
        }
    }
    function formatData(input) {
        // replace " with "
        var regexp = new RegExp(/["]/g);
        var output = input.replace(regexp, "\"");
        //HTML
        var regexp = new RegExp(/\<[^\<]+\>/g);
        var output = output.replace(regexp, "");
        if (output == "") return '';
        return '' + output + '';
    }
    function popup(data) {
	if (options.delivery == 'download') {
           window.location='data:text/csv;charset=utf8,' + encodeURIComponent(data);
           return true;
	} else {
           var generator = window.open('', 'csv', 'height=400,width=600');
           generator.document.write('<html><head><title>CSV</title>');
           generator.document.write('</head><body >');
           generator.document.write('<textArea cols=70 rows=15 wrap="off" >');
           generator.document.write(data);
           generator.document.write('</textArea>');
           generator.document.write('</body></html>');
           generator.document.close();
           return true;
	}
    }
};
