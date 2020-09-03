export function makeId(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

export const makeCustomId = () => {
  let result = '';
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 8; i++) {
    if (i === 0) {
      result += letters.charAt(Math.floor(Math.random() * letters.length));
    } else {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
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

           if (i !== 0) { i = html.toLowerCase().indexOf('<'+allowed_tag+'>');}
           if (i !== 0) { i = html.toLowerCase().indexOf('<'+allowed_tag+' ');}
           if (i !== 0) { i = html.toLowerCase().indexOf('</'+allowed_tag)   ;}

           // Determine
           if (i === 0) {                allowed = true;
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

export function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);
  
    var interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }
//   var aDay = 24*60*60*1000;
//   console.log(timeSince(new Date(Date.now()-aDay)));
//   console.log(timeSince(new Date(Date.now()-aDay*2)));