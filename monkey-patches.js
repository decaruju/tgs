Array.prototype.sum = function() {
    if (this.length == 0) return 0;
    return this.reduce((a, b) => a+b);
};
export default {};
