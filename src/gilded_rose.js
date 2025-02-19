class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  #items;

  // Constants for named items to avoid magic strings
  NAMED_ITEMS = {
    BRIE: 'Aged Brie',
    SULFURAS: 'Sulfuras, Hand of Ragnaros',
    BACKSTAGE: 'Backstage passes to a TAFKAL80ETC concert',
  };

  constructor(items = []) {
    this.#items = items;
  }

  updateQuality() {
    for (const item of this.#items) {
      // Legendary item: Sulfuras - does not change
      if (item.name === this.NAMED_ITEMS.SULFURAS) continue;

      // Determine degradation rate (doubles when sell-in is 0 or below)
      const degradationRate = item.sellIn <= 0 ? 2 : 1;

      // Process item based on type
      if (item.name === this.NAMED_ITEMS.BRIE || item.name === this.NAMED_ITEMS.BACKSTAGE) {
        this.#processSpecialItem(item, degradationRate);
      } else if (item.name.startsWith('Normal')) {
        this.#decreaseQuality(item, degradationRate);
      } else {
        // Assumes all other items are Conjured (per problem statement)
        this.#decreaseQuality(item, degradationRate * 2);
      }

      // Decrement sellIn after processing quality
      item.sellIn--;
    }

    return this.#items;
  }

  // Handles Aged Brie & Backstage Passes logic
  #processSpecialItem(item, degradationRate) {
    if (item.name === this.NAMED_ITEMS.BRIE) {
      // "Aged Brie" increases in quality over time
      item.quality = Math.min(50, item.quality + degradationRate);
    } else {
      // "Backstage Passes" increase at different rates and drop to 0 after expiration
      if (item.sellIn <= 0) {
        item.quality = 0;
      } else {
        const backstageQualityRate = item.sellIn <= 5 ? 3 : item.sellIn <= 10 ? 2 : 1;
        item.quality = Math.min(50, item.quality + backstageQualityRate);
      }
    }
  }

  // Generic quality reduction logic (used by Normal & Conjured items)
  #decreaseQuality(item, rate) {
    item.quality = Math.max(0, Math.min(50, item.quality - rate));
  }
}

module.exports = { Shop, Item };
