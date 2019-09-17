import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import PropTypes from 'prop-types';
import React from "react";
import AbstractComponent from "../../framework/view/AbstractComponent";
import {CheckBox, Radio} from "native-base";
import Colors from '../primitives/Colors';
import _ from 'lodash';
import Styles from "./Styles";
import themes from "./themes"
import General from "../../utility/General";

class PresetOptionItem extends AbstractComponent {

    static defaultProps = {
        chunked: false
    };

    static propTypes = {
        multiSelect: PropTypes.bool.isRequired,
        checked: PropTypes.bool.isRequired,
        onPress: PropTypes.func,
        displayText: PropTypes.string.isRequired,
        validationResult: PropTypes.object,
        abnormal: PropTypes.bool,
        style: PropTypes.object,
        chunked: PropTypes.bool
    };

    static styles = StyleSheet.create({
        multiPadding: {flex: 0.05},
        padding: {},
        multiContent: {flex: 0.9, flexDirection: 'row', alignItems: 'center'},
        content: {flexDirection: 'row', alignItems: 'center'},
    });

    constructor(props, context) {
        super(props, context);
    }

    getSelectComponent() {
        if (this.props.multiSelect)
            return (<CheckBox  checked={this.props.checked}
                              onPress={this.onPress}/>);
        else
            return (<Radio  selected={this.props.checked}
                           onPress={this.onPress} color={Colors.AccentColor}/>);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return super.shouldComponentUpdate(nextProps, nextState) && (
            this.props.checked !== nextProps.checked ||
            _.isNil(this.props.validationResult) !==
            _.isNil(nextProps.validationResult)
        );
    }

    onPress = this.mark(`${this.props.parentKey}.${this.props.displayText}`, this.props.onPress);

    render() {
        const marginLeft = this.props.multiSelect ? 16 : 8;
        const inputTextStyle = {marginLeft: marginLeft, color: Colors.InputNormal};
        General.logDebug("PresetOptionItem", "render");
        const color = _.isNil(this.props.validationResult)
            ? this.props.checked && this.props.abnormal
                ? Colors.AbnormalValueHighlight
                : Colors.InputNormal
            : Colors.ValidationError;
        const chunked = {
            content: PresetOptionItem.styles.multiContent,
            container: [this.props.style, {flex: 1}]
        };
        const single = {
            content: PresetOptionItem.styles.content,
            container: this.props.style
        };
        const ToRender = this.props.chunked ? chunked : single;
        return (
            <TouchableOpacity onPress={this.onPress} style={ToRender.container}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', alignSelf: 'flex-start'}}>
                    <View>
                        {this.getSelectComponent()}
                    </View>
                    <Text style={[Styles.formBodyText, inputTextStyle, {color: color}]}>
                        {this.props.displayText}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

export default PresetOptionItem;
