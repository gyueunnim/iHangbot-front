import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

/* screen */
import Report from './Report';
import Modification from './Modification';

const Tab = createBottomTabNavigator();

function ReportTab() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Report" component={Report} />
            <Tab.Screen name="Modification" component={Modification} />
        </Tab.Navigator>
    )
}




export default ReportTab;