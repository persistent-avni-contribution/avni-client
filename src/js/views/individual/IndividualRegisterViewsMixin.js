import TypedTransition from "../../framework/routing/TypedTransition";
import LandingView from "../LandingView";
import IndividualRegisterFormView from "./IndividualRegisterFormView";
import {Alert} from "react-native";
import {Actions} from "../../action/individual/IndividualRegisterActions";

class IndividualRegisterViewsMixin {
    static next(view) {
        view.dispatchAction(Actions.NEXT, {
            completed: () => {
                TypedTransition.from(view).to(LandingView);
            },
            movedNext: () => {
                TypedTransition.from(view).to(IndividualRegisterFormView);
            },
            validationFailed: (message) => {
                Alert.alert(view.I18n.t("validationError"), message,
                    [
                        {
                            text: view.I18n.t('ok'), onPress: () => {}
                        }
                    ]
                );
            }
        });
    }
}

export default IndividualRegisterViewsMixin;