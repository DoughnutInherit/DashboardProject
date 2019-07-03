import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import { setBirthdayList } from '../../actions/actionBirthday';
import './Birthday.css';
import '../../containers/Dashboard/Dashboard.css';
import { getApiData } from '../../services/serviceWorker';

class Birthday extends Component {
  static propTypes = {
    setBirthdayList: PropTypes.func,
    birthdayList: PropTypes.array,
    bearerToken: PropTypes.object,
  }

  componentDidMount() {
    const bearerToken = `Bearer ${this.props.bearerToken}`;

    getApiData(`https://localhost:5001/api/birthday`, bearerToken)
      .then(response => { this.props.setBirthdayList(response); })
      .catch((err) => {
        debugger;
      });
  }

  render() {
    const { birthdayList } = this.props;
    debugger;

    if(birthdayList !== undefined){
      return (
        <Carousel className="carousel shadow" autoPlay={true} showArrows={false} infiniteLoop emulateTouch showStatus={false} showThumbs={false}>
          {this.props.birthdayList.map(Person => (
            <div>
              <img className="image" src={`data:image/jpeg;base64,${Person.imageUrl}`} alt="" />
              <h3 className="text">
                ! Feliz Cumpleaños {' '  + Person.completeName}! 
              </h3>
            </div>
          ))}
        </Carousel>
      );
    }
    else{
      return (
        <div>
          <img className="image center" src="https://image.flaticon.com/icons/svg/214/214305.svg" alt="" />
        <h3 className="text" align="center">
          Sin Cumpleaños
        </h3>
      </div>
      );
    }

  }
}

const mapStateToProps = state => ({
  birthdayList: state.birthdayReducer.birthdayList,
  bearerToken: state.loginReducer.bearerToken,
});


export default connect(mapStateToProps,
  {
    setBirthdayList,
  })(Birthday);
