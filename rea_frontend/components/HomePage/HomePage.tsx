"use client";

import { HomeCharts } from "./HomeCharts";
import { PageHeader, PageHeaderTitle } from "./HomePage.styled";

const HomePage: React.FC = () => (
  <>
    <PageHeader>
      <PageHeaderTitle>Przejdź do Real Estate</PageHeaderTitle>
    </PageHeader>
    <HomeCharts />
  </>
);

export default HomePage;
