import React from 'react';
import {View, StyleSheet} from "react-native";
import {useFormikContext} from "formik/dist/index";

import AppTextInput from "../AppTextInput";
import ErrorMessage from "./ErrorMessage";

function AppFormField({name, width, ...otherProps}) {

    const {setFieldTouched, handleChange, errors, touched,} = useFormikContext();

    return (
        <>
            <AppTextInput
                onBlur={() => setFieldTouched(name)}
                width={width}
                onChangeText={handleChange(name)}
                {...otherProps}
            />
            <ErrorMessage error={errors[name]} visible={touched[name]}/>
        </>
    );
}

const styles = StyleSheet.create({

});

export default AppFormField;