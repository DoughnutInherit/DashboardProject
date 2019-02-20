import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setBirthdayList } from '../../actions/actionBirthday';
import dailyInfo from '../../services/dailyInfo.json';
import './Birthday.css';

class Birthday extends Component {
  static propTypes = {
    setBirthdayList: PropTypes.func,
    birthdayList: PropTypes.array,
  }

  componentDidMount() {
    debugger;
    this.props.setBirthdayList(dailyInfo.birthday);
    debugger;
  }

  render() {
    console.log(this.props.birthdayList);
    const { birthdayList } = this.props;
    return (

      birthdayList === undefined ? <p> Undefined </p>
        : (
          <div align="center" className="try">
            {/* <img src={birthdayList[0].imageUrl} alt="Logo" />
            <h5>{birthdayList.name}</h5> */}

          </div>
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
