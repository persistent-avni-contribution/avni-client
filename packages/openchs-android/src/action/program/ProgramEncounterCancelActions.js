import FormMappingService from "../../service/FormMappingService";
import ObservationsHolderActions from '../common/ObservationsHolderActions';
import ProgramEncounterService from "../../service/program/ProgramEncounterService";
import _ from 'lodash';
import ProgramEncounterCancelState from "./ProgramEncounterCancelState";
import RuleEvaluationService from "../../service/RuleEvaluationService";
import {Point, ProgramEncounter, WorkList, WorkLists, Encounter} from 'openchs-models';
import EntityService from "../../service/EntityService";
import GeolocationActions from "../common/GeolocationActions";
import EncounterService from "../../service/EncounterService";

class ProgramEncounterCancelActions {
    static getInitialState() {
        return {};
    }

    static filterFormElements(formElementGroup, context, programEncounter) {
        let formElementStatuses = context.get(RuleEvaluationService).getFormElementsStatuses(programEncounter, ProgramEncounterCancelActions.getSchema(programEncounter), formElementGroup);
        return formElementGroup.filterElements(formElementStatuses);
    };

    static getSchema(encounter) {
        return encounter.programEnrolment && ProgramEncounter.schema.name || Encounter.schema.name;
    }

    static onLoad(state, action, context) {
        let programEncounter = context.get(EntityService).findByUUID(action.programEncounter.uuid,
            ProgramEncounterCancelActions.getSchema(action.programEncounter));
        programEncounter = programEncounter.cloneForEdit();
        const program = programEncounter.programEnrolment && programEncounter.programEnrolment.program || null;
        const form = context.get(FormMappingService).findFormForCancellingEncounterType(
            programEncounter.encounterType,
            program,
            programEncounter.individual.subjectType
        );

        if (_.isNil(form)) {
            throw new Error(`No form setup for EncounterType: ${programEncounter.encounterType}`);
        }

        programEncounter.cancelDateTime = new Date();
        let firstGroupWithAtLeastOneVisibleElement = _.find(_.sortBy(form.nonVoidedFormElementGroups(), [function (o) {
            return o.displayOrder
        }]), (formElementGroup) => ProgramEncounterCancelActions.filterFormElements(formElementGroup, context, programEncounter).length !== 0);

        if (_.isNil(firstGroupWithAtLeastOneVisibleElement)) {
            throw new Error("No form element group with visible form element");
        }
        let filteredElements = ProgramEncounterCancelActions.filterFormElements(firstGroupWithAtLeastOneVisibleElement, context, programEncounter);
        const workListParams = (encounter) => {
            return _.isNil(encounter.programEnrolment) ?
                {encounterType: encounter.encounterType.name, subjectUUID: encounter.individual.uuid} :
                {
                    encounterType: encounter.encounterType.name,
                    subjectUUID: encounter.individual.uuid,
                    programName: encounter.programEnrolment.program.name,
                }
        };
        const workLists = action.workLists || new WorkLists(new WorkList('Encounter')
            .withCancelledEncounter(workListParams(action.programEncounter)));
        return ProgramEncounterCancelState.createOnLoad(programEncounter, form, firstGroupWithAtLeastOneVisibleElement, filteredElements, workLists);
    }

    static onNext(state, action, context) {
        return state.clone().handleNext(action, context);
    }

    static onPrevious(state, action, context) {
        return state.clone().handlePrevious(action, context);
    }

    static onSave(state, action, context) {
        const newState = state.clone();
        _.isNil(newState.programEncounter.programEnrolment) ?
            context.get(EncounterService).saveOrUpdate(newState.programEncounter, action.nextScheduledVisits) :
            context.get(ProgramEncounterService).saveOrUpdate(newState.programEncounter, action.nextScheduledVisits);

        setTimeout(()=>action.cb(),0);
        return newState;
    }

    static setCancelLocation(state, action, context) {
        const newState = state.clone();
        const position = action.value;
        newState.programEncounter.cancelLocation = Point.newInstance(position.coords.latitude, position.coords.longitude);
        newState.handleValidationResult(
            state.validateLocation(
                newState.programEncounter.cancelLocation,
                ProgramEncounter.validationKeys.CANCEL_LOCATION,
                context
            )
        );
        return newState;
    }
}

const ProgramEncounterCancelActionsNames = {
    ON_LOAD: 'ProgramEncounterCancelActions.ON_LOAD',
    TOGGLE_MULTISELECT_ANSWER: "ProgramEncounterCancelActions.TOGGLE_MULTISELECT_ANSWER",
    TOGGLE_SINGLESELECT_ANSWER: "ProgramEncounterCancelActions.TOGGLE_SINGLESELECT_ANSWER",
    PRIMITIVE_VALUE_CHANGE: 'ProgramEncounterCancelActions.PRIMITIVE_VALUE_CHANGE',
    PRIMITIVE_VALUE_END_EDITING: 'ProgramEncounterCancelActions.PRIMITIVE_VALUE_END_EDITING',
    DATE_DURATION_CHANGE: 'ProgramEncounterCancelActions.DATE_DURATION_CHANGE',
    DURATION_CHANGE: 'ProgramEncounterCancelActions.DURATION_CHANGE',
    PREVIOUS: 'ProgramEncounterCancelActions.PREVIOUS',
    NEXT: 'ProgramEncounterCancelActions.NEXT',
    SAVE: "ProgramEncounterCancelActions.SAVE",
    SET_CANCEL_LOCATION: "ProgramEncounterCancelActions.SET_CANCEL_LOCATION",
    SET_LOCATION_ERROR: "ProgramEncounterCancelActions.SET_LOCATION_ERROR",
};

const ProgramEncounterCancelActionsMap = new Map([
    [ProgramEncounterCancelActionsNames.ON_LOAD, ProgramEncounterCancelActions.onLoad],
    [ProgramEncounterCancelActionsNames.TOGGLE_MULTISELECT_ANSWER, ObservationsHolderActions.toggleMultiSelectAnswer],
    [ProgramEncounterCancelActionsNames.TOGGLE_SINGLESELECT_ANSWER, ObservationsHolderActions.toggleSingleSelectAnswer],
    [ProgramEncounterCancelActionsNames.PRIMITIVE_VALUE_CHANGE, ObservationsHolderActions.onPrimitiveObsUpdateValue],
    [ProgramEncounterCancelActionsNames.PRIMITIVE_VALUE_END_EDITING, ObservationsHolderActions.onPrimitiveObsEndEditing],
    [ProgramEncounterCancelActionsNames.DATE_DURATION_CHANGE, ObservationsHolderActions.onDateDurationChange],
    [ProgramEncounterCancelActionsNames.DURATION_CHANGE, ObservationsHolderActions.onDurationChange],
    [ProgramEncounterCancelActionsNames.NEXT, ProgramEncounterCancelActions.onNext],
    [ProgramEncounterCancelActionsNames.PREVIOUS, ProgramEncounterCancelActions.onPrevious],
    [ProgramEncounterCancelActionsNames.SAVE, ProgramEncounterCancelActions.onSave],
    [ProgramEncounterCancelActionsNames.SET_CANCEL_LOCATION, ProgramEncounterCancelActions.setCancelLocation],
    [ProgramEncounterCancelActionsNames.SET_LOCATION_ERROR, GeolocationActions.setLocationError],
]);

export {
    ProgramEncounterCancelActionsNames,
    ProgramEncounterCancelActionsMap,
    ProgramEncounterCancelActions
};