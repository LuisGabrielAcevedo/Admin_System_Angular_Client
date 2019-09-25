import {
    FormField,
    FormFieldTypes
} from "src/app/components/sharedComponents/dynamic-form/dynamic-form.interfaces";

const restaurantFields: FormField[] = [
    {
        name: "Ingredients",
        key: "characteristics.ingredients",
        component: FormFieldTypes.stringList,
        flexConfig: {
            row: 1,
            flex: 100,
            rowTitle: 'Ingredients'
        },
        options: {
            placeholder: 'write a ingredient',
            label: 'Ingredient'
        }
    }
];

export default restaurantFields;
