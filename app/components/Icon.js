import React from 'react';
import {TouchableWithoutFeedback, View} from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons';

function Icon({name, size=40, backgroundColor="#000", iconColor="#fff", onPress}) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View
                style={{
                    width: size,
                    height: size,
                    borderRadius: size/2,
                    backgroundColor,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <MaterialCommunityIcons name={name} color={iconColor} size={size * 0.5}/>
            </View>
        </TouchableWithoutFeedback>

    );
}

export default Icon;