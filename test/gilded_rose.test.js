const { Shop } = require('../src/gilded_rose');
const { Item, ItemStrategy } = require('../src/ItemClasses');
const { describe, it, expect } = require('@jest/globals');

const NAMED_ITEMS = {
  BRIE: 'Aged Brie',
  SULFURAS: 'Sulfuras, Hand of Ragnaros',
  BACKSTAGE: 'Backstage passes to a TAFKAL80ETC concert',
  NORMAL: 'Normal Item',
  CONJURED: 'Conjured Mana Biscuits',
};

describe('Gilded Rose', () => {
  describe('Aged Brie', () => {
    it('should increase quality as it gets older', () => {
      const item = new Item(NAMED_ITEMS.BRIE, 10, 25);
      const shop = new Shop([item]);
      const [updatedItem] = shop.updateQuality();
      expect(updatedItem.sellIn).toBe(9);
      expect(updatedItem.quality).toBe(26);
    });

    it('should cap quality at 50 even as Aged Brie gets older', () => {
      const item = new Item(NAMED_ITEMS.BRIE, 5, 50);
      const shop = new Shop([item]);
      const [updatedItem] = shop.updateQuality();
      expect(updatedItem.quality).toBe(50);
    });

    it('should increase quality by 2 when sell-in date has passed', () => {
      const item = new Item(NAMED_ITEMS.BRIE, 0, 20);
      const shop = new Shop([item]);
      const [updatedItem] = shop.updateQuality();
      expect(updatedItem.quality).toBe(22);
    });
  });

  describe('Sulfuras, Hand of Ragnaros', () => {
    it('should never change quality or sellIn for legendary item', () => {
      const item = new Item(NAMED_ITEMS.SULFURAS, 10, 80);
      const shop = new Shop([item]);
      const [updatedItem] = shop.updateQuality();
      expect(updatedItem.sellIn).toBe(10);
      expect(updatedItem.quality).toBe(80);
    });
  });

  describe('Backstage Passes', () => {
    it('should increase quality by 1 when more than 10 days remain', () => {
      const item = new Item(NAMED_ITEMS.BACKSTAGE, 11, 20);
      const shop = new Shop([item]);
      const [updatedItem] = shop.updateQuality();
      expect(updatedItem.quality).toBe(21);
    });

    it('should increase quality by 2 when 10 days or less remain', () => {
      const item = new Item(NAMED_ITEMS.BACKSTAGE, 10, 20);
      const shop = new Shop([item]);
      const [updatedItem] = shop.updateQuality();
      expect(updatedItem.quality).toBe(22);
    });

    it('should increase quality by 3 when 5 days or less remain', () => {
      const item = new Item(NAMED_ITEMS.BACKSTAGE, 5, 20);
      const shop = new Shop([item]);
      const [updatedItem] = shop.updateQuality();
      expect(updatedItem.quality).toBe(23);
    });

    it('should set quality to 0 after the concert', () => {
      const item = new Item(NAMED_ITEMS.BACKSTAGE, 0, 20);
      const shop = new Shop([item]);
      const [updatedItem] = shop.updateQuality();
      expect(updatedItem.quality).toBe(0);
    });
  });

  describe('Normal Items', () => {
    it('should decrease sellIn and quality by 1 each day', () => {
      const item = new Item(NAMED_ITEMS.NORMAL, 10, 20);
      const shop = new Shop([item]);
      const [updatedItem] = shop.updateQuality();
      expect(updatedItem.sellIn).toBe(9);
      expect(updatedItem.quality).toBe(19);
    });

    it('should decrease quality twice as fast when sellIn reaches 0', () => {
      const item = new Item(NAMED_ITEMS.NORMAL, 0, 10);
      const shop = new Shop([item]);
      const [updatedItem] = shop.updateQuality();
      expect(updatedItem.sellIn).toBe(-1);
      expect(updatedItem.quality).toBe(8);
    });

    it('should not decrease quality below 0', () => {
      const item = new Item(NAMED_ITEMS.NORMAL, 5, 0);
      const shop = new Shop([item]);
      const [updatedItem] = shop.updateQuality();
      expect(updatedItem.quality).toBe(0);
    });
  });

  describe('Conjured Items', () => {
    it('should decrease quality twice as fast before sell-in expires (decrement by 2)', () => {
      const item = new Item(NAMED_ITEMS.CONJURED, 10, 10);
      const shop = new Shop([item]);
      const [updatedItem] = shop.updateQuality();
      expect(updatedItem.sellIn).toBe(9);
      expect(updatedItem.quality).toBe(8);
    });

    it('should decrease quality twice as fast after sell-in expires (decrement by 4)', () => {
      const item = new Item(NAMED_ITEMS.CONJURED, 0, 10);
      const shop = new Shop([item]);
      const [updatedItem] = shop.updateQuality();
      expect(updatedItem.sellIn).toBe(-1);
      expect(updatedItem.quality).toBe(6);
    });

    it('should not decrease quality below 0', () => {
      const item = new Item(NAMED_ITEMS.CONJURED, 5, 0);
      const shop = new Shop([item]);
      const [updatedItem] = shop.updateQuality();
      expect(updatedItem.quality).toBe(0);
    });
  });

  describe('Unknown Items (treated as Conjured)', () => {
    it('should decrease quality twice as fast before sell-in expires', () => {
      const item = new Item('Mystic Orb', 10, 10);
      const shop = new Shop([item]);
      const [updatedItem] = shop.updateQuality();
      expect(updatedItem.sellIn).toBe(9);
      expect(updatedItem.quality).toBe(8);
    });

    it('should decrease quality twice as fast after sell-in expires', () => {
      const item = new Item('Ancient Relic', 0, 10);
      const shop = new Shop([item]);
      const [updatedItem] = shop.updateQuality();
      expect(updatedItem.sellIn).toBe(-1);
      expect(updatedItem.quality).toBe(6);
    });

    it('should not decrease quality below 0', () => {
      const item = new Item('Forgotten Artifact', 5, 0);
      const shop = new Shop([item]);
      const [updatedItem] = shop.updateQuality();
      expect(updatedItem.quality).toBe(0);
    });
  });

  describe('ItemStrategy (Abstract Class)', () => {
    it('should throw an error if update() is not implemented in a subclass', () => {
      const item = new Item('Generic Item', 5, 10);
      const strategy = new ItemStrategy();

      expect(() => strategy.update(item)).toThrowError(
        'update() must be implemented in subclasses'
      );
    });
  });

  describe('Shop Class Instantiation', () => {
    it('should initialize with an array of items', () => {
      const item = new Item('Forgotten Artifact', 5, 0);
      const shop = new Shop([item]);

      // Directly check that shop.items contains the item
      expect(shop.items).toEqual([item]);
    });

    it('should initialize with an empty array if no items are provided', () => {
      const shop = new Shop();

      // Verify that items is initialized as an empty array
      expect(shop.items).toEqual([]);
    });
  });
});
