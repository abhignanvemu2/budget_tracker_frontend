import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const FinancialSummaryChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || !data.category_breakdown) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 400;
    const height = 300;
    const margin = { top: 20, right: 80, bottom: 40, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const chart = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const categoryData = data.category_breakdown.slice(0, 5); 

    if (categoryData.length === 0) {
      chart.append('text')
        .attr('x', chartWidth / 2)
        .attr('y', chartHeight / 2)
        .attr('text-anchor', 'middle')
        .style('fill', '#6b7280')
        .text('No data available');
      return;
    }

    const xScale = d3.scaleBand()
      .domain(categoryData.map(d => d.name))
      .range([0, chartWidth])
      .padding(0.2);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(categoryData, d => d.total)])
      .range([chartHeight, 0]);

    chart.selectAll('.bar')
      .data(categoryData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d.name))
      .attr('width', xScale.bandwidth())
      .attr('y', chartHeight)
      .attr('height', 0)
      .style('fill', d => d.color || '#3b82f6')
      .style('opacity', 0.8)
      .transition()
      .duration(800)
      .attr('y', d => yScale(d.total))
      .attr('height', d => chartHeight - yScale(d.total));

    chart.selectAll('.value-label')
      .data(categoryData)
      .enter()
      .append('text')
      .attr('class', 'value-label')
      .attr('x', d => xScale(d.name) + xScale.bandwidth() / 2)
      .attr('y', d => yScale(d.total) - 5)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', '#374151')
      .style('opacity', 0)
      .text(d => `$${d.total.toLocaleString()}`)
      .transition()
      .delay(800)
      .duration(400)
      .style('opacity', 1);

    chart.append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .style('font-size', '11px')
      .style('fill', '#6b7280');

    chart.append('g')
      .call(d3.axisLeft(yScale)
        .tickFormat(d => `$${d.toLocaleString()}`))
      .selectAll('text')
      .style('font-size', '11px')
      .style('fill', '#6b7280');

    chart.append('text')
      .attr('x', chartWidth / 2)
      .attr('y', -5)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('font-weight', 'bold')
      .style('fill', '#1f2937')

  }, [data]);

  return (
    <div className="flex justify-center">
      <div>
      <svg ref={svgRef}></svg>
      <h1 className='text-center uppercase text-xs font-medium'>Expenses by Category</h1>
      {/* .text('Expenses by Category'); */}
      </div>

    </div>
  );
};

export default FinancialSummaryChart;