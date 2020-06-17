export function makeId(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

 export function stripTags (str, allowed_tags) {
   var key = '', allowed = false;
   var matches = [];    var allowed_array = [];
   var allowed_tag = '';
   var i = 0;
   var k = '';
   var html = ''; 
   var replacer = function (search, replace, str) {
       return str.split(search).join(replace);
   };
   // Build allowes tags associative array
   if (allowed_tags) {
       allowed_array = allowed_tags.match(/([a-zA-Z0-9]+)/gi);
   }
   str += '';

   // Match tags
   matches = str.match(/(<\/?[\S][^>]*>)/gi);
   // Go through all HTML tags
   for (key in matches) {
       if (isNaN(key)) {
               // IE7 Hack
           continue;
       }

       // Save HTML tag
       html = matches[key].toString();
       // Is tag not in allowed list? Remove from str!
       allowed = false;

       // Go through all allowed tags
       for (k in allowed_array) {            // Init
           allowed_tag = allowed_array[k];
           i = -1;

           if (i != 0) { i = html.toLowerCase().indexOf('<'+allowed_tag+'>');}
           if (i != 0) { i = html.toLowerCase().indexOf('<'+allowed_tag+' ');}
           if (i != 0) { i = html.toLowerCase().indexOf('</'+allowed_tag)   ;}

           // Determine
           if (i == 0) {                allowed = true;
               break;
           }
       }
       if (!allowed) {
           str = replacer(html, "", str); // Custom replace. No regexing
       }
   }
   return str;
}

export function hasOwnNestedProperty(obj,propertyPath){
    if(!propertyPath)
        return false;

    var properties = propertyPath.split('.');

    for (var i = 0; i < properties.length; i++) {
        var prop = properties[i];

        if(!obj || !obj.hasOwnProperty(prop)){
            return false;
        } else {
            obj = obj[prop];
        }
    }

    return true;
};