const {
  NormalItemStrategy,
  AgedBrieStrategy,
  BackstagePassStrategy,
  ConjuredItemStrategy,
  SulfurasStrategy,
  UnknownItemStrategy,
} = require('../src/ItemClasses');

class Shop {
  #items;

  constructor(items = []) {
    this.#items = items;
  }

  updateQuality() {
    for (const item of this.#items) {
      const strategy = this.#getStrategy(item);
      strategy.update(item);
    }
    return this.#items;
  }

  #getStrategy(item) {
    const strategies = {
      'Aged Brie': AgedBrieStrategy,
      'Sulfuras, Hand of Ragnaros': SulfurasStrategy,
      'Backstage passes to a TAFKAL80ETC concert': BackstagePassStrategy,
    };

    // Check for Normal or Conjured items using string matching
    if (item.name.startsWith('Conjured')) return new ConjuredItemStrategy();
    if (item.name.startsWith('Normal')) return new NormalItemStrategy();

    // Return strategy from the map, or default to UnknownItemStrategy
    return new (strategies[item.name] || UnknownItemStrategy)();
  }
}

module.exports = { Shop };
