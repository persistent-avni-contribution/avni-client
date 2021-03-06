import {expect} from "chai";
import {IndividualProfileActions as IPA} from "../../src/action/individual/IndividualProfileActions";
import TestContext from "./views/testframework/TestContext";
import {Individual} from 'avni-models';
import EntityFactory from "../EntityFactory";

describe('IndividualProfileActionsTest', () => {
    xit('programEnrolmentFlow', () => {
        var state = IPA.getInitialState();
        const tbProgram = EntityFactory.createSafeProgram('TB');
        const individual = Individual.createEmptyInstance();
        const serviceData = {eligiblePrograms: [tbProgram, EntityFactory.createSafeProgram('Mother')]};
        serviceData[individual.uuid] = individual;

        state = IPA.individualSelected(state, {individual: individual}, new TestContext(serviceData));
        state = IPA.launchChooseProgram(state);
        state = IPA.selectedProgram(state, {value: tbProgram});
        state = IPA.programSelectionConfirmed(state, {cb: () => {}});
        expect(state.entity.program.name).is.equal(tbProgram.name);
    });
});