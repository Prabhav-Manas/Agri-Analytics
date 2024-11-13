import { Flex, Tabs, Title } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation(); // ---Use this to track URL changes---
  const firstTabRef = useRef<HTMLButtonElement | null>(null);
  const secondTabRef = useRef<HTMLButtonElement | null>(null);
  const [focusedTab, setFocusedTab] = useState<string>("first");

  useEffect(() => {
    // ---Check the current route and set focus to the appropriate tab---
    if (location.pathname === "/") {
      setFocusedTab("first");
    } else if (location.pathname === "/avgYieldCultivationArea") {
      setFocusedTab("second");
    }
  }, [location.pathname]); // ---Runs whenever the location changes---

  useEffect(() => {
    // ---Focus the appropriate tab based on the focusedTab state---
    if (focusedTab === "first" && firstTabRef.current) {
      firstTabRef.current.focus();
    } else if (focusedTab === "second" && secondTabRef.current) {
      secondTabRef.current.focus();
    }

    // ---Prevent focus loss when clicking outside---
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        firstTabRef.current &&
        !firstTabRef.current.contains(event.target as Node) &&
        secondTabRef.current &&
        !secondTabRef.current.contains(event.target as Node)
      ) {
        // ---Prevent losing focus on the currently focused tab---
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
  }, [focusedTab, location.pathname]);

  // ---Handler for switching focus when a tab is clicked---
  const handleTabFocus = (tabValue: string) => {
    setFocusedTab(tabValue);
    // ---Save the focused tab to localStorage---
    localStorage.setItem("focusedTab", tabValue);
  };

  return (
    <Tabs
      className="nav-tab"
      value={focusedTab}
      onChange={(value) => {
        if (value === "first") navigate("/");
        if (value === "second") navigate("/avgYieldCultivationArea");
        handleTabFocus(value as string);
      }}
    >
      <Flex
        direction={{ base: "column", sm: "row" }}
        justify="space-between"
        align="center"
        gap={{ base: "xs", sm: "lg" }}
        wrap="wrap"
      >
        <Title
          order={2}
          ta={{ base: "center", sm: "left" }}
          style={{ flex: 1 }}
        >
          Agriculture Analytics
        </Title>
        <Tabs.List justify="flex-end" style={{ flex: 1 }}>
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
