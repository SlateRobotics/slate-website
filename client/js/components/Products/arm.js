module.exports = {
  id: "arm",
  name: "TR2 Arm",
  warning: "Made-to-order: Orders take 4-8 weeks to ship",
  imgs: ["/img/slate-tr2-9"],
  basePrice: 1999,
  config: [{
    name: "shipping",
    label: "Shipping",
    default: 1,
    items: [{
      id: 0,
      label: "Local Pickup - Springfield, MO",
      price: 0,
      enabled: true,
    }, {
      id: 1,
      label: "US Contenential Shipping",
      price: 100,
      enabled: true,
    }, {
      id: 2,
      label: "Canada Shipping",
      price: 200,
      enabled: true,
    }]
  }],
};
