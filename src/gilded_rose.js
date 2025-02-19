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

      const degradationRate = item.sellIn <= 0 ? 2 : 1;
      const specialItems = [this.NAMED_ITEMS.BRIE, this.NAMED_ITEMS.BACKSTAGE];

      // Process item based on name/type
      if (specialItems.includes(item.name)) {
        // if it's a named item (brie or backstage)
        this.#processSpecialItem(item, degradationRate);
      } else if (item.name.startsWith('Normal')) {
        // Any normal items
        this.#processNormalItem(item, degradationRate);
      } else {
        // NOTE: we are going to assume these are the only types of items and not having any validation
        // Any conjured items
        this.#processConjuredItem(item, degradationRate);
      }

      // decrement sellIn for all items after their specific qualities are updated
      item.sellIn--;
    }

    return this.#items;
  }

  // PRIVATE HELPER METHODS
  #processSpecialItem(item, degradationRate) {
    // process Aged Brie or Backstage Passes
    if (item.name === this.NAMED_ITEMS.BRIE) {
      // 'Aged Brie'
      item.quality = item.quality === 50 ? 50 : item.quality + degradationRate;
    } else {
      // 'Backstage Passes"
      let backstageQualityRate = 0;
      if (item.sellIn <= 0) {
        item.quality = 0;
        return;
      } else if (item.sellIn <= 5) {
        backstageQualityRate = 3;
      } else if (item.sellIn <= 10) {
        backstageQualityRate = 2;
      } else {
        backstageQualityRate = 1;
      }

      item.quality = item.quality === 50 ? 50 : item.quality + backstageQualityRate;
    }
  }

  #processNormalItem(item, degradationRate) {
    const newQuality = item.quality - degradationRate;

    if (newQuality > 50) {
      item.quality = 50;
    } else if (newQuality < 0) {
      item.quality = 0;
    } else {
      item.quality = newQuality;
    }
  }

  #processConjuredItem(item, degradationRate) {
    const newQuality = item.quality - degradationRate * 2;

    if (newQuality > 50) {
      item.quality = 50;
    } else if (newQuality < 0) {
      item.quality = 0;
    } else {
      item.quality = newQuality;
    }
  }
}

module.exports = { Shop, Item };
