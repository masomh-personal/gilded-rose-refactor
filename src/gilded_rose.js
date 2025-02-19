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

  ITEM_NAMES = {
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
    for (let i = 0; i < this.#items.length; i++) {
      if (
        this.#items[i].name !== 'Aged Brie' &&
        this.#items[i].name !== 'Backstage passes to a TAFKAL80ETC concert'
      ) {
        if (this.#items[i].quality > 0) {
          if (this.#items[i].name !== 'Sulfuras, Hand of Ragnaros') {
            this.#items[i].quality = this.#items[i].quality - 1;
          }
        }
      } else {
        if (this.#items[i].quality < 50) {
          this.#items[i].quality = this.#items[i].quality + 1;
          if (this.#items[i].name === 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.#items[i].sellIn < 11) {
              if (this.#items[i].quality < 50) {
                this.#items[i].quality = this.#items[i].quality + 1;
              }
            }
            if (this.#items[i].sellIn < 6) {
              if (this.#items[i].quality < 50) {
                this.#items[i].quality = this.#items[i].quality + 1;
              }
            }
          }
        }
      }

      if (this.#items[i].name !== 'Sulfuras, Hand of Ragnaros') {
        this.#items[i].sellIn = this.#items[i].sellIn - 1;
      }

      if (this.#items[i].sellIn < 0) {
        if (this.#items[i].name !== 'Aged Brie') {
          if (this.#items[i].name !== 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.#items[i].quality > 0) {
              if (this.#items[i].name !== 'Sulfuras, Hand of Ragnaros') {
                this.#items[i].quality = this.#items[i].quality - 1;
              }
            }
          } else {
            this.#items[i].quality = this.#items[i].quality - this.#items[i].quality;
          }
        } else {
          if (this.#items[i].quality < 50) {
            this.#items[i].quality = this.#items[i].quality + 1;
          }
        }
      }
    }

    return this.#items;
  }
}

module.exports = { Shop, Item };
