import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BudgetAnalysis = ({ analysis, month, year }) => {
  const chartRef = useRef();

  useEffect(() => {
    if (!analysis || !analysis.budget_comparison) return;

    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove();

    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 100, bottom: 80, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const chart = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const data = analysis.budget_comparison.slice(0, 5);

    if (data.length === 0) {
      chart.append('text')
        .attr('x', chartWidth / 2)
        .attr('y', chartHeight / 2)
        .attr('text-anchor', 'middle')
        .style('fill', '#6b7280')
        .text('No budget data available');
      return;
    }

    // Prepare data for grouped bar chart
    const categories = data.map(d => d.budget_name);
    const maxValue = d3.max(data, d => Math.max(d.budgeted_amount, d.spent_amount));

    const xScale = d3.scaleBand()
      .domain(categories)
      .range([0, chartWidth])
      .padding(0.2);

    const yScale = d3.scaleLinear()
      .domain([0, maxValue])
      .range([chartHeight, 0]);

    const xSubScale = d3.scaleBand()
      .domain(['budgeted', 'spent'])
      .range([0, xScale.bandwidth()])
      .padding(0.1);

    // Create bars
    const budgetBars = chart.selectAll('.budget-group')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'budget-group')
      .attr('transform', d => `translate(${xScale(d.budget_name)},0)`);

    // Budgeted amount bars
    budgetBars.append('rect')
      .attr('x', xSubScale('budgeted'))
      .attr('width', xSubScale.bandwidth())
      .attr('y', chartHeight)
      .attr('height', 0)
      .style('fill', '#3b82f6')
      .style('opacity', 0.7)
      .transition()
      .duration(800)
      .attr('y', d => yScale(d.budgeted_amount))
      .attr('height', d => chartHeight - yScale(d.budgeted_amount));

    // Spent amount bars
    budgetBars.append('rect')
      .attr('x', xSubScale('spent'))
      .attr('width', xSubScale.bandwidth())
      .attr('y', chartHeight)
      .attr('height', 0)
      .style('fill', d => d.over_budget ? '#ef4444' : '#10b981')
      .style('opacity', 0.8)
      .transition()
      .duration(800)
      .delay(200)
      .attr('y', d => yScale(d.spent_amount))
      .attr('height', d => chartHeight - yScale(d.spent_amount));

    // Add axes
    chart.append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .style('font-size', '10px')
      .style('fill', '#6b7280')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');

    chart.append('g')
      .call(d3.axisLeft(yScale)
        .tickFormat(d => `$${d.toLocaleString()}`))
      .selectAll('text')
      .style('font-size', '10px')
      .style('fill', '#6b7280');

    // Add legend
    const legend = chart.append('g')
      .attr('transform', `translate(${chartWidth + 10}, 20)`);

    const legendData = [
      { label: 'Budgeted', color: '#3b82f6' },
      { label: 'Spent', color: '#10b981' }
    ];

    const legendItems = legend.selectAll('.legend-item')
      .data(legendData)
      .enter()
      .append('g')
      .attr('class', 'legend-item')
      .attr('transform', (d, i) => `translate(0, ${i * 20})`);

    legendItems.append('rect')
      .attr('width', 12)
      .attr('height', 12)
      .style('fill', d => d.color);

    legendItems.append('text')
      .attr('x', 16)
      .attr('y', 9)
      .style('font-size', '11px')
      .style('fill', '#374151')
      .text(d => d.label);

  }, [analysis]);

  if (!analysis) {
    return (
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Budget Analysis</h2>
        <p className="text-gray-500">No analysis data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat-card">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Budgeted</p>
            <p className="text-2xl font-bold text-primary-600">
              ${analysis.summary.total_budgeted.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="stat-card">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Spent</p>
            <p className="text-2xl font-bold text-gray-900">
              ${analysis.summary.total_spent.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="stat-card">
          <div>
            <p className="text-sm font-medium text-gray-600">Remaining</p>
            <p className={`text-2xl font-bold ${
              analysis.summary.total_remaining >= 0 ? 'text-success-600' : 'text-danger-600'
            }`}>
              ${analysis.summary.total_remaining.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">
          Budget vs Actual - {month} {year}
        </h2>
        <div className="flex justify-center">
          <svg ref={chartRef}></svg>
        </div>
      </div>
    </div>
  );
};

export default BudgetAnalysis;