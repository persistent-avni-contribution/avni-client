import FamilyService from "../../service/FamilyService";
import ObservationsHolderActions from "../common/ObservationsHolderActions";
import EntityService from "../../service/EntityService";
import {Family, Gender} from "openchs-models";
import FamilyRegistrationState from "../../state/FamilyRegistrationState";
import _ from 'lodash';

export class FamilyRegisterActions {
    static getInitialState(context) {
        // const form = context.get(EntityService).findByKey('formType', Form.formTypes.IndividualProfile, Form.schema.name);
        const genders = context.get(EntityService).getAll(Gender.schema.name);
        return {genders: genders};
    }

    static onLoad(state, action, context) {
        const family = _.isNil(action.familyUUID) ?
            Family.createEmptyInstance() : context.get(FamilyService).findByUUID(action.familyUUID);
        const newState = FamilyRegistrationState.createLoadState(state.form, state.genders, family);
        return newState;
    }

    static enterRegistrationDate(state, action) {
        const newState = state.clone();
        newState.family.registrationDate = action.value;
        newState.handleValidationResult(newState.family.validateRegistrationDate());
        return newState;
    }

    static enterHeadOfFamily(state, action) {
        const newState = state.clone();
        newState.family.setHeadOfFamily(action.value);
        newState.handleValidationResult(newState.family.validateHeadOfFamily());
        return newState;
    }


    static enterFamilyAddressLevel(state, action) {
        const newState = state.clone();
        newState.family.lowestAddressLevel = action.value;
        newState.handleValidationResult(newState.family.validateAddress());
        return newState;
    }

    static enterFamilyTypeOfFamily(state, action) {
        const newState = state.clone();
        newState.family.typeOfFamily = action.value;
        newState.handleValidationResult(newState.family.validateTypeOfFamily());
        return newState;
    }

    static enterFamilyHouseholdNumber(state, action) {
        const newState = state.clone();
        newState.family.householdNumber = action.value;
        newState.handleValidationResult(newState.family.validateHouseNumber());
        return newState;
    }

    static onNext(state, action, context) {
        return state.clone().handleNext(action, context);
    }

    static onPrevious(state, action, context) {
        return state.clone().handlePrevious(action, context);
    }

    static onSave(state, action, context) {
        const newState = state.clone();
        context.get(FamilyService).register(newState.family);
        action.cb();
        return newState;
    }
}

const actions = {
    ON_LOAD: "FAMILY_REGISTRATION_ON_LOAD",
    NEXT: "FAMILY_REGISTRATION_NEXT",
    PREVIOUS: "FAMILY_REGISTRATION_PREVIOUS",
    REGISTRATION_ENTER_REGISTRATION_DATE: "FAMILY_REGISTRATION_ENTER_REGISTRATION_DATE",
    REGISTRATION_ENTER_HEAD_OF_FAMILY: "FAMILY_REGISTRATION_ENTER_HEAD_OF_FAMILY",
    REGISTRATION_ENTER_ADDRESS_LEVEL: "FAMILY_REGISTRATION_ENTER_ADDRESS_LEVEL",
    REGISTRATION_ENTER_TYPE_OF_FAMILY: "FAMILY_REGISTRATION_ENTER_TYPE_OF_FAMILY",
    REGISTRATION_ENTER_HOUSEHOLD_NUMBER: "FAMILY_REGISTRATION_ENTER_HOUSEHOLD_NUMBER",
    TOGGLE_MULTISELECT_ANSWER: "b2af8248-ad5e-4639-ba6d-02b25c813e5e",
    TOGGLE_SINGLESELECT_ANSWER: "cdc7b1c2-d5aa-4382-aa93-1663275132f7",
    PRIMITIVE_VALUE_CHANGE: '13230ada-ee22-4a50-a2a8-5f14d1d9cd46',
    PRIMITIVE_VALUE_END_EDITING: '84f511d9-acf0-412d-951b-4226f7c6cf47',
    DURATION_CHANGE: 'b1136ef7-202b-4a41-8b82-5603a4f90000',
    SAVE: 'FRA.SAVE'
};

export default new Map([
    [actions.ON_LOAD, FamilyRegisterActions.onLoad],
    [actions.NEXT, FamilyRegisterActions.onNext],
    [actions.PREVIOUS, FamilyRegisterActions.onPrevious],
    [actions.REGISTRATION_ENTER_REGISTRATION_DATE, FamilyRegisterActions.enterRegistrationDate],
    [actions.REGISTRATION_ENTER_HEAD_OF_FAMILY, FamilyRegisterActions.enterHeadOfFamily],
    [actions.REGISTRATION_ENTER_ADDRESS_LEVEL, FamilyRegisterActions.enterFamilyAddressLevel],
    [actions.REGISTRATION_ENTER_TYPE_OF_FAMILY, FamilyRegisterActions.enterFamilyTypeOfFamily],
    [actions.REGISTRATION_ENTER_TYPE_OF_FAMILY, FamilyRegisterActions.enterFamilyTypeOfFamily],
    [actions.REGISTRATION_ENTER_HOUSEHOLD_NUMBER, FamilyRegisterActions.enterFamilyHouseholdNumber],
    [actions.TOGGLE_MULTISELECT_ANSWER, ObservationsHolderActions.toggleMultiSelectAnswer],
    [actions.TOGGLE_SINGLESELECT_ANSWER, ObservationsHolderActions.toggleSingleSelectAnswer],
    [actions.PRIMITIVE_VALUE_CHANGE, ObservationsHolderActions.onPrimitiveObsUpdateValue],
    [actions.PRIMITIVE_VALUE_END_EDITING, ObservationsHolderActions.onPrimitiveObsUpdateValue],
    [actions.DURATION_CHANGE, ObservationsHolderActions.onDurationChange],
    [actions.SAVE, FamilyRegisterActions.onSave],
]);

export {actions as Actions};