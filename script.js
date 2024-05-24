function calculate() {
    // Get user inputs
    const func = document.getElementById('function').value;
    const interval = document.getElementById('interval').value.split(',').map(parseFloat);
    const error = parseFloat(document.getElementById('error').value);

    try {
        // Define the function using a lambda function
        const f = (x) => evaluateFunction(func, x);

        // Bisection Method
        let a = interval[0];
        let b = interval[1];
        let c, fc, iteration = 0;
        const resultsTable = document.getElementById('results');
        resultsTable.innerHTML = ''; // Clear previous results

        // Table headers
        resultsTable.innerHTML += '<tr><th>Iteration</th><th>a</th><th>b</th><th>c</th><th>f(c)</th></tr>';

        while (Math.abs(b - a) > error) {
            c = (a + b) / 2;
            fc = f(c); // Evaluate the function at c
            resultsTable.innerHTML += `<tr><td>${iteration}</td><td>${a.toFixed(3)}</td><td>${b.toFixed(3)}</td><td>${c.toFixed(3)}</td><td>${fc.toFixed(3)}</td></tr>`;
            iteration++;

            if (fc === 0) {
                break; // Found exact solution
            } else if (f(a) * fc < 0) {
                b = c;
            } else {
                a = c;
            }
        }
    } catch (error) {
        // Handle parsing/compilation errors
        console.error('Error:', error);
    }
}

function evaluateFunction(func, x) {
    // Split the function into individual terms
    const terms = func.split(/([+\-*/^])/).map(term => term.trim()).filter(term => term !== '');

    // Initialize result
    let result = 0;

    // Iterate over each term and evaluate
    for (let i = 0; i < terms.length; i++) {
        const term = terms[i];
        if (term === 'x') {
            result += x;
        } else if (term === '^') {
            const power = parseFloat(terms[i + 1]);
            result = Math.pow(result, power);
            i++; // Skip the next term (the power)
        } else if (term === '-') {
            result -= parseFloat(terms[i + 1]);
            i++; // Skip the next term (the number)
        } else if (term === '+') {
            result += parseFloat(terms[i + 1]);
            i++; // Skip the next term (the number)
        } else {
            result += parseFloat(term);
        }
    }

    return result;
}
