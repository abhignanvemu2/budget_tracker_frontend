import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BudgetOverview = ({ budgets }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!budgets || budgets.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 400;
    const height = 200;
    const margin = { top: 20, right: 20, bottom: 40, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const chart = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Prepare data - show budget vs spent
    const budgetData = budgets.slice(0, 3).map(budget => ({
      name: budget.name,
      budgeted: budget.amount,
      spent: budget.spent_amount || 0,
      percentage: budget.percentage_used || 0
    }));

    if (budgetData.length === 0) {
      chart.append('text')
        .attr('x', chartWidth / 2)
        .attr('y', chartHeight / 2)
        .attr('text-anchor', 'middle')
        .style('fill', '#6b7280')
        .text('No budget data available');
      return;
    }

    // Set up scales
    const xScale = d3.scaleBand()
      .domain(budgetData.map(d => d.name))
      .range([0, chartWidth])
      .padding(0.3);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(budgetData, d => Math.max(d.budgeted, d.spent))])
      .range([chartHeight, 0]);

    // Create budget bars (background)
    chart.selectAll('.budget-bar')
      .data(budgetData)
      .enter()
      .append('rect')
      .attr('class', 'budget-bar')
      .attr('x', d => xScale(d.name))
      .attr('width', xScale.bandwidth())
      .attr('y', d => yScale(d.budgeted))
      .attr('height', d => chartHeight - yScale(d.budgeted))
      .style('fill', '#e5e7eb')
      .style('opacity', 0.7);

    // Create spent bars (foreground)
    chart.selectAll('.spent-bar')
      .data(budgetData)
      .enter()
      .append('rect')
      .attr('class', 'spent-bar')
      .attr('x', d => xScale(d.name) + 2)
      .attr('width', xScale.bandwidth() - 4)
      .attr('y', chartHeight)
      .attr('height', 0)
      .style('fill', d => d.percentage > 100 ? '#ef4444' : '#3b82f6')
      .transition()
      .duration(800)
      .attr('y', d => yScale(Math.min(d.spent, d.budgeted)))
      .attr('height', d => chartHeight - yScale(Math.min(d.spent, d.budgeted)));

    // Add percentage labels
    chart.selectAll('.percentage-label')
      .data(budgetData)
      .enter()
      .append('text')
      .attr('class', 'percentage-label')
      .attr('x', d => xScale(d.name) + xScale.bandwidth() / 2)
      .attr('y', d => yScale(Math.max(d.budgeted, d.spent)) - 5)
      .attr('text-anchor', 'middle')
      .style('font-size', '10px')
      .style('fill', '#374151')
      .style('opacity', 0)
      .text(d => `${Math.round(d.percentage)}%`)
      .transition()
      .delay(800)
      .duration(400)
      .style('opacity', 1);

    // Add axes
    chart.append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .style('font-size', '10px')
      .style('fill', '#6b7280');

    chart.append('g')
      .call(d3.axisLeft(yScale)
        .tickFormat(d => `$${d.toLocaleString()}`))
      .selectAll('text')
      .style('font-size', '10px')
      .style('fill', '#6b7280');

  }, [budgets]);

  return (
    <div>
      {budgets && budgets.length > 0 ? (
        <div className="space-y-4">
          <div className="flex justify-center">
            <svg ref={svgRef}></svg>
          </div>
          <div className="space-y-2">
            {budgets.slice(0, 3).map((budget) => (
              <div key={budget.id} className="flex justify-between items-center text-sm">
                <span className="font-medium">{budget.name}</span>
                <span className={`font-semibold ${
                  budget.percentage_used > 100 ? 'text-danger-600' : 
                  budget.percentage_used > 80 ? 'text-warning-600' : 'text-success-600'
                }`}>
                  {Math.round(budget.percentage_used)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No budgets set</p>
        </div>
      )}
    </div>
  );
};

export default BudgetOverview;