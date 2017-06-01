import AbstractComponent from "../../framework/view/AbstractComponent";
import _ from 'lodash';
import Colors from '../primitives/Colors';
import React from "react";
import {Text} from "native-base";

class AbstractFormElement extends AbstractComponent {
    constructor(props, context) {
        super(props, context);
    }

    get label() {
        const mandatoryText = this.props.element.mandatory ? <Text style={{color: Colors.ValidationError}}> * </Text> : <Text></Text>;
        return <Text>{this.I18n.t(this.props.element.name)}{mandatoryText}</Text>;
    }

    get hasValidationError() {
        return _.isNil(this.props.validationResult);
    }

    get borderColor() {
        return this.hasValidationError ? Colors.InputBorderNormal : Colors.ValidationError;
    }

    get textColor() {
        return this.hasValidationError ? Colors.InputNormal : Colors.ValidationError;
    }
}

export default AbstractFormElement;