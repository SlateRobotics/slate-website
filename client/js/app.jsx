var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;
var IndexRoute = require('react-router').IndexRoute;

var UserStore = require('./stores/user');

var Footer = require('./components/Footer/Index.jsx');
var Header = require('./components/Header/Index.jsx');
var Home = require('./components/Home/Index.jsx');
var SignIn = require('./components/SignIn/Index.jsx');
var SignOut = require('./components/SignOut/Index.jsx');
var Register = require('./components/Register/Index.jsx');
var RegisterVerify = require('./components/Register/Verify.jsx');
var ForgotPassword = require('./components/ForgotPassword/Index.jsx');
var ForgotPasswordVerify = require('./components/ForgotPassword/Verify.jsx');
var tr1 = require('./components/tr1/Index.jsx');
var tr1Specs = require('./components/tr1-specs/Index.jsx');
var tr1Reserve = require('./components/tr1-reserve/Index.jsx');
var tr1ReserveSuccess = require('./components/tr1-reserve-success/Index.jsx');
var tr1Shop = require('./components/shop-tr1/Index.jsx');
var Printing = require('./components/Printing/Index.jsx');
var Support = require('./components/Support/Index.jsx');
var Checkout = require('./components/Checkout/Index.jsx');
var CheckoutReview = require('./components/CheckoutReview/Index.jsx');
var CheckoutSuccess = require('./components/CheckoutSuccess/Index.jsx');
var Order = require('./components/Order/Index.jsx');
var About = require('./components/About/Index.jsx');
var Blog = require('./components/Blog/Index.jsx');
var BlogSingle = require('./components/Blog/Single.jsx');
var BlogEdit = require('./components/Blog/Edit.jsx');
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
		<Route path="/sign-in" component={SignIn} />
		<Route path="/sign-out" component={SignOut} />
		<Route path="/register" component={Register} />
		<Route path="/register/:id" component={RegisterVerify} />
		<Route path="/forgot-password" component={ForgotPassword} />
    <Route path="forgot-password/:id" component={ForgotPasswordVerify} />
		<Route path="/blog" component={Blog} />
		<Route path="/blog/new" component={BlogEdit} />
		<Route path="/blog/:id" component={BlogSingle} />
		<Route path="/blog/:id/edit" component={BlogEdit} />
		<Route path="/blog/:id/*" component={BlogSingle} />
		<Route path="/sales-policies" component={SalesPolicies} />
		<Route path="/privacy-policy" component={PrivacyPolicy} />
		<Route path="/terms-and-conditions" component={TermsAndConditions} />
		<Route path="/tr1" component={tr1} />
		<Route path="/tr1/specs" component={tr1Specs} />
		<Route path="/tr1/reserve" component={tr1Reserve} />
		<Route path="/tr1/reserve/success" component={tr1ReserveSuccess} />
		<Route path="/printing" component={Printing} />
		<Route path="/support" component={Support} />
		<Route path="/shop/tr1" component={tr1Shop} />
		<Route path="/checkout" component={Checkout} />
		<Route path="/checkout/review" component={CheckoutReview} />
		<Route path="/checkout/success" component={CheckoutSuccess} />
		<Route path="/order/:id" component={Order} />
  </Route>
);

UserStore.get({
	success: function (data) {
		if (!data || data.length == 0) {
			console.log("Unauthenticated user.");
		} else {
			console.log("User logged in: " + data[0].email);
		}
	},
});

ReactDOM.render(
 	<Router
		history={browserHistory}
		onUpdate={handleRouterUpdate}
		routes={Routes} />,
	document.getElementById("container")
);
