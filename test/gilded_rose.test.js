const { Shop, Item } = require('../src/gilded_rose');
const { describe, it, expect, beforeEach } = require('@jest/globals');

const NAMED_ITEMS = {
  BRIE: 'Aged Brie',
  SULFURAS: 'Sulfuras, Hand of Ragnaros',
  BACKSTAGE: 'Backstage passes to a TAFKAL80ETC concert',
  NORMAL: 'Normal Item',
  CONJURED: 'Conjured Mana Biscuits',
};

let shop;

beforeEach(() => {
  shop = null;
});

describe('Gilded Rose', () => {
  describe('Aged Brie', () => {
    it('should increase quality as it gets older', () => {
      const newItem = new Item(NAMED_ITEMS.BRIE, 10, 25);
      shop = new Shop([newItem]);
      const [updatedItem] = shop.updateQuality();
      expect(updatedItem.sellIn).toBe(9);
      expect(updatedItem.quality).toBe(26);
    });

    it('should never increase quality above 50', () => {
      const newItem = new Item(NAMED_ITEMS.BRIE, 5, 50);
      shop = new Shop([newItem]);
      const [updatedItem] = shop.updateQuality();
      expect(updatedItem.quality).toBe(50);
    });

    it('should increase quality by 2 when past sell-in date', () => {
      const newItem = new Item(NAMED_ITEMS.BRIE, 0, 20);
      shop = new Shop([newItem]);
      const [updatedItem] = shop.updateQuality();
      expect(updatedItem.quality).toBe(22);
    });
  });

  describe('Sulfuras, Hand of Ragnaros', () => {
    it('should never change quality or sellIn', () => {
      const newItem = new Item(NAMED_ITEMS.SULFURAS, 10, 80);
      shop = new Shop([newItem]);
      const [updatedItem] = shop.updateQuality();
      expect(updatedItem.sellIn).toBe(10);
      expect(updatedItem.quality).toBe(80);
    });
  });

  describe('Backstage Passes', () => {
    it('should increase quality by 1 when more than 10 days remain', () => {
      const newItem = new Item(NAMED_ITEMS.BACKSTAGE, 11, 20);
      shop = new Shop([newItem]);
      const [updatedItem] = shop.updateQuality();
      expect(updatedItem.quality).toBe(21);
    });

    it('should increase quality by 2 when 10 days or less remain', () => {
      const newItem = new Item(NAMED_ITEMS.BACKSTAGE, 10, 20);
      shop = new Shop([newItem]);
      const [updatedItem] = shop.updateQuality();
      expect(updatedItem.quality).toBe(22);
    });

    it('should increase quality by 3 when 5 days or less remain', () => {
      const newItem = new Item(NAMED_ITEMS.BACKSTAGE, 5, 20);
      shop = new Shop([newItem]);
      const [updatedItem] = shop.updateQuality();
      expect(updatedItem.quality).toBe(23);
    });

    it('should set quality to 0 after the concert', () => {
      const newItem = new Item(NAMED_ITEMS.BACKSTAGE, 0, 20);
      shop = new Shop([newItem]);
      const [updatedItem] = shop.updateQuality();
      expect(updatedItem.quality).toBe(0);
    });
  });

  describe('Normal Items', () => {
    it('should decrease sellIn and quality by 1 each day', () => {
      const newItem = new Item(NAMED_ITEMS.NORMAL, 10, 20);
      shop = new Shop([newItem]);
      const [updatedItem] = shop.updateQuality();
      expect(updatedItem.sellIn).toBe(9);
      expect(updatedItem.quality).toBe(19);
    });

    it('should degrade quality twice as fast after sellIn reaches 0', () => {
      const newItem = new Item(NAMED_ITEMS.NORMAL, 0, 10);
      shop = new Shop([newItem]);
      const [updatedItem] = shop.updateQuality();
      expect(updatedItem.sellIn).toBe(-1);
      expect(updatedItem.quality).toBe(8);
    });

    it('should never decrease quality below 0', () => {
      const newItem = new Item(NAMED_ITEMS.NORMAL, 5, 0);
      shop = new Shop([newItem]);
      const [updatedItem] = shop.updateQuality();
      expect(updatedItem.quality).toBe(0);
    });
  });

  describe('Conjured Items', () => {
    it('should decrease quality twice as fast before sell-in expires (decrement by 2)', () => {
      const newItem = new Item(NAMED_ITEMS.CONJURED, 10, 10);
      shop = new Shop([newItem]);
      const [updatedItem] = shop.updateQuality();
      expect(updatedItem.sellIn).toBe(9);
      expect(updatedItem.quality).toBe(8);
    });

    it('should decrease quality twice as fast after sell-in expires (decrement by 4)', () => {
      const newItem = new Item(NAMED_ITEMS.CONJURED, 0, 10);
      shop = new Shop([newItem]);
      const [updatedItem] = shop.updateQuality();
      expect(updatedItem.sellIn).toBe(-1);
      expect(updatedItem.quality).toBe(6);
    });

    it('should not decrease quality below 0', () => {
      const newItem = new Item(NAMED_ITEMS.CONJURED, 5, 0);
      shop = new Shop([newItem]);
      const [updatedItem] = shop.updateQuality();
      expect(updatedItem.sellIn).toBe(4);
      expect(updatedItem.quality).toBe(0);
    });
  });
});
