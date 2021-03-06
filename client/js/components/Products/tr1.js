module.exports = {
  id: "tr1",
  discontinued: true,
  name: "Slate TR1",
  basePrice: 4750,
  imgs: ["/img/slate-tr1-4"],
  config: [{
    name: "arm",
    label: "Arms",
    items: [{
      id: 0,
      label: "One-armed TR1",
      price: 0,
      enabled: true,
    }, {
      id: 1,
      label: "Two-armed TR1",
      price: 999,
      enabled: true,
    }]
  }, {
    name: "computer",
    label: "Computer",
    description: '<div style="font-style:italic;" ><span data-reactid=".0.1.1.0.0.1.2.1.0">Learn more about NVIDIA\'s</span><span data-reactid=".0.1.1.0.0.1.2.1.1"> </span><a target="_blank" href="http://elinux.org/Jetson_TX1">TX1</a><span> and</span><span> </span><a target="_blank" href="http://elinux.org/Jetson_TX2">TX2</a></div>',
    items: [{
      id: 0,
      label: "NVIDIA Jetson TX1",
      price: 0,
      enabled: true,
    }, {
      id: 1,
      label: "NVIDIA Jetson TX2",
      price: 300,
      enabled: true,
    }]
  }, {
    name: "linearActuator",
    label: "Linear Actuator",
    items: [{
      id: 0,
      label: "150mm Linear Actuator",
      price: 0,
      enabled: true,
    }, {
      id: 1,
      label: "150mm Linear Actuator w/ position feedback",
      price: 75,
      enabled: true,
    }]
  }, {
    name: "battery",
    label: "Battery",
    items: [{
      id: 0,
      label: "12V 150Wh Lithium Ion Battery",
      price: 0,
      enabled: true,
    }, {
      id: 1,
      label: "12V 278Wh Lithium Ion Battery",
      price: 150,
      enabled: true,
    }]
  }, {
    name: "shipping",
    label: "Shipping",
    items: [{
      id: 0,
      label: "Local Pickup - Springfield, MO",
      price: 0,
      enabled: true,
    }, {
      id: 1,
      label: "US Continental LTL Shipping",
      price: 500,
      enabled: true,
    }, {
      id: 4,
      label: "Canada LTL Shipping",
      price: 850,
      enabled: true,
    }, {
      id: 5,
      label: "France Air Freight Shipping",
      price: 2250,
      enabled: true,
    }, {
      id: 2,
      label: "Other International Shipping",
      price: 2500,
      enabled: true,
    }, {
      id: 3,
      label: "Custom LTL Shipping Quote",
      price: 836.04,
      enabled: false,
    }]
  }],
}
