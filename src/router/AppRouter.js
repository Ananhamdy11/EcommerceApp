import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./MainStack";

export default function AppRouter() {
    return(
         <NavigationContainer>
        <MainStack/>
    </NavigationContainer>
    )

};
