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

      // Process item based on name/type
      if (item in this.NAMED_ITEMS) {
        // if it's a named item (brie or backstage)
        this.#processNamedItems(item);
      } else if (item.name.startsWith('Normal')) {
        // Any normal items
        this.#processNormalItem(item);
      } else {
        // NOTE: we are going to assume these are the only types of items and not having any validation
        // Any conjured items
        this.#processConjuredItem(item);
      }

      // ====================================================================================
      if (item.name !== 'Aged Brie' && item.name !== 'Backstage passes to a TAFKAL80ETC concert') {
        if (item.quality > 0) {
          item.quality = item.quality - 1;
        }
      } else {
        if (item.quality < 50) {
          item.quality = item.quality + 1;
          if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
            if (item.sellIn < 11) {
              if (item.quality < 50) {
                item.quality = item.quality + 1;
              }
            }
            if (item.sellIn < 6) {
              if (item.quality < 50) {
                item.quality = item.quality + 1;
              }
            }
          }
        }
      }

      item.sellIn = item.sellIn - 1;

      if (item.sellIn < 0) {
        if (item.name !== 'Aged Brie') {
          if (item.name !== 'Backstage passes to a TAFKAL80ETC concert') {
            if (item.quality > 0) {
              item.quality = item.quality - 1;
            }
          } else {
            item.quality = item.quality - item.quality;
          }
        } else {
          if (item.quality < 50) {
            item.quality = item.quality + 1;
          }
        }
      }
    }

    return this.#items;
  }

  // PRIVATE HELPER METHODS
  #processNamedItems(item) {
    // process Aged Brie or Backstage Passes
  }
  #processNormalItem(item) {
    // process 'Normal' items
  }

  #processConjuredItem(item) {
    // process 'Conjured' items
  }
}

module.exports = { Shop, Item };
