/**
 * Utility to convert an array of objects into a CSV and trigger a browser download.
 * @param {string} filename e.g. "inventory-report-2026-10-24.csv"
 * @param {Array<Object>} rows Array of row objects
 * @param {Array<{ key: string, label: string }>} columns Mapping of object keys to CSV column headers
 */
export const exportToCsv = (filename, rows = [], columns = []) => {
  if (!rows || rows.length === 0) {
    alert('No data available to export.');
    return;
  }

  const effectiveColumns = columns.length > 0 
    ? columns 
    : Object.keys(rows[0]).map(k => ({ key: k, label: k }));

  const headerLine = effectiveColumns.map(c => `"${c.label.replace(/"/g, '""')}"`).join(',');

  const rowLines = rows.map(row => {
    return effectiveColumns.map(c => {
      let val = row[c.key];
      if (val === undefined || val === null) val = '';
      if (typeof val === 'object') {
        val = JSON.stringify(val);
      }
      return `"${String(val).replace(/"/g, '""')}"`;
    }).join(',');
  });

  const csvContent = [headerLine, ...rowLines].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename.endsWith('.csv') ? filename : `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportOrdersToCSV = (orders = []) => {
  const columns = [
    { key: 'id', label: 'Order ID' },
    { key: 'createdAt', label: 'Order Date' },
    { key: 'customerName', label: 'Customer Name' },
    { key: 'customerPhone', label: 'Phone' },
    { key: 'total', label: 'Total Amount (INR)' },
    { key: 'paymentStatus', label: 'Payment Status' },
    { key: 'orderStatus', label: 'Order Status' },
    { key: 'deliveryAddress', label: 'Shipping Address' }
  ];
  exportToCsv(`raji_snacks_orders_${Date.now()}.csv`, orders, columns);
};

export const exportInventoryToCSV = (products = []) => {
  const columns = [
    { key: 'id', label: 'Product ID' },
    { key: 'name', label: 'Snack Name' },
    { key: 'category', label: 'Category' },
    { key: 'price', label: 'Selling Price (INR)' },
    { key: 'stock', label: 'Current Stock (Packs)' },
    { key: 'lowStockThreshold', label: 'Alert Threshold' },
    { key: 'status', label: 'Publication Status' }
  ];
  exportToCsv(`raji_snacks_inventory_${Date.now()}.csv`, products, columns);
};

export const exportCustomersToCSV = (customers = []) => {
  const columns = [
    { key: 'id', label: 'Customer ID' },
    { key: 'name', label: 'Customer Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'totalOrders', label: 'Total Orders' },
    { key: 'totalSpent', label: 'Lifetime Spend (INR)' },
    { key: 'lastOrder', label: 'Last Order Date' },
    { key: 'address', label: 'Address' }
  ];
  exportToCsv(`raji_snacks_customers_${Date.now()}.csv`, customers, columns);
};

export const exportInvoicesToCSV = (invoices = []) => {
  const columns = [
    { key: 'invoiceNumber', label: 'Invoice Number' },
    { key: 'orderId', label: 'Order Ref' },
    { key: 'customerName', label: 'Billed To' },
    { key: 'amount', label: 'Grand Total (INR)' },
    { key: 'createdAt', label: 'Invoice Date' },
    { key: 'paymentStatus', label: 'Payment Status' }
  ];
  exportToCsv(`raji_snacks_invoices_${Date.now()}.csv`, invoices, columns);
};
