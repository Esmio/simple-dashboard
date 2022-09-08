import { useEffect } from 'react';
import * as echarts from 'echarts';
import { Box, styled } from '@mui/material';
import salesApi from '../../api/salesApi';

type EChartsOption = echarts.EChartOption;

type SalesType = {
  week: string;
  value: number;
};

let option1: EChartsOption;
let option2: EChartsOption;
let option3: EChartsOption;

const getOption1 = (sales: SalesType[]): EChartsOption => ({
  xAxis: {
    type: 'category',
    data: sales.map((item) => item.week),
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: sales.map((item) => item.value),
      type: 'line',
    },
  ],
});

const getOption2 = (sales: SalesType[]): EChartsOption => ({
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: sales.map((item) => item.week),
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: sales.map((item) => item.value),
      type: 'line',
      areaStyle: {},
    },
  ],
});

const getOption3 = (sales: SalesType[]): EChartsOption => ({
  title: {
    text: 'Sales Form',
    subtext: '',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
  },
  series: [
    {
      name: 'Sales Value',
      type: 'pie',
      radius: '50%',
      data: sales.map((item) => ({ ...item, name: item.week })),
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
});

const Chart = () => {
  useEffect(() => {
    (async () => {
      const res: any = await salesApi.getSaleList();
      if (res.code === 0) {
        option1 = getOption1(res.data);
        option2 = getOption2(res.data);
        option3 = getOption3(res.data);
        const chartDom1 = document.getElementById('chart1')!;
        const myChart1 = echarts.init(chartDom1 as HTMLDivElement);
        option1 && myChart1.setOption(option1);
        const chartDom2 = document.getElementById('chart2')!;
        const myChart2 = echarts.init(chartDom2 as HTMLDivElement);
        option2 && myChart2.setOption(option2);
        const chartDom3 = document.getElementById('chart3')!;
        const myChart3 = echarts.init(chartDom3 as HTMLDivElement);
        option3 && myChart3.setOption(option3);
      }
    })();
  }, []);

  return (
    <ChartContainer>
      <ChartElement id="chart1" />
      <ChartElement id="chart2" />
      <ChartElement id="chart3" />
    </ChartContainer>
  );
};

export default Chart;

const ChartContainer = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const ChartElement = styled(Box)`
  width: 400px;
  height: 300px;
`;
