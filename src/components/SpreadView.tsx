
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface SpreadItem {
  label: string;
  value: number | string;
  source: string;
}

interface SpreadViewProps {
  spreads: SpreadItem[];
}

const SpreadView: React.FC<SpreadViewProps> = ({ spreads }) => {
  const [activeTab, setActiveTab] = useState('simplified');

  // Key financial ratios
  const keyRatios = [
    { label: 'Debt-to-Income Ratio', value: '0.60', description: 'Measures borrower\'s ability to manage monthly payments' },
    { label: 'Loan-to-Value Ratio', value: '75%', description: 'Ratio of loan amount to appraised property value' },
    { label: 'Debt Service Coverage Ratio', value: '1.25', description: 'Measures ability to service debt with cash flow' },
    { label: 'Net Operating Income', value: '$65,000', description: 'Annual income after operating expenses' },
    { label: 'Cap Rate', value: '6.5%', description: 'Property\'s rate of return on investment' }
  ];

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <Tabs defaultValue="simplified" value={activeTab} onValueChange={setActiveTab}>
        <div className="border-b p-4">
          <TabsList className="bg-gray-100">
            <TabsTrigger value="simplified">Simplified</TabsTrigger>
            <TabsTrigger value="detailed">Detailed</TabsTrigger>
            <TabsTrigger value="raw">Raw Data</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="simplified" className="p-4">
          <div className="space-y-4">
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Financial Overview</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {spreads.map((item, index) => (
                  <div key={index} className="border rounded-md p-4 bg-gray-50">
                    <div className="text-sm text-gray-500">{item.label}</div>
                    <div className="text-xl font-semibold mt-1 text-[#20703F]">
                      {typeof item.value === 'number' ? 
                        `$${item.value.toLocaleString()}` : 
                        item.value}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">Source: {item.source}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4 text-[#20703F]">Key Financial Ratios</h3>
              <div className="space-y-3">
                {keyRatios.map((ratio, index) => (
                  <div key={index} className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <div>
                      <div className="font-medium">{ratio.label}</div>
                      <div className="text-sm text-gray-500">{ratio.description}</div>
                    </div>
                    <div className="font-semibold text-[#20703F]">{ratio.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="detailed" className="p-4">
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Detailed Analysis</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Source</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {spreads.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.label}</TableCell>
                    <TableCell>
                      {typeof item.value === 'number' ? 
                        `$${item.value.toLocaleString()}` : 
                        item.value}
                    </TableCell>
                    <TableCell>{item.source}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline">Export</Button>
              <Button className="bg-[#20703F] hover:bg-[#185733] text-white">Generate Report</Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="raw" className="p-4">
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Raw Data</h3>
            <p className="text-gray-500">This view shows the raw data extracted from financial documents.</p>
            <pre className="bg-gray-100 p-4 rounded-md overflow-auto whitespace-pre-wrap">
              {JSON.stringify(spreads, null, 2)}
            </pre>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SpreadView;
