import IndividualService from "../../service/IndividualService";
import ObservationsHolderActions from "../common/ObservationsHolderActions";
import EntityService from "../../service/EntityService";
import {Gender, Form, Individual, Point, SubjectType, ObservationsHolder} from "openchs-models";
import IndividualRegistrationState from "../../state/IndividualRegistrationState";
import _ from 'lodash';
import GeolocationActions from "../common/GeolocationActions";
import IdentifierAssignmentService from "../../service/IdentifierAssignmentService";
import FormMappingService from "../../service/FormMappingService";

export class IndividualRegisterActions {
    static getInitialState(context) {
        const genders = context.get(EntityService).getAll(Gender.schema.name);
        const gendersSortedByName = _.sortBy(genders, "name");

        return {genders: gendersSortedByName};
    }

    static onLoad(state, action, context) {
        const individual = _.isNil(action.individualUUID) ?
            Individual.createEmptyInstance() : context.get(IndividualService).findByUUID(action.individualUUID);

        const currentWorkItem = action.workLists.getCurrentWorkItem();
        const subjectType = context.get(EntityService).findByKey('name', currentWorkItem.parameters.subjectTypeName, SubjectType.schema.name);

        if (_.isEmpty(individual.subjectType.name)) {
            individual.subjectType = subjectType;
        }
        const form = context.get(FormMappingService).findRegistrationForm(subjectType);

        //Populate identifiers much before form elements are hidden or sent to rules.
        //This will enable the value to be used in rules
        context.get(IdentifierAssignmentService).populateIdentifiers(form, new ObservationsHolder(individual.observations));

        const newState = IndividualRegistrationState.createLoadState(form, state.genders, individual, action.workLists);
        IndividualRegisterActions.setAgeState(newState);
        return newState;
    }

    static enterRegistrationDate(state, action) {
        const newState = state.clone();
        newState.individual.registrationDate = action.value;
        newState.handleValidationResult(newState.individual.validateRegistrationDate());
        return newState;
    }

    static enterFirstName(state, action) {
        const newState = state.clone();
        newState.individual.setFirstName(action.value);
        newState.handleValidationResult(newState.individual.validateFirstName());
        return newState;
    }

    static enterLastName(state, action) {
        const newState = state.clone();
        newState.individual.setLastName(action.value);
        newState.handleValidationResult(newState.individual.validateLastName());
        return newState;
    }

    static setLocation(state, action, context) {
        const newState = state.clone();
        const position = action.value;
        newState.individual.registrationLocation = Point.newInstance(position.coords.latitude, position.coords.longitude);
        newState.handleValidationResult(
            state.validateLocation(
                newState.individual.registrationLocation,
                Individual.validationKeys.REGISTRATION_LOCATION,
                context
            )
        );
        return newState;
    }

    static enterIndividualDOB(state, action) {
        const newState = state.clone();
        newState.individual.setDateOfBirth(action.value);
        IndividualRegisterActions.setAgeState(newState);
        newState.handleValidationResult(newState.individual.validateDateOfBirth());
        return newState;
    }

    static setAgeState(state) {
        state.age = state.individual.getAge().durationValueAsString;
        state.ageProvidedInYears = state.individual.getAge().isInYears;
    }

    static enterIndividualDOBVerified(state, action) {
        const newState = state.clone();
        newState.individual.dateOfBirthVerified = action.value;
        return newState;
    }

    static enterIndividualAge(state, action) {
        const newState = state.clone();
        newState.age = action.value;
        newState.individual.setAge(action.value, state.ageProvidedInYears);
        newState.handleValidationResult(newState.individual.validateDateOfBirth());
        return newState;
    }

    static enterIndividualAgeProvidedInYears(state, action) {
        const newState = state.clone();
        newState.ageProvidedInYears = action.value;
        newState.individual.setAge(state.age, action.value);
        newState.handleValidationResult(newState.individual.validateDateOfBirth());
        return newState;
    }

    static enterIndividualGender(state, action) {
        const newState = state.clone();
        newState.individual.gender = action.value;
        newState.handleValidationResult(newState.individual.validateGender());
        return newState;
    }

    static enterIndividualAddressLevel(state, action) {
        const newState = state.clone();
        newState.individual.lowestAddressLevel = action.value;
        newState.handleValidationResult(newState.individual.validateAddress());
        return newState;
    }

    static onNext(state, action, context) {
        console.log('came herecame herecame herecame herecame herecame herecame herecame here', 'NEXTNEXTNEXT');
        return state.clone().handleNext(action, context);
    }

    static onPrevious(state, action, context) {
        return state.clone().handlePrevious(action, context);
    }

    static onSave(state, action, context) {
        console.log('came herecame herecame herecame herecame herecame herecame herecame here', 1);
        const newState = state.clone();
        context.get(IndividualService).register(newState.individual, action.nextScheduledVisits);
        setTimeout(()=>action.cb, 0);
        return newState;
    }
}

const actions = {
    ON_LOAD: "REGISTRATION_ON_LOAD",
    NEXT: "REGISTRATION_NEXT",
    PREVIOUS: "REGISTRATION_PREVIOUS",
    REGISTRATION_ENTER_REGISTRATION_DATE: "REGISTRATION_ENTER_REGISTRATION_DATE",
    REGISTRATION_ENTER_FIRST_NAME: "REGISTRATION_ENTER_FIRST_NAME",
    REGISTRATION_ENTER_LAST_NAME: "REGISTRATION_ENTER_LAST_NAME",
    REGISTRATION_ENTER_DOB: "REGISTRATION_ENTER_DOB",
    REGISTRATION_ENTER_DOB_VERIFIED: "REGISTRATION_ENTER_DOB_VERIFIED",
    REGISTRATION_ENTER_AGE: "REGISTRATION_ENTER_AGE",
    REGISTRATION_ENTER_AGE_PROVIDED_IN_YEARS: "REGISTRATION_ENTER_AGE_PROVIDED_IN_YEARS",
    REGISTRATION_ENTER_GENDER: "REGISTRATION_ENTER_GENDER",
    REGISTRATION_ENTER_ADDRESS_LEVEL: "REGISTRATION_ENTER_ADDRESS_LEVEL",
    TOGGLE_MULTISELECT_ANSWER: "b2af8248-ad5e-4639-ba6d-02b25c813e5e",
    TOGGLE_SINGLESELECT_ANSWER: "cdc7b1c2-d5aa-4382-aa93-1663275132f7",
    PRIMITIVE_VALUE_CHANGE: '13230ada-ee22-4a50-a2a8-5f14d1d9cd46',
    PRIMITIVE_VALUE_END_EDITING: '84f511d9-acf0-412d-951b-4226f7c6cf47',
    DATE_DURATION_CHANGE: '17e164f5-756d-4fe5-b3e4-41dad53abb53',
    DURATION_CHANGE: 'b1136ef7-202b-4a41-8b82-5603a4f90000',
    SAVE: 'IRA.SAVE',
    RESET: 'IRA.RESET',
    REGISTRATION_SET_LOCATION: "REGISTRATION_SET_LOCATION",
    SET_LOCATION_ERROR: "IRA.SET_LOCATION_ERROR",
};

export default new Map([
    [actions.ON_LOAD, IndividualRegisterActions.onLoad],
    [actions.NEXT, IndividualRegisterActions.onNext],
    [actions.PREVIOUS, IndividualRegisterActions.onPrevious],
    [actions.REGISTRATION_ENTER_REGISTRATION_DATE, IndividualRegisterActions.enterRegistrationDate],
    [actions.REGISTRATION_ENTER_FIRST_NAME, IndividualRegisterActions.enterFirstName],
    [actions.REGISTRATION_ENTER_LAST_NAME, IndividualRegisterActions.enterLastName],
    [actions.REGISTRATION_ENTER_DOB, IndividualRegisterActions.enterIndividualDOB],
    [actions.REGISTRATION_ENTER_DOB_VERIFIED, IndividualRegisterActions.enterIndividualDOBVerified],
    [actions.REGISTRATION_ENTER_AGE, IndividualRegisterActions.enterIndividualAge],
    [actions.REGISTRATION_ENTER_AGE_PROVIDED_IN_YEARS, IndividualRegisterActions.enterIndividualAgeProvidedInYears],
    [actions.REGISTRATION_ENTER_GENDER, IndividualRegisterActions.enterIndividualGender],
    [actions.REGISTRATION_ENTER_ADDRESS_LEVEL, IndividualRegisterActions.enterIndividualAddressLevel],
    [actions.TOGGLE_MULTISELECT_ANSWER, ObservationsHolderActions.toggleMultiSelectAnswer],
    [actions.TOGGLE_SINGLESELECT_ANSWER, ObservationsHolderActions.toggleSingleSelectAnswer],
    [actions.PRIMITIVE_VALUE_CHANGE, ObservationsHolderActions.onPrimitiveObsUpdateValue],
    [actions.PRIMITIVE_VALUE_END_EDITING, ObservationsHolderActions.onPrimitiveObsUpdateValue],
    [actions.DATE_DURATION_CHANGE, ObservationsHolderActions.onDateDurationChange],
    [actions.DURATION_CHANGE, ObservationsHolderActions.onDurationChange],
    [actions.SAVE, IndividualRegisterActions.onSave],
    [actions.REGISTRATION_SET_LOCATION, IndividualRegisterActions.setLocation],
    [actions.SET_LOCATION_ERROR, GeolocationActions.setLocationError],
]);

export {actions as Actions};
