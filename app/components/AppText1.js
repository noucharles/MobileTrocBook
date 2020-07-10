import React from "react";
import { Text } from "react-native";

import defaultStyles from "../config/styles";

function AppText1({ children, style }) {
    return <Text numberOfLines={1} style={[defaultStyles.text, style]}>{children}</Text>;
}

export default AppText1;