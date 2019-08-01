module.exports = {
  id: "gripper",
  name: "TR2 Gripper",
  warning: "Made-to-order: Orders take 5-10 business days to ship",
  imgs: ["/img/tr2-gripper"],
  basePrice: 199,
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
