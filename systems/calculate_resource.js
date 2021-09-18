export default function() {
    this.getEntities(["resourceMeter"]).forEach((resourceMeter) => {
        resourceMeter.resourceMeter.resource += this.trees.map((tree) => {
            const earned = tree.grid.map((cell) => resourceMeter.resourceMeter.earnPredicate(cell, tree)).sum();
            const spent = tree.grid.map((cell) => resourceMeter.resourceMeter.spendPredicate(cell, tree)).sum();
            return earned - spent;
        }).sum();
    });
}
