// import DOMPurify from 'dompurify';
import { makeId } from '../.Utilities/Utilities';

export default function HTMLTransformer(editorOutput) {
    const inputRegex = RegExp(/\[\]/,'gum');
    const dropdownRegex = RegExp(/\[.*?\]/,'gum');
    const radioGroupRegex = RegExp(/<ul>.*?<\/ul>/s,'gum');
    const radioRegex = RegExp(/<li>.*?<\/li>/s,'gum');
    const pureTextRegex = RegExp(/>.*?</,'gum');

    function htmlDecode(input) {
        let doc = new DOMParser().parseFromString(input, "text/html");
        return doc.documentElement.textContent;
    }

    let outputDecoded = editorOutput.replace(pureTextRegex, (match) => {
        let trimedEndings = match.substr(1,match.length - 2);
        let decodedString = htmlDecode(trimedEndings);
        // add endings ">" and "<"
        let result = ">" + decodedString + "<"
        return result;
    })

    let stringInputReplaced = outputDecoded.replace(inputRegex, () => {
        let index = makeId(7);
        return `<GapFiller id=${index} key=${index} />`;
    })

    let stringDropdownReplaced = stringInputReplaced.replace(dropdownRegex, (match) => {
        let index = makeId(7);
        let options = '';
        match.substr(1,match.length-2).split(',').map((el,index) => {
            options = options + "<option value=" + el + ">" + el + "</option>"
            return null
        })
        return `<select id="${index}"><option value=""></option>${options}</select>`;
    })

    let stringRadioBoxReplaced = stringDropdownReplaced.replace(radioGroupRegex, (match_outer) => {
        let index = makeId(7);
        let inside = match_outer.replace(radioRegex, (match_inner) => {
            let inner_index = makeId(4);
            return `<li><input type="radio" key=${inner_index} id=${inner_index} name=${index}>${match_inner.substr(4,match_inner.length - 9)}</input></li>`
        })
        return inside;
    })

    // const stringSanitized = DOMPurify.sanitize(stringRadioBoxReplaced);

    function createMarkup() {
        return {__html: stringRadioBoxReplaced}
    }

    return createMarkup();
}