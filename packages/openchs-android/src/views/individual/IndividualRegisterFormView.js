import {BackHandler, View} from "react-native";
import PropTypes from 'prop-types';
import React from "react";
import AbstractComponent from "../../framework/view/AbstractComponent";
import Path from "../../framework/routing/Path";
import Reducers from "../../reducer";
import themes from "../primitives/themes";
import {Actions} from "../../action/individual/IndividualRegisterActions";
import TypedTransition from "../../framework/routing/TypedTransition";
import AppHeader from "../common/AppHeader";
import FormElementGroup from "../form/FormElementGroup";
import WizardButtons from "../common/WizardButtons";
import IndividualRegisterViewsMixin from "./IndividualRegisterViewsMixin";
import {ObservationsHolder} from 'openchs-models';
import General from "../../utility/General";
import Distances from "../primitives/Distances";
import CHSContainer from "../common/CHSContainer";
import CHSContent from "../common/CHSContent";
import _ from "lodash";
import IndividualRegisterView from "./IndividualRegisterView";
import CHSNavigator from "../../utility/CHSNavigator";

@Path('/IndividualRegisterFormView')
class IndividualRegisterFormView extends AbstractComponent {
    static propTypes = {};

    viewName() {
        return "IndividualRegisterFormView";
    }

    constructor(props, context) {
        super(props, context, Reducers.reducerKeys.individualRegister);
    }

    get registrationType() {
        return _.get(this.state, 'workListState.workLists.currentWorkList.name') || 'REG_DISPLAY-Individual';
    }

    onHardwareBackPress() {
        !this.state.wizard.isFirstPage() ? this.previous() : TypedTransition.from(this).goBack();
        return true;
    }

    previous() {
        this.dispatchAction(Actions.PREVIOUS, {
            cb: (newState) => {
                if (newState.wizard.isFirstPage()) {
                    TypedTransition.from(this).goBack();
                }
                this.scrollToTop();
            }
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return super.shouldComponentUpdate(nextProps, nextState) &&  !nextState.wizard.isNonFormPage();
    }

    render() {
        General.logDebug(this.viewName(), `render`);
        const title = this.I18n.t(this.registrationType) + this.I18n.t('registration');
        return (
            <CHSContainer>
                <CHSContent ref='scroll'>
                    <AppHeader title={title}
                               func={() => CHSNavigator.navigateToFirstPage(this, [IndividualRegisterView,IndividualRegisterFormView])}/>
                    <View style={{flexDirection: 'column', paddingHorizontal: Distances.ScaledContentDistanceFromEdge}}>
                        <FormElementGroup observationHolder={new ObservationsHolder(this.state.individual.observations)}
                                          group={this.state.formElementGroup}
                                          actions={Actions}
                                          filteredFormElements={this.state.filteredFormElements}
                                          validationResults={this.state.validationResults}
                                          formElementsUserState={this.state.formElementsUserState}
                                          dataEntryDate={this.state.individual.registrationDate}
                        />
                        {console.log('this.state.wizard.currentPage', this.state.wizard.currentPage)}
                        <WizardButtons page={this.state.wizard.currentPage}
                                       previous={{func: () => this.previous(), label: this.I18n.t('previous')}}
                                       next={{
                                           func: () => IndividualRegisterViewsMixin.next(this),
                                           label: this.I18n.t('next')
                                       }}/>
                    </View>
                </CHSContent>
            </CHSContainer>
        );
    }
}

export default IndividualRegisterFormView;
