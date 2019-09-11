import {DatePickerAndroid, TimePickerAndroid, View} from "react-native";
import PropTypes from 'prop-types';
import React from "react";
import AbstractComponent from "../../framework/view/AbstractComponent";
import _ from "lodash";
import ValidationErrorMessage from "../form/ValidationErrorMessage";
import Colors from "./Colors";
import General from "../../utility/General";
import {Button, Icon} from "native-base";
import {Text} from "react-native";
import Fonts from '../primitives/Fonts';

class DatePicker extends AbstractComponent {
    static propTypes = {
        dateValue: PropTypes.object,
        validationResult: PropTypes.object,
        actionName: PropTypes.string.isRequired,
        datePickerMode: PropTypes.string,
        actionObject: PropTypes.object.isRequired,
        pickTime: PropTypes.bool,
        nonRemovable: PropTypes.bool
    };

    constructor(props, context) {
        super(props, context);
        this.pickTime = _.isBoolean(props.pickTime) ? props.pickTime : false;
        this.noDateMessageKey = this.pickTime ? "chooseDateAndTime" : "chooseADate";
        this.showTimePicker = this.showTimePicker.bind(this);
    }

    updateVal = this.mark(this.props.hookName, (val) => {
        this.props.actionObject.value = val;
        return this.dispatchAction(this.props.actionName, this.props.actionObject);
    });

    dateDisplay(date) {
        return _.isNil(date)
            ? this.I18n.t(this.noDateMessageKey)
            : (this.pickTime && !(General.hoursAndMinutesOfDateAreZero(date)))
                ? General.formatDateTime(date)
                : General.formatDate(date);
    }

    async showDatePicker(options) {
        const {action, year, month, day} = await DatePickerAndroid.open(options);
        if (action !== DatePickerAndroid.dismissedAction) {
            this.props.actionObject.value = new Date(year, month, day);
            if (this.pickTime) {
                this.showTimePicker(this.props.actionObject.value);
            }
            this.updateVal(this.props.actionObject.value);
        }
    }

    async showTimePicker(date) {
        const {action, hour, minute} = await TimePickerAndroid.open({});
        if (action !== TimePickerAndroid.dismissedAction) {
            this.updateVal(new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute, 0, 0));
        }
    }

    removeDate() {
        this.updateVal(null);
    }

    renderRemoveButton() {
        if (_.isNil(this.props.nonRemovable)  && !_.isNil(this.props.dateValue)) {
            return (
                <Button transparent onPress={() => this.removeDate()} style={{height: 20, alignSelf: 'center'}}>
                    <Icon name='backspace' style={{fontSize: 20, color: '#229688'}}/>
                </Button>);
        }
    }

    render() {
        const date = _.isNil(this.props.dateValue) ? new Date() : this.props.dateValue;
        const mode = _.isNil(this.props.datePickerMode) ? 'calendar' : this.props.datePickerMode;
        return (
            <View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                    <Text onPress={this.showDatePicker.bind(this, {date: date, mode : mode})}
                          style={[{
                              fontSize: Fonts.Large,
                              color: _.isNil(this.props.validationResult) ? Colors.ActionButtonColor : Colors.ValidationError
                          }]}>
                        {this.dateDisplay(this.props.dateValue)}
                    </Text>
                    {this.renderRemoveButton()}
                </View>
                <View>
                    <ValidationErrorMessage validationResult={this.props.validationResult}/>
                </View>
            </View>
        );
    }
}

export default DatePicker;