const historyList = document.getElementById("history-list");

function convertFunction() {
    const traditionalFunc = document.getElementById("traditional-func").value.trim();

    if (!traditionalFunc) {
        alert("Please enter a traditional function.");
        return;
    }

    try {
        const arrowFunc = convertToArrowFunction(traditionalFunc);
        document.getElementById("arrow-func").value = arrowFunc;

        // Add the function conversion to history
        addToHistory(traditionalFunc, arrowFunc);
    } catch (error) {
        alert("Could not convert the function. Please ensure it's formatted correctly.");
    }
}

function convertToArrowFunction(funcStr) {
    // Match traditional function structure
    const funcMatch = funcStr.match(/function\s+(\w+)\(([^)]*)\)\s*{([^}]*)}/);

    if (!funcMatch) {
        throw new Error("Invalid function format");
    }

    const [, funcName, params, body] = funcMatch;
    let arrowBody = body.trim();

    // Check for multiple lines and preserve braces for multiline
    if (arrowBody.includes('return') && !arrowBody.includes(';')) {
        arrowBody = arrowBody.replace(/\s*return\s*/, '').replace(/;/g, '');
    } else if (!arrowBody.includes(';')) {
        arrowBody = arrowBody.replace(/{|}/g, '').trim();
    }

    // Replace nested traditional functions (inner functions)
    arrowBody = arrowBody.replace(/function\s+(\w+)\(([^)]*)\)\s*{([^}]*)}/g, (match, innerFuncName, innerParams, innerBody) => {
        innerBody = innerBody.trim();
        
        // Simplify single-line inner functions
        if (innerBody.includes('return') && !innerBody.includes(';')) {
            innerBody = innerBody.replace(/\s*return\s*/, '').replace(/;/g, '').trim();
            return `const ${innerFuncName} = (${innerParams}) => ${innerBody};`;
        } else {
            return `const ${innerFuncName} = (${innerParams}) => {${innerBody}};`;
        }
    });

    // Simplify the outer function for single-line return
    if (arrowBody.includes('return') && !arrowBody.includes(';')) {
        arrowBody = arrowBody.replace(/\s*return\s*/, '').replace(/;/g, '').trim();
        return `const ${funcName} = (${params}) => ${arrowBody};`;
    } else {
        return `const ${funcName} = (${params}) => {${arrowBody}};`;
    }
}

function addToHistory(traditional, arrow) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<strong>Traditional:</strong> <pre>${traditional}</pre><br><strong>Arrow:</strong> <pre>${arrow}</pre>`;
    historyList.appendChild(listItem);
}
