let initialJson = {
    node: 'element',
    tag: 'div',
    child: []
};

const testInput = '<p style="color:blue;font-size:17px;" class="test-class">Choose an optión:</p><GapFiller id="dupa"></GapFiller><ul style="color:red;"><li>Option 1</li><li>Option 2</li><li>Option 3</li></ul><section><h1>test section</h1><div style="background-color:blue;font-size:46px;" class="outer-div"><div class="inner-div">Content</div></div></section>'

// groupMatchTest(testInput);

function groupMatchTest(input) {
    const inputRegex = RegExp(/\[\]/,'gum');
    const radioGroupRegex = RegExp(/<ul>.*?<\/ul>/s,'gum');
    const radioRegex = RegExp(/<li>.*?<\/li>/s,'gum');

    let stringInputReplaced = input.replace(inputRegex, () => {
        let index = makeId(7);
        return `<textfield id="${index}" key="${index}"></textfield>`;
    })

    let stringDropdownReplaced = stringInputReplaced.replace(radioGroupRegex, (match_outer) => {
        let index = makeId(7);
        let inside = match_outer.replace(radioRegex, (match_inner) => {
            let inner_index = makeId(4);
            // return `<li><input type="radio" key="${inner_index}" id="${inner_index}" name="${index}" /></li>`
            return `<li><input type="radio" key="${inner_index}" id="${inner_index}" name="${index}"><label for="${inner_index}">${match_inner.substr(4,match_inner.length - 9)}</label></li>`
        })
        return inside;
    })

    let result = new DOMParser().parseFromString(stringDropdownReplaced, 'text/html');

    const nodes = result.body.childNodes;
    // console.log(parseNodes(nodes));
    // const jsonOutput = JSON.stringify(parseNodes(nodes), null, 4);
    // $("#json-output").text(jsonOutput);
    return {
        ...initialJson,
        child: parseNodes(nodes)
    }
}

function parseNodes(nodes) {
    let json = [];
    nodes.forEach(node => {
        if (node.nodeType === 1) {
            const styles = Object.entries(node.style);
            let newNode = {
                node: 'element',
                // nodeType: node.nodeType,
                // nodeObject: node,
                // styleLength: node.style.length,
                attr: { id: makeId(5)},
                tag: node.tagName.toLowerCase(),
                child: node.childNodes.length > 0 ? parseNodes(node.childNodes) : null
            }
            if (node.className !== "") {
                newNode.attr.className = node.className
            }
            // if (node.type !== "") {
            //     newNode.attr.type = node.type
            // }
            // if (node.name !== "") {
            //     newNode.attr.name = node.name
            // }
            if (node.style.length > 0) {
                newNode.attr.style = {};
                styles.map((prop) => {
                    if (prop[1] !== "" && prop[0].length > 2) {
                        newNode.attr.style[prop[0]] = prop[1]
                    }
                });
            }
            json.push(newNode);
        } else if (node.nodeType === 3) {
            let newNode = {
                node: 'text',
                // nodeType: node.nodeType,
                // nodeObject: node,
                text: node.textContent,
                heyNodeType: typeof node.textContent,
                // tag: node.tagName,
                // child: parseNodes(node.childNodes)
            }
            json.push(newNode);


        }
        
    });
    return json;
}

function makeId(n) {
    return Math.random().toString(36).substr(2, n);
};

export default groupMatchTest;
