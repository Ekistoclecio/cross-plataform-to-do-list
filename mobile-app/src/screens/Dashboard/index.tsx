import {
  Box,
  Button,
  Heading,
  Menu,
  MenuItem,
  MenuItemLabel,
  ScrollView,
  Text,
} from "@gluestack-ui/themed";
import TopBar from "../../components/TopBar";
import ChartPie from "../../components/ChartPie";
import { useState } from "react";
import ChartLine from "../../components/ChartLine";
export default function Dashboard() {
  const [filterChart, setFilterChart] = useState<0 | 1 | 2>(0);
  return (
    <>
      <Box height={"12%"} minHeight={85}>
        <TopBar />
      </Box>
      <Box height={"88%"} backgroundColor="#1d213a" padding={12}>
        <Heading
          color="#6c7ef5"
          size="xl"
          paddingBottom={12}
          borderBottomWidth={0.5}
          borderColor="#E2E8F0"
          marginBottom={12}
        >
          Estatisticas
        </Heading>
        <Box flexDirection="row" alignItems="center" marginBottom={12}>
          <Text color="#CBD5E0" fontWeight="bold" fontSize={20} marginRight={8}>
            Filtrar por:
          </Text>
          <Menu
            backgroundColor={"#53576f"}
            placement="bottom"
            trigger={({ ...triggerProps }) => {
              return (
                <Button
                  {...triggerProps}
                  backgroundColor="#4c5ee5"
                  sx={{
                    ":active": {
                      backgroundColor: "#1c2eb5",
                    },
                  }}
                >
                  <Text color="#CBD5E0" fontWeight="bold" size="lg">
                    {filterChart == 0
                      ? "Ultimos 7 dias"
                      : filterChart == 1
                      ? "Ultimos 30 dias"
                      : "Ultimos 60 dias"}
                  </Text>
                </Button>
              );
            }}
          >
            <MenuItem
              onTouchEnd={() => setFilterChart(0)}
              key="todo"
              textValue="todo"
              sx={{
                ":active": {
                  backgroundColor: "#33374f",
                },
              }}
            >
              <MenuItemLabel color="#CBD5E0" fontSize={"$lg"} size="sm">
                Ultimos 7 dias
              </MenuItemLabel>
            </MenuItem>
            <MenuItem
              onTouchEnd={() => setFilterChart(1)}
              key="inProgress"
              textValue="inProgress"
              sx={{
                ":active": {
                  backgroundColor: "#33374f",
                },
              }}
            >
              <MenuItemLabel color="#CBD5E0" fontSize={"$lg"} size="sm">
                Ultimos 30 dias
              </MenuItemLabel>
            </MenuItem>
            <MenuItem
              onTouchEnd={() => setFilterChart(2)}
              key="completed"
              textValue="completed"
              sx={{
                ":active": {
                  backgroundColor: "#33374f",
                },
              }}
            >
              <MenuItemLabel color="#CBD5E0" fontSize={"$lg"} size="sm">
                Ultimos 60 dias
              </MenuItemLabel>
            </MenuItem>
          </Menu>
        </Box>
        <ScrollView>
          <Box gap={12}>
            <ChartLine
              title="Total de Tarefas Concluídas"
              priority={false}
              filterChart={filterChart}
            />
            <ChartLine
              title="Total de Tarefas Prioritarias Concluídas"
              priority={true}
              filterChart={filterChart}
            />
            <ChartPie title="Divisão total de tarefas" priority={false} />
            <ChartPie
              title="Divisão total de tarefas Prioritarias"
              priority={true}
            />
          </Box>
        </ScrollView>
      </Box>
    </>
  );
}
