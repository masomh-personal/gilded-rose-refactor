// TODO: Task #5 - Remove "Code Smells" and refactor code
// NOTE: Code Smells is a hint that something might be wrong, not a certainty. Good design?
class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  #items;

  NAMED_ITEMS = {
    BRIE: 'Aged Brie',
    SULFURAS: 'Sulfuras, Hand of Ragnaros',
    BACKSTAGE: 'Backstage passes to a TAFKAL80ETC concert',
  };

  constructor(items = []) {
    this.#items = items;
  }

  get items() {
    return this.#items;
  }

  updateQuality() {
    for (const item of this.#items) {
      // Guard clause: Sulfuras - no update/changes required
      // "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
      if (item.name === this.NAMED_ITEMS.SULFURAS) continue;

      item.sellIn -= 1;
      const qualityRate = item.sellIn < 0 ? 2 : 1;
      const specialItems = [this.NAMED_ITEMS.BRIE, this.NAMED_ITEMS.BACKSTAGE];

      // Process item based on name/type
      if (specialItems.includes(item.name)) {
        // if it's a named item (brie or backstage)
        this.#processNamedItems(item, qualityRate);
      } else if (item.name.startsWith('Normal')) {
        // Any normal items
        this.#processNormalItem(item, qualityRate);
      } else {
        // NOTE: we are going to assume these are the only types of items and not having any validation
        // Any conjured items
        this.#processConjuredItem(item, qualityRate);
      }
    }

    return this.#items;
  }

  // PRIVATE HELPER METHODS
  #processNamedItems(item, qualityRate) {
    // process Aged Brie or Backstage Passes
    if (item.name === this.NAMED_ITEMS.BRIE) {
      // 'Aged Brie'
      item.quality = item.quality === 50 ? 50 : item.quality + qualityRate;
    } else {
      // 'Backstage Passes"
    }
  }
  #processNormalItem(item, qualityRate) {
    // process 'Normal' items
  }

  #processConjuredItem(item, qualityRate) {
    // process 'Conjured' items
  }
}

module.exports = { Shop, Item };
