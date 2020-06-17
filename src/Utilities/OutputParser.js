let initialJson = {
    node: 'element',
    tag: 'div',
    child: []
};

const testInput = '<p style="color:blue;font-size:17px;" class="test-class">Choose an optión:</p><GapFiller id="dupa"></GapFiller><ul style="color:red;"><li>Option 1</li><li>Option 2</li><li>Option 3</li></ul><section><h1>test section</h1><div style="background-color:blue;font-size:46px;" class="outer-div"><div class="inner-div">Content</div></div></section>'

// groupMatchTest(testInput);

function groupMatchTest(input) {
    let result = new DOMParser().parseFromString(input, 'text/html');
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
                nodeObject: node,
                // styleLength: node.style.length,
                attr: { id: makeId(5)},
                tag: node.tagName.toLowerCase(),
                child: parseNodes(node.childNodes)
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
                });
            }
            json.push(newNode);
        } else if (node.nodeType === 3) {
            let newNode = {
                node: 'text',
                // nodeType: node.nodeType,
                // nodeObject: node,
                text: node.textContent,
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
