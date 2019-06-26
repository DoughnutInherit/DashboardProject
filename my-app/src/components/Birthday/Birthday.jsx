import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import { setBirthdayList } from '../../actions/actionBirthday';
import dailyInfo from '../../services/dailyInfo.json';
import './Birthday.css';
import '../../containers/Dashboard/Dashboard.css';

class Birthday extends Component {
  static propTypes = {
    setBirthdayList: PropTypes.func,
    birthdayList: PropTypes.array,
  }

  componentDidMount() {
    this.props.setBirthdayList(dailyInfo.birthday);
  }

  render() {
    const { birthdayList } = this.props;

    if(birthdayList !== undefined){
      return (
        <Carousel className="carousel shadow" autoPlay={true} showArrows={false} infiniteLoop emulateTouch showStatus={false} showThumbs={false}>
          {this.props.birthdayList.map(Person => (
            <div>
              <img className="image" src={Person.imgPath} alt="" />
              <h3 className="text">
                ! Feliz Cumpleaños {' '  + Person.name}! 
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
});


export default connect(mapStateToProps,
  {
    setBirthdayList,
  })(Birthday);
