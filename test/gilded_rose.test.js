const { Shop, Item } = require('../src/gilded_rose');
const { describe, it, expect, beforeEach } = require('@jest/globals');

// TODO: use beforeEach() and reset Shop object
beforeEach(() => {});

describe('Gilded Rose', () => {
  it('should decrease sellIn and quality by 1 for normal items', () => {
    const shop = new Shop([new Item('Normal Item', 10, 20)]);
    shop.updateQuality();
    expect(shop.items[0].sellIn).toBe(9);
    expect(shop.items[0].quality).toBe(19);
  });

  it('should degrade quality twice as fast after sellIn reaches 0', () => {
    const shop = new Shop([new Item('Normal Item', 0, 10)]);
    shop.updateQuality();
    expect(shop.items[0].sellIn).toBe(-1);
    expect(shop.items[0].quality).toBe(8);
  });

  it('should never decrease quality below 0', () => {
    const shop = new Shop([new Item('Normal Item', 5, 0)]);
    shop.updateQuality();
    expect(shop.items[0].quality).toBe(0);
  });

  it("should increase quality of 'Aged Brie' as it gets older", () => {
    const shop = new Shop([new Item('Aged Brie', 10, 25)]);
    shop.updateQuality();
    expect(shop.items[0].sellIn).toBe(9);
    expect(shop.items[0].quality).toBe(26);
  });

  it("should never increase quality above 50 for 'Aged Brie'", () => {
    const shop = new Shop([new Item('Aged Brie', 5, 50)]);
    shop.updateQuality();
    expect(shop.items[0].quality).toBe(50);
  });

  it("should never change quality or sellIn for 'Sulfuras, Hand of Ragnaros'", () => {
    const shop = new Shop([new Item('Sulfuras, Hand of Ragnaros', 10, 80)]);
    shop.updateQuality();
    expect(shop.items[0].sellIn).toBe(10);
    expect(shop.items[0].quality).toBe(80);
  });

  it("should increase quality of 'Backstage passes' as sellIn approaches", () => {
    const shop = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 11, 20)]);
    shop.updateQuality();
    expect(shop.items[0].quality).toBe(21);
  });

  // TODO: Task #2 - Continue to add more tests to get to 90+ percent test coverage
  // NOTE: lines 44-45 / 49-50 / 68-72 are not covered (scenarios below should cover them)
  it("should increase quality of 'Backstage passes' by 2 when 10 days or less remain", () => {
    const shop = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20)]);
    shop.updateQuality();
    expect(shop.items[0].quality).toBe(22);
  });

  it("should increase quality of 'Backstage passes' by 3 when 5 days or less remain", () => {
    const shop = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20)]);
    shop.updateQuality();
    expect(shop.items[0].quality).toBe(23);
  });

  it("should set quality of 'Backstage passes' to 0 after concert", () => {
    const shop = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20)]);
    shop.updateQuality();
    expect(shop.items[0].quality).toBe(0);
  });

  it('should set quality of Aged Brie to less than 50, we can decrement + 1', () => {
    const shop = new Shop([new Item('Aged Brie', 0, 20)]);
    shop.updateQuality();
    expect(shop.items[0].quality).toBe(22);
  });

  // TODO: Task #6 - Adding new test methods to check on new feature "Conjured Items"
  // it("should decrease quality of 'Conjured' items twice as fast", () => {});
  //
  // it("should decrease quality of 'Conjured' items twice as fast after sellIn reaches 0", () => {});
  //
  // it("should not decrease 'Conjured' item quality below 0", () => {});
});
