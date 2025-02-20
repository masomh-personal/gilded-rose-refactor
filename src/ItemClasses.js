// NOTE: Base Item class (can't change per rules)
class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

// NOTE: Implementing Strategy Behavioral Design Pattern
// It promotes composition over inheritance, enabling you to select the algorithm at runtime
// Strategy "Abstract" Class
class ItemStrategy {
  /**
   * Abstract method to be implemented in subclasses
   * Forces all child classes to implement update(item).
   * If a child class doesn’t provide its own update() method: throws an error
   */
  update(item) {
    throw new Error('update() must be implemented in subclasses');
  }
}

class NormalItemStrategy extends ItemStrategy {
  update(item) {
    const degradationRate = item.sellIn <= 0 ? 2 : 1;
    item.quality = Math.max(0, item.quality - degradationRate);
    item.sellIn--;
  }
}

class AgedBrieStrategy extends ItemStrategy {
  update(item) {
    const increaseRate = item.sellIn <= 0 ? 2 : 1;
    item.quality = Math.min(50, item.quality + increaseRate);
    item.sellIn--;
  }
}

class BackstagePassStrategy extends ItemStrategy {
  update(item) {
    if (item.sellIn <= 0) {
      item.quality = 0;
    } else if (item.sellIn <= 5) {
      item.quality = Math.min(50, item.quality + 3);
    } else if (item.sellIn <= 10) {
      item.quality = Math.min(50, item.quality + 2);
    } else {
      item.quality = Math.min(50, item.quality + 1);
    }
    item.sellIn--;
  }
}

class ConjuredItemStrategy extends ItemStrategy {
  update(item) {
    const degradationRate = item.sellIn <= 0 ? 4 : 2;
    item.quality = Math.max(0, item.quality - degradationRate);
    item.sellIn--;
  }
}

class SulfurasStrategy extends ItemStrategy {
  update(item) {
    // Sulfuras does not change quality or sellIn
    // Future proof if logic ever needs to be added
  }
}

class UnknownItemStrategy extends ItemStrategy {
  update(item) {
    const degradationRate = item.sellIn <= 0 ? 4 : 2;
    item.quality = Math.max(0, item.quality - degradationRate);
    item.sellIn--;
  }
}

module.exports = {
  Item,
  NormalItemStrategy,
  AgedBrieStrategy,
  BackstagePassStrategy,
  ConjuredItemStrategy,
  SulfurasStrategy,
  UnknownItemStrategy,
};
