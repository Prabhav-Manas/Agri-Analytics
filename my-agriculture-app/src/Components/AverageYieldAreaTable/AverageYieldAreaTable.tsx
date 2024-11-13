import { Table, Title, Center, Container } from "@mantine/core"; // Importing necessary Mantine components
import { agricultureData } from "../../data";

const AverageYieldAreaTable = () => {
  // ---Group the crop data by name and calculate total yield and area---
  const cropGroupedData = agricultureData.reduce((acc, item) => {
    // ---Destructure the relevant properties from each item (crop data)---
    const {
      "Crop Name": CropName,
      "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": YieldOfCrops,
      "Area Under Cultivation (UOM:Ha(Hectares))": AreaUnderCultivation,
    } = item;

    // ---Check if the crop name doesn't already exist in the accumulator object---
    if (!acc[CropName]) {
      // ---If it doesn't exist, initialize it with default values for total yield, total area, and count---
      acc[CropName] = {
        totalYield: 0, // ---Initialize total yield for this crop---
        totalArea: 0, // ---Initialize total area for this crop---
        count: 0, // ---Initialize count of occurrences for this crop---
      };
    } else {
      // ---If the crop already exists in the accumulator, process its data---
      const yieldValue = Number(YieldOfCrops) || 0; // ---Convert the yield to a number, default to 0 if it's not a valid number---
      const areaValue = Number(AreaUnderCultivation) || 0; // ---Convert the area to a number, default to 0 if it's not a valid number---

      // ---Accumulate the yield, area, and count for the specific crop---
      acc[CropName].totalYield += yieldValue; // ---Add the yield value to the total yield of this crop---
      acc[CropName].totalArea += areaValue; // ---Add the area value to the total area of this crop---
      acc[CropName].count += 1; // ---Increment the count of occurrences for this crop---
    }

    return acc;
  }, {} as Record<string, { totalYield: number; totalArea: number; count: number }>);

  // ---Calculate average yield and average area for each crop---
  const averageYieldArea = Object.keys(cropGroupedData).map((cropName) => {
    const { totalYield, totalArea, count } = cropGroupedData[cropName];
    return {
      CropName: cropName,
      AvgYield: (totalYield / count).toFixed(3), // ---Calculate average yield, fixed to 3 decimal places---
      AvgArea: (totalArea / count).toFixed(3), // ---Calculate average area, fixed to 3 decimal places---
    };
  });

  return (
    <Container fluid>
      <Title ta="center" mb="md">
        Average Yield & Cultivation Area
      </Title>
      <Center>
        <Table className="custom-table">
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
