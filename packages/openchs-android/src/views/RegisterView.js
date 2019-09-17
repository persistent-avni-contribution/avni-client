import AbstractComponent from "../framework/view/AbstractComponent";
import General from "../utility/General";
import {StyleSheet, Text, TouchableNativeFeedback, View} from "react-native";
import React from "react";
import CHSContainer from "./common/CHSContainer";
import AppHeader from "./common/AppHeader";
import CHSContent from "./common/CHSContent";
import EntityService from "../service/EntityService";
import {SubjectType, WorkList, WorkLists} from "openchs-models";
import CHSNavigator from "../utility/CHSNavigator";
import Colors from "./primitives/Colors";
import _ from "lodash";
import Distances from "./primitives/Distances";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Fonts from "./primitives/Fonts";
import FormMappingService from "../service/FormMappingService";

class RegisterView extends AbstractComponent {

    componentWillMount() {
        super.componentWillMount();
    }

    _addRegistrationAction(subjectType) {
        return {
            fn: () => CHSNavigator.navigateToRegisterView(this,
                new WorkLists(new WorkList(this.I18n.t(`REG_DISPLAY-${subjectType.name}`)).withRegistration(subjectType.name))),
            label: this.I18n.t(`REG_DISPLAY-${subjectType.name}`),
            backgroundColor: Colors.AccentColor,
        }
    }

    _addProgramAction(subjectType, program) {
        return {
            fn: () => CHSNavigator.navigateToRegisterView(this,
                new WorkLists(new WorkList(this.I18n.t(`REG_ENROL_DISPLAY-${program.programSubjectLabel}`))
                    .withRegistration(subjectType.name)
                    .withEnrolment(program.name)
                )),
            label: this.I18n.t(`REG_ENROL_DISPLAY-${program.programSubjectLabel}`),
            backgroundColor: program.colour,
        }
    }

    _addProgramActions(subjectType, programs) {
        return _.map(programs, program => this._addProgramAction(subjectType, program));
    }

    renderButton(onPress, buttonColor, text, textColor, index) {
        onPress = this.mark(`Button.${text.trim()}`, onPress);
        return (
            <View key={index}>
                <TouchableNativeFeedback onPress={() => {
                    onPress()
                }}>
                    <View style={[styles.container, {backgroundColor: buttonColor}]}>
                        {/* <View style={styles.strip}/>*/}
                        <View style={[styles.textContainer, {backgroundColor: buttonColor}]}>
                            <Text
                                style={[Fonts.typography("paperFontSubhead"), styles.programNameStyle, {color: textColor}]}>{text}</Text>
                        </View>
                        <Icon style={styles.iconStyle} name='chevron-right'/>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }

    render() {
        General.logDebug("RegisterView", "render");
        let actions = [];

        const subjectTypes = this.context.getService(EntityService).getAll(SubjectType.schema.name);

        subjectTypes.forEach(subjectType => {
            let formMappingService = this.context.getService(FormMappingService);
            // Sometimes, a register form might not be provided. Register functionality does not work without that.
            if (!formMappingService.findRegistrationForm(subjectType)) {
                return;
            }
            actions = actions.concat(this._addRegistrationAction(subjectType));
            const programs = formMappingService.findProgramsForSubjectType(subjectType);
            actions = actions.concat(this._addProgramActions(subjectType, programs));
        });

        return (
            <CHSContainer style={{backgroundColor: Colors.GreyContentBackground}}>
                <AppHeader title={this.I18n.t("register")} hideBackButton={true} hideIcon={true}/>
                <CHSContent>
                    {_.map(actions, (action, key) =>
                        this.renderButton(
                            action.fn,
                            action.backgroundColor || Colors.ActionButtonColor,
                            action.label,
                            Colors.TextOnPrimaryColor,
                            key
                        )
                    )}
                </CHSContent>
            </CHSContainer>
        );
    }
}

export default RegisterView

const styles = StyleSheet.create({
    container: {
        marginRight: Distances.ScaledContentDistanceFromEdge,
        marginLeft: Distances.ScaledContentDistanceFromEdge,
        marginTop: Distances.ScaledContentDistanceFromEdge,
        margin: 4,
        elevation: 3,
        minHeight: 48,
        marginVertical: 4,
        backgroundColor: Colors.cardBackgroundColor,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 5,
    },
    strip: {
        width: 8,
        height: '100%',
        backgroundColor: '#fefefe'
    },
    textContainer: {
        flex: 1,
        paddingVertical: 4,
        padding: Distances.ScaledContentDistanceFromEdge,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    programNameStyle: {
        color: Colors.DefaultPrimaryColor,
        fontWeight: 'normal',
        fontSize: 20,
        alignSelf: 'flex-start',
        textAlignVertical: 'center',
    },
    iconStyle: {
        color: '#fefefe',
        opacity: 0.8,
        alignSelf: 'center',
        fontSize: 40
    }
});
