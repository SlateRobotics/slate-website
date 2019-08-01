module.exports = {
  id: "tr2",
  name: "TR2",
  warning: "Made-to-order: Orders take 4-8 weeks to ship",
  imgs: ["/img/slate-tr2-4"],
  links:[{url:"/tr2",label:"Overview"},{url:"/tr2/specs",label:"Specs"}],
  basePrice: 3999,
  config: [{
    name: "computer",
    label: "Computer",
    description: '<div style="font-style:italic;" ><span data-reactid=".0.1.1.0.0.1.2.1.0">Learn more about NVIDIA\'s</span><span data-reactid=".0.1.1.0.0.1.2.1.1"> </span><a target="_blank" href="http://elinux.org/Jetson_Nano">Nano</a><span> and</span><span> </span><a target="_blank" href="http://elinux.org/Jetson_AGX_Xavier">AGX Xavier</a></div>',
    items: [{
      id: 0,
      label: "NVIDIA Jetson Nano",
      price: 0,
      enabled: true,
    }, {
      id: 1,
      label: "NVIDIA AGX Xavier",
      price: 700,
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
    default: 1,
    items: [{
      id: 0,
      label: "Local Pickup - Springfield, MO",
      price: 0,
      enabled: true,
    }, {
      id: 1,
      label: "US Continental Shipping",
      price: 175,
      enabled: true,
    }, {
      id: 2,
      label: "Canada Shipping",
      price: 350,
      enabled: true,
    }, {
      id: 3,
      label: "Europe Shipping",
      price: 1250,
      enabled: true,
    }]
  }],
};
