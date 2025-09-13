import { ExportOptions } from '../types';

// Utility functions for data export
export class ExportService {
  
  // Export data to CSV format
  static exportToCSV(data: any[], filename: string = 'export.csv'): void {
    if (!data || data.length === 0) {
      console.warn('No data to export');
      return;
    }

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','), // Header row
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          // Escape quotes and wrap in quotes if contains comma, quote, or newline
          if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        }).join(',')
      )
    ].join('\n');

    this.downloadFile(csvContent, filename, 'text/csv');
  }

  // Export data to Excel format (using CSV for now, could be enhanced with a library like xlsx)
  static exportToExcel(data: any[], filename: string = 'export.xlsx'): void {
    // For now, export as CSV. In a real implementation, you'd use a library like xlsx
    this.exportToCSV(data, filename.replace('.xlsx', '.csv'));
  }

  // Generate PDF export (placeholder - would need a PDF generation library)
  static async exportToPDF(data: any[], filename: string = 'export.pdf'): Promise<void> {
    // Placeholder for PDF export functionality
    // In a real implementation, you'd use a library like jsPDF or puppeteer
    console.log('PDF export functionality would be implemented here');
    console.log('Data to export:', data);
    
    // For now, create a simple text file
    const textContent = JSON.stringify(data, null, 2);
    this.downloadFile(textContent, filename.replace('.pdf', '.txt'), 'text/plain');
  }

  // Download file helper
  private static downloadFile(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  // Main export function that handles different formats
  static async exportData(options: ExportOptions, data: any[]): Promise<void> {
    const { format, dateRange } = options;
    const timestamp = new Date().toISOString().split('T')[0];
    const baseFilename = `farm_report_${timestamp}`;

    try {
      switch (format) {
        case 'csv':
          this.exportToCSV(data, `${baseFilename}.csv`);
          break;
        case 'excel':
          this.exportToExcel(data, `${baseFilename}.xlsx`);
          break;
        case 'pdf':
          await this.exportToPDF(data, `${baseFilename}.pdf`);
          break;
        default:
          throw new Error(`Unsupported export format: ${format}`);
      }
    } catch (error) {
      console.error('Export failed:', error);
      throw error;
    }
  }

  // Format data for export based on selected fields
  static formatDataForExport(data: any[], includeFields: string[]): any[] {
    if (!includeFields || includeFields.length === 0) {
      return data;
    }

    return data.map(item => {
      const filteredItem: any = {};
      includeFields.forEach(field => {
        if (item.hasOwnProperty(field)) {
          filteredItem[field] = item[field];
        }
      });
      return filteredItem;
    });
  }

  // Filter data by date range
  static filterDataByDateRange(data: any[], dateField: string, dateRange: { from: string; to: string }): any[] {
    const fromDate = new Date(dateRange.from);
    const toDate = new Date(dateRange.to);

    return data.filter(item => {
      const itemDate = new Date(item[dateField]);
      return itemDate >= fromDate && itemDate <= toDate;
    });
  }
}