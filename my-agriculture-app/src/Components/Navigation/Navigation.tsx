import { Flex, Tabs, Title } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  const firstTabRef = useRef<HTMLButtonElement | null>(null);
  const secondTabRef = useRef<HTMLButtonElement | null>(null);
  const [focusedTab, setFocusedTab] = useState<string>("first");

  useEffect(() => {
    // Focus the first tab on mount
    if (firstTabRef.current) {
      firstTabRef.current.focus();
    }

    // Prevent focus loss when clicking outside
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        firstTabRef.current &&
        !firstTabRef.current.contains(event.target as Node) &&
        secondTabRef.current &&
        !secondTabRef.current.contains(event.target as Node)
      ) {
        // Prevent losing focus on the currently focused tab
        if (focusedTab === "first" && firstTabRef.current) {
          firstTabRef.current.focus();
        } else if (focusedTab === "second" && secondTabRef.current) {
          secondTabRef.current.focus();
        }
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [focusedTab]);

  // Handler for switching focus when a tab is clicked
  const handleTabFocus = (tabValue: string) => {
    setFocusedTab(tabValue);
  };

  return (
    <Tabs
      className="nav-tab"
      value={focusedTab} // Ensure the value matches the focusedTab state
      onChange={(value) => {
        if (value === "first") navigate("/");
        if (value === "second") navigate("/avgYieldCultivationArea");
        // Update the focused tab when switching tabs
        handleTabFocus(value as string); // Type assertion to ensure value is treated as a string
      }}
    >
      <Flex
        direction={{ base: "column", sm: "row" }} // Stack vertically on mobile, horizontally on small screens and up
        justify="space-between"
        align="center"
        gap={{ base: "xs", sm: "lg" }} // Adjust gap based on screen size
        wrap="wrap" // Ensure items wrap on smaller screens
      >
        <Title
          order={2}
          ta={{ base: "center", sm: "left" }}
          style={{ flex: 1 }}
        >
          Agriculture Analytics
        </Title>
        <Tabs.List
          justify="flex-end"
          style={{ flex: 1 }} // Ensure the list takes available space
        >
          <Tabs.Tab
            className={`tab-text ${focusedTab === "first" ? "focused" : ""}`}
            value="first"
            ref={firstTabRef}
            onFocus={() => handleTabFocus("first")}
          >
            Maximum & Minimum Production By Year
          </Tabs.Tab>
          <Tabs.Tab
            className={`tab-text ${focusedTab === "second" ? "focused" : ""}`}
            value="second"
            ref={secondTabRef}
            onFocus={() => handleTabFocus("second")}
          >
            Average Yield & Cultivation Area of Crop
          </Tabs.Tab>
        </Tabs.List>
      </Flex>
    </Tabs>
  );
};

export default Navigation;
