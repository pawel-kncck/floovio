import DOMPurify from 'dompurify';

export default function HTMLTransformer(editorOutput) {
    const inputRegex = RegExp(/_[\p{L}0-9\s<>//]*_/,'gu');
    const buttonRegex = RegExp(/\{[\p{L}0-9\s<>//]*\}/,'gu');
    const checkBoxRegex = RegExp(/<li>\[X\]/,'gu');

    let i = 0;
    let stringInputReplaced = editorOutput.replace(inputRegex, () => {
        let index = 'i_'+(100 + i++);
        return `<span class="inlineInputField" role="textbox" id="${index}" contenteditable></span>`;
    })

    let b = 0;
    let stringButtonReplaced = stringInputReplaced.replace(buttonRegex, (match) => {
        let index = 'b_'+(100 + b++);
        return `<button id="${index}" type="button" class="btn btn-outline-primary btn-sm editor-button">${match}</button>`;
    })

    let c = 0;
    let stringCheckBoxReplaced = stringButtonReplaced.replace(checkBoxRegex, () => {
        let index = 'c_'+(100 + c++);
        return `<li style="list-style: none;"><input type="checkbox" id="${index}"></input>`;
    })

    const stringSanitized = DOMPurify.sanitize(stringCheckBoxReplaced);

    function createMarkup() {
        return {__html: stringSanitized}
    }

    return createMarkup();
}