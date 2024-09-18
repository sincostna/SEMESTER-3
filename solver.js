function Chunk {
    constructor(number, text = null) {
        this.total = number;
        this.text = text === null ? number.toString() : text;
    }
}

function add(a, b) {
    return new Chunk(a.total + b.total, `(${a.text} + ${b.text})`);
}

function subtract(a, b) {
    return new Chunk(a.total - b.total, `(${a.text} - ${b.text})`);
}

function multiply(a, b) {
    return new Chunk(a.total * b.total, `(${a.text} * ${b.text})`);
}

function divide(a, b) {
    if (b.total === 0) return null; 
    return new Chunk(a.total / b.total, `(${a.text} / ${b.text})`);
}

const operations = [add, subtract, multiply, divide];

function operate(chunks, target) {
    if (chunks.length === 1) {
        if (Math.abs(chunks[0].total - target) < 0.000001) {
            return new Set([chunks[0].text]);
        }
        return new Set();
    }
    let solutions = new Set();
    for (let i = 0; i < chunks.length; i++) {
        for (let j = 0; j < chunks.length; j++) {
            if (i !== j) {
                const remainingChunks = chunks.filter((_, idx) => idx !== i && idx !== j);
                for (let operation of operations) {
                    const result = operation(chunks[i], chunks[j]);
                    if (result) {
                        const subSolutions = operate([result, ...remainingChunks], target);
                        subSolutions.forEach(solution => solutions.add(solution));
                    }
                }
            }
        }
    }
    return solutions;
}

function solve20(numbers) {
    const chunks = numbers.map(num => new Chunk(num));
    return operate(chunks, 20);
}

document.getElementById("puzzleForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const number1 = parseFloat(document.getElementById("number1").value);
    const number2 = parseFloat(document.getElementById("number2").value);
    const number3 = parseFloat(document.getElementById("number3").value);
    const number4 = parseFloat(document.getElementById("number4").value);
    const numbers = [number1, number2, number3, number4];
    
    const solutions = solve20(numbers);
    const resultDiv = document.getElementById("result");
    if (solutions.size > 0) {
        const solutionCount = solutions.size;
        const solutionText = Array.from(solutions).join('<br>');
        resultDiv.innerHTML = `<p>Found ${solutionCount} solution${solutionCount > 1 ? 's' : ''} for 20:</p>${solutionText}`;
    } else {
        resultDiv.innerHTML = "No solution found for 20";
    }
});
