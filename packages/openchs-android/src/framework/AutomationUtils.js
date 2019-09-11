import _ from 'lodash';

const fns = new Map([]);

const mark = (name, fn) => {
    console.log(`[MARKING] ${name}`);
    fns.set(name, fn);
    return fn;
};

const update = currentRoute => {
    const rejecteds = _.reject([...fns.keys()], existingHook => {
        return !!existingHook.match(new RegExp('^' + currentRoute.slice(1)))
    });
    rejecteds.forEach(rejected => fns.delete(rejected));
};

const exists = async (name, millisecs = 5000) => {
    return new Promise((resolve, reject) => {
        const intervalHandler = setInterval(() => {
            if (!_.isNil(fns.get(name))) {
                clearInterval(intervalHandler);
                clearTimeout(timedoutHandler);
                resolve(true);
            }
        }, 400);
        const timedoutHandler = setTimeout(() => {
            clearInterval(intervalHandler);
            console.log(`[ERROR] timedout AutomationUtils.click(${name},${millisecs}) is not found`);
            resolve(false);
        }, millisecs);
    });
};

const waitfor = async (seconds) => {
    return new Promise((res, rej) => {
        setTimeout(res, seconds * 1000);
    });
};

const click = async (name) => {
    if (fns.get(name)) {
        fns.get(name)();
    } else {
        console.log(`[NOT-FOUND] AutomationUtils.click(${name})`);
    }
};

const put = async (name, value) => {
    if (fns.get(name)) {
        fns.get(name)(value);
    } else {
        console.log(`[NOT-FOUND] AutomationUtils.click(${name})`);
    }
};

const createIndividual = async (i) => {
    await exists('landingView.RegisterButton');
    await click('landingView.RegisterButton');
    await exists('landingView.Button.Pregnant woman');
    await click('landingView.Button.Pregnant woman');
    await exists('individualRegister.firstName');
    await put('individualRegister.firstName', 'Sita' + i);
    await put('individualRegister.lastName', 'Ram' + i);
    await put('individualRegister.age', +'25' + i + '');
    await click('individualRegister.Gender.Female');
    await click('individualRegister.Area.1');
    await exists('individualRegister.wizard.DEFAULT.NEXT');
    await click('individualRegister.wizard.DEFAULT.NEXT');
    await exists('IndividualRegisterFormView.wizard.1.NEXT');
    await click('IndividualRegisterFormView.wizard.1.NEXT');
    await exists('IndividualRegisterFormView.wizard.2.NEXT');
    await click('IndividualRegisterFormView.wizard.2.NEXT');
    await exists('IndividualRegisterFormView.wizard.3.NEXT');
    await click('IndividualRegisterFormView.wizard.3.NEXT');
    await exists('IndividualRegisterFormView.wizard.4.NEXT');
    await click('IndividualRegisterFormView.wizard.4.NEXT');
    await exists('IndividualRegisterFormView.wizard.5.NEXT');
    await click('IndividualRegisterFormView.wizard.5.NEXT');
    await exists('IndividualRegisterFormView.wizard.6.NEXT');
    await click('IndividualRegisterFormView.wizard.6.NEXT');
    await exists('SystemRecommendationView.wizard.LAST.MORE');
    await click('SystemRecommendationView.wizard.LAST.MORE');
    await exists('ProgramEnrolmentView.Last menstrual period');
    await put('ProgramEnrolmentView.Last menstrual period', new Date(2019, 5, 5));
    await put('ProgramEnrolmentView.Weight', '65');
    await put('ProgramEnrolmentView.Height', '165');
    await exists('ProgramEnrolmentView.wizard.1.NEXT');
    await click('ProgramEnrolmentView.wizard.1.NEXT');
    await exists('ProgramEnrolmentView.Is this your first pregnancy?.Yes');
    await click('ProgramEnrolmentView.Is this your first pregnancy?.Yes');
    await exists('ProgramEnrolmentView.wizard.2.NEXT');
    await click('ProgramEnrolmentView.wizard.2.NEXT');
    await exists('ProgramEnrolmentView.wizard.4.NEXT');
    await click('ProgramEnrolmentView.wizard.4.NEXT');
    await exists('ProgramEnrolmentView.wizard.5.NEXT');
    await click('ProgramEnrolmentView.wizard.5.NEXT');
    await exists('ProgramEnrolmentView.wizard.8.NEXT');
    await click('ProgramEnrolmentView.wizard.8.NEXT');
    await exists('ProgramEnrolmentView.wizard.9.NEXT');
    await click('ProgramEnrolmentView.wizard.9.NEXT');
    await exists('SystemRecommendationView.wizard.LAST.NEXT');
    await click('SystemRecommendationView.wizard.LAST.NEXT');
};

const openIndividuals = (i) => {

};

const exec = async () => {
    const d = 'W2009,w2013,W2026,W2001,W1840,W1807,W1398,W1453,W1870,W1860,W903,W1729,W1669,W1522,W2005,W1905,W1398,W1453,W1870,W1860,W903,W1729,W1669,W1522,W2005,W1905,w2029,W1194,W1023,W1128,W532,W1444,W1083,W1279,W997,W905,W1465,W1209,W991,W1411,W1715,W1655,W1552,w1977,W1753,W821,W1682,W576,W1980,W1252,W2037,W1779,W1742,W2021,W2002,W1986,W1749,w1998,W2038,W2011,W1662,W1982,W975,W409,W2030,w2027,W2042,W1973,W2025,W1820,W1892,W2019,W2000,w2034,W2036,w2045,W2033,W2020,W2023,W2039,W2043,W2032,W2041,w1974,W2048,W2049,W2016,W2008,W1924,W2056,W2061,W2031,W2017,W1637,w2059,W2064,W2046,W2062,W2022,W2060,W1064,W2070,W2069,W1836,W126,W695'
        .split(',');
    return;
    for (let i = 0; i < 50; i++) {
        console.log('[AutomationUtils][log]', ` --- item ${i}`);
        // await createIndividual(i);
        await exists('landingView.SearchButton');
        await click('landingView.SearchButton');
        await exists('landingView.obsKeyword');
        await put('landingView.obsKeyword', d[i]);
        await click('landingView.Submit');

        // (i>45) && await waitfor(0.5);
        await exists('individualSearchResults.0');
        await click('individualSearchResults.0');
        // (i>45) && await waitfor(0.5);
        if (false) {
            await exists('ProgramEnrolmentTabView.New Program Visit');
            await click('ProgramEnrolmentTabView.New Program Visit');
            if (await exists('StartProgramView.PLANNED.ANC GMP')) {
                await click('StartProgramView.PLANNED.ANC GMP');
            } else if (await exists('StartProgramView.PLANNED.ANC GMP')) {
                await click('StartProgramView.ANC GMP');
            } else {
                await click('StartProgramView.HomeButton');
                continue;
            }
            (i > 45) && await waitfor(0.5);
            await exists('ProgramEncounterView.Weight');
            await put('ProgramEncounterView.Weight', '65');
            await exists('ProgramEncounterView.wizard.1.NEXT');
            await click('ProgramEncounterView.wizard.1.NEXT');
            await exists('SystemRecommendationView.wizard.LAST.NEXT');
            (i > 45) && await waitfor(0.5);
            await click('SystemRecommendationView.wizard.LAST.NEXT');
        }
        await exists('ProgramEnrolmentTabView.HomeButton');
        await click('ProgramEnrolmentTabView.HomeButton');
    }
};


export default {
    mark,
    update,
    exec
}

export {
    mark,
    update,
    exec
}
