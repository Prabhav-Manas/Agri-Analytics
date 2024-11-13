import { Container, Table, Center, Title } from "@mantine/core";
import { agricultureData } from "../../data";

const MaxMinProductionTable = () => {
  // ---Group agriculture data by year, extracting each item's Year, Crop Name, and Crop Production fields.---
  const yearGroupedData = agricultureData.reduce((acc, item) => {
    const {
      Year,
      "Crop Name": CropName,
      "Crop Production (UOM:t(Tonnes))": CropProduction,
    } = item;

    // ---Set productionValue to 0 if CropProduction is an empty string; otherwise, use the original CropProduction value.---
    const productionValue =
      typeof CropProduction === "string" && CropProduction === ""
        ? 0
        : CropProduction;

    // ---If year does not exist in accumulator object then create an empty array, else add the current crop data to the array for the corresponding year.---
    if (!acc[Year]) {
      acc[Year] = [];
    } else {
      acc[Year].push({ CropName, CropProduction: productionValue as number });
    }
    return acc;
  }, {} as Record<string, { CropName: string; CropProduction: number }[]>);

  // ---Iterate through each year in the yearGroupedData object---
  const maxMinProduction = Object.keys(yearGroupedData).map((year) => {
    // ---Get the list of crops for the current year---
    const crops = yearGroupedData[year];

    // ---Find the crop with the maximum production in the current year---
    const maxCrop = crops.reduce((prev, curr) =>
      curr.CropProduction > prev.CropProduction ? curr : prev
    );

    // ---Find the crop with the minimum production in the current year---
    const minCrop = crops.reduce((prev, curr) =>
      curr.CropProduction < prev.CropProduction ? curr : prev
    );

    // ---Return the year and the names of the max and min crops---
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
        {/* Table Starts */}
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
        {/* Table Ends */}
      </Center>
    </Container>
  );
};

export default MaxMinProductionTable;
