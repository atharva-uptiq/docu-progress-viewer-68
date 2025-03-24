import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import TaskList from '@/components/TaskList';
import ProductCard from '@/components/ProductCard';
import DocumentUpload from '@/components/DocumentUpload';
import ContactCard from '@/components/ContactCard';
import { Task } from '@/components/TaskList';
import { X, FileUp, Clock, CalendarClock, Building2, DollarSign, FileText, ChevronRight, User } from 'lucide-react';
import { ApplicationStage } from '@/components/ProgressTracker';
import ProgressTracker from '@/components/ProgressTracker';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

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

interface Application {
  id: string;
  name: string;
  type: string;
  amount: number;
  date: string;
  status: ApplicationStage;
  progress: number;
}

const mockApplications: Application[] = [
  { id: 'app-1', name: 'Home Loan Refinance', type: 'Residential', amount: 320000, date: '2023-10-15', status: 'application', progress: 25 },
  { id: 'app-2', name: 'Commercial Property Acquisition', type: 'Commercial', amount: 1250000, date: '2023-09-28', status: 'pre-flight', progress: 45 },
  { id: 'app-3', name: 'Mixed-Use Development Loan', type: 'Mixed-Use', amount: 750000, date: '2023-11-02', status: 'loi', progress: 65 },
  { id: 'app-4', name: 'Investment Property Refinance', type: 'Investment', amount: 525000, date: '2023-10-22', status: 'underwriting', progress: 85 },
];

const requiredDocuments = [
  "Formation docs for entity owning property",
  "Last 3 years of personal tax returns of Guarantor",
  "Current personal financial statement of Guarantor",
  "Liquidity statements (investment and depository) of Guarantor",
  "2 years of corporate statements of all closely held companies, if applicable",
  "Copy of signed purchase & sales agreement, if applicable",
  "Rent Roll"
];

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeTask, setActiveTask] = useState<string | null>(null);
  const [uploadedDocuments, setUploadedDocuments] = useState<string[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(mockApplications[0]);
  const [documentUploads, setDocumentUploads] = useState<Record<string, boolean>>({});

  const handleTaskClick = (taskId: string) => {
    setActiveTask(taskId);
  };

  const handleCloseTask = () => {
    setActiveTask(null);
  };

  const handleDocumentUpload = (file: File) => {
    setUploadedDocuments(prev => [...prev, file.name]);
    
    if (uploadedDocuments.length + 1 >= 3) {
      setTimeout(() => {
        setTasks(tasks.map(task => 
          task.id === 'upload-documents' ? { ...task, completed: true, count: 0 } : task
        ));
        toast.success("All required documents have been uploaded!");
      }, 1000);
    }
  };

  const handleRequiredDocUpload = (docName: string) => {
    return (file: File) => {
      setDocumentUploads(prev => ({ ...prev, [docName]: true }));
      setUploadedDocuments(prev => [...prev, file.name]);
      toast.success(`Successfully uploaded ${docName}`);
    };
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="bg-[#a29f95]/10 py-8 px-4 mb-6">
        <div className="container mx-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Welcome to your dashboard</h1>
          <p className="text-gray-600 mt-2">
            Upload documents, check the status of your products, and keep track of your application
          </p>
        </div>
      </div>
      
      <div className="container px-4 sm:px-6 mx-auto pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card className="mb-6 animate-fade-in">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="text-lg font-semibold text-gray-900">TO-DO LIST</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <TaskList tasks={tasks} onTaskClick={handleTaskClick} />
              </CardContent>
            </Card>
            
            <Card className="mb-6 animate-fade-in">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="text-lg font-semibold text-gray-900">YOUR APPLICATIONS</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {mockApplications.map((app) => (
                    <div 
                      key={app.id} 
                      className={cn(
                        "flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors",
                        selectedApplication?.id === app.id && "bg-gray-50"
                      )}
                      onClick={() => setSelectedApplication(app)}
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-[#a29f95]/20 flex items-center justify-center mr-3">
                          <FileText size={16} className="text-[#a29f95]" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{app.name}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            ${app.amount.toLocaleString()} • {formatDate(app.date)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs font-medium text-gray-600 mr-2">
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </span>
                        <ChevronRight size={16} className="text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="animate-fade-in mb-6">
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
                {selectedApplication && (
                  <Card className="mb-6 animate-fade-in">
                    <CardHeader className="border-b border-gray-100">
                      <CardTitle className="text-lg font-semibold text-gray-900">APPLICATION PROGRESS</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center">
                        <div className="w-full mb-8 px-8">
                          <div className="mb-2 flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700">Progress</span>
                            <span className="text-sm font-medium text-gray-700">{selectedApplication.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-[#20703F] h-2.5 rounded-full" 
                              style={{ width: `${selectedApplication.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="w-full py-4 px-10">
                          <ProgressTracker 
                            currentStage={selectedApplication.status} 
                            onStageClick={(stage) => {
                              toast.info(`Viewing ${stage} stage details`);
                            }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="animate-fade-in">
                    <CardHeader className="border-b border-gray-100">
                      <CardTitle className="text-lg font-semibold text-gray-900">APPLICATION SUMMARY</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      {selectedApplication && (
                        <>
                          <div>
                            <h3 className="text-sm font-medium text-[#20703F] mb-3 flex items-center">
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
                                <span className="text-xs font-medium">#{selectedApplication.id}</span>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4">
                            <h3 className="text-sm font-medium text-[#20703F] mb-3 flex items-center">
                              <DollarSign className="mr-2 h-4 w-4" />
                              Loan Information
                            </h3>
                            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                              <div className="flex justify-between">
                                <span className="text-xs text-gray-500">Loan Type</span>
                                <span className="text-xs font-medium">
                                  {selectedApplication.type === 'Residential' ? 'Conventional 30-year fixed' : 
                                   selectedApplication.type === 'Commercial' ? 'Commercial Mortgage' : 
                                   selectedApplication.type === 'Mixed-Use' ? 'Mixed-Use Development Loan' : 
                                   'Investment Property Loan'}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-xs text-gray-500">Loan Amount</span>
                                <span className="text-xs font-medium">${selectedApplication.amount.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-xs text-gray-500">Interest Rate</span>
                                <span className="text-xs font-medium">
                                  {selectedApplication.type === 'Residential' ? '3.25%' : 
                                   selectedApplication.type === 'Commercial' ? '5.50%' : 
                                   selectedApplication.type === 'Mixed-Use' ? '4.75%' : 
                                   '3.75%'}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-xs text-gray-500">Monthly Payment</span>
                                <span className="text-xs font-medium">
                                  ${Math.round(selectedApplication.amount * 0.004).toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4">
                            <h3 className="text-sm font-medium text-[#20703F] mb-3 flex items-center">
                              <Clock className="mr-2 h-4 w-4" />
                              Application Timeline
                            </h3>
                            <div className="relative pl-6 before:content-[''] before:absolute before:left-[9px] before:top-1 before:bottom-1 before:w-px before:bg-gray-200">
                              <div className="mb-4 relative">
                                <div className="absolute left-[-18px] top-0 w-3 h-3 rounded-full bg-[#a29f95]"></div>
                                <p className="text-sm font-medium">Application Submitted</p>
                                <p className="text-xs text-gray-500">{formatDate(selectedApplication.date)}</p>
                              </div>
                              
                              <div className={cn("mb-4 relative", selectedApplication.status === 'application' && "opacity-50")}>
                                <div className={cn(
                                  "absolute left-[-18px] top-0 w-3 h-3 rounded-full", 
                                  selectedApplication.status !== 'application' ? "bg-[#a29f95]" : "bg-gray-200"
                                )}></div>
                                <p className="text-sm font-medium">Document Verification</p>
                                <p className="text-xs text-gray-500">
                                  {selectedApplication.status !== 'application' ? 
                                    formatDate(new Date(new Date(selectedApplication.date).setDate(new Date(selectedApplication.date).getDate() + 7)).toISOString().split('T')[0]) : 
                                    "Pending"}
                                </p>
                              </div>
                              
                              <div className={cn("mb-4 relative", (selectedApplication.status === 'application' || selectedApplication.status === 'pre-flight') && "opacity-50")}>
                                <div className={cn(
                                  "absolute left-[-18px] top-0 w-3 h-3 rounded-full", 
                                  selectedApplication.status !== 'application' && selectedApplication.status !== 'pre-flight' ? "bg-[#a29f95]" : "bg-gray-200"
                                )}></div>
                                <p className="text-sm font-medium">Underwriting</p>
                                <p className="text-xs text-gray-500">
                                  {selectedApplication.status !== 'application' && selectedApplication.status !== 'pre-flight' ? 
                                    formatDate(new Date(new Date(selectedApplication.date).setDate(new Date(selectedApplication.date).getDate() + 14)).toISOString().split('T')[0]) : 
                                    "Pending"}
                                </p>
                              </div>
                              
                              <div className={cn("relative", selectedApplication.status !== 'underwriting' && "opacity-50")}>
                                <div className={cn(
                                  "absolute left-[-18px] top-0 w-3 h-3 rounded-full", 
                                  selectedApplication.status === 'underwriting' ? "bg-[#a29f95]" : "bg-gray-200"
                                )}></div>
                                <p className="text-sm font-medium">Final Approval</p>
                                <p className="text-xs text-gray-500">
                                  {selectedApplication.status === 'underwriting' ? 
                                    formatDate(new Date(new Date(selectedApplication.date).setDate(new Date(selectedApplication.date).getDate() + 30)).toISOString().split('T')[0]) : 
                                    "Estimated: " + formatDate(new Date(new Date(selectedApplication.date).setDate(new Date(selectedApplication.date).getDate() + 30)).toISOString().split('T')[0])}
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="animate-fade-in">
                    <CardHeader className="border-b border-gray-100 flex flex-row items-center justify-between">
                      <CardTitle className="text-lg font-semibold text-gray-900">DOCUMENT CENTER</CardTitle>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-[#20703F] border-[#20703F]"
                      >
                        <FileUp className="h-4 w-4 mr-2" />
                        Upload Document
                      </Button>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="mb-6">
                        <h3 className="text-sm font-medium text-gray-700 mb-3">Required Documents</h3>
                        <div className="space-y-2 mb-6">
                          {requiredDocuments.map((doc, index) => (
                            <div 
                              key={index} 
                              className={cn(
                                "flex items-center justify-between p-3 rounded-lg border",
                                documentUploads[doc] 
                                  ? "bg-green-50 border-green-200" 
                                  : "bg-gray-50 border-gray-200 hover:bg-gray-100 transition-colors"
                              )}
                            >
                              <div className="flex items-center">
                                <FileText className={cn(
                                  "h-4 w-4 mr-3",
                                  documentUploads[doc] ? "text-green-500" : "text-[#20703F]"
                                )} />
                                <div>
                                  <p className="text-sm font-medium">{doc}</p>
                                </div>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className={cn(
                                  "text-xs",
                                  documentUploads[doc] ? "text-green-600" : "text-[#20703F]"
                                )}
                                onClick={() => {
                                  const input = document.createElement('input');
                                  input.type = 'file';
                                  input.onchange = (e) => {
                                    const files = (e.target as HTMLInputElement).files;
                                    if (files && files.length > 0) {
                                      handleRequiredDocUpload(doc)(files[0]);
                                    }
                                  };
                                  input.click();
                                }}
                              >
                                {documentUploads[doc] ? 'Uploaded' : 'Upload'}
                              </Button>
                            </div>
                          ))}
                        </div>
                        
                        <DocumentUpload
                          title="Upload Additional Documentation"
                          description="Drag and drop files here or click to browse"
                          onUpload={(file) => {
                            toast.success(`Successfully uploaded: ${file.name}`);
                            handleDocumentUpload(file);
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
                                <FileText className="h-4 w-4 text-[#20703F] mr-3" />
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
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

