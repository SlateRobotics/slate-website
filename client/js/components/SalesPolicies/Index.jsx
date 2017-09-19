var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;

var Component = React.createClass({
  componentDidMount: function () {
    document.title = "Sales Policies - Slate Robotics";
    window.scrollTo(0,0);
  },

  render: function() {
    return (
      <div className="container-fluid" style={Style.container}>
        <div className="row">
          <div className="col-md-8 col-xs-12 col-centered">
            <h2>SALES & REFUND TERMS AND CONDITIONS ("TERMS")</h2>
            <h3>U.S. Sales and Refund Policy</h3>
            <p>
              Thanks for shopping at Slate Robotics, Inc. ("Slate Robotics"). We appreciate the
              fact that you like to buy the cool stuff we build. We also
              want to make sure you have a rewarding experience while
              you’re exploring, evaluating, and purchasing our products.
            </p>
            <p>
              As with any shopping experience, there are terms and conditions
              that apply to transactions at Slate Robotics. We’ll be as
              brief as our attorneys will allow. The main thing to remember
              is that by placing an order or making a purchase at Slate
              Robotics, you agree to the terms set forth below along with
              Slate Robotics's <a href="/privacy-policy">Privacy Policy</a>{" "}
              and <a href="/terms-and-conditions">Terms & Conditions</a>.
            </p>
            <h3>Standard Return Policy</h3>
            <p>
              We fundamentally believe you will be thrilled with the products
              you purchase from Slate Robotics. That’s because we go out of
              our way to ensure that they’re designed and built to be just
              what you need. We understand, however, that sometimes a product
              may not be what you expected it to be. In that unlikely event,
              we invite you to review the following terms related to
              returning a product.
            </p>
            <p>
              For any undamaged product, simply ship it to the address located
              in the footer of this website with its included accessories and
              packaging along with the original receipt within 14 days of the
              date you receive the product, and we’ll exchange it or offer a
              refund based upon the original payment method.
            </p>
            <h3>Pricing and Price Reductions/Corrections</h3>
            <p>
              Slate Robotics reserves the right to change prices for products
              displayed at/on slaterobots.com ("the website") at any time, and to
              correct pricing errors that may inadvertently occur. In the event
              you have been charged more than the posted price for a product on
              the website, please contact us using the information in the footer
              at the bottom of the page for a refund of the overcharge.
            </p>
            <p>
              Should Slate Robotics reduce its price on any branded product
              within 14 calendar days from the date you receive your product,
              feel free to contact us using the information in the footer
              at the bottom of the page to request a refund or credit of the
              difference between the price you were charged and the current
              selling price. To receive the refund or credit you must contact
              Slate Robotics within 14 calendar days of the price change.
              Please note that this excludes limited-time price reductions,
              such as those that occur during special sales events, such as
              Black Friday or Cyber Monday.
            </p>
            <p>
              Price protection is only available for up to 10 units of a
              particular product. Additionally, we may require that you have
              the product with you or otherwise have proof of possession when
              requesting price protection.
            </p>
            <p>
              Prices shown are in U.S. dollars. If you are paying for your
              order with an international Visa, MasterCard, or American Express
              credit card, please note that the purchase price may fluctuate
              with exchange rates. In addition, your bank or credit card issuer
              may also charge you foreign conversion charges and fees, which
              may also increase the overall cost of your purchase. Please
              contact your bank or credit card issuer regarding these fees.
            </p>
            <h3>Order Acceptance/Confirmation</h3>
            <p>
              Slate Robotics may, in its sole discretion, refuse or cancel any
              order and limit order quantity. Slate Robotics may also require
              additional qualifying information prior to accepting or
              processing any order. Once we receive your Online order, we’ll
              provide you with an email order confirmation. Your receipt of an
              order confirmation, however, does not signify Slate Robotics's
              acceptance of your order, nor does it constitute confirmation
              of our offer to sell; we are simply confirming that we received
              your order. Slate Robotics reserves the right at any time after
              receiving your order to accept or decline your order for any
              reason. If Slate Robotics cancels an order after you have already
              been billed, Slate Robotics will refund the billed amount.
            </p>
            <h3>Shipping & Delivery</h3>
            <p>
              Since the actual delivery of your order can be impacted by many
              events beyond Slate Robotics's control once it leaves our
              facilities, Slate Robotics cannot be held liable for late
              deliveries. We will, however, work with you to ensure a smooth
              delivery.
            </p>
            <h3>In-Store Pickup and Return</h3>
            <p>
              Slate Robotics offers in-store pickup for many of the items
              available on the slaterobots.com. Certain products and payment
              methods, however, may not qualify for in-store pickup. Only you
              or the person designated by you may pick up the item(s) purchased.
              A government-issued photo ID and order number will be required
              for pickup. Slate Robotics will notify you when your order is
              ready and the date by which you need to pick up your items. We’ll
              also send you a reminder or two, just in case it slips your mind.
              If you don’t pick up your order, Slate Robotics may cancel it.
            </p>
            <h3>Pickup Contact</h3>
            <p>
              If you select in-store pickup, you may designate a third party
              to pick up your order. You must provide the name and email
              address of the third party. Please note that certain products
              and payment methods are not eligible for in-store pickup by a
              third party. The third party will need to bring a government
              issued photo ID and order number for pickup. Slate Robotics is
              not responsible for actions taken by the third party once your
              item(s) have been picked up.
            </p>
            <h3>Consumers Only</h3>
            <p>
              Slate Robotics sells and ships products to end-user customers
              only, and we reserve the right to refuse or cancel your order
              if we suspect you are purchasing products for resale.
            </p>
            <h3>U.S. Shipping Only</h3>
            <p>
              Products purchased online from Slate Robotics will only be
              shipped to addresses within the U.S. and are subject to U.S.
              and foreign export control laws and regulations. Products must
              be purchased, sold, exported, re-exported, transferred, and
              used in compliance with these export laws and regulations.
            </p>
            <h3>Product Availability and Limitations</h3>
            <p>
              Given the popularity and/or supply constraints of some of our
              products, Slate Robotics may have to limit the number of products
              available for purchase. Trust us, we’re building them as fast as
              we can. Slate Robotics reserves the right to change quantities
              available for purchase at any time, even after you place an order.
              Furthermore, there may be occasions when Slate Robotics confirms
              your order but subsequently learns that it cannot supply the
              ordered product. In the event we cannot supply a product you
              ordered, Slate Robotics will cancel the order and refund your
              purchase price in full.
            </p>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = Component;
