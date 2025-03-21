
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import TaskList from '@/components/TaskList';
import ProductCard from '@/components/ProductCard';
import DocumentUpload from '@/components/DocumentUpload';
import ContactCard from '@/components/ContactCard';
import { Task } from '@/components/TaskList';
import { X, FileUp, Clock, CalendarClock, Building2, DollarSign, FileText, ChevronRight, User } from 'lucide-react';
import { ApplicationStage } from '@/components/ProgressTracker';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

// Mock data
const initialTasks: Task[] = [
  { id: 'upload-documents', title: 'Upload Documents', completed: false, count: 3 },
  { id: 'verify-information', title: 'Verify Information', completed: true },
  { id: 'sign-agreements', title: 'Sign Agreements', completed: false }
];

const upcomingEvents = [
  { id: '1', title: 'Property Inspection', date: '2023-11-15', time: '10:00 AM', type: 'inspection' },
  { id: '2', title: 'Financial Statement Review', date: '2023-11-18', time: '2:00 PM', type: 'review' },
  { id: '3', title: 'Loan Committee Meeting', date: '2023-11-22', time: '11:30 AM', type: 'meeting' },
];

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeTask, setActiveTask] = useState<string | null>(null);
  const [uploadedDocuments, setUploadedDocuments] = useState<string[]>([]);

  const handleTaskClick = (taskId: string) => {
    setActiveTask(taskId);
  };

  const handleCloseTask = () => {
    setActiveTask(null);
  };

  const handleDocumentUpload = (file: File) => {
    setUploadedDocuments(prev => [...prev, file.name]);
    
    // If we've uploaded 3 documents, mark the task as completed
    if (uploadedDocuments.length + 1 >= 3) {
      setTimeout(() => {
        setTasks(tasks.map(task => 
          task.id === 'upload-documents' ? { ...task, completed: true, count: 0 } : task
        ));
        toast.success("All required documents have been uploaded!");
      }, 1000);
    }
  };

  // Render document upload section if that task is selected
  const renderTaskContent = () => {
    if (activeTask === 'upload-documents') {
      return (
        <Card className="bg-white animate-slide-in">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-xl font-semibold text-gray-900">Upload Documents</CardTitle>
              <CardDescription>Please upload the following documents to continue with your application</CardDescription>
            </div>
            <Button 
              onClick={handleCloseTask}
              variant="ghost" 
              size="icon"
              className="h-8 w-8"
            >
              <X className="h-4 w-4 text-gray-500" />
            </Button>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <DocumentUpload
              title="Proof of Income"
              description="Upload your most recent pay stub, W-2, or tax return document."
              onUpload={handleDocumentUpload}
            />
            
            <DocumentUpload
              title="Identity Verification"
              description="Upload a valid government-issued ID (passport, driver's license)."
              onUpload={handleDocumentUpload}
            />
            
            <DocumentUpload
              title="Additional Documentation"
              description="Upload any supplemental files for to-do list items."
              onUpload={handleDocumentUpload}
            />
          </CardContent>
        </Card>
      );
    }
    
    if (activeTask === 'verify-information') {
      return (
        <Card className="bg-white animate-slide-in">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-xl font-semibold text-gray-900">Verify Information</CardTitle>
              <CardDescription>Your information has been verified</CardDescription>
            </div>
            <Button 
              onClick={handleCloseTask}
              variant="ghost" 
              size="icon"
              className="h-8 w-8"
            >
              <X className="h-4 w-4 text-gray-500" />
            </Button>
          </CardHeader>
          
          <CardContent>
            <div className="flex items-center bg-green-50 border border-green-100 rounded-md p-3">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-green-800">Verification Complete</p>
                <p className="text-xs text-green-600">Completed on June 15, 2023</p>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }
    
    if (activeTask === 'sign-agreements') {
      return (
        <Card className="bg-white animate-slide-in">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-xl font-semibold text-gray-900">Sign Agreements</CardTitle>
              <CardDescription>Please review and sign the following agreements</CardDescription>
            </div>
            <Button 
              onClick={handleCloseTask}
              variant="ghost" 
              size="icon"
              className="h-8 w-8"
            >
              <X className="h-4 w-4 text-gray-500" />
            </Button>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="border rounded-md p-4 hover:bg-gray-50 cursor-pointer transition-colors">
              <h3 className="text-sm font-medium text-gray-900">Loan Agreement</h3>
              <p className="text-xs text-gray-500 mt-1">Review and sign your home loan refinance agreement</p>
              <button className="mt-3 text-xs font-medium text-[#a29f95]">View & Sign</button>
            </div>
            
            <div className="border rounded-md p-4 hover:bg-gray-50 cursor-pointer transition-colors">
              <h3 className="text-sm font-medium text-gray-900">Terms & Conditions</h3>
              <p className="text-xs text-gray-500 mt-1">Review the terms and conditions for your account</p>
              <button className="mt-3 text-xs font-medium text-[#a29f95]">View & Sign</button>
            </div>
          </CardContent>
        </Card>
      );
    }
    
    return null;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const currentStage: ApplicationStage = 'application';
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="bg-[#a29f95]/10 py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Welcome to your dashboard</h1>
          <p className="text-gray-600 mt-2">
            Upload documents, check the status of your products, and keep track of your application
          </p>
        </div>
      </div>
      
      <div className="container px-4 sm:px-6 mx-auto -mt-6 sm:-mt-10 relative z-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card className="mb-6 animate-fade-in">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="text-lg font-semibold text-gray-900">TO-DO LIST</CardTitle>
              </CardHeader>
              <TaskList tasks={tasks} onTaskClick={handleTaskClick} />
            </Card>
            
            <Card className="animate-fade-in">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="text-lg font-semibold text-gray-900">UPCOMING EVENTS</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {upcomingEvents.map(event => (
                    <div key={event.id} className="p-4 hover:bg-gray-50">
                      <div className="flex">
                        <div className="mr-4">
                          <div className="w-10 h-10 rounded-full bg-[#a29f95]/20 flex items-center justify-center">
                            {event.type === 'inspection' && <Building2 size={16} className="text-[#a29f95]" />}
                            {event.type === 'review' && <FileText size={16} className="text-[#a29f95]" />}
                            {event.type === 'meeting' && <Clock size={16} className="text-[#a29f95]" />}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium text-sm">{event.title}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <CalendarClock size={14} className="text-gray-400" />
                            <span className="text-xs text-gray-500">
                              {formatDate(event.date)} • {event.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <ContactCard />
          </div>
          
          <div className="lg:col-span-2">
            {activeTask ? (
              renderTaskContent()
            ) : (
              <>
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 px-1 mb-4">YOUR PRODUCTS</h2>
                  <ProductCard 
                    title="Home Loan Refinance" 
                    relationship="John Smith"
                    currentStage={currentStage}
                    onClick={() => toast.info("Viewing product details would open here")}
                  />
                </div>
                
                <Card className="animate-fade-in">
                  <CardHeader className="border-b border-gray-100">
                    <CardTitle className="text-lg font-semibold text-gray-900">APPLICATION SUMMARY</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-medium text-[#a29f95] mb-3 flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          Borrower Details
                        </h3>
                        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-500">Full Name</span>
                            <span className="text-xs font-medium">John Smith</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-500">Email</span>
                            <span className="text-xs font-medium">john.smith@example.com</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-500">Phone</span>
                            <span className="text-xs font-medium">(555) 123-4567</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-500">Application ID</span>
                            <span className="text-xs font-medium">#APP-12345</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-[#a29f95] mb-3 flex items-center">
                          <DollarSign className="mr-2 h-4 w-4" />
                          Loan Information
                        </h3>
                        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-500">Loan Type</span>
                            <span className="text-xs font-medium">Conventional 30-year fixed</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-500">Loan Amount</span>
                            <span className="text-xs font-medium">$320,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-500">Interest Rate</span>
                            <span className="text-xs font-medium">3.25%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-500">Monthly Payment</span>
                            <span className="text-xs font-medium">$1,392</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-sm font-medium text-[#a29f95] mb-3 flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        Application Timeline
                      </h3>
                      <div className="relative pl-6 before:content-[''] before:absolute before:left-[9px] before:top-1 before:bottom-1 before:w-px before:bg-gray-200">
                        <div className="mb-4 relative">
                          <div className="absolute left-[-18px] top-0 w-3 h-3 rounded-full bg-[#a29f95]"></div>
                          <p className="text-sm font-medium">Application Submitted</p>
                          <p className="text-xs text-gray-500">October 12, 2023</p>
                        </div>
                        <div className="mb-4 relative">
                          <div className="absolute left-[-18px] top-0 w-3 h-3 rounded-full bg-gray-200"></div>
                          <p className="text-sm">Document Verification</p>
                          <p className="text-xs text-gray-500">In Progress</p>
                        </div>
                        <div className="mb-4 relative">
                          <div className="absolute left-[-18px] top-0 w-3 h-3 rounded-full bg-gray-200"></div>
                          <p className="text-sm">Underwriting</p>
                          <p className="text-xs text-gray-500">Pending</p>
                        </div>
                        <div className="relative">
                          <div className="absolute left-[-18px] top-0 w-3 h-3 rounded-full bg-gray-200"></div>
                          <p className="text-sm">Final Approval</p>
                          <p className="text-xs text-gray-500">Estimated: November 15, 2023</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="animate-fade-in mt-6">
                  <CardHeader className="border-b border-gray-100 flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-gray-900">DOCUMENT CENTER</CardTitle>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-[#a29f95] border-[#a29f95]"
                    >
                      <FileUp className="h-4 w-4 mr-2" />
                      Upload Document
                    </Button>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="mb-6">
                      <DocumentUpload
                        title="Upload Additional Documentation"
                        description="Drag and drop files here or click to browse"
                        onUpload={(file) => {
                          toast.success(`Successfully uploaded: ${file.name}`);
                        }}
                      />
                    </div>
                    
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Recently Uploaded</h3>
                    <div className="space-y-2">
                      {uploadedDocuments.length === 0 ? (
                        <div className="text-center p-6 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                          <FileText className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">No documents uploaded yet</p>
                        </div>
                      ) : (
                        uploadedDocuments.map((doc, index) => (
                          <div 
                            key={index} 
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                          >
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 text-[#a29f95] mr-3" />
                              <div>
                                <p className="text-sm font-medium">{doc}</p>
                                <p className="text-xs text-gray-500">Uploaded today</p>
                              </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
