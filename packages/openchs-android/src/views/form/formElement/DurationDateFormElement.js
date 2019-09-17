import {Text, TextInput, View} from "react-native";
import PropTypes from 'prop-types';
import React from "react";
import {Radio} from "native-base";
import _ from "lodash";
import AbstractFormElement from "./AbstractFormElement";
import DGS from "../../primitives/DynamicGlobalStyles";
import DatePicker from "../../primitives/DatePicker";
import Colors from '../../primitives/Colors';
import Distances from "../../primitives/Distances";
import Styles from "../../primitives/Styles";

class DurationDateFormElement extends AbstractFormElement {
    static propTypes = {
        label: PropTypes.string.isRequired,
        actionName: PropTypes.string.isRequired,
        duration: PropTypes.object.isRequired,
        durationOptions: PropTypes.array.isRequired,
        validationResult: PropTypes.object,
        element: PropTypes.object.isRequired,
        dateValue : PropTypes.object
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        let labelText = this.label;
        return (
            <View>
                <View style={{backgroundColor: '#ffffff', borderStyle: 'dashed', borderRadius: 1}}>
                    <Text style={Styles.formLabel}>{labelText}</Text>
                </View>
            <View style={{
                borderWidth: 1,
                borderStyle: 'dashed',
                borderRadius: 1,
                borderColor: Colors.InputBorderNormal,
                paddingHorizontal: Distances.ScaledContentDistanceFromEdge,
                paddingVertical: 5
            }}>
                <View style={[this.formRow, {flexDirection: 'column'}]}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={DGS.formElementLabel}>{`${this.I18n.t("enterDate")}: `}</Text>
                        <View style={{paddingHorizontal:5}}>
                            <DatePicker hookName={labelText} actionName={this.props.actionName} actionObject={{formElement: this.props.element}} validationResult={this.props.validationResult}
                                        dateValue={this.props.dateValue.getValue()} />
                        </View>
                    </View>
                </View>
                <View><Text style={{paddingVertical: 5}}>{this.I18n.t("or")}</Text></View>

                <View style={[{flexDirection: 'row'}]}>
                    <Text style={Styles.formLabel}>{`${this.I18n.t("enterDuration")}: `}</Text>
                    <TextInput style={[Styles.formBodyText, {paddingBottom: 5, paddingTop:0, marginBottom: 5, width: 80, color: Colors.InputNormal}]}
                                   keyboardType='numeric'
                                   underlineColorAndroid={this.borderColor}
                                   value={_.isNil(this.props.duration) ? "" : _.toString(this.props.duration.durationValue)}
                                   onChangeText={(text) => this.dispatchAction(this.props.actionName, {
                                       formElement: this.props.element,
                                       duration: this.props.duration.changeValue(text)
                                   })}/>
                    {this.props.durationOptions.map((durationOption, index) => {
                        return <View key={index} style={{flexDirection: 'row'}}>
                            <Radio style={{marginLeft:DGS.resizeWidth(20)}} selected={durationOption === this.props.duration.durationUnit}
                                   onPress={() => this.dispatchAction(this.props.actionName, {
                                       formElement: this.props.element,
                                       duration: this.props.duration.changeUnit(durationOption)
                                   })} color={Colors.AccentColor}/>
                            <Text style={DGS.formRadioText}>{this.I18n.t(durationOption)}</Text>
                        </View>
                    })}

                </View>
                </View>
            </View>
        );
    }
}

export default DurationDateFormElement;
