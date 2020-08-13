let initialJson = {
    node: 'element',
    tag: 'div',
    child: []
};

// const testInput = '<p style="color:blue;font-size:17px;" class="test-class">Choose an optión:</p><GapFiller id="dupa"></GapFiller><ul style="color:red;"><li>Option 1</li><li>Option 2</li><li>Option 3</li></ul><section><h1>test section</h1><div style="background-color:blue;font-size:46px;" class="outer-div"><div class="inner-div">Content</div></div></section>'

// groupMatchTest(testInput);

function groupMatchTest(input) {
    const inputRegex = RegExp(/\[\]/,'gum');
    const dropdownRegex = RegExp(/\[.*?\]/,'gum');
    const radioGroupRegex = RegExp(/\{.*?\}/s,'gum');
    const imageRegex = RegExp(/&lt;img.*?&gt;/s,'gum');
    // const radioGroupRegex = RegExp(/<ul>.*?<\/ul>/s,'gum');
    // const radioRegex = RegExp(/<li>.*?<\/li>/s,'gum');

    let hyphenObject = {};

    let stringInputReplaced = input.replace(inputRegex, () => {
        let index = makeId(7);
        hyphenObject[index] = {
            node: "element",
            tag: "hyphentextfield",
            child: null,
            attr: {
                id: index,
                key: index,
            }
        }
        return `<hyphen id="${index}"></hyphen>`;
    })

    let stringRadioReplaced = stringInputReplaced.replace(radioGroupRegex, (match) => {
        let index = makeId(7);
        let optionArray = [];
        match.substr(1,match.length-2).split(',').map((el,index) => {
            optionArray.push(el);
            return null
        })
        hyphenObject[index] = {
            node: "element",
            tag: "hyphenradiogroup",
            child: null,
            attr: {
                id: index,
                key: index,
                options: optionArray
            }
        }
        return `<hyphen id="${index}"></hyphen>`;
    })

    let stringDropdownReplaced = stringRadioReplaced.replace(dropdownRegex, (match) => {
        let index = makeId(7);
        let optionArray = [];
        match.substr(1,match.length-2).split(',').map((el,index) => {
            optionArray.push(el);
            return null
        })
        hyphenObject[index] = {
            node: "element",
            tag: "hyphendropdown",
            child: null,
            attr: {
                id: index,
                key: index,
                options: optionArray
            }
        }
        return `<hyphen id="${index}"></hyphen>`;
    })

    let stringImageReplaced = stringDropdownReplaced.replace(imageRegex, (match) => {
        let index = makeId(7);
        let attributes = [];
        match.substr(4,match.length-8).split(',').map((el,index) => {
            attributes.push(el);
            return null
        })
        hyphenObject[index] = {
            node: "element",
            tag: "hyphenimage",
            child: null,
            attr: {
                id: index,
                key: index,
                code: attributes[1],
                height: attributes[2],
            }
        }
        return `<hyphen id="${index}"></hyphen>`;
    })

    let result = new DOMParser().parseFromString(stringImageReplaced, 'text/html');

    const nodes = result.body.childNodes;
    return {
        ...initialJson,
        child: parseNodes(nodes,hyphenObject)
    }
}

function parseNodes(nodes,hyphenObject) {
    let json = [];
    nodes.forEach(node => {
        if (node.tagName === "HYPHEN") {
            // let newNode = hyphenObject[node.id]
            json.push(hyphenObject[node.id]);
        } else {
            if (node.nodeType === 1) {
                const styles = Object.entries(node.style);
                let newNode = {
                    node: 'element',
                    // nodeObject: node,
                    attr: { id: makeId(5)},
                    tag: node.tagName.toLowerCase(),
                    child: node.childNodes.length > 0 ? parseNodes(node.childNodes,hyphenObject) : null
                }
                if (node.className !== "") {
                    newNode.attr.className = node.className
                }
                if (node.style.length > 0) {
                    newNode.attr.style = {};
                    styles.map((prop) => {
                        if (prop[1] !== "" && prop[0].length > 2) {
                            newNode.attr.style[prop[0]] = prop[1]
                        }
                        return null
                    });
                }
                json.push(newNode);
            } else if (node.nodeType === 3 && node.textContent !== '\n') {
                let newNode = {
                    node: 'text',
                    text: node.textContent,
                }
                json.push(newNode);
            }
        }
    });
    return json;
}

function makeId(n) {
    return Math.random().toString(36).substr(2, n);
};

export default groupMatchTest;
