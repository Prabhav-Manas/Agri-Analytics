import { Container, Table, Center, Title } from "@mantine/core";
import { agricultureData } from "../../data";

const MaxMinProductionTable = () => {
  // Group data by year and calculate max/min production
  const yearGroupedData = agricultureData.reduce((acc, item) => {
    const {
      Year,
      "Crop Name": CropName,
      "Crop Production (UOM:t(Tonnes))": CropProduction,
    } = item;

    const productionValue =
      typeof CropProduction === "string" && CropProduction === ""
        ? 0
        : CropProduction;

    if (!acc[Year]) acc[Year] = [];
    acc[Year].push({
      CropName,
      CropProduction: productionValue as number,
    });
    return acc;
  }, {} as Record<string, { CropName: string; CropProduction: number }[]>);

  // Calculate max and min production for each year
  const maxMinProduction = Object.keys(yearGroupedData).map((year) => {
    const crops = yearGroupedData[year];

    const maxCrop = crops.reduce((prev, curr) =>
      curr.CropProduction > prev.CropProduction ? curr : prev
    );

    const minCrop = crops.reduce((prev, curr) =>
      curr.CropProduction < prev.CropProduction ? curr : prev
    );

    return {
      Year: year,
      MaxCrop: maxCrop.CropName,
      MinCrop: minCrop.CropName,
    };
  });

  return (
    <Container fluid>
      <Title ta="center" mb="md">
        Maximum & Minimum Crop Production By Year
      </Title>
      <Center>
        <Table
          striped
          highlightOnHover
          withTableBorder
          withRowBorders
          withColumnBorders
          className="custom-table"
        >
          <thead>
            <tr>
              <th>Year</th>
              <th>Crop with Maximum Production in that Year</th>
              <th>Crop with Minimum Production in that Year</th>
            </tr>
          </thead>
          <tbody>
            {maxMinProduction.map((item, index) => (
              <tr key={index} style={{ textAlign: "center" }}>
                <td>{item.Year}</td>
                <td>{item.MaxCrop}</td>
                <td>{item.MinCrop}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Center>
    </Container>
  );
};

export default MaxMinProductionTable;
