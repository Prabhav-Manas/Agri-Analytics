import { Table, Title, Center, Container } from "@mantine/core"; // Importing necessary Mantine components
import { agricultureData } from "../../data";

const AverageYieldAreaTable = () => {
  // Group the crop data by name and calculate total yield and area
  const cropGroupedData = agricultureData.reduce((acc, item) => {
    const {
      "Crop Name": CropName,
      "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": YieldOfCrops,
      "Area Under Cultivation (UOM:Ha(Hectares))": AreaUnderCultivation,
    } = item;

    // Initialize the crop entry if not already present
    if (!acc[CropName])
      acc[CropName] = {
        totalYield: 0,
        totalArea: 0,
        count: 0,
      };

    // Ensure YieldOfCrops and AreaUnderCultivation are numbers
    const yieldValue = Number(YieldOfCrops) || 0; // Convert YieldOfCrops to a number, default to 0 if not valid
    const areaValue = Number(AreaUnderCultivation) || 0; // Convert AreaUnderCultivation to a number, default to 0 if not valid

    // Add the yield and area to the totals, and increment the count for each crop
    acc[CropName].totalYield += yieldValue;
    acc[CropName].totalArea += areaValue;
    acc[CropName].count += 1;

    return acc;
  }, {} as Record<string, { totalYield: number; totalArea: number; count: number }>);

  // Calculate average yield and average area for each crop
  const averageYieldArea = Object.keys(cropGroupedData).map((cropName) => {
    const { totalYield, totalArea, count } = cropGroupedData[cropName];
    return {
      CropName: cropName,
      AvgYield: (totalYield / count).toFixed(3), // Calculate average yield, fixed to 3 decimal places
      AvgArea: (totalArea / count).toFixed(3), // Calculate average area, fixed to 3 decimal places
    };
  });

  return (
    <Container fluid>
      <Title ta="center" mb="md">
        Average Yield & Cultivation Area
      </Title>
      <Center>
        <Table
          striped // Adds alternating row colors for better readability
          highlightOnHover // Highlights rows on hover
          withTableBorder // Adds borders around the table
          withRowBorders // Adds borders between rows
          withColumnBorders // Adds borders between columns
          className="custom-table" // Custom class for any additional styles you may want
        >
          <thead>
            <tr>
              <th>Crops</th>
              <th>Average Yield of the Crop between 1950-2020</th>
              <th>Average Cultivation Area of the Crop between 1950-2020</th>
            </tr>
          </thead>
          <tbody>
            {/* Render the calculated average yield and area for each crop */}
            {averageYieldArea.map((item, index) => (
              <tr key={index} style={{ textAlign: "center" }}>
                <td>{item.CropName}</td>
                <td>{item.AvgYield}</td>
                <td>{item.AvgArea}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Center>
    </Container>
  );
};

export default AverageYieldAreaTable;
