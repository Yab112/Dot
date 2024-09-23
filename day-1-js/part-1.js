function areaOfTriangle(a, b, c) {
    // Calculate semi-perimeter
    const s = (a + b + c) / 2;

    // Apply Heron's formula
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    
    return area.toFixed(2); // Return the area rounded to two decimal places
}

const a = 5, b = 6, c = 7;
console.log(`The area of the triangle is: ${areaOfTriangle(a, b, c)}`);
