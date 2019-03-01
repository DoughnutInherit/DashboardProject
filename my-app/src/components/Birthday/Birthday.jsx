import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import { setBirthdayList } from '../../actions/actionBirthday';
import dailyInfo from '../../services/dailyInfo.json';
import './Birthday.css';

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
    return (

      birthdayList === undefined ? <p> Undefined </p>
        : (
          <Carousel className="carousel" width="400px" autoPlay={false} showArrows={false} infiniteLoop emulateTouch showStatus={false} showThumbs={false}>
            {this.props.birthdayList.map(Person =>
              <div>
                <img className="imagensita" src={Person.imageUrl} alt="" />
                <h2 className="text">!Feliz cumpleaños {Person.name}!</h2>
              </div>
            )}
          </Carousel>
        )
    );
  }
}

const mapStateToProps = state => ({
  birthdayList: state.birthdayReducer.birthdayList,
});


export default connect(mapStateToProps,
  {
    setBirthdayList,
  })(Birthday);
