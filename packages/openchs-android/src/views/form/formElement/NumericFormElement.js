import {TextInput, View} from "react-native";
import PropTypes from 'prop-types';
import React from "react";
import {Text} from "native-base";
import _ from "lodash";
import AbstractFormElement from "./AbstractFormElement";
import ValidationErrorMessage from "../../form/ValidationErrorMessage";
import Styles from "../../primitives/Styles";
import Colors from "../../primitives/Colors";

class NumericFormElement extends AbstractFormElement {
    static propTypes = {
        element: PropTypes.object.isRequired,
        inputChangeActionName: PropTypes.string.isRequired,
        endEditingActionName: PropTypes.string.isRequired,
        value: PropTypes.object,
        validationResult: PropTypes.object
    };

    constructor(props, context) {
        super(props, context);
    }

    rangeText() {
        let rangeText = null;
        if (!_.isNil(this.props.element.concept.lowNormal)) {
            if (!_.isNil(this.props.element.concept.hiNormal)) {
                rangeText = `${this.props.element.concept.lowNormal} - ${this.props.element.concept.hiNormal}`;
            } else {
                rangeText = `>=${this.props.element.concept.lowNormal}`
            }
        } else if (!_.isNil(this.props.element.concept.hiNormal)) {
            rangeText = `=<${this.props.element.concept.hiNormal}`
        }
        return _.isNil(rangeText) ? <Text></Text> : <Text style={Styles.formLabel}> ({rangeText}) </Text>;
    }

    unitText() {
        return _.isNil(this.props.element.concept.unit) ? <Text></Text> :
            <Text style={Styles.formLabel}> ({this.props.element.concept.unit}) </Text>;

    }

    onInputChange(text) {
        this.dispatchAction(this.props.inputChangeActionName, {formElement: this.props.element, value: text});
    }

    color() {
        if (_.isNil(this.props.value.getValue())){
            return Colors.InputNormal;
        }
        return this.props.element.concept.isAbnormal(this.props.value.getValue()) ? Colors.AbnormalValueHighlight : Colors.InputNormal;
    }

    render() {
        let rangeText = this.rangeText();
        let unitText = this.unitText();
        let labelText = this.label;
        const onChangeText = this.mark(this.props.element.name, (text) => this.onInputChange(text));
        return (
            <View>
                <View style={{backgroundColor: '#ffffff', borderStyle: 'dashed', borderRadius: 1}}>
                    <Text style={Styles.formLabel}>{labelText}{unitText}{rangeText}</Text>
                </View>
                <View>
                    {this.props.element.editable === false ?
                        <Text style={[{
                            flex: 1,
                            marginVertical: 0,
                            paddingVertical: 5
                        }, Styles.formBodyText, {color: this.color()}] }>{_.isNil(this.props.value.getValue()) ? this.I18n.t('Not Known Yet') : _.toString(this.props.value.getValue())}</Text> :
                        <View><TextInput style={[{flex: 1, marginVertical: 0, paddingVertical: 5}, Styles.formBodyText, {color: this.color()}]}
                                         underlineColorAndroid={this.borderColor} keyboardType='numeric'
                                         value={_.toString(this.props.value.getValue())}
                                         onChangeText={onChangeText}
                                         onEndEditing={onChangeText}/>
                            <ValidationErrorMessage validationResult={this.props.validationResult}/></View>
                    }
                </View>
            </View>
        );
    }


}

export default NumericFormElement;
