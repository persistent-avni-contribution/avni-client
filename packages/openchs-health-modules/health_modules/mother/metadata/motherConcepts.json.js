var ABNORMAL = true;
var UNIQUE = true;
var conceptRepo = {};
var conceptPayload = [];

function commonAnswer(uuid, name) {
  if (conceptRepo[name]) {
    throw `"${name}" name already exists`;
  }
  if (conceptRepo[uuid]) {
    throw `"${uuid}" uuid already exists`;
  }
  conceptPayload.push(conceptRepo[uuid] = conceptRepo[name] = { uuid: uuid, name: name, dataType: 'NA' });
}

function commonConcept(concept) {
  if (conceptRepo[concept.name]) {
    throw `"${concept.name}" name already exists`;
  }
  if (conceptRepo[concept.uuid]) {
    throw `"${concept.uuid}" uuid already exists`;
  }
  conceptPayload.push(conceptRepo[concept.uuid] = conceptRepo[concept.name] = concept);
}

function commonQuestion(name, uuid, answers) {
  if (conceptRepo[name]) {
    throw `"${name}" name already exists`;
  }
  if (conceptRepo[uuid]) {
    throw `"${uuid}" uuid already exists`;
  }
  conceptPayload.push(conceptRepo[uuid] = conceptRepo[name] = { uuid: uuid, name: name, dataType: 'Coded', answers: answers });
}

function useAnswer(name, props) {
  if (!conceptRepo[name]) {
    throw `concept with "${name}" name not defined`;
  }
  return useAnswerUnsafe(conceptRepo[name].uuid, props);
}

/* this is unsafe because the uuid is checked against this file */
function useAnswerUnsafe(uuid, props) {
  props = props || {};
  return { uuid: uuid, abnormal: props.ABNORMAL === true, unique: props.UNIQUE === true };
}

commonAnswer("3661d5a9-d097-4cd6-8387-58b38cfc61ea", "+1");
commonAnswer("10db74d9-2357-412e-b04c-099ab9a1c3f1", "+2");
commonAnswer("172513b3-b1bb-4411-a3ea-a8e9914cb21a", "+3");
commonAnswer("98d05a6e-2234-4238-85d2-92835581803d", "+4");
commonAnswer("9139d435-2178-46d9-aea9-429597e533b2", "1");
commonAnswer("502759ae-00c9-4a22-a7eb-7e40e842f931", "3 or more than 3 spontaneous abortions");
commonAnswer("daa7c62f-c663-4981-a134-1f662b3036d0", "AA");
commonAnswer("b21e0c2c-7516-4019-85a2-a103e1ef7156", "Abnormal Hb");
commonAnswer("e8b6e80e-2952-4ad8-8e8a-bb7299a13c7b", "Abnormal Hb Electrophoresis");
commonAnswer("b52921f9-5450-4a99-a172-02e9b33fbb3d", "Abnormal Liquour");
commonAnswer("a0460e35-d7de-46f2-8c12-783c3ae445b3", "Abnormal Paracheck");
commonAnswer("834adde5-0f87-46a7-93eb-779130ba510e", "Abnormal Urine Albumin");
commonAnswer("fd175971-d14e-429b-80ea-4700fa748251", "Abnormal Urine Sugar");
commonAnswer("03dddd29-c1bb-4231-a17b-55445e247e7d", "Abortion");
commonAnswer("10885638-561a-42b6-8b24-8daa01864c89", "Absent");
commonAnswer("05f99af0-af6d-4818-927b-c8502b4551d7", "Active movements");
commonAnswer("331aee3f-0567-4f75-9efd-722f04606e75", "Age < 18");
commonAnswer("9e66cbbd-3b24-4578-b423-6f3022298be6", "Age > 30");
commonAnswer("3dc4aa0e-e941-4f02-8dd5-d1e1d48753ff", "Ante Partum Haemorrhage");
commonAnswer("bbcab554-15c0-424f-a86f-e12a9ad38a53", "Ante Partum hemorrhage (APH)");
commonAnswer("77ee8a6a-2a01-421f-85ca-fc0ab39abcdb", "AS");
commonAnswer("40503ff9-6a37-46d7-be5d-843c12971c60", "Aspirin");
commonAnswer("d3f764e5-938a-42dd-bdef-02614d424f8d", "Auxillary Nurse Midwife");
commonAnswer("abbd780c-e5a4-4558-b576-86394b359822", "Bad-smelling lochia");
commonAnswer("a23bc4b5-b1a5-40ff-b67c-255a0788baf3", "Blue/pale");
commonAnswer("2367268e-5988-4db3-a0ca-19438bd5931c", "Blurred vision");
commonAnswer("81671303-a09c-425f-aa4c-bdafd2de37d9", "Blurring of vision");
commonAnswer("c66ef660-ded1-439a-8255-917ecf0e61a1", "Body pink but hands and feet blue/pale");
commonAnswer("9d5b4823-959b-4650-bec2-ed7a1db7c057", "Breast hardness");
commonAnswer("d225cac9-f306-49ba-b9d3-3826c92995e6", "Breech");
commonAnswer("60cf6ea6-2a4c-459d-ac67-52c6cdc23f54", "Breech or transverse presentation [ObstetricHistory]");
commonAnswer("8a07fe4d-1814-4f80-90fe-5fbedf2a0518", "Burning Urination");
commonAnswer("f5192c76-f772-4e84-8fea-16d980de15bc", "Caesarean");
commonAnswer("e4ccf02c-9767-4641-ab76-5128e2a1f0d9", "Calcium 1g/day");
commonAnswer("ab96f92f-6412-43e2-bb20-aabecd3aefad", "Cephalic");
commonAnswer("6914364e-6627-46bf-94c4-574d051e7fb4", "Child born Underweight");
commonAnswer("c1071344-deb9-4311-a397-b67b8a4bfecf", "Chronic Hypertension");
commonAnswer("73f97a3b-3b71-4b63-81f6-16976ee00aac", "Colour of child is Pale or Blue");
commonAnswer("0d6fdc51-a8c7-4baf-a85e-e6a55b14cd8d", "Completely pink");
commonAnswer("f63a0122-8156-4956-a29c-c0722ff22a89", "Completion");
commonAnswer("e641d792-ea69-40ed-bf26-67c6c567f687", "Congenital anomaly");
commonAnswer("b694eefb-6b9d-4123-98a4-1bfc39a7dcb4", "Convulsions Present");
commonAnswer("804a3c4c-e42e-47b0-923b-43c808c631bc", "Cracked Nipple");
commonAnswer("afff87d7-4c40-4dd4-9bf7-8e5d9adb3b83", "Death");
commonAnswer("d4276c48-2db2-494b-b041-97ffc1146c83", "Decreased Foetal movements");
commonAnswer("603a37fb-1179-477d-a4bc-cb9f2f463f25", "Did not cry soon after birth");
commonAnswer("fe8c09ce-4135-4092-a693-3ad9bd8edb44", "Difficulty breathing");
commonAnswer("8e1ef29f-c2d6-4586-97a1-5c791251c4f0", "Difficulty in breathing");
commonAnswer("34ac55d2-84e1-44a5-981d-d3cf1fedd0cf", "Difficulty passing urine");
commonAnswer("46d34d4d-a5c0-4f3c-b70e-f1f067fb7c4e", "Doxinate 1 OD/BD for 10 Days");
commonAnswer("3b26f408-cbc6-4afc-a5bd-1d4e22ce77a7", "During Transportation like in Ambulance etc");
commonAnswer("63c6e46e-77ea-44d7-bb46-ae4f16acb399", "Early Neonatal death within first 24 Hours of birth");
commonAnswer("489f07e5-d9e1-478a-969d-3acad587a15e", "Eclampsia");
commonAnswer("7cdba040-6fad-4a43-8306-4a284178cf5d", "Excessive vomiting and inability to consume anything orally");
commonAnswer("77e9e9d8-671c-483b-a460-33f1c65b6bcc", "Ferrous Sulphate (100mg)");
commonAnswer("33651495-9255-4885-977d-f6b2bf8471cc", "Ferrous Sulphate (200mg)");
commonAnswer("c2d3b745-b145-4268-80ec-6ea9707a99a5", "Filled with pus");
commonAnswer("040e37d2-12ff-465c-8bf2-990358805f11", "Flat");
commonAnswer("9ba87237-ea3f-42f4-9bac-99fa5fcc9abc", "Flat Nipples");
commonAnswer("5e430139-4681-441e-9218-c806033dea77", "Flexed arms and legs");
commonAnswer("dc3ed683-9e61-47be-899f-3c024ef2896f", "Foetal heart rate irregular");
commonAnswer("b85fce4e-aace-47df-898f-3f574f7587ae", "Foetal heart sound absent");
commonAnswer("36b67c37-5ea2-463b-9eef-47ba95d2c097", "Foetal heart sound irregular");
commonAnswer("902df2a5-6403-4cb8-8732-e1e62bfa2364", "Foetal Movements Absent");
commonAnswer("8df37793-00cc-4d7e-9f4a-656216661a71", "Foetal movements absent");
commonAnswer("2f9afed5-dccb-4a2e-b771-48e88e48c814", "Foetal movements reduced");
commonAnswer("a9f90005-4865-4244-81a2-1a9e95279cb4", "Folic acid (1 OD)");
commonAnswer("40325a6e-bbf7-4a85-96d5-f79d0e447543", "Genital Tract Infection");
commonAnswer("d98df61f-00f4-4b06-816e-1e36fca847c2", "Give exclusive breast feeding");
commonAnswer("338d5fb1-0493-4270-8d35-81105c239bbb", "Grand Multipara");
commonAnswer("2facbe79-1def-40c2-a107-e6fcfd6e9977", "Grimace/painful expression");
commonAnswer("6c1b893d-d18e-40ca-af29-85d1bb4ef497", "Grimace/painful expression and Cough or sneeze");
commonAnswer("89d2230c-7c64-4959-8835-bef4667f8428", "Heart Disease");
commonAnswer("396d9f7d-2dc7-4517-9543-85f1a8cbf00c", "Heavy bleeding per vaginum");
commonAnswer("f9b654e6-628b-4bbf-b3ee-2adc5ab7ea1c", "Hepatitis B Positive");
commonAnswer("3eab36f5-13cd-4c7b-9f4d-0ecbdbfdb57e", "High blood sugar");
commonAnswer("eb1ec712-8a28-4511-ba59-4254ad301700", "High Temperature");
commonAnswer("45350576-a60b-4431-90da-65604933d97c", "HIV/AIDS Positive");
commonAnswer("bb75a86c-05af-4b05-b699-860737d19e57", "Home");
commonAnswer("bab23da4-603e-4f9e-a823-90cc785d8f2f", "Icterus Present");
commonAnswer("9e7d21e8-8123-46de-8bf0-f3c79e5810b0", "Induced");
commonAnswer("40c79aa5-2f83-4a2e-a5fd-8f490e42e25d", "Indurated");
commonAnswer("f67e74ea-f048-40b1-abaa-19ff8ac20b10", "Infected perineum suture");
commonAnswer("492f2658-5a54-4d47-894c-af90d02730b7", "Insomnia");
commonAnswer("071291ce-e644-4d66-89b9-94d14364effc", "Institutional");
commonAnswer("a72f03ce-c239-4f28-a18b-0e680db20f62", "Institutional ANC");
commonAnswer("c958100c-ad81-4da8-816e-6ad7eceaac87", "Institutional Delivery");
commonAnswer("eeaf9b42-71f7-49d4-80c6-a498619d1645", "Instrumental");
commonAnswer("02df7aad-d88c-4155-ab92-4d3569b64376", "Instrumental Delivery");
commonAnswer("92ba84ab-b395-48c4-b867-932524f60d15", "Intrapartum Death");
commonAnswer("16d08bef-fa20-40d3-8813-1cd10268bbb1", "Intrauterine death");
commonAnswer("7e9fed7d-f111-4c87-9412-d8c0f8c162d2", "Intrauterine Growth Retardation");
commonAnswer("701b5f95-0a7a-453e-8bcd-282af4d2dc97", "Irregular abdominal girth increase");
commonAnswer("a88feab9-1f5d-4c83-a215-cd0ba44006f6", "Irregular fundal height increase");
commonAnswer("d976d3c9-0c39-4faf-8544-f9a2273ea2d5", "Irregular pulse");
commonAnswer("47b79102-ad82-4a61-83cd-e01c4bc73cfe", "Irregular Respiratory Rate");
commonAnswer("ebb0dd6f-4dc8-4ef5-838b-a18eec5ba9c9", "Irregular weight gain");
commonAnswer("8b5390e0-bb10-438f-b57a-44afdc973d9c", "Irritability");
commonAnswer("2facaa69-1164-4847-82bd-a0216e9c1a50", "Jaundice Present");
commonAnswer("d53ccfbc-f5fd-4225-9b28-1736ec6c50b5", "Keep the baby warm");
commonAnswer("e3e5b7aa-e24c-4f97-98fb-a175a9721e53", "Keep the baby warm detailed advice");
commonAnswer("e3999b21-821c-4c6e-9953-156e70b9217c", "Live Birth");
commonAnswer("6323bb46-3510-4a7f-9531-4ebd32278911", "Looks red");
commonAnswer("47e93f5b-3bfb-4fb7-826f-278d8d0e04ce", "Loss of appetite");
commonAnswer("15f3e8c9-b39e-4617-b54e-6a425d8fa9a2", "Low Temperature");
commonAnswer("eb68c395-17dc-4679-828c-487753228e9f", "LSCS/C-section");
commonAnswer("0dee2973-eebe-4699-b676-b770fdd1c411", "Malaria");
commonAnswer("96ec37c6-9572-4288-9220-2fe806093bde", "Malpresentation");
commonAnswer("948e4a90-66ad-47ee-8d7a-e003e03fb434", "Mastitis");
commonAnswer("475b4eba-f2ef-4d09-ac27-3913e0b23373", "Maternal Death");
commonAnswer("c5a95b60-61b9-4861-a9a2-9b783e768b27", "Medical Officer/ Doctor");
commonAnswer("0eb43d96-dfff-4e45-91e8-1a273b419763", "Mild Pre-Eclampsia");
commonAnswer("fb079822-6338-46fe-9919-112686850e2d", "Miscarriage");
commonAnswer("c67d2c3a-c1c8-4cb7-b76e-b77e02541577", "Moderate Anemia");
commonAnswer("2a2768ac-713b-4f74-85af-4a1fc5a832d1", "Morning Sickness");
commonAnswer("4b306479-a861-4bd5-b89a-7098ec75d4bc", "Mother program enrolment with TB recommendation");
commonAnswer("b5719e3e-db9c-49c1-af0c-3047b1b9c57a", "Multiple Births");
commonAnswer("c99f5dc0-7dc7-410c-bb4a-997666ac312b", "Multiple fetuses");
commonAnswer("8701cdcf-5d23-4b05-8be0-310159758a4d", "Muscle tone Absent/Flexed arms and legs");
commonAnswer("58146bb8-9fbe-439b-a472-08e17a8cd4ba", "Neonatal death within first 28 days");
commonAnswer("cdb94629-a710-43f0-b5ce-3921905f24f2", "NGO Hospital");
commonAnswer("e109964e-1f6f-49dd-9cdf-b862f91f3b65", "Nipple hardness");
commonAnswer("a440c668-a9d8-4ac4-8652-0660e0ca6364", "No difficulties");
commonAnswer("136f5c20-c8be-4028-89cb-8a22571526c2", "Non-Skilled Birth Attendant (NSBA)");
commonAnswer("ba43b326-18a1-4f8d-ad04-29b0371461e0", "Normal");
commonAnswer("57f0b3c2-372e-4af7-8a0d-b23228f836db", "Not Breast-fed within 1 hour of birth");
commonAnswer("92454e8f-6ead-42a8-8c8c-114a405c1e39", "Not Previa");
commonAnswer("3654f7c6-e515-4653-8298-50dfb54d2152", "Obstructed Labour");
commonAnswer("8021adee-ad70-4644-97c6-d0804851f8d3", "Old age pregnancy");
commonAnswer("97652252-0024-434d-8749-078b395fb6f2", "Pain on urination");
commonAnswer("57c62191-910f-4d86-bb9d-ab0d9009a04d", "Pallor Present");
commonAnswer("cc23823e-2f67-4230-98d4-46d326548869", "Pedal Edema Present");
commonAnswer("8afff549-a6b4-4eef-b229-b534be99e8e4", "Placenta Previa Present");
commonAnswer("8b757ad9-c413-4efa-af54-974f65e727ac", "Post abortion complications");
commonAnswer("681007b0-13a2-4910-aae8-47f1edae0a4b", "Post Operative Infection");
commonAnswer("3abc1b44-0486-4378-abc0-ffb8235144ca", "Post Partum Haemorrhage");
commonAnswer("ac1e984c-28be-4ce2-887c-262749151350", "Post-Partum Depression");
commonAnswer("154aeecb-2c8f-43f4-b86c-e070b83a516d", "Post-Partum Haemorrhage");
commonAnswer("4ed8b24e-e031-4289-9c1e-70bde07a80a4", "PPH");
commonAnswer("4c5c8ed4-3166-4782-b010-728aeee3ebb1", "Pre Eclampsia/ Eclampsia");
commonAnswer("d86bf489-eb51-47c9-8c98-b109aba38951", "Pre-term labour");
commonAnswer("5a738df9-b09a-4e7d-b683-189a9cdabcad", "Pregnancy induced hypertension");
commonAnswer("5576ac3f-5492-4956-9934-801f06f1ca13", "Present and Irregular");
commonAnswer("45b86f84-aeb9-474d-bef8-df986c0a0927", "Present and Regular");
commonAnswer("a382978b-6ae5-4320-8873-7ee80d8c0657", "Preterm");
commonAnswer("d9501d6b-7ae9-4b2f-b1a3-56f7fb1ea241", "Previa");
commonAnswer("af7ae32a-dc5f-4ac2-a372-1baa6edf0b53", "Previous Abortion(s)");
commonAnswer("36824575-042b-4137-ba3c-ce1145ce81e8", "Previous Ante Partum Haemorrhage");
commonAnswer("4f40dbfb-008f-4b34-856e-d668207cdb7e", "Previous Instrumental Delivery");
commonAnswer("9133804d-26a0-4546-a459-15b2c9ade793", "Previous Intrapartum Death");
commonAnswer("217d0b53-0314-4a64-b710-82fc8fe1bf9c", "Previous Intrauterine Death");
commonAnswer("6b641e43-b981-4c10-a83c-fafac4654372", "Previous Intrauterine Growth Retardation");
commonAnswer("de5d06c1-df58-4e0f-949c-52100f769932", "Previous LSCS/C-section");
commonAnswer("6f969c17-cc0d-48cf-8ca4-835c02de4e1c", "Previous Multiple Births");
commonAnswer("1b4f8d76-8272-4afe-ba1a-c277421d74d4", "Previous Neonatal death within first 28 days");
commonAnswer("e6759d31-2529-4919-b38b-34cb09188767", "Previous Post Partum Haemorrhage");
commonAnswer("5d0ba446-65b7-4704-b435-6071bf49bcd0", "Previous Pre Eclampsia/ Eclampsia");
commonAnswer("79a37abe-1a1d-41fc-9732-c95b7108553e", "Previous Pre-term labour");
commonAnswer("d8637e17-faef-42fe-b2da-a16cfd7de33f", "Previous Pregnancy Induced Hypertension");
commonAnswer("24bd28bc-9301-446f-94c0-9264bf3e4cd8", "Previous Prolonged labour");
commonAnswer("9b9b1c0e-8dd3-4520-8c46-4488fd030fa9", "Previous Retained Placenta");
commonAnswer("937a4d2a-7e38-4ca5-8309-113199d4a27e", "Previous Still Birth");
commonAnswer("43524d76-5f86-485f-b101-3b669ca3431e", "Previous Threatened Abortion");
commonAnswer("b4007f93-f288-49aa-b2ad-96f1a0f75a43", "Primary Health Center");
commonAnswer("2156deeb-bec7-4614-873f-eed4807a74f3", "Prolonged labour");
commonAnswer("8993ed6a-df82-420e-9da8-fc4eecd6bdc3", "Puerperal sepsis");
commonAnswer("e183bd41-eedf-458e-a96f-f818bf128243", "Pulse <100 or > 160 bpm");
commonAnswer("79865f4d-1946-40b4-a823-28281fc58ba0", "PV bleeding");
commonAnswer("f7a77870-e1c6-47b7-9d72-01eec4adf0f5", "PV leaking");
commonAnswer("cc933b72-291f-41c3-a5c2-53cfc9966a63", "Reduced");
commonAnswer("f2eb3d4c-838d-4f67-9815-cf108e0f05ff", "Reflex Absent");
commonAnswer("0ad759eb-5fb9-4152-b39c-0c80e1c4ecda", "Regional Hospital");
commonAnswer("6b329b8c-04b7-4cdd-90ea-1cd79dbd014b", "Respiratory Rate <30 or > 60 bpm");
commonAnswer("d211703c-beab-40f3-9e87-a271759c5ec9", "Retained Placenta");
commonAnswer("3273b055-0222-44b6-b0a6-7d45fb4e1b33", "Retracted");
commonAnswer("c95ab0ea-46bb-41fb-995a-24a2db3681a2", "Retracted Nipples");
commonAnswer("0c3353c3-f4c9-4028-9cd0-bde9a317927b", "Rh Negative Blood Group");
commonAnswer("fe1c108e-507b-4abc-ad91-3930b59d3c62", "Rh negative in the previous pregnancy");
commonAnswer("5ba2d201-a120-4f2d-92e6-ca97d48b60b0", "Severe Abdominal Pain");
commonAnswer("1aff631c-e487-4202-a862-122b45168ac6", "Severe Anemia");
commonAnswer("5a6ab8bb-fb14-4747-a66e-3961d718a83e", "Severe headache");
commonAnswer("e6b24a5c-00f2-46c7-aa67-5b460df5cc81", "Severe Pre-Eclampsia");
commonAnswer("ca01f2cf-6479-44cf-9d43-ad428c82f9a6", "Shifted to other geographical area");
commonAnswer("9af1e8e9-f16c-46de-8794-ac302444c63d", "Short Stature");
commonAnswer("705b3ef7-e41a-4954-bc3f-9556eb002f3d", "Sickle cell disease SS");
commonAnswer("4d2733ec-098a-407b-bfd2-1fd123dbe96d", "Sickling Positive");
commonAnswer("e93e1640-7fea-4085-9f17-cfc36fcf13c5", "Spontaneous");
commonAnswer("3648a650-2f3e-4c2c-a899-c0a8212aace1", "SS");
commonAnswer("797c7923-1993-49d9-b759-1706aae62ae9", "Still Birth");
commonAnswer("fe24e909-6346-4e84-bacc-2ec5ae85bed8", "Sub Center");
commonAnswer("f2e5ac5b-b0f8-4088-bc42-397a3885308f", "Superimposed Pre-Eclampsia");
commonAnswer("f6947afd-9592-4ac8-808a-4cd5bdc1443e", "TBA (Trained Birth Attendant)");
commonAnswer("61612a0b-72db-46a8-97d5-d9994d86118f", "Term");
commonAnswer("b61694a3-5762-483b-a439-3f09fa7b796b", "Threatened abortion");
commonAnswer("17b0423e-ba04-4f24-b196-f82639c2ca4c", "Trace");
commonAnswer("74f986ee-faa5-40b1-baa8-78732761ce47", "Transverse");
commonAnswer("25c522b8-7f11-4ff0-8096-c7f5ddeba7ab", "Triplet");
commonAnswer("d4943a59-16da-45e1-98c1-354c710fdbc0", "Twins");
commonAnswer("edb0ec5e-56dc-4826-b922-52ed2e182fd8", "Under age pregnancy");
commonAnswer("41b2db08-99a4-428c-a908-641330858b8a", "Underweight");
commonAnswer("69072b54-1258-4851-917f-0657667f3bcd", "Urinary Tract Infection");
commonAnswer("ae847737-5be5-4c55-8abe-db3606c2de6b", "Uterine Rupture");
commonAnswer("6c670fde-e4c1-4885-b672-452de7a023e0", "Uterus is soft or tender");
commonAnswer("3e562cd9-a23c-415b-922d-c4c86d788444", "Vaginal Rupture");
commonAnswer("06c6b0ea-8ddc-4ed0-ab58-59ed67659571", "VDRL Positive");
commonAnswer("48d13717-d2d4-450e-bb9c-59976237cd90", "Very preterm");
commonAnswer("25ec9a8c-07df-471c-afac-4919d016464d", "Weakness");
commonAnswer("73ece93d-2065-4ff2-8f87-669142d186e6", "Weight Gain Per Month less than 1kg");
commonAnswer("4d95ca6e-f2a1-42bd-b52b-44fd8e853d63", "Weight Gain Per Month more than 1.5kg");
commonAnswer("afb87749-1c3a-455f-81d2-f320ce72f45e", "Weight of the previous baby less than 2500g or more than 4500g");
commonAnswer("1ff880ff-477d-4519-a664-a612a393dd60", "White Discharge");
commonAnswer("49350a36-a442-47d2-bf96-2ecbe8fd1cc5", "Young child");

commonConcept({ uuid: "1f4227dc-a51f-4237-9217-37d4cea92efd", name: "Essential Hypertension" });
commonConcept({ uuid: "dde911fa-15eb-4564-8deb-bba46e9d3744", name: "Estimated Date of Delivery", dataType: "Date" });
commonConcept({ uuid: "4b7fcf0b-3ecb-49fe-882d-959b58e7229d", name: "Gestational Age", dataType: "Numeric", unit: "week(s)" });
commonConcept({ uuid: "7d34125a-1b0b-4755-acc8-aeda71af8bd3", name: "Other obstetrics history", dataType: "Text" });
commonConcept({ uuid: "38b9986b-76e8-4015-ae51-48152b1cd42c", name: "Number of abortions", dataType: "Numeric", lowAbsolute: 0, highAbsolute: 10 });
commonConcept({ uuid: "77ee9c20-d074-4cbe-a5bd-a1ca9d6ecce9", name: "Foetal Heart Rate", dataType: "Numeric", unit: "bpm" });
commonConcept({ uuid: "9ab68204-6336-4074-b99b-7de20549be3b", name: "Other pregnancy complications", dataType: "Text" });
commonConcept({ uuid: "7ff327c5-8678-41e3-af39-c86f214c6f14", name: "Birth Weight", unit: "kg", dataType: "Numeric" });

commonQuestion("PNC Complications", "5e204b7a-c5df-4cc4-af45-99647b61e047", [
  useAnswer("Post-Partum Haemorrhage", { ABNORMAL }),
  useAnswer("Urinary Tract Infection", { ABNORMAL }),
  useAnswer("Genital Tract Infection", { ABNORMAL }),
  useAnswer("Mastitis", { ABNORMAL }),
  useAnswer("Post Operative Infection", { ABNORMAL }),
  useAnswer("Post-Partum Depression", { ABNORMAL })]);

commonQuestion("Obstetrics history", "8a4ab436-6767-45d5-95d7-075d9459609e", [
  useAnswer("Threatened abortion", { ABNORMAL }),
  useAnswer("3 or more than 3 spontaneous abortions", { ABNORMAL }),
  useAnswer("Pregnancy induced hypertension", { ABNORMAL }),
  useAnswer("Intrauterine death", { ABNORMAL }),
  useAnswer("Pre Eclampsia/ Eclampsia", { ABNORMAL }),
  useAnswer("Ante Partum Haemorrhage", { ABNORMAL }),
  useAnswer("Intrauterine Growth Retardation", { ABNORMAL }),
  useAnswer("Pre-term labour", { ABNORMAL }),
  useAnswer("Prolonged labour", { ABNORMAL }),
  useAnswer("Instrumental Delivery", { ABNORMAL }),
  useAnswer("LSCS/C-section", { ABNORMAL }),
  useAnswer("Still Birth", { ABNORMAL }),
  useAnswer("Multiple Births", { ABNORMAL }),
  useAnswer("Retained Placenta", { ABNORMAL }),
  useAnswer("Post Partum Haemorrhage", { ABNORMAL }),
  useAnswer("Intrapartum Death", { ABNORMAL }),
  useAnswer("Neonatal death within first 28 days", { ABNORMAL }),
  useAnswer("Congenital anomaly", { ABNORMAL }),
  useAnswer("Breech or transverse presentation [ObstetricHistory]", { ABNORMAL }),
  useAnswer("Puerperal sepsis", { ABNORMAL }),
  useAnswer("Post abortion complications", { ABNORMAL }),
  useAnswer("Rh negative in the previous pregnancy", { ABNORMAL }),
  useAnswer("Weight of the previous baby less than 2500g or more than 4500g", { ABNORMAL }),
  useAnswerUnsafe("05ea583c-51d2-412d-ad00-06c432ffe538", { ABNORMAL }),
  useAnswerUnsafe("855fb739-19d8-418d-a8ae-c1da977b7fa9", { UNIQUE })]);

commonQuestion("Family history", "18fa9773-bf4b-47f8-9535-f1573a477940", [
  useAnswerUnsafe("998d1bae-05d8-47b9-89b8-0254829f238f"),
  useAnswerUnsafe("674f348f-5075-4c85-8bc2-9edfdee27505"),
  useAnswerUnsafe("ca8a5f57-c409-47ad-8acf-921cdd0fc191")]);

commonQuestion("Recommendations", "39c83171-b9ff-441a-9b68-071741ecb618", [
  useAnswer("Mother program enrolment with TB recommendation", { ABNORMAL }),
  useAnswer("Institutional Delivery", { ABNORMAL }),
  useAnswer("Institutional ANC", { ABNORMAL }),
  useAnswer("Keep the baby warm", { ABNORMAL }),
  useAnswer("Keep the baby warm detailed advice", { ABNORMAL }),
  useAnswer("Give exclusive breast feeding", { ABNORMAL })]);

commonQuestion("Pregnancy complications", "0adc4170-9ebb-4feb-8b81-450fbf9a04dc", [
  useAnswer("Morning Sickness", { ABNORMAL }),
  useAnswer("Excessive vomiting and inability to consume anything orally", { ABNORMAL }),
  useAnswer("Pain on urination", { ABNORMAL }),
  useAnswer("Severe Abdominal Pain", { ABNORMAL }),
  useAnswer("Difficulty breathing", { ABNORMAL }),
  useAnswer("Blurring of vision", { ABNORMAL }),
  useAnswer("Decreased Foetal movements", { ABNORMAL }),
  useAnswer("Severe headache", { ABNORMAL }),
  useAnswer("PV bleeding", { ABNORMAL }),
  useAnswer("PV leaking", { ABNORMAL }),
  useAnswerUnsafe("05ea583c-51d2-412d-ad00-06c432ffe538", { ABNORMAL }),
  useAnswerUnsafe("855fb739-19d8-418d-a8ae-c1da977b7fa9", { UNIQUE })]);

commonQuestion("Treatment", "4e6cdd7d-7ef3-493d-bb7a-c956722a772a", [
  useAnswer("Doxinate 1 OD/BD for 10 Days"),
  useAnswer("Folic acid (1 OD)"),
  useAnswer("Ferrous Sulphate (100mg)"),
  useAnswer("Ferrous Sulphate (200mg)"),
  useAnswer("Calcium 1g/day"),
  useAnswer("Aspirin")]);

commonQuestion("High Risk Conditions", "f34f974b-47b0-424d-ae97-d479c80efa49", [
  useAnswer("Rh Negative Blood Group", { ABNORMAL }),
  useAnswer("Age < 18", { ABNORMAL }),
  useAnswer("Age > 30", { ABNORMAL }),
  useAnswer("Not Breast-fed within 1 hour of birth", { ABNORMAL }),
  useAnswer("Did not cry soon after birth", { ABNORMAL }),
  useAnswer("Colour of child is Pale or Blue", { ABNORMAL }),
  useAnswer("Reflex Absent", { ABNORMAL }),
  useAnswer("Muscle tone Absent/Flexed arms and legs", { ABNORMAL }),
  useAnswer("Pulse <100 or > 160 bpm", { ABNORMAL }),
  useAnswer("Low Temperature", { ABNORMAL }),
  useAnswer("High Temperature", { ABNORMAL }),
  useAnswer("Respiratory Rate <30 or > 60 bpm", { ABNORMAL }),
  useAnswer("Icterus Present", { ABNORMAL }),
  useAnswer("Young child", { ABNORMAL }),
  useAnswerUnsafe("1f4227dc-a51f-4237-9217-37d4cea92efd", { ABNORMAL }),
  useAnswer("Severe Pre-Eclampsia", { ABNORMAL }),
  useAnswer("Previous Retained Placenta", { ABNORMAL }),
  useAnswer("VDRL Positive", { ABNORMAL }),
  useAnswer("Decreased Foetal movements", { ABNORMAL }),
  useAnswer("Foetal movements absent", { ABNORMAL }),
  useAnswer("Previous Prolonged labour", { ABNORMAL }),
  useAnswer("Foetal heart rate irregular", { ABNORMAL }),
  useAnswer("Abnormal Urine Sugar", { ABNORMAL }),
  useAnswer("Previous Intrauterine Death", { ABNORMAL }),
  useAnswer("Irregular weight gain", { ABNORMAL }),
  useAnswer("Previous Post Partum Haemorrhage", { ABNORMAL }),
  useAnswer("Difficulty breathing", { ABNORMAL }),
  useAnswerUnsafe("998d1bae-05d8-47b9-89b8-0254829f238f", { ABNORMAL }),
  useAnswer("Previous LSCS/C-section", { ABNORMAL }),
  useAnswer("Weight Gain Per Month more than 1.5kg", { ABNORMAL }),
  useAnswer("Foetal Movements Absent", { ABNORMAL }),
  useAnswer("Foetal heart sound absent", { ABNORMAL }),
  useAnswer("Multiple fetuses", { ABNORMAL }),
  useAnswer("Sickle cell disease SS", { ABNORMAL }),
  useAnswer("Severe Abdominal Pain", { ABNORMAL }),
  useAnswer("Previous Pregnancy Induced Hypertension", { ABNORMAL }),
  useAnswer("HIV/AIDS Positive", { ABNORMAL }),
  useAnswer("PV bleeding", { ABNORMAL }),
  useAnswer("Under age pregnancy", { ABNORMAL }),
  useAnswer("Weight Gain Per Month less than 1kg", { ABNORMAL }),
  useAnswer("Pedal Edema Present", { ABNORMAL }),
  useAnswer("Previous Neonatal death within first 28 days", { ABNORMAL }),
  useAnswer("Grand Multipara", { ABNORMAL }),
  useAnswer("Retracted Nipples", { ABNORMAL }),
  useAnswer("Convulsions Present", { ABNORMAL }),
  useAnswer("Jaundice Present", { ABNORMAL }),
  useAnswerUnsafe("37acc93a-8416-4440-ba68-d61ac4ba4c5f", { ABNORMAL }),
  useAnswer("Previous Pre Eclampsia/ Eclampsia", { ABNORMAL }),
  useAnswer("Abnormal Urine Albumin", { ABNORMAL }),
  useAnswer("Short Stature", { ABNORMAL }),
  useAnswer("Mild Pre-Eclampsia", { ABNORMAL }),
  useAnswer("Abnormal Hb Electrophoresis", { ABNORMAL }),
  useAnswer("Previous Threatened Abortion", { ABNORMAL }),
  useAnswerUnsafe("674f348f-5075-4c85-8bc2-9edfdee27505", { ABNORMAL }),
  useAnswer("Morning Sickness", { ABNORMAL }),
  useAnswer("Previous Instrumental Delivery", { ABNORMAL }),
  useAnswer("Foetal heart sound irregular", { ABNORMAL }),
  useAnswer("Malaria", { ABNORMAL }),
  useAnswerUnsafe("2e86955f-0d81-4e80-a1f4-255b3c186bec", { ABNORMAL }),
  useAnswer("Ante Partum hemorrhage (APH)", { ABNORMAL }),
  useAnswer("Previous Pre-term labour", { ABNORMAL }),
  useAnswer("Abnormal Paracheck", { ABNORMAL }),
  useAnswer("Chronic Hypertension", { ABNORMAL }),
  useAnswer("Rh Negative Blood Group", { ABNORMAL }),
  useAnswer("Previous Abortion(s)", { ABNORMAL }),
  useAnswer("Pregnancy induced hypertension", { ABNORMAL }),
  useAnswer("Irregular abdominal girth increase", { ABNORMAL }),
  useAnswerUnsafe("352bb8a4-1569-492f-9a53-14e3b134c104", { ABNORMAL }),
  useAnswer("Severe Anemia", { ABNORMAL }),
  useAnswer("PV leaking", { ABNORMAL }),
  useAnswer("Previous Still Birth", { ABNORMAL }),
  useAnswer("Miscarriage", { ABNORMAL }),
  useAnswer("Irregular fundal height increase", { ABNORMAL }),
  useAnswerUnsafe("a34bf7a0-4d55-41fa-855a-0b8094f369f7", { ABNORMAL }),
  useAnswer("Previous Intrauterine Growth Retardation", { ABNORMAL }),
  useAnswer("High blood sugar", { ABNORMAL }),
  useAnswer("Previous Ante Partum Haemorrhage", { ABNORMAL }),
  useAnswer("Heart Disease", { ABNORMAL }),
  useAnswer("Underweight", { ABNORMAL }),
  useAnswer("Irregular Respiratory Rate", { ABNORMAL }),
  useAnswer("Pallor Present", { ABNORMAL }),
  useAnswer("Placenta Previa Present", { ABNORMAL }),
  useAnswerUnsafe("8425af99-4a07-4d99-97b2-cf955713a560", { ABNORMAL }),
  useAnswer("Previous Multiple Births", { ABNORMAL }),
  useAnswer("Malpresentation", { ABNORMAL }),
  useAnswer("Sickling Positive", { ABNORMAL }),
  useAnswer("Superimposed Pre-Eclampsia", { ABNORMAL }),
  useAnswerUnsafe("ab9596e4-04b6-48f2-9f4d-1c7a2c82dbf8", { ABNORMAL }),
  useAnswer("Blurring of vision", { ABNORMAL }),
  useAnswer("Irregular pulse", { ABNORMAL }),
  useAnswer("Flat Nipples", { ABNORMAL }),
  useAnswerUnsafe("0b7f3334-f81e-4d84-a13d-b35011e34456", { ABNORMAL }),
  useAnswer("Moderate Anemia", { ABNORMAL }),
  useAnswer("Hepatitis B Positive", { ABNORMAL }),
  useAnswer("Previous Intrapartum Death", { ABNORMAL }),
  useAnswer("Severe headache", { ABNORMAL }),
  useAnswer("Abnormal Liquour", { ABNORMAL }),
  useAnswer("Abnormal Hb", { ABNORMAL }),
  useAnswer("Excessive vomiting and inability to consume anything orally", { ABNORMAL }),
  useAnswer("Foetal movements reduced", { ABNORMAL }),
  useAnswer("Old age pregnancy", { ABNORMAL }),
  useAnswerUnsafe("ca8a5f57-c409-47ad-8acf-921cdd0fc191", { ABNORMAL }),
  useAnswer("Puerperal sepsis", { ABNORMAL }),
  useAnswer("Post abortion complications", { ABNORMAL })]);

commonQuestion("Refer to the hospital for", "18cfc41a-2110-484e-a3c6-3f5592387324", [
  useAnswer("Irregular weight gain", { ABNORMAL }),
  useAnswer("Flat Nipples", { ABNORMAL }),
  useAnswer("Retracted Nipples", { ABNORMAL }),
  useAnswer("Irregular fundal height increase", { ABNORMAL }),
  useAnswer("Irregular abdominal girth increase", { ABNORMAL }),
  useAnswer("Not Breast-fed within 1 hour of birth", { ABNORMAL }),
  useAnswer("Did not cry soon after birth", { ABNORMAL }),
  useAnswer("Colour of child is Pale or Blue", { ABNORMAL }),
  useAnswer("Reflex Absent", { ABNORMAL }),
  useAnswer("Muscle tone Absent/Flexed arms and legs", { ABNORMAL }),
  useAnswer("Pulse <100 or > 160 bpm", { ABNORMAL }),
  useAnswer("Low Temperature", { ABNORMAL }),
  useAnswer("High Temperature", { ABNORMAL }),
  useAnswer("Respiratory Rate <30 or > 60 bpm", { ABNORMAL }),
  useAnswer("Icterus Present", { ABNORMAL })]);

commonQuestion("Refer to the hospital immediately for", "c59da618-20d8-4384-b32b-e0e31013581f", [
  useAnswer("Not Breast-fed within 1 hour of birth", { ABNORMAL }),
  useAnswer("Colour of child is Pale or Blue", { ABNORMAL }),
  useAnswer("Reflex Absent", { ABNORMAL }),
  useAnswer("Muscle tone Absent/Flexed arms and legs", { ABNORMAL }),
  useAnswer("Pulse <100 or > 160 bpm", { ABNORMAL }),
  useAnswer("Low Temperature", { ABNORMAL }),
  useAnswer("High Temperature", { ABNORMAL }),
  useAnswer("Respiratory Rate <30 or > 60 bpm", { ABNORMAL }),
  useAnswer("Icterus Present", { ABNORMAL }),
  useAnswer("Did not cry soon after birth", { ABNORMAL }),
  useAnswer("Child born Underweight", { ABNORMAL }),
  useAnswer("Multiple fetuses", { ABNORMAL }),
  useAnswer("Abnormal Liquour", { ABNORMAL }),
  useAnswer("Placenta Previa Present", { ABNORMAL }),
  useAnswerUnsafe("ca8a5f57-c409-47ad-8acf-921cdd0fc191", { ABNORMAL }),
  useAnswer("Excessive vomiting and inability to consume anything orally", { ABNORMAL }),
  useAnswerUnsafe("0b7f3334-f81e-4d84-a13d-b35011e34456", { ABNORMAL }),
  useAnswer("Severe Abdominal Pain", { ABNORMAL }),
  useAnswer("Blurring of vision", { ABNORMAL }),
  useAnswer("Decreased Foetal movements", { ABNORMAL }),
  useAnswer("PV bleeding", { ABNORMAL }),
  useAnswer("PV leaking", { ABNORMAL }),
  useAnswerUnsafe("ab9596e4-04b6-48f2-9f4d-1c7a2c82dbf8", { ABNORMAL }),
  useAnswerUnsafe("352bb8a4-1569-492f-9a53-14e3b134c104", { ABNORMAL }),
  useAnswer("Foetal movements absent", { ABNORMAL }),
  useAnswer("Foetal movements reduced", { ABNORMAL }),
  useAnswer("Foetal heart sound irregular", { ABNORMAL }),
  useAnswer("Foetal heart sound absent", { ABNORMAL }),
  useAnswer("Foetal heart rate irregular", { ABNORMAL }),
  useAnswerUnsafe("998d1bae-05d8-47b9-89b8-0254829f238f", { ABNORMAL }),
  useAnswer("Abnormal Paracheck", { ABNORMAL }),
  useAnswer("Abnormal Hb", { ABNORMAL }),
  useAnswer("High blood sugar", { ABNORMAL }),
  useAnswer("Abnormal Hb Electrophoresis", { ABNORMAL }),
  useAnswer("Abnormal Urine Albumin", { ABNORMAL }),
  useAnswer("Abnormal Urine Sugar", { ABNORMAL })]);

commonQuestion("Gestational age category at birth", "24c71448-1068-4dc2-aa2f-8bbb66a5123f", [
  useAnswer("Term"),
  useAnswer("Preterm"),
  useAnswer("Very preterm")]);

commonQuestion("Gender of child", "5572fc36-e766-4034-8217-7f92d0225c86", [
  useAnswerUnsafe("7038d549-4a3b-4600-b856-f6f3d123fbd8"),
  useAnswerUnsafe("09e1b06f-26be-4f7a-8121-5dba3a11b684"),
  useAnswerUnsafe("d56700ea-fac8-4255-8403-7f8f3b755335")]);

commonQuestion("Colour of child", "747f9b96-5b88-4f08-b52c-e1a060df4c30", [
  useAnswer("Blue/pale"),
  useAnswer("Body pink but hands and feet blue/pale"),
  useAnswer("Completely pink")]);

commonQuestion("Reflex", "85359b71-4790-4c00-b8ca-89cb024985bd", [
  useAnswer("Absent", { ABNORMAL }),
  useAnswer("Grimace/painful expression"),
  useAnswer("Grimace/painful expression and Cough or sneeze")]);

commonQuestion("Muscle tone", "8ae7a140-900c-4bae-bb20-15b8c883869a", [
  useAnswer("Absent", { ABNORMAL }),
  useAnswer("Flexed arms and legs", { ABNORMAL }),
  useAnswer("Active movements")]);

commonQuestion("Jaundice (Icterus)", "78cb1fb0-9e7c-4012-872c-00589fda661d", [
  useAnswerUnsafe("57b51d52-981f-4af2-b133-aeffa6d00757", { ABNORMAL }),
  useAnswer("Absent")]);

console.log(JSON.stringify(conceptPayload, null, 2));