import {TextInput, View} from "react-native";
import {Text} from 'native-base';
import PropTypes from 'prop-types';
import React from "react";
import _ from "lodash";
import AbstractFormElement from "./AbstractFormElement";
import ValidationErrorMessage from "../../form/ValidationErrorMessage";
import Styles from "../../primitives/Styles";
import Colors from "../../primitives/Colors";

class TextFormElement extends AbstractFormElement {
    static propTypes = {
        element: PropTypes.object.isRequired,
        actionName: PropTypes.string.isRequired,
        value: PropTypes.object,
        validationResult: PropTypes.object,
        multiline: PropTypes.bool.isRequired,
        extraStyle: PropTypes.object
    };
    static defaultProps = {
        style: {}
    };

    constructor(props, context) {
        super(props, context);
    }

    renderReadOnly() {
        return (<View style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
            {this.label}
            <Text style={[{
                flex: 1,
                marginVertical: 0,
                paddingVertical: 5
            }, Styles.formBodyText, { color: Colors.InputNormal }]}>
                {_.isNil(this.props.value.getValue()) ? this.I18n.t('Not Known Yet') : _.toString(this.props.value.getValue())}
            </Text>
        </View>);
    }

    renderWritable() {
        const onChangeText = this.mark(this.props.element.name, (text) => this.onInputChange(text));
        return (
            <View style={{flexDirection: 'column', justifyContent: 'flex-start'}}>
                {this.label}
                <TextInput {...this.props} style={[Styles.formBodyText, this.props.style]} underlineColorAndroid={this.borderColor} secureTextEntry={this.props.secureTextEntry}
                           value={_.isNil(this.props.value) ? "" : this.props.value.answer} onChangeText={onChangeText} multiline={false} numberOfLines={this.props.multiline ? 4 : 1}/>

                <ValidationErrorMessage validationResult={this.props.validationResult}/>
            </View>);
    }

    render() {
        return this.props.element.editable === false ? this.renderReadOnly() : this.renderWritable();
    }

    onInputChange(text) {
        this.dispatchAction(this.props.actionName, {formElement: this.props.element, value: text});
    }
}

export default TextFormElement;