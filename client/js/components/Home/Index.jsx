var React = require('react');
var $ = require('jquery');
var BrowserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ButtonSecondary = require('../Button/Index.jsx').Secondary;
var OrderStore = require('../../stores/order');
var MenuButton = require('./MenuButton.jsx');

var NewsLogo = React.createClass({
  getInitialState: function () {
    return {
      isSelected: false,
    }
  },

  render: function () {
    var style = Style.newsIconDefault;
    if (this.state.isSelected) style = Style.newsIconSelected;

    return (
      <div
        className="col-lg-2 col-sm-3 col-xs-6"
        style={{cursor:"pointer"}}
        onClick={this.handleClick}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}>
        <img style={style} src={this.props.img}/>
      </div>
    )
  },

  handleClick: function () {
    window.open(this.props.url, '_blank');
  },

  handleMouseOver: function() {
      this.setState({isSelected: true});
  },

  handleMouseOut: function() {
      this.setState({isSelected: false});
  }
});

var Component = React.createClass({
  componentDidMount: function () {
    document.title = "The Ultimate Development Platform | Slate Robotics";
    window.scrollTo(0,0);
  },

  render: function() {
    return (
      <div className="container-fluid" style={Style.container}>
        <div className="row" style={{
            color:"white",
            height:"calc(100vh - 44px)",
            backgroundImage:"url('/img/slate-tr2-1')",
            backgroundPosition:"center bottom",
            backgroundColor:"#222",
            backgroundRepeat:"no-repeat",
            backgroundSize:"auto 100%",
          }}>
          <div
            className="col-lg-10 col-xs-12 col-centered"
            style={{
              height:"100%",
              position:"relative",
            }}>
            <div id="tr2-heading" style={{
                position:"absolute",
                top:"0",
                left:"10px",
                textAlign:"left"
              }}>
              <h1 style={{fontSize:"72px"}}>
                Slate TR2
              </h1>
              <h4>
                The ultimate development platform
              </h4>
              <MenuButton to="/shop/tr2" label="Order Yours" />
              <Link to="/tr2" style={{color:"#fff",marginLeft:"25px"}}>
                Learn More {">"}
              </Link>
            </div>
          </div>
        </div>
        <div className="row" style={{padding:"50px 0px",backgroundColor:"#111",color:"#fff"}}>
          <div className="col-md-10 col-xs-12 col-centered">
            <div className="row">
              <div className="col-xs-12 col-centered" style={{textAlign:"center"}}>
                <h1 style={{marginBottom:"25px"}}>
                  Key Features
                </h1>
              </div>
              <div className="col-xs-12 col-centered">
                <div className="row">
                  <div className="col-lg-2 hidden-md hidden-sm hidden-xs"/>
                  <div className="col-lg-2 col-sm-3 col-xs-6">
                    <a href="#tr2-size" style={{color:"white"}}>
                      <img src="/img/icon-weights" height="60" />
                      <h4>Life-Sized</h4>
                    </a>
                  </div>
                  <div className="col-lg-2 col-sm-3 col-xs-6">
                    <a href="#tr2-backdrive" style={{color:"white"}}>
                      <img src="/img/icon-motor" height="60" />
                      <h4>Back-Drivable</h4>
                    </a>
                  </div>
                  <div className="col-lg-2 col-sm-3 col-xs-6">
                    <a href="#tr2-payload" style={{color:"white"}}>
                      <img src="/img/icon-kg" height="60" />
                      <h4>1kg Payload</h4>
                    </a>
                  </div>
                  <div className="col-lg-2 col-sm-3 col-xs-6">
                    <a href="#tr2-gpu" style={{color:"white"}}>
                      <img src="/img/icon-gpu-white" height="60" />
                      <h4>CPU + GPU</h4>
                    </a>
                  </div>
                  <div className="col-lg-2 hidden-md hidden-sm hidden-xs"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a id="tr2-size" style ={{display:"block",top:"-44px",visibility:"hidden",position:"relative"}}/>
        <div className="row" style={{
            color:"#fff",
            height:"calc(100vh - 44px)",
            backgroundImage:"url('/img/slate-tr2-7')",
            backgroundPosition:"center bottom",
            backgroundColor:"#222",
            backgroundRepeat:"no-repeat",
            backgroundSize:"auto 100%",
          }}>
          <div
            className="col-lg-10 col-xs-12 col-centered"
            style={{
              height:"100%",
              position:"relative",
            }}>
            <div style={{
                marginTop:"40px",
                textAlign:"right",
              }}>
              <h1 style={{fontSize:"72px"}}>
                Life-Sized
              </h1>
              <h4>
                For deployment in human environments
              </h4>
              <Link to="/tr2" style={{color:"#fff"}}>
                Learn More {">"}
              </Link>
            </div>
          </div>
        </div>
        <div className="row" style={{height:"3px",backgroundColor:"#ccc"}} />
        <a id="tr2-backdrive" style ={{display:"block",top:"-44px",visibility:"hidden",position:"relative"}}/>
        <div className="row" style={{
            color:"#fff",
            height:"calc(100vh - 44px)",
            backgroundImage:"url('/img/slate-tr2-8')",
            backgroundPosition:"center bottom",
            backgroundColor:"#222",
            backgroundRepeat:"no-repeat",
            backgroundSize:"auto 100%",
          }}>
          <div
            className="col-lg-10 col-xs-12 col-centered"
            style={{
              height:"100%",
              position:"relative",
            }}>
            <div style={{
                marginTop:"40px",
                textAlign:"right",
              }}>
              <h1 style={{fontSize:"72px"}}>
                Back-Drivable
              </h1>
              <h4>
                For intuitive control and positioning
              </h4>
              <Link to="/tr2" style={{color:"#fff"}}>
                Learn More {">"}
              </Link>
            </div>
          </div>
        </div>
        <div className="row" style={{padding:"50px 0px",backgroundColor:"#ccc"}}>
          <div className="col-md-10 col-xs-12 col-centered">
            <div className="row">
              <div className="col-xs-12 col-centered" style={{textAlign:"center"}}>
                <h1 style={{marginBottom:"25px"}}>
                  As featured in...
                </h1>
              </div>
              <div className="col-xs-12 col-centered">
                <div className="row hidden-xs">
                  <div className="hidden-md hidden-sm col-xs-2"/>
                  <NewsLogo
                    url="https://www.news-leader.com/story/news/business/2018/07/19/springfield-company-hopes-life-sized-robots-start-robot-revolution/764322002/"
                    img="/img/icon-news-leader"/>
                  <NewsLogo
                    url="https://softwareengineeringdaily.com/2019/01/16/human-sized-robots-with-zach-allen/"
                    img="/img/icon-sedaily"/>
                  <NewsLogo
                    url="https://spectrum.ieee.org/automaton/robotics/robotics-hardware/video-friday-professor-ishiguro-new-robot-child-and-more"
                    img="/img/icon-ieee-spectrum"/>
                  <NewsLogo
                    url="https://blog.hackster.io/humanoid-slate-tr2-robot-is-a-machine-learning-playground-6edd00ca3299"
                    img="/img/icon-hackster-io"/>
                  <div className="hidden-md hidden-sm col-xs-2"/>
                </div>
                <div className="row hidden-lg hidden-md hidden-sm">
                  <NewsLogo
                    url="https://www.news-leader.com/story/news/business/2018/07/19/springfield-company-hopes-life-sized-robots-start-robot-revolution/764322002/"
                    img="/img/icon-news-leader"/>
                  <NewsLogo
                    url="https://bouncy.news/21612"
                    img="/img/icon-bouncy"/>
                </div>
                <div className="row hidden-lg hidden-md hidden-sm" style={{marginTop:"15px"}}>
                  <NewsLogo
                    url="https://spectrum.ieee.org/automaton/robotics/robotics-hardware/video-friday-professor-ishiguro-new-robot-child-and-more"
                    img="/img/icon-ieee-spectrum"/>
                  <NewsLogo
                    url="https://blog.hackster.io/humanoid-slate-tr2-robot-is-a-machine-learning-playground-6edd00ca3299"
                    img="/img/icon-hackster-io"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a id="tr2-payload" style ={{display:"block",top:"-44px",visibility:"hidden",position:"relative"}}/>
        <div className="row" style={{
            color:"#222",
            height:"calc(100vh - 44px)",
            backgroundImage:"url('/img/slate-tr2-9')",
            backgroundPosition:"center bottom",
            backgroundColor:"#fff",
            backgroundRepeat:"no-repeat",
            backgroundSize:"auto 100%",
            textShadow:"0px 0px 5px #fff",
          }}>
          <div
            className="col-lg-10 col-xs-12 col-centered"
            style={{
              height:"100%",
              position:"relative",
            }}>
            <div style={{
                textAlign:"left",
                bottom:"40px",
                left:"0",
                position:"absolute",
              }}>
              <h1 style={{fontSize:"72px"}}>
                1kg Payload
              </h1>
              <h4>
                For working with a variety of tools and objects
              </h4>
              <Link to="/tr2" style={{color:"#222"}}>
                Learn More {">"}
              </Link>
            </div>
          </div>
        </div>
        <div className="row" style={{height:"3px",backgroundColor:"#ccc"}} />
        <a id="tr2-gpu" style ={{display:"block",top:"-44px",visibility:"hidden",position:"relative"}}/>
        <div className="row" style={{
            color:"#222",
            height:"calc(100vh - 44px)",
            backgroundImage:"url('/img/slate-tr2-6')",
            backgroundPosition:"center bottom",
            backgroundColor:"#fff",
            backgroundRepeat:"no-repeat",
            backgroundSize:"auto 100%",
            textShadow:"0px 0px 5px #fff",
          }}>
          <div
            className="col-lg-10 col-xs-12 col-centered"
            style={{
              height:"100%",
              position:"relative",
            }}>
            <div style={{
                marginTop:"40px",
                textAlign:"right",
              }}>
              <h1 style={{fontSize:"72px"}}>
                CPU + GPU
              </h1>
              <h4>
                For fast image and ML processing
              </h4>
              <Link to="/tr2" style={{color:"#222"}}>
                Learn More {">"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  },

  handleClick_LearnMore: function () {
    BrowserHistory.push("/tr2");
  },

  handleClick_Buy: function () {
    BrowserHistory.push("/shop/tr2");
  },

  handleClick_AboutUs: function () {
    BrowserHistory.push("/about");
  },

  handleClick_ToggleText: function () {
    $("#tr2-heading").fadeToggle(500);
    $("#tr2-footer-details").fadeToggle(500);
  },
});

module.exports = Component;
