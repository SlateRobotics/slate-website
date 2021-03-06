var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;
var IndexRoute = require('react-router').IndexRoute;

var UserStore = require('./stores/user');

var AdminInventory = require('./components/Admin.Inventory/Index.jsx');
var AdminInventoryEdit = require('./components/Admin.Inventory/Edit.jsx');
var AdminInventoryRawMaterials = require('./components/Admin.Inventory/RawMaterials.jsx');
var AdminInventoryOutOfStock = require('./components/Admin.Inventory/OutOfStock.jsx');
var AdminOrders = require('./components/Admin.Orders/Index.jsx');
var AdminOrdersEdit = require('./components/Admin.Orders/Edit.jsx');
var AdminReservations = require('./components/Admin.Reservations/Index.jsx');
var AdminReservationsEdit = require('./components/Admin.Reservations/Edit.jsx');
var AdminUsers = require('./components/Admin.Users/Index.jsx');
var AdminUsersEdit = require('./components/Admin.Users/Edit.jsx');
var Footer = require('./components/Footer/Index.jsx');
var Header = require('./components/Header/Index.jsx');
var Home = require('./components/Home/Index.jsx');
var SignIn = require('./components/SignIn/Index.jsx');
var SignOut = require('./components/SignOut/Index.jsx');
var Register = require('./components/Register/Index.jsx');
var RegisterVerify = require('./components/Register/Verify.jsx');
var ForgotPassword = require('./components/ForgotPassword/Index.jsx');
var ForgotPasswordVerify = require('./components/ForgotPassword/Verify.jsx');
var Fabrication = require('./components/Fabrication/Index.jsx');
var Prototyping = require('./components/Prototyping/Index.jsx');
var tr2 = require('./components/tr2/Index.jsx');
var tr2Specs = require('./components/tr2-specs/Index.jsx');
var tr1 = require('./components/tr1/Index.jsx');
var tr1Specs = require('./components/tr1-specs/Index.jsx');
var tr1Shop = require('./components/shop-tr1/Index.jsx');
var tr2Shop = require('./components/shop-tr2/Index.jsx');
var Printing = require('./components/Printing/Index.jsx');
var Cart = require('./components/cart/Index.jsx');
var Shop = require('./components/shop/Index.jsx');
var ShopItem = require('./components/shop-item/Index.jsx');
var Support = require('./components/Support/Index.jsx');
var Checkout = require('./components/Checkout/Index.jsx');
var CheckoutReview = require('./components/CheckoutReview/Index.jsx');
var CheckoutSuccess = require('./components/CheckoutSuccess/Index.jsx');
var CustomRobotBuilds = require('./components/CustomRobotBuilds/Index.jsx');
var Reservation = require('./components/Reservation/Index.jsx');
var qa = require('./components/Q&A/Index.jsx');
var question = require('./components/Q&A/Question.jsx');
var newQuestion = require('./components/Q&A/New.jsx');
var Order = require('./components/Order/Index.jsx');
var NotFound = require('./components/NotFound/Index.jsx');
var About = require('./components/About/Index.jsx');
var Careers = require('./components/Careers/Index.jsx');
var Apply = require('./components/Careers/Apply.jsx');
var Blog = require('./components/Blog/Index.jsx');
var BlogSingle = require('./components/Blog/Single.jsx');
var BlogEdit = require('./components/Blog/Edit.jsx');
var Docs = require('./components/Docs/Index.jsx');
var DocsSingle = require('./components/Docs/Single.jsx');
var DocsEdit = require('./components/Docs/Edit.jsx');
var PrivacyPolicy = require('./components/PrivacyPolicy/Index.jsx');
var TermsAndConditions = require('./components/TermsAndConditions/Index.jsx');
var SalesPolicies = require('./components/SalesPolicies/Index.jsx');

function handleRouterUpdate () {
	$("#menu-sub").slideUp("fast");
	$("#menu-button").attr("src","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAqCAYAAADmmJiOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTM4RTVFOUM2NUQ5MTFFNjhBMzQ4QURCNTJEMjA3NkYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTM4RTVFOUQ2NUQ5MTFFNjhBMzQ4QURCNTJEMjA3NkYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5MzhFNUU5QTY1RDkxMUU2OEEzNDhBREI1MkQyMDc2RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5MzhFNUU5QjY1RDkxMUU2OEEzNDhBREI1MkQyMDc2RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsiImz8AAABWSURBVHja7NfRCQAgCAVACzdy/9mqLQS7Bw5w6Icvq+rE4OwYHkBAwN7km2WDgICAgICAgICATb+oRg8ICAio0TtRQEBAQEBAQECN3gYBAQF/Al4BBgB18gP3kpoSZwAAAABJRU5ErkJggg==");
}

var App = React.createClass({
	render: function () {
		return (
			<div style={{height:"100%"}}>
        <Header />
				{this.props.children}
				<Footer />
			</div>
		)
	}
});

var Routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
		<Route path="/about" component={About} />
		<Route path="/admin/orders" component={AdminOrders} />
		<Route path="/admin/orders/:id" component={AdminOrdersEdit} />
		<Route path="/admin/inventory" component={AdminInventory} />
		<Route path="/admin/inventory/:id" component={AdminInventoryEdit} />
		<Route path="/admin/inventory/:id/rm" component={AdminInventoryRawMaterials} />
		<Route path="/admin/inventory/:id/stock" component={AdminInventoryOutOfStock} />
		<Route path="/admin/reservations" component={AdminReservations} />
		<Route path="/admin/reservations/:id" component={AdminReservationsEdit} />
		<Route path="/admin/users" component={AdminUsers} />
		<Route path="/admin/users/:id" component={AdminUsersEdit} />
		<Route path="/careers" component={Careers} />
		<Route path="/careers/:id" component={Careers} />
		<Route path="/careers/:id/apply" component={Apply} />
		<Route path="/custom-robot-builds" component={CustomRobotBuilds} />
		<Route path="/sign-in" component={SignIn} />
		<Route path="/sign-out" component={SignOut} />
		<Route path="/register" component={Register} />
		<Route path="/register/:id" component={RegisterVerify} />
		<Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/forgot-password/:id" component={ForgotPasswordVerify} />
		<Route path="/fabrication" component={Fabrication} />
		<Route path="/prototyping" component={Prototyping} />
		<Route path="/blog" component={Blog} />
		<Route path="/blog/new" component={BlogEdit} />
		<Route path="/blog/:id" component={BlogSingle} />
		<Route path="/blog/:id/edit" component={BlogEdit} />
		<Route path="/blog/:id/*" component={BlogSingle} />
		<Route path="/docs" component={Docs} />
		<Route path="/docs/new" component={DocsEdit} />
		<Route path="/docs/:id" component={Docs} />
		<Route path="/docs/:id/edit" component={DocsEdit} />
		<Route path="/docs/:id/*" component={Docs} />
		<Route path="/sales-policies" component={SalesPolicies} />
		<Route path="/privacy-policy" component={PrivacyPolicy} />
		<Route path="/reservation/:id" component={Reservation} />
		<Route path="/shop/checkout" component={Checkout} />
		<Route path="/shop/checkout/review" component={CheckoutReview} />
		<Route path="/shop/checkout/success" component={CheckoutSuccess} />
		<Route path="/shop/cart" component={Cart} />
		<Route path="/shop/:id" component={ShopItem} />
		<Route path="/shop" component={Shop} />
		<Route path="/shop/tr1" component={tr1Shop} />
		<Route path="/shop/tr2" component={tr2Shop} />
		<Route path="/terms-and-conditions" component={TermsAndConditions} />
		<Route path="/questions/new" component={newQuestion} />
		<Route path="/questions/:id" component={question} />
		<Route path="/questions/:id/*" component={question} />
		<Route path="/questions" component={qa} />
		<Route path="/tr2" component={tr2} />
		<Route path="/tr2/specs" component={tr2Specs} />
		<Route path="/tr1" component={tr1} />
		<Route path="/tr1/specs" component={tr1Specs} />
		<Route path="/support" component={Support} />
		<Route path="/order/:id" component={Order} />
		<Route path="*" component={NotFound} />
  </Route>
);

ReactDOM.render(
 	<Router
		history={browserHistory}
		onUpdate={handleRouterUpdate}
		routes={Routes} />,
	document.getElementById("container")
);
