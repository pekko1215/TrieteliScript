function gcd(a, b) {
    if ( ! b) {
        return a;
    }

    return gcd(b, a % b);
};

console.log(gcd(14,11))
console.log(gcd(14,15))
console.log(gcd(14,16))