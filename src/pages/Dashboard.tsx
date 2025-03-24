
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  User, 
  Settings, 
  Bell, 
  FileText, 
  Clock, 
  Calendar, 
  Upload,
  CheckCircle2,
  Bookmark,
  AlertCircle,
  FileUp
} from 'lucide-react';
import { toast } from 'sonner';
import TaskList from '@/components/TaskList';
import ContactCard from '@/components/ContactCard';
import DocumentUpload from '@/components/DocumentUpload';
import ProductCard from '@/components/ProductCard';
import { ApplicationStage } from '@/components/ProgressTracker';

// Required document types
interface RequiredDocument {
  id: string;
  name: string;
  status: 'pending' | 'uploaded';
}

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Required documents list
  const [requiredDocuments, setRequiredDocuments] = useState<RequiredDocument[]>([
    { id: '1', name: 'Formation docs for entity owning property', status: 'pending' },
    { id: '2', name: 'Last 3 years of personal tax returns of Guarantor', status: 'pending' },
    { id: '3', name: 'Current personal financial statement of Guarantor', status: 'pending' },
    { id: '4', name: 'Liquidity statements (investment and depository) of Guarantor', status: 'pending' },
    { id: '5', name: 'Two years of corporate statements of all closely held companies, if applicable', status: 'pending' },
    { id: '6', name: 'Copy of signed purchase & sales agreement, if applicable', status: 'pending' },
    { id: '7', name: 'Rent Roll', status: 'pending' }
  ]);

  const handleDocumentUpload = (docId: string, file: File) => {
    if (!file) return;
    
    setRequiredDocuments(prev => 
      prev.map(doc => 
        doc.id === docId ? { ...doc, status: 'uploaded' } : doc
      )
    );
    
    toast.success(`Document "${file.name}" uploaded successfully`);
  };

  const handleAdditionalDocumentUpload = (file: File) => {
    if (!file) return;
    toast.success(`Additional document "${file.name}" uploaded successfully`);
  };
  
  // Product data with appropriate ApplicationStage types
  const products = [
    {
      id: '1',
      title: 'Bridge Loan',
      relationship: 'Short-term financing for immediate needs',
      currentStage: 'application' as ApplicationStage,
    },
    {
      id: '2',
      title: 'Acquisition Loan',
      relationship: 'Financing to acquire commercial properties',
      currentStage: 'pre-flight' as ApplicationStage,
    },
    {
      id: '3',
      title: 'Construction Loan',
      relationship: 'Funding for new construction projects',
      currentStage: 'loi' as ApplicationStage,
    },
  ];

  const contacts = [
    {
      id: '1',
      name: 'John Smith',
      title: 'Loan Officer',
      email: 'john.smith@example.com',
      phone: '555-123-4567',
    },
    {
      id: '2',
      name: 'Alice Johnson',
      title: 'Underwriter',
      email: 'alice.johnson@example.com',
      phone: '555-987-6543',
    },
  ];

  const tasks = [
    {
      id: '1',
      title: 'Review Loan Application',
      description: 'Thoroughly review the loan application for completeness and accuracy.',
      status: 'In Progress',
      dueDate: '2023-11-15',
    },
    {
      id: '2',
      title: 'Verify Financial Statements',
      description: 'Verify the accuracy of the provided financial statements with supporting documentation.',
      status: 'Pending',
      dueDate: '2023-11-22',
    },
    {
      id: '3',
      title: 'Appraisal Review',
      description: 'Review the property appraisal to ensure it meets the loan requirements.',
      status: 'Complete',
      dueDate: '2023-11-29',
    },
  ];

  const renderTaskContent = (status: string) => {
    const filteredTasks = tasks.filter((task) => task.status === status);

    return (
      <div className="space-y-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div key={task.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-md font-medium">{task.title}</h4>
              <p className="text-sm text-gray-500">{task.description}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-400">Due: {task.dueDate}</span>
                <span className="text-xs text-gray-400">Status: {task.status}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 italic">No tasks found with status: {status}</p>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/d53d268c-e6c5-4abb-8df8-6ba865ad6ae0.png" 
            alt="Logo" 
            className="h-8 w-auto mr-4"
          />
          <h1 className="text-xl font-medium">Commercial Loan Portal</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </header>
      
      <main className="flex-1 bg-gray-50 p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Welcome, James</h2>
          <p className="text-gray-500">Here's what's happening with your application</p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Loan Products</h3>
                  <div className="space-y-4">
                    {products.map((product) => (
                      <ProductCard 
                        key={product.id} 
                        title={product.title}
                        relationship={product.relationship}
                        currentStage={product.currentStage}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Key Contacts</h3>
                  <div className="space-y-4">
                    {contacts.map((contact) => (
                      <ContactCard key={contact.id} contact={contact} />
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Application Status</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Application Received</span>
                      <span className="text-sm font-medium">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Under Review</span>
                      <span className="text-sm font-medium">
                        <Clock className="h-4 w-4 text-gray-500" />
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Approval</span>
                      <span className="text-sm font-medium">
                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="documents">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-4">Document Center</h3>
                    
                    <div className="mb-6">
                      <h4 className="text-md font-medium mb-3">Required Documents</h4>
                      <div className="space-y-3">
                        {requiredDocuments.map(doc => (
                          <div key={doc.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 text-gray-400 mr-3" />
                              <span className="text-sm">{doc.name}</span>
                            </div>
                            {doc.status === 'uploaded' ? (
                              <span className="flex items-center text-green-600 text-sm">
                                <CheckCircle2 className="h-4 w-4 mr-1" />
                                Uploaded
                              </span>
                            ) : (
                              <Sheet>
                                <SheetTrigger asChild>
                                  <Button size="sm" className="bg-[#a29f95] hover:bg-[#8a8880]">
                                    <Upload className="h-4 w-4 mr-2" />
                                    Upload
                                  </Button>
                                </SheetTrigger>
                                <SheetContent>
                                  <SheetHeader>
                                    <SheetTitle>Upload {doc.name}</SheetTitle>
                                    <SheetDescription>
                                      Please upload the required document in PDF, DOC, or DOCX format.
                                    </SheetDescription>
                                  </SheetHeader>
                                  <div className="mt-6">
                                    <DocumentUpload
                                      title={`Upload ${doc.name}`}
                                      description="Drag & drop file or click to browse"
                                      onUpload={(file) => handleDocumentUpload(doc.id, file)}
                                    />
                                  </div>
                                </SheetContent>
                              </Sheet>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-md font-medium">Additional Documentation</h4>
                        <Button size="sm" className="bg-[#a29f95] hover:bg-[#8a8880]">
                          <FileUp className="h-4 w-4 mr-2" />
                          Upload Document
                        </Button>
                      </div>
                      <DocumentUpload
                        title="Upload Additional Documentation"
                        description="Drag & drop files or click to browse"
                        onUpload={handleAdditionalDocumentUpload}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-4">Document Status</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Required Documents</span>
                        <span className="text-sm font-medium">
                          {requiredDocuments.filter(d => d.status === 'uploaded').length} / {requiredDocuments.length}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-[#a29f95] h-2.5 rounded-full" 
                          style={{ width: `${(requiredDocuments.filter(d => d.status === 'uploaded').length / requiredDocuments.length) * 100}%` }}
                        />
                      </div>
                      
                      <div className="pt-4">
                        <h4 className="text-sm font-medium mb-2">Recently Uploaded</h4>
                        <div className="space-y-2">
                          {requiredDocuments.filter(d => d.status === 'uploaded').length > 0 ? (
                            requiredDocuments
                              .filter(d => d.status === 'uploaded')
                              .slice(0, 3)
                              .map(doc => (
                                <div key={doc.id} className="flex items-center text-sm">
                                  <FileText className="h-4 w-4 text-gray-400 mr-2" />
                                  <span className="truncate">{doc.name}</span>
                                </div>
                              ))
                          ) : (
                            <p className="text-sm text-gray-500 italic">No documents uploaded yet</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="tasks">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Tasks Overview</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-md font-medium mb-2">In Progress</h4>
                      {renderTaskContent('In Progress')}
                    </div>
                    <div>
                      <h4 className="text-md font-medium mb-2">Pending</h4>
                      {renderTaskContent('Pending')}
                    </div>
                    <div>
                      <h4 className="text-md font-medium mb-2">Complete</h4>
                      {renderTaskContent('Complete')}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-4">Task Summary</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Total Tasks</span>
                        <span className="text-sm font-medium">{tasks.length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">In Progress</span>
                        <span className="text-sm font-medium">{tasks.filter(t => t.status === 'In Progress').length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Pending</span>
                        <span className="text-sm font-medium">{tasks.filter(t => t.status === 'Pending').length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Complete</span>
                        <span className="text-sm font-medium">{tasks.filter(t => t.status === 'Complete').length}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="messages">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Recent Messages</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <h4 className="text-md font-medium">New Loan Application Received</h4>
                      <p className="text-sm text-gray-500">A new loan application has been submitted and is awaiting review.</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-400">Sent: 2023-11-10</span>
                        <Button variant="link" size="sm">View Message</Button>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <h4 className="text-md font-medium">Document Verification Required</h4>
                      <p className="text-sm text-gray-500">Additional documentation is required to verify your financial statements.</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-400">Sent: 2023-11-05</span>
                        <Button variant="link" size="sm">View Message</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-4">Message Summary</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Total Messages</span>
                        <span className="text-sm font-medium">12</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Unread Messages</span>
                        <span className="text-sm font-medium">3</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Archived Messages</span>
                        <span className="text-sm font-medium">2</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
