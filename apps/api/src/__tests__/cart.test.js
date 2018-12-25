var cart = require('../cart');

function setupCart (products) {
  if (!products) {
    products = [
      {
        id: 'product-1',
        name: 'Laravel',
        price: 60,
        description: 'Lorem'
      },
      {
        id: 'product-2',
        name: 'Eloquent JS',
        price: 40,
        description: 'Lorem',
      }
    ]
  }

  var c = cart.create();

  for (var i = 0; i < products.length; i++) {
    var product = products[i];
    c = cart.addItem(c, product, 1);
  }

  return {
    cart: c,
    expectedTotal: 100,
  };
}

describe('cart module', () => {
  test('create cart', function () {
    var c = cart.create();

    expect(Array.isArray(c.lineItems)).toBe(true);
  });

  test('create cart with initial line items', function () {
    var initialLineItems = [
      { productId: 'product-1', name: 'Awesome Book', price: 20, qty: 3 },
      { productId: 'product-5', name: 'Good Book', price: 40,  qty: 2 },
    ];

    var c = cart.create(initialLineItems);

    expect(Array.isArray(c.lineItems)).toBe(true);
    expect(c.lineItems.length).toBe(2);

    expect(c.lineItems[0].productId).toBe('product-1');
    expect(c.lineItems[0].name).toBe('Awesome Book');
    expect(c.lineItems[0].price).toBe(20);
    expect(c.lineItems[0].qty).toBe(3);

    expect(c.lineItems[1].productId).toBe('product-5');
    expect(c.lineItems[1].name).toBe('Good Book');
    expect(c.lineItems[1].price).toBe(40);
    expect(c.lineItems[1].qty).toBe(2);
  });

  test('add product to cart', function () {
    var productA = {
      id: 'product-1',
      name: 'Book A',
      price: 50,
      description: 'Lorem',
    };
    var productB = {
      id: 'product-2',
      name: 'Book B',
      price: 20,
      description: 'Lorem',
    };

    var c = cart.create();

    c = cart.addItem(c, productA, 2);
    c = cart.addItem(c, productB, 1);

    var lineItems = c.lineItems;

    expect(lineItems.length).toBe(2);
    expect(lineItems[0].productId).toBe('product-1');
    expect(lineItems[0].name).toBe('Book A');
    expect(lineItems[0].price).toBe(50);
    expect(lineItems[0].qty).toBe(2);
    expect(lineItems[0].description).toBe(undefined);
    expect(lineItems[1].productId).toBe('product-2');
    expect(lineItems[1].name).toBe('Book B');
    expect(lineItems[1].price).toBe(20);
    expect(lineItems[1].qty).toBe(1);
    expect(lineItems[1].description).toBe(undefined);

    c = cart.addItem(c, productA, 1);

    lineItems = c.lineItems;

    expect(lineItems.length).toBe(2);
    expect(lineItems[0].productId).toBe('product-1');
    expect(lineItems[0].name).toBe('Book A');
    expect(lineItems[0].price).toBe(50);
    expect(lineItems[0].qty).toBe(3);
  });

  test('updateItemQty', function () {
    var setup = setupCart();
    var c = setup.cart;
    var lineItems = c.lineItems;

    expect(lineItems.length).toBe(2);
    expect(lineItems[1].productId).toBe('product-2');
    expect(lineItems[1].name).toBe('Eloquent JS');
    expect(lineItems[1].price).toBe(40);
    expect(lineItems[1].qty).toBe(1);

    c = cart.setItemQty(c, 'product-2', 2);
    lineItems = c.lineItems;

    expect(lineItems.length).toBe(2);
    expect(lineItems[1].productId).toBe('product-2');
    expect(lineItems[1].name).toBe('Eloquent JS');
    expect(lineItems[1].price).toBe(40);
    expect(lineItems[1].qty).toBe(2);
  });

  test('total', function () {
    var setup = setupCart();
    var c = setup.cart

    expect(cart.total(c)).toBe(setup.expectedTotal);

    var product = {
      id: 'product-3',
      name: 'ReactJS',
      price: 80,
      description: 'Lorem ipsum',
    }

    c = cart.addItem(c, product, 3);

    expect(cart.total(c)).toBe(340);
  });

  test('format', () => {
    expect(cart.format(8000)).toBe('$8,000')
    expect(cart.format(400)).toBe('$400')
  })

  test('removeItem', () => {
    var c = cart.create();

    c = cart.addItem(c, { id: 'product-1', price: 5 }, 5);
    c = cart.addItem(c, { id: 'product-2', price: 20 }, 2);
    c = cart.addItem(c, { id: 'product-3', price: 20 }, 1);

    c = cart.removeItem(c, 'product-2');

    expect(c.lineItems.length).toBe(2);
    expect(cart.total(c)).toBe(45);
  })

  test('total with discount', () => {
    var c = cart.create();

    c = cart.addItem(c, { id: 'product-1', price: 10 }, 5);
    c = cart.addItem(c, { id: 'product-2', price: 25 }, 2);

    expect(cart.total(c)).toBe(100)

    var discountA = {
      type: 'percent',
      amount: 10
    }

    expect(cart.total(c, discountA)).toBe(90)

    var discountB = {
      type: 'nominal',
      amount: 30
    }

    expect(cart.total(c, discountB)).toBe(70)
  })

  test('discountByPercent', () => {
    var total = 2000
    var discountAmout = 10 // percent

    var result = cart.discountByPercent(total, discountAmout)

    expect(result).toBe(1800)
  })

  test('discountByNominal', () => {
    var total = 2000
    var discountAmout = 500 // nominal

    var result = cart.discountByNominal(total, discountAmout)

    expect(result).toBe(1500)
  })

  describe('applyDiscount', () => {
    it('should be apply correct discount', () => {
      var d1 =  {
        amount: 15,
        type: 'percent'
      }

      expect(cart.applyDiscount(1000, d1)).toBe(850)

      var d2 =  {
        amount: 300,
        type: 'nominal'
      }

      expect(cart.applyDiscount(1000, d2)).toBe(700)
      expect(cart.applyDiscount(1000, null)).toBe(1000)
      expect(cart.applyDiscount(1000, undefined)).toBe(1000)
    })

    it('should throw error when invalid value of discount.type provided', () => {
      expect(() => {
        discount.applyDiscount(1000, { amount: 20, type: 'invalid-type' })
      }).toThrow()
    })

    it('should throw error when invalid type of discount.amount provided', () => {
      expect(function () {
        discount.applyDiscount(1000, { amount: null, type: 'percent' })
      }).toThrow()

      expect(function () {
        discount.applyDiscount(1000, { amount: '20', type: 'percent' })
      }).toThrow()
    })
  })
})
