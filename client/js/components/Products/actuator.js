module.exports = {
  id: "actuator",
  name: "TR2 Actuator",
  warning: "Made-to-order: Orders take 5-10 business days to ship",
  imgs: ["/img/tr2-actuator-2","/img/tr2-actuator-1"],
  basePrice: 375,
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
      label: "US Continental Shipping",
      price: 20,
      enabled: true,
    }, {
      id: 2,
      label: "Canada Shipping",
      price: 35,
      enabled: true,
    }]
  }],
};
