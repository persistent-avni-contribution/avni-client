import {expect} from "chai";
import ProgramEncounter from "../../js/models/ProgramEncounter";
import ProgramEnrolment from "../../js/models/ProgramEnrolment";
import ValidationResultsInspector from "./ValidationResultsInspector";

describe('ProgramEncounterTest', () => {
    it('validate', () => {
        const programEncounter = ProgramEncounter.createEmptyInstance();
        programEncounter.programEnrolment = ProgramEnrolment.createEmptyInstance();
        programEncounter.encounterDateTime = null;

        var validationResults = programEncounter.validate();
        expect(ValidationResultsInspector.numberOfErrors(validationResults)).is.equal(1);

        programEncounter.programEnrolment.enrolmentDateTime = new Date(2017, 0, 0, 5);
        programEncounter.encounterDateTime = new Date(2016, 0, 0);
        validationResults = programEncounter.validate();
        expect(ValidationResultsInspector.numberOfErrors(validationResults)).is.equal(1);

        programEncounter.encounterDateTime = new Date(2017, 1, 0);
        validationResults = programEncounter.validate();
        expect(ValidationResultsInspector.numberOfErrors(validationResults)).is.equal(0);

        //ignore time differences
        programEncounter.encounterDateTime = new Date(2017, 0, 0, 3);
        validationResults = programEncounter.validate();
        expect(ValidationResultsInspector.numberOfErrors(validationResults)).is.equal(0);
    });
});