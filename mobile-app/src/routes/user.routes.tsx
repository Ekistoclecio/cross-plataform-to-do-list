import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Svg, Path } from "react-native-svg";

const { Navigator, Screen } = createBottomTabNavigator();

import KanbanList from "../screens/KanbanList";
import Dashboard from "../screens/Dashboard";
import File from "../screens/File";
import Notification from "../screens/Notification";
import { useEffect, useState } from "react";
import { Box } from "@gluestack-ui/themed";
import CreateTask from "../screens/CreateTask";
import EditTask from "../screens/EditTask";
import { useTasksContext } from "../providers/contexts/tasksContext";

export default function UserRoutes() {
  const [newNotification, setNewNotification] = useState(false);
  const { activeTasksArray } = useTasksContext();

  useEffect(() => {
    if (
      activeTasksArray.find(
        (task) => task.notificationVisualization === false
      ) != undefined
    ) {
      setNewNotification(true);
    } else {
      setNewNotification(false);
    }
  }, [activeTasksArray]);

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#363d65",
        },
      }}
    >
      <Screen
        name="kanbanList"
        component={KanbanList}
        options={{
          tabBarIcon: ({ color }) => (
            <Svg viewBox="0 0 24 24" height={36} width={36} fill={color}>
              <Path d="m9 3v18h6v-18zm-1 0h-4.5c-.82842712 0-1.5.67157288-1.5 1.5v15c0 .8284271.67157288 1.5 1.5 1.5h4.5zm8 0v18h4.5c.8284271 0 1.5-.6715729 1.5-1.5v-15c0-.82842712-.6715729-1.5-1.5-1.5zm-15 1.5c0-1.38071187 1.11928813-2.5 2.5-2.5h17c1.3807119 0 2.5 1.11928813 2.5 2.5v15c0 1.3807119-1.1192881 2.5-2.5 2.5h-17c-1.38071187 0-2.5-1.1192881-2.5-2.5zm3 1.5h2c.55228475 0 1 .44771525 1 1v1c0 .55228475-.44771525 1-1 1h-2c-.55228475 0-1-.44771525-1-1v-1c0-.55228475.44771525-1 1-1zm0 4h2c.55228475 0 1 .4477153 1 1v1c0 .5522847-.44771525 1-1 1h-2c-.55228475 0-1-.4477153-1-1v-1c0-.5522847.44771525-1 1-1zm7-4h2c.5522847 0 1 .44771525 1 1v1c0 .55228475-.4477153 1-1 1h-2c-.5522847 0-1-.44771525-1-1v-1c0-.55228475.4477153-1 1-1zm7 0h2c.5522847 0 1 .44771525 1 1v1c0 .55228475-.4477153 1-1 1h-2c-.5522847 0-1-.44771525-1-1v-1c0-.55228475.4477153-1 1-1zm0 4h2c.5522847 0 1 .4477153 1 1v1c0 .5522847-.4477153 1-1 1h-2c-.5522847 0-1-.4477153-1-1v-1c0-.5522847.4477153-1 1-1zm0 4h2c.5522847 0 1 .4477153 1 1v1c0 .5522847-.4477153 1-1 1h-2c-.5522847 0-1-.4477153-1-1v-1c0-.5522847.4477153-1 1-1zm-14-7v1h2v-1zm0 4v1h2v-1zm7-4v1h2v-1zm7 0v1h2v-1zm0 4v1h2v-1zm0 4v1h2v-1zm-14.5-10c-.27614237 0-.5-.22385763-.5-.5s.22385763-.5.5-.5h3c.27614237 0 .5.22385763.5.5s-.22385763.5-.5.5zm7 0c-.2761424 0-.5-.22385763-.5-.5s.2238576-.5.5-.5h3c.2761424 0 .5.22385763.5.5s-.2238576.5-.5.5zm7 0c-.2761424 0-.5-.22385763-.5-.5s.2238576-.5.5-.5h3c.2761424 0 .5.22385763.5.5s-.2238576.5-.5.5z" />
            </Svg>
          ),
        }}
      />
      <Screen
        name="dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color }) => (
            <Svg width={28} height={28} fill={color} viewBox="0 0 16 16">
              <Path
                fill-rule="evenodd"
                d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z"
              />
            </Svg>
          ),
        }}
      />
      <Screen
        name="file"
        component={File}
        options={{
          tabBarIcon: ({ color }) => (
            <Svg height={28} width={28} fill={color} viewBox="0 0 16 16">
              <Path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
            </Svg>
          ),
        }}
      />
      <Screen
        name="notification"
        component={Notification}
        options={{
          tabBarIcon: ({ color }) => (
            <Box>
              {newNotification ? (
                <Box
                  height={10}
                  width={10}
                  backgroundColor="#f00"
                  position="absolute"
                  zIndex={1}
                  borderRadius={"$full"}
                ></Box>
              ) : (
                <></>
              )}
              <Svg height={28} width={28} fill={color} viewBox="0 0 448 512">
                <Path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z" />
              </Svg>
            </Box>
          ),
        }}
      />
      <Screen
        name="createTask"
        component={CreateTask}
        options={{ tabBarButton: () => null }}
      />
      <Screen
        name="editTask"
        component={EditTask}
        options={{ tabBarButton: () => null }}
      />
    </Navigator>
  );
}
